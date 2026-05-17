import { Hero } from "@/components/home/Hero";
import { WelcomeRow } from "@/components/home/WelcomeRow";
import { NewsSection } from "@/components/home/NewsSection";
import { PrestasiSection } from "@/components/home/PrestasiSection";
import { GuruSection } from "@/components/home/GuruSection";
import { KontakSection } from "@/components/home/KontakSection";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeRow />
      <NewsSection />
      <PrestasiSection />
      <GuruSection />
      <KontakSection />
      <CTABanner />
    </>
  );
}
