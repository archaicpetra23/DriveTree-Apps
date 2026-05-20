# 🌳 DriveTree

**DriveTree** adalah aplikasi simulasi manajemen direktori file (*File Directory Manager*) yang dibangun menggunakan struktur data inti **Binary Search Tree (BST)** yang dibuat secara manual (tanpa library eksternal untuk struktur datanya). Aplikasi ini memisahkan logika *backend* dan *frontend* menggunakan arsitektur modern.

![DriveTree Preview](./docs/preview.png) *(Catatan: Tambahkan gambar preview jika ada)*

## 🚀 Fitur Utama

- **Custom BST Engine:** Seluruh operasi penambahan, pencarian, dan penghapusan file menggunakan struktur data Binary Search Tree murni.
- **Interactive Visualization:** Menampilkan bentuk Tree secara grafis dengan algoritma *In-order Layout* sehingga node tidak bertabrakan, mendukung *Zoom & Pan*.
- **Search Path Tracking:** Melacak dan memvisualisasikan jalur pencarian secara langsung saat pengguna mencari file.
- **Tree Traversals:** Menjalankan operasi penelusuran (In-Order, Pre-Order, Post-Order) beserta riwayat langkah-langkahnya.
- **Modern UI/UX:** Antarmuka bersih, mulus, dan responsif dengan micro-animations.

## 🛠️ Tech Stack

DriveTree dibangun menggunakan kombinasi framework modern:

*   **Frontend:** [Next.js](https://nextjs.org/) (React), TypeScript, Tailwind CSS
*   **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python), Uvicorn
*   **Storage:** Local JSON file untuk persistensi data secara sederhana

## 📂 Struktur Repositori

Proyek ini dibagi menjadi dua bagian utama:

- [`/backend`](./backend/README.md) - Berisi server FastAPI dan algoritma Binary Search Tree.
- [`/frontend`](./frontend/README.md) - Berisi aplikasi web Next.js dan komponen antarmuka.

Silakan klik masing-masing tautan di atas untuk melihat instruksi instalasi dan penjelasan mendalam untuk setiap bagian.

## 🏃‍♂️ Cara Menjalankan Proyek (Quick Start)

Untuk menjalankan seluruh aplikasi secara lokal, ikuti langkah-langkah berikut:

### 1. Jalankan Backend
Buka terminal dan arahkan ke folder `backend`:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # (atau venv\Scripts\activate untuk Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
*API sekarang berjalan di `http://localhost:8000`*

### 2. Jalankan Frontend
Buka terminal baru dan arahkan ke folder `frontend`:
```bash
cd frontend
npm install
npm run dev
```
*Aplikasi web sekarang dapat diakses di `http://localhost:3000`*

## 📝 Lisensi
Dibuat sebagai bagian dari Final Project / Tugas Data Structures.
