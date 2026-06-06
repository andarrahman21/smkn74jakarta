import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { KATEGORI } from "@/lib/struktur";

export const metadata = { title: "Struktur Organisasi — Admin SMKN 74" };

export default async function Page() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("struktur_profil").select("kategori");
  const counts: Record<string, number> = {};
  for (const r of data ?? []) counts[r.kategori] = (counts[r.kategori] ?? 0) + 1;

  return (
    <div className="w-full">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Struktur Organisasi</p>
        <h1 className="font-display headline-section">Struktur Organisasi.</h1>
        <p className="text-sm text-muted mt-2 max-w-2xl">
          Pilih kelompok untuk mengelola profilnya (titel/jabatan, nama, &amp; foto).
          Profil tampil di halaman struktur organisasi masing-masing.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {KATEGORI.map((k) => (
          <Link
            key={k.slug}
            href={`/admin/struktur/${k.slug}`}
            className="group block rounded-2xl bg-white border border-black/5 p-5 hover:border-amber hover:shadow-lg hover:shadow-black/5 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">{k.label}</h2>
              <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted bg-paper-soft rounded-full px-2 py-1">
                {counts[k.slug] ?? 0} profil
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-navy group-hover:text-amber transition-colors">
              Kelola profil
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
