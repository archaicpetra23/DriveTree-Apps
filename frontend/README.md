# 🌳 DriveTree - Frontend App

Bagian ini adalah antarmuka interaktif pengguna (UI) dari aplikasi DriveTree. Dibangun menggunakan **Next.js**, **React**, dan **Tailwind CSS**. Frontend ini berkomunikasi langsung dengan REST API Backend untuk memvisualisasikan bagaimana Binary Search Tree bekerja di balik layar.

## ✨ Fitur Unggulan Antarmuka

- **Tree Visualizer Berbasis SVG:**
  Sebuah kanvas interaktif (`TreeVisualizer.tsx`) yang menggambar struktur BST menggunakan algoritma *In-order Tree Layout*. Node dijamin tidak akan pernah bertabrakan satu sama lain meskipun pohon memiliki tingkat (kedalaman) yang sangat tinggi. Termasuk fitur *Pan & Zoom*.
- **Iconography Dinamis:**
  Tidak lagi menggunakan emoji, setiap tipe file direpresentasikan oleh logo **SVG** khusus (PDF, MP4, MP3, ZIP, dll) lengkap dengan palet warna yang kohesif.
- **Desain Responsif & Modern:**
  Menggunakan pendekatan *glassmorphism*, gradient halus, animasi transisi, dan indikator status interaktif yang di-styling secara rapi menggunakan Tailwind CSS.
- **Animasi Pencarian (Search Path):**
  Saat pengguna melakukan pencarian, setiap node yang dilewati (*traversed*) akan disorot menyala berwarna hijau (emerald) untuk mendemonstrasikan algoritma *Binary Search*.

## 🏗️ Struktur Komponen

Sebagian besar tampilan logika diatur di dalam `src/components/`:
- `TreeVisualizer.tsx`: Kanvas kanvas penggambaran grafik node/tree (Fitur inti visual).
- `FileSearch.tsx`: Komponen input pencarian yang meng-handle pencarian di dalam Tree tanpa me-refresh halaman.
- `FileForm.tsx`: Form interaktif untuk menambah node baru ke dalam Tree.
- `TraversalPanel.tsx`: Komponen untuk men-simulasikan algoritma In-order, Pre-order, Post-order.
- `FileTypeIcon.tsx`: Komponen terpusat yang merender elemen SVG berdasarkan kategori ekstensi file.

## 🚀 Instalasi & Menjalankan Development Server

1. Pastikan **Node.js** v18+ sudah terinstal di sistem Anda.
2. Buka terminal di dalam direktori `frontend/`.
3. Instal semua dependencies NPM:
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000` (atau `http://localhost:3001` jika port 3000 terpakai) di *browser* Anda.

> **Peringatan:** Agar seluruh fungsionalitas berjalan normal, pastikan server FastAPI (Backend) juga sedang berjalan di `http://localhost:8000`. Jika port berbeda, pastikan Anda mengubah pengaturan API URL di dalam file konfigurasi atau helper. Backend telah dikonfigurasi secara default untuk menerima request CORS dari port `3000` dan `3001`.
