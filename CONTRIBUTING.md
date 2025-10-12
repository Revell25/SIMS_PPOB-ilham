# Contributing

Terima kasih sudah ingin berkontribusi! Berikut panduan singkat agar prosesnya lancar.

## Alur Kerja
- Fork repository ini dan buat branch dari `main`.
- Gunakan nama branch yang deskriptif, mis. `feat/topup-validation` atau `fix/profile-image-size`.
- Pastikan perubahan fokus pada satu hal dan kecil jika memungkinkan.

## Setup Lokal
- Node.js >= 18 dan npm >= 9.
- Install dependency: `npm install`
- Jalankan dev server: `npm run dev`
- Lint: `npm run lint`

## Gaya Kode
- Ikuti konfigurasi ESLint yang ada.
- Hindari komentar berlebihan dan dead code.
- Konsisten dengan pola folder: `features/`, `services/`, `lib/`, `components/`.

## Commit & PR
- Tulis pesan commit yang jelas (imperative), contoh: `feat: add topup quick amounts`.
- Tambahkan deskripsi PR dengan ringkas: motivasi, perubahan utama, cara uji.
- Sertakan screenshot bila mengubah UI.

## Environment
- Jangan commit `.env.local`. Gunakan `.env.example` sebagai referensi.
- Default API: `https://take-home-test-api.nutech-integrasi.com`.

## Testing Manual
- Registrasi → Login → Dashboard memuat profil/saldo/banner/layanan.
- Top up minimal Rp10.000 berhasil dan saldo bertambah.
- Transaksi layanan menampilkan invoice ringkas dan mengurangi saldo.
- Upload foto profil gagal bila > 100 KB.

Terima kasih untuk kontribusinya! 🙌
