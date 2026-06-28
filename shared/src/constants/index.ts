import type { Language, LanguageCode, AppSettings } from '../types/index';

export const APP_NAME = 'Lingo';
export const APP_VERSION = '0.1.0';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English',    nativeName: 'English' },
  { code: 'es', name: 'Spanish',    nativeName: 'Español' },
  { code: 'fr', name: 'French',     nativeName: 'Français' },
  { code: 'de', name: 'German',     nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian',    nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'zh', name: 'Chinese',    nativeName: '中文' },
  { code: 'ja', name: 'Japanese',   nativeName: '日本語' },
  { code: 'ko', name: 'Korean',     nativeName: '한국어' },
  { code: 'ar', name: 'Arabic',     nativeName: 'العربية', rtl: true },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी' },
  { code: 'ru', name: 'Russian',    nativeName: 'Русский' },
  { code: 'nl', name: 'Dutch',      nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish',     nativeName: 'Polski' },
  { code: 'sv', name: 'Swedish',    nativeName: 'Svenska' },
  { code: 'tr', name: 'Turkish',    nativeName: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'th', name: 'Thai',       nativeName: 'ภาษาไทย' },
];

export const LANGUAGE_MAP: Record<LanguageCode, Language> = Object.fromEntries(
  SUPPORTED_LANGUAGES.map((lang) => [lang.code, lang])
) as Record<LanguageCode, Language>;

export const RTL_LANGUAGES: LanguageCode[] = SUPPORTED_LANGUAGES
  .filter((l) => l.rtl)
  .map((l) => l.code);

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  defaultSourceLanguage: 'auto',
  defaultTargetLanguage: 'es',
  speechEnabled: true,
  hapticFeedback: true,
  saveHistory: true,
};

export const MAX_HISTORY_ENTRIES = 500;
export const MAX_TRANSLATION_CHARS = 5000;
