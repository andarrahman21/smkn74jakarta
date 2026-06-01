import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Profil Tenaga Pendidik & Kependidikan — SMKN 74 Jakarta" };

const umum = [
  { initials: "DN", name: "Dewi Nurjanah, S.Pd", role: "Bahasa Indonesia", bg: "bg-navy" },
  { initials: "RP", name: "Rio Pramudita, S.Pd", role: "Matematika", bg: "bg-navy-deep" },
  { initials: "HS", name: "Hesti Susanti, S.Pd", role: "Bahasa Inggris", bg: "bg-moss" },
  { initials: "JT", name: "Joko Tarmono, S.Pd", role: "Sejarah Indonesia", bg: "bg-rust" },
  { initials: "AS", name: "Ani Saraswati, S.Pd", role: "PPKn", bg: "bg-amber", ink: "text-navy" },
  { initials: "TM", name: "Teguh Maulana, S.Pd", role: "PJOK", bg: "bg-navy" },
  { initials: "RD", name: "Ratna Dewi, S.Pd.I", role: "Pendidikan Agama Islam", bg: "bg-moss" },
  { initials: "ED", name: "Eka Damayanti, S.Pd", role: "Bimbingan Konseling", bg: "bg-navy-deep" },
];

const kependidikan = [
  { initials: "SP", name: "Sumiati Pratiwi", role: "Ka. Tata Usaha", bg: "bg-navy" },
  { initials: "RW", name: "Rini Widyaningsih", role: "Pustakawan", bg: "bg-amber", ink: "text-navy" },
  { initials: "BP", name: "Budi Prasetyo", role: "Laboran Multimedia", bg: "bg-rust" },
  { initials: "MK", name: "Maria Kartika", role: "Staf Keuangan", bg: "bg-moss" },
];

export default async function Page() {
  const cms = await resolveSiteContent();

  const umumPeople = umum.map((p, i) => ({
    ...p,
    name: cms[`tendik.umum.${i}.name`] ?? p.name,
    role: cms[`tendik.umum.${i}.role`] ?? p.role,
  }));
  const supportPeople = kependidikan.map((p, i) => ({
    ...p,
    name: cms[`tendik.support.${i}.name`] ?? p.name,
    role: cms[`tendik.support.${i}.role`] ?? p.role,
  }));

  const stats = [
    { n: "42", l: "Total tenaga pendidik" },
    { n: "12", l: "Staf kependidikan" },
    { n: "4", l: "Konsentrasi seni" },
    { n: "8", l: "Mata pelajaran umum" },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Tenaga Pendidik & Kependidikan" },
        ]}
        tagline={cms["tendik.tagline"] ?? "Orang-orang sekolah"}
        taglineKey="tendik.tagline"
        title={cms["tendik.title"] ?? "Guru, staf, dan"}
        titleKey="tendik.title"
        accent={cms["tendik.accent"] ?? "pendamping setiap hari."}
        accentKey="tendik.accent"
      />

      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div data-cms-key={`tendik.stat.${i}.n`} data-cms-type="text" data-cms-label="Angka statistik" className="font-display stat-num text-navy">{cms[`tendik.stat.${i}.n`] ?? s.n}</div>
              <p data-cms-key={`tendik.stat.${i}.l`} data-cms-type="text" data-cms-label="Label statistik" className="text-[11px] uppercase tracking-widest text-muted mt-2">{cms[`tendik.stat.${i}.l`] ?? s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <PeopleSection people={umumPeople} cmsPrefix="tendik.umum" headingKey="tendik.umum.heading" eyebrowKey="tendik.umum.eyebrow" heading={cms["tendik.umum.heading"] ?? "Guru Mata Pelajaran."} eyebrow={cms["tendik.umum.eyebrow"] ?? "Tenaga Pendidik"} />
      <PeopleSection people={supportPeople} cmsPrefix="tendik.support" headingKey="tendik.support.heading" eyebrowKey="tendik.support.eyebrow" heading={cms["tendik.support.heading"] ?? "Tenaga Kependidikan."} eyebrow={cms["tendik.support.eyebrow"] ?? "Pendukung"} />

      <RelatedCards
        items={[
          { tag: "Struktur", title: "Manajemen Sekolah", body: "Kepala sekolah & para wakil.", href: "/profil/struktur/manajemen", bg: "bg-navy", ink: "text-paper" },
          { tag: "Akademik", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-amber", ink: "text-navy" },
          { tag: "Akademik", title: "Kurikulum", body: "Bagaimana kami belajar.", href: "/profil/kurikulum", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
