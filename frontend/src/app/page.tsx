"use client";

import { useState, useCallback } from "react";
import { useFiles } from "@/hooks/useFiles";
import StatsCard from "@/components/StatsCard";
import FileForm from "@/components/FileForm";
import FileSearch from "@/components/FileSearch";
import FileList from "@/components/FileList";
import TreeVisualizer from "@/components/TreeVisualizer";
import TraversalPanel from "@/components/TraversalPanel";
import type { SearchResult } from "@/types/file";
import { formatFileSize } from "@/lib/helpers";

export default function Home() {
  const { files, tree, stats, loading, error, addFile, removeFile, refresh } = useFiles();
  const [highlightPath, setHighlightPath] = useState<string[]>([]);

  const handleSearchComplete = useCallback((result: SearchResult | null) => {
    if (result && result.search_path) {
      setHighlightPath(result.search_path.map((s) => s.name));
    } else {
      setHighlightPath([]);
    }
  }, []);

  if (loading && files.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M12 3C8 3 5 6 5 9c0 2.5 1.5 4.5 3.5 5.5L8 18h8l-.5-3.5C17.5 13.5 19 11.5 19 9c0-3-3-6-7-6z M9 18h6M10 21h4" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium">Memuat DriveTree...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="dashboard" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-10 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100/80 text-blue-700 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Binary Search Tree File Manager
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                DriveTree
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Kelola file Anda dengan kekuatan <span className="font-semibold text-blue-600">Binary Search Tree</span>.
              Insert, search, delete dengan kompleksitas <span className="font-mono bg-blue-50 px-1.5 py-0.5 rounded text-blue-600 text-sm">O(log n)</span>.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
              }
              label="Total File" value={stats?.total_files ?? 0} color="blue" delay={100}
            />
            <StatsCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3C8 3 5 6 5 9c0 2.5 1.5 4.5 3.5 5.5L8 18h8l-.5-3.5C17.5 13.5 19 11.5 19 9c0-3-3-6-7-6z M9 18h6M10 21h4" />
                </svg>
              }
              label="Tree Height" value={stats?.tree_height ?? 0} color="green" delay={200}
            />
            <StatsCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              label="Tipe File" value={stats?.file_types ? Object.keys(stats.file_types).length : 0} color="amber" delay={300}
            />
            <StatsCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              }
              label="Total Size" value={formatFileSize(stats?.total_size ?? 0)} color="purple" delay={400}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="manage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2 animate-fadeIn">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form + Search + File List */}
          <div className="lg:col-span-5 space-y-6">
            <FileForm onSubmit={addFile} />
            <FileSearch onSearchComplete={handleSearchComplete} />
            <FileList files={files} onDelete={removeFile} />
          </div>

          {/* Right Column: Tree Visualizer + Traversal */}
          <div id="visualizer" className="lg:col-span-7 space-y-6">
            <TreeVisualizer tree={tree} highlightPath={highlightPath} />
            <div id="traversal">
              <TraversalPanel onRefresh={refresh} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-sm text-slate-400">
            <span className="font-semibold text-slate-500">DriveTree</span> — UAS Struktur Data • Binary Search Tree Implementation
          </p>
          <p className="text-xs text-slate-300 mt-1">
            Built with Next.js + FastAPI • Custom BST (No external data structure library)
          </p>
        </div>
      </footer>
    </div>
  );
}
