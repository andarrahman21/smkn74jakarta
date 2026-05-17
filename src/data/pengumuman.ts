export type Pengumuman = {
  slug: string;
  day: string;
  month: string;
  date: string;
  year: string;
  tag?: string;
  category: string;
  title: string;
  excerpt: string;
  body: string[];
};

export const pengumumanList: Pengumuman[] = [
  {
    slug: "jadwal-mpls-2026",
    day: "15", month: "Apr", date: "15 April 2026", year: "2026",
    tag: "Baru", category: "MPLS",
    title: "Jadwal MPLS 2026 dan persiapan masuk.",
    excerpt: "Jadwal Masa Pengenalan Lingkungan Sekolah tahun ajaran 2026/2027 resmi dirilis.",
    body: [
      "Masa Pengenalan Lingkungan Sekolah (MPLS) tahun ajaran 2026/2027 akan dilaksanakan pada tanggal 14–18 Juli 2026. Seluruh peserta didik baru wajib hadir dengan membawa atribut yang sudah dibagikan saat daftar ulang.",
      "Agenda MPLS meliputi: pengenalan struktur sekolah, profil tenaga pendidik, tata tertib, kegiatan kesiswaan, serta orientasi konsentrasi keahlian.",
      "Informasi lengkap mengenai daftar perlengkapan, panduan teknis, dan jadwal harian akan dibagikan melalui wali kelas dan kanal resmi sekolah.",
    ],
  },
  {
    slug: "libur-idul-fitri-2026",
    day: "07", month: "Apr", date: "7 April 2026", year: "2026",
    category: "Akademik",
    title: "Libur Hari Raya Idul Fitri ditentukan 12 Mei.",
    excerpt: "Sekolah libur Hari Raya Idul Fitri mulai 12 Mei dan masuk kembali pada 22 Mei 2026.",
    body: [
      "Berdasarkan Surat Edaran Kementerian Pendidikan, libur Hari Raya Idul Fitri 1447 H dimulai tanggal 12 Mei dan berakhir 21 Mei 2026. Kegiatan belajar mengajar dimulai kembali pada Senin, 22 Mei 2026.",
      "Selama libur, siswa diharapkan tetap menjaga kebiasaan belajar dan beribadah. Tugas mandiri akan diberikan masing-masing guru mata pelajaran melalui kanal kelas.",
    ],
  },
  {
    slug: "beasiswa-2025-2026",
    day: "02", month: "Apr", date: "2 April 2026", year: "2026",
    category: "Beasiswa",
    title: "Pengumuman beasiswa siswa SMKN 74 tahun 2025/2026.",
    excerpt: "Daftar penerima beasiswa berprestasi & kurang mampu tahun 2025/2026 sudah dapat diakses.",
    body: [
      "Tim seleksi telah menyelesaikan proses verifikasi data calon penerima beasiswa untuk tahun ajaran 2025/2026. Hasil seleksi mencakup dua kategori: Beasiswa Berprestasi dan Beasiswa Kurang Mampu.",
      "Penerima akan dihubungi langsung oleh wali kelas dan diundang ke acara penyerahan simbolis pada 15 April 2026 di Aula Serbaguna SMKN 74.",
    ],
  },
  {
    slug: "pekan-seni-2026",
    day: "28", month: "Mar", date: "28 Maret 2026", year: "2026",
    tag: "Event", category: "Kesiswaan",
    title: "Pekan Seni SMKN 74 — pendaftaran tim dibuka.",
    excerpt: "Pendaftaran tim partisipan Pekan Seni 2026 dibuka hingga 10 April.",
    body: [
      "Pekan Seni adalah festival tahunan yang menampilkan karya dari empat konsentrasi keahlian. Tahun ini, tema yang diangkat adalah “Suara Tanah Air”.",
      "Pendaftaran tim dilakukan melalui OSIS dengan formulir kolektif kelas. Final showcase dilaksanakan 24 April 2026 di Aula.",
    ],
  },
  {
    slug: "ujian-tengah-semester",
    day: "20", month: "Mar", date: "20 Maret 2026", year: "2026",
    category: "Akademik",
    title: "Jadwal Ujian Tengah Semester Genap.",
    excerpt: "UTS dilaksanakan 7–12 April 2026 untuk semua tingkatan.",
    body: [
      "Ujian Tengah Semester Genap untuk seluruh tingkatan dilaksanakan pada 7–12 April 2026. Kisi-kisi materi telah diberikan oleh masing-masing guru.",
      "Siswa diharapkan hadir minimal 15 menit sebelum jadwal dimulai dan membawa alat tulis sendiri. Kalkulator hanya diizinkan untuk mata pelajaran tertentu.",
    ],
  },
  {
    slug: "pkl-gelombang-2",
    day: "12", month: "Mar", date: "12 Maret 2026", year: "2026",
    category: "PKL & Industri",
    title: "PKL gelombang II — penempatan mitra industri.",
    excerpt: "Daftar penempatan PKL gelombang II untuk siswa kelas XI telah dirilis.",
    body: [
      "Penempatan Praktik Kerja Lapangan gelombang II diumumkan. Setiap siswa wajib menemui pembimbing internal untuk mendapatkan briefing pra-PKL.",
      "Surat tugas dan buku jurnal PKL akan dibagikan tanggal 18 Maret 2026.",
    ],
  },
  {
    slug: "pemilihan-osis",
    day: "05", month: "Mar", date: "5 Maret 2026", year: "2026",
    category: "Kesiswaan",
    title: "Pemilihan Ketua OSIS periode 2026/2027.",
    excerpt: "Tahapan kampanye kandidat dimulai 5 Maret hingga pemungutan suara 22 Maret.",
    body: [
      "Tiga pasang kandidat akan mengikuti rangkaian kampanye, debat publik, dan pemungutan suara. Pemilih adalah seluruh siswa aktif kelas X dan XI.",
      "Hasil pemilihan akan diumumkan langsung setelah perhitungan oleh KPU sekolah.",
    ],
  },
  {
    slug: "vaksinasi-mr",
    day: "28", month: "Feb", date: "28 Februari 2026", year: "2026",
    category: "Kesehatan",
    title: "Vaksinasi Measles–Rubella untuk siswa kelas X.",
    excerpt: "Vaksinasi MR dilaksanakan bekerjasama dengan Puskesmas Jagakarsa.",
    body: [
      "Kegiatan vaksinasi MR dilaksanakan 3 Maret 2026 di UKS sekolah. Orang tua/wali wajib menandatangani surat persetujuan yang sudah dibagikan.",
      "Siswa yang berhalangan dapat mengikuti gelombang susulan tanggal 10 Maret 2026.",
    ],
  },
];

export function getPengumuman(slug: string) {
  return pengumumanList.find((p) => p.slug === slug);
}
