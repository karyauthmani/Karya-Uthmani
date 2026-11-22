# Koleksi Buku Uthmani — Ringkasan Landing Page

## Tujuan

Landing page ini berfungsi sebagai katalog maklumat untuk koleksi buku Uthmani. Ia tidak memproses bayaran, menyimpan maklumat pelanggan atau mengendalikan checkout automatik.

Matlamatnya ialah membawa pembaca kepada perbualan WhatsApp yang lebih tersusun sebelum tempahan disahkan.

## Koleksi buku

| Bil. | Judul | Terbitan | Ringkasan fungsi |
|---:|---|---|---|
| 1 | Nota Mudah Makhraj & Sifat Huruf berserta Gambar | Mei 2022 | Rujukan visual bagi asas makhraj dan sifat huruf. |
| 2 | Kesimpulan Makhraj & Sifat Huruf berserta Latihan | Ogos 2024 | Naskhah latihan untuk mengukuhkan pemahaman makhraj dan sifat huruf. |
| 3 | Terjemahan Tajwid al-Nasyr Ibn al-Jazari | November 2025 | Terjemahan karya tajwid untuk pembaca Melayu yang ingin mendekati khazanah ilmu qiraat. |
| 4 | Akhlak Pendukung al-Quran | November 2026 | Terjemahan karya Imam Abu Bakr al-Ajurri berkaitan akhlak para pendukung al-Quran. |

## Aliran tempahan dicadangkan

```text
Pelanggan lihat katalog
        ↓
Tekan “Tanya & tempah”
        ↓
WhatsApp dibuka dengan judul buku siap diisi
        ↓
Penerbit sahkan stok, alamat dan kos penghantaran
        ↓
Penerbit beri jumlah akhir + QR DuitNow
        ↓
Pelanggan bayar dan menghantar bukti bayaran di WhatsApp
        ↓
Pesanan direkod dan diproses melalui EasyParcel / pickup
```

## Mengapa QR diberi selepas pengesahan

- Kos penghantaran berubah berdasarkan alamat, berat dan jumlah buku.
- Stok semasa dapat diperiksa sebelum pelanggan membuat bayaran.
- Jumlah bayaran lebih tepat dan lebih mudah disemak.
- Tiada butiran kad atau maklumat pembayaran sensitif perlu dikumpulkan oleh landing page.

## Fungsi pada landing page

- Paparan semua empat buku dalam satu katalog.
- Butang tempahan khusus untuk setiap buku.
- Butang pertanyaan untuk pakej koleksi empat buku.
- Mesej WhatsApp automatik yang menyatakan buku dipilih.
- Penerangan tiga langkah: pilih → sahkan → bayar QR.
- Mod terang dan gelap.
- Reka bentuk responsif untuk telefon, tablet dan desktop.

## Maklumat yang masih perlu diberikan

1. Nombor WhatsApp penerbit dalam format antarabangsa, contoh: `6012XXXXXXX`.
2. Harga biasa dan harga promosi bagi setiap buku.
3. Harga pakej empat buku, jika ada.
4. Status stok semasa.
5. Imej kulit buku sebenar bagi setiap judul.
6. QR DuitNow penerbit (digunakan selepas pesanan disahkan).
7. Maklumat penghantaran: pilihan courier, kadar atau kaedah pengiraan kos pos.
8. Polisi ringkas mengenai tempoh pengeposan, pertukaran dan pemulangan.

## Nota keselamatan data

- Landing page tidak mengumpul maklumat kad bank atau menjalankan pembayaran terus.
- Maklumat pelanggan hanya diterima melalui WhatsApp selepas mereka sendiri memulakan pertanyaan.
- QR DuitNow dikongsi hanya selepas jumlah pesanan dan kos penghantaran disahkan.
- Jika rekod pesanan dibuat dalam Google Sheets, akses perlu dihadkan kepada pemilik dan staf yang berkaitan sahaja.

## Status semasa

Landing page contoh telah diterbitkan secara peribadi:

<https://akhlak-pendukung-al-quran.albantinji.chatgpt.site>

Butang WhatsApp masih dalam mod demo sehingga nombor WhatsApp penerbit dimasukkan.
