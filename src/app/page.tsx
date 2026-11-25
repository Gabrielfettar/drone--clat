import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { HeroStage } from '@/components/hero/HeroStage';
import { BeforeAfter } from '@/components/widgets/BeforeAfter';
import { Faq } from '@/components/ui/Faq';
import { Icon } from '@/components/ui/Icon';
import { SuppliersStrip } from '@/components/sections/Sections';
import { Rotator, Marquee, CountUp, ScrollSteps, NeglectSlider, Rail, ScrollHint } from '@/components/sections/Motion';
import { homeFaq } from '@/content/faq';
import { neglect } from '@/content/benefits';
import { photo } from '@/content/stock';
import { cities } from '@/content/cities';
import { team } from '@/content/team';

export const metadata: Metadata = {
  title: { absolute: 'Drone Éclat · Démoussage et nettoyage de toiture par drone' },
  description: 'Démoussage de toiture, nettoyage de façade et de bardage par drone. Zéro tuile cassée, zéro échafaudage. Particuliers, pros et monuments, 200 km autour de Compiègne. Étude gratuite sous 48 h.',
  alternates: { canonical: '/' },
};

const SLOGANS = ['Zéro tuile cassée', 'Zéro échafaudage', 'On ne monte plus sur votre toit', 'Propre vu d’en haut', 'Du pavillon à la cathédrale', 'Un toit neuf sans le refaire', 'Étude gratuite en 48 h'];

const gains = [
  { icon: 'tile' as const, big: 'Zéro', t: 'tuile cassée', d: 'Personne ne marche sur votre toit.' },
  { icon: 'euro' as const, big: 'Zéro', t: 'échafaudage', d: 'Vous payez le nettoyage, pas l’accès.' },
  { icon: 'calendar' as const, big: 'Des années', t: 'de tranquillité', d: 'Nettoyé, traité, oublié.' },
  { icon: 'shield' as const, big: 'Plus longtemps', t: 'votre toiture dure', d: 'La mousse ne fait plus éclater les tuiles.' },
  { icon: 'clock' as const, big: '1 jour', t: 'en général', d: 'Votre rue libérée le soir même.' },
  { icon: 'home' as const, big: '+ de valeur', t: 'pour votre bien', d: 'La première impression change tout.' },
];

const segments = [
  { k: 'e_drone_toiture_commons', t: 'Maisons', d: 'Pavillons, longères, villas' },
  { k: 'd_bardage_propre', t: 'Copropriétés & bureaux', d: 'Façades, bardages, toits plats' },
  { k: 'f_toit_industriel', t: 'Industrie & logistique', d: 'Des milliers de m², activité maintenue' },
  { k: 'g_chateau_normandie', t: 'Châteaux & patrimoine', d: 'Méthode validée avec l’architecte' },
  { k: 'g_versailles_toit', t: 'Monuments historiques', d: 'Là où l’échafaudage coûte une fortune' },
];

