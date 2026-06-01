"use client";

import { useState, useTransition } from "react";
import { Loader2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createMisi, updateMisi, deleteMisi, moveMisi } from "./actions";

export type MisiItem = { id: string; sort_order: number; title: string; body: string };

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition";
const textareaCls =
  "w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-base leading-relaxed resize-y min-h-[80px] focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 transition";

export function MisiManager({ items }: { items: MisiItem[] }) {
  const [pending, start] = useTransition();

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {items.map((m, i) => (
          <Row key={m.id} item={m} index={i} total={items.length} disabled={pending} start={start} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-muted p-6 bg-white border border-black/5 rounded-2xl text-center">
          Belum ada misi. Tambahkan poin pertama.
        </p>
      )}

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const res = await createMisi();
            if (res.ok) toast.success("Poin misi ditambahkan.");
            else toast.error(res.error ?? "Gagal menambah.");
          })
        }
        className="w-full h-12 rounded-2xl border-2 border-dashed border-black/15 text-sm font-medium text-muted hover:border-amber hover:text-navy hover:bg-amber/5 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Plus size={16} /> Tambah poin misi
      </button>
    </div>
  );
}

function Row({
  item,
  index,
  total,
  disabled,
  start,
}: {
  item: MisiItem;
  index: number;
  total: number;
  disabled: boolean;
  start: React.TransitionStartFunction;
}) {
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [saving, setSaving] = useState(false);
  const dirty = title !== item.title || body !== item.body;

  const save = () =>
    start(async () => {
      setSaving(true);
      const res = await updateMisi(item.id, title, body);
      setSaving(false);
      if (res.ok) toast.success("Tersimpan.");
      else toast.error(res.error ?? "Gagal menyimpan.");
    });

  return (
    <div className="bg-white border border-black/5 rounded-2xl p-5">
      <div className="flex items-start gap-4">
        {/* Order controls */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <span className="font-display text-2xl text-amber w-8 text-center">{String(index + 1).padStart(2, "0")}</span>
          <div className="flex flex-col">
            <button
              type="button"
              disabled={disabled || index === 0}
              onClick={() => start(async () => { await moveMisi(item.id, -1); })}
              className="h-6 w-6 grid place-items-center text-muted hover:text-navy disabled:opacity-25 transition-colors"
              title="Naikkan"
            >
              <ChevronUp size={16} />
            </button>
            <button
              type="button"
              disabled={disabled || index === total - 1}
              onClick={() => start(async () => { await moveMisi(item.id, 1); })}
              className="h-6 w-6 grid place-items-center text-muted hover:text-navy disabled:opacity-25 transition-colors"
              title="Turunkan"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={disabled}
            className={inputCls}
            placeholder="Judul misi"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={disabled}
            rows={2}
            className={textareaCls}
            placeholder="Deskripsi misi"
          />
          <div className="flex items-center justify-end gap-2">
            <DeleteButton
              action={async () => {
                const res = await deleteMisi(item.id);
                if (!res.ok) toast.error(res.error ?? "Gagal menghapus.");
              }}
              id={item.id}
              title="Hapus poin misi ini?"
              description={`"${item.title}" akan dihapus permanen.`}
              confirmLabel="Ya, hapus"
              triggerClassName="h-9 px-4 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors"
              triggerLabel="Hapus"
            />
            <button
              type="button"
              onClick={save}
              disabled={disabled || !dirty}
              className="h-9 px-5 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 inline-flex items-center gap-2"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
