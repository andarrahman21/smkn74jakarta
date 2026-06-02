export const revalidate = 60;

import { Hero } from "@/components/home/Hero";
import type { HeroSlide } from "@/components/home/Hero";
import { WelcomeRow } from "@/components/home/WelcomeRow";
import { NewsSection } from "@/components/home/NewsSection";
import { PrestasiSection } from "@/components/home/PrestasiSection";
import { GuruSection } from "@/components/home/GuruSection";
import type { GuruCard } from "@/components/home/GuruSection";
import { KontakSection } from "@/components/home/KontakSection";
import { CTABanner } from "@/components/home/CTABanner";
import { createPublicClient } from "@/lib/supabase/server";
import { resolveSiteContent } from "@/lib/site-content/get";

async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("hero_slides")
      .select("id, eyebrow, head, tag, caption, year_label, image_url, image_alt")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

async function getGuru(): Promise<GuruCard[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("daftar_guru")
      .select("initials, name, role, bg, ink, photo_url")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    return (data ?? []).map((g) => ({
      initials: g.initials,
      name: g.name,
      role: g.role,
      bg: g.bg,
      ink: g.ink,
      photo: g.photo_url ?? null,
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const [slides, teachers, cms] = await Promise.all([
    getHeroSlides(),
    getGuru(),
    resolveSiteContent(),
  ]);

  return (
    <>
      <Hero slides={slides} />
      <WelcomeRow cms={cms} />
      <NewsSection cms={cms} />
      <PrestasiSection cms={cms} />
      <GuruSection teachers={teachers} eyebrow={cms["guru.eyebrow"]} heading={cms["guru.heading"]} />
      <KontakSection cms={cms} />
      <CTABanner cms={cms} />
    </>
  );
}
