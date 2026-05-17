import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/profil/PageHeader";
import { pengumumanList, getPengumuman } from "@/data/pengumuman";
import { ShareButtons } from "@/components/profil/ShareButtons";

export async function generateStaticParams() {
  return pengumumanList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPengumuman(slug);
  return { title: p ? `${p.title} — Pengumuman SMKN 74` : "Pengumuman" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPengumuman(slug);
  if (!item) notFound();

  const related = pengumumanList.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Pengumuman", href: "/pengumuman" },
          { label: item.title.length > 40 ? item.title.slice(0, 40) + "…" : item.title },
        ]}
        tagline={`${item.category} · ${item.date}`}
        title={item.title}
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          {/* Meta strip */}
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted mb-10 reveal">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-xl bg-navy text-paper grid place-items-center font-display leading-none">
                <div className="text-lg font-semibold">{item.day}</div>
                <div className="text-[9px] uppercase tracking-widest text-amber">{item.month}</div>
              </div>
              <div className="leading-tight">
                <p>{item.date}</p>
                <p className="text-amber">{item.category}</p>
              </div>
            </div>
            {item.tag && (
              <span className="ml-auto text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-amber/20 text-amber">
                {item.tag}
              </span>
            )}
          </div>

          {/* Body */}
          <article className="space-y-6 text-[17px] leading-[1.75] text-ink/85">
            <p className="reveal first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
              {item.body[0]}
            </p>
            {item.body.slice(1).map((p, i) => (
              <p key={i} className="reveal">{p}</p>
            ))}
          </article>

          <div className="mt-12 pt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 reveal">
            <div className="flex flex-wrap gap-3">
              <Link href="/pengumuman" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-white transition-colors group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                Semua Pengumuman
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium hover:text-amber transition-colors">
                Kembali ke Beranda
              </Link>
            </div>
            <ShareButtons title={item.title} />
          </div>
          <p className="mt-6 text-xs text-muted reveal">
            Dipublikasikan {item.date}. Terakhir diperbarui {item.date}.
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white border-t border-black/5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Pengumuman lain</p>
            <h2 className="font-display headline-quote">Yang juga perlu kamu tahu.</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((p, i) => (
              <li key={p.slug} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <Link href={`/pengumuman/${p.slug}`} className="block bg-paper-soft rounded-2xl p-6 h-full hover:bg-white hover:border-amber border border-transparent hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-amber mb-3">
                    <span>{p.day} {p.month}</span>
                    <span className="h-1 w-1 rounded-full bg-mist" />
                    <span className="text-muted">{p.category}</span>
                  </div>
                  <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">
                    {p.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
