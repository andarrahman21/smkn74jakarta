import type { PrestasiIconKey } from "@/components/profil/PrestasiIcon";

export type Prestasi = {
  slug: string;
  icon: PrestasiIconKey;
  bg: string;
  date: string;
  year: string;
  level: "Nasional" | "Provinsi" | "Kota" | "Internasional";
  tag: string;
  title: string;
  sub: string;
  team: string[];
  body: string[];
};

export const prestasiList: Prestasi[] = [
  {
    slug: "lks-animasi-3d-2026",
    icon: "trophy", bg: "bg-moss",
    date: "12 Mei 2026", year: "2026", level: "Nasional",
    tag: "Juara Nasional",
    title: "Juara 1 Lomba Kompetensi Siswa (LKS) bidang Animasi 3D 2026.",
    sub: "Tim Animasi & Multimedia · 3 siswa",
    team: ["Reza Maulana", "Ayu Pertiwi", "Fadhil Akmal"],
    body: [
      "Tim Animasi 3D SMKN 74 berhasil meraih Juara 1 LKS bidang Animasi 3D pada kompetisi tingkat nasional yang diselenggarakan Direktorat SMK pada Mei 2026.",
      "Tugas yang diujikan adalah membuat short animation 30 detik dengan tema “Cerita Rakyat Modern”. Tim mengangkat cerita Si Pitung dengan visual gaya stop-motion 3D.",
      "Pembimbing tim, Ahmad Hidayat, S.Pd, menyatakan kemenangan ini adalah hasil dari latihan rutin selama enam bulan.",
    ],
  },
  {
    slug: "olimpiade-akuntansi-2026",
    icon: "calc", bg: "bg-paper-soft",
    date: "2 Mei 2026", year: "2026", level: "Provinsi",
    tag: "DKI Jakarta",
    title: "Juara 2 Olimpiade Akuntansi DKI Jakarta 2026.",
    sub: "Tim Akuntansi · 2 siswa",
    team: ["Siti Nurhaliza", "Bayu Setiawan"],
    body: [
      "Tim Akuntansi SMKN 74 berhasil meraih Juara 2 dalam Olimpiade Akuntansi tingkat provinsi DKI Jakarta. Kompetisi mencakup soal teori, kasus laporan keuangan, dan studi praktik.",
      "Perolehan poin tim hanya berbeda lima poin dari juara pertama. Persiapan dilakukan melalui klub akuntansi dan bimbingan rutin pasca sekolah.",
    ],
  },
  {
    slug: "tari-tradisional-pelajar",
    icon: "dance", bg: "bg-rust",
    date: "21 Mei 2026", year: "2026", level: "Nasional",
    tag: "Bina Nasional",
    title: "Meraih perak Lomba Tari Tradisional Festival Pelajar Indonesia.",
    sub: "Tim Seni Budaya · 6 siswa",
    team: ["Mela Anjani", "Putri Hapsari", "Dian Lestari", "Anwar Hakim", "Galih Pratama", "Yusuf Rahman"],
    body: [
      "Tim Tari SMKN 74 mempersembahkan koreografi “Beksan Gambyong Kontemporer” dan meraih medali perak di Festival Tari Tradisional Pelajar Indonesia 2026.",
      "Karya merupakan kolaborasi dengan Konsentrasi Musik yang menyusun ulang gamelan tradisional dengan elemen modern.",
    ],
  },
  {
    slug: "web-design-smk-jaksel",
    icon: "code", bg: "bg-amber",
    date: "19 April 2026", year: "2026", level: "Kota",
    tag: "Jakarta Selatan",
    title: "Juara 1 Web Design Competition antar SMK se-Jakarta Selatan.",
    sub: "Tim RPL · 4 siswa",
    team: ["Rangga Aditya", "Naila Hafidza", "Kharisma Hadi", "Ahmad Subagio"],
    body: [
      "Tim Rekayasa Perangkat Lunak SMKN 74 berhasil menjuarai kompetisi Web Design antar SMK se-Jakarta Selatan. Tema kompetisi adalah “UMKM Naik Kelas”.",
      "Tim membuat platform marketplace mini untuk UMKM lokal dengan fokus aksesibilitas dan responsivitas mobile.",
    ],
  },
  {
    slug: "robotik-nasional-2026",
    icon: "robot", bg: "bg-navy",
    date: "30 Maret 2026", year: "2026", level: "Nasional",
    tag: "Juara Nasional",
    title: "Juara 1 Kompetisi Robotik Nasional di UGM Yogyakarta.",
    sub: "Tim Robotik · 4 siswa",
    team: ["Galih Dwi", "Anissa Putri", "Bayu Wijaya", "Sinta Wulandari"],
    body: [
      "Robot “Tabuh” karya tim Robotik SMKN 74 berhasil meraih juara pertama kompetisi robotik nasional di Universitas Gadjah Mada.",
      "Konsep robot yang mensimulasikan pukulan gamelan secara otomatis menjadi nilai unik yang mengangkat tim ke posisi puncak.",
    ],
  },
  {
    slug: "karawitan-bentara-budaya",
    icon: "music", bg: "bg-moss",
    date: "15 Februari 2026", year: "2026", level: "Provinsi",
    tag: "Penghargaan Seni",
    title: "Pagelaran karawitan kontemporer di Bentara Budaya Jakarta.",
    sub: "Tim Karawitan · 12 siswa",
    team: ["Wahyu Setiawan", "Lina Kartika", "dan 10 siswa pengrawit"],
    body: [
      "Tim Karawitan SMKN 74 mengisi panggung Bentara Budaya Jakarta dengan komposisi karawitan kontemporer karya siswa kelas XII.",
      "Pagelaran dihadiri komunitas seni Jakarta dan dimuat ulasan di media seni nasional.",
    ],
  },
];

export function getPrestasi(slug: string) {
  return prestasiList.find((p) => p.slug === slug);
}
