# PETABACA

**Petualangan Cepat Bisa Membaca**

**Versi 3.0**

PETABACA adalah aplikasi web pembelajaran membaca interaktif untuk anak SD kelas awal, khususnya anak yang masih pemula atau belum lancar membaca. Aplikasi ini membantu anak belajar secara bertahap melalui kegiatan melihat, mendengar, memilih, menyusun, membaca, dan memahami bacaan pendek.

Alur belajar utama:

```text
Hutan Huruf -> Gua Bunyi -> Rumah Suku Kata -> Kereta Kata -> Istana Kalimat -> Pulau Cerita
```

Link aplikasi:

```text
https://splendorous-selkie-a6bf9c.netlify.app/
```

---

## Pembaruan Versi 3.0

- Alur belajar dibuat lebih ramah untuk anak pemula.
- **Hutan Huruf** disederhanakan agar anak fokus pada gambar, audio, dan pilihan huruf.
- Ditambahkan latihan **huruf mirip** dengan tombol audio **Cari huruf**.
- **Gua Bunyi** diperbaiki agar tidak menampilkan petunjuk jawaban di layar.
- Materi **Gua Bunyi** diperbanyak menjadi 20 latihan suku kata.
- **Rumah Suku Kata** dibuat lebih ringan dengan kumpulan suku kata awal.
- **Kereta Kata** diperbanyak dengan 10 kata baru.
- Ikon **MEJA** dibuat khusus menggunakan CSS agar tidak lagi memakai ikon kursi.
- **Pulau Cerita** kini memiliki 3 cerita pendek dan tombol **Cerita Berikutnya**.
- **Mode Guru/Orang Tua** ditingkatkan dengan laporan kemampuan dan item yang perlu diulang.
- Progress mencatat area belajar, jawaban benar, percobaan, item yang salah, dan pola kesalahan.
- Aturan bintang diperbaiki: bintang hanya bertambah untuk jawaban benar pada tombol/soal yang belum pernah mendapat bintang.
- Mini game **Tangkap Huruf** dibuat bergerak dan skor tidak bertambah dari tombol yang sama berulang kali.

---

## Fitur Utama

- Beranda dengan tombol **Mulai Petualangan** dan **LATIHAN 5 MENIT**.
- Peta belajar dengan 6 petualangan: Hutan Huruf, Gua Bunyi, Rumah Suku Kata, Kereta Kata, Istana Kalimat, dan Pulau Cerita.
- Latihan huruf vokal, huruf keluarga, dan huruf mirip.
- Latihan bunyi huruf dan gabungan suku kata berbasis audio lokal.
- Latihan membaca suku kata dan kata sederhana.
- Latihan menyusun kata dengan model gerbong Kereta Kata.
- Latihan membaca kalimat pendek dengan highlight kata.
- Cerita pendek dengan soal pemahaman.
- Mini game **Tangkap Huruf** dan **Susun Kata**.
- Halaman **Perkembanganku** untuk melihat bintang, lencana, persentase keberhasilan, dan kemampuan per area.
- **Mode Guru/Orang Tua** untuk melihat rekomendasi latihan dan diagnosis kesalahan.
- Progress tersimpan otomatis di browser menggunakan LocalStorage.

---

## Materi Versi 3.0

### Hutan Huruf

- Fokus awal: A, I, U, E, O.
- Huruf keluarga: M, P, B, S, K.
- Huruf mirip: B-D-P, M-N-W, U-V-Y.
- Tombol audio **Cari huruf** memutar instruksi dan bunyi huruf target.

### Gua Bunyi

Materi Gua Bunyi berisi 20 latihan:

```text
MA, PA, BA, SU, KU,
DI, DU, LA, LI, TO,
NA, NI, RO, SA, TA,
BI, KA, MI, PU, GA
```

Tombol **Dengarkan** memutar audio huruf pertama, huruf kedua, lalu hasil gabungan suku kata.

### Rumah Suku Kata

Materi awal suku kata:

```text
MA MI MU
PA PI PU
BA BI BU
SA SI SU
KA KI KU
```

### Kereta Kata

Materi kata meliputi:

```text
MAMA, PAPA, BOLA, BUKU, SAPI, KUDA,
MATA, ROTI, BUDI, SUSU, MEJA, TOPI,
KAKI, GIGI, KOPI, NASI, RODA, FOTO,
DADU, JARI, CERI, GULA
```

### Pulau Cerita

Cerita yang tersedia:

```text
Mimi dan Bola
Dina dan Kaki
Raka Makan Nasi
```

Setiap cerita memiliki kalimat pendek dan pertanyaan pemahaman sederhana.

---

## Cara Membuka Aplikasi Online

1. Buka browser seperti Chrome, Edge, Firefox, atau Safari.
2. Masukkan alamat:

   ```text
   https://splendorous-selkie-a6bf9c.netlify.app/
   ```

3. Tunggu sampai halaman PETABACA tampil.
4. Klik **Mulai Petualangan** untuk belajar dari peta level.
5. Klik **LATIHAN 5 MENIT** untuk latihan singkat.

---

## Cara Menjalankan dari File Lokal

Aplikasi ini adalah web statis. Tidak perlu instal dependency atau menjalankan build.

1. Buka folder proyek.
2. Buka file `index.html` di browser.
3. Jika audio tidak berjalan saat dibuka langsung dari file, jalankan lewat server lokal seperti XAMPP/Apache.

Contoh jika proyek berada di `htdocs`:

```text
http://localhost/petabaca/
```

---

## Cara Menggunakan untuk Siswa

