"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import type { ContentField } from "@/lib/site-content/registry";
import type { ActionResult } from "../actions";

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60";
const textareaCls =
  "w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-base leading-relaxed resize-y min-h-[100px] focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60";

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
  fields: ContentField[];
  values: Record<string, string>;
};

export function SiteContentForm({ action, fields, values }: Props) {
  const [state, formAction, isPending] = useActionState(action, { ok: true });
  const [uploading, setUploading] = useState(false);

  // Toast hasil simpan — skip render pertama
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    if (state.error) toast.error(state.error);
    else if (state.ok) toast.success("Perubahan tersimpan.");
  }, [state]);

  return (
    <form action={formAction} className="w-full max-w-3xl space-y-5">
      {fields.map((f) => (
        <div key={f.key} className="block">
          <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">
            {f.label}
          </span>

          {f.type === "image" ? (
            <CoverImageInput
              name={f.key}
              defaultValue={values[f.key] ?? ""}
              uploadFolder="halaman"
              previewHeight="h-48"
              label="Klik untuk pilih gambar"
              onUploadingChange={setUploading}
            />
          ) : f.type === "textarea" ? (
            <textarea
              name={f.key}
              defaultValue={values[f.key] ?? ""}
              disabled={isPending}
              rows={3}
              className={textareaCls}
            />
          ) : (
            <input
              name={f.key}
              defaultValue={values[f.key] ?? ""}
              disabled={isPending}
              className={inputCls}
              inputMode={f.type === "url" ? "url" : undefined}
            />
          )}

          {f.hint && <span className="block text-[11px] text-muted mt-1">{f.hint}</span>}
        </div>
      ))}

      {/* Submit bar */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
        {uploading && (
          <span className="text-[10px] text-amber flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" /> Mengunggah gambar…
          </span>
        )}
        <div className="ml-auto flex gap-3">
          <Link
            href="/admin/halaman-website"
            className="h-11 px-5 rounded-full text-sm font-medium text-muted border border-black/10 hover:bg-paper-soft transition-colors inline-flex items-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isPending || uploading}
            title={uploading ? "Menunggu upload gambar selesai…" : undefined}
            className="h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            Simpan perubahan
          </button>
        </div>
      </div>
    </form>
  );
}
