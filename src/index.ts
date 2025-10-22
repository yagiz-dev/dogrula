// Doğrulayıcıları dışa aktar
export { TCKN } from './validators/TCKN.js';

// Type'ları dışarı aktar
export type { ValidationResult, Locale } from './types/index.js';
export { ErrorCode } from './types/index.js';

// Yerelleştirme fonksiyonlarını dışa aktar
export { setLocale, getLocale } from './locales/index.js';
