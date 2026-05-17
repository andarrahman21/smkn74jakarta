import { PHOTOS } from "./photos";

export type Berita = {
  slug: string;
  num: string;
  tag: string;
  bg: string;
  date: string;
  author: string;
  readTime: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
};

export const beritaList: Berita[] = [
  {
    slug: "kreatif-mentor-lokakarya",
    num: "01", tag: "Karya Siswa", bg: "bg-rust",
    date: "12 Mei 2026", author: "Tim Humas", readTime: "4 mnt",
    title: "Kreatif Mentor: lokakarya kreatif perdana di SMKN 74.",
    excerpt: "Tiga puluh murid berbagi dari studio kayu hingga animasi 3D — semua kreatif, semua disambut publik.",
    image: PHOTOS.berita["kreatif-mentor-lokakarya"],
    body: [
      "Lokakarya “Kreatif Mentor” pertama kali digelar SMKN 74 pada awal Mei 2026. Tiga puluh murid dari empat konsentrasi keahlian berbagi proses kreatif mereka dalam format pameran terbuka.",
      "Tema yang diangkat adalah kolaborasi lintas disiplin: anak-anak Tari berkolaborasi dengan Musik untuk pertunjukan pendek, Karawitan menyusun komposisi original yang diiringi visual dari kelas Multimedia, dan Teater menampilkan adaptasi naskah lokal.",
      "Acara dihadiri orang tua, alumni, dan komunitas seni Jakarta. Pemenang sesi presentasi terbaik dipilih oleh juri tamu dari Institut Kesenian Jakarta.",
      "Kepala Sekolah, Drs. Bambang Sutiyono, M.Pd, dalam sambutannya menyampaikan bahwa lokakarya ini akan menjadi agenda tahunan.",
    ],
  },
  {
    slug: "echo-voice-of-democracy",
    num: "31", tag: "Suara Siswa", bg: "bg-navy",
    date: "31 Maret 2026", author: "Redaksi OSIS", readTime: "5 mnt",
    title: "Echo of the Voice of Democracy: pameran proyek PS kelas X.",
    excerpt: "Lima narasi visual dari kelas X untuk demokrasi yang lebih partisipatif.",
    image: PHOTOS.berita["echo-voice-of-democracy"],
    body: [
      "Pameran “Echo of the Voice of Democracy” menampilkan lima proyek dari siswa kelas X dalam mata pelajaran Pendidikan Pancasila. Tiap kelompok mengangkat satu isu — partisipasi pemilih muda, transparansi anggaran sekolah, kebebasan berekspresi, hak digital, dan kesetaraan akses pendidikan.",
      "Pameran berlangsung tiga hari di Galeri Sekolah, dilengkapi sesi diskusi terbuka dengan siswa, guru, dan tamu undangan.",
      "Salah satu karya — visualisasi alur APBS — bahkan diadopsi sekolah sebagai infografis publik di papan transparansi.",
    ],
  },
  {
    slug: "robotik-juara-nasional",
    num: "30", tag: "Prestasi", bg: "bg-moss",
    date: "30 Maret 2026", author: "Tim Humas", readTime: "3 mnt",
    title: "Membanggakan: prestasi tim Robotik raih juara nasional.",
    excerpt: "Tim Robotik SMKN 74 raih juara di kompetisi tingkat nasional Yogyakarta.",
    image: PHOTOS.berita["robotik-juara-nasional"],
    body: [
      "Tim Robotik SMKN 74 yang beranggotakan empat siswa kelas XI berhasil meraih juara pertama dalam kompetisi robotik nasional yang diselenggarakan di Universitas Gadjah Mada, Yogyakarta.",
      "Robot karya tim, yang dinamai “Tabuh”, dirancang untuk mensimulasikan pukulan gamelan secara otomatis dengan presisi tinggi. Konsep ini merupakan pertemuan unik antara teknologi dan seni tradisional — sangat menonjol di mata juri.",
      "Tim akan mewakili Indonesia di kompetisi tingkat Asia Tenggara pada Oktober mendatang.",
    ],
  },
  {
    slug: "kolaborasi-teater-garasi",
    num: "22", tag: "Workshop", bg: "bg-amber",
    date: "22 Maret 2026", author: "Sie Seni & Budaya", readTime: "4 mnt",
    title: "Workshop dengan Teater Garasi: belajar membaca tubuh.",
    excerpt: "Sutradara Teater Garasi memberikan workshop intensif tiga hari untuk siswa Teater.",
    image: PHOTOS.berita["kolaborasi-teater-garasi"],
    body: [
      "Selama tiga hari, dua puluh siswa Konsentrasi Teater mendapat kesempatan langka belajar dari salah satu sutradara Teater Garasi, Yogyakarta. Workshop dibuka untuk semua tingkatan dengan fokus pada olah tubuh dan kesadaran ruang.",
      "Sesi-sesi diisi dengan latihan dasar, observasi karya, dan diskusi naskah. Pada hari ketiga, siswa mementaskan etude singkat sebagai presentasi akhir.",
    ],
  },
  {
    slug: "alumni-talk-kampus-lanjut",
    num: "14", tag: "Karier", bg: "bg-navy-deep",
    date: "14 Maret 2026", author: "BK & Karier", readTime: "5 mnt",
    title: "Alumni Talk: tiga jalur setelah SMK.",
    excerpt: "Tiga alumni berbagi cerita: kuliah seni, langsung bekerja, dan jalur kewirausahaan.",
    image: PHOTOS.berita["alumni-talk-kampus-lanjut"],
    body: [
      "Tiga alumni angkatan 2020–2022 hadir di Aula Serbaguna untuk berbagi pengalaman pasca-SMK. Mereka mewakili tiga jalur: melanjutkan ke perguruan tinggi seni (IKJ & ISI), bekerja langsung di industri kreatif, dan merintis usaha sendiri.",
      "Sesi diakhiri dengan diskusi terbuka. Banyak siswa kelas XII bertanya tentang strategi portofolio dan tes masuk PTN seni.",
    ],
  },
  {
    slug: "festival-tari-tradisional",
    num: "08", tag: "Prestasi", bg: "bg-rust",
    date: "8 Maret 2026", author: "Tim Humas", readTime: "3 mnt",
    title: "Juara 1 Festival Tari Tradisional Pelajar Indonesia.",
    excerpt: "Tim Tari SMKN 74 raih juara pertama di festival tingkat nasional di Bali.",
    image: PHOTOS.berita["festival-tari-tradisional"],
    body: [
      "Tim Tari SMKN 74 dengan koreografi “Beksan Gambyong Kontemporer” berhasil meraih juara pertama Festival Tari Tradisional Pelajar Indonesia 2026. Festival dilaksanakan di Bali dengan 28 peserta dari seluruh provinsi.",
      "Karya yang dibawakan merupakan reinterpretasi tari gambyong klasik dengan musik kontemporer dari Konsentrasi Musik.",
    ],
  },
];

export function getBerita(slug: string) {
  return beritaList.find((b) => b.slug === slug);
}
