import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { Faq } from '@/components/ui/Faq';
import { JsonLd } from '@/components/ui/JsonLd';
import { articles, getArticle, anchorId, formatDate } from '@/content/articles';
import { site, absoluteUrl } from '@/config/site';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `/journal/${a.slug}/`;
  return {
    title: { absolute: a.metaTitle ?? a.title },
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.description,
      url: absoluteUrl(url),
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Drone Éclat : un drone nettoie une toiture en tuiles' }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const url = `/journal/${a.slug}/`;
  const toc = a.body.map((s) => ({ id: anchorId(s.h2), label: s.h2 }));
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const words = a.body.reduce((n, s) => n + [s.h2, ...s.paragraphs, ...(s.list ?? [])].join(' ').split(/\s+/).length, 0);

  return (
    <>
      <PageHero
        crumbs={[{ href: '/journal/', label: 'Journal' }, { href: url, label: a.title }]}
        eyebrow={a.category}
        title={a.title}
        lede={a.excerpt}
      >
        <p className="pb-meta">
          <span>Par l’équipe {site.name}</span>
          <span>Publié le <time dateTime={a.date}>{formatDate(a.date)}</time></span>
          {a.updated && a.updated !== a.date && <span>Mis à jour le <time dateTime={a.updated}>{formatDate(a.updated)}</time></span>}
          <span>{a.readingMinutes} min de lecture</span>
        </p>
      </PageHero>

      <section className="section">
        <div className="container layout-aside">
          <article className="pb-article">
            <nav className="pb-toc" aria-labelledby="toc-title">
              <p id="toc-title" className="mono">Sommaire</p>
              <ol>{toc.map((t) => <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>)}</ol>
            </nav>

            <div className="prose">
              {a.body.map((s) => (
                <section key={s.h2} aria-labelledby={anchorId(s.h2)}>
                  <h2 id={anchorId(s.h2)}>{s.h2}</h2>
                  {s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                  {s.list && <ul>{s.list.map((li) => <li key={li.slice(0, 40)}>{li}</li>)}</ul>}
                </section>
              ))}
            </div>

            {a.sources && a.sources.length > 0 && (
              <div className="pb-sources">
                <h2 className="h-3">Sources</h2>
                <p className="muted" style={{ fontSize: 'var(--t-sm)' }}>
                  Consultées le {formatDate(a.updated ?? a.date)}. Les textes évoluent : référez-vous toujours à leur version en vigueur.
                </p>
                <ul>{a.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
              </div>
            )}

            {a.category === 'Réglementation' && (
              <p className="notice notice--warning">Cet article est une information générale, pas un avis juridique. Il ne remplace pas la lecture des textes officiels ni l’avis des autorités compétentes.</p>
            )}

            {a.faq && a.faq.length > 0 && (
              <div className="pb-stack">
                <h2 className="h-2">Questions fréquentes</h2>
                <Faq items={a.faq} />
              </div>
            )}
          </article>

          <aside className="pb-aside" aria-label="Pour aller plus loin">
            <div className="aside-card">
              <span className="eyebrow">Étude gratuite</span>
              <p className="h-3">Votre toiture est-elle adaptée au drone ?</p>
              <p className="muted">Envoyez l’adresse et quelques photos. Nous vous répondons sous 48 h ouvrées, et nous vous orientons vers un couvreur si c’est lui qu’il vous faut.</p>
              <Link className="btn btn--block" href="/contact/" data-track="cta_article_aside">Demander mon devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
              {a.links && a.links.length > 0 && (
                <>
                  <hr />
                  <ul className="ticks">
                    {a.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--mist" aria-labelledby="related-title">
          <div className="container">
            <div className="sec-head">
              <div><span className="eyebrow">À lire aussi</span><h2 id="related-title" className="h-2">Articles liés</h2></div>
              <p className="lede"><Link className="link-arrow" href="/journal/">Tous les articles du journal <span aria-hidden="true">→</span></Link></p>
            </div>
            <ul className="pb-articles" role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {related.map((r) => (
                <li key={r.slug} className="pb-article-card">
                  <p className="pb-meta"><span className="pb-cat">{r.category}</span><span>{r.readingMinutes} min de lecture</span></p>
                  <h3><Link href={`/journal/${r.slug}/`}>{r.title}</Link></h3>
                  <p>{r.excerpt}</p>
                  <span className="link-arrow" aria-hidden="true">Lire l’article <span>→</span></span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Passons de la théorie à votre toiture."
        text="Trois étapes, quelques photos si vous en avez : nous revenons vers vous sous 48 h ouvrées avec une étude et un devis détaillé."
        secondary={{ href: '/realisations/', label: 'Voir les réalisations' }}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.description,
          datePublished: a.date,
          dateModified: a.updated ?? a.date,
          inLanguage: 'fr-FR',
          wordCount: words,
          articleSection: a.category,
          mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(url) },
          author: { '@type': 'Organization', name: site.name, url: absoluteUrl('/') },
          publisher: { '@type': 'Organization', '@id': absoluteUrl('/#organisation'), name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/logo-drone-eclat.png') } },
          image: absoluteUrl('/og-default.jpg'),
        }}
      />
    </>
  );
}
