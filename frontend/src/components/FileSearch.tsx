"use client";

import { useEffect } from "react";
import { useSearch } from "@/hooks/useFiles";
import { getFileTypeIcon } from "@/components/FileTypeIcon";
import { formatFileSize, formatDate } from "@/lib/helpers";
import type { SearchResult } from "@/types/file";

interface FileSearchProps {
  onSearchComplete?: (result: SearchResult | null) => void;
}

export default function FileSearch({ onSearchComplete }: FileSearchProps) {
  const { query, setQuery, result, searching } = useSearch();

  // ✅ Fixed: moved out of render body to prevent infinite re-render loop
  useEffect(() => {
    if (onSearchComplete) {
      onSearchComplete(result);
    }
  }, [result, onSearchComplete]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Cari File</h3>
          <p className="text-xs text-slate-400">BST Binary Search — O(log n)</p>
        </div>
      </div>

      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ketik nama file..." className="input-field pl-10 pr-10" />
        {searching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
      </div>

      {result && query.trim() && (
        <div className="mt-4 space-y-3 animate-fadeIn">
          {result.search_path.length > 0 && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Jalur Pencarian BST</p>
              <div className="flex flex-wrap items-center gap-2">
                {result.search_path.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${step.direction === "found" ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300" : "bg-blue-50 text-blue-600"}`}>
                      {step.name}
                    </span>
                    {i < result.search_path.length - 1 && (
                      <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">{result.search_path.length} langkah</p>
            </div>
          )}
          {result.found && result.file ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-emerald-200 flex items-center justify-center flex-shrink-0">
                {getFileTypeIcon(result.file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 truncate">{result.file.name}.{result.file.type}</p>
                <p className="text-sm text-slate-500">{formatFileSize(result.file.size)} • {formatDate(result.file.created_at)}</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Ditemukan
              </span>
            </div>
          ) : !searching ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
              <p className="text-sm text-red-600 font-medium">File &quot;{query}&quot; tidak ditemukan</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
