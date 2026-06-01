import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Stub admin page — list rows + link to Supabase Studio for editing.
 * Pattern yang sama dengan /admin/pengumuman bisa direplikasi untuk full CRUD.
 */
export async function StubAdmin({
  table,
  label,
  displayCols,
  studioSlug,
}: {
  table: string;
  label: string;
  displayCols: { key: string; head: string }[];
  studioSlug?: string;
}) {
  const supabase = createAdminClient();
  const cols = ["id", ...displayCols.map((c) => c.key)].join(", ");
  const { data, error } = await supabase.from(table).select(cols).limit(100);
  const rows = (Array.isArray(data) ? data : []) as unknown as Record<string, unknown>[];

  return (
    <div className="w-full">
      <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · {label}</p>
          <h1 className="font-display headline-section">Kelola {label}.</h1>
        </div>
        <a
          href={`https://supabase.com/dashboard/project/bgqcxvnqmfixbrrofgff/editor?schema=public&table=${studioSlug ?? table}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-5 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          Edit di Supabase Studio ↗
        </a>
      </header>

      <div className="bg-amber/10 border border-amber/30 rounded-2xl p-5 text-sm mb-6">
        <p className="font-medium mb-1">Form CRUD belum dibangun untuk {label}.</p>
        <p className="text-ink/70">
          Untuk saat ini, gunakan Supabase Studio (tombol di atas) untuk tambah/ubah/hapus data {label}.
          Atau replikasi pattern dari <code className="px-1.5 py-0.5 rounded bg-white border border-black/5 text-xs">/admin/pengumuman</code>.
        </p>
      </div>

      {error ? (
        <p className="text-rust text-sm">Gagal memuat: {error.message}</p>
      ) : (
        <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-paper-soft">
              <tr>
                {displayCols.map((c) => (
                  <th key={c.key} className="text-left p-3 text-[10px] uppercase tracking-widest text-muted font-medium">
                    {c.head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id as string} className="border-t border-black/5">
                  {displayCols.map((c) => (
                    <td key={c.key} className="p-3 align-top">
                      {formatCell(row[c.key])}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={displayCols.length} className="p-6 text-center text-muted">
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        ← <Link href="/admin" className="hover:text-amber">Kembali ke dashboard</Link>
      </p>
    </div>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (Array.isArray(v)) return `${v.length} item${v.length === 1 ? "" : "s"}`;
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
    return new Date(v).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  }
  const s = String(v);
  return s.length > 60 ? s.slice(0, 60) + "…" : s;
}
