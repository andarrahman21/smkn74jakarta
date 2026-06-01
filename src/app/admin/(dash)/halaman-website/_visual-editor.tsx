"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import type { ActionResult } from "./actions";

type Selected = { key: string; fieldType: string; label: string };

const inputCls =
  "w-full h-11 px-3 rounded-xl border border-black/10 bg-white text-sm focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition";
const textareaCls =
  "w-full px-3 py-2.5 rounded-xl border border-black/10 bg-white text-sm leading-relaxed resize-y min-h-[120px] focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition";

export function VisualEditor({
  updateAction,
  previewUrl,
}: {
  updateAction: (key: string, value: string) => Promise<ActionResult>;
  previewUrl: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selected, setSelected] = useState<Selected | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 96, left: 0 });

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.source !== "cms-edit" || d.type !== "select") return;
      const fieldType = d.fieldType || "text";
      setSelected({ key: d.key, fieldType, label: d.label || d.key });
      setDraft(typeof d.value === "string" ? d.value : "");

      // Posisikan drawer dekat elemen (rect relatif viewport iframe + offset iframe).
      const PANEL_W = 320;
      const PANEL_H = fieldType === "image" ? 360 : 220;
      const GAP = 12;
      const iframeBox = iframeRef.current?.getBoundingClientRect();
      const r = d.rect;
      if (iframeBox && r) {
        const elLeft = iframeBox.left + r.left;
        const elRight = iframeBox.left + r.right;
        const elTop = iframeBox.top + r.top;
        // Default: di kanan elemen; kalau mepet, taruh di kiri elemen.
        let left = elRight + GAP;
        if (left + PANEL_W > window.innerWidth - 8) left = elLeft - PANEL_W - GAP;
        if (left < 8) left = window.innerWidth - PANEL_W - 8;
        let top = elTop;
        if (top + PANEL_H > window.innerHeight - 8) top = window.innerHeight - PANEL_H - 8;
        if (top < 8) top = 8;
        setPos({ top, left });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const close = () => {
    setSelected(null);
    setUploading(false);
  };

  const label = selected?.label ?? "";

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await updateAction(selected.key, draft);
      if (res.ok) {
        toast.success("Tersimpan");
        iframeRef.current?.contentWindow?.postMessage(
          { source: "cms-edit", type: "reload" },
          "*"
        );
        close();
      } else {
        toast.error(res.error ?? "Gagal menyimpan.");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative">
      {/* Instruction banner */}
      <div className="mb-4 flex items-center gap-2.5 rounded-2xl border border-black/10 bg-paper-soft px-4 py-3 text-sm text-ink">
        <span className="h-2.5 w-2.5 rounded-full bg-amber animate-pulse" />
        Klik teks atau gambar di preview untuk mengeditnya.
      </div>

      {/* Live preview */}
      <iframe
        ref={iframeRef}
        src={previewUrl}
        title="Preview Beranda"
        className="w-full h-[80vh] rounded-2xl border border-black/10 bg-white"
      />

      {/* Floating editor drawer */}
      {selected && (
        <div
          className="fixed w-80 z-50 bg-white rounded-2xl shadow-xl border border-black/10 p-5"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">
                {selected.fieldType === "image" ? "Edit gambar" : "Edit teks"}
              </p>
              <h3 className="font-display text-base leading-snug">{label}</h3>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="shrink-0 h-8 w-8 rounded-full border border-black/10 grid place-items-center text-muted hover:bg-paper-soft transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {selected.fieldType === "image" ? (
            <CoverImageInput
              key={selected.key}
              name="cms-img"
              defaultValue={draft}
              uploadFolder="halaman"
              previewHeight="h-40"
              label="Pilih gambar"
              onValueChange={setDraft}
              onUploadingChange={setUploading}
            />
          ) : selected.fieldType === "textarea" ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={5}
              className={textareaCls}
            />
          ) : (
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className={inputCls}
            />
          )}

          <div className="flex items-center justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={close}
              className="h-10 px-4 rounded-full text-sm font-medium text-muted border border-black/10 hover:bg-paper-soft transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving || uploading}
              className="h-10 px-5 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100 inline-flex items-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
