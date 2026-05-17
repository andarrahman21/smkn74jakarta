import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — SMKN 74 Jakarta",
  description: "Bagaimana SMK Negeri 74 Jakarta mengumpulkan, menggunakan, dan melindungi data Anda.",
};

const sections = [
  {
    t: "Data yang kami kumpulkan",
    p: [
      "Saat Anda menggunakan situs ini, kami dapat mengumpulkan data tertentu, seperti: nama, alamat email, kategori pertanyaan, dan pesan yang Anda kirim melalui Kotak Saran atau formulir kontak.",
      "Kami juga mengumpulkan data anonim seperti halaman yang dikunjungi, perangkat yang digunakan, dan waktu kunjungan untuk meningkatkan kualitas layanan.",
    ],
  },
  {
    t: "Bagaimana data digunakan",
    p: [
      "Data Anda hanya digunakan untuk menanggapi pesan, meningkatkan pelayanan sekolah, dan keperluan administrasi internal.",
      "Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga untuk tujuan komersial.",
    ],
  },
  {
    t: "Penyimpanan & keamanan",
    p: [
      "Data disimpan di server resmi sekolah dengan akses terbatas hanya untuk staf yang berwenang.",
      "Kami berupaya menjaga data Anda dengan standar keamanan teknis dan administratif yang wajar.",
    ],
  },
  {
    t: "Hak Anda",
    p: [
      "Anda berhak meminta salinan, koreksi, atau penghapusan data pribadi yang kami simpan, sesuai dengan ketentuan hukum yang berlaku di Indonesia.",
      "Untuk permintaan tersebut, hubungi Tata Usaha di info@smkn74.sch.id.",
    ],
  },
  {
    t: "Cookies & analitik",
    p: [
      "Situs ini dapat menggunakan cookies untuk pengalaman penggunaan yang lebih baik. Anda dapat menonaktifkan cookies di pengaturan peramban Anda.",
    ],
  },
  {
    t: "Perubahan kebijakan",
    p: [
      "Kebijakan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Kebijakan Privasi" },
        ]}
        tagline="Komitmen privasi"
        title="Cara kami menjaga"
        accent="data Anda."
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
            Pertanyaan tentang privasi? Hubungi <a href="mailto:info@smkn74.sch.id" className="text-navy hover:text-amber underline">info@smkn74.sch.id</a>.
          </div>
        </div>
      </section>
    </>
  );
}
