"""
File Service — Business logic layer antara routes dan BST.

Modul ini menangani:
- Validasi bisnis
- Interaksi dengan BST
- Persistence (load/save ke JSON)
- Formatting response
"""

import json
import os
from datetime import datetime, timezone

from app.bst.bst import BinarySearchTree
from app.bst.traversal import inorder_steps, preorder_steps, postorder_steps
from app.utils.metrics import calculate_stats

# Path ke file JSON storage
STORAGE_PATH = os.path.join(os.path.dirname(__file__), "..", "storage", "data.json")

# Instance BST global (singleton)
bst = BinarySearchTree()

# Data default yang akan di-seed jika storage kosong
DEFAULT_FILES = [
    {"name": "laporan_akhir",    "size": 2048.0,  "type": "pdf",  "created_at": "2026-05-01T08:30:00.000000+00:00"},
    {"name": "foto_liburan",     "size": 5120.0,  "type": "jpg",  "created_at": "2026-05-02T10:15:00.000000+00:00"},
    {"name": "presentasi_uas",   "size": 3072.0,  "type": "pptx", "created_at": "2026-05-03T14:00:00.000000+00:00"},
    {"name": "main",             "size": 12.5,    "type": "py",   "created_at": "2026-05-04T09:45:00.000000+00:00"},
    {"name": "database_schema",  "size": 8.2,     "type": "sql",  "created_at": "2026-05-05T11:20:00.000000+00:00"},
    {"name": "website_mockup",   "size": 1536.0,  "type": "png",  "created_at": "2026-05-06T16:30:00.000000+00:00"},
    {"name": "catatan_kuliah",   "size": 45.0,    "type": "txt",  "created_at": "2026-05-07T07:00:00.000000+00:00"},
    {"name": "tugas_strukdat",   "size": 24.0,    "type": "java", "created_at": "2026-05-08T13:10:00.000000+00:00"},
    {"name": "video_tutorial",   "size": 51200.0, "type": "mp4",  "created_at": "2026-05-09T20:00:00.000000+00:00"},
    {"name": "playlist_coding",  "size": 8192.0,  "type": "mp3",  "created_at": "2026-05-10T15:45:00.000000+00:00"},
    {"name": "project_backup",   "size": 10240.0, "type": "zip",  "created_at": "2026-05-11T18:30:00.000000+00:00"},
    {"name": "index",            "size": 6.8,     "type": "html", "created_at": "2026-05-12T10:00:00.000000+00:00"},
    {"name": "styles",           "size": 4.2,     "type": "css",  "created_at": "2026-05-12T10:05:00.000000+00:00"},
    {"name": "config",           "size": 1.5,     "type": "json", "created_at": "2026-05-13T08:20:00.000000+00:00"},
    {"name": "readme",           "size": 3.0,     "type": "md",   "created_at": "2026-05-14T12:00:00.000000+00:00"},
]


def seed_default_data():
    """
    Menyisipkan data default ke BST dan menyimpannya jika BST kosong.
    Dipanggil otomatis saat startup jika tidak ada data tersimpan.
    """
    for file_data in DEFAULT_FILES:
        bst.insert(file_data)
    save_data()


def load_data():
    """
    Memuat data dari file JSON ke BST saat startup.
    Jika storage kosong atau tidak ada, seed data default otomatis.

    Time Complexity: O(n log n) dimana n = jumlah file tersimpan
    """
    global bst
    bst = BinarySearchTree()

    loaded = False
    if os.path.exists(STORAGE_PATH):
        try:
            with open(STORAGE_PATH, "r") as f:
                data = json.load(f)
                files = data.get("files", [])
                for file_data in files:
                    bst.insert(file_data)
                loaded = len(files) > 0
        except (json.JSONDecodeError, IOError):
            pass

    # Jika tidak ada data tersimpan, seed dengan data default
    if not loaded:
        seed_default_data()


def save_data():
    """
    Menyimpan data BST ke file JSON (inorder traversal).

    Time Complexity: O(n)
    """
    files = bst.inorder()
    os.makedirs(os.path.dirname(STORAGE_PATH), exist_ok=True)
    with open(STORAGE_PATH, "w") as f:
        json.dump({"files": files}, f, indent=2)


def add_file(name: str, size: float, file_type: str) -> dict:
    """
    Menambahkan file baru ke BST.

    Args:
        name: Nama file.
        size: Ukuran file dalam KB.
        file_type: Tipe/ekstensi file.

    Returns:
        dict: Status operasi dan data file.
    """
    file_data = {
        "name": name.strip(),
        "size": size,
        "type": file_type.strip().lower(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    success = bst.insert(file_data)

    if success:
        save_data()
        return {"success": True, "message": f"File '{name}' berhasil ditambahkan.", "file": file_data}
    else:
        return {"success": False, "message": f"File '{name}' sudah ada dalam sistem."}


def search_file(filename: str) -> dict:
    """
    Mencari file berdasarkan nama menggunakan BST search.

    Args:
        filename: Nama file yang dicari.

    Returns:
        dict: Hasil pencarian dengan search path.
    """
    result = bst.search(filename)
    search_path = bst.get_search_path(filename)

    if result:
        return {
            "found": True,
            "file": result,
            "search_path": search_path,
        }
    else:
        return {
            "found": False,
            "file": None,
            "search_path": search_path,
        }


def delete_file(filename: str) -> dict:
    """
    Menghapus file dari BST.

    Args:
        filename: Nama file yang akan dihapus.

    Returns:
        dict: Status operasi.
    """
    success = bst.delete(filename)

    if success:
        save_data()
        return {"success": True, "message": f"File '{filename}' berhasil dihapus."}
    else:
        return {"success": False, "message": f"File '{filename}' tidak ditemukan."}


def get_all_files() -> list:
    """
    Mendapatkan semua file terurut (inorder traversal).

    Returns:
        list: Daftar metadata file terurut A-Z.
    """
    return bst.inorder()


def get_tree_structure() -> dict | None:
    """
    Mendapatkan struktur BST untuk visualisasi.

    Returns:
        dict | None: Struktur tree rekursif.
    """
    return bst.get_tree_structure()


def get_stats() -> dict:
    """
    Mendapatkan statistik sistem.

    Returns:
        dict: Statistik lengkap.
    """
    return calculate_stats(bst)


def get_traversal(traversal_type: str) -> dict:
    """
    Mendapatkan hasil traversal dengan step tracking.

    Args:
        traversal_type: Jenis traversal ("inorder", "preorder", "postorder").

    Returns:
        dict: Hasil traversal dengan step numbers.
    """
    if traversal_type == "inorder":
        steps = inorder_steps(bst.root)
    elif traversal_type == "preorder":
        steps = preorder_steps(bst.root)
    elif traversal_type == "postorder":
        steps = postorder_steps(bst.root)
    else:
        return {"type": traversal_type, "steps": [], "total": 0}

    return {
        "type": traversal_type,
        "steps": steps,
        "total": len(steps),
    }


def clear_all() -> dict:
    """
    Menghapus semua file dari BST.

    Returns:
        dict: Status operasi.
    """
    bst.clear()
    save_data()
    return {"success": True, "message": "Semua file berhasil dihapus."}
