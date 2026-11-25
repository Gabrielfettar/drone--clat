import Link from 'next/link';
import type { Metadata } from 'next';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { site, isKnown } from '@/config/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment Drone Éclat traite les données de votre demande de devis et vos photos : finalités, base légale, conservation, destinataires et droits RGPD.',
  alternates: { canonical: '/confidentialite/' },
  robots: { index: true, follow: true },
};

const Todo = ({ label = 'à compléter' }: { label?: string }) => <span className="pending-tag">{label}</span>;
const contact = isKnown(site.email) ? <a href={`mailto:${site.email.value}`}>{site.email.value}</a> : <>l’adresse e-mail de contact <Todo /></>;

const retention = [
  ['Demande de devis sans suite (prospect)', 'Coordonnées, description du bâtiment, message', '3 ans à compter du dernier contact de votre part'],
  ['Photos jointes à la demande', 'Images du bâtiment', 'Même durée que la demande, puis suppression'],
  ['Client : suivi du chantier et rapport photo', 'Coordonnées, adresse du chantier, photos avant / après', 'Durée de la relation commerciale, puis 3 ans à compter du dernier contact'],
  ['Client : devis et factures', 'Pièces comptables', '10 ans (obligation comptable légale)'],
  ['Mesure d’audience (si activée)', 'Statistiques agrégées, sans identifiant', 'Selon la configuration de l’outil, données non nominatives'],
];

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/confidentialite/', label: 'Confidentialité' }]}
        eyebrow="Informations légales"
        title="Politique de confidentialité"
        lede="Ce que nous faisons des informations que vous nous confiez quand vous demandez une étude, et les droits dont vous disposez. En résumé : le strict nécessaire pour vous répondre, rien de plus."
      />

      <section className="section">
        <div className="container pb-legal">
          <p className="notice notice--warning" role="note">
            Document provisoire, à faire valider par un juriste (ou un délégué à la protection des données) avant la mise en ligne. Les durées et destinataires indiqués sont des propositions.
          </p>

          <div className="prose">
            <h2>Responsable du traitement</h2>
          </div>
          <dl className="pb-legal-dl">
            <div><dt>Responsable</dt><dd>{isKnown(site.legalName) ? site.legalName.value : <>{site.name} <Todo label="raison sociale à compléter" /></>}</dd></div>
            <div><dt>Adresse</dt><dd><Todo /></dd></div>
            <div><dt>Contact pour vos données</dt><dd>{contact}</dd></div>
          </dl>

          <div className="prose">
            <h2>Données collectées par le formulaire de devis</h2>
            <p>Lorsque vous décrivez votre chantier sur la page <Link href="/contact/">contact</Link>, nous recueillons :</p>
            <ul>
              <li><strong>votre bâtiment et votre besoin</strong> : type de bâtiment, prestation souhaitée, surface approximative, matériau, hauteur, état de la surface, conditions d’accès ;</li>
              <li><strong>sa localisation</strong> : code postal, commune et, si vous la donnez, l’adresse du chantier ;</li>
              <li><strong>vos coordonnées</strong> : nom, téléphone, adresse e-mail ;</li>
              <li><strong>votre message</strong>, facultatif ;</li>
              <li><strong>vos photos</strong>, facultatives (voir ci-dessous).</li>
            </ul>
            <p>Pour protéger le service contre les abus, l’adresse IP de l’expéditeur est utilisée de façon temporaire afin de limiter le nombre d’envois successifs. Elle n’est pas associée à votre demande ni conservée avec elle. Les journaux techniques du site n’enregistrent pas le contenu de votre demande.</p>
            <p>Une note préliminaire est générée automatiquement à partir de vos réponses (par exemple, un point d’attention sur la hauteur ou le matériau) pour faciliter l’étude. Elle ne constitue pas une décision automatisée : chaque demande est examinée par une personne.</p>

            <h2>Photos transmises</h2>
            <p>Les photos que vous joignez servent uniquement à étudier la faisabilité et à préparer le devis. Nous vous recommandons de cadrer sur le bâtiment et d’éviter de photographier des personnes, des plaques d’immatriculation ou les propriétés voisines.</p>
            <p>Vos photos ne sont jamais publiées. Les photos prises pendant un chantier (avant / après) ne sont publiées sur le site qu’avec votre accord écrit, sans visage, plaque ni adresse lisible, et en floutant les propriétés voisines.</p>

            <h2>Finalités et base légale</h2>
            <p>Vos données sont utilisées pour étudier votre demande, établir un devis, vous recontacter à ce sujet et, si vous devenez client, organiser et documenter l’intervention.</p>
            <p>Ce traitement repose sur l’exécution de <strong>mesures précontractuelles prises à votre demande</strong> (article 6.1.b du RGPD), puis sur l’exécution du contrat si vous acceptez le devis. La case à cocher du formulaire confirme que vous acceptez que vos informations soient utilisées à cette fin. La conservation des factures repose sur une <strong>obligation légale</strong> (article 6.1.c).</p>
            <p>Nous n’utilisons pas vos coordonnées pour de la prospection commerciale sans votre accord, et nous ne les vendons ni ne les louons à quiconque.</p>

            <h2>Durées de conservation</h2>
          </div>
          <div className="pb-table-wrap prose" style={{ maxWidth: 'none' }}>
            <table>
              <caption className="sr-only">Durées de conservation proposées</caption>
              <thead><tr><th scope="col">Situation</th><th scope="col">Données</th><th scope="col">Durée proposée</th></tr></thead>
              <tbody>{retention.map(([a, b, c]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td></tr>)}</tbody>
            </table>
          </div>

          <div className="prose">
            <h2>Destinataires</h2>
            <p>Vos données sont destinées à l’équipe {site.name} chargée de l’étude et de l’intervention. Elles transitent par des prestataires techniques qui agissent pour notre compte (sous-traitants au sens du RGPD) :</p>
            <ul>
              <li><strong>Resend</strong>, service d’envoi d’e-mails : votre demande et vos photos nous sont transmises par e-mail via ce service. Resend est une société établie aux États-Unis ; les garanties encadrant ce transfert hors de l’Union européenne <Todo label="à vérifier" /> seront précisées ici.</li>
              <li><strong>L’hébergeur du site</strong> : Vercel Inc. <Todo label="proposition, à confirmer" />.</li>
              <li><strong>Notre messagerie professionnelle</strong>, où les demandes sont reçues : <Todo />.</li>
            </ul>
            <p>Si votre chantier nécessite l’intervention d’un couvreur, nous vous communiquons ses coordonnées : nous ne lui transmettons les vôtres qu’avec votre accord.</p>

            <h2>Sécurité</h2>
            <p>Le site est servi en HTTPS. Les fichiers envoyés sont contrôlés (type réel, nombre et taille) avant d’être transmis. L’accès aux demandes est limité aux personnes qui en ont besoin pour les traiter.</p>

            <h2>Images captées par le drone</h2>
            <p>Pendant une intervention, la caméra du drone sert au pilotage, au contrôle du travail et au rapport photo. Elle est cadrée sur le bâtiment traité. Les images sont utilisées uniquement pour le diagnostic et le compte rendu de votre chantier, et conservées selon les durées indiquées ci-dessus.</p>

            <h2>Vérification de la zone d’intervention</h2>
            <p>Lorsque vous saisissez un code postal dans l’outil de vérification de zone, ce code est envoyé à l’API Découpage administratif (geo.api.gouv.fr), service public de l’État, afin de retrouver la commune correspondante. Aucune autre information n’est transmise, et rien n’est conservé par {site.name}.</p>

            <h2>Mesure d’audience</h2>
            <p>Si elle est activée, la mesure d’audience du site est assurée par <strong>Plausible Analytics</strong>, un outil qui ne dépose aucun cookie et n’utilise pas d’identifiant persistant. Il produit des statistiques agrégées (pages vues, provenance, type d’appareil) qui ne permettent pas de vous identifier. Le détail figure sur la page <Link href="/cookies/">cookies</Link>.</p>

            <h2>Vos droits</h2>
            <p>Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données, ainsi que du droit de définir des directives sur leur sort après votre décès. Pour les exercer, écrivez-nous à {contact}. Nous vous répondrons dans un délai d’un mois au plus.</p>
            <p>Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL : <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">www.cnil.fr/fr/plaintes</a>.</p>

            <p className="pb-updated">Dernière mise à jour : <time dateTime="2026-11-25">25 novembre 2026</time></p>
          </div>
        </div>
      </section>
    </>
  );
}
