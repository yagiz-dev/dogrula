import { ErrorCode } from '../types/index.js';

/**
 * Türkçe hata mesajları
 */
export const tr: Record<ErrorCode, string> = {
	[ErrorCode.TCKN_INVALID_LENGTH]: 'TCKN 11 basamaklı olmalıdır',
	[ErrorCode.TCKN_INVALID_FORMAT]: 'TCKN sadece rakamlardan oluşmalıdır',
	[ErrorCode.TCKN_INVALID_FIRST_DIGIT]: 'TCKN\'nin ilk hanesi 0 olamaz',
	[ErrorCode.TCKN_INVALID_CHECKSUM]: 'TCKN doğrulama algoritması başarısız oldu',
	[ErrorCode.TCKN_ALL_SAME_NUMBERS]: 'TCKN\'nin tüm basamakları aynı rakamdan oluşamaz',
};
