"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { AlertCircle, Loader2, Save } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { DatePicker } from "@/components/admin/DatePicker";
import { Select } from "@/components/admin/Select";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import { autoSavePrestasiItem, type ActionResult } from "./actions";
import Link from "next/link";

export type PrestasiFormDefaults = {
  id?: string;
  title?: string;
  slug?: string;
  achieved_at?: string;
  level?: string;
  tag?: string | null;
  sub?: string | null;
  icon?: string;
  bg?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  team?: string[] | null;
  body?: string[] | null;
  body_html?: string | null;
  status?: "draft" | "published";
};

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
  defaults?: PrestasiFormDefaults;
  submitLabel?: string;
};

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60";

const ICON_OPTIONS = [
  { value: "trophy",  label: "Trophy — Piala" },
  { value: "calc",    label: "Calc — Kalkulator / MIPA" },
  { value: "dance",   label: "Dance — Tari / Seni" },
  { value: "code",    label: "Code — Pemrograman / IT" },
  { value: "robot",   label: "Robot — Robotika" },
  { value: "music",   label: "Music — Musik" },
  { value: "theater", label: "Theater — Teater" },
  { value: "medal",   label: "Medal — Medali" },
];

const LEVEL_OPTIONS = ["Internasional", "Nasional", "Provinsi", "Kota"];

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

