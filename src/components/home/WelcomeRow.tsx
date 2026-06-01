import Image from "next/image";
import Link from "next/link";
import { getPengumumanList } from "@/lib/queries/pengumuman";
import type { SiteContent } from "@/lib/site-content/get";

export async function WelcomeRow({ cms }: { cms: SiteContent }) {
  const announcements = await getPengumumanList(3);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Announcements card */}
        <div className="lg:col-span-5 reveal">
          <p data-cms-key="welcome.announce_eyebrow" data-cms-type="text" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
            {cms["welcome.announce_eyebrow"]}
          </p>
          <h2 data-cms-key="welcome.announce_heading" data-cms-type="text" className="font-display text-2xl md:text-3xl leading-tight mb-6 md:mb-8">
            {cms["welcome.announce_heading"]}
          </h2>

          <ul className="rounded-2xl bg-white border border-black/5 divide-y divide-black/5 overflow-hidden">
            {announcements.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/pengumuman/${a.slug}`}
                  className="flex items-center gap-5 p-5 hover:bg-paper-soft transition-colors group cursor-pointer"
                >
                  <div className="shrink-0 h-14 w-14 rounded-xl bg-navy text-paper grid place-items-center font-display leading-none">
                    <div className="text-xl font-semibold">{a.day}</div>
                    <div className="text-[10px] uppercase tracking-widest text-amber">{a.month}</div>
                  </div>
                  <div className="flex-1 text-sm leading-snug">
                    <span className="group-hover:text-navy transition-colors">{a.title}</span>
                  </div>
                  {a.tag && (
                    <span className="shrink-0 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-amber/20 text-amber">
                      {a.tag}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/pengumuman" className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-navy hover:text-amber transition-colors group">
            <span data-cms-key="welcome.announce_link" data-cms-type="text">{cms["welcome.announce_link"]}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Sambutan + video */}
        <div className="lg:col-span-7 reveal" style={{ animationDelay: "0.15s" }}>
          <p data-cms-key="welcome.sambutan_eyebrow" data-cms-type="text" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
            {cms["welcome.sambutan_eyebrow"]}
          </p>
          <h3 className="font-display headline-quote max-w-xl mb-8">
            &ldquo;<span data-cms-key="welcome.quote" data-cms-type="textarea">{cms["welcome.quote"]}</span>&rdquo;
          </h3>

          {/* Video card */}
          <div className="group relative rounded-2xl overflow-hidden bg-navy aspect-[4/3] sm:aspect-[16/8] cursor-pointer">
            <Image
              data-cms-key="welcome.image"
              data-cms-type="image"
              src={cms["welcome.image"]}
              alt="Cuplikan sambutan Kepala Sekolah SMKN 74"
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-navy/50 pointer-events-none" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-amber">
              <span className="px-2 py-0.5 rounded-sm bg-amber text-navy font-semibold">VIDEO</span>
              <span data-cms-key="welcome.video_duration" data-cms-type="text">{cms["welcome.video_duration"]}</span>
            </div>
            <button
              aria-label="Putar video"
              className="absolute inset-0 grid place-items-center"
            >
              <span className="relative grid place-items-center h-16 w-16 rounded-full bg-amber text-navy transition-transform group-hover:scale-110">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
                  <path d="M0 0 L18 10 L0 20 Z" />
                </svg>
                <span className="absolute inset-0 rounded-full bg-amber/60 animate-[ping-soft_2.4s_ease-out_infinite]" />
              </span>
            </button>
          </div>

          <p data-cms-key="welcome.paragraph" data-cms-type="textarea" className="mt-8 text-[15px] leading-relaxed text-ink/75 max-w-2xl whitespace-pre-line">
            {cms["welcome.paragraph"]}
          </p>
        </div>
      </div>
    </section>
  );
}
