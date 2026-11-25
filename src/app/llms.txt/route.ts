import { site, absoluteUrl, isKnown } from '@/config/site';
import { services } from '@/content/services';
import { articles } from '@/content/articles';
import { cities } from '@/content/cities';

export const dynamic = 'force-static';

/**
 * llms.txt : résumé factuel du site pour les assistants IA (proposition llmstxt.org).
 * Ce n'est pas un facteur de classement ; il aide seulement à décrire l'entreprise de façon exacte.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    'Drone Éclat est une entreprise française d’entretien de bâtiments par drone : démoussage et nettoyage de toitures, nettoyage de façades et de bardages, pour particuliers et professionnels. Le drone est relié au sol par un tuyau d’eau ; personne ne monte sur la toiture.',
    `Base : ${site.base.city} (${site.base.department}). Rayon d’intervention : ${site.serviceRadiusKm.value} km autour de ${site.base.city} (Hauts-de-France, Île-de-France, une partie du Grand Est et de la Normandie).`,
    'Devis : gratuit, établi sous 48 h ouvrées après étude sur photos, sans prix automatique.',
    isKnown(site.phone) ? `Téléphone : ${site.phone.value}` : '',
    isKnown(site.email) ? `E-mail : ${site.email.value}` : '',
    '',
    '## Prestations',
    ...services.map((s) => `- [${s.h1}](${absoluteUrl(`/services/${s.slug}/`)}) : ${s.summary}`),
    `- [Entretien de bâtiments professionnels](${absoluteUrl('/professionnels/entretien-batiments/')})`,
    '',
    '## Pages de référence',
    `- [Technologie, matériel et limites](${absoluteUrl('/technologie/')})`,
    `- [Sécurité et réglementation](${absoluteUrl('/securite-reglementation/')})`,
    `- [Démoussage de toiture par drone dans l’Oise](${absoluteUrl('/oise/')})`,
    `- [Zones d’intervention](${absoluteUrl('/zones-intervention/')})`,
    `- [Demande d’étude](${absoluteUrl('/contact/')})`,
    '',
    '## Villes couvertes',
    ...cities.map((c) => `- [${c.name} (${c.departmentCode})](${absoluteUrl(`/villes/${c.slug}/`)})`),
    '',
    '## Conseils',
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/journal/${a.slug}/`)}) : ${a.description}`),
  ].filter((l, i, a) => !(l === '' && a[i - 1] === ''));
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
