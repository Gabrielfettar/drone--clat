/**
 * Drone Éclat — Back-office des demandes de devis (Google Sheets + Apps Script)
 *
 * Installation (5 minutes, voir docs/google-sheets-leads.md) :
 *  1. Ouvrir le Google Sheet « Drone Éclat — Leads site web (back-office) »
 *     (Drive › DRONE ÉCLAT › 09 — COMMERCIAL), puis Extensions › Apps Script.
 *  2. Coller ce fichier à la place du contenu de Code.gs, enregistrer.
 *  3. Paramètres du projet › Propriétés du script : ajouter
 *       LEAD_TOKEN   = une longue chaîne aléatoire (la même que GOOGLE_SHEETS_TOKEN côté site)
 *       NOTIFY_EMAIL = adresse(s) à prévenir à chaque demande (facultatif, séparées par des virgules)
 *  4. Exécuter une fois la fonction `setup` (autoriser l'accès demandé).
 *  5. Déployer › Nouveau déploiement › Type « Application Web »
 *       Exécuter en tant que : Moi   ·   Accès : Tout le monde
 *     Copier l'URL /exec dans GOOGLE_SHEETS_WEBHOOK_URL côté site.
 */

const SHEET_NAME = 'Leads';
const PHOTO_FOLDER_NAME = 'Photos des demandes (site web)';
const STATUSES = ['Nouveau', 'À rappeler', 'Appelé', 'Visite prévue', 'Devis envoyé', 'Relance', 'Gagné', 'Perdu', 'Hors zone / spam'];
const HEADERS = ['Reçu le', 'Référence', 'Statut', 'Profil', 'Intervention', 'Bâtiment', 'Surface (m²)', 'Code postal', 'Commune', 'Adresse',
  'Nom', 'Société', 'Téléphone', 'E-mail', 'Message', 'Nb photos', 'Photos (Drive)', 'Diagnostic préliminaire', "Page d'origine",
  'Responsable', 'Prochaine action', 'Date de relance', 'Montant devis (€)', 'Notes'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.getSheets()[0];
    sh.setName(SHEET_NAME);
  }
  return sh;
}

