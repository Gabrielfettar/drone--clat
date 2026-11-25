import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Faq, type FaqItem } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { ZoneChecker } from '@/components/widgets/ZoneChecker';
import { site } from '@/config/site';
import { places, haversineKm } from '@/content/places';
import '../pages-a.css';
import { CitiesStrip } from '@/components/sections/Sections';

export const metadata: Metadata = {
  title: 'Zones d’intervention : 200 km autour de Compiègne',
  description: 'Basé à Compiègne, Drone Éclat intervient dans un rayon de 200 km : Oise, Hauts-de-France, Île-de-France, Grand Est, Normandie. Vérifiez votre commune en quelques secondes.',
  alternates: { canonical: '/zones-intervention/' },
};

const CONTACT = '/contact/?service=demoussage-toiture-drone';

/** Distance à vol d'oiseau depuis la base, calculée à partir des repères de src/content/places.ts. */
function kmFromBase(name: string) {
  const p = places.find((x) => x.name === name);
  if (!p) return null;
  return Math.round(haversineKm({ lat: site.base.lat, lon: site.base.lon }, p));
}

/** Secteurs proches de la base (cœur d'activité). */
const sectors = [
  { name: 'Compiégnois', ref: 'Compiègne', towns: 'Compiègne, Margny-lès-Compiègne, Venette, Pierrefonds et alentour', note: 'Notre point de départ. Bâti ancien en brique et pierre, pavillons récents, nombreuses toitures exposées à l’ombre et à l’humidité de la forêt.' },
  { name: 'Noyonnais', ref: 'Noyon', towns: 'Noyon et les communes du nord-est de l’Oise', note: 'Habitat de bourg et bâtiments agricoles de plaine, avec de grands hangars à bardage métallique.' },
  { name: 'Vallée de l’Oise', ref: 'Pont-Sainte-Maxence', towns: 'Pont-Sainte-Maxence, Creil, Nogent-sur-Oise et la vallée', note: 'Secteur urbanisé et humide, zones d’activité et entrepôts le long de la rivière.' },
  { name: 'Valois', ref: 'Crépy-en-Valois', towns: 'Crépy-en-Valois et le sud-est du département', note: 'Longères, corps de ferme et villages en pierre, toitures anciennes à examiner avec soin.' },
  { name: 'Senlis et Chantilly', ref: 'Senlis', towns: 'Senlis, Chantilly et le sud de l’Oise', note: 'Centres anciens et abords de monuments : contraintes patrimoniales et espace aérien à vérifier au cas par cas.' },
  { name: 'Clermontois', ref: 'Clermont', towns: 'Clermont et le plateau picard proche', note: 'Pavillons, bâtiments agricoles et petites zones d’activité.' },
  { name: 'Beauvaisis', ref: 'Beauvais', towns: 'Beauvais et ses environs', note: 'Secteur plus éloigné, au cas par cas. Les abords de l’aéroport de Beauvais-Tillé sont soumis à des restrictions de vol.' },
];

const buildings = [
  { label: 'Pavillons', title: 'Tuile mécanique', text: 'Un cas très fréquent : maisons individuelles souvent couvertes de tuiles mécaniques terre cuite ou béton. Le démoussage par drone y est bien adapté, à condition que les tuiles soient saines.', href: '/services/demoussage-toiture-drone/', link: 'Démoussage de toiture' },
  { label: 'Patrimoine rural', title: 'Longères et maisons anciennes', text: 'Toitures en petites tuiles plates ou en ardoise, murs en pierre ou en brique. Pression basse, essai préalable et, si la couverture est fragile, passage par un couvreur d’abord.', href: '/services/nettoyage-facade-drone/', link: 'Nettoyage de façade' },
  { label: 'Agricole', title: 'Bâtiments agricoles de plaine', text: 'Hangars de stockage, stabulations, silos : grandes surfaces en bac acier, en bardage ou en fibrociment. Repérage amiante exigé sur les plaques anciennes, planning calé sur l’exploitation.', href: '/services/nettoyage-bardage-drone/', link: 'Bardage et hangars' },
  { label: 'Activité', title: 'Zones d’activité', text: 'Entrepôts, ateliers et commerces en panneaux sandwich ou bardage laqué. Intervention par secteurs, sans nacelle sur le parking ni arrêt d’activité.', href: '/professionnels/entretien-batiments/', link: 'Offre professionnels' },
];

