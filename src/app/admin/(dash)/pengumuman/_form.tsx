"use client";

import { useEffect, useRef, useState, useTransition, useActionState } from "react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { DatePicker } from "@/components/admin/DatePicker";
import { Select } from "@/components/admin/Select";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import { autoSavePengumuman, type ActionResult } from "./actions";
import { AlertCircle, Loader2, Save } from "lucide-react";

export type PengumumanFormDefaults = {
  id?: string;
  slug?: string;
  published_at?: string;
  category?: string;
  tag?: string | null;
  title?: string;
  excerpt?: string;
  body_html?: string;
  cover_image?: string | null;
  cover_image_alt?: string | null;
  status?: "draft" | "published";
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const EXCERPT_MIN = 80;
const EXCERPT_REC_MAX = 180;
const EXCERPT_HARD_MAX = 300;

type Props = {
  action: (prev: ActionResult, fd: FormData) => Promise<ActionResult>;
  defaults?: PengumumanFormDefaults;
  submitLabel: string;
  categories: string[];
  existingTags: string[];
};

export function PengumumanForm({
  action,
  defaults,
  submitLabel,
  categories,
  existingTags,
}: Props) {
  const cat = defaults?.category ?? "";
  const knownCategory = categories.includes(cat) ? cat : "";

  const [title, setTitle] = useState(defaults?.title ?? "");
  const [slug, setSlug] = useState(defaults?.slug ?? "");
  const [autoSlug, setAutoSlug] = useState(() => {
    const ds = defaults?.slug ?? "";
    return !ds || ds === slugify(defaults?.title ?? "");
  });
  const [excerpt, setExcerpt] = useState(defaults?.excerpt ?? "");
  const [isDirty, setIsDirty] = useState(false);
  const initialTitle = defaults?.title ?? "";
  const initialExcerpt = defaults?.excerpt ?? "";

  const [state, formAction, isPending] = useActionState(action, { ok: true });
  const [pendingBtn, setPendingBtn] = useState<"draft" | "published" | null>(null);

  useEffect(() => {
    if (autoSlug) setSlug(slugify(title));
  }, [title, autoSlug]);

  // Mark dirty on changes
  useEffect(() => {
    if (title !== initialTitle || excerpt !== initialExcerpt) setIsDirty(true);
  }, [title, excerpt]); // eslint-disable-line react-hooks/exhaustive-deps

  // Unsaved changes warning on browser close / refresh
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
      if (e.key === "s") {
        e.preventDefault();
        draftBtnRef.current?.click();
      } else if (e.key === "Enter") {
        e.preventDefault();
        publishBtnRef.current?.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ─── Auto-save (edit mode only) ────────────────────────────────────────────
  const formRef = useRef<HTMLFormElement>(null);
  const [autoSaveInfo, setAutoSaveInfo] = useState<{ savedAt: Date | null; saving: boolean }>({
    savedAt: null,
    saving: false,
  });
  const [_autoSavePending, startAutoSave] = useTransition();
  const editId = defaults?.id;

  useEffect(() => {
    if (!editId) return;
    const interval = setInterval(() => {
      const form = formRef.current;
      if (!form) return;
      const fd = new FormData(form);
      setAutoSaveInfo((prev) => ({ ...prev, saving: true }));
      startAutoSave(async () => {
        const res = await autoSavePengumuman(editId, fd);
        setAutoSaveInfo({ saving: false, savedAt: res.ok ? new Date() : null });
      });
    }, 30_000);
    return () => clearInterval(interval);
  }, [editId]);

  const excerptLen = excerpt.length;
  const excerptColor =
    excerptLen === 0 ? "text-muted"
    : excerptLen < EXCERPT_MIN ? "text-rust"
    : excerptLen <= EXCERPT_REC_MAX ? "text-moss"
    : excerptLen <= EXCERPT_HARD_MAX ? "text-amber"
    : "text-rust";

  // Is publish date in future? (for schedule indicator)
  const pubDate = defaults?.published_at ?? new Date().toISOString().slice(0, 10);
  const isScheduled =
    defaults?.status === "published" && new Date(pubDate + "T00:00:00+07:00") > new Date();

  return (
    <form ref={formRef} action={formAction} className="space-y-6 max-w-[1600px]">
      {/* Error banner */}
      {!state.ok && state.error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rust/8 border border-rust/20 text-rust text-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Judul <span className="text-rust">*</span>
          </span>
          <span className={`text-[11px] tabular-nums ${
            title.length === 0 ? "text-muted"
            : title.length <= 60 ? "text-moss"
            : title.length <= 80 ? "text-amber"
            : "text-rust"
          }`}>
            {title.length}
            {title.length > 60 && " — terlalu panjang untuk SEO"}
          </span>
        </div>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isPending}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-4">
          <SlugField
            slug={slug}
            auto={autoSlug}
            disabled={isPending}
            onChange={(v) => { setAutoSlug(false); setSlug(v); }}
            onReset={() => { setAutoSlug(true); setSlug(slugify(title)); }}
          />
        </div>
        <div className="md:col-span-3">
          <Field label="Tanggal terbit" required>
            <DatePicker
              name="published_at"
              defaultValue={defaults?.published_at ?? new Date().toISOString().slice(0, 10)}
              required
            />
          </Field>
        </div>
        <div className="md:col-span-3">
          <Field label="Kategori" required>
            <Select
              name="category"
              defaultValue={knownCategory}
              options={categories}
              placeholder="Pilih kategori…"
              required
            />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Tag (opsional)">
            <input
              name="tag"
              defaultValue={defaults?.tag ?? ""}
              className={inputCls}
              placeholder="Baru"
              list="existing-tags"
              autoComplete="off"
            />
            <datalist id="existing-tags">
              {existingTags.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </Field>
        </div>
      </div>

      <Field label="Cover image (opsional)" hint="Gambar utama yang tampil di listing & halaman detail">
        <CoverImageInput
          name="cover_image"
          defaultValue={defaults?.cover_image ?? ""}
          altName="cover_image_alt"
          defaultAlt={defaults?.cover_image_alt ?? ""}
          uploadFolder="pengumuman"
        />
      </Field>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-widest text-muted">
            Ringkasan <span className="text-rust">*</span>
          </span>
          <span className={`text-[11px] tabular-nums ${excerptColor}`}>
            {excerptLen} / {EXCERPT_REC_MAX}
            {excerptLen > EXCERPT_REC_MAX && excerptLen <= EXCERPT_HARD_MAX && " — agak panjang"}
            {excerptLen > EXCERPT_HARD_MAX && " — terlalu panjang"}
            {excerptLen > 0 && excerptLen < EXCERPT_MIN && " — terlalu pendek"}
          </span>
        </div>
        <textarea
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          disabled={isPending}
          rows={4}
          maxLength={EXCERPT_HARD_MAX}
          className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-base leading-relaxed resize-y min-h-[120px] focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60"
        />
        <span className="block text-[11px] text-muted mt-1">
          2–4 kalimat · tampil di listing & meta sosial media · ideal 80–180 karakter
        </span>
      </div>

      <Field label="Isi pengumuman" required hint="Format bebas — bold, daftar, tabel, gambar (drag/paste juga bisa)">
        <RichTextEditor
          name="body_html"
          initialValue={defaults?.body_html ?? ""}
          placeholder="Mulai tulis pengumuman di sini…"
          uploadFolder="pengumuman"
        />
      </Field>

      {isScheduled && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber/10 border border-amber/20 text-amber text-sm">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
          Pengumuman ini <strong>terjadwal</strong> — akan tayang pada{" "}
          {new Date(pubDate + "T00:00:00+07:00").toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
        {/* Unsaved indicator */}
        {isDirty && !isPending && (
          <span className="text-[10px] text-amber flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Ada perubahan belum disimpan
          </span>
        )}

        {/* Auto-save status */}
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
            Status saat ini:{" "}
            <span className={defaults.status === "published" ? "text-moss font-semibold" : "text-amber font-semibold"}>
              {defaults.status === "published" ? "● Tayang" : "● Draft"}
            </span>
          </span>
        )}

        <div className="ml-auto flex gap-3">
          <button
            ref={draftBtnRef}
            type="submit"
            name="status"
            value="draft"
            disabled={isPending}
            onClick={() => { setPendingBtn("draft"); setIsDirty(false); }}
            title="Simpan sebagai draft (⌘S)"
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
            disabled={isPending}
            onClick={() => { setPendingBtn("published"); setIsDirty(false); }}
            title="Publikasikan (⌘↵)"
            className="h-11 px-6 rounded-full bg-ink text-paper text-sm font-medium hover:bg-navy transition-colors disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending && pendingBtn === "published" && <Loader2 size={14} className="animate-spin" />}
            {submitLabel}
          </button>
          <Link
            href="/admin/pengumuman"
            className="h-11 px-6 rounded-full text-sm font-medium text-muted hover:text-ink transition-colors inline-flex items-center"
          >
            Batal
          </Link>
        </div>
      </div>
    </form>
  );
}

function formatRelative(d: Date): string {
  const secs = Math.floor((Date.now() - d.getTime()) / 1000);
  if (secs < 60) return "baru saja";
  const mins = Math.floor(secs / 60);
  return `${mins} mnt lalu`;
}

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition disabled:opacity-60";

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


function SlugField({
  slug,
  auto,
  disabled,
  onChange,
  onReset,
}: {
  slug: string;
  auto: boolean;
  disabled?: boolean;
  onChange: (v: string) => void;
  onReset: () => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted mb-1.5">
        <span>Slug (URL)</span>
        {auto ? (
          <span className="text-amber font-medium">● Auto</span>
        ) : (
          <button
            type="button"
            onClick={onReset}
            className="text-navy hover:text-amber transition-colors font-medium"
          >
            ↻ Reset auto
          </button>
        )}
      </span>
      <input
        name="slug"
        value={slug}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={inputCls}
        placeholder="otomatis dari judul"
      />
    </label>
  );
}
