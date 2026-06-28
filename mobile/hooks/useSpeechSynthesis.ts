import { useState, useCallback, useEffect } from 'react'
import * as Speech from 'expo-speech'

export type SpeechSynthesisStatus = 'idle' | 'speaking' | 'paused'

export interface UseSpeechSynthesisReturn {
  isSupported: boolean
  status: SpeechSynthesisStatus
  hasVoice: (langCode: string) => boolean
  speak: (text: string, langCode: string) => void
  stop: () => void
  voicesLoaded: boolean
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [status, setStatus] = useState<SpeechSynthesisStatus>('idle')
  const [voices, setVoices] = useState<Speech.Voice[]>([])
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const isSupported = true // expo-speech is generally supported

  useEffect(() => {
    Speech.getAvailableVoicesAsync()
      .then((v) => {
        setVoices(v)
        setVoicesLoaded(true)
      })
      .catch(() => {
        setVoicesLoaded(true)
      })
  }, [])

  const hasVoice = useCallback(
    (langCode: string) => {
      if (!voicesLoaded) return false
      
      const lowerLang = langCode.toLowerCase()
      const exact = voices.find((v) => v.language.toLowerCase().startsWith(lowerLang + '-'))
      const partial = voices.find((v) => v.language.toLowerCase() === lowerLang)
      
      // Even if we don't find a perfect match, expo-speech will try its best
      // with the default system voice if we pass a language. We'll return true
      // if we have ANY voices loaded as a fallback so the button isn't disabled incorrectly.
      return !!exact || !!partial || voices.length > 0
    },
    [voices, voicesLoaded]
  )

  const speak = useCallback((text: string, langCode: string) => {
    Speech.stop()
    setStatus('speaking')
    Speech.speak(text, {
      language: langCode,
      rate: 0.95,
      pitch: 1.0,
      onDone: () => setStatus('idle'),
      onStopped: () => setStatus('idle'),
      onError: () => setStatus('idle'),
    })
  }, [])

  const stop = useCallback(() => {
    Speech.stop()
    setStatus('idle')
  }, [])

  useEffect(() => {
    return () => {
      Speech.stop()
    }
  }, [])

  return { isSupported, status, hasVoice, speak, stop, voicesLoaded }
}
