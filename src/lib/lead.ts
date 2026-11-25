import { z } from 'zod';

/** Schéma partagé client / serveur de la demande d'étude. */
export const PROFILES = ['Particulier', 'Syndic / copropriété', 'Entreprise / industrie', 'Collectivité / patrimoine'] as const;
export const BUILDINGS = ['Maison individuelle', 'Bâtiment professionnel', 'Bâtiment agricole', 'Immeuble', 'Autre'] as const;
export const SERVICES = ['Démoussage / traitement de toiture', 'Nettoyage de façade', 'Entretien de bardage', 'Plusieurs surfaces / autre'] as const;
export const MATERIALS = ['Tuile terre cuite', 'Tuile béton', 'Ardoise', 'Fibrociment', 'Bac acier', 'Enduit / crépi', 'Pierre', 'Bardage métallique', 'Bardage bois', 'Je ne sais pas'] as const;
export const HEIGHTS = ['Plain-pied (moins de 5 m)', '1 étage (5 à 8 m)', '2 étages (8 à 12 m)', 'Plus de 12 m', 'Je ne sais pas'] as const;
export const CONDITIONS = ['Légèrement sale', 'Mousses visibles', 'Très encrassé', 'Tuiles ou éléments abîmés', 'Je ne sais pas'] as const;
export const ACCESS = ['Accès facile autour du bâtiment', 'Accès limité (mitoyen, rue étroite)', 'Arbres ou câbles à proximité', 'Je ne sais pas'] as const;

export const MAX_FILES = 5;
export const MAX_FILE_MB = 8;
export const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

const phoneFr = /^(?:(?:\+|00)33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export const leadSchema = z.object({
  profile: z.enum(PROFILES, { errorMap: () => ({ message: 'Dites-nous qui vous êtes.' }) }),
  building: z.enum(BUILDINGS).optional(),
  service: z.enum(SERVICES, { errorMap: () => ({ message: 'Choisissez une intervention.' }) }),
  surface: z.coerce.number({ invalid_type_error: 'Indiquez une surface en m².' }).int('Nombre entier, en m².').min(5, 'Surface trop petite (5 m² minimum).').max(50000, 'Surface trop grande : contactez-nous directement.').optional().or(z.literal('').transform(() => undefined)),
  material: z.enum(MATERIALS).optional(),
  height: z.enum(HEIGHTS).optional(),
  condition: z.enum(CONDITIONS).optional(),
  access: z.enum(ACCESS).optional(),
  postalCode: z.string().trim().regex(/^\d{5}$/, 'Code postal à 5 chiffres.'),
  city: z.string().trim().min(2, 'Indiquez la commune.').max(80),
  address: z.string().trim().max(160).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  source: z.string().trim().max(200).optional().or(z.literal('')),
  name: z.string().trim().min(2, 'Indiquez votre nom.').max(80),
  phone: z.string().trim().regex(phoneFr, 'Numéro français, par exemple 06 12 34 56 78.'),
  email: z.string().trim().email('Adresse e-mail invalide.').max(120),
  message: z.string().trim().max(2000, '2000 caractères maximum.').optional().or(z.literal('')),
  consent: z.literal('on', { errorMap: () => ({ message: 'Votre accord est nécessaire pour traiter la demande.' }) }),
});

export type Lead = z.infer<typeof leadSchema>;

/** Diagnostic préliminaire : constats et points d'attention. Aucun prix n'est calculé. */
export function preliminaryNotes(l: Partial<Lead>): string[] {
  const n: string[] = [];
  if (l.material === 'Fibrociment') n.push('Plaques en fibrociment : un diagnostic amiante sera demandé si le bâtiment date d’avant 1997. Aucun procédé abrasif.');
  if (l.condition === 'Tuiles ou éléments abîmés') n.push('Éléments abîmés : un passage de couvreur peut être nécessaire avant le nettoyage. Nous vous le dirons honnêtement.');
  if (l.height === 'Plus de 12 m') n.push('Bâtiment de grande hauteur : étude de vol spécifique et éventuelle visite technique.');
  if (l.access === 'Arbres ou câbles à proximité') n.push('Obstacles proches : nous vérifierons les distances de sécurité lors de l’étude.');
  if (l.access === 'Accès limité (mitoyen, rue étroite)') n.push('Accès limité : le périmètre de sécurité sera défini avec vous, et le voisinage informé si nécessaire.');
  if (l.surface && l.surface > 800) n.push('Grande surface : une visite technique permettra un devis précis et un planning par secteurs.');
  if (l.service === 'Démoussage / traitement de toiture') n.push('Le choix d’un éventuel traitement anti-mousse et de son mode d’application est fait au cas par cas, selon le produit et la réglementation.');
  if (!n.length) n.push('Aucun point bloquant identifié à ce stade. L’étude confirmera la faisabilité à partir de vos photos.');
  return n;
}
