/**
 * Custom Hooks — React hooks untuk state management DriveTree.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import * as api from "@/lib/api";
import type {
  FileData,
  Stats,
  TreeNode,
  SearchResult,
  TraversalResult,
} from "@/types/file";

/** Hook utama untuk manajemen file CRUD */
export function useFiles() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [filesRes, treeRes, statsRes] = await Promise.all([
        api.getFiles(),
        api.getTree(),
        api.getStats(),
      ]);
      setFiles(filesRes.files);
      setTree(treeRes.tree);
      setStats(statsRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addFile = async (name: string, size: number, type: string) => {
    setError(null);
    try {
      const result = await api.addFile(name, size, type);
      await refresh();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menambah file";
      setError(message);
      throw err;
    }
  };

  const removeFile = async (name: string) => {
    setError(null);
    try {
      const result = await api.deleteFile(name);
      await refresh();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menghapus file";
      setError(message);
      throw err;
    }
  };

  const clearAll = async () => {
    setError(null);
    try {
      const result = await api.clearFiles();
      await refresh();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menghapus semua file";
      setError(message);
      throw err;
    }
  };

  return {
    files,
    tree,
    stats,
    loading,
    error,
    addFile,
    removeFile,
    clearAll,
    refresh,
  };
}

/** Hook untuk pencarian file */
export function useSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);

  const search = useCallback(async (filename: string) => {
    if (!filename.trim()) {
      setResult(null);
      return;
    }
    setSearching(true);
    try {
      const res = await api.searchFile(filename.trim());
      setResult(res);
    } catch {
      setResult(null);
    } finally {
      setSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResult(null);
      return;
    }
    const timer = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return { query, setQuery, result, searching, search };
}

/** Hook untuk traversal BST */
export function useTraversal() {
  const [traversalResult, setTraversalResult] = useState<TraversalResult | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runTraversal = async (type: "inorder" | "preorder" | "postorder") => {
    setLoading(true);
    setActiveType(type);
    try {
      const res = await api.getTraversal(type);
      setTraversalResult(res);
    } catch {
      setTraversalResult(null);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setTraversalResult(null);
    setActiveType(null);
  };

  return { traversalResult, activeType, loading, runTraversal, clear };
}
