import type { IconName } from '@/content/benefits';

/** Pictogrammes au trait, dessinés pour la marque (grille 24, trait 1.6). */
const P: Record<IconName, string> = {
  shield: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z M8.5 12l2.5 2.5 4.5-5',
  tile: 'M3 9l9-5 9 5 M5 8v11h14V8 M5 13h14 M9 13v6 M15 13v6 M12 8v5',
  calendar: 'M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5 M8 14l2.5 2.5L16 13',
  euro: 'M17 6.5A6.5 6.5 0 1 0 17 17.5 M4 10.5h9 M4 13.5h9',
  leaf: 'M5 19c0-8 5-13 14-14-1 9-6 14-14 14z M5 19l7-7',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z M9.5 15a2.5 2.5 0 0 0 2.5 2.5',
  home: 'M3 11l9-7 9 7 M6 9.5V20h12V9.5 M10 20v-5h4v5',
  camera: 'M4 7h4l1.5-2h5L16 7h4v12H4z M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2',
  'hard-hat': 'M4 16h16v3H4z M6 16v-3a6 6 0 0 1 12 0v3 M10 7.5V5h4v2.5',
  building: 'M5 21V4h10v17 M15 9h4v12 M3 21h18 M8 7h1 M11 7h1 M8 10.5h1 M11 10.5h1 M8 14h1 M11 14h1 M9 21v-3h2v3',
  doc: 'M6 3h9l4 4v14H6z M14 3v5h5 M9 12h6 M9 15.5h6 M9 9h2',
  monument: 'M12 2.5v3 M10.5 4h3 M7 11l5-4 5 4 M8 11v9 M16 11v9 M4 20h16 M4 20v-6h4 M20 20v-6h-4 M11 20v-4h2v4',
  factory: 'M3 21V11l5 3V11l5 3V8l8 4v9z M3 21h18 M7 17h2 M12 17h2 M17 17h2 M17 3v6',
  school: 'M3 9l9-5 9 5-9 5-9-5z M7 11.5V17c2.5 2 7.5 2 10 0v-5.5 M21 9v6',
  keys: 'M8.5 15.5a4.5 4.5 0 1 1 4.2-6.1H21v3h-2v2h-3v-2h-3.3a4.5 4.5 0 0 1-4.2 3.1z M7 11h.01',
  barn: 'M3 10l4-6h10l4 6 M5 10v11h14V10 M9 21v-6h6v6 M9 15l6 6 M15 15l-6 6 M10 7.5h4',
  warehouse: 'M3 21V8l9-5 9 5v13 M7 21v-9h10v9 M7 15h10 M7 18h10',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M2.5 20a6.5 6.5 0 0 1 13 0 M16 4.5a3.5 3.5 0 0 1 0 6.5 M18 14a6.5 6.5 0 0 1 3.5 6',
  check: 'M4 12.5l5 5L20 6.5',
  map: 'M9 4l6 2 6-2v16l-6 2-6-2-6 2V6z M9 4v16 M15 6v16',
};

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d={P[name]} />
    </svg>
  );
}
