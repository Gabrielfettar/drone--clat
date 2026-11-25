'use client';
import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  BUILDINGS, SERVICES, MATERIALS, HEIGHTS, CONDITIONS, ACCESS, ACCEPTED, MAX_FILES, MAX_FILE_MB,
  leadSchema, preliminaryNotes, type Lead,
} from '@/lib/lead';
import { track } from '@/components/layout/Analytics';

type Data = Record<string, string>;
type Errors = Record<string, string>;

const STEPS = [
  { key: 'building', title: 'Quel bâtiment souhaitez-vous entretenir ?', fields: ['building'] },
  { key: 'service', title: 'Quelle intervention ?', fields: ['service'] },
  { key: 'details', title: 'Caractéristiques du chantier', fields: ['surface', 'material', 'height', 'condition', 'access'] },
  { key: 'place', title: 'Où se situe le bâtiment ?', fields: ['postalCode', 'city', 'address'] },
  { key: 'photos', title: 'Ajoutez quelques photos', fields: [] },
  { key: 'contact', title: 'Vos coordonnées', fields: ['name', 'phone', 'email', 'message', 'consent'] },
  { key: 'recap', title: 'Récapitulatif', fields: [] },
] as const;

const serviceFromSlug: Record<string, (typeof SERVICES)[number]> = {
  'demoussage-toiture-drone': 'Démoussage / traitement de toiture',
  'nettoyage-facade-drone': 'Nettoyage de façade',
  'nettoyage-bardage-drone': 'Entretien de bardage',
};

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
 * Estimateur de projet : pré-qualifie la demande en 6 étapes, sans jamais afficher de prix.
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
    const buildingFromParam: Record<string, (typeof BUILDINGS)[number]> = { pro: 'Bâtiment professionnel', agricole: 'Bâtiment agricole', immeuble: 'Immeuble', maison: 'Maison individuelle' };
    setData((d) => ({ ...d, ...(s && serviceFromSlug[s] ? { service: serviceFromSlug[s] } : {}), ...(cp && /^\d{5}$/.test(cp) ? { postalCode: cp } : {}), ...(b && buildingFromParam[b] ? { building: buildingFromParam[b] } : {}) }));
  }, []);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    head.current?.focus();
  }, [step]);

  const set = (k: string, v: string) => { setData((d) => ({ ...d, [k]: v })); setErrors((e) => { const n = { ...e }; delete n[k]; return n; }); };

  function validate(fields: readonly string[]) {
    const shape = leadSchema.shape as Record<string, import('zod').ZodTypeAny>;
    const errs: Errors = {};
    for (const f of fields) {
      const r = shape[f].safeParse(data[f] === undefined ? (f === 'consent' ? undefined : '') : data[f]);
      const optional = !['building', 'service', 'postalCode', 'city', 'name', 'phone', 'email', 'consent'].includes(f);
      if (!r.success && !(optional && (data[f] === undefined || data[f] === ''))) errs[f] = r.error.issues[0].message;
    }
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
    files.forEach((f) => fd.append('photos', f));
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
        <Link className="link-arrow" href="/#preparer">Préparer l’intervention <span aria-hidden="true">→</span></Link>
      </div>
    );
  }

  const cur = STEPS[step];
  const pct = Math.round((step / (STEPS.length - 1)) * 100);
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
              <span className="sr-only">Étape {k + 1} : </span>{k + 1}
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
        {cur.key === 'building' && <><Choices name="building" options={BUILDINGS} value={data.building} onChange={(v) => set('building', v)} error={errors.building} />{err('building')}</>}
        {cur.key === 'service' && <><Choices name="service" options={SERVICES} value={data.service} onChange={(v) => set('service', v)} error={errors.service} />{err('service')}</>}
        {cur.key === 'details' && (
          <div className="est-grid">
            <div className="field">
              <label htmlFor={`${id}-surface`}>Surface approximative (m²)</label>
              <input className="input" inputMode="numeric" placeholder="ex. 120" {...inputProps('surface')} />
              <span className="hint">Une estimation suffit. Pour une toiture, comptez environ 1,3 fois l’emprise au sol de la maison.</span>
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
        )}
        {cur.key === 'place' && (
          <div className="est-grid">
            <div className="field"><label htmlFor={`${id}-postalCode`}>Code postal</label><input className="input" inputMode="numeric" maxLength={5} autoComplete="postal-code" {...inputProps('postalCode')} />{err('postalCode')}</div>
            <div className="field"><label htmlFor={`${id}-city`}>Commune</label><input className="input" autoComplete="address-level2" {...inputProps('city')} />{err('city')}</div>
            <div className="field est-full"><label htmlFor={`${id}-address`}>Adresse <span className="muted">(facultatif)</span></label><input className="input" autoComplete="street-address" {...inputProps('address')} /><span className="hint">Elle nous permet de préparer l’étude à partir d’une vue aérienne.</span></div>
          </div>
        )}
        {cur.key === 'photos' && (
          <div className="est-photos">
            <label className="drop" htmlFor={`${id}-photos`}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.dataset.over = 'true'; }}
              onDragLeave={(e) => { e.currentTarget.dataset.over = 'false'; }}
              onDrop={(e) => { e.preventDefault(); e.currentTarget.dataset.over = 'false'; addFiles(e.dataTransfer.files); }}>
              <input id={`${id}-photos`} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} aria-describedby={`${id}-photos-h`} />
              <strong>Ajouter des photos</strong>
              <span id={`${id}-photos-h`} className="hint">Jusqu’à {MAX_FILES} photos, {MAX_FILE_MB} Mo chacune (JPEG, PNG, WebP, HEIC). Facultatif, mais l’étude sera plus précise.</span>
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
            <p className="hint muted">Conseil : une vue d’ensemble depuis la rue, puis un plan plus serré des zones les plus sales.</p>
          </div>
        )}
        {cur.key === 'contact' && (
          <div className="est-grid">
            <div className="field"><label htmlFor={`${id}-name`}>Nom</label><input className="input" autoComplete="name" {...inputProps('name')} />{err('name')}</div>
            <div className="field"><label htmlFor={`${id}-phone`}>Téléphone</label><input className="input" type="tel" autoComplete="tel" {...inputProps('phone')} />{err('phone')}</div>
            <div className="field est-full"><label htmlFor={`${id}-email`}>E-mail</label><input className="input" type="email" autoComplete="email" {...inputProps('email')} />{err('email')}</div>
            <div className="field est-full"><label htmlFor={`${id}-message`}>Précisions <span className="muted">(facultatif)</span></label><textarea className="textarea" placeholder="Délai souhaité, contraintes d’accès, questions…" {...inputProps('message')} />{err('message')}</div>
            <div className="field est-full">
              <label className="consent">
                <input type="checkbox" checked={data.consent === 'on'} onChange={(e) => set('consent', e.target.checked ? 'on' : '')} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${id}-consent-e` : undefined} />
                <span>J’accepte que Drone Éclat utilise ces informations pour étudier ma demande et me recontacter. <Link href="/confidentialite/">Politique de confidentialité</Link></span>
              </label>
              {err('consent')}
            </div>
          </div>
        )}
        {cur.key === 'recap' && (
          <div className="recap">
            <dl className="recap-list">
              {([['Bâtiment', data.building, 0], ['Intervention', data.service, 1], ['Surface', data.surface ? `${data.surface} m²` : 'Non précisée', 2], ['Matériau', data.material || '—', 2], ['Hauteur', data.height || '—', 2], ['État', data.condition || '—', 2], ['Accès', data.access || '—', 2], ['Lieu', `${data.postalCode ?? ''} ${data.city ?? ''}`, 3], ['Photos', files.length ? `${files.length} photo(s)` : 'Aucune', 4], ['Contact', `${data.name ?? ''} · ${data.phone ?? ''} · ${data.email ?? ''}`, 5]] as const).map(([k, v, s]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd><button type="button" className="recap-edit" onClick={() => setStep(s)}>Modifier<span className="sr-only"> {k}</span></button></div>
              ))}
            </dl>
            <div className="diag">
              <p className="mono diag-label">Diagnostic préliminaire</p>
              <ul className="dashes">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
              <p className="hint">Pas de prix automatique : chaque toiture est différente. Vous recevez un devis détaillé après étude, gratuit et sans engagement.</p>
            </div>
          </div>
        )}
      </div>

      {status.s === 'error' && <p className="notice notice--error" role="alert">{status.msg}</p>}

      <div className="est-nav">
        {step > 0 && <button type="button" className="btn btn--ghost" onClick={() => setStep((s) => s - 1)}>Retour</button>}
        {step < STEPS.length - 1
          ? <button type="submit" className="btn">{cur.key === 'photos' && !files.length ? 'Continuer sans photo' : 'Continuer'} <span className="btn-arrow" aria-hidden="true">→</span></button>
          : <button type="submit" className="btn" data-loading={status.s === 'sending'} disabled={status.s === 'sending'}>Envoyer ma demande <span className="btn-arrow" aria-hidden="true">→</span></button>}
      </div>
    </form>
  );
}
