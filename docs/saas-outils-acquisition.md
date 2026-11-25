# Outils gratuits d'acquisition (« engineering as marketing ») : Drone Éclat

_Recherche du 25/11/2026. Objectif : des outils gratuits utiles qui attirent naturellement des particuliers, des syndics, des entreprises et des collectivités, sur le modèle du simulateur OPCO et du dialer déjà réalisés par le fondateur._

## Briques de données disponibles (vérifiées)
- **API Adresse / BAN** (géocodage gratuit) et **cadastre / API Carto IGN** : parcelles et emprises de bâtiments.
- **BDNB** (CSTB, open data) : fiche d'identité de chaque bâtiment (année de construction, matériaux, dont les **matériaux de toiture**, usage, propriété). API Open gratuite avec limite de débit, offre « expert » payante. https://www.data.gouv.fr/dataservices/api-bdnb-open · https://www.data.gouv.fr/datasets/base-de-donnees-nationale-des-batiments/
- **Google Solar API** (buildingInsights) : segments de toit avec **surface réelle tenant compte de la pente**, azimut et inclinaison. La France est couverte (qualité MEDIUM). Service payant à l'appel. https://mapsplatform.google.com/intl/fr/maps-products/solar/ · https://developers.google.com/maps/documentation/solar/concepts
- **IGN BD ORTHO / Géoplateforme** (orthophotos 20 cm, gratuites) et **LiDAR HD IGN** (nuage de points, permet de calculer la pente des pans).
- **Météo-France** (portail API : observations, climatologie, prévisions) et **Open-Meteo** (prévisions gratuites) : humidité, pluie, ensoleillement, gel.
- **Géoportail, couche « Restrictions UAS »** (DGAC/IGN, données INSPIRE DGAC_RESTRICTIONS-UAS) : zones d'interdiction ou de restriction de vol. Attention, les zones temporaires et certaines protections biotope n'y figurent pas. https://inspire-geoportal.ec.europa.eu/srv/api/records/DGAC_RESTRICTIONS-UAS
- **Mérimée / POP (ministère de la Culture)** et **Atlas des patrimoines** : monuments historiques et périmètres de 500 m (ABF).
- **Cadre réglementaire copro** : projet de plan pluriannuel de travaux (PPPT) obligatoire selon la taille (+200 lots depuis 2023, puis 51 à 200 lots en 2024, puis ≤50 lots en 2025) et intégré au carnet d'entretien. Carnet d'information du logement obligatoire depuis 2023 (construction neuve ou rénovation énergétique). https://www.justice.fr/fiche/plan-pluriannuel-travaux-ppt-mis-place-coproprietes · https://www.ecologie.gouv.fr/sites/default/files/guide_proprietaire_carnet_d_information_du_logement.pdf

## Concurrence constatée (rapide)
- Calculateurs de prix génériques à saisie manuelle de surface : macalculatriceenligne.com (calcul prix nettoyage toiture), guides prix Habitatpresto, Obat, Prix-pose, La Maison Saint-Gobain, Bobex (Belgique). **Aucun ne calcule la surface à partir de l'adresse.**
- Diagnostic toiture par imagerie IA : **BIRDIA** (B2B assureurs et collectivités, payant). Outils de mesure pro américains (Roofr, iRoofing). Plateforme Remi. **Pas d'outil grand public français gratuit de « risque mousse » à l'adresse trouvé.**
- Restrictions drones : la carte Géoportail elle-même, des articles explicatifs (StudioSport, Clubic). Pas d'outil orienté « mon chantier à cette adresse est-il faisable par drone ? ».
- Copro : logiciels de syndic (gestion) et bureaux d'études PPPT. Pas d'outil gratuit orienté entretien de l'enveloppe (toiture et façade) multi-bâtiments.

---

## Les 12 idées

