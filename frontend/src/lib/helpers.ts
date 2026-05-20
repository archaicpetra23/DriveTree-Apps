/**
 * Helper Functions — Utility functions untuk formatting dan display.
 */

/** Format ukuran file dari KB ke format yang readable */
export function formatFileSize(sizeInKB: number): string {
  if (sizeInKB < 1) {
    return `${(sizeInKB * 1024).toFixed(0)} B`;
  }
  if (sizeInKB < 1024) {
    return `${sizeInKB.toFixed(1)} KB`;
  }
  if (sizeInKB < 1024 * 1024) {
    return `${(sizeInKB / 1024).toFixed(1)} MB`;
  }
  return `${(sizeInKB / (1024 * 1024)).toFixed(1)} GB`;
}

/** Format tanggal ISO ke format readable */
export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

/** Kategori tipe file untuk ikon SVG */
export function getFileCategory(type: string): "doc" | "image" | "video" | "audio" | "archive" | "code" | "data" | "exec" | "generic" {
  const t = type.toLowerCase();
  if (["pdf", "doc", "docx", "txt", "md"].includes(t)) return "doc";
  if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(t)) return "image";
  if (["mp4", "avi", "mov", "mkv", "webm"].includes(t)) return "video";
  if (["mp3", "wav", "ogg", "flac", "aac"].includes(t)) return "audio";
  if (["zip", "rar", "tar", "gz", "7z"].includes(t)) return "archive";
  if (["py", "js", "ts", "tsx", "jsx", "html", "css", "json", "xml", "java", "cpp", "c", "go", "rs", "rb", "php", "sql", "csv", "xlsx", "xls", "ppt", "pptx"].includes(t)) return "code";
  if (["csv", "xlsx", "xls", "ppt", "pptx", "json", "xml", "sql"].includes(t)) return "data";
  if (["exe", "dmg", "iso", "apk"].includes(t)) return "exec";
  return "generic";
}

/** Warna utama per kategori file */
export function getFileCategoryColor(type: string): string {
  const cat = getFileCategory(type);
  const colorMap: Record<string, string> = {
    doc:     "#3B82F6",
    image:   "#10B981",
    video:   "#EF4444",
    audio:   "#8B5CF6",
    archive: "#F59E0B",
    code:    "#06B6D4",
    data:    "#F97316",
    exec:    "#6B7280",
    generic: "#64748B",
  };
  return colorMap[cat] || "#64748B";
}

/** Return label singkat tipe file (untuk teks badge di ikon) */
export function getFileIcon(type: string): string {
  return type.toUpperCase().substring(0, 4);
}

/** Map tipe file ke warna */
export function getFileColor(type: string): string {
  const colorMap: Record<string, string> = {
    pdf: "#EF4444",
    doc: "#3B82F6",
    docx: "#3B82F6",
    txt: "#6B7280",
    jpg: "#F59E0B",
    jpeg: "#F59E0B",
    png: "#10B981",
    gif: "#8B5CF6",
    py: "#3776AB",
    js: "#F7DF1E",
    ts: "#3178C6",
    html: "#E34F26",
    css: "#1572B6",
    json: "#292929",
    zip: "#FFB13B",
    mp4: "#FF6B6B",
    mp3: "#1DB954",
  };
  return colorMap[type.toLowerCase()] || "#64748B";
}

/** Daftar tipe file yang tersedia untuk dropdown */
export const FILE_TYPES = [
  "pdf",
  "doc",
  "docx",
  "txt",
  "jpg",
  "png",
  "gif",
  "svg",
  "mp4",
  "mp3",
  "zip",
  "rar",
  "py",
  "js",
  "ts",
  "tsx",
  "html",
  "css",
  "json",
  "csv",
  "xlsx",
  "java",
  "cpp",
  "go",
  "md",
];
