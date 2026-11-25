/**
 * Données d'entreprise. Toute valeur marquée `pending: true` est PROVISOIRE :
 * elle n'est jamais affichée comme un fait, ni injectée dans les données structurées.
 * Voir docs/pending-information.md.
 */
export type Pending<T> = { value: T; pending: boolean };

export const site = {
  name: 'Drone Éclat',
  legalName: { value: '', pending: true } as Pending<string>,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.droneeclat.fr',
  domainPending: true,
  tagline: 'Entretien de toitures et de bâtiments par drone',
  baseline: 'Nettoyage · Démoussage · Traitement',
  description:
    "Drone Éclat nettoie, démousse et traite toitures, façades et bardages par drone, sans échafaudage ni passage sur la couverture. Basé dans l'Oise.",
  email: { value: 'contact@droneeclat.fr', pending: true } as Pending<string>,
  phone: { value: '', pending: true } as Pending<string>,
  /** Point de départ des interventions, utilisé par la vérification de zone. */
  base: {
    city: 'Compiègne',
    department: 'Oise',
    postalCode: '60200',
    lat: 49.4179,
    lon: 2.8261,
    pending: true,
  },
  /** Rayon d'intervention envisagé, en km. Provisoire tant qu'il n'est pas validé par la direction. */
  serviceRadiusKm: { value: 60, pending: true } as Pending<number>,
  /** Rayon élargi, au cas par cas (grands chantiers pro). */
  extendedRadiusKm: { value: 120, pending: true } as Pending<number>,
  social: [] as { label: string; url: string }[],
  siret: { value: '', pending: true } as Pending<string>,
  insurer: { value: '', pending: true } as Pending<string>,
  /** Numéro d'exploitant UAS (AlphaTango). */
  operatorId: { value: '', pending: true } as Pending<string>,
};

export const nav = [
  { href: '/services/demoussage-toiture-drone/', label: 'Prestations' },
  { href: '/professionnels/entretien-batiments/', label: 'Professionnels' },
  { href: '/realisations/', label: 'Réalisations' },
  { href: '/technologie/', label: 'Technologie' },
  { href: '/zones-intervention/', label: "Zones d'intervention" },
  { href: '/contact/', label: 'Contact' },
];

export function isKnown<T>(p: Pending<T>): boolean {
  return !p.pending && p.value !== '' && p.value !== undefined;
}

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
