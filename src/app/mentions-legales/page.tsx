import Link from 'next/link';
import type { Metadata } from 'next';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { site, isKnown } from '@/config/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Drone Éclat : éditeur, directeur de la publication, hébergeur, propriété intellectuelle et responsabilité.',
  alternates: { canonical: '/mentions-legales/' },
  robots: { index: true, follow: true },
};

const Todo = ({ label = 'à compléter' }: { label?: string }) => <span className="pending-tag">{label}</span>;

const UPDATED = '2026-11-25';

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/mentions-legales/', label: 'Mentions légales' }]}
        eyebrow="Informations légales"
        title="Mentions légales"
        lede="Les informations ci-dessous identifient l’éditeur et l’hébergeur du site, conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique."
      />

      <section className="section">
        <div className="container pb-legal">
          <p className="notice notice--warning" role="note">
            Document provisoire, à faire valider par un juriste avant la mise en ligne. Les champs marqués « à compléter » seront renseignés dès que les informations de l’entreprise seront définitives.
          </p>

          <div className="prose">
            <h2>Éditeur du site</h2>
            <p>Le site {new URL(site.url).hostname}{site.domainPending && <> <Todo label="domaine à confirmer" /></>} est édité par :</p>
          </div>
          <dl className="pb-legal-dl">
            <div><dt>Nom commercial</dt><dd>{site.name}</dd></div>
            <div><dt>Raison sociale</dt><dd>{isKnown(site.legalName) ? site.legalName.value : <Todo />}</dd></div>
            <div><dt>Forme juridique et capital</dt><dd><Todo /></dd></div>
            <div><dt>Siège social</dt><dd><Todo /> <span className="muted">(commune envisagée : {site.base.city}, {site.base.department})</span></dd></div>
            <div><dt>SIRET</dt><dd>{isKnown(site.siret) ? site.siret.value : <Todo />}</dd></div>
            <div><dt>RCS ou RNE</dt><dd><Todo /></dd></div>
            <div><dt>N° de TVA intracommunautaire</dt><dd><Todo /></dd></div>
            <div><dt>Téléphone</dt><dd>{isKnown(site.phone) ? site.phone.value : <Todo />}</dd></div>
            <div><dt>E-mail</dt><dd>{isKnown(site.email) ? <a href={`mailto:${site.email.value}`}>{site.email.value}</a> : <Todo />}</dd></div>
            <div><dt>Directeur de la publication</dt><dd><Todo /></dd></div>
          </dl>

          <div className="prose">
            <h2>Hébergeur</h2>
          </div>
          <dl className="pb-legal-dl">
            <div><dt>Hébergeur</dt><dd>Vercel Inc. <Todo label="proposition, à confirmer" /></dd></div>
            <div><dt>Adresse</dt><dd><Todo /></dd></div>
            <div><dt>Contact</dt><dd><Todo /></dd></div>
          </dl>

          <div className="prose">
            <h2>Activité drone</h2>
            <p>Les interventions par drone sont réalisées dans le cadre de la réglementation européenne et française applicable aux aéronefs sans équipage à bord. Les informations correspondantes seront indiquées ici :</p>
          </div>
          <dl className="pb-legal-dl">
            <div><dt>Numéro d’exploitant UAS</dt><dd>{isKnown(site.operatorId) ? site.operatorId.value : <Todo />}</dd></div>
            <div><dt>Assurance responsabilité civile professionnelle</dt><dd>{isKnown(site.insurer) ? site.insurer.value : <Todo />}</dd></div>
            <div><dt>Couverture géographique de l’assurance</dt><dd><Todo /></dd></div>
          </dl>

          <div className="prose">
            <h2>Propriété intellectuelle</h2>
            <p>L’ensemble des contenus de ce site (textes, logo, illustrations, mise en page) est la propriété de {site.name} ou fait l’objet d’une autorisation d’utilisation. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.</p>
            <p>Les visuels marqués « Illustration 3D » sont des images de synthèse réalisées pour présenter la méthode d’intervention. Ils ne représentent pas des chantiers réels. Les photos de chantier ne sont publiées qu’avec l’accord écrit des clients concernés.</p>

            <h2>Responsabilité</h2>
            <p>{site.name} s’efforce de fournir des informations exactes et à jour. Les contenus du site, notamment les articles du <Link href="/journal/">journal</Link> et les informations réglementaires, ont une valeur d’information générale : ils ne constituent ni un avis juridique ni un engagement contractuel. Seuls le devis et les conditions acceptés par le client engagent {site.name}.</p>
            <p>Les estimations et vérifications proposées en ligne (zone d’intervention, préparation du chantier) sont indicatives. Elles sont confirmées lors de l’étude de chaque demande.</p>

            <h2>Liens vers d’autres sites</h2>
            <p>Le site contient des liens vers des sites tiers, notamment des sources officielles. {site.name} n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>

            <h2>Médiation de la consommation</h2>
            <p>Conformément au Code de la consommation, le client consommateur peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d’un litige. Coordonnées du médiateur : <Todo /></p>

            <h2>Données personnelles et cookies</h2>
            <p>Le traitement des données personnelles est décrit dans la <Link href="/confidentialite/">politique de confidentialité</Link>. L’usage des traceurs et du stockage local est détaillé sur la page <Link href="/cookies/">cookies</Link>.</p>

            <h2>Droit applicable</h2>
            <p>Le présent site et ses mentions légales sont soumis au droit français.</p>

            <p className="pb-updated">Dernière mise à jour : <time dateTime={UPDATED}>25 novembre 2026</time></p>
          </div>
        </div>
      </section>
    </>
  );
}
