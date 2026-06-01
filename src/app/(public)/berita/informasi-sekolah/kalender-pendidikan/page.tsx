import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Kalender Pendidikan 2025/2026 — SMKN 74 Jakarta" };

const semesters = [
  {
    label: "Ganjil",
    period: "15 Juli 2025 – 19 Desember 2025",
    days: "108 hari efektif",
    items: [
      { date: "14–18 Jul 2025", t: "MPLS kelas X" },
      { date: "21 Jul 2025",     t: "Awal pembelajaran efektif" },
      { date: "17 Agu 2025",     t: "HUT Kemerdekaan RI" },
      { date: "29 Sep–3 Okt",    t: "Ujian Tengah Semester Ganjil" },
      { date: "20 Okt 2025",     t: "Cuti bersama Maulid Nabi" },
      { date: "28 Okt 2025",     t: "Hari Sumpah Pemuda — Upacara" },
      { date: "10 Nov 2025",     t: "Hari Pahlawan — Upacara" },
      { date: "8–12 Des 2025",   t: "Penilaian Akhir Semester Ganjil" },
      { date: "19 Des 2025",     t: "Penerimaan rapor & libur akhir semester" },
    ],
  },
  {
    label: "Genap",
    period: "5 Januari 2026 – 26 Juni 2026",
    days: "115 hari efektif",
    items: [
      { date: "5 Jan 2026",      t: "Awal semester genap" },
      { date: "29 Mar–4 Apr",    t: "Perkiraan Ujian Sekolah Kelas XII" },
      { date: "7–12 Apr 2026",   t: "Ujian Tengah Semester Genap" },
      { date: "21 Apr 2026",     t: "Hari Kartini — Upacara" },
      { date: "12–21 Mei 2026",  t: "Libur Hari Raya Idul Fitri" },
      { date: "22 Mei 2026",     t: "Masuk kembali pasca libur" },
      { date: "1 Jun 2026",      t: "Hari Lahir Pancasila" },
      { date: "8–13 Jun 2026",   t: "Penilaian Akhir Tahun" },
      { date: "26 Jun 2026",     t: "Pembagian rapor & libur akhir tahun" },
    ],
  },
];

