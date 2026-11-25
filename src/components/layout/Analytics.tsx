'use client';
import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Mesure d'audience sans cookie (Plausible), chargée seulement si NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini.
 * Plausible n'utilise ni cookie ni identifiant persistant : exemptable de consentement selon la CNIL
 * sous réserve de configuration (à vérifier, voir docs/pending-information.md).
 * Les éléments portant data-track="nom" envoient un événement au clic.
 */
declare global { interface Window { plausible?: (e: string, o?: { props?: Record<string, string> }) => void } }

export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  useEffect(() => {
    const on = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
      if (el) window.plausible?.(el.dataset.track!, { props: { path: location.pathname } });
    };
    document.addEventListener('click', on);
    return () => document.removeEventListener('click', on);
  }, []);
  if (!domain) return null;
  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}

export function track(event: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined') window.plausible?.(event, props ? { props } : undefined);
}
