/**
 * API Client — Wrapper untuk semua HTTP request ke backend FastAPI.
 *
 * Base URL default: http://localhost:8000
 */

import type {
  ApiResponse,
  FilesListResponse,
  SearchResult,
  Stats,
  TraversalResult,
  TreeResponse,
} from "@/types/file";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

/** Tambah file baru ke BST */
export async function addFile(
  name: string,
  size: number,
  type: string
): Promise<ApiResponse> {
  return request<ApiResponse>("/api/files", {
    method: "POST",
    body: JSON.stringify({ name, size, type }),
  });
}

/** Dapatkan semua file (inorder traversal) */
export async function getFiles(): Promise<FilesListResponse> {
  return request<FilesListResponse>("/api/files");
}

/** Cari file berdasarkan nama */
export async function searchFile(name: string): Promise<SearchResult> {
  return request<SearchResult>(
    `/api/files/search?name=${encodeURIComponent(name)}`
  );
}

/** Hapus file berdasarkan nama */
export async function deleteFile(name: string): Promise<ApiResponse> {
  return request<ApiResponse>(`/api/files/${encodeURIComponent(name)}`, {
    method: "DELETE",
  });
}

/** Dapatkan struktur BST untuk visualisasi */
export async function getTree(): Promise<TreeResponse> {
  return request<TreeResponse>("/api/files/tree");
}

/** Dapatkan statistik sistem */
export async function getStats(): Promise<Stats> {
  return request<Stats>("/api/files/stats");
}

/** Dapatkan hasil traversal */
export async function getTraversal(
  type: "inorder" | "preorder" | "postorder"
): Promise<TraversalResult> {
  return request<TraversalResult>(`/api/files/traversal/${type}`);
}

/** Hapus semua file */
export async function clearFiles(): Promise<ApiResponse> {
  return request<ApiResponse>("/api/files", {
    method: "DELETE",
  });
}
