import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "Komite Sekolah — SMKN 74 Jakarta" };

const people = [
  { initials: "AB", name: "Drs. Anwar Budiman", role: "Ketua Komite", bg: "bg-navy" },
  { initials: "SD", name: "Sri Dewi, S.E.", role: "Sekretaris", bg: "bg-amber", ink: "text-navy" },
  { initials: "ER", name: "Ir. Endang Rahayu", role: "Bendahara", bg: "bg-moss" },
  { initials: "MT", name: "Muhammad Taufik", role: "Bidang Akademik", bg: "bg-rust" },
  { initials: "LK", name: "Laila Kurniawati", role: "Bidang Kesiswaan", bg: "bg-navy-deep" },
  { initials: "HP", name: "Hadi Pramono, S.H.", role: "Bidang Hukum", bg: "bg-navy" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "Komite Sekolah" },
        ]}
        tagline="Jembatan sekolah & masyarakat"
        title="Komite menjaga"
        accent="suara orang tua tetap hidup"
        trailing="di setiap keputusan."
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Peran</p>
            <h2 className="font-display headline-quote mb-4">Mitra strategis, bukan formalitas.</h2>
            <p className="text-ink/75 leading-relaxed">
              Komite Sekolah dipilih dari unsur orang tua siswa dan tokoh masyarakat. Mereka memberikan masukan terhadap program sekolah, pengelolaan anggaran partisipatif, dan pengembangan fasilitas.
            </p>
          </div>
          <ul className="space-y-3 reveal" style={{ animationDelay: "0.1s" }}>
            {[
              "Memberikan pertimbangan kebijakan & program",
              "Mendukung penyelenggaraan pendidikan",
              "Mengontrol transparansi & akuntabilitas",
              "Menjadi penghubung sekolah-masyarakat",
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/5">
                <span className="shrink-0 h-7 w-7 rounded-full bg-amber/20 text-amber grid place-items-center text-sm font-semibold">{i + 1}</span>
                <span className="text-ink/80">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PeopleSection people={people} heading="Pengurus Komite periode 2024–2027." />

      <RelatedCards
        items={[
          { tag: "Struktur", title: "Manajemen Sekolah", body: "Pengambil keputusan harian.", href: "/profil/struktur/manajemen", bg: "bg-navy", ink: "text-paper" },
          { tag: "Kesiswaan", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
          { tag: "Kesiswaan", title: "MPK", body: "Majelis Perwakilan Kelas.", href: "/profil/struktur/mpk", bg: "bg-amber", ink: "text-navy" },
        ]}
      />
    </>
  );
}
