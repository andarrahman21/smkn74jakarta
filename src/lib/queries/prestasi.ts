import { createPublicClient } from "@/lib/supabase/server";
import { formatIndoDate, formatIndoDateParts } from "./utils";
import type { Prestasi } from "./types";
import type { PrestasiIconKey } from "@/components/profil/PrestasiIcon";

const COLS = "id, slug, icon, bg, achieved_at, level, tag, title, sub, team, body, body_html, image_url, image_alt";

type Row = {
  id: string;
  slug: string;
  icon: PrestasiIconKey;
  bg: string;
  achieved_at: string;
  level: Prestasi["level"];
  tag: string;
  title: string;
  sub: string;
  team: string[];
  body: string[];
  body_html: string | null;
  image_url: string | null;
  image_alt: string | null;
};

function toPrestasi(r: Row): Prestasi {
  return {
    id: r.id,
    slug: r.slug,
    icon: r.icon,
    bg: r.bg,
    date: formatIndoDate(r.achieved_at),
    year: formatIndoDateParts(r.achieved_at).year,
    level: r.level,
    tag: r.tag,
    title: r.title,
    sub: r.sub,
    team: r.team ?? [],
    body: r.body ?? [],
    bodyHtml: r.body_html ?? null,
    image: r.image_url ?? null,
    imageAlt: r.image_alt ?? null,
  };
}

export async function getPrestasiList(limit?: number): Promise<Prestasi[]> {
  try {
    const supabase = createPublicClient();
    let q = supabase
      .from("prestasi")
      .select(COLS)
      .eq("status", "published")
      .order("achieved_at", { ascending: false });
    if (limit) q = q.limit(limit);
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []).map((r) => toPrestasi(r as Row));
  } catch {
    return [];
  }
}

export async function getPrestasi(slug: string): Promise<Prestasi | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("prestasi")
      .select(COLS)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return data ? toPrestasi(data as Row) : null;
  } catch {
    return null;
  }
}

export async function getPrestasiSlugs(): Promise<string[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("prestasi")
      .select("slug")
      .eq("status", "published");
    if (error) throw error;
    return (data ?? []).map((r) => r.slug);
  } catch {
    return [];
  }
}

/** Untuk PrestasiSection counter di homepage */
export async function getPrestasiStats(): Promise<{ total: number; nasional: number }> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("prestasi")
      .select("level")
      .eq("status", "published");
    if (error) throw error;
    const rows = data ?? [];
    const nasional = rows.filter((r) => r.level === "Nasional" || r.level === "Internasional").length;
    return { total: rows.length, nasional };
  } catch {
    return { total: 0, nasional: 0 };
  }
}
