import { Mic, MicOff, Square } from 'lucide-react'

interface MicButtonProps {
  isSupported: boolean
  isListening: boolean
  onStart: () => void
  onStop: () => void
  disabled?: boolean
}

/**
 * MicButton — integrates into the source panel footer.
 *
 * States:
 *   - Unsupported (Firefox/Safari): Shows mic icon, disabled, tooltip explains why.
 *   - Idle: Normal ghost button, click to start recording.
 *   - Listening: Terracotta fill + pulse ring animation, click to stop.
 *   - Disabled (e.g. TTS is playing): Greyed out.
 */
export function MicButton({ isSupported, isListening, onStart, onStop, disabled }: MicButtonProps) {
  if (!isSupported) {
    return (
      <span
        role="button"
        aria-disabled="true"
        title="Voice input isn't supported in this browser. Try Chrome or Edge."
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '5px 10px',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--color-border-subtle)',
          backgroundColor: 'transparent',
          color: 'var(--color-text-tertiary)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          cursor: 'not-allowed',
          userSelect: 'none',
          opacity: 0.5,
        }}
      >
        <MicOff size={13} />
        <span>Voice unavailable</span>
      </span>
    )
  }

  return (
    <button
      onClick={isListening ? onStop : onStart}
      disabled={disabled && !isListening}
      aria-label={isListening ? 'Stop recording' : 'Start voice input'}
      title={isListening ? 'Stop recording' : 'Speak to translate'}
      className={isListening ? 'mic-listening' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 10px',
        borderRadius: 'var(--radius)',
        border: `1px solid ${isListening ? 'var(--color-accent)' : 'var(--color-border)'}`,
        backgroundColor: isListening ? 'var(--color-accent)' : 'transparent',
        color: isListening ? '#fff' : 'var(--color-text-secondary)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-body)',
        fontWeight: isListening ? 600 : 500,
        cursor: disabled && !isListening ? 'not-allowed' : 'pointer',
        opacity: disabled && !isListening ? 0.45 : 1,
        transition: `background-color var(--duration-fast) var(--ease-out),
                     color var(--duration-fast) var(--ease-out),
                     border-color var(--duration-fast) var(--ease-out),
                     opacity var(--duration-fast) var(--ease-out)`,
      }}
    >
      {isListening ? (
        <>
          <Square size={11} fill="currentColor" strokeWidth={0} />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Mic size={13} />
          <span>Speak</span>
        </>
      )}
    </button>
  )
}
