import Link from 'next/link';
import type { Metadata } from 'next';
import { HeroStage } from '@/components/hero/HeroStage';
import { ServiceSelector } from '@/components/widgets/ServiceSelector';
import { BeforeAfter } from '@/components/widgets/BeforeAfter';
import { ZoneChecker } from '@/components/widgets/ZoneChecker';
import { PrepChecklist } from '@/components/widgets/PrepChecklist';
import { Faq } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { services } from '@/content/services';
import { homeFaq } from '@/content/faq';
import { projects } from '@/content/projects';
import { Icon } from '@/components/ui/Icon';
import { Situations } from '@/components/sections/Situations';
import { Benefits, AidesTeaser, ProsShowcase, TeamBlock, SuppliersStrip, CitiesStrip } from '@/components/sections/Sections';

export const metadata: Metadata = {
  title: { absolute: 'Drone Éclat · Démoussage et nettoyage de toiture par drone, Oise' },
  description: 'Démoussage de toiture, nettoyage de façade et de bardage par drone, sans échafaudage ni passage sur le toit. Étude gratuite sur photos. Basé à Compiègne (Oise).',
  alternates: { canonical: '/' },
};

const compare = [
  ['Installation', 'Unité au sol et balisage, environ 30 minutes', 'Échafaudage ou nacelle, d’une demi-journée à plusieurs jours'],
  ['Passage sur la toiture', 'Aucun', 'Oui, avec un risque de casse des tuiles'],
  ['Sécurité', 'Télépilote au sol, périmètre balisé', 'Travail en hauteur, risque de chute'],
  ['Voirie et voisinage', 'Zone balisée le temps du vol', 'Emprise au sol, parfois autorisation de voirie'],
  ['Réparation de couverture', 'Non : nous orientons vers un couvreur', 'Oui, pour un couvreur'],
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <HeroStage />
        <div className="container hero-content">
          <p className="eyebrow hero-in" style={{ ['--d' as string]: '0ms' }}>Entretien de bâtiments par drone · Oise</p>
          <h1 id="hero-title" className="h-display hero-title">
            <span className="hero-in" style={{ ['--d' as string]: '80ms' }}>On ne monte plus</span>{' '}
            <span className="hero-in accent" style={{ ['--d' as string]: '160ms' }}>sur votre toit.</span>
          </h1>
          <p className="lede hero-in" style={{ ['--d' as string]: '260ms' }}>
            Drone Éclat démousse et nettoie toitures, façades et bardages avec un drone relié au sol. Pas d’échafaudage, pas de tuile piétinée, et une étude gratuite à partir de vos photos.
          </p>
          <div className="cta-row hero-in" style={{ ['--d' as string]: '360ms' }}>
            <Link href="/contact/" className="btn" data-track="cta_hero">Demander une étude gratuite <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link href="#benefices" className="btn btn--ghost">Ce que vous y gagnez</Link>
          </div>
          <ul className="hero-proof hero-in" style={{ ['--d' as string]: '440ms' }}>
            <li><Icon name="check" size={16} />Étude et devis gratuits sous 48 h</li>
            <li><Icon name="check" size={16} />Aucun pied sur votre toit</li>
            <li><Icon name="check" size={16} />TVA à 10 % possible</li>
          </ul>
        </div>
      </section>

      {/* 2. Bénéfices clients */}
      <Benefits />

      <AidesTeaser />

      {/* 4. Prestations */}
      <section className="section section--mist" id="prestations" aria-labelledby="svc-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Prestations</span><h2 id="svc-title" className="h-1">Trois métiers, une même méthode.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Chaque surface a sa pression, sa buse et ses précautions. Choisissez la vôtre.</p>
          </div>
          <ServiceSelector services={services} />
        </div>
      </section>

      {/* 5. Démonstration technologique */}
      <section className="section tech" aria-labelledby="tech-title">
        <div className="container tech-grid">
          <div className="tech-copy" data-reveal>
            <span className="eyebrow">La méthode, en détail</span>
            <h2 id="tech-title" className="h-1">De haut en bas, bande par bande.</h2>
            <p className="lede">Le drone rince la toiture en passes horizontales qui se chevauchent, en partant du faîtage. L’eau entraîne les salissures vers les zones pas encore traitées : rien ne se redépose sur ce qui est propre.</p>
            <dl className="specs">
              <div><dt>Alimentation</dt><dd>Eau par tuyau depuis le sol</dd></div>
              <div><dt>Pression</dt><dd>Réglée selon le matériau</dd></div>
              <div><dt>Contrôle</dt><dd>Caméra embarquée, retour vidéo au sol</dd></div>
              <div><dt>Sécurité</dt><dd>Périmètre balisé, télépilote à vue</dd></div>
            </dl>
            <Link href="/technologie/" className="link-arrow">Notre matériel et ses limites <span aria-hidden="true">→</span></Link>
          </div>
          <div data-reveal style={{ ['--i' as string]: 1 }}>
            <BeforeAfter before="/illustrations/roof-before.webp" after="/illustrations/roof-after.webp" illustration
              alt={{ before: 'Illustration 3D d’une toiture en tuiles couverte de mousse', after: 'La même toiture après rinçage par drone' }}
              caption="Glissez pour comparer. Les photos de nos premiers chantiers remplaceront cette illustration." />
          </div>
        </div>
      </section>

      {/* 6. Comparaison + 7. Avantages */}
      <section className="section section--mist" aria-labelledby="cmp-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Comparatif</span><h2 id="cmp-title" className="h-1">Drone ou échafaudage ?</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Pour l’entretien d’une couverture saine, le drone fait le travail plus vite et sans exposer personne. Pour une réparation, le couvreur reste indispensable.</p>
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

      {/* 8. Déroulement */}
      <section className="section" id="methode" aria-labelledby="steps-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Déroulement</span><h2 id="steps-title" className="h-1">Quatre étapes, un seul interlocuteur.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Vous envoyez l’adresse et quelques photos. Nous nous occupons du reste, démarches comprises.</p>
          </div>
          <ol className="steps">
            {[
              ['Étude', 'Photos, vue aérienne ou visite. Nous vérifions matériau, pente, obstacles et espace aérien.', 'Réponse sous 48 h'],
              ['Démarches', 'Notification du vol quand elle est exigée, périmètre de sécurité, information du voisinage.', 'À notre charge'],
              ['Intervention', 'Rinçage de haut en bas, contrôle caméra, matériel retiré le jour même.', 'Souvent en une journée'],
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

      {/* 9. Professionnels, patrimoine */}
      <ProsShowcase />

      <Situations limit={2} />

      {/* 11. Réalisations + 14. Témoignages */}
      <section className="section" aria-labelledby="real-title">
        <div className="container real-grid">
          <div data-reveal>
            <span className="eyebrow">Réalisations</span>
            <h2 id="real-title" className="h-1">Nos premiers chantiers arrivent.</h2>
          </div>
          <div className="real-side" data-reveal style={{ ['--i' as string]: 1 }}>
            {projects.length === 0 ? (
              <>
                <p className="lede">Drone Éclat démarre. Plutôt que d’afficher des photos qui ne sont pas les nôtres ou des avis inventés, nous publierons ici chaque chantier, avec photos avant / après et l’accord du client.</p>
                <p className="muted">Vous voulez faire partie des premiers ? Votre chantier sera documenté avec soin, et votre avis publié tel quel.</p>
              </>
            ) : <p className="lede">Chaque fiche présente le bâtiment, le constat, la méthode et le résultat.</p>}
            <div className="cta-row">
              <Link className="btn btn--ghost" href="/realisations/">Voir la galerie</Link>
              <Link className="link-arrow" href="/contact/">Devenir l’un de nos premiers clients <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <SuppliersStrip />

      <TeamBlock />

      {/* 12. Matériel */}
      <section className="section section--mist" aria-labelledby="gear-title">
        <div className="container gear">
          <div data-reveal>
            <span className="eyebrow">Matériel</span>
            <h2 id="gear-title" className="h-1">Un drone conçu pour le travail, pas pour la photo.</h2>
            <p className="lede">Drone de nettoyage relié au sol, lance orientable, unité de pompage et équipements de balisage. Le modèle exact et ses caractéristiques seront détaillés à la mise en service de notre flotte.</p>
          </div>
          <ul className="gear-list" data-reveal style={{ ['--i' as string]: 1 }}>
            <li><span className="mono">01</span><div><strong>Drone captif</strong><p className="muted">Alimenté en eau par un tuyau depuis le sol : pas de réservoir à remplir en vol, un travail continu.</p></div></li>
            <li><span className="mono">02</span><div><strong>Unité au sol</strong><p className="muted">Pompe et réglage de pression, au pied du bâtiment, sous le contrôle de l’équipe.</p></div></li>
            <li><span className="mono">03</span><div><strong>Caméra de contrôle</strong><p className="muted">Retour vidéo pour vérifier chaque passe et produire le rapport photo.</p></div></li>
            <li><span className="mono">04</span><div><strong>Balisage</strong><p className="muted">Périmètre de sécurité au sol pendant toute la durée du vol.</p></div></li>
          </ul>
        </div>
      </section>

      {/* 13. Zone */}
      <section className="section" id="zone" aria-labelledby="zone-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Zone d’intervention</span><h2 id="zone-title" className="h-1">Basés à Compiègne, présents dans tout le Nord de la France.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Nous intervenons dans un rayon de 200 km autour de Compiègne. Vérifiez votre commune en quelques secondes.</p>
          </div>
          <ZoneChecker />
        </div>
      </section>

      <CitiesStrip />

      {/* Préparation d'intervention */}
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

      {/* 16. CTA final */}
      <CtaBand title="Votre étude gratuite en 1 minute." text="Trois étapes, quelques photos si vous en avez, et nous revenons vers vous sous 48 h ouvrées avec une étude et un devis détaillé." cta="Recevoir mon étude gratuite" secondary={{ href: '/contact/?batiment=pro', label: 'Demande professionnelle' }} />
    </>
  );
}
