/**
 * Daftar semua halaman publik untuk editor "Halaman Website".
 * `editable: true`  → halaman statik, konten teks/gambar bisa diedit via klik.
 * `editable: false` → halaman dinamis (data dari DB), dikelola lewat menunya sendiri.
 */

export type PageGroup =
  | "Beranda"
  | "Profil Sekolah"
  | "Berita & Info"
  | "Layanan & Lainnya"
  | "Legal";

export type PageEntry = {
  path: string;
  title: string;
  group: PageGroup;
  editable: boolean;
  note?: string;
  /** Link tambahan untuk kelola daftar dinamis di halaman ini (mis. Misi). */
  manage?: { label: string; href: string };
};

export const PAGES: PageEntry[] = [
  // Beranda
  { path: "/", title: "Beranda", group: "Beranda", editable: true },

  // Profil Sekolah
  { path: "/tentang", title: "Tentang Sekolah", group: "Profil Sekolah", editable: true },
  { path: "/profil/sambutan", title: "Sambutan Kepala Sekolah", group: "Profil Sekolah", editable: true },
  { path: "/profil/visi-misi", title: "Visi & Misi", group: "Profil Sekolah", editable: true, manage: { label: "Kelola Misi", href: "/admin/misi" } },
  { path: "/profil/keahlian", title: "Konsentrasi Keahlian", group: "Profil Sekolah", editable: true },
  { path: "/profil/keahlian/tari", title: "Keahlian — Tari", group: "Profil Sekolah", editable: true },
  { path: "/profil/keahlian/musik", title: "Keahlian — Musik", group: "Profil Sekolah", editable: true },
  { path: "/profil/keahlian/karawitan", title: "Keahlian — Karawitan", group: "Profil Sekolah", editable: true },
  { path: "/profil/keahlian/teater", title: "Keahlian — Teater", group: "Profil Sekolah", editable: true },
  { path: "/profil/tenaga-pendidik", title: "Tenaga Pendidik", group: "Profil Sekolah", editable: true },
  { path: "/profil/kurikulum", title: "Kurikulum", group: "Profil Sekolah", editable: true },
  { path: "/profil/sarana-prasarana", title: "Sarana & Prasarana", group: "Profil Sekolah", editable: true },
  { path: "/profil/struktur", title: "Struktur Organisasi", group: "Profil Sekolah", editable: true },
  { path: "/profil/struktur/manajemen", title: "Struktur — Manajemen", group: "Profil Sekolah", editable: true },
  { path: "/profil/struktur/komite", title: "Struktur — Komite", group: "Profil Sekolah", editable: true },
  { path: "/profil/struktur/osis", title: "Struktur — OSIS", group: "Profil Sekolah", editable: true },
  { path: "/profil/struktur/mpk", title: "Struktur — MPK", group: "Profil Sekolah", editable: true },

  // Berita & Info
  { path: "/berita", title: "Berita", group: "Berita & Info", editable: false, note: "Daftar artikel dari menu Berita." },
  { path: "/berita/agenda", title: "Agenda", group: "Berita & Info", editable: false, note: "Data dari menu Agenda." },
  { path: "/berita/event", title: "Event", group: "Berita & Info", editable: false, note: "Data dari menu Event." },
  { path: "/prestasi", title: "Prestasi", group: "Berita & Info", editable: false, note: "Data dari menu Prestasi." },
  { path: "/pengumuman", title: "Pengumuman", group: "Berita & Info", editable: false, note: "Data dari menu Pengumuman." },
  { path: "/berita/informasi-sekolah", title: "Informasi Sekolah", group: "Berita & Info", editable: true },
  { path: "/berita/informasi-sekolah/kalender-pendidikan", title: "Kalender Pendidikan", group: "Berita & Info", editable: true },
  { path: "/berita/informasi-sekolah/tata-tertib", title: "Tata Tertib", group: "Berita & Info", editable: true },
  { path: "/berita/informasi-sekolah/panduan-mpls", title: "Panduan MPLS", group: "Berita & Info", editable: true },
  { path: "/berita/informasi-sekolah/ppdb", title: "PPDB", group: "Berita & Info", editable: true },
  { path: "/berita/informasi-sekolah/layanan-surat", title: "Layanan Surat", group: "Berita & Info", editable: true },
  { path: "/berita/informasi-sekolah/uks-bk", title: "UKS & BK", group: "Berita & Info", editable: true },
  { path: "/berita/informasi-sekolah/peminjaman-sarana", title: "Peminjaman Sarana", group: "Berita & Info", editable: true },

  // Layanan & Lainnya
  { path: "/mitra-dudi", title: "Mitra DUDI", group: "Layanan & Lainnya", editable: true },
  { path: "/info-keuangan", title: "Info Keuangan", group: "Layanan & Lainnya", editable: true },
  { path: "/info-keuangan/bop", title: "Info Keuangan — BOP", group: "Layanan & Lainnya", editable: true },
  { path: "/info-keuangan/bos", title: "Info Keuangan — BOS", group: "Layanan & Lainnya", editable: true },
  { path: "/kontak", title: "Kontak", group: "Layanan & Lainnya", editable: true },
  { path: "/ppdb", title: "PPDB / SPMB", group: "Layanan & Lainnya", editable: true },
];

export const PAGE_GROUPS: PageGroup[] = [
  "Beranda",
  "Profil Sekolah",
  "Berita & Info",
  "Layanan & Lainnya",
];

export function findPage(path: string): PageEntry | undefined {
  return PAGES.find((p) => p.path === path);
}
