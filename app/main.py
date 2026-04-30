"""
DriveTree Backend — FastAPI Entry Point.

Aplikasi web simulasi file directory manager berbasis Binary Search Tree.
Backend ini menyediakan REST API untuk operasi CRUD file menggunakan BST
sebagai struktur data inti.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.file_routes import router as file_router
from app.services.file_service import load_data


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load data dari JSON saat startup."""
    load_data()
    yield


app = FastAPI(
    title="DriveTree API",
    description="REST API untuk file directory manager berbasis Binary Search Tree",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware — izinkan frontend mengakses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register router
app.include_router(file_router)


@app.get("/")
def root():
    """Health check endpoint."""
    return {
        "name": "DriveTree API",
        "version": "1.0.0",
        "status": "running",
        "description": "File Directory Manager berbasis Binary Search Tree",
    }
