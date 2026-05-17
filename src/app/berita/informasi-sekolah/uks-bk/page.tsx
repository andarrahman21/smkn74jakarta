import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "UKS & Bimbingan Konseling — SMKN 74 Jakarta" };

const uks = [
  { t: "Pertolongan pertama", d: "Penanganan cedera ringan, pusing, demam, dan kondisi darurat." },
  { t: "Pemeriksaan rutin",   d: "Cek berkala kesehatan siswa, BMI, & tekanan darah." },
  { t: "Vaksinasi & imunisasi", d: "Program vaksinasi terjadwal bekerjasama dengan Puskesmas Jagakarsa." },
  { t: "Edukasi kesehatan",   d: "Penyuluhan gizi, kesehatan reproduksi, dan kebersihan pribadi." },
];

const bk = [
  { t: "Konseling individu",  d: "Sesi tertutup untuk masalah akademik, sosial, atau pribadi." },
  { t: "Konseling kelompok",  d: "Diskusi terarah untuk topik yang banyak dialami siswa." },
  { t: "Karier & lanjutan",   d: "Pendampingan memilih jurusan PT, jalur kerja, atau kewirausahaan." },
  { t: "Pendampingan kasus",  d: "Penanganan kasus pelanggaran, perundungan, atau kekerasan." },
  { t: "Dukungan kebutuhan khusus", d: "Pendampingan siswa dengan kebutuhan belajar atau emosional khusus." },
];

const counselors = [
  { initials: "ED", name: "Eka Damayanti, S.Pd",  role: "Koordinator BK", bg: "bg-navy" },
  { initials: "AS", name: "Ani Saraswati, S.Pd",  role: "BK Kelas X",     bg: "bg-amber", ink: "text-navy" },
  { initials: "JT", name: "Joko Tarmono, S.Pd",   role: "BK Kelas XI",    bg: "bg-moss" },
  { initials: "RD", name: "Ratna Dewi, S.Pd.I",   role: "BK Kelas XII",   bg: "bg-rust" },
];

const jadwal = [
  { hari: "Senin",  jam: "07.30 – 14.00", kategori: "Konsultasi terbuka" },
  { hari: "Selasa", jam: "07.30 – 14.00", kategori: "Konsultasi terbuka" },
  { hari: "Rabu",   jam: "10.00 – 14.00", kategori: "Konseling karier" },
  { hari: "Kamis",  jam: "07.30 – 14.00", kategori: "Konsultasi terbuka" },
  { hari: "Jumat",  jam: "08.00 – 11.00", kategori: "Konseling kelompok" },
];

const krisis = [
  { t: "Layanan UKS Sekolah", v: "(021) 7864-216 ext 12" },
  { t: "Puskesmas Jagakarsa", v: "(021) 7864-345" },
  { t: "Hotline Sahabat Anak", v: "129 (24 jam)" },
  { t: "Polsek Jagakarsa",    v: "110" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Informasi Sekolah", href: "/berita/informasi-sekolah" },
          { label: "Layanan UKS & BK" },
        ]}
        tagline="Kesehatan & Pendampingan"
        title="Ruang aman untuk"
        accent="tubuh & pikiran."
      />

      {/* Stats */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "4",  l: "Konselor BK" },
            { n: "1",  l: "Perawat UKS" },
            { n: "5",  l: "Hari layanan" },
            { n: "129",l: "Hotline darurat" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="font-display stat-num text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UKS + BK side by side */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* UKS */}
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">UKS</p>
            <h2 className="font-display text-4xl mb-6">Unit Kesehatan Sekolah.</h2>
            <ul className="bg-white border border-black/5 rounded-2xl divide-y divide-black/5 overflow-hidden">
              {uks.map((u, i) => (
                <li key={u.t} className="p-5 hover:bg-paper-soft transition-colors">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl text-amber">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-lg">{u.t}</h3>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed mt-2 pl-10">{u.d}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* BK */}
          <div className="reveal" style={{ animationDelay: "0.1s" }}>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">BK</p>
            <h2 className="font-display text-4xl mb-6">Bimbingan Konseling.</h2>
            <ul className="bg-navy text-paper rounded-2xl divide-y divide-white/10 overflow-hidden">
              {bk.map((b, i) => (
                <li key={b.t} className="p-5 hover:bg-white/5 transition-colors">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl text-amber">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-lg">{b.t}</h3>
                  </div>
                  <p className="text-sm text-paper/75 leading-relaxed mt-2 pl-10">{b.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Konselor */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Konselor</p>
            <h2 className="font-display headline-section max-w-2xl">Tim yang siap mendengar.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {counselors.map((p, i) => (
              <article
                key={p.name}
                className={`${p.bg} ${p.ink ?? "text-paper"} group reveal rounded-2xl p-6 aspect-[3/4] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">{p.role}</p>
                <div className="flex-1 grid place-items-center">
                  <span className="font-display text-display-md italic opacity-90 transition-transform duration-700 group-hover:scale-110">
                    {p.initials}
                  </span>
                </div>
                <div className="border-t border-current/15 pt-3">
                  <p className="font-display text-base leading-snug">{p.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Jadwal */}
      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Jadwal</p>
            <h2 className="font-display headline-quote mb-4">Datang kapan saja.</h2>
            <p className="text-ink/75 leading-relaxed">
              Layanan konseling terbuka pada jam-jam sekolah. Untuk konsultasi mendalam, silakan janji dengan konselor terlebih dahulu.
            </p>
          </div>
          <ul className="lg:col-span-7 bg-white border border-black/5 rounded-2xl divide-y divide-black/5 overflow-hidden reveal" style={{ animationDelay: "0.1s" }}>
            {jadwal.map((j) => (
              <li key={j.hari} className="flex items-center gap-5 p-4">
                <span className="shrink-0 w-20 font-display text-lg">{j.hari}</span>
                <span className="flex-1 text-sm text-ink/80">{j.kategori}</span>
                <span className="text-sm font-medium text-navy">{j.jam}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Krisis / hotline */}
      <section className="bg-navy text-paper py-14 md:py-20 relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-amber mb-3">Krisis & Darurat</p>
            <h2 className="font-display headline-quote max-w-2xl">Kalau butuh bantuan segera.</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {krisis.map((k, i) => (
              <li key={k.t} className="reveal bg-white/5 rounded-2xl p-5 border border-white/10" style={{ animationDelay: `${i * 0.06}s` }}>
                <p className="text-[10px] uppercase tracking-widest text-amber font-medium">{k.t}</p>
                <p className="font-display text-xl mt-2">{k.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Informasi", title: "Tata Tertib Siswa", body: "Aturan akademik & sosial.", href: "/berita/informasi-sekolah/tata-tertib", bg: "bg-amber", ink: "text-navy" },
          { tag: "Layanan", title: "Layanan Surat", body: "Surat ijin & permohonan.", href: "/berita/informasi-sekolah/layanan-surat", bg: "bg-moss", ink: "text-paper" },
          { tag: "Kontak", title: "Kotak Saran", body: "Sampaikan masukan anonim.", href: "/kontak#kotak-saran", bg: "bg-rust", ink: "text-paper" },
        ]}
      />
    </>
  );
}
