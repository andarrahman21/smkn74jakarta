import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "Layanan Surat Akademik & Kesiswaan — SMKN 74" };

const akademik = [
  { name: "Surat Permohonan Surat Akademik", time: "1–2 hari kerja" },
  { name: "Surat Ijin Tidak Masuk Sekolah",  time: "1 hari kerja" },
  { name: "Surat Ijin Masuk Kelas",          time: "Hari yang sama" },
  { name: "Surat Ijin Keluar Kelas",         time: "Hari yang sama" },
  { name: "Surat Ijin Mengikuti Kegiatan",   time: "1–2 hari kerja" },
];

const kesiswaan = [
  { name: "Surat Permohonan Surat Kesiswaan",time: "1–2 hari kerja" },
  { name: "Surat Ijin Kegiatan",             time: "2 hari kerja" },
  { name: "Surat Keterangan Siswa",          time: "1–2 hari kerja" },
  { name: "Surat Rekomendasi",               time: "2–3 hari kerja" },
  { name: "Surat Tugas",                     time: "2–3 hari kerja" },
];

const langkah = [
  { n: "01", t: "Pilih jenis surat", d: "Tentukan jenis surat yang dibutuhkan dari daftar layanan." },
  { n: "02", t: "Isi formulir online", d: "Akses formulir online di portal layanan atau ambil di Tata Usaha." },
  { n: "03", t: "Lampirkan dokumen pendukung", d: "Misal: foto bukti kegiatan, fotokopi identitas, persetujuan orang tua." },
  { n: "04", t: "Proses verifikasi", d: "Tim TU memverifikasi & menandatangani sesuai estimasi waktu." },
  { n: "05", t: "Ambil surat", d: "Surat siap diambil di TU atau dikirim via email PDF." },
];

const syarat = [
  "Identitas siswa (NIS) aktif",
  "Tanda tangan / persetujuan wali kelas",
  "Surat persetujuan orang tua (untuk surat ijin kegiatan)",
  "Bukti pendukung sesuai jenis surat",
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Informasi Sekolah", href: "/berita/informasi-sekolah" },
          { label: "Layanan Surat" },
        ]}
        tagline="Layanan Tata Usaha"
        title="Pengajuan surat,"
        accent="cepat & terstruktur."
      />

      {/* Stats */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "10+", l: "Jenis surat" },
            { n: "1–3", l: "Hari kerja standar" },
            { n: "100%",l: "Gratis biaya" },
            { n: "PDF", l: "Format digital tersedia" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="font-display stat-num text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alur 5 langkah */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Alur Pengajuan</p>
            <h2 className="font-display headline-section max-w-2xl">Lima langkah dari awal sampai surat di tangan.</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {langkah.map((l, i) => (
              <li
                key={l.n}
                className="reveal bg-white border border-black/5 rounded-2xl p-6 hover:border-amber hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="font-display text-3xl text-amber">{l.n}</span>
                <h3 className="font-display text-lg mt-2 mb-2">{l.t}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{l.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Daftar surat */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: "Akademik", list: akademik, bg: "bg-navy", ink: "text-paper" },
            { title: "Kesiswaan", list: kesiswaan, bg: "bg-amber", ink: "text-navy" },
          ].map((col, ci) => (
            <div key={col.title} className="reveal" style={{ animationDelay: `${ci * 0.1}s` }}>
              <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Daftar Surat</p>
              <h3 className={`font-display text-3xl mb-5`}>{col.title}</h3>
              <ul className={`${col.bg} ${col.ink} rounded-2xl overflow-hidden divide-y divide-current/10`}>
                {col.list.map((s, i) => (
                  <li key={s.name} className="flex items-center justify-between gap-4 p-5 hover:bg-white/5 transition-colors">
                    <div>
                      <p className="font-display text-base">{s.name}</p>
                      <p className="text-[11px] uppercase tracking-widest opacity-60 mt-1">{s.time}</p>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-current/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Syarat */}
      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Syarat Umum</p>
            <h2 className="font-display headline-quote mb-4">Yang perlu disiapkan.</h2>
            <p className="text-ink/75 leading-relaxed">
              Sebagian besar layanan surat memerlukan dokumen dasar berikut. Persyaratan tambahan akan diinformasikan sesuai jenis surat.
            </p>
          </div>
          <ul className="lg:col-span-7 space-y-3 reveal" style={{ animationDelay: "0.1s" }}>
            {syarat.map((s, i) => (
              <li key={s} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/5">
                <span className="shrink-0 h-7 w-7 rounded-full bg-amber/20 text-amber grid place-items-center text-sm font-semibold">{i + 1}</span>
                <span className="text-ink/80">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Tenaga Kependidikan", body: "Tim Tata Usaha yang melayani.", href: "/profil/struktur/tenaga-kependidikan", bg: "bg-navy", ink: "text-paper" },
          { tag: "Kontak", title: "Hubungi TU", body: "Telepon, email, alamat.", href: "/kontak", bg: "bg-amber", ink: "text-navy" },
          { tag: "Informasi", title: "Tata Tertib", body: "Aturan akademik & sosial.", href: "/berita/informasi-sekolah/tata-tertib", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
