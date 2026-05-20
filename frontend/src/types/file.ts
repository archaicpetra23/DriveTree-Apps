/**
 * Type definitions for DriveTree.
 * Mendefinisikan tipe data yang digunakan di seluruh aplikasi.
 */

export interface FileData {
  name: string;
  size: number;
  type: string;
  created_at: string;
}

export interface TreeNode {
  name: string;
  size: number;
  type: string;
  created_at: string;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface Stats {
  total_files: number;
  tree_height: number;
  total_size: number;
  file_types: Record<string, number>;
  balance_info: string;
}

export interface SearchResult {
  found: boolean;
  file: FileData | null;
  search_path: SearchPathStep[];
}

export interface SearchPathStep {
  name: string;
  direction: "left" | "right" | "found";
}

export interface TraversalResult {
  type: string;
  steps: TraversalStep[];
  total: number;
}

export interface TraversalStep {
  step: number;
  name: string;
  size: number;
  type: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  file?: FileData;
}

export interface FilesListResponse {
  files: FileData[];
  total: number;
}

export interface TreeResponse {
  tree: TreeNode | null;
}
