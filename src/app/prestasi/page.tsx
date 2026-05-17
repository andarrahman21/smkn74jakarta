import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { prestasiList } from "@/data/prestasi";
import { PrestasiClientList } from "./_list";

export const metadata: Metadata = {
  title: "Prestasi — SMKN 74 Jakarta",
  description: "Catatan prestasi siswa dan tim SMK Negeri 74 Jakarta.",
};

export default function Page() {
  const items = prestasiList.map((p) => ({ ...p, id: p.slug }));
  const total = prestasiList.length;
  const nasional = prestasiList.filter((p) => p.level === "Nasional" || p.level === "Internasional").length;

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
            { n: String(total), l: "Total prestasi" },
            { n: String(nasional), l: "Tingkat nasional" },
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
