import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Faq, type FaqItem } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { Icon } from '@/components/ui/Icon';
import { TrustBand } from '@/components/sections/Conversion';
import { sectors } from '@/content/oise';
import { cities } from '@/content/cities';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Démoussage de toiture par drone dans l’Oise (60)',
  description: 'Démoussage et nettoyage de toiture par drone dans l’Oise : Compiègne, Creil, Senlis, Chantilly, Noyon, Crépy-en-Valois, Beauvais. Sans échafaudage. Devis gratuit sous 48 h.',
  alternates: { canonical: '/oise/' },
  openGraph: { url: '/oise/', images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Drone Éclat : un drone nettoie une toiture en tuiles' }] },
};

const CONTACT = '/contact/?service=demoussage-toiture-drone';

const faq: FaqItem[] = [
  { q: 'Intervenez-vous dans tout le département de l’Oise ?', a: 'Oui. Nous sommes installés à Compiègne et l’Oise est notre secteur principal : Compiégnois, Noyonnais, vallée de l’Oise, Valois, Senlis et Chantilly, Clermontois et Beauvaisis. Indiquez votre code postal dans la demande, nous confirmons la faisabilité avec l’étude.' },
  { q: 'Pourquoi les toitures de l’Oise se couvrent-elles vite de mousse ?', a: 'Le département est boisé et humide : forêts de Compiègne, d’Halatte et de Chantilly, vallée de l’Oise. Les pans de toit à l’ombre ou orientés au nord sèchent mal, et la mousse s’y installe. Un nettoyage régulier évite qu’elle retienne l’eau contre la tuile.' },
  { q: 'Peut-on faire voler un drone partout dans l’Oise ?', a: 'Non. Les abords de l’aéroport de Beauvais-Tillé, de l’aérodrome de Compiègne-Margny, de certains sites sensibles et des monuments protégés sont soumis à des restrictions. Nous vérifions chaque adresse sur la carte officielle avant de vous confirmer l’intervention, et nous prenons les démarches en charge.' },
  { q: 'Combien coûte un démoussage de toiture par drone dans l’Oise ?', a: 'Le prix dépend de la surface, du matériau, de la pente, de l’état de la couverture et de l’accès. Nous ne publions pas de prix automatique : vous recevez un devis gratuit et détaillé sous 48 h ouvrées, établi à partir de vos photos.' },
];

export default function OisePage() {
  const local = cities.filter((c) => c.departmentCode === '60');
  return (
    <>
      <PageHero crumbs={[{ href: '/zones-intervention/', label: 'Zones' }, { href: '/oise/', label: 'Oise' }]} eyebrow="Oise (60) · Hauts-de-France"
        title="Démoussage de toiture par drone dans l’Oise."
        lede="Installés à Compiègne, nous nettoyons toitures, façades et bardages dans tout le département, sans échafaudage et sans personne sur votre toit.">
        <div className="cta-row">
          <Link className="btn btn--pulse" href={CONTACT} data-track="cta_oise_hero">Mon devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link className="btn btn--ghost" href="/zones-intervention/">Vérifier ma commune</Link>
        </div>
      </PageHero>

      <TrustBand />

      <section className="section" aria-labelledby="oise-sectors">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Nos secteurs</span><h2 id="oise-sectors" className="h-1">De Compiègne à Beauvais, de Noyon à Chantilly.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>L’Oise est notre terrain de tous les jours : des déplacements courts, une bonne connaissance du bâti local et des contraintes de vol de chaque secteur.</p>
          </div>
          <ul className="bgrid" style={{ marginTop: 0 }}>
            {sectors.map((s, k) => (
              <li key={s.name} data-reveal style={{ ['--i' as string]: k % 4 }}>
                <Icon name="map" />
                <strong>{s.name}</strong>
                <p className="muted">{s.towns}. {s.note}</p>
              </li>
            ))}
          </ul>
          {!!local.length && (
            <>
              <p className="mono muted" style={{ marginTop: 'var(--s-6)' }}>Pages locales</p>
              <ul className="town-chips" data-reveal>
                {local.map((c) => <li key={c.slug}><Link href={`/villes/${c.slug}/`}>Démoussage de toiture à {c.name}</Link></li>)}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="oise-svc">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Prestations</span><h2 id="oise-svc" className="h-1">Ce que nous faisons dans l’Oise.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Tuile plate ou mécanique, ardoise, bac acier des bâtiments d’activité, façades enduites ou en pierre : la pression et la méthode sont réglées selon le matériau.</p>
          </div>
          <ul className="bgrid" style={{ marginTop: 0 }}>
            {services.map((s, k) => (
              <li key={s.slug} data-reveal style={{ ['--i' as string]: k }}>
                <Icon name={k === 0 ? 'tile' : k === 1 ? 'building' : 'warehouse'} />
                <strong>{s.name}</strong>
                <p className="muted">{s.summary}</p>
                <Link className="link-arrow" href={`/services/${s.slug}/`}>En savoir plus <span aria-hidden="true">→</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="oise-faq">
        <div className="container faq-grid">
          <div><span className="eyebrow">Questions fréquentes</span><h2 id="oise-faq" className="h-1">Le drone dans l’Oise, en pratique.</h2></div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title="Un toit à nettoyer dans l’Oise ?" text="Trois questions, quelques photos si vous en avez : vous recevez un devis gratuit et détaillé sous 48 h ouvrées." href={CONTACT} secondary={{ href: '/villes/compiegne/', label: 'Notre base : Compiègne' }} />
    </>
  );
}
