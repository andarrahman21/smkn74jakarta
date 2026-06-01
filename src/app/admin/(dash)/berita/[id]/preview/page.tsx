import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatIndoDateParts } from "@/lib/queries/utils";

export const metadata = { title: "Preview Berita — Admin SMKN 74" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("berita")
    .select("slug, published_at, tag, author, read_time, num, title, excerpt, body, body_html, image, image_alt, status")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const p = formatIndoDateParts(data.published_at);
  const date = `${parseInt(p.day, 10)} ${p.monthLong} ${p.year}`;

  const bodyHtml =
    data.body_html ||
    (Array.isArray(data.body)
      ? (data.body as string[]).map((t) => `<p>${t}</p>`).join("")
      : "");

  return (
    <div className="w-full">
      {/* Preview banner */}
      <div className="mb-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-amber/10 border border-amber/20">
        <div className="flex items-center gap-3 text-sm text-amber">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse" />
          <strong>Mode preview</strong> — ini tampilan draft, belum dipublikasikan
          {data.status === "published" && (
            <span className="text-moss font-medium ml-2">● Sudah tayang</span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/berita/${id}/edit`}
            className="h-8 px-4 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform inline-flex items-center gap-1.5"
          >
            <span aria-hidden>←</span> Edit
          </Link>
          {data.status === "published" && (
            <Link
              href={`/berita/${data.slug}`}
              target="_blank"
              className="h-8 px-4 rounded-full bg-moss text-paper text-xs font-medium hover:bg-moss/90 transition-colors inline-flex items-center gap-1"
            >
              Buka halaman publik ↗
            </Link>
          )}
        </div>
      </div>

      {/* Rendered content */}
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
          {/* Meta */}
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
            {data.tag} · {date}
          </p>
          <h1 className="font-display text-3xl md:text-4xl leading-tight mb-4">{data.title}</h1>

          {/* Author + read time */}
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted mb-6">
            <span>oleh {data.author ?? "Tim Humas"}</span>
            {data.read_time && (
              <>
                <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                <span>{data.read_time}</span>
              </>
            )}
          </div>

          {data.image && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-black/5">
              <Image
                src={data.image}
                alt={data.image_alt ?? data.title}
                width={1200}
                height={675}
                className="w-full object-cover"
                unoptimized
              />
            </div>
          )}

          {data.excerpt && (
            <p className="text-lg text-ink/70 leading-relaxed mb-8 italic border-l-4 border-amber pl-4">
              {data.excerpt}
            </p>
          )}

          {bodyHtml ? (
            <article
              className="prose prose-lg max-w-none text-ink/85 prose-headings:font-display prose-headings:tracking-tight prose-a:text-navy hover:prose-a:text-amber prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <p className="text-muted italic text-sm">Belum ada isi berita.</p>
          )}
        </div>
      </div>
    </div>
  );
}
