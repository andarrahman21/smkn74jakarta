"use client";

import { useState, useRef, useTransition } from "react";
import { Loader2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { CoverImageInput } from "@/components/admin/CoverImageInput";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { type StrukturProfil } from "@/lib/struktur";
import { createProfil, updateProfil, deleteProfil, moveProfil } from "../actions";

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition";

type Draft = { localId: number };

export function StrukturManager({ kategori, items }: { kategori: string; items: StrukturProfil[] }) {
  const [pending, start] = useTransition();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const counter = useRef(0);

  const addDraft = () => setDrafts((d) => [...d, { localId: ++counter.current }]);
  const removeDraft = (id: number) => setDrafts((d) => d.filter((x) => x.localId !== id));

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {items.map((m, i) => (
          <Row key={m.id} item={m} kategori={kategori} index={i} total={items.length} disabled={pending} start={start} />
        ))}
        {drafts.map((d) => (
          <DraftRow key={d.localId} kategori={kategori} onRemove={() => removeDraft(d.localId)} />
        ))}
      </div>

      {items.length === 0 && drafts.length === 0 && (
        <p className="text-sm text-muted p-6 bg-white border border-black/5 rounded-2xl text-center">
          Belum ada profil. Tambahkan profil pertama.
        </p>
      )}

      <button
        type="button"
        onClick={addDraft}
        className="w-full h-12 rounded-2xl border-2 border-dashed border-black/15 text-sm font-medium text-muted hover:border-amber hover:text-navy hover:bg-amber/5 transition-colors inline-flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Tambah profil
      </button>
    </div>
  );
}

// ─── Field set (dipakai Row & DraftRow) ─────────────────────────────────────────
function Fields({
  id, title, setTitle, nama, setNama, foto, setFoto, disabled, onUploadingFoto,
}: {
  id: string; title: string; setTitle: (v: string) => void;
  nama: string; setNama: (v: string) => void;
  foto: string; setFoto: (v: string) => void;
  disabled?: boolean; onUploadingFoto: (v: boolean) => void;
}) {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="lg:col-span-4">
        <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Foto</span>
        <CoverImageInput name={`foto-${id}`} defaultValue={foto} uploadFolder="struktur" previewHeight="h-40" label="Klik untuk pilih foto" onValueChange={setFoto} onUploadingChange={onUploadingFoto} />
      </div>
      <div className="lg:col-span-8 space-y-3">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Titel / Jabatan</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={disabled} className={inputCls} placeholder="mis. Kepala Sekolah" />
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-muted mb-1.5">Nama</span>
          <input value={nama} onChange={(e) => setNama(e.target.value)} disabled={disabled} className={inputCls} placeholder="Nama lengkap" />
        </div>
      </div>
    </div>
  );
}

// ─── Existing row (update) ──────────────────────────────────────────────────────
function Row({
  item, kategori, index, total, disabled, start,
}: {
  item: StrukturProfil; kategori: string; index: number; total: number; disabled: boolean; start: React.TransitionStartFunction;
}) {
  const [title, setTitle] = useState(item.title);
  const [nama, setNama] = useState(item.nama);
  const [foto, setFoto] = useState(item.foto_url ?? "");
  const [saving, setSaving] = useState(false);
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const dirty = title !== item.title || nama !== item.nama || foto !== (item.foto_url ?? "");

  const save = () =>
    start(async () => {
      setSaving(true);
      const res = await updateProfil(item.id, kategori, { title, nama, foto_url: foto });
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
            <button type="button" disabled={disabled || index === 0} onClick={() => start(async () => { await moveProfil(item.id, kategori, -1); })} className="h-6 w-6 grid place-items-center text-muted hover:text-navy disabled:opacity-25" title="Naikkan"><ChevronUp size={16} /></button>
            <button type="button" disabled={disabled || index === total - 1} onClick={() => start(async () => { await moveProfil(item.id, kategori, 1); })} className="h-6 w-6 grid place-items-center text-muted hover:text-navy disabled:opacity-25" title="Turunkan"><ChevronDown size={16} /></button>
          </div>
        </div>
        <div className="flex-1">
          <Fields id={item.id} title={title} setTitle={setTitle} nama={nama} setNama={setNama} foto={foto} setFoto={setFoto} disabled={disabled} onUploadingFoto={setUploadingFoto} />
          <div className="flex items-center justify-end gap-2 pt-3">
            <DeleteButton
              action={async () => { const r = await deleteProfil(item.id, kategori); if (!r.ok) toast.error(r.error ?? "Gagal."); }}
              id={item.id}
              title="Hapus profil ini?"
              description={`"${item.nama || "Profil"}" akan dihapus permanen.`}
              confirmLabel="Ya, hapus"
              triggerLabel="Hapus"
              triggerClassName="h-9 px-4 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors"
            />
            <button type="button" onClick={save} disabled={disabled || !dirty || uploadingFoto} className="h-9 px-5 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center gap-2">
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
function DraftRow({ kategori, onRemove }: { kategori: string; onRemove: () => void }) {
  const localId = useRef(`draft-${Math.random().toString(36).slice(2, 8)}`).current;
  const [title, setTitle] = useState("");
  const [nama, setNama] = useState("");
  const [foto, setFoto] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingFoto, setUploadingFoto] = useState(false);

  const save = async () => {
    if (!nama.trim()) { toast.error("Nama wajib diisi."); return; }
    setSaving(true);
    const res = await createProfil(kategori, { title, nama, foto_url: foto });
    setSaving(false);
    if (res.ok) { toast.success("Profil ditambahkan."); onRemove(); }
    else toast.error(res.error ?? "Gagal menambah.");
  };

  return (
    <div className="bg-white border-2 border-amber/40 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-widest text-amber font-semibold">Profil baru (belum disimpan)</span>
      </div>
      <Fields id={localId} title={title} setTitle={setTitle} nama={nama} setNama={setNama} foto={foto} setFoto={setFoto} disabled={saving} onUploadingFoto={setUploadingFoto} />
      <div className="flex items-center justify-end gap-2 pt-3">
        <button type="button" onClick={onRemove} className="h-9 px-4 rounded-full border border-black/10 text-muted text-xs font-medium hover:bg-paper-soft transition-colors">Batal</button>
        <button type="button" onClick={save} disabled={saving || uploadingFoto || !nama.trim()} className="h-9 px-5 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center gap-2">
          {saving && <Loader2 size={13} className="animate-spin" />}
          Simpan
        </button>
      </div>
    </div>
  );
}
