import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "PPDB 2026/2027 — SMKN 74 Jakarta" };

const jalur = [
  { code: "01", title: "Jalur Prestasi", quota: "30%", body: "Untuk siswa dengan prestasi akademik atau non-akademik (seni, olahraga) tingkat kota ke atas." },
  { code: "02", title: "Jalur Zonasi", quota: "40%", body: "Untuk calon siswa yang berdomisili di wilayah zonasi Jakarta Selatan & sekitarnya." },
  { code: "03", title: "Jalur Afirmasi", quota: "20%", body: "Untuk siswa pemegang KJP, anak panti, atau dari keluarga prasejahtera." },
  { code: "04", title: "Jalur Perpindahan Tugas", quota: "5%", body: "Untuk anak orang tua dengan perpindahan tugas/dinas resmi." },
  { code: "05", title: "Jalur Anak Guru", quota: "5%", body: "Untuk anak guru/tenaga kependidikan SMKN 74." },
];

const tahapan = [
  { date: "1 Apr 2026",      t: "Sosialisasi PPDB",   d: "Acara terbuka di Aula Serbaguna." },
  { date: "15–20 Apr 2026",  t: "Aktivasi PIN",       d: "Pengambilan PIN di tempat pendaftaran." },
  { date: "21–25 Apr 2026",  t: "Pendaftaran Online", d: "Pendaftaran via portal PPDB DKI." },
  { date: "28 Apr 2026",     t: "Tes Seleksi Khusus", d: "Wawancara konsentrasi & uji bakat seni." },
  { date: "30 Apr 2026",     t: "Pengumuman",         d: "Hasil seleksi dapat dilihat di portal." },
  { date: "2–5 Mei 2026",    t: "Daftar Ulang",       d: "Verifikasi dokumen & pembagian seragam." },
  { date: "14 Jul 2026",     t: "MPLS Dimulai",       d: "Hari pertama peserta didik baru." },
];

const syarat = [
  "Akta Kelahiran (asli & fotokopi)",
  "Kartu Keluarga sesuai domisili",
  "Ijazah & SKHU SMP/sederajat",
  "Pas foto 3x4 berlatar merah (4 lembar)",
  "Surat keterangan sehat dari puskesmas",
  "Surat pernyataan komitmen siswa",
  "Untuk jalur prestasi: bukti piagam/sertifikat (asli)",
  "Untuk jalur afirmasi: KJP / SKTM / surat panti",
];

