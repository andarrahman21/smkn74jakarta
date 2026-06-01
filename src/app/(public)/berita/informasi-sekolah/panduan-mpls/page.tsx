import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Panduan MPLS — SMKN 74 Jakarta" };

const days = [
  {
    n: "01", date: "Senin, 14 Juli 2026",
    theme: "Pengenalan Sekolah",
    items: ["Upacara pembukaan MPLS", "Sambutan kepala sekolah", "Pengenalan struktur sekolah", "Tur kampus per kelompok"],
  },
  {
    n: "02", date: "Selasa, 15 Juli 2026",
    theme: "Akademik & Kurikulum",
    items: ["Pengenalan Kurikulum Merdeka", "Pengenalan konsentrasi keahlian", "Tata tertib akademik", "Bedah jadwal pelajaran"],
  },
  {
    n: "03", date: "Rabu, 16 Juli 2026",
    theme: "Kesiswaan & OSIS",
    items: ["Pengenalan OSIS & MPK", "Ekstrakurikuler & ruang ekspresi", "Komitmen anti-bullying", "Simulasi kegiatan kelas"],
  },
  {
    n: "04", date: "Kamis, 17 Juli 2026",
    theme: "Identitas & Karakter",
    items: ["Workshop nilai sekolah", "Sesi orang tua–siswa–wali kelas", "Pengenalan layanan BK & UKS", "Doa bersama"],
  },
  {
    n: "05", date: "Jumat, 18 Juli 2026",
    theme: "Penutupan & Kelas Pertama",
    items: ["Refleksi peserta", "Penampilan kelompok terbaik", "Apel penutupan MPLS", "Pertemuan pertama wali kelas"],
  },
];

const perlengkapan = [
  "Seragam putih abu-abu lengkap dengan dasi & badge",
  "Sepatu hitam polos & kaos kaki putih",
  "Topi MPLS yang sudah dibagikan saat daftar ulang",
  "Co-card identitas peserta",
  "Buku tulis & alat tulis",
  "Botol minum & bekal sehat (boleh)",
  "Masker cadangan",
  "Surat izin orang tua bila ada kondisi kesehatan khusus",
];

