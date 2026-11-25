/**
 * Équipe. Noms, photos et numéros de certificat À COMPLÉTER (pending) : rien n'est affiché comme un fait
 * tant que l'entreprise ne l'a pas fourni. Mettre la photo dans public/equipe/<slug>.webp.
 */
export type Member = { slug: string; role: string; name: string; photo: string | null; text: string; credentials: string[]; pending: boolean };

export const team: Member[] = [
  {
    slug: 'telepilote', role: 'Télépilote', name: '', photo: null, pending: true,
    text: 'Prépare chaque vol, vérifie l’espace aérien et pilote le drone depuis le sol, à vue, pendant toute l’intervention.',
    credentials: ['Certificat de télépilote catégorie Spécifique (CATS)', 'Formation pratique scénario standard STS'],
  },
  {
    slug: 'chef-de-chantier', role: 'Chef de chantier', name: '', photo: null, pending: true,
    text: 'Balise le périmètre, règle la pression et les produits selon la couverture, échange avec vous le jour J et contrôle le résultat.',
    credentials: ['Habilitation et formation produits (à préciser)'],
  },
  {
    slug: 'responsable-clients', role: 'Responsable clients', name: '', photo: null, pending: true,
    text: 'Étudie vos photos, organise la visite technique, prépare le devis et reste votre contact jusqu’au rapport final.',
    credentials: [],
  },
];
