"""
Metrics Utility — Perhitungan statistik untuk DriveTree.

Modul ini menyediakan fungsi-fungsi untuk menghasilkan
statistik tentang file dan BST.
"""

from app.bst.bst import BinarySearchTree


def calculate_stats(bst: BinarySearchTree) -> dict:
    """
    Menghitung semua statistik sistem.

    Args:
        bst: Instance BinarySearchTree.

    Returns:
        dict: Statistik lengkap sistem.

    Time Complexity: O(n)
    """
    files = bst.inorder()
    total_files = bst.count_nodes()
    tree_height = bst.get_height()

    # Hitung total ukuran
    total_size = sum(f["size"] for f in files)

    # Hitung distribusi tipe file
    file_types = {}
    for f in files:
        ftype = f["type"]
        file_types[ftype] = file_types.get(ftype, 0) + 1

    # Informasi keseimbangan tree
    if total_files == 0:
        balance_info = "Tree kosong"
    elif tree_height <= 1:
        balance_info = "Balanced (hanya root)"
    else:
        import math
        optimal_height = math.ceil(math.log2(total_files + 1))
        if tree_height <= optimal_height + 1:
            balance_info = "Relatif balanced"
        else:
            balance_info = f"Kurang balanced (height: {tree_height}, optimal: {optimal_height})"

    return {
        "total_files": total_files,
        "tree_height": tree_height,
        "total_size": round(total_size, 2),
        "file_types": file_types,
        "balance_info": balance_info,
    }
