/** Seed tabel misi dari data hardcode lama. Run: npx tsx scripts/seed-misi.ts [--force] */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";
import ws from "ws";
if (!(globalThis as { WebSocket?: unknown }).WebSocket) (globalThis as { WebSocket: unknown }).WebSocket = ws;
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const misi = [
  { sort_order: 1, title: "Membentuk karakter", body: "Menumbuhkan integritas, disiplin, dan semangat gotong-royong sebagai dasar setiap pembelajaran." },
  { sort_order: 2, title: "Mengembangkan keahlian", body: "Menyiapkan lulusan terampil di bidang seni dan kreatif yang relevan dengan kebutuhan industri." },
  { sort_order: 3, title: "Menumbuhkan kreativitas", body: "Membuka ruang ekspresi, eksperimen, dan kolaborasi lintas konsentrasi keahlian." },
  { sort_order: 4, title: "Membangun kemitraan", body: "Bekerjasama dengan DUDI, komunitas seni, dan perguruan tinggi untuk jalur karier yang luas." },
  { sort_order: 5, title: "Mewujudkan lingkungan inklusif", body: "Sekolah yang aman, ramah, dan menghargai setiap latar belakang dan ekspresi." },
];

(async () => {
  const { count } = await sb.from("misi").select("*", { count: "exact", head: true });
  if ((count ?? 0) > 0 && !process.argv.includes("--force")) {
    console.log(`Tabel misi sudah berisi ${count} baris. Pakai --force untuk overwrite.`);
    return;
  }
  if ((count ?? 0) > 0) await sb.from("misi").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { data, error } = await sb.from("misi").insert(misi).select("sort_order, title");
  if (error) { console.error("Gagal:", error.message); process.exit(1); }
  console.log(`✅ ${data?.length} misi di-seed.`);
})();
