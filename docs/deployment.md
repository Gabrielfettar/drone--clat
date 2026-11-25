# Déploiement

## Recommandation : Vercel (offre Hobby pour démarrer, Pro si usage commercial)
Next.js y fonctionne sans configuration. Alternatives : Netlify, ou un VPS Node (`npm run build && npm start`).
**Point à valider** : les conditions de l’offre gratuite Vercel excluent un usage commercial ; prévoir l’offre Pro (payante) ou un autre hébergeur. Aucune dépense n’a été engagée.

## Étapes
1. Pousser le dépôt sur GitHub.
2. Importer le dépôt dans Vercel (framework détecté automatiquement).
3. Variables d’environnement (Production) :
   - `NEXT_PUBLIC_SITE_URL` = `https://www.droneeclat.fr` (orthographe du domaine à confirmer)
   - `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_TO_EMAIL` (compte Resend + domaine vérifié par DNS : SPF/DKIM)
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optionnel)
   - En préproduction seulement : `NEXT_PUBLIC_NOINDEX=1`
4. Acheter / relier le domaine `.fr` (registrar au choix, AFNIC), pointer les DNS vers Vercel, forcer `www` ou l’apex (une seule version canonique).
5. Après mise en ligne : Google Search Console (propriété domaine, envoi du sitemap), Google Business Profile, Bing Webmaster Tools.
6. Lancer `npm run test:e2e` contre l’URL de production (`baseURL`) et un audit Lighthouse.

## Commandes
```bash
npm ci
npm run dev          # développement : les demandes sont enregistrées dans .leads/
npm run build        # build de production
npm start            # serveur de production
npm run typecheck && npm run lint
npx playwright test  # tests E2E (lance le serveur sur :3200 avec LEAD_LOCAL_SINK=1)
```

## Régénérer les visuels 3D
Lancer le serveur puis ouvrir `/studio/?still=poster|poster-mobile|roof-before|roof-after|facade|cladding|drone|overview`. Le script utilisé est décrit dans `testing.md`.
