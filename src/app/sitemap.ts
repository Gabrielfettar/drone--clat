import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { services } from '@/content/services';
import { articles } from '@/content/articles';
import { cities } from '@/content/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed: [string, number][] = [
    ['/', 1], ['/contact/', 0.9], ['/professionnels/entretien-batiments/', 0.8], ['/technologie/', 0.7], ['/zones-intervention/', 0.8],
    ['/realisations/', 0.7], ['/equipe/', 0.6], ['/fournisseurs/', 0.6], ['/credits-photos/', 0.1], ['/a-propos/', 0.5], ['/journal/', 0.6], ['/securite-reglementation/', 0.5],
    ['/mentions-legales/', 0.1], ['/confidentialite/', 0.1], ['/cookies/', 0.1],
  ];
  return [
    ...fixed.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: now, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}/`), lastModified: now, priority: 0.9 })),
    ...cities.map((c) => ({ url: absoluteUrl(`/villes/${c.slug}/`), lastModified: now, priority: 0.8 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/journal/${a.slug}/`), lastModified: new Date(a.date), priority: 0.5 })),
  ];
}
