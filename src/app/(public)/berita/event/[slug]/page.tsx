export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/profil/PageHeader";
import { getEvent, getEvents, getEventSlugs } from "@/lib/queries/event";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEvent(slug);
  return { title: e ? `${e.title} — Event SMKN 74` : "Event" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getEvent(slug);
  if (!item) notFound();

  const all = await getEvents();
  const related = all.filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Event", href: "/berita/event" },
          { label: item.title.length > 40 ? item.title.slice(0, 40) + "…" : item.title },
        ]}
        tagline={`${item.category} · ${item.date}`}
        title={item.title}
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className={`${item.bg} ${item.ink} relative rounded-2xl aspect-[16/9] mb-10 reveal animate-float-slow p-10 flex flex-col justify-between overflow-hidden`}>
            {item.image && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />
              </>
            )}
            <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] opacity-85">
              <span>{item.category}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" />
                {item.status}
              </span>
            </div>
            {!item.image && (
              <>
                <span className="relative z-10 font-display text-5xl leading-tight">{item.title}</span>
                <p className="relative z-10 text-sm opacity-85">{item.date}</p>
              </>
            )}
          </div>

          <article className="space-y-6 text-[17px] leading-[1.75] text-ink/85">
            {item.bodyHtml ? (
              <div
                className="prose prose-lg max-w-none reveal"
                dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
              />
            ) : (
              <p className="reveal first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
                {item.body}
              </p>
            )}
          </article>

          <div className="mt-12 pt-8 border-t border-black/10 flex flex-wrap gap-3 reveal">
            <Link href="/berita/event" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-white transition-colors group">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Semua Event
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium hover:text-amber transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-black/5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Event lainnya</p>
            <h2 className="font-display headline-quote">Panggung-panggung lain.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((e, i) => (
              <Link
                key={e.slug}
                href={`/berita/event/${e.slug}`}
                className={`${e.bg} ${e.ink} group reveal relative overflow-hidden rounded-2xl p-6 flex flex-col gap-2 aspect-[4/3] hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {e.image && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.image} alt={e.imageAlt ?? e.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
                  </>
                )}
                <p className="relative z-10 text-[10px] uppercase tracking-[0.22em] opacity-80">{e.category}</p>
                <h3 className="relative z-10 font-display text-xl leading-tight mt-auto">{e.title}</h3>
                <p className="relative z-10 text-sm opacity-80">{e.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