1. Buka halaman utama.
2. Klik **Mulai Petualangan**.
3. Ikuti peta belajar dari Hutan Huruf sampai Pulau Cerita.
4. Tekan tombol audio sebelum memilih jawaban.
5. Pilih jawaban atau susun bagian kata sesuai instruksi di layar.
6. Buka **Perkembanganku** untuk melihat bintang dan lencana.

Untuk anak pemula, guru/orang tua disarankan mendampingi dengan pola:

```text
Dengarkan -> Ucapkan -> Pilih -> Ulangi
```

---

## Mode Guru/Orang Tua

Mode ini membantu guru atau orang tua memantau latihan siswa.

Yang dapat dilihat:

- Nama siswa.
- Jumlah latihan.
- Jumlah jawaban benar.
- Persentase keberhasilan.
- Jumlah bintang.
- Peta kemampuan per area belajar.
- Materi yang sudah dikuasai.
- Area yang perlu dilatih lebih dulu.
- Rekomendasi guru.
- Item yang perlu diulang berdasarkan pola kesalahan.

Nama siswa dapat diubah dari halaman **Mode Guru/Orang Tua** dengan mengisi kolom nama lalu menekan **Simpan Nama**.

---

## Aturan Bintang dan Progress

Bintang diberikan sebagai penguatan positif. Pada versi 3.0, aturan bintang diperbaiki:

- Jawaban benar mendapat bintang.
- Jawaban salah tidak mendapat bintang.
- Tombol/soal benar yang sama tidak menambah bintang berulang kali.
- Tombol benar yang berbeda tetap dapat memberi bintang.
- Progress tetap mencatat percobaan dan jawaban untuk kebutuhan diagnosis.

Progress disimpan otomatis di browser menggunakan LocalStorage dengan key:

```text
petualanganCepatBacaProgress
```

Data yang disimpan meliputi:

- Nama siswa.
- Jumlah bintang.
- Jumlah latihan.
- Jumlah jawaban benar.
- Level terakhir.
- Nilai kemampuan per area belajar.
- Percobaan per area.
- Jawaban benar per area.
- Statistik item yang dikerjakan.
- Riwayat reward agar bintang tidak berulang dari tombol yang sama.
- Lencana.
- Pengaturan suara.

Catatan: Jika data/cache browser dihapus, progress belajar juga dapat hilang.

---

## Catatan Audio

Audio aplikasi berada di folder:

```text
src/assets/audio/
```

Jika suara belum terdengar:

1. Pastikan volume perangkat aktif.
2. Pastikan pengaturan suara aplikasi aktif.
3. Klik tombol audio setelah halaman selesai terbuka.
4. Coba gunakan browser Chrome atau Edge.
5. Jika membuka dari file lokal bermasalah, akses aplikasi lewat server lokal.

Aplikasi tetap dapat digunakan walaupun audio tidak aktif, tetapi untuk anak pemula audio sangat disarankan.

---

## Struktur Folder

```text
petabaca/
├── index.html
├── README.md
└── src/
    ├── main.js
    ├── assets/
    │   ├── audio/
    │   └── images/
    ├── components/
    │   └── ui.js
    ├── data/
    │   └── learningData.js
    ├── logic/
    │   ├── audio.js
    │   └── progress.js
    ├── pages/
    │   ├── games.js
    │   ├── home.js
    │   ├── letters.js
    │   ├── map.js
    │   ├── progressPage.js
    │   ├── quick.js
    │   ├── sentences.js
    │   ├── sounds.js
    │   ├── story.js
    │   ├── syllables.js
    │   ├── teacher.js
    │   └── words.js
    └── styles/
        └── main.css
```

---

## Mengubah atau Menambah Materi

Materi pembelajaran utama berada di:

```text
src/data/learningData.js
```

Materi khusus Gua Bunyi berada di:

```text
src/pages/sounds.js
```

Di `learningData.js`, pengembang dapat mengubah atau menambah:

- Label kemampuan.
- Jalur belajar pemula.
- Kelompok huruf.
- Huruf mirip.
- Daftar huruf dan contoh kata.
- Daftar suku kata.
- Kata sederhana.
- Kalimat pendek dan pertanyaan.
- Cerita pendek dan soal pemahaman.
- Lencana.

Contoh data kata:

```javascript
{
  word: "BOLA",
  parts: ["BO", "LA"],
  image: "⚽",
  meaning: "bola"
}
```

Contoh data cerita:

```javascript
{
  title: "Dina dan Kaki",
  image: "👧🦶",
  parts: ["Dina cuci kaki.", "Kaki Dina bersih."],
  questions: [
    { q: "Apa yang dicuci Dina?", choices: ["Kaki", "Gigi", "Buku"], answer: "Kaki" }
  ]
}
```

Contoh materi Gua Bunyi di `sounds.js`:

```javascript
["M", "A", "MA", ["MA", "MI", "MU"], "Dengarkan bunyi awal /m/, lalu sambung A."]
```

Jika menambah audio baru, simpan file audio di `src/assets/audio/` dan gunakan nama file huruf/suku kata/kata dengan huruf kecil, misalnya:

```text
ma.mp3
kaki.mp3
cari-huruf.mp3
```

---

## Pemeriksaan JavaScript

Jika Node.js sudah tersedia di komputer, sintaks file JavaScript dapat diperiksa dengan:

```powershell
Get-ChildItem src -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
```

Jika perintah `node` belum tersedia, instal Node.js LTS dari situs resmi Node.js dan pastikan opsi **Add to PATH** aktif saat instalasi.

---

## Teknologi

- HTML
- CSS
- JavaScript module
- LocalStorage
- Audio lokal berbasis file `.mp3`

---

## Kontributor

© 2026 | Kontributor: ROJALI, S.Pd.
