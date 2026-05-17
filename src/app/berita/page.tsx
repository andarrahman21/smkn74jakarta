import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { beritaList } from "@/data/berita";
import { BeritaList } from "./_list";

export const metadata: Metadata = {
  title: "Berita — SMKN 74 Jakarta",
  description: "Semua berita dari sekolah dan komunitas SMK Negeri 74 Jakarta.",
};

export default function Page() {
  const items = beritaList.map((b) => ({ ...b, id: b.slug }));
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita" },
        ]}
        tagline="Cerita dari sekolah"
        title="Semua berita,"
        accent="dari ruang kelas ke panggung."
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <BeritaList items={items} />
        </div>
      </section>
    </>
  );
}
