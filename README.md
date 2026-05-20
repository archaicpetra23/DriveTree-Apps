# DriveTree

**DriveTree** adalah aplikasi simulasi manajemen direktori file (*File Directory Manager*) yang dibangun menggunakan struktur data inti **Binary Search Tree (BST)** yang dibuat secara manual (tanpa library eksternal untuk struktur datanya). Aplikasi ini memisahkan logika *backend* dan *frontend* menggunakan arsitektur modern.

## Fitur Utama

- **Custom BST Engine:** Seluruh operasi penambahan, pencarian, dan penghapusan file menggunakan struktur data Binary Search Tree murni.
- **Interactive Visualization:** Menampilkan bentuk Tree secara grafis dengan algoritma *In-order Layout* sehingga node tidak bertabrakan, mendukung *Zoom & Pan*.
- **Search Path Tracking:** Melacak dan memvisualisasikan jalur pencarian secara langsung saat pengguna mencari file.
- **Tree Traversals:** Menjalankan operasi penelusuran (In-Order, Pre-Order, Post-Order) beserta riwayat langkah-langkahnya.
- **Modern UI/UX:** Antarmuka bersih, mulus, dan responsif dengan micro-animations.

## Tech Stack

DriveTree dibangun menggunakan kombinasi framework modern:

*   **Frontend:** [Next.js](https://nextjs.org/) (React), TypeScript, Tailwind CSS
*   **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python), Uvicorn
*   **Storage:** Local JSON file untuk persistensi data secara sederhana

## Struktur Repositori

Proyek ini dibagi menjadi dua bagian utama:

- [`/backend`](./backend/README.md) - Berisi server FastAPI dan algoritma Binary Search Tree.
- [`/frontend`](./frontend/README.md) - Berisi aplikasi web Next.js dan komponen antarmuka.

Silakan klik masing-masing tautan di atas untuk melihat instruksi instalasi dan penjelasan mendalam untuk setiap bagian.

## 🛠️ Cara Menjalankan Proyek (Quick Start)

Untuk menjalankan seluruh aplikasi secara lokal di komputer Anda, silakan ikuti panduan langkah demi langkah di bawah ini:

### 📋 Prasyarat Sistem
Sebelum memulai, pastikan perangkat Anda telah terinstal:
*   **Python** (Minimal versi 3.10)
*   **Node.js** (Minimal versi 18)
*   **Git** (Untuk clone repositori)

---

### 🚀 Langkah 1: Jalankan Server Backend (FastAPI)

Buka terminal baru dan arahkan ke direktori `/backend`. Jalankan perintah berikut untuk menyiapkan lingkungan virtual, memasang dependensi, dan menjalankan server:

#### 💻 Pengguna Linux / macOS:
```bash
# 1. Masuk ke direktori backend
cd backend

# 2. Buat Python Virtual Environment (venv)
python3 -m venv venv

# 3. Aktifkan Virtual Environment
source venv/bin/activate

# 4. Install seluruh dependensi yang diperlukan
pip install -r requirements.txt

# 5. Jalankan server FastAPI dengan Uvicorn
uvicorn app.main:app --reload --port 8000
```

#### 🔌 Pengguna Windows (Command Prompt / PowerShell):
```cmd
# 1. Masuk ke direktori backend
cd backend

# 2. Buat Python Virtual Environment (venv)
python -m venv venv

# 3. Aktifkan Virtual Environment
# Melalui CMD:
venv\Scripts\activate
# Melalui PowerShell:
.\venv\Scripts\Activate.ps1

# 4. Install seluruh dependensi yang diperlukan
pip install -r requirements.txt

# 5. Jalankan server FastAPI dengan Uvicorn
uvicorn app.main:app --reload --port 8000
```

*Setelah server berjalan, REST API akan aktif di **`http://localhost:8000`** dan Anda dapat melihat dokumentasi interaktif Swagger UI di **`http://localhost:8000/docs`**.*

---

### 🎨 Langkah 2: Jalankan Aplikasi Frontend (Next.js)

Buka **terminal baru** (biarkan terminal backend tetap berjalan), lalu arahkan ke direktori `/frontend` untuk menjalankan aplikasi web:

```bash
# 1. Masuk ke direktori frontend
cd frontend

# 2. Install seluruh modul dependensi NPM
npm install

# 3. Jalankan Next.js dalam mode Development
npm run dev
```

*Aplikasi web interaktif sekarang dapat diakses secara instan melalui browser Anda di:*
*   **`http://localhost:3000`**
*   *(Atau **`http://localhost:3001`** apabila port 3000 sedang digunakan oleh aplikasi lain)*

---

### 💡 Catatan Penting & Tips Pengembangan
> [!NOTE]
> **Data Seeding Otomatis:**
> Sistem ini dilengkapi dengan mekanisme *auto-seeding*. Saat server backend pertama kali dijalankan (atau saat file `app/storage/data.json` kosong/terhapus), sistem akan otomatis mengisi database lokal dengan **15 file contoh bawaan** yang beragam. Hal ini mempermudah pengujian visualisasi struktur pohon (BST) agar langsung terlihat indah sejak awal dijalankan.

> [!TIP]
> **Dukungan Dual-Port CORS:**
> Backend FastAPI secara default dikonfigurasi untuk menerima koneksi CORS dari port `3000` dan `3001`. Jadi, Anda tidak perlu mengubah setelan apa pun jika Next.js berpindah port secara otomatis saat mendeteksi adanya tabrakan port.

## Lisensi
Dibuat sebagai bagian dari Final Project / Tugas Data Structures.
