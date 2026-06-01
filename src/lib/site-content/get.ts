import { createPublicClient } from "@/lib/supabase/server";
import { DEFAULTS } from "./registry";

export type SiteContent = Record<string, string>;

/**
 * Ambil semua override dari site_content, gabung dengan default registry.
 * Hasil: map key → value (override jika ada, kalau tidak pakai default hardcode).
 * Plain object — aman dilempar ke Server & Client Component.
 */
export async function resolveSiteContent(): Promise<SiteContent> {
  const merged: SiteContent = { ...DEFAULTS };
  try {
    const supabase = createPublicClient();
    const { data } = await supabase.from("site_content").select("key, value");
    for (const row of data ?? []) {
      // Override hanya jika value tidak kosong
      if (typeof row.value === "string" && row.value.trim() !== "") {
        merged[row.key] = row.value;
      }
    }
  } catch {
    // Tabel belum ada / error → pakai default
  }
  return merged;
}
