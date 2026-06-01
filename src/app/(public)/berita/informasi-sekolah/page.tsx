import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Informasi Sekolah — SMKN 74 Jakarta" };

const infos = [
  { tag: "Akademik",     title: "Kalender Pendidikan 2025/2026",            body: "Jadwal lengkap tahun ajaran, hari efektif, libur nasional, dan ujian.",       href: "/berita/informasi-sekolah/kalender-pendidikan", bg: "bg-navy",       ink: "text-paper" },
  { tag: "Akademik",     title: "Tata Tertib & Kode Etik Siswa",            body: "Aturan akademik, kehadiran, seragam, dan etika di kelas maupun di luar.",     href: "/berita/informasi-sekolah/tata-tertib",         bg: "bg-amber",      ink: "text-navy" },
  { tag: "Kesiswaan",    title: "Panduan MPLS & Pengenalan Sekolah",        body: "Panduan resmi MPLS, perlengkapan, dan agenda harian peserta didik baru.",     href: "/berita/informasi-sekolah/panduan-mpls",        bg: "bg-moss",       ink: "text-paper" },
  { tag: "PPDB",         title: "PPDB 2026/2027 — Jadwal & Persyaratan",    body: "Tahapan pendaftaran, jalur, jadwal seleksi, dan dokumen yang diperlukan.",    href: "/berita/informasi-sekolah/ppdb",                bg: "bg-rust",       ink: "text-paper" },
  { tag: "Akademik",     title: "Kurikulum Merdeka — Penerapan di SMKN 74", body: "Bagaimana kami menjalankan Kurikulum Merdeka dengan ritme seni.",             href: "/profil/kurikulum",                              bg: "bg-paper-soft", ink: "text-ink" },
  { tag: "Layanan",      title: "Layanan Surat Akademik & Kesiswaan",       body: "Cara mengajukan surat ijin, keterangan, rekomendasi, dan tugas.",             href: "/berita/informasi-sekolah/layanan-surat",       bg: "bg-navy-deep",  ink: "text-paper" },
  { tag: "Kesehatan",    title: "Layanan UKS & Pendampingan BK",            body: "Layanan kesehatan dasar dan pendampingan bimbingan konseling.",               href: "/berita/informasi-sekolah/uks-bk",              bg: "bg-amber-soft", ink: "text-navy" },
  { tag: "Sarana",       title: "Peminjaman Sarana & Prasarana Sekolah",    body: "Prosedur peminjaman ruang, alat, dan fasilitas untuk kegiatan kesiswaan.",    href: "/berita/informasi-sekolah/peminjaman-sarana",   bg: "bg-moss",       ink: "text-paper" },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Informasi Sekolah" },
        ]}
        tagline="Panduan & kebijakan"
        title="Informasi resmi,"
        accent="rapi & mudah dicari."
        cms={cms}
        cmsPrefix="infosekolah"
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="infosekolah.topik_eyebrow" data-cms-type="text" data-cms-label="Label Topik" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["infosekolah.topik_eyebrow"] ?? "Topik"}</p>
            <h2 data-cms-key="infosekolah.topik_heading" data-cms-type="text" data-cms-label="Judul Topik" className="font-display headline-section max-w-2xl">{cms["infosekolah.topik_heading"] ?? "Telusuri berdasarkan topik."}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {infos.map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className={`${c.bg} ${c.ink} group rounded-2xl p-7 flex flex-col gap-3 aspect-[4/3] hover:-translate-y-2 transition-transform duration-500 reveal`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <p data-cms-key={`infosekolah.card_${i}_tag`} data-cms-type="text" data-cms-label={`Kartu ${i + 1} — Tag`} className="text-[10px] uppercase tracking-[0.22em] opacity-80">{cms[`infosekolah.card_${i}_tag`] ?? c.tag}</p>
                <h3 data-cms-key={`infosekolah.card_${i}_title`} data-cms-type="text" data-cms-label={`Kartu ${i + 1} — Judul`} className="font-display text-xl leading-tight mt-auto">{cms[`infosekolah.card_${i}_title`] ?? c.title}</h3>
                <p data-cms-key={`infosekolah.card_${i}_body`} data-cms-type="textarea" data-cms-label={`Kartu ${i + 1} — Deskripsi`} className="text-sm opacity-80 leading-relaxed">{cms[`infosekolah.card_${i}_body`] ?? c.body}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <span data-cms-key="infosekolah.card_cta" data-cms-type="text" data-cms-label="Label Tombol Kartu">{cms["infosekolah.card_cta"] ?? "Selengkapnya"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Berita", title: "Berita Sekolah", body: "Cerita dari kelas dan komunitas.", href: "/berita", bg: "bg-navy", ink: "text-paper" },
          { tag: "Berita", title: "Agenda", body: "Kegiatan terdekat sekolah.", href: "/berita/agenda", bg: "bg-amber", ink: "text-navy" },
          { tag: "Berita", title: "Event", body: "Pekan Seni, Open House, & lainnya.", href: "/berita/event", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
