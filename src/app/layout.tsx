import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/home/MainNav";
import { Footer } from "@/components/home/Footer";
import { RevealObserver } from "@/components/RevealObserver";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smkn74.sch.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SMKN 74 Jakarta — Menemukan jalanmu",
    template: "%s · SMKN 74 Jakarta",
  },
  description:
    "Website resmi SMK Negeri 74 Jakarta. Komunitas yang menghargai siapa dirimu sepenuhnya.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "SMKN 74 Jakarta",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        {/* Skip to content for keyboard / screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-full focus:bg-amber focus:text-navy focus:font-medium focus:shadow-2xl"
        >
          Lompat ke konten utama
        </a>
        <MainNav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