export function PrestasiForm({ action, defaults }: Props) {
  const [state, formAction, isPending] = useActionState(action, { ok: true });
  const [pendingBtn, setPendingBtn] = useState<"draft" | "published" | null>(null);

  const [title, setTitle] = useState(defaults?.title ?? "");
  const [slug, setSlug] = useState(defaults?.slug ?? "");
  const [isDirty, setIsDirty] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(() => {
    const ds = defaults?.slug ?? "";
    return !ds || ds === slugify(defaults?.title ?? "");
  });

  useEffect(() => {
    if (autoSlug) setSlug(slugify(title));
  }, [title, autoSlug]);

  // Unsaved changes warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!isDirty || isPending) return;
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, isPending]);

  // Keyboard shortcuts
  const draftBtnRef = useRef<HTMLButtonElement>(null);
  const publishBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key === "s") { e.preventDefault(); draftBtnRef.current?.click(); }
      else if (e.key === "Enter") { e.preventDefault(); publishBtnRef.current?.click(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Convert team array back to textarea string
  const teamDefault = defaults?.team ? defaults.team.join("\n") : "";

  // body_html: prefer saved HTML, fallback to joining body text[]
  const bodyHtmlDefault =
    defaults?.body_html ||
    (defaults?.body ? defaults.body.map((p) => `<p>${p}</p>`).join("") : "");

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
        const res = await autoSavePrestasiItem(editId, fd);
        setAutoSaveInfo({ saving: false, savedAt: res.ok ? new Date() : null });
      });
    }, 30_000);
    return () => clearInterval(interval);
  }, [editId]);

  // achieved_at: convert ISO date to date input value YYYY-MM-DD
  const achievedAtValue = defaults?.achieved_at
    ? defaults.achieved_at.slice(0, 10)
    : "";

  return (
    <form ref={formRef} action={formAction} className="w-full space-y-5">
      {!state.ok && state.error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rust/8 border border-rust/20 text-rust text-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Kiri: gambar prestasi (potret) · Kanan: teks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Kolom kiri: gambar prestasi potret */}
        <div className="lg:col-span-4">
          <Field label="Gambar prestasi" hint="Opsional — jika diisi akan menggantikan ikon. Rasio potret 4:5.">
            <CoverImageInput
              name="image_url"
              defaultValue={defaults?.image_url ?? ""}
              uploadFolder="prestasi"
              previewHeight="h-80"
              label="Klik untuk pilih gambar"
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
              onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
              required
              disabled={isPending}
              className={inputCls}
              placeholder="Contoh: Juara 1 Olimpiade Matematika"
            />
          </Field>

          {/* Slug + Ikon */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-7">
              <Field label="Slug (URL)">
                <div className="relative">
                  <input
                    name="slug"
                    value={slug}
                    onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); setIsDirty(true); }}
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
              <Field label="Ikon" required>
                <Select
                  name="icon"
                  options={ICON_OPTIONS}
                  defaultValue={defaults?.icon ?? "trophy"}
                  required
                  placeholder="Pilih ikon…"
                />
              </Field>
            </div>
          </div>

          {/* Subjudul + Tanggal diraih + Level */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5">
              <Field label="Subjudul (sub)" hint='Contoh: "Tim Animasi · 3 siswa"'>
                <input
                  name="sub"
                  defaultValue={defaults?.sub ?? ""}
                  disabled={isPending}
                  className={inputCls}
                  placeholder="Tim Animasi · 3 siswa"
                />
              </Field>
            </div>
            <div className="md:col-span-4">
              <Field label="Tanggal diraih" required>
                <DatePicker
                  name="achieved_at"
                  defaultValue={achievedAtValue}
                  required
                  placeholder="Pilih tanggal…"
                />
              </Field>
            </div>
            <div className="md:col-span-3">
              <Field label="Level" required>
                <Select
                  name="level"
                  options={LEVEL_OPTIONS}
                  defaultValue={defaults?.level ?? "Kota"}
                  required
                  placeholder="Pilih level…"
                />
              </Field>
            </div>
          </div>

          {/* Tag */}
          <Field label="Tag" hint='Contoh: "Juara Nasional"'>
            <input
              name="tag"
              defaultValue={defaults?.tag ?? ""}
              disabled={isPending}
              className={inputCls}
              placeholder="Juara Nasional"
            />
          </Field>
        </div>
      </div>

      {/* Anggota tim */}
      <Field label="Anggota tim" hint="Satu nama per baris">
        <textarea
          name="team"
          defaultValue={teamDefault}
          disabled={isPending}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-base leading-relaxed resize-y min-h-[120px] focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60"
          placeholder={"Budi Santoso\nAnisa Rahmawati\nDeni Kurniawan"}
        />
      </Field>

      {/* Narasi / isi — WYSIWYG */}
      <Field label="Narasi / Isi" hint="Format bebas — bold, daftar, gambar (drag/paste juga bisa)">
        <RichTextEditor
          name="body_html"
          initialValue={bodyHtmlDefault}
          placeholder="Tulis narasi atau deskripsi prestasi…"
          uploadFolder="prestasi"
        />
      </Field>

      {/* Submit bar */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
        {imgUploading && (
          <span className="text-[10px] text-amber flex items-center gap-1">
            <Loader2 size={11} className="animate-spin" /> Mengunggah gambar…
          </span>
        )}
        {isDirty && !isPending && (
          <span className="text-[10px] text-amber flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Ada perubahan belum disimpan
          </span>
        )}
        {editId && !isDirty && (
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
        {defaults?.status && (
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Status:{" "}
            <span className={defaults.status === "published" ? "text-moss font-semibold" : "text-amber font-semibold"}>
              {defaults.status === "published" ? "● Tayang" : "● Draft"}
            </span>
          </span>
        )}
        <div className="ml-auto flex gap-3">
          <Link
            href="/admin/prestasi"
            className="h-11 px-5 rounded-full text-sm font-medium text-muted border border-black/10 hover:bg-paper-soft transition-colors inline-flex items-center"
          >
            Batal
          </Link>
          <button
            ref={draftBtnRef}
            type="submit"
            name="status"
            value="draft"
            disabled={isPending || imgUploading}
            onClick={() => { setPendingBtn("draft"); setIsDirty(false); }}
            title={imgUploading ? "Menunggu upload gambar selesai…" : "Simpan sebagai draft (⌘S)"}
            className="h-11 px-6 rounded-full border border-black/10 text-sm font-medium hover:bg-paper-soft transition-colors disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && pendingBtn === "draft" && <Loader2 size={14} className="animate-spin" />}
            Simpan sebagai draft
          </button>
          <button
            ref={publishBtnRef}
            type="submit"
            name="status"
            value="published"
            disabled={isPending || imgUploading}
            onClick={() => { setPendingBtn("published"); setIsDirty(false); }}
            title={imgUploading ? "Menunggu upload gambar selesai…" : "Publikasikan (⌘↵)"}
            className="h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && pendingBtn === "published" && <Loader2 size={14} className="animate-spin" />}
            {defaults?.status === "published" ? "Simpan perubahan" : "Publikasikan →"}
          </button>
        </div>
      </div>
    </form>
  );
}
