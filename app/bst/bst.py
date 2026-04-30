"""
Binary Search Tree (BST) — Implementasi Manual untuk DriveTree.

BST ini menggunakan nama file sebagai key untuk pengurutan.
Semua operasi diimplementasikan secara manual tanpa library eksternal.

ADT BinarySearchTree:
    Data:
        - root: Node | None

    Operations:
        - insert(file_data) -> bool
        - search(filename) -> dict | None
        - delete(filename) -> bool
        - inorder() -> list
        - preorder() -> list
        - postorder() -> list
        - get_height() -> int
        - count_nodes() -> int
        - get_tree_structure() -> dict | None
        - get_search_path(filename) -> list

    Analisis Kompleksitas:
        - Insert:   Average O(log n), Worst O(n)
        - Search:   Average O(log n), Worst O(n)
        - Delete:   Average O(log n), Worst O(n)
        - Traversal: O(n)
        - Height:   O(n)
        - Count:    O(n)
"""

from app.bst.node import Node


class BinarySearchTree:
    """
    Custom Binary Search Tree untuk manajemen file.

    Key BST: nama file (string comparison, case-insensitive).
    Setiap node menyimpan metadata file lengkap.
    """

    def __init__(self):
        """
        Inisialisasi BST kosong.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.root = None

    # ==================== INSERT ====================

    def insert(self, file_data: dict) -> bool:
        """
        Menambahkan file baru ke BST berdasarkan nama file.

        Args:
            file_data (dict): Metadata file yang akan ditambahkan.

        Returns:
            bool: True jika berhasil, False jika file dengan nama sama sudah ada.

        Time Complexity: Average O(log n), Worst O(n)
        Space Complexity: O(h) dimana h = tinggi tree (recursive call stack)
        """
        if self.root is None:
            self.root = Node(file_data)
            return True
        return self._insert_recursive(self.root, file_data)

    def _insert_recursive(self, current: Node, file_data: dict) -> bool:
        """Helper rekursif untuk insert."""
        key = file_data["name"].lower()
        current_key = current.file_data["name"].lower()

        if key == current_key:
            # File dengan nama yang sama sudah ada
            return False
        elif key < current_key:
            if current.left is None:
                current.left = Node(file_data)
                return True
            return self._insert_recursive(current.left, file_data)
        else:
            if current.right is None:
                current.right = Node(file_data)
                return True
            return self._insert_recursive(current.right, file_data)

    # ==================== SEARCH ====================

    def search(self, filename: str) -> dict | None:
        """
        Mencari file berdasarkan nama menggunakan BST search.

        Args:
            filename (str): Nama file yang dicari.

        Returns:
            dict | None: Metadata file jika ditemukan, None jika tidak.

        Time Complexity: Average O(log n), Worst O(n)
        Space Complexity: O(h) dimana h = tinggi tree
        """
        return self._search_recursive(self.root, filename.lower())

    def _search_recursive(self, current: Node | None, key: str) -> dict | None:
        """Helper rekursif untuk search."""
        if current is None:
            return None

        current_key = current.file_data["name"].lower()

        if key == current_key:
            return current.file_data
        elif key < current_key:
            return self._search_recursive(current.left, key)
        else:
            return self._search_recursive(current.right, key)

    def get_search_path(self, filename: str) -> list:
        """
        Mendapatkan jalur pencarian dari root ke node target.
        Berguna untuk visualisasi di frontend.

        Args:
            filename (str): Nama file yang dicari.

        Returns:
            list: Daftar nama file yang dilalui selama pencarian.
                  Elemen terakhir adalah target (jika ditemukan).

        Time Complexity: Average O(log n), Worst O(n)
        """
        path = []
        self._get_search_path_recursive(self.root, filename.lower(), path)
        return path

    def _get_search_path_recursive(self, current: Node | None, key: str, path: list):
        """Helper rekursif untuk get_search_path."""
        if current is None:
            return

        path.append({
            "name": current.file_data["name"],
            "direction": "found" if key == current.file_data["name"].lower() else (
                "left" if key < current.file_data["name"].lower() else "right"
            )
        })

        current_key = current.file_data["name"].lower()
        if key == current_key:
            return
        elif key < current_key:
            self._get_search_path_recursive(current.left, key, path)
        else:
            self._get_search_path_recursive(current.right, key, path)

    # ==================== DELETE ====================

    def delete(self, filename: str) -> bool:
        """
        Menghapus file dari BST berdasarkan nama.

        Tiga kasus penghapusan:
        1. Node adalah leaf (tanpa anak) — langsung hapus.
        2. Node punya satu anak — ganti node dengan anaknya.
        3. Node punya dua anak — ganti dengan inorder successor (min di subtree kanan).

        Args:
            filename (str): Nama file yang akan dihapus.

        Returns:
            bool: True jika berhasil dihapus, False jika file tidak ditemukan.

        Time Complexity: Average O(log n), Worst O(n)
        Space Complexity: O(h)
        """
        result = {"deleted": False}
        self.root = self._delete_recursive(self.root, filename.lower(), result)
        return result["deleted"]

    def _delete_recursive(self, current: Node | None, key: str, result: dict) -> Node | None:
        """Helper rekursif untuk delete."""
        if current is None:
            return None

        current_key = current.file_data["name"].lower()

        if key < current_key:
            current.left = self._delete_recursive(current.left, key, result)
        elif key > current_key:
            current.right = self._delete_recursive(current.right, key, result)
        else:
            # Node ditemukan — hapus
            result["deleted"] = True

            # Kasus 1 & 2: Node punya 0 atau 1 anak
            if current.left is None:
                return current.right
            elif current.right is None:
                return current.left

            # Kasus 3: Node punya 2 anak
            # Cari inorder successor (node terkecil di subtree kanan)
            successor = self._find_min(current.right)
            current.file_data = successor.file_data
            current.right = self._delete_recursive(
                current.right, successor.file_data["name"].lower(), {"deleted": False}
            )

        return current

    def _find_min(self, node: Node) -> Node:
        """
        Mencari node dengan nilai terkecil di subtree.

        Time Complexity: O(h)
        """
        current = node
        while current.left is not None:
            current = current.left
        return current

    # ==================== TRAVERSALS ====================

    def inorder(self) -> list:
        """
        Inorder traversal: Left -> Root -> Right.
        Menghasilkan daftar file terurut secara alfabetis (A-Z).

        Returns:
            list: Daftar metadata file terurut.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        result = []
        self._inorder_recursive(self.root, result)
        return result

    def _inorder_recursive(self, current: Node | None, result: list):
        """Helper rekursif untuk inorder traversal."""
        if current is None:
            return
        self._inorder_recursive(current.left, result)
        result.append(current.file_data)
        self._inorder_recursive(current.right, result)

    def preorder(self) -> list:
        """
        Preorder traversal: Root -> Left -> Right.

        Returns:
            list: Daftar metadata file dalam urutan preorder.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        result = []
        self._preorder_recursive(self.root, result)
        return result

    def _preorder_recursive(self, current: Node | None, result: list):
        """Helper rekursif untuk preorder traversal."""
        if current is None:
            return
        result.append(current.file_data)
        self._preorder_recursive(current.left, result)
        self._preorder_recursive(current.right, result)

    def postorder(self) -> list:
        """
        Postorder traversal: Left -> Right -> Root.

        Returns:
            list: Daftar metadata file dalam urutan postorder.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        result = []
        self._postorder_recursive(self.root, result)
        return result

    def _postorder_recursive(self, current: Node | None, result: list):
        """Helper rekursif untuk postorder traversal."""
        if current is None:
            return
        self._postorder_recursive(current.left, result)
        self._postorder_recursive(current.right, result)
        result.append(current.file_data)

    # ==================== TREE PROPERTIES ====================

    def get_height(self) -> int:
        """
        Menghitung tinggi BST.

        Returns:
            int: Tinggi tree (0 jika kosong).

        Time Complexity: O(n)
        Space Complexity: O(h)
        """
        return self._get_height_recursive(self.root)

    def _get_height_recursive(self, current: Node | None) -> int:
        """Helper rekursif untuk get_height."""
        if current is None:
            return 0
        left_height = self._get_height_recursive(current.left)
        right_height = self._get_height_recursive(current.right)
        return 1 + max(left_height, right_height)

    def count_nodes(self) -> int:
        """
        Menghitung jumlah total node dalam BST.

        Returns:
            int: Jumlah node.

        Time Complexity: O(n)
        Space Complexity: O(h)
        """
        return self._count_recursive(self.root)

    def _count_recursive(self, current: Node | None) -> int:
        """Helper rekursif untuk count_nodes."""
        if current is None:
            return 0
        return 1 + self._count_recursive(current.left) + self._count_recursive(current.right)

    # ==================== TREE VISUALIZATION ====================

    def get_tree_structure(self) -> dict | None:
        """
        Menghasilkan struktur tree dalam format JSON untuk visualisasi frontend.

        Returns:
            dict | None: Struktur tree rekursif, None jika kosong.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if self.root is None:
            return None
        return self._build_structure(self.root)

    def _build_structure(self, current: Node | None) -> dict | None:
        """Helper rekursif untuk membangun struktur tree."""
        if current is None:
            return None

        return {
            "name": current.file_data["name"],
            "size": current.file_data["size"],
            "type": current.file_data["type"],
            "created_at": current.file_data.get("created_at", ""),
            "left": self._build_structure(current.left),
            "right": self._build_structure(current.right),
        }

    # ==================== UTILITY ====================

    def is_empty(self) -> bool:
        """Cek apakah BST kosong."""
        return self.root is None

    def clear(self):
        """Mengosongkan seluruh BST."""
        self.root = None
