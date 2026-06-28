/**
 * useSpeechRecognition
 * ────────────────────────────────────────────────────────────────────────
 * Wraps the Web Speech API (SpeechRecognition).
 *
 * Browser support:
 *   ✅ Chrome 33+, Edge (Chromium)
 *   ❌ Firefox — no support (as of 2025, behind flag only)
 *   ❌ Safari — partial/unreliable webkit prefixed impl, excluded intentionally
 *
 * The hook detects support at mount time and exposes `isSupported: false`
 * so callers can render a graceful message instead of a broken mic button.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Browser type declarations (not fully in TS DOM lib) ──────────────────────

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string
  readonly message: string
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onstart: ((ev: Event) => void) | null
  onend: ((ev: Event) => void) | null
  onerror: ((ev: SpeechRecognitionErrorEvent) => void) | null
  onresult: ((ev: SpeechRecognitionEvent) => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
}

// ─── Support detection ────────────────────────────────────────────────────────

function getSpeechRecognitionConstructor(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type SpeechRecognitionStatus =
  | 'idle'
  | 'listening'       // actively capturing audio
  | 'processing'      // final result incoming
  | 'error'

export interface UseSpeechRecognitionReturn {
  isSupported: boolean
  status: SpeechRecognitionStatus
  interimTranscript: string   // live in-progress text
  error: string | null        // human-readable error message
  start: (lang: string, onFinal: (text: string) => void) => void
  stop: () => void
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const Constructor = getSpeechRecognitionConstructor()
  const isSupported = Constructor !== null

  const [status, setStatus] = useState<SpeechRecognitionStatus>('idle')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  // Callback set by the consumer to receive finalized transcript
  const onFinalRef = useRef<((text: string) => void) | null>(null)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
    }
  }, [])

  const start = useCallback(
    (lang: string, onFinal: (text: string) => void) => {
      if (!Constructor) return
      // Stop any existing session
      recognitionRef.current?.abort()

      setError(null)
      setInterimTranscript('')

      const recognition = new Constructor()
      recognition.lang = lang
      recognition.continuous = false       // single utterance
      recognition.interimResults = true    // stream partial results
      recognition.maxAlternatives = 1

      onFinalRef.current = onFinal

      recognition.onstart = () => {
        setStatus('listening')
        setError(null)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = ''
        let finalText = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          const transcript = result[0].transcript
          if (result.isFinal) {
            finalText += transcript
          } else {
            interim += transcript
          }
        }

        setInterimTranscript(interim)

        if (finalText) {
          setStatus('processing')
          setInterimTranscript('')
          onFinalRef.current?.(finalText.trim())
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        const friendlyMessages: Record<string, string> = {
          'not-allowed':    'Microphone access was denied. Check your browser permissions.',
          'no-speech':      'No speech detected. Try speaking closer to your mic.',
          'audio-capture':  'No microphone found. Check your device settings.',
          'network':        'Speech recognition requires an internet connection.',
          'aborted':        '', // user-initiated — no message needed
          'service-not-allowed': 'Speech recognition is not allowed in this browser context.',
        }
        const msg = friendlyMessages[event.error] ?? `Speech error: ${event.error}`
        if (msg) setError(msg)
        setStatus('error')
        setInterimTranscript('')
      }

      recognition.onend = () => {
        // Only reset to idle if not already in error/processing state
        setStatus((prev) => (prev === 'listening' || prev === 'processing' ? 'idle' : prev))
        setInterimTranscript('')
        recognitionRef.current = null
      }

      recognitionRef.current = recognition
      recognition.start()
    },
    [Constructor]
  )

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setStatus('idle')
    setInterimTranscript('')
  }, [])

  return {
    isSupported,
    status,
    interimTranscript,
    error,
    start: start as (lang: string) => void, // consumer passes onFinal as 2nd arg via closure
    stop,
  }
}

// Re-export start with onFinal param for typed internal usage
export type StartFn = (lang: string, onFinal: (text: string) => void) => void
