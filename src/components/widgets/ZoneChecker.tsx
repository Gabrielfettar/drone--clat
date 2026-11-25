'use client';
import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { places as nearPlaces, haversineKm } from '@/content/places';
import { cities } from '@/content/cities';
import { site } from '@/config/site';

type Result =
  | { state: 'idle' }
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'done'; communes: { nom: string; lat: number; lon: number; km: number }[]; pick: number };

const SIZE = 420, KM_PX = 200 / Math.max(site.extendedRadiusKm.value, site.serviceRadiusKm.value); // échelle de la carte radar
const places = cities.length ? cities.map((c) => ({ name: c.name, lat: c.lat, lon: c.lon, base: c.distanceKm === 0 })) : nearPlaces;
const base = { lat: site.base.lat, lon: site.base.lon };
function project(lat: number, lon: number) {
  const kx = 111.32 * Math.cos((base.lat * Math.PI) / 180), ky = 110.57;
  return { x: SIZE / 2 + (lon - base.lon) * kx * KM_PX, y: SIZE / 2 - (lat - base.lat) * ky * KM_PX };
}

/**
 * Vérification de zone : code postal → communes (API Géo officielle, geo.api.gouv.fr) → distance à la base.
 * Le secteur est PROVISOIRE (site.serviceRadiusKm.pending) : la réponse le dit toujours.
 */
