import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  deleteGuruItem,
  toggleGuruStatus,
  duplicateGuruItem,
  bulkDeleteGuruItems,
  bulkPublishGuruItems,
} from "./actions";
import { DaftarGuruList } from "./_list";
import { SearchInput } from "./_search";
import { Suspense } from "react";

export const metadata = { title: "Daftar Guru — Admin SMKN 74" };

const PAGE_SIZE = 10;

type FilterStatus = "all" | "published" | "draft";
type SortCol = "sort_order" | "name" | "role" | "status";
type SortDir = "asc" | "desc";

const SORT_COLS: SortCol[] = ["sort_order", "name", "role", "status"];

async function getRows(
  page: number,
  search: string,
  status: FilterStatus,
  sort: SortCol,
  dir: SortDir,
) {
  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let q = supabase
    .from("daftar_guru")
    .select("id, sort_order, initials, name, role, group_label, bg, ink, status", { count: "exact" })
    .order(sort, { ascending: dir === "asc" })
    .range(from, to);

  if (search) q = q.ilike("name", `%${search}%`);
  if (status === "published") q = q.eq("status", "published");
  else if (status === "draft") q = q.eq("status", "draft");

  const { data, error, count } = await q;
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

async function getCounts(search: string) {
  const supabase = createAdminClient();

  function baseQ(statusFilter?: string) {
    let q = supabase
      .from("daftar_guru")
      .select("*", { count: "exact", head: true });
    if (statusFilter) q = q.eq("status", statusFilter);
    if (search) q = q.ilike("name", `%${search}%`);
    return q;
  }

  const [allRes, pubRes, draftRes] = await Promise.all([
    baseQ(),
    baseQ("published"),
    baseQ("draft"),
  ]);
  return {
    all: allRes.count ?? 0,
    published: pubRes.count ?? 0,
    draft: draftRes.count ?? 0,
  };
}

type Search = { page?: string; q?: string; status?: string; sort?: string; dir?: string };

const TABS = [
  { key: "all",       label: "Semua" },
  { key: "published", label: "Tayang" },
  { key: "draft",     label: "Draft" },
] as const;

export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const requested = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const search = (sp.q ?? "").trim();
  const activeStatus: FilterStatus =
    sp.status === "published" || sp.status === "draft" ? sp.status : "all";
  const sort: SortCol = SORT_COLS.includes(sp.sort as SortCol) ? (sp.sort as SortCol) : "sort_order";
  const dir: SortDir = sp.dir === "desc" ? "desc" : "asc";

  const [{ rows, total }, counts] = await Promise.all([
    getRows(requested, search, activeStatus, sort, dir),
    getCounts(search),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requested, totalPages);

  return (
    <div className="w-full">
      <header className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Daftar Guru</p>
          <h1 className="font-display headline-section">Kelola Daftar Guru.</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/daftar-guru/new"
            className="h-11 px-5 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            + Tambah guru
          </Link>
        </div>
      </header>

      {/* Status tabs + search */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 p-1 rounded-full bg-paper-soft border border-black/5">
          {TABS.map((tab) => {
            const isActive = activeStatus === tab.key;
            return (
              <Link
                key={tab.key}
                href={buildHref({ status: tab.key as FilterStatus, search })}
                className={`h-9 px-4 rounded-full text-xs font-medium transition-colors inline-flex items-center gap-2 ${
                  isActive
                    ? "bg-navy text-paper shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                {tab.label}
                <span className={`tabular-nums text-[10px] ${isActive ? "text-paper/70" : "text-muted"}`}>
                  {counts[tab.key as keyof typeof counts]}
                </span>
              </Link>
            );
          })}
        </div>
        <Suspense fallback={null}>
          <SearchInput defaultValue={search} />
        </Suspense>
      </div>

      {search && (
        <p className="text-xs text-muted mb-4">
          Hasil pencarian untuk <span className="font-medium text-ink">&ldquo;{search}&rdquo;</span>
          {" "}· {total} ditemukan
        </p>
      )}

      <DaftarGuruList
        rows={rows}
        search={search}
        sort={sort}
        dir={dir}
        sortHrefs={{
          sort_order: buildSortHref({ col: "sort_order", sort, dir, search, status: activeStatus }),
          name:       buildSortHref({ col: "name",       sort, dir, search, status: activeStatus }),
          role:       buildSortHref({ col: "role",       sort, dir, search, status: activeStatus }),
          status:     buildSortHref({ col: "status",     sort, dir, search, status: activeStatus }),
        }}
        toggleStatus={toggleGuruStatus}
        duplicate={duplicateGuruItem}
        deleteFn={deleteGuruItem}
        bulkDelete={bulkDeleteGuruItems}
        bulkPublish={bulkPublishGuruItems}
      />

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          status={activeStatus}
          search={search}
          sort={sort}
          dir={dir}
        />
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildSortHref({
  col, sort, dir, search, status,
}: {
  col: SortCol; sort: SortCol; dir: SortDir; search: string; status: FilterStatus;
}) {
  const nextDir: SortDir = sort === col ? (dir === "asc" ? "desc" : "asc") : "asc";
  return buildHref({ status, search, sort: col, dir: nextDir, page: undefined });
}

function buildHref({
  status,
  search,
  page,
  sort,
  dir,
}: {
  status: FilterStatus;
  search: string;
  page?: number;
  sort?: string;
  dir?: string;
}) {
  const p = new URLSearchParams();
  if (status !== "all") p.set("status", status);
  if (search) p.set("q", search);
  if (page && page > 1) p.set("page", String(page));
  if (sort && sort !== "sort_order") p.set("sort", sort);
  if (dir && dir !== "asc") p.set("dir", dir);
  const qs = p.toString();
  return qs ? `/admin/daftar-guru?${qs}` : "/admin/daftar-guru";
}

function Pagination({
  page,
  totalPages,
  total,
  status,
  search,
  sort,
  dir,
}: {
  page: number;
  totalPages: number;
  total: number;
  status: FilterStatus;
  search: string;
  sort: SortCol;
  dir: SortDir;
}) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const pages: (number | "…")[] = [];
  const win = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - win && i <= page + win)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <nav aria-label="Paginasi" className="mt-6 flex items-center justify-between flex-wrap gap-3">
      <p className="text-xs text-muted">
        Menampilkan {from}–{to} dari {total}
      </p>
      <div className="flex items-center gap-1.5">
        <PageLink page={prev} disabled={!prev} label="←" ariaLabel="Halaman sebelumnya" status={status} search={search} sort={sort} dir={dir} />
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`g-${i}`} className="px-2 text-xs text-muted">…</span>
          ) : (
            <PageLink key={p} page={p} active={p === page} label={String(p)} status={status} search={search} sort={sort} dir={dir} />
          )
        )}
        <PageLink page={next} disabled={!next} label="→" ariaLabel="Halaman berikutnya" status={status} search={search} sort={sort} dir={dir} />
      </div>
    </nav>
  );
}

function PageLink({
  page,
  label,
  active,
  disabled,
  ariaLabel,
  status,
  search,
  sort,
  dir,
}: {
  page: number | null;
  label: string;
  active?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  status: FilterStatus;
  search: string;
  sort: SortCol;
  dir: SortDir;
}) {
  const base = "h-9 min-w-[36px] px-3 rounded-lg text-sm font-medium grid place-items-center transition-colors";
  if (disabled || page === null) {
    return (
      <span aria-disabled className={`${base} text-muted/40 border border-transparent cursor-not-allowed`}>
        {label}
      </span>
    );
  }
  if (active) {
    return (
      <span aria-current="page" className={`${base} bg-navy text-paper`}>
        {label}
      </span>
    );
  }
  return (
    <Link
      href={buildHref({ status, search, page, sort, dir })}
      aria-label={ariaLabel}
      className={`${base} border border-black/10 text-ink/80 hover:bg-paper-soft`}
    >
      {label}
    </Link>
  );
}
