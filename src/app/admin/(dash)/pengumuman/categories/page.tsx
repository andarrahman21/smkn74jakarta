import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { createCategory, deleteCategory } from "../actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { CategoryForm } from "./_form";

export const metadata = { title: "Kategori Pengumuman — Admin SMKN 74" };

export default async function Page() {
  const supabase = createAdminClient();
  const { data: categories, error } = await supabase
    .from("pengumuman_categories")
    .select("id, name, sort_order")
    .order("sort_order")
    .order("name");

  if (error) throw error;

  return (
    <div className="w-full max-w-lg">
      <Link
        href="/admin/pengumuman"
        className="inline-flex items-center gap-2 h-9 px-3 -ml-3 mb-4 rounded-lg text-sm text-ink/70 hover:bg-paper-soft hover:text-navy transition-colors"
      >
        <span aria-hidden>←</span>
        Kembali ke pengumuman
      </Link>

      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin · Pengumuman</p>
        <h1 className="font-display headline-section">Kelola Kategori.</h1>
      </header>

      {/* Add form */}
      <CategoryForm action={createCategory} />

      {/* List */}
      <ul className="mt-6 bg-white border border-black/5 rounded-2xl divide-y divide-black/5 overflow-hidden">
        {(categories ?? []).map((cat) => (
          <li key={cat.id} className="flex items-center gap-3 px-5 py-3">
            <span className="flex-1 text-sm font-medium">{cat.name}</span>
            <DeleteButton
              action={deleteCategory}
              id={cat.id}
              title="Hapus kategori ini?"
              description={`Kategori "${cat.name}" akan dihapus. Pengumuman yang sudah menggunakan kategori ini tidak terpengaruh.`}
              confirmLabel="Ya, hapus"
              triggerLabel="Hapus"
              triggerClassName="h-8 px-3 rounded-full border border-rust/30 text-rust text-xs font-medium hover:bg-rust hover:text-paper transition-colors"
            />
          </li>
        ))}
        {(!categories || categories.length === 0) && (
          <li className="px-5 py-6 text-sm text-muted">Belum ada kategori.</li>
        )}
      </ul>
    </div>
  );
}
