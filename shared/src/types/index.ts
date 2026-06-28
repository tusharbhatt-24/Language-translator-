// Supported language definitions
export type LanguageCode =
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt'
  | 'zh' | 'ja' | 'ko' | 'ar' | 'hi' | 'ru'
  | 'nl' | 'pl' | 'sv' | 'tr' | 'vi' | 'th';

export interface Language {
  code: LanguageCode;
  name: string;         // English name
  nativeName: string;   // Name in that language
  rtl?: boolean;        // Right-to-left script
}

// Translation
export interface TranslationRequest {
  text: string;
  sourceLanguage: LanguageCode | 'auto';
  targetLanguage: LanguageCode;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  detectedLanguage?: LanguageCode; // Set when source was 'auto'
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
  language: LanguageCode;
  continuous: boolean;
}

// App settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  defaultSourceLanguage: LanguageCode | 'auto';
  defaultTargetLanguage: LanguageCode;
  speechEnabled: boolean;
  hapticFeedback: boolean; // mobile only
  saveHistory: boolean;
}
