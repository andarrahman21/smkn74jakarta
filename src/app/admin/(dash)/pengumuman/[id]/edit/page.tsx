import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { PengumumanForm } from "../../_form";
import { updatePengumuman } from "../../actions";

export const metadata = { title: "Edit pengumuman — Admin SMKN 74" };

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function getFormData() {
  const supabase = createAdminClient();
  const [catRes, tagRes] = await Promise.all([
    supabase
      .from("pengumuman_categories")
      .select("name")
      .order("sort_order")
      .order("name"),
    supabase
      .from("pengumuman")
      .select("tag")
      .not("tag", "is", null),
  ]);
  const categories = (catRes.data ?? []).map((r) => r.name as string);
  const tags = [...new Set((tagRes.data ?? []).map((r) => r.tag as string).filter(Boolean))].sort();
  return { categories, tags };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = createAdminClient();
  const [{ data, error }, { categories, tags }] = await Promise.all([
    supabase
      .from("pengumuman")
      .select("id, slug, published_at, category, tag, title, excerpt, body, body_html, cover_image, cover_image_alt, status")
      .eq("id", id)
      .maybeSingle(),
    getFormData(),
  ]);

  if (error) throw error;
  if (!data) notFound();

  const updateBound = updatePengumuman.bind(null, data.id);

  const bodyHtml =
    data.body_html ||
    (Array.isArray(data.body) ? data.body.map((p: string) => `<p>${escapeHtml(p)}</p>`).join("") : "");

  return (
    <div className="w-full">
      <Link
        href="/admin/pengumuman"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar pengumuman
      </Link>
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Pengumuman</p>
          <h1 className="font-display headline-section">Edit pengumuman.</h1>
        </div>
        <div className="flex items-center gap-2">
          {data.status === "published" && (
            <Link
              href={`/pengumuman/${data.slug}`}
              target="_blank"
              className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
            >
              <span>↗</span> Buka di publik
            </Link>
          )}
          <Link
            href={`/admin/pengumuman/${id}/preview`}
            target="_blank"
            className="h-9 px-4 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors inline-flex items-center gap-2"
          >
            <span>↗</span> Preview
          </Link>
        </div>
      </header>
      <PengumumanForm
        action={updateBound}
        submitLabel={data.status === "published" ? "Simpan perubahan" : "Publikasikan →"}
        categories={categories}
        existingTags={tags}
        defaults={{
          id: data.id,
          slug: data.slug,
          published_at: data.published_at.slice(0, 10),
          category: data.category,
          tag: data.tag,
          title: data.title,
          excerpt: data.excerpt,
          body_html: bodyHtml,
          cover_image: data.cover_image ?? null,
          cover_image_alt: data.cover_image_alt ?? null,
          status: data.status === "published" ? "published" : "draft",
        }}
      />
    </div>
  );
}
