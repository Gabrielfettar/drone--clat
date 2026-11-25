# Drone Éclat — site vitrine

Site Next.js 15 (App Router, React 19, TypeScript strict) pour Drone Éclat, nettoyage de toitures, façades et bardages par drone captif, secteur Compiègne / Oise (zone à valider).

**Statut : prêt à déployer, non déployé.** Plusieurs informations sont provisoires et signalées « à compléter » sur le site (voir `docs/pending-information.md`).

## Démarrer
```bash
npm install
cp .env.example .env.local   # renseigner les variables, voir docs/deployment.md
npm run dev                  # http://localhost:3000
```
En développement, les demandes de devis sont écrites dans `.leads/` (aucun e-mail envoyé).

## Scripts
| Commande | Rôle |
|---|---|
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` / `npm run typecheck` | Qualité |
| `npm run test:e2e` | Tests Playwright (desktop + mobile) |
| `node scripts/render-stills.js` | Régénère les visuels fixes à partir de la scène 3D |

## Où trouver quoi
- `src/config/site.ts` : coordonnées, zone, informations provisoires (`pending`).
- `src/content/` : textes des prestations, FAQ, articles, réalisations.
- `src/components/hero/` : scène 3D (three.js / react-three-fiber) et repli image.
- `src/components/widgets/` : estimateur, avant/après, zone, galerie, FAQ, préparation.
- `src/app/api/devis/route.ts` : réception sécurisée des demandes (validation, photos, anti-spam, envoi Resend).

## Documentation
`docs/` : architecture, brand-guidelines, market-research, seo-strategy, geo-strategy, content-strategy, components, testing, deployment, pending-information, regulation.
