import { Volume2, VolumeX } from 'lucide-react'

interface SpeakButtonProps {
  isSpeaking: boolean
  isSupported: boolean
  hasVoice: boolean
  voicesLoaded: boolean
  onSpeak: () => void
  onStop: () => void
  disabled?: boolean
}

/**
 * SpeakButton — appears in the output panel when there's text to read.
 *
 * States:
 *   - Not supported: Hidden (SpeechSynthesis is widely supported; this is a safety net).
 *   - Voices not yet loaded: Disabled with loading hint.
 *   - No voice for language: Disabled, tooltip explains.
 *   - Idle: Ghost button, click to speak.
 *   - Speaking: Accent fill + animated waveform bars, click to stop.
 *   - Blocked by mic: Disabled (mic is recording).
 */
export function SpeakButton({
  isSpeaking,
  isSupported,
  hasVoice,
  voicesLoaded,
  onSpeak,
  onStop,
  disabled,
}: SpeakButtonProps) {
  if (!isSupported) return null

  const unavailable = voicesLoaded && !hasVoice

  const disabledReason = !voicesLoaded
    ? 'Loading voices…'
    : unavailable
    ? 'No voice available for this language in your browser'
    : disabled
    ? 'Stop recording before listening'
    : null

  const isDisabled = !!disabledReason

  return (
    <button
      onClick={isSpeaking ? onStop : onSpeak}
      disabled={isDisabled}
      aria-label={isSpeaking ? 'Stop playback' : 'Listen to translation'}
      title={disabledReason ?? (isSpeaking ? 'Stop' : 'Listen')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '4px 9px',
        borderRadius: 'var(--radius)',
        border: `1px solid ${
          isSpeaking
            ? 'var(--color-accent)'
            : 'transparent'
        }`,
        backgroundColor: isSpeaking ? 'var(--color-accent-subtle)' : 'transparent',
        color: isSpeaking
          ? 'var(--color-accent)'
          : isDisabled
          ? 'var(--color-text-tertiary)'
          : 'var(--color-text-tertiary)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.4 : 1,
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        fontWeight: 500,
        transition: `background-color var(--duration-fast) var(--ease-out),
                     color var(--duration-fast) var(--ease-out),
                     border-color var(--duration-fast) var(--ease-out),
                     opacity var(--duration-fast) var(--ease-out)`,
      }}
      onMouseEnter={(e) => {
        if (!isDisabled && !isSpeaking) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-surface)'
        }
      }}
      onMouseLeave={(e) => {
        if (!isSpeaking) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
        }
      }}
    >
      {isSpeaking ? (
        <>
          {/* Animated 3-bar waveform */}
          <span className="wave-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Stop</span>
        </>
      ) : unavailable ? (
        <>
          <VolumeX size={13} />
          <span>No voice</span>
        </>
      ) : (
        <>
          <Volume2 size={13} />
          <span>Listen</span>
        </>
      )}
    </button>
  )
}
