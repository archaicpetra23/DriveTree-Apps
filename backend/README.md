# 🌳 DriveTree - Backend API

Bagian ini adalah *core engine* dari aplikasi DriveTree. Dibangun menggunakan **FastAPI**, backend ini menangani seluruh logika *Binary Search Tree (BST)* secara *from scratch* dan menyediakan RESTful API untuk dikonsumsi oleh Frontend.

## 🏗️ Struktur Data Inti (BST)

File yang mengatur struktur data berada di direktori `app/bst/`. Struktur ini diimplementasikan secara mandiri tanpa menggunakan library pihak ketiga:
- **`node.py`**: Representasi `TreeNode` yang menyimpan meta-data file (nama, tipe, ukuran, tanggal dibuat) serta referensi `left` dan `right`.
- **`bst.py`**: Kelas utama `BinarySearchTree` yang menangani operasi esensial:
  - `insert(file_data)`: Menyisipkan file baru (diurutkan berdasarkan nama).
  - `search(filename)`: Mencari file dengan kompleksitas $O(h)$ dan mengembalikan *path* (jalur).
  - `delete(filename)`: Menghapus file dan mengatur ulang posisi *leaf/child* node secara otomatis.
- **`traversal.py`**: Algoritma rekursif untuk *inorder*, *preorder*, dan *postorder* traversal yang menyimpan riwayat jalannya algoritma langkah-demi-langkah.

## 🚀 Endpoint API Utama

Base URL: `http://localhost:8000`

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/files` | Mengambil seluruh node secara berurutan (In-order traversal). |
| `POST` | `/api/files` | Menambahkan file baru ke dalam tree. |
| `GET` | `/api/files/search?name={filename}` | Mencari node file berdasarkan nama beserta jejak/rute perjalanannya. |
| `GET` | `/api/files/tree` | Mendapatkan seluruh struktur tree rekursif (untuk dirender menjadi grafik). |
| `GET` | `/api/files/stats` | Mendapatkan statistik pohon (tingkat/kedalaman, jumlah file, ukuran total, dst.). |
| `GET` | `/api/files/traversal/{traversal_type}` | Menjalankan traversal (`inorder`/`preorder`/`postorder`) dan mencatat urutannya. |
| `DELETE` | `/api/files/{filename}` | Menghapus sebuah file dari tree berdasarkan nama. |
| `DELETE` | `/api/files` | Menghapus semua file dari tree. |

## 📦 Instalasi & Menjalankan Server

1. Pastikan Python 3.10+ sudah terinstal.
2. Buat *Virtual Environment*:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # MacOS/Linux
   # venv\Scripts\activate   # Windows
   ```
3. Instal dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Jalankan server menggunakan Uvicorn:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   > **Tip:** Anda bisa melihat dokumentasi interaktif (Swagger UI) API-nya dengan membuka `http://localhost:8000/docs`.

## 💾 Penyimpanan Data
Data di-persist secara lokal pada file `app/storage/data.json`. Jika file ini kosong atau tidak ada saat server pertama kali dijalankan, sistem akan secara otomatis membuat *seed* berupa 15 file default yang beragam agar tree tidak kosong.
