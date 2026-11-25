/**
 * TVA réduite et fiscalité de l'entretien. Textes vérifiés sur sources officielles le 25/11/2026,
 * À FAIRE VALIDER par l'expert-comptable avant mise en ligne (voir docs/pending-information.md).
 * Le taux de 10 % ne s'applique que si Drone Éclat facture la TVA (site.vatRegistered).
 */
export const aides = [
  {
    who: 'Particuliers',
    title: 'TVA à 10\u00a0% au lieu de 20\u00a0%',
    text: 'L’entretien d’un logement achevé depuis plus de deux ans (démoussage, nettoyage de toiture ou de façade) peut bénéficier du taux intermédiaire de TVA de 10 %. Il suffit de nous remettre une attestation simplifiée signée avant la facturation : nous vous la fournissons pré-remplie.',
    note: 'Article 279-0 bis du Code général des impôts. Il n’existe pas de crédit d’impôt ni d’aide MaPrimeRénov’ pour le démoussage.',
    sources: [
      { label: 'BOFiP, taux réduits sur les travaux dans les logements de plus de deux ans', url: 'https://bofip.impots.gouv.fr/bofip/1617-PGP.html/identifiant=BOI-TVA-LIQ-30-20-90-20251022' },
      { label: 'Formulaire 1301-SD, attestation simplifiée', url: 'https://www.impots.gouv.fr/sites/default/files/formulaires/1301-sd/2024/1301-sd_4832.pdf' },
      { label: 'economie.gouv.fr, TVA à taux réduit : pour quels travaux ?', url: 'https://www.economie.gouv.fr/particuliers/impots-et-fiscalite/gerer-mes-autres-impots-et-taxes/tva-taux-reduit-pour-quels-travaux' },
    ],
  },
  {
    who: 'Propriétaires bailleurs',
    title: 'Une dépense d’entretien déductible',
    text: 'Pour un logement loué et déclaré au régime réel, les dépenses d’entretien et de réparation se déduisent en principe des revenus fonciers. La TVA à 10 % s’applique aussi si le logement a plus de deux ans.',
    note: 'À vérifier avec votre conseiller selon votre régime fiscal.',
    sources: [],
  },
  {
    who: 'Entreprises, syndics, collectivités',
    title: 'Une charge d’entretien, une TVA récupérable',
    text: 'Pour une entreprise, le nettoyage de ses bâtiments est en principe une charge d’entretien, et la TVA facturée est récupérable dans les conditions habituelles. En copropriété d’habitation, le taux de 10 % peut s’appliquer aux parties communes.',
    note: 'Traitement comptable à confirmer par votre expert-comptable.',
    sources: [],
  },
  {
    who: 'Monuments historiques',
    title: 'Un régime fiscal et des aides dédiés',
    text: 'Les propriétaires de monuments classés ou inscrits relèvent d’un régime spécial qui permet, sous conditions, de déduire les charges d’entretien. Des subventions peuvent aussi être demandées à la DRAC. Nous fournissons devis, descriptif technique et rapport photo pour vos dossiers.',
    note: 'Conditions précises selon le statut du monument et son ouverture au public.',
    sources: [
      { label: 'BOFiP, revenus fonciers des monuments historiques', url: 'https://bofip.impots.gouv.fr/bofip/3427-PGP.html/identifiant=BOI-RFPI-SPEC-30-20-10-20181219' },
    ],
  },
];
