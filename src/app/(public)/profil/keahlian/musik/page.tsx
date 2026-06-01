import type { Metadata } from "next";
import { KeahlianDetail } from "@/components/profil/KeahlianDetail";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Seni Musik — SMKN 74 Jakarta" };

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <KeahlianDetail
      cms={cms}
      cmsPrefix="keahlian-musik"
      slug="musik"
      title="Seni Musik"
      tagline="Mendengar dunia, membentuk suara sendiri."
      accentBg="bg-amber"
      accentInk="text-navy"
      intro="Konsentrasi Seni Musik mempelajari musik klasik dan modern, teori musik, vokal, dan instrumen pilihan. Siswa juga mengenal teknik rekaman dan produksi musik digital sebagai bekal industri."
      quote="Musik bukan sekadar bunyi — ia adalah waktu yang ditata dengan rasa."
      curriculum={[
        { year: "Kelas X", topics: ["Teori dasar musik", "Solfeggio & ear training", "Vokal dasar", "Instrumen pilihan I"] },
        { year: "Kelas XI", topics: ["Harmoni & aransemen", "Ensembel kamar", "DAW & home recording", "Instrumen pilihan II"] },
        { year: "Kelas XII", topics: ["Resital tugas akhir", "Komposisi & produksi", "Magang studio / PKL", "Portofolio audisi"] },
      ]}
      achievements={[
        { year: "2025", title: "Juara Harapan Festival Paduan Suara Pelajar DKI.", sub: "Tim Vokal SMKN 74" },
        { year: "2025", title: "Resital perdana di Aula GKJ.", sub: "Karya Siswa Kelas XII" },
        { year: "2024", title: "Lolos seleksi POPDA tingkat provinsi.", sub: "Ensembel Musik Kamar" },
      ]}
      related={[
        { tag: "Konsentrasi", title: "Seni Tari", body: "Gerak, koreografi, tari Nusantara.", href: "/profil/keahlian/tari", bg: "bg-rust", ink: "text-paper" },
        { tag: "Konsentrasi", title: "Seni Karawitan", body: "Gamelan, vokal pesinden.", href: "/profil/keahlian/karawitan", bg: "bg-moss", ink: "text-paper" },
        { tag: "Konsentrasi", title: "Seni Teater", body: "Akting & produksi panggung.", href: "/profil/keahlian/teater", bg: "bg-navy-deep", ink: "text-paper" },
      ]}
    />
  );
}
