# Aplikasi Distribusi Frekuensi Data Numerik

Proyek ini merupakan website yang dibuat untuk memenuhi Tugas Proyek Kelompok mata kuliah **Algoritma dan Pemrograman** dengan topik **Distribusi Frekuensi pada Statistika**.

Fokus utama proyek ini adalah **implementasi algoritma distribusi frekuensi secara jelas, sistematis, dan mudah dijelaskan**.

## Tujuan Proyek

Tujuan utama pengembangan aplikasi ini adalah:

* Menerapkan konsep **distribusi frekuensi** pada statistika dasar
* Mengimplementasikan algoritma ke dalam **program nyata**
* Menyajikan **alur logika program** yang dapat dipahami dan dipresentasikan

## Konsep yang Diimplementasikan

Aplikasi ini mengolah **data numerik (≥ 30 data)** untuk menghasilkan **tabel distribusi frekuensi** melalui tahapan berikut:

1. Input dan validasi data
2. Menentukan jumlah data (n)
3. Menentukan nilai minimum dan maksimum
4. Menghitung rentang data
5. Menentukan jumlah kelas (aturan Sturges)
6. Menghitung interval kelas
7. Membentuk kelas dan menghitung frekuensi
8. Menampilkan tabel distribusi frekuensi
9. Memberikan interpretasi hasil sederhana

## Instalasi

1. Clone repositori ke lokal
    ```sh
    git clone https://github.com/Realitaa/freq-distribution.git
    ```

2. Jalankan menggunakan Live Server atau akses file `index.html` di browser.

Juga tersedia di Github Pages: https://realitaa.github.io/freq-distribution/

## Gambaran Umum Aplikasi

Alur aplikasi dari sudut pandang pengguna:

1. **Landing Page**

   * Judul dan deskripsi proyek
   * Tombol menuju Playground dan Import Data

2. **Playground Input Data**

   * Input manual (textarea)
   * Import file (.txt / .csv)
   * Dataset contoh

3. **Validasi Data**

   * Minimal 30 data numerik
   * Menampilkan pesan kesalahan jika tidak valid

4. **Proses Algoritma**

   * Analisis data awal
   * Perhitungan jumlah kelas
   * Perhitungan interval
   * Pembentukan kelas
   * Penghitungan frekuensi

5. **Output Utama**

   * Tabel distribusi frekuensi
   * Interpretasi hasil

6. **Aksi Akhir**

   * Reset playground

## Teknologi yang Digunakan

### Teknologi Utama

* **HTML5** – Struktur halaman
* **CSS3 + Bootstrap 5 (CDN) + Icons** – Layout dan komponen UI
* **JavaScript** – Logika aplikasi dan algoritma
* **Alpine.js** – Reaktivitas UI sederhana (state & validasi)

## Struktur Folder Proyek

```
freq-distribution
├── index.html
├── css/
│   └── main.css
├── js/
│   ├── app.js              # Controller utama aplikasi (SPA)
│   │
│   ├── algorithm/
│   │   ├── frequency.js    # Algoritma distribusi frekuensi
│   │   └── statistics.js   # Fungsi statistik dasar
│   │
│   ├── input/
│   │   ├── parser.js       # Parsing input teks & CSV
│   │   └── validator.js    # Validasi data numerik
│   │
│   ├── ui/
│   │   └── notification.js # Notifikasi dalam bentuk Toast
│   │
│   └── utils/
│       └── constants.js    # Konstanta aplikasi
│
└── data/
    |── sample-dataset.js   # Dataset contoh, terdapat juga beberapa data contoh lainnya
    └── credits.md          # Kredit sumber data
```