const aturan = [
  "Dilarang melakukan perpeloncoan dalam bentuk apa pun.",
  "Tidak menerima hukuman fisik. Pelanggaran melaporkan ke wali kelas.",
  "MPLS bersifat edukatif, gembira, dan inklusif.",
  "Setiap kelompok didampingi guru pembina dan kakak OSIS.",
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
          { label: "Panduan MPLS" },
        ]}
        tagline="Untuk Siswa Baru"
        title="Lima hari mengenal"
        accent="rumah baru bersama."
        cms={cms}
        cmsPrefix="mpls"
      />

      {/* Stats */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "14–18", l: "Juli 2026" },
            { n: "5",     l: "Hari MPLS" },
            { n: "07.00", l: "Mulai harian" },
            { n: "300+",  l: "Peserta didik baru" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div data-cms-key={`mpls.stat_${i}_n`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Angka`} className="font-display stat-num text-navy">{cms[`mpls.stat_${i}_n`] ?? s.n}</div>
              <p data-cms-key={`mpls.stat_${i}_l`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Label`} className="text-[11px] uppercase tracking-widest text-muted mt-2">{cms[`mpls.stat_${i}_l`] ?? s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agenda harian */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="mpls.agenda_eyebrow" data-cms-type="text" data-cms-label="Agenda — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["mpls.agenda_eyebrow"] ?? "Agenda"}</p>
            <h2 data-cms-key="mpls.agenda_heading" data-cms-type="text" data-cms-label="Agenda — Judul" className="font-display headline-section max-w-2xl">{cms["mpls.agenda_heading"] ?? "Apa yang terjadi setiap hari."}</h2>
          </div>
          <ol className="space-y-4">
            {days.map((d, i) => (
              <li
                key={d.n}
                className="reveal group flex flex-col md:flex-row md:items-stretch gap-5 p-6 rounded-2xl bg-white border border-black/5 hover:border-amber hover:-translate-y-0.5 transition-all"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="shrink-0 md:w-48">
                  <span className="font-display text-3xl text-amber leading-none">Hari <span data-cms-key={`mpls.day_${i}_n`} data-cms-type="text" data-cms-label={`Hari ${i + 1} — Nomor`}>{cms[`mpls.day_${i}_n`] ?? d.n}</span></span>
                  <p data-cms-key={`mpls.day_${i}_date`} data-cms-type="text" data-cms-label={`Hari ${i + 1} — Tanggal`} className="text-[10px] uppercase tracking-widest text-muted mt-2">{cms[`mpls.day_${i}_date`] ?? d.date}</p>
                  <p data-cms-key={`mpls.day_${i}_theme`} data-cms-type="text" data-cms-label={`Hari ${i + 1} — Tema`} className="font-display text-xl mt-2">{cms[`mpls.day_${i}_theme`] ?? d.theme}</p>
                </div>
                <ul className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-ink/75 md:border-l md:border-black/5 md:pl-6">
                  {d.items.map((it, j) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="shrink-0 mt-2 h-1 w-3 rounded-full bg-amber" />
                      <span data-cms-key={`mpls.day_${i}_item_${j}`} data-cms-type="text" data-cms-label={`Hari ${i + 1} Agenda ${j + 1}`}>{cms[`mpls.day_${i}_item_${j}`] ?? it}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Perlengkapan + aturan */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 reveal">
            <p data-cms-key="mpls.perlengkapan_eyebrow" data-cms-type="text" data-cms-label="Perlengkapan — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["mpls.perlengkapan_eyebrow"] ?? "Perlengkapan"}</p>
            <h2 data-cms-key="mpls.perlengkapan_heading" data-cms-type="text" data-cms-label="Perlengkapan — Judul" className="font-display headline-quote mb-6">{cms["mpls.perlengkapan_heading"] ?? "Yang dibawa setiap hari."}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {perlengkapan.map((p, i) => (
                <li key={p} className="flex items-start gap-3 p-4 rounded-xl bg-paper-soft">
                  <span className="shrink-0 h-7 w-7 rounded-full bg-amber/20 text-amber grid place-items-center text-sm font-semibold">{i + 1}</span>
                  <span data-cms-key={`mpls.perlengkapan_${i}`} data-cms-type="text" data-cms-label={`Perlengkapan ${i + 1}`} className="text-sm text-ink/80 leading-relaxed">{cms[`mpls.perlengkapan_${i}`] ?? p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 reveal" style={{ animationDelay: "0.1s" }}>
            <div className="bg-navy text-paper rounded-2xl p-7">
              <p data-cms-key="mpls.aturan_eyebrow" data-cms-type="text" data-cms-label="Aturan — Label" className="text-[10px] uppercase tracking-widest text-amber font-medium mb-4">{cms["mpls.aturan_eyebrow"] ?? "Aturan MPLS"}</p>
              <ul className="space-y-3 text-sm leading-relaxed">
                {aturan.map((r, i) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="shrink-0 mt-1 h-4 w-4 rounded-full bg-amber/20 text-amber grid place-items-center text-xs">✓</span>
                    <span data-cms-key={`mpls.aturan_${i}`} data-cms-type="text" data-cms-label={`Aturan ${i + 1}`} className="text-paper/85">{cms[`mpls.aturan_${i}`] ?? r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Informasi", title: "Tata Tertib Siswa", body: "Aturan akademik & sosial.", href: "/berita/informasi-sekolah/tata-tertib", bg: "bg-amber", ink: "text-navy" },
          { tag: "Informasi", title: "Kalender Pendidikan", body: "Jadwal tahun ajaran.", href: "/berita/informasi-sekolah/kalender-pendidikan", bg: "bg-navy", ink: "text-paper" },
          { tag: "Profil", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
