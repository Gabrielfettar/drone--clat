/**
 * Journal. Règles éditoriales (docs/seo-strategy.md, docs/regulation.md) :
 * - aucun chiffre non sourcé, aucun prix, aucun avis inventé ;
 * - réglementation : formulations prudentes, sources officielles, date de mise à jour visible ;
 * - chaque article renvoie vers un service et vers la demande d'étude.
 */
import type { FaqItem } from '@/components/ui/Faq';

export type ArticleSection = { h2: string; paragraphs: string[]; list?: string[] };

export type Article = {
  slug: string;
  title: string;
  /** Title SEO (≤ 60 caractères) si le titre éditorial est plus long. */
  metaTitle?: string;
  description: string;
  /** Date de publication, AAAA-MM-JJ. */
  date: string;
  /** Date de dernière mise à jour, AAAA-MM-JJ. */
  updated?: string;
  readingMinutes: number;
  category: 'Conseils' | 'Saisons' | 'Réglementation';
  excerpt: string;
  body: ArticleSection[];
  faq?: FaqItem[];
  sources?: { label: string; url: string }[];
  /** Liens internes mis en avant en fin d'article. */
  links?: { href: string; label: string }[];
};

export const articles: Article[] = [
  {
    slug: 'drone-ou-couvreur-demoussage',
    title: 'Démoussage de toiture : drone ou couvreur, comment choisir ?',
    metaTitle: 'Démoussage de toiture : drone ou couvreur ?',
    description: 'Drone ou couvreur pour démousser votre toiture ? Ce que chacun fait, ce que le drone ne fait pas, les cas où le couvreur s’impose et les questions à poser.',
    date: '2026-11-25',
    readingMinutes: 6,
    category: 'Conseils',
    excerpt: 'Le drone entretient une couverture saine sans monter sur le toit. Le couvreur répare. Voici comment savoir de qui votre toiture a besoin, et pourquoi les deux se complètent souvent.',
    body: [
      {
        h2: 'La réponse courte',
        paragraphs: [
          'Un drone de nettoyage est fait pour entretenir une couverture en bon état : retirer les mousses, les lichens et les salissures sans que personne ne monte sur le toit. Un couvreur est indispensable dès qu’il faut réparer, remplacer ou reprendre l’étanchéité.',
          'La vraie question n’est donc pas « lequel est le meilleur ? », mais « de quoi ma toiture a-t-elle besoin ? ». Si elle est simplement encrassée, le drone est une option sérieuse. Si elle présente des désordres, c’est le couvreur qu’il faut appeler en premier. Et dans bien des cas, les deux interviennent l’un après l’autre.',
        ],
      },
      {
        h2: 'Ce que fait un drone de nettoyage',
        paragraphs: [
          'Le drone travaille depuis les airs, piloté par un télépilote qui reste au sol. Selon les modèles, il est alimenté en eau par un tuyau relié à une unité au sol ou il embarque un réservoir. Il rince la toiture par passes successives, en général de haut en bas, pour que les salissures soient entraînées vers les zones pas encore traitées.',
          'Son principal atout est d’éviter le passage sur la couverture. Les tuiles anciennes, les ardoises et certains supports fragiles supportent mal qu’on marche dessus : chaque pas est un risque de casse. Le drone supprime aussi l’installation d’un échafaudage ou d’une nacelle, et surtout l’exposition d’une personne au risque de chute.',
        ],
        list: [
          'Rinçage à l’eau, avec une pression réglée selon le matériau.',
          'Application d’un traitement anti-mousse, lorsque le produit, son étiquette et le cadre réglementaire le permettent.',
          'Contrôle visuel par caméra pendant le travail, utile pour vérifier chaque passe.',
          'Photos avant / après pour documenter l’état de la toiture.',
        ],
      },
      {
        h2: 'Ce que le drone ne fait pas',
        paragraphs: [
          'Il faut être clair sur ce point, car c’est là que naissent les déceptions : un drone n’a pas de mains. Il ne remplace pas une tuile, ne refait pas un faîtage et ne trouve pas l’origine d’une fuite. Un prestataire honnête vous le dira avant de vous vendre un nettoyage.',
        ],
        list: [
          'Remplacer des tuiles ou des ardoises cassées, fêlées ou glissées.',
          'Reprendre un faîtage, des solins, une noue ou un raccord de cheminée.',
          'Traiter une infiltration ou une trace d’humidité dans les combles.',
          'Gratter ou brosser à la main une mousse très épaisse et compacte : un rinçage peut ne pas suffire, un brossage préalable peut être nécessaire.',
          'Curer en profondeur des gouttières obstruées, qui se nettoient généralement à la main.',
          'Juger de l’état de la charpente ou de l’isolation.',
        ],
      },
      {
        h2: 'Les cas où le couvreur s’impose',
        paragraphs: [
          'Certains signes doivent vous orienter d’abord vers un couvreur. Nettoyer une toiture abîmée ne la répare pas, et un rinçage sur des tuiles poreuses ou fendues peut même aggraver une infiltration existante.',
        ],
        list: [
          'Tuiles cassées, poreuses, qui s’effritent ou qui ont bougé.',
          'Taches d’humidité au plafond, dans les combles ou le long d’un conduit.',
          'Faîtage, solins ou rives visiblement dégradés.',
          'Couverture en fin de vie, où un nettoyage ne ferait que retarder une réfection inévitable.',
          'Plaques de fibrociment anciennes, fréquentes sur les bâtiments agricoles : elles peuvent contenir de l’amiante. Un repérage est obligatoire avant travaux, et un nettoyage à haute pression est à proscrire tant que ce point n’est pas éclairci.',
        ],
      },
      {
        h2: 'Les cas où le drone est pertinent',
        paragraphs: [
          'Le drone prend tout son sens quand la couverture est saine mais encrassée, et que l’accès en hauteur est coûteux, risqué ou dommageable pour les matériaux. C’est souvent le cas des grandes surfaces (hangars, bâtiments d’activité, copropriétés), des toitures fragiles sur lesquelles on évite de marcher, et des façades ou pignons hauts qui demanderaient sinon une nacelle.',
          'Il faut toutefois un peu de place au sol : une zone de sécurité balisée autour du bâtiment, un emplacement pour l’unité au sol et, idéalement, un point d’eau accessible. Une étude préalable permet de vérifier que ces conditions sont réunies.',
        ],
      },
      {
        h2: 'Les contraintes propres au drone',
        paragraphs: [
          'Le drone a ses propres limites, qu’il vaut mieux connaître avant de choisir. Elles n’ont rien de rédhibitoire, mais elles influencent le délai et la faisabilité.',
        ],
        list: [
          'La météo : vent soutenu ou pluie imposent de reporter le vol.',
          'L’espace aérien : à proximité d’un aérodrome ou de certaines zones protégées, le vol peut être restreint ou soumis à des démarches particulières.',
          'Les démarches : en agglomération, un vol de ce type doit en principe être notifié au préfet plusieurs jours à l’avance. Une intervention se planifie donc, elle ne s’improvise pas le lendemain.',
          'Les obstacles : lignes électriques, arbres en surplomb, antennes ou panneaux solaires sont pris en compte dans l’étude.',
          'Le voisinage : la zone au sol doit rester libre de toute personne non impliquée pendant le vol, ce qui suppose parfois d’informer ou de coordonner avec les voisins.',
        ],
      },
      {
        h2: 'Drone et couvreur : souvent complémentaires',
        paragraphs: [
          'Dans la pratique, les deux métiers se répondent. Une inspection photo par drone peut révéler des tuiles déplacées : le couvreur intervient d’abord pour les remettre en place, puis la toiture est nettoyée. À l’inverse, un couvreur qui refait une partie de la couverture peut recommander un nettoyage du reste pour homogénéiser l’ensemble.',
          'C’est la position de Drone Éclat : quand une toiture a besoin d’un couvreur plutôt que d’un drone, nous le disons, et nous orientons vers un professionnel de la couverture plutôt que de proposer un nettoyage qui ne résoudrait rien.',
        ],
      },
      {
        h2: 'Les questions à poser, quel que soit le prestataire',
        paragraphs: [
          'Que vous choisissiez un drone ou un couvreur, un devis sérieux se reconnaît à sa précision. Prenez le temps de comparer, et méfiez-vous d’un diagnostic alarmiste posé au pas de la porte, sans photo ni explication.',
        ],
        list: [
          'Que comprend exactement le devis : surface, méthode, nombre de passages, évacuation des déchets ?',
          'Quel produit est utilisé, s’il y en a un ? Son nom, son type et ses conditions d’emploi doivent pouvoir vous être communiqués.',
          'Pour un drone : quel est le numéro d’exploitant enregistré auprès de la DGAC, et dans quel cadre le vol est-il réalisé ?',
          'Quelles assurances couvrent l’intervention ? Pour un drone, l’activité aérienne et la pulvérisation doivent être couvertes ; pour des travaux de couverture, renseignez-vous sur la garantie décennale.',
          'Des photos avant / après vous seront-elles remises ?',
          'Que se passe-t-il si la météo empêche l’intervention le jour prévu ?',
        ],
      },
    ],
    faq: [
      { q: 'Un drone peut-il abîmer les tuiles ?', a: 'Le drone ne marche pas sur la toiture, ce qui supprime le risque de casse par piétinement. Le jet, en revanche, doit être réglé selon le matériau : une pression excessive peut dégrader la surface de certaines tuiles, quel que soit l’outil utilisé. C’est un point à aborder lors de l’étude.' },
      { q: 'Le démoussage par drone est-il moins cher que par un couvreur ?', a: 'Cela dépend de la surface, de l’accès, de l’état de la toiture et des démarches nécessaires. Le drone évite l’échafaudage ou la nacelle, mais mobilise un matériel et des démarches spécifiques. Le plus fiable reste de comparer des devis détaillés pour votre bâtiment.' },
      { q: 'Faut-il faire inspecter la toiture avant un démoussage ?', a: 'Oui, c’est recommandé. Des photos ou une vue aérienne permettent de repérer les tuiles abîmées, la présence éventuelle de fibrociment ou les obstacles, et de savoir si un couvreur doit intervenir avant tout nettoyage.' },
    ],
    links: [
      { href: '/services/demoussage-toiture-drone/', label: 'Le démoussage de toiture par drone' },
      { href: '/technologie/', label: 'Notre matériel et ses limites' },
      { href: '/realisations/', label: 'Comment nous documentons un chantier' },
    ],
  },

  {
    slug: 'quand-demousser-toiture-oise',
    title: 'Quand démousser sa toiture dans l’Oise ?',
    metaTitle: 'Quand démousser sa toiture dans l’Oise ?',
    description: 'Printemps, été, automne ou hiver : quand démousser sa toiture dans l’Oise ? Météo, gel, vent, délais de planification et signes qui doivent vous alerter.',
    date: '2026-11-25',
    readingMinutes: 5,
    category: 'Saisons',
    excerpt: 'Il n’y a pas de date idéale gravée dans le marbre, mais des conditions à réunir. Saison par saison, ce qu’il faut savoir pour planifier un démoussage dans le climat humide de l’Oise.',
    body: [
      {
        h2: 'En bref',
        paragraphs: [
          'Il n’existe pas de date unique pour démousser une toiture. Ce qui compte, ce sont les conditions du jour : pas de gel, pas de forte chaleur, pas de vent soutenu, et, si un traitement est appliqué, une période sans pluie suffisamment longue après l’application.',
          'Ces conditions se rencontrent le plus souvent au printemps et au début de l’automne. Mais une belle journée de fin d’hiver peut convenir, et une semaine de mai pluvieuse peut tout décaler. Le calendrier donne une tendance ; la météo décide.',
        ],
      },
      {
        h2: 'Pourquoi les mousses se plaisent dans l’Oise',
        paragraphs: [
          'Mousses et lichens ont besoin d’humidité persistante et d’un ensoleillement limité. L’Oise, au climat de type océanique, connaît des pluies réparties sur toute l’année : les toitures y sèchent parfois lentement, surtout en saison froide.',
          'Autour de Compiègne, plusieurs facteurs locaux s’ajoutent. Les fonds de vallée, comme ceux de l’Oise et de l’Aisne, gardent souvent l’humidité plus longtemps. Les massifs forestiers du département (forêts de Compiègne, de Laigue, d’Halatte ou de Chantilly) entretiennent un air humide et apportent ombre et débris végétaux aux maisons situées en lisière.',
          'À l’échelle de votre maison, regardez surtout l’orientation et l’environnement immédiat. Les signes ci-dessous sont des tendances générales, pas des règles absolues.',
        ],
        list: [
          'Le versant exposé au nord sèche moins vite et verdit souvent en premier.',
          'Un arbre en surplomb apporte ombre, feuilles et humidité.',
          'Une toiture à faible pente évacue l’eau plus lentement.',
          'Les tuiles plus poreuses ou plus anciennes retiennent davantage l’humidité.',
        ],
      },
      {
        h2: 'Saison par saison',
        paragraphs: [
          'Au printemps, les températures remontent et les gelées se raréfient. C’est un bon moment pour nettoyer ce qui s’est accumulé pendant l’hiver, à condition de trouver une fenêtre sans giboulées. C’est aussi une période très demandée : mieux vaut s’y prendre tôt.',
          'En été, le rinçage à l’eau reste possible, mais deux points demandent de la vigilance. D’une part, un traitement appliqué en plein soleil sur une toiture brûlante peut sécher trop vite : l’étiquette du produit précise généralement les températures et conditions d’application. D’autre part, en période de sécheresse, des arrêtés préfectoraux peuvent restreindre certains usages de l’eau, dont le nettoyage des façades et des toitures. La situation de votre commune se consulte sur le site officiel VigiEau.',
          'En automne, le temps reste souvent doux et les mousses, qui reprennent leur croissance avec le retour de l’humidité, sont bien visibles. Les fenêtres sèches deviennent plus rares à mesure que la saison avance. Après la chute des feuilles, c’est aussi le moment de faire vérifier les gouttières.',
          'En hiver, le démoussage est généralement déconseillé. L’eau de rinçage peut geler sur la couverture, les produits ont souvent une température minimale d’application, et les journées courtes réduisent le temps de travail. Une journée douce et sèche peut faire exception pour un simple rinçage, au cas par cas.',
        ],
      },
      {
        h2: 'La météo du jour compte plus que le calendrier',
        paragraphs: [
          'Une intervention se confirme au vu des prévisions des jours qui précèdent. Pour un démoussage par drone, plusieurs paramètres sont examinés.',
        ],
        list: [
          'Le vent : il conditionne la stabilité du vol et la dérive des gouttelettes vers les propriétés voisines.',
          'La pluie : elle gêne le travail et, après un traitement, peut lessiver le produit avant qu’il n’agisse. Les étiquettes indiquent un délai minimal sans pluie.',
          'Le gel : à éviter sur la toiture le jour même et la nuit suivante.',
          'La température : ni trop froide, ni trop chaude, dans la plage indiquée par le fabricant du produit éventuel.',
          'L’état du support : certains produits s’appliquent sur support sec, d’autres non. C’est l’étiquette qui fait foi.',
        ],
      },
      {
        h2: 'Anticiper les délais',
        paragraphs: [
          'Un démoussage par drone ne se décide pas la veille. Il y a d’abord l’étude, à partir de photos ou d’une vue aérienne. Il y a ensuite les démarches : en agglomération, un vol de ce type doit en principe être notifié au préfet plusieurs jours ouvrables à l’avance. Il faut enfin trouver la bonne fenêtre météo.',
          'En pratique, si vous visez le printemps, prenez contact à la fin de l’hiver. Si vous visez l’automne, la fin de l’été est un bon moment. Gardez de la souplesse sur la date exacte : un report pour cause de vent ou de pluie fait partie du métier, et il vaut mieux décaler que mal faire.',
        ],
      },
      {
        h2: 'À quelle fréquence démousser ?',
        paragraphs: [
          'Il n’y a pas de fréquence universelle. Elle dépend de l’exposition, du matériau, de l’environnement et de l’éventuel traitement préventif réalisé. Une toiture dégagée et bien exposée peut rester propre longtemps ; une toiture en lisière de forêt, orientée au nord, verdira plus vite.',
          'Plutôt que de suivre un calendrier fixe, prenez l’habitude d’observer votre toit une fois par an, par exemple après l’automne. Les signes suivants indiquent qu’il est temps d’agir.',
        ],
        list: [
          'Des coussinets de mousse dans le bas des tuiles ou entre elles.',
          'Des taches de lichen, grises, jaunes ou orangées, qui s’étendent.',
          'Des traînées vertes ou noires sur la couverture ou les façades.',
          'Des gouttières qui débordent par temps de pluie.',
          'Des débris de mousse au pied des descentes d’eau pluviale.',
        ],
      },
      {
        h2: 'Et après le démoussage ?',
        paragraphs: [
          'Selon la méthode, les mousses peuvent se détacher immédiatement au rinçage ou progressivement, au fil des pluies, après un traitement. Le résultat final ne se juge donc pas toujours le jour même : un nouveau coup d’œil quelques semaines plus tard est utile.',
          'Si vous récupérez l’eau de pluie, signalez-le avant l’intervention : après un traitement, il est en général nécessaire de dériver la descente vers le réseau pendant la durée indiquée par l’étiquette du produit. Pensez aussi à protéger les plantations, les bassins et le potager situés sous les gouttières.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on démousser une toiture en hiver ?', a: 'C’est généralement déconseillé à cause du gel, des journées courtes et des températures minimales d’application des produits. Une journée douce et sèche peut convenir pour un simple rinçage, à décider au cas par cas.' },
      { q: 'Faut-il attendre que la toiture soit sèche ?', a: 'Cela dépend de la méthode. Pour un rinçage à l’eau, ce n’est pas indispensable. Pour un traitement, c’est l’étiquette du produit qui précise s’il doit être appliqué sur support sec ou humide, et combien de temps sans pluie il faut ensuite.' },
      { q: 'Combien de temps à l’avance faut-il réserver ?', a: 'Comptez le temps de l’étude, des démarches de vol (notification préalable en agglomération) et de la recherche d’une fenêtre météo. Prendre contact quelques semaines avant la période visée laisse une marge confortable.' },
    ],
    sources: [
      { label: 'VigiEau : restrictions d’eau en vigueur dans votre commune', url: 'https://vigieau.gouv.fr' },
    ],
    links: [
      { href: '/services/demoussage-toiture-drone/', label: 'Le démoussage de toiture par drone' },
      { href: '/zones-intervention/', label: 'Nos zones d’intervention' },
      { href: '/#preparer', label: 'Préparer le jour de l’intervention' },
    ],
  },

  {
    slug: 'drone-reglementation-survol-maison',
    title: 'Drone au-dessus de chez vous : ce que dit la réglementation',
    metaTitle: 'Drone de nettoyage : ce que dit la réglementation',
    description: 'Catégorie spécifique, exploitant enregistré, préfecture, vie privée, produits : le cadre d’un drone de nettoyage au-dessus d’une maison, sources à l’appui.',
    date: '2026-11-25',
    updated: '2026-11-25',
    readingMinutes: 6,
    category: 'Réglementation',
    excerpt: 'Un drone qui nettoie une toiture n’est pas un drone de loisir. Ce que prévoit le cadre européen et français, comment vérifier un prestataire, et ce qui reste incertain.',
    body: [
      {
        h2: 'Ce qu’il faut retenir',
        paragraphs: [
          'Un drone qui pulvérise de l’eau sur une toiture ne vole pas comme un drone de loisir. Il relève d’un cadre professionnel plus exigeant : exploitant enregistré, télépilote formé, vol déclaré ou autorisé, notification préalable en agglomération, chantier balisé. Les produits éventuellement pulvérisés obéissent, eux, à leurs propres règles.',
          'Cet article résume ce cadre à la date de sa mise à jour, à partir de sources officielles listées en bas de page. Ce n’est pas un avis juridique : la réglementation évolue, et certains points restent à préciser par les autorités.',
        ],
      },
      {
        h2: 'Pourquoi un drone de nettoyage n’est pas un drone de loisir',
        paragraphs: [
          'Le règlement européen (UE) 2019/947 distingue trois catégories d’exploitation : ouverte, spécifique et certifiée. La catégorie ouverte, celle des usages les plus simples, impose notamment que le drone ne largue aucune matière pendant le vol.',
          'Or pulvériser de l’eau ou un produit, c’est larguer de la matière. Un drone de nettoyage sort donc forcément de la catégorie ouverte : il relève de la catégorie spécifique, qui exige une évaluation des risques et des démarches préalables.',
        ],
      },
      {
        h2: 'Les cadres possibles en catégorie spécifique',
        paragraphs: [
          'En catégorie spécifique, l’exploitant vole soit sous une déclaration conforme à un scénario standard européen, soit avec une autorisation d’exploitation délivrée par la Direction de la sécurité de l’aviation civile (DSAC).',
          'Les anciens scénarios nationaux français ont pris fin le 1er janvier 2026. Un prestataire qui s’en réclame aujourd’hui s’appuie sur un cadre qui n’existe plus.',
        ],
        list: [
          'Le scénario standard STS-01 : vol à vue, au-dessus d’une zone au sol contrôlée, avec un drone portant le marquage de classe C5 et une masse maximale au décollage de 25 kg au plus, sans marchandise dangereuse à bord. Il passe par une déclaration.',
          'L’autorisation d’exploitation de la DSAC, fondée sur un scénario prédéfini (PDRA) ou sur une analyse de risques complète (SORA). C’est souvent la voie nécessaire pour les drones de nettoyage plus lourds ou non classés.',
        ],
      },
      {
        h2: 'Côté exploitant et télépilote',
        paragraphs: [
          'Avant toute activité, l’exploitant doit être enregistré sur AlphaTango, le portail de la DGAC. Le numéro d’exploitant obtenu doit être apposé sur le drone. Les drones concernés doivent aussi disposer d’un dispositif de signalement électronique.',
          'Le télépilote doit justifier de compétences adaptées : pour le scénario STS-01, le certificat théorique CATS et une formation pratique ; pour une autorisation, les compétences fixées par celle-ci. L’exploitant tient un manuel d’exploitation qui décrit ses procédures, et doit être assuré pour les dommages que son activité pourrait causer.',
        ],
      },
      {
        h2: 'Voler au-dessus d’une maison : notification et zones',
        paragraphs: [
          'Un vol en agglomération, ou à proximité immédiate, est considéré comme un vol en zone peuplée. En catégorie spécifique, il doit être notifié au préfet du département avant sa réalisation, via AlphaTango ou par formulaire. Le texte de référence (arrêté du 3 décembre 2020, article 6) prévoit un préavis de dix jours ouvrables, à vérifier dans sa version en vigueur. Le préfet peut interdire ou restreindre le vol.',
          'Indépendamment de cette notification, certaines zones sont soumises à des restrictions : abords des aérodromes, emprises militaires, zones où la prise de vue aérienne est interdite. Elles se vérifient avant chaque mission, notamment sur la carte des restrictions publiée sur le Géoportail.',
        ],
      },
      {
        h2: 'Le chantier : périmètre et voisins',
        paragraphs: [
          'Pendant le vol, la zone au sol survolée et sa zone tampon doivent rester libres de toute personne non impliquée dans l’opération. Concrètement, le chantier est balisé, et il faut parfois demander aux voisins de ne pas utiliser leur jardin pendant quelques instants ou neutraliser une portion de trottoir.',
        ],
        list: [
          'Si le périmètre empiète sur la voie publique, une autorisation d’occupation de la voirie peut être nécessaire auprès de la commune.',
          'Les voisins concernés sont informés à l’avance lorsque c’est nécessaire.',
          'Le bruit du drone et de l’unité au sol reste soumis aux horaires fixés localement pour les activités bruyantes.',
          'La dérive éventuelle de gouttelettes vers les propriétés voisines engage la responsabilité de l’exploitant : le vent est donc un critère de report.',
        ],
      },
      {
        h2: 'Caméra et vie privée',
        paragraphs: [
          'Le drone embarque une caméra pour le pilotage et le contrôle du travail. Les images peuvent saisir des personnes, des plaques d’immatriculation ou des jardins voisins : ce sont des données personnelles au sens du RGPD. La CNIL publie des recommandations sur les caméras aéroportées.',
          'Un prestataire sérieux cadre sa caméra sur le bâtiment traité, n’utilise les images que pour le diagnostic et le compte rendu, ne filme ni l’intérieur des habitations ni les propriétés voisines, et ne publie aucune image sans l’accord écrit du client, en floutant ce qui pourrait identifier des tiers.',
        ],
      },
      {
        h2: 'Et les produits ?',
        paragraphs: [
          'Le rinçage à l’eau seule n’est soumis à aucune réglementation « produit ». Les eaux de rinçage rejoignent toutefois les gouttières et le réseau pluvial, dont l’usage est encadré par les règlements d’assainissement locaux.',
          'Pour les produits phytopharmaceutiques, la pulvérisation par aéronef est interdite en principe (article L253-8 du Code rural et de la pêche maritime). Les dérogations récentes concernant les drones visent uniquement certaines parcelles agricoles : elles ne couvrent ni les toitures, ni les façades. Ces produits sont en outre interdits, sauf exceptions, dans les propriétés privées à usage d’habitation.',
          'Les anti-mousses pour toitures sont en général des produits biocides. Ils doivent être utilisés conformément à leur autorisation et à leur étiquette, et certains exigent que le décideur soit titulaire du Certibiocide. La compatibilité d’une application par drone avec l’étiquette d’un produit donné doit être vérifiée au cas par cas : sur ce point, le cadre reste incertain et nous recommandons la prudence face à toute promesse catégorique.',
        ],
      },
      {
        h2: 'Comment vérifier un prestataire',
        paragraphs: [
          'Vous avez le droit de poser des questions avant de signer. Un exploitant en règle n’aura aucune difficulté à y répondre, documents à l’appui.',
        ],
        list: [
          'Son numéro d’exploitant UAS enregistré auprès de la DGAC.',
          'Le cadre du vol : déclaration STS-01 avec son accusé de réception, ou autorisation d’exploitation de la DSAC.',
          'Le certificat de compétence du télépilote (CATS ou équivalent prévu par l’autorisation).',
          'Une attestation d’assurance qui mentionne explicitement l’activité drone et la pulvérisation.',
          'Les démarches prévues pour votre adresse : notification en préfecture, information du voisinage.',
          'Le nom du produit éventuel, son type et ses conditions d’emploi.',
        ],
      },
      {
        h2: 'Les signaux qui doivent alerter',
        paragraphs: [
          'Méfiez-vous d’un discours trop simple. La DGAC n’homologue pas un service de nettoyage : une déclaration n’est pas une autorisation, et aucune entreprise ne peut se dire « agréée » pour la pulvérisation aérienne en général. Soyez également prudent si l’on vous promet une intervention en ville dès le lendemain, sans démarche, ou si l’on vous présente un produit comme sans danger ou écologique sans justification.',
          'Chez Drone Éclat, nous préparons les démarches de chaque chantier et nous vous communiquons les justificatifs correspondants avec le devis. La page Sécurité et réglementation détaille notre approche.',
        ],
      },
    ],
    faq: [
      { q: 'Faut-il une autorisation de la mairie pour un drone de nettoyage ?', a: 'Le vol lui-même relève de la DGAC et de la préfecture, pas de la mairie. En revanche, si le périmètre de sécurité empiète sur la voie publique, une autorisation d’occupation de la voirie peut être nécessaire auprès de la commune.' },
      { q: 'Un drone de loisir peut-il servir à démousser une toiture ?', a: 'Non. La catégorie ouverte, celle des drones de loisir, interdit tout largage de matière, y compris de l’eau. Un nettoyage par drone relève de la catégorie spécifique, avec ses démarches et ses exigences de formation.' },
      { q: 'Le drone va-t-il filmer ma maison et celle de mes voisins ?', a: 'La caméra sert au pilotage et au contrôle du travail. Elle doit rester cadrée sur le bâtiment traité, les images ne servent qu’au diagnostic et au rapport, et aucune image n’est publiée sans accord écrit.' },
    ],
    sources: [
      { label: 'Règlement d’exécution (UE) 2019/947, version consolidée (EUR-Lex)', url: 'https://eur-lex.europa.eu/eli/reg_impl/2019/947/2025-05-01/eng/pdf' },
      { label: 'DGAC : exploitation de drones en catégorie spécifique', url: 'https://www.ecologie.gouv.fr/politiques-publiques/exploitation-drones-categorie-specifique' },
      { label: 'DGAC : exploitation de drones en catégorie ouverte', url: 'https://www.ecologie.gouv.fr/politiques-publiques/exploitation-drones-categorie-ouverte' },
      { label: 'Sénat : question écrite n° 06232 sur la fin des scénarios nationaux', url: 'https://www.senat.fr/questions/base/2025/qSEQ251006232.html' },
      { label: 'AlphaTango, portail de la DGAC pour les exploitants', url: 'https://alphatango.aviation-civile.gouv.fr' },
      { label: 'Géoportail : carte des restrictions pour les drones', url: 'https://www.geoportail.gouv.fr' },
      { label: 'Ministère de l’Agriculture : textes sur les drones et les produits phytopharmaceutiques', url: 'https://agriculture.gouv.fr/protection-des-cultures-publication-des-textes-autorisant-lutilisation-de-drones-pour-lapplication' },
      { label: 'Ministère de la Transition écologique : produits biocides', url: 'https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides' },
      { label: 'CNIL : caméras aéroportées (2025)', url: 'https://www.cnil.fr/sites/default/files/2025-06/annexe_4_cameras_aeroportees.pdf' },
    ],
    links: [
      { href: '/securite-reglementation/', label: 'Sécurité et réglementation chez Drone Éclat' },
      { href: '/services/demoussage-toiture-drone/', label: 'Le démoussage de toiture par drone' },
      { href: '/a-propos/', label: 'Nos engagements' },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/** Identifiant d'ancre stable à partir d'un intertitre. */
export function anchorId(text: string) {
  return text
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[’'"]/g, '-')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Formate une date AAAA-MM-JJ en français, sans dépendre du fuseau. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return `${d === 1 ? '1er' : d} ${months[m - 1]} ${y}`;
}
