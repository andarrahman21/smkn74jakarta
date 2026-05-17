type IllustKey =
  | "kelas"
  | "tari"
  | "musik"
  | "teater"
  | "perpustakaan"
  | "lab"
  | "lapangan"
  | "aula"
  | "masjid";

export function FacilityIllust({ kind }: { kind: IllustKey }) {
  // viewBox is consistent (200x100) so all illustrations occupy the same band
  return (
    <div aria-hidden className="w-full grid place-items-center my-2 animate-float-slow">
      <svg width="200" height="100" viewBox="0 0 200 100" fill="none" className="overflow-visible">
        {Renderers[kind]()}
      </svg>
    </div>
  );
}

const Renderers: Record<IllustKey, () => React.ReactNode> = {
  /* ------------------ Ruang Kelas (navy) ------------------ */
  kelas: () => (
    <>
      {/* Whiteboard */}
      <rect x="20" y="14" width="80" height="42" rx="2" fill="currentColor" opacity="0.18" />
      <rect x="22" y="16" width="76" height="38" rx="1" fill="#f0b54a" opacity="0.85" />
      <path d="M30 28 L48 28 M30 36 L60 36 M30 44 L42 44" stroke="#0c1424" strokeWidth="1.5" strokeLinecap="round" />
      {/* Desk row */}
      <rect x="10" y="70" width="50" height="6" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="14" y="76" width="6" height="14" fill="currentColor" opacity="0.5" />
      <rect x="50" y="76" width="6" height="14" fill="currentColor" opacity="0.5" />
      <rect x="70" y="70" width="50" height="6" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="74" y="76" width="6" height="14" fill="currentColor" opacity="0.5" />
      <rect x="110" y="76" width="6" height="14" fill="currentColor" opacity="0.5" />
      {/* Projector beam */}
      <path d="M140 14 L180 26 L180 38 L140 26 Z" fill="#f0b54a" opacity="0.35" />
      <circle cx="180" cy="32" r="6" fill="#f0b54a" />
    </>
  ),

  /* ------------------ Studio Tari (amber → ink text) ------------------ */
  tari: () => (
    <>
      {/* Mirror frame */}
      <rect x="10" y="10" width="80" height="80" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="14" y="14" width="72" height="72" fill="#fff" opacity="0.55" />
      {/* Reflected dancer */}
      <g opacity="0.6">
        <circle cx="50" cy="36" r="8" fill="currentColor" />
        <path d="M38 50 L62 50 L66 80 L34 80 Z" fill="currentColor" />
      </g>
      {/* Real dancer (mid-leap) */}
      <g transform="translate(120,0)">
        <circle cx="32" cy="28" r="10" fill="currentColor" />
        <path d="M22 42 L42 42 L46 70 L18 70 Z" fill="currentColor" />
        {/* Arms */}
        <path d="M22 44 L4 32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M42 44 L60 30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        {/* Legs in leap */}
        <path d="M24 70 L8 92" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M40 70 L56 92" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Floor line */}
      <path d="M0 95 L200 95" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </>
  ),

  /* ------------------ Studio Musik (rust) ------------------ */
  musik: () => (
    <>
      {/* Guitar */}
      <ellipse cx="50" cy="60" rx="20" ry="24" fill="currentColor" opacity="0.85" />
      <circle cx="50" cy="60" r="7" fill="#0c1424" />
      <rect x="48" y="10" width="4" height="38" fill="currentColor" opacity="0.85" />
      <rect x="42" y="6" width="16" height="8" rx="2" fill="#f0b54a" />
      {/* Keyboard */}
      <rect x="90" y="50" width="100" height="26" rx="2" fill="currentColor" opacity="0.18" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={92 + i * 10} y="52" width="8" height="22" fill="#fff" />
      ))}
      {[1, 3, 5, 8].map((i) => (
        <rect key={i} x={98 + i * 10} y="52" width="6" height="14" fill="#0c1424" />
      ))}
      {/* Notes */}
      <circle cx="160" cy="20" r="4" fill="#f0b54a" />
      <rect x="163" y="6" width="2" height="16" fill="#f0b54a" />
      <circle cx="180" cy="30" r="4" fill="#f0b54a" />
      <rect x="183" y="16" width="2" height="16" fill="#f0b54a" />
    </>
  ),

  /* ------------------ Black Box Theater (moss) ------------------ */
  teater: () => (
    <>
      {/* Curtains */}
      <path d="M0 6 L0 90 Q10 92 18 86 Q26 92 34 86 Q42 92 50 86 L50 6 Z" fill="currentColor" opacity="0.25" />
      <path d="M200 6 L200 90 Q190 92 182 86 Q174 92 166 86 Q158 92 150 86 L150 6 Z" fill="currentColor" opacity="0.25" />
      {/* Stage */}
      <rect x="40" y="78" width="120" height="12" rx="1" fill="currentColor" opacity="0.55" />
      {/* Actor */}
      <circle cx="100" cy="42" r="8" fill="#f0b54a" />
      <path d="M88 56 L112 56 L116 78 L84 78 Z" fill="#f0b54a" opacity="0.9" />
      {/* Spotlight cone */}
      <path d="M100 6 L70 78 L130 78 Z" fill="#f0b54a" opacity="0.18" />
      <circle cx="100" cy="6" r="4" fill="#f0b54a" />
    </>
  ),

  /* ------------------ Perpustakaan (paper-soft → ink text) ------------------ */
  perpustakaan: () => (
    <>
      {/* Shelf */}
      <rect x="10" y="12" width="180" height="68" fill="#0c1424" opacity="0.06" rx="2" />
      <rect x="10" y="40" width="180" height="2" fill="#0c1424" opacity="0.25" />
      <rect x="10" y="78" width="180" height="2" fill="#0c1424" opacity="0.25" />
      {/* Books row 1 */}
      {[
        ["#0f1d3a", 12],
        ["#c25a3a", 18],
        ["#f0b54a", 14],
        ["#3f5d3a", 20],
        ["#0f1d3a", 12],
        ["#c25a3a", 16],
        ["#f0b54a", 14],
        ["#3f5d3a", 18],
        ["#0f1d3a", 16],
      ].map(([c, w], i, arr) => {
        const x = 14 + arr.slice(0, i).reduce((acc, [, ww]) => acc + (ww as number) + 2, 0);
        return <rect key={`r1-${i}`} x={x} y="16" width={w as number} height="22" fill={c as string} rx="1" />;
      })}
      {/* Books row 2 */}
      {[
        ["#c25a3a", 16],
        ["#f0b54a", 14],
        ["#0f1d3a", 18],
        ["#3f5d3a", 14],
        ["#c25a3a", 16],
        ["#f0b54a", 18],
        ["#0f1d3a", 14],
        ["#3f5d3a", 16],
        ["#c25a3a", 14],
      ].map(([c, w], i, arr) => {
        const x = 14 + arr.slice(0, i).reduce((acc, [, ww]) => acc + (ww as number) + 2, 0);
        return <rect key={`r2-${i}`} x={x} y="54" width={w as number} height="22" fill={c as string} rx="1" />;
      })}
    </>
  ),

  /* ------------------ Lab Komputer (navy-deep) ------------------ */
  lab: () => (
    <>
      {/* Three monitors */}
      {[20, 80, 140].map((x, i) => (
        <g key={x}>
          <rect x={x} y="14" width="44" height="32" rx="2" fill="currentColor" opacity="0.18" />
          <rect x={x + 2} y="16" width="40" height="28" rx="1" fill="#091331" />
          {/* Screen content */}
          {i === 0 && (
            <>
              <rect x={x + 6} y="20" width="20" height="3" fill="#f0b54a" />
              <rect x={x + 6} y="26" width="28" height="2" fill="#f0b54a" opacity="0.5" />
              <rect x={x + 6} y="32" width="18" height="2" fill="#f0b54a" opacity="0.5" />
              <rect x={x + 6} y="38" width="12" height="2" fill="#f0b54a" opacity="0.5" />
            </>
          )}
          {i === 1 && (
            <>
              {/* 3D cube wireframe */}
              <path d={`M${x + 10} 26 L${x + 24} 26 L${x + 30} 32 L${x + 16} 32 Z`} stroke="#f0b54a" strokeWidth="1" fill="none" />
              <path d={`M${x + 10} 26 L${x + 10} 36 L${x + 16} 42 L${x + 16} 32`} stroke="#f0b54a" strokeWidth="1" fill="none" />
              <path d={`M${x + 24} 26 L${x + 24} 36 L${x + 30} 42 L${x + 30} 32`} stroke="#f0b54a" strokeWidth="1" fill="none" />
              <path d={`M${x + 10} 36 L${x + 24} 36`} stroke="#f0b54a" strokeWidth="1" />
            </>
          )}
          {i === 2 && (
            <>
              <circle cx={x + 22} cy="30" r="6" fill="none" stroke="#f0b54a" strokeWidth="1.2" />
              <path d={`M${x + 22} 24 L${x + 22} 30 L${x + 28} 30`} stroke="#f0b54a" strokeWidth="1.2" />
              <rect x={x + 8} y="38" width="28" height="2" fill="#f0b54a" opacity="0.5" />
            </>
          )}
          {/* Stand */}
          <rect x={x + 18} y="46" width="8" height="6" fill="currentColor" opacity="0.4" />
          <rect x={x + 12} y="52" width="20" height="3" fill="currentColor" opacity="0.4" />
        </g>
      ))}
      {/* Desk surface */}
      <rect x="10" y="68" width="180" height="4" rx="1" fill="currentColor" opacity="0.3" />
    </>
  ),

  /* ------------------ Lapangan Olahraga (white default) ------------------ */
  lapangan: () => (
    <>
      {/* Field */}
      <rect x="20" y="14" width="160" height="76" rx="3" fill="#3f5d3a" opacity="0.15" />
      <rect x="20" y="14" width="160" height="76" rx="3" stroke="#3f5d3a" strokeWidth="1.5" fill="none" />
      {/* Mid line */}
      <line x1="100" y1="14" x2="100" y2="90" stroke="#3f5d3a" strokeWidth="1.5" />
      <circle cx="100" cy="52" r="14" stroke="#3f5d3a" strokeWidth="1.5" fill="none" />
      {/* Side boxes */}
      <rect x="20" y="38" width="22" height="28" stroke="#3f5d3a" strokeWidth="1.5" fill="none" />
      <rect x="158" y="38" width="22" height="28" stroke="#3f5d3a" strokeWidth="1.5" fill="none" />
      {/* Ball */}
      <circle cx="100" cy="52" r="6" fill="#c25a3a" />
      <path d="M94 52 Q100 46 106 52 Q100 58 94 52" stroke="#0c1424" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Basketball hoop */}
      <line x1="178" y1="6" x2="178" y2="20" stroke="#0c1424" strokeWidth="2" />
      <rect x="170" y="6" width="16" height="10" stroke="#0c1424" strokeWidth="1.2" fill="none" />
      <ellipse cx="178" cy="18" rx="6" ry="2" stroke="#c25a3a" strokeWidth="1.4" fill="none" />
    </>
  ),

  /* ------------------ Aula Serbaguna (amber-soft → navy text) ------------------ */
  aula: () => (
    <>
      {/* Stage */}
      <rect x="60" y="14" width="80" height="22" rx="2" fill="currentColor" opacity="0.3" />
      <path d="M100 14 L100 36" stroke="#f0b54a" strokeWidth="1" opacity="0.5" />
      {/* Curtain top */}
      <path d="M40 6 Q50 18 60 6 Q70 18 80 6 Q90 18 100 6 Q110 18 120 6 Q130 18 140 6 Q150 18 160 6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Chairs grid */}
      {[0, 1, 2].map((row) =>
        Array.from({ length: 11 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={14 + col * 16}
            y={48 + row * 14}
            width="11"
            height="9"
            rx="1"
            fill="currentColor"
            opacity="0.55"
          />
        ))
      )}
      {/* Aisle */}
      <rect x="92" y="46" width="16" height="46" fill="#fff" opacity="0.5" />
    </>
  ),

  /* ------------------ Masjid (white default) ------------------ */
  masjid: () => (
    <>
      {/* Sky tint */}
      <rect x="10" y="40" width="180" height="50" rx="2" fill="#0f1d3a" opacity="0.05" />
      {/* Main dome */}
      <path d="M80 60 Q100 24 120 60 Z" fill="#3f5d3a" />
      <path d="M100 18 L100 24" stroke="#f0b54a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="14" r="3" fill="#f0b54a" />
      {/* Side small domes */}
      <path d="M40 70 Q52 50 64 70 Z" fill="#3f5d3a" opacity="0.85" />
      <path d="M136 70 Q148 50 160 70 Z" fill="#3f5d3a" opacity="0.85" />
      {/* Building base */}
      <rect x="34" y="68" width="132" height="22" fill="#0c1424" opacity="0.85" />
      {/* Arch entrance */}
      <path d="M88 90 L88 78 Q100 68 112 78 L112 90 Z" fill="#f0b54a" opacity="0.9" />
      {/* Minarets */}
      <rect x="18" y="40" width="6" height="50" fill="#0c1424" opacity="0.85" />
      <circle cx="21" cy="38" r="4" fill="#3f5d3a" />
      <line x1="21" y1="32" x2="21" y2="36" stroke="#f0b54a" strokeWidth="1.5" />
      <rect x="176" y="40" width="6" height="50" fill="#0c1424" opacity="0.85" />
      <circle cx="179" cy="38" r="4" fill="#3f5d3a" />
      <line x1="179" y1="32" x2="179" y2="36" stroke="#f0b54a" strokeWidth="1.5" />
    </>
  ),
};
