/* Minimal line icons drawn with currentColor. */

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function ArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function ArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Phone(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3A2.5 2.5 0 0 1 18.5 20 15.5 15.5 0 0 1 4 5.5 2.5 2.5 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function Mail(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function Pin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Heart({ filled = false, ...props }) {
  return (
    <svg {...base} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M12 20.4 4.9 13.5a4.7 4.7 0 0 1 0-6.7 4.8 4.8 0 0 1 6.7 0l.4.4.4-.4a4.8 4.8 0 0 1 6.7 0 4.7 4.7 0 0 1 0 6.7Z" />
    </svg>
  );
}

export function Search(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export function Close(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Menu(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Bed(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-8m0 4h18v4M3 14V8m18 6v-2a3 3 0 0 0-3-3H9v5" />
      <circle cx="6.5" cy="10.5" r="1.5" />
    </svg>
  );
}

export function Bath(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM7 12V6.5A2.5 2.5 0 0 1 9.5 4c1.2 0 2 .7 2.4 1.7" />
      <path d="M7 21l-1 1M18 21l1 1" />
    </svg>
  );
}

export function Area(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" />
    </svg>
  );
}

export function Calendar(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </svg>
  );
}

export function Key(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="3.6" />
      <path d="m10.6 10.6 8.4 8.4M15.5 15.5l2.2-2.2M18 18l2-2" />
    </svg>
  );
}

export function Compass(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function Shield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5.5c0 4.3-2.9 7.9-7 9.5-4.1-1.6-7-5.2-7-9.5V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Sparkle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="m6.5 6.5 2.5 2.5M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
    </svg>
  );
}

export function Instagram(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Linkedin(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10v7M8 7.2v.1M12 17v-4a2 2 0 0 1 4 0v4" />
    </svg>
  );
}

export function Facebook(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H9v3.5h2V21h3.5v-6.5H17L17.5 11H14.5V9a.5.5 0 0 1 .5-.5Z" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  Instagram,
  LinkedIn: Linkedin,
  Facebook,
};
