import { JsonLd } from './JsonLd';

export type FaqItem = { q: string; a: string };

/** FAQ en accordéons natifs (<details>) : accessibles au clavier et lisibles sans JS. */
export function Faq({ items, withSchema = true, id }: { items: FaqItem[]; withSchema?: boolean; id?: string }) {
  return (
    <div className="faq" id={id}>
      {items.map((it, i) => (
        <details key={it.q} className="faq-item" data-reveal style={{ ['--i' as string]: i % 6 }}>
          <summary>
            <span>{it.q}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="faq-answer"><p>{it.a}</p></div>
        </details>
      ))}
      {withSchema && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
          }}
        />
      )}
    </div>
  );
}
