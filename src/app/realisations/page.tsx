import Link from 'next/link';
import type { Metadata } from 'next';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { Gallery } from '@/components/widgets/Gallery';
import { projects, demos } from '@/content/projects';
import { Situations } from '@/components/sections/Situations';

export const metadata: Metadata = {
  title: { absolute: 'Réalisations : chantiers par drone dans l’Oise' },
  description: 'Les premiers chantiers Drone Éclat arrivent : découvrez comment chaque intervention sera documentée, avec photos avant / après datées et accord du client.',
  alternates: { canonical: '/realisations/' },
};

const sheet = [
  ['Bâtiment', 'Type (maison, longère, hangar, copropriété…), commune, matériau de couverture ou de façade, surface traitée et hauteur approximative.'],
  ['Constat', 'État avant intervention : mousses, lichens, traces noires ou vertes, points fragiles repérés (tuiles cassées, gouttières, antennes, panneaux solaires).'],
  ['Méthode', 'Ce qui a été fait et avec quoi : rinçage à l’eau, pression adaptée au support, traitement éventuel avec le produit nommé et son étiquette, mesures prises pour limiter le ruissellement.'],
  ['Démarches', 'Cadre de vol retenu, notification en préfecture lorsqu’elle était exigée, balisage et information du voisinage.'],
  ['Résultat', 'Ce que l’on observe à la fin du chantier, sans retouche, et quand c’est possible un nouveau cliché quelques mois plus tard.'],
  ['Photos', 'Avant / après datées, prises sous le même angle. Pas de visage, de plaque d’immatriculation ni d’adresse lisible ; propriétés voisines floutées.'],
  ['Accord client', 'Publication uniquement avec l’accord écrit du propriétaire. Son avis, s’il souhaite en donner un, est publié tel quel, sans réécriture.'],
];

export default function RealisationsPage() {
  const hasProjects = projects.length > 0;
  return (
    <>
      <PageHero
        crumbs={[{ href: '/realisations/', label: 'Réalisations' }]}
        eyebrow="Réalisations"
        title="Nos réalisations"
        lede={hasProjects
          ? 'Chaque fiche présente le bâtiment, le constat, la méthode et le résultat, avec des photos avant / après datées et l’accord du client.'
          : 'Drone Éclat démarre : nos premiers chantiers arrivent. Plutôt que d’emprunter des photos ou d’inventer des avis, nous publierons ici chaque intervention réelle, documentée de la même façon.'}
      >
        <div className="cta-row">
          <Link href="/contact/" className="btn" data-track="cta_realisations_hero">Demander un devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link href="#fiche-type" className="btn btn--ghost">Voir la fiche type</Link>
        </div>
      </PageHero>

      {/* Statut honnête */}
      <section className="section section--tight" aria-labelledby="statut-title">
        <div className="container pb-split">
          <div data-reveal>
            <span className="eyebrow">Où nous en sommes</span>
            <h2 id="statut-title" className="h-2" style={{ marginTop: 'var(--s-4)' }}>Une galerie qui se remplira chantier après chantier.</h2>
          </div>
          <div className="pb-stack" data-reveal style={{ ['--i' as string]: 1 }}>
            {hasProjects ? (
              <p className="lede">Les photos marquées « chantier » proviennent de nos interventions. Les visuels marqués « Illustration 3D » présentent la méthode et ne sont pas des photos de chantier.</p>
            ) : (
              <>
                <div className="pb-status">
                  <span className="mono">Chantiers publiés : aucun pour l’instant</span>
                  <p>Les images ci-dessous sont des <strong>illustrations 3D</strong> réalisées pour expliquer la méthode. Chacune est étiquetée comme telle. Elles seront remplacées par les photos de nos premiers chantiers.</p>
                </div>
                <p className="muted">Ce choix est volontaire : un site qui démarre avec des dizaines de « réalisations » et des avis cinq étoiles devrait vous mettre la puce à l’oreille. Ici, ce que vous verrez sera vérifiable.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <Situations />

      <section className="section section--mist" aria-labelledby="galerie-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Galerie</span><h2 id="galerie-title" className="h-1">Toitures, façades, bardages.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Filtrez par type de surface, puis ouvrez une image pour l’agrandir et lire ses détails.</p>
          </div>
          <Gallery items={[...projects, ...demos]} />
        </div>
      </section>

      {/* Fiche type */}
      <section className="section" id="fiche-type" aria-labelledby="doc-title">
        <div className="container pb-split">
          <div className="pb-stack" data-reveal>
            <span className="eyebrow">Méthode</span>
            <h2 id="doc-title" className="h-1">Comment nous documentons un chantier.</h2>
            <p className="lede">Chaque réalisation publiée suivra la même fiche. Vous pourrez comparer, vérifier, et savoir exactement ce qui a été fait.</p>
            <p className="muted">Le même document vous est remis à la fin de votre intervention, sous forme de rapport photo, que vous acceptiez ou non sa publication.</p>
            <Link className="link-arrow" href="/technologie/">Notre matériel et la méthode <span aria-hidden="true">→</span></Link>
          </div>
          <figure className="pb-sheet" data-reveal style={{ ['--i' as string]: 1 }}>
            <figcaption className="pb-sheet-head"><strong>Fiche chantier</strong><span className="mono">Modèle</span></figcaption>
            <dl>
              {sheet.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </figure>
        </div>
      </section>

      {/* Premiers clients */}
      <section className="section section--mist" aria-labelledby="premiers-title">
        <div className="container pb-split">
          <div className="pb-stack" data-reveal>
            <span className="eyebrow">Premiers clients</span>
            <h2 id="premiers-title" className="h-1">Votre toiture pourrait ouvrir cette galerie.</h2>
          </div>
          <div className="pb-stack" data-reveal style={{ ['--i' as string]: 1 }}>
            <p className="lede">Être parmi les premiers, c’est être suivi de près : étude détaillée, rapport photo complet, et un interlocuteur qui a tout intérêt à ce que le résultat soit irréprochable.</p>
            <ul className="ticks">
              <li>Étude gratuite à partir de vos photos ou d’une vue aérienne.</li>
              <li>Devis détaillé, démarches de vol préparées par nous.</li>
              <li>Rapport photo avant / après remis à la fin de l’intervention.</li>
              <li>Publication sur ce site seulement si vous êtes d’accord, et anonymisée.</li>
              <li>Si votre toiture a besoin d’un couvreur plutôt que d’un drone, nous vous le disons.</li>
            </ul>
            <div className="cta-row">
              <Link className="btn" href="/contact/" data-track="cta_realisations_first">Demander mon devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
              <Link className="link-arrow" href="/services/demoussage-toiture-drone/">Le démoussage par drone <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Faites partie de nos premiers chantiers."
        text="Décrivez votre bâtiment en quelques questions et joignez des photos : nous revenons vers vous sous 48 h ouvrées avec une étude et un devis."
        secondary={{ href: '/journal/', label: 'Lire nos conseils' }}
      />
    </>
  );
}
