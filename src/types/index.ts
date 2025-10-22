/**
 * Doğrulama hataları için hata kodları
 */
export enum ErrorCode {
	TCKN_INVALID_LENGTH = 'TCKN_INVALID_LENGTH',
	TCKN_INVALID_FORMAT = 'TCKN_INVALID_FORMAT',
	TCKN_INVALID_FIRST_DIGIT = 'TCKN_INVALID_FIRST_DIGIT',
	TCKN_INVALID_CHECKSUM = 'TCKN_INVALID_CHECKSUM',
	TCKN_ALL_SAME_NUMBERS = 'TCKN_ALL_SAME_NUMBERS',
}

/**
 * Doğrulama sonucu interface'i
 */
export interface ValidationResult {
	valid: boolean;
	errors: string[];
}

/**
 * Desteklenen diller
 */
export type Locale = 'tr' | 'en';
