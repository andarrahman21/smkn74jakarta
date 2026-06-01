"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, Save } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { DatePicker } from "@/components/admin/DatePicker";
import { Select } from "@/components/admin/Select";
import { TimePicker } from "@/components/admin/TimePicker";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import { autoSaveEventItem, type ActionResult } from "./actions";

export type EventFormDefaults = {
  id?: string;
  title?: string;
  slug?: string;
  event_date?: string;
  starts_at?: string | null; // "HH:MM" extracted from ISO timestamp
  status?: "Akan datang" | "Selesai";
  category?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  body?: string | null;
  body_html?: string | null;
};

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
  categories: string[];
  defaults?: EventFormDefaults;
  submitLabel?: string;
};

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function formatRelative(d: Date) {
  const diff = Math.round((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "baru saja";
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

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

export function EventForm({ action, categories, defaults, submitLabel = "Simpan" }: Props) {
  const [state, formAction, isPending] = useActionState(action, { ok: true });

  const [title, setTitle] = useState(defaults?.title ?? "");
  const [slug, setSlug] = useState(defaults?.slug ?? "");
  const [autoSlug, setAutoSlug] = useState(() => {
    const ds = defaults?.slug ?? "";
    return !ds || ds === slugify(defaults?.title ?? "");
  });
  const [imgUploading, setImgUploading] = useState(false);

  useEffect(() => {
    if (autoSlug) setSlug(slugify(title));
  }, [title, autoSlug]);

  // ── Auto-save (edit mode only) ─────────────────────────────────────────────
  const formRef = useRef<HTMLFormElement>(null);
  const [autoSaveInfo, setAutoSaveInfo] = useState<{ savedAt: Date | null; saving: boolean }>({
    savedAt: null,
    saving: false,
  });
  const [, startAutoSave] = useTransition();
  const editId = defaults?.id;

  useEffect(() => {
    if (!editId) return;
    const interval = setInterval(() => {
      const form = formRef.current;
      if (!form) return;
      const fd = new FormData(form);
      setAutoSaveInfo((p) => ({ ...p, saving: true }));
      startAutoSave(async () => {
        const res = await autoSaveEventItem(editId, fd);
        setAutoSaveInfo({ saving: false, savedAt: res.ok ? new Date() : null });
      });
    }, 30_000);
    return () => clearInterval(interval);
  }, [editId]);

  return (
    <form ref={formRef} action={formAction} className="w-full space-y-5">
      {!state.ok && state.error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rust/8 border border-rust/20 text-rust text-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Kiri: cover image · Kanan: teks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Kolom kiri: cover image */}
        <div className="lg:col-span-4">
          <Field label="Cover image" hint="Opsional — tampil di kartu & halaman detail event. Rasio 4:3.">
            <CoverImageInput
              name="image_url"
              defaultValue={defaults?.image_url ?? ""}
              uploadFolder="event"
              previewHeight="h-72"
              label="Klik untuk pilih cover image"
              onUploadingChange={setImgUploading}
            />
            <input type="hidden" name="image_alt" value={defaults?.image_alt ?? ""} />
          </Field>
        </div>

        {/* Kolom kanan: teks */}
        <div className="lg:col-span-8 space-y-5">
          {/* Judul */}
          <Field label="Judul" required>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isPending}
              className={inputCls}
              placeholder="Contoh: Pentas Seni SMKN 74"
            />
          </Field>

          {/* Row: Slug + Status */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-7">
              <Field label="Slug (URL)">
                <div className="relative">
                  <input
                    name="slug"
                    value={slug}
                    onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); }}
                    disabled={isPending}
                    className={inputCls}
                    placeholder="otomatis dari judul"
                  />
                  {autoSlug ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-amber font-medium">● Auto</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setAutoSlug(true); setSlug(slugify(title)); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-navy hover:text-amber transition-colors font-medium"
                    >
                      ↻ Reset
                    </button>
                  )}
                </div>
              </Field>
            </div>
            <div className="md:col-span-5">
              <Field label="Status" required>
                <Select
                  name="status"
                  options={["Akan datang", "Selesai"]}
                  defaultValue={defaults?.status ?? "Akan datang"}
                  required
                  placeholder="Pilih status…"
                />
              </Field>
            </div>
          </div>

          {/* Row: Tanggal acara + Waktu mulai + Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-4">
              <Field label="Kategori">
                <Select
                  name="category"
                  options={categories}
                  defaultValue={defaults?.category ?? ""}
                  placeholder="— Pilih kategori —"
                />
              </Field>
            </div>
            <div className="md:col-span-4">
              <Field label="Waktu mulai" hint="Opsional">
                <TimePicker
                  name="starts_at"
                  defaultValue={defaults?.starts_at ?? ""}
                  placeholder="Pilih waktu…"
                />
              </Field>
            </div>
            <div className="md:col-span-4">
              <Field label="Tanggal acara" required>
                <DatePicker
                  name="event_date"
                  defaultValue={defaults?.event_date ? defaults.event_date.slice(0, 10) : ""}
                  required
                  placeholder="Pilih tanggal…"
                />
              </Field>
            </div>
          </div>
        </div>
      </div>

      {/* Deskripsi */}
      <Field label="Deskripsi" hint="Format bebas — bold, daftar, gambar (drag/paste juga bisa)">
        <RichTextEditor
          name="body_html"
          initialValue={defaults?.body_html || (defaults?.body ? `<p>${defaults.body}</p>` : "")}
          placeholder="Tulis deskripsi event di sini…"
          uploadFolder="event"
        />
      </Field>

      {/* Submit bar */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
        {imgUploading && (
          <span className="text-[10px] text-amber flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" /> Mengunggah gambar…
          </span>
        )}
        {editId && (
          <span className="text-[10px] text-muted flex items-center gap-1">
            {autoSaveInfo.saving ? (
              <><Loader2 size={11} className="animate-spin" /> Menyimpan…</>
            ) : autoSaveInfo.savedAt ? (
              <><Save size={11} /> Tersimpan otomatis {formatRelative(autoSaveInfo.savedAt)}</>
            ) : (
              "Auto-save aktif (setiap 30 dtk)"
            )}
          </span>
        )}
        <div className="ml-auto flex gap-3">
          <Link
            href="/admin/event"
            className="h-11 px-5 rounded-full text-sm font-medium text-muted border border-black/10 hover:bg-paper-soft transition-colors inline-flex items-center"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isPending || imgUploading}
            title={imgUploading ? "Menunggu upload gambar selesai…" : undefined}
            className="h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
