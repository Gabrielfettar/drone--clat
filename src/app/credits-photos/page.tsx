import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { examples, stills, type Credit } from '@/content/examples';
import { cities } from '@/content/cities';

export const metadata: Metadata = {
  title: 'Crédits photos',
  description: 'Auteurs et licences des photographies libres de droits utilisées sur le site Drone Éclat.',
  alternates: { canonical: '/credits-photos/' },
  robots: { index: false, follow: true },
};

type Row = { what: string; c: Credit };

export default function CreditsPage() {
  const rows: Row[] = [
    ...examples.flatMap((e) => [{ what: `${e.title} (avant)`, c: e.before.credit }, { what: `${e.title} (après)`, c: e.after.credit }]),
    ...Object.values(stills).map((s) => ({ what: s.alt, c: s.credit })),
    ...cities.flatMap((ci) => ci.images.map((img) => ({ what: `${ci.name} : ${img.alt}`, c: img.credit }))),
  ];
  return (
    <>
      <PageHero crumbs={[{ href: '/credits-photos/', label: 'Crédits photos' }]} eyebrow="Mentions" title="Crédits photos"
        lede="Les photographies de villes et les exemples avant / après proviennent de banques d’images libres (Wikimedia Commons, Unsplash, Pexels, Pixabay). Elles illustrent nos prestations et nos zones d’intervention ; elles ne représentent pas des chantiers Drone Éclat, sauf mention contraire." />
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table className="credits-table">
              <thead><tr><th scope="col">Image</th><th scope="col">Auteur</th><th scope="col">Licence</th><th scope="col">Source</th></tr></thead>
              <tbody>
                {rows.map((r, k) => (
                  <tr key={k}>
                    <td>{r.what}</td><td>{r.c.author}</td>
                    <td>{r.c.licenseUrl ? <a href={r.c.licenseUrl} rel="noopener nofollow" target="_blank">{r.c.license}</a> : r.c.license}</td>
                    <td><a href={r.c.sourceUrl} rel="noopener nofollow" target="_blank">Voir l’original</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
