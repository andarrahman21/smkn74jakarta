import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Peminjaman Sarana & Prasarana — SMKN 74 Jakarta" };

const ruang = [
  { name: "Aula Serbaguna",   kapasitas: "500 kursi", durasi: "Maks. 1 hari", bg: "bg-navy", ink: "text-paper" },
  { name: "Black Box Theater",kapasitas: "120 orang", durasi: "Maks. 1 hari", bg: "bg-moss", ink: "text-paper" },
  { name: "Studio Tari",      kapasitas: "60 orang",  durasi: "Maks. 3 jam",  bg: "bg-amber", ink: "text-navy" },
  { name: "Studio Musik",     kapasitas: "30 orang",  durasi: "Maks. 3 jam",  bg: "bg-rust", ink: "text-paper" },
  { name: "Lab Komputer",     kapasitas: "32 unit",   durasi: "Maks. 4 jam",  bg: "bg-navy-deep", ink: "text-paper" },
  { name: "Lapangan",         kapasitas: "Bebas",      durasi: "Maks. 1 hari", bg: "bg-paper-soft", ink: "text-ink" },
];

const alat = [
  { kategori: "Audio",        items: ["Sound system portable", "Mic wireless (4 unit)", "Mixer 8 channel", "Speaker monitor"] },
  { kategori: "Visual",       items: ["Proyektor HD", "Layar lipat", "Kamera mirrorless", "Tripod & monopod"] },
  { kategori: "Lighting",     items: ["Par 64 LED (8 unit)", "Spotlight fresnel", "Smoke machine", "Konsol DMX 192"] },
  { kategori: "Properti",     items: ["Backdrop polos", "Properti panggung dasar", "Kursi lipat (200 unit)", "Meja lipat (20 unit)"] },
];

const alur = [
  { n: "01", t: "Cek ketersediaan", d: "Cek kalender peminjaman di portal atau hubungi koordinator sarana." },
  { n: "02", t: "Isi formulir", d: "Formulir online berisi tanggal, durasi, kebutuhan, & PIC kegiatan." },
  { n: "03", t: "Persetujuan", d: "Wakil sarana memverifikasi & menerbitkan surat persetujuan." },
  { n: "04", t: "Gunakan", d: "Datang sesuai jadwal, berkoordinasi dengan teknisi sekolah." },
  { n: "05", t: "Kembalikan", d: "Cek kondisi sebelum diserahkan kembali, isi berita acara penyerahan." },
];

