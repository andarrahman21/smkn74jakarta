/**
 * Struktur menu "Layanan" + key konten untuk tiap link surat.
 * URL tujuan tiap item disimpan di site_content dengan key di bawah,
 * dan dikelola lewat tabel di /admin/halaman-website/layanan.
 *
 * Satu sumber kebenaran: dipakai MainNav (render menu) & admin (kelola link).
 */

export type LayananItem = { key: string; label: string };
export type LayananGroup = { label: string; items: LayananItem[] };

export const LAYANAN_GROUPS: LayananGroup[] = [
  {
    label: "Akademik",
    items: [
      { key: "layanan_link.akademik.0", label: "Permohonan Penerbitan Surat Akademik" },
      { key: "layanan_link.akademik.1", label: "Surat Ijin Tidak Masuk Sekolah" },
      { key: "layanan_link.akademik.2", label: "Surat Ijin Masuk Kelas" },
      { key: "layanan_link.akademik.3", label: "Surat Ijin Keluar Kelas" },
      { key: "layanan_link.akademik.4", label: "Surat Ijin Mengikuti Kegiatan" },
    ],
  },
  {
    label: "Kesiswaan",
    items: [
      { key: "layanan_link.kesiswaan.0", label: "Permohonan Penerbitan Surat Kesiswaan" },
      { key: "layanan_link.kesiswaan.1", label: "Surat Ijin Kegiatan" },
      { key: "layanan_link.kesiswaan.2", label: "Surat Keterangan" },
      { key: "layanan_link.kesiswaan.3", label: "Surat Rekomendasi" },
      { key: "layanan_link.kesiswaan.4", label: "Surat Tugas" },
    ],
  },
  {
    label: "Humas & DUDI",
    items: [
      { key: "layanan_link.humas.0", label: "Permohonan Penerbitan Surat HUMAS & DUDI" },
      { key: "layanan_link.humas.1", label: "Permohonan Melaksanakan Kelas Industri / PKL" },
      { key: "layanan_link.humas.2", label: "Permohonan Buku Jurnal Kelas Industri / PKL" },
      { key: "layanan_link.humas.3", label: "Permohonan Pelaksanaan Kelas Industri / PKL" },
      { key: "layanan_link.humas.4", label: "Surat Keterangan Telah Melaksanakan Kelas Industri / PKL" },
    ],
  },
  {
    label: "Sarana & Prasarana",
    items: [
      { key: "layanan_link.sarana.0", label: "Permohonan Penerbitan Surat Sarana & Prasarana" },
      { key: "layanan_link.sarana.1", label: "Permohonan Kebutuhan Sarana & Prasarana" },
      { key: "layanan_link.sarana.2", label: "Permohonan Peminjaman Sarana & Prasarana" },
    ],
  },
  {
    label: "Bimbingan Konseling",
    items: [
      { key: "layanan_link.bk.0", label: "Surat Pengaduan Kejadian" },
      { key: "layanan_link.bk.1", label: "Permohonan Janji Pelaksanaan Bimbingan Konseling" },
    ],
  },
];

/** Semua item layanan (flat) — untuk admin. */
export const LAYANAN_ITEMS: (LayananItem & { group: string })[] = LAYANAN_GROUPS.flatMap((g) =>
  g.items.map((it) => ({ ...it, group: g.label }))
);
