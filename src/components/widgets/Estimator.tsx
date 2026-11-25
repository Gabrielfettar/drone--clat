'use client';
import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { PROFILES, SERVICES, ACCEPTED, MAX_FILES, MAX_FILE_MB, leadSchema } from '@/lib/lead';
import { track } from '@/components/layout/Analytics';

type Data = Record<string, string>;
type Errors = Record<string, string>;

/** Parcours court : 3 étapes, ~45 secondes. Les détails techniques sont traités lors de l'appel de qualification. */
const STEPS = [
  { key: 'project', title: 'Votre projet', fields: ['profile', 'service'] },
  { key: 'place', title: 'Où se situe le bâtiment ?', fields: ['postalCode', 'city', 'surface'] },
  { key: 'contact', title: 'Où vous envoyer l’étude ?', fields: ['name', 'company', 'phone', 'email', 'message', 'consent'] },
] as const;

const REQUIRED = ['profile', 'service', 'postalCode', 'city', 'name', 'phone', 'email', 'consent'];

const serviceFromSlug: Record<string, (typeof SERVICES)[number]> = {
  'demoussage-toiture-drone': 'Démoussage / traitement de toiture',
  'nettoyage-facade-drone': 'Nettoyage de façade',
  'nettoyage-bardage-drone': 'Entretien de bardage',
};
const profileFromParam: Record<string, (typeof PROFILES)[number]> = {
  pro: 'Entreprise / industrie', entreprise: 'Entreprise / industrie', agricole: 'Entreprise / industrie',
  immeuble: 'Syndic / copropriété', syndic: 'Syndic / copropriété', copro: 'Syndic / copropriété',
  collectivite: 'Collectivité / patrimoine', patrimoine: 'Collectivité / patrimoine', maison: 'Particulier', particulier: 'Particulier',
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

/** Formulaire de demande d'étude : 3 étapes courtes, envoi réel vers /api/devis (photos facultatives). */
export function Estimator({ defaults }: { defaults?: Data } = {}) {
  const id = useId();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(defaults ?? {});
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ s: 'idle' | 'sending' | 'ok' | 'error'; msg?: string; ref?: string }>({ s: 'idle' });
  const started = useRef(Date.now());
  const head = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Préremplissage depuis l'URL (?service=…&cp=…&batiment=…&ville=…), utilisé par les CTA contextuels.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = q.get('service'), cp = q.get('cp'), b = q.get('batiment') ?? q.get('profil'), v = q.get('ville');
    setData((d) => ({
      ...d,
      ...(s && serviceFromSlug[s] ? { service: serviceFromSlug[s] } : {}),
      ...(cp && /^\d{5}$/.test(cp) ? { postalCode: cp } : {}),
      ...(b && profileFromParam[b] ? { profile: profileFromParam[b] } : {}),
      ...(v && v.length < 80 ? { city: v } : {}),
    }));
  }, []);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    head.current?.focus({ preventScroll: true });
    head.current?.closest('.est')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [step]);

  const set = (k: string, v: string) => { setData((d) => ({ ...d, [k]: v })); setErrors((e) => { const n = { ...e }; delete n[k]; return n; }); };
  const isPro = !!data.profile && data.profile !== 'Particulier';

  function validate(fields: readonly string[]) {
    const shape = leadSchema.shape as Record<string, import('zod').ZodTypeAny>;
    const errs: Errors = {};
    for (const f of fields) {
      const r = shape[f].safeParse(data[f] === undefined ? (f === 'consent' ? undefined : '') : data[f]);
      const optional = !REQUIRED.includes(f);
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
    fd.append('source', window.location.pathname);
    files.forEach((f) => fd.append('photos', f));
    fd.append('_t', String(started.current));
    fd.append('website', (document.getElementById(`${id}-website`) as HTMLInputElement | null)?.value ?? '');
    try {
      const r = await fetch('/api/devis', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setStatus({ s: 'ok', ref: j.ref }); track('devis_submit', { service: data.service ?? '', profile: data.profile ?? '' }); head.current?.focus(); return; }
      if (j.fields) setErrors(j.fields);
      setStatus({ s: 'error', msg: j.error || 'Envoi impossible. Réessayez dans un instant.' });
    } catch {
      setStatus({ s: 'error', msg: 'Connexion interrompue. Vérifiez votre réseau puis réessayez.' });
    }
  }

  const previews = useMemo(() => files.map((f) => ({ f, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);

  if (status.s === 'ok') {
    return (
      <div className="est est--done" aria-live="polite">
        <div className="est-check" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M10 21l7 7 14-15" /></svg></div>
        <h2 ref={head} tabIndex={-1} className="h-2">Demande bien reçue.</h2>
        <p className="lede">Votre référence : <strong className="mono">{status.ref}</strong>. Un membre de l’équipe vous rappelle sous 48 h ouvrées pour préciser les détails, puis vous recevez votre étude et votre devis.</p>
        <ul className="ticks">
          <li>Gratuit et sans engagement.</li>
          <li>Vos coordonnées ne servent qu’à traiter votre demande.</li>
        </ul>
        <Link className="link-arrow" href="/#preparer">Préparer l’intervention <span aria-hidden="true">→</span></Link>
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
              <span className="sr-only">Étape {k + 1} : </span>{k + 1}
            </li>
          ))}
        </ol>
        <div className="est-bar" aria-hidden="true"><span style={{ width: `${pct}%` }} /></div>
        <p className="mono est-count">Étape {step + 1} sur {STEPS.length} · moins d’une minute</p>
      </div>

      <h2 ref={head} tabIndex={-1} className="h-3 est-title">{cur.title}</h2>

      {/* champ piège anti-robots, invisible pour les humains */}
      <div aria-hidden="true" className="hp"><label htmlFor={`${id}-website`}>Site web</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>

      <div className="est-body" key={cur.key}>
        {cur.key === 'project' && (
          <div className="est-stack">
            <fieldset className="est-fs">
              <legend className="est-legend">Vous êtes</legend>
              <Choices name="profile" options={PROFILES} value={data.profile} onChange={(v) => set('profile', v)} error={errors.profile} />
              {err('profile')}
            </fieldset>
            <fieldset className="est-fs">
              <legend className="est-legend">Vous souhaitez</legend>
              <Choices name="service" options={SERVICES} value={data.service} onChange={(v) => set('service', v)} error={errors.service} />
              {err('service')}
            </fieldset>
          </div>
        )}
        {cur.key === 'place' && (
          <div className="est-grid">
            <div className="field"><label htmlFor={`${id}-postalCode`}>Code postal</label><input className="input" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="60200" {...inputProps('postalCode')} />{err('postalCode')}</div>
            <div className="field"><label htmlFor={`${id}-city`}>Commune</label><input className="input" autoComplete="address-level2" placeholder="Compiègne" {...inputProps('city')} />{err('city')}</div>
            <div className="field est-full">
              <label htmlFor={`${id}-surface`}>Surface approximative en m² <span className="muted">(facultatif)</span></label>
              <input className="input" inputMode="numeric" placeholder="ex. 120" {...inputProps('surface')} />
              {err('surface')}
            </div>
            <div className="field est-full">
              <span className="label">Photos <span className="muted">(facultatif, pour une étude plus rapide)</span></span>
              <label className="drop drop--sm" htmlFor={`${id}-photos`}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.dataset.over = 'true'; }}
                onDragLeave={(e) => { e.currentTarget.dataset.over = 'false'; }}
                onDrop={(e) => { e.preventDefault(); e.currentTarget.dataset.over = 'false'; addFiles(e.dataTransfer.files); }}>
                <input id={`${id}-photos`} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} aria-describedby={`${id}-photos-h`} />
                <strong>＋ Ajouter des photos</strong>
                <span id={`${id}-photos-h`} className="hint">Jusqu’à {MAX_FILES} photos, {MAX_FILE_MB} Mo chacune.</span>
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
          </div>
        )}
        {cur.key === 'contact' && (
          <div className="est-grid">
            <div className="field"><label htmlFor={`${id}-name`}>Nom</label><input className="input" autoComplete="name" {...inputProps('name')} />{err('name')}</div>
            <div className="field"><label htmlFor={`${id}-phone`}>Téléphone</label><input className="input" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" {...inputProps('phone')} />{err('phone')}</div>
            <div className={`field ${isPro ? '' : 'est-full'}`}><label htmlFor={`${id}-email`}>E-mail</label><input className="input" type="email" autoComplete="email" {...inputProps('email')} />{err('email')}</div>
            {isPro && <div className="field"><label htmlFor={`${id}-company`}>Société / organisme</label><input className="input" autoComplete="organization" {...inputProps('company')} />{err('company')}</div>}
            <div className="field est-full"><label htmlFor={`${id}-message`}>Un détail à ajouter ? <span className="muted">(facultatif)</span></label><textarea className="textarea textarea--sm" placeholder="Délai souhaité, nombre de bâtiments, contraintes d’accès…" {...inputProps('message')} />{err('message')}</div>
            <div className="field est-full">
              <label className="consent">
                <input type="checkbox" checked={data.consent === 'on'} onChange={(e) => set('consent', e.target.checked ? 'on' : '')} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${id}-consent-e` : undefined} />
                <span>J’accepte que Drone Éclat utilise ces informations pour étudier ma demande et me recontacter. <Link href="/confidentialite/">Confidentialité</Link></span>
              </label>
              {err('consent')}
            </div>
          </div>
        )}
      </div>

      {status.s === 'error' && <p className="notice notice--error" role="alert">{status.msg}</p>}

      <div className="est-nav">
        {step > 0 && <button type="button" className="btn btn--ghost" onClick={() => setStep((s) => s - 1)}>Retour</button>}
        {step < STEPS.length - 1
          ? <button type="submit" className="btn">Continuer <span className="btn-arrow" aria-hidden="true">→</span></button>
          : <button type="submit" className="btn" data-loading={status.s === 'sending'} disabled={status.s === 'sending'}>Recevoir mon étude gratuite <span className="btn-arrow" aria-hidden="true">→</span></button>}
      </div>
      <p className="est-reassure"><span>✓ Gratuit</span><span>✓ Sans engagement</span><span>✓ Réponse sous 48 h ouvrées</span></p>
    </form>
  );
}
