import type { IconName } from './benefits';

/** Segments professionnels. Aucune référence client citée tant qu'elle n'existe pas. */
export const proSegments: { icon: IconName; title: string; text: string; examples: string }[] = [
  {
    icon: 'monument', title: 'Monuments historiques et patrimoine',
    text: 'Églises, châteaux, beffrois, halles : des toitures hautes, fragiles et difficiles d’accès. Le drone évite l’échafaudage sur des maçonneries anciennes et ne touche pas la couverture.',
    examples: 'Communes, diocèses, propriétaires privés, associations de sauvegarde',
  },
  {
    icon: 'factory', title: 'Grandes entreprises et sites industriels',
    text: 'Toitures de plusieurs milliers de m², bardages, auvents. Intervention par secteurs, sans arrêter la production, dans le respect de votre plan de prévention.',
    examples: 'Usines, sites logistiques, centres commerciaux, sièges sociaux',
  },
  {
    icon: 'building', title: 'Copropriétés, syndics et bailleurs',
    text: 'Immeubles de plusieurs étages, pignons, façades sur rue. Pas de nacelle à faire stationner, des résidents peu dérangés, un rapport photo pour l’assemblée générale.',
    examples: 'Syndics, bailleurs sociaux, foncières, gestionnaires de patrimoine',
  },
  {
    icon: 'school', title: 'Collectivités et bâtiments publics',
    text: 'Écoles, gymnases, mairies, salles polyvalentes : chantier planifié pendant les vacances ou hors des heures d’ouverture, périmètre balisé et documents de sécurité fournis.',
    examples: 'Mairies, intercommunalités, départements, établissements scolaires',
  },
  {
    icon: 'warehouse', title: 'Entrepôts, commerces et tertiaire',
    text: 'Bacs acier, membranes, verrières, enseignes en hauteur. Un nettoyage qui redonne une image soignée à votre bâtiment, sans fermer le magasin.',
    examples: 'Enseignes, concessions, hôtels, cliniques, bureaux',
  },
  {
    icon: 'barn', title: 'Bâtiments agricoles',
    text: 'Hangars, stabulations, silos et bardages : de grandes surfaces nettoyées vite, avec une gestion de l’eau adaptée à l’exploitation.',
    examples: 'Exploitations, coopératives, CUMA',
  },
];

/** Ce qu'un professionnel obtient concrètement. */
export const proPromises = [
  { t: 'Un interlocuteur unique', d: 'De l’étude au rapport final, un seul contact suit votre dossier.' },
  { t: 'Visite technique et devis détaillé', d: 'Repérage sur site, phasage, planning et chiffrage poste par poste.' },
  { t: 'Activité maintenue', d: 'Intervention par secteurs, le week-end ou hors horaires d’ouverture si besoin.' },
  { t: 'Sécurité documentée', d: 'Plan de prévention, protocole de sécurité, attestation d’assurance, démarches de vol à notre charge.' },
  { t: 'Multi-sites', d: 'Un même cahier des charges pour tous vos bâtiments, dans un rayon de 200 km autour de Compiègne.' },
  { t: 'Rapport photo et vidéo', d: 'Avant / après par zone, utile pour vos audits, votre assureur ou votre conseil d’administration.' },
];

/** Démarches particulières aux monuments protégés. Formulation prudente : nous accompagnons, nous ne promettons pas l'autorisation. */
export const heritageNote = {
  title: 'Monuments classés ou inscrits : nous préparons le dossier avec vous.',
  text: 'Les travaux sur un monument historique classé ou inscrit, et parfois dans ses abords, sont soumis à autorisation (Code du patrimoine). Nous fournissons la description technique de l’intervention, la méthode et les produits envisagés pour votre demande auprès de la DRAC ou de l’architecte des Bâtiments de France, et nous intervenons une fois l’accord obtenu.',
};
