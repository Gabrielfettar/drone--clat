'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { site, isKnown } from '@/config/site';

/** Barre d'action mobile : apparaît dès les premiers pixels de défilement, se masque sur la page devis et près du pied de page. */
export function StickyCta() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (path.startsWith('/contact')) { setShow(false); return; }
    const footer = document.querySelector('.site-footer');
    const onScroll = () => {
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > 120 && !nearFooter);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]);
  if (path.startsWith('/contact')) return null;
  return (
    <div className="sticky-cta" data-show={show} aria-hidden={!show}>
      <Link className="btn" href="/contact/" data-track="cta_sticky" tabIndex={show ? 0 : -1}>Devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
      {isKnown(site.phone)
        ? <a className="btn btn--ghost" href={`tel:${site.phone.value.replace(/\s/g, '')}`} tabIndex={show ? 0 : -1}><Icon name="phone" size={18} /> Appeler</a>
        : <Link className="btn btn--ghost" href="/contact/?batiment=pro" tabIndex={show ? 0 : -1}>Je suis un pro</Link>}
    </div>
  );
}
