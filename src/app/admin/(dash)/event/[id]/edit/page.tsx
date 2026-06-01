import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { EventForm } from "../../_form";
import { updateEventItem } from "../../actions";

export const metadata = { title: "Edit event — Admin SMKN 74" };

async function getCategories() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("event_categories")
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
      .from("event")
      .select("id, slug, title, event_date, starts_at, status, category, body, body_html, image_url, image_alt")
      .eq("id", id)
      .maybeSingle(),
    getCategories(),
  ]);

  if (error) throw error;
  if (!data) notFound();

  const updateBound = updateEventItem.bind(null, data.id);

  return (
    <div className="w-full">
      <Link
        href="/admin/event"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar event
      </Link>
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Event</p>
          <h1 className="font-display headline-section">Edit event.</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/event/${data.slug}`}
            target="_blank"
            className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
          >
            <span>↗</span> Buka di publik
          </Link>
          <Link
            href={`/admin/event/${id}/preview`}
            className="h-9 px-4 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors inline-flex items-center gap-2"
          >
            <span>↗</span> Preview
          </Link>
        </div>
      </header>
      <EventForm
        action={updateBound}
        categories={categories}
        submitLabel="Simpan perubahan"
        defaults={{
          id: data.id,
          title: data.title,
          slug: data.slug,
          event_date: data.event_date,
          starts_at: data.starts_at
            ? new Date(data.starts_at as string).toTimeString().slice(0, 5)
            : "",
          status: data.status as "Akan datang" | "Selesai",
          category: data.category,
          image_url: (data as Record<string, unknown>).image_url as string ?? null,
          image_alt: (data as Record<string, unknown>).image_alt as string ?? null,
          body: data.body,
          body_html: (data as Record<string, unknown>).body_html as string ?? null,
        }}
      />
    </div>
  );
}
