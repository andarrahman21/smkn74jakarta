export type PrestasiIconKey =
  | "trophy"     // generic championship
  | "calc"       // akuntansi / matematika
  | "dance"      // seni tari
  | "code"       // RPL / web design
  | "robot"      // robotik / engineering
  | "music"      // karawitan / musik
  | "theater"    // teater
  | "medal";     // generic medali

export function PrestasiIcon({ kind, className = "h-10 w-10" }: { kind: PrestasiIconKey; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      {renderers[kind]()}
    </svg>
  );
}

const renderers: Record<PrestasiIconKey, () => React.ReactNode> = {
  /* Trophy with handles */
  trophy: () => (
    <>
      <path d="M14 8 H34 V22 A10 10 0 0 1 14 22 Z" fill="currentColor" />
      <path d="M14 12 H8 A4 4 0 0 0 8 20 H14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 12 H40 A4 4 0 0 1 40 20 H34" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="20" y="32" width="8" height="6" fill="currentColor" />
      <rect x="14" y="38" width="20" height="3" rx="1" fill="currentColor" />
      <circle cx="24" cy="18" r="3" fill="#f0b54a" />
    </>
  ),

  /* Calculator */
  calc: () => (
    <>
      <rect x="10" y="6" width="28" height="36" rx="3" fill="currentColor" />
      <rect x="14" y="10" width="20" height="8" rx="1.5" fill="#f0b54a" opacity="0.85" />
      {/* Buttons */}
      {[22, 28, 34].flatMap((y) =>
        [14, 21, 28].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="6" height="4" rx="1" fill="#f6f4ef" opacity="0.85" />
        ))
      )}
    </>
  ),

  /* Dancer silhouette mid-leap */
  dance: () => (
    <>
      <circle cx="22" cy="10" r="5" fill="currentColor" />
      <path d="M22 16 L22 26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M22 18 L34 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 18 L10 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 26 L34 40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M22 26 L14 38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="38" cy="10" r="2" fill="#f0b54a" />
    </>
  ),

  /* Code brackets / window */
  code: () => (
    <>
      <rect x="6" y="8" width="36" height="32" rx="3" fill="currentColor" />
      <rect x="6" y="8" width="36" height="6" rx="3" fill="#f0b54a" opacity="0.9" />
      <circle cx="11" cy="11" r="1.2" fill="#0c1424" />
      <circle cx="15" cy="11" r="1.2" fill="#0c1424" />
      <circle cx="19" cy="11" r="1.2" fill="#0c1424" />
      <path d="M16 22 L11 27 L16 32" stroke="#f0b54a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M32 22 L37 27 L32 32" stroke="#f0b54a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M22 34 L26 18" stroke="#f0b54a" strokeWidth="2" strokeLinecap="round" />
    </>
  ),

  /* Robot head */
  robot: () => (
    <>
      <line x1="24" y1="2" x2="24" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="2" r="2.5" fill="#f0b54a" />
      <rect x="10" y="10" width="28" height="22" rx="4" fill="currentColor" />
      <circle cx="18" cy="20" r="3" fill="#f0b54a" />
      <circle cx="30" cy="20" r="3" fill="#f0b54a" />
      <rect x="16" y="26" width="16" height="2.5" rx="1" fill="#0c1424" />
      <rect x="14" y="34" width="20" height="8" rx="2" fill="currentColor" opacity="0.7" />
      <circle cx="18" cy="38" r="2" fill="#f0b54a" />
      <circle cx="30" cy="38" r="2" fill="#f0b54a" />
    </>
  ),

  /* Music note (eighth) */
  music: () => (
    <>
      <ellipse cx="14" cy="34" rx="7" ry="5" fill="currentColor" transform="rotate(-15 14 34)" />
      <rect x="20" y="8" width="3" height="26" fill="currentColor" />
      <path d="M22 8 Q34 14 30 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="14" r="3" fill="#f0b54a" />
    </>
  ),

  /* Theater masks */
  theater: () => (
    <>
      {/* Mask 1 (happy) */}
      <path d="M8 12 Q16 4 24 12 Q24 24 16 30 Q8 24 8 12 Z" fill="currentColor" />
      <circle cx="13" cy="16" r="1.3" fill="#f0b54a" />
      <circle cx="19" cy="16" r="1.3" fill="#f0b54a" />
      <path d="M12 22 Q16 26 20 22" stroke="#f0b54a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Mask 2 (sad) */}
      <path d="M24 18 Q32 10 40 18 Q40 30 32 36 Q24 30 24 18 Z" fill="currentColor" opacity="0.65" />
      <circle cx="29" cy="22" r="1.3" fill="#f0b54a" />
      <circle cx="35" cy="22" r="1.3" fill="#f0b54a" />
      <path d="M28 30 Q32 26 36 30" stroke="#f0b54a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),

  /* Medal */
  medal: () => (
    <>
      <path d="M14 4 L20 18 L14 18 Z" fill="currentColor" />
      <path d="M34 4 L28 18 L34 18 Z" fill="currentColor" />
      <circle cx="24" cy="30" r="13" fill="currentColor" />
      <circle cx="24" cy="30" r="8" fill="#f0b54a" />
      <text x="24" y="33" textAnchor="middle" fill="#0c1424" fontFamily="serif" fontWeight="700" fontSize="9">★</text>
    </>
  ),
};
