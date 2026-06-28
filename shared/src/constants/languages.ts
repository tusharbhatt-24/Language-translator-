/**
 * Curated language list — ~30 languages supported by both MyMemory and LibreTranslate.
 * No flag emoji. Text labels only (per design system: no emoji as UI elements).
 * Sorted: English first, then alphabetically by English name.
 */

export interface Language {
  code: string;
  name: string;         // English display name
  nativeName: string;   // Name in its own script
  rtl?: boolean;        // Right-to-left script
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English',     nativeName: 'English' },
  { code: 'af', name: 'Afrikaans',   nativeName: 'Afrikaans' },
  { code: 'ar', name: 'Arabic',      nativeName: 'العربية',      rtl: true },
  { code: 'bn', name: 'Bengali',     nativeName: 'বাংলা' },
  { code: 'zh', name: 'Chinese',     nativeName: '中文' },
  { code: 'cs', name: 'Czech',       nativeName: 'Čeština' },
  { code: 'da', name: 'Danish',      nativeName: 'Dansk' },
  { code: 'nl', name: 'Dutch',       nativeName: 'Nederlands' },
  { code: 'fi', name: 'Finnish',     nativeName: 'Suomi' },
  { code: 'fr', name: 'French',      nativeName: 'Français' },
  { code: 'de', name: 'German',      nativeName: 'Deutsch' },
  { code: 'el', name: 'Greek',       nativeName: 'Ελληνικά' },
  { code: 'gu', name: 'Gujarati',    nativeName: 'ગુજરાતી' },
  { code: 'he', name: 'Hebrew',      nativeName: 'עברית',        rtl: true },
  { code: 'hi', name: 'Hindi',       nativeName: 'हिन्दी' },
  { code: 'id', name: 'Indonesian',  nativeName: 'Bahasa Indonesia' },
  { code: 'it', name: 'Italian',     nativeName: 'Italiano' },
  { code: 'ja', name: 'Japanese',    nativeName: '日本語' },
  { code: 'ko', name: 'Korean',      nativeName: '한국어' },
  { code: 'ms', name: 'Malay',       nativeName: 'Bahasa Melayu' },
  { code: 'mr', name: 'Marathi',     nativeName: 'मराठी' },
  { code: 'no', name: 'Norwegian',   nativeName: 'Norsk' },
  { code: 'fa', name: 'Persian',     nativeName: 'فارسی',        rtl: true },
  { code: 'pl', name: 'Polish',      nativeName: 'Polski' },
  { code: 'pt', name: 'Portuguese',  nativeName: 'Português' },
  { code: 'ro', name: 'Romanian',    nativeName: 'Română' },
  { code: 'ru', name: 'Russian',     nativeName: 'Русский' },
  { code: 'es', name: 'Spanish',     nativeName: 'Español' },
  { code: 'sv', name: 'Swedish',     nativeName: 'Svenska' },
  { code: 'tl', name: 'Tagalog',     nativeName: 'Tagalog' },
  { code: 'ta', name: 'Tamil',       nativeName: 'தமிழ்' },
  { code: 'th', name: 'Thai',        nativeName: 'ภาษาไทย' },
  { code: 'tr', name: 'Turkish',     nativeName: 'Türkçe' },
  { code: 'uk', name: 'Ukrainian',   nativeName: 'Українська' },
  { code: 'ur', name: 'Urdu',        nativeName: 'اردو',         rtl: true },
  { code: 'vi', name: 'Vietnamese',  nativeName: 'Tiếng Việt' },
];

/** Lookup by code — O(1) */
export const LANGUAGE_MAP: Record<string, Language> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l])
);

/** All codes for validation */
export const LANGUAGE_CODES = new Set(LANGUAGES.map((l) => l.code));

/** Codes of RTL languages */
export const RTL_CODES = new Set(LANGUAGES.filter((l) => l.rtl).map((l) => l.code));

/** The 'auto-detect' sentinel for source language */
export const AUTO_DETECT = 'auto' as const;
export type LanguageCodeOrAuto = string | typeof AUTO_DETECT;
