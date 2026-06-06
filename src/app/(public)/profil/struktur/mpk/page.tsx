import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";
import { getStrukturProfil, toPeople } from "@/lib/struktur-data";

export const metadata: Metadata = { title: "MPK — SMKN 74 Jakarta" };

const stats = [
  { n: "36", l: "Anggota perwakilan" },
  { n: "3", l: "Komisi" },
  { n: "12", l: "Sidang per tahun" },
  { n: "100%", l: "Kelas terwakili" },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  const peopleResolved = toPeople(await getStrukturProfil("mpk"));
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "MPK" },
        ]}
        tagline={cms["struktur-mpk.header_tagline"] ?? "Majelis Perwakilan Kelas"}
        taglineKey="struktur-mpk.header_tagline"
        title={cms["struktur-mpk.header_title"] ?? "Mengawasi & menyalurkan"}
        titleKey="struktur-mpk.header_title"
        accent={cms["struktur-mpk.header_accent"] ?? "aspirasi setiap kelas."}
        accentKey="struktur-mpk.header_accent"
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p data-cms-key="struktur-mpk.about_eyebrow" data-cms-type="text" data-cms-label="Label tentang MPK" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["struktur-mpk.about_eyebrow"] ?? "Tentang MPK"}</p>
            <h2 data-cms-key="struktur-mpk.about_heading" data-cms-type="text" data-cms-label="Judul tentang MPK" className="font-display headline-quote mb-4">{cms["struktur-mpk.about_heading"] ?? "Lembaga legislatif siswa."}</h2>
            <p data-cms-key="struktur-mpk.about_body" data-cms-type="textarea" data-cms-label="Paragraf tentang MPK" className="text-ink/75 leading-relaxed">
              {cms["struktur-mpk.about_body"] ?? "Majelis Perwakilan Kelas terdiri dari perwakilan setiap kelas. MPK mengawasi kinerja OSIS, menyalurkan aspirasi siswa, dan menyusun rekomendasi kebijakan kesiswaan."}
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 reveal" style={{ animationDelay: "0.1s" }}>
            {stats.map((s, i) => (
              <div key={s.l} className="bg-white border border-black/5 rounded-2xl p-6">
                <div data-cms-key={`struktur-mpk.stat.${i}.n`} data-cms-type="text" data-cms-label="Angka statistik" className="font-display stat-num text-navy">{cms[`struktur-mpk.stat.${i}.n`] ?? s.n}</div>
                <p data-cms-key={`struktur-mpk.stat.${i}.l`} data-cms-type="text" data-cms-label="Label statistik" className="text-[11px] uppercase tracking-widest text-muted mt-2">{cms[`struktur-mpk.stat.${i}.l`] ?? s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PeopleSection
        people={peopleResolved}
        heading={cms["struktur-mpk.heading"] ?? "Pimpinan MPK 2025/2026."}
        headingKey="struktur-mpk.heading"
        eyebrowKey="struktur-mpk.eyebrow"
        eyebrow={cms["struktur-mpk.eyebrow"] ?? "Anggota"}
      />

      <RelatedCards
        items={[
          { tag: "Kesiswaan", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
          { tag: "Struktur", title: "Komite Sekolah", body: "Mitra orang tua.", href: "/profil/struktur/komite", bg: "bg-moss", ink: "text-paper" },
          { tag: "Layanan", title: "Kotak Saran", body: "Kirim aspirasimu.", href: "#", bg: "bg-amber", ink: "text-navy" },
        ]}
        heading={cms["struktur-mpk.related_heading"] ?? "Telusuri lebih jauh tentang sekolah."}
        headingKey="struktur-mpk.related_heading"
      />
    </>
  );
}
