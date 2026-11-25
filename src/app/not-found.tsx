import Link from 'next/link';
import type { Metadata } from 'next';
import './pages-b.css';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'Cette page n’existe pas ou a été déplacée. Retrouvez nos prestations, nos conseils ou demandez une étude gratuite.',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

const links = [
  { href: '/', label: 'Accueil', d: 'Le démoussage et le nettoyage par drone en bref.' },
  { href: '/services/demoussage-toiture-drone/', label: 'Démoussage de toiture', d: 'La méthode, ses atouts et ses limites.' },
  { href: '/realisations/', label: 'Réalisations', d: 'Comment nous documentons chaque chantier.' },
  { href: '/journal/', label: 'Journal', d: 'Conseils d’entretien et réglementation.' },
  { href: '/zones-intervention/', label: 'Zones d’intervention', d: 'Autour de Compiègne, dans l’Oise.' },
  { href: '/contact/', label: 'Demander une étude', d: 'Gratuite, à partir de vos photos.' },
];

export default function NotFound() {
  return (
    <section className="section">
      <div className="container notfound">
        <svg className="pb-404-arc" viewBox="0 0 400 210" aria-hidden="true" focusable="false"><path d="M20 200 A180 180 0 0 1 380 200" /></svg>
        <p className="pb-404-code">ERREUR 404 · HORS ZONE</p>
        <h1 className="h-1">Cette page a quitté le périmètre balisé.</h1>
        <p className="lede">L’adresse que vous avez suivie n’existe pas, ou la page a été déplacée. Pas d’inquiétude : voici de quoi reprendre le vol.</p>
        <div className="cta-row" style={{ marginTop: 0 }}>
          <Link href="/" className="btn">Retour à l’accueil <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link href="/contact/" className="btn btn--ghost">Demander un devis gratuit</Link>
        </div>
        <nav aria-label="Pages utiles">
          <ul className="pb-404-links">
            {links.map((l) => <li key={l.href}><Link href={l.href}><strong>{l.label}</strong><span>{l.d}</span></Link></li>)}
          </ul>
        </nav>
      </div>
    </section>
  );
}
