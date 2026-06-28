import type { AppSettings } from '../types/index';

export const APP_NAME = 'Lingo';
export const APP_VERSION = '0.1.0';

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  defaultSourceLang: 'auto',
  defaultTargetLang: 'es',
  speechEnabled: true,
  hapticFeedback: true,
  saveHistory: true,
};

export const MAX_HISTORY_ENTRIES = 500;
export const MAX_TRANSLATION_CHARS = 5000;
