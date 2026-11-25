import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import '../../pages-b.css';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { CityLinks } from '@/components/ui/CityLinks';
import { JsonLd } from '@/components/ui/JsonLd';
import { Faq } from '@/components/ui/Faq';
import { Estimator } from '@/components/widgets/Estimator';
import { cities, cityBySlug, type City } from '@/content/cities';
import { benefits, audiences } from '@/content/benefits';
import { services } from '@/content/services';
import { site, absoluteUrl } from '@/config/site';

export const dynamicParams = false;
export function generateStaticParams() { return cities.map((c) => ({ slug: c.slug })); }

const fmt = (n: number) => n.toLocaleString('fr-FR');

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = cityBySlug((await params).slug);
  if (!c) return {};
  const title = `Démoussage et nettoyage de toiture par drone à ${c.name}`;
  return {
    title: { absolute: `${title} · Drone Éclat` },
    description: `Démoussage de toiture, nettoyage de façade et de bardage par drone à ${c.name} (${c.departmentCode}) : aucune tuile cassée, pas d’échafaudage. Particuliers et professionnels. Étude gratuite sous 48 h.`,
    alternates: { canonical: `/villes/${c.slug}/` },
    openGraph: c.images[0] ? { images: [{ url: c.images[0].src, alt: c.images[0].alt }] } : undefined,
  };
}

