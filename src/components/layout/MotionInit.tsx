'use client';
import { useEffect } from 'react';

/**
 * Boutons dynamiques : les grands boutons suivent légèrement le curseur (effet « aimant »)
 * et un reflet suit la souris sur tous les boutons. Désactivé au tactile et si l'utilisateur
 * préfère moins d'animations. Aucune dépendance, un seul écouteur délégué.
 */
export function MotionInit() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let last: HTMLElement | null = null;
    const reset = (b: HTMLElement) => { b.style.removeProperty('--mx'); b.style.removeProperty('--my'); };
    const move = (e: PointerEvent) => {
      const b = (e.target as Element | null)?.closest?.('.btn') as HTMLElement | null;
      if (last && last !== b) reset(last);
      last = b;
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--px', `${((e.clientX - r.left) / r.width) * 100}%`);
      b.style.setProperty('--py', `${((e.clientY - r.top) / r.height) * 100}%`);
      if (b.classList.contains('btn--lg')) {
        b.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 10}px`);
        b.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
      }
    };
    const leave = () => { if (last) reset(last); last = null; };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}
