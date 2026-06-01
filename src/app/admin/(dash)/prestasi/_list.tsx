"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, Trash2, CheckCircle, Copy, Check, ChevronUp, ChevronDown } from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AlertTriangle } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
type SortCol = "achieved_at" | "title" | "level" | "status";
type SortDir = "asc" | "desc";

type Row = {
  id: string;
  slug: string;
  title: string;
  sub: string | null;
  level: string;
  tag: string | null;
  achieved_at: string;
  status: string;
  view_count: number;
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

const LEVEL_PILL: Record<string, string> = {
  Internasional: "bg-amber/20 text-amber",
  Nasional:      "bg-black/10 text-muted",
  Provinsi:      "bg-[#cd7f32]/15 text-[#8B4513]",
  Kota:          "bg-navy/10 text-navy",
};

export function PrestasiList({
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
  const [togglePending, startToggle] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [nonaktifkanOpen, setNonaktifkanOpen] = useState(false);
  const [nonaktifkanRow, setNonaktifkanRow] = useState<Row | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function copyPermalink(slug: string, id: string) {
    const url = `${window.location.origin}/prestasi/${slug}`;
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
                        Hapus {selected.size} prestasi?
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

      {/* Nonaktifkan confirmation dialog */}
      <AlertDialog.Root open={nonaktifkanOpen} onOpenChange={setNonaktifkanOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-2xl bg-white p-6 shadow-xl border border-black/10 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-amber/15 text-amber grid place-items-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <AlertDialog.Title className="font-display text-lg leading-snug text-ink">
                  Nonaktifkan prestasi ini?
                </AlertDialog.Title>
                <AlertDialog.Description className="mt-1.5 text-sm text-ink/65 leading-relaxed">
                  {nonaktifkanRow && (
                    <><strong className="text-ink">&ldquo;{nonaktifkanRow.title}&rdquo;</strong> akan berubah menjadi draft dan tidak tampil di halaman publik.</>
                  )}
                </AlertDialog.Description>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <AlertDialog.Cancel asChild>
                <button type="button" disabled={togglePending} className="h-10 px-4 rounded-full text-sm font-medium text-muted hover:bg-paper-soft hover:text-ink transition-colors disabled:opacity-50">
                  Batal
                </button>
              </AlertDialog.Cancel>
              <button
                type="button"
                disabled={togglePending}
                onClick={() => {
                  if (!nonaktifkanRow) return;
                  const fd = new FormData();
                  fd.append("id", nonaktifkanRow.id);
                  fd.append("next", "draft");
                  startToggle(async () => {
                    await toggleStatus(fd);
                    setNonaktifkanOpen(false);
                    setNonaktifkanRow(null);
                  });
                }}
                className="h-10 px-5 rounded-full bg-amber text-navy text-sm font-medium hover:bg-amber/90 inline-flex items-center gap-2 disabled:opacity-60"
              >
                {togglePending && <Loader2 size={14} className="animate-spin" />}
                Ya, nonaktifkan
              </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      {/* Table */}
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-paper-soft">
            <tr>
              <th className="w-10 p-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 rounded accent-navy cursor-pointer" />
              </th>
              <SortTh col="title"       label="Judul"   current={sort} dir={dir} href={sortHrefs.title} />
              <SortTh col="level"       label="Level"   current={sort} dir={dir} href={sortHrefs.level}  className="hidden sm:table-cell" />
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-muted font-medium hidden lg:table-cell">Tag</th>
              <SortTh col="achieved_at" label="Diraih"  current={sort} dir={dir} href={sortHrefs.achieved_at} className="hidden md:table-cell" />
              <SortTh col="status"      label="Status"  current={sort} dir={dir} href={sortHrefs.status} className="hidden sm:table-cell" />
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isScheduled =
                r.status === "published" && new Date(r.achieved_at) > new Date();

              return (
                <tr
                  key={r.id}
                  className={`border-t border-black/5 transition-colors ${selected.has(r.id) ? "bg-amber/5" : "hover:bg-paper-soft/60"}`}
                >
                  <td className="p-3 text-center">
                    <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r.id)} className="h-4 w-4 rounded accent-navy cursor-pointer" />
                  </td>

                  {/* Judul + view count */}
                  <td className="p-3 align-middle">
                    <p className="font-display text-sm leading-snug">{r.title}</p>
                    {r.sub && <p className="text-[11px] text-muted mt-0.5">{r.sub}</p>}
                    {r.view_count > 0 && (
                      <p className="text-[11px] text-muted mt-0.5 tabular-nums">
                        {r.view_count.toLocaleString("id-ID")} tayangan
                      </p>
                    )}
                  </td>

                  {/* Level */}
                  <td className="p-3 align-middle hidden sm:table-cell whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest ${LEVEL_PILL[r.level] ?? "bg-navy/10 text-navy"}`}>
                      {r.level}
                    </span>
                  </td>

                  {/* Tag */}
                  <td className="p-3 align-middle hidden lg:table-cell">
                    {r.tag
                      ? <span className="px-2 py-0.5 rounded-full bg-amber/15 text-amber text-[11px]">{r.tag}</span>
                      : <span className="text-muted">—</span>}
                  </td>

                  {/* Diraih */}
                  <td className="p-3 align-middle text-sm text-ink/60 hidden md:table-cell whitespace-nowrap">
                    {new Date(r.achieved_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Status */}
                  <td className="p-3 align-middle hidden sm:table-cell whitespace-nowrap">
                    {isScheduled ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber/15 text-amber text-[10px] font-semibold uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                        Terjadwal
                      </span>
                    ) : r.status === "draft" ? (
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
                        <button
                          type="button"
                          onClick={() => { setNonaktifkanRow(r); setNonaktifkanOpen(true); }}
                          className="h-8 px-3 rounded-full border border-amber/40 text-amber text-xs font-medium hover:bg-amber hover:text-navy transition-colors whitespace-nowrap"
                        >
                          Nonaktifkan
                        </button>
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

                      <Link href={`/admin/prestasi/${r.id}/edit`} className="h-8 px-3 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft hover:border-navy transition-colors inline-flex items-center">
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
                        title="Hapus prestasi ini?"
                        description={`"${r.title}" akan dihapus permanen dan tidak bisa dipulihkan.`}
                        confirmLabel="Ya, hapus"
                        triggerClassName="h-8 px-3 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-sm text-muted">
                  {search ? `Tidak ada prestasi dengan kata kunci "${search}".` : "Belum ada prestasi."}
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
