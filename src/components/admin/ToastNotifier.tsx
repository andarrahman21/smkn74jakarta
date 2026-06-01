"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";

const MESSAGES: Record<string, { type: "success" | "error" | "info"; msg: string }> = {
  // Pengumuman
  created:        { type: "success", msg: "Berhasil dibuat." },
  updated:        { type: "success", msg: "Berhasil diperbarui." },
  deleted:        { type: "success", msg: "Berhasil dihapus." },
  published:      { type: "success", msg: "Ditayangkan ke publik." },
  drafted:        { type: "info",    msg: "Dinonaktifkan (jadi draft)." },
  duplicated:     { type: "success", msg: "Berhasil diduplikasi sebagai draft." },
  bulk_deleted:   { type: "success", msg: "Item terpilih berhasil dihapus." },
  bulk_published: { type: "success", msg: "Item terpilih berhasil ditayangkan." },
  cat_deleted:    { type: "success", msg: "Kategori berhasil dihapus." },
  cat_created:    { type: "success", msg: "Kategori berhasil ditambahkan." },
  error:          { type: "error",   msg: "Terjadi kesalahan, coba lagi." },
};

export function ToastNotifier() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // Track shown toasts per toast-param value, reset when pathname changes
  const prevPathRef = useRef<string | null>(null);
  const shownToasts = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Reset tracking when navigating to a different page
    if (prevPathRef.current !== pathname) {
      shownToasts.current.clear();
      prevPathRef.current = pathname;
    }

    const t = params.get("toast");
    if (!t) return;
    if (shownToasts.current.has(t)) return;
    shownToasts.current.add(t);

    const entry = MESSAGES[t];
    if (entry) toast[entry.type](entry.msg);

    const next = new URLSearchParams(params.toString());
    next.delete("toast");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [params, pathname, router]);

  return null;
}
