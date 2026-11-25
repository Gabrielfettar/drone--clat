'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import type { Service } from '@/content/services';

const visuals: Record<Service['visual'], { src: string; alt: string }> = {
  roof: { src: '/illustrations/roof-after.webp', alt: 'Illustration 3D d’une toiture en tuiles nettoyée par drone' },
  facade: { src: '/illustrations/facade.webp', alt: 'Illustration 3D d’une façade de maison contemporaine' },
  cladding: { src: '/illustrations/cladding.webp', alt: 'Illustration 3D d’un bâtiment à bardage' },
  pro: { src: '/illustrations/cladding.webp', alt: 'Illustration 3D d’un bâtiment professionnel' },
};

/** Sélecteur de prestations en onglets accessibles (flèches gauche/droite). */
export function ServiceSelector({ services }: { services: Service[] }) {
  const [i, setI] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = services[i];
  const v = visuals[s.visual];
  const onKey = (e: React.KeyboardEvent) => {
    let n = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % services.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + services.length) % services.length;
    else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = services.length - 1; else return;
    e.preventDefault(); setI(n); tabs.current[n]?.focus();
  };
  return (
    <div className="svc-sel">
      <div role="tablist" aria-label="Prestations" aria-orientation="vertical" className="svc-tabs" onKeyDown={onKey}>
        {services.map((x, k) => (
          <button key={x.slug} ref={(el) => { tabs.current[k] = el; }} role="tab" type="button" id={`${id}-t${k}`}
            aria-selected={k === i} aria-controls={`${id}-p`} tabIndex={k === i ? 0 : -1} onClick={() => setI(k)} className="svc-tab">
            <span className="mono">{String(k + 1).padStart(2, '0')}</span>
            <span className="svc-tab-name">{x.name}</span>
            <span className="svc-tab-bar" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${i}`} className="svc-panel" key={s.slug}>
        <div className="svc-visual">
          <Image src={v.src} alt={v.alt} fill sizes="(max-width: 900px) 100vw, 40vw" />
          <span className="pending-tag svc-visual-tag">Illustration</span>
        </div>
        <div className="svc-body">
          <h3 className="h-3">{s.h1}</h3>
          <p className="muted">{s.summary}</p>
          <div className="svc-cols">
            <div>
              <p className="mono svc-label">Surfaces</p>
              <ul className="svc-chips">{s.surfaces.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <p className="mono svc-label">Avantages</p>
              <ul className="ticks">{s.benefits.slice(0, 3).map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <p className="mono svc-label">Précautions</p>
              <ul className="dashes">{s.precautions.slice(0, 2).map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <div className="cta-row">
            <Link className="btn" href={`/contact/?service=${s.slug}`} data-track="svc_devis">Devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link className="link-arrow" href={`/services/${s.slug}/`}>Tout savoir sur cette prestation <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
