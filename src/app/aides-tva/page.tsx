import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { Faq } from '@/components/ui/Faq';
import { aides } from '@/content/aides';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'TVA à 10 % et fiscalité du démoussage de toiture',
  description: 'Démoussage et nettoyage de toiture : TVA à 10 % pour les logements de plus de 2 ans, dépense déductible pour les bailleurs et les entreprises, régime des monuments historiques.',
  alternates: { canonical: '/aides-tva/' },
};

const faq = [
  { q: 'Y a-t-il un crédit d’impôt pour le démoussage de toiture ?', a: 'Non. Le démoussage n’ouvre droit ni à un crédit d’impôt, ni à MaPrimeRénov’. En revanche, pour un logement achevé depuis plus de deux ans, la TVA peut être réduite à 10 %.' },
  { q: 'Comment bénéficier de la TVA à 10 % ?', a: 'Vous signez une attestation simplifiée (formulaire 1301-SD) qui confirme que le logement a plus de deux ans et qu’il est à usage d’habitation. Nous vous la remettons pré-remplie avec le devis ; vous la conservez avec la facture.' },
  { q: 'Et pour une résidence secondaire ou un logement loué ?', a: 'Le taux de 10 % s’applique aussi, dès lors qu’il s’agit d’un local à usage d’habitation achevé depuis plus de deux ans.' },
  { q: 'Mon bâtiment est un monument historique : que dois-je prévoir ?', a: 'Une autorisation de travaux est en principe nécessaire pour un monument classé ou inscrit. Nous vous fournissons le descriptif technique pour la demande et, si vous sollicitez une subvention auprès de la DRAC, le devis et le rapport photo.' },
];

export default function AidesPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/aides-tva/', label: 'TVA et aides' }]} eyebrow="Fiscalité" title="Ce que l’entretien de votre toit vous coûte vraiment."
        lede="Pour beaucoup de propriétaires, la facture est allégée : TVA réduite pour les logements, charge déductible pour les bailleurs et les entreprises, régime dédié pour les monuments historiques." >
        <div className="cta-row">
          <Link className="btn" href="/contact/" data-track="cta_aides_hero">Demander un devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
        </div>
      </PageHero>

      <section className="section" aria-label="Les cas de figure">
        <div className="container">
          {site.vatRegistered.pending && <p className="illu-banner">Informations générales, vérifiées sur les textes officiels le 25 novembre 2026. Le taux de TVA applicable à votre chantier est confirmé sur le devis.</p>}
          <ul className="aides-cards">
            {aides.map((a, k) => (
              <li key={a.who} data-reveal style={{ ['--i' as string]: k % 2 }}>
                <span className="mono">{a.who}</span>
                <h2 className="h-3">{a.title}</h2>
                <p>{a.text}</p>
                <p className="muted hint">{a.note}</p>
                {!!a.sources.length && <ul className="src">{a.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.label}</a></li>)}</ul>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal><span className="eyebrow">Questions fréquentes</span><h2 id="faq-title" className="h-1">TVA, crédit d’impôt, attestation.</h2></div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title="Un devis clair, TVA comprise." text="Nous indiquons sur chaque devis le taux de TVA applicable et vous remettons l’attestation à signer quand elle est nécessaire." cta="Demander mon devis gratuit" />
    </>
  );
}
