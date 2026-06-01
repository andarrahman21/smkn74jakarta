import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { BeritaForm } from "../../_form";
import { updateBerita } from "../../actions";

export const metadata = { title: "Edit berita — Admin SMKN 74" };

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function getCategories(): Promise<string[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("berita_categories")
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
      .from("berita")
      .select("id, slug, published_at, tag, author, bg, num, read_time, title, excerpt, body, body_html, image, image_alt, thumbnail, thumbnail_alt, status")
      .eq("id", id)
      .maybeSingle(),
    getCategories(),
  ]);

  if (error) throw error;
  if (!data) notFound();

  const updateBound = updateBerita.bind(null, data.id);

  const bodyHtml =
    data.body_html ||
    (Array.isArray(data.body) ? data.body.map((p: string) => `<p>${escapeHtml(p)}</p>`).join("") : "");

  return (
    <div className="w-full">
      <Link
        href="/admin/berita"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar berita
      </Link>
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Berita</p>
          <h1 className="font-display headline-section">Edit berita.</h1>
        </div>
        <div className="flex items-center gap-2">
          {data.status === "published" && (
            <Link
              href={`/berita/${data.slug}`}
              target="_blank"
              className="h-9 px-4 rounded-full border border-moss/40 text-moss text-xs font-medium hover:bg-moss hover:text-paper transition-colors inline-flex items-center gap-1.5"
            >
              <span>↗</span> Buka di publik
            </Link>
          )}
          <Link
            href={`/admin/berita/${id}/preview`}
            target="_blank"
            className="h-9 px-4 rounded-full border border-black/10 text-xs font-medium hover:bg-paper-soft transition-colors inline-flex items-center gap-2"
          >
            <span>↗</span> Preview
          </Link>
        </div>
      </header>
      <BeritaForm
        action={updateBound}
        submitLabel={data.status === "published" ? "Simpan perubahan" : "Publikasikan →"}
        categories={categories}
        defaults={{
          id: data.id,
          slug: data.slug,
          published_at: data.published_at.slice(0, 10),
          tag: data.tag,
          author: data.author ?? "Tim Humas",
          bg: data.bg ?? "bg-navy",
          num: data.num ?? "",
          read_time: data.read_time ?? "3 mnt",
          title: data.title,
          excerpt: data.excerpt,
          body_html: bodyHtml,
          thumbnail: data.thumbnail ?? null,
          thumbnail_alt: data.thumbnail_alt ?? null,
          image: data.image ?? null,
          image_alt: data.image_alt ?? null,
          status: data.status === "published" ? "published" : "draft",
        }}
      />
    </div>
  );
}
