import { Suspense } from "react";
import Link from "next/link";
import { Toaster } from "sonner";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./_logout-button";
import { ToastNotifier } from "@/components/admin/ToastNotifier";
import { AdminNav, AdminMobileNav } from "./_nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-paper">
      {/* Sidebar */}
      <aside className="md:w-64 md:min-h-screen bg-navy-deep text-paper md:sticky md:top-0 md:h-screen flex md:flex-col">
        <div className="flex md:block items-center justify-between p-5 md:p-6 border-b border-white/10 md:border-b">
          <Link href="/admin" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo SMK Negeri 74" className="h-9 w-9 rounded-full object-contain" />
            <div className="leading-tight">
              <p className="text-[9px] uppercase tracking-[0.22em] text-amber">Admin</p>
              <p className="font-display text-base">SMKN 74</p>
            </div>
          </Link>
        </div>

        <AdminNav />

        <div className="hidden md:block p-4 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-paper/40 mb-1">Login sebagai</p>
          <p className="text-sm font-medium truncate" title={user?.email ?? ""}>{user?.email ?? "—"}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-paper/80 hover:text-amber transition-colors"
            >
              <span className="text-amber/70">↗</span>
              Buka situs publik
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile nav */}
      <AdminMobileNav />

      <main className="flex-1 min-w-0 p-5 md:p-8 lg:p-10 xl:p-12">{children}</main>
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          style: {
            fontFamily: "inherit",
            background: "#f6f4ef",
            border: "1px solid rgba(15,29,58,0.1)",
            color: "#0c1424",
            borderRadius: "14px",
            boxShadow: "0 4px 24px rgba(15,29,58,0.08)",
          },
          classNames: {
            success: "toast-success",
            error: "toast-error",
            info: "toast-info",
          },
        }}
      />
      <Suspense fallback={null}>
        <ToastNotifier />
      </Suspense>
    </div>
  );
}
