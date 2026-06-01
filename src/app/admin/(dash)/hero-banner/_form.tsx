"use client";

import { useActionState, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import { Select } from "@/components/admin/Select";
import Link from "next/link";
import type { ActionResult } from "./actions";

export type HeroSlideDefaults = {
  id?: string;
  sort_order?: number;
  eyebrow?: string;
  head?: string;
  tag?: string | null;
  caption?: string | null;
  year_label?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  status?: "draft" | "published";
};

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
  defaults?: HeroSlideDefaults;
};

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60";

const textareaCls =
  "w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60 resize-none leading-relaxed";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">
        {label} {required && <span className="text-rust">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-muted mt-1">{hint}</span>}
    </div>
  );
}

export function HeroBannerForm({ action, defaults }: Props) {
  const [state, formAction, isPending] = useActionState(action, { ok: true });

  // Tampilkan error sebagai toast
  useEffect(() => {
    if (!state.ok && state.error) toast.error(state.error);
  }, [state]);

  // Controlled state for live preview
  const [tag,       setTag]       = useState(defaults?.tag       ?? "");
  const [caption,   setCaption]   = useState(defaults?.caption   ?? "");
  const [yearLabel, setYearLabel] = useState(defaults?.year_label ?? "");
  const [imageUrl,  setImageUrl]  = useState(defaults?.image_url  ?? "");

  return (
    <form action={formAction} className="w-full space-y-5">
      {/* Row 1: Urutan + Status + Eyebrow */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-1">
          <Field label="Urutan">
            <input
              type="number"
              name="sort_order"
              defaultValue={defaults?.sort_order ?? 0}
              disabled={isPending}
              className={inputCls}
              placeholder="0"
            />
          </Field>
        </div>
        <div className="col-span-2">
          <Field label="Status">
            <Select
              name="status"
              defaultValue={defaults?.status ?? "draft"}
              options={[
                { value: "draft",     label: "Draft" },
                { value: "published", label: "Tayang" },
              ]}
            />
          </Field>
        </div>
        <div className="col-span-9">
          <Field label="Eyebrow" hint="Teks kecil di atas judul">
            <input
              name="eyebrow"
              defaultValue={defaults?.eyebrow ?? ""}
              disabled={isPending}
              className={inputCls}
              placeholder="Di SMKN 74, kami percaya pada"
            />
          </Field>
        </div>
      </div>

      {/* Row 2: Judul */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <Field
            label="Judul"
            hint="Gunakan *tanda bintang* untuk bagian berwarna amber — contoh: Raih masa *depanmu* bersama kami."
          >
            <textarea
              name="head"
              defaultValue={defaults?.head ?? ""}
              disabled={isPending}
              rows={3}
              className={textareaCls}
              placeholder="Raih masa *depanmu* bersama kami."
            />
          </Field>
        </div>
      </div>

      {/* Row 3: Gambar + live preview overlay + fields kanan */}
      <div className="grid grid-cols-12 gap-5 items-start">

        {/* Kiri: preview card + upload */}
        <div className="col-span-8 space-y-3">
          <span className="block text-[10px] uppercase tracking-widest text-muted">
            Preview
          </span>

          {/* Preview card — mirip hero homepage */}
          <div className="relative rounded-2xl bg-navy-deep border border-white/10 aspect-[5/2] overflow-hidden shadow-xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={defaults?.image_alt ?? ""}
                fill
                sizes="800px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-deep" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-navy-deep/40 pointer-events-none" />

            {/* Tag — live */}
            <div className="absolute top-5 left-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] z-10 max-w-[70%]">
              <span className={`shrink-0 h-1.5 w-1.5 rounded-full ${tag ? "bg-amber" : "bg-amber/25"}`} />
              <span className={`truncate ${tag ? "text-amber" : "text-amber/30"}`}>
                {tag || "Tag akan muncul di sini"}
              </span>
            </div>

            {/* Caption + Year — live */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <p className={`font-display italic text-sm leading-snug drop-shadow-md ${caption ? "text-paper" : "text-paper/25"}`}>
                {caption || "Caption akan muncul di sini…"}
              </p>
              <p className={`text-xs mt-1 ${yearLabel ? "text-paper/70" : "text-paper/20"}`}>
                {yearLabel || "Label tahun"}
              </p>
            </div>
          </div>

          {/* Upload — compact, tanpa re-render gambar */}
          <CoverImageInput
            name="image_url"
            defaultValue={imageUrl}
            uploadFolder="hero"
            onValueChange={setImageUrl}
            hidePreview
          />
        </div>

        {/* Kanan: Tag + Caption + Year + Alt */}
        <div className="col-span-4 flex flex-col gap-4 pt-6">
          <Field label="Tag" hint="Label kecil di sudut kiri atas foto">
            <input
              name="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              disabled={isPending}
              className={inputCls}
              placeholder="Pertunjukan tari kelas X"
            />
          </Field>

          <Field label="Caption" hint="Teks di bawah foto (italic)">
            <textarea
              name="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={isPending}
              rows={3}
              className={textareaCls}
              placeholder="Pertunjukan akhir tingkatan tim usai final."
            />
          </Field>

          <Field label="Label Tahun" hint="Contoh: Tari, 2025">
            <input
              name="year_label"
              value={yearLabel}
              onChange={(e) => setYearLabel(e.target.value)}
              disabled={isPending}
              className={inputCls}
              placeholder="Tari, 2025"
            />
          </Field>

          <input type="hidden" name="image_alt" value={defaults?.image_alt ?? ""} />
        </div>
      </div>

      {/* Submit bar */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
        <div className="ml-auto flex gap-3">
          <Link
            href="/admin/hero-banner"
            className="h-11 px-5 rounded-full text-sm font-medium text-muted border border-black/10 hover:bg-paper-soft transition-colors inline-flex items-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {defaults?.id ? "Simpan perubahan" : "Simpan slide"}
          </button>
        </div>
      </div>
    </form>
  );
}
