import Link from 'next/link';
import type { Metadata } from 'next';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: 'À propos de Drone Éclat : entretien par drone, Oise' },
  description: 'Drone Éclat, entreprise de l’Oise créée en 2026 : entretien de toitures, façades et bardages par drone. Positionnement, engagements et équipe.',
  alternates: { canonical: '/a-propos/' },
};

const pillars = [
  {
    k: 'Prouvé',
    t: 'Montrer plutôt qu’affirmer.',
    d: 'Pas de faux avis, pas de photos empruntées, pas de chiffres sans source. Chaque chantier sera documenté avec des photos datées et publié avec l’accord du client.',
  },
  {
    k: 'Local',
    t: 'Basés à Compiègne.',
    d: 'Nous connaissons le bâti du secteur, ses tuiles, ses ardoises et ses bardages agricoles. Un interlocuteur unique, de l’étude au rapport.',
  },
  {
    k: 'Transparent',
    t: 'Dire ce que le drone ne fait pas.',
    d: 'Le drone nettoie et entretient une couverture saine. Il ne remplace pas une tuile ni ne répare un faîtage. Quand c’est le cas, nous vous orientons vers un couvreur.',
  },
];

const commitments = [
  ['Une étude avant tout devis', 'Photos, vue aérienne ou visite : nous vérifions le support, la pente, les obstacles et l’espace aérien avant de chiffrer.'],
  ['Des démarches faites et documentées', 'Enregistrement d’exploitant, cadre de vol adapté, notification en préfecture lorsqu’elle est exigée : nous préparons ces démarches et vous pouvez en demander les justificatifs.'],
  ['Un devis détaillé, sans surprise', 'Surface, méthode, produit éventuel nommé, conditions météo et délai. Pas de démarchage, pas de pression commerciale.'],
  ['Un chantier sécurisé', 'Périmètre balisé au sol pendant le vol, personne dans la zone, matériel retiré le jour même.'],
  ['Le respect du voisinage et de la vie privée', 'Information des voisins quand c’est nécessaire, caméra cadrée sur votre bâtiment, aucune image publiée sans accord.'],
  ['Des produits utilisés selon leur étiquette', 'Quand un traitement est prévu, le produit est nommé dans le devis et appliqué dans les conditions prévues par son étiquette.'],
  ['Un rapport photo remis à chaque client', 'Avant / après, observations et conseils d’entretien pour les années suivantes.'],
  ['Une orientation honnête', 'Tuiles cassées, infiltration, couverture à refaire : nous vous le disons et vous orientons vers un couvreur plutôt que de vendre un nettoyage inutile.'],
];

const team = [
  { role: 'Fondateur et gérant', missing: ['Nom', 'Parcours', 'Photo'] },
  { role: 'Télépilote', missing: ['Nom', 'Certificats et formations', 'Photo'] },
  { role: 'Couvreur partenaire (envisagé)', missing: ['Entreprise', 'Secteur', 'Spécialités'] },
];

