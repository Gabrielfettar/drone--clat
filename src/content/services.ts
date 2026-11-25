import type { FaqItem } from '@/components/ui/Faq';

/**
 * Catalogue des prestations. Ajouter une prestation = ajouter un objet ici :
 * la page /services/[slug]/, le sitemap, le sélecteur et le menu se mettent à jour.
 *
 * Règles de rédaction (docs/regulation.md, docs/market-research.md) :
 * pas de prix, pas de pourcentage d'économie, pas de « zéro risque », pas de promesse réglementaire,
 * pas d'allégation sur les produits. Le nettoyage se fait à l'eau ; tout traitement est décrit au conditionnel.
 */
export type Service = {
  slug: string;
  name: string;           // libellé court (menu, sélecteur)
  h1: string;
  title: string;          // <title> ≤ 46 caractères (le gabarit ajoute « · Drone Éclat », total ≤ 60)
  description: string;    // meta description ≤ 155 caractères
  lede: string;           // chapô de l'en-tête de page
  summary: string;        // 1 phrase, définition directe (extractible)
  intro: string[];
  surfaces: string[];
  benefits: string[];
  precautions: string[];
  steps: { title: string; text: string }[];
  sections: { h2: string; body: string[]; bullets?: string[] }[];
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
      'Démoussage et nettoyage de toiture par drone : sans échafaudage, sans marcher sur les tuiles. Devis gratuit sur photos, Oise et 200 km autour de Compiègne.',
    lede:
      'Mousses, lichens et salissures retirés depuis les airs, sans échafaudage et sans que personne ne marche sur vos tuiles. L’étude se fait à partir de vos photos, gratuitement.',
    summary:
      'Le démoussage par drone consiste à retirer mousses, lichens et salissures d’une toiture à l’aide d’un drone relié au sol, piloté par un télépilote, sans que personne ne monte sur la couverture.',
    intro: [
      'Les mousses retiennent l’humidité, soulèvent les tuiles et bouchent les gouttières. Les retirer impose d’habitude de monter sur le toit, avec un risque pour les tuiles et pour l’opérateur. Le drone travaille depuis les airs : la couverture n’est jamais piétinée.',
      'Concrètement, une unité de pompage installée au pied de la maison alimente le drone en eau par un tuyau. Le télépilote reste au sol, à vue, et rince chaque pan de toiture en bandes horizontales, du faîtage vers la gouttière. Une caméra embarquée permet de contrôler chaque passe.',
    ],
    surfaces: ['Tuile terre cuite', 'Tuile mécanique', 'Tuile béton', 'Ardoise naturelle', 'Ardoise fibrociment (sur étude)', 'Bac acier', 'Tuile canal (sur étude)'],
    benefits: [
      'Aucun passage sur la couverture : pas de tuile cassée ni déplacée par le piétinement.',
      'Pas d’échafaudage ni de nacelle à installer autour de la maison.',
      'Intervention courte, en général sur une journée pour une maison individuelle.',
      'Démarches de vol préparées par nous avant le chantier.',
      'Rapport photo avant / après remis à la fin de l’intervention.',
    ],
    precautions: [
      'Un toit très dégradé (tuiles poreuses, fissurées ou manquantes) doit passer par un couvreur avant tout nettoyage.',
      'La pression et la buse sont choisies selon le matériau : une ardoise ou un fibrociment ne se traitent pas comme une tuile béton.',
      'Les tuiles canal posées sans fixation peuvent bouger sous le souffle des hélices : elles font l’objet d’une étude spécifique.',
      'Le drone ne débouche pas les gouttières : un nettoyage manuel reste conseillé après le démoussage.',
      'Un éventuel traitement anti-mousse dépend du produit, de son étiquette et de la réglementation : il est proposé au cas par cas, jamais imposé.',
      'Le vol dépend de l’environnement : lignes électriques, arbres, zones aériennes réglementées, voisinage immédiat, météo.',
    ],
    steps: [
      { title: 'Étude', text: 'Vous envoyez photos et adresse. Nous vérifions matériau, pente, état de la couverture, abords et espace aérien.' },
      { title: 'Préparation', text: 'Démarches de vol, notification en préfecture lorsqu’elle est exigée, information du voisinage si nécessaire.' },
      { title: 'Nettoyage', text: 'Passes de haut en bas, bande par bande, pour que l’eau évacue les salissures vers les parties non traitées.' },
      { title: 'Contrôle', text: 'Vérification par caméra, photos avant / après et conseils d’entretien pour les années suivantes.' },
    ],
    sections: [
      {
        h2: 'Pourquoi démousser une toiture ?',
        body: [
          'La mousse agit comme une éponge. Elle garde l’eau contre la tuile, qui se dégrade plus vite sous l’effet du gel. Ses racines s’infiltrent entre les éléments et peuvent les soulever, ce qui ouvre la voie aux infiltrations.',
          'Les débris qu’elle libère s’accumulent dans les gouttières et les descentes d’eau pluviale. Un entretien régulier prolonge la durée de vie de la couverture et évite des réparations plus lourdes.',
        ],
      },
      {
        h2: 'Comment se passe un démoussage par drone ?',
        body: [
          'Le jour de l’intervention, nous installons l’unité de pompage au sol et balisons un périmètre de sécurité autour de la zone de vol. Personne ne doit s’y trouver pendant le vol, ni dans le jardin ni sur le trottoir.',
          'Le drone se positionne face au pan de toiture, à distance de la couverture. Le télépilote travaille en bandes horizontales qui se chevauchent, en partant du faîtage : l’eau entraîne les salissures vers les zones pas encore traitées, et rien ne se redépose sur ce qui est propre.',
        ],
        bullets: [
          'Fenêtres et velux fermés, véhicules déplacés hors de la zone balisée.',
          'Récupérateur d’eau de pluie déconnecté pendant l’intervention.',
          'Plantations fragiles et mobilier de jardin protégés ou rentrés.',
        ],
      },
      {
        h2: 'Drone ou couvreur : que choisir ?',
        body: [
          'Le drone est adapté au nettoyage et à l’entretien d’une couverture saine. Il ne remplace pas un couvreur pour changer des tuiles, reprendre un faîtage, traiter une fuite ou brosser des mousses très épaisses.',
          'Lors de l’étude, si nous constatons des tuiles cassées ou une couverture fragile, nous vous le disons et vous orientons vers un couvreur plutôt que d’intervenir. Les deux métiers sont complémentaires : réparer d’abord, entretenir ensuite.',
        ],
      },
      {
        h2: 'Quand démousser sa toiture ?',
        body: [
          'La fréquence dépend de l’exposition : un pan orienté au nord, une toiture sous les arbres ou proche d’une rivière se couvre plus vite. Un contrôle visuel régulier permet d’intervenir avant que la mousse ne s’installe en profondeur.',
          'Le drone vole par temps sec et vent faible. Les périodes douces de l’année sont souvent les plus favorables ; en zone habitée, comptez aussi le délai des démarches de vol, d’environ deux semaines selon la commune.',
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
      { q: 'Le drone peut-il abîmer mes tuiles ?', a: 'Le drone ne touche pas la toiture et personne ne marche dessus. La pression est réglée selon le matériau et reste basse sur les surfaces fragiles. Si la couverture est déjà endommagée, nous le signalons avant toute intervention.' },
      { q: 'Faut-il être présent le jour de l’intervention ?', a: 'Ce n’est pas obligatoire si l’accès au terrain est possible. Il faut en revanche fermer fenêtres et velux, rentrer les véhicules et laisser libre la zone au sol que nous balisons.' },
      { q: 'Combien de temps dure le démoussage d’une maison ?', a: 'Pour une maison individuelle, l’intervention tient en général sur une journée, préparation comprise. Le délai exact est indiqué dans le devis.' },
      { q: 'À quelle fréquence faut-il démousser ?', a: 'Cela dépend de l’exposition et de l’environnement (arbres, orientation nord, humidité). Un contrôle tous les 2 à 5 ans est une base courante, à adapter à votre toiture.' },
      { q: 'Le drone nettoie-t-il aussi les gouttières ?', a: 'Non. Le rinçage entraîne une partie des débris vers les gouttières, mais il ne les débouche pas. Nous vous indiquons dans le rapport si un nettoyage manuel est conseillé.' },
      { q: 'Pourquoi faut-il parfois attendre deux semaines ?', a: 'En zone habitée, un vol professionnel doit être notifié à l’avance à la préfecture. Ce délai est intégré au planning que nous vous proposons dans le devis.' },
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
    lede:
      'Coulures noires, verdissement des murs au nord, dépôts de pollution : nous rinçons vos murs en hauteur sans nacelle ni échafaudage, avec une pression adaptée au revêtement.',
    summary:
      'Le nettoyage de façade par drone permet de rincer et nettoyer les murs extérieurs d’un bâtiment en hauteur, sans nacelle ni échafaudage, avec une pression adaptée au revêtement.',
    intro: [
      'Coulures noires sous les appuis de fenêtre, verdissement sur les façades nord, pollution urbaine : les façades se salissent surtout là où l’on ne peut pas aller avec une échelle. Le drone atteint ces zones sans emprise au sol durable.',
      'L’intervention est un nettoyage, pas un ravalement : nous retirons les salissures de surface en respectant le revêtement. Lorsqu’un enduit se décolle ou qu’une fissure apparaît, nous vous orientons vers un façadier.',
    ],
    surfaces: ['Enduit monocouche', 'Crépi', 'Brique', 'Pierre calcaire (sur étude)', 'Bardage bois ou composite', 'Murs pignons'],
    benefits: [
      'Pas de nacelle ni d’échafaudage : pas d’emprise durable sur le trottoir ou la chaussée.',
      'Accès aux pignons et aux étages élevés, difficiles à atteindre à l’échelle.',
      'Pression adaptée : un enduit ancien ou une pierre tendre se traitent en douceur.',
      'Chantier propre, zone balisée seulement le temps de l’intervention.',
    ],
    precautions: [
      'Une façade fissurée ou un enduit qui se décolle doit être réparé avant tout nettoyage.',
      'Les menuiseries, aérations et coffres de volets doivent être fermés et étanches.',
      'Certaines pierres tendres demandent un essai préalable sur une petite zone discrète.',
      'Si la zone à baliser déborde sur la voie publique, une autorisation de la mairie peut être nécessaire.',
      'En centre-ville dense, l’environnement immédiat (rues étroites, câbles, passage) peut limiter le vol.',
    ],
    steps: [
      { title: 'Étude', text: 'Photos de la façade, nature du revêtement, hauteur, abords et circulation au pied du mur.' },
      { title: 'Essai', text: 'Si besoin, test sur une zone discrète pour régler la pression et vérifier le comportement du support.' },
      { title: 'Nettoyage', text: 'Rinçage méthodique de haut en bas, bande par bande, menuiseries fermées.' },
      { title: 'Rapport', text: 'Photos avant / après et préconisations d’entretien.' },
    ],
    sections: [
      {
        h2: 'Quelles salissures traiter sur une façade ?',
        body: [
          'Les traces les plus fréquentes sont les coulures noires dues à la pollution et au ruissellement, les algues vertes ou rouges sur les façades peu ensoleillées, et les dépôts sous les débords de toit. Elles s’installent lentement et finissent par dégrader l’aspect du bâtiment.',
          'Un rinçage à pression adaptée retire la plupart de ces salissures de surface. Les taches très incrustées, les graffitis ou les peintures écaillées relèvent d’autres techniques : nous vous le disons lors de l’étude.',
        ],
      },
      {
        h2: 'Nettoyage ou ravalement : quelle différence ?',
        body: [
          'Le nettoyage redonne de l’éclat à une façade saine. Le ravalement est un chantier de rénovation : reprise des fissures, de l’enduit, parfois mise en peinture. Il peut être soumis à déclaration en mairie selon la commune.',
          'Le drone intervient pour le nettoyage. Il peut aussi précéder un ravalement en permettant de mieux voir l’état réel du support une fois les salissures retirées.',
        ],
      },
      {
        h2: 'Pour qui ?',
        body: [
          'Particuliers, copropriétés, commerces et bâtiments d’entreprise. Pour un immeuble ou un bâtiment ouvert au public, nous organisons l’intervention pour limiter la gêne : créneaux adaptés, balisage au sol et information des occupants.',
        ],
      },
    ],
    faq: [
      { q: 'Le nettoyage par drone est-il aussi efficace qu’un nettoyage manuel ?', a: 'Pour le rinçage et l’élimination des salissures courantes, le résultat est comparable, avec un accès bien plus simple. Pour des taches incrustées ou un ravalement complet, une intervention traditionnelle peut rester nécessaire : nous vous le disons lors de l’étude.' },
      { q: 'L’eau risque-t-elle d’entrer dans le logement ?', a: 'Les fenêtres doivent être fermées. Nous vérifions avec vous les points sensibles (aérations, coffres de volets, joints de menuiserie) avant de commencer.' },
      { q: 'Peut-on nettoyer une façade en pierre ?', a: 'Oui, sur étude. Certaines pierres calcaires sont tendres : nous faisons d’abord un essai sur une zone discrète, à basse pression, avant de traiter toute la façade.' },
      { q: 'Faut-il prévenir les voisins ?', a: 'Pour un vol en zone habitée, nous informons le voisinage immédiat si la configuration le demande et balisons la zone au sol le temps de l’intervention.' },
    ],
    visual: 'facade',
    audience: ['particuliers', 'professionnels'],
  },
  {
    slug: 'nettoyage-bardage-drone',
    name: 'Bardage et bâtiments agricoles',
    h1: 'Nettoyage de bardage et de bâtiments agricoles par drone',
    title: 'Nettoyage de bardage et hangars par drone',
    description:
      'Nettoyage de bardage métallique, hangars et bâtiments agricoles par drone. Grandes surfaces sans nacelle ni arrêt d’activité. Devis gratuit.',
    lede:
      'Hangars, entrepôts, bâtiments d’élevage : les grandes parois et toitures métalliques nettoyées secteur par secteur, sans nacelle dans la cour et sans arrêter l’activité.',
    summary:
      'Le nettoyage de bardage par drone s’applique aux grandes parois métalliques ou composites des hangars, entrepôts et bâtiments agricoles, en hauteur et sans nacelle.',
    intro: [
      'Les bardages et toitures de hangars représentent de grandes surfaces, souvent hautes et peu accessibles. Monter une nacelle autour d’un bâtiment en activité est long et contraignant. Le drone traite ces surfaces par bandes régulières, sans immobiliser vos accès.',
      'Le chantier est découpé en secteurs : seule la zone en cours de traitement est balisée, le reste du site continue de fonctionner. Les créneaux sont définis avec vous, en tenant compte des livraisons, des animaux ou des travaux des champs.',
    ],
    surfaces: ['Bardage acier laqué', 'Panneaux sandwich', 'Bac acier en toiture', 'Bardage bois', 'Fibrociment (sur étude, sans abrasion)', 'Silos et cuves (sur étude)'],
    benefits: [
      'Grandes surfaces traitées sans location ni circulation de nacelle.',
      'Activité maintenue : zone balisée par secteurs, accès principaux préservés.',
      'Interventions planifiées hors des périodes chargées de l’exploitation.',
      'Observations visuelles sur l’état des surfaces, photos à l’appui.',
    ],
    precautions: [
      'Les plaques en fibrociment anciennes peuvent contenir de l’amiante : aucun procédé abrasif, repérage amiante à fournir avant intervention.',
      'Les bâtiments d’élevage demandent une organisation spécifique : animaux, ventilation, eaux de rinçage.',
      'Les toitures équipées de panneaux photovoltaïques font l’objet d’une étude séparée, selon les préconisations du fabricant.',
      'Sur un site industriel ou classé, les règles internes du site (plan de prévention, gestion des eaux) s’appliquent.',
    ],
    steps: [
      { title: 'Visite', text: 'Relevé des surfaces, matériaux, accès et contraintes d’exploitation, sur photos ou sur place.' },
      { title: 'Planning', text: 'Choix des créneaux avec vous, découpage du chantier en secteurs, documents de sécurité.' },
      { title: 'Nettoyage', text: 'Traitement par bandes, secteur après secteur, balisage déplacé au fil du chantier.' },
      { title: 'Bilan', text: 'Photos, observations sur l’état des surfaces et préconisations d’entretien.' },
    ],
    sections: [
      {
        h2: 'Pourquoi entretenir un bardage ?',
        body: [
          'Un bardage encrassé vieillit plus vite : les dépôts retiennent l’humidité et favorisent la corrosion des fixations, des rives et des recouvrements. L’image de l’entreprise en pâtit aussi, surtout pour un bâtiment visible depuis la route.',
          'Un nettoyage périodique permet aussi d’observer l’état du revêtement : rayures, points de rouille, joints défaillants. Ces constats figurent dans le bilan photo remis en fin de chantier.',
        ],
      },
      {
        h2: 'Fibrociment et amiante : la règle avant tout',
        body: [
          'Beaucoup de hangars agricoles et de bâtiments anciens sont couverts de plaques en fibrociment. Si elles datent d’avant l’interdiction de l’amiante, un nettoyage agressif peut libérer des fibres dangereuses pour la santé.',
          'Nous ne pratiquons aucun procédé abrasif sur ces supports et demandons un repérage amiante avant toute intervention. Si le support ne s’y prête pas, nous refusons le chantier et vous l’expliquons.',
        ],
      },
      {
        h2: 'Bâtiments agricoles : un calendrier qui suit l’exploitation',
        body: [
          'Récoltes, semis, présence des animaux : nous planifions l’intervention avec vous pour qu’elle ne tombe pas au mauvais moment. Le drone évite de faire circuler une nacelle dans la cour ou entre les bâtiments.',
        ],
        bullets: [
          'Stabulations et bâtiments d’élevage : organisation adaptée à la présence des animaux.',
          'Hangars de stockage : intervention possible secteur par secteur, accès maintenus.',
          'Silos et cuves : sur étude, selon la hauteur et l’environnement.',
        ],
      },
    ],
    faq: [
      { q: 'Intervenez-vous sur des toitures en fibrociment ?', a: 'Oui, sur étude et sans aucun procédé abrasif. Si les plaques sont anciennes, un repérage amiante est nécessaire avant toute intervention.' },
      { q: 'Pouvez-vous intervenir pendant l’activité ?', a: 'Oui, le chantier est découpé en secteurs balisés. Nous définissons ensemble les zones et les horaires compatibles avec votre activité.' },
      { q: 'Quelles informations fournir pour l’étude ?', a: 'L’adresse du site, des photos de chaque face du bâtiment, la nature du bardage ou de la couverture si vous la connaissez, les contraintes d’accès et les périodes à éviter.' },
      { q: 'Proposez-vous un contrat d’entretien ?', a: 'Un contrat pluriannuel est possible sur étude, pour les sites qui demandent un entretien régulier. Son contenu et sa fréquence sont définis avec vous.' },
    ],
    visual: 'cladding',
    audience: ['professionnels', 'agricole'],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