### 1. Diagnostic « Risque mousse » de ma toiture
- **Ce que ça fait** : l'utilisateur saisit une adresse. L'outil récupère le bâtiment (BAN → BDNB), le matériau de toiture et l'année, puis l'orientation et la pente des pans (Google Solar API ou LiDAR HD), le climat local (humidité et pluviométrie Météo-France) et la végétation proche (orthophoto, couche arbres BD TOPO). Il en tire un **score de risque mousse/lichen sur 100**, avec un affichage par pan (versant nord = rouge) et des recommandations.
- **Cible** : particuliers d'abord, syndics ensuite (mode multi-adresses).
- **Capture de leads** : score affiché gratuitement. Rapport PDF détaillé et « photo drone gratuite de vérification » contre e-mail, téléphone et créneau.
- **SEO** : « ma toiture a-t-elle besoin d'un démoussage », « mousse sur toiture nord », « risque mousse toiture », « diagnostic toiture gratuit », « démoussage toiture Compiègne / Oise ».
- **Effort** : M (L si scoring par vision sur orthophoto).
- **Monétisation** : devis démoussage et hydrofuge, abonnement entretien, vente de produits DALEP en marque blanche ou affiliation.

### 2. Simulateur de prix démoussage / nettoyage par drone (surface auto depuis l'adresse)
- **Ce que ça fait** : à partir de l'adresse, calcul automatique de la surface réelle de toiture (Solar API `areaMeters2` incluant la pente, ou emprise cadastre × coefficient de pente), choix des prestations (démoussage, traitement, hydrofuge, façade, bardage), puis fourchette de prix et comparaison drone / nacelle / échafaudage (coût et délai).
- **Cible** : particuliers et petits pros.
- **Capture** : fourchette affichée, devis ferme et réservation contre coordonnées. Rappel automatique.
- **SEO** : « prix démoussage toiture m² », « prix nettoyage toiture par drone », « devis démoussage toiture », « combien coûte un hydrofuge toiture », « surface de ma toiture ».
- **Concurrents** : calculateurs à saisie manuelle (macalculatriceenligne, Habitatpresto). L'avantage différenciant est la **surface automatique**.
- **Effort** : S à M.
- **Monétisation** : conversion directe en devis.

### 3. Calculateur « Rénover ou remplacer ? » (ROI de l'entretien de la toiture)
- **Ce que ça fait** : compare sur 10 à 30 ans le coût de l'entretien (démoussage tous les X ans + hydrofuge) avec un remplacement de couverture anticipé. Il intègre la surface, le matériau et le prix moyen de réfection, puis affiche l'économie et le gain de durée de vie.
- **Cible** : particuliers, syndics, gestionnaires de patrimoine, collectivités.
- **Capture** : rapport PDF à présenter en AG ou en conseil municipal, contre e-mail.
- **SEO** : « prix réfection toiture », « durée de vie toiture tuile », « démoussage prolonge la durée de vie toiture », « entretien ou remplacement toiture ».
- **Effort** : S.
- **Monétisation** : contrats pluriannuels d'entretien.

### 4. Calendrier « Quand démousser ? » + alertes météo
- **Ce que ça fait** : pour une commune, affiche la meilleure fenêtre de traitement (pas de pluie pendant 24 à 48 h, température > 5 °C, pas de gel, vent faible, ce qui coïncide avec les contraintes de vol du drone) à partir des prévisions Météo-France ou Open-Meteo. Abonnement possible à une alerte SMS ou e-mail « fenêtre idéale cette semaine dans l'Oise ».
- **Cible** : particuliers et bricoleurs (qui deviennent des leads pour la prestation).
- **Capture** : abonnement aux alertes (e-mail ou SMS), donc base de remarketing saisonnière.
- **SEO** : « quand démousser sa toiture », « meilleure période démoussage », « démoussage toiture quelle saison », « traitement anti-mousse avant pluie ».
- **Effort** : S.
- **Monétisation** : remplissage du planning en basse saison, vente de produits.

