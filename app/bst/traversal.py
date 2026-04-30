"""
Traversal Helpers — Fungsi tambahan untuk traversal dengan step tracking.

Modul ini menyediakan traversal yang mencatat setiap langkah,
berguna untuk animasi step-by-step di frontend.
"""

from app.bst.node import Node


def inorder_steps(root: Node | None) -> list:
    """
    Inorder traversal dengan pencatatan setiap langkah.

    Returns:
        list: Daftar dict berisi step number dan nama file.

    Time Complexity: O(n)
    """
    steps = []
    _inorder_steps_recursive(root, steps)
    return steps


def _inorder_steps_recursive(current: Node | None, steps: list):
    if current is None:
        return
    _inorder_steps_recursive(current.left, steps)
    steps.append({
        "step": len(steps) + 1,
        "name": current.file_data["name"],
        "size": current.file_data["size"],
        "type": current.file_data["type"],
    })
    _inorder_steps_recursive(current.right, steps)


def preorder_steps(root: Node | None) -> list:
    """
    Preorder traversal dengan pencatatan setiap langkah.

    Returns:
        list: Daftar dict berisi step number dan nama file.

    Time Complexity: O(n)
    """
    steps = []
    _preorder_steps_recursive(root, steps)
    return steps


def _preorder_steps_recursive(current: Node | None, steps: list):
    if current is None:
        return
    steps.append({
        "step": len(steps) + 1,
        "name": current.file_data["name"],
        "size": current.file_data["size"],
        "type": current.file_data["type"],
    })
    _preorder_steps_recursive(current.left, steps)
    _preorder_steps_recursive(current.right, steps)


def postorder_steps(root: Node | None) -> list:
    """
    Postorder traversal dengan pencatatan setiap langkah.

    Returns:
        list: Daftar dict berisi step number dan nama file.

    Time Complexity: O(n)
    """
    steps = []
    _postorder_steps_recursive(root, steps)
    return steps


def _postorder_steps_recursive(current: Node | None, steps: list):
    if current is None:
        return
    _postorder_steps_recursive(current.left, steps)
    _postorder_steps_recursive(current.right, steps)
    steps.append({
        "step": len(steps) + 1,
        "name": current.file_data["name"],
        "size": current.file_data["size"],
        "type": current.file_data["type"],
    })
