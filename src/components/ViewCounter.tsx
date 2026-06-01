"use client";

import { useEffect } from "react";

export function ViewCounter({ id, endpoint = "/api/pengumuman/view" }: { id: string; endpoint?: string }) {
  useEffect(() => {
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {
      // Silently fail — view count is non-critical
    });
  }, [id, endpoint]);

  return null;
}
