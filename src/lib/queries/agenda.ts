import { createPublicClient } from "@/lib/supabase/server";
import { formatIndoDateParts } from "./utils";
import type { Agenda } from "./types";

const COLS = "scheduled_at, time_range, title, location, category";

type Row = {
  scheduled_at: string;
  time_range: string;
  title: string;
  location: string;
  category: Agenda["category"];
};

const MONTH_ORDER = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const monthIdx = (m: string) => MONTH_ORDER.indexOf(m);

function toAgenda(r: Row): Agenda {
  const p = formatIndoDateParts(r.scheduled_at);
  return {
    day: p.day,
    month: p.monthShort,
    year: p.year,
    date: `${parseInt(p.day, 10)} ${p.monthLong} ${p.year}`,
    time: r.time_range,
    title: r.title,
    location: r.location,
    category: r.category,
  };
}

export async function getAgendaList(): Promise<Agenda[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("agenda")
      .select(COLS)
      .order("scheduled_at", { ascending: true });
    if (error) throw error;
    return (data ?? []).map((r) => toAgenda(r as Row));
  } catch {
    return [];
  }
}

export async function getAgendaByMonth(): Promise<[string, Agenda[]][]> {
  try {
  const list = await getAgendaList();
  const map = new Map<string, Agenda[]>();
  for (const a of list) {
    const key = `${a.month} ${a.year}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(a);
  }
  // Sort by day desc within month (newest day on top)
  for (const items of map.values()) {
    items.sort((a, b) => Number(b.day) - Number(a.day));
  }
  // Sort months: newest year first, then newest month
  return Array.from(map.entries()).sort(([keyA], [keyB]) => {
    const [mA, yA] = keyA.split(" ");
    const [mB, yB] = keyB.split(" ");
    if (yA !== yB) return Number(yB) - Number(yA);
    return monthIdx(mB) - monthIdx(mA);
  });
  } catch {
    return [];
  }
}
