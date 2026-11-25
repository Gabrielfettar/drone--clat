# Informations en attente

Toute donnée marquée `pending: true` dans `src/config/site.ts` s’affiche avec une étiquette « à compléter » et n’est **jamais** injectée dans les données structurées.

## À fournir par l’entreprise
| Information | Où la renseigner | Impact |
|---|---|---|
| Raison sociale, forme, capital, SIRET, RCS, adresse du siège | `site.legalName`, `site.siret`, pages légales | Mentions légales obligatoires |
| Directeur de la publication | `/mentions-legales/` | Obligatoire |
| Téléphone | `site.phone` | Active les liens d’appel, le contact rapide, LocalBusiness |
| Adresse d’exploitation | `site.base` | Active LocalBusiness / Google Business Profile |
| Rayon d’intervention | `site.serviceRadiusKm` | **Validé : 200 km** (25/11/2026). 20 pages villes publiées |
| Numéro d’exploitant UAS (AlphaTango) | `site.operatorId` | Preuve réglementaire affichable |
| Assureur RC drone + attestation | `site.insurer` | Réassurance, page pros |
| Modèle(s) de drone, classe C5/C6, unité de pompage | `/technologie/` | Fiche matériel |
| Certificats des télépilotes (CATS…), Certibiocide si traitement | `/securite-reglementation/`, `/a-propos/` | Crédibilité |
| Équipe : noms, rôles, photos | `/a-propos/` | Confiance |
| Photos réelles de chantiers (avant / après) avec accord client | `src/content/projects.ts`, `/public/realisations/` | Remplacent les illustrations 3D |
| Avis clients authentiques | composant à brancher sur la page d’accueil | Section témoignages (vide tant qu’il n’y en a pas) |
| Grille tarifaire validée (si souhaitée) | estimateur | Aujourd’hui : aucun prix affiché |
| Activation du back-office Google Sheets (ou compte Resend) | variables d’environnement, voir `backoffice-google-sheets.md` | **Sans cela, le formulaire ne transmet rien en production (503)** |
| Assujettissement à la TVA (confirmer le taux de 10 %) | `site.vatRegistered` | Page `/aides-tva/`, bandeau TVA |
| Équipe : noms, photos, n° de certificat CATS | `src/content/team.ts`, `public/equipe/` | Section « Notre équipe » |
| Hébergeur retenu | `/mentions-legales/` | Obligatoire |

## À faire valider (humain / juriste / autorité)
Voir `regulation.md` § « Points à faire valider ». En priorité :
1. Application d’anti-mousse (biocide) par drone : autorisée ou non pour le produit envisagé, catégorie d’exploitation nécessaire (STS-01 ou SORA). Le site ne promet que le rinçage à l’eau et parle du traitement « au cas par cas ».
2. Baseline du logo « Pulvérisation » à requalifier.
3. Pages légales (mentions, confidentialité, cookies) relues par un juriste.
4. Exemption de consentement de Plausible au regard des recommandations CNIL si activé.

## Points ajoutés en v0.3
- **Publicité des biocides** (art. 72 du règlement UE 528/2012) : les antimousses sont des biocides. Interdit d’écrire « écologique », « naturel », « non toxique », « respectueux de l’environnement » à leur sujet. La phrase de précaution obligatoire figure sur `/fournisseurs/`. Le site ne cite que des faits annoncés par les fabricants (fabrication française, sans solvant, sans COV).
- **Fournisseurs** : SCALP (scalpsas.com, propose une gamme « produits pour drone ») et DALEP (dalep.net). Aucun programme d’agrément : ne pas écrire « partenaire agréé ». Logos non utilisés sans accord des marques.
- **Application de biocides par drone** : toujours à valider (étiquette / autorisation ANSES de chaque produit, DGAC). L’autorisation DALEP AP prévoit un pulvérisateur basse pression.
- **Photos libres de droit** : villes (Wikimedia Commons, crédits automatiques) et illustrations (Unsplash, Pexels, Pixabay). Toujours étiquetées « Photo d’illustration », jamais présentées comme une réalisation. Téléchargement : `node scripts/fetch-photos.mjs` (machine ayant accès à ces sites).
- **Avant / après des pages villes** : l’« avant » est une simulation calculée (`node scripts/simulate-grime.mjs`, sortie `public/villes/sim/`) à partir de la photo libre choisie dans `cities.json` (`simulation.photo`). Toujours affiché avec l’étiquette « Simulation », la mention « pas un chantier Drone Éclat », l’attribution de l’auteur et la mention de modification (licences CC BY / BY-SA). Une vraie paire avant/après (même bâtiment, photos d’époques différentes) la remplacera quand elle existe.
- **Paris** : vol de drone interdit sans dérogation de la Préfecture de police (préavis de 10 jours ouvrables). La page Paris le dit.

## Mise à jour du 25/11/2026 (préparation à la mise en ligne)
- **Validé** : e-mail `contact@drone-eclat.fr`, domaine `drone-eclat.fr` (sans www).
- Tant qu'une information n'est pas fournie, elle est **masquée** (et non plus affichée « à compléter ») sur les pages commerciales : téléphone, équipe, numéro d'exploitant, assureur, modèle du drone, page Réalisations (retirée du menu et du sitemap tant que `projects` est vide). Elles réapparaissent automatiquement dès que la valeur est renseignée.
- **Restent bloquants avant publication** : mentions légales (raison sociale, SIRET, siège, directeur de la publication, hébergeur), réception des demandes (`GOOGLE_SHEETS_WEBHOOK_URL` ou `RESEND_API_KEY`), confirmation du régime de TVA, relecture de `/securite-reglementation/` (toujours en noindex, retirée du sitemap).
- Formulaire : téléphone **ou** e-mail suffit. Photos réduites à 1600 px avant envoi.
- Page `/studio/` : 404 en production (sauf `ENABLE_STUDIO=1`).