const faqs = [
  { q: "Apakah ada biaya pendaftaran?", a: "Tidak. PPDB di sekolah negeri sepenuhnya GRATIS. SMKN 74 tidak memungut biaya apa pun untuk pendaftaran maupun seleksi." },
  { q: "Apakah harus ikut tes uji bakat seni?", a: "Ya, semua calon siswa wajib mengikuti uji bakat sederhana sesuai konsentrasi yang dipilih. Ini bukan untuk menyaring, melainkan memetakan kemampuan awal." },
  { q: "Boleh memilih lebih dari satu sekolah?", a: "Ya. Sistem PPDB DKI mengizinkan pemilihan beberapa pilihan sekolah dalam satu jalur. Konsultasikan dengan operator PPDB di sekolah asal." },
  { q: "Bagaimana jika tidak lolos di SMKN 74?", a: "Calon siswa tetap dapat memilih sekolah lain dalam jalur PPDB DKI. SMKN 74 juga membuka kuota cadangan jika ada yang mengundurkan diri." },
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
          { label: "PPDB 2026/2027" },
        ]}
        tagline="Pendaftaran Tahun 2026/2027"
        title="PPDB SMKN 74 —"
        accent="GRATIS, terbuka untuk semua."
        cms={cms}
        cmsPrefix="ppdb"
      />

      {/* Quick stats */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "300", l: "Kuota total" },
            { n: "5",   l: "Jalur PPDB" },
            { n: "4",   l: "Konsentrasi" },
            { n: "Rp 0",l: "Biaya pendaftaran" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div data-cms-key={`ppdb.stat_${i}_n`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Angka`} className="font-display stat-num text-navy">{cms[`ppdb.stat_${i}_n`] ?? s.n}</div>
              <p data-cms-key={`ppdb.stat_${i}_l`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Label`} className="text-[11px] uppercase tracking-widest text-muted mt-2">{cms[`ppdb.stat_${i}_l`] ?? s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tahapan timeline */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="ppdb.tahapan_eyebrow" data-cms-type="text" data-cms-label="Tahapan — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["ppdb.tahapan_eyebrow"] ?? "Tahapan"}</p>
            <h2 data-cms-key="ppdb.tahapan_heading" data-cms-type="text" data-cms-label="Tahapan — Judul" className="font-display headline-section max-w-2xl">{cms["ppdb.tahapan_heading"] ?? "Tujuh langkah dari mulai sampai masuk."}</h2>
          </div>
          <ol className="relative border-l-2 border-amber/30 ml-3 space-y-8">
            {tahapan.map((t, i) => (
              <li key={t.t} className="pl-8 relative reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="absolute -left-[11px] top-2 h-5 w-5 rounded-full bg-amber border-4 border-paper" />
                <p data-cms-key={`ppdb.tahap_${i}_date`} data-cms-type="text" data-cms-label={`Tahap ${i + 1} — Tanggal`} className="text-[10px] uppercase tracking-[0.22em] text-amber font-medium">{cms[`ppdb.tahap_${i}_date`] ?? t.date}</p>
                <h3 data-cms-key={`ppdb.tahap_${i}_t`} data-cms-type="text" data-cms-label={`Tahap ${i + 1} — Judul`} className="font-display text-2xl mt-1 mb-1">{cms[`ppdb.tahap_${i}_t`] ?? t.t}</h3>
                <p data-cms-key={`ppdb.tahap_${i}_d`} data-cms-type="textarea" data-cms-label={`Tahap ${i + 1} — Keterangan`} className="text-ink/70 leading-relaxed">{cms[`ppdb.tahap_${i}_d`] ?? t.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Jalur */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="ppdb.jalur_eyebrow" data-cms-type="text" data-cms-label="Jalur — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["ppdb.jalur_eyebrow"] ?? "Jalur Pendaftaran"}</p>
            <h2 data-cms-key="ppdb.jalur_heading" data-cms-type="text" data-cms-label="Jalur — Judul" className="font-display headline-section max-w-2xl">{cms["ppdb.jalur_heading"] ?? "Lima jalur, kuota berbeda."}</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jalur.map((j, i) => (
              <li
                key={j.code}
                className="reveal bg-paper-soft rounded-2xl p-6 hover:bg-white hover:border-amber border border-transparent hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span data-cms-key={`ppdb.jalur_${i}_code`} data-cms-type="text" data-cms-label={`Jalur ${i + 1} — Kode`} className="font-display text-3xl text-amber">{cms[`ppdb.jalur_${i}_code`] ?? j.code}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted">Kuota <span data-cms-key={`ppdb.jalur_${i}_quota`} data-cms-type="text" data-cms-label={`Jalur ${i + 1} — Kuota`}>{cms[`ppdb.jalur_${i}_quota`] ?? j.quota}</span></span>
                </div>
                <h3 data-cms-key={`ppdb.jalur_${i}_title`} data-cms-type="text" data-cms-label={`Jalur ${i + 1} — Judul`} className="font-display text-xl mb-2">{cms[`ppdb.jalur_${i}_title`] ?? j.title}</h3>
                <p data-cms-key={`ppdb.jalur_${i}_body`} data-cms-type="textarea" data-cms-label={`Jalur ${i + 1} — Deskripsi`} className="text-sm text-ink/70 leading-relaxed">{cms[`ppdb.jalur_${i}_body`] ?? j.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Syarat dokumen */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p data-cms-key="ppdb.syarat_eyebrow" data-cms-type="text" data-cms-label="Persyaratan — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["ppdb.syarat_eyebrow"] ?? "Persyaratan"}</p>
            <h2 data-cms-key="ppdb.syarat_heading" data-cms-type="text" data-cms-label="Persyaratan — Judul" className="font-display headline-quote mb-4">{cms["ppdb.syarat_heading"] ?? "Dokumen yang disiapkan."}</h2>
            <p data-cms-key="ppdb.syarat_body" data-cms-type="textarea" data-cms-label="Persyaratan — Deskripsi" className="text-ink/75 leading-relaxed">
              {cms["ppdb.syarat_body"] ?? "Siapkan dokumen asli & fotokopi (jika berlaku) sejak awal. Dokumen tambahan diperlukan sesuai jalur yang dipilih."}
            </p>
          </div>
          <ul className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-3 reveal" style={{ animationDelay: "0.1s" }}>
            {syarat.map((s, i) => (
              <li key={s} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/5">
                <span className="shrink-0 h-6 w-6 rounded-full bg-amber/20 text-amber grid place-items-center text-xs font-semibold">{i + 1}</span>
                <span data-cms-key={`ppdb.syarat_${i}`} data-cms-type="text" data-cms-label={`Persyaratan ${i + 1}`} className="text-sm text-ink/80">{cms[`ppdb.syarat_${i}`] ?? s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="ppdb.faq_eyebrow" data-cms-type="text" data-cms-label="FAQ — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["ppdb.faq_eyebrow"] ?? "FAQ"}</p>
            <h2 data-cms-key="ppdb.faq_heading" data-cms-type="text" data-cms-label="FAQ — Judul" className="font-display headline-quote">{cms["ppdb.faq_heading"] ?? "Pertanyaan yang sering ditanyakan."}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="reveal group/faq bg-paper-soft rounded-2xl p-6 hover:bg-white border border-transparent hover:border-amber transition-all"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span data-cms-key={`ppdb.faq_${i}_q`} data-cms-type="text" data-cms-label={`FAQ ${i + 1} — Pertanyaan`} className="font-display text-lg leading-snug">{cms[`ppdb.faq_${i}_q`] ?? f.q}</span>
                  <span className="shrink-0 h-8 w-8 rounded-full border border-black/10 grid place-items-center transition-transform group-open/faq:rotate-45">+</span>
                </summary>
                <p data-cms-key={`ppdb.faq_${i}_a`} data-cms-type="textarea" data-cms-label={`FAQ ${i + 1} — Jawaban`} className="mt-4 text-ink/70 leading-relaxed text-[15px]">{cms[`ppdb.faq_${i}_a`] ?? f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-amber", ink: "text-navy" },
          { tag: "Informasi", title: "Panduan MPLS", body: "Setelah diterima, persiapkan MPLS.", href: "/berita/informasi-sekolah/panduan-mpls", bg: "bg-moss", ink: "text-paper" },
          { tag: "Kontak", title: "Hubungi PPDB", body: "Telepon dan email tim PPDB.", href: "/kontak", bg: "bg-navy", ink: "text-paper" },
        ]}
      />
    </>
  );
}
