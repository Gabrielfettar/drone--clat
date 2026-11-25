# Back-office : demandes de devis dans Google Sheets

Chaque demande envoyée depuis le formulaire (3 étapes) est écrite dans le Google Sheet
**« Demandes de devis — back-office site »** (Drive : DRONE ÉCLAT — Nettoyage par drone / 09 — COMMERCIAL).

## Ce que contient le classeur
- **Demandes** : une ligne par demande (référence DE-AAAAMMJJ-XXXX, statut, priorité proposée, coordonnées, projet, lien vers le dossier photos, diagnostic automatique, page d'origine), puis les colonnes de suivi (responsable, prochaine action, date de relance, montant du devis, notes). Listes déroulantes de statut, relances en retard en rouge.
- **Tableau de bord** : volumes (total, mois, 7 jours), à traiter, relances en retard, taux de transformation, CA signé et en attente, répartition par statut, intervention et type de client.
- **Mode d'emploi** : suivi et installation.

## Chemin d'une demande
Site (`/api/devis`) → validation, anti-spam, contrôle des images → POST JSON vers l'application Web Apps Script
(`integrations/google-sheets/Code.gs`) avec un secret partagé → ligne ajoutée + photos rangées dans Drive « Photos devis/<référence> »
+ e-mail d'alerte (MailApp, gratuit, compte Google de l'entreprise).
L'e-mail via Resend reste possible en complément (variables `RESEND_*`) ; la demande est acceptée si au moins un canal l'a reçue.

## Activation (10 minutes, une seule fois, par le titulaire du compte Google)
1. Ouvrir le Sheet > Extensions > Apps Script, coller `Code.gs` (copie aussi dans le dossier Drive 09 — COMMERCIAL).
2. Propriétés du script : `LEADS_SECRET` (longue chaîne aléatoire), `NOTIFY_EMAIL` (destinataire des alertes).
3. Exécuter `testInstallation` et accepter les autorisations.
4. Déployer > Application Web, exécuter en tant que « Moi », accès « Tout le monde ». Copier l'URL `/exec`.
5. Côté hébergement du site : `GOOGLE_SHEETS_WEBHOOK_URL` = URL `/exec`, `LEADS_WEBHOOK_SECRET` = même valeur que `LEADS_SECRET`.

Sans ces variables : en local les demandes vont dans `.leads/`, en production le formulaire répond 503 (rien n'est perdu silencieusement).

## Régénérer le classeur
`python3 integrations/google-sheets/build_sheet.py sortie.xlsx` puis import dans Google Drive (conversion en Google Sheets).
