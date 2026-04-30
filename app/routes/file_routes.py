"""
File Routes — API endpoints untuk operasi file CRUD dan BST.

Endpoints:
    POST   /api/files              — Tambah file baru
    GET    /api/files              — Daftar semua file (inorder)
    GET    /api/files/search       — Cari file berdasarkan nama
    GET    /api/files/tree         — Struktur BST untuk visualisasi
    GET    /api/files/stats        — Statistik sistem
    GET    /api/files/traversal/{type} — Traversal (inorder/preorder/postorder)
    DELETE /api/files/{name}       — Hapus file
    DELETE /api/files              — Hapus semua file
"""

from fastapi import APIRouter, HTTPException, Query

from app.models.schemas import FileCreate, MessageResponse
from app.services import file_service

router = APIRouter(prefix="/api/files", tags=["files"])


@router.post("")
def create_file(file: FileCreate):
    """Menambahkan file baru ke BST."""
    result = file_service.add_file(file.name, file.size, file.type)
    if not result["success"]:
        raise HTTPException(status_code=409, detail=result["message"])
    return result


@router.get("")
def list_files():
    """Mendapatkan semua file terurut (inorder traversal BST)."""
    files = file_service.get_all_files()
    return {"files": files, "total": len(files)}


@router.get("/search")
def search_file(name: str = Query(..., description="Nama file yang dicari")):
    """Mencari file berdasarkan nama menggunakan BST search."""
    result = file_service.search_file(name)
    return result


@router.get("/tree")
def get_tree():
    """Mendapatkan struktur BST untuk visualisasi frontend."""
    tree = file_service.get_tree_structure()
    return {"tree": tree}


@router.get("/stats")
def get_stats():
    """Mendapatkan statistik sistem."""
    stats = file_service.get_stats()
    return stats


@router.get("/traversal/{traversal_type}")
def get_traversal(traversal_type: str):
    """
    Mendapatkan hasil traversal BST.

    Args:
        traversal_type: "inorder", "preorder", atau "postorder"
    """
    if traversal_type not in ("inorder", "preorder", "postorder"):
        raise HTTPException(
            status_code=400,
            detail="Tipe traversal harus: inorder, preorder, atau postorder"
        )
    result = file_service.get_traversal(traversal_type)
    return result


@router.delete("/{name}")
def delete_file(name: str):
    """Menghapus file dari BST berdasarkan nama."""
    result = file_service.delete_file(name)
    if not result["success"]:
        raise HTTPException(status_code=404, detail=result["message"])
    return result


@router.delete("")
def clear_files():
    """Menghapus semua file dari BST."""
    result = file_service.clear_all()
    return result