### 5. Vérificateur « Mon chantier est-il faisable par drone ? »
- **Ce que ça fait** : à partir de l'adresse, croise la couche Restrictions UAS (DGAC), la proximité d'aérodromes et de CTR, les périmètres monuments historiques (Mérimée), la densité urbaine et les lignes électriques (BD TOPO). Il rend un feu vert, orange ou rouge et liste les démarches (déclaration, autorisation préfectorale, accord ABF), avec un avertissement clair : information indicative.
- **Cible** : pros, syndics, collectivités, monuments historiques, autres télépilotes.
- **Capture** : « Nous gérons les autorisations pour vous » contre une demande de devis. Version télépilote avec compte gratuit.
- **SEO** : « autorisation vol drone adresse », « puis-je faire voler un drone ici », « zone interdite drone Compiègne », « drone près d'un monument historique ».
- **Concurrents** : la carte Géoportail (brute, non orientée chantier).
- **Effort** : M.
- **Monétisation** : leads B2B à forte valeur, crédibilité réglementaire.

### 6. Planificateur d'entretien copro / syndic (PPPT enveloppe)
- **Ce que ça fait** : le syndic importe une liste d'immeubles (adresses ou CSV). L'outil calcule automatiquement surfaces, matériaux, âges (BDNB) et risque mousse, puis propose un **échéancier sur 10 ans pour toitures, façades et bardages** exportable dans le PPPT et le carnet d'entretien, avec un devis groupé multi-bâtiments en un clic.
- **Cible** : syndics, bailleurs sociaux, foncières, collectivités.
- **Capture** : compte gratuit avec un portefeuille d'immeubles = lead B2B qualifié.
- **SEO** : « plan pluriannuel de travaux toiture », « PPPT façade », « entretien toiture copropriété obligation », « ravalement copropriété fréquence ».
- **Effort** : L.
- **Monétisation** : contrats-cadres multi-sites, à terme abonnement SaaS.

### 7. Carnet d'entretien numérique du bâtiment (enveloppe)
- **Ce que ça fait** : un espace gratuit par bâtiment, alimenté automatiquement après chaque intervention Drone Éclat (photos drone avant/après, produits utilisés avec FT et FDS, date, prochaine échéance). Le propriétaire peut aussi y ajouter ses propres travaux. Export compatible avec le carnet d'information du logement ou le carnet d'entretien de copro.
- **Cible** : particuliers et syndics (fidélisation), utile aussi lors d'une revente.
- **Capture** : rappels automatiques « prochain traitement recommandé », partage avec l'agent immobilier ou le notaire.
- **SEO** : « carnet d'information du logement modèle », « carnet d'entretien maison », « historique travaux toiture vente ».
- **Effort** : M.
- **Monétisation** : récurrence (réabonnement entretien), argument de différenciation.

### 8. Calculateur de quantité de produit anti-mousse / hydrofuge
- **Ce que ça fait** : surface (auto ou manuelle), support (tuile, ardoise, fibrociment, enduit, bardage), état, puis litres de produit concentré, dilution, coût, temps de séchage et précautions. Lien vers le produit adapté.
- **Cible** : particuliers bricoleurs, artisans.
- **Capture** : « Trop haut ? Trop risqué ? Faites-le faire par drone » avec comparatif sécurité et coût. E-mail pour recevoir la fiche.
- **SEO** : « quelle quantité d'anti-mousse pour 100 m² », « dosage démoussant toiture », « consommation hydrofuge m² ».
- **Effort** : S.
- **Monétisation** : vente ou affiliation produits (vérifier les conditions de revente avec les distributeurs DALEP et SCALP), upsell prestation.

### 9. Estimateur de propreté et rendement des panneaux solaires
- **Ce que ça fait** : à partir de l'adresse et de la puissance installée, estime la production attendue (Solar API, PVGIS) et la perte liée à l'encrassement, puis indique quand un nettoyage est rentable.
- **Cible** : particuliers équipés de PV, entreprises, agriculteurs (hangars), collectivités.
- **Capture** : rapport contre e-mail, devis nettoyage PV par drone.
- **SEO** : « nettoyage panneaux solaires prix », « perte rendement panneaux sales », « faut-il nettoyer ses panneaux solaires ».
- **Effort** : M.
- **Monétisation** : nouvelle ligne de service (DALEP propose justement un nettoyant pour panneaux solaires).

