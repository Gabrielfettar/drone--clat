/**
 * Bénéfices clients. Formulations volontairement prudentes : aucun chiffre non sourcé,
 * aucune durée garantie (la repousse dépend de l'exposition, du matériau et du traitement).
 */
export type Benefit = { icon: IconName; title: string; text: string };
export type IconName = 'shield' | 'tile' | 'calendar' | 'euro' | 'leaf' | 'drop' | 'home' | 'camera' | 'clock' | 'hard-hat' | 'building' | 'doc' | 'monument' | 'factory' | 'school' | 'keys' | 'barn' | 'warehouse' | 'phone' | 'users' | 'check' | 'map';

/** Les trois gains majeurs, mis en avant en grand. */
export const keyBenefits: (Benefit & { kicker: string })[] = [
  {
    icon: 'calendar', kicker: 'Tranquillité',
    title: 'Une toiture tranquille pour plusieurs années.',
    text: 'Mousses et lichens retirés jusqu’à la racine, puis traitement préventif quand il est adapté à votre couverture : la repousse est fortement ralentie. Vous n’y pensez plus avant longtemps.',
  },
  {
    icon: 'tile', kicker: 'Zéro casse',
    title: 'Personne ne marche sur vos tuiles.',
    text: 'Le drone travaille au-dessus de la couverture. Pas de tuile fêlée sous le poids d’un pied, pas d’ardoise déplacée, pas de faîtage abîmé. Vous récupérez une toiture propre, pas une toiture à réparer.',
  },
  {
    icon: 'euro', kicker: 'Économies',
    title: 'Pas d’échafaudage à payer.',
    text: 'Ni montage, ni location, ni nacelle, ni emprise sur la voirie. Le matériel tient au pied du bâtiment et repart le jour même : vous payez le nettoyage, pas l’accès au toit.',
  },
];

/** Gains complémentaires, en grille. */
export const benefits: Benefit[] = [
  { icon: 'shield', title: 'Une couverture qui dure plus longtemps', text: 'La mousse garde l’humidité contre la tuile ; avec le gel, elle la fait éclater. L’enlever régulièrement, c’est retarder une réfection complète, bien plus coûteuse.' },
  { icon: 'drop', title: 'Moins de risques d’infiltration', text: 'Des gouttières et des noues dégagées évacuent l’eau là où elle doit aller, au lieu de la laisser stagner sous les tuiles.' },
  { icon: 'home', title: 'Une maison qui se valorise', text: 'Toit et façade propres changent l’allure d’une maison du jour au lendemain. Un vrai plus avant une vente, une location ou simplement pour vous.' },
  { icon: 'hard-hat', title: 'Zéro travail en hauteur', text: 'L’équipe reste au sol. Pas de chute possible, pas d’ouvrier sur un toit glissant : c’est plus sûr pour tout le monde, y compris pour vous.' },
  { icon: 'clock', title: 'Un chantier court', text: 'Installation en une trentaine de minutes, intervention souvent bouclée en une journée pour une maison. Votre jardin et votre rue sont libérés le soir même.' },
  { icon: 'leaf', title: 'Des produits fabriqués en France', text: 'Produits professionnels SCALP et DALEP, avec des références sans solvant ou sans COV, dosés au juste nécessaire. Et quand l’eau suffit, nous n’utilisons que de l’eau.' },
  { icon: 'camera', title: 'La preuve en images', text: 'Rapport photo avant / après remis à la fin du chantier. Utile pour votre assurance, votre syndic ou simplement pour voir la différence.' },
  { icon: 'doc', title: 'TVA réduite possible', text: 'Pour l’entretien d’un logement de plus de deux ans, la TVA peut être ramenée à 10 % au lieu de 20 %, sur simple attestation signée.' },
];

/** Ce qui se passe quand on ne fait rien. Chaîne de causes, sans chiffre inventé. */
export const neglect = [
  { t: 'La mousse s’installe', d: 'Elle s’accroche dans les zones à l’ombre et retient l’eau de pluie.' },
  { t: 'L’humidité reste', d: 'La tuile ne sèche plus, devient poreuse et se couvre de lichens.' },
  { t: 'Le gel fait le reste', d: 'L’eau gonfle en gelant : tuiles fendues, épaufrures, éléments qui glissent.' },
  { t: 'L’eau passe', d: 'Gouttières bouchées, infiltrations, charpente exposée : place à la réparation.' },
];
