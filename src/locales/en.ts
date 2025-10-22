import { ErrorCode } from '../types/index.js';

/**
 * English error messages
 */
export const en: Record<ErrorCode, string> = {
	[ErrorCode.TCKN_INVALID_LENGTH]: 'TCKN must be 11 digits',
	[ErrorCode.TCKN_INVALID_FORMAT]: 'TCKN must contain only digits',
	[ErrorCode.TCKN_INVALID_FIRST_DIGIT]: 'TCKN cannot start with 0',
	[ErrorCode.TCKN_INVALID_CHECKSUM]: 'TCKN validation algorithm failed',
	[ErrorCode.TCKN_ALL_SAME_NUMBERS]: 'TCKN cannot consist of all same numbers',
};
