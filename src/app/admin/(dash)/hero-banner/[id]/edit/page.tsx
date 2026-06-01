import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { HeroBannerForm } from "../../_form";
import { updateHeroSlide } from "../../actions";

export const metadata = { title: "Edit Slide Hero — Admin SMKN 74" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .select("id, sort_order, eyebrow, head, tag, caption, year_label, image_url, image_alt, status")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  const boundUpdate = updateHeroSlide.bind(null, data.id);

  return (
    <div className="w-full">
      <Link
        href="/admin/hero-banner"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke daftar slide
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Hero Banner</p>
        <h1 className="font-display headline-section">Edit slide.</h1>
      </header>
      <HeroBannerForm
        action={boundUpdate}
        defaults={{
          id: data.id,
          sort_order: data.sort_order,
          eyebrow: data.eyebrow,
          head: data.head,
          tag: data.tag,
          caption: data.caption,
          year_label: data.year_label,
          image_url: data.image_url,
          image_alt: data.image_alt,
          status: (data.status === "published" ? "published" : "draft") as "draft" | "published",
        }}
      />
    </div>
  );
}
