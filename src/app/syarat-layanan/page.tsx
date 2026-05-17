import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";

export const metadata: Metadata = {
  title: "Syarat Layanan — SMKN 74 Jakarta",
  description: "Syarat dan ketentuan penggunaan situs SMK Negeri 74 Jakarta.",
};

const sections = [
  {
    t: "Tentang situs ini",
    p: [
      "Situs ini adalah kanal resmi SMK Negeri 74 Jakarta untuk berbagi informasi, berita, agenda, dan layanan sekolah kepada siswa, orang tua, alumni, mitra, serta publik.",
    ],
  },
  {
    t: "Penggunaan konten",
    p: [
      "Seluruh konten — termasuk teks, gambar, ilustrasi, video, dan logo — adalah milik SMK Negeri 74 Jakarta, kecuali disebutkan lain.",
      "Anda boleh mengutip dengan menyertakan sumber. Untuk reproduksi komersial, harap kirim permintaan tertulis ke humas@smkn74.sch.id.",
    ],
  },
  {
    t: "Perilaku pengguna",
    p: [
      "Saat menggunakan formulir, kotak saran, atau kanal lain di situs ini, Anda diharapkan menggunakan bahasa yang sopan dan bertanggung jawab.",
      "Konten yang mengandung kebencian, SARA, fitnah, atau pelanggaran hukum dapat dihapus tanpa pemberitahuan.",
    ],
  },
  {
    t: "Tautan eksternal",
    p: [
      "Situs ini dapat berisi tautan ke situs eksternal yang tidak dikelola sekolah. Kami tidak bertanggung jawab atas isi, akurasi, atau praktik privasi situs-situs tersebut.",
    ],
  },
  {
    t: "Pembatasan tanggung jawab",
    p: [
      "Kami berusaha menyajikan informasi seakurat mungkin, namun tidak memberikan jaminan bebas-galat. Pemakaian informasi adalah tanggung jawab pengguna.",
      "Untuk keputusan resmi (PPDB, keuangan, akademik), selalu rujuk dokumen resmi atau hubungi pihak sekolah.",
    ],
  },
  {
    t: "Perubahan syarat",
    p: [
      "Syarat ini dapat diperbarui sewaktu-waktu tanpa pemberitahuan. Versi terbaru selalu tersedia di halaman ini.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Syarat Layanan" },
        ]}
        tagline="Ketentuan penggunaan"
        title="Aturan singkat,"
        accent="agar nyaman bersama."
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8 space-y-10">
          <p className="text-xs uppercase tracking-widest text-muted reveal">
            Berlaku sejak 1 Januari 2026 · Terakhir diperbarui 15 Januari 2026
          </p>

          {sections.map((s, i) => (
            <article key={s.t} className="reveal" style={{ animationDelay: `${i * 0.05}s` }}>
              <h2 className="font-display text-3xl mb-3">{String(i + 1).padStart(2, "0")}. {s.t}</h2>
              <div className="space-y-3 text-ink/80 leading-relaxed">
                {s.p.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            </article>
          ))}

          <div className="reveal pt-8 border-t border-black/10 text-sm text-muted">
            Pertanyaan? Hubungi <a href="mailto:info@smkn74.sch.id" className="text-navy hover:text-amber underline">info@smkn74.sch.id</a>.
          </div>
        </div>
      </section>
    </>
  );
}
