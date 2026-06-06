"use client";

import { useState, useRef, useTransition } from "react";
import { Loader2, ChevronUp, ChevronDown, Plus, FileText, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Select } from "@/components/admin/Select";
import { type ModulAjar, KELAS_OPTIONS } from "@/lib/modul-ajar";
import { createModul, updateModul, deleteModul, moveModul } from "../actions";

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition";

type Draft = { localId: number };

export function ModulManager({ jurusan, items }: { jurusan: string; items: ModulAjar[] }) {
  const [pending, start] = useTransition();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const counter = useRef(0);

  const addDraft = () => setDrafts((d) => [...d, { localId: ++counter.current }]);
  const removeDraft = (id: number) => setDrafts((d) => d.filter((x) => x.localId !== id));

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {items.map((m, i) => (
          <Row key={m.id} item={m} jurusan={jurusan} index={i} total={items.length} disabled={pending} start={start} />
        ))}
        {drafts.map((d) => (
          <DraftRow key={d.localId} jurusan={jurusan} onRemove={() => removeDraft(d.localId)} />
        ))}
      </div>

      {items.length === 0 && drafts.length === 0 && (
        <p className="text-sm text-muted p-6 bg-white border border-black/5 rounded-2xl text-center">
          Belum ada modul. Tambahkan modul pertama.
        </p>
      )}

      <button
        type="button"
        onClick={addDraft}
        className="w-full h-12 rounded-2xl border-2 border-dashed border-black/15 text-sm font-medium text-muted hover:border-amber hover:text-navy hover:bg-amber/5 transition-colors inline-flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Tambah modul
      </button>
    </div>
  );
}

// ─── Field set (dipakai Row & DraftRow) ─────────────────────────────────────────
function Fields({
  id, title, setTitle, kelas, setKelas, cover, setCover, file, setFile, disabled, onUploadingCover,
}: {
  id: string; title: string; setTitle: (v: string) => void;
  kelas: string; setKelas: (v: string) => void;
  cover: string; setCover: (v: string) => void;
  file: string; setFile: (v: string) => void;
  disabled?: boolean; onUploadingCover: (v: boolean) => void;
}) {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="lg:col-span-4">
        <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Cover</span>
        <CoverImageInput name={`cover-${id}`} defaultValue={cover} uploadFolder="modul" previewHeight="h-40" label="Klik untuk pilih cover" onValueChange={setCover} onUploadingChange={onUploadingCover} />
      </div>
      <div className="lg:col-span-8 space-y-3">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-8">
            <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Judul</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={disabled} className={inputCls} placeholder="Judul modul ajar" />
          </div>
          <div className="col-span-4">
            <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Kelas</span>
            <Select name={`kelas-${id}`} defaultValue={kelas} onValueChange={setKelas} placeholder="— Pilih —" options={KELAS_OPTIONS.map((k) => ({ value: k, label: `Kelas ${k}` }))} />
          </div>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">File PDF (flipbook)</span>
          <PdfInput value={file} onChange={setFile} />
        </div>
      </div>
    </div>
  );
}

