import type { Metadata } from "next";
import { KeahlianDetail } from "@/components/profil/KeahlianDetail";

export const metadata: Metadata = { title: "Seni Teater — SMKN 74 Jakarta" };

export default function Page() {
  return (
    <KeahlianDetail
      slug="teater"
      title="Seni Teater"
      tagline="Panggung adalah cermin: gelap, tetapi menampakkan kita."
      accentBg="bg-navy-deep"
      accentInk="text-paper"
      intro="Konsentrasi Seni Teater membekali siswa dengan keaktoran, penyutradaraan, dramaturgi, dan produksi panggung. Workshop bersama praktisi teater Jakarta menjadi bagian rutin pembelajaran."
      quote="Akting yang jujur lebih dahsyat daripada teknik yang sempurna."
      curriculum={[
        { year: "Kelas X", topics: ["Olah tubuh & suara", "Improvisasi & ensemble", "Pengantar dramaturgi", "Apresiasi teater Indonesia"] },
        { year: "Kelas XI", topics: ["Akting realis & non-realis", "Penyutradaraan dasar", "Tata panggung & cahaya", "Naskah & dramaturgi"] },
        { year: "Kelas XII", topics: ["Pementasan tugas akhir", "Produksi & manajemen panggung", "Magang grup teater / PKL", "Portofolio audisi PT"] },
      ]}
      achievements={[
        { year: "2026", title: "Pementasan adaptasi naskah Rendra di Salihara.", sub: "Tim Teater Kelas XII" },
        { year: "2025", title: "Juara 3 Festival Teater Pelajar DKI Jakarta.", sub: "Tim Teater · 8 siswa" },
        { year: "2024", title: "Workshop dengan Teater Garasi (Yogyakarta).", sub: "Pembelajaran Lintas Komunitas" },
      ]}
      related={[
        { tag: "Konsentrasi", title: "Seni Tari", body: "Gerak, koreografi, tari Nusantara.", href: "/profil/keahlian/tari", bg: "bg-rust", ink: "text-paper" },
        { tag: "Konsentrasi", title: "Seni Musik", body: "Klasik, modern, produksi musik.", href: "/profil/keahlian/musik", bg: "bg-amber", ink: "text-navy" },
        { tag: "Konsentrasi", title: "Seni Karawitan", body: "Gamelan, vokal pesinden.", href: "/profil/keahlian/karawitan", bg: "bg-moss", ink: "text-paper" },
      ]}
    />
  );
}
