# Tests, mesures et auto-audit

Mesures faites le 25/11/2026 sur un build de production local (`next build && next start`), dans un conteneur sans GPU. **Rien n'est déployé** : ces chiffres sont des mesures de laboratoire, pas des données terrain.

## Commandes
```bash
npm run lint        # ESLint (next/core-web-vitals + typescript) : 0 erreur, 0 avertissement
npm run typecheck   # tsc --noEmit strict : OK
npm run build
PW_CHROMIUM=/opt/pw-browsers/chromium npx playwright test --trace off   # PW_CHROMIUM facultatif
```
Le serveur de test est lancé par Playwright sur le port 3200 avec `LEAD_LOCAL_SINK=1` (les demandes de devis vont dans `.leads/` au lieu d'un e-mail) et `RATE_LIMIT_MAX=6`.

## Résultat Playwright (dernière exécution)
**53 passés, 3 ignorés, 0 échec** — projets `desktop` (1440 px) et `mobile` (Pixel 7).
Les 3 tests ignorés le sont volontairement : sous-menu au survol (desktop uniquement), menu mobile (mobile uniquement), limitation de débit (exécutée une seule fois pour ne pas polluer l'autre projet).

| Fichier | Ce qui est vérifié |
|---|---|
| `tests/site.spec.ts` | Chaque page : HTTP 200, un seul H1, title + description, canonical, aucun débordement horizontal, toutes les images ont un `alt`, aucune erreur JS. 404 propre. Tous les liens internes répondent. robots.txt, sitemap.xml, llms.txt, JSON-LD valide (et **aucun** `AggregateRating`). |
| `tests/widgets.spec.ts` | Menu mobile (piège du focus, Échap), sous-menu, FAQ, avant/après au clavier, onglets ARIA, vérificateur de zone (API adresse simulée), galerie + visionneuse, **parcours complet de l'estimateur avec envoi réel d'une photo** et écran de confirmation avec référence, rejet d'un faux fichier image (422), limitation de débit (429). |

## Lighthouse (lab, Chromium headless, sans GPU)
| Page | Mobile perf / a11y / BP / SEO | Desktop |
|---|---|---|
| Accueil | 95 / 100 / 100 / 100 (LCP 2,9 s, TBT 100 ms, CLS 0) | 100 / 100 / 100 / 100 |
| Démoussage toiture | 94 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Contact / devis | 94 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

À noter honnêtement :
- Le score mobile n'est pas 100 : le LCP (image du hero) reste à 2,9 s en throttling simulé. À remesurer en conditions réelles après déploiement (CDN, HTTP/2).
- Sans GPU, la 3D est automatiquement remplacée par l'image fixe (détection SwiftShader/llvmpipe). Les scores ci-dessus mesurent donc la version image sur l'accueil. Sur un vrai appareil, la 3D est chargée **après** le premier affichage (requestIdleCallback), hors chemin critique.
- La couleur d'accent du logotype (#0091EB sur blanc, contraste 3,4:1) est une exception de logotype assumée ; elle n'est jamais utilisée pour du texte courant.

## Matrice responsive
10 largeurs (320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920) × 13 pages : **aucun débordement horizontal**, contrôle automatisé + revue visuelle par captures. Corrections faites pendant la revue : hero mobile empilé (texte puis scène 3D), panneaux masqués qui s'affichaient (règle `[hidden]` manquante), bouton clair invisible dans le pied de page.

## Visuels fixes (posters et illustrations)
`scripts/render-stills.js` rend la scène 3D depuis la route `/studio/?still=<preset>` (non indexée) et écrit `public/hero/*.webp`, `public/illustrations/*.webp` et `public/og-default.jpg`. Ce sont des **rendus 3D**, signalés comme illustrations partout où ils apparaissent.

## Auto-audit (P0 → P3)
Aucun P0 ni P1 ouvert côté code. Les points restants dépendent surtout d'informations ou de décisions externes.

| Niveau | Point | Statut |
|---|---|---|
| P1 (externe) | Formulaire en production : nécessite un compte Resend + domaine vérifié, sinon réponse 503 explicite | Intégration prête, clé à fournir |
| P1 (externe) | Mentions légales incomplètes (SIRET, siège, hébergeur, directeur de publication) | Champs « à compléter » visibles |
| P1 (externe) | Validation réglementaire du traitement biocide par drone et de la baseline « Pulvérisation » | Site limité au rinçage à l'eau |
| P2 | En-tête Content-Security-Policy non posé (les autres en-têtes de sécurité le sont) | À ajouter au déploiement, avec nonce |
| P2 | Limitation de débit en mémoire : par instance, remise à zéro au redémarrage | Passer à Upstash/Redis si hébergement serverless multi-instances |
| P2 | Aucune photo réelle : réalisations vides, illustrations 3D étiquetées | Attente photos |
| P2 | Page sécurité et réglementation en `noindex` tant qu'elle n'est pas relue | Volontaire |
| P2 | Vérificateur de zone dépendant de geo.api.gouv.fr (repli : message + lien devis) | Acceptable |
| P3 | LCP mobile lab 2,9 s | À remesurer en réel |
| P3 | Contraste du logotype (exception) | Documenté |
| P3 | Journal : 3 articles seulement | À enrichir |
