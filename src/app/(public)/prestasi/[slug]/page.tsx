export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/profil/PageHeader";
import { getPrestasi, getPrestasiList, getPrestasiSlugs } from "@/lib/queries/prestasi";
import { PrestasiIcon } from "@/components/profil/PrestasiIcon";
import { ShareButtons } from "@/components/profil/ShareButtons";
import { ViewCounter } from "@/components/ViewCounter";

export async function generateStaticParams() {
  const slugs = await getPrestasiSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPrestasi(slug);
  return { title: p ? `${p.title} — Prestasi SMKN 74` : "Prestasi" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getPrestasi(slug);
  if (!item) notFound();

  const all = await getPrestasiList();
  const related = all.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <ViewCounter id={item.id} endpoint="/api/prestasi/view" />
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Prestasi", href: "/prestasi" },
          { label: item.title.length > 40 ? item.title.slice(0, 40) + "…" : item.title },
        ]}
        tagline={`${item.level} · ${item.date}`}
        title={item.title}
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Trophy / icon card */}
          <aside className="lg:col-span-4">
            <div className={`${item.bg} relative rounded-2xl aspect-[4/5] grid place-items-center p-10 animate-float-slow shadow-2xl shadow-black/15 reveal sticky lg:top-28 text-paper overflow-hidden`}>
              {item.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                </>
              ) : (
                <PrestasiIcon kind={item.icon} className="h-40 w-40" />
              )}
              <div className="absolute bottom-6 left-6 right-6 border-t border-white/20 pt-4 z-10">
                <p className="text-[10px] uppercase tracking-[0.22em] text-amber font-medium">{item.level}</p>
                <p className="font-display text-lg leading-tight mt-1">{item.tag}</p>
                <p className="text-xs opacity-70 mt-1">{item.date}</p>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article className="lg:col-span-8 space-y-6 text-[17px] leading-[1.75] text-ink/85">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">{item.sub}</p>
              <h2 className="font-display headline-quote text-ink">{item.title}</h2>
            </div>

            {/* Team */}
            {item.team.length > 0 && (
              <div className="reveal">
                <p className="text-xs uppercase tracking-[0.22em] text-muted mb-4">Anggota Tim</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.team.map((m, i) => (
                    <li key={m + i} className="flex items-center gap-3 p-4 rounded-xl bg-paper-soft">
                      <span className="h-9 w-9 rounded-full bg-amber/20 text-amber grid place-items-center font-display text-sm">
                        {m.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </span>
                      <span className="text-ink/85 text-sm">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Narasi / isi */}
            {item.bodyHtml ? (
              <article
                className="prose prose-lg max-w-none text-ink/85 prose-headings:font-display prose-headings:tracking-tight prose-a:text-navy hover:prose-a:text-amber prose-img:rounded-xl mt-10 pt-8 border-t border-black/10 reveal"
                dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
              />
            ) : (
              <div className="mt-10 pt-8 border-t border-black/10 space-y-6">
                <p className="reveal">
                  {item.body[0]}
                </p>
                {item.body.slice(1).map((p, i) => (
                  <p key={i} className="reveal">{p}</p>
                ))}
              </div>
            )}

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 reveal">
              <div className="flex flex-wrap gap-3">
                <Link href="/prestasi" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-white transition-colors group">
                  <span className="transition-transform group-hover:-translate-x-1">←</span>
                  Semua Prestasi
                </Link>
                <Link href="/" className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium hover:text-amber transition-colors">
                  Kembali ke Beranda
                </Link>
              </div>
              <ShareButtons title={item.title} />
            </div>
            <p className="mt-6 text-xs text-muted reveal">
              Tanggal pencapaian: {item.date}.
            </p>
          </article>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white border-t border-black/5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Prestasi lain</p>
            <h2 className="font-display headline-quote">Lebih banyak catatan dari panggung.</h2>
          </div>
          <ul className="space-y-3">
            {related.map((p, i) => (
              <li key={p.slug} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <Link href={`/prestasi/${p.slug}`} className="group flex items-center gap-6 p-5 rounded-2xl bg-paper-soft hover:bg-white hover:border-amber border border-transparent hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`${p.bg} shrink-0 h-16 w-24 rounded-xl grid place-items-center text-paper`}>
                    <PrestasiIcon kind={p.icon} className="h-8 w-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted mb-1">
                      <span>{p.date}</span>
                      <span className="text-amber font-medium">★ {p.tag}</span>
                    </div>
                    <h3 className="font-display text-base leading-snug group-hover:text-navy transition-colors">{p.title}</h3>
                  </div>
                  <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
