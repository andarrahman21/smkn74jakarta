import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Mitra DUDI — SMKN 74 Jakarta",
  description: "Daftar mitra Dunia Usaha & Dunia Industri tempat siswa SMKN 74 Jakarta menjalani PKL.",
};

type Mitra = {
  initials: string;
  name: string;
  field: string;
  city: string;
  since: string;
  bg: string;
  ink: string;
};

const mitra: Mitra[] = [
  // Multimedia / Animasi
  { initials: "VS", name: "Visinema Pictures",         field: "Multimedia & Film",         city: "Jakarta Selatan", since: "2019", bg: "bg-rust",       ink: "text-paper" },
  { initials: "BM", name: "Brown Bag Films Indonesia", field: "Animasi 3D",                 city: "Tangerang",       since: "2021", bg: "bg-amber",      ink: "text-navy" },
  { initials: "KA", name: "KOMPAS.com",                field: "Media & Jurnalistik",        city: "Jakarta Pusat",   since: "2018", bg: "bg-navy",       ink: "text-paper" },

  // Seni & Pertunjukan
  { initials: "BB", name: "Bentara Budaya Jakarta",    field: "Pertunjukan Seni",           city: "Jakarta Pusat",   since: "2017", bg: "bg-moss",       ink: "text-paper" },
  { initials: "SH", name: "Salihara Arts Center",      field: "Seni Pertunjukan",           city: "Jakarta Selatan", since: "2020", bg: "bg-navy-deep",  ink: "text-paper" },
  { initials: "IK", name: "Institut Kesenian Jakarta", field: "Pendidikan Seni Tinggi",     city: "Jakarta Pusat",   since: "2016", bg: "bg-amber-soft", ink: "text-navy" },

  // Musik
  { initials: "DM", name: "Demajors",                   field: "Label Musik",                city: "Jakarta Selatan", since: "2022", bg: "bg-rust",       ink: "text-paper" },
  { initials: "WR", name: "Warung Radio",               field: "Produksi Audio",             city: "Jakarta",          since: "2023", bg: "bg-navy",       ink: "text-paper" },

  // Akuntansi / Bisnis
  { initials: "TR", name: "Tokopedia",                  field: "E-commerce & Bisnis",        city: "Jakarta",          since: "2021", bg: "bg-moss",       ink: "text-paper" },
  { initials: "BN", name: "Bank Negara Indonesia",      field: "Perbankan & Keuangan",       city: "Jakarta",          since: "2015", bg: "bg-amber",      ink: "text-navy" },

  // Teknologi
  { initials: "GJ", name: "Gojek",                       field: "Teknologi & Mobilitas",       city: "Jakarta Selatan", since: "2022", bg: "bg-navy-deep",  ink: "text-paper" },
  { initials: "MD", name: "Mekari (Talenta)",            field: "HR Tech & SaaS",              city: "Jakarta",          since: "2023", bg: "bg-rust",       ink: "text-paper" },

  // Pemerintah
  { initials: "KE", name: "Kemendikbudristek",          field: "Pendidikan & Pemerintah",    city: "Jakarta Selatan", since: "2018", bg: "bg-navy",       ink: "text-paper" },
  { initials: "DK", name: "Dinas Pendidikan DKI",       field: "Pendidikan Provinsi",         city: "Jakarta",          since: "—",     bg: "bg-amber-soft", ink: "text-navy" },
];

const types = Array.from(new Set(mitra.map((m) => m.field.split(" ")[0])));

