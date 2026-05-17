export type EventItem = {
  slug: string;
  title: string;
  date: string;
  status: "Akan datang" | "Selesai";
  category: string;
  body: string;
  bg: string;
  ink: string;
};

export const eventList: EventItem[] = [
  {
    slug: "pekan-seni-2026",
    title: "Pekan Seni 2026 — Suara Tanah Air",
    date: "20–24 April 2026",
    status: "Akan datang",
    category: "Festival",
    body: "Festival seni tahunan menampilkan karya dari empat konsentrasi keahlian. Tahun ini bertema kolaborasi seni Nusantara.",
    bg: "bg-amber",
    ink: "text-navy",
  },
  {
    slug: "open-house-2026",
    title: "Open House SMKN 74 2026",
    date: "5 Juni 2026",
    status: "Akan datang",
    category: "Komunitas",
    body: "Pengenalan sekolah untuk calon siswa baru: tur fasilitas, demo konsentrasi, dan sesi tanya jawab.",
    bg: "bg-moss",
    ink: "text-paper",
  },
  {
    slug: "alumni-talk-maret-2026",
    title: "Alumni Talk: tiga jalur setelah SMK",
    date: "14 Maret 2026",
    status: "Selesai",
    category: "Karier",
    body: "Tiga alumni berbagi pengalaman: kuliah seni, langsung bekerja, dan jalur kewirausahaan.",
    bg: "bg-navy-deep",
    ink: "text-paper",
  },
  {
    slug: "workshop-teater-garasi",
    title: "Workshop dengan Teater Garasi",
    date: "22–24 Maret 2026",
    status: "Selesai",
    category: "Workshop",
    body: "Workshop intensif tiga hari bersama sutradara Teater Garasi Yogyakarta.",
    bg: "bg-rust",
    ink: "text-paper",
  },
  {
    slug: "pagelaran-karawitan-bentara",
    title: "Pagelaran Karawitan Kontemporer di Bentara Budaya",
    date: "15 Februari 2026",
    status: "Selesai",
    category: "Pertunjukan",
    body: "Tim Karawitan mengisi panggung Bentara Budaya Jakarta dengan komposisi original siswa.",
    bg: "bg-navy",
    ink: "text-paper",
  },
  {
    slug: "lokakarya-kreatif-mei",
    title: "Kreatif Mentor — Lokakarya Lintas Disiplin",
    date: "5 Mei 2026",
    status: "Akan datang",
    category: "Lokakarya",
    body: "Lokakarya kreatif perdana SMKN 74. Tiga puluh siswa dari empat konsentrasi berbagi proses karya.",
    bg: "bg-amber-soft",
    ink: "text-navy",
  },
];

export function getEvent(slug: string) {
  return eventList.find((e) => e.slug === slug);
}
