/**
 * Réalisations. RÈGLE : seules de vraies interventions Drone Éclat vont dans `projects`.
 * Les visuels de `demos` sont des illustrations 3D et sont toujours étiquetés comme tels.
 */
export type GalleryItem = {
  id: string; src: string; alt: string; category: 'Toiture' | 'Façade' | 'Bardage' | 'Matériel';
  title: string; kind: 'chantier' | 'illustration';
  details?: { label: string; value: string }[];
};

export const projects: GalleryItem[] = [];

export const demos: GalleryItem[] = [
  { id: 'd1', src: '/illustrations/roof-before.webp', alt: 'Illustration 3D : toiture en tuiles couverte de mousse avant intervention', category: 'Toiture', title: 'Toiture moussue, avant intervention', kind: 'illustration', details: [{ label: 'Surface type', value: 'Tuile terre cuite' }, { label: 'Constat', value: 'Mousses et lichens en partie basse des tuiles' }] },
  { id: 'd2', src: '/illustrations/roof-after.webp', alt: 'Illustration 3D : la même toiture après rinçage par drone', category: 'Toiture', title: 'Après rinçage par drone', kind: 'illustration', details: [{ label: 'Méthode', value: 'Passes horizontales, de haut en bas' }] },
  { id: 'd3', src: '/illustrations/facade.webp', alt: 'Illustration 3D : façade d’une maison contemporaine', category: 'Façade', title: 'Façade et pignon', kind: 'illustration' },
  { id: 'd4', src: '/illustrations/cladding.webp', alt: 'Illustration 3D : extension à bardage bois et toit plat', category: 'Bardage', title: 'Bardage et toit plat', kind: 'illustration' },
  { id: 'd5', src: '/illustrations/drone.webp', alt: 'Illustration 3D : drone de nettoyage relié au sol par son tuyau', category: 'Matériel', title: 'Drone captif et unité au sol', kind: 'illustration', details: [{ label: 'Alimentation', value: 'Eau par tuyau depuis le sol' }] },
  { id: 'd6', src: '/illustrations/overview.webp', alt: 'Illustration 3D : vue d’ensemble d’un chantier avec périmètre balisé', category: 'Toiture', title: 'Chantier balisé', kind: 'illustration' },
];
