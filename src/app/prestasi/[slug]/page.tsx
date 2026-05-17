import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/profil/PageHeader";
import { prestasiList, getPrestasi } from "@/data/prestasi";
import { PrestasiIcon } from "@/components/profil/PrestasiIcon";
import { ShareButtons } from "@/components/profil/ShareButtons";

export async function generateStaticParams() {
  return prestasiList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrestasi(slug);
  return { title: p ? `${p.title} — Prestasi SMKN 74` : "Prestasi" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPrestasi(slug);
  if (!item) notFound();

  const related = prestasiList.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
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
            <div className={`${item.bg} relative rounded-2xl aspect-[4/5] grid place-items-center p-10 animate-float-slow shadow-2xl shadow-black/15 reveal sticky lg:top-28 text-paper`}>
              <PrestasiIcon kind={item.icon} className="h-40 w-40" />
              <div className="absolute bottom-6 left-6 right-6 border-t border-black/15 pt-4">
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

            <p className="reveal first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
              {item.body[0]}
            </p>
            {item.body.slice(1).map((p, i) => (
              <p key={i} className="reveal">{p}</p>
            ))}

            {/* Team */}
            <div className="mt-10 pt-8 border-t border-black/10 reveal">
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
