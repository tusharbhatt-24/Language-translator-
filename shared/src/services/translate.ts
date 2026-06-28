/**
 * Lingo Translation Service
 * ─────────────────────────────────────────────────────────────────────────
 *
 * PROVIDER STRATEGY
 * ─────────────────
 * Primary:  MyMemory Translated API (https://api.mymemory.translated.net)
 *   - Free, no API key needed.
 *   - ~1,000 words/day per IP unauthenticated; ~10,000/day with email param.
 *   - Returns JSON with responseStatus (200 = OK, 429 = rate limit, etc.)
 *
 * Fallback: LibreTranslate public instance (https://libretranslate.com)
 *   ⚠️  NOTE: The public LibreTranslate instance is heavily rate-limited
 *   and intended for light/demo use only. For production reliability, either:
 *   - Self-host LibreTranslate (Docker image available, runs on a $5/mo VPS)
 *   - Switch to Google Cloud Translation (pay-per-use, highly reliable)
 *   - Switch to DeepL API (free tier: 500k chars/month, excellent quality)
 *   The fallback here exists to gracefully handle MyMemory outages during dev.
 *
 * CACHE
 * ─────
 * In-memory session cache keyed by `text::source::target`.
 * Resets on page reload. Prevents redundant API calls for identical inputs.
 * No persistence — next session starts fresh.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type TranslationErrorReason =
  | 'rate_limited'       // HTTP 429 or API rate limit response
  | 'network_error'      // fetch threw, DNS failure, timeout
  | 'unsupported_pair'   // language pair not supported by both providers
  | 'empty_result'       // API returned 200 but translation was blank
  | 'unknown';           // anything else

export type TranslationOutcome =
  | {
      status: 'success';
      translatedText: string;
      detectedSourceLang?: string; // populated when source was 'auto'
      provider: 'mymemory' | 'libretranslate';
    }
  | {
      status: 'error';
      reason: TranslationErrorReason;
      message: string;
    };

// ─── Cache ────────────────────────────────────────────────────────────────────

const cache = new Map<string, TranslationOutcome>();

function cacheKey(text: string, source: string, target: string): string {
  return `${text}::${source}::${target}`;
}

// ─── Provider: MyMemory ───────────────────────────────────────────────────────

const MYMEMORY_BASE = 'https://api.mymemory.translated.net/get';

function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

interface MyMemoryResponse {
  responseStatus: number;
  responseMessage?: string;
  responseDetails?: string;
  responseData: {
    translatedText: string;
    match: number;
  };
  matches?: Array<{
    translation: string;
    quality: string;
    'detected-langs'?: string;
  }>;
}

async function translateWithMyMemory(
  text: string,
  source: string,
  target: string
): Promise<TranslationOutcome> {
  const url = new URL(MYMEMORY_BASE);
  url.searchParams.set('q', text);
  url.searchParams.set('langpair', source === 'auto' ? `autodetect|${target}` : `${source}|${target}`);
  // Adding a de-facto email acts as a soft auth that bumps daily limit to ~10k words
  // Replace with your email for higher limits: url.searchParams.set('de', 'your@email.com')

  let response: Response;
  try {
    response = await fetchWithTimeout(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    }, 8000);
  } catch (err) {
    return {
      status: 'error',
      reason: 'network_error',
      message: err instanceof Error ? err.message : 'Network request failed',
    };
  }

  if (response.status === 429) {
    return { status: 'error', reason: 'rate_limited', message: 'MyMemory rate limit reached.' };
  }
  if (!response.ok) {
    return {
      status: 'error',
      reason: 'unknown',
      message: `MyMemory returned HTTP ${response.status}`,
    };
  }

  let data: MyMemoryResponse;
  try {
    data = (await response.json()) as MyMemoryResponse;
  } catch {
    return { status: 'error', reason: 'unknown', message: 'MyMemory response was not valid JSON' };
  }

  // MyMemory uses responseStatus 200 for success, 429/403/etc for errors
  if (data.responseStatus !== 200) {
    if (data.responseStatus === 429) {
      return { status: 'error', reason: 'rate_limited', message: data.responseMessage ?? data.responseDetails ?? 'Rate limited' };
    }
    return {
      status: 'error',
      reason: 'unknown',
      message: data.responseMessage ?? data.responseDetails ?? `MyMemory error ${data.responseStatus}`,
    };
  }

  const translated = data.responseData?.translatedText?.trim();
  if (!translated || translated === text) {
    // Sometimes MyMemory echoes the input for unsupported pairs
    return { status: 'error', reason: 'empty_result', message: 'No translation returned by MyMemory' };
  }

  // Extract detected source language from matches if available
  const detectedLang = data.matches?.[0]?.['detected-langs']?.split('-')[0];

  return {
    status: 'success',
    translatedText: translated,
    detectedSourceLang: source === 'auto' ? detectedLang : undefined,
    provider: 'mymemory',
  };
}

// ─── Provider: LibreTranslate (fallback) ──────────────────────────────────────

const LIBRETRANSLATE_BASE = 'https://libretranslate.com/translate';

interface LibreTranslateResponse {
  translatedText?: string;
  error?: string;
}

async function translateWithLibreTranslate(
  text: string,
  source: string,
  target: string
): Promise<TranslationOutcome> {
  let response: Response;
  try {
    response = await fetchWithTimeout(LIBRETRANSLATE_BASE, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: source === 'auto' ? 'auto' : source,
        target,
        format: 'text',
        alternatives: 0,
      }),
      headers: { 'Content-Type': 'application/json' },
    }, 10000);
  } catch (err) {
    return {
      status: 'error',
      reason: 'network_error',
      message: err instanceof Error ? err.message : 'LibreTranslate network request failed',
    };
  }

  if (response.status === 429) {
    return { status: 'error', reason: 'rate_limited', message: 'LibreTranslate rate limit reached.' };
  }
  if (response.status === 400) {
    return { status: 'error', reason: 'unsupported_pair', message: 'Language pair not supported by LibreTranslate.' };
  }
  if (!response.ok) {
    return {
      status: 'error',
      reason: 'unknown',
      message: `LibreTranslate returned HTTP ${response.status}`,
    };
  }

  let data: LibreTranslateResponse;
  try {
    data = (await response.json()) as LibreTranslateResponse;
  } catch {
    return { status: 'error', reason: 'unknown', message: 'LibreTranslate response was not valid JSON' };
  }

  if (data.error) {
    return { status: 'error', reason: 'unknown', message: data.error };
  }

  const translated = data.translatedText?.trim();
  if (!translated) {
    return { status: 'error', reason: 'empty_result', message: 'LibreTranslate returned an empty result' };
  }

  return {
    status: 'success',
    translatedText: translated,
    provider: 'libretranslate',
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface TranslateOptions {
  text: string;
  sourceLang: string;    // language code or 'auto'
  targetLang: string;    // language code
}

/**
 * Translate text from sourceLang → targetLang.
 *
 * - Checks in-memory session cache first.
 * - Tries MyMemory (primary). Falls back to LibreTranslate if primary fails.
 * - Returns a typed TranslationOutcome — never throws.
 * - Successful results are cached for the session.
 */
