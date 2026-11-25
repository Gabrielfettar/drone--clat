import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { HeroStage } from '@/components/hero/HeroStage';
import { ServiceSelector } from '@/components/widgets/ServiceSelector';
import { BeforeAfter } from '@/components/widgets/BeforeAfter';
import { PrepChecklist } from '@/components/widgets/PrepChecklist';
import { Estimator } from '@/components/widgets/Estimator';
import { Faq } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { CityLinks } from '@/components/ui/CityLinks';
import { services } from '@/content/services';
import { homeFaq } from '@/content/faq';
import { benefits, audiences, gains } from '@/content/benefits';
import { examples, stills } from '@/content/examples';
import { credentials } from '@/content/team';

export const metadata: Metadata = {
  title: { absolute: 'Drone Éclat · Démoussage et nettoyage de toiture par drone, Oise et Hauts-de-France' },
  description: 'Démoussage de toiture, nettoyage de façade et de bardage par drone : aucune tuile cassée, pas d’échafaudage, toiture protégée pour des années. Particuliers et professionnels. Étude gratuite sous 48 h.',
  alternates: { canonical: '/' },
};

const compare = [
  ['Votre couverture', 'Personne ne marche dessus : aucune tuile cassée', 'Passages répétés sur le toit, risque de casse'],
  ['Installation', 'Unité au sol et balisage, environ 30 minutes', 'Échafaudage ou nacelle, d’une demi-journée à plusieurs jours'],
  ['Durée du chantier', 'Souvent une journée pour une maison', 'Plusieurs jours, montage et démontage compris'],
  ['Sécurité', 'Télépilote au sol, périmètre balisé', 'Travail en hauteur, risque de chute'],
  ['Jardin, voirie, voisinage', 'Rien à démonter, zone libérée le soir', 'Emprise au sol, parfois autorisation de voirie'],
  ['Grands bâtiments, monuments', 'Accès à toutes les hauteurs sans structure lourde', 'Échafaudage coûteux, parfois impossible'],
];

