/**
 * Fournisseurs de produits. Informations relevées sur les sites des fabricants le 25/11/2026 (sources : url).
 * RÈGLES (publicité des biocides, art. 72 du règlement UE 528/2012) : ne jamais écrire « naturel », « non toxique »,
 * « respectueux de l'environnement » ou équivalent pour un produit biocide (antimousse). Logos : fichiers officiels récupérés sur scalpsas.com et dalep.net, affichés pour identifier nos fournisseurs (usage à confirmer auprès des marques).
 * Pas de « partenaire agréé » : aucun programme d'agrément n'existe chez ces fabricants.
 */
export type Supplier = { slug: string; name: string; short: string; url: string; logo: { src: string; width: number; height: number; onDark: boolean }; about: string; products: { family: string; items: string }[]; facts: string[] };

export const suppliers: Supplier[] = [
  {
    slug: 'scalp', name: 'SCALP', short: 'Fabricant français · produits pour drone',
    url: 'https://scalpsas.com/',
    logo: { src: '/fournisseurs/scalp.webp', width: 480, height: 172, onDark: true },
    about: 'Fabricant français de produits de traitement et d’entretien pour toitures et façades, qui propose une gamme dédiée à l’application par drone.',
    products: [
      { family: 'Antimousses', items: 'ANTI-M (préventif), ANTI-M 3100 (curatif, préventif et imperméabilisant)' },
      { family: 'Hydrofuges', items: 'SCALPFUGE 35, SCALPFUGE EKO’R' },
      { family: 'Nettoyants façade', items: 'FACANET PAE, RENOV’EXPRESS, SCALPNET PIERRE' },
    ],
    facts: ['Produits fabriqués en France', 'Certification ISO 9001', 'ANTI-M et ANTI-M 3100 annoncés sans COV', 'Gamme de produits présentée par le fabricant comme adaptée à l’application par drone'],
  },
  {
    slug: 'dalep', name: 'DALEP', short: 'Fabricant français depuis 1980',
    url: 'https://www.dalep.net/',
    logo: { src: '/fournisseurs/dalep.png', width: 300, height: 86, onDark: false },
    about: 'Fabricant normand de produits professionnels pour le bâtiment depuis 1980 : traitements de toiture, hydrofuges et nettoyants de façade.',
    products: [
      { family: 'Antimousses', items: 'DALEP 2100 (curatif, préventif et hydrofuge), gamme éco·R' },
      { family: 'Hydrofuges', items: 'HYDRO+ éco·R, D21' },
      { family: 'Nettoyants', items: 'NET 1 et NET 3 éco·R' },
    ],
    facts: ['Fabrication française', 'Produits annoncés sans solvant par le fabricant'],
  },
];
