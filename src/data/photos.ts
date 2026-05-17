/**
 * Curated photo URLs (Unsplash) — relevan dengan konteks SMKN 74 Jakarta
 * (sekolah seni: tari, musik, karawitan, teater).
 *
 * Mengganti URL: cukup edit di sini, semua page otomatis update.
 */

const u = (id: string, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=${q}`;

export const PHOTOS = {
  hero: {
    dancers:  u("photo-1547153760-18fc86324498"),  // dance / performance
    robot:    u("photo-1485827404703-89b55fcc595e"), // robotics
    animator: u("photo-1551033406-611cf9a28f67"),  // creative computer work
    speaker:  u("photo-1573497019940-1c28c88b4f3e"), // man in suit / speaker
    workshop: u("photo-1581094794329-c8112a89af12"), // students working
  },

  welcomeVideo: u("photo-1577896851231-70ef18881754"), // teacher with students Indonesian context

  sambutan: {
    portrait: u("photo-1560250097-0b93528c311a"), // older asian man professional
  },

  berita: {
    "kreatif-mentor-lokakarya":    u("photo-1522202176988-66273c2fd55f"), // workshop
    "echo-voice-of-democracy":     u("photo-1573164713988-8665fc963095"), // gallery / exhibition
    "robotik-juara-nasional":      u("photo-1485827404703-89b55fcc595e"), // robot
    "kolaborasi-teater-garasi":    u("photo-1503095396549-807759245b35"), // theatre
    "alumni-talk-kampus-lanjut":   u("photo-1505373877841-8d25f7d46678"), // alumni talk panel
    "festival-tari-tradisional":   u("photo-1547153760-18fc86324498"), // dance
  } as Record<string, string>,

  // Galeri — mix tari/musik/karawitan/teater/sekolah/kegiatan
  galeri: {
    g1:  u("photo-1547153760-18fc86324498"), // tari
    g2:  u("photo-1562774053-701939374585"), // gedung sekolah
    g3:  u("photo-1545048140-2bb6c2fa9c97"), // bali / culture
    g4:  u("photo-1514320291840-2e0a9bf2a9ae"), // keyboard / musik
    g5:  u("photo-1522202176988-66273c2fd55f"), // workshop
    g6:  u("photo-1503095396549-807759245b35"), // theatre
    g7:  u("photo-1518972559570-7cc1309f3229"), // performance
    g8:  u("photo-1577471488278-16eec37ffcc2"), // sport / outdoor
    g9:  u("photo-1535525153412-5a092d46af72"), // dance
    g10: u("photo-1505373877841-8d25f7d46678"), // panel discussion
    g11: u("photo-1602868255824-d59f15f01b8c"), // gamelan-like
    g12: u("photo-1521587760476-6c12a4b040da"), // library
  },
};
