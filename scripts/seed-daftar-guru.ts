/**
 * Seed daftar_guru table with the 8 hardcoded teachers from GuruSection.tsx
 * Run: npx tsx scripts/seed-daftar-guru.ts
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

const teachers = [
  { sort_order: 1, initials: "BS", name: "Drs. Bambang Sutiyono, M.Pd", role: "Kepala Sekolah",              bg: "bg-moss",       ink: "text-paper", group_label: "Pimpinan", status: "published" },
  { sort_order: 2, initials: "WS", name: "Wahyu Setiawan, S.Pd, M.Pd",  role: "Wakil Kurikulum",             bg: "bg-navy",       ink: "text-paper", group_label: "Pimpinan", status: "published" },
  { sort_order: 3, initials: "SR", name: "Siti Rohayu, S.Kom",           role: "Teknik Komputer & Jaringan",  bg: "bg-rust",       ink: "text-paper", group_label: "Guru Produktif", status: "published" },
  { sort_order: 4, initials: "AH", name: "Ahmad Hidayat, S.Pd",          role: "Animasi & Multimedia",        bg: "bg-amber",      ink: "text-navy",  group_label: "Guru Produktif", status: "published" },
  { sort_order: 5, initials: "DN", name: "Dewi Nurjanah, S.Pd",          role: "Bahasa Indonesia",            bg: "bg-paper-soft", ink: "text-ink",   group_label: "Guru Normatif", status: "published" },
  { sort_order: 6, initials: "RP", name: "Rio Pramudita, S.Kom",         role: "Rekayasa Perangkat Lunak",    bg: "bg-navy-deep",  ink: "text-paper", group_label: "Guru Produktif", status: "published" },
  { sort_order: 7, initials: "LK", name: "Lina Kartika, M.Pd",           role: "Akuntansi",                   bg: "bg-moss",       ink: "text-paper", group_label: "Guru Adaptif", status: "published" },
  { sort_order: 8, initials: "FA", name: "Fadli Akbar, S.Pd",            role: "Olahraga",                    bg: "bg-rust",       ink: "text-paper", group_label: "Guru Normatif", status: "published" },
];

async function main() {
  console.log("🌱  Seeding daftar_guru...\n");

  const { count } = await supabase
    .from("daftar_guru")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) > 0) {
    console.log(`⚠️   Tabel daftar_guru sudah berisi ${count} baris.`);
    const force = process.argv.includes("--force");
    if (!force) {
      console.log("     Jalankan dengan --force untuk overwrite:\n");
      console.log("     npx tsx scripts/seed-daftar-guru.ts --force\n");
      process.exit(0);
    }
    console.log("     --force aktif, menghapus data lama...");
    await supabase.from("daftar_guru").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    console.log("     ✓ Data lama dihapus.\n");
  }

  const { data, error } = await supabase
    .from("daftar_guru")
    .insert(teachers)
    .select("id, sort_order, name, role, status");

  if (error) {
    console.error("❌  Insert gagal:", error.message);
    process.exit(1);
  }

  console.log(`✅  ${data?.length ?? 0} guru berhasil di-seed:\n`);
  data?.forEach((row) => {
    console.log(`   [${row.sort_order}] ${row.name} — ${row.role}  (${row.status})`);
  });
  console.log("\n🎉  Selesai! Buka /admin/daftar-guru untuk melihat hasilnya.");
}

main();
