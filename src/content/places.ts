/** Repères géographiques (coordonnées WGS84 approximées au centre-ville) pour la carte de zone. */
export const places = [
  { name: 'Compiègne', lat: 49.4179, lon: 2.8261, base: true },
  { name: 'Noyon', lat: 49.5817, lon: 2.9997 },
  { name: 'Pont-Sainte-Maxence', lat: 49.3017, lon: 2.6044 },
  { name: 'Crépy-en-Valois', lat: 49.2347, lon: 2.8889 },
  { name: 'Senlis', lat: 49.2072, lon: 2.5867 },
  { name: 'Creil', lat: 49.2597, lon: 2.4747 },
  { name: 'Clermont', lat: 49.3787, lon: 2.4126 },
  { name: 'Beauvais', lat: 49.4295, lon: 2.0807 },
  { name: 'Montdidier', lat: 49.6476, lon: 2.5694 },
  { name: 'Soissons', lat: 49.3817, lon: 3.3236 },
  { name: 'Chantilly', lat: 49.1947, lon: 2.4711 },
  { name: 'Amiens', lat: 49.8941, lon: 2.2958 },
  { name: 'Saint-Quentin', lat: 49.8465, lon: 3.2876 },
  { name: 'Laon', lat: 49.5641, lon: 3.6199 },
  { name: 'Roissy-CDG', lat: 49.0097, lon: 2.5479 },
];

export function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
