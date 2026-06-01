import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { AgendaForm } from "../../_form";
import { updateAgendaItem } from "../../actions";

export const metadata = { title: "Edit agenda — Admin SMKN 74" };

async function getCategories() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("agenda_categories")
    .select("name")
    .order("sort_order")
    .order("name");
  return (data ?? []).map((r) => r.name as string);
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data, error }, categories] = await Promise.all([
    supabase
      .from("agenda")
      .select("id, title, scheduled_at, time_range, location, category")

      .eq("id", id)
      .maybeSingle(),
    getCategories(),
  ]);

  if (error) throw error;
  if (!data) notFound();

  const updateBound = updateAgendaItem.bind(null, data.id);

  return (
    <div className="w-full">
      <Link
        href="/admin/agenda"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar agenda
      </Link>
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Agenda</p>
          <h1 className="font-display headline-section">Edit agenda.</h1>
        </div>
        <Link
          href={`/admin/agenda/${id}/preview`}
          className="h-9 px-4 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors inline-flex items-center gap-2"
        >
          <span>↗</span> Preview
        </Link>
      </header>
      <AgendaForm
        action={updateBound}
        categories={categories}
        submitLabel="Simpan perubahan"
        defaults={{
          title: data.title,
          scheduled_at: data.scheduled_at,
          time_range: data.time_range,
          location: data.location,
          category: data.category,
        }}
      />
    </div>
  );
}
