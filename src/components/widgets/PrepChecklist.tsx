'use client';
import { useEffect, useState } from 'react';

const items = [
  { t: 'Fermer fenêtres, velux et lucarnes', d: 'L’eau de rinçage ruisselle sur la toiture et les façades.' },
  { t: 'Rentrer ou déplacer les véhicules', d: 'Gardez-les hors de la zone balisée au pied du bâtiment.' },
  { t: 'Dégager le pied des murs', d: 'Mobilier de jardin, pots, linge : rangez ce qui craint l’eau.' },
  { t: 'Prévoir un point d’eau accessible', d: 'Un robinet extérieur facilite l’alimentation de l’unité au sol. Nous l’indiquons dans le devis.' },
  { t: 'Garder animaux et enfants à l’intérieur', d: 'Personne dans le périmètre de sécurité pendant le vol.' },
  { t: 'Signaler les points fragiles', d: 'Tuiles cassées, antenne, panneaux solaires, câbles : dites-le nous avant l’intervention.' },
];

/** Liste de préparation cochable. L'état coché est mémorisé dans ce navigateur uniquement. */
export function PrepChecklist() {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));
  useEffect(() => { try { const s = localStorage.getItem('de-prep'); if (s) setDone(JSON.parse(s)); } catch {} }, []);
  const toggle = (k: number) => setDone((d) => { const n = d.map((v, i) => (i === k ? !v : v)); try { localStorage.setItem('de-prep', JSON.stringify(n)); } catch {} return n; });
  const count = done.filter(Boolean).length;
  return (
    <div className="prep">
      <div className="prep-progress" aria-hidden="true"><span style={{ width: `${(count / items.length) * 100}%` }} /></div>
      <p className="mono prep-count" aria-live="polite">{count} / {items.length} prêts</p>
      <ul className="prep-list">
        {items.map((it, k) => (
          <li key={it.t}>
            <label className="prep-item" data-done={done[k]}>
              <input type="checkbox" checked={done[k]} onChange={() => toggle(k)} />
              <span className="prep-box" aria-hidden="true" />
              <span><strong>{it.t}</strong><span className="muted">{it.d}</span></span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
