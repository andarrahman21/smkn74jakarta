import { createPublicClient } from "@/lib/supabase/server";
import type { StrukturProfil } from "@/lib/struktur";
import type { Person } from "@/components/profil/PeopleSection";

/** Ambil profil struktur untuk satu kategori (build-safe; kosong bila gagal). */
export async function getStrukturProfil(kategori: string): Promise<StrukturProfil[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("struktur_profil")
      .select("id, kategori, sort_order, title, nama, foto_url")
      .eq("kategori", kategori)
      .order("sort_order", { ascending: true });
    return (data ?? []) as StrukturProfil[];
  } catch {
    return [];
  }
}

/** Inisial dari nama (maks 2 huruf). */
export function initialsFromName(nama: string): string {
  const parts = nama.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Palet warna kartu (cycle by index) untuk profil dari DB. */
const PALETTE = [
  { bg: "bg-navy", ink: "text-paper" },
  { bg: "bg-amber", ink: "text-navy" },
  { bg: "bg-moss", ink: "text-paper" },
  { bg: "bg-rust", ink: "text-paper" },
  { bg: "bg-navy-deep", ink: "text-paper" },
] as const;

export function paletteAt(i: number) {
  return PALETTE[i % PALETTE.length];
}

/** Petakan profil DB → Person untuk PeopleSection. */
export function toPeople(rows: StrukturProfil[]): Person[] {
  return rows.map((r, i) => {
    const c = paletteAt(i);
    return {
      initials: initialsFromName(r.nama),
      name: r.nama,
      role: r.title,
      foto: r.foto_url,
      bg: c.bg,
      ink: c.ink,
    };
  });
}
