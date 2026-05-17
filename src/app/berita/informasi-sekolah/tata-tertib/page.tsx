import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "Tata Tertib & Kode Etik Siswa — SMKN 74 Jakarta" };

const groups = [
  {
    code: "01",
    title: "Kehadiran",
    bg: "bg-navy",
    ink: "text-paper",
    items: [
      "Hadir di sekolah selambat-lambatnya pukul 07.00 WIB.",
      "Mengikuti pembelajaran sesuai jadwal kelas masing-masing.",
      "Wajib izin tertulis bila berhalangan hadir lebih dari satu hari.",
      "Maksimal 10% ketidakhadiran tanpa keterangan per semester.",
    ],
  },
  {
    code: "02",
    title: "Seragam & Penampilan",
    bg: "bg-amber",
    ink: "text-navy",
    items: [
      "Senin–Selasa: putih abu-abu lengkap dengan dasi dan badge.",
      "Rabu–Kamis: pakaian khas jurusan / batik sekolah.",
      "Jumat: pakaian pramuka.",
      "Rambut rapi, tidak diwarnai. Tidak diperkenankan menggunakan perhiasan berlebihan.",
    ],
  },
  {
    code: "03",
    title: "Akademik",
    bg: "bg-moss",
    ink: "text-paper",
    items: [
      "Mengikuti seluruh kegiatan pembelajaran dengan tertib.",
      "Mengerjakan tugas dengan jujur — plagiarisme akan ditindak tegas.",
      "Mengikuti seluruh penilaian harian, UTS, dan PAS.",
      "Wajib memenuhi syarat ketuntasan minimal untuk setiap mata pelajaran.",
    ],
  },
  {
    code: "04",
    title: "Etika & Sosial",
    bg: "bg-rust",
    ink: "text-paper",
    items: [
      "Hormat kepada guru, tenaga kependidikan, dan sesama siswa.",
      "Dilarang membawa senjata tajam, narkoba, atau zat adiktif.",
      "Dilarang berkelahi, mem-bully, atau melakukan kekerasan verbal.",
      "Penggunaan media sosial harus sopan dan tidak mencemarkan nama sekolah.",
    ],
  },
];

const sanksi = [
  { level: "Teguran lisan",        points: "Pelanggaran ringan pertama",  body: "Dicatat di buku pembinaan, ditindaklanjuti wali kelas." },
  { level: "Surat peringatan I",   points: "Pelanggaran berulang ringan", body: "Pemanggilan siswa & catatan pembinaan formal." },
  { level: "Surat peringatan II",  points: "Pelanggaran sedang",          body: "Pemanggilan orang tua, kesepakatan tertulis perbaikan." },
  { level: "Skorsing 3 hari",      points: "Pelanggaran berat I",         body: "Tidak masuk sekolah, tugas remedial wajib." },
  { level: "Skorsing 7 hari",      points: "Pelanggaran berat II",        body: "Pembahasan komite & rekomendasi pembinaan khusus." },
  { level: "Dikembalikan ke ortu", points: "Pelanggaran sangat berat",    body: "Sesuai SK Kepala Sekolah berdasarkan pembahasan komite." },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Informasi Sekolah", href: "/berita/informasi-sekolah" },
          { label: "Tata Tertib & Kode Etik" },
        ]}
        tagline="Aturan & komitmen"
        title="Tata tertib siswa,"
        accent="rumah bersama yang nyaman."
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Empat Pilar</p>
            <h2 className="font-display headline-section max-w-2xl">Empat kategori aturan utama.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {groups.map((g, i) => (
              <article
                key={g.code}
                className={`${g.bg} ${g.ink} reveal group rounded-2xl p-7 flex flex-col gap-4 hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl opacity-80">{g.code}</span>
                  <h3 className="font-display text-2xl">{g.title}</h3>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed opacity-90">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="shrink-0 mt-2 h-1 w-3 rounded-full bg-current opacity-60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sanksi */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Sanksi & Pembinaan</p>
            <h2 className="font-display headline-section max-w-2xl">Eskalasi yang transparan.</h2>
            <p className="text-ink/70 leading-relaxed mt-4 max-w-3xl">
              Sanksi diberikan secara bertahap dengan pendekatan pembinaan terlebih dahulu. Tujuan utama adalah perbaikan perilaku, bukan hukuman.
            </p>
          </div>
          <ol className="space-y-3">
            {sanksi.map((s, i) => (
              <li
                key={s.level}
                className="reveal group flex items-center gap-6 p-5 rounded-2xl bg-paper-soft hover:bg-white hover:border-amber border border-transparent hover:-translate-y-0.5 transition-all"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span className="shrink-0 font-display text-3xl text-amber w-12">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg">{s.level}</h3>
                  <p className="text-xs uppercase tracking-widest text-muted mt-1">{s.points}</p>
                  <p className="text-sm text-ink/70 leading-relaxed mt-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Informasi", title: "Panduan MPLS", body: "Untuk siswa baru — peraturan & agenda.", href: "/berita/informasi-sekolah/panduan-mpls", bg: "bg-moss", ink: "text-paper" },
          { tag: "Profil", title: "Bimbingan Konseling", body: "Pendampingan & konseling siswa.", href: "/berita/informasi-sekolah/uks-bk", bg: "bg-amber", ink: "text-navy" },
          { tag: "Layanan", title: "Kotak Saran", body: "Sampaikan masukan secara anonim.", href: "/kontak#kotak-saran", bg: "bg-navy", ink: "text-paper" },
        ]}
      />
    </>
  );
}
