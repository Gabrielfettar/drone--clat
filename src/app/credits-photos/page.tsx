import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { stock } from '@/content/stock';
import { cities } from '@/content/cities';

export const metadata: Metadata = {
  title: 'Crédits photos',
  description: 'Auteurs et licences des photographies libres de droits utilisées sur le site Drone Éclat (Wikimedia Commons, Unsplash, Pexels, Pixabay).',
  alternates: { canonical: '/credits-photos/' },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  const rows = [
    ...stock.map((p) => ({ what: p.caption, author: p.author, licence: p.licence, licenceUrl: p.licenceUrl, source: p.pageUrl })),
    ...cities.flatMap((c) => c.photos.map((p) => ({ what: `${c.name} : ${p.caption}`, author: p.author, licence: p.licence, licenceUrl: p.licenceUrl, source: p.commonsUrl }))),
  ];
  return (
    <>
      <PageHero crumbs={[{ href: '/credits-photos/', label: 'Crédits photos' }]} eyebrow="Mentions" title="Crédits photos"
        lede="Photos d’illustration issues de banques d’images libres. Elles illustrent nos prestations et nos villes ; sauf mention contraire, elles ne montrent pas des chantiers Drone Éclat." />
      <section className="section">
        <div className="container table-wrap">
          <table className="credits-table">
            <thead><tr><th scope="col">Image</th><th scope="col">Auteur</th><th scope="col">Licence</th><th scope="col">Source</th></tr></thead>
            <tbody>
              {rows.map((r, k) => (
                <tr key={k}>
                  <td>{r.what}</td><td>{r.author}</td>
                  <td>{r.licenceUrl ? <a href={r.licenceUrl} rel="noopener nofollow" target="_blank">{r.licence}</a> : r.licence}</td>
                  <td>{r.source ? <a href={r.source} rel="noopener nofollow" target="_blank">Original</a> : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
