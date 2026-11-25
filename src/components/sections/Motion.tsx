'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Mot qui change en boucle dans un titre (toit → façade → bardage…). */
export function Rotator({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce()) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => window.clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="rot" aria-live="off">
      <span className="sr-only">{words.join(', ')}</span>
      <span className="rot-track" aria-hidden="true">
        {words.map((w, k) => <span key={w} className="rot-word" data-on={k === i}>{w}</span>)}
      </span>
    </span>
  );
}

/** Bandeau de slogans qui défile à l'infini. */
export function Marquee({ items, tone = 'ink' }: { items: string[]; tone?: 'ink' | 'blue' }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" data-tone={tone} aria-label={items.join(' · ')} role="img">
      <div className="marquee-track" aria-hidden="true">
        {row.map((t, k) => <span key={k} className="marquee-item">{t}<i className="marquee-dot" /></span>)}
      </div>
    </div>
  );
}

/** Compteur animé au premier passage à l'écran. */
export function CountUp({ to, suffix = '', prefix = '', duration = 1400 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const el = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    if (reduce() || !el.current) return;
    setV(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / duration), ek = 1 - Math.pow(1 - k, 4);
        setV(Math.round(to * ek));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={el} className="countup">{prefix}{v.toLocaleString('fr-FR')}{suffix}</span>;
}

/** Récit au défilement : un visuel collant à gauche, des étapes qui s'allument à droite. */
export function ScrollSteps({ steps }: { steps: { k: string; title: string; text: string; img: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.k));
    }, { rootMargin: '-45% 0px -45% 0px' });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className="story">
      <div className="story-visual" aria-hidden="true">
        {steps.map((s, k) => (
          <div key={s.k} className="story-img" data-on={k === active}>
            <Image src={s.img} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        ))}
        <div className="story-progress"><span style={{ height: `${((active + 1) / steps.length) * 100}%` }} /></div>
        <span className="story-num">{steps[active].k}</span>
      </div>
      <ol className="story-steps">
        {steps.map((s, k) => (
          <li key={s.k} ref={(r) => { refs.current[k] = r; }} data-k={k} data-on={k === active} className="story-step">
            <span className="story-k">{s.k}</span>
            <h3 className="story-title">{s.title}</h3>
            <p>{s.text}</p>
            <div className="story-img-mobile"><Image src={s.img} alt={s.alt} fill sizes="100vw" /></div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Widget « Et si on ne fait rien ? » : un curseur d'années fait vieillir la toiture. */
export function NeglectSlider({ clean, dirty, stages }: { clean: string; dirty: string; stages: { t: string; d: string }[] }) {
  const [y, setY] = useState(0);
  const max = 12;
  const stage = stages[Math.min(stages.length - 1, Math.floor((y / (max + 0.01)) * stages.length))];
  return (
    <div className="neg">
      <div className="neg-visual">
        <Image src={clean} alt="Bâtiment propre" fill sizes="(max-width: 900px) 100vw, 60vw" />
        <div className="neg-dirty" style={{ opacity: y / max }}><Image src={dirty} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" /></div>
        <span className="neg-years"><b>{y === 0 ? 'Aujourd’hui' : `+ ${y} an${y > 1 ? 's' : ''}`}</b><small>sans entretien</small></span>
      </div>
      <div className="neg-ctrl">
        <label htmlFor="neg-range" className="neg-label">Faites glisser le temps</label>
        <input id="neg-range" type="range" min={0} max={max} step={1} value={y} onChange={(e) => setY(Number(e.target.value))}
          aria-valuetext={y === 0 ? 'Aujourd’hui' : `${y} ans sans entretien`} />
        <div className="neg-stage" key={stage.t}><strong>{y === 0 ? 'Un toit sain.' : stage.t}</strong><span>{y === 0 ? 'Faites glisser pour voir ce que la mousse fait avec le temps.' : stage.d}</span></div>
      </div>
    </div>
  );
}

/** Carrousel horizontal glissable (souris, doigt, clavier), avec défilement par accroche. */
export function Rail({ children, label }: { children: ReactNode; label: string }) {
  const el = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; s: number } | null>(null);
  const by = (d: number) => el.current?.scrollBy({ left: d * (el.current.clientWidth * 0.8), behavior: 'smooth' });
  return (
    <div className="rail">
      <div ref={el} className="rail-track" role="region" aria-label={label} tabIndex={0}
        onPointerDown={(e) => { if (e.pointerType === 'mouse') drag.current = { x: e.clientX, s: el.current!.scrollLeft }; }}
        onPointerMove={(e) => { if (drag.current) el.current!.scrollLeft = drag.current.s - (e.clientX - drag.current.x); }}
        onPointerUp={() => { drag.current = null; }} onPointerLeave={() => { drag.current = null; }}>
        {children}
      </div>
      <div className="rail-nav">
        <button type="button" onClick={() => by(-1)} aria-label="Précédent">←</button>
        <button type="button" onClick={() => by(1)} aria-label="Suivant">→</button>
      </div>
    </div>
  );
}

/** Indice de défilement sous le hero. */
export function ScrollHint({ label }: { label: string }) {
  return <a href="#suite" className="scroll-hint"><span className="scroll-mouse" aria-hidden="true"><i /></span>{label}</a>;
}

