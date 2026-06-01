"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createAdminClient } from "@/lib/supabase/admin";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionResult = { ok: boolean; error?: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Combine separate date (YYYY-MM-DD) and time (HH:MM) fields into ISO timestamp */
function readScheduledAt(fd: FormData): string | null {
  const date = String(fd.get("scheduled_date") ?? "").trim();
  const time = String(fd.get("scheduled_time") ?? "").trim();
  if (!date) return null;
  return new Date(`${date}T${time || "00:00"}:00`).toISOString();
}

function revalidateAll() {
  revalidatePath("/admin/agenda");
  revalidatePath("/agenda");
  revalidatePath("/");
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createAgendaItem(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const title = String(fd.get("title") ?? "").trim();
    const scheduledAt = readScheduledAt(fd);
    const timeRange = String(fd.get("time_range") ?? "").trim();
    const location = String(fd.get("location") ?? "").trim();
    const category = String(fd.get("category") ?? "").trim();

    if (!title) return { ok: false, error: "Judul wajib diisi." };
    if (!scheduledAt) return { ok: false, error: "Tanggal wajib diisi." };

    const supabase = createAdminClient();
    const { error } = await supabase.from("agenda").insert({
      title,
      scheduled_at: scheduledAt,
      time_range: timeRange || "",
      location: location || null,
      category: category || null,
    });
    if (error) return { ok: false, error: error.message };

    revalidateAll();
    redirect("/admin/agenda?toast=created");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateAgendaItem(
  id: string,
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  try {
    const title = String(fd.get("title") ?? "").trim();
    const scheduledAt = readScheduledAt(fd);
    const timeRange = String(fd.get("time_range") ?? "").trim();
    const location = String(fd.get("location") ?? "").trim();
    const category = String(fd.get("category") ?? "").trim();

    if (!title) return { ok: false, error: "Judul wajib diisi." };
    if (!scheduledAt) return { ok: false, error: "Tanggal wajib diisi." };

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("agenda")
      .update({
        title,
        scheduled_at: scheduledAt,
        time_range: timeRange || "",
        location: location || null,
        category: category || null,
      })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };

    revalidateAll();
    redirect("/admin/agenda?toast=updated");
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { ok: false, error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }
  return { ok: true };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteAgendaItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("agenda").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/agenda?toast=deleted");
}

// ─── Bulk delete ──────────────────────────────────────────────────────────────

export async function bulkDeleteAgendaItems(fd: FormData) {
  const ids = fd.getAll("ids").map(String).filter(Boolean);
  if (!ids.length) return;
  const supabase = createAdminClient();
  const { error } = await supabase.from("agenda").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/agenda?toast=bulk_deleted");
}

// ─── Duplicate ────────────────────────────────────────────────────────────────

export async function duplicateAgendaItem(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { data, error: fetchErr } = await supabase
    .from("agenda")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr || !data) throw new Error("Data tidak ditemukan.");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = data as Record<string, unknown>;
  const { error } = await supabase.from("agenda").insert({
    ...rest,
    title: `${rest.title} (Salinan)`,
  });
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/agenda?toast=duplicated");
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function createAgendaCategory(
  _prev: ActionResult,
  fd: FormData
): Promise<ActionResult> {
  const name = String(fd.get("name") ?? "").trim();
  if (!name) return { ok: false, error: "Nama kategori wajib diisi." };
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("agenda_categories")
    .insert({ name, sort_order: 99 });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/agenda/categories");
  return { ok: true };
}

export async function deleteAgendaCategory(fd: FormData) {
  const id = String(fd.get("id") ?? "");
  if (!id) return;
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("agenda_categories")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/agenda/categories");
  redirect("/admin/agenda/categories?toast=cat_deleted");
}
