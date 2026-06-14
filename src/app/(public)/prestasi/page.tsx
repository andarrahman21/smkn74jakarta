export const revalidate = 60;

import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { getPrestasiList } from "@/lib/queries/prestasi";
import { PrestasiClientList } from "./_list";

export const metadata: Metadata = {
  title: "Prestasi — SMKN 74 Jakarta",
  description: "Catatan prestasi siswa dan tim SMK Negeri 74 Jakarta.",
};

export default async function Page() {
  const list = await getPrestasiList();
  const items = list.map((p) => ({ ...p, id: p.slug }));

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Prestasi" },
        ]}
        tagline="Catatan dari panggung"
        title="Semua prestasi,"
        accent="dari kelas ke pentas nasional."
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <PrestasiClientList items={items} />
        </div>
      </section>
    </>
  );
}
