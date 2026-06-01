/**
 * Date formatting helpers — Indonesia locale, fixed WIB (UTC+7).
 *
 * Pakai getUTC* + offset manual, BUKAN getDate() lokal,
 * supaya hasilnya konsisten di server (CI, Vercel SG) maupun lokal.
 */

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const MONTHS_LONG  = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

export function wibDate(iso: string): Date {
  // Geser ke UTC+7 supaya getUTC* memberikan tanggal Indonesia
  return new Date(new Date(iso).getTime() + WIB_OFFSET_MS);
}

export function formatIndoDateParts(iso: string) {
  const d = wibDate(iso);
  return {
    day:        String(d.getUTCDate()).padStart(2, "0"),
    monthShort: MONTHS_SHORT[d.getUTCMonth()],
    monthLong:  MONTHS_LONG[d.getUTCMonth()],
    year:       String(d.getUTCFullYear()),
  };
}

/** "12 Mei 2026" (long month, no zero-pad day) */
export function formatIndoDate(iso: string): string {
  const p = formatIndoDateParts(iso);
  return `${parseInt(p.day, 10)} ${p.monthLong} ${p.year}`;
}

/** "08.00" dari ISO timestamp */
export function formatHHmm(iso: string): string {
  const d = wibDate(iso);
  return `${String(d.getUTCHours()).padStart(2, "0")}.${String(d.getUTCMinutes()).padStart(2, "0")}`;
}
