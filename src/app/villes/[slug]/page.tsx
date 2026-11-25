import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { Faq } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { Icon } from '@/components/ui/Icon';
import { Benefits } from '@/components/sections/Sections';
import { BeforeAfter } from '@/components/widgets/BeforeAfter';
import { cities, type City } from '@/content/cities';
import { services } from '@/content/services';
import { absoluteUrl } from '@/config/site';

export const dynamicParams = false;
export function generateStaticParams() { return cities.map((c) => ({ slug: c.slug })); }

const fmt = new Intl.NumberFormat('fr-FR');
const find = (slug: string) => cities.find((c) => c.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = find((await params).slug);
  if (!c) return {};
  const img = c.photos[0];
  return {
    title: `Démoussage de toiture par drone à ${c.name} (${c.departmentCode})`,
    description: `Démoussage de toiture et nettoyage de façade par drone à ${c.name} (${c.department}), ${c.distanceKm === 0 ? 'notre base' : `à ${c.distanceKm} km de Compiègne`}. Sans échafaudage. Devis gratuit sous 48 h.`,
    alternates: { canonical: `/villes/${c.slug}/` },
    openGraph: { url: `/villes/${c.slug}/`, images: img ? [{ url: `/villes/${img.file}`, width: img.width, height: img.height, alt: img.caption }] : [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Drone Éclat : un drone nettoie une toiture en tuiles' }] },
  };
}

/** Compiègne, notre base : contenu local propre à cette page. */
const BASE_TOWNS = ['Margny-lès-Compiègne', 'Venette', 'Jaux', 'Lacroix-Saint-Ouen', 'Clairoix', 'Choisy-au-Bac', 'Le Meux', 'Thourotte', 'Pierrefonds', 'Ribécourt-Dreslincourt'];
const BASE_FAQ = [
  { q: 'Vous déplacez-vous dans les communes autour de Compiègne ?', a: `Oui. Compiègne est notre point de départ : ${BASE_TOWNS.slice(0, 6).join(', ')} et les communes voisines sont nos interventions les plus proches. Indiquez simplement votre code postal dans la demande de devis.` },
  { q: 'Peut-on faire voler un drone près de l’aérodrome de Compiègne-Margny ?', a: 'La proximité d’un aérodrome impose des vérifications et parfois des restrictions de hauteur ou de zone. Nous contrôlons chaque adresse sur la carte officielle des restrictions avant de confirmer l’intervention, et nous vous le disons dès l’étude si le vol n’est pas possible.' },
];

function near(c: City) {
  const d = (a: City, b: City) => {
    const R = 6371, r = Math.PI / 180;
    const x = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  };
  return cities.filter((o) => o.slug !== c.slug).map((o) => ({ o, km: Math.round(d(c, o)) })).sort((a, b) => a.km - b.km).slice(0, 6);
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = find((await params).slug);
  if (!c) notFound();
  const [hero, ...more] = c.photos;
  const isBase = c.distanceKm === 0;
  const faq = [
    ...(isBase ? BASE_FAQ : []),
    { q: `Intervenez-vous vraiment à ${c.name} ?`, a: `Oui. ${c.name} se trouve ${isBase ? 'dans notre commune de base' : `à environ ${c.distanceKm} km de notre base de Compiègne`}, dans notre secteur d’intervention. Nous y intervenons pour les particuliers comme pour les professionnels, sur étude préalable.` },
    { q: `Le vol d’un drone est-il autorisé partout à ${c.name} ?`, a: c.slug === 'paris' ? `Paris est une zone très réglementée : tout vol de drone y est interdit sans dérogation de la Préfecture de police, demandée au moins 10 jours ouvrables à l’avance. Nous étudions chaque adresse parisienne au cas par cas et vous disons dès l’étude si l’intervention est possible.` : `Chaque adresse est vérifiée avant l’intervention : zones aériennes, proximité d’un aérodrome, d’un site sensible ou d’un monument. Lorsque une autorisation ou une notification est nécessaire, nous nous en chargeons. Dans de rares cas, le vol n’est pas possible et nous vous le disons dès l’étude.` },
    { q: 'Combien de temps dure un démoussage de toiture par drone ?', a: 'Pour une maison, l’intervention tient souvent en une journée, installation comprise. Pour un grand bâtiment, nous proposons un planning par secteurs après visite technique.' },
    { q: 'Faut-il être présent le jour de l’intervention ?', a: 'Ce n’est pas obligatoire, mais nous devons pouvoir accéder au pied du bâtiment, à un point d’eau et, idéalement, à une prise électrique. Nous le préparons avec vous.' },
  ];
  return (
    <>
      <header className="city-hero">
        {hero && (
          <div className="city-hero-img">
            <Image src={`/villes/${hero.file}`} alt={hero.caption} fill priority sizes="100vw" />
          </div>
        )}
        <div className="container">
          <Breadcrumbs items={[{ href: '/zones-intervention/', label: 'Zones' }, { href: `/villes/${c.slug}/`, label: c.name }]} />
          <span className="eyebrow">{c.department} · {c.region}</span>
          <h1 className="h-display">Démoussage et nettoyage de toiture par drone à {c.name}.</h1>
          <p className="lede">Toiture, façade, bardage. Sans échafaudage, sans personne sur votre toit.</p>
          <div className="cta-row">
            <Link className="btn" href={`/contact/?ville=${encodeURIComponent(c.name)}`} data-track="cta_city_hero">Devis gratuit à {c.name} <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link className="btn btn--light" href={`/contact/?ville=${encodeURIComponent(c.name)}&batiment=pro`}>Demande professionnelle</Link>
          </div>
        </div>
        {hero && <p className="photo-credit">{hero.caption}. Photo : {hero.author}, <a href={hero.licenceUrl} target="_blank" rel="noopener license">{hero.licence}</a>, via <a href={hero.commonsUrl} target="_blank" rel="noopener">Wikimedia Commons</a>.</p>}
      </header>

      {c.archive && (
        <section className="section city-ba" aria-labelledby="city-ba">
          <div className="container">
            <div className="sec-head">
              <div data-reveal><span className="eyebrow">Avant / après à {c.name}</span><h2 id="city-ba" className="h-1">Même {c.name}. Dix ans de moins.</h2></div>
              <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>{c.archive.building}. {c.archive.note}</p>
            </div>
            <div className="arch-pair" data-reveal>
              {(['before', 'after'] as const).map((k) => {
                const ph = c.archive![k];
                return (
                  <figure key={k} className="arch-fig" data-k={k}>
                    <div className="arch-img"><Image src={`/villes/${ph.file}`} alt={`${c.archive!.building}, ${k === 'before' ? 'avant' : 'après'} le nettoyage${ph.date ? ` (${ph.date})` : ''}`} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
                    <figcaption><span className="arch-tag">{k === 'before' ? 'Avant' : 'Après'}{ph.date ? ` · ${ph.date}` : ''}</span><span className="arch-cred">{ph.author}, <a href={ph.licenceUrl} target="_blank" rel="noopener license">{ph.licence}</a>, <a href={ph.commonsUrl} target="_blank" rel="noopener">Wikimedia Commons</a></span></figcaption>
                  </figure>
                );
              })}
            </div>
            <p className="hint muted arch-note"><span className="pending-tag">Photos d’archives</span> Vraies photos du même bâtiment à deux époques. Travaux non réalisés par Drone Éclat.</p>
          </div>
        </section>
      )}

      {!c.archive && c.simulation && (
        <section className="section city-ba" aria-labelledby="city-ba">
          <div className="container">
            <div className="sec-head">
              <div data-reveal><span className="eyebrow">Avant / après à {c.name}</span><h2 id="city-ba" className="h-1">Même {c.name}. Dix ans de moins.</h2></div>
              <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Glissez : à gauche l’encrassement, à droite la pierre propre.</p>
            </div>
            <div data-reveal>
              <BeforeAfter
                before={c.simulation.before}
                after={`/villes/${c.simulation.photo.file}`}
                alt={{ before: `${c.simulation.photo.caption}, avant simulé : pierre et toiture encrassées`, after: c.simulation.photo.caption }}
                illustration tag="Simulation"
                caption={<>« Avant » simulé par calcul, pas un chantier Drone Éclat. Photo d’origine : {c.simulation.photo.caption}, par {c.simulation.photo.author}, <a href={c.simulation.photo.licenceUrl} target="_blank" rel="noopener license">{c.simulation.photo.licence}</a>, <a href={c.simulation.photo.commonsUrl} target="_blank" rel="noopener">Wikimedia Commons</a>{/BY-SA/.test(c.simulation.photo.licence) ? ', image modifiée (encrassement simulé) diffusée sous la même licence.' : ', image modifiée (encrassement simulé).'}</>}
              />
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="city-intro">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Drone Éclat à {c.name}</span><h2 id="city-intro" className="h-1">Vos toits, vus d’en haut, entretenus depuis le sol.</h2></div>
            <div data-reveal style={{ ['--i' as string]: 1 }}>
              <p className="lede">
                {isBase
                  ? `Compiègne est notre point de départ : c’est d’ici que partent toutes nos interventions.`
                  : `Depuis notre base de Compiègne, nous rejoignons ${c.name} en un trajet : environ ${c.distanceKm} km à vol d’oiseau.`}{' '}
                Tuile, ardoise, zinc, fibrociment ou bac acier : nous adaptons pression, buse et produits à chaque matériau.
              </p>
            </div>
          </div>
          <dl className="city-facts" data-reveal>
            <div><dt>Habitants</dt><dd>{fmt.format(c.population)}</dd></div>
            <div><dt>Département</dt><dd>{c.department} ({c.departmentCode})</dd></div>
            <div><dt>Depuis Compiègne</dt><dd>{isBase ? 'Base' : `${c.distanceKm} km`}</dd></div>
            <div><dt>Étude</dt><dd>Gratuite, 48 h</dd></div>
          </dl>
          {c.roofing && <p className="city-roof" data-reveal><span className="mono">Le bâti local</span>{c.roofing}</p>}
          <p className="hint muted" style={{ marginTop: 'var(--s-3)' }}>Population municipale INSEE {c.populationYear}. Logement de plus de deux ans : TVA à 10 % possible, <Link href="/aides-tva/">voir les conditions</Link>.</p>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="city-svc">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Prestations</span><h2 id="city-svc" className="h-1">Ce que nous faisons à {c.name}.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Maisons, immeubles, commerces, sites industriels, bâtiments publics{c.landmarks.length ? ' et patrimoine' : ''} : une même méthode, adaptée à chaque bâtiment.</p>
          </div>
          <ul className="bgrid" style={{ marginTop: 0 }}>
            {services.map((s, k) => (
              <li key={s.slug} data-reveal style={{ ['--i' as string]: k }}>
                <Icon name={k === 0 ? 'tile' : k === 1 ? 'building' : 'warehouse'} />
                <strong>{s.name} à {c.name}</strong>
                <p className="muted">{s.summary}</p>
                <Link className="link-arrow" href={`/services/${s.slug}/`}>En savoir plus <span aria-hidden="true">→</span></Link>
              </li>
            ))}
            <li data-reveal style={{ ['--i' as string]: 3 }}>
              <Icon name="factory" />
              <strong>Professionnels et collectivités</strong>
              <p className="muted">Grandes toitures, sites en activité, monuments : visite technique et planning par secteurs.</p>
              <Link className="link-arrow" href="/professionnels/entretien-batiments/">Offre professionnels <span aria-hidden="true">→</span></Link>
            </li>
          </ul>
        </div>
      </section>

      {isBase && (
        <section className="section section--tight" aria-labelledby="city-near-base">
          <div className="container">
            <div className="sec-head">
              <div data-reveal><span className="eyebrow">Autour de Compiègne</span><h2 id="city-near-base" className="h-1">Notre base, vos communes.</h2></div>
              <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>C’est ici que nous sommes installés : nos déplacements les plus courts sont chez vous. Maisons de la forêt de Compiègne souvent à l’ombre, toits de tuiles ou d’ardoises du centre, bâtiments d’activité de l’agglomération : la mousse s’y installe vite, nous la retirons sans monter sur le toit.</p>
            </div>
            <ul className="town-chips" data-reveal>{BASE_TOWNS.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="hint muted" style={{ marginTop: 'var(--s-4)' }}>Tout le département est couvert : <Link href="/oise/">démoussage de toiture par drone dans l’Oise</Link>.</p>
          </div>
        </section>
      )}
      <Benefits compact />

      {(more.length > 0 || c.landmarks.length > 0) && (
        <section className="section" aria-labelledby="city-pat">
          <div className="container">
            <div className="sec-head">
              <div data-reveal><span className="eyebrow">Patrimoine local</span><h2 id="city-pat" className="h-1">Des toits qui font l’identité de {c.name}.</h2></div>
              {c.landmarks.length > 0 && <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>{c.landmarks.join(', ')} : des édifices dont l’entretien demande précision et respect des règles de protection. Pour les monuments classés ou inscrits, nous préparons le dossier technique avec le propriétaire.</p>}
            </div>
            {more.length > 0 && (
              <div className="city-gallery">
                {more.map((p) => (
                  <figure key={p.file} data-reveal>
                    <div className="ph"><Image src={`/villes/${p.file}`} alt={p.caption} fill sizes="(max-width: 600px) 100vw, 50vw" /></div>
                    <figcaption>{p.caption}. Photo : {p.author}, <a href={p.licenceUrl} target="_blank" rel="noopener license">{p.licence}</a>, <a href={p.commonsUrl} target="_blank" rel="noopener">Wikimedia Commons</a>. Photo de la ville, pas une réalisation Drone Éclat.</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="city-faq">
        <div className="container faq-grid">
          <div data-reveal>
            <span className="eyebrow">Questions fréquentes</span>
            <h2 id="city-faq" className="h-1">À {c.name}, on nous demande souvent…</h2>
            <p className="mono muted" style={{ marginTop: 'var(--s-5)' }}>Villes proches</p>
            <ul className="city-near">
              {near(c).map(({ o, km }) => <li key={o.slug}><Link href={`/villes/${o.slug}/`}>{o.name} · {km} km</Link></li>)}
            </ul>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Service',
        name: `Nettoyage et démoussage de toiture par drone à ${c.name}`,
        serviceType: 'Nettoyage de toiture par drone',
        provider: { '@id': absoluteUrl('/#organisation') },
        areaServed: { '@type': 'City', name: c.name, containedInPlace: { '@type': 'AdministrativeArea', name: c.department } },
        url: absoluteUrl(`/villes/${c.slug}/`),
      }} />

      <CtaBand title={`Votre toit à ${c.name}, étudié gratuitement.`} text="Trois étapes, quelques photos si vous en avez : nous revenons vers vous sous 48 h ouvrées avec une étude et un devis détaillé." cta="Demander mon devis gratuit" href={`/contact/?ville=${encodeURIComponent(c.name)}`} />
    </>
  );
}