const faq: FaqItem[] = [
  { q: 'Pourquoi les toitures se couvrent-elles vite de mousse autour de Compiègne ?', a: 'Plusieurs facteurs se cumulent : la proximité de la forêt de Compiègne et des bois, qui maintiennent ombre et humidité, les vallées de l’Oise et de l’Aisne, souvent brumeuses, et les pans orientés au nord. Ce sont les conditions où mousses et lichens s’installent le plus facilement.' },
  { q: 'Quel délai prévoir pour une intervention dans l’Oise ?', a: 'En zone habitée, chaque vol professionnel doit être notifié à l’avance à la préfecture de l’Oise. Comptez environ deux semaines de délai administratif, auxquelles s’ajoutent la météo et notre planning. Le délai est indiqué dans le devis.' },
  { q: 'Intervenez-vous près de l’aéroport de Beauvais-Tillé ?', a: 'Les abords des aéroports et aérodromes sont soumis à des restrictions de vol. Pour chaque adresse, nous consultons la carte officielle des restrictions : certaines interventions restent possibles avec des démarches supplémentaires, d’autres non.' },
  { q: 'Mon bâtiment est dans un centre ancien ou près d’un monument : est-ce un problème ?', a: 'Pas forcément pour un simple nettoyage, mais les règles locales peuvent varier. Nous vérifions avec vous si une démarche est nécessaire auprès de la mairie avant de programmer l’intervention.' },
  { q: 'Ma ville n’a pas de page dédiée : intervenez-vous quand même ?', a: 'Oui, si elle se trouve dans notre rayon de 200 km autour de Compiègne. Les pages locales présentent les principales villes du secteur ; le vérificateur de code postal vous répond pour toutes les communes.' },
];

