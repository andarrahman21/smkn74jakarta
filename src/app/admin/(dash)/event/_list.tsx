"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, Trash2, CheckCircle, Copy, Check, ChevronUp, ChevronDown } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AlertTriangle } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

type SortCol = "title" | "status" | "category" | "created_at";

function fmtDate(raw: string): string {
  if (!raw) return "—";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return new Date(raw + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return raw;
}
type SortDir = "asc" | "desc";

type Row = {
  id: string;
  slug: string;
  title: string;
  event_date: string;
  status: string;
  category: string | null;
};

type Props = {
  rows: Row[];
  search: string;
  statusFilter: string;
  sort: SortCol;
  dir: SortDir;
  sortHrefs: Record<SortCol, string>;
  deleteFn: (fd: FormData) => Promise<void>;
  duplicate: (fd: FormData) => Promise<void>;
  bulkDelete: (fd: FormData) => Promise<void>;
  bulkPublish: (fd: FormData) => Promise<void>;
};

export function EventList({
  rows,
  search,
  statusFilter,
  sort,
  dir,
  sortHrefs,
  deleteFn,
  duplicate,
  bulkDelete,
  bulkPublish,
}: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deletePending, startDelete] = useTransition();
  const [publishPending, startPublish] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function copyPermalink(slug: string, id: string) {
    const url = `${window.location.origin}/berita/event/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  const allIds = rows.map((r) => r.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(allIds));
  }

  function buildFd() {
    const fd = new FormData();
    selected.forEach((id) => fd.append("ids", id));
    return fd;
  }

  return (
    <div>
      {/* Bulk toolbar */}
      {selected.size > 0 && (
        <div className="mb-3 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-navy/5 border border-navy/10">
          <span className="text-xs font-medium text-ink">{selected.size} dipilih</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              disabled={publishPending}
              onClick={() =>
                startPublish(async () => {
                  await bulkPublish(buildFd());
                  setSelected(new Set());
                })
              }
              className="h-8 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5 disabled:opacity-60"
            >
              {publishPending ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
              Akan Datang
            </button>

            <AlertDialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialog.Trigger asChild>
                <button
                  type="button"
                  className="h-8 px-4 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors inline-flex items-center gap-1.5"
                >
                  <Trash2 size={13} />
                  Hapus
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-2xl bg-white p-6 shadow-xl border border-black/10 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-rust/10 text-rust grid place-items-center shrink-0">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <AlertDialog.Title className="font-display text-lg leading-snug text-ink">
                        Hapus {selected.size} event?
                      </AlertDialog.Title>
                      <AlertDialog.Description className="mt-1.5 text-sm text-ink/65 leading-relaxed">
                        Tindakan ini tidak bisa dibatalkan. Semua yang dipilih akan dihapus permanen.
                      </AlertDialog.Description>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <AlertDialog.Cancel asChild>
                      <button type="button" disabled={deletePending} className="h-10 px-4 rounded-full text-sm font-medium text-muted hover:bg-paper-soft hover:text-ink transition-colors disabled:opacity-50">
                        Batal
                      </button>
                    </AlertDialog.Cancel>
                    <button
                      type="button"
                      disabled={deletePending}
                      onClick={() =>
                        startDelete(async () => {
                          await bulkDelete(buildFd());
                          setSelected(new Set());
                          setDeleteOpen(false);
                        })
                      }
                      className="h-10 px-5 rounded-full bg-rust text-paper text-sm font-medium hover:bg-rust/90 inline-flex items-center gap-2 disabled:opacity-60"
                    >
                      {deletePending && <Loader2 size={14} className="animate-spin" />}
                      Ya, hapus semua
                    </button>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-paper-soft">
            <tr>
              <th className="w-10 p-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 rounded accent-navy cursor-pointer" />
              </th>
              <SortTh col="title"      label="Judul"         current={sort} dir={dir} href={sortHrefs.title} />
              <SortTh col="status"     label="Status"        current={sort} dir={dir} href={sortHrefs.status}    className="hidden sm:table-cell" />
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-muted font-medium hidden md:table-cell">
                Tanggal Acara
              </th>
              <SortTh col="category"   label="Kategori"      current={sort} dir={dir} href={sortHrefs.category} className="hidden lg:table-cell" />
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className={`border-t border-black/5 transition-colors ${selected.has(r.id) ? "bg-amber/5" : "hover:bg-paper-soft/60"}`}
              >
                <td className="p-3 text-center">
                  <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r.id)} className="h-4 w-4 rounded accent-navy cursor-pointer" />
                </td>

                {/* Judul */}
                <td className="p-3 align-middle">
                  <p className="font-display text-sm leading-snug">{r.title}</p>
                </td>

                {/* Status */}
                <td className="p-3 align-middle hidden sm:table-cell whitespace-nowrap">
                  {r.status === "Akan datang" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-moss/10 text-moss text-[10px] font-semibold uppercase tracking-widest">
                      <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                      Akan datang
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 text-muted text-[10px] font-semibold uppercase tracking-widest">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                      Selesai
                    </span>
                  )}
                </td>

                {/* Tanggal acara */}
                <td className="p-3 align-middle text-sm text-ink/60 hidden md:table-cell whitespace-nowrap">
                  {fmtDate(r.event_date)}
                </td>

                {/* Kategori */}
                <td className="p-3 align-middle text-sm text-ink/70 hidden lg:table-cell whitespace-nowrap">
                  {r.category || "—"}
                </td>

                {/* Aksi */}
                <td className="p-3 align-middle">
                  <div className="flex items-center gap-1.5 justify-end">
                    {/* Copy permalink */}
                    <button
                      type="button"
                      title="Salin tautan publik"
                      onClick={() => copyPermalink(r.slug, r.id)}
                      className="h-8 w-8 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors grid place-items-center"
                    >
                      {copiedId === r.id ? (
                        <Check size={13} className="text-moss" />
                      ) : (
                        <Copy size={13} className="text-muted" />
                      )}
                    </button>

                    {/* Edit */}
                    <Link
                      href={`/admin/event/${r.id}/edit`}
                      className="h-8 px-3 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft hover:border-navy transition-colors inline-flex items-center"
                    >
                      Edit
                    </Link>

                    {/* Duplicate */}
                    <form action={duplicate}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        title="Duplikasi sebagai salinan baru"
                        className="h-8 w-8 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors grid place-items-center"
                      >
                        ⧉
                      </button>
                    </form>

                    {/* Delete */}
                    <DeleteButton
                      action={deleteFn}
                      id={r.id}
                      title="Hapus event ini?"
                      description={`"${r.title}" akan dihapus permanen dan tidak bisa dipulihkan.`}
                      confirmLabel="Ya, hapus"
                      triggerClassName="h-8 px-3 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-muted">
                  {search
                    ? `Tidak ada event dengan kata kunci "${search}".`
                    : statusFilter !== "all"
                    ? `Tidak ada event dengan status "${statusFilter}".`
                    : "Belum ada event."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortTh({
  col, label, current, dir, href, className = "",
}: {
  col: SortCol; label: string; current: SortCol; dir: SortDir; href: string; className?: string;
}) {
  const active = current === col;
  return (
    <th className={`text-left p-3 ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-medium transition-colors hover:text-navy group"
        style={{ color: active ? "var(--color-navy, #1e2b4a)" : undefined }}
      >
        <span className={active ? "text-navy" : "text-muted"}>{label}</span>
        <span className="flex flex-col -gap-0.5">
          <ChevronUp size={9} className={active && dir === "asc" ? "text-navy" : "text-muted/40 group-hover:text-muted"} />
          <ChevronDown size={9} className={active && dir === "desc" ? "text-navy" : "text-muted/40 group-hover:text-muted"} />
        </span>
      </Link>
    </th>
  );
}
