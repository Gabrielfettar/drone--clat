import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/content/benefits';

const proofs: { icon: IconName; t: string; d: string }[] = [
  { icon: 'clock', t: 'Devis gratuit sous 48 h', d: 'Sur photos, sans engagement.' },
  { icon: 'tile', t: 'Personne sur votre toit', d: 'Le drone travaille depuis le sol.' },
  { icon: 'doc', t: 'Démarches de vol incluses', d: 'Espace aérien et déclarations : on s’en occupe.' },
  { icon: 'camera', t: 'Rapport photo avant / après', d: 'Remis à la fin du chantier.' },
];

/** Bande de confiance placée juste sous le premier écran : quatre engagements vérifiables. */
export function TrustBand() {
  return (
    <section className="trust-band" aria-label="Nos engagements">
      <ul className="container trust-list">
        {proofs.map((p, k) => (
          <li key={p.t} data-reveal style={{ ['--i' as string]: k }}>
            <span className="trust-ico"><Icon name={p.icon} size={22} /></span>
            <span><strong>{p.t}</strong><span className="trust-d">{p.d}</span></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const rows: { k: string; drone: string; classic: string }[] = [
  { k: 'Accès au toit', drone: 'Depuis le sol, personne sur la couverture', classic: 'Échafaudage, nacelle ou passage sur les tuiles' },
  { k: 'Installation', drone: 'Une trentaine de minutes', classic: 'Montage puis démontage de l’échafaudage' },
  { k: 'Durée pour une maison', drone: 'Souvent une journée', classic: 'Variable, selon l’accès et le montage' },
  { k: 'Appui sur la couverture', drone: 'Aucun', classic: 'Poids d’une personne sur les tuiles' },
  { k: 'Emprise chez vous', drone: 'Le matériel tient au pied du bâtiment', classic: 'Jardin ou voirie occupés' },
  { k: 'Réparations', drone: 'Non : une tuile cassée reste un travail de couvreur', classic: 'Possibles dans la même intervention' },
];

/** Comparatif honnête drone / méthode classique, y compris ce que le drone ne fait pas. */
export function Compare() {
  return (
    <section className="section compare" aria-labelledby="cmp-title">
      <div className="container">
        <div className="wow-head wow-head--split" data-reveal>
          <h2 id="cmp-title" className="h-mega-2">Drone ou <span className="accent">échafaudage ?</span></h2>
          <p className="lede">La comparaison, sans rien cacher : le drone nettoie, il ne répare pas.</p>
        </div>
        <div className="vs" role="table" aria-label="Comparaison entre le nettoyage par drone et la méthode classique">
          <div className="vs-row vs-head" role="row">
            <span role="columnheader" className="sr-only">Critère</span>
            <span role="columnheader" className="vs-col vs-col--drone">Par drone</span>
            <span role="columnheader" className="vs-col">Méthode classique</span>
          </div>
          {rows.map((r, k) => (
            <div key={r.k} className="vs-row" role="row" data-reveal style={{ ['--i' as string]: k % 6 }}>
              <span role="rowheader" className="vs-k mono">{r.k}</span>
              <span role="cell" className="vs-col vs-col--drone"><Icon name="check" size={18} />{r.drone}</span>
              <span role="cell" className="vs-col">{r.classic}</span>
            </div>
          ))}
        </div>
        <p className="hint muted vs-note">Selon le lieu, une déclaration de vol doit être déposée avant l’intervention : nous l’intégrons au planning annoncé dans le devis.</p>
        <div className="cta-row wow-center-row">
          <Link className="btn" href="/contact/" data-track="cta_compare">Demander mon devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link className="link-arrow" href="/technologie/">Voir la technologie et ses limites <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
