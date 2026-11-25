import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  // Tant que le domaine définitif n'est pas en ligne (préproduction), définir NEXT_PUBLIC_NOINDEX=1 pour bloquer l'indexation.
  if (process.env.NEXT_PUBLIC_NOINDEX === '1') return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/studio/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
