"use client";

import { useSearchParams } from "next/navigation";
import { EditOverlay } from "./EditOverlay";

/** Aktifkan EditOverlay di halaman publik mana pun saat ?edit=1 (di dalam iframe editor). */
export function EditOverlayMount() {
  const params = useSearchParams();
  const enabled = params.get("edit") === "1";
  return <EditOverlay enabled={enabled} />;
}
