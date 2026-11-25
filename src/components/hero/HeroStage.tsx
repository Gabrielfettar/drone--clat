'use client';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import type { HudSink } from './HeroScene';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

/** Décide si la scène 3D peut être chargée : WebGL, mémoire, économie de données. */
function canRun3D() {
  try {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number };
    if (nav.connection?.saveData) return false;
    if (nav.connection?.effectiveType && /(^|-)2g/.test(nav.connection.effectiveType)) return false;
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 3) return false;
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    // Rendu logiciel (pas de GPU : SwiftShader, llvmpipe…) : la scène serait saccadée et bloquerait le processeur.
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    if (/swiftshader|llvmpipe|software|microsoft basic render/i.test(renderer) && !/[?&]force3d/.test(location.search)) return false;
    return true;
  } catch { return false; }
}

export function HeroStage() {
  // Image d'attente = élément LCP : préchargée en priorité, en version portrait sur mobile.
  preload('/hero/poster-mobile.webp', { as: 'image', fetchPriority: 'high', media: '(max-width: 900px)' } as Parameters<typeof preload>[1]);
  preload('/hero/poster.webp', { as: 'image', fetchPriority: 'high', media: '(min-width: 901px)' } as Parameters<typeof preload>[1]);
  const [mode, setMode] = useState<'poster' | '3d'>('poster');
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const hud = useRef<{ alt: HTMLElement | null; pass: HTMLElement | null; pct: HTMLElement | null; phase: HTMLElement | null }>({ alt: null, pass: null, pct: null, phase: null });

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(rm);
    if (!canRun3D()) return;
    // La 3D se charge après le premier rendu, quand le navigateur est disponible : le texte et l'image d'attente passent d'abord.
    const go = () => setMode('3d');
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1800 }); else setTimeout(go, 600);
  }, []);

  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting && !document.hidden), { threshold: 0.01 });
    io.observe(el);
    const vis = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', vis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', vis); };
  }, []);

  const onHud: HudSink = useCallback((d) => {
    const h = hud.current;
    if (h.alt) h.alt.textContent = d.alt.toFixed(1).replace('.', ',');
    if (h.pass) h.pass.textContent = `${d.pass}/${d.passes}`;
    if (h.pct) h.pct.textContent = String(d.pct);
    if (h.phase) h.phase.textContent = d.phase === 'clean' ? 'Rinçage en cours' : d.phase === 'hold' ? 'Contrôle caméra' : d.phase === 'approach' ? 'Mise en position' : 'Préparation';
  }, []);

  return (
    <div ref={wrap} className="hero-stage" data-mode={mode} data-ready={ready}>
      <picture className="hero-poster">
        <source media="(max-width: 900px)" srcSet="/hero/poster-mobile.webp" />
        <img src="/hero/poster.webp" alt="" fetchPriority="high" decoding="async" width={1920} height={1080} />
      </picture>
      {mode === '3d' && <div className="hero-canvas"><HeroScene onHud={onHud} reduced={reduced} onReady={() => setReady(true)} active={active} /></div>}
      <div className="hero-hud" aria-hidden="true">
        <span><b>ALT</b><i ref={(e) => { hud.current.alt = e; }}>—</i> m</span>
        <span><b>PASSE</b><i ref={(e) => { hud.current.pass = e; }}>—</i></span>
        <span><b>TRAITÉ</b><i ref={(e) => { hud.current.pct = e; }}>0</i> %</span>
        <span className="hud-phase"><i ref={(e) => { hud.current.phase = e; }}>Préparation</i></span>
      </div>
    </div>
  );
}
