import Link from 'next/link';

/** Appel à l'action de fin de page, contextualisé par page. */
export function CtaBand({ title, text, cta = 'Décrire mon chantier', href = '/contact/', secondary }: {
  title: string; text: string; cta?: string; href?: string; secondary?: { href: string; label: string };
}) {
  return (
    <section className="section section--ink cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band-inner">
        <div>
          <span className="eyebrow">Étude gratuite</span>
          <h2 id="cta-band-title" className="h-1">{title}</h2>
        </div>
        <div className="cta-band-side">
          <p className="lede">{text}</p>
          <div className="cta-row">
            <Link className="btn" href={href} data-track="cta_band">{cta} <span className="btn-arrow" aria-hidden="true">→</span></Link>
            {secondary && <Link className="btn btn--ghost" href={secondary.href}>{secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
