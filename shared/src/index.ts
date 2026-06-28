// Barrel export — all shared modules

// Design tokens (colors, spacing, typography, motion)
export * from './design-system';

// Language list + lookup (canonical source of Language type)
export * from './constants/languages';

// App-level constants (APP_NAME, DEFAULT_SETTINGS, limits)
export * from './constants/index';

// Shared types (TranslationResult, HistoryEntry, AppSettings, etc.)
// Note: Language type is re-exported from types/index which proxies languages.ts
export type {
  TranslationRequest,
  TranslationResult,
  HistoryEntry,
  SpeechStatus,
  SpeechConfig,
  AppSettings,
} from './types/index';

// Translation service
export * from './services/translate';
