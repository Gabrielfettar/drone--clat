/**
 * Drone Éclat — réception des demandes de devis du site dans Google Sheets.
 *
 * À coller dans le Google Sheet « Demandes de devis — back-office » :
 *   Extensions > Apps Script > remplacer le contenu de Code.gs par ce fichier.
 * Puis :
 *   1. Paramètres du projet (roue dentée) > Propriétés du script > ajouter
 *        LEADS_SECRET   = une longue chaîne aléatoire (la même que LEADS_WEBHOOK_SECRET côté site)
 *        NOTIFY_EMAIL   = l'adresse qui reçoit une alerte à chaque demande (facultatif)
 *   2. Déployer > Nouveau déploiement > type « Application Web »
 *        Exécuter en tant que : Moi        Qui a accès : Tout le monde
 *      Copier l'URL /exec obtenue dans GOOGLE_SHEETS_WEBHOOK_URL côté site.
 *   3. Exécuter une fois la fonction « testInstallation » pour accorder les autorisations.
 *
 * Le site envoie un JSON { secret, lead, photos:[{name, type, data(base64)}] }.
 * Les photos sont rangées dans un dossier Drive « Photos devis / <référence> » à côté du Sheet.
 */

const SHEET_NAME = 'Demandes';
const PHOTOS_FOLDER = 'Photos devis';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    if (!props.getProperty('LEADS_SECRET') || body.secret !== props.getProperty('LEADS_SECRET')) {
      return json_({ ok: false, error: 'unauthorized' });
    }
    const lead = body.lead || {};
    const photosUrl = savePhotos_(lead.ref, body.photos || []);

    lock.waitLock(20000);
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const values = {
      'Reçu le': new Date(lead.receivedAt || Date.now()),
      'Référence': lead.ref,
      'Statut': 'Nouveau',
      'Priorité': lead.priority || 'Normale',
      'Nom': lead.name,
      'Téléphone': lead.phone ? "'" + lead.phone : '',
      'E-mail': lead.email,
      'Code postal': lead.postalCode ? "'" + lead.postalCode : '',
      'Commune': lead.city,
      'Adresse': lead.address,
      'Type de client': lead.clientType,
      'Bâtiment': lead.building,
      'Intervention': lead.service,
      'Surface (m²)': lead.surface || '',
      'Matériau': lead.material,
      'Hauteur': lead.height,
      'État': lead.condition,
      'Accès': lead.access,
      'Message': lead.message,
      'Photos': photosUrl,
      'Diagnostic auto': (lead.notes || []).join('\n'),
      "Page d'origine": lead.source,
    };
    sheet.appendRow(headers.map(function (h) { return values[h] !== undefined && values[h] !== null ? values[h] : ''; }));
    lock.releaseLock();

    notify_(lead, photosUrl);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function savePhotos_(ref, photos) {
  if (!photos.length) return '';
  const file = DriveApp.getFileById(SpreadsheetApp.getActive().getId());
  const parent = file.getParents().hasNext() ? file.getParents().next() : DriveApp.getRootFolder();
  const it = parent.getFoldersByName(PHOTOS_FOLDER);
  const root = it.hasNext() ? it.next() : parent.createFolder(PHOTOS_FOLDER);
  const folder = root.createFolder(String(ref || 'sans-reference'));
  photos.slice(0, 5).forEach(function (p) {
    const blob = Utilities.newBlob(Utilities.base64Decode(p.data), p.type || 'image/jpeg', p.name || 'photo.jpg');
    folder.createFile(blob);
  });
  return folder.getUrl();
}

function notify_(lead, photosUrl) {
  const to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  const lines = [
    'Nouvelle demande ' + lead.ref + ' (' + (lead.priority || 'Normale') + ')',
    '',
    (lead.service || '') + ' · ' + (lead.building || ''),
    (lead.postalCode || '') + ' ' + (lead.city || ''),
    (lead.name || '') + ' · ' + (lead.phone || '') + ' · ' + (lead.email || ''),
    lead.message ? '\n' + lead.message : '',
    photosUrl ? '\nPhotos : ' + photosUrl : '',
    '\nBack-office : ' + SpreadsheetApp.getActive().getUrl(),
  ];
  MailApp.sendEmail({ to: to, replyTo: lead.email || undefined, subject: '[Devis ' + lead.ref + '] ' + (lead.service || '') + ' · ' + (lead.city || ''), body: lines.join('\n') });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** À lancer une fois depuis l'éditeur : vérifie l'onglet et accorde les autorisations (Drive, Mail). */
function testInstallation() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Onglet « ' + SHEET_NAME + ' » introuvable.');
  DriveApp.getRootFolder();
  console.log('OK : onglet trouvé, ' + (sheet.getLastRow() - 1) + ' demande(s). Quota e-mail restant : ' + MailApp.getRemainingDailyQuota());
}
