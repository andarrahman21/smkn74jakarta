import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/profil/PageHeader";
import { beritaList, getBerita } from "@/data/berita";
import { ShareButtons } from "@/components/profil/ShareButtons";

export async function generateStaticParams() {
  return beritaList.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBerita(slug);
  return { title: b ? `${b.title} — Berita SMKN 74` : "Berita" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getBerita(slug);
  if (!item) notFound();

  const related = beritaList.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: item.title.length > 40 ? item.title.slice(0, 40) + "…" : item.title },
        ]}
        tagline={`${item.tag} · ${item.date}`}
        title={item.title}
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          {/* Cover */}
          <div className="relative rounded-2xl aspect-[16/9] overflow-hidden mb-10 reveal animate-float-slow bg-navy">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-amber text-navy text-[10px] uppercase tracking-widest font-semibold rounded-sm z-10">
              {item.num}
            </span>
            <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-paper z-10 drop-shadow">
              {item.tag}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-muted mb-8 reveal">
            <span>{item.date}</span>
            <span className="h-1 w-1 rounded-full bg-mist" />
            <span>oleh {item.author}</span>
            <span className="h-1 w-1 rounded-full bg-mist" />
            <span>{item.readTime}</span>
          </div>

          {/* Excerpt */}
          <p className="text-xl leading-relaxed text-ink mb-8 reveal font-display">{item.excerpt}</p>

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
              <Link href="/berita" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-white transition-colors group">
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                Semua Berita
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium hover:text-amber transition-colors">
                Kembali ke Beranda
              </Link>
            </div>
            <ShareButtons title={item.title} />
          </div>

          {/* Last updated */}
          <p className="mt-6 text-xs text-muted reveal">
            Dipublikasikan {item.date}. Terakhir diperbarui {item.date}.
          </p>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white border-t border-black/5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Berita lainnya</p>
            <h2 className="font-display headline-quote">Cerita-cerita lain dari sekolah.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((b, i) => (
              <Link key={b.slug} href={`/berita/${b.slug}`} className="reveal group" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="relative rounded-2xl aspect-[5/4] mb-4 overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 bg-navy">
                  <Image src={b.image} alt={b.title} fill sizes="(min-width: 1024px) 360px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-amber text-navy text-[9px] uppercase tracking-widest font-semibold rounded-sm z-10">{b.num}</span>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-muted mb-2">{b.date}</p>
                <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">{b.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