const liburNasional = [
  { date: "17 Agu 2025", t: "HUT Kemerdekaan RI" },
  { date: "20 Okt 2025", t: "Maulid Nabi Muhammad SAW" },
  { date: "25 Des 2025", t: "Hari Raya Natal" },
  { date: "1 Jan 2026",  t: "Tahun Baru Masehi" },
  { date: "29 Jan 2026", t: "Tahun Baru Imlek" },
  { date: "18 Mar 2026", t: "Hari Raya Nyepi" },
  { date: "3 Apr 2026",  t: "Wafat Isa Almasih" },
  { date: "1 Mei 2026",  t: "Hari Buruh" },
  { date: "12–13 Mei",   t: "Hari Raya Idul Fitri" },
  { date: "14 Mei 2026", t: "Kenaikan Isa Almasih" },
  { date: "1 Jun 2026",  t: "Hari Lahir Pancasila" },
  { date: "19 Jun 2026", t: "Idul Adha" },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Informasi Sekolah", href: "/berita/informasi-sekolah" },
          { label: "Kalender Pendidikan 2025/2026" },
        ]}
        tagline="Tahun ajaran 2025/2026"
        title="Kalender pendidikan"
        accent="dari Juli ke Juni."
        cms={cms}
        cmsPrefix="kalender"
      />

      {/* Quick stats */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "223", l: "Total hari efektif" },
            { n: "2",   l: "Semester" },
            { n: "12",  l: "Libur nasional" },
            { n: "4",   l: "Periode ujian" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div data-cms-key={`kalender.stat_${i}_n`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Angka`} className="font-display stat-num text-navy">{cms[`kalender.stat_${i}_n`] ?? s.n}</div>
              <p data-cms-key={`kalender.stat_${i}_l`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Label`} className="text-[11px] uppercase tracking-widest text-muted mt-2">{cms[`kalender.stat_${i}_l`] ?? s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Semesters */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {semesters.map((s, i) => (
            <div key={s.label} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mb-6">
                <p data-cms-key={`kalender.sem_${i}_eyebrow`} data-cms-type="text" data-cms-label={`Semester ${i + 1} — Label`} className="text-[10px] uppercase tracking-[0.22em] text-amber font-medium">{cms[`kalender.sem_${i}_eyebrow`] ?? "Semester"}</p>
                <h2 data-cms-key={`kalender.sem_${i}_label`} data-cms-type="text" data-cms-label={`Semester ${i + 1} — Nama`} className="font-display text-4xl mt-1">{cms[`kalender.sem_${i}_label`] ?? s.label}</h2>
                <p className="text-sm text-muted mt-2"><span data-cms-key={`kalender.sem_${i}_period`} data-cms-type="text" data-cms-label={`Semester ${i + 1} — Periode`}>{cms[`kalender.sem_${i}_period`] ?? s.period}</span> · <span data-cms-key={`kalender.sem_${i}_days`} data-cms-type="text" data-cms-label={`Semester ${i + 1} — Hari Efektif`}>{cms[`kalender.sem_${i}_days`] ?? s.days}</span></p>
              </div>
              <ol className="relative border-l-2 border-amber/30 ml-3 space-y-5">
                {s.items.map((item, idx) => (
                  <li key={item.t + idx} className="pl-6 relative">
                    <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-amber border-4 border-paper" />
                    <p data-cms-key={`kalender.sem_${i}_item_${idx}_date`} data-cms-type="text" data-cms-label={`Semester ${i + 1} Agenda ${idx + 1} — Tanggal`} className="text-[10px] uppercase tracking-widest text-amber font-medium">{cms[`kalender.sem_${i}_item_${idx}_date`] ?? item.date}</p>
                    <p data-cms-key={`kalender.sem_${i}_item_${idx}_t`} data-cms-type="text" data-cms-label={`Semester ${i + 1} Agenda ${idx + 1} — Kegiatan`} className="font-display text-base mt-1">{cms[`kalender.sem_${i}_item_${idx}_t`] ?? item.t}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Libur nasional */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="kalender.libur_eyebrow" data-cms-type="text" data-cms-label="Libur — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["kalender.libur_eyebrow"] ?? "Libur Nasional"}</p>
            <h2 data-cms-key="kalender.libur_heading" data-cms-type="text" data-cms-label="Libur — Judul" className="font-display headline-section max-w-2xl">{cms["kalender.libur_heading"] ?? "Hari-hari libur tahun ini."}</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {liburNasional.map((l, i) => (
              <li
                key={l.t}
                className="reveal flex items-center gap-4 p-4 rounded-xl bg-paper-soft hover:bg-white hover:border-amber border border-transparent transition-all"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span data-cms-key={`kalender.libur_${i}_date`} data-cms-type="text" data-cms-label={`Libur ${i + 1} — Tanggal`} className="shrink-0 h-12 w-20 rounded-lg bg-navy text-amber grid place-items-center font-display text-[11px] uppercase tracking-wide text-center px-1 leading-tight">
                  {cms[`kalender.libur_${i}_date`] ?? l.date}
                </span>
                <span data-cms-key={`kalender.libur_${i}_t`} data-cms-type="text" data-cms-label={`Libur ${i + 1} — Nama`} className="text-sm font-medium">{cms[`kalender.libur_${i}_t`] ?? l.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Informasi", title: "Tata Tertib & Kode Etik", body: "Aturan akademik dan sosial.", href: "/berita/informasi-sekolah/tata-tertib", bg: "bg-amber", ink: "text-navy" },
          { tag: "Berita", title: "Agenda", body: "Kalender bulanan terdekat.", href: "/berita/agenda", bg: "bg-navy", ink: "text-paper" },
          { tag: "Akademik", title: "Kurikulum Merdeka", body: "Penerapan di SMKN 74.", href: "/profil/kurikulum", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