export async function translate(options: TranslateOptions): Promise<TranslationOutcome> {
  const { text, sourceLang, targetLang } = options;

  // Minimal validation
  if (!text.trim()) {
    return { status: 'error', reason: 'empty_result', message: 'Input text is empty' };
  }
  if (sourceLang !== 'auto' && sourceLang === targetLang) {
    // Same language — return the input unchanged
    return { status: 'success', translatedText: text, provider: 'mymemory' };
  }

  // Cache check
  const key = cacheKey(text, sourceLang, targetLang);
  const cached = cache.get(key);
  if (cached) return cached;

  // Primary: MyMemory
  const primary = await translateWithMyMemory(text, sourceLang, targetLang);

  if (primary.status === 'success') {
    cache.set(key, primary);
    return primary;
  }

  // Only fall back for non-rate-limit errors (rate limit should propagate clearly)
  if (primary.reason === 'rate_limited') {
    return primary;
  }

  // Fallback: LibreTranslate
  const fallback = await translateWithLibreTranslate(text, sourceLang, targetLang);

  const result = fallback.status === 'success' ? fallback : primary; // Return primary error if both fail
  if (result.status === 'success') cache.set(key, result);
  return result;
}

/** Clear the in-memory translation cache (useful for testing) */
export function clearTranslationCache(): void {
  cache.clear();
}
