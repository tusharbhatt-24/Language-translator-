import { useState, useEffect, useRef, useCallback } from 'react'
import { translate, type TranslationOutcome } from '@lingo/shared'
import { useDebounce } from './useDebounce'

export type TranslationStatus = 'idle' | 'loading' | 'success' | 'error'

export interface UseTranslationState {
  status: TranslationStatus
  translatedText: string
  detectedSourceLang?: string
  provider?: 'mymemory' | 'libretranslate'
  errorMessage?: string
  errorReason?: string
}

const DEBOUNCE_MS = 500

export function useTranslation(
  sourceText: string,
  sourceLang: string,
  targetLang: string
) {
  const [state, setState] = useState<UseTranslationState>({ status: 'idle', translatedText: '' })

  // Track the latest request to discard stale results from slow fetches
  const requestId = useRef(0)

  const debouncedText = useDebounce(sourceText, DEBOUNCE_MS)
  const debouncedSource = useDebounce(sourceLang, 100)
  const debouncedTarget = useDebounce(targetLang, 100)

  // Manual retrigger (e.g. clicking "Translate" button explicitly)
  const [retrigger, setRetrigger] = useState(0)
  const retranslate = useCallback(() => setRetrigger((n) => n + 1), [])

  useEffect(() => {
    const text = debouncedText.trim()

    // Clear output when input is empty
    if (!text) {
      setState({ status: 'idle', translatedText: '' })
      return
    }

    // Don't translate if same language (non-auto)
    if (debouncedSource !== 'auto' && debouncedSource === debouncedTarget) {
      setState({ status: 'success', translatedText: text, provider: 'mymemory' })
      return
    }

    const id = ++requestId.current
    setState((prev) => ({ ...prev, status: 'loading' }))

    translate({ text, sourceLang: debouncedSource, targetLang: debouncedTarget })
      .then((outcome: TranslationOutcome) => {
        // Discard if a newer request is already in flight
        if (id !== requestId.current) return

        if (outcome.status === 'success') {
          setState({
            status: 'success',
            translatedText: outcome.translatedText,
            detectedSourceLang: outcome.detectedSourceLang,
            provider: outcome.provider,
          })
        } else {
          setState({
            status: 'error',
            translatedText: '',
            errorMessage: outcome.message,
            errorReason: outcome.reason,
          })
        }
      })
      .catch(() => {
        if (id !== requestId.current) return
        setState({
          status: 'error',
          translatedText: '',
          errorMessage: 'Something went wrong. Please try again.',
          errorReason: 'unknown',
        })
      })
  }, [debouncedText, debouncedSource, debouncedTarget, retrigger])

  return { ...state, retranslate }
}
