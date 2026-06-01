export const revalidate = 60;

import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { getPrestasiList, getPrestasiStats } from "@/lib/queries/prestasi";
import { PrestasiClientList } from "./_list";

export const metadata: Metadata = {
  title: "Prestasi — SMKN 74 Jakarta",
  description: "Catatan prestasi siswa dan tim SMK Negeri 74 Jakarta.",
};

export default async function Page() {
  const [list, stats] = await Promise.all([getPrestasiList(), getPrestasiStats()]);
  const items = list.map((p) => ({ ...p, id: p.slug }));

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Prestasi" },
        ]}
        tagline="Catatan dari panggung"
        title="Semua prestasi,"
        accent="dari kelas ke pentas nasional."
      />

      {/* Stats strip */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: String(stats.total), l: "Total prestasi" },
            { n: String(stats.nasional), l: "Tingkat nasional" },
            { n: "8", l: "Konsentrasi terlibat" },
            { n: "2026", l: "Tahun aktif" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="font-display stat-num text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <PrestasiClientList items={items} />
        </div>
      </section>
    </>
  );
}
