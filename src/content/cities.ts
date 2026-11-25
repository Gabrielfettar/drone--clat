/**
 * Villes desservies (pages locales) : les 20 plus grandes villes à moins de 200 km de Compiègne,
 * une par agglomération (population municipale INSEE 2023). Sources par ville dans data/cities.json.
 * Les photos (Wikimedia Commons, licences libres) sont téléchargées par scripts/fetch-photos.mjs ;
 * une photo sans fichier, auteur ou licence n'est jamais affichée.
 */
import raw from './data/cities.json';

export type CityPhoto = { file: string; author: string; licence: string; licenceUrl: string; commonsUrl: string; caption: string; width: number; height: number };
export type City = {
  slug: string; name: string; insee: string; department: string; departmentCode: string; region: string;
  population: number; populationYear: number; lat: number; lon: number; distanceKm: number;
  landmarks: string[]; roofing: string | null; droneNote: string | null; sources: string[]; photos: CityPhoto[];
  /** Avant simulé (scripts/simulate-grime.mjs) : public/villes/sim/<slug>-avant.webp, à partir de la photo `photo`. */
  simulation: CitySimulation | null;
};
export type CitySimulation = { before: string; photo: CityPhoto };

type RawPhoto = { file: string | null; author: string | null; licence: string | null; licenceUrl: string | null; commonsUrl: string; caption: string; width: number | null; height: number | null };
const ready = (p: RawPhoto): p is CityPhoto => !!(p.file && p.author && p.licence && p.licenceUrl && p.width && p.height);

type RawCity = Omit<City, 'photos' | 'simulation'> & { photos: RawPhoto[]; simulation?: { photo: number } };

export const cities: City[] = (raw as RawCity[])
  .map((c) => {
    const src = c.photos[c.simulation?.photo ?? 0];
    const simulation = src && ready(src) ? { before: `/villes/sim/${c.slug}-avant.webp`, photo: src } : null;
    return { ...c, photos: c.photos.filter(ready), simulation };
  })
  .sort((a, b) => b.population - a.population);
