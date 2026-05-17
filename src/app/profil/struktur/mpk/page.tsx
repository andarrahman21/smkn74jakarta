import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "MPK — SMKN 74 Jakarta" };

const people = [
  { initials: "FR", name: "Faiz Rahmadhani", role: "Ketua MPK", bg: "bg-navy" },
  { initials: "NH", name: "Naila Hafidza", role: "Wakil Ketua", bg: "bg-amber", ink: "text-navy" },
  { initials: "ZA", name: "Zahra Aprilia", role: "Sekretaris", bg: "bg-moss" },
  { initials: "RB", name: "Reza Bachtiar", role: "Komisi I — Konstitusi", bg: "bg-rust" },
  { initials: "AL", name: "Adelia Lestari", role: "Komisi II — Anggaran", bg: "bg-navy-deep" },
  { initials: "GY", name: "Gilang Yulianto", role: "Komisi III — Aspirasi", bg: "bg-navy" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "MPK" },
        ]}
        tagline="Majelis Perwakilan Kelas"
        title="Mengawasi & menyalurkan"
        accent="aspirasi setiap kelas."
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Tentang MPK</p>
            <h2 className="font-display headline-quote mb-4">Lembaga legislatif siswa.</h2>
            <p className="text-ink/75 leading-relaxed">
              Majelis Perwakilan Kelas terdiri dari perwakilan setiap kelas. MPK mengawasi kinerja OSIS, menyalurkan aspirasi siswa, dan menyusun rekomendasi kebijakan kesiswaan.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 reveal" style={{ animationDelay: "0.1s" }}>
            {[
              { n: "36", l: "Anggota perwakilan" },
              { n: "3", l: "Komisi" },
              { n: "12", l: "Sidang per tahun" },
              { n: "100%", l: "Kelas terwakili" },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-black/5 rounded-2xl p-6">
                <div className="font-display stat-num text-navy">{s.n}</div>
                <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PeopleSection people={people} heading="Pimpinan MPK 2025/2026." />

      <RelatedCards
        items={[
          { tag: "Kesiswaan", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
          { tag: "Struktur", title: "Komite Sekolah", body: "Mitra orang tua.", href: "/profil/struktur/komite", bg: "bg-moss", ink: "text-paper" },
          { tag: "Layanan", title: "Kotak Saran", body: "Kirim aspirasimu.", href: "#", bg: "bg-amber", ink: "text-navy" },
        ]}
      />
    </>
  );
}
