import { createPublicClient } from "@/lib/supabase/server";
import type { EventItem } from "./types";

const COLS = "slug, title, event_date, starts_at, status, category, body, body_html, bg, ink, image_url, image_alt";

type Row = {
  slug: string;
  title: string;
  event_date: string;
  starts_at: string | null;
  status: EventItem["status"];
  category: string;
  body: string;
  body_html: string | null;
  bg: string;
  ink: string;
  image_url: string | null;
  image_alt: string | null;
};

function formatEventDate(raw: string): string {
  // If stored as YYYY-MM-DD, format to Indonesian. Otherwise return as-is (legacy free text).
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return new Date(raw + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return raw;
}

function toEvent(r: Row): EventItem {
  return {
    slug: r.slug,
    title: r.title,
    date: formatEventDate(r.event_date),
    status: r.status,
    category: r.category,
    body: r.body,
    bodyHtml: r.body_html ?? null,
    bg: r.bg,
    ink: r.ink,
    image: r.image_url ?? null,
    imageAlt: r.image_alt ?? null,
  };
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    const supabase = createPublicClient();
    // Sort: Akan datang dulu (earlier starts_at first), lalu Selesai (latest first)
    const { data, error } = await supabase
      .from("event")
      .select(COLS)
      .order("status", { ascending: true })   // 'Akan datang' < 'Selesai' alphabetically
      .order("starts_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return (data ?? []).map((r) => toEvent(r as Row));
  } catch {
    return [];
  }
}

export async function getEvent(slug: string): Promise<EventItem | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("event").select(COLS).eq("slug", slug).maybeSingle();
    if (error) throw error;
    return data ? toEvent(data as Row) : null;
  } catch {
    return null;
  }
}

export async function getEventSlugs(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("event").select("slug");
    if (error) throw error;
    return (data ?? []).map((r) => r.slug);
  } catch {
    return [];
  }
}
