/**
 * Seed hero_slides table with the 5 hardcoded slides from Hero.tsx
 * Run: npx tsx scripts/seed-hero-slides.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";
import ws from "ws";

// Node 21 lacks native WebSocket — Supabase realtime needs polyfill
if (!(globalThis as { WebSocket?: unknown }).WebSocket) {
  (globalThis as { WebSocket: unknown }).WebSocket = ws;
}

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌  NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const slides = [
  {
    sort_order: 1,
    eyebrow:     "Di SMKN 74, kami percaya pada",
    head_pre:    "Menemukan jalanmu",
    head_accent: "dalam komunitas",
    head_post:   "yang menghargai siapa\ndirimu sepenuhnya.",
    tag:         "Pertunjukan tari kelas X",
    caption:     "Pertunjukan akhir tingkatan tim usai final.",
    year_label:  "Tari, 2025",
    image_url:   u("photo-1547153760-18fc86324498"),
    image_alt:   "Penari pertunjukan tari kelas X SMKN 74",
    status:      "published",
  },
  {
    sort_order: 2,
    eyebrow:     "Cerita dari kompetisi nasional",
    head_pre:    "Bangun karya yang",
    head_accent: "membuat kota berbicara",
    head_post:   "lewat tim Robotik\nkebanggaan sekolah.",
    tag:         "Tim Robotik · Juara Nasional",
    caption:     "Tim Robotik raih juara di tingkat nasional Yogyakarta.",
    year_label:  "Robotik, 2026",
    image_url:   u("photo-1485827404703-89b55fcc595e"),
    image_alt:   "Robot karya tim Robotik SMKN 74 di kompetisi",
    status:      "published",
  },
  {
    sort_order: 3,
    eyebrow:     "Ruang kreatif setiap hari",
    head_pre:    "Kreativitas yang",
    head_accent: "tumbuh dari ketekunan",
    head_post:   "studio Animasi 3D &\nMultimedia kami.",
    tag:         "Animasi 3D · LKS 2026",
    caption:     "Juara 1 Lomba Kompetensi Siswa bidang Animasi 3D 2026.",
    year_label:  "Animasi & Multimedia, 2026",
    image_url:   u("photo-1551033406-611cf9a28f67"),
    image_alt:   "Siswa Animasi 3D bekerja di studio multimedia",
    status:      "published",
  },
  {
    sort_order: 4,
    eyebrow:     "Pesan dari Kepala Sekolah",
    head_pre:    "Sekolah ini bukan",
    head_accent: "sekadar tempat belajar",
    head_post:   "— ia adalah rumah\ntempat karakter dibentuk.",
    tag:         "Sambutan · Drs. Bambang S.",
    caption:     "Bismillahirrohmanirrahim. Selamat datang di SMKN 74.",
    year_label:  "Sambutan, 2026",
    image_url:   u("photo-1573497019940-1c28c88b4f3e"),
    image_alt:   "Kepala Sekolah SMKN 74 menyampaikan sambutan",
    status:      "published",
  },
  {
    sort_order: 5,
    eyebrow:     "Industri dan masa depan",
    head_pre:    "Belajar langsung dari",
    head_accent: "dunia industri nyata",
    head_post:   "lewat program PKL\nkelas industri.",
    tag:         "Humas & DUDI · PKL Aktif",
    caption:     "Kolaborasi nyata dengan mitra industri DKI Jakarta.",
    year_label:  "PKL, 2026",
    image_url:   u("photo-1581094794329-c8112a89af12"),
    image_alt:   "Siswa praktik kerja lapangan di workshop industri",
    status:      "published",
  },
];

async function main() {
  console.log("🌱  Seeding hero_slides...\n");

  // Cek apakah sudah ada data
  const { count } = await supabase
    .from("hero_slides")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) > 0) {
    console.log(`⚠️   Tabel hero_slides sudah berisi ${count} baris.`);
    console.log("     Hapus data lama dulu? (tambah --force untuk skip konfirmasi)\n");

    const force = process.argv.includes("--force");
    if (!force) {
      console.log("     Jalankan dengan flag --force untuk overwrite:\n");
      console.log("     npx tsx scripts/seed-hero-slides.ts --force\n");
      process.exit(0);
    }

    console.log("     --force aktif, menghapus data lama...");
    const { error: delErr } = await supabase.from("hero_slides").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (delErr) {
      console.error("❌  Gagal hapus data lama:", delErr.message);
      process.exit(1);
    }
    console.log("     ✓ Data lama dihapus.\n");
  }

  const { data, error } = await supabase
    .from("hero_slides")
    .insert(slides)
    .select("id, sort_order, eyebrow, status");

  if (error) {
    console.error("❌  Insert gagal:", error.message);
    process.exit(1);
  }

  console.log(`✅  ${data?.length ?? 0} slide berhasil di-seed:\n`);
  data?.forEach((row) => {
    console.log(`   [${row.sort_order}] ${row.eyebrow}  (${row.status})`);
  });
  console.log("\n🎉  Selesai! Buka /admin/hero-banner untuk melihat hasilnya.");
}

main();
