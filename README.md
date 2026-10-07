# IHC Member Dashboard

Dashboard member dummy untuk Indonesia Hospitality Community. Dibangun sebagai static web app responsif dengan kartu membership interaktif, pencarian benefit, ringkasan poin, mitra, dan aktivitas.

## Menjalankan lokal

```bash
npm run dev
```

## Build

```bash
npm run build
```

Hasil build berada di folder `dist/`.

## Deploy ke Cloudflare Pages

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js version: `20` atau lebih baru

`wrangler.jsonc` sudah menentukan compatibility date dan output directory. Folder `functions/` berisi middleware yang dijalankan di Cloudflare edge untuk security headers dan cache aset statis.

## Popup akses Askara

Website menampilkan popup akses dan memburamkan konten saat pengunjung membuka
sesi yang belum terverifikasi. Pengunjung dapat menghubungi WhatsApp
`085815999953` atau memasukkan kode `askaraindonesia2026` untuk membuka website.
Browser mempertahankan akses selama sesi tab yang sama, termasuk setelah refresh.
Tombol Escape dan klik di luar popup tidak menutup kunci akses.

Popup ini memberi kunci antarmuka pada browser, bukan autentikasi server.
Pengunjung teknis dapat membaca kode dalam JavaScript. Popup tidak melindungi
aset publik atau endpoint API.
