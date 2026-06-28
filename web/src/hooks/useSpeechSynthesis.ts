/**
 * useSpeechSynthesis
 * ────────────────────────────────────────────────────────────────────────
 * Wraps the Web Speech API (SpeechSynthesis).
 *
 * Browser support:
 *   ✅ Chrome, Edge, Safari, Firefox (widely supported)
 *
 * Voice selection strategy:
 *   1. Find a voice whose lang exactly matches `${langCode}-*` (e.g. "es-ES")
 *   2. Fall back to any voice that starts with the 2-char code (e.g. "es")
 *   3. Fall back to the browser default voice (always available)
 *   If no lang-specific voice exists, the speak button is disabled and
 *   a tooltip explains why.
 *
 * Note: getVoices() is async on some browsers — voices load after the
 * `voiceschanged` event fires. We listen for that and re-evaluate.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Support detection ────────────────────────────────────────────────────────

function isSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

// ─── Voice selection ──────────────────────────────────────────────────────────

/**
 * Given a 2-char language code, find the best available voice.
 * Returns null if voices haven't loaded yet.
 */
function findVoice(langCode: string): SpeechSynthesisVoice | null {
  if (!isSynthesisSupported()) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null

  // 1. Prefer a voice whose lang exactly matches (e.g. "es-ES", "fr-FR")
  const exact = voices.find((v) => v.lang.toLowerCase().startsWith(langCode.toLowerCase() + '-'))
  if (exact) return exact

  // 2. Partial match (lang might be "es" without region)
  const partial = voices.find((v) => v.lang.toLowerCase() === langCode.toLowerCase())
  if (partial) return partial

  return null
}

/**
 * Returns true if the browser has any voice available for the given lang code.
 */
export function hasVoiceForLang(langCode: string): boolean {
  return findVoice(langCode) !== null
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export type SpeechSynthesisStatus = 'idle' | 'speaking' | 'paused'

export interface UseSpeechSynthesisReturn {
  isSupported: boolean
  status: SpeechSynthesisStatus
  hasVoice: (langCode: string) => boolean
  speak: (text: string, langCode: string) => void
  stop: () => void
  voicesLoaded: boolean   // signals when voices are ready for hasVoice checks
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const supported = isSynthesisSupported()
  const [status, setStatus] = useState<SpeechSynthesisStatus>('idle')
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Listen for voiceschanged event so hasVoice() becomes accurate
  useEffect(() => {
    if (!supported) return

    function onVoicesChanged() {
      setVoicesLoaded(true)
    }

    // Voices may already be available (Chrome loads them sync on some builds)
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoicesLoaded(true)
    }

    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged)
    }
  }, [supported])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel()
    }
  }, [supported])

  const speak = useCallback(
    (text: string, langCode: string) => {
      if (!supported) return
      // Cancel anything currently playing
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)

      // Find best voice for the language
      const voice = findVoice(langCode)
      if (voice) {
        utterance.voice = voice
        utterance.lang = voice.lang
      } else {
        // No matching voice — use lang hint and let browser pick
        utterance.lang = langCode
      }

      utterance.rate = 0.95   // slightly slower than default — more natural
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setStatus('speaking')
      utterance.onend   = () => setStatus('idle')
      utterance.onerror = () => setStatus('idle')

      utteranceRef.current = utterance
      setStatus('speaking')
      window.speechSynthesis.speak(utterance)
    },
    [supported]
  )

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setStatus('idle')
  }, [supported])

  const hasVoice = useCallback(
    (langCode: string): boolean => {
      if (!supported || !voicesLoaded) return false
      return hasVoiceForLang(langCode)
    },
    [supported, voicesLoaded]
  )

  return { isSupported: supported, status, hasVoice, speak, stop, voicesLoaded }
}