export default function Home() {
  const featured = examples.slice(0, 3);
  return (
    <>
      {/* 1. Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <HeroStage />
        <div className="container hero-content">
          <p className="eyebrow hero-in" style={{ ['--d' as string]: '0ms' }}>Nettoyage par drone · Particuliers & professionnels</p>
          <h1 id="hero-title" className="h-display hero-title">
            <span className="hero-in" style={{ ['--d' as string]: '80ms' }}>Un toit propre et protégé</span>{' '}
            <span className="hero-in accent" style={{ ['--d' as string]: '160ms' }}>pour des années.</span>
          </h1>
          <p className="lede hero-in" style={{ ['--d' as string]: '260ms' }}>
            Démoussage, nettoyage et traitement de toitures, façades et bardages par drone. Aucune tuile cassée, pas d’échafaudage, et une toiture qui dure plus longtemps.
          </p>
          <div className="cta-row hero-in" style={{ ['--d' as string]: '360ms' }}>
            <Link href="/contact/" className="btn btn--lg" data-track="cta_hero">Mon étude gratuite en 1 minute <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link href="/professionnels/entretien-batiments/" className="btn btn--ghost">Je suis un professionnel</Link>
          </div>
          <ul className="hero-proof hero-in" style={{ ['--d' as string]: '460ms' }} aria-label="Nos engagements">
            <li>Télépilotes certifiés CATS</li>
            <li>Réponse sous 48 h</li>
            <li>Produits fabriqués en France</li>
          </ul>
        </div>
      </section>

      {/* 2. Chiffres clés */}
      <section className="gains" aria-label="Drone Éclat en chiffres">
        <div className="container gains-grid">
          {gains.map((g, k) => (
            <div key={g.unit} className="gain" data-reveal style={{ ['--i' as string]: k }}>
              <strong className="gain-big">{g.big}</strong>
              <span className="gain-unit">{g.unit}</span>
              <p>{g.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bénéfices */}
      <section className="section" id="benefices" aria-labelledby="ben-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Ce que vous y gagnez</span><h2 id="ben-title" className="h-1">Bien plus qu’un toit propre.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Une toiture entretenue, c’est une couverture qui vieillit moins vite, une maison qui garde sa valeur et des années sans y penser. Voici concrètement ce que vous gagnez.</p>
          </div>
          <ul className="benefits">
            {benefits.map((b, k) => (
              <li key={b.k} className="benefit" data-reveal style={{ ['--i' as string]: k % 3 }}>
                <span className="benefit-k mono">{b.k}</span>
                <h3 className="h-3">{b.title}</h3>
                <p className="muted">{b.text}</p>
                <span className="benefit-tag">{b.tag}</span>
              </li>
            ))}
          </ul>
          <div className="cta-center" data-reveal>
            <Link href="/contact/" className="btn" data-track="cta_benefits">Je veux ces résultats chez moi <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <span className="muted">Gratuit, sans engagement, réponse sous 48 h ouvrées.</span>
          </div>
        </div>
      </section>

      {/* 4. Pour qui */}
      <section className="section section--mist" id="pour-qui" aria-labelledby="aud-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Avec qui nous travaillons</span><h2 id="aud-title" className="h-1">De la maison au monument historique.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Particuliers, syndics, entreprises, collectivités, propriétaires de patrimoine : le drone atteint toutes les hauteurs, sans immobiliser le bâtiment.</p>
          </div>
          <ul className="aud-cards">
            {audiences.map((a, k) => (
              <li key={a.slug} className="aud-card" data-reveal style={{ ['--i' as string]: k % 3 }}>
                <span className="eyebrow">{a.label}</span>
                <h3 className="h-3">{a.title}</h3>
                <p className="muted">{a.text}</p>
                <p className="aud-ex mono">{a.examples.join(' · ')}</p>
                <Link className="link-arrow" href={`/contact/?profil=${a.param}`}>{a.cta} <span aria-hidden="true">→</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Prestations */}
      <section className="section" id="prestations" aria-labelledby="svc-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Prestations</span><h2 id="svc-title" className="h-1">Trois métiers, une même méthode.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Chaque surface a sa pression, sa buse et ses précautions. Choisissez la vôtre.</p>
          </div>
          <ServiceSelector services={services} />
        </div>
      </section>

      {/* 6. Avant / après */}
      <section className="section section--ink" id="avant-apres" aria-labelledby="ex-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Avant / après</span><h2 id="ex-title" className="h-1">Le résultat, en un coup d’œil.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Mousses, lichens, traces noires et vertes : voici le type de résultat obtenu par un nettoyage professionnel. Glissez pour comparer.</p>
          </div>
          {featured.length ? (
            <div className="ex-grid">
              {featured.map((e, k) => (
                <div key={e.id} className="ex-item" data-reveal style={{ ['--i' as string]: k }}>
                  <BeforeAfter before={e.before.src} after={e.after.src} alt={{ before: e.before.alt, after: e.after.alt }} illustration="Exemple type" caption={e.title} />
                </div>
              ))}
            </div>
          ) : (
            <div data-reveal>
              <BeforeAfter before="/illustrations/roof-before.webp" after="/illustrations/roof-after.webp" illustration
                alt={{ before: 'Illustration 3D d’une toiture en tuiles couverte de mousse', after: 'La même toiture après rinçage par drone' }} />
            </div>
          )}
          <div className="cta-row" data-reveal>
            <Link className="btn" href="/realisations/">Voir tous les avant / après <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn--ghost" href="/contact/" data-track="cta_examples">Obtenir ce résultat</Link>
          </div>
        </div>
      </section>

      {/* 7. Pourquoi le drone */}
      <section className="section" aria-labelledby="cmp-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Pourquoi le drone</span><h2 id="cmp-title" className="h-1">Mieux fait, plus durable, sans abîmer.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Le nettoyage par drone protège votre couverture au lieu de l’user. Pour une réparation, le couvreur reste indispensable : nous vous le dirons honnêtement.</p>
          </div>
          <div className="table-wrap" data-reveal>
            <table className="cmp">
              <caption className="sr-only">Comparaison entre le drone et les méthodes traditionnelles</caption>
              <thead><tr><th scope="col">Critère</th><th scope="col" className="us">Drone Éclat</th><th scope="col">Nacelle, échafaudage, cordiste</th></tr></thead>
              <tbody>{compare.map(([a, b, c]) => <tr key={a}><th scope="row">{a}</th><td className="us">{b}</td><td>{c}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="hint muted cmp-note">Durées indicatives, variables selon le chantier.</p>
        </div>
      </section>

      {/* 8. Grands bâtiments & patrimoine */}
      <section className="section section--mist pro-band" aria-labelledby="proband-title">
        <div className="container pro-band-grid">
          <div className="pro-band-media" data-reveal>
            {stills.heritage
              ? <Image src={stills.heritage.src} alt={stills.heritage.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
              : <Image src="/illustrations/overview.webp" alt="Illustration d’un chantier balisé" fill sizes="(max-width: 900px) 100vw, 50vw" />}
            <span className="pro-band-chip mono">Jusqu’aux toitures les plus hautes</span>
          </div>
          <div className="pro-band-copy" data-reveal style={{ ['--i' as string]: 1 }}>
            <span className="eyebrow">Professionnels & patrimoine</span>
            <h2 id="proband-title" className="h-1">Grands bâtiments, monuments historiques : aucun chantier hors de portée.</h2>
            <p className="lede">Entrepôts de plusieurs milliers de m², copropriétés, centres commerciaux, églises, châteaux : là où l’échafaudage coûte une fortune ou devient impossible, le drone intervient vite, sans arrêter votre activité.</p>
            <ul className="ticks">
              <li>Planning par secteurs, activité maintenue</li>
              <li>Plan de prévention, attestations d’assurance, rapport daté</li>
              <li>Méthode douce et produits validés avec l’architecte pour les édifices protégés</li>
              <li>Contrat d’entretien pluriannuel pour les parcs immobiliers</li>
            </ul>
            <div className="cta-row">
              <Link className="btn" href="/professionnels/entretien-batiments/">Offre professionnels <span className="btn-arrow" aria-hidden="true">→</span></Link>
              <Link className="link-arrow" href="/contact/?profil=entreprise">Demander une visite technique <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Éco-responsable */}
      <section className="section eco" aria-labelledby="eco-title">
        <div className="container eco-grid">
          <div data-reveal>
            <span className="eyebrow">Une méthode plus sobre</span>
            <h2 id="eco-title" className="h-1">Le bon produit, au bon dosage, au bon endroit.</h2>
            <p className="lede">Nous travaillons avec des fabricants français spécialistes du bâtiment, DALEP et SCALP. Le drone applique le produit au plus près de la surface : moins de pertes, moins de dispersion, et des abords protégés.</p>
            <Link className="link-arrow" href="/fournisseurs/">Nos fournisseurs et nos produits <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="eco-list" data-reveal style={{ ['--i' as string]: 1 }}>
            <li><strong>Moins d’eau, mieux dirigée</strong><span>Rinçage précis de haut en bas, sans arroser inutilement façades et massifs.</span></li>
            <li><strong>Dosage maîtrisé</strong><span>Produit appliqué à basse pression selon la fiche technique du fabricant, jamais au jugé.</span></li>
            <li><strong>Fabricants français</strong><span>Formules en phase aqueuse, sans solvant chez DALEP. Fiches techniques et de sécurité disponibles sur demande.</span></li>
            <li><strong>Moins de matériel, moins de transport</strong><span>Pas d’échafaudage à acheminer : un chantier plus léger pour la planète.</span></li>
          </ul>
        </div>
      </section>

      {/* 10. Déroulement */}
      <section className="section section--mist" id="methode" aria-labelledby="steps-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Déroulement</span><h2 id="steps-title" className="h-1">Quatre étapes, un seul interlocuteur.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Vous envoyez l’adresse et quelques photos. Nous nous occupons du reste, démarches comprises.</p>
          </div>
          <ol className="steps">
            {[
              ['Étude', 'Photos, vue aérienne ou visite. Nous vérifions matériau, pente, obstacles et espace aérien.', 'Réponse sous 48 h'],
              ['Démarches', 'Déclaration du vol quand elle est exigée, périmètre de sécurité, information du voisinage.', 'À notre charge'],
              ['Intervention', 'Nettoyage de haut en bas, traitement si prévu, contrôle caméra, matériel retiré le jour même.', 'Souvent en une journée'],
              ['Rapport', 'Photos avant / après et conseils d’entretien pour les années suivantes.', 'Par e-mail'],
            ].map(([t, d, tag], k) => (
              <li key={t} className="step" data-reveal style={{ ['--i' as string]: k }}>
                <span className="step-n mono">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="h-3">{t}</h3>
                <p className="muted">{d}</p>
                <span className="step-tag mono">{tag}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 11. Équipe & certifications */}
      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Notre équipe</span><h2 id="team-title" className="h-1">Des télépilotes certifiés, une équipe au sol.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Chaque chantier est mené par un télépilote certifié et un chef de chantier, de l’étude au rapport final.</p>
          </div>
          <ul className="creds">
            {credentials.map((c, k) => (
              <li key={c.k} className="cred" data-reveal style={{ ['--i' as string]: k }}>
                <span className="cred-k">{c.k}</span>
                <strong>{c.title}</strong>
                <p className="muted">{c.text}</p>
              </li>
            ))}
          </ul>
          <div className="cta-row" data-reveal><Link className="link-arrow" href="/equipe/">Rencontrer l’équipe <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      {/* 12. Formulaire express */}
      <section className="section section--mist" id="devis" aria-labelledby="quick-title">
        <div className="container quick-grid">
          <div data-reveal>
            <span className="eyebrow">Étude gratuite</span>
            <h2 id="quick-title" className="h-1">Votre devis en moins d’une minute.</h2>
            <p className="lede">Trois questions, et un membre de l’équipe vous rappelle sous 48 h ouvrées avec une étude de votre bâtiment.</p>
            <ul className="ticks">
              <li>Gratuit et sans engagement</li>
              <li>Étude sur photos ou vue aérienne, sans déplacement</li>
              <li>Démarches de vol prises en charge</li>
              <li>Particuliers comme professionnels</li>
            </ul>
          </div>
          <div data-reveal style={{ ['--i' as string]: 1 }}><Estimator /></div>
        </div>
      </section>

      {/* 13. Villes */}
      <section className="section" id="zone" aria-labelledby="zone-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Zone d’intervention</span><h2 id="zone-title" className="h-1">Basés à Compiègne, nous intervenons dans un rayon de 200 km.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Oise, Hauts-de-France, Île-de-France, Normandie, Champagne : retrouvez votre ville.</p>
          </div>
          <CityLinks />
          <div className="cta-row"><Link className="link-arrow" href="/zones-intervention/">Vérifier ma commune <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      {/* 14. Préparation */}
      <section className="section section--mist" id="preparer" aria-labelledby="prep-title">
        <div className="container prep-grid">
          <div data-reveal>
            <span className="eyebrow">Le jour J</span>
            <h2 id="prep-title" className="h-1">Six choses à préparer avant notre passage.</h2>
            <p className="lede">Rien de compliqué. Cochez au fur et à mesure : la liste reste enregistrée sur cet appareil.</p>
          </div>
          <div data-reveal style={{ ['--i' as string]: 1 }}><PrepChecklist /></div>
        </div>
      </section>

      {/* 15. FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal>
            <span className="eyebrow">Questions fréquentes</span>
            <h2 id="faq-title" className="h-1">Ce que l’on nous demande le plus.</h2>
            <Link className="link-arrow" href="/securite-reglementation/">Sécurité et réglementation <span aria-hidden="true">→</span></Link>
          </div>
          <Faq items={homeFaq} />
        </div>
      </section>

      <CtaBand title="Protégez votre toiture pour les années à venir." text="Trois questions, quelques photos si vous en avez, et nous revenons vers vous sous 48 h ouvrées avec une étude et un devis détaillé." />
    </>
  );
}
