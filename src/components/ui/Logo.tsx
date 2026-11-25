type Props = { tone?: 'ink' | 'light'; className?: string; withWordmark?: boolean };

/** Logo Drone Éclat : pictogramme (redessiné depuis le kit d'origine) + nom. */
export function LogoMark({ tone = 'ink', className }: { tone?: 'ink' | 'light'; className?: string }) {
  const body = tone === 'ink' ? '#0A1F37' : '#FFFFFF';
  return (
    <svg viewBox="0 0 420 470" className={className} aria-hidden="true" focusable="false">
      <path d="M62 112 A180 180 0 0 1 358 112" fill="none" stroke="#0091EB" strokeWidth="24" strokeLinecap="round" />
      <g stroke={body} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M65 175 L155 148 L210 170 L265 148 L355 175" strokeWidth="28" />
        <path d="M50 153 H150 M270 153 H370" strokeWidth="12" />
        <path d="M30 448 L210 372 L390 448" strokeWidth="28" />
      </g>
      <rect x="165" y="142" width="90" height="63" rx="18" fill={body} />
      <g fill="#0091EB"><circle cx="50" cy="153" r="17" /><circle cx="370" cy="153" r="17" /></g>
      <g stroke="#0091EB" strokeWidth="11" strokeLinecap="round"><path d="M210 212 L140 318 M210 212 L176 330 M210 212 V336 M210 212 L244 330 M210 212 L280 318" /></g>
    </svg>
  );
}

export function Logo({ tone = 'ink', className, withWordmark = true }: Props) {
  return (
    <span className={`logo ${className ?? ''}`} data-tone={tone}>
      <LogoMark tone={tone} className="logo-mark" />
      {withWordmark && (
        <span className="logo-word" aria-hidden="true">
          <span>DRONE</span>
          <span className="logo-accent">ÉCLAT</span>
        </span>
      )}
    </span>
  );
}
