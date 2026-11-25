'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site, isKnown } from '@/config/site';

/** Contact rapide flottant : discret, apparaît après le premier écran, masqué sur la page contact. */
export function QuickContact() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k);
  }, [open]);
  if (path.startsWith('/contact')) return null;
  const phone = isKnown(site.phone) ? site.phone.value : null;
  const email = isKnown(site.email) ? site.email.value : null;
  return (
    <div className="quick" data-show={show || open} data-open={open}>
      <div id="quick-panel" className="quick-panel" hidden={!open}>
        <p className="mono">Une question sur votre chantier ?</p>
        <Link href="/contact/" className="btn btn--block btn--sm" data-track="quick_devis">Demander un devis gratuit</Link>
        {phone
          ? <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn--ghost btn--block btn--sm" data-track="phone_click">Appeler le {phone}</a>
          : null}
        {email && <a href={`mailto:${email}`} className="btn btn--ghost btn--block btn--sm" data-track="email_click">{email}</a>}
        <Link href="/contact/#formulaire" className="link-arrow">Accéder au formulaire <span aria-hidden="true">→</span></Link>
      </div>
      <button type="button" className="quick-toggle" aria-expanded={open} aria-controls="quick-panel" onClick={() => setOpen((v) => !v)}>
        <span className="sr-only">{open ? 'Fermer le contact rapide' : 'Contact rapide'}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
          {open ? <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            : <path d="M4 5h16v11H9l-5 4V5z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />}
        </svg>
      </button>
    </div>
  );
}
