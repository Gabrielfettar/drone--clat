# Drone Éclat : cadre réglementaire (drone, nettoyage, démoussage, pulvérisation)

> Note de travail réglementaire, rédigée le **25 novembre 2026** à partir de sources officielles consultées le même jour.
> **Ce n'est pas un avis juridique.** Plusieurs points (signalés ⚠️) doivent être validés par la DSAC (DGAC), un avocat en droit aérien et environnemental, et le fabricant ou détenteur de l'autorisation des produits utilisés.
> Périmètre : démoussage et traitement de toiture, nettoyage de façade et de bardage, bâtiments professionnels et agricoles, au-dessus de maisons et de bâtiments, notamment dans l'Oise (60).

---

## 0. Synthèse en une page

| Activité | Côté aviation (DGAC/EASA) | Côté produit | Verdict aujourd'hui |
|---|---|---|---|
| **(a) Nettoyage à l'eau seule** (drone autonome ou alimenté par tuyau) | Catégorie **Spécifique** obligatoire : la catégorie Ouverte interdit tout largage de matière. STS-01 possible seulement avec un drone **C5 ≤ 25 kg**. Sinon autorisation DSAC (SORA ou PDRA-S01). | Pas de réglementation « produit ». Restent les règles sur les eaux de ruissellement et les rejets. | **Légal sous conditions aviation.** C'est le scénario le plus sûr juridiquement. |
| **(b) Biocide anti-mousse** (TP2 et/ou TP10) | Spécifique. Un biocide classé dangereux est probablement une « marchandise dangereuse » au sens du règl. 2019/947, ce qui exclut STS-01 : il faut une autorisation d'exploitation DSAC (SORA). ⚠️ | **Pas d'interdiction générale de pulvérisation aérienne des biocides trouvée** : l'art. L253-8 CRPM ne vise que les phytos. Mais il faut respecter l'autorisation et l'étiquette du produit (art. 17(5) règl. 528/2012), avoir le **Certibiocide** si le produit est TP2, et l'autorité sanitaire peut encadrer (art. L1311-2 CSP). | **Zone grise.** Ce n'est pas expressément interdit, mais c'est conditionné à une autorisation DSAC, à la compatibilité de l'étiquette avec la méthode d'application et au Certibiocide (TP2). À faire valider. |
| **(c) Produit phytopharmaceutique** (herbicide, anti-mousse homologué « phyto ») | Sans objet : interdit côté produit. | **Pulvérisation aérienne interdite** (art. L253-8 CRPM). La dérogation drone de 2025-2026 est limitée aux **parcelles agricoles** (pente ≥ 20 %, bananeraies, vignes mères) et aux produits de biocontrôle, utilisables en bio ou à faible risque, sur autorisation du préfet de région. Les **propriétés privées à usage d'habitation** sont en plus interdites aux phytos depuis le 1/7/2022 (loi Labbé étendue). | **Interdit** pour toitures et façades. |
| **(d) Autres produits chimiques** (hydrofuges, nettoyants sans revendication biocide) | Spécifique. Si le produit est classé dangereux (CLP), il est probablement une marchandise dangereuse, donc SORA. ⚠️ | Pas de régime spécial d'épandage aérien identifié. S'appliquent REACH/CLP, la FDS et les règles sur l'eau. Attention : une revendication « anti-mousse » ou « anti-verdissure » fait basculer le produit dans les biocides. | **Zone grise, a priori non interdit**, mais conditionné à l'aviation et à l'environnement. À faire valider. |

---

## 1. Cadre aviation : règlements (UE) 2019/947 et 2019/945, et textes français

### 1.1 Les trois catégories d'exploitation

