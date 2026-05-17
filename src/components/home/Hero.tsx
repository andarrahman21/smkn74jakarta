"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PHOTOS } from "@/data/photos";

const WAVE_BARS = [280, 320, 340, 240, 360, 220, 320, 280, 300, 300, 280, 340, 240, 300, 320, 260, 340, 220, 300, 280];

type SceneKey = "dancers" | "robot" | "animator" | "speaker" | "workshop";

type Slide = {
  eyebrow: string;
  headPre: string;
  headAccent: string;
  headPost: string;
  tag: string;
  caption: string;
  year: string;
  scene: SceneKey;
};

const slides: Slide[] = [
  {
    eyebrow: "Di SMKN 74, kami percaya pada",
    headPre: "Menemukan jalanmu",
    headAccent: "dalam komunitas",
    headPost: "yang menghargai siapa\ndirimu sepenuhnya.",
    tag: "Pertunjukan tari kelas X",
    caption: "Pertunjukan akhir tingkatan tim usai final.",
    year: "Tari, 2025",
    scene: "dancers",
  },
  {
    eyebrow: "Cerita dari kompetisi nasional",
    headPre: "Bangun karya yang",
    headAccent: "membuat kota berbicara",
    headPost: "lewat tim Robotik\nkebanggaan sekolah.",
    tag: "Tim Robotik · Juara Nasional",
    caption: "Tim Robotik raih juara di tingkat nasional Yogyakarta.",
    year: "Robotik, 2026",
    scene: "robot",
  },
  {
    eyebrow: "Ruang kreatif setiap hari",
    headPre: "Kreativitas yang",
    headAccent: "tumbuh dari ketekunan",
    headPost: "studio Animasi 3D &\nMultimedia kami.",
    tag: "Animasi 3D · LKS 2026",
    caption: "Juara 1 Lomba Kompetensi Siswa bidang Animasi 3D 2026.",
    year: "Animasi & Multimedia, 2026",
    scene: "animator",
  },
  {
    eyebrow: "Pesan dari Kepala Sekolah",
    headPre: "Sekolah ini bukan",
    headAccent: "sekadar tempat belajar",
    headPost: "— ia adalah rumah\ntempat karakter dibentuk.",
    tag: "Sambutan · Drs. Bambang S.",
    caption: "Bismillahirrohmanirrahim. Selamat datang di SMKN 74.",
    year: "Sambutan, 2026",
    scene: "speaker",
  },
  {
    eyebrow: "Industri dan masa depan",
    headPre: "Belajar langsung dari",
    headAccent: "dunia industri nyata",
    headPost: "lewat program PKL\nkelas industri.",
    tag: "Humas & DUDI · PKL Aktif",
    caption: "Kolaborasi nyata dengan mitra industri DKI Jakarta.",
    year: "PKL, 2026",
    scene: "workshop",
  },
];

const ALT_FOR_SCENE: Record<SceneKey, string> = {
  dancers:  "Penari pertunjukan tari kelas X SMKN 74",
  robot:    "Robot karya tim Robotik SMKN 74 di kompetisi",
  animator: "Siswa Animasi 3D bekerja di studio multimedia",
  speaker:  "Kepala Sekolah SMKN 74 menyampaikan sambutan",
  workshop: "Siswa praktik kerja lapangan di workshop industri",
};

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 5500);
    return () => clearInterval(id);
  }, [total, paused]);

  const slide = slides[idx];

  return (
    <section className="relative overflow-hidden bg-navy text-paper">
      {/* Animated audio wave background */}
      <div aria-hidden className="absolute inset-0 flex items-end justify-between px-2 sm:px-6 opacity-40">
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className="block w-[4vw] max-w-[60px] bg-amber/60 rounded-full animate-wave"
            style={{
              height: `${h}px`,
              animationDelay: `${(i % 7) * 0.18}s`,
              animationDuration: `${1.2 + (i % 5) * 0.18}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy/95" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-10 pb-14 md:pt-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center min-h-[560px] md:min-h-[700px]">
        {/* Left copy — re-keyed so it re-animates on slide change */}
        <div key={`copy-${idx}`} className="lg:col-span-6">
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.22em] text-amber/90 mb-4 md:mb-6 animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            {slide.eyebrow}
          </p>
          <h1
            className="font-display headline-hero font-light animate-fade-up whitespace-pre-line"
            style={{ animationDelay: "0.18s" }}
          >
            {slide.headPre} <br />
            <em className="not-italic text-amber">{slide.headAccent}</em> <br />
            {slide.headPost}
          </h1>

          {/* Slide dots — active dot fills amber over 5.5s sebagai progress bar */}
          <div className="flex items-center gap-2 mt-8 md:mt-12">
            {slides.map((_, i) => {
              const active = idx === i;
              return (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`relative h-1 rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${
                    active ? "w-10 sm:w-14 bg-paper/20" : "w-6 sm:w-8 bg-paper/30 hover:bg-paper/60"
                  }`}
                >
                  {active && (
                    <span
                      key={`fill-${idx}`}
                      aria-hidden
                      className="absolute inset-y-0 left-0 bg-amber rounded-full animate-slide-fill"
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right photo card — pause auto-slide on hover */}
        <div
          key={`card-${idx}`}
          className="lg:col-span-6 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-2xl bg-navy-deep border border-white/10 aspect-[5/4] overflow-hidden shadow-2xl shadow-black/50 animate-float-slow">
            {/* Photo */}
            <Image
              src={PHOTOS.hero[slide.scene]}
              alt={ALT_FOR_SCENE[slide.scene]}
              fill
              priority={idx === 0}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-navy-deep/40 pointer-events-none" />

            {/* Tag */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-amber z-10 max-w-[70%]">
              <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-amber animate-pulse-dot" />
              <span className="truncate">{slide.tag}</span>
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-10">
              <p className="font-display italic text-paper text-xs sm:text-sm leading-snug drop-shadow-md">
                {slide.caption}
              </p>
              <p className="text-[10px] sm:text-xs text-paper/70 mt-1">{slide.year}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
