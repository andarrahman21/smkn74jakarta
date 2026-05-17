"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * IntersectionObserver fallback for .reveal / .reveal-soft elements.
 *
 * Chrome/Edge already animate scroll-driven via `animation-timeline: view()`
 * (defined in globals.css). For Safari/Firefox we toggle `.is-visible` on
 * each element as it enters the viewport — so they animate ONE AT A TIME
 * as the user scrolls, not all at once on mount.
 *
 * Re-runs on every route change to catch newly mounted elements.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Native scroll-driven supported? Skip — browser handles it.
    if (typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: view()")) {
      return;
    }

    // Find all reveal elements that haven't been triggered yet
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".reveal:not(.is-visible), .reveal-soft:not(.is-visible)"
      )
    );
    if (els.length === 0) return;

    // Elements already in viewport on mount should be marked immediately
    // (otherwise above-the-fold content stays hidden forever on Safari/FF)
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add("is-visible");
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => {
      if (!el.classList.contains("is-visible")) io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
