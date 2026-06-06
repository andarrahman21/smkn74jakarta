import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { JURUSAN } from "@/lib/modul-ajar";

export const metadata = { title: "Modul Ajar — Admin SMKN 74" };

export default async function Page() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("modul_ajar").select("jurusan");
  const counts: Record<string, number> = {};
  for (const r of data ?? []) counts[r.jurusan] = (counts[r.jurusan] ?? 0) + 1;

  return (
    <div className="w-full">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Modul Ajar</p>
        <h1 className="font-display headline-section">Modul Ajar.</h1>
        <p className="text-sm text-muted mt-2 max-w-2xl">
          Pilih konsentrasi keahlian untuk mengelola modul ajarnya (cover &amp; file PDF flipbook).
          Modul tampil di halaman keahlian masing-masing.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {JURUSAN.map((j) => (
          <Link
            key={j.slug}
            href={`/admin/modul-ajar/${j.slug}`}
            className="group block rounded-2xl bg-white border border-black/5 p-5 hover:border-amber hover:shadow-lg hover:shadow-black/5 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">{j.label}</h2>
              <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted bg-paper-soft rounded-full px-2 py-1">
                {counts[j.slug] ?? 0} modul
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-navy group-hover:text-amber transition-colors">
              Kelola modul
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
