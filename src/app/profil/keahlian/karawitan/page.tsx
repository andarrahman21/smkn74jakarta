import type { Metadata } from "next";
import { KeahlianDetail } from "@/components/profil/KeahlianDetail";

export const metadata: Metadata = { title: "Seni Karawitan — SMKN 74 Jakarta" };

export default function Page() {
  return (
    <KeahlianDetail
      slug="karawitan"
      title="Seni Karawitan"
      tagline="Suara gangsa, suara akar."
      accentBg="bg-moss"
      accentInk="text-paper"
      intro="Konsentrasi Seni Karawitan mendalami gamelan Jawa, Sunda, dan eksplorasi karawitan kontemporer. Siswa mempelajari tabuhan, vokal pesinden, hingga komposisi gending baru sebagai jembatan tradisi-modern."
      quote="Karawitan bukan museum. Ia hidup setiap kali ada yang menabuh dan mendengar."
      curriculum={[
        { year: "Kelas X", topics: ["Pengenalan gamelan & laras", "Tabuhan dasar bonang, saron, kendang", "Tembang dolanan", "Apresiasi karawitan Nusantara"] },
        { year: "Kelas XI", topics: ["Gending lancaran & ladrang", "Vokal pesinden / wiraswara", "Notasi kepatihan", "Karawitan Sunda & Bali"] },
        { year: "Kelas XII", topics: ["Komposisi gending mandiri", "Pagelaran karawitan", "Magang sanggar / PKL", "Portofolio audisi PT"] },
      ]}
      achievements={[
        { year: "2026", title: "Pagelaran karawitan kontemporer di Bentara Budaya.", sub: "Kolaborasi siswa kelas XII" },
        { year: "2025", title: "Juara 2 Festival Karawitan Pelajar DKI.", sub: "Tim Karawitan · 12 siswa" },
        { year: "2024", title: "Mengisi Gala Dinner Kemendikbud RI.", sub: "Karya Siswa" },
      ]}
      related={[
        { tag: "Konsentrasi", title: "Seni Tari", body: "Gerak, koreografi, tari Nusantara.", href: "/profil/keahlian/tari", bg: "bg-rust", ink: "text-paper" },
        { tag: "Konsentrasi", title: "Seni Musik", body: "Klasik, modern, produksi musik.", href: "/profil/keahlian/musik", bg: "bg-amber", ink: "text-navy" },
        { tag: "Konsentrasi", title: "Seni Teater", body: "Akting & produksi panggung.", href: "/profil/keahlian/teater", bg: "bg-navy-deep", ink: "text-paper" },
      ]}
    />
  );
}
