'use client';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { GalleryItem } from '@/content/projects';

/** Galerie filtrable avec visionneuse plein écran (clavier, glisser au doigt, zoom au double-clic). */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const cats = useMemo(() => ['Tout', ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [cat, setCat] = useState('Tout');
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const list = cat === 'Tout' ? items : items.filter((i) => i.category === cat);
  const dlg = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const show = (k: number) => { lastFocus.current = document.activeElement as HTMLElement; setOpen(k); setZoom(false); };
  const close = useCallback(() => { setOpen(null); dlg.current?.close(); lastFocus.current?.focus(); }, []);
  const go = useCallback((d: number) => { setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)); setZoom(false); }, [list.length]);

  useEffect(() => { if (open !== null && dlg.current && !dlg.current.open) dlg.current.showModal(); }, [open]);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k);
  }, [open, go]);

  const cur = open !== null ? list[open] : null;
  return (
    <div className="gal">
      <div className="gal-filters" role="group" aria-label="Filtrer par type">
        {cats.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className="chip">{c}</button>)}
      </div>
      <ul className="gal-grid">
        {list.map((it, k) => (
          <li key={it.id} className="gal-item" data-reveal style={{ ['--i' as string]: k % 6 }}>
            <button type="button" onClick={() => show(k)} aria-label={`Agrandir : ${it.title}`}>
              <Image src={it.src} alt={it.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              <span className="gal-meta"><span className="mono">{it.category}</span><strong>{it.title}</strong></span>
              {it.kind === 'illustration' && <span className="pending-tag gal-tag">Illustration 3D</span>}
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dlg} className="lightbox" aria-label={cur?.title} onClose={close} onClick={(e) => e.target === dlg.current && close()}>
        {cur && (
          <div className="lb-inner" onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => { if (touchX.current === null) return; const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touchX.current = null; }}>
            <div className={`lb-media ${zoom ? 'is-zoom' : ''}`} onDoubleClick={() => setZoom((z) => !z)}>
              <Image src={cur.src} alt={cur.alt} fill sizes="100vw" />
            </div>
            <div className="lb-side">
              <p className="mono">{cur.category} · {open! + 1}/{list.length}</p>
              <h2 className="h-3">{cur.title}</h2>
              {cur.kind === 'illustration' && <p className="notice notice--warning">Illustration 3D réalisée pour présenter la méthode. Ce n’est pas une photo de chantier.</p>}
              {cur.details && <dl className="lb-details">{cur.details.map((d) => <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>)}</dl>}
              <div className="lb-nav">
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => go(-1)}>‹ Précédent</button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => go(1)}>Suivant ›</button>
                <button type="button" className="btn btn--sm" onClick={() => setZoom((z) => !z)} aria-pressed={zoom}>{zoom ? 'Dézoomer' : 'Zoomer'}</button>
              </div>
            </div>
            <button type="button" className="lb-close" onClick={close} aria-label="Fermer la visionneuse">×</button>
          </div>
        )}
      </dialog>
    </div>
  );
}
