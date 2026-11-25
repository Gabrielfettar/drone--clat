# Back-office des demandes : Google Sheets

Chaque demande envoyée par le formulaire du site (`/api/devis`) est ajoutée en haut du Google Sheet
**« Drone Éclat — Leads site web (back-office) »**, rangé dans Google Drive › DRONE ÉCLAT › 09 — COMMERCIAL.
Les photos jointes sont rangées dans un dossier Drive « Photos des demandes (site web) », un sous-dossier par demande, lié depuis la ligne.

## Mise en service (une seule fois, ~5 minutes)

1. Ouvrir le Sheet, puis **Extensions › Apps Script**.
2. Remplacer le contenu de `Code.gs` par `integrations/google-sheets/Code.gs` (ce dépôt). Enregistrer.
3. **Paramètres du projet (roue dentée) › Propriétés du script** :
   - `LEAD_TOKEN` : une longue chaîne aléatoire, par exemple générée avec `openssl rand -hex 24`.
   - `NOTIFY_EMAIL` (facultatif) : adresse(s) à prévenir à chaque nouvelle demande.
4. Dans l’éditeur, choisir la fonction `setup` puis **Exécuter** (accepter les autorisations Google).
   Elle met en forme les en-têtes, la liste déroulante des statuts, les couleurs, les filtres et crée l’onglet « Tableau de bord ».
5. **Déployer › Nouveau déploiement › Application Web** : *Exécuter en tant que* « Moi », *Accès* « Tout le monde ».
   Copier l’URL qui se termine par `/exec`.
6. Côté site, dans `.env.local` (ou les variables d’environnement de l’hébergeur) :
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
   GOOGLE_SHEETS_TOKEN=<la même valeur que LEAD_TOKEN>
   ```
7. Redémarrer le site, envoyer une demande de test : elle apparaît en ligne 2 du Sheet.

Le jeton empêche quiconque connaît l’URL d’écrire dans le Sheet. Ne le publiez pas.

## Utilisation au quotidien

| Colonne | Rôle |
|---|---|
| Statut | Liste : Nouveau, À rappeler, Appelé, Visite prévue, Devis envoyé, Relance, Gagné, Perdu, Hors zone / spam (colorée automatiquement) |
| Responsable, Prochaine action, Date de relance | Suivi commercial |
| Montant devis (€) | Alimente le CA signé dans « Tableau de bord » |
| Photos (Drive) | Lien vers le dossier des photos de la demande |
| Diagnostic préliminaire | Points d’attention calculés automatiquement (amiante, grande surface…) |

## Canaux d’envoi

`/api/devis` envoie la demande au Sheet **et**, si `RESEND_API_KEY` est configurée, par e-mail.
La demande est acceptée dès qu’au moins un canal a réussi. Avec `LEAD_LOCAL_SINK=1` (tests), une copie est aussi écrite dans `.leads/`.
