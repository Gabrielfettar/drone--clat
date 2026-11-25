/** Villes ciblées en référencement local (20 plus grandes communes à moins de 200 km de Compiègne + Compiègne). */
import type { Credit } from './examples';
export type CityImage = { src: string; alt: string; credit: Credit };
export type City = {
  slug: string; name: string; department: string; departmentCode: string; region: string;
  population: number; populationYear: number; distanceKm: number; lat: number; lng: number;
  landmarks: string[]; housingNote: string | null; images: CityImage[]; isHome?: boolean;
};
export const cities: City[] = [];
export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
