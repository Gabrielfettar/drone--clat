import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Faq } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { BeforeAfter } from '@/components/widgets/BeforeAfter';
import { services, getService, type Service } from '@/content/services';
import { serviceSchema } from '@/lib/schema';
import '../../pages-a.css';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}/` },
    openGraph: { title: s.h1, description: s.description, url: `/services/${s.slug}/` },
  };
}

const figures: Record<Exclude<Service['visual'], 'roof'>, { src: string; alt: string }> = {
  facade: { src: '/illustrations/facade.webp', alt: 'Illustration 3D d’une façade de maison contemporaine nettoyée par drone' },
  cladding: { src: '/illustrations/cladding.webp', alt: 'Illustration 3D d’un bâtiment à bardage métallique' },
  pro: { src: '/illustrations/cladding.webp', alt: 'Illustration 3D d’un bâtiment professionnel' },
};

/** Pages de référence utiles selon la prestation (maillage interne). */
function referenceLinks(s: Service) {
  const links = [
    { href: '/technologie/', eyebrow: 'Méthode', title: 'Matériel et limites du drone', text: 'Drone relié au sol, unité de pompage, caméra de contrôle : ce que le drone fait, et ce qu’il ne fait pas.' },
    { href: '/securite-reglementation/', eyebrow: 'Cadre', title: 'Sécurité et réglementation', text: 'Démarches de vol, balisage, eau, biocide ou phytosanitaire : ce que dit la réglementation.' },
    { href: '/zones-intervention/', eyebrow: 'Secteur', title: 'Zones d’intervention', text: 'Basés à Compiègne : vérifiez si votre commune est dans notre secteur prévisionnel.' },
  ];
  if (s.audience.includes('professionnels') || s.audience.includes('agricole')) {
    links.push({ href: '/professionnels/entretien-batiments/', eyebrow: 'Professionnels', title: 'Entretien de bâtiments pros', text: 'Syndics, entreprises, exploitations agricoles : planning par secteurs et documents de sécurité.' });
  }
  return links;
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const others = services.filter((x) => x.slug !== s.slug);
  const contactHref = `/contact/?service=${s.slug}`;
  const fig = s.visual === 'roof' ? null : figures[s.visual];

  const aside = fig ? (
    <figure className="pa-figure">
      <div className="pa-frame">
        <Image src={fig.src} alt={fig.alt} fill priority sizes="(max-width: 900px) 100vw, 40vw" />
        <span className="pending-tag">Illustration 3D</span>
      </div>
      <figcaption className="pa-cap">Les photos de nos premiers chantiers remplaceront cette illustration.</figcaption>
    </figure>
  ) : (
    <BeforeAfter before="/illustrations/roof-before.webp" after="/illustrations/roof-after.webp" illustration priority
      alt={{ before: 'Illustration 3D d’une toiture en tuiles couverte de mousse', after: 'La même toiture après rinçage par drone' }}
      caption="Glissez pour comparer. Les photos de nos premiers chantiers remplaceront cette illustration." />
  );

  return (
    <div className="pa">
      <PageHero
        crumbs={[{ href: `/services/${s.slug}/`, label: s.name }]}
        eyebrow="Prestation"
        title={s.h1}
        lede={s.lede}
        aside={aside}
      >
        <div className="cta-row">
          <Link className="btn" href={contactHref} data-track="svc_hero_devis">Demander une étude gratuite <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link className="btn btn--ghost" href="#deroulement">Voir le déroulement</Link>
        </div>
      </PageHero>

      {/* Définition, introduction, surfaces, avantages, précautions */}
      <section className="section" aria-label="L’essentiel">
        <div className="container layout-aside">
          <div className="pa-stack">
            <div className="pa-lead-stack" data-reveal>
              <p className="answer"><span className="mono">En bref</span>{s.summary}</p>
              {s.intro.map((p) => <p key={p.slice(0, 32)} className="lede">{p}</p>)}
            </div>

            <div className="pa-block" data-reveal>
              <h2 className="h-2" id="surfaces">Surfaces traitées</h2>
              <p className="muted">La mention « sur étude » signale un support qui demande une vérification particulière avant de confirmer l’intervention.</p>
              <ul className="pa-chips">{s.surfaces.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>

            <div className="pa-block">
              <h2 className="h-2" data-reveal>Avantages et précautions</h2>
              <div className="pa-split">
                <div className="pa-box" data-reveal>
                  <h3 className="h-3">Ce que le drone apporte</h3>
                  <ul className="ticks">{s.benefits.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="pa-box" data-reveal style={{ ['--i' as string]: 1 }}>
                  <h3 className="h-3">Ce que nous vérifions avant</h3>
                  <ul className="dashes">{s.precautions.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>

          <aside className="aside-card" aria-label="Préparer votre demande">
            <p className="mono muted">Pour l’étude gratuite</p>
            <p className="h-3">Trois éléments suffisent.</p>
            <ol className="pa-aside-list">
              <li><span className="mono">01</span><span>L’adresse du bâtiment, ou au moins la commune.</span></li>
              <li><span className="mono">02</span><span>Quelques photos de chaque face ou pan concerné.</span></li>
              <li><span className="mono">03</span><span>Le matériau, si vous le connaissez, et les contraintes d’accès.</span></li>
            </ol>
            <Link className="btn" href={contactHref} data-track="svc_aside_devis">Décrire mon chantier <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <hr className="pa-aside-sep" />
            <p className="muted">Réponse sous 48 h ouvrées, sans engagement.</p>
            <Link className="link-arrow" href="/zones-intervention/">Vérifier ma commune <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>

      {/* Étapes */}
      <section className="section section--mist" id="deroulement" aria-labelledby="steps-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Déroulement</span><h2 id="steps-title" className="h-1">Quatre étapes, un seul interlocuteur.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>De l’étude au rapport photo, nous préparons le chantier, les démarches de vol et le balisage.</p>
          </div>
          <ol className="steps">
            {s.steps.map((st, k) => (
              <li key={st.title} className="step" data-reveal style={{ ['--i' as string]: k }}>
                <span className="step-n mono">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="h-3">{st.title}</h3>
                <p className="muted">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contenus détaillés */}
      <section className="section" aria-label="En détail">
        <div className="container">
          {s.sections.map((sec) => (
            <article key={sec.h2} className="prose pa-prose" data-reveal>
              <h2>{sec.h2}</h2>
              {sec.body.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
              {sec.bullets && <ul className="ticks">{sec.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </article>
          ))}
          <p className="pa-prose" data-reveal>
            <Link className="link-arrow" href="/technologie/">Comprendre le matériel et ses limites <span aria-hidden="true">→</span></Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--mist" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal>
            <span className="eyebrow">Questions fréquentes</span>
            <h2 id="faq-title" className="h-1">{s.name} : vos questions.</h2>
            <Link className="link-arrow" href="/securite-reglementation/">Sécurité et réglementation <span aria-hidden="true">→</span></Link>
          </div>
          <Faq items={s.faq} />
        </div>
      </section>

      {/* Autres prestations + pages de référence */}
      <section className="section pa-related" aria-labelledby="more-title">
        <div className="container pa-stack">
          <div className="pa-block">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <div data-reveal><span className="eyebrow">Autres prestations</span><h2 id="more-title" className="h-2">La même méthode, d’autres surfaces.</h2></div>
            </div>
            <div className="cards">
              {others.map((o, k) => (
                <Link key={o.slug} href={`/services/${o.slug}/`} className="card" data-reveal style={{ ['--i' as string]: k }}>
                  <span className="mono">Prestation</span>
                  <h3 className="h-3">{o.name}</h3>
                  <p className="muted">{o.summary}</p>
                  <span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
          <div className="pa-block">
            <h2 className="h-3" data-reveal>Pour aller plus loin</h2>
            <div className="cards">
              {referenceLinks(s).map((l, k) => (
                <Link key={l.href} href={l.href} className="card" data-reveal style={{ ['--i' as string]: k }}>
                  <span className="mono">{l.eyebrow}</span>
                  <h3 className="h-3">{l.title}</h3>
                  <p className="muted">{l.text}</p>
                  <span className="link-arrow">Lire <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title={`${s.name} : décrivez votre chantier.`}
        text="Adresse, quelques photos et le type de surface : nous revenons vers vous sous 48 h ouvrées avec une étude et un devis détaillé, gratuit et sans engagement."
        cta="Demander une étude gratuite"
        href={contactHref}
        secondary={{ href: '/zones-intervention/', label: 'Zones d’intervention' }}
      />

      <JsonLd data={serviceSchema(s)} />
    </div>
  );
}
