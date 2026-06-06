"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSection } from "@/lib/site-content/registry";

export type ActionResult = { ok: boolean; error?: string };

export async function updateSiteContent(
  sectionId: string,
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const section = getSection(sectionId);
    if (!section) return { ok: false, error: "Section tidak ditemukan." };

    const rows = section.fields.map((f) => ({
      key: f.key,
      value: String(fd.get(f.key) ?? "").trim(),
      updated_at: new Date().toISOString(),
    }));

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("site_content")
      .upsert(rows, { onConflict: "key" });
    if (error) return { ok: false, error: error.message };

    // Revalidate SELURUH halaman publik (site_content dipakai global di layout/nav/footer).
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
}

export async function updateSiteContentKey(key: string, value: string): Promise<ActionResult> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("site_content").upsert(
      { key, value: value.trim(), updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
    if (error) return { ok: false, error: error.message };
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Gagal." };
  }
}