export default function Home() {
  const before = photo('a_toit_moussu_1'), after = photo('b_toit_propre_tuiles');
  const drone = photo('e_drone_toiture_commons'), facade = photo('d_bardage_propre');
  const steps = [
    { k: '01', title: 'Vos photos.', text: 'Trois questions, quelques photos. Étude gratuite sous 48 h.', img: before ? `/illustrations/libres/${before.file}` : '/illustrations/roof-before.webp', alt: 'Toiture moussue avant étude' },
    { k: '02', title: 'Le drone décolle.', text: 'Démarches de vol à notre charge. Personne sur le toit.', img: drone ? `/illustrations/libres/${drone.file}` : '/illustrations/drone.webp', alt: 'Drone de nettoyage en action sur une toiture' },
    { k: '03', title: 'L’éclat.', text: 'Toit propre, traité, rapport photo. En général en un jour.', img: after ? `/illustrations/libres/${after.file}` : '/illustrations/roof-after.webp', alt: 'Toiture propre après nettoyage' },
  ];

  return (
    <>
      {/* 1. Hero 3D */}
      <section className="hero hero--wow" aria-labelledby="hero-title">
        <HeroStage />
        <div className="container hero-content">
          <p className="eyebrow hero-in" style={{ ['--d' as string]: '0ms' }}>Nettoyage par drone · Particuliers & pros</p>
          <h1 id="hero-title" className="h-mega hero-title">
            <span className="hero-in" style={{ ['--d' as string]: '80ms' }}>Un toit neuf.</span>
            <span className="hero-in accent" style={{ ['--d' as string]: '180ms' }}>Sans le refaire.</span>
          </h1>
          <p className="hero-sub hero-in" style={{ ['--d' as string]: '280ms' }}>
            Démoussage et nettoyage de votre <Rotator words={['toiture', 'façade', 'bardage', 'copropriété', 'église', 'entrepôt']} /> par drone.
          </p>
          <div className="cta-row hero-in" style={{ ['--d' as string]: '380ms' }}>
            <Link href="/contact/" className="btn btn--lg" data-track="cta_hero">Mon étude gratuite <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link href="/professionnels/entretien-batiments/" className="btn btn--ghost btn--lg">Je suis un pro</Link>
          </div>
        </div>
        <ScrollHint label="Scrollez : le drone accélère" />
      </section>

      <Marquee items={SLOGANS} />

      {/* 2. Avant / après plein écran */}
      <section className="section wow-ba" id="suite" aria-labelledby="ba-title">
        <div className="container">
          <div className="wow-head" data-reveal>
            <h2 id="ba-title" className="h-mega-2">Glissez.<br /><span className="accent">Ça brille.</span></h2>
          </div>
          <div className="wow-ba-frame" data-reveal>
            <BeforeAfter before="/illustrations/house-before.webp" after="/illustrations/house-after.webp"
              alt={{ before: 'Maison dont la toiture en tuiles est couverte de mousse', after: 'La même maison, toiture en tuiles nettoyée' }}
              illustration caption="La même maison, avant et après démoussage." />
          </div>
        </div>
      </section>

      {/* 3. Gains en tuiles */}
      <section className="section section--ink gains-wow" aria-labelledby="gains-title">
        <div className="container">
          <h2 id="gains-title" className="h-mega-2 wow-center" data-reveal>Ce que vous y <span className="accent">gagnez.</span></h2>
          <ul className="gw-grid">
            {gains.map((g, k) => (
              <li key={g.t} className="gw" data-reveal style={{ ['--i' as string]: k % 3 }}>
                <Icon name={g.icon} size={30} />
                <strong className="gw-big">{g.big}</strong>
                <span className="gw-t">{g.t}</span>
                <p>{g.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Méthode en récit au scroll */}
      <section className="section" id="methode" aria-labelledby="story-title">
        <div className="container">
          <h2 id="story-title" className="h-mega-2" data-reveal>Trois étapes.<br /><span className="accent">Zéro souci.</span></h2>
          <ScrollSteps steps={steps} />
        </div>
      </section>

      {/* 5. Widget : et si on ne fait rien ? */}
      <section className="section section--mist" aria-labelledby="neg-title">
          <div className="container">
            <div className="wow-head wow-head--split" data-reveal>
              <h2 id="neg-title" className="h-mega-2">La mousse ne dort <span className="accent">jamais.</span></h2>
              <p className="lede">Faites avancer le temps.</p>
            </div>
            <NeglectSlider clean="/illustrations/house-after.webp" dirty="/illustrations/house-before.webp" stages={neglect} />
            <p className="hint muted neg-credit">Illustration 3D.</p>
            <div className="cta-row wow-center-row"><Link className="btn" href="/contact/?service=demoussage-toiture-drone" data-track="cta_neglect">J’agis avant l’hiver <span className="btn-arrow" aria-hidden="true">→</span></Link></div>
          </div>
        </section>

      {/* 6. Du pavillon à la cathédrale */}
      <section className="section section--ink seg-wow" aria-labelledby="seg-title">
        <div className="container">
          <div className="wow-head wow-head--split" data-reveal>
            <h2 id="seg-title" className="h-mega-2">Du pavillon<br /><span className="accent">à la cathédrale.</span></h2>
            <p className="lede">Aucun chantier trop haut. Aucun trop grand.</p>
          </div>
        </div>
        <Rail label="Types de bâtiments">
          {segments.map((s) => {
            const p = photo(s.k);
            return (
              <Link key={s.t} href={s.k.startsWith('e_') ? '/services/demoussage-toiture-drone/' : '/professionnels/entretien-batiments/'} className="seg-card">
                {p && <Image src={`/illustrations/libres/${p.file}`} alt={p.caption} fill sizes="(max-width: 700px) 80vw, 30vw" />}
                <span className="seg-txt"><strong>{s.t}</strong><span>{s.d}</span></span>
              </Link>
            );
          })}
        </Rail>
        <div className="container cta-row">
          <Link className="btn" href="/professionnels/entretien-batiments/" data-track="cta_pros">Offre pros & patrimoine <span className="btn-arrow" aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* 7. Chiffres */}
      <section className="section section--tight stats-wow" aria-label="Drone Éclat en chiffres">
        <div className="container stats-grid">
          <div data-reveal><strong className="stat-big"><CountUp to={200} suffix=" km" /></strong><span>autour de Compiègne</span></div>
          <div data-reveal style={{ ['--i' as string]: 1 }}><strong className="stat-big"><CountUp to={cities.length} /></strong><span>grandes villes desservies</span></div>
          <div data-reveal style={{ ['--i' as string]: 2 }}><strong className="stat-big"><CountUp to={48} suffix=" h" /></strong><span>pour votre étude</span></div>
          <div data-reveal style={{ ['--i' as string]: 3 }}><strong className="stat-big"><CountUp to={0} /></strong><span>pied sur votre toit</span></div>
        </div>
      </section>

      {/* 8. Logos fournisseurs */}
      <SuppliersStrip />

      {/* 9. Équipe, en une ligne */}
      <section className="section section--tight team-wow" aria-labelledby="team-title">
        <div className="container team-wow-inner">
          <h2 id="team-title" className="h-2" data-reveal>Des pilotes <span className="accent">certifiés CATS.</span> Une équipe au sol.</h2>
          <ul className="team-chips" data-reveal style={{ ['--i' as string]: 1 }}>
            {team.map((m) => <li key={m.slug}><Icon name="users" size={18} />{m.role}</li>)}
          </ul>
          <Link className="link-arrow" href="/a-propos/#equipe">L’équipe <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* 10. Villes */}
      <section className="section cities-wow" aria-labelledby="cities-title">
        <div className="container">
          <div className="wow-head wow-head--split" data-reveal>
            <h2 id="cities-title" className="h-mega-2">Près de <span className="accent">chez vous.</span></h2>
            <p className="lede">{cities.length} villes, 200 km autour de Compiègne.</p>
          </div>
        </div>
        <Rail label="Villes desservies">
          {cities.map((c) => {
            const p = c.photos[0];
            return (
              <Link key={c.slug} href={`/villes/${c.slug}/`} className="city-card">
                {p && <Image src={`/villes/${p.file}`} alt={p.caption} fill sizes="(max-width: 700px) 70vw, 22vw" />}
                <span className="city-card-txt"><strong>{c.name}</strong><span className="mono">{c.departmentCode} · {c.distanceKm === 0 ? 'notre base' : `${c.distanceKm} km`}</span></span>
              </Link>
            );
          })}
        </Rail>
      </section>

      {/* 11. FAQ courte */}
      <section className="section section--mist" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <h2 id="faq-title" className="h-mega-2" data-reveal>Des <span className="accent">questions ?</span></h2>
          <Faq items={homeFaq.slice(0, 5)} />
        </div>
      </section>

      {/* 12. CTA final */}
      <section className="final-wow" aria-labelledby="final-title">
        {facade && <Image src={`/illustrations/libres/${facade.file}`} alt="" fill sizes="100vw" className="final-bg" />}
        <div className="container final-inner">
          <h2 id="final-title" className="h-mega">Votre toit mérite <span className="accent">l’éclat.</span></h2>
          <div className="cta-row">
            <Link className="btn btn--lg" href="/contact/" data-track="cta_final">Étude gratuite en 1 minute <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </div>
          <p className="final-fine">Gratuit · Sans engagement · Réponse sous 48 h · <Link href="/aides-tva/">TVA à 10 % possible sur l’entretien d’un logement</Link></p>
        </div>
      </section>
    </>
  );
}