// ─── Existing row (update) ──────────────────────────────────────────────────────
function Row({
  item, jurusan, index, total, disabled, start,
}: {
  item: ModulAjar; jurusan: string; index: number; total: number; disabled: boolean; start: React.TransitionStartFunction;
}) {
  const [title, setTitle] = useState(item.title);
  const [kelas, setKelas] = useState(item.kelas ?? "");
  const [cover, setCover] = useState(item.cover_url ?? "");
  const [file, setFile] = useState(item.file_url ?? "");
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const dirty = title !== item.title || kelas !== (item.kelas ?? "") || cover !== (item.cover_url ?? "") || file !== (item.file_url ?? "");

  const save = () =>
    start(async () => {
      setSaving(true);
      const res = await updateModul(item.id, jurusan, { title, kelas, cover_url: cover, file_url: file });
      setSaving(false);
      if (res.ok) toast.success("Tersimpan.");
      else toast.error(res.error ?? "Gagal menyimpan.");
    });

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-1 pt-1">
          <span className="font-display text-2xl text-amber w-8 text-center">{String(index + 1).padStart(2, "0")}</span>
          <div className="flex flex-col">
            <button type="button" disabled={disabled || index === 0} onClick={() => start(async () => { await moveModul(item.id, jurusan, -1); })} className="h-6 w-6 grid place-items-center text-muted hover:text-navy disabled:opacity-25" title="Naikkan"><ChevronUp size={16} /></button>
            <button type="button" disabled={disabled || index === total - 1} onClick={() => start(async () => { await moveModul(item.id, jurusan, 1); })} className="h-6 w-6 grid place-items-center text-muted hover:text-navy disabled:opacity-25" title="Turunkan"><ChevronDown size={16} /></button>
          </div>
        </div>
        <div className="flex-1">
          <Fields id={item.id} title={title} setTitle={setTitle} kelas={kelas} setKelas={setKelas} cover={cover} setCover={setCover} file={file} setFile={setFile} disabled={disabled} onUploadingCover={setUploadingCover} />
          <div className="flex items-center justify-end gap-2 pt-3">
            <DeleteButton
              action={async () => { const r = await deleteModul(item.id, jurusan); if (!r.ok) toast.error(r.error ?? "Gagal."); }}
              id={item.id}
              title="Hapus modul ini?"
              description={`"${item.title}" akan dihapus permanen.`}
              confirmLabel="Ya, hapus"
              triggerLabel="Hapus"
              triggerClassName="h-9 px-4 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors"
            />
            <button type="button" onClick={save} disabled={disabled || !dirty || uploadingCover} className="h-9 px-5 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center gap-2">
              {saving && <Loader2 size={13} className="animate-spin" />}
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Draft row (create) ─────────────────────────────────────────────────────────
function DraftRow({ jurusan, onRemove }: { jurusan: string; onRemove: () => void }) {
  const localId = useRef(`draft-${Math.random().toString(36).slice(2, 8)}`).current;
  const [title, setTitle] = useState("");
  const [kelas, setKelas] = useState("");
  const [cover, setCover] = useState("");
  const [file, setFile] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const save = async () => {
    if (!title.trim()) { toast.error("Judul wajib diisi."); return; }
    setSaving(true);
    const res = await createModul(jurusan, { title, kelas, cover_url: cover, file_url: file });
    setSaving(false);
    if (res.ok) { toast.success("Modul ditambahkan."); onRemove(); }
    else toast.error(res.error ?? "Gagal menambah.");
  };

  return (
    <div className="bg-white border-2 border-amber/40 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-widest text-amber font-semibold">Modul baru (belum disimpan)</span>
      </div>
      <Fields id={localId} title={title} setTitle={setTitle} kelas={kelas} setKelas={setKelas} cover={cover} setCover={setCover} file={file} setFile={setFile} disabled={saving} onUploadingCover={setUploadingCover} />
      <div className="flex items-center justify-end gap-2 pt-3">
        <button type="button" onClick={onRemove} className="h-9 px-4 rounded-full border border-black/10 text-muted text-xs font-medium hover:bg-paper-soft transition-colors">Batal</button>
        <button type="button" onClick={save} disabled={saving || uploadingCover || !title.trim()} className="h-9 px-5 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center gap-2">
          {saving && <Loader2 size={13} className="animate-spin" />}
          Simpan
        </button>
      </div>
    </div>
  );
}

// ─── PDF upload ─────────────────────────────────────────────────────────────────
function PdfInput({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const upload = async (f: File) => {
    if (f.type !== "application/pdf") { setErr("Hanya file PDF."); return; }
    if (f.size > 30 * 1024 * 1024) { setErr("Maksimal 30 MB."); return; }
    setErr(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      fd.append("folder", "modul");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) { setErr(data?.error || "Gagal upload."); return; }
      onChange(data.url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input ref={ref} type="file" accept="application/pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
      {value ? (
        <div className="flex items-center gap-2 h-11 px-4 rounded-xl border border-black/10 bg-white">
          <FileText size={16} className="text-rust shrink-0" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-navy hover:text-amber truncate flex-1">{value.split("/").pop()}</a>
          <button type="button" onClick={() => ref.current?.click()} disabled={uploading} className="shrink-0 h-7 px-3 rounded-full bg-paper-soft border border-black/10 text-xs font-medium hover:bg-white transition-colors">{uploading ? "Mengunggah…" : "Ganti"}</button>
          <button type="button" onClick={() => onChange("")} className="shrink-0 h-7 w-7 rounded-full border border-rust/30 text-rust hover:bg-rust hover:text-paper grid place-items-center" title="Hapus file"><X size={12} /></button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()} disabled={uploading} className="w-full h-11 rounded-xl border-2 border-dashed border-black/15 bg-paper-soft hover:border-amber hover:bg-amber/5 transition-colors inline-flex items-center justify-center gap-2 text-sm text-muted hover:text-navy">
          {uploading ? <><Loader2 size={14} className="animate-spin" /> Mengunggah…</> : <><Upload size={14} /> Unggah file PDF</>}
        </button>
      )}
      {err && <p className="text-xs text-rust mt-1">{err}</p>}
    </div>
  );
}
