import type { Metadata } from "next";
import { KeahlianDetail } from "@/components/profil/KeahlianDetail";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Seni Tari — SMKN 74 Jakarta" };

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <KeahlianDetail
      cms={cms}
      cmsPrefix="keahlian-tari"
      slug="tari"
      title="Seni Tari"
      tagline="Tubuh sebagai bahasa, gerak sebagai ingatan."
      accentBg="bg-rust"
      accentInk="text-paper"
      intro="Konsentrasi Seni Tari membekali siswa dengan teknik dasar tari Nusantara, eksplorasi tari kreasi, dan dasar tari kontemporer. Latihan harian, pertunjukan kelas, dan kolaborasi lintas konsentrasi menjadi inti pembelajaran."
      quote="Tarian baik adalah tarian yang membuat penonton merasa, bukan hanya melihat."
      curriculum={[
        { year: "Kelas X", topics: ["Anatomi & kondisi tubuh penari", "Dasar tari Jawa, Sunda, Bali", "Notasi & laban", "Apresiasi tari Nusantara"] },
        { year: "Kelas XI", topics: ["Eksplorasi tari kreasi", "Komposisi koreografi pendek", "Musik iringan tari", "Tata rias & busana"] },
        { year: "Kelas XII", topics: ["Karya tari mandiri (tugas akhir)", "Manajemen pementasan", "Magang sanggar tari / PKL", "Portofolio audisi PT"] },
      ]}
      achievements={[
        { year: "2026", title: "Juara 1 Festival Tari Tradisional Pelajar Indonesia.", sub: "Tim Seni Tari · 6 siswa" },
        { year: "2025", title: "Pertunjukan tari kelas X di Teater Salihara.", sub: "Karya Kolaboratif" },
        { year: "2024", title: "Juara 2 LKS bidang Tari DKI Jakarta.", sub: "Tim Seni Tari · 4 siswa" },
      ]}
      related={[
        { tag: "Konsentrasi", title: "Seni Musik", body: "Iringan, komposisi, dan eksplorasi instrumen.", href: "/profil/keahlian/musik", bg: "bg-amber", ink: "text-navy" },
        { tag: "Konsentrasi", title: "Seni Karawitan", body: "Gamelan, vokal pesinden, komposisi.", href: "/profil/keahlian/karawitan", bg: "bg-moss", ink: "text-paper" },
        { tag: "Konsentrasi", title: "Seni Teater", body: "Akting, penyutradaraan, produksi panggung.", href: "/profil/keahlian/teater", bg: "bg-navy-deep", ink: "text-paper" },
      ]}
    />
  );
}
