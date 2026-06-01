"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";

type Props = {
  name: string;
  defaultValue?: string | null;
  altName?: string;
  defaultAlt?: string | null;
  uploadFolder?: string;
  previewHeight?: string; // e.g. "h-40", "h-56" (default h-56)
  onValueChange?: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  hidePreview?: boolean; // hide image, show compact button row only
  label?: string; // custom upload button label
};

export function CoverImageInput({ name, defaultValue = "", altName, defaultAlt = "", uploadFolder = "pengumuman", previewHeight = "h-56", onValueChange, onUploadingChange, hidePreview = false, label = "Klik untuk pilih gambar" }: Props) {
  const [url, setUrl] = useState<string>(defaultValue ?? "");

  const setAndNotify = (v: string) => {
    setUrl(v);
    onValueChange?.(v);
  };
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setUploadingState = (v: boolean) => {
    setUploading(v);
    onUploadingChange?.(v);
  };

  const upload = async (file: File) => {
    setError(null);
    setUploadingState(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", uploadFolder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setError(data?.error || "Gagal upload gambar");
        return;
      }
      setAndNotify(data.url);
    } finally {
      setUploadingState(false);
    }
  };

  const MAX_MB = 5;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError("Format tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.");
      e.target.value = "";
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`Ukuran file terlalu besar. Maks ${MAX_MB}MB (file kamu: ${(f.size / 1024 / 1024).toFixed(1)}MB).`);
      e.target.value = "";
      return;
    }
    upload(f);
    e.target.value = "";
  };

  const clear = () => {
    setAndNotify("");
    setError(null);
  };

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFile}
        className="hidden"
      />

      {url ? (
        hidePreview ? (
          /* Compact button row — no image re-render */
          <div className="flex items-center gap-2 h-11 px-4 rounded-xl border border-black/10 bg-white">
            <span className="text-sm text-muted truncate flex-1">
              {uploading ? "Mengunggah…" : "Gambar terpilih ✓"}
            </span>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="shrink-0 h-7 px-3 rounded-full bg-paper-soft border border-black/10 text-xs font-medium text-ink hover:bg-white transition-colors"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={clear}
              className="shrink-0 h-7 w-7 rounded-full border border-rust/30 text-rust hover:bg-rust hover:text-paper transition-colors inline-flex items-center justify-center"
              title="Hapus cover"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
        <div className="relative rounded-xl overflow-hidden border border-black/10 bg-paper-soft group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Cover preview"
            className={`w-full ${previewHeight} object-cover`}
          />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="h-9 px-3 rounded-full bg-white/95 backdrop-blur text-xs font-medium text-ink hover:bg-white transition-colors shadow-sm"
            >
              {uploading ? "Mengunggah…" : "Ganti"}
            </button>
            <button
              type="button"
              onClick={clear}
              className="h-9 w-9 rounded-full bg-white/95 backdrop-blur text-rust hover:bg-rust hover:text-paper transition-colors shadow-sm inline-flex items-center justify-center"
              title="Hapus cover"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        )
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`w-full ${previewHeight} rounded-xl border-2 border-dashed border-black/15 bg-paper-soft hover:border-amber hover:bg-amber/5 transition-colors inline-flex flex-col items-center justify-center gap-2 text-muted hover:text-navy`}
        >
          {uploading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm font-medium">Mengunggah…</span>
            </>
          ) : (
            <>
              <ImagePlus size={22} strokeWidth={1.75} />
              <span className="text-sm font-medium">{label}</span>
              <span className="text-[11px] text-muted px-4 text-center">Rekomendasi 1600 × 900 px (rasio 16:9)<br />PNG/JPG/WEBP, maks 5MB</span>
            </>
          )}
        </button>
      )}

      {url && altName && (
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">
            Alt text <span className="text-muted normal-case tracking-normal">(teks alternatif untuk aksesibilitas & SEO)</span>
          </label>
          <input
            type="text"
            name={altName}
            defaultValue={defaultAlt ?? ""}
            placeholder="Deskripsi singkat gambar, misal: Spanduk PPDB 2025/2026"
            className="w-full h-10 px-3 rounded-xl border border-black/10 bg-white text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition"
          />
        </div>
      )}

      {error && <p className="text-xs text-rust">{error}</p>}
    </div>
  );
}
