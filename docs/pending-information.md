# Informations en attente

Toute donnée marquée `pending: true` dans `src/config/site.ts` s’affiche avec une étiquette « à compléter » et n’est **jamais** injectée dans les données structurées.

## À fournir par l’entreprise
| Information | Où la renseigner | Impact |
|---|---|---|
| Orthographe exacte du domaine (droneeclat.fr ou drone-eclat.fr) | `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap, Open Graph |
| Raison sociale, forme, capital, SIRET, RCS, adresse du siège | `site.legalName`, `site.siret`, pages légales | Mentions légales obligatoires |
| Directeur de la publication | `/mentions-legales/` | Obligatoire |
| Téléphone | `site.phone` | Active les liens d’appel, le contact rapide, LocalBusiness |
| E-mail de contact | `site.email` | Affichage + données structurées |
| Adresse d’exploitation | `site.base` | Active LocalBusiness / Google Business Profile |
| Rayon d’intervention validé | `site.serviceRadiusKm`, `extendedRadiusKm` | Carte et vérificateur de zone (provisoire : 60 / 120 km) |
| Numéro d’exploitant UAS (AlphaTango) | `site.operatorId` | Preuve réglementaire affichable |
| Assureur RC drone + attestation | `site.insurer` | Réassurance, page pros |
| Modèle(s) de drone, classe C5/C6, unité de pompage | `/technologie/` | Fiche matériel |
| Certificats des télépilotes (CATS…), Certibiocide si traitement | `/securite-reglementation/`, `/a-propos/` | Crédibilité |
| Équipe : noms, rôles, photos | `/a-propos/` | Confiance |
| Photos réelles de chantiers (avant / après) avec accord client | `src/content/projects.ts`, `/public/realisations/` | Remplacent les illustrations 3D |
| Avis clients authentiques | composant à brancher sur la page d’accueil | Section témoignages (vide tant qu’il n’y en a pas) |
| Grille tarifaire validée (si souhaitée) | estimateur | Aujourd’hui : aucun prix affiché |
| Compte Resend + domaine d’envoi | variables d’environnement | **Sans cela, le formulaire ne transmet rien en production (503)** |
| Hébergeur retenu | `/mentions-legales/` | Obligatoire |

## À faire valider (humain / juriste / autorité)
Voir `regulation.md` § « Points à faire valider ». En priorité :
1. Application d’anti-mousse (biocide) par drone : autorisée ou non pour le produit envisagé, catégorie d’exploitation nécessaire (STS-01 ou SORA). Le site ne promet que le rinçage à l’eau et parle du traitement « au cas par cas ».
2. Baseline du logo « Pulvérisation » à requalifier.
3. Pages légales (mentions, confidentialité, cookies) relues par un juriste.
4. Exemption de consentement de Plausible au regard des recommandations CNIL si activé.
