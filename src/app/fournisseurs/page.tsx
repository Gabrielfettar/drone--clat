import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { Icon } from '@/components/ui/Icon';
import { suppliers } from '@/content/suppliers';

export const metadata: Metadata = {
  title: 'Nos fournisseurs : produits SCALP et DALEP',
  description: 'Drone Éclat travaille avec des produits de fabricants français spécialisés, SCALP et DALEP : antimousses, hydrofuges et nettoyants de façade, dosés au juste nécessaire.',
  alternates: { canonical: '/fournisseurs/' },
};

const commitments = [
  { icon: 'drop' as const, t: 'L’eau d’abord', d: 'Quand un rinçage suffit, nous n’ajoutons aucun produit. Le traitement n’est proposé que s’il apporte un vrai bénéfice à votre couverture.' },
  { icon: 'leaf' as const, t: 'La juste dose', d: 'Chaque produit est dilué et appliqué selon la fiche technique du fabricant, sur la seule surface à traiter, en protégeant végétation, gouttières et voisinage.' },
  { icon: 'doc' as const, t: 'La transparence', d: 'Le nom du produit utilisé figure sur votre devis et votre rapport d’intervention. Les fiches techniques et de sécurité sont disponibles sur demande.' },
];

export default function SuppliersPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/fournisseurs/', label: 'Nos fournisseurs' }]} eyebrow="Produits" title="Des produits de fabricants français spécialisés."
        lede="Nous travaillons avec deux fabricants reconnus du traitement des toitures et des façades. Leurs produits professionnels sont faits pour durer, et appliqués avec mesure." />

      <section className="section" aria-label="Nos fournisseurs">
        <div className="container">
          <ul className="sup-cards">
            {suppliers.map((s, k) => (
              <li key={s.slug} className="sup-card" data-reveal style={{ ['--i' as string]: k }}>
                <span className="sup-name">{s.name}</span>
                <span className="mono">{s.short}</span>
                <p>{s.about}</p>
                <dl className="sup-dl">
                  {s.products.map((p) => <div key={p.family}><dt>{p.family}</dt><dd>{p.items}</dd></div>)}
                </dl>
                <ul className="ticks">{s.facts.map((f) => <li key={f}>{f}</li>)}</ul>
                <a className="link-arrow" href={s.url} target="_blank" rel="noopener">Site du fabricant <span aria-hidden="true">↗</span></a>
              </li>
            ))}
          </ul>
          <p className="hint muted" style={{ marginTop: 'var(--s-4)' }}>Caractéristiques indiquées par les fabricants. SCALP et DALEP sont des marques de leurs propriétaires respectifs.</p>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="eng-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Nos engagements</span><h2 id="eng-title" className="h-1">Moins de produit, mieux appliqué.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Le drone permet une application précise, sans débordement. Nous l’utilisons pour mettre le bon produit, au bon endroit, à la bonne dose.</p>
          </div>
          <ul className="eco-list">
            {commitments.map((c, k) => <li key={c.t} data-reveal style={{ ['--i' as string]: k }}><Icon name={c.icon} size={28} /><strong>{c.t}</strong><p className="muted">{c.d}</p></li>)}
          </ul>
          <p className="notice" style={{ marginTop: 'var(--s-6)' }}>Les antimousses sont des produits biocides. Utilisez les produits biocides avec précaution. Avant toute utilisation, lisez l’étiquette et les informations concernant le produit. Le recours à un traitement et son mode d’application sont décidés au cas par cas, selon le produit et la réglementation.</p>
        </div>
      </section>

      <CtaBand title="Quel traitement pour votre toit ?" text="Nous vous le disons après étude, gratuitement : rinçage seul, traitement curatif, préventif ou hydrofuge." cta="Recevoir mon étude gratuite" secondary={{ href: '/services/demoussage-toiture-drone/', label: 'Le démoussage en détail' }} />
    </>
  );
}
