import type { Metadata } from 'next';
import Link from 'next/link';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';

export const metadata: Metadata = {
  title: 'Nos fournisseurs : produits DALEP et SCALP, fabriqués en France',
  description: 'Drone Éclat travaille avec deux fabricants français de produits professionnels pour le bâtiment : DALEP (Calvados) et SCALP (Seine-Saint-Denis). Traitements, hydrofuges, nettoyants.',
  alternates: { canonical: '/fournisseurs/' },
};

const suppliers = [
  {
    name: 'DALEP', since: 'Depuis 1980 · Calvados (Normandie)',
    text: 'Fabricant français de produits professionnels de traitement et de protection du bâtiment, né d’un premier brevet anti-mousse. DALEP formule et fabrique ses produits dans son usine de Saint-André-sur-Orne, avec son propre laboratoire.',
    points: ['Formules en phase aqueuse, sans solvant depuis 2006', 'Gamme éco·R à base d’actifs d’origine végétale (selon les produits)', 'Traitements curatifs et préventifs pour tuiles, ardoises, enduits, bardages', 'Hydrofuges et nettoyants professionnels'],
    use: 'Démoussage, traitement anti-mousse et hydrofugation des toitures et façades.',
  },
  {
    name: 'SCALP', since: 'Depuis les années 1950 · Seine-Saint-Denis',
    text: 'Entreprise française de spécialités chimiques qui conçoit et fabrique des produits techniques de nettoyage, de décapage et de protection pour le bâtiment et l’industrie.',
    points: ['Hydrofuges silane-siloxane en phase aqueuse pour façades et toitures', 'Nettoyants pour façades et micro-végétation', 'Produits de protection pour pierre, brique, béton et enduits', 'Solutions anti-graffiti pour les bâtiments publics et professionnels'],
    use: 'Nettoyage et protection des façades, protection hydrofuge après nettoyage.',
  },
];

export default function SuppliersPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/fournisseurs/', label: 'Nos fournisseurs' }]} eyebrow="Fournisseurs" title="Des produits professionnels, fabriqués en France."
        lede="Un nettoyage durable dépend autant du produit que de la méthode. Nous avons choisi deux fabricants français spécialistes du bâtiment, et nous appliquons chaque produit selon sa fiche technique.">
        <div className="cta-row"><Link className="btn" href="/contact/" data-track="cta_suppliers_hero">Demander une étude gratuite <span className="btn-arrow" aria-hidden="true">→</span></Link></div>
      </PageHero>

      <section className="section" aria-labelledby="sup-title">
        <div className="container">
          <h2 id="sup-title" className="sr-only">Nos deux fabricants partenaires</h2>
          <div className="suppliers">
            {suppliers.map((s, k) => (
              <article key={s.name} className="supplier" data-reveal style={{ ['--i' as string]: k }}>
                <span className="eyebrow">{s.since}</span>
                <h3 className="supplier-name">{s.name}</h3>
                <p className="lede">{s.text}</p>
                <ul className="ticks">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <p className="muted"><strong>Chez nous :</strong> {s.use}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="eng-title">
        <div className="container pb-split">
          <div className="pb-stack" data-reveal>
            <span className="eyebrow">Nos engagements</span>
            <h2 id="eng-title" className="h-1">Le bon produit, au bon dosage.</h2>
          </div>
          <div className="pb-stack" data-reveal style={{ ['--i' as string]: 1 }}>
            <ul className="ticks">
              <li>Chaque produit est choisi selon le support (tuile, ardoise, enduit, pierre, bardage) et son état.</li>
              <li>Application à basse pression, au plus près de la surface : moins de pertes et de dispersion qu’un pulvérisateur à main.</li>
              <li>Abords protégés (massifs, bassins, véhicules) avant toute application.</li>
              <li>Fiches techniques et fiches de données de sécurité disponibles sur simple demande.</li>
              <li>Produits de traitement utilisés dans le respect de leur autorisation et de leur étiquette.</li>
            </ul>
            <p className="muted">Les produits anti-mousse sont des produits biocides : utilisez-les avec précaution. Avant toute utilisation, lisez l’étiquette et les informations concernant le produit.</p>
          </div>
        </div>
      </section>

      <CtaBand title="Un traitement adapté à votre toiture." text="Envoyez-nous quelques photos : nous vous proposons le traitement adapté à votre couverture, avec le produit et le dosage précisés dans le devis." />
    </>
  );
}
