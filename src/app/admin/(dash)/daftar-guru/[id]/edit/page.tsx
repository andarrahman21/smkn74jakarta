import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { DaftarGuruForm } from "../../_form";
import { updateGuruItem } from "../../actions";

export const metadata = { title: "Edit Guru — Admin SMKN 74" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("daftar_guru")
    .select("id, sort_order, initials, name, role, photo_url, bg, ink, group_label, status")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  const boundUpdate = updateGuruItem.bind(null, data.id);

  return (
    <div className="w-full">
      <Link
        href="/admin/daftar-guru"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar guru
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Daftar Guru</p>
        <h1 className="font-display headline-section">Edit guru.</h1>
      </header>
      <DaftarGuruForm
        action={boundUpdate}
        defaults={{
          id: data.id,
          sort_order: data.sort_order,
          initials: data.initials,
          name: data.name,
          role: data.role,
          photo_url: data.photo_url,
          bg: data.bg,
          ink: data.ink,
          group_label: data.group_label,
          status: (data.status === "published" ? "published" : "draft") as "draft" | "published",
        }}
      />
    </div>
  );
}