export default function ZonesPage() {
  const radius = site.serviceRadiusKm;
  return (
    <div className="pa">
      <PageHero
        crumbs={[{ href: '/zones-intervention/', label: 'Zones d’intervention' }]}
        eyebrow="Hauts-de-France · Île-de-France · Grand Est · Normandie"
        title="200 km autour de Compiègne."
        lede="Drone Éclat est basé à Compiègne, dans l’Oise, et intervient dans un rayon de 200 km : de Lille à Paris, de Rouen à Reims. Vérifiez votre code postal, puis décrivez votre chantier."
      >
        <div className="cta-row">
          <Link className="btn" href="#verifier" data-track="zones_hero_check">Vérifier ma commune <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link className="btn btn--ghost" href={CONTACT}>Demander une étude</Link>
        </div>
      </PageHero>

      {/* Définition + vérificateur */}
      <section className="section" id="verifier" aria-labelledby="check-title">
        <div className="container pa-stack">
          <p className="answer" data-reveal>
            <span className="mono">En bref</span>
            Drone Éclat intervient depuis Compiègne dans un rayon de {radius.value} km, pour les particuliers comme pour les professionnels. La faisabilité de chaque chantier est confirmée lors de l’étude, selon l’adresse, l’espace aérien et la taille du bâtiment.
          </p>
          <div className="pa-block">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <div data-reveal><span className="eyebrow">Vérification</span><h2 id="check-title" className="h-1">Votre commune est-elle dans notre secteur ?</h2></div>
              <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Saisissez votre code postal : la distance est calculée à vol d’oiseau depuis Compiègne, à partir des données officielles des communes.</p>
            </div>
            <ZoneChecker />
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="section section--mist" aria-labelledby="sectors-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Autour de notre base</span><h2 id="sectors-title" className="h-1">Notre cœur de secteur, dans l’Oise.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Les communes les plus proches de Compiègne, où nos délais d’intervention sont les plus courts.</p>
          </div>
          <div className="cards">
            {sectors.map((s, k) => {
              const km = kmFromBase(s.ref);
              return (
                <article key={s.name} className="card" data-reveal style={{ ['--i' as string]: k % 4 }}>
                  <div className="pa-card-head">
                    <span className="mono">{km === 0 ? 'Base' : km ? `≈ ${km} km` : 'Secteur'}</span>
                  </div>
                  <h3 className="h-3">{s.name}</h3>
                  <p className="pa-towns">{s.towns}</p>
                  <p className="muted">{s.note}</p>
                </article>
              );
            })}
          </div>
          <p className="hint muted cmp-note" data-reveal>Distances à vol d’oiseau depuis le centre de Compiègne, données à titre indicatif. </p>
        </div>
      </section>

      <CitiesStrip />

      {/* Bâti local */}
      <section className="section" aria-labelledby="bati-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Le bâti de l’Oise</span><h2 id="bati-title" className="h-1">Des toitures et des façades que nous connaissons.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Chaque type de bâtiment a ses matériaux et ses précautions. Voici ceux que l’on rencontre le plus souvent dans le département.</p>
          </div>
          <div className="cards">
            {buildings.map((b, k) => (
              <article key={b.title} className="card" data-reveal style={{ ['--i' as string]: k }}>
                <span className="mono">{b.label}</span>
                <h3 className="h-3">{b.title}</h3>
                <p className="muted">{b.text}</p>
                <Link className="link-arrow" href={b.href}>{b.link} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contexte local */}
      <section className="section section--ink" aria-labelledby="local-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Contexte local</span><h2 id="local-title" className="h-1">Forêt, rivières, plaine : ce qui salit les bâtiments ici.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>L’environnement explique en grande partie la vitesse à laquelle une toiture se couvre de mousse ou une façade verdit.</p>
          </div>
          <ul className="pa-pillars">
            <li data-reveal>
              <span className="mono">Forêt de Compiègne</span>
              <h3 className="h-3">Ombre et humidité</h3>
              <p className="muted">Les maisons en lisière de forêt ou sous de grands arbres sèchent lentement. Mousses et lichens s’y installent plus vite, surtout sur les pans orientés au nord.</p>
            </li>
            <li data-reveal style={{ ['--i' as string]: 1 }}>
              <span className="mono">Vallées de l’Oise et de l’Aisne</span>
              <h3 className="h-3">Brumes et verdissement</h3>
              <p className="muted">Près des cours d’eau, l’humidité ambiante favorise les algues sur les façades peu ensoleillées et les dépôts sur les bardages.</p>
            </li>
            <li data-reveal style={{ ['--i' as string]: 2 }}>
              <span className="mono">Plaines agricoles</span>
              <h3 className="h-3">Poussières et grandes surfaces</h3>
              <p className="muted">Les bâtiments isolés en plaine reçoivent poussières et dépôts, et leurs dimensions rendent la nacelle coûteuse à mobiliser.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--mist" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal>
            <span className="eyebrow">Questions locales</span>
            <h2 id="faq-title" className="h-1">Intervenir dans l’Oise.</h2>
            <Link className="link-arrow" href="/securite-reglementation/">Démarches et réglementation <span aria-hidden="true">→</span></Link>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      {/* Maillage */}
      <section className="section pa-related" aria-labelledby="more-title">
        <div className="container pa-block">
          <h2 id="more-title" className="h-2" data-reveal>Nos prestations dans l’Oise</h2>
          <div className="cards">
            <Link href="/services/demoussage-toiture-drone/" className="card" data-reveal><span className="mono">Toiture</span><h3 className="h-3">Démoussage de toiture</h3><p className="muted">Sans échafaudage ni passage sur les tuiles.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
            <Link href="/services/nettoyage-facade-drone/" className="card" data-reveal style={{ ['--i' as string]: 1 }}><span className="mono">Façade</span><h3 className="h-3">Nettoyage de façade</h3><p className="muted">Coulures, verdissement, pollution : pression adaptée.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
            <Link href="/services/nettoyage-bardage-drone/" className="card" data-reveal style={{ ['--i' as string]: 2 }}><span className="mono">Bardage</span><h3 className="h-3">Hangars et bardages</h3><p className="muted">Grandes surfaces sans nacelle ni arrêt d’activité.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
            <Link href="/realisations/" className="card" data-reveal style={{ ['--i' as string]: 3 }}><span className="mono">Preuves</span><h3 className="h-3">Réalisations</h3><p className="muted">Nos chantiers de l’Oise, publiés avec l’accord des clients.</p><span className="link-arrow">Voir <span aria-hidden="true">→</span></span></Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Un chantier dans l’Oise ?"
        text="Indiquez votre commune et joignez quelques photos : nous confirmons la faisabilité et revenons vers vous sous 48 h ouvrées avec une étude et un devis."
        cta="Demander une étude gratuite"
        href={CONTACT}
        secondary={{ href: '/technologie/', label: 'Notre méthode' }}
      />
    </div>
  );
}
