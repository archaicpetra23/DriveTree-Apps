"""
Pydantic Schemas — Definisi schema validasi request/response.

Schema ini memastikan data yang masuk dan keluar dari API
memiliki format yang benar dan tipe data yang sesuai.
"""

from pydantic import BaseModel, Field
from typing import Optional


class FileCreate(BaseModel):
    """Schema untuk request pembuatan file baru."""
    name: str = Field(..., min_length=1, max_length=255, description="Nama file")
    size: float = Field(..., gt=0, description="Ukuran file dalam KB")
    type: str = Field(..., min_length=1, max_length=20, description="Tipe/ekstensi file")


class FileResponse(BaseModel):
    """Schema untuk response data file."""
    name: str
    size: float
    type: str
    created_at: str


class TreeNodeResponse(BaseModel):
    """Schema untuk response node tree (rekursif)."""
    name: str
    size: float
    type: str
    created_at: str
    left: Optional["TreeNodeResponse"] = None
    right: Optional["TreeNodeResponse"] = None


class StatsResponse(BaseModel):
    """Schema untuk response statistik sistem."""
    total_files: int
    tree_height: int
    total_size: float
    file_types: dict
    balance_info: str


class SearchResponse(BaseModel):
    """Schema untuk response pencarian."""
    found: bool
    file: Optional[FileResponse] = None
    search_path: list


class TraversalResponse(BaseModel):
    """Schema untuk response traversal."""
    type: str
    steps: list
    total: int


class MessageResponse(BaseModel):
    """Schema untuk response pesan umum."""
    success: bool
    message: str
