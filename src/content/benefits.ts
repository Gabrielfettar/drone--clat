/**
 * Bénéfices clients et publics cibles, réutilisés sur l'accueil, les pages ville et la page professionnels.
 * Rédaction : bénéfices concrets, sans chiffre inventé ni promesse absolue.
 */
export type Benefit = { k: string; title: string; text: string; tag: string };

export const benefits: Benefit[] = [
  { k: '01', title: 'Votre toiture dure plus longtemps', text: 'La mousse retient l’eau, qui gèle et fait éclater les tuiles. En la retirant, vous retardez une réfection qui se chiffre souvent en dizaines de milliers d’euros.', tag: 'Patrimoine préservé' },
  { k: '02', title: 'Tranquille pour plusieurs années', text: 'Un toit nettoyé puis traité reste propre durablement : selon l’exposition, on compte en général plusieurs années avant le prochain entretien.', tag: 'Entretien espacé' },
  { k: '03', title: 'Aucune tuile cassée', text: 'Personne ne marche sur votre couverture. Le drone travaille depuis les airs : pas de tuile fêlée, pas de faîtage déplacé, pas de fuite après coup.', tag: 'Zéro piétinement' },
  { k: '04', title: 'Pas d’échafaudage, pas de nacelle', text: 'Ni structure à louer, ni jardin abîmé, ni camion sur le trottoir pendant des jours. Le matériel tient au pied du bâtiment et repart le soir même.', tag: 'Chantier léger' },
  { k: '05', title: 'Une maison qui retrouve son éclat', text: 'Toiture, façade, pignons : le bâtiment retrouve ses couleurs d’origine. Un vrai plus si vous vendez ou louez, la première impression compte.', tag: 'Valeur du bien' },
  { k: '06', title: 'Une intervention rapide', text: 'Là où un chantier classique mobilise une équipe plusieurs jours, la plupart de nos interventions sur maison se font en une journée.', tag: 'Souvent en 1 jour' },
  { k: '07', title: 'Plus sûr pour tout le monde', text: 'Plus de travail en hauteur : le télépilote reste au sol, la zone est balisée. Moins de risque d’accident, chez vous comme pour l’équipe.', tag: 'Sécurité' },
  { k: '08', title: 'Des produits pros, fabriqués en France', text: 'Nous travaillons avec des fabricants français reconnus (DALEP, SCALP) : formules en phase aqueuse, appliquées au juste dosage, uniquement là où il le faut.', tag: 'Dosage maîtrisé' },
  { k: '09', title: 'Un rapport photo avant / après', text: 'Vous voyez ce qui a été fait, même les zones invisibles depuis le sol. Un document utile pour votre assurance, votre syndic ou une future vente.', tag: 'Traçabilité' },
];

export type Audience = { slug: string; label: string; title: string; text: string; examples: string[]; cta: string; param: string };

export const audiences: Audience[] = [
  { slug: 'particuliers', label: 'Particuliers', title: 'Maisons et pavillons', text: 'Démoussage de toiture, nettoyage de façade et de pignon, sans échafaudage dans votre jardin.', examples: ['Maison individuelle', 'Longère', 'Pavillon', 'Résidence secondaire'], cta: 'Étude gratuite pour ma maison', param: 'particulier' },
  { slug: 'coproprietes', label: 'Syndics & copropriétés', title: 'Immeubles et résidences', text: 'Devis comparable pour l’AG, planning annoncé aux résidents, rapport daté pour le carnet d’entretien.', examples: ['Résidences', 'Immeubles', 'Bailleurs sociaux', 'Parcs immobiliers'], cta: 'Devis pour une copropriété', param: 'syndic' },
  { slug: 'entreprises', label: 'Entreprises & industrie', title: 'Sites tertiaires, industriels, logistiques', text: 'Toitures et bardages de grande surface traités sans arrêter l’activité ni bloquer vos accès.', examples: ['Entrepôts', 'Usines', 'Centres commerciaux', 'Bureaux', 'Hôtels'], cta: 'Devis pour un site pro', param: 'entreprise' },
  { slug: 'collectivites', label: 'Collectivités', title: 'Bâtiments publics', text: 'Écoles, gymnases, mairies, équipements techniques : créneaux adaptés à l’occupation, dossier complet.', examples: ['Mairies', 'Écoles', 'Gymnases', 'Hôpitaux', 'Gares'], cta: 'Devis pour une collectivité', param: 'collectivite' },
  { slug: 'patrimoine', label: 'Monuments & patrimoine', title: 'Églises, châteaux, monuments historiques', text: 'Des surfaces hautes et fragiles, inaccessibles sans échafaudage lourd. Méthode douce, validée avec l’architecte en charge du monument.', examples: ['Églises', 'Châteaux', 'Abbayes', 'Monuments classés ou inscrits'], cta: 'Parler d’un édifice patrimonial', param: 'patrimoine' },
  { slug: 'agricole', label: 'Exploitations agricoles', title: 'Hangars, stabulations, silos', text: 'Grandes couvertures en bac acier ou fibrociment, avec un calendrier qui respecte animaux et récoltes.', examples: ['Hangars', 'Stabulations', 'Silos', 'Bâtiments de stockage'], cta: 'Devis pour une exploitation', param: 'agricole' },
];

/** Repères de comparaison coût / durée (formulés sans chiffre non sourcé). */
export const gains = [
  { big: '0', unit: 'tuile piétinée', text: 'Le drone travaille depuis les airs.' },
  { big: '1', unit: 'journée', text: 'Durée typique d’une intervention sur maison.' },
  { big: '48 h', unit: 'pour votre étude', text: 'Réponse sur photos ou vue aérienne, gratuite.' },
  { big: '200 km', unit: 'autour de Compiègne', text: 'Hauts-de-France, Île-de-France, Normandie, Grand Est.' },
];
