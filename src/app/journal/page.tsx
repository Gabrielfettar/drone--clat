import Link from 'next/link';
import type { Metadata } from 'next';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { articles, formatDate } from '@/content/articles';

export const metadata: Metadata = {
  title: { absolute: 'Journal : conseils d’entretien de toiture et façade' },
  description: 'Conseils d’entretien de toiture et façade : drone ou couvreur, saison pour démousser dans l’Oise, réglementation des drones. Articles datés et sourcés.',
  alternates: { canonical: '/journal/' },
};

export default function JournalPage() {
  const list = [...articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return (
    <>
      <PageHero
        crumbs={[{ href: '/journal/', label: 'Journal' }]}
        eyebrow="Journal"
        title="Le journal Drone Éclat"
        lede="Des conseils concrets pour entretenir toitures, façades et bardages. Chaque article est daté, cite ses sources quand il parle de règles, et dit aussi ce que le drone ne fait pas."
      />

      <section className="section" aria-labelledby="articles-title">
        <div className="container">
          <h2 id="articles-title" className="sr-only">Tous les articles</h2>
          <ul className="pb-articles" role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {list.map((a, k) => (
              <li key={a.slug} className="pb-article-card" data-reveal style={{ ['--i' as string]: k % 6 }}>
                <p className="pb-meta">
                  <span className="pb-cat">{a.category}</span>
                  <time dateTime={a.date}>{formatDate(a.date)}</time>
                  <span>{a.readingMinutes} min de lecture</span>
                </p>
                <h3><Link href={`/journal/${a.slug}/`}>{a.title}</Link></h3>
                <p>{a.excerpt}</p>
                <span className="link-arrow" aria-hidden="true">Lire l’article <span>→</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--mist section--tight" aria-labelledby="journal-more-title">
        <div className="container pb-split">
          <div data-reveal>
            <span className="eyebrow">À venir</span>
            <h2 id="journal-more-title" className="h-2" style={{ marginTop: 'var(--s-4)' }}>Les prochains articles s’appuieront sur nos chantiers.</h2>
          </div>
          <div className="pb-stack" data-reveal style={{ ['--i' as string]: 1 }}>
            <p className="lede">Dès nos premières interventions, nous publierons des retours de terrain : suivi photo d’une toiture dans le temps, préparation d’un chantier en copropriété, entretien d’un bâtiment agricole.</p>
            <div className="cta-row" style={{ marginTop: 0 }}>
              <Link className="link-arrow" href="/realisations/">Voir les réalisations <span aria-hidden="true">→</span></Link>
              <Link className="link-arrow" href="/services/demoussage-toiture-drone/">Le démoussage par drone <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Une question sur votre toiture ?"
        text="Envoyez-nous l’adresse et quelques photos : l’étude est gratuite, et nous vous dirons franchement si le drone est adapté à votre bâtiment."
      />
    </>
  );
}
