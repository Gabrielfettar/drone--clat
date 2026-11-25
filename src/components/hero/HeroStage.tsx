'use client';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return !!gl;
  } catch { return false; }
}

export function HeroStage() {
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
      <div className="hero-poster" aria-hidden="true" />
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