export function ZoneChecker({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [cp, setCp] = useState('');
  const [res, setRes] = useState<Result>({ state: 'idle' });
  const R = site.serviceRadiusKm.value, RX = site.extendedRadiusKm.value;

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{5}$/.test(cp)) { setRes({ state: 'error', message: 'Saisissez un code postal à 5 chiffres, par exemple 60200.' }); return; }
    setRes({ state: 'loading' });
    try {
      const r = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${cp}&fields=nom,centre&format=json`, { signal: AbortSignal.timeout(6000) });
      if (!r.ok) throw new Error('api');
      const data: { nom: string; centre?: { coordinates: [number, number] } }[] = await r.json();
      const communes = data.filter((c) => c.centre).map((c) => {
        const [lon, lat] = c.centre!.coordinates; return { nom: c.nom, lat, lon, km: haversineKm(base, { lat, lon }) };
      }).sort((a, b) => a.km - b.km);
      if (!communes.length) { setRes({ state: 'error', message: 'Aucune commune trouvée pour ce code postal. Vérifiez la saisie.' }); return; }
      setRes({ state: 'done', communes, pick: 0 });
    } catch {
      setRes({ state: 'error', message: 'Le service de localisation ne répond pas. Indiquez votre code postal dans la demande d’étude : nous vérifierons nous-mêmes.' });
    }
  }

  const current = res.state === 'done' ? res.communes[res.pick] : null;
  const verdict = current ? (current.km <= R ? 'in' : current.km <= RX ? 'maybe' : 'out') : null;
  const rings = useMemo(() => [50, 100, R, RX].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b), [R, RX]);
  const dot = current ? project(current.lat, current.lon) : null;

  return (
    <div className={`zone ${compact ? 'zone--compact' : ''}`}>
      <div className="zone-map" role="img" aria-label={`Carte du secteur : rayon d’intervention de ${R} km autour de ${site.base.city}${current ? `. ${current.nom} est à ${Math.round(current.km)} km.` : ''}`}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <defs>
            <radialGradient id={`${id}-g`}><stop offset="0" stopColor="#0091EB" stopOpacity=".16" /><stop offset="1" stopColor="#0091EB" stopOpacity=".02" /></radialGradient>
            <clipPath id={`${id}-c`}><rect width={SIZE} height={SIZE} rx="12" /></clipPath>
          </defs>
          <g clipPath={`url(#${id}-c)`}>
            <rect width={SIZE} height={SIZE} fill="#0A1F37" />
            <g stroke="#1f3a5a" strokeWidth="1">{Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${i * 42} 0V${SIZE}M0 ${i * 42}H${SIZE}`} />)}</g>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R * KM_PX} fill={`url(#${id}-g)`} />
            {rings.map((k) => (
              <g key={k}>
                <circle cx={SIZE / 2} cy={SIZE / 2} r={k * KM_PX} fill="none" stroke={k === R ? '#0091EB' : '#2c4a6c'} strokeWidth={k === R ? 1.5 : 1} strokeDasharray={k === RX ? '4 5' : undefined} />
                <text x={SIZE / 2 + 4} y={SIZE / 2 - k * KM_PX - 4} fill="#7f9bb8" fontSize="10" fontFamily="var(--f-mono)">{k} km</text>
              </g>
            ))}
            <g className="zone-sweep"><path d={`M${SIZE / 2} ${SIZE / 2} L${SIZE / 2} ${SIZE / 2 - RX * KM_PX} A${RX * KM_PX} ${RX * KM_PX} 0 0 1 ${SIZE / 2 + RX * KM_PX * 0.5} ${SIZE / 2 - RX * KM_PX * 0.866} Z`} fill="#0091EB" opacity=".08" /></g>
            {places.map((p) => {
              const q = project(p.lat, p.lon);
              if (q.x < -10 || q.x > SIZE + 10 || q.y < -10 || q.y > SIZE + 10) return null;
              return (
                <g key={p.name}>
                  <circle cx={q.x} cy={q.y} r={p.base ? 5 : 2.5} fill={p.base ? '#0091EB' : '#9bb1c7'} />
                  <text x={q.x + 7} y={q.y + 3.5} fill={p.base ? '#fff' : '#9bb1c7'} fontSize={p.base ? 12 : 10} fontWeight={p.base ? 600 : 400} fontFamily="var(--f-body)">{p.name}</text>
                </g>
              );
            })}
            {dot && (
              <g>
                <line x1={SIZE / 2} y1={SIZE / 2} x2={dot.x} y2={dot.y} stroke="#fff" strokeDasharray="3 4" strokeWidth="1" />
                <circle cx={dot.x} cy={dot.y} r="7" fill="none" stroke="#fff" strokeWidth="1.5" className="zone-ping" />
                <circle cx={dot.x} cy={dot.y} r="4" fill="#fff" />
              </g>
            )}
          </g>
        </svg>
        <p className="zone-legend mono">Base : {site.base.city} · rayon d’intervention {R} km{site.serviceRadiusKm.pending ? ' (en cours de validation)' : ''}</p>
      </div>

      <div className="zone-panel">
        <form onSubmit={check} className="zone-form" noValidate>
          <div className="field">
            <label htmlFor={`${id}-cp`}>Votre code postal</label>
            <div className="zone-input">
              <input id={`${id}-cp`} className="input" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="60200"
                value={cp} onChange={(e) => setCp(e.target.value.replace(/\D/g, '').slice(0, 5))}
                aria-invalid={res.state === 'error'} aria-describedby={`${id}-out`} />
              <button className="btn" type="submit" data-loading={res.state === 'loading'} data-track="zone_check">Vérifier</button>
            </div>
          </div>
        </form>
        <div id={`${id}-out`} aria-live="polite" className="zone-out">
          {res.state === 'error' && <p className="notice notice--error">{res.message}</p>}
          {res.state === 'done' && current && (
            <div className="zone-result">
              {res.communes.length > 1 && (
                <div className="field">
                  <label htmlFor={`${id}-commune`}>Commune</label>
                  <select id={`${id}-commune`} className="select" value={res.pick} onChange={(e) => setRes({ ...res, pick: Number(e.target.value) })}>
                    {res.communes.map((c, i) => <option key={c.nom} value={i}>{c.nom}</option>)}
                  </select>
                </div>
              )}
              <p className="zone-km"><span className="mono">{current.nom}</span><strong>{Math.round(current.km)} km</strong><span className="mono">de {site.base.city}</span></p>
              <p className={`notice ${verdict === 'in' ? 'notice--success' : verdict === 'maybe' ? '' : 'notice--warning'}`}>
                {verdict === 'in' && 'Votre commune est dans notre secteur d’intervention. Décrivez votre chantier : nous confirmons la faisabilité dans l’étude.'}
                {verdict === 'maybe' && 'Votre commune est juste au-delà de notre secteur. Une intervention reste possible selon la taille du chantier : demandez une étude.'}
                {verdict === 'out' && 'Votre commune est hors de notre secteur actuel. Vous pouvez tout de même nous écrire pour un chantier important.'}
              </p>
              {site.serviceRadiusKm.pending && <p className="hint muted">Secteur en cours de validation : la réponse définitive est donnée avec l’étude.</p>}
              <Link className="btn btn--block" href={`/contact/?cp=${cp}`} data-track="zone_to_devis">Demander une étude pour {current.nom}</Link>
            </div>
          )}
          {res.state === 'idle' && <p className="muted zone-idle">Saisissez votre code postal pour savoir si votre commune se trouve dans notre secteur.</p>}
        </div>
      </div>
    </div>
  );
}
