"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, Trash2, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AlertTriangle } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";

type SortCol = "sort_order" | "name" | "role" | "status";
type SortDir = "asc" | "desc";

type Row = {
  id: string;
  sort_order: number;
  initials: string;
  name: string;
  role: string;
  group_label: string | null;
  bg: string;
  ink: string;
  status: string;
};

type Props = {
  rows: Row[];
  search: string;
  sort: SortCol;
  dir: SortDir;
  sortHrefs: Record<SortCol, string>;
  toggleStatus: (fd: FormData) => Promise<void>;
  duplicate: (fd: FormData) => Promise<void>;
  deleteFn: (fd: FormData) => Promise<void>;
  bulkDelete: (fd: FormData) => Promise<void>;
  bulkPublish: (fd: FormData) => Promise<void>;
};

export function DaftarGuruList({
  rows,
  search,
  sort,
  dir,
  sortHrefs,
  toggleStatus,
  duplicate,
  deleteFn,
  bulkDelete,
  bulkPublish,
}: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deletePending, startDelete] = useTransition();
  const [publishPending, startPublish] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);

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
              Tayangkan
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
                        Hapus {selected.size} guru?
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
              <SortTh col="sort_order" label="Urut" current={sort} dir={dir} href={sortHrefs.sort_order} className="w-16" />
              <SortTh col="name"       label="Nama"  current={sort} dir={dir} href={sortHrefs.name} />
              <SortTh col="role"       label="Jabatan" current={sort} dir={dir} href={sortHrefs.role} className="hidden sm:table-cell" />
              <SortTh col="status"     label="Status" current={sort} dir={dir} href={sortHrefs.status} className="hidden sm:table-cell" />
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

                {/* Sort order */}
                <td className="p-3 align-middle text-center tabular-nums text-sm text-muted">
                  {r.sort_order}
                </td>

                {/* Initials + Name */}
                <td className="p-3 align-middle">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-full ${r.bg} ${r.ink} text-xs font-bold grid place-items-center shrink-0 font-display`}
                    >
                      {r.initials || r.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm leading-snug">{r.name}</p>
                      <p className="text-[11px] text-muted mt-0.5 sm:hidden">{r.role}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="p-3 align-middle text-sm text-ink/70 hidden sm:table-cell">
                  {r.role || <span className="text-muted">—</span>}
                </td>

                {/* Status */}
                <td className="p-3 align-middle hidden sm:table-cell whitespace-nowrap">
                  {r.status === "draft" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber/15 text-amber text-[10px] font-semibold uppercase tracking-widest">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                      Draft
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-moss/10 text-moss text-[10px] font-semibold uppercase tracking-widest">
                      <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                      Tayang
                    </span>
                  )}
                </td>

                {/* Aksi */}
                <td className="p-3 align-middle">
                  <div className="flex items-center gap-1.5 justify-end">
                    {r.status === "published" ? (
                      <form action={toggleStatus}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="next" value="draft" />
                        <button
                          type="submit"
                          className="h-8 px-3 rounded-full border border-amber/40 text-amber text-xs font-medium hover:bg-amber hover:text-navy transition-colors whitespace-nowrap"
                        >
                          Nonaktifkan
                        </button>
                      </form>
                    ) : (
                      <form action={toggleStatus}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="next" value="published" />
                        <button
                          type="submit"
                          className="h-8 px-3 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors whitespace-nowrap"
                        >
                          Aktifkan
                        </button>
                      </form>
                    )}

                    <Link href={`/admin/daftar-guru/${r.id}/edit`} className="h-8 px-3 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft hover:border-navy transition-colors inline-flex items-center">
                      Edit
                    </Link>

                    <form action={duplicate}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        title="Duplikasi sebagai draft baru"
                        className="h-8 w-8 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors grid place-items-center"
                      >
                        ⧉
                      </button>
                    </form>

                    <DeleteButton
                      action={deleteFn}
                      id={r.id}
                      title="Hapus guru ini?"
                      description={`"${r.name}" akan dihapus permanen dan tidak bisa dipulihkan.`}
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
                  {search ? `Tidak ada guru dengan kata kunci "${search}".` : "Belum ada data guru."}
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
  col,
  label,
  current,
  dir,
  href,
  className = "",
}: {
  col: SortCol;
  label: string;
  current: SortCol;
  dir: SortDir;
  href: string;
  className?: string;
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
          <ChevronUp
            size={9}
            className={active && dir === "asc" ? "text-navy" : "text-muted/40 group-hover:text-muted"}
          />
          <ChevronDown
            size={9}
            className={active && dir === "desc" ? "text-navy" : "text-muted/40 group-hover:text-muted"}
          />
        </span>
      </Link>
    </th>
  );
}
