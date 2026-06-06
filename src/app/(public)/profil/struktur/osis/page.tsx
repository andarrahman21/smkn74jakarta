import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";
import { getStrukturProfil, toPeople } from "@/lib/struktur-data";

export const metadata: Metadata = { title: "OSIS — SMKN 74 Jakarta" };

const programs = [
  { n: "01", t: "Pekan Seni", d: "Festival seni tahunan menampilkan karya semua jurusan." },
  { n: "02", t: "Kampanye Sosial", d: "Aksi peduli lingkungan & literasi tetangga sekolah." },
  { n: "03", t: "MPLS", d: "Pengenalan lingkungan untuk siswa baru." },
  { n: "04", t: "Class Meeting", d: "Liga internal antar kelas: olahraga, e-sport, debat." },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  const peopleResolved = toPeople(await getStrukturProfil("osis"));
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "OSIS" },
        ]}
        tagline={cms["struktur-osis.header_tagline"] ?? "Organisasi Siswa Intra Sekolah"}
        taglineKey="struktur-osis.header_tagline"
        title={cms["struktur-osis.header_title"] ?? "Suara siswa,"}
        titleKey="struktur-osis.header_title"
        accent={cms["struktur-osis.header_accent"] ?? "aksi nyata."}
        accentKey="struktur-osis.header_accent"
      />

      {/* Programs */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="struktur-osis.programs_eyebrow" data-cms-type="text" data-cms-label="Label program" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["struktur-osis.programs_eyebrow"] ?? "Program Unggulan"}</p>
            <h2 data-cms-key="struktur-osis.programs_heading" data-cms-type="text" data-cms-label="Judul program" className="font-display headline-section max-w-2xl">{cms["struktur-osis.programs_heading"] ?? "Empat program yang menjadi ciri."}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {programs.map((p, i) => (
              <article key={p.n} className="reveal group bg-white border border-black/5 rounded-2xl p-7 hover:border-amber hover:-translate-y-0.5 transition-all duration-300" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-baseline gap-4 mb-2">
                  <span data-cms-key={`struktur-osis.program.${i}.n`} data-cms-type="text" data-cms-label="Nomor program" className="font-display text-3xl text-amber">{cms[`struktur-osis.program.${i}.n`] ?? p.n}</span>
                  <h3 data-cms-key={`struktur-osis.program.${i}.t`} data-cms-type="text" data-cms-label="Judul program" className="font-display text-2xl">{cms[`struktur-osis.program.${i}.t`] ?? p.t}</h3>
                </div>
                <p data-cms-key={`struktur-osis.program.${i}.d`} data-cms-type="textarea" data-cms-label="Deskripsi program" className="text-ink/70 leading-relaxed">{cms[`struktur-osis.program.${i}.d`] ?? p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PeopleSection
        people={peopleResolved}
        heading={cms["struktur-osis.heading"] ?? "Pengurus OSIS periode 2025/2026."}
        headingKey="struktur-osis.heading"
        eyebrowKey="struktur-osis.eyebrow"
        eyebrow={cms["struktur-osis.eyebrow"] ?? "Anggota"}
      />

      <RelatedCards
        items={[
          { tag: "Kesiswaan", title: "MPK", body: "Majelis Perwakilan Kelas.", href: "/profil/struktur/mpk", bg: "bg-amber", ink: "text-navy" },
          { tag: "Layanan", title: "Surat Izin Kegiatan", body: "Ajukan izin kegiatan OSIS.", href: "#", bg: "bg-moss", ink: "text-paper" },
          { tag: "Berita", title: "Agenda", body: "Lihat agenda terdekat.", href: "#", bg: "bg-rust", ink: "text-paper" },
        ]}
        heading={cms["struktur-osis.related_heading"] ?? "Telusuri lebih jauh tentang sekolah."}
        headingKey="struktur-osis.related_heading"
      />
    </>
  );
}
