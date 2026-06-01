import { Suspense } from "react";
import { MainNav } from "@/components/home/MainNav";
import { Footer } from "@/components/home/Footer";
import { EditOverlayMount } from "@/components/cms/EditOverlayMount";
import { resolveSiteContent } from "@/lib/site-content/get";

/**
 * Layout untuk situs publik: nav + main + footer + skip-to-content.
 * /admin/* tidak menggunakan layout ini.
 */
export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cms = await resolveSiteContent();
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-full focus:bg-amber focus:text-navy focus:font-medium focus:shadow-2xl"
      >
        Lompat ke konten utama
      </a>
      <MainNav links={cms} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <Suspense fallback={null}>
        <EditOverlayMount />
      </Suspense>
    </>
  );
}