const aturan = [
  "Peminjaman hanya untuk kegiatan sekolah / yang melibatkan siswa.",
  "Pengaju harus dari unsur OSIS, guru pembimbing, atau staf sekolah.",
  "Wajib menjaga kebersihan & kerapian setelah selesai.",
  "Kerusakan menjadi tanggung jawab peminjam — wajib lapor.",
  "Pengajuan minimal 3 hari kerja sebelum tanggal penggunaan.",
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
          { label: "Peminjaman Sarana" },
        ]}
        tagline="Sarana & Prasarana"
        title="Pinjam ruang & alat"
        accent="untuk karya bersama."
        cms={cms}
        cmsPrefix="peminjaman"
      />

      {/* Stats */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "6",     l: "Ruang peminjaman" },
            { n: "16+",   l: "Alat tersedia" },
            { n: "3",     l: "Hari kerja minimal" },
            { n: "Rp 0",  l: "Biaya internal" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div data-cms-key={`peminjaman.stat_${i}_n`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Angka`} className="font-display stat-num text-navy">{cms[`peminjaman.stat_${i}_n`] ?? s.n}</div>
              <p data-cms-key={`peminjaman.stat_${i}_l`} data-cms-type="text" data-cms-label={`Statistik ${i + 1} — Label`} className="text-[11px] uppercase tracking-widest text-muted mt-2">{cms[`peminjaman.stat_${i}_l`] ?? s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ruang yang bisa dipinjam */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="peminjaman.ruang_eyebrow" data-cms-type="text" data-cms-label="Ruang — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["peminjaman.ruang_eyebrow"] ?? "Ruang"}</p>
            <h2 data-cms-key="peminjaman.ruang_heading" data-cms-type="text" data-cms-label="Ruang — Judul" className="font-display headline-section max-w-2xl">{cms["peminjaman.ruang_heading"] ?? "Pilihan ruang & kapasitas."}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ruang.map((r, i) => (
              <article
                key={r.name}
                className={`${r.bg} ${r.ink} reveal group rounded-2xl p-6 flex flex-col gap-3 aspect-[4/3] hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">Ruang</p>
                <h3 data-cms-key={`peminjaman.ruang_${i}_name`} data-cms-type="text" data-cms-label={`Ruang ${i + 1} — Nama`} className="font-display text-2xl">{cms[`peminjaman.ruang_${i}_name`] ?? r.name}</h3>
                <div className="mt-auto pt-3 border-t border-current/15 text-sm space-y-1">
                  <p className="flex justify-between"><span className="opacity-70">Kapasitas</span><span data-cms-key={`peminjaman.ruang_${i}_kapasitas`} data-cms-type="text" data-cms-label={`Ruang ${i + 1} — Kapasitas`}>{cms[`peminjaman.ruang_${i}_kapasitas`] ?? r.kapasitas}</span></p>
                  <p className="flex justify-between"><span className="opacity-70">Durasi pinjam</span><span data-cms-key={`peminjaman.ruang_${i}_durasi`} data-cms-type="text" data-cms-label={`Ruang ${i + 1} — Durasi`}>{cms[`peminjaman.ruang_${i}_durasi`] ?? r.durasi}</span></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Alat */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="peminjaman.alat_eyebrow" data-cms-type="text" data-cms-label="Alat — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["peminjaman.alat_eyebrow"] ?? "Alat"}</p>
            <h2 data-cms-key="peminjaman.alat_heading" data-cms-type="text" data-cms-label="Alat — Judul" className="font-display headline-section max-w-2xl">{cms["peminjaman.alat_heading"] ?? "Alat pendukung kegiatan."}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {alat.map((a, i) => (
              <div
                key={a.kategori}
                className="reveal bg-paper-soft rounded-2xl p-6"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <p data-cms-key={`peminjaman.alat_${i}_kategori`} data-cms-type="text" data-cms-label={`Alat Kategori ${i + 1} — Nama`} className="text-[10px] uppercase tracking-widest text-amber font-medium mb-3">{cms[`peminjaman.alat_${i}_kategori`] ?? a.kategori}</p>
                <ul className="space-y-2 text-sm">
                  {a.items.map((it, j) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="shrink-0 mt-2 h-1 w-3 rounded-full bg-amber" />
                      <span data-cms-key={`peminjaman.alat_${i}_item_${j}`} data-cms-type="text" data-cms-label={`Alat Kategori ${i + 1} Item ${j + 1}`}>{cms[`peminjaman.alat_${i}_item_${j}`] ?? it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alur */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="peminjaman.alur_eyebrow" data-cms-type="text" data-cms-label="Alur — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["peminjaman.alur_eyebrow"] ?? "Alur Peminjaman"}</p>
            <h2 data-cms-key="peminjaman.alur_heading" data-cms-type="text" data-cms-label="Alur — Judul" className="font-display headline-section max-w-2xl">{cms["peminjaman.alur_heading"] ?? "Lima langkah saja."}</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {alur.map((a, i) => (
              <li
                key={a.n}
                className="reveal bg-white border border-black/5 rounded-2xl p-6 hover:border-amber hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span data-cms-key={`peminjaman.alur_${i}_n`} data-cms-type="text" data-cms-label={`Langkah ${i + 1} — Nomor`} className="font-display text-3xl text-amber">{cms[`peminjaman.alur_${i}_n`] ?? a.n}</span>
                <h3 data-cms-key={`peminjaman.alur_${i}_t`} data-cms-type="text" data-cms-label={`Langkah ${i + 1} — Judul`} className="font-display text-lg mt-2 mb-2">{cms[`peminjaman.alur_${i}_t`] ?? a.t}</h3>
                <p data-cms-key={`peminjaman.alur_${i}_d`} data-cms-type="textarea" data-cms-label={`Langkah ${i + 1} — Keterangan`} className="text-sm text-ink/70 leading-relaxed">{cms[`peminjaman.alur_${i}_d`] ?? a.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Aturan */}
      <section className="bg-white border-t border-black/5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p data-cms-key="peminjaman.aturan_eyebrow" data-cms-type="text" data-cms-label="Aturan — Label" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["peminjaman.aturan_eyebrow"] ?? "Aturan"}</p>
            <h2 data-cms-key="peminjaman.aturan_heading" data-cms-type="text" data-cms-label="Aturan — Judul" className="font-display headline-quote mb-4">{cms["peminjaman.aturan_heading"] ?? "Yang perlu disepakati."}</h2>
            <p data-cms-key="peminjaman.aturan_body" data-cms-type="textarea" data-cms-label="Aturan — Deskripsi" className="text-ink/75 leading-relaxed">
              {cms["peminjaman.aturan_body"] ?? "Peminjaman bertujuan menjaga fasilitas tetap optimal untuk semua kegiatan sekolah. Aturan berikut wajib dipatuhi."}
            </p>
          </div>
          <ul className="lg:col-span-7 space-y-3 reveal" style={{ animationDelay: "0.1s" }}>
            {aturan.map((r, i) => (
              <li key={r} className="flex items-start gap-3 p-4 rounded-xl bg-paper-soft">
                <span className="shrink-0 h-7 w-7 rounded-full bg-amber/20 text-amber grid place-items-center text-sm font-semibold">{i + 1}</span>
                <span data-cms-key={`peminjaman.aturan_${i}`} data-cms-type="text" data-cms-label={`Aturan ${i + 1}`} className="text-ink/80">{cms[`peminjaman.aturan_${i}`] ?? r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Sarana & Prasarana", body: "Lihat seluruh fasilitas sekolah.", href: "/profil/sarana-prasarana", bg: "bg-amber", ink: "text-navy" },
          { tag: "Informasi", title: "Layanan Surat", body: "Pengajuan surat akademik & kesiswaan.", href: "/berita/informasi-sekolah/layanan-surat", bg: "bg-navy", ink: "text-paper" },
          { tag: "Kontak", title: "Hubungi Wakil Sarana", body: "Koordinator peminjaman.", href: "/kontak", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