- **Ouverte** (art. 4 du règl. 2019/947). Conditions cumulatives : drone de classe C0 à C4 (ou cas de l'art. 20), **MTOM < 25 kg**, distance de sécurité avec les personnes et pas de survol de rassemblements, vol à vue (VLOS), **hauteur ≤ 120 m**, et surtout, art. 4(1)(f) : *« during flight, the unmanned aircraft does not carry dangerous goods and **does not drop any material** »*.
  → **Toute pulvérisation (eau comprise) constitue un largage de matière. Elle est donc impossible en catégorie Ouverte.** Le nettoyage, le démoussage et la pulvérisation par drone relèvent forcément de la catégorie **Spécifique**.
  - Rappels Ouverte (utiles pour la seule prise de vue de diagnostic, sans pulvérisation) : A1 (C0/C1), A2 (C2 ; 30 m des personnes, 5 m en mode basse vitesse), A3 (C2 à C4 ; à 150 m des zones résidentielles, commerciales, industrielles ou récréatives, donc **inutilisable près des maisons**). En France, le vol en espace public en agglomération est interdit en Ouverte, sauf notification. Les BAPD obtenus par déclaration sur l'honneur ne sont plus valides depuis le 1/1/2026.
- **Spécifique** (art. 5). Dès qu'une condition de l'Ouverte n'est pas remplie, il faut soit une **déclaration** selon un scénario standard (STS), soit une **autorisation d'exploitation** de la DSAC, fondée sur une analyse de risques SORA ou sur une PDRA, soit un certificat LUC.
- **Certifiée** (art. 6). Elle couvre le transport de personnes, le survol de rassemblements avec un drone de plus de 3 m, et le **transport de marchandises dangereuses présentant un risque élevé** pour les tiers en cas d'accident. Elle n'est **a priori pas concernée** par Drone Éclat, sauf si la SORA conclut à un risque très élevé (SAIL VI). ⚠️

### 1.2 Scénarios standard européens (STS) et nationaux

| Scénario | Statut au 25/11/2026 | Conditions principales |
|---|---|---|
| **S1, S2, S3 (scénarios nationaux français)** | **Abrogés depuis le 1er janvier 2026.** Plus aucune nouvelle déclaration depuis le 1/1/2024. Les exploitants déjà déclarés ont pu voler jusqu'au 31/12/2025. Les titres nationaux associés (attestations, certificats) n'existent plus. Le ministère a refusé tout moratoire (réponse à la question écrite Sénat n° 06232, publiée le 4/12/2025). | Ne plus jamais les mentionner comme cadre en vigueur. |
| **STS-01** | En vigueur (depuis le 1/1/2024) | VLOS, **zone terrestre contrôlée**, possible en zone peuplée. Drone de **classe C5** (MTOM ≤ 25 kg, avec terminaison de vol et parachute ou équivalent). Vitesse sol < 5 m/s si le drone est non captif. **Hauteur ≤ 120 m.** Zone tampon de risque au sol ; pour un **drone captif**, rayon = longueur du câble + 5 m (UAS.STS-01.020(c)(ii)). **Pas de marchandises dangereuses à bord** (UAS.STS-01.010(4)). Télépilote : CATS théorique, formation pratique STS et test du système de terminaison de vol. Exploitant : MANEX et plan d'urgence (ERP). Déclaration sur AlphaTango, avec accusé de réception avant de commencer. |
| **STS-02** | En vigueur | BVLOS **hors zone peuplée**, drone C6. **Sans intérêt** pour le nettoyage de bâtiments. |
| **PDRA-S01** | Disponible (canevas DSAC en français) | Équivalent de STS-01 **sans exiger de classe C5**, VLOS, ≤ 120 m, MTOM 25 kg. Passe par une **autorisation** DSAC, pas par une simple déclaration. |
| **PDRA-G03** | Disponible | Inspection d'infrastructures. Peu adaptée. |
| **SORA complète** | Toujours possible | Obligatoire au-delà de 25 kg, pour un drone non classé hors PDRA, ou en cas de transport de marchandises dangereuses. Dossier déposé sur la plateforme **METEOR** de la DSAC. |

**Conséquence pratique** : un drone de nettoyage ou de pulvérisation du marché pèse souvent plus de 25 kg une fois plein. Il n'entre alors ni en Ouverte, ni en STS, ni en PDRA-S01, et **une autorisation d'exploitation fondée sur une SORA est nécessaire.** Même sous 25 kg, STS-01 suppose un drone **marqué C5**, et le transport de produit « dangereux » l'exclut (voir § 2).

### 1.3 Démarches de l'exploitant

- **Enregistrement d'exploitant UAS** sur **AlphaTango** (portail DGAC), obligatoire avant toute activité. Le numéro d'exploitant doit être apposé sur le drone.
- **Signalement électronique** : dispositif européen d'identification à distance (Remote ID) exigé en catégorie Spécifique depuis le 1/1/2024. En France, signalement obligatoire pour les drones de 800 g et plus.
- **MANEX** (manuel d'exploitation) obligatoire en STS et en autorisation. Il n'est pas à déposer pour un STS, mais doit être présenté en cas de contrôle.
- **Déclaration STS-01** sur AlphaTango, ou **demande d'autorisation** (SORA ou PDRA) sur METEOR. Le dossier comprend une déclaration de conformité aux règles sur la vie privée, les données, l'assurance, la sûreté et l'**environnement**.
- **Notification préalable des vols en zone peuplée (catégorie Spécifique)** : art. 6 de l'arrêté du 3 décembre 2020 relatif à l'utilisation de l'espace aérien par les aéronefs sans équipage à bord. Elle se fait auprès du **préfet du département** (préfecture de l'Oise pour le 60), via **AlphaTango** ou le **CERFA 15476**, avec un **préavis de 10 jours ouvrables** (jour du dépôt et premier jour de vol exclus). Le préfet peut interdire ou restreindre le vol. Est réputé « zone peuplée » le vol dans une agglomération ou à moins de 50 m de celle-ci, ou à moins de 150 m d'un rassemblement de personnes. ⚠️ Vérifier la version consolidée sur Légifrance : d'anciennes versions et d'anciens guides indiquaient 5 jours.
- **Dérogations** (vol de nuit, hauteur) : demande au préfet **au moins 30 jours avant**, formulaire R5-UAS-DEROG. Vol au-delà de 120 m : CERFA 15478*02 auprès de la DSAC/IR.
- **Zones restreintes** : avant chaque mission, consulter la **carte des restrictions UAS du Géoportail** (DGAC/IGN, 0 à 120 m) et les données ED-269 du SIA. Dans l'Oise, il faut notamment vérifier les abords de l'aéroport de Beauvais-Tillé, des aérodromes et des emprises militaires, ainsi que les **ZICAD** (zones interdites à la captation aérienne de données). ⚠️ Faire le contrôle au cas par cas.
- **Événements de sécurité** : notification des accidents et incidents (formulaire CRESUS).

### 1.4 Formation des télépilotes

- **STS-01** : certificat théorique **CATS** (examen DGAC) + **attestation de formation pratique STS** + test du système de terminaison de vol.
- **Autorisation SORA ou PDRA** : compétences fixées par l'autorisation, généralement CATS ou équivalent plus une formation pratique propre à l'exploitant décrite dans le MANEX.
- Les certificats nationaux (ancien « télépilote S1-S3 ») **ne valent plus rien** depuis le 1/1/2026 pour voler en scénario.

### 1.5 Assurance et responsabilité

- Le télépilote et l'exploitant sont responsables de plein droit des dommages causés au sol (Code des transports et page DGAC). AlphaTango demande une police professionnelle, ou à défaut une RC couvrant l'activité.
- ⚠️ Le règlement (CE) 785/2004 (assurance des exploitants d'aéronefs) s'applique, selon notre lecture, aux aéronefs de **MTOM ≥ 20 kg**, ce qui concerne la plupart des drones de nettoyage. À faire confirmer par un courtier spécialisé.
- L'assurance doit couvrir **explicitement** la pulvérisation, les dommages aux toitures, aux véhicules et aux façades voisines (dérive), ainsi que la pollution accidentelle. Une RC « prise de vue aérienne » ne suffit pas.

### 1.6 Marquage de classe, masse et distances

- **C5** (STS-01) et **C6** (STS-02) : MTOM ≤ 25 kg. Un drone sans marquage de classe ne peut pas voler en STS. Il est limité à A3 en Ouverte (< 25 kg) ou nécessite une autorisation (PDRA ou SORA).
- **Hauteur maximale** : 120 m (sans objet en pratique, puisque le travail se fait près de la toiture).
- **Distances** : en STS-01, la zone terrestre contrôlée et la zone tampon doivent être **exemptes de tiers non impliqués**. Il faut donc **baliser et faire évacuer** la zone (jardins, trottoirs, voirie : un arrêté municipal d'occupation de la voirie peut être nécessaire). En autorisation SORA, les distances sont fixées par l'autorisation.

---

## 2. Drone transportant de l'eau ou un produit : emport, largage, pulvérisation, captif

1. **Largage** : la pulvérisation est un largage de matière. Elle est **interdite en Ouverte** (art. 4(1)(f)) et doit être couverte par la déclaration STS ou par l'autorisation d'exploitation. L'autorisation DSAC doit **mentionner expressément le dispositif de pulvérisation** (masse, centrage, effet du jet sur la stabilité, dérive). ⚠️
2. **Marchandises dangereuses** : selon l'art. 2(11) du règl. 2019/947, ce sont les *« articles or substances which are capable of posing a hazard to health, safety, property or the environment in the case of an incident or accident, that the unmanned aircraft is carrying as its payload »*, notamment les substances toxiques, corrosives et dangereuses pour l'environnement.
   - **Eau seule** : pas une marchandise dangereuse.
   - **Biocide ou produit chimique étiqueté dangereux** (pictogrammes CLP corrosif, toxique, environnement) : **probablement** une marchandise dangereuse. Il est alors **exclu de STS-01** et doit faire l'objet d'une **SORA** qui évalue ce risque ; dans le pire des cas, il relève de la catégorie Certifiée. ⚠️ **Point majeur à faire trancher par la DSAC.**
3. **Masse** : un réservoir de 10 à 40 L d'eau ou de produit porte la MTOM bien au-delà de 25 kg. Il faut donc une SORA. Le déclarer honnêtement (MTOM réservoir plein).
4. **Drone captif ou alimenté par tuyau depuis le sol** :
   - Il reste un aéronef sans équipage soumis au règl. 2019/947 : le câble ou le tuyau ne fait pas sortir l'appareil du champ.
   - STS-01 prévoit un régime allégé pour le drone captif : zone tampon égale à la longueur du câble + 5 m, et pas de limite de vitesse de 5 m/s. Mais il reste exigé : classe C5, MTOM ≤ 25 kg (masse du tuyau supportée à prendre en compte ⚠️) et absence de marchandises dangereuses.
   - L'alimentation par tuyau réduit la masse embarquée. Elle peut **réduire le risque au sol** dans la SORA (confinement physique), mais introduit d'autres risques : traction du tuyau, accrochage à une gouttière ou à une antenne, chute du tuyau sur des tiers, pompe et groupe au sol (bruit, sécurité du chantier).
   - L'ancien régime national spécifique au « drone captif » n'existe plus en tant que tel. ⚠️ Faire valider la qualification exacte (captif ou non) du système envisagé auprès de la DSAC.
5. **Travaux en hauteur et sécurité du chantier** (Code du travail) : l'usage du drone ne dispense pas d'évaluer les risques du chantier, de faire un plan de prévention avec le client professionnel (sites industriels, agricoles) et de protéger les tiers.

---

## 3. Distinction par type de produit

> **Règle de méthode** : chaque catégorie de produit a son propre régime. On ne transpose **pas** l'interdiction phyto aux biocides, ni l'inverse.

### (a) Nettoyage à l'eau seule (basse ou haute pression, eau chaude, sans additif)

- **Aviation** : catégorie Spécifique (largage d'eau), STS-01 avec un drone C5 ≤ 25 kg ou autorisation PDRA-S01 ou SORA.
- **Produit** : aucun régime biocide ou phyto. ⚠️ Si de l'eau est additionnée d'un nettoyant ou d'un détergent, on bascule en (d), voire en (b) si le produit revendique un effet anti-mousse ou anti-algue.
- **Environnement** : les eaux de rinçage chargées de mousses, de lichens, de particules de tuile ou de fibrociment, voire de peinture, rejoignent les gouttières et le **réseau pluvial**. Voir § 4.
- ⚠️ **Toitures et bardages en fibrociment amiantés** (fréquents sur les bâtiments agricoles et anciens) : le nettoyage à haute pression peut libérer des fibres d'amiante, ce qui relève du Code du travail (sous-section 4, repérage amiante avant travaux). **Risque juridique et sanitaire majeur.** Prévoir un repérage préalable ou exclure ces supports.

### (b) Produits biocides : l'anti-mousse de toiture

- **Qualification** : sur le marché français, les « anti-mousse », « anti-verdissure » et « démoussants » pour toitures et façades sont **en général des biocides de type TP2** (désinfectants et produits algicides non destinés à l'humain ni à l'animal) **et/ou TP10** (protection des matériaux de construction). Exemple : la fiche technique d'un démoussant professionnel indique « TP2 et TP10 » pour toitures en tuiles, ardoises et fibrociment. **La qualification dépend de chaque produit** (étiquette, numéro d'inventaire ou d'AMM). ⚠️ Un produit contenant une substance herbicide et destiné uniquement aux mousses peut être un **phyto** : vérifier produit par produit.
- **La pulvérisation par aéronef est-elle interdite ?**
  - L'**art. L253-8 du CRPM** ne vise **que les produits phytopharmaceutiques**. Il ne s'applique pas, en tant que tel, aux biocides. La directive 2009/128/CE (dont il est la transposition) concerne elle aussi les seuls pesticides et phytos.
  - Le **règlement (UE) 528/2012** ne fixe **pas de conditions de traitement aérien** (ARS Grand Est, avril 2023).
  - En France, les traitements biocides par épandage aérien peuvent être encadrés au titre de l'**art. L1311-2 du Code de la santé publique** : arrêtés préfectoraux ou municipaux pour protéger la santé publique (ARS Grand Est, 2023). ⚠️ On ignore si une procédure d'autorisation préfectorale est exigée pour un traitement de toiture par drone. Interroger l'**ARS Hauts-de-France** et la préfecture de l'Oise.
  - **Conclusion** : **aucune interdiction générale de pulvérisation aérienne des biocides n'a été identifiée**. Ce n'est **pas** une autorisation expresse pour autant. ⚠️ **Incertitude élevée.**
- **Conditions d'emploi du produit** : l'art. 17(5) du règl. 528/2012 impose d'utiliser les biocides *conformément aux conditions de l'autorisation* et à l'étiquetage. Si l'étiquette prévoit « pulvérisateur, pinceau, rouleau », « application de bas en haut sur support sec », « protéger la végétation », « 3 h sans pluie », la conformité d'une **pulvérisation depuis un drone en vol** à ces conditions est **incertaine** : dérive, homogénéité, impossibilité d'appliquer « de bas en haut ». ⚠️ Obtenir **par écrit** l'avis du fabricant ou du détenteur de l'AMM. Privilégier un produit dont l'autorisation n'exclut pas ce mode d'application.
- **Certibiocide** (arrêté du 9 octobre 2013 modifié ; notice ministérielle de mai 2025) :
  - **TP2 : oui.** C'est le « Certibiocide désinfectants », dont la période de transition s'est achevée le **1er janvier 2026**. La personne qui choisit le produit et le protocole (le décideur, dans une petite entreprise souvent le gérant télépilote) doit le détenir. Le certificat est individuel (personne physique), valable 5 ans, après 7 h de formation.
  - **TP10 : non** soumis au Certibiocide.
  - Un produit **TP2 + TP10** est dans le champ du TP2, donc **Certibiocide requis**. ⚠️ Faire confirmer la catégorie exacte de certificat pour un usage algicide en toiture (la notice range le TP2 sous « désinfectants »).
  - L'entreprise doit faire une **déclaration annuelle d'activité** sur l'application CERTIBIOCIDE avant le 31 mars et tenir la liste de son personnel formé.
- **Publicité** : le site doit respecter l'encadrement de la publicité pour les biocides (art. L522-5-3 C. env., décret n° 2019-643 du 26 juin 2019) et ne pas présenter le produit de façon trompeuse (pas de « sans danger », « non toxique », « écologique » non justifié ; voir art. 72(3) du règl. 528/2012). ⚠️ Faire vérifier les mentions obligatoires si le site cite des produits.

### (c) Produits phytopharmaceutiques

- **Principe** : **pulvérisation aérienne interdite** (art. L253-8 I CRPM, transposant l'art. 9 de la directive 2009/128/CE). L'interdiction couvre les drones (ARS Grand Est 2023 ; réponses ministérielles AN 2023).
- **Dérogations** :
  - danger sanitaire grave, par arrêté conjoint des trois ministres (I bis A) ;
  - **loi n° 2025-365 du 23 avril 2025** (« drones agricoles ») et ses textes d'application parus fin mai 2026 (**décret n° 2026-422 du 29 mai 2026**, **arrêté du 29 mai 2026**, NOR AGRG2612857A, arrêtés du 19 mai 2026 dont la liste d'environ 150 produits). Ils autorisent des programmes par drone **uniquement sur des parcelles agricoles** (pente ≥ 20 %, bananeraies, vignes mères de porte-greffes, autres cultures après essais), **uniquement** pour les produits de biocontrôle, utilisables en bio ou à faible risque, sur **autorisation du préfet de région**. Ils exigent le Certiphyto, une MTOM ≤ 200 kg, un dispositif anti-dérive, une autorisation d'exploitation DSAC, un vol à 3 m au plus au-dessus de la culture, une vitesse de 18 km/h au plus et une **distance minimale de 20 m des lieux habités**.
  - → **Aucune de ces dérogations ne couvre les toitures, façades, bardages ou bâtiments**, y compris agricoles.
- **En plus** : depuis le 1er juillet 2022 (arrêté du 15 janvier 2021, extension de la loi Labbé, art. L253-7 CRPM), les phytos sont **interdits dans les propriétés privées à usage d'habitation** et dans de nombreux lieux collectifs, sauf biocontrôle, bio ou faible risque.
- **Verdict** : **interdit** de pulvériser un phyto par drone sur une toiture, une façade ou un bâtiment.

### (d) Autres produits chimiques (hydrofuges, imperméabilisants, nettoyants, détergents)

- **Qualification** : un hydrofuge **sans revendication biocide** et sans substance active biocide n'est ni biocide ni phyto. Il relève de REACH/CLP (FDS, étiquetage). ⚠️ Beaucoup de produits combinés (« anti-mousse + hydrofuge ») sont **biocides** : il faut alors appliquer le régime (b).
- **Aviation** : un produit classé dangereux est probablement une marchandise dangereuse, donc SORA (voir § 2).
- **Produit** : pas de régime d'interdiction aérienne spécifique identifié. Il faut respecter la FDS (EPI, conditions d'application, interdiction de rejet), le droit de l'eau et la responsabilité pour dérive. ⚠️ Incertitude moyenne : vérifier la FDS (certaines prescrivent une application au rouleau ou à basse pression uniquement).

---

## 4. Environnement, voisinage, vie privée

### 4.1 Eaux, ruissellement, points d'eau

- **Délit de pollution des eaux** (art. L216-6 C. env.) : déversement de substances nuisibles dans les eaux superficielles ou souterraines. Atteinte à la faune piscicole (art. L432-2 C. env.).
- **Réseau public** : tout rejet d'eaux usées **non domestiques** dans le réseau public de collecte doit être autorisé par la collectivité (art. L1331-10 CSP). Le règlement d'assainissement et le règlement pluvial de la commune ou de l'intercommunalité fixent les règles locales, souvent avec interdiction de rejeter des produits au pluvial. ⚠️ Vérifier commune par commune dans l'Oise.
- **Bonnes pratiques à documenter** : obturer ou dévier les descentes de gouttières, récupérer les eaux de rinçage (filtration), ne pas traiter avant la pluie (étiquette : 3 h sans pluie au minimum), prévenir le client s'il **récupère les eaux de pluie** (dérivation pendant les 2 à 3 pluies suivantes selon l'étiquette type), protéger les végétaux, bassins, mares et puits.
- **Points d'eau** : les zones non traitées réglementaires (arrêté du 4 mai 2017, 5 m minimum) concernent les **phytos**, pas directement les biocides. Pour un biocide, il faut appliquer les distances de l'étiquette. ⚠️ Ne pas transposer.
- **Sites ICPE et agricoles** : chez un client ICPE ou un exploitant agricole, il faut respecter ses prescriptions (gestion des eaux pluviales, zones sensibles).

### 4.2 Voisinage

- **Dérive** sur les voitures, façades, piscines, potagers ou animaux du voisin : responsabilité civile (art. 1240 C. civ.) et **trouble anormal de voisinage** (art. 1253 C. civ., créé par la loi n° 2024-346 du 15 avril 2024).
- **Bruit** : le règlement sanitaire départemental et les arrêtés municipaux de l'Oise sur les horaires des activités bruyantes s'appliquent (drone, pompe, groupe).
- **Survol de la propriété d'autrui** : la zone terrestre contrôlée suppose l'accord ou l'évacuation des voisins. Prévoir une information écrite préalable.

### 4.3 Vie privée et images (RGPD)

- La caméra du drone (pilotage, inspection avant/après) **capte des données personnelles** (personnes, plaques, jardins voisins). Il faut appliquer le RGPD : base légale (contrat avec le client, intérêt légitime pour l'inspection), **information des personnes** présentes (exigence rappelée par la DGAC), minimisation (cadrer sur la toiture du client), durée de conservation définie, registre des traitements.
- **Atteinte à la vie privée** : art. 9 C. civ. et art. 226-1 C. pén. (capter l'image d'une personne dans un lieu privé sans son consentement). **Ne jamais filmer l'intérieur des habitations ni les jardins voisins.** Il faut l'accord des personnes ou du propriétaire pour toute diffusion d'images identifiantes, y compris en **portfolio sur le site**.
- **ZICAD** : captation interdite dans les zones définies par arrêté.
- **Avant/après publiés sur le site** : n'utiliser que des images de clients ayant **donné un accord écrit**, sans visages, plaques ni adresses identifiables, et flouter les propriétés voisines.

---

## 5. Ce que le site PEUT affirmer (formulations proposées)

> Sous réserve que les conditions correspondantes soient **effectivement remplies** au moment de la publication.

1. « Nettoyage de toitures, façades et bardages par drone, **dans le respect de la réglementation aérienne européenne et française**. »
2. « Exploitant d'aéronefs sans équipage enregistré auprès de la DGAC (n° d'exploitant : FRA-xxxx). » *(uniquement si c'est vrai)*
3. « Télépilotes titulaires du certificat théorique CATS et formés aux opérations en catégorie spécifique. » *(si c'est vrai)*
4. « Chaque intervention fait l'objet d'une **étude préalable** : zones aériennes, accès, sécurité du chantier, notification en préfecture lorsque la réglementation l'exige. »
5. « Le chantier est **balisé** et les abords sont sécurisés pendant le vol. »
6. « Nettoyage **à l'eau** par drone, sans échafaudage ni nacelle, ce qui limite le travail en hauteur. »
7. « Les traitements anti-mousse sont réalisés avec des **produits biocides autorisés**, appliqués **conformément à leur étiquette** par un applicateur titulaire du Certibiocide. » *(seulement une fois validé, voir § 6)*
8. « Selon le support et la configuration, nous vous proposons la technique la plus adaptée : **drone, ou application manuelle ou au sol**. »
9. « Nous prenons des mesures pour **limiter le ruissellement** et protéger végétaux, bassins et récupérateurs d'eau de pluie. »
10. « Devis après diagnostic ; certaines interventions peuvent nécessiter un délai administratif préalable (environ deux semaines) en zone urbaine. »
11. « Assurance responsabilité civile professionnelle couvrant l'activité drone. » *(si la police couvre bien la pulvérisation)*
12. « Les images captées servent uniquement au diagnostic et au compte rendu de votre chantier. »

## 6. Ce que le site NE DOIT PAS affirmer

| À proscrire | Pourquoi | Alternative |
|---|---|---|
| « Pulvérisation **autorisée** par la DGAC » / « **homologué** DGAC » / « drone certifié » | La DGAC n'« homologue » pas un service. Une déclaration n'est pas une autorisation. La catégorie Certifiée n'est pas concernée. | « Exploitant enregistré DGAC ; opérations déclarées ou autorisées selon le cadre applicable. » |
| « Démoussage par drone **100 % légal** » / « **conforme à la loi Duplomb / loi drones 2025** » | Les lois de 2025 ne concernent que les **phytos sur parcelles agricoles**. Le statut de la pulvérisation de biocide par drone est incertain. | Ne pas citer ces lois. |
| « Agréé / habilité à la pulvérisation aérienne » | Il n'existe pas d'habilitation générale. Pour les phytos, c'est interdit hors cas agricoles. | – |
| « Traitement **phytosanitaire** de toiture » / « **désherbant** toiture » / « pesticide » | Un phyto par drone sur un bâtiment est **interdit** (L253-8), et un phyto sur une propriété d'habitation l'est aussi (Labbé). | « Traitement anti-mousse (produit biocide) ». |
| « Produit **écologique**, **naturel**, **sans danger**, **non toxique**, **biodégradable**, inoffensif pour les animaux et les enfants » | Revendications interdites ou trompeuses pour un biocide (art. 72(3) règl. 528/2012 ; pratiques commerciales trompeuses). | « Produit biocide autorisé, utilisé selon son étiquette. Utilisez les biocides avec précaution. » |
| « Scénario **S3** » / « télépilote S1-S3 » / « certificat télépilote DGAC » (ancien) | **Abrogés depuis le 1/1/2026.** | Mentionner STS-01, autorisation DSAC, CATS. |
| « Sans autorisation, intervention immédiate / le jour même partout » | Préavis de 10 jours ouvrables en zone peuplée, zones restreintes, météo. | « Planification sous 2 à 3 semaines selon la commune. » |
| « Aucun ruissellement » / « zéro rejet » / « zéro impact » | Invérifiable. | « Mesures pour limiter le ruissellement. » |
| « Garantie 10 ans » sur le démoussage / « mousse éliminée définitivement » | Allégation non justifiée. Risque de confusion avec la garantie décennale (Code civil). | Durée indicative avec conditions. |
| « Nous survolons sans déranger vos voisins » / « vos voisins n'ont rien à faire » | La zone doit être libre de tiers, et il y a des obligations d'information et de vie privée. | « Nous informons le voisinage si nécessaire. » |
| Logo ou baseline « **Pulvérisation** » présenté comme service générique, sans précision | Laisse entendre que tout produit peut être pulvérisé par drone. | « Pulvérisation d'eau et de traitements anti-mousse autorisés ». ⚠️ Envisager d'adapter la baseline tant que le point biocide n'est pas validé. |
| Mention de marques ou de produits précis avec allégations d'efficacité | Encadrement de la publicité biocide. | Citer le type de produit sans promesse. |
| Usage de logos officiels (DGAC, Marianne, EASA) | Risque d'induire une caution officielle. | Texte simple. |

---

## 7. Points à faire valider (par qui, niveau d'incertitude)

| # | Question | Interlocuteur | Incertitude |
|---|---|---|---|
| 1 | Un biocide anti-mousse (TP2/TP10) dilué et étiqueté dangereux est-il une **« marchandise dangereuse »** au sens de l'art. 2(11) du règl. 2019/947 ? Il serait alors exclu de STS-01, ce qui impose une SORA, voire la catégorie Certifiée. | DSAC (pôle drones / DSAC-IR Nord) | **Élevée** |
| 2 | La **pulvérisation par drone d'un biocide** sur une toiture est-elle soumise à autorisation ou encadrement préfectoral au titre de l'art. L1311-2 CSP ou d'un arrêté local dans l'Oise ? | ARS Hauts-de-France, préfecture de l'Oise (DDPP/DDT), avocat en droit de l'environnement | **Élevée** |
| 3 | L'**étiquette ou l'AMM** du produit choisi permet-elle une application par drone ? (« pulvérisateur », basse pression, de bas en haut, protection de la végétation) | Fabricant / détenteur de l'AMM (avis écrit), ANSES (base des AMM biocides) | **Élevée** |
| 4 | Catégorie exacte de **Certibiocide** pour un TP2 algicide en toiture (« désinfectants » ?), et statut d'un produit TP2 + TP10. | DRAAF/DREAL, organisme de formation habilité, ministère (application CERTIBIOCIDE) | Moyenne |
| 5 | Cadre aviation pour le **drone alimenté par tuyau** : qualification de « captif », prise en compte de la masse du tuyau dans la MTOM, éligibilité STS-01 ou PDRA-S01. | DSAC | Moyenne à élevée |
| 6 | Délai exact de **notification préfectorale** (10 jours ouvrables selon l'art. 6 de l'arrêté du 3/12/2020 ; vérifier la version consolidée sur Légifrance) et modalités dans l'Oise. | Préfecture de l'Oise / AlphaTango | Faible à moyenne |
| 7 | Obligation d'assurance au titre du **règl. 785/2004** pour un drone de MTOM ≥ 20 kg, et étendue des garanties (pulvérisation, pollution, dérive). | Courtier aviation, avocat | Moyenne |
| 8 | Rejet des eaux de rinçage au **pluvial** : faut-il une autorisation de rejet non domestique (L1331-10 CSP) ? Quelles règles d'assainissement locales ? | Services assainissement des EPCI de l'Oise, avocat | Moyenne |
| 9 | **Amiante** dans les toitures et bardages en fibrociment (bâtiments agricoles) : repérage avant travaux, interdiction de nettoyage à haute pression. | Inspection du travail / CARSAT, OPPBTP | Moyenne (risque grave) |
| 10 | Mentions obligatoires et interdictions de **publicité biocide** applicables au site (décret 2019-643, art. 72 règl. 528/2012). | Avocat en droit de la consommation | Moyenne |
| 11 | Conformité **RGPD** (registre, mentions d'information, conservation, usage des photos avant/après). | DPO / avocat, guide CNIL | Faible |
| 12 | Un **hydrofuge** du catalogue contient-il une substance biocide ou une revendication anti-mousse ? Si oui, régime (b). | Fabricant (FDS) | Faible à moyenne |
| 13 | La **qualification biocide ou phyto** de chaque produit utilisé (un démoussant à base d'herbicide serait un phyto, donc interdit par drone). | Fabricant, base e-phy (ANSES), base des biocides | Moyenne |

---

## 8. Sources (toutes consultées le 25/11/2026)

**Aviation**
- Règlement d'exécution (UE) 2019/947, version consolidée du 1/5/2025 (art. 2(11), 4(1)(f), 5, 12 ; UAS.STS-01.010 et .020) : https://eur-lex.europa.eu/eli/reg_impl/2019/947/2025-05-01/eng/pdf
- DGAC : exploitation de drones en catégorie spécifique (publié le 25/04/2025) : https://www.ecologie.gouv.fr/politiques-publiques/exploitation-drones-categorie-specifique
- DGAC : exploitation de drones en catégorie ouverte (publié le 01/04/2025) : https://www.ecologie.gouv.fr/politiques-publiques/exploitation-drones-categorie-ouverte
- DGAC : STS européens, entrée en application et transition (oct. 2023) : https://www.ecologie.gouv.fr/sites/default/files/2023-10_sts_europeens_entree_application_transition.pdf
- DGAC : FAQ transition européenne UAS : https://www.ecologie.gouv.fr/sites/default/files/documents/FAQ_Transition_europeenne_UAS.pdf
- DGAC : Guide de mise en œuvre SORA : https://www.ecologie.gouv.fr/sites/default/files/Guide_de_mise_en_oeuvre_SORA.pdf
- Sénat, question écrite n° 06232 (Mme Le Houérou, 02/10/2025), réponse du 04/12/2025 sur la fin des scénarios nationaux : https://www.senat.fr/questions/base/2025/qSEQ251006232.html
- Arrêté du 3 décembre 2020 relatif à l'utilisation de l'espace aérien par les aéronefs sans équipage à bord, art. 6 (copie consolidée OPPBTP ; à recouper sur Légifrance) : https://content.preventionbtp.fr/pdf/droit_de_la_prevention/article-6-de-l-arrete-du-3-decembre-2020-relatif-a-l-utilisation-de-l-espace-aerien-par-les-aeronefs-sans-equipage-a-bord.pdf
- CERFA 15476 (notification préalable de vol) : https://www.var.gouv.fr/contenu/telechargement/25753/178141/file/cerfa_15476-03.pdf
- Formulaire R5-UAS-DEROG : https://www.loiret.gouv.fr/contenu/telechargement/69974/546832/file/Form_R5-UAS-DEROG_v4.pdf
- Contacts drones des préfectures (DGAC) : https://www.ecologie.gouv.fr/sites/default/files/documents/Contacts_drones_pr%C3%A9fectures_0.pdf
- Carte des restrictions UAS : Géoportail (DGAC/IGN), https://www.geoportail.gouv.fr (couche « Restrictions UAS catégorie Ouverte et aéromodélisme »)
- AlphaTango (portail DGAC) : https://alphatango.aviation-civile.gouv.fr

**Phytopharmaceutiques et pulvérisation aérienne**
- Sénat : état d'application de la loi n° 2025-365 du 23/04/2025 (MAJ 10/04/2026) : https://www.senat.fr/application-des-lois/ppl24-273.html
- Sénat : texte adopté (nouvel art. L253-8 CRPM) : https://www.senat.fr/leg/tas24-103.html
- Ministère de l'Agriculture : publication des textes autorisant les drones pour certains phytos (communiqué du 10/06/2026) : https://agriculture.gouv.fr/protection-des-cultures-publication-des-textes-autorisant-lutilisation-de-drones-pour-lapplication
- Arrêté du 29 mai 2026 (NOR AGRG2612857A), JO du 31/05/2026 : https://draaf.centre-val-de-loire.agriculture.gouv.fr/IMG/pdf/joe_20260531_0126_0022_arrete_du_29_mai_2026.pdf
- Assemblée nationale, QE n° 8530 (16e lég.) et réponse : https://www.assemblee-nationale.fr/dyn/16/questions/QANR5L16QE8530.pdf
- Assemblée nationale, QE n° 3895 (16e lég.), réponse du 04/07/2023 : https://www.assemblee-nationale.fr/dyn/16/questions/QANR5L16QE3895.pdf
- DRAAF Occitanie : extension de la loi Labbé au 1/7/2022 : https://draaf.occitanie.agriculture.gouv.fr/IMG/pdf/flyer_extension_loi_labbe-v6.pdf
- Arrêté du 15 janvier 2021 (extension Labbé) : https://draaf.bourgogne-franche-comte.agriculture.gouv.fr/IMG/pdf/arr_extension_loi_labbe_210115_cle073162-1.pdf
- Corteva (source secondaire, non officielle, 22/01/2026), synthèse de la loi 2025-365 : https://www.corteva.com/fr/cultures/toutes-cultures/pulverisation-par-drone-ce-que-permet-vraiment-la-loi-entraves.html

**Biocides**
- ARS Grand Est : précisions réglementaires sur l'usage des produits (avril 2023 : L253-8 limité aux phytos ; règl. 528/2012 muet sur le traitement aérien ; art. L1311-2 CSP) : https://www.grand-est.ars.sante.fr/media/109431/download
- Notice explicative Certibiocide (ministère, mai 2025) : https://draaf.paca.agriculture.gouv.fr/IMG/pdf/notice_explicative_certibiocide_mai_2025.pdf
- Arrêté du 9 octobre 2013 (Certibiocide), AIDA/INERIS : https://aida.ineris.fr/reglementation/arrete-091013-relatif-conditions-dexercice-lactivite-dutilisateur-professionnel
- Décret n° 2019-643 du 26/06/2019 (publicité biocides), AIDA : https://aida.ineris.fr/reglementation/decret-ndeg-2019-643-260619-relatif-a-publicite-commerciale-certaines-categories
- Ministère de la Transition écologique : produits biocides : https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides
- Exemple de fiche technique d'un démoussant toiture TP2/TP10 (source commerciale, illustration de la qualification) : https://algimouss.com/wp-content/uploads/ft-algi202.pdf
- OFSP (Suisse), fiche nettoyants et biocides en extérieur. **Droit suisse, non applicable en France**, cité uniquement pour les critères TP2/TP10 : https://www.anmeldestelle.admin.ch/dam/fr/sd-web/uSuH62Q-La9b/merkblatt-reinigungsmittel-oder-biozide-im-aussenbereich.pdf

**Vie privée**
- CNIL : caméras aéroportées (annexe 4, 2025) : https://www.cnil.fr/sites/default/files/2025-06/annexe_4_cameras_aeroportees.pdf
- CNIL : drones de loisir et vie privée : https://www.cnil.fr/fr/ou-piloter-son-drone-de-loisir-et-quelles-precautions-en-matiere-de-vie-privee

**Non consultés directement (cités de mémoire juridique, à vérifier sur Légifrance)** : art. L216-6 et L432-2 C. env. ; art. L1331-10 et L1311-2 CSP ; art. 9, 1240 et 1253 C. civ. ; art. 226-1 C. pén. ; règl. (CE) 785/2004 ; art. 17(5) et 72 du règl. (UE) 528/2012 ; arrêté du 4 mai 2017 (ZNT phytos). Légifrance n'a pas pu être interrogé automatiquement pendant cette recherche.
