import { useId } from "react";
import { ROAST_LABELS, type Product } from "../data/products";

/** Kraft bag illustration — label arch, country stamp and accent band tinted per coffee. */
export function BagArt({ product, className }: { product: Product; className?: string }) {
  const accent = product.accent;
  const ink = "#2a1c12";
  const paper = "#f6eddc";
  const words = product.name.split(" ");
  const line1 = words[0];
  const line2 = words.slice(1).join(" ");

  return (
    <svg viewBox="0 0 200 252" className={className} role="img" aria-label={`${product.name} coffee bag`}>
      {/* shadow */}
      <ellipse cx="100" cy="245" rx="56" ry="5.5" fill="#1a110c" opacity="0.14" />
      {/* bag body */}
      <path
        d="M46 66c0-6 5-10 11-10h86c6 0 11 4 11 10l3 156c.3 12-8.6 20-20.6 20H63.6c-12 0-20.9-8-20.6-20l3-156Z"
        fill="#ead9ba"
        stroke="#d3bd95"
        strokeWidth="2"
      />
      {/* gussets */}
      <path d="M58 60 52 224M142 60l6 164" stroke="#d3bd95" strokeWidth="1" opacity="0.55" fill="none" />
      {/* top fold + stitch */}
      <rect x="50" y="30" width="100" height="26" rx="5" fill="#ddc7a0" stroke="#cdb489" strokeWidth="2" />
      <path d="M57 43h86" stroke="#b39a6d" strokeWidth="1.6" strokeDasharray="5 4" />
      {/* accent band */}
      <rect x="46.5" y="63" width="107" height="9" fill={accent} opacity="0.92" />
      {/* label arch */}
      <path d="M64 216v-62c0-26 72-26 72 0v62Z" fill={accent} />
      <path d="M68.5 211.5v-56c0-21.5 63-21.5 63 0v56" fill="none" stroke={paper} strokeWidth="1.4" opacity="0.55" />
      {/* label text */}
      <text
        x="100"
        y="151"
        textAnchor="middle"
        fontFamily="'Space Mono', monospace"
        fontSize="7.5"
        letterSpacing="2.4"
        fill={paper}
        opacity="0.9"
      >
        {product.origin.toUpperCase()}
      </text>
      <text
        x="100"
        y="172"
        textAnchor="middle"
        fontFamily="'Fraunces', serif"
        fontSize="15.5"
        fontWeight="600"
        fill={paper}
      >
        {line1}
      </text>
      {line2 && (
        <text
          x="100"
          y="189"
          textAnchor="middle"
          fontFamily="'Fraunces', serif"
          fontSize="15.5"
          fontWeight="600"
          fill={paper}
        >
          {line2}
        </text>
      )}
      {/* bean mark */}
      <g transform="translate(100 203.5) rotate(38) scale(0.85)">
        <ellipse rx="4.6" ry="6.4" fill="none" stroke={paper} strokeWidth="1.3" />
        <path d="M0-6.1c-2.2 2 2.2 4.1 0 6.1s2.2 4.1 0 6.1" fill="none" stroke={paper} strokeWidth="1.2" />
      </g>
      {/* country stamp */}
      <g transform="rotate(-12 154 126)">
        <circle cx="154" cy="126" r="17" fill={paper} stroke={accent} strokeWidth="2.4" />
        <text
          x="154"
          y="124"
          textAnchor="middle"
          fontFamily="'Space Mono', monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1"
          fill={ink}
        >
          {product.code}
        </text>
        <text
          x="154"
          y="134.5"
          textAnchor="middle"
          fontFamily="'Space Mono', monospace"
          fontSize="5.6"
          letterSpacing="0.6"
          fill={ink}
          opacity="0.65"
        >
          250G · R{product.roast}
        </text>
      </g>
    </svg>
  );
}

/** Five-dot roast level indicator. */
export function RoastMeter({ roast, light = false }: { roast: number; light?: boolean }) {
  return (
    <span className="flex items-center gap-2" title={`Roast: ${ROAST_LABELS[roast]}`}>
      <span className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i <= roast
                ? "bg-sienna"
                : light
                  ? "border border-cream/30"
                  : "border border-espresso/30"
            }`}
          />
        ))}
      </span>
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
          light ? "text-cream/50" : "text-espresso/50"
        }`}
      >
        {ROAST_LABELS[roast]}
      </span>
    </span>
  );
}

/** Rotating circular-text badge. */
export function StampBadge({ text, className }: { text: string; className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" />
      </defs>
      <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text fontFamily="'Space Mono', monospace" fontSize="10" letterSpacing="2.6" fill="currentColor">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
      <g transform="translate(60 60) rotate(38)" stroke="currentColor" fill="none" strokeWidth="1.8">
        <ellipse rx="7" ry="9.6" />
        <path d="M0-9.2c-3.4 3 3.4 6.2 0 9.2s3.4 6.2 0 9.2" />
      </g>
    </svg>
  );
}

/** Coffee-ring stain, pure SVG. */
export function RingStain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" aria-hidden>
      <circle cx="50" cy="50" r="40" strokeWidth="4" opacity="0.7" />
      <circle cx="50" cy="50" r="33" strokeWidth="1.4" opacity="0.5" />
      <path d="M86 66c5 7-2 12-7 9" strokeWidth="2" opacity="0.6" />
      <path d="M16 32c-4-5 1-10 5-8" strokeWidth="1.6" opacity="0.5" />
    </svg>
  );
}
