/**
 * Équipe. Les fiches marquées `pending: true` sont des emplacements à compléter
 * (photo réelle dans /public/equipe/, prénom, certifications vérifiées).
 * Ne jamais publier de certification non obtenue.
 */
export type Member = {
  id: string; role: string; name: string; photo?: string; bio: string;
  certifications: string[]; pending: boolean;
};

export const team: Member[] = [
  { id: 'dirigeant', role: 'Fondateur · Direction', name: 'Prénom Nom', bio: 'Pilote le développement de Drone Éclat, les relations avec les clients professionnels et les partenaires.', certifications: ['Exploitant UAS enregistré DGAC'], pending: true },
  { id: 'telepilote-1', role: 'Télépilote', name: 'Prénom Nom', bio: 'Prépare chaque vol (étude de l’espace aérien, scénario, balisage) et réalise le nettoyage par drone.', certifications: ['CATS (certificat d’aptitude théorique STS)', 'Formation pratique STS-01'], pending: true },
  { id: 'telepilote-2', role: 'Télépilote', name: 'Prénom Nom', bio: 'Spécialiste des grandes surfaces : toitures industrielles, bardages, copropriétés.', certifications: ['CATS (certificat d’aptitude théorique STS)', 'Formation pratique STS-01'], pending: true },
  { id: 'chef-chantier', role: 'Chef de chantier', name: 'Prénom Nom', bio: 'Organise l’intervention sur place : sécurité au sol, information du voisinage, contrôle qualité et rapport photo.', certifications: ['Sauveteur secouriste du travail', 'Certibiocide (application de produits)'], pending: true },
];

/** Engagements de compétence affichés au niveau de l'entreprise. */
export const credentials = [
  { k: 'CATS', title: 'Télépilotes certifiés', text: 'Certificat d’aptitude théorique « scénario standard » délivré par la DGAC, complété d’une formation pratique.' },
  { k: 'DGAC', title: 'Exploitant enregistré', text: 'Drone Éclat est déclaré comme exploitant d’aéronefs sans équipage, avec un manuel d’exploitation.' },
  { k: 'STS-01', title: 'Cadre de vol déclaré', text: 'Vols en scénario standard ou autorisation spécifique, déclarés avant chaque chantier quand c’est exigé.' },
  { k: 'RC', title: 'Assurances dédiées', text: 'Responsabilité civile professionnelle et responsabilité civile aérienne pour l’activité drone.' },
];
