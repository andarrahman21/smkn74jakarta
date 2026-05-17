import type { MetadataRoute } from "next";
import { pengumumanList } from "@/data/pengumuman";
import { beritaList } from "@/data/berita";
import { prestasiList } from "@/data/prestasi";
import { eventList } from "@/data/event";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smkn74.sch.id";

const staticPaths = [
  "/",
  "/tentang",
  "/kontak",
  "/galeri",
  "/unduhan",
  "/mitra-dudi",
  "/privasi",
  "/syarat-layanan",
  // profil
  "/profil/sambutan",
  "/profil/visi-misi",
  "/profil/sarana-prasarana",
  "/profil/struktur",
  "/profil/struktur/manajemen",
  "/profil/struktur/tenaga-kependidikan",
  "/profil/struktur/komite",
  "/profil/struktur/osis",
  "/profil/struktur/mpk",
  "/profil/tenaga-pendidik",
  "/profil/keahlian",
  "/profil/keahlian/tari",
  "/profil/keahlian/musik",
  "/profil/keahlian/karawitan",
  "/profil/keahlian/teater",
  "/profil/kurikulum",
  // berita
  "/berita",
  "/berita/informasi-sekolah",
  "/berita/informasi-sekolah/kalender-pendidikan",
  "/berita/informasi-sekolah/tata-tertib",
  "/berita/informasi-sekolah/panduan-mpls",
  "/berita/informasi-sekolah/ppdb",
  "/berita/informasi-sekolah/layanan-surat",
  "/berita/informasi-sekolah/uks-bk",
  "/berita/informasi-sekolah/peminjaman-sarana",
  "/berita/agenda",
  "/berita/event",
  // listing
  "/pengumuman",
  "/prestasi",
  // info keuangan
  "/info-keuangan",
  "/info-keuangan/bop",
  "/info-keuangan/bos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const dynamic = [
    ...beritaList.map((b) => `/berita/${b.slug}`),
    ...pengumumanList.map((p) => `/pengumuman/${p.slug}`),
    ...prestasiList.map((p) => `/prestasi/${p.slug}`),
    ...eventList.map((e) => `/berita/event/${e.slug}`),
  ];

  return [...staticPaths, ...dynamic].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