function Silhouette() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="16" cy="12" r="5" />
      <path d="M6 27c1.6-5 5.4-7.5 10-7.5S24.4 22 26 27" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/a-propos/', label: 'À propos' }]}
        eyebrow="À propos"
        title="Une entreprise de l’Oise qui préfère prouver que promettre."
        lede="Drone Éclat est née en 2026 dans l’Oise d’une idée simple : entretenir toitures, façades et bardages sans mettre personne en hauteur, et le faire de façon vérifiable."
      >
        <div className="cta-row">
          <Link href="/contact/" className="btn" data-track="cta_about_hero">Demander une étude gratuite <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link href="/technologie/" className="btn btn--ghost">Notre méthode</Link>
        </div>
      </PageHero>

      {/* Histoire */}
      <section className="section" aria-labelledby="histoire-title">
        <div className="container pb-split">
          <div className="pb-stack" data-reveal>
            <span className="eyebrow">Notre histoire</span>
            <h2 id="histoire-title" className="h-1">Pourquoi un drone, et pourquoi ici.</h2>
          </div>
          <div className="prose" data-reveal style={{ ['--i' as string]: 1 }}>
            <p className="lede">Démousser une toiture, c’est souvent monter dessus, installer un échafaudage ou une nacelle, et marcher sur des tuiles qui n’aiment pas ça. Le drone change la donne pour l’entretien d’une couverture saine : le travail en hauteur se fait depuis le sol.</p>
            <p>Drone Éclat a été créée en 2026, dans l’Oise, autour de Compiègne. Le secteur s’y prête : un bâti varié, de la maison individuelle aux bâtiments agricoles, et un climat humide qui favorise mousses et lichens, en particulier près des massifs boisés et sur les versants exposés au nord.</p>
            <p>Nous démarrons. Nous ne prétendons donc pas avoir « des centaines de chantiers » à notre actif : nos premières réalisations seront publiées une par une, avec photos datées et accord des clients, sur la page <Link href="/realisations/">Réalisations</Link>.</p>
          </div>
        </div>
      </section>

      {/* Positionnement */}
      <section className="section section--mist" aria-labelledby="pos-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Positionnement</span><h2 id="pos-title" className="h-1">Prouvé, local, transparent.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Trois mots que nous préférons démontrer sur le terrain plutôt qu’afficher en slogan.</p>
          </div>
          <div className="pb-pillars">
            {pillars.map((p, k) => (
              <article key={p.k} className="pb-pillar" data-reveal style={{ ['--i' as string]: k }}>
                <span className="mono">{p.k}</span>
                <h3 className="h-3">{p.t}</h3>
                <p className="muted">{p.d}</p>
              </article>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 'var(--s-6)' }}>
            Le détail du cadre réglementaire est expliqué sur la page <Link className="link-arrow" href="/securite-reglementation/">Sécurité et réglementation <span aria-hidden="true">→</span></Link>
          </p>
        </div>
      </section>

      {/* Engagements */}
      <section className="section section--ink" aria-labelledby="eng-title">
        <div className="container pb-split">
          <div className="pb-stack" data-reveal>
            <span className="eyebrow">Engagements</span>
            <h2 id="eng-title" className="h-1">Ce sur quoi vous pouvez nous tenir.</h2>
            <p className="lede">Des engagements concrets, que vous pouvez vérifier sur votre propre chantier.</p>
          </div>
          <ol className="pb-numbered" data-reveal style={{ ['--i' as string]: 1 }}>
            {commitments.map(([t, d]) => <li key={t}><strong>{t}</strong><p>{d}</p></li>)}
          </ol>
        </div>
      </section>

      {/* Équipe */}
      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Équipe</span><h2 id="team-title" className="h-1">Les personnes derrière le drone.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Les présentations arrivent. Nous préférons laisser ces emplacements vides plutôt que d’y mettre des noms ou des visages qui ne seraient pas les nôtres.</p>
          </div>
          <ul className="pb-team" role="list">
            {team.map((m, k) => (
              <li key={m.role} className="pb-member" data-reveal style={{ ['--i' as string]: k }}>
                <span className="pb-avatar"><Silhouette /></span>
                <h3 className="h-3">{m.role}</h3>
                <dl>
                  {m.missing.map((f) => <div key={f}><dt>{f}</dt><dd><span className="pending-tag">à compléter</span></dd></div>)}
                </dl>
              </li>
            ))}
          </ul>
          <dl className="pb-legal-dl" style={{ marginTop: 'var(--s-6)' }}>
            <div><dt>Siège</dt><dd>{site.base.city}, {site.base.department}{site.base.pending && <> <span className="pending-tag">à confirmer</span></>}</dd></div>
            <div><dt>Numéro d’exploitant UAS</dt><dd><span className="pending-tag">à compléter</span></dd></div>
            <div><dt>Assurance responsabilité civile</dt><dd><span className="pending-tag">à compléter</span></dd></div>
          </dl>
        </div>
      </section>

      <CtaBand
        title="Parlons de votre bâtiment."
        text="Quelques photos suffisent pour une première étude. Si le drone n’est pas la bonne solution pour votre toiture, nous vous le dirons."
        secondary={{ href: '/journal/', label: 'Lire le journal' }}
      />
    </>
  );
}
