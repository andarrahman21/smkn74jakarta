import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "Profil Tenaga Pendidik & Kependidikan — SMKN 74 Jakarta" };

const seni = [
  { initials: "SR", name: "Siti Rohayu, S.Sn", role: "Seni Tari", bg: "bg-rust" },
  { initials: "AH", name: "Ahmad Hidayat, S.Pd", role: "Seni Musik", bg: "bg-amber", ink: "text-navy" },
  { initials: "LK", name: "Lina Kartika, S.Sn", role: "Seni Karawitan", bg: "bg-moss" },
  { initials: "FA", name: "Fadli Akbar, S.Sn", role: "Seni Teater", bg: "bg-navy" },
];

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

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Tenaga Pendidik & Kependidikan" },
        ]}
        tagline="Orang-orang sekolah"
        title="Guru, staf, dan"
        accent="pendamping setiap hari."
      />

      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "42", l: "Total tenaga pendidik" },
            { n: "12", l: "Staf kependidikan" },
            { n: "4", l: "Konsentrasi seni" },
            { n: "8", l: "Mata pelajaran umum" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="font-display stat-num text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <PeopleSection people={seni} heading="Guru Konsentrasi Keahlian Seni." eyebrow="Tenaga Pendidik · Seni" />
      <PeopleSection people={umum} heading="Guru Mata Pelajaran Umum." eyebrow="Tenaga Pendidik · Umum" />
      <PeopleSection people={kependidikan} heading="Tenaga Kependidikan." eyebrow="Pendukung" />

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
