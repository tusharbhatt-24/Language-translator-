import { useState, useCallback } from 'react'
import { ArrowRightLeft, Copy, Check, AlertCircle, Loader, RefreshCw } from 'lucide-react'
import { LANGUAGE_MAP } from '@lingo/shared'
import { LanguageSelector } from '../components/LanguageSelector'
import { useTranslation } from '../hooks/useTranslation'

const MAX_CHARS = 5000

// ─── Tiny status-aware button that copies translated text ─────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API blocked — silent fail
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy translation'}
      title={copied ? 'Copied' : 'Copy'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: 'var(--radius)',
        border: '1px solid transparent',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        color: copied ? 'var(--color-success)' : 'var(--color-text-tertiary)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        transition: `color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out)`,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-surface)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

// ─── Provider badge ───────────────────────────────────────────────────────────

function ProviderBadge({ provider }: { provider?: 'mymemory' | 'libretranslate' }) {
  if (!provider) return null
  const label = provider === 'mymemory' ? 'MyMemory' : 'LibreTranslate'
  return (
    <span
      title={provider === 'libretranslate' ? 'Fallback provider — may have limitations' : 'Primary provider'}
      style={{
        fontSize: '0.6875rem',
        fontWeight: 500,
        color: provider === 'libretranslate' ? 'var(--color-text-tertiary)' : 'var(--color-text-tertiary)',
        letterSpacing: '0.03em',
        padding: '2px 6px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border-subtle)',
        cursor: 'help',
      }}
    >
      via {label}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Translate() {
  const [sourceText, setSourceText] = useState('')
  const [sourceLang, setSourceLang] = useState('auto')
  const [targetLang, setTargetLang] = useState('es')

  const { status, translatedText, detectedSourceLang, provider, errorMessage, errorReason, retranslate } =
    useTranslation(sourceText, sourceLang, targetLang)

  const charCount = sourceText.length
  const overLimit = charCount > MAX_CHARS

  function handleSwap() {
    // Can only swap when source is a known language (not auto)
    const effectiveSource = detectedSourceLang ?? (sourceLang !== 'auto' ? sourceLang : null)
    if (!effectiveSource) return

    setSourceLang(targetLang)
    setTargetLang(effectiveSource)
    // Also swap the text if we have a translation
    if (translatedText) {
      setSourceText(translatedText)
    }
  }

  const canSwap = sourceLang !== 'auto' || !!detectedSourceLang

  // Detected language name for display
  const detectedName = detectedSourceLang ? (LANGUAGE_MAP[detectedSourceLang]?.name ?? detectedSourceLang) : null

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 64px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            marginBottom: '6px',
            margin: '0 0 6px',
          }}
        >
          Translate
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            margin: 0,
          }}
        >
          Type to translate.
        </h1>
      </div>

      {/* Translation canvas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '12px',
          alignItems: 'start',
        }}
      >
        {/* ── Source panel ─────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${overLimit ? 'var(--color-error)' : 'var(--color-border)'}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: `border-color var(--duration-fast) var(--ease-out)`,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px 0',
            }}
          >
            <LanguageSelector
              value={sourceLang}
              onChange={setSourceLang}
              allowAuto
              label="Source language"
            />
            {/* Char count */}
            <span
              style={{
                fontSize: '0.75rem',
                color: overLimit ? 'var(--color-error)' : 'var(--color-text-tertiary)',
                fontWeight: overLimit ? 600 : 400,
                transition: `color var(--duration-fast) var(--ease-out)`,
              }}
            >
              {charCount.toLocaleString()}/{MAX_CHARS.toLocaleString()}
            </span>
          </div>

          {/* Detected language note */}
          {detectedName && sourceLang === 'auto' && (
            <p
              style={{
                margin: '4px 14px 0',
                fontSize: '0.75rem',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Detected: {detectedName}
            </p>
          )}

          {/* Textarea */}
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Type or paste text to translate…"
            maxLength={MAX_CHARS}
            autoFocus
            spellCheck
            style={{
              resize: 'none',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--color-text)',
              lineHeight: 1.6,
              padding: '10px 14px 14px',
              minHeight: '200px',
              width: '100%',
            }}
          />
        </div>

        {/* ── Swap button ───────────────────────────────────────────────── */}
        <button
          onClick={handleSwap}
          disabled={!canSwap}
          aria-label="Swap languages"
          title={canSwap ? 'Swap languages' : 'Select a source language to swap'}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: canSwap ? 'pointer' : 'not-allowed',
            marginTop: '42px',
            flexShrink: 0,
            opacity: canSwap ? 1 : 0.4,
            transition: `background-color var(--duration-fast) var(--ease-out), opacity var(--duration-fast) var(--ease-out)`,
          }}
          onMouseEnter={(e) => {
            if (canSwap) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-surface)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-bg)'
          }}
        >
          <ArrowRightLeft size={15} color="var(--color-text-secondary)" />
        </button>

        {/* ── Output panel ──────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor:
              status === 'error' ? 'var(--color-error-subtle)' : 'var(--color-bg)',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${status === 'error' ? 'var(--color-error)' : 'var(--color-border)'}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: `background-color var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out)`,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px 0',
            }}
          >
            <LanguageSelector
              value={targetLang}
              onChange={setTargetLang}
              accentWhenSelected
              label="Target language"
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {status === 'success' && provider && <ProviderBadge provider={provider} />}
              {status === 'success' && translatedText && <CopyButton text={translatedText} />}
            </div>
          </div>

          {/* Output content area */}
          <div
            style={{
              padding: '10px 14px 14px',
              minHeight: '200px',
              position: 'relative',
            }}
          >
            {/* Idle / empty */}
            {status === 'idle' && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-text-tertiary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Translation will appear here.
              </p>
            )}

            {/* Loading */}
            {status === 'loading' && (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '2px' }}
              >
                <Loader
                  size={15}
                  color="var(--color-accent)"
                  style={{ animation: 'spin 0.8s linear infinite' }}
                />
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-tertiary)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Translating…
                </span>
              </div>
            )}

            {/* Success */}
            {status === 'success' && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--color-text)',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {translatedText}
              </p>
            )}

            {/* Error */}
            {status === 'error' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <AlertCircle
                    size={15}
                    color="var(--color-error)"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--color-error)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {errorReason === 'rate_limited'
                        ? 'Rate limit reached'
                        : errorReason === 'network_error'
                        ? 'No connection'
                        : errorReason === 'unsupported_pair'
                        ? 'Language pair not supported'
                        : 'Translation failed'}
                    </p>
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '0.8125rem',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <button
                  onClick={retranslate}
                  style={{
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--color-error)',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--color-error)',
                    transition: `background-color var(--duration-fast) var(--ease-out)`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-error-subtle)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
                >
                  <RefreshCw size={12} />
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spinner keyframe — injected once */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
