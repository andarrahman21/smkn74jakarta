import Link from "next/link";

const WAVE_BARS = [240, 280, 320, 220, 300, 260, 320, 280, 300, 260, 340, 240, 300, 280];

type Crumb = { label: string; href?: string };

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  accent,
  trailing,
  subtitle,
  tagline,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  accent?: string; // appears as amber-highlighted phrase inside title rendering
  trailing?: string;
  subtitle?: string;
  tagline?: string;
}) {
  return (
    <section className="relative bg-navy text-paper overflow-hidden">
      <div aria-hidden className="absolute inset-0 flex items-end justify-between px-2 sm:px-6 opacity-25">
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className="block w-[4vw] max-w-[60px] bg-amber/60 rounded-full animate-wave"
            style={{
              height: `${h}px`,
              animationDelay: `${(i % 6) * 0.18}s`,
              animationDuration: `${1.4 + (i % 4) * 0.18}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-10 pb-14 md:pt-16 md:pb-20">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-paper/60 animate-fade-up">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-amber transition-colors">{c.label}</Link>
              ) : (
                <span className={i === crumbs.length - 1 ? "text-amber" : "text-paper/60"}>{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-paper/30">/</span>}
            </span>
          ))}
        </nav>

        {tagline && (
          <p className="mt-6 md:mt-10 text-xs sm:text-sm uppercase tracking-[0.22em] text-amber/90 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {tagline}
          </p>
        )}

        <h1
          className="mt-3 md:mt-4 font-display headline-page font-light max-w-3xl animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {title}
          {accent && (
            <>
              {" "}
              <em className="not-italic text-amber">{accent}</em>
            </>
          )}
          {trailing && <> {trailing}</>}
        </h1>

        {(eyebrow || subtitle) && (
          <p
            className="mt-5 md:mt-6 max-w-2xl text-base md:text-lg text-paper/75 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {subtitle ?? eyebrow}
          </p>
        )}
      </div>
    </section>
  );
}
