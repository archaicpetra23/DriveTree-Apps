"""
BST Node Class — Representasi satu node dalam Binary Search Tree.

Setiap node menyimpan metadata file (nama, ukuran, tipe, waktu dibuat)
dan memiliki pointer ke anak kiri (left) dan anak kanan (right).

ADT Node:
    Data:
        - file_data: dict (name, size, type, created_at)
        - left: Node | None
        - right: Node | None
"""


class Node:
    """
    Kelas Node untuk Binary Search Tree.

    Attributes:
        file_data (dict): Metadata file yang disimpan di node ini.
            - name (str): Nama file (digunakan sebagai key BST).
            - size (float): Ukuran file dalam KB.
            - type (str): Tipe/ekstensi file (e.g., "pdf", "jpg").
            - created_at (str): Waktu file ditambahkan (ISO format).
        left (Node | None): Pointer ke anak kiri (file dengan nama lebih kecil secara alfabetis).
        right (Node | None): Pointer ke anak kanan (file dengan nama lebih besar secara alfabetis).
    """

    def __init__(self, file_data: dict):
        """
        Inisialisasi node baru dengan data file.

        Args:
            file_data (dict): Dictionary berisi metadata file.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.file_data = file_data
        self.left = None
        self.right = None

    def __repr__(self):
        """Representasi string node untuk debugging."""
        return f"Node({self.file_data.get('name', 'unknown')})"