### 10. Portail B2B « Demande d'intervention multi-sites » pour gestionnaires, industriels et collectivités
- **Ce que ça fait** : carte des sites, demande de devis groupée, suivi des interventions, rapports drone (photos HD, relevé des anomalies), DOE et attestations d'assurance téléchargeables, conformité (plan de prévention, protocole).
- **Cible** : property managers, sites industriels, collectivités, gestionnaires de monuments.
- **Capture** : accès gratuit qui sert de portail client et d'argument commercial en rendez-vous.
- **SEO** : faible. Outil de conversion et de rétention plutôt que d'acquisition. Pages « nettoyage toiture bâtiment industriel », « démoussage bâtiment public ».
- **Effort** : L.
- **Monétisation** : contrats-cadres, appels d'offres publics.

### 11. Inspection photo gratuite / « Avant-Après » interactif + galerie communale
- **Ce que ça fait** : galerie de chantiers géolocalisés par commune (Compiègne, Margny, Noyon…) avec un curseur avant/après. Le prospect téléverse une photo de son toit et reçoit une première évaluation (classification simple : mousse, lichen, algues rouges, propre), plus une proposition d'inspection drone.
- **Cible** : particuliers.
- **Capture** : upload de photo = lead avec visuel, donc meilleure qualification.
- **SEO** : pages locales « démoussage toiture [commune] » générées à partir des chantiers réels (SEO local programmatique).
- **Effort** : M.
- **Monétisation** : devis. Preuve sociale.

