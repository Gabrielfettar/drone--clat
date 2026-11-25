'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Active les révélations au scroll. Le contenu reste lisible sans JS (classe .js absente). */
export function RevealInit() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add('js');
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((e) => io.observe(e));
    // Filet de sécurité : rien ne reste masqué si l'observer ne se déclenche pas.
    const t = window.setTimeout(() => els.forEach((e) => e.classList.add('is-in')), 4000);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [path]);
  return null;
}
