'use client';
import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  BUILDINGS, SERVICES, MATERIALS, HEIGHTS, CONDITIONS, ACCESS, ACCEPTED, MAX_FILES, MAX_FILE_MB,
  leadShape, CONTACT_REQUIRED, preliminaryNotes, type Lead,
} from '@/lib/lead';
import { track } from '@/components/layout/Analytics';

type Data = Record<string, string>;
type Errors = Record<string, string>;

const STEPS = [
  { key: 'project', title: 'Votre projet', fields: ['building', 'service', 'postalCode', 'city'] },
  { key: 'photos', title: 'Photos et précisions', fields: ['surface', 'material', 'height', 'condition', 'access', 'message'] },
  { key: 'contact', title: 'Où vous envoyer le devis ?', fields: ['name', 'phone', 'email', 'consent'] },
] as const;

const serviceFromSlug: Record<string, (typeof SERVICES)[number]> = {
  'demoussage-toiture-drone': 'Démoussage / traitement de toiture',
  'nettoyage-facade-drone': 'Nettoyage de façade',
  'nettoyage-bardage-drone': 'Entretien de bardage',
};

/** Réduit une photo à 1600 px de côté (JPEG) avant envoi : l'envoi complet reste léger (limites des hébergeurs). HEIC non décodable et échecs : fichier d'origine. */
async function shrink(f: File): Promise<File> {
  if (!/^image\//.test(f.type) || f.size < 500 * 1024) return f;
  try {
    const bmp = await createImageBitmap(f);
    const k = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, 'image/jpeg', 0.8));
    return blob && blob.size < f.size ? new File([blob], f.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : f;
  } catch { return f; }
}