### 12. Vérificateur d'aides et d'obligations (ravalement, patrimoine, éco-prêts)
- **Ce que ça fait** : à partir de l'adresse, indique si la commune impose un ravalement périodique (à vérifier commune par commune), si le bâtiment est en périmètre ABF (Mérimée), et quelles aides peuvent s'appliquer quand le nettoyage est couplé à des travaux éligibles (isolation de toiture, MaPrimeRénov', aides locales). Attention : le démoussage seul n'est généralement pas éligible, il faut le dire honnêtement.
- **Cible** : particuliers, copros, collectivités.
- **Capture** : rapport personnalisé contre e-mail.
- **SEO** : « ravalement de façade obligatoire », « aide nettoyage façade », « subvention ravalement façade Oise », « travaux périmètre ABF ».
- **Effort** : M (la veille des données communales est le coût caché).
- **Monétisation** : leads façade et ravalement, souvent à ticket élevé.

---

## Synthèse

| # | Outil | Cible | Effort | Potentiel SEO | Valeur lead |
|---|---|---|---|---|---|
| 1 | Diagnostic risque mousse | Particulier, syndic | M | Élevé | Élevée |
| 2 | Simulateur de prix (surface auto) | Particulier | S-M | Très élevé | Très élevée |
| 3 | Rénover ou remplacer (ROI) | Tous | S | Moyen | Moyenne-élevée |
| 4 | Calendrier et alertes météo | Particulier | S | Élevé (saisonnier) | Moyenne |
| 5 | Faisabilité drone à l'adresse | Pro, collectivité | M | Moyen | Élevée (B2B) |
| 6 | Planificateur PPPT enveloppe | Syndic, bailleur | L | Moyen | Très élevée |
| 7 | Carnet d'entretien numérique | Particulier, syndic | M | Faible-moyen | Rétention |
| 8 | Calculateur de quantité de produit | Bricoleur | S | Élevé | Faible-moyenne |
| 9 | Rendement panneaux PV | Particulier, pro | M | Élevé | Moyenne |
| 10 | Portail B2B multi-sites | Pro, collectivité | L | Faible | Très élevée |
| 11 | Galerie avant/après + upload photo | Particulier | M | Élevé (local) | Élevée |
| 12 | Aides et obligations | Tous | M | Moyen | Moyenne-élevée |

---

## Top 3 à construire en premier

### 1. Simulateur de prix avec surface calculée automatiquement à l'adresse (#2)
C'est l'outil le plus proche de l'intention d'achat : les requêtes « prix démoussage toiture m² » et « devis nettoyage toiture » sont tapées par des gens prêts à acheter. Les concurrents actuels (Habitatpresto, Obat, calculateurs génériques) demandent tous de saisir la surface à la main, une donnée que le particulier ignore. Calculer la surface réelle et pentue à partir de l'adresse (Google Solar API, avec repli sur cadastre/BDNB + coefficient de pente) est un vrai « effet waouh » et différencie nettement le site. L'effort est faible (S-M), le modèle est identique au simulateur OPCO déjà maîtrisé par le fondateur, et chaque simulation produit un lead qualifié (adresse, surface et prestation connues), ce qui fait gagner du temps sur les devis.

### 2. Diagnostic « Risque mousse » de ma toiture (#1)
C'est l'outil le plus « partageable » et le plus original : aucun équivalent grand public n'a été trouvé en France (BIRDIA vise les assureurs et les collectivités en B2B). Il réutilise 80 % de la brique adresse → bâtiment → pans de toit du simulateur et ajoute des données climatiques et d'orientation publiques. Il crée la demande au lieu de seulement la capter (« votre versant nord est à risque élevé »), il alimente des articles SEO et des relations presse locales (« un outil compiégnois note le risque mousse de votre toit ») et il s'étend naturellement aux syndics en mode multi-adresses. Le score doit rester présenté comme une estimation, confirmée par une inspection drone gratuite : c'est précisément le crochet commercial.

### 3. Vérificateur « Mon chantier est-il faisable par drone ? » (#5)
C'est l'outil qui ouvre la porte B2B et institutionnelle (syndics, industriels, collectivités, monuments historiques), où les tickets sont les plus élevés et où l'objection n° 1 est réglementaire (« a-t-on le droit de faire voler un drone ici ? »). Il s'appuie sur des données officielles gratuites (couche Restrictions UAS DGAC/IGN, Mérimée, BD TOPO) et positionne Drone Éclat comme expert de la conformité. Il sert aussi d'outil interne de pré-qualification des chantiers et de contenu SEO de niche peu concurrencé. Il faut le présenter comme indicatif (les restrictions temporaires et les zones biotope ne sont pas toutes cartographiées) et renvoyer vers « nous gérons les démarches ».

**Ensuite** : #4 (calendrier et alertes, effort S, pour constituer une base e-mail saisonnière), puis #6 et #10 (PPPT et portail B2B) une fois les premiers syndics clients signés.

## Sources
- https://www.data.gouv.fr/dataservices/api-bdnb-open
- https://cnig.gouv.fr/IMG/pdf/2025_10_01_cnig_gt_assureurs.pdf (BDNB, matériaux de toiture)
- https://mapsplatform.google.com/intl/fr/maps-products/solar/ · https://developers.google.com/maps/documentation/solar/concepts
- https://inspire-geoportal.ec.europa.eu/srv/api/records/DGAC_RESTRICTIONS-UAS · https://www.studiosport.fr/guides/legislation/geoportail-restrictions-vol.html
- https://macalculatriceenligne.com/construction/calcul-prix-nettoyage-toiture/ · https://www.habitatpresto.com/mag/toiture/prix-demoussage-toiture · https://travaux.obat.fr/guides/demoussage-toiture
- https://space-solutions.airbus.com/newsroom/case-studies/pleiades-neo/monitoring-roof-health-over-time-with-pleiades-neo/ (BIRDIA)
- https://www.justice.fr/fiche/plan-pluriannuel-travaux-ppt-mis-place-coproprietes · https://www.ecologie.gouv.fr/sites/default/files/guide_proprietaire_carnet_d_information_du_logement.pdf
- https://www.bobex.be/fr-be/demoussage-toitures/drone/ (prix drone Belgique, cadre biocide)
