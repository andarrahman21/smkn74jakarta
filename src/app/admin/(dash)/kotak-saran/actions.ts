"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export async function setStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !status) return;
  if (!["baru", "dibaca", "ditindaklanjuti", "spam"].includes(status)) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("kotak_saran").update({ status }).eq("id", id);
  if (error) throw error;

  revalidatePath("/admin/kotak-saran");
  revalidatePath("/admin");
}
