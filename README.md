# SIMS_PPOB-ilham

Aplikasi web untuk kebutuhan take home test SIMS PPOB. Project ini dibangun dengan React + Vite dan mengikuti requirement yang diberikan (registrasi, login, top up, pembayaran, riwayat transaksi, dsb) menggunakan API `https://take-home-test-api.nutech-integrasi.com`.

## Ringkasan Fitur

- Autentikasi lengkap: registrasi, login, penyimpanan token JWT di localStorage, proteksi rute, dan sesi otomatis berakhir saat token tidak valid.
- Dashboard beranda: menampilkan sapaan pengguna, saldo dengan opsi sembunyi/tampilkan, daftar layanan PPOB, promo/banner, serta ringkasan riwayat transaksi.
- Manajemen profil: lihat data profil, ubah nama depan/belakang, unggah foto profil (validasi ukuran 100 KB), dan pemberitahuan via toast.
- Top up saldo: pilih nominal cepat atau input manual, validasi Zod (minimal Rp10.000), update saldo dan riwayat setelah sukses.
- Pembayaran layanan: pilih layanan dari katalog, proses transaksi dan tampilkan ringkasan invoice.
- Riwayat transaksi: tabel transaksi dengan limit dinamis, dukungan refresh, serta format tanggal & nominal Rupiah.
- Notifikasi realtime: menggunakan `react-hot-toast` untuk menampilkan keberhasilan atau kegagalan dari setiap aksi API.

## Alur Utama Aplikasi

1. Masuk/Daftar
   - Pengguna membuat akun melalui halaman registrasi (validasi Zod + React Hook Form).
   - Login menyimpan token JWT ke localStorage dan menginisialisasi state global Redux.

2. Inisialisasi Dashboard
   - Setelah login, aplikasi otomatis memuat profil, saldo, layanan, banner, dan riwayat transaksi melalui thunk Redux.
   - Seluruh data disimpan di Redux Toolkit agar mudah diakses antar-halaman.

3. Top up
   - Pilih nominal cepat atau input manual -> submit -> panggil API `/topup` -> saldo dan riwayat diperbarui.

4. Pembayaran Layanan
   - Pilih layanan dari grid atau dari query string -> submit -> API `/transaction` -> tampilkan invoice terakhir dan perbarui saldo/riwayat.

5. Profil
   - Halaman profil menampilkan data terkini, memungkinkan update text (`/profile/update`) dan upload foto (`/profile/image`) dengan validasi ukuran < 100 KB.

6. Riwayat
   - Halaman riwayat memanggil `/transaction/history` dengan limit yang dipilih pengguna, menampilkan transaksi top up & payment terbaru.

## Teknologi & Dependency Utama

- React 19 + Vite: framework UI & tooling cepat.
- Redux Toolkit & React Redux: manajemen state global, async thunk, dan persist token.
- React Router v6: routing SPA, termasuk guard `ProtectedRoute`.
- Axios: HTTP client dengan interceptor untuk bearer token dan handling 401.
- React Hook Form + Zod: form handling dan validasi skema.
- Tailwind CSS 3: styling cepat sesuai mockup.
- React Hot Toast: notifikasi keberhasilan/gagal.

## Struktur Direktori Inti

```
src/
- app/        # store & hooks Redux
- components/ # komponen UI & layout
- features/   # slice, thunk, schema per domain (auth, profile, balance, services, transactions)
- lib/        # helper (httpClient, format, storage)
- pages/      # halaman per route
- routes/     # RouterProvider & guard
- styles/     # (opsional) styling tambahan
```

## Variabel Lingkungan

| Nama                | Default                                            | Deskripsi                                 |
| ------------------- | -------------------------------------------------- | ----------------------------------------- |
| `VITE_API_BASE_URL` | `https://take-home-test-api.nutech-integrasi.com` | Opsional. Ubah endpoint backend bila perlu |

Jika diperlukan, buat file `.env` atau `.env.local` lalu isi:
```
VITE_API_BASE_URL=https://take-home-test-api.nutech-integrasi.com
```

Atau gunakan template: lihat `.env.example`.

## Menjalankan di Mesin Lokal / Berbeda

> Prerequisite: Node.js >= 18 (direkomendasikan Node 20 atau 22) & npm >= 9.

1. Clone repository
   ```bash
   git clone <url-repo-anda>.git
   cd SIMS_PPOB-ilham
   ```

2. Instal dependency
   ```bash
   npm install
   ```

3. Konfigurasi environment (opsional)
   - Jika backend berbeda, set `VITE_API_BASE_URL`.

4. Jalankan pengembangan
   ```bash
   npm run dev
   ```
   - Buka `http://localhost:5173`.
   - Pastikan API tersedia (konektivitas internet dibutuhkan jika memakai endpoint default).

5. Linting & build
   ```bash
   npm run lint   # menjalankan ESLint
   npm run build  # build produksi ke folder dist
   npm run preview
   ```

6. Deploy / packaging
   - Folder `dist` berisi aset siap deploy ke static hosting (Netlify, Vercel, dsb).

## Dokumentasi Tambahan

- API endpoints: lihat `docs/API.md`.
- Panduan kontribusi: lihat `CONTRIBUTING.md`.

## Screenshots

Tambahkan screenshot UI ke folder `docs/screenshots/` dan referensikan di sini. Contoh:

```
docs/screenshots/dashboard.png
docs/screenshots/topup.png
```

## Catatan Tambahan

- Interceptor Axios otomatis menghapus token saat menerima HTTP 401, sehingga pengguna diarahkan kembali ke login.
- Token disimpan di localStorage (`sims_ppob_token`); hapus manual jika ingin reset cepat.
- Form upload foto memvalidasi ukuran file di sisi klien (< 100 KB) sesuai requirement.
- Struktur kode dirancang modular agar mudah menambahkan fitur seperti notifikasi tambahan atau filter riwayat.

---

Jika Anda menemukan isu atau membutuhkan penyesuaian tambahan (mis. integrasi testing otomatis, desain responsif lanjutan), silakan buka issue atau sesuaikan langsung pada modul terkait. Selamat mengembangkan!
