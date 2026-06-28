// ─── Re-exports from languages.ts (canonical definitions) ─────────────────────
export type { Language, LanguageCodeOrAuto } from '../constants/languages'
export { AUTO_DETECT } from '../constants/languages'

// Translation request/response
export interface TranslationRequest {
  text: string;
  sourceLang: string;       // language code or 'auto'
  targetLang: string;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  detectedLang?: string;    // Set when source was 'auto'
  timestamp: number;
}

// History entry stored in device/local storage
export interface HistoryEntry extends TranslationResult {
  id: string;
  isFavorited: boolean;
}

// Speech
export type SpeechStatus = 'idle' | 'listening' | 'processing' | 'error';

export interface SpeechConfig {
  language: string;
  continuous: boolean;
}

// App settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  defaultSourceLang: string;   // language code or 'auto'
  defaultTargetLang: string;
  speechEnabled: boolean;
  hapticFeedback: boolean;     // mobile only
  saveHistory: boolean;
}
