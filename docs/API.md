# API Endpoints

Base URL: `VITE_API_BASE_URL` (default `https://take-home-test-api.nutech-integrasi.com`)

## Auth
- `POST /registration` — registrasi pengguna baru
  - Body: `{ email, first_name, last_name, password }`
- `POST /login` — login dan memperoleh JWT
  - Body: `{ email, password }`
  - Response: `{ data: { token: string }, message, status }`

## Profile
- `GET /profile` — mendapatkan profil saat ini
- `PUT /profile/update` — update `first_name`, `last_name`
  - Body: `{ first_name, last_name }`
- `PUT /profile/image` — update foto profil
  - Multipart Form: `file` (<= 100 KB)

## Balance
- `GET /balance` — saldo terkini
- `POST /topup` — top up saldo
  - Body: `{ top_up_amount: number }`

## Catalog
- `GET /services` — daftar layanan PPOB
- `GET /banner` — daftar banner/promo

## Transactions
- `POST /transaction` — buat transaksi pembayaran
  - Body: `{ service_code: string }`
- `GET /transaction/history` — riwayat transaksi
  - Query: `limit?: number`, `offset?: number` (atau sesuai API)

---

# Response Wrapper & Error Handling

Aplikasi membungkus response Axios melalui helper:
- `unwrapResponse(response)` — mengembalikan `response.data`.
- `getErrorMessage(error, fallback)` — mengambil `error.response.data.message` bila ada.

Interceptors:
- Request menambahkan header `Authorization: Bearer <token>` bila token tersimpan.
- Response pada `401` akan menghapus token dari storage dan memaksa sesi berakhir (pengguna kembali ke login).

Contoh pola penggunaan di service:
```js
const response = await httpClient.post('/topup', { top_up_amount: amount })
return unwrapResponse(response)
```

Catatan: Skema tepat field response mengikuti API resmi. Jika endpoint berubah atau menambah parameter, perbarui file ini dan service terkait.
