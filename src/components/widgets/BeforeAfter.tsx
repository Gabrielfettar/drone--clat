'use client';
import Image from 'next/image';
import { useCallback, useRef, useState, type ReactNode } from 'react';

/**
 * Comparateur avant / après : glisser (souris, doigt), clavier (flèches, Début, Fin).
 * `illustration` affiche une mention explicite tant que les photos de chantiers réels ne sont pas disponibles.
 */
export function BeforeAfter({ before, after, alt, caption, illustration = false, tag, priority = false }: {
  before: string; after: string; alt: { before: string; after: string }; caption?: ReactNode; illustration?: boolean; tag?: string; priority?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const fromEvent = useCallback((x: number) => {
    const r = box.current?.getBoundingClientRect(); if (!r) return;
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  }, []);
  return (
    <figure className="ba">
      <div ref={box} className="ba-frame" style={{ ['--pos' as string]: `${pos}%` }}
        onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); fromEvent(e.clientX); }}
        onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
        onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}>
        <Image src={after} alt={alt.after} fill sizes="(max-width: 900px) 100vw, 60vw" className="ba-img" priority={priority} />
        <div className="ba-before"><Image src={before} alt={alt.before} fill sizes="(max-width: 900px) 100vw, 60vw" className="ba-img" priority={priority} /></div>
        <span className="ba-tag ba-tag--before mono">Avant</span>
        <span className="ba-tag ba-tag--after mono">Après</span>
        <div className="ba-handle" role="slider" tabIndex={0} aria-label="Comparer avant et après" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)} % avant`}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 4;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setPos((p) => Math.max(0, p - step)); }
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setPos((p) => Math.min(100, p + step)); }
            if (e.key === 'Home') setPos(0); if (e.key === 'End') setPos(100);
          }}>
          <span aria-hidden="true">‹ ›</span>
        </div>
      </div>
      {(caption || illustration) && (
        <figcaption className="ba-cap">
          {illustration && <span className="pending-tag">{tag ?? 'Illustration 3D'}</span>} {caption}
        </figcaption>
      )}
    </figure>
  );
}
