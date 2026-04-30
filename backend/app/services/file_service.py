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


def load_data():
    """
    Memuat data dari file JSON ke BST saat startup.

    Time Complexity: O(n log n) dimana n = jumlah file tersimpan
    """
    global bst
    bst = BinarySearchTree()

    if os.path.exists(STORAGE_PATH):
        try:
            with open(STORAGE_PATH, "r") as f:
                data = json.load(f)
                for file_data in data.get("files", []):
                    bst.insert(file_data)
        except (json.JSONDecodeError, IOError):
            pass


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
