import Link from "next/link";
import { PageHeader } from "./PageHeader";
import { RelatedCards, type Related } from "./RelatedCards";
import type { SiteContent } from "@/lib/site-content/get";
import { createPublicClient } from "@/lib/supabase/server";
import { ModulAjarSection } from "@/components/modul/ModulAjarSection";
import type { ModulAjar } from "@/lib/modul-ajar";

async function getModul(jurusan: string): Promise<ModulAjar[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("modul_ajar")
      .select("id, jurusan, sort_order, title, kelas, cover_url, file_url")
      .eq("jurusan", jurusan)
      .order("sort_order", { ascending: true });
    return (data ?? []) as ModulAjar[];
  } catch {
    return [];
  }
}

export type KeahlianProps = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  quote: string;
  curriculum: { year: string; topics: string[] }[];
  achievements: { year: string; title: string; sub: string }[];
  related: Related[];
  /** Tailwind bg class for the accent panel */
  accentBg: string;
  accentInk: string;
  /** CMS override map; missing keys fall back to props */
  cms?: SiteContent;
  /** Key prefix for CMS lookups, e.g. "keahlian-tari" */
  cmsPrefix?: string;
};

export async function KeahlianDetail(p: KeahlianProps) {
  const cms = p.cms ?? {};
  const pfx = p.cmsPrefix ?? p.slug;
  const k = (suffix: string) => `${pfx}.${suffix}`;
  const moduls = await getModul(p.slug);
  const cover = cms[k("cover")] ?? "";
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Konsentrasi Keahlian", href: "/profil/keahlian" },
          { label: p.title },
        ]}
        tagline={cms[k("header_tagline")] ?? p.tagline}
        taglineKey={k("header_tagline")}
        title={p.title.split(" ")[0]}
        accent={p.title.split(" ").slice(1).join(" ")}
        cms={cms}
        cmsPrefix={pfx}
      />

      {/* Intro + accent card */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <div
              data-cms-key={k("cover")}
              data-cms-type="image"
              data-cms-label="Gambar kartu jurusan"
              className={`${cover ? "bg-navy text-paper" : `${p.accentBg} ${p.accentInk}`} relative overflow-hidden rounded-2xl p-10 aspect-[4/5] animate-float-slow shadow-2xl shadow-black/15 flex flex-col justify-between`}
            >
              {cover && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cover} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
                </>
              )}
              <span className="relative z-10 text-[10px] uppercase tracking-[0.22em] opacity-80">{p.title}</span>
              {!cover && (
                <span className="font-display text-display-md italic">
                  {p.title.split(" ").map((w) => w[0]).join("")}
                </span>
              )}
              <p data-cms-key={k("tagline")} data-cms-type="textarea" data-cms-label="Tagline kartu" className="relative z-10 text-sm leading-relaxed border-t border-current/15 pt-4 opacity-85">
                {cms[k("tagline")] ?? p.tagline}
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 reveal" style={{ animationDelay: "0.1s" }}>
            <p data-cms-key={k("intro_eyebrow")} data-cms-type="text" data-cms-label="Label pengantar" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms[k("intro_eyebrow")] ?? "Pengantar"}</p>
            <h2 data-cms-key={k("intro_heading")} data-cms-type="text" data-cms-label="Judul pengantar" className="font-display headline-quote mb-6">{cms[k("intro_heading")] ?? "Apa yang dipelajari di sini."}</h2>
            <p data-cms-key={k("intro")} data-cms-type="textarea" data-cms-label="Paragraf pengantar" className="text-[17px] leading-relaxed text-ink/85 first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
              {cms[k("intro")] ?? p.intro}
            </p>
            <blockquote className="mt-10 border-l-4 border-amber pl-6">
              <p className="font-display text-2xl italic leading-snug text-ink">
                &ldquo;<span data-cms-key={k("quote")} data-cms-type="textarea" data-cms-label="Kutipan">{cms[k("quote")] ?? p.quote}</span>&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Curriculum timeline */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key={k("curriculum_eyebrow")} data-cms-type="text" data-cms-label="Label kurikulum" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms[k("curriculum_eyebrow")] ?? "Kurikulum"}</p>
            <h2 data-cms-key={k("curriculum_heading")} data-cms-type="text" data-cms-label="Judul kurikulum" className="font-display headline-section max-w-2xl">{cms[k("curriculum_heading")] ?? "Tiga tahun, satu perjalanan."}</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {p.curriculum.map((y, i) => (
              <li
                key={y.year}
                className="reveal bg-paper-soft rounded-2xl p-7 flex flex-col gap-4 hover:bg-white hover:border-amber border border-transparent hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span data-cms-key={k(`curriculum.${i}.year`)} data-cms-type="text" data-cms-label="Tahun kurikulum" className="font-display text-3xl text-amber">{cms[k(`curriculum.${i}.year`)] ?? y.year}</span>
                <ul className="space-y-2 text-sm text-ink/80">
                  {y.topics.map((t, ti) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="shrink-0 mt-2 h-1 w-3 rounded-full bg-amber" />
                      <span data-cms-key={k(`curriculum.${i}.topic.${ti}`)} data-cms-type="text" data-cms-label="Topik kurikulum">{cms[k(`curriculum.${i}.topic.${ti}`)] ?? t}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Modul Ajar */}
      <ModulAjarSection items={moduls} heading={cms[k("modul_heading")] ?? `Modul ajar ${p.title}.`} />

      <RelatedCards items={p.related} heading={cms[k("related_heading")] ?? "Konsentrasi lain di SMKN 74."} headingKey={k("related_heading")} />
    </>
  );
}
