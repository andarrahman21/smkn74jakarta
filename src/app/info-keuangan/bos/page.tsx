import type { Metadata } from "next";
import { BudgetDetail } from "@/components/profil/BudgetDetail";

export const metadata: Metadata = { title: "BOS — SMKN 74 Jakarta" };

export default function Page() {
  return (
    <BudgetDetail
      code="BOS"
      fullName="Bantuan Operasional Sekolah"
      source="Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI"
      tagline="Anggaran Pusat · Kemendikbudristek"
      accentBg="bg-amber"
      accentInk="text-navy"
      totalAnnual="Rp 2,1 M / tahun"
      perStudentMonthly="Rp 117.000"
      intro="Bantuan Operasional Sekolah (BOS) adalah program pemerintah pusat dari Kemendikbudristek yang menyalurkan dana operasional untuk sekolah dasar hingga menengah. BOS dirancang membantu sekolah menyelenggarakan pendidikan tanpa pungutan kepada peserta didik."
      allocations={[
        { label: "Pengembangan Perpustakaan", pct: 8,  body: "Pembelian buku, langganan jurnal, dan pengembangan koleksi digital." },
        { label: "Penerimaan Siswa Baru",     pct: 6,  body: "Kegiatan PPDB, MPLS, dan administrasi peserta didik baru." },
        { label: "Kegiatan Pembelajaran",     pct: 22, body: "Bahan praktik konsentrasi seni, ATK, modul, asesmen, dan ekskul." },
        { label: "Kegiatan Asesmen",          pct: 10, body: "Penyelenggaraan UTS, UAS, ANBK, dan asesmen formatif rutin." },
        { label: "Langganan Daya & Jasa",     pct: 18, body: "Listrik, air, internet, telepon — kebutuhan utilitas sekolah." },
        { label: "Pemeliharaan Sarana",       pct: 14, body: "Perbaikan ruang kelas, studio, peralatan, dan furnitur." },
        { label: "Pengembangan SDM",          pct: 12, body: "Pelatihan guru, sertifikasi, dan pendampingan profesional." },
        { label: "Lainnya",                    pct: 10, body: "Multimedia, kebersihan & K3, dan kebutuhan administrasi." },
      ]}
      rules={[
        "Disimpan dengan maksud dibungakan.",
        "Dipinjamkan kepada pihak lain.",
        "Membiayai kegiatan yang tidak menjadi prioritas sekolah.",
        "Membiayai kegiatan yang sudah dibiayai sumber lain (double funding).",
        "Membayar bonus, transport, atau honor di luar juknis.",
        "Membeli pakaian, seragam, atau sepatu untuk kepentingan pribadi.",
      ]}
      faqs={[
        { q: "Apa perbedaan BOS dan BOP?", a: "BOS berasal dari pemerintah pusat (Kemendikbudristek), sedangkan BOP berasal dari pemerintah daerah (Pemprov DKI). Keduanya saling melengkapi untuk operasional sekolah." },
        { q: "Apakah penyaluran BOS bisa dilihat publik?", a: "Ya. Realisasi BOS dipublikasikan via portal BOS Kemendikbudristek dan RKAS sekolah." },
        { q: "Bisakah BOS membiayai pembelian gawai untuk siswa?", a: "Hanya jika gawai tersebut menjadi aset sekolah dan digunakan untuk pembelajaran. Bukan untuk kepemilikan pribadi siswa." },
        { q: "Bagaimana cara melapor jika ada penyimpangan?", a: "Hubungi Tata Usaha, gunakan Kotak Saran, atau lapor ke kanal pengaduan Kemendikbudristek (Lapor.go.id)." },
      ]}
      related={[
        { tag: "Keuangan", title: "BOP — Biaya Operasional Pendidikan", body: "Bantuan dari Pemprov DKI Jakarta.", href: "/info-keuangan/bop", bg: "bg-navy", ink: "text-paper" },
        { tag: "Profil",   title: "Tenaga Kependidikan", body: "Tim Tata Usaha & administrasi.", href: "/profil/struktur/tenaga-kependidikan", bg: "bg-moss", ink: "text-paper" },
        { tag: "Berita",   title: "Informasi Sekolah", body: "Panduan & kebijakan.", href: "/berita/informasi-sekolah", bg: "bg-rust", ink: "text-paper" },
      ]}
    />
  );
}
