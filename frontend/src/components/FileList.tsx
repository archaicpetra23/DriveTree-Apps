"use client";

import { useState } from "react";
import FileTypeIcon from "@/components/FileTypeIcon";
import { formatFileSize, formatDate } from "@/lib/helpers";
import type { FileData } from "@/types/file";

interface FileListProps {
  files: FileData[];
  onDelete: (name: string) => Promise<unknown>;
}

export default function FileList({ files, onDelete }: FileListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = async (name: string) => {
    if (confirmDelete !== name) {
      setConfirmDelete(name);
      setTimeout(() => setConfirmDelete(null), 3000);
      return;
    }
    setDeleting(name);
    try {
      await onDelete(name);
    } catch { /* handled upstream */ }
    finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Daftar File</h3>
            <p className="text-xs text-slate-400">Inorder Traversal (A→Z)</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full">
          {files.length} file
        </span>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center animate-bounce">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium">Belum ada file</p>
          <p className="text-xs text-slate-300 mt-1">Tambahkan file pertama Anda</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {files.map((file, i) => (
            <div
              key={file.name}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 animate-fadeIn"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                <FileTypeIcon type={file.type} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-700 truncate text-sm">
                  {file.name}<span className="text-slate-400">.{file.type}</span>
                </p>
                <p className="text-xs text-slate-400">
                  {formatFileSize(file.size)} • {formatDate(file.created_at)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(file.name)}
                disabled={deleting === file.name}
                className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200
                  ${confirmDelete === file.name
                    ? "bg-red-100 text-red-600 scale-110"
                    : "opacity-0 group-hover:opacity-100 hover:bg-red-50 text-slate-400 hover:text-red-500"
                  }
                  disabled:opacity-50`}
                title={confirmDelete === file.name ? "Klik lagi untuk konfirmasi" : "Hapus file"}
              >
                {deleting === file.name ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
