'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { services } from '@/content/services';

const links = [
  { href: '/professionnels/entretien-batiments/', label: 'Professionnels' },
  { href: '/realisations/', label: 'Avant / après' },
  { href: '/equipe/', label: 'Équipe' },
  { href: '/zones-intervention/', label: 'Villes' },
  { href: '/contact/', label: 'Contact' },
];

export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const hoverAt = useRef(0);
  const isHome = path === '/';

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setOpen(false); setSub(false); }, [path]);

  // Menu mobile : verrouille le scroll, piège le focus, Échap pour fermer.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const el = panel.current;
    const focusables = () => Array.from(el?.querySelectorAll<HTMLElement>('a, button') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (e.key === 'Tab') {
        const f = focusables(); if (!f.length) return;
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const tone = isHome && !scrolled && !open ? 'over' : 'solid';

  return (
    <header className="site-header" data-tone={tone} data-hidden={hidden && !open} data-open={open}>
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          <Logo />
        </Link>

        <nav className="nav-desktop" aria-label="Navigation principale">
          <ul>
            <li className="has-sub" onMouseEnter={() => { hoverAt.current = Date.now(); setSub(true); }} onMouseLeave={() => setSub(false)}
              onKeyDown={(e) => { if (e.key === 'Escape') setSub(false); }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setSub(false); }}>
              {/* Un clic juste après le survol ne doit pas refermer le menu que le survol vient d'ouvrir. */}
              <button type="button" aria-expanded={sub} aria-controls="sub-services" onClick={() => { if (Date.now() - hoverAt.current > 500) setSub((v) => !v); }}
                className={path.startsWith('/services') ? 'is-active' : ''}>
                Prestations <span aria-hidden="true" className="chev" />
              </button>
              <div id="sub-services" className="subnav" hidden={!sub}>
                <ul>
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}/`} onClick={() => setSub(false)}>
                        <strong>{s.name}</strong>
                        <span>{s.summary.split(',')[0]}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/professionnels/entretien-batiments/" onClick={() => setSub(false)}>
                      <strong>Entretien de bâtiments pro</strong>
                      <span>Syndics, entreprises, collectivités</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={path.startsWith(l.href) ? 'page' : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact/" className="btn btn--sm header-cta" data-track="cta_header">
          Devis gratuit <span className="btn-arrow" aria-hidden="true">→</span>
        </Link>

        <button ref={toggle} type="button" className="burger" aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen((v) => !v)}>
          <span /><span />
        </button>
      </div>

      <div id="mobile-menu" ref={panel} className="mobile-menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <nav aria-label="Navigation mobile" className="container">
          <p className="mono mobile-label">Prestations</p>
          <ul className="mobile-list">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.name}</Link></li>
            ))}
          </ul>
          <p className="mono mobile-label">Drone Éclat</p>
          <ul className="mobile-list">
            {[{ href: '/professionnels/entretien-batiments/', label: 'Professionnels' }, ...links.slice(1), { href: '/fournisseurs/', label: 'Nos fournisseurs' }, { href: '/technologie/', label: 'Technologie' }, { href: '/a-propos/', label: 'À propos' }, { href: '/journal/', label: 'Conseils' }].map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
          <Link href="/contact/" className="btn btn--block" data-track="cta_mobile_menu">Demander une étude gratuite</Link>
        </nav>
      </div>
    </header>
  );
}
