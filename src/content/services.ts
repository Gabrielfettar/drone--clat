import type { FaqItem } from '@/components/ui/Faq';

/**
 * Catalogue des prestations. Ajouter une prestation = ajouter un objet ici :
 * la page /services/[slug]/, le sitemap, le sélecteur et le menu se mettent à jour.
 */
export type Service = {
  slug: string;
  name: string;           // libellé court (menu, sélecteur)
  h1: string;
  title: string;          // <title> ≤ 60 caractères
  description: string;   // meta description ≤ 155 caractères
  summary: string;        // 1 phrase, définition directe (extractible)
  intro: string;
  surfaces: string[];
  benefits: string[];
  precautions: string[];
  steps: { title: string; text: string }[];
  sections: { h2: string; body: string[] }[];
  faq: FaqItem[];
  visual: 'roof' | 'facade' | 'cladding' | 'pro';
  audience: ('particuliers' | 'professionnels' | 'agricole')[];
};

export const services: Service[] = [
  {
    slug: 'demoussage-toiture-drone',
    name: 'Démoussage de toiture',
    h1: 'Démoussage de toiture par drone',
    title: 'Démoussage de toiture par drone dans l’Oise',
    description:
      'Démoussage et nettoyage de toiture par drone : sans échafaudage, sans marcher sur les tuiles. Étude gratuite sur photos, intervention dans l’Oise.',
    summary:
      'Le démoussage par drone consiste à retirer mousses, lichens et salissures d’une toiture à l’aide d’un drone relié au sol, piloté par un télépilote, sans que personne ne monte sur la couverture.',
    intro:
      'Les mousses retiennent l’humidité, soulèvent les tuiles et bouchent les gouttières. Les retirer impose d’habitude de monter sur le toit, avec un risque pour les tuiles et pour l’opérateur. Le drone travaille depuis les airs : la couverture n’est jamais piétinée.',
    surfaces: ['Tuile terre cuite', 'Tuile béton', 'Ardoise naturelle', 'Ardoise fibrociment', 'Bac acier', 'Toiture-terrasse gravillonnée (sur étude)'],
    benefits: [
      'Aucun passage sur la couverture : pas de tuile cassée ni déplacée.',
      'Pas d’échafaudage ni de nacelle à installer.',
      'Intervention courte, en général sur une journée pour une maison.',
      'Rapport photo avant / après remis à la fin du chantier.',
    ],
    precautions: [
      'Un toit très dégradé (tuiles poreuses, fissurées) peut nécessiter un couvreur avant tout nettoyage.',
      'La pression et la buse sont choisies selon le matériau : une ardoise ou un fibrociment ne se traitent pas comme une tuile béton.',
      'Le traitement anti-mousse éventuel suit les règles propres au produit utilisé. Son mode d’application est validé au cas par cas.',
      'Le vol dépend de l’environnement : lignes électriques, zones aériennes réglementées, voisinage immédiat.',
    ],
    steps: [
      { title: 'Étude', text: 'Vous envoyez photos et adresse. Nous vérifions la faisabilité : matériau, pente, environnement, espace aérien.' },
      { title: 'Préparation', text: 'Démarches de vol, périmètre de sécurité, information du voisinage si nécessaire.' },
      { title: 'Nettoyage', text: 'Passes de haut en bas, pour que l’eau évacue les salissures vers les parties non traitées.' },
      { title: 'Contrôle', text: 'Vérification visuelle par caméra, photos avant / après et conseils d’entretien.' },
    ],
    sections: [
      {
        h2: 'Pourquoi démousser une toiture ?',
        body: [
          'La mousse agit comme une éponge. Elle garde l’eau contre la tuile, qui finit par se dégrader avec le gel. Ses racines s’infiltrent entre les éléments et peuvent les soulever, ce qui ouvre la voie aux infiltrations.',
          'Les débris qu’elle libère s’accumulent dans les gouttières et les descentes d’eau pluviale. Un démoussage régulier prolonge la durée de vie de la couverture et évite des réparations plus lourdes.',
        ],
      },
      {
        h2: 'Drone ou couvreur : que choisir ?',
        body: [
          'Le drone est adapté au nettoyage et à l’entretien d’une couverture saine. Il ne remplace pas un couvreur pour remplacer des tuiles, reprendre un faîtage ou traiter une fuite.',
          'Lors de l’étude, si nous constatons des tuiles cassées ou une couverture fragile, nous vous le disons et vous orientons vers un couvreur plutôt que d’intervenir.',
        ],
      },
      {
        h2: 'Combien coûte un démoussage par drone ?',
        body: [
          'Le prix dépend de la surface, du matériau, de la pente, de l’état de la toiture et de l’accès. Notre grille tarifaire n’est pas encore publiée : chaque demande reçoit une étude personnalisée et un devis détaillé, gratuit et sans engagement.',
        ],
      },
    ],
    faq: [
      { q: 'Le drone peut-il abîmer mes tuiles ?', a: 'Le drone ne touche pas la toiture. La pression est réglée selon le matériau et reste basse sur les surfaces fragiles. Si la couverture est déjà endommagée, nous le signalons avant toute intervention.' },
      { q: 'Faut-il être présent le jour de l’intervention ?', a: 'Ce n’est pas obligatoire si l’accès au terrain est possible. Il faut en revanche fermer fenêtres et velux, rentrer les véhicules et dégager la zone au sol que nous balisons.' },
      { q: 'Combien de temps dure le démoussage d’une maison ?', a: 'Pour une maison individuelle, l’intervention tient en général sur une journée, préparation comprise. Le délai exact est indiqué dans le devis.' },
      { q: 'À quelle fréquence faut-il démousser ?', a: 'Cela dépend de l’exposition et de l’environnement (arbres, orientation nord, humidité). Un contrôle tous les 2 à 5 ans est une base courante, à adapter à votre toiture.' },
      { q: 'Le vol d’un drone au-dessus de chez moi est-il autorisé ?', a: 'Un vol professionnel au-dessus d’une zone habitée est encadré : exploitant enregistré, télépilote formé, déclaration préalable quand elle est exigée, et vérification des zones restreintes. Nous effectuons ces démarches avant chaque chantier.' },
    ],
    visual: 'roof',
    audience: ['particuliers', 'professionnels'],
  },
  {
    slug: 'nettoyage-facade-drone',
    name: 'Nettoyage de façade',
    h1: 'Nettoyage de façade par drone',
    title: 'Nettoyage de façade par drone, sans nacelle',
    description:
      'Nettoyage de façade par drone : traces noires, mousses, pollution. Sans nacelle ni échafaudage, pression adaptée à l’enduit ou à la pierre. Devis gratuit.',
    summary:
      'Le nettoyage de façade par drone permet de rincer et nettoyer les murs extérieurs d’un bâtiment en hauteur, sans nacelle ni échafaudage, avec une pression adaptée au revêtement.',
    intro:
      'Coulures noires sous les appuis de fenêtre, verdissement sur les façades nord, pollution urbaine : les façades se salissent surtout là où l’on ne peut pas aller avec une échelle. Le drone atteint ces zones sans emprise au sol durable.',
    surfaces: ['Enduit monocouche', 'Crépi', 'Pierre calcaire (sur étude)', 'Brique', 'Bardage bois ou composite', 'Murs pignons'],
    benefits: [
      'Pas de nacelle ni d’échafaudage, donc pas d’autorisation de voirie longue.',
      'Accès aux pignons et étages élevés.',
      'Pression adaptée : un enduit ancien ou une pierre tendre se traitent en douceur.',
      'Chantier propre, zone balisée seulement le temps de l’intervention.',
    ],
    precautions: [
      'Une façade fissurée ou un enduit qui se décolle doit être réparé avant tout nettoyage.',
      'Les menuiseries doivent être fermées et étanches.',
      'Certaines pierres tendres demandent un essai préalable sur une petite zone.',
      'Le vol en milieu urbain dense peut être limité par l’environnement immédiat.',
    ],
    steps: [
      { title: 'Étude', text: 'Photos de la façade, nature du revêtement, hauteur et abords.' },
      { title: 'Essai', text: 'Si besoin, test sur une zone discrète pour régler la pression.' },
      { title: 'Nettoyage', text: 'Rinçage méthodique de haut en bas, bande par bande.' },
      { title: 'Rapport', text: 'Photos avant / après et préconisations d’entretien.' },
    ],
    sections: [
      {
        h2: 'Quelles salissures traiter sur une façade ?',
        body: [
          'Les traces les plus fréquentes sont les coulures noires dues à la pollution, les algues vertes ou rouges sur les façades peu ensoleillées, et les dépôts sous les débords de toit. Elles s’installent lentement et finissent par dégrader l’aspect du bâtiment.',
        ],
      },
      {
        h2: 'Pour qui ?',
        body: [
          'Particuliers, copropriétés, commerces et bâtiments d’entreprise. Pour un immeuble ou un bâtiment ouvert au public, nous organisons l’intervention pour limiter la gêne : créneaux adaptés et balisage au sol.',
        ],
      },
    ],
    faq: [
      { q: 'Le nettoyage par drone est-il aussi efficace qu’un nettoyage manuel ?', a: 'Pour le rinçage et l’élimination des salissures courantes, le résultat est comparable, avec un accès bien plus simple. Pour des taches incrustées ou un ravalement complet, une intervention traditionnelle peut rester nécessaire : nous vous le disons lors de l’étude.' },
      { q: 'L’eau risque-t-elle d’entrer dans le logement ?', a: 'Les fenêtres doivent être fermées. Nous vérifions avec vous les points sensibles (aérations, coffres de volets) avant de commencer.' },
      { q: 'Faut-il prévenir les voisins ?', a: 'Pour un vol en zone habitée, nous informons le voisinage immédiat si la configuration le demande et balisons la zone au sol.' },
    ],
    visual: 'facade',
    audience: ['particuliers', 'professionnels'],
  },
  {
    slug: 'nettoyage-bardage-drone',
    name: 'Bardage et bâtiments agricoles',
    h1: 'Nettoyage de bardage et de bâtiments agricoles par drone',
    title: 'Nettoyage de bardage et hangar agricole par drone',
    description:
      'Nettoyage de bardage métallique, hangars et bâtiments agricoles par drone. Grandes surfaces sans nacelle ni arrêt d’activité. Étude gratuite.',
    summary:
      'Le nettoyage de bardage par drone s’applique aux grandes parois métalliques ou composites des hangars, entrepôts et bâtiments agricoles, en hauteur et sans nacelle.',
    intro:
      'Les bardages et toitures de hangars représentent de grandes surfaces, souvent hautes et peu accessibles. Monter une nacelle autour d’un bâtiment en activité est long et contraignant. Le drone traite ces surfaces par bandes régulières, sans immobiliser vos accès.',
    surfaces: ['Bardage acier laqué', 'Panneaux sandwich', 'Bac acier en toiture', 'Fibrociment (sur étude, sans abrasion)', 'Silos et cuves (sur étude)'],
    benefits: [
      'Grandes surfaces traitées sans location de nacelle.',
      'Activité maintenue : zone balisée par secteurs.',
      'Interventions possibles hors des périodes de travaux agricoles.',
      'Inspection visuelle de la couverture au passage, photos à l’appui.',
    ],
    precautions: [
      'Les plaques en fibrociment anciennes peuvent contenir de l’amiante : aucun traitement abrasif, diagnostic à fournir.',
      'Les bâtiments d’élevage demandent une organisation spécifique (animaux, ventilation).',
      'Les toitures équipées de panneaux photovoltaïques font l’objet d’une étude séparée.',
    ],
    steps: [
      { title: 'Visite', text: 'Relevé des surfaces, matériaux, accès et contraintes d’exploitation.' },
      { title: 'Planning', text: 'Choix du créneau avec vous, découpage du chantier en secteurs.' },
      { title: 'Nettoyage', text: 'Traitement par bandes, secteur après secteur.' },
      { title: 'Bilan', text: 'Photos, observations sur l’état des surfaces, préconisations.' },
    ],
    sections: [
      {
        h2: 'Pourquoi entretenir un bardage ?',
        body: [
          'Un bardage encrassé vieillit plus vite : les dépôts retiennent l’humidité et favorisent la corrosion des fixations et des rives. L’image de l’entreprise en pâtit aussi, surtout pour un bâtiment visible depuis la route.',
        ],
      },
    ],
    faq: [
      { q: 'Intervenez-vous sur des toitures en fibrociment ?', a: 'Oui, sur étude et sans aucun procédé abrasif. Si les plaques sont anciennes, un diagnostic amiante est nécessaire avant toute intervention.' },
      { q: 'Pouvez-vous intervenir pendant l’activité ?', a: 'Oui, le chantier est découpé en secteurs balisés. Nous définissons ensemble les zones et horaires compatibles avec votre activité.' },
    ],
    visual: 'cladding',
    audience: ['professionnels', 'agricole'],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