export default async function Page() {
  const cms = await resolveSiteContent();

  const statItems = [
    { n: String(mitra.length), l: "Total mitra aktif" },
    { n: String(types.length), l: "Sektor industri" },
    { n: "10+", l: "Tahun kerja sama" },
    { n: "150+", l: "Siswa PKL / tahun" },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Mitra DUDI" },
        ]}
        tagline={cms["mitra.tagline"] ?? "Kerja Sama Industri"}
        taglineKey="mitra.tagline"
        title={cms["mitra.title"] ?? "Belajar langsung dari"}
        titleKey="mitra.title"
        accent={cms["mitra.accent"] ?? "dunia industri nyata."}
        accentKey="mitra.accent"
        subtitle={cms["mitra.subtitle"] ?? "Mitra Dunia Usaha & Dunia Industri tempat siswa SMKN 74 Jakarta menjalani Praktik Kerja Lapangan (PKL), magang, dan kolaborasi karya."}
        subtitleKey="mitra.subtitle"
      />

      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.06}s` }}>
              <div data-cms-key={`mitra.stat.${i}.n`} data-cms-type="text" data-cms-label="Angka statistik" className="font-display stat-num text-navy">{cms[`mitra.stat.${i}.n`] ?? s.n}</div>
              <p data-cms-key={`mitra.stat.${i}.l`} data-cms-type="text" data-cms-label="Label statistik" className="text-[11px] uppercase tracking-widest text-muted mt-2">{cms[`mitra.stat.${i}.l`] ?? s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grid mitra */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="mitra.list_eyebrow" data-cms-type="text" data-cms-label="Label daftar" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["mitra.list_eyebrow"] ?? "Daftar Mitra"}</p>
            <h2 data-cms-key="mitra.list_heading" data-cms-type="text" data-cms-label="Judul daftar" className="font-display headline-section max-w-2xl">{cms["mitra.list_heading"] ?? "Industri yang membuka pintu untuk kami."}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {mitra.map((m, i) => (
              <article
                key={m.name}
                className={`${m.bg} ${m.ink} group reveal rounded-2xl p-6 aspect-[3/4] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <p data-cms-key={`mitra.${i}.field`} data-cms-type="text" data-cms-label="Bidang" className="text-[10px] uppercase tracking-[0.22em] opacity-80">{cms[`mitra.${i}.field`] ?? m.field}</p>
                <div className="flex-1 grid place-items-center">
                  <span className="font-display text-[44px] sm:text-[56px] md:text-[64px] leading-none italic opacity-90 transition-transform duration-700 group-hover:scale-110">
                    {m.initials}
                  </span>
                </div>
                <div className="border-t border-current/15 pt-3">
                  <p data-cms-key={`mitra.${i}.name`} data-cms-type="text" data-cms-label="Nama mitra" className="font-display text-base leading-snug">{cms[`mitra.${i}.name`] ?? m.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] opacity-70">
                    <span data-cms-key={`mitra.${i}.city`} data-cms-type="text" data-cms-label="Kota">{cms[`mitra.${i}.city`] ?? m.city}</span>
                    <span className="h-1 w-1 rounded-full bg-current/40" />
                    <span>Sejak <span data-cms-key={`mitra.${i}.since`} data-cms-type="text" data-cms-label="Sejak tahun">{cms[`mitra.${i}.since`] ?? m.since}</span></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ajakan kerja sama */}
      <section className="bg-navy text-paper py-16 md:py-24 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 flex items-end justify-between px-8 opacity-25">
          {[240, 280, 320, 220, 300, 260, 320, 280, 300, 260, 340, 240].map((h, i) => (
            <span
              key={i}
              className="block w-[4vw] max-w-[60px] bg-amber/60 rounded-full animate-wave"
              style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.18}s`, animationDuration: `${1.4 + (i % 4) * 0.18}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
          <p data-cms-key="mitra.cta_eyebrow" data-cms-type="text" data-cms-label="Label ajakan" className="text-xs uppercase tracking-[0.22em] text-amber mb-5">{cms["mitra.cta_eyebrow"] ?? "Tertarik bekerja sama?"}</p>
          <h2 className="font-display headline-page font-light mb-6">
            <span data-cms-key="mitra.cta_heading" data-cms-type="text" data-cms-label="Judul ajakan">{cms["mitra.cta_heading"] ?? "Mari menumbuhkan siswa kami"}</span> <em data-cms-key="mitra.cta_heading_accent" data-cms-type="text" data-cms-label="Aksen judul ajakan" className="not-italic text-amber">{cms["mitra.cta_heading_accent"] ?? "bersama-sama"}</em>.
          </h2>
          <p data-cms-key="mitra.cta_body" data-cms-type="textarea" data-cms-label="Paragraf ajakan" className="text-paper/75 max-w-xl mx-auto mb-8">
            {cms["mitra.cta_body"] ?? "Kami terbuka untuk PKL, magang berbayar, lokakarya, dan kolaborasi karya. Hubungi tim Humas & DUDI."}
          </p>
          <a
            href="mailto:humas@smkn74.sch.id"
            data-cms-key="mitra.cta_button" data-cms-type="text" data-cms-label="Tombol ajakan"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform"
          >
            {cms["mitra.cta_button"] ?? "Email Humas & DUDI →"}
          </a>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-amber", ink: "text-navy" },
          { tag: "Informasi", title: "Layanan Surat HUMAS & DUDI", body: "Pengajuan surat untuk PKL.", href: "/berita/informasi-sekolah/layanan-surat", bg: "bg-navy", ink: "text-paper" },
        ]}
      />
    </>
  );
}
