/**
 * Registry konten statik halaman publik (CMS ala WordPress).
 *
 * Setiap field punya `default` = nilai hardcode saat ini, sehingga situs
 * tetap tampil sama persis sebelum ada override di tabel `site_content`.
 *
 * Admin mengedit field-field ini di /admin/halaman-website.
 * Konten DINAMIS (berita, prestasi, agenda, event, guru, pengumuman, slide hero)
 * TIDAK ada di sini — dikelola lewat menu masing-masing.
 */

export type FieldType = "text" | "textarea" | "image" | "url";

export type ContentField = {
  key: string;
  label: string;
  type: FieldType;
  default: string;
  hint?: string;
};

export type ContentSection = {
  id: string;
  title: string;
  description: string;
  /** Catatan bagian dinamis yang TIDAK bisa diedit di sini */
  dynamicNote?: string;
  fields: ContentField[];
};

const WELCOME_IMAGE = "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80";

export const SECTIONS: ContentSection[] = [
  {
    id: "welcome",
    title: "Sambutan & Pengumuman",
    description: "Bagian sambutan Kepala Sekolah dan judul kartu pengumuman di beranda.",
    dynamicNote: "Daftar pengumuman diambil otomatis dari menu Pengumuman.",
    fields: [
      { key: "welcome.announce_eyebrow", label: "Label Pengumuman", type: "text", default: "Pengumuman" },
      { key: "welcome.announce_heading", label: "Judul Pengumuman", type: "text", default: "Kabar terbaru dari sekolah" },
      { key: "welcome.announce_link", label: "Teks Link Pengumuman", type: "text", default: "Lihat semua Pengumuman" },
      { key: "welcome.sambutan_eyebrow", label: "Label Sambutan", type: "text", default: "Sambutan Kepala Sekolah" },
      { key: "welcome.quote", label: "Kutipan Sambutan", type: "textarea", default: "Sekolah ini bukan sekadar tempat belajar — ia adalah rumah tempat karakter dibentuk." },
      { key: "welcome.image", label: "Gambar / Video Sambutan", type: "image", default: WELCOME_IMAGE, hint: "Gambar besar di kartu sambutan." },
      { key: "welcome.video_duration", label: "Durasi Video", type: "text", default: "03:41" },
      { key: "welcome.paragraph", label: "Paragraf Sambutan", type: "textarea", default: "Bismillahirrohmanirrahim. Puji syukur kami panjatkan ke hadirat Allah SWT. SMKN 74 Jakarta hadir di Jagakarsa sebagai sekolah kejuruan yang berkomitmen membentuk lulusan terbaik di dunia industri — siap menghadapi dunia kerja, industri, maupun jenjang pendidikan tinggi." },
      { key: "welcome.cta_label", label: "Label Tombol", type: "text", default: "Tentang Sekolah" },
    ],
  },
  {
    id: "news",
    title: "Cerita / Berita",
    description: "Judul bagian berita di beranda.",
    dynamicNote: "Kartu berita diambil otomatis dari menu Berita.",
    fields: [
      { key: "news.eyebrow", label: "Label", type: "text", default: "Cerita Terbaru" },
      { key: "news.heading", label: "Judul", type: "text", default: "Cerita dari sekolah kami." },
      { key: "news.link", label: "Teks Link", type: "text", default: "Lihat semua Berita" },
    ],
  },
  {
    id: "prestasi",
    title: "Prestasi",
    description: "Judul bagian prestasi & label statistik di beranda.",
    dynamicNote: "Kartu prestasi & angka statistik diambil otomatis dari menu Prestasi.",
    fields: [
      { key: "prestasi.eyebrow", label: "Label", type: "text", default: "Prestasi Terbaru" },
      { key: "prestasi.heading", label: "Judul", type: "text", default: "Catatan prestasi yang membanggakan tahun ini." },
      { key: "prestasi.total_label", label: "Label Statistik Total", type: "text", default: "Total" },
      { key: "prestasi.nasional_label", label: "Label Statistik Nasional", type: "text", default: "Nasional" },
      { key: "prestasi.link", label: "Teks Tombol", type: "text", default: "Lihat semua Prestasi" },
    ],
  },
  {
    id: "guru",
    title: "Pengurus & Guru",
    description: "Judul bagian daftar guru di beranda.",
    dynamicNote: "Kartu guru diambil otomatis dari menu Daftar Guru.",
    fields: [
      { key: "guru.eyebrow", label: "Label", type: "text", default: "Pengurus & Tenaga Kependidikan" },
      { key: "guru.heading", label: "Judul", type: "text", default: "Orang-orang yang membentuk sekolah." },
    ],
  },
  {
    id: "kontak",
    title: "Kontak",
    description: "Informasi kontak & alamat sekolah di beranda.",
    dynamicNote: "Form kotak saran tetap berfungsi otomatis.",
    fields: [
      { key: "kontak.eyebrow", label: "Label", type: "text", default: "Hubungi Kami" },
      { key: "kontak.heading", label: "Judul", type: "text", default: "Datang, tanya, terhubung." },
      { key: "kontak.full_link", label: "Teks Link Halaman Kontak", type: "text", default: "Halaman kontak lengkap" },
      { key: "kontak.address", label: "Alamat", type: "textarea", default: "Jl. Moch. Kahfi II, Jagakarsa, Jakarta Selatan 12640" },
      { key: "kontak.maps_query", label: "URL Google Maps (embed)", type: "url", default: "https://www.google.com/maps?q=SMK+Negeri+74+Jakarta+Jagakarsa&output=embed", hint: "Tautan peta. Tambahkan &output=embed di akhir." },
      { key: "kontak.phone", label: "Telepon", type: "text", default: "(021) 7864-216" },
      { key: "kontak.email", label: "Email", type: "text", default: "info@smkn74.sch.id" },
      { key: "kontak.hours", label: "Jam Kerja", type: "text", default: "Senin–Jumat · 07.00–16.00" },
      { key: "kontak.ppdb", label: "Periode PPDB", type: "text", default: "Apr–Jun" },
      { key: "kontak.form_desc", label: "Deskripsi Kirim Surat", type: "textarea", default: "Punya masukan untuk sekolah? Kirim secara anonim atau dengan nama Anda." },
    ],
  },
  {
    id: "cta",
    title: "Ajakan (CTA Banner)",
    description: "Banner ajakan bergabung di bagian bawah beranda.",
    fields: [
      { key: "cta.eyebrow", label: "Label", type: "text", default: "Siap bergabung?" },
      { key: "cta.heading_pre", label: "Judul (bagian putih)", type: "text", default: "Mulai dari sini dan saksikan" },
      { key: "cta.heading_accent", label: "Judul (bagian amber)", type: "text", default: "masa depanmu mekar." },
      { key: "cta.ppdb_label", label: "Tombol PPDB", type: "text", default: "Daftar PPDB →" },
      { key: "cta.contact_label", label: "Tombol Kontak", type: "text", default: "Hubungi kami" },
    ],
  },
];

/** Map default value per key — untuk fallback & merge. */
export const DEFAULTS: Record<string, string> = Object.fromEntries(
  SECTIONS.flatMap((s) => s.fields.map((f) => [f.key, f.default]))
);

export function getSection(id: string): ContentSection | undefined {
  return SECTIONS.find((s) => s.id === id);
}
