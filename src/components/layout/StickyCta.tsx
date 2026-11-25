'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site, isKnown } from '@/config/site';

/** Barre d'action fixe en bas d'écran sur mobile : apparaît après le premier écran, masquée sur /contact. */
export function StickyCta() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  if (path.startsWith('/contact')) return null;
  const phone = isKnown(site.phone) ? site.phone.value : null;
  return (
    <div className="sticky-cta" data-show={show}>
      {phone && <a className="btn btn--ghost btn--sm" href={`tel:${phone.replace(/\s/g, '')}`} data-track="phone_click">Appeler</a>}
      <Link className="btn btn--sm sticky-cta-main" href="/contact/" data-track="cta_sticky_mobile">Étude gratuite en 1 min <span className="btn-arrow" aria-hidden="true">→</span></Link>
    </div>
  );
}
