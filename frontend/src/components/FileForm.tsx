/**
 * FileForm — Form untuk menambahkan file baru ke BST.
 */

"use client";

import { useState, type FormEvent } from "react";
import FileTypeIcon from "@/components/FileTypeIcon";
import { FILE_TYPES } from "@/lib/helpers";

interface FileFormProps {
  onSubmit: (name: string, size: number, type: string) => Promise<unknown>;
}

export default function FileForm({ onSubmit }: FileFormProps) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("txt");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !size) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await onSubmit(name.trim(), parseFloat(size), type);
      setSuccess(true);
      setName("");
      setSize("");
      setType("txt");
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambah file");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Tambah File</h3>
          <p className="text-xs text-slate-400">Insert ke Binary Search Tree</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama file */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Nama File
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <FileTypeIcon type={type} size={18} />
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="contoh: laporan_akhir"
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        {/* Size & Type row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Ukuran (KB)
            </label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 256"
              min="0.1"
              step="0.1"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Tipe File
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-field"
            >
              {FILE_TYPES.map((t) => (
                <option key={t} value={t}>
                  .{t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || !name.trim() || !size}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300
            ${
              success
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Menambahkan...
            </span>
          ) : success ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Berhasil!
            </span>
          ) : (
            "Tambah ke BST"
          )}
        </button>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 animate-shake">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