function faqFor(c: City) {
  return [
    { q: `Intervenez-vous vraiment à ${c.name} ?`, a: c.isHome
      ? `Oui : ${c.name} est notre base. Nous y intervenons toute l’année, pour les particuliers comme pour les professionnels.`
      : `Oui. ${c.name} se trouve à environ ${c.distanceKm} km de notre base de Compiègne. Nous y intervenons pour les particuliers et les professionnels, en regroupant les chantiers d’un même secteur pour limiter les déplacements.` },
    { q: `Combien coûte un démoussage de toiture à ${c.name} ?`, a: 'Le prix dépend de la surface, du matériau, de la pente, de l’état de la couverture et de l’accès. Nous établissons un devis précis et gratuit à partir de vos photos ou d’une vue aérienne, sous 48 h ouvrées.' },
    { q: 'Faut-il une autorisation pour faire voler un drone au-dessus de ma maison ?', a: `Les démarches de vol sont à notre charge : nous vérifions l’espace aérien à ${c.name} (zones urbaines, aéroports, sites protégés) et déposons les déclarations nécessaires avant l’intervention.` },
    { q: 'Intervenez-vous sur les grands bâtiments et monuments ?', a: `Oui : copropriétés, entrepôts, bâtiments publics et édifices patrimoniaux. Pour un monument protégé, la méthode et les produits sont définis avec l’architecte en charge de l’édifice.` },
  ];
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = cityBySlug((await params).slug);
  if (!c) notFound();
  const hero = c.images[0];
  const faq = faqFor(c);

  return (
    <>
      <section className="city-hero" aria-labelledby="city-title">
        {hero && <div className="city-hero-img"><Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" /></div>}
        <div className="container city-hero-content">
          <Breadcrumbs items={[{ href: '/zones-intervention/', label: 'Villes' }, { href: `/villes/${c.slug}/`, label: c.name }]} />
          <span className="eyebrow">{c.department} ({c.departmentCode}) · {c.region}</span>
          <h1 id="city-title" className="h-display">Nettoyage de toiture par drone à {c.name}.</h1>
          <p className="lede">Démoussage, nettoyage et traitement de toitures, façades et bardages à {c.name} et ses environs. Aucune tuile cassée, pas d’échafaudage, une toiture protégée pour des années.</p>
          <div className="cta-row">
            <Link className="btn btn--lg" href={`/contact/?ville=${encodeURIComponent(c.name)}`} data-track="cta_city_hero">Étude gratuite à {c.name} <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn--light" href="#devis">Devis en 1 minute</Link>
          </div>
          <ul className="city-facts">
            <li>{c.isHome ? 'Notre base' : `${c.distanceKm} km de Compiègne`}</li>
            <li>{fmt(c.population)} habitants ({c.populationYear})</li>
            <li>Particuliers · Copropriétés · Entreprises · Patrimoine</li>
          </ul>
        </div>
        {hero && <p className="credit">Photo : {hero.alt.split(' : ')[0]} · {hero.credit.author} · {hero.credit.license}</p>}
      </section>

      <section className="section" aria-labelledby="local-title">
        <div className="container pb-split city-intro">
          <div className="pb-stack" data-reveal>
            <span className="eyebrow">À {c.name}</span>
            <h2 id="local-title" className="h-1">Votre toiture mérite mieux qu’un nettoyeur haute pression.</h2>
          </div>
          <div className="pb-stack" data-reveal style={{ ['--i' as string]: 1 }}>
            <p className="lede">
              {c.housingNote ? `${c.housingNote} ` : ''}Mousses, lichens et traces noires s’installent sur les versants les moins ensoleillés et retiennent l’humidité : à terme, les tuiles se fragilisent. Un démoussage par drone retire ces salissures sans que personne ne monte sur le toit.
            </p>
            <p className="muted">Que vous soyez propriétaire d’une maison, syndic d’une résidence, gestionnaire d’un site d’activité ou responsable d’un bâtiment public à {c.name}, nous préparons l’étude à distance, gérons les démarches de vol et intervenons le plus souvent en une journée.</p>
            {c.landmarks.length > 0 && (
              <>
                <p className="mono muted">Le patrimoine de {c.name}</p>
                <ul className="landmarks">{c.landmarks.map((l) => <li key={l}>{l}</li>)}</ul>
                <p className="hint muted">Toitures hautes, pierre, ardoise : les édifices de ce type sont précisément ceux où le drone évite un échafaudage lourd.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {c.images.length > 1 && (
        <section className="section section--tight" aria-label={`Photos de ${c.name}`}>
          <div className="container city-gallery">
            {c.images.slice(0, 2).map((img) => (
              <figure key={img.src} data-reveal>
                <div className="img"><Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 50vw" /></div>
                <figcaption className="credit">{img.alt} · {img.credit.author}, <a href={img.credit.sourceUrl} rel="noopener nofollow" target="_blank">{img.credit.license}</a></figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="section section--mist" aria-labelledby="ben-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Ce que vous y gagnez</span><h2 id="ben-title" className="h-1">Les avantages du drone à {c.name}.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Une couverture préservée, une maison qui garde sa valeur, et des années de tranquillité.</p>
          </div>
          <ul className="benefits">
            {benefits.slice(0, 6).map((b, k) => (
              <li key={b.k} className="benefit" data-reveal style={{ ['--i' as string]: k % 3 }}>
                <span className="benefit-k mono">{b.k}</span>
                <h3 className="h-3">{b.title}</h3>
                <p className="muted">{b.text}</p>
                <span className="benefit-tag">{b.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Nos prestations à {c.name}</span><h2 id="svc-title" className="h-1">Toitures, façades, bardages.</h2></div>
          </div>
          <ul className="aud-cards">
            {services.map((s, k) => (
              <li key={s.slug} className="aud-card" data-reveal style={{ ['--i' as string]: k }}>
                <h3 className="h-3">{s.name} à {c.name}</h3>
                <p className="muted">{s.summary}</p>
                <Link className="link-arrow" href={`/services/${s.slug}/`}>En savoir plus <span aria-hidden="true">→</span></Link>
              </li>
            ))}
          </ul>
          <ul className="landmarks" style={{ marginTop: 'var(--s-6)' }} aria-label="Publics">
            {audiences.map((a) => <li key={a.slug}><Link href={`/contact/?profil=${a.param}&ville=${encodeURIComponent(c.name)}`}>{a.label}</Link></li>)}
          </ul>
        </div>
      </section>

      <section className="section section--mist" id="devis" aria-labelledby="quick-title">
        <div className="container quick-grid">
          <div data-reveal>
            <span className="eyebrow">Étude gratuite</span>
            <h2 id="quick-title" className="h-1">Votre devis à {c.name} en moins d’une minute.</h2>
            <ul className="ticks">
              <li>Gratuit et sans engagement</li>
              <li>Étude sur photos ou vue aérienne</li>
              <li>Démarches de vol prises en charge</li>
            </ul>
          </div>
          <div data-reveal style={{ ['--i' as string]: 1 }}><Estimator defaults={{ city: c.name }} /></div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal><span className="eyebrow">Questions fréquentes</span><h2 id="faq-title" className="h-1">À {c.name}, on nous demande…</h2></div>
          <Faq items={faq} />
        </div>
      </section>

      <section className="section section--mist section--tight" aria-labelledby="other-title">
        <div className="container">
          <h2 id="other-title" className="h-3" style={{ marginBottom: 'var(--s-5)' }}>Nous intervenons aussi à</h2>
          <CityLinks exclude={c.slug} />
        </div>
      </section>

      <CtaBand title={`Protégez votre toiture à ${c.name}.`} text="Trois questions, quelques photos si vous en avez : nous revenons vers vous sous 48 h ouvrées avec une étude et un devis." href={`/contact/?ville=${encodeURIComponent(c.name)}`} />

      <JsonLd data={[
        {
          '@context': 'https://schema.org', '@type': 'Service',
          name: `Démoussage et nettoyage de toiture par drone à ${c.name}`,
          serviceType: 'Nettoyage et démoussage de toiture, façade et bardage par drone',
          provider: { '@type': 'LocalBusiness', name: site.name, url: absoluteUrl('/') },
          areaServed: { '@type': 'City', name: c.name, geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng } },
          url: absoluteUrl(`/villes/${c.slug}/`),
        },
      ]} />
    </>
  );
}
