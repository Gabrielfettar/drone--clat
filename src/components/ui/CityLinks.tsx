import Link from 'next/link';
import { cities } from '@/content/cities';

/** Grille des villes ciblées (référencement local) : lien vers chaque page ville. */
export function CityLinks({ compact = false, exclude }: { compact?: boolean; exclude?: string }) {
  const list = cities.filter((c) => c.slug !== exclude);
  if (!list.length) return null;
  return (
    <ul className={compact ? 'city-links city-links--compact' : 'city-links'}>
      {list.map((c) => (
        <li key={c.slug}>
          <Link href={`/villes/${c.slug}/`}>
            <span className="city-name">{c.name}</span>
            {!compact && <span className="city-meta mono">{c.isHome ? 'Notre base' : `${c.departmentCode} · ${c.distanceKm} km`}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
