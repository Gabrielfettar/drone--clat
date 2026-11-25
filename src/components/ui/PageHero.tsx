import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

/** En-tête des pages intérieures : fil d'Ariane, sur-titre, H1 unique, chapô. */
export function PageHero({ crumbs, eyebrow, title, lede, children, aside }: {
  crumbs: Crumb[]; eyebrow: string; title: ReactNode; lede?: ReactNode; children?: ReactNode; aside?: ReactNode;
}) {
  return (
    <header className="page-hero">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <div className="page-hero-grid">
          <div className="page-hero-main">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="h-1">{title}</h1>
            {lede && <p className="lede">{lede}</p>}
            {children}
          </div>
          {aside && <div className="page-hero-aside">{aside}</div>}
        </div>
      </div>
      <svg className="page-hero-arc" viewBox="0 0 400 200" aria-hidden="true"><path d="M10 200 A190 190 0 0 1 390 200" /></svg>
    </header>
  );
}
