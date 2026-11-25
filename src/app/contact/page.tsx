import type { Metadata } from 'next';
import Link from 'next/link';
import { Estimator } from '@/components/widgets/Estimator';
import { PageHero } from '@/components/ui/PageHero';
import { Faq } from '@/components/ui/Faq';
import { site, isKnown } from '@/config/site';

export const metadata: Metadata = {
  title: 'Demande d’étude et devis gratuit',
  description: 'Décrivez votre chantier en 2 minutes : type de bâtiment, surface, photos. Étude gratuite et devis détaillé sous 48 h ouvrées, sans engagement.',
  alternates: { canonical: '/contact/' },
};

const faq = [
  { q: 'Le devis est-il vraiment gratuit ?', a: 'Oui. L’étude et le devis sont gratuits et sans engagement. Vous décidez ensuite, sans relance insistante.' },
  { q: 'Pourquoi ne pas afficher de prix directement ?', a: 'Le prix dépend de la surface, du matériau, de la pente, de l’état et de l’accès. Un prix automatique serait souvent faux. Nous préférons un devis précis, établi à partir de vos informations.' },
  { q: 'Que faites-vous de mes photos et coordonnées ?', a: 'Elles servent uniquement à étudier votre demande et à vous recontacter. Elles ne sont ni revendues ni utilisées à d’autres fins. Détails dans notre politique de confidentialité.' },
];

export default function ContactPage() {
  const phone = isKnown(site.phone) ? site.phone.value : null;
  const email = isKnown(site.email) ? site.email.value : null;
  return (
    <>
      <PageHero crumbs={[{ href: '/contact/', label: 'Contact' }]} eyebrow="Étude gratuite" title="Décrivez votre chantier, nous faisons l’étude."
        lede="Six étapes courtes, quelques photos si vous en avez, et vous recevez sous 48 h ouvrées une réponse avec un devis détaillé. Aucun engagement." />
      <section className="section" id="formulaire" aria-label="Formulaire de demande d’étude">
        <div className="container layout-aside">
          <Estimator />
          <aside className="aside-card" aria-label="Autres moyens de contact">
            <p className="mono muted">Ce qui se passe ensuite</p>
            <ol className="contact-next">
              <li><strong>Sous 48 h ouvrées</strong><span>Nous étudions vos photos, l’adresse et l’espace aérien.</span></li>
              <li><strong>Un appel ou un e-mail</strong><span>Pour préciser ce qui manque, si besoin.</span></li>
              <li><strong>Un devis détaillé</strong><span>Prestation, durée, conditions météo, démarches incluses.</span></li>
            </ol>
            <hr />
            <p className="mono muted">Nous joindre</p>
            <p>{phone ? <a href={`tel:${phone.replace(/\s/g, '')}`} data-track="phone_click">{phone}</a> : <>Téléphone <span className="pending-tag">bientôt</span></>}</p>
            <p>{email ? <a href={`mailto:${email}`}>{email}</a> : <>E-mail <span className="pending-tag">bientôt</span></>}</p>
            <Link className="link-arrow" href="/zones-intervention/">Vérifier ma zone <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>
      <section className="section section--mist" aria-labelledby="cfaq">
        <div className="container faq-grid">
          <div><span className="eyebrow">Avant d’envoyer</span><h2 id="cfaq" className="h-1">Questions sur le devis.</h2></div>
          <Faq items={faq} />
        </div>
      </section>
    </>
  );
}
