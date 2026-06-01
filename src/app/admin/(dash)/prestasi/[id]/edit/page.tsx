import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { PrestasiForm } from "../../_form";
import { updatePrestasiItem } from "../../actions";

export const metadata = { title: "Edit prestasi — Admin SMKN 74" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("prestasi")
    .select("id, slug, title, sub, achieved_at, level, tag, icon, bg, image_url, image_alt, team, body, body_html, status")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  const updateBound = updatePrestasiItem.bind(null, data.id);

  return (
    <div className="w-full">
      <Link
        href="/admin/prestasi"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar prestasi
      </Link>
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Prestasi</p>
          <h1 className="font-display headline-section">Edit prestasi.</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/prestasi/${data.slug}`}
            target="_blank"
            className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
          >
            <span>↗</span> Buka di publik
          </Link>
          <Link
            href={`/admin/prestasi/${id}/preview`}
            className="h-9 px-4 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors inline-flex items-center gap-2"
          >
            <span>↗</span> Preview
          </Link>
        </div>
      </header>
      <PrestasiForm
        action={updateBound}
        submitLabel={data.status === "published" ? "Simpan perubahan" : "Publikasikan →"}
        defaults={{
          id: data.id,
          title: data.title,
          slug: data.slug,
          achieved_at: data.achieved_at,
          level: data.level,
          tag: data.tag,
          sub: data.sub,
          icon: data.icon,
          bg: data.bg,
          image_url: (data as Record<string, unknown>).image_url as string ?? null,
          image_alt: (data as Record<string, unknown>).image_alt as string ?? null,
          team: Array.isArray(data.team) ? data.team as string[] : null,
          body: Array.isArray(data.body) ? data.body as string[] : null,
          body_html: (data as Record<string, unknown>).body_html as string ?? null,
          status: (data as Record<string, unknown>).status === "published" ? "published" : "draft",
        }}
      />
    </div>
  );
}
