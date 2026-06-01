"use client";

import { useEffect } from "react";

/**
 * Edit overlay yang disuntikkan ke halaman publik saat dibuka di dalam iframe
 * dengan `?edit=1`. Membuat elemen ber-`data-cms-key` dapat di-hover & di-klik,
 * lalu mengirim pesan ke parent (visual editor) lewat postMessage.
 *
 * Penting: TIDAK memodifikasi atribut/style elemen yang dimiliki React
 * (mencegah hydration mismatch). Outline dipasang via <style> global (CSS).
 */
export function EditOverlay({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    // Hanya aktif di dalam iframe.
    if (typeof window === "undefined" || window.self === window.top) return;

    // 1) Inject style — outline editable + hover, murni CSS (tidak menyentuh DOM React).
    const style = document.createElement("style");
    style.setAttribute("data-cms-overlay", "1");
    style.textContent = `
      [data-cms-key]{ outline:1px dashed rgba(212,160,23,.45); outline-offset:2px; cursor:pointer; transition:outline-color .15s; }
      [data-cms-key]:hover{ outline:2px solid #d4a017; outline-offset:2px; }
    `;
    document.head.appendChild(style);

    const closest = (el: EventTarget | null): HTMLElement | null => {
      if (!(el instanceof Element)) return null;
      const found = el.closest("[data-cms-key]");
      return found instanceof HTMLElement ? found : null;
    };

    // 2) Klik (capture phase, cegah navigasi link/tombol).
    const onClick = (e: MouseEvent) => {
      const el = closest(e.target);
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      const key = el.getAttribute("data-cms-key");
      if (!key) return;
      const fieldType = el.getAttribute("data-cms-type") || "text";
      const label = el.getAttribute("data-cms-label") || "";
      let value = "";
      if (fieldType === "image") {
        const img = el.matches("img") ? (el as HTMLImageElement) : el.querySelector("img");
        value = img?.getAttribute("src") ?? "";
      } else {
        value = (el.textContent ?? "").trim();
      }
      const r = el.getBoundingClientRect();
      window.parent.postMessage(
        {
          source: "cms-edit",
          type: "select",
          key,
          fieldType,
          label,
          value,
          rect: { top: r.top, left: r.left, bottom: r.bottom, right: r.right, width: r.width, height: r.height },
        },
        "*"
      );
    };
    document.addEventListener("click", onClick, true);

    // 3) Pesan dari parent.
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.source !== "cms-edit") return;
      if (d.type === "reload") window.location.reload();
    };
    window.addEventListener("message", onMessage);

    // 4) Preserve scroll across reloads.
    const SCROLL_KEY = "cms-scroll";
    try {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved !== null) window.scrollTo(0, parseInt(saved, 10) || 0);
    } catch {
      /* ignore */
    }
    let scrollTimer: number | null = null;
    const onScroll = () => {
      if (scrollTimer !== null) return;
      scrollTimer = window.setTimeout(() => {
        scrollTimer = null;
        try {
          sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
        } catch {
          /* ignore */
        }
      }, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      style.remove();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimer !== null) window.clearTimeout(scrollTimer);
    };
  }, [enabled]);

  return null;
}
