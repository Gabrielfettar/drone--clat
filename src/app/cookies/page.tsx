import Link from 'next/link';
import type { Metadata } from 'next';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Cookies et stockage local',
  description: 'Le site Drone Éclat ne dépose aucun cookie de traçage. Seule la liste de préparation est mémorisée dans votre navigateur. Mesure d’audience sans cookie.',
  alternates: { canonical: '/cookies/' },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/cookies/', label: 'Cookies' }]}
        eyebrow="Informations légales"
        title="Cookies et stockage local"
        lede="Pas de cookie publicitaire, pas de pixel de réseau social, pas de bandeau à accepter. Voici précisément ce que le site enregistre, et pourquoi."
      />

      <section className="section">
        <div className="container pb-legal">
          <p className="notice notice--warning" role="note">
            Document provisoire, à faire valider par un juriste avant la mise en ligne, notamment la configuration de la mesure d’audience au regard des recommandations de la CNIL.
          </p>

          <div className="prose">
            <h2>Aucun cookie de traçage</h2>
            <p>Le site Drone Éclat ne dépose aucun cookie publicitaire, de profilage ou de suivi entre sites. Il n’intègre ni bouton de partage, ni vidéo, ni carte de services tiers susceptibles d’en déposer. C’est pourquoi aucun bandeau de consentement ne s’affiche.</p>

            <h2>Ce qui est enregistré sur votre appareil</h2>
          </div>
          <div className="pb-table-wrap prose" style={{ maxWidth: 'none' }}>
            <table>
              <caption className="sr-only">Éléments enregistrés par le site</caption>
              <thead><tr><th scope="col">Nom</th><th scope="col">Type</th><th scope="col">Finalité</th><th scope="col">Durée</th></tr></thead>
              <tbody>
                <tr>
                  <th scope="row"><code>de-prep</code></th>
                  <td>Stockage local du navigateur (localStorage)</td>
                  <td>Mémoriser les cases que vous cochez dans la liste « Six choses à préparer avant notre passage ».</td>
                  <td>Jusqu’à ce que vous effaciez les données du site dans votre navigateur</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose">
            <p>Cette donnée reste sur votre appareil : elle n’est jamais envoyée à nos serveurs ni à un tiers. Elle n’est créée que si vous cochez une case, et elle sert uniquement le service que vous utilisez. À ce titre, elle ne nécessite pas de consentement préalable.</p>
            <p>Pour la supprimer, effacez les données de navigation du site dans les réglages de votre navigateur (rubrique « cookies et données de site »).</p>

            <h2>Mesure d’audience sans cookie</h2>
            <p>Si elle est activée, la fréquentation du site est mesurée avec <strong>Plausible Analytics</strong>. Cet outil ne dépose aucun cookie, n’enregistre rien sur votre appareil et n’utilise pas d’identifiant persistant. Il produit des statistiques agrégées (pages consultées, site de provenance, type d’appareil, clics sur certains boutons comme « Demander une étude ») qui ne permettent pas de vous identifier ni de vous suivre d’un site à l’autre.</p>

            <h2>Formulaire de devis</h2>
            <p>Le formulaire de demande d’étude ne dépose pas de cookie. Les informations que vous y saisissez sont envoyées uniquement lorsque vous validez votre demande. Leur traitement est décrit dans la <Link href="/confidentialite/">politique de confidentialité</Link>.</p>

            <h2>Si cela change</h2>
            <p>Si nous ajoutons un jour un service qui dépose des cookies non indispensables, nous mettrons cette page à jour et nous vous demanderons votre accord avant tout dépôt, avec la possibilité de refuser aussi simplement que d’accepter.</p>

            <p className="pb-updated">Dernière mise à jour : <time dateTime="2026-11-25">25 novembre 2026</time></p>
          </div>
        </div>
      </section>
    </>
  );
}
