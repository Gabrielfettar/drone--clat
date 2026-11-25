import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { leadSchema, preliminaryNotes, clientType, priority, type Lead } from '@/lib/lead';
import { checkFiles, type CheckedFile } from '@/lib/files';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MIN_FILL_MS = 4000; // un humain met plus de 4 s à remplir le parcours

function ref() {
  const d = new Date();
  return `DE-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function emailHtml(l: Lead, id: string, notes: string[]) {
  const rows: [string, string | number | undefined][] = [
    ['Référence', id], ['Statut', 'Nouveau prospect'], ['Bâtiment', l.building], ['Intervention', l.service], ['Surface', l.surface ? `${l.surface} m²` : 'non précisée'],
    ['Matériau', l.material], ['Hauteur', l.height], ['État', l.condition], ['Accès', l.access],
    ['Type de client', clientType(l)], ['Priorité', priority(l)], ['Commune', `${l.postalCode} ${l.city}`], ['Adresse', l.address], ['Nom', l.name], ['Téléphone', l.phone], ['E-mail', l.email], ['Message', l.message], ['Page d’origine', l.source],
  ];
  return `<h2>Nouvelle demande d’étude ${esc(id)}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `<tr><th align="left" style="border-bottom:1px solid #ddd">${esc(k)}</th><td style="border-bottom:1px solid #ddd">${esc(String(v))}</td></tr>`).join('')}</table>
    <h3>Diagnostic préliminaire automatique</h3><ul>${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>`;
}

/** Google Sheets (back-office) via l'application Web Apps Script, voir integrations/google-sheets/. */
async function toSheet(l: Lead, id: string, notes: string[], files: CheckedFile[]) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL, secret = process.env.LEADS_WEBHOOK_SECRET;
  if (!url || !secret) return false;
  const { consent: _c, ...fields } = l; void _c;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      lead: { ...fields, ref: id, receivedAt: new Date().toISOString(), clientType: clientType(l), priority: priority(l), notes },
      photos: files.map((f) => ({ name: f.name, type: f.type, data: f.data.toString('base64') })),
    }),
    redirect: 'follow',
    signal: AbortSignal.timeout(25000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(`sheets ${r.status} ${j.error ?? ''}`);
  return true;
}

async function toEmail(l: Lead, id: string, notes: string[], files: CheckedFile[]) {
  const key = process.env.RESEND_API_KEY, to = process.env.LEAD_TO_EMAIL, from = process.env.LEAD_FROM_EMAIL;
  if (!key || !to || !from) return false;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to: to.split(',').map((s) => s.trim()), reply_to: l.email,
      subject: `[Devis ${id}] ${l.service} · ${l.postalCode} ${l.city}`,
      html: emailHtml(l, id, notes),
      attachments: files.map((f) => ({ filename: f.name, content: f.data.toString('base64') })),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`resend ${r.status}`);
  return true;
}

/** Envoie la demande vers chaque canal configuré. Succès si au moins un canal l'a reçue. */
async function deliver(l: Lead, id: string, files: CheckedFile[]) {
  const notes = preliminaryNotes(l);
  const results = await Promise.allSettled([toSheet(l, id, notes, files), toEmail(l, id, notes, files)]);
  const via = (['sheet', 'email'] as const).filter((_, k) => results[k].status === 'fulfilled' && (results[k] as PromiseFulfilledResult<boolean>).value);
  results.forEach((r, k) => { if (r.status === 'rejected') console.error(`[devis] ${id} canal ${k ? 'email' : 'sheet'} en échec: ${(r.reason as Error).message}`); });
  if (via.length) return via.join('+');
  if (process.env.NODE_ENV !== 'production' || process.env.LEAD_LOCAL_SINK === '1') {
    // Développement : la demande est enregistrée localement pour pouvoir tester le parcours de bout en bout.
    const dir = path.join(process.cwd(), '.leads', id);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'demande.json'), JSON.stringify({ id, receivedAt: new Date().toISOString(), clientType: clientType(l), priority: priority(l), lead: l, notes }, null, 2));
    for (const f of files) await writeFile(path.join(dir, f.name), f.data);
    return 'local';
  }
  throw new Error(results.some((r) => r.status === 'rejected') ? 'all-channels-failed' : 'not-configured');
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'local';
  if (!rateLimit(ip, Number(process.env.RATE_LIMIT_MAX) || 5)) return NextResponse.json({ ok: false, error: 'Trop de demandes envoyées. Réessayez dans quelques minutes.' }, { status: 429 });

  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > 45 * 1024 * 1024) return NextResponse.json({ ok: false, error: 'Envoi trop volumineux.' }, { status: 413 });

  let form: FormData;
  try { form = await req.formData(); } catch { return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 }); }

  // Anti-spam : champ piège invisible + temps de remplissage minimal. Réponse neutre pour ne pas renseigner les robots.
  const started = Number(form.get('_t') ?? 0);
  if (String(form.get('website') ?? '') !== '' || !started || Date.now() - started < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, ref: ref() });
  }

  const raw = Object.fromEntries(
    ['building', 'service', 'surface', 'material', 'height', 'condition', 'access', 'postalCode', 'city', 'address', 'name', 'phone', 'email', 'message', 'source', 'consent']
      .map((k) => [k, form.get(k) ?? undefined])
      .filter(([, v]) => v !== undefined && v !== ''),
  );
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    return NextResponse.json({ ok: false, error: 'Certains champs sont à corriger.', fields }, { status: 422 });
  }
  const files = await checkFiles(form.getAll('photos').filter((f): f is File => typeof f !== 'string'));
  if (!files.ok) return NextResponse.json({ ok: false, error: files.error, fields: { photos: files.error } }, { status: 422 });

  const id = ref();
  try {
    const via = await deliver(parsed.data, id, files.files);
    console.info(`[devis] ${id} reçu (${via}, ${files.files.length} photo(s))`); // aucune donnée personnelle dans les logs
    return NextResponse.json({ ok: true, ref: id });
  } catch (e) {
    console.error(`[devis] ${id} échec d'envoi: ${(e as Error).message}`);
    return NextResponse.json({ ok: false, error: 'La demande n’a pas pu être transmise. Réessayez, ou écrivez-nous directement.' }, { status: 503 });
  }
}
