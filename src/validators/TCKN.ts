import { ValidationResult, ErrorCode } from '../types/index.js';
import { getMessages } from '../locales/index.js';

/**
 * Türkiye Cumhuriyeti Kimlik Numarası (TCKN) doğrulayıcısı.
 *
 * Bu class, verilen bir TCKN'nin biçimsel ve matematiksel olarak geçerli olup olmadığını kontrol eder.
 * Uzunluk, ilk hane, rakam formatı ve kontrol basamakları (10. ve 11. haneler) doğrulanır.
 */
export class TCKN {
	private value: string;
	private _errorCodes: Set<ErrorCode> = new Set();
	private _valid: boolean | null = null;

	/**
	 * Yeni bir TCKN örneği oluşturur.
	 *
	 * @param tckn - Doğrulanacak kimlik numarası (string veya number olabilir)
	 */
	constructor(tckn: string | number) {
		this.value = String(tckn);
	}

	/**
	 * TCKN'nin geçerli olup olmadığını doğrular.
	 *
	 * @returns TCKN geçerliyse `true`, değilse `false`
	 */
	isValid(): boolean {
		if (this._valid !== null) {
			return this._valid;
		}

		this._errorCodes.clear();

		const v = this.value;

		// Biçimsel kontroller
		if (v.length !== 11) {
			this._errorCodes.add(ErrorCode.TCKN_INVALID_LENGTH);
		}

		if (v[0] === '0') {
			this._errorCodes.add(ErrorCode.TCKN_INVALID_FIRST_DIGIT);
		}

		if (!/^\d+$/.test(v)) {
			this._errorCodes.add(ErrorCode.TCKN_INVALID_FORMAT);
		}

		// Biçim hataları varsa kontrolü durdur
		if (this._errorCodes.size > 0) {
			this._valid = false;
			return this._valid;
		}

		const digits = [...v].map(Number);

		// Tüm basamakların aynı sayıdan oluştuğu TC numaraları (örn. 11111111111)
		const allSameNumbers = digits.every(d => d === digits[0]);
		if (allSameNumbers) {
			this._errorCodes.add(ErrorCode.TCKN_ALL_SAME_NUMBERS);
		}

		// Kontrol basamaklarının doğrulanması

		// 10. hane testi.
		// TCKN'nin 1, 3, 5, 7 ve 9. hanelerinin toplamının 7 katından
		// 2, 4, 6, 8. hanelerin toplamı çıkarılıp sonucun birler basamağı alındığında TCKN'nin 10. basamağı bulunur
		// Doğrulanması istenen TCKN'deki 10. basamağın bu hesaplamanın sonucuyla tuttuğunu kontrol edelim.
		const calculatedTenth =
			(((digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7)
            - (digits[1] + digits[3] + digits[5] + digits[7])) % 10;

		if (digits[9] !== calculatedTenth) {
			this._errorCodes.add(ErrorCode.TCKN_INVALID_CHECKSUM);
		}

		// 11. hane testi: TCKN'nin 11. hanesi, ilk 10 hanenin toplamının birler basamağına eşit olmalıdır.
		const firstTenSum = digits.slice(0, 10).reduce((a, b) => a + b, 0);

		if (digits[10] !== firstTenSum % 10) {
			this._errorCodes.add(ErrorCode.TCKN_INVALID_CHECKSUM);
		}

		this._valid = this._errorCodes.size === 0;
		return this._valid;
	}

	/**
	 * Doğrulama hatalarını çevirisi yapılmış mesajlar olarak döndür.
	 *
	 * @returns Hata mesajlarını içeren bir array
	 */
	getErrors(): string[] {
		if (this._valid === null) {
			this.isValid();
		}
		return getMessages([...this._errorCodes]);
	}

	/**
	 * Doğrulama hata kodlarını döndürür.
	 *
	 * @returns Hata kodlarını içeren bir array
	 */
	getErrorCodes(): ErrorCode[] {
		if (this._valid === null) {
			this.isValid();
		}
		return [...this._errorCodes];
	}

	/**
	 * TCKN değerini döndürür.
	 *
	 * @returns TCKN’nin string biçiminde değeri
	 */
	getValue(): string {
		return this.value;
	}

	/**
	 * Ayrıntılı doğrulama sonucunu döndürür.
	 *
	 * @returns Geçerlilik durumu (`valid`) ve hata mesajlarını (`errors`) içeren bir ValidationResult
	 */
	getValidationResult(): ValidationResult {
		return {
			valid: this.isValid(),
			errors: this.getErrors(),
		};
	}
}
