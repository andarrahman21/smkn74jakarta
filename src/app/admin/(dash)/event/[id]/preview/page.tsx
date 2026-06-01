import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Preview Event — Admin SMKN 74" };

function fmtDate(raw: string | null) {
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return new Date(raw + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return raw;
}

function fmtTime(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("event")
    .select("id, slug, title, event_date, starts_at, status, category, body, body_html, bg, ink, image_url, image_alt")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const displayDate = fmtDate(data.event_date as string | null);
  const displayTime = fmtTime(data.starts_at as string | null);
  const bg = (data.bg as string) || "bg-navy";
  const ink = (data.ink as string) || "text-paper";

  return (
    <div className="w-full">
      {/* Preview banner */}
      <div className="mb-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-amber/10 border border-amber/20">
        <div className="flex items-center gap-3 text-sm text-amber">
          <span className="h-2 w-2 rounded-full bg-amber" />
          <strong>Preview event</strong>
          <span className="text-amber/60 text-xs">— tampilan mendekati halaman publik</span>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/event/${id}/edit`}
            className="h-8 px-4 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform inline-flex items-center gap-1.5"
          >
            <span aria-hidden>←</span> Edit
          </Link>
          <Link
            href={`/berita/event/${data.slug}`}
            target="_blank"
            className="h-8 px-4 rounded-full bg-moss text-paper text-xs font-medium hover:bg-moss/90 transition-colors inline-flex items-center gap-1"
          >
            Buka di publik ↗
          </Link>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16 space-y-8">

          {/* Hero card — mirrors public page */}
          <div
            className={`${bg} ${ink} relative rounded-2xl aspect-[16/9] p-10 flex flex-col justify-between overflow-hidden`}
          >
            {data.image_url && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.image_url as string}
                  alt={(data.image_alt as string) ?? (data.title as string)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />
              </>
            )}
            <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] opacity-85">
              <span>{data.category || "Event"}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {data.status}
              </span>
            </div>
            {!data.image_url && (
              <>
                <span className="relative z-10 font-display text-4xl md:text-5xl leading-tight">{data.title}</span>
                <p className="relative z-10 text-sm opacity-85">{displayDate ?? data.event_date}</p>
              </>
            )}
          </div>

          {/* Meta info */}
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-muted mb-1">Tanggal</dt>
              <dd className="font-medium text-ink">{displayDate ?? data.event_date ?? "—"}</dd>
            </div>
            {displayTime && (
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted mb-1">Waktu</dt>
                <dd className="font-medium text-ink">{displayTime} WIB</dd>
              </div>
            )}
            <div>
              <dt className="text-[10px] uppercase tracking-widest text-muted mb-1">Status</dt>
              <dd>
                {data.status === "Akan datang" ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-moss/10 text-moss text-[10px] font-semibold uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                    Akan datang
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 text-muted text-[10px] font-semibold uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                    Selesai
                  </span>
                )}
              </dd>
            </div>
            {data.category && (
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted mb-1">Kategori</dt>
                <dd className="font-medium text-ink">{data.category as string}</dd>
              </div>
            )}
          </dl>

          {/* Body content */}
          {(data.body_html || data.body) && (
            <article className="space-y-6 text-[17px] leading-[1.75] text-ink/85 border-t border-black/5 pt-8">
              {data.body_html ? (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.body_html as string }}
                />
              ) : (
                <p>{data.body as string}</p>
              )}
            </article>
          )}

          {!data.body_html && !data.body && (
            <p className="text-sm text-muted italic border-t border-black/5 pt-8">
              Belum ada deskripsi untuk event ini.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
