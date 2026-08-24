type IconProps = { className?: string };

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export function BeanIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <g transform="rotate(38 12 12)">
        <ellipse cx="12" cy="12" rx="6.2" ry="8.6" />
        <path d="M12 3.4c-3.2 2.8 3.2 5.8 0 8.6s3.2 5.8 0 8.6" />
      </g>
    </svg>
  );
}

export function KettleIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M8.2 9.5h8.4l-.9 10a2 2 0 0 1-2 1.8H10a2 2 0 0 1-2-1.8l.2-10Z" />
      <path d="M9.2 9.5V8a3.2 3.2 0 0 1 6.4 0v1.5" />
      <path d="M8.2 11.6C5.6 11.2 4.3 9.4 3.2 7.2" />
      <path d="M16.6 11.8c2.7.4 2.7 4.3 0 4.7" />
      <path d="M9 4.5c-.6.9.6 1.4 0 2.3M12.4 4.5c-.6.9.6 1.4 0 2.3" strokeWidth={1.4} />
    </svg>
  );
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M5.5 8.5h13l-.9 10.1a2 2 0 0 1-2 1.9H8.4a2 2 0 0 1-2-1.9L5.5 8.5Z" />
      <path d="M8.7 8.2V7a3.3 3.3 0 0 1 6.6 0v1.2" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <circle cx="11" cy="11" r="6.2" />
      <path d="M15.8 15.8 20.5 20.5" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M5.5 12h13" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 4.5v15M6 13.5l6 6 6-6" />
    </svg>
  );
}

export function StarIcon({ className, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3.6l2.5 5.2 5.7.7-4.2 4 1.1 5.6L12 16.4 6.9 19.1 8 13.5l-4.2-4 5.7-.7L12 3.6z" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 3.5c1 3-3.6 4.6-3.6 8.1a5.6 5.6 0 0 0 11.2 0c0-2-1-3.6-2.2-5.1-.2 1.2-.8 2-1.9 2.5.5-2-.4-4.4-3.5-5.5Z" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M5 19C5 9.5 13 5 20 4.5 19.5 12 15 19 6.5 19H5Z" />
      <path d="M5 19c3-5.5 6.5-8.5 10.5-10.5" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M2.8 6.5H14V16H2.8z" />
      <path d="M14 9.5h3.6l3.4 3.4V16h-2.7" />
      <circle cx="7" cy="17.4" r="1.8" />
      <circle cx="16.5" cy="17.4" r="1.8" />
      <path d="M8.8 16h5.9" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4.5 6.5h15M9.5 6.2V4.6h5v1.6" />
      <path d="m6.6 6.7.8 12.6a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5l.8-12.6" />
      <path d="M10 10.5v6.3M14 10.5v6.3" />
    </svg>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.4" />
      <path d="M2.8 9.6h18.4M6.2 15h4" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M12 21s-6.5-5.4-6.5-10.2a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.6" r="2.2" />
    </svg>
  );
}

export function CupIcon({ className }: IconProps) {
  return (
    <svg {...base(className)}>
      <path d="M4.5 10.5h12.5v4a6.2 6.2 0 0 1-12.5 0v-4Z" />
      <path d="M17 11.3h1.2a2.6 2.6 0 0 1 0 5.2h-1.6" />
      <path d="M8.5 3.8c-.7.9.7 1.5 0 2.6M12.5 3.8c-.7.9.7 1.5 0 2.6" strokeWidth={1.4} />
    </svg>
  );
}
