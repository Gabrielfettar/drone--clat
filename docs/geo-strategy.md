# GEO / AEO — Être bien compris par les moteurs génératifs

Objectif : que Google, Bing et les assistants IA décrivent Drone Éclat **exactement** (activité, zone, méthode, limites), sans rien inventer. Pas de manipulation : une présence cohérente et vérifiable.

## Ce qui est en place
- **Définitions directes** en tête de chaque page prestation (bloc `.answer`, une phrase autonome et citable).
- **FAQ** structurées (`FAQPage`) par page, réponses courtes puis détails.
- **Tableaux comparatifs** (drone / méthodes traditionnelles, capacités / limites) et **étapes numérotées**.
- **Données structurées** : `Organization`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, `Article`. `LocalBusiness` s’activera quand l’adresse et le téléphone seront validés. Aucune note ni avis fictif.
- **`/llms.txt`** généré depuis le contenu (prestations, pages de référence, articles). Utile pour la description, **pas un facteur de classement**.
- **Pages de référence** : `/technologie/` (matériel et limites), `/securite-reglementation/` (cadre, sources officielles).
- Cohérence du nom : toujours « Drone Éclat » (avec accent), jamais « DroneEclat » dans les textes.

## À faire après lancement
1. **Cohérence NAP** (nom, adresse, téléphone) identique sur le site, Google Business Profile, Pages Jaunes, annuaires drones, réseaux sociaux. Renseigner `site.social` → `sameAs`.
2. **Preuves** : chaque chantier publié avec date, commune, méthode, photos ; demander un avis Google 2–3 mois après l’intervention.
3. **Autorité** (sans faux liens) : CCI Oise, chambre des métiers, annuaire de la Fédération professionnelle du drone civil si adhésion, presse locale (Le Parisien Oise, Courrier picard), partenariats avec couvreurs et syndics, études de cas pour gestionnaires immobiliers.
4. **Wikidata / profils** : uniquement quand l’entreprise a une existence publique vérifiable.
5. Tester chaque trimestre les réponses de ChatGPT, Perplexity, Gemini et Copilot sur « démoussage toiture drone Compiègne » et corriger les sources inexactes (sans les manipuler).
