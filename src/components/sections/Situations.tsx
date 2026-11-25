import Link from 'next/link';
import Image from 'next/image';
import { photo, situations, type StockPhoto } from '@/content/stock';

function Credit({ p }: { p: StockPhoto }) {
  return <span className="ba-credit">Photo d’illustration : {p.author}, <a href={p.licenceUrl} target="_blank" rel="noopener license">{p.licence}</a>, <a href={p.pageUrl} target="_blank" rel="noopener">source</a>.</span>;
}

/** Avant / après illustratifs : deux photos libres de droit de bâtiments DIFFÉRENTS, clairement signalées. */
export function Situations({ limit }: { limit?: number }) {
  const list = situations
    .map((s) => ({ ...s, a: photo(s.problem), b: photo(s.result) }))
    .filter((s) => s.a && s.b)
    .slice(0, limit);
  if (!list.length) return null;
  return (
    <section className="section situations" aria-labelledby="sit-title">
      <div className="container">
        <div className="sec-head">
          <div data-reveal><span className="eyebrow">Ce que nous traitons</span><h2 id="sit-title" className="h-1">Le problème, et le résultat que nous visons.</h2></div>
          <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Des situations que nous rencontrons tous les jours, illustrées par des photos libres de droit. Les photos de nos propres chantiers viendront les remplacer, avec l’accord de nos clients.</p>
        </div>
        <p className="illu-banner"><strong>Photos d’illustration.</strong> Ce ne sont pas des réalisations Drone Éclat, et les deux photos de chaque paire montrent des bâtiments différents.</p>
        <ul className="ba-pairs">
          {list.map((s, k) => (
            <li key={s.title} className="ba-pair" data-reveal style={{ ['--i' as string]: k % 2 }}>
              <div className="sit-duo">
                <figure>
                  <div className="sit-ph"><Image src={`/illustrations/libres/${s.a!.file}`} alt={s.a!.caption} fill sizes="(max-width: 900px) 50vw, 25vw" /></div>
                  <figcaption><span className="sit-tag sit-tag--bad">Le problème</span></figcaption>
                </figure>
                <figure>
                  <div className="sit-ph"><Image src={`/illustrations/libres/${s.b!.file}`} alt={s.b!.caption} fill sizes="(max-width: 900px) 50vw, 25vw" /></div>
                  <figcaption><span className="sit-tag sit-tag--good">Le résultat visé</span></figcaption>
                </figure>
              </div>
              <h3 className="h-3">{s.title}</h3>
              <p className="muted">{s.text}</p>
              {s.service && <Link className="link-arrow" href={`/contact/?service=${s.service}`}>Faire étudier ce cas <span aria-hidden="true">→</span></Link>}
              <span className="ba-credit-wrap"><Credit p={s.a!} /> <Credit p={s.b!} /></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
