/**
 * Photos libres de droit (Unsplash, Pexels, Pixabay, Wikimedia Commons) utilisées comme ILLUSTRATIONS.
 * Règle : jamais présentées comme une réalisation Drone Éclat ; toujours légendées « Photo d'illustration » avec crédit.
 * Fichiers téléchargés par scripts/fetch-photos.mjs ; une entrée sans fichier n'est pas affichée.
 */
import raw from './data/stock.json';

export type StockPhoto = { key: string; category: string; caption: string; pageUrl: string; author: string; licence: string; licenceUrl: string; file: string; width: number; height: number };
type Raw = Omit<StockPhoto, 'file' | 'author' | 'licence' | 'width' | 'height'> & { file: string | null; author: string | null; licence: string | null; width: number | null; height: number | null; commonsUrl?: string | null };

export const stock: StockPhoto[] = (raw as Raw[]).filter((p): p is Raw & StockPhoto => !!(p.file && p.author && p.licence && p.width && p.height));
export const photo = (key: string) => stock.find((p) => p.key === key);

/** Situations illustrées : le problème typique et le résultat attendu (photos de bâtiments différents). */
export const situations = [
  { title: 'Toiture en tuiles envahie par la mousse', problem: 'a_toit_moussu_1', result: 'b_toit_propre_tuiles', text: 'La mousse retient l’eau et soulève les tuiles. Après démoussage et rinçage, la couverture sèche à nouveau normalement.', service: 'demoussage-toiture-drone' },
  { title: 'Tuiles anciennes, mousse incrustée', problem: 'a_toit_moussu_3', result: 'b_toit_propre_ardoise', text: 'Sur les couvertures anciennes, pression basse et essai préalable : on nettoie sans user la tuile.', service: 'demoussage-toiture-drone' },
  { title: 'Façade verdie et encrassée', problem: 'c_facade_sale_mur', result: 'd_bardage_propre', text: 'Mousses, lichens et pollution noircissent les murs exposés. Le nettoyage redonne sa couleur au matériau.', service: 'nettoyage-facade-drone' },
  { title: 'Grands bâtiments et patrimoine', problem: 'f_toit_industriel', result: 'g_chateau_normandie', text: 'Toitures industrielles de plusieurs milliers de m², édifices anciens : là où la nacelle atteint ses limites, le drone travaille.', service: null },
];
