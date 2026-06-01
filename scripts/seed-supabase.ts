/**
 * Seed Supabase tables dari data TypeScript ke database.
 *
 * Cara jalankan:
 *   npm run seed
 *
 * Aman dijalankan berulang — pakai upsert by slug.
 */

import { config as loadEnv } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";

// Node 21 lacks native WebSocket — Supabase realtime needs polyfill
if (!(globalThis as { WebSocket?: unknown }).WebSocket) {
  (globalThis as { WebSocket: unknown }).WebSocket = ws;
}

import { pengumumanList } from "../src/data/pengumuman";
import { beritaList } from "../src/data/berita";
import { prestasiList } from "../src/data/prestasi";
import { eventList } from "../src/data/event";
import { agendaList } from "../src/data/agenda";

loadEnv({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ----- Indonesian month parser (short + long form) -----
const MONTH_MAP: Record<string, string> = {
  Januari: "01", Jan: "01",
  Februari: "02", Feb: "02",
  Maret: "03", Mar: "03",
  April: "04", Apr: "04",
  Mei: "05",
  Juni: "06", Jun: "06",
  Juli: "07", Jul: "07",
  Agustus: "08", Agu: "08", Ags: "08",
  September: "09", Sep: "09",
  Oktober: "10", Okt: "10",
  November: "11", Nov: "11",
  Desember: "12", Des: "12",
};

function buildIso(day: string, monthName: string, year: string, time = "00:00") {
  const m = MONTH_MAP[monthName];
  if (!m) throw new Error(`Unknown month "${monthName}"`);
  return `${year}-${m}-${day.padStart(2, "0")}T${time}:00+07:00`;
}

/** Parse "12 Mei 2026" or "31 Maret 2026" → ISO */
function parseIndoDate(s: string): string {
  const [day, monthName, year] = s.trim().split(/\s+/);
  return buildIso(day, monthName, year);
}

/** Parse "20–24 April 2026" → ISO of first day */
function parseEventStart(s: string): string | null {
  const dayMatch = s.match(/^(\d+)/);
  const yearMatch = s.match(/\b(20\d{2})\b/);
  const monthMatch = s.match(
    /\b(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|Jan|Feb|Mar|Apr|Jun|Jul|Agu|Sep|Okt|Nov|Des)\b/
  );
  if (!dayMatch || !yearMatch || !monthMatch) return null;
  return buildIso(dayMatch[1], monthMatch[1], yearMatch[1], "09:00");
}

/** "08.00 – 12.00" → "08:00" */
function firstHHmm(timeRange: string): string {
  const first = timeRange.split(/[–\-]/)[0]?.trim() ?? "08.00";
  return first.replace(".", ":").replace(/[^\d:]/g, "") || "08:00";
}

async function seedPengumuman() {
  console.log(`\n→ Pengumuman (${pengumumanList.length})`);
  for (const p of pengumumanList) {
    const { error } = await supabase
      .from("pengumuman")
      .upsert(
        {
          slug: p.slug,
          published_at: buildIso(p.day, p.month, p.year),
          category: p.category,
          tag: p.tag ?? null,
          title: p.title,
          excerpt: p.excerpt,
          body: p.body,
        },
        { onConflict: "slug" }
      );
    if (error) console.error("  ✗", p.slug, "—", error.message);
    else console.log("  ✓", p.slug);
  }
}

async function seedBerita() {
  console.log(`\n→ Berita (${beritaList.length})`);
  for (const b of beritaList) {
    const { error } = await supabase
      .from("berita")
      .upsert(
        {
          slug: b.slug,
          num: b.num,
          tag: b.tag,
          bg: b.bg,
          published_at: parseIndoDate(b.date),
          author: b.author,
          read_time: b.readTime,
          title: b.title,
          excerpt: b.excerpt,
          body: b.body,
          image: b.image,
        },
        { onConflict: "slug" }
      );
    if (error) console.error("  ✗", b.slug, "—", error.message);
    else console.log("  ✓", b.slug);
  }
}

async function seedPrestasi() {
  console.log(`\n→ Prestasi (${prestasiList.length})`);
  for (const p of prestasiList) {
    const { error } = await supabase
      .from("prestasi")
      .upsert(
        {
          slug: p.slug,
          icon: p.icon,
          bg: p.bg,
          achieved_at: parseIndoDate(p.date),
          level: p.level,
          tag: p.tag,
          title: p.title,
          sub: p.sub,
          team: p.team,
          body: p.body,
        },
        { onConflict: "slug" }
      );
    if (error) console.error("  ✗", p.slug, "—", error.message);
    else console.log("  ✓", p.slug);
  }
}

async function seedEvent() {
  console.log(`\n→ Event (${eventList.length})`);
  for (const e of eventList) {
    const { error } = await supabase
      .from("event")
      .upsert(
        {
          slug: e.slug,
          title: e.title,
          event_date: e.date,
          starts_at: parseEventStart(e.date),
          status: e.status,
          category: e.category,
          body: e.body,
          bg: e.bg,
          ink: e.ink,
        },
        { onConflict: "slug" }
      );
    if (error) console.error("  ✗", e.slug, "—", error.message);
    else console.log("  ✓", e.slug);
  }
}

async function seedAgenda() {
  console.log(`\n→ Agenda (${agendaList.length}) — replace all`);
  // Agenda tidak punya slug, jadi truncate dulu untuk hindari duplikat saat re-run
  const { error: delErr } = await supabase
    .from("agenda")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) console.error("  truncate failed:", delErr.message);

  for (const a of agendaList) {
    const { error } = await supabase.from("agenda").insert({
      scheduled_at: buildIso(a.day, a.month, a.year, firstHHmm(a.time)),
      time_range: a.time,
      title: a.title,
      location: a.location,
      category: a.category,
    });
    if (error) console.error("  ✗", a.title, "—", error.message);
    else console.log("  ✓", a.title);
  }
}

async function main() {
  console.log("Seeding Supabase →", url);
  await seedPengumuman();
  await seedBerita();
  await seedPrestasi();
  await seedEvent();
  await seedAgenda();
  console.log("\n✓ Selesai.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
