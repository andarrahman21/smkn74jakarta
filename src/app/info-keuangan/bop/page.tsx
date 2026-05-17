import type { Metadata } from "next";
import { BudgetDetail } from "@/components/profil/BudgetDetail";

export const metadata: Metadata = { title: "BOP — SMKN 74 Jakarta" };

export default function Page() {
  return (
    <BudgetDetail
      code="BOP"
      fullName="Biaya Operasional Pendidikan"
      source="Pemerintah Provinsi DKI Jakarta"
      tagline="Anggaran Daerah · Pemprov DKI"
      accentBg="bg-navy"
      accentInk="text-paper"
      totalAnnual="Rp 2,4 M / tahun"
      perStudentMonthly="Rp 130.000"
      intro="Biaya Operasional Pendidikan (BOP) adalah bantuan dari Pemerintah Provinsi DKI Jakarta untuk membantu pembiayaan operasional sekolah negeri di wilayah DKI Jakarta. BOP melengkapi BOS dari pusat dan diperuntukkan terutama bagi kebutuhan sehari-hari sekolah."
      allocations={[
        { label: "Operasional rutin",  pct: 32, body: "Listrik, air, internet, kebersihan, dan pemeliharaan harian fasilitas." },
        { label: "Pembelajaran",        pct: 24, body: "Bahan ajar, modul, alat tulis, dan kebutuhan praktik kelas." },
        { label: "Sarana & Prasarana",  pct: 18, body: "Pengadaan barang habis pakai, perbaikan ringan, kebutuhan studio." },
        { label: "Honor & Insentif",    pct: 14, body: "Honor guru tidak tetap, tunjangan transport guru luar, koordinator kegiatan." },
        { label: "Kegiatan Kesiswaan",  pct: 8,  body: "Lomba antar sekolah, pendampingan ekskul, dan kebutuhan OSIS/MPK." },
        { label: "Cadangan tak terduga",pct: 4,  body: "Disiapkan untuk pengeluaran mendadak yang prioritas." },
      ]}
      rules={[
        "Bonus, transport, atau honor di luar yang diatur juknis.",
        "Pembelian aset tetap dengan nilai di atas batas yang ditentukan.",
        "Investasi atau penempatan dana di luar rekening sekolah.",
        "Pungutan tambahan kepada orang tua siswa.",
        "Pembiayaan kegiatan yang tidak terkait pendidikan.",
      ]}
      faqs={[
        { q: "Apakah BOP boleh digunakan untuk seragam siswa?", a: "Tidak. BOP tidak diperuntukkan untuk pembiayaan seragam personal siswa. Sekolah dapat menyalurkan bantuan seragam melalui jalur lain (misalnya KJP)." },
        { q: "Apakah ada laporan publik penggunaan BOP?", a: "Ya. Sekolah menyusun RKAS setiap awal tahun dan melaporkan realisasinya. Dokumen dapat diminta melalui Tata Usaha." },
        { q: "Bagaimana jika BOP belum cair?", a: "Sekolah tetap menjalankan operasional menggunakan sumber lain (BOS atau dana sekolah) sambil menunggu pencairan dari Pemprov DKI." },
        { q: "Siapa yang mengaudit penggunaan BOP?", a: "Inspektorat Pemprov DKI dan BPK RI sesuai dengan siklus audit reguler." },
      ]}
      related={[
        { tag: "Keuangan", title: "BOS — Bantuan Operasional Sekolah", body: "Bantuan dari Kemendikbudristek.", href: "/info-keuangan/bos", bg: "bg-amber", ink: "text-navy" },
        { tag: "Profil",   title: "Tenaga Kependidikan", body: "Tim Tata Usaha & administrasi.", href: "/profil/struktur/tenaga-kependidikan", bg: "bg-moss", ink: "text-paper" },
        { tag: "Berita",   title: "Informasi Sekolah", body: "Panduan & kebijakan.", href: "/berita/informasi-sekolah", bg: "bg-navy", ink: "text-paper" },
      ]}
    />
  );
}
