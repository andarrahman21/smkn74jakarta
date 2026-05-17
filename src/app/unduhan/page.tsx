import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = {
  title: "Unduhan — SMKN 74 Jakarta",
  description: "Pusat unduhan dokumen resmi: brosur, juknis PPDB, RKAS, formulir, dan sertifikat.",
};

type DocItem = {
  cat: string;
  title: string;
  size: string;
  type: "PDF" | "DOCX" | "XLSX" | "ZIP";
  date: string;
};

const docs: DocItem[] = [
  // PPDB
  { cat: "PPDB",        title: "Brosur PPDB 2026/2027",                size: "1.2 MB",  type: "PDF",  date: "1 Apr 2026" },
  { cat: "PPDB",        title: "Juknis PPDB DKI Jakarta 2026",          size: "3.8 MB",  type: "PDF",  date: "20 Mar 2026" },
  { cat: "PPDB",        title: "Formulir Pendaftaran (offline)",        size: "180 KB",  type: "PDF",  date: "1 Apr 2026" },
  { cat: "PPDB",        title: "Daftar Kuota & Jalur 2026/2027",        size: "240 KB",  type: "PDF",  date: "1 Apr 2026" },
  // Akademik
  { cat: "Akademik",    title: "Kalender Pendidikan 2025/2026",         size: "320 KB",  type: "PDF",  date: "14 Jul 2025" },
  { cat: "Akademik",    title: "Kurikulum Operasional Sekolah",         size: "2.1 MB",  type: "PDF",  date: "10 Jul 2025" },
  { cat: "Akademik",    title: "Silabus Konsentrasi Seni",              size: "1.6 MB",  type: "ZIP",  date: "10 Jul 2025" },
  // Keuangan
  { cat: "Keuangan",    title: "RKAS 2026 (Ringkasan Publik)",          size: "560 KB",  type: "PDF",  date: "10 Jan 2026" },
  { cat: "Keuangan",    title: "Laporan Realisasi BOS Semester Ganjil", size: "780 KB",  type: "PDF",  date: "5 Jan 2026" },
  { cat: "Keuangan",    title: "Laporan Realisasi BOP Semester Ganjil", size: "720 KB",  type: "PDF",  date: "5 Jan 2026" },
  // Formulir
  { cat: "Formulir",    title: "Surat Ijin Tidak Masuk",                size: "90 KB",   type: "DOCX", date: "—" },
  { cat: "Formulir",    title: "Surat Ijin Kegiatan",                   size: "95 KB",   type: "DOCX", date: "—" },
  { cat: "Formulir",    title: "Permohonan Peminjaman Sarana",          size: "85 KB",   type: "DOCX", date: "—" },
  { cat: "Formulir",    title: "Form Kotak Saran (cetak)",              size: "70 KB",   type: "PDF",  date: "—" },
  // Profil sekolah
  { cat: "Profil",      title: "Profil Sekolah 2025/2026",              size: "4.2 MB",  type: "PDF",  date: "1 Aug 2025" },
  { cat: "Profil",      title: "Logo SMKN 74 (paket berkas)",           size: "2.4 MB",  type: "ZIP",  date: "—" },
  { cat: "Profil",      title: "Visi, Misi, & Nilai Sekolah",           size: "180 KB",  type: "PDF",  date: "—" },
  // PKL
  { cat: "PKL",         title: "Buku Jurnal PKL",                       size: "640 KB",  type: "PDF",  date: "—" },
  { cat: "PKL",         title: "Daftar Mitra DUDI 2026",                size: "320 KB",  type: "PDF",  date: "—" },
];

const typeBadge: Record<DocItem["type"], string> = {
  PDF:  "bg-rust text-paper",
  DOCX: "bg-navy text-paper",
  XLSX: "bg-moss text-paper",
  ZIP:  "bg-amber text-navy",
};

const groups = Array.from(
  docs.reduce((acc, d) => {
    if (!acc.has(d.cat)) acc.set(d.cat, []);
    acc.get(d.cat)!.push(d);
    return acc;
  }, new Map<string, DocItem[]>())
);

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Unduhan" },
        ]}
        tagline="Pusat dokumen resmi"
        title="Semua yang"
        accent="bisa diunduh —"
        trailing="dalam satu halaman."
        subtitle="Brosur, juknis PPDB, RKAS, formulir, dan dokumen resmi sekolah lainnya. Bila dokumen yang Anda cari tidak ada, hubungi Tata Usaha."
      />

      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: String(docs.length), l: "Total dokumen" },
            { n: String(groups.length), l: "Kategori" },
            { n: "PDF · DOCX · ZIP", l: "Format tersedia" },
            { n: "Gratis", l: "Bebas biaya" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="font-display text-3xl lg:text-5xl text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20 space-y-14">
        {groups.map(([cat, list], gi) => (
          <div key={cat} className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex items-baseline justify-between mb-6 reveal">
              <h2 className="font-display text-3xl">{cat}</h2>
              <span className="text-xs uppercase tracking-widest text-muted">{list.length} dokumen</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {list.map((d, i) => (
                <li key={d.title} className="reveal" style={{ animationDelay: `${(gi * 0.05) + (i * 0.04)}s` }}>
                  <a
                    href="#"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-black/5 hover:border-amber hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    {/* File icon */}
                    <div className={`shrink-0 h-14 w-12 rounded-md ${typeBadge[d.type]} grid place-items-center font-display text-[10px] font-bold uppercase tracking-wider`}>
                      {d.type}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base leading-snug group-hover:text-navy transition-colors">{d.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-[11px] uppercase tracking-widest text-muted">
                        <span>{d.size}</span>
                        {d.date !== "—" && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-mist" />
                            <span>{d.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 h-10 w-10 rounded-full border border-black/10 grid place-items-center transition-all group-hover:bg-amber group-hover:border-amber">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <RelatedCards
        items={[
          { tag: "PPDB", title: "PPDB 2026/2027", body: "Tahapan, jalur, persyaratan.", href: "/berita/informasi-sekolah/ppdb", bg: "bg-amber", ink: "text-navy" },
          { tag: "Keuangan", title: "Info Keuangan", body: "Transparansi BOP & BOS.", href: "/info-keuangan", bg: "bg-navy", ink: "text-paper" },
          { tag: "Kontak", title: "Hubungi Tata Usaha", body: "Tidak menemukan dokumen?", href: "/kontak", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
