export const revalidate = 60;

import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { getPengumumanList } from "@/lib/queries/pengumuman";
import { PengumumanList } from "./_list";

export const metadata: Metadata = {
  title: "Pengumuman — SMKN 74 Jakarta",
  description: "Semua pengumuman resmi SMK Negeri 74 Jakarta.",
};

export default async function Page() {
  const list = await getPengumumanList();
  const items = list.map((p) => ({ ...p, id: p.slug }));

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Pengumuman" },
        ]}
        tagline="Kabar resmi sekolah"
        title="Pengumuman terbaru,"
        accent="lengkap & arsipnya."
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <PengumumanList items={items} />
        </div>
      </section>
    </>
  );
}
