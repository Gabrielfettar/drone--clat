# Architecture technique

## Pile
- **Next.js 15** (App Router, rendu statique par défaut), **React 19**, **TypeScript** strict.
- **three.js + @react-three/fiber + drei (ContactShadows)** pour le hero 3D, chargé à la demande.
- **zod** : schéma de demande partagé client / serveur.
- **Playwright** : tests E2E et captures multi-résolutions.
- Pas de framework CSS : tokens CSS maison (`globals.css`) + composants (`components.css`, `pages-a.css`, `pages-b.css`).

Choix volontairement sobres : pas de GSAP (CSS + rAF suffisent), pas de post-processing (coût GPU), pas de CMS (contenu en fichiers TypeScript typés, versionnés).

## Arborescence
```
src/
  app/                 routes (une page = un dossier), API, sitemap, robots, llms.txt, manifest
    api/devis/route.ts réception des demandes (multipart)
    studio/            page technique non indexée qui produit les visuels 3D fixes
  components/
    layout/            Header, Footer, QuickContact, RevealInit, Analytics
    hero/              HeroStage (chargeur) + HeroScene (scène 3D)
    widgets/           Estimator, BeforeAfter, ZoneChecker, ServiceSelector, Gallery, PrepChecklist
    ui/                Logo, PageHero, Breadcrumbs, Faq, CtaBand, JsonLd
  content/             services, faq, articles, projects, places (données éditoriales)
  config/site.ts       coordonnées et informations d’entreprise (avec drapeau « pending »)
  lib/                 lead (schéma + diagnostic), files (contrôle des images), rate-limit, schema (JSON-LD)
public/                favicon, logo PNG, image OG, poster du hero, illustrations 3D
tests/                 Playwright
docs/                  documentation projet
```

## Routes
| URL | Type | Rôle |
|---|---|---|
| `/` | statique | Accueil, hero 3D |
| `/services/[slug]/` | SSG | Une page par prestation (`content/services.ts`) |
| `/professionnels/entretien-batiments/` | statique | Offre B2B |
| `/technologie/`, `/securite-reglementation/` | statique | Pages de référence |
| `/realisations/`, `/zones-intervention/`, `/a-propos/` | statique | |
| `/journal/`, `/journal/[slug]/` | SSG | Conseils (`content/articles.ts`) |
| `/contact/` | statique + client | Estimateur de projet |
| `/mentions-legales/`, `/confidentialite/`, `/cookies/` | statique | Légal |
| `/api/devis` | dynamique (Node) | Réception des demandes |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest` | générés | |
| `/studio/` | client, noindex | Production des visuels 3D |

Ajouter une prestation : un objet dans `content/services.ts`. Page, menu, pied de page, sélecteur, sitemap et llms.txt suivent.

## Hero 3D
- Scène 100 % procédurale (aucun modèle à télécharger) : maison, toiture texturée par canvas, mousse effacée en temps réel sous le drone, drone captif avec tuyau et unité au sol, gouttelettes, contour de zone.
- Chargement : texte + image d’attente (`/hero/poster.webp`) d’abord ; scène importée dynamiquement pendant un temps mort du navigateur.
- Désactivée si : pas de WebGL, `saveData`, réseau 2G, `deviceMemory < 3`. Pause hors écran et onglet masqué. `prefers-reduced-motion` : image figée.
- DPR plafonné à 1,75, ombres 1536 px, une seule lumière ombrée.

## Formulaire de devis (sécurité)
- Validation zod côté client et serveur, mêmes messages.
- Photos : 5 max, 8 Mo max, type vérifié par **signature binaire** (JPEG, PNG, WebP, HEIC) et non par l’extension ; noms de fichiers assainis.
- Anti-spam : champ piège + temps de remplissage minimal (réponse neutre aux robots) + limitation 5 envois / 10 min / IP.
- Taille de requête limitée (45 Mo), échappement HTML de toutes les valeurs dans l’e-mail.
- Transmission : API Resend (`RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL`), photos en pièces jointes, `reply-to` = client. Sans configuration en production : réponse 503 explicite (jamais de faux succès).
- Logs : référence et nombre de photos uniquement, aucune donnée personnelle.
- Suivi commercial : chaque demande porte une référence `DE-AAAAMMJJ-XXXX` et le statut « Nouveau prospect ». Statuts proposés : Nouveau → À contacter → Devis à préparer → Devis envoyé → Gagné / Perdu, tenus dans un tableur ou un CRM léger (ex. Google Sheets, Notion, HubSpot gratuit) : un CRM sur mesure serait disproportionné à ce stade.
- **Limite connue** : le limiteur est en mémoire. Sur une plateforme serverless multi-instances, le remplacer par Upstash Redis (`@upstash/ratelimit`).

## En-têtes de sécurité
`next.config.mjs` : HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`. Une CSP stricte reste à ajouter (nécessite des nonces pour les scripts Next) : voir P2 dans `testing.md`.