function Choices({ name, options, value, onChange, error }: { name: string; options: readonly string[]; value?: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div className="choices" role="radiogroup" aria-invalid={!!error}>
      {options.map((o) => (
        <label key={o} className="choice">
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

/**
 * Demande d'étude en 3 étapes courtes (projet, photos facultatives, coordonnées), sans jamais afficher de prix.
 * Envoi réel vers /api/devis (multipart, photos comprises).
 */
export function Estimator() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({});
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ s: 'idle' | 'sending' | 'ok' | 'error'; msg?: string; ref?: string }>({ s: 'idle' });
  const started = useRef(Date.now());
  const head = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Préremplissage depuis l'URL (?service=…&cp=…), utilisé par les CTA contextuels.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = q.get('service'), cp = q.get('cp'), b = q.get('batiment');
    const buildingFromParam: Record<string, (typeof BUILDINGS)[number]> = { pro: 'Bâtiment professionnel', agricole: 'Bâtiment agricole', immeuble: 'Immeuble', maison: 'Maison individuelle', patrimoine: 'Monument / bâtiment patrimonial' };
    const ville = q.get('ville');
    setData((d) => ({ ...d, ...(s && serviceFromSlug[s] ? { service: serviceFromSlug[s] } : {}), ...(cp && /^\d{5}$/.test(cp) ? { postalCode: cp } : {}), ...(b && buildingFromParam[b] ? { building: buildingFromParam[b] } : {}), ...(ville ? { city: ville.slice(0, 80) } : {}), source: (document.referrer && new URL(document.referrer).origin === location.origin ? new URL(document.referrer).pathname : location.pathname + location.search).slice(0, 200) }));
  }, []);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    head.current?.focus();
  }, [step]);

  const set = (k: string, v: string) => { setData((d) => ({ ...d, [k]: v })); setErrors((e) => { const n = { ...e }; delete n[k]; return n; }); };

  function validate(fields: readonly string[]) {
    const shape = leadShape as Record<string, import('zod').ZodTypeAny>;
    const errs: Errors = {};
    for (const f of fields) {
      const r = shape[f].safeParse(data[f] === undefined ? (f === 'consent' ? undefined : '') : data[f]);
      const optional = !['building', 'service', 'postalCode', 'city', 'name', 'consent'].includes(f);
      if (!r.success && !(optional && (data[f] === undefined || data[f] === ''))) errs[f] = r.error.issues[0].message;
    }
    if (fields.includes('phone') && !data.phone && !data.email) errs.phone = CONTACT_REQUIRED;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validate(STEPS[step].fields)) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('.est [aria-invalid="true"]')?.focus());
      return;
    }
    if (step === 0) track('devis_start');
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const errs: string[] = [];
    const ok = incoming.filter((f) => {
      if (!ACCEPTED.includes(f.type) && !/\.(heic|heif)$/i.test(f.name)) { errs.push(`${f.name} : format non accepté.`); return false; }
      if (f.size > MAX_FILE_MB * 1024 * 1024) { errs.push(`${f.name} : plus de ${MAX_FILE_MB} Mo.`); return false; }
      return true;
    });
    const merged = [...files, ...ok].slice(0, MAX_FILES);
    if (files.length + ok.length > MAX_FILES) errs.push(`${MAX_FILES} photos maximum.`);
    setFiles(merged);
    setErrors((e) => ({ ...e, photos: errs.join(' ') }));
  }

  async function submit() {
    const all = STEPS.flatMap((s) => s.fields);
    if (!validate(all)) { const bad = STEPS.findIndex((s) => s.fields.some((f) => errors[f])); if (bad >= 0) setStep(bad); return; }
    setStatus({ s: 'sending' });
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => v !== '' && fd.append(k, v));
    for (const f of files) fd.append('photos', await shrink(f));
    fd.append('_t', String(started.current));
    fd.append('website', (document.getElementById(`${id}-website`) as HTMLInputElement | null)?.value ?? '');
    try {
      const r = await fetch('/api/devis', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setStatus({ s: 'ok', ref: j.ref }); track('devis_submit', { service: data.service ?? '' }); head.current?.focus(); return; }
      if (j.fields) setErrors(j.fields);
      setStatus({ s: 'error', msg: j.error || 'Envoi impossible. Réessayez dans un instant.' });
    } catch {
      setStatus({ s: 'error', msg: 'Connexion interrompue. Vérifiez votre réseau puis réessayez.' });
    }
  }

  const notes = useMemo(() => preliminaryNotes({ ...(data as Partial<Lead>), surface: data.surface ? Number(data.surface) : undefined }), [data]);
  const previews = useMemo(() => files.map((f) => ({ f, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);

  if (status.s === 'ok') {
    return (
      <div className="est est--done" aria-live="polite">
        <div className="est-check" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M10 21l7 7 14-15" /></svg></div>
        <h2 ref={head} tabIndex={-1} className="h-2">Demande bien reçue.</h2>
        <p className="lede">Votre référence : <strong className="mono">{status.ref}</strong>. Nous étudions vos informations et revenons vers vous sous 48 h ouvrées, par téléphone ou par e-mail.</p>
        <ul className="ticks">
          <li>Vos photos et coordonnées ne servent qu’à préparer l’étude.</li>
          <li>Aucun engagement : le devis est gratuit.</li>
        </ul>
        <Link className="link-arrow" href="/technologie/">Comment se déroule l’intervention <span aria-hidden="true">→</span></Link>
      </div>
    );
  }

  const cur = STEPS[step];
  const pct = Math.round(((step + 1) / STEPS.length) * 100);
  const err = (k: string) => errors[k] ? <p className="field-error" id={`${id}-${k}-e`} role="alert">{errors[k]}</p> : null;
  const inputProps = (k: string) => ({
    id: `${id}-${k}`, name: k, value: data[k] ?? '', onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(k, e.target.value),
    'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${id}-${k}-e` : undefined,
  });

  return (
    <form className="est" onSubmit={(e) => { e.preventDefault(); if (step < STEPS.length - 1) next(); else submit(); }} noValidate>
      <div className="est-top">
        <ol className="est-steps" aria-label="Étapes">
          {STEPS.map((s, k) => (
            <li key={s.key} data-state={k < step ? 'done' : k === step ? 'current' : 'todo'} aria-current={k === step ? 'step' : undefined}>
              <span className="sr-only">Étape {k + 1} : </span><span aria-hidden="true">{k + 1}</span> <span className="est-step-label">{s.title}</span>
            </li>
          ))}
        </ol>
        <div className="est-bar" aria-hidden="true"><span style={{ width: `${pct}%` }} /></div>
        <p className="mono est-count">Étape {step + 1} sur {STEPS.length}</p>
      </div>

      <h2 ref={head} tabIndex={-1} className="h-3 est-title">{cur.title}</h2>

      {/* champ piège anti-robots, invisible pour les humains */}
      <div aria-hidden="true" className="hp"><label htmlFor={`${id}-website`}>Site web</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>

      <div className="est-body" key={cur.key}>
        {cur.key === 'project' && (
          <div className="est-stack">
            <fieldset className="est-fs">
              <legend>Type de bâtiment</legend>
              <Choices name="building" options={BUILDINGS} value={data.building} onChange={(v) => set('building', v)} error={errors.building} />{err('building')}
            </fieldset>
            <fieldset className="est-fs">
              <legend>Intervention souhaitée</legend>
              <Choices name="service" options={SERVICES} value={data.service} onChange={(v) => set('service', v)} error={errors.service} />{err('service')}
            </fieldset>
            <div className="est-grid">
              <div className="field"><label htmlFor={`${id}-postalCode`}>Code postal</label><input className="input" inputMode="numeric" maxLength={5} autoComplete="postal-code" {...inputProps('postalCode')} />{err('postalCode')}</div>
              <div className="field"><label htmlFor={`${id}-city`}>Commune</label><input className="input" autoComplete="address-level2" {...inputProps('city')} />{err('city')}</div>
            </div>
          </div>
        )}
        {cur.key === 'photos' && (
          <div className="est-stack">
            <div className="est-photos">
              <label className="drop" htmlFor={`${id}-photos`}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.dataset.over = 'true'; }}
                onDragLeave={(e) => { e.currentTarget.dataset.over = 'false'; }}
                onDrop={(e) => { e.preventDefault(); e.currentTarget.dataset.over = 'false'; addFiles(e.dataTransfer.files); }}>
                <input id={`${id}-photos`} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} aria-describedby={`${id}-photos-h`} />
                <strong>Ajouter des photos</strong>
                <span id={`${id}-photos-h`} className="hint">Facultatif. Jusqu’à {MAX_FILES} photos : une vue d’ensemble depuis la rue suffit souvent.</span>
              </label>
              {errors.photos && <p className="field-error" role="alert">{errors.photos}</p>}
              {!!previews.length && (
                <ul className="thumbs">
                  {previews.map((p, k) => (
                    <li key={p.url}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={`Photo ${k + 1} : ${p.f.name}`} />
                      <button type="button" onClick={() => setFiles((f) => f.filter((_, i) => i !== k))} aria-label={`Retirer la photo ${k + 1}`}>×</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="field"><label htmlFor={`${id}-message`}>Un mot sur votre projet <span className="muted">(facultatif)</span></label><textarea className="textarea" rows={3} placeholder="Délai souhaité, accès, questions…" {...inputProps('message')} />{err('message')}</div>
            <details className="est-more">
              <summary>Préciser la surface, le matériau, la hauteur <span className="muted">(facultatif)</span></summary>
              <div className="est-grid">
                <div className="field">
                  <label htmlFor={`${id}-surface`}>Surface approximative (m²)</label>
                  <input className="input" inputMode="numeric" placeholder="ex. 120" {...inputProps('surface')} />
                  {err('surface')}
                </div>
                {([['material', 'Matériau', MATERIALS], ['height', 'Hauteur du bâtiment', HEIGHTS], ['condition', 'État général', CONDITIONS], ['access', 'Accessibilité', ACCESS]] as const).map(([k, label, opts]) => (
                  <div className="field" key={k}>
                    <label htmlFor={`${id}-${k}`}>{label}</label>
                    <select className="select" {...inputProps(k)}>
                      <option value="">Choisir…</option>
                      {opts.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
        {cur.key === 'contact' && (
          <div className="est-stack">
            <div className="est-grid">
              <div className="field"><label htmlFor={`${id}-name`}>Nom</label><input className="input" autoComplete="name" {...inputProps('name')} />{err('name')}</div>
              <div className="field"><label htmlFor={`${id}-phone`}>Téléphone</label><input className="input" type="tel" autoComplete="tel" {...inputProps('phone')} />{err('phone')}</div>
              <div className="field est-full"><label htmlFor={`${id}-email`}>E-mail</label><input className="input" type="email" autoComplete="email" {...inputProps('email')} />{err('email')}</div>
              <p className="hint est-full">Téléphone ou e-mail : un seul des deux suffit.</p>
              <div className="field est-full">
                <label className="consent">
                  <input type="checkbox" checked={data.consent === 'on'} onChange={(e) => set('consent', e.target.checked ? 'on' : '')} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${id}-consent-e` : undefined} />
                  <span>J’accepte que Drone Éclat utilise ces informations pour étudier ma demande et me recontacter. <Link href="/confidentialite/">Politique de confidentialité</Link></span>
                </label>
                {err('consent')}
              </div>
            </div>
            <div className="diag">
              <p className="mono diag-label">Votre demande · {data.service} · {data.postalCode} {data.city}{files.length ? ` · ${files.length} photo(s)` : ''}</p>
              <ul className="dashes">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
              <p className="hint">Étude et devis gratuits, sans engagement. Réponse sous 48 h ouvrées.</p>
            </div>
          </div>
        )}
      </div>

      {status.s === 'error' && <p className="notice notice--error" role="alert">{status.msg}</p>}

      <div className="est-nav">
        {step > 0 && <button type="button" className="btn btn--ghost" onClick={() => setStep((s) => s - 1)}>Retour</button>}
        {step < STEPS.length - 1
          ? <button type="submit" className="btn">{cur.key === 'photos' && !files.length ? 'Continuer sans photo' : 'Continuer'} <span className="btn-arrow" aria-hidden="true">→</span></button>
          : <button type="submit" className="btn" data-loading={status.s === 'sending'} disabled={status.s === 'sending'}>Recevoir mon devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></button>}
      </div>
    </form>
  );
}
