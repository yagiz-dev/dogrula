import { ErrorCode, Locale } from '../types/index.js';
import { tr } from './tr.js';
import { en } from './en.js';

/**
 * Locale messages map
 */
const locales: Record<Locale, Record<ErrorCode, string>> = {
	tr,
	en,
};

/**
 * Current global locale (default: Turkish)
 */
let currentLocale: Locale = 'tr';

/**
 * Sets the global locale
 *
 * @param locale - The locale to set ('tr' or 'en')
 */
export function setLocale(locale: Locale): void {
	currentLocale = locale;
}

/**
 * Gets the current global locale
 *
 * @returns The current locale
 */
export function getLocale(): Locale {
	return currentLocale;
}

/**
 * Gets the localized error message for a given error code
 *
 * @param code - The error code
 * @param locale - Optional locale override (uses global locale if not provided)
 * @returns The localized error message
 */
export function getMessage(code: ErrorCode, locale?: Locale): string {
	const activeLocale = locale ?? currentLocale;
	return locales[activeLocale][code];
}

/**
 * Gets localized error messages for multiple error codes
 *
 * @param codes - Array of error codes
 * @param locale - Optional locale override (uses global locale if not provided)
 * @returns Array of localized error messages
 */
export function getMessages(codes: ErrorCode[], locale?: Locale): string[] {
	return codes.map((code) => getMessage(code, locale));
}
