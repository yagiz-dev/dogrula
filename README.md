# Doğrula

**TC Kimlik Numarası (TCKN) doğrulayan basit ve bir npm kütüphanesi.**

[`dogrula`](https://npmjs.com/package/dogrula), Türkiye Cumhuriyeti Kimlik Numaralarının biçimsel ve matematiksel geçerliliğini ek bir kütüphane kullanmadan kontrol eder.
Uzunluk, format, ilk hane ve kontrol basamakları (10. ve 11. haneler) denetlenir.

⚠️ Bu kütüphane sadece algoritmik kontroller uygular. Algoritmadan geçen sahte TCKN'ler üretilebilir. Resmi doğrulama için Nüfus ve Vatandaşlık İşlerine başvurulmalıdır.

İleride kütüphaneye vergi numarası, posta kodu, IBAN, telefon numarası gibi diğer numaraların da doğrulayıcıları eklenecektir.

## Yapılan kontroller

* TCKN 11 basamaklı bir sayı olmalıdır
* TCKN tamamı aynı rakamdan oluşan bir sayı olmamalıdır (örn. 11111111111)
* TCKN 0 ile başlayamaz
* TCKN'nin 1, 3, 5, 7 ve 9. hanelerinin toplamının 7 katından 2, 4, 6, 8. hanelerin toplamı çıkarılıp sonucun birler basamağı alındığında TCKN'nin 10. basamağı bulunmalıdır
* TCKN'nin ilk 10 basamağının toplamının birler basamağı alındığında TCKN'nin 11. basamağı bulunmalıdır

## Özellikler

* TypeScript desteği
* Türkçe ve İngilizce hata mesajları
* Ek kütüphane kullanımı yok

## Kurulum

```bash
npm install dogrula
```

## Örnekler

### Basit kullanım

```js
const { TCKN } = require("dogrula");

const tc = new TCKN("10000000146");

if (tc.isValid()) {
  console.log("TCKN geçerli");
} else {
  console.error("TCKN geçersiz!");
  console.log(tc.getErrors()); // ["TCKN 11 basamaklı olmalıdır", "TCKN doğrulama algoritması başarısız oldu", vb.]
}
```

### TypeScript

```ts
import { TCKN, ValidationResult } from 'dogrula';

const tc: TCKN = new TCKN("10000000146");

if (tc.isValid()) {
    console.log("TCKN geçerli");
} else {
    console.error("TCKN geçersiz!");
    console.log(tc.getErrors()); // ["TCKN 11 basamaklı olmalıdır", "TCKN doğrulama algoritması başarısız oldu", vb.]
}
```

### İngilizce hata mesajları

```js
const { TCKN, setLocale, getLocale, ErrorCode } = require("dogrula");

const tc = new TCKN("10000000146");

console.log("Seçili dil: ", getLocale()); // Varsayılan olarak Türkçe seçilir

setLocale("en"); // Dili İngilizce yapar. Desteklenen değerler: 'tr', 'en'

if (tc.isValid()) {
    console.log("TCKN geçerli");
} else {
    console.error("TCKN geçersiz!");
    console.log(tc.getErrors()); // ["TCKN must be 11 digits", "TCKN validation algorithm failed", vb.]
}
```

## Bana ulaşın

Sorular, hata bildirimleri veya öneriler için bana ulaşabilirsiniz.

* Twitter: [@yagiz_dev](https://x.com/yagiz_dev)
* Eposta: hi@yagiz.dev

## Lisans

MIT © 2025 [Yağızhan Burak Yakar](https://yagiz.dev)