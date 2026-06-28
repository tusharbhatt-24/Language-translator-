import { useState, useCallback, useRef } from 'react'
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition'

export type SpeechRecognitionStatus = 'idle' | 'listening'

export interface UseSpeechRecognitionReturn {
  isSupported: boolean
  status: SpeechRecognitionStatus
  interimTranscript: string
  error: string | null
  start: (langCode: string, onFinal: (text: string) => void) => void
  stop: () => void
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [status, setStatus] = useState<SpeechRecognitionStatus>('idle')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const isSupported = !!ExpoSpeechRecognitionModule

  const onFinalCallback = useRef<((text: string) => void) | null>(null)
  const fullTranscript = useRef('')

  useSpeechRecognitionEvent('start', () => {
    setStatus('listening')
    setError(null)
    setInterimTranscript('')
    fullTranscript.current = ''
  })

  useSpeechRecognitionEvent('end', () => {
    setStatus('idle')
    setInterimTranscript('')
  })

  useSpeechRecognitionEvent('result', (event) => {
    const results = event.results
    if (!results || results.length === 0) return

    let finalStr = ''
    let interimStr = ''

    for (let i = 0; i < results.length; i++) {
      const res = results[i]
      if (event.isFinal) {
        finalStr += res.transcript
      } else {
        interimStr += res.transcript
      }
    }

    if (finalStr) {
      fullTranscript.current += (fullTranscript.current ? ' ' : '') + finalStr
      if (onFinalCallback.current) {
        onFinalCallback.current(fullTranscript.current)
      }
    }

    setInterimTranscript(interimStr)
  })

  useSpeechRecognitionEvent('error', (event) => {
    setStatus('idle')
    setInterimTranscript('')
    
    // Map native errors to friendly messages
    let msg = 'Voice input failed.'
    switch (event.error) {
      case 'not-allowed':
      case 'audio-capture':
        msg = 'Microphone access was denied. Please enable it in Settings.'
        break
      case 'no-speech':
        msg = 'No speech detected.'
        break
      case 'network':
        msg = 'Network error occurred during speech recognition.'
        break
    }
    setError(msg)
  })

  const start = useCallback(async (langCode: string, onFinal: (text: string) => void) => {
    setError(null)
    onFinalCallback.current = onFinal

    try {
      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync()
      if (!permission.granted) {
        setError('Microphone access was denied. Please enable it in Settings.')
        return
      }

      ExpoSpeechRecognitionModule.start({
        lang: langCode,
        interimResults: true,
        continuous: true,
      })
    } catch (err) {
      setError('Could not start speech recognition.')
    }
  }, [])

  const stop = useCallback(() => {
    ExpoSpeechRecognitionModule.stop()
    setStatus('idle')
  }, [])

  return { isSupported, status, interimTranscript, error, start, stop }
}
