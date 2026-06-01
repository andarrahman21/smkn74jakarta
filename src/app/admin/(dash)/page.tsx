import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Dashboard — Admin SMKN 74" };

async function getCounts() {
  const supabase = createAdminClient();
  const tables = ["pengumuman", "berita", "prestasi", "event", "agenda", "kotak_saran"] as const;
  const out: Record<string, number> = {};
  await Promise.all(
    tables.map(async (t) => {
      const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
      if (error) {
        console.error(`count ${t}`, error.message);
        out[t] = -1;
      } else {
        out[t] = count ?? 0;
      }
    })
  );
  return out;
}

async function getNewSaran() {
  const supabase = createAdminClient();
  const { count } = await supabase.from("kotak_saran").select("*", { count: "exact", head: true }).eq("status", "baru");
  return count ?? 0;
}

async function getRecentSaran() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("kotak_saran")
    .select("id, nama, kategori, pesan, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

const CARDS: { table: string; label: string; href: string }[] = [
  { table: "pengumuman",  label: "Pengumuman", href: "/admin/pengumuman" },
  { table: "berita",      label: "Berita",     href: "/admin/berita" },
  { table: "prestasi",    label: "Prestasi",   href: "/admin/prestasi" },
  { table: "event",       label: "Event",      href: "/admin/event" },
  { table: "agenda",      label: "Agenda",     href: "/admin/agenda" },
  { table: "kotak_saran", label: "Kotak Saran",href: "/admin/kotak-saran" },
];

export default async function DashboardPage() {
  const [counts, newSaran, recent] = await Promise.all([getCounts(), getNewSaran(), getRecentSaran()]);

  return (
    <div className="w-full">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin</p>
        <h1 className="font-display headline-section">Dashboard.</h1>
        {newSaran > 0 && (
          <p className="mt-3 inline-flex items-center gap-2 text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-amber animate-pulse-dot" />
            <strong>{newSaran}</strong> pesan kotak saran baru menunggu ditinjau.
          </p>
        )}
      </header>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-muted mb-3">Statistik</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CARDS.map((c) => (
            <li key={c.table}>
              <Link
                href={c.href}
                className="block bg-white border border-black/5 rounded-2xl p-5 hover:border-amber hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted">{c.label}</p>
                <p className="font-display stat-num text-navy mt-1">
                  {counts[c.table] === -1 ? "—" : counts[c.table]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-xs uppercase tracking-widest text-muted">Kotak saran terbaru</h2>
          <Link href="/admin/kotak-saran" className="text-xs text-navy hover:text-amber transition-colors">
            Lihat semua →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="bg-white border border-black/5 rounded-2xl p-6 text-sm text-muted">Belum ada pesan masuk.</div>
        ) : (
          <ul className="bg-white border border-black/5 rounded-2xl divide-y divide-black/5 overflow-hidden">
            {recent.map((r) => (
              <li key={r.id} className="p-4 flex items-start gap-3">
                <span
                  className={`mt-1 shrink-0 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-semibold ${
                    r.status === "baru"
                      ? "bg-amber text-navy"
                      : r.status === "spam"
                      ? "bg-rust/15 text-rust"
                      : "bg-paper-soft text-muted"
                  }`}
                >
                  {r.status}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">
                    {r.nama ?? "Anonim"} · {r.kategori} ·{" "}
                    {new Date(r.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                  <p className="text-sm text-ink/85 mt-1 line-clamp-2">{r.pesan}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
