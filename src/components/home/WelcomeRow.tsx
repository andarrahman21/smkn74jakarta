import Image from "next/image";
import Link from "next/link";
import { pengumumanList } from "@/data/pengumuman";
import { PHOTOS } from "@/data/photos";

export function WelcomeRow() {
  const announcements = pengumumanList.slice(0, 3);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Announcements card */}
        <div className="lg:col-span-5 reveal">
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
            Pengumuman
          </p>
          <h2 className="font-display text-2xl md:text-3xl leading-tight mb-6 md:mb-8">
            Kabar terbaru dari sekolah
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
            Lihat semua Pengumuman
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Sambutan + video */}
        <div className="lg:col-span-7 reveal" style={{ animationDelay: "0.15s" }}>
          <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
            Sambutan Kepala Sekolah
          </p>
          <h3 className="font-display headline-quote max-w-xl mb-8">
            &ldquo;Sekolah ini bukan sekadar tempat belajar — ia adalah rumah tempat karakter dibentuk.&rdquo;
          </h3>

          {/* Video card */}
          <div className="group relative rounded-2xl overflow-hidden bg-navy aspect-[4/3] sm:aspect-[16/8] cursor-pointer">
            <Image
              src={PHOTOS.welcomeVideo}
              alt="Cuplikan sambutan Kepala Sekolah SMKN 74"
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-navy/50 pointer-events-none" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-amber">
              <span className="px-2 py-0.5 rounded-sm bg-amber text-navy font-semibold">VIDEO</span>
              <span>03:41</span>
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

          <p className="mt-8 text-[15px] leading-relaxed text-ink/75 max-w-2xl">
            Bismillahirrohmanirrahim. Puji syukur kami panjatkan ke hadirat Allah SWT. SMKN 74 Jakarta hadir di Jagakarsa sebagai sekolah kejuruan yang berkomitmen membentuk lulusan terbaik di dunia industri — siap menghadapi dunia kerja, industri, maupun jenjang pendidikan tinggi.
          </p>

          <Link href="/tentang" className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-ink text-paper text-sm font-medium hover:bg-navy transition-colors group">
            Tentang Sekolah
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
