/*
 * PROMOSI UTHMANI
 * Tambah satu objek bagi setiap kempen. Tukar enabled kepada true untuk siar.
 * Tiada kempen aktif sehingga tawaran sebenar dimasukkan oleh penerbit.
 * Tarikh menggunakan waktu Malaysia (+08:00). Kempen tamat tepat pada endsAt.
 * startsAt / endsAt: null bermaksud tiada had tarikh berkenaan.
 * bookIds: ['nota'], ['latihan'], ['tajwid'], ['akhlak'], atau beberapa ID.
 * bookIds: [] bermaksud promosi umum untuk seluruh koleksi.
 * order: salah satu ID buku, 'pakej', atau 'pertanyaan'.
 * Harga dan syarat ditulis dalam offer / terms; tiada bayaran automatik.
 * Salin objek contoh ini dengan id yang unik untuk menambah kempen lain.
 */
const PROMOTIONS = [
  {
    id: 'contoh-kempen',
    enabled: false,
    title: 'Nama kempen anda',
    description: 'Masukkan penerangan promosi yang telah disahkan.',
    offer: 'Masukkan harga atau tawaran sebenar.',
    terms: 'Nyatakan syarat, stok dan kos penghantaran yang berkenaan.',
    startsAt: null,
    endsAt: null,
    bookIds: [],
    order: 'pakej'
  }
];
