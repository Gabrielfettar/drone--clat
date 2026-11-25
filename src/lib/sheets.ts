import type { Lead } from './lead';
import type { CheckedFile } from './files';

/** Taille cumulée maximale des photos transmises au Google Sheet (au-delà, seules les métadonnées partent). */
const MAX_PHOTO_BYTES = 20 * 1024 * 1024;

/**
 * Envoie une demande au back-office Google Sheets via le Web App Apps Script
 * (voir integrations/google-sheets/Code.gs et docs/google-sheets-leads.md).
 * Le script ajoute une ligne au Sheet et range les photos dans un dossier Drive.
 */
export async function sendToSheet(l: Lead, id: string, notes: string[], files: CheckedFile[]) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const token = process.env.GOOGLE_SHEETS_TOKEN;
  if (!url || !token) return false;
  const total = files.reduce((n, f) => n + f.data.length, 0);
  const photos = total <= MAX_PHOTO_BYTES ? files.map((f) => ({ name: f.name, type: f.type, data: f.data.toString('base64') })) : [];
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // text/plain : évite le preflight et reste lisible par doPost
    body: JSON.stringify({
      token, ref: id, receivedAt: new Date().toISOString(),
      lead: { ...l, consent: undefined }, notes, photoCount: files.length, photos,
      photosSkipped: photos.length === 0 && files.length > 0,
    }),
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  });
  const j = await r.json().catch(() => null) as { ok?: boolean; error?: string } | null;
  if (!r.ok || !j?.ok) throw new Error(`sheets ${r.status} ${j?.error ?? ''}`.trim());
  return true;
}
