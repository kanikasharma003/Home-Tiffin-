// Tiny inline SVG icon set (no external icon dependency).

const PATHS = {
  boxes: (
    <>
      <path d="M3 8l9-5 9 5-9 5-9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path d="M1 5h13v11H1z" />
      <path d="M14 8h4l3 3v5h-7z" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="17.5" cy="18.5" r="2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4a3 3 0 0 1 6 0" />
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  chef: (
    <>
      <path d="M6 13a4 4 0 0 1 .6-7.95A5 5 0 0 1 12 3a5 5 0 0 1 5.4 2.05A4 4 0 0 1 18 13v2H6v-2z" />
      <path d="M6 19h12" />
    </>
  ),
  scooter: (
    <>
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M5 18l3-8h5l3 5h3" />
      <path d="M13 10l1-4h3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  check: <path d="M4 12l5 5L20 6" />,
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  sparkle: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />,
}

// Filled-style icons
const FILLED = new Set(['star', 'sparkle'])

export function Icon({ name, size = 20, className = '', strokeWidth = 2 }) {
  const filled = FILLED.has(name)
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  )
}

export function Stars({ count = 5, size = 14, className = '' }) {
  return (
    <span className={`inline-flex gap-0.5 text-gold ${className}`} aria-label={`${count} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}

export function SectionHeading({ label, title, accent, sub, align = 'center' }) {
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="font-display text-2xl sm:text-3xl md:text-[2.4rem] leading-tight font-bold">
        {title}{' '}
        {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      {sub && <p className="text-sm sm:text-[15px] max-w-xl text-muted">{sub}</p>}
    </div>
  )
}

export function Badge({ type = 'Veg' }) {
  const cls =
    type === 'Veg' ? 'badge-veg' : type === 'Jain' ? 'badge-jain' : 'badge-nonveg'
  const dot = 'bg-white/70'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {type}
    </span>
  )
}
