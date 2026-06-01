import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  deleteAgendaItem,
  duplicateAgendaItem,
  bulkDeleteAgendaItems,
} from "./actions";
import { AgendaList } from "./_list";
import { SearchInput } from "./_search";
import { Suspense } from "react";

export const metadata = { title: "Agenda — Admin SMKN 74" };

const PAGE_SIZE = 10;

type SortCol = "title" | "category" | "scheduled_at";
type SortDir = "asc" | "desc";

const SORT_COLS: SortCol[] = ["title", "category", "scheduled_at"];

async function getRows(page: number, search: string, sort: SortCol, dir: SortDir) {
  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let q = supabase
    .from("agenda")
    .select("id, title, location, category, scheduled_at, time_range", { count: "exact" })
    .order(sort, { ascending: dir === "asc" })
    .range(from, to);

  if (search) q = q.ilike("title", `%${search}%`);

  const { data, error, count } = await q;
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

type Search = { page?: string; q?: string; sort?: string; dir?: string };

export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const requested = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const search = (sp.q ?? "").trim();
  const sort: SortCol = SORT_COLS.includes(sp.sort as SortCol) ? (sp.sort as SortCol) : "scheduled_at";
  const dir: SortDir = sp.dir === "asc" ? "asc" : "desc";

  const { rows, total } = await getRows(requested, search, sort, dir);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requested, totalPages);

  return (
    <div className="w-full">
      <header className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Agenda</p>
          <h1 className="font-display headline-section">Kelola Agenda.</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/agenda/categories"
            className="text-xs text-muted hover:text-navy transition-colors underline underline-offset-4 decoration-black/20 hover:decoration-navy"
          >
            Kelola kategori
          </Link>
          <Link
            href="/admin/agenda/new"
            className="h-11 px-5 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            + Tambah agenda
          </Link>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted tabular-nums">{total} agenda</p>
        <Suspense fallback={null}>
          <SearchInput defaultValue={search} />
        </Suspense>
      </div>

      {search && (
        <p className="text-xs text-muted mb-4">
          Hasil pencarian untuk{" "}
          <span className="font-medium text-ink">&ldquo;{search}&rdquo;</span>
          {" "}· {total} ditemukan
        </p>
      )}

      <AgendaList
        rows={rows}
        search={search}
        sort={sort}
        dir={dir}
        sortHrefs={{
          title:        buildSortHref({ col: "title",        sort, dir, search }),
          category:     buildSortHref({ col: "category",     sort, dir, search }),
          scheduled_at: buildSortHref({ col: "scheduled_at", sort, dir, search }),
        }}
        deleteFn={deleteAgendaItem}
        duplicate={duplicateAgendaItem}
        bulkDelete={bulkDeleteAgendaItems}
      />

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} total={total} search={search} sort={sort} dir={dir} />
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildSortHref({
  col, sort, dir, search,
}: {
  col: SortCol; sort: SortCol; dir: SortDir; search: string;
}) {
  const nextDir: SortDir = sort === col ? (dir === "desc" ? "asc" : "desc") : "desc";
  return buildHref({ search, sort: col, dir: nextDir });
}

function buildHref({
  search, page, sort, dir,
}: {
  search: string; page?: number; sort?: string; dir?: string;
}) {
  const p = new URLSearchParams();
  if (search) p.set("q", search);
  if (page && page > 1) p.set("page", String(page));
  if (sort && sort !== "scheduled_at") p.set("sort", sort);
  if (dir && dir !== "desc") p.set("dir", dir);
  const qs = p.toString();
  return qs ? `/admin/agenda?${qs}` : "/admin/agenda";
}

function Pagination({
  page, totalPages, total, search, sort, dir,
}: {
  page: number; totalPages: number; total: number;
  search: string; sort: SortCol; dir: SortDir;
}) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  return (
    <nav aria-label="Paginasi" className="mt-6 flex items-center justify-between flex-wrap gap-3">
      <p className="text-xs text-muted">Menampilkan {from}–{to} dari {total}</p>
      <div className="flex items-center gap-1.5">
        <PageLink page={prev} disabled={!prev} label="←" ariaLabel="Sebelumnya" search={search} sort={sort} dir={dir} />
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`g-${i}`} className="px-2 text-xs text-muted">…</span>
          ) : (
            <PageLink key={p} page={p} active={p === page} label={String(p)} search={search} sort={sort} dir={dir} />
          )
        )}
        <PageLink page={next} disabled={!next} label="→" ariaLabel="Berikutnya" search={search} sort={sort} dir={dir} />
      </div>
    </nav>
  );
}

function PageLink({
  page, label, active, disabled, ariaLabel, search, sort, dir,
}: {
  page: number | null; label: string; active?: boolean; disabled?: boolean; ariaLabel?: string;
  search: string; sort: SortCol; dir: SortDir;
}) {
  const base = "h-9 min-w-[36px] px-3 rounded-lg text-sm font-medium grid place-items-center transition-colors";
  if (disabled || page === null)
    return <span aria-disabled className={`${base} text-muted/40 border border-transparent cursor-not-allowed`}>{label}</span>;
  if (active)
    return <span aria-current="page" className={`${base} bg-navy text-paper`}>{label}</span>;
  return (
    <Link href={buildHref({ search, page, sort, dir })} aria-label={ariaLabel} className={`${base} border border-black/10 text-ink/80 hover:bg-paper-soft`}>
      {label}
    </Link>
  );
}
