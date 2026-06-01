import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  deleteBerita,
  toggleBeritaStatus,
  duplicateBerita,
  bulkDeleteBerita,
  bulkPublishBerita,
} from "./actions";
import { BeritaList } from "./_list";
import { SearchInput } from "./_search";
import { Suspense } from "react";

export const metadata = { title: "Berita — Admin SMKN 74" };

const PAGE_SIZE = 10;

type FilterStatus = "all" | "published" | "draft";
type SortCol = "published_at" | "title" | "tag" | "status";
type SortDir = "asc" | "desc";

const SORT_COLS: SortCol[] = ["published_at", "title", "tag", "status"];

async function getPage(
  page: number,
  status: FilterStatus,
  search: string,
  sort: SortCol,
  dir: SortDir,
) {
  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let q = supabase
    .from("berita")
    .select("id, slug, published_at, tag, title, excerpt, status, author, read_time, view_count", { count: "exact" })
    .order(sort, { ascending: dir === "asc" })
    .range(from, to);

  if (status !== "all") q = q.eq("status", status);
  if (search) q = q.ilike("title", `%${search}%`);

  const { data, error, count } = await q;
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

async function getStatusCounts(search: string) {
  const supabase = createAdminClient();

  function baseQ(statusFilter?: string) {
    let q = supabase
      .from("berita")
      .select("*", { count: "exact", head: true });
    if (statusFilter) q = q.eq("status", statusFilter);
    if (search) q = q.ilike("title", `%${search}%`);
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

type Search = { page?: string; status?: string; q?: string; sort?: string; dir?: string };

export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const requested = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const status: FilterStatus =
    sp.status === "published" || sp.status === "draft" ? sp.status : "all";
  const search = (sp.q ?? "").trim();
  const sort: SortCol = SORT_COLS.includes(sp.sort as SortCol) ? (sp.sort as SortCol) : "published_at";
  const dir: SortDir = sp.dir === "asc" ? "asc" : "desc";

  const [{ rows, total }, counts] = await Promise.all([
    getPage(requested, status, search, sort, dir),
    getStatusCounts(search),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requested, totalPages);

  return (
    <div className="w-full">
      <header className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Berita</p>
          <h1 className="font-display headline-section">Kelola Berita.</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/berita/categories"
            className="text-xs text-muted hover:text-navy transition-colors underline underline-offset-4 decoration-black/20 hover:decoration-navy"
          >
            Kelola kategori
          </Link>
          <Link
            href="/admin/berita/new"
            className="h-11 px-5 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            + Tambah berita
          </Link>
        </div>
      </header>

      {/* Search + status filter row */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 rounded-full bg-paper-soft border border-black/5">
          <FilterTab
            href={buildHref({ status: "all", search })}
            label="Semua"
            count={counts.all}
            active={status === "all"}
          />
          <FilterTab
            href={buildHref({ status: "published", search })}
            label="Tayang"
            count={counts.published}
            active={status === "published"}
            dot="moss"
          />
          <FilterTab
            href={buildHref({ status: "draft", search })}
            label="Draft"
            count={counts.draft}
            active={status === "draft"}
            dot="amber"
          />
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

      <BeritaList
        rows={rows}
        search={search}
        sort={sort}
        dir={dir}
        toggleStatus={toggleBeritaStatus}
        duplicate={duplicateBerita}
        deleteFn={deleteBerita}
        bulkDelete={bulkDeleteBerita}
        bulkPublish={bulkPublishBerita}
      />

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} total={total} status={status} search={search} sort={sort} dir={dir} />
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  if (sort && sort !== "published_at") p.set("sort", sort);
  if (dir && dir !== "desc") p.set("dir", dir);
  const qs = p.toString();
  return qs ? `/admin/berita?${qs}` : "/admin/berita";
}

function FilterTab({
  href,
  label,
  count,
  active,
  dot,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
  dot?: "moss" | "amber";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-xs uppercase tracking-widest font-medium transition-colors ${
        active ? "bg-navy text-paper" : "text-ink/70 hover:bg-white hover:text-navy"
      }`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dot === "moss" ? "bg-moss" : "bg-amber"}`}
        />
      )}
      {label}
      <span className={`text-[10px] tabular-nums ${active ? "text-paper/60" : "text-muted"}`}>
        {count}
      </span>
    </Link>
  );
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
  const base =
    "h-9 min-w-[36px] px-3 rounded-lg text-sm font-medium grid place-items-center transition-colors";
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