/** Mise en forme du back-office : en-têtes, gel, liste de statuts, couleurs, filtres. À lancer une fois. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = sheet_();
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#0a1f37').setFontColor('#ffffff').setWrap(true).setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setFrozenColumns(2);
  sh.setRowHeight(1, 36);
  const widths = { 1: 140, 2: 150, 3: 130, 4: 160, 5: 220, 9: 140, 11: 160, 13: 130, 14: 220, 15: 300, 17: 200, 18: 360, 24: 300 };
  Object.keys(widths).forEach((c) => sh.setColumnWidth(Number(c), widths[c]));

  const rows = Math.max(sh.getMaxRows() - 1, 999);
  const statusRange = sh.getRange(2, 3, rows, 1);
  statusRange.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build());
  sh.getRange(2, 22, rows, 1).setNumberFormat('dd/mm/yyyy');
  sh.getRange(2, 1, rows, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange(2, 23, rows, 1).setNumberFormat('#,##0 €');

  const colors = { 'Nouveau': '#e4f2fc', 'À rappeler': '#fff4d6', 'Appelé': '#eef1f5', 'Visite prévue': '#ede7fb', 'Devis envoyé': '#fde9d9', 'Relance': '#fbe7ea', 'Gagné': '#e3f4ec', 'Perdu': '#eeeeee', 'Hors zone / spam': '#f5f5f5' };
  const rules = STATUSES.map((s) => SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s).setBackground(colors[s]).setRanges([statusRange]).build());
  sh.setConditionalFormatRules(rules);
  if (!sh.getFilter()) sh.getRange(1, 1, sh.getMaxRows(), HEADERS.length).createFilter();

  // Onglet de synthèse simple
  let dash = ss.getSheetByName('Tableau de bord');
  if (!dash) dash = ss.insertSheet('Tableau de bord');
  dash.clear();
  dash.getRange('A1').setValue('Demandes par statut').setFontWeight('bold');
  STATUSES.forEach((s, i) => {
    dash.getRange(i + 2, 1).setValue(s);
    dash.getRange(i + 2, 2).setFormula(`=COUNTIF(${SHEET_NAME}!C:C;"${s}")`);
  });
  dash.getRange('D1').setValue('Demandes par profil').setFontWeight('bold');
  ['Particulier', 'Syndic / copropriété', 'Entreprise / industrie', 'Collectivité / patrimoine'].forEach((p, i) => {
    dash.getRange(i + 2, 4).setValue(p);
    dash.getRange(i + 2, 5).setFormula(`=COUNTIF(${SHEET_NAME}!D:D;"${p}")`);
  });
  dash.getRange('G1').setValue('Total demandes').setFontWeight('bold');
  dash.getRange('G2').setFormula(`=COUNTA(${SHEET_NAME}!B2:B)`);
  dash.getRange('H1').setValue('Taux de signature').setFontWeight('bold');
  dash.getRange('H2').setFormula('=IFERROR(B8/G2;0)').setNumberFormat('0 %');
  dash.getRange('I1').setValue('CA signé (€)').setFontWeight('bold');
  dash.getRange('I2').setFormula(`=SUMIF(${SHEET_NAME}!C:C;"Gagné";${SHEET_NAME}!W:W)`).setNumberFormat('#,##0 €');
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function photoFolder_() {
  const ssFile = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
  const parents = ssFile.getParents();
  const parent = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  const it = parent.getFoldersByName(PHOTO_FOLDER_NAME);
  return it.hasNext() ? it.next() : parent.createFolder(PHOTO_FOLDER_NAME);
}

/** Point d'entrée appelé par le site (/api/devis). */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const expected = PropertiesService.getScriptProperties().getProperty('LEAD_TOKEN');
    if (!expected || body.token !== expected) return json_({ ok: false, error: 'unauthorized' });

    const l = body.lead || {};
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      // Photos : un sous-dossier par demande, lien en lecture réservé au propriétaire du Drive.
      let photoLink = '';
      if (body.photos && body.photos.length) {
        const folder = photoFolder_().createFolder(`${body.ref} · ${l.city || ''} · ${l.name || ''}`);
        body.photos.forEach((p) => folder.createFile(Utilities.newBlob(Utilities.base64Decode(p.data), p.type, p.name)));
        photoLink = folder.getUrl();
      } else if (body.photosSkipped) {
        photoLink = 'Photos trop lourdes : voir e-mail';
      }

      const clean = (v) => (v === undefined || v === null ? '' : String(v).replace(/^[=+\-@]/, "'$&")); // anti-injection de formules
      const row = [
        new Date(body.receivedAt || Date.now()), body.ref, 'Nouveau', l.profile, l.service, l.building, l.surface, l.postalCode, l.city, l.address,
        l.name, l.company, l.phone, l.email, l.message, body.photoCount || 0, photoLink, (body.notes || []).join('\n'), l.source,
        '', 'Rappeler sous 48 h', '', '', '',
      ].map((v, i) => (i === 0 || i === 15 ? v : clean(v)));
      const sh = sheet_();
      sh.insertRowAfter(1);              // la plus récente en haut
      sh.getRange(2, 1, 1, row.length).setValues([row]);
      sh.getRange(2, 1, 1, row.length).setBackground(null).setFontWeight('normal').setFontColor('#0a1f37');
    } finally {
      lock.releaseLock();
    }

    const notify = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
    if (notify) {
      MailApp.sendEmail({
        to: notify,
        subject: `Nouvelle demande ${body.ref} · ${l.profile} · ${l.service} · ${l.postalCode} ${l.city}`,
        body: `${l.name} — ${l.phone} — ${l.email}\n${l.company ? 'Société : ' + l.company + '\n' : ''}${l.message || ''}\n\nOuvrir le back-office : ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
        replyTo: l.email || undefined,
      });
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

/** Test manuel depuis l'éditeur Apps Script : ajoute une ligne fictive. */
function testDoPost() {
  const token = PropertiesService.getScriptProperties().getProperty('LEAD_TOKEN');
  const res = doPost({ postData: { contents: JSON.stringify({ token, ref: 'DE-TEST', receivedAt: new Date().toISOString(), lead: { profile: 'Particulier', service: 'Démoussage / traitement de toiture', postalCode: '60200', city: 'Compiègne', name: 'Test', phone: '0600000000', email: 'test@example.com', source: '/contact/' }, notes: ['Ligne de test'], photoCount: 0, photos: [] }) } });
  Logger.log(res.getContent());
}
