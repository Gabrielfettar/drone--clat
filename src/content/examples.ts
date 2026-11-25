/**
 * Exemples types avant / après : photos libres de droits (Wikimedia Commons, Unsplash, Pexels…)
 * utilisées pour ILLUSTRER le type de résultat. Elles ne sont pas des chantiers Drone Éclat
 * et sont toujours étiquetées « Exemple type ». Crédits : /credits-photos/.
 */
export type Credit = { author: string; license: string; licenseUrl?: string; sourceUrl: string; title?: string };
export type Example = {
  id: string; category: 'Toiture' | 'Façade' | 'Bardage' | 'Patrimoine';
  title: string; text: string;
  before: { src: string; alt: string; credit: Credit };
  after: { src: string; alt: string; credit: Credit };
  samePlace: boolean;
};
export const examples: Example[] = [];
export type Still = { id: string; src: string; alt: string; credit: Credit };
export const stills: Record<string, Still> = {};
