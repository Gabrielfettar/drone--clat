import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Faq, type FaqItem } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { site, isKnown } from '@/config/site';
import '../pages-a.css';

/**
 * Rédigée à partir de docs/regulation.md (sources consultées le 25/11/2026).
 * À FAIRE VALIDER avant mise en ligne (DSAC, juriste) : tant que ce n'est pas fait,
 * la page affiche un bandeau d'avertissement et n'est pas indexée.
 * Après validation : retirer `robots` ci-dessous et passer REVIEWED à true.
 */
const REVIEWED = false;

export const metadata: Metadata = {
  title: 'Sécurité et réglementation des vols de drone',
  description: 'Catégorie spécifique, démarches de vol, balisage, eau, biocide ou phytosanitaire : le cadre du nettoyage par drone et nos engagements, sources officielles.',
  alternates: { canonical: '/securite-reglementation/' },
  ...(REVIEWED ? {} : { robots: { index: false, follow: true } }),
};

const CONTACT = '/contact/?service=demoussage-toiture-drone';
const CHECKED = '25 novembre 2026';

const sources: { label: string; href: string; note: string }[] = [
  { label: 'Règlement d’exécution (UE) 2019/947, version consolidée', href: 'https://eur-lex.europa.eu/eli/reg_impl/2019/947/2025-05-01/eng/pdf', note: 'EUR-Lex · règles d’exploitation des drones, catégories ouverte et spécifique, STS-01' },
  { label: 'Exploitation de drones en catégorie spécifique', href: 'https://www.ecologie.gouv.fr/politiques-publiques/exploitation-drones-categorie-specifique', note: 'Ministère chargé des transports, DGAC' },
  { label: 'Exploitation de drones en catégorie ouverte', href: 'https://www.ecologie.gouv.fr/politiques-publiques/exploitation-drones-categorie-ouverte', note: 'Ministère chargé des transports, DGAC' },
  { label: 'Fiche réflexe : catégorie spécifique', href: 'https://www.ecologie.gouv.fr/sites/default/files/documents/Fiche_reflexe_specifique.pdf', note: 'DGAC · démarches et notification préalable' },
  { label: 'AlphaTango, portail des exploitants de drones', href: 'https://alphatango.aviation-civile.gouv.fr', note: 'DGAC · enregistrement, déclarations, notifications' },
  { label: 'Géoportail, carte des restrictions pour les drones', href: 'https://www.geoportail.gouv.fr', note: 'IGN et DGAC · zones interdites ou réglementées' },
  { label: 'Question écrite n° 06232 et réponse du ministère', href: 'https://www.senat.fr/questions/base/2025/qSEQ251006232.html', note: 'Sénat · fin des scénarios nationaux au 1er janvier 2026' },
  { label: 'Produits biocides', href: 'https://www.ecologie.gouv.fr/politiques-publiques/produits-biocides', note: 'Ministère de la Transition écologique' },
  { label: 'Notice explicative Certibiocide (mai 2025)', href: 'https://draaf.paca.agriculture.gouv.fr/IMG/pdf/notice_explicative_certibiocide_mai_2025.pdf', note: 'Ministère · certificat des utilisateurs professionnels de biocides' },
  { label: 'Précisions réglementaires sur l’usage des produits (avril 2023)', href: 'https://www.grand-est.ars.sante.fr/media/109431/download', note: 'ARS Grand Est · distinction phytopharmaceutiques et biocides' },
  { label: 'Drones agricoles : publication des textes d’application', href: 'https://agriculture.gouv.fr/protection-des-cultures-publication-des-textes-autorisant-lutilisation-de-drones-pour-lapplication', note: 'Ministère de l’Agriculture · dérogations limitées aux parcelles agricoles' },
  { label: 'Extension de la loi Labbé au 1er juillet 2022', href: 'https://draaf.occitanie.agriculture.gouv.fr/IMG/pdf/flyer_extension_loi_labbe-v6.pdf', note: 'DRAAF Occitanie · produits phytopharmaceutiques dans les lieux d’habitation' },
  { label: 'Caméras aéroportées', href: 'https://www.cnil.fr/sites/default/files/2025-06/annexe_4_cameras_aeroportees.pdf', note: 'CNIL · vie privée et images captées par drone' },
];

const faq: FaqItem[] = [
  { q: 'Le nettoyage par drone est-il autorisé en France ?', a: 'Oui, dans un cadre précis. Projeter de l’eau depuis un drone est considéré comme un largage de matière : cela relève de la catégorie « spécifique », avec une déclaration ou une autorisation adaptée, un exploitant enregistré et un télépilote formé. Les conditions exactes dépendent du drone et de l’opération.' },
  { q: 'Pourquoi faut-il un délai avant l’intervention ?', a: 'En zone habitée, un vol professionnel doit être notifié à l’avance à la préfecture du département, qui peut l’interdire ou le restreindre. En pratique, comptez environ deux semaines de délai administratif selon la commune.' },
  { q: 'Pouvez-vous voler partout dans l’Oise ?', a: 'Non. Certaines zones sont interdites ou réglementées, par exemple aux abords des aéroports et aérodromes ou de sites sensibles. Nous vérifions la carte des restrictions pour chaque adresse dès l’étude.' },
  { q: 'Utilisez-vous des produits phytosanitaires ?', a: 'Non. La pulvérisation aérienne de produits phytopharmaceutiques est interdite sur les toitures et les bâtiments, et ces produits sont aussi interdits dans les propriétés à usage d’habitation, sauf exceptions qui ne concernent pas notre activité.' },
  { q: 'Mes voisins doivent-ils être prévenus ?', a: 'Le périmètre de vol doit rester libre de toute personne non impliquée. Selon la configuration, nous informons les voisins à l’avance et leur demandons de ne pas entrer dans la zone balisée pendant le vol.' },
  { q: 'Comment vérifier le sérieux d’un prestataire drone ?', a: 'Demandez son numéro d’exploitant, le cadre de ses opérations (déclaration ou autorisation), les qualifications du télépilote, une attestation d’assurance qui couvre explicitement l’activité drone et, en cas de traitement, le nom et le type exact du produit.' },
];

export default function SecuriteReglementationPage() {
  const proofs = [
    { t: 'Numéro d’exploitant UAS', d: 'Enregistrement de l’exploitant auprès de la DGAC, sur AlphaTango.', known: isKnown(site.operatorId), value: site.operatorId.value, pending: 'À communiquer' },
    { t: 'Qualification du télépilote', d: 'Certificat théorique et formation pratique exigés pour le cadre d’exploitation retenu.', known: false, value: '', pending: 'À communiquer' },
    { t: 'Cadre d’exploitation', d: 'Déclaration selon un scénario standard européen ou autorisation d’exploitation de la DSAC, selon le drone utilisé.', known: false, value: '', pending: 'En cours de définition' },
    { t: 'Assurance responsabilité civile', d: 'Police professionnelle couvrant explicitement l’activité drone et ses risques propres.', known: isKnown(site.insurer), value: site.insurer.value, pending: 'À fournir' },
  ];

  return (
    <div className="pa">
      {!REVIEWED && (
        <div className="container pa-warning">
          <p className="notice notice--warning" role="note">
            <strong>Page en cours de validation.</strong>
            <span>Ce contenu résume notre lecture de la réglementation à la date du {CHECKED}. Il doit être relu et validé (autorité de l’aviation civile, juriste) avant mise en ligne. Il ne constitue pas un avis juridique.</span>
          </p>
        </div>
      )}

      <PageHero
        crumbs={[{ href: '/securite-reglementation/', label: 'Sécurité et réglementation' }]}
        eyebrow="Sécurité · Réglementation"
        title="Sécurité et réglementation : nos engagements"
        lede="Un drone qui nettoie un bâtiment n’est pas un drone de loisir. Voici le cadre qui s’applique, expliqué simplement, ce que nous faisons à chaque chantier, et les sources officielles pour vérifier par vous-même."
      >
        <div className="cta-row">
          <Link className="btn btn--ghost" href="#produits">Eau, biocide ou phyto ?</Link>
          <Link className="link-arrow" href="#sources">Sources officielles <span aria-hidden="true">→</span></Link>
        </div>
      </PageHero>

      {/* Définition + engagements */}
      <section className="section" aria-labelledby="engagements">
        <div className="container layout-aside">
          <div className="pa-stack">
            <p className="answer" data-reveal><span className="mono">En bref</span>Nettoyer un bâtiment par drone relève de la catégorie « spécifique » de la réglementation européenne des drones : projeter de l’eau est un largage de matière, interdit en catégorie ouverte. L’opération exige donc un exploitant enregistré, un télépilote formé, une déclaration ou une autorisation adaptée et, en zone habitée, une notification préalable à la préfecture.</p>

            <div className="pa-block" data-reveal>
              <span className="eyebrow">Engagements</span>
              <h2 id="engagements" className="h-1">Ce que nous faisons à chaque chantier.</h2>
              <ul className="ticks" style={{ fontSize: 'var(--t-md)', gap: 'var(--s-3)' }}>
                <li><strong>Une étude préalable</strong> : zones aériennes, accès, obstacles, état du support et sécurité du chantier.</li>
                <li><strong>Les démarches de vol</strong> : notification en préfecture lorsque la réglementation l’exige, avec le délai correspondant intégré au planning.</li>
                <li><strong>Un périmètre balisé</strong> au sol, maintenu libre de toute personne non impliquée pendant le vol.</li>
                <li><strong>Un télépilote au sol</strong>, qui garde le drone à vue pendant toute l’intervention.</li>
                <li><strong>Un report sans discussion</strong> si le vent, la pluie ou l’environnement ne permettent pas un vol sûr.</li>
                <li><strong>L’information du voisinage</strong> lorsque la configuration le demande.</li>
                <li><strong>Une caméra cadrée sur le chantier</strong>, des images utilisées uniquement pour le diagnostic et le compte rendu.</li>
              </ul>
            </div>

            <div className="pa-block" data-reveal>
              <h2 className="h-2">Nos justificatifs</h2>
              <p className="muted">Nous ne présentons comme acquis que ce que nous pouvons prouver. Les éléments en pointillés sont en cours d’obtention et seront communiqués sur demande dès qu’ils seront disponibles.</p>
              <ul className="pa-docs">
                {proofs.map((p) => (
                  <li key={p.t}>
                    <div><strong>{p.t}</strong><p>{p.known ? `${p.d} Référence : ${p.value}.` : p.d}</p></div>
                    <span>{p.known ? <span className="pa-status">Disponible</span> : <span className="pending-tag">{p.pending}</span>}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="aside-card" aria-label="Sommaire">
            <p className="mono muted">Sur cette page</p>
            <ol className="pa-aside-list">
              <li><span className="mono">01</span><a href="#engagements">Nos engagements</a></li>
              <li><span className="mono">02</span><a href="#cadre">Le cadre aérien</a></li>
              <li><span className="mono">03</span><a href="#produits">Eau, biocide, phytosanitaire</a></li>
              <li><span className="mono">04</span><a href="#environnement">Amiante, eau, voisinage</a></li>
              <li><span className="mono">05</span><a href="#sources">Sources officielles</a></li>
            </ol>
            <hr className="pa-aside-sep" />
            <Link className="link-arrow" href="/technologie/">Matériel et limites <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>

      {/* Cadre aérien */}
      <section className="section section--mist" aria-labelledby="cadre">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Cadre aérien</span><h2 id="cadre" className="h-1">Ce que dit la réglementation des drones.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Ce sont les règles européennes qui s’appliquent en France : les anciens scénarios nationaux français ont été abrogés au 1er janvier 2026.</p>
          </div>
          <ul className="pa-pillars">
            <li data-reveal>
              <span className="mono">01 · Catégorie</span>
              <h3 className="h-3">Une opération « spécifique »</h3>
              <p className="muted">La catégorie ouverte interdit tout largage de matière depuis un drone, eau comprise. Le nettoyage par drone relève donc de la catégorie spécifique : soit une déclaration selon un scénario standard européen (STS-01, sous conditions de drone et de masse), soit une autorisation d’exploitation délivrée par la DSAC après analyse des risques.</p>
            </li>
            <li data-reveal style={{ ['--i' as string]: 1 }}>
              <span className="mono">02 · Exploitant et télépilote</span>
              <h3 className="h-3">Des acteurs identifiés</h3>
              <p className="muted">L’exploitant doit être enregistré auprès de la DGAC et disposer d’un manuel d’exploitation. Le télépilote doit détenir les qualifications exigées par le cadre retenu, dont un certificat théorique et une formation pratique.</p>
            </li>
            <li data-reveal style={{ ['--i' as string]: 2 }}>
              <span className="mono">03 · Notification</span>
              <h3 className="h-3">Un préavis en zone habitée</h3>
              <p className="muted">Un vol en agglomération ou à proximité doit être notifié à l’avance au préfet du département, qui peut l’interdire ou le restreindre. Comptez environ deux semaines de délai administratif selon la commune.</p>
            </li>
            <li data-reveal style={{ ['--i' as string]: 3 }}>
              <span className="mono">04 · Espace aérien</span>
              <h3 className="h-3">Des zones à vérifier</h3>
              <p className="muted">Abords d’aéroports et d’aérodromes, emprises militaires, zones interdites à la prise de vue : la carte des restrictions est consultée pour chaque adresse. Certaines interventions sont impossibles, et nous le disons.</p>
            </li>
          </ul>
          <p className="hint muted cmp-note" data-reveal>Le drone relié au sol par un tuyau reste un aéronef soumis à ces règles. Sa qualification exacte (drone captif ou non) et le cadre applicable sont en cours de validation avec l’autorité compétente.</p>
        </div>
      </section>

      {/* Produits */}
      <section className="section" aria-labelledby="produits">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Produits</span><h2 id="produits" className="h-1">Eau, biocide ou phytosanitaire : trois régimes différents.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Ce que le drone projette change tout. Chaque catégorie de produit a ses propres règles, qu’on ne peut pas transposer de l’une à l’autre.</p>
          </div>
          <div className="cards">
            <article className="card pa-kind pa-kind--ok" data-reveal>
              <div className="pa-card-head"><span className="mono">Eau seule</span><span className="pa-verdict">Notre méthode de base</span></div>
              <h3 className="h-3">Le nettoyage à l’eau</h3>
              <p className="muted">Sans additif, l’eau n’est soumise à aucun régime de produit. Restent les règles de vol de la catégorie spécifique et celles sur les eaux de ruissellement.</p>
              <ul className="ticks"><li>Aucun produit sur votre toiture ou votre façade.</li><li>Mesures pour limiter le ruissellement vers le réseau pluvial.</li></ul>
            </article>
            <article className="card pa-kind pa-kind--cond" data-reveal style={{ ['--i' as string]: 1 }}>
              <div className="pa-card-head"><span className="mono">Biocide</span><span className="pa-verdict">Sous conditions</span></div>
              <h3 className="h-3">Le traitement anti-mousse</h3>
              <p className="muted">La plupart des anti-mousses de toiture sont des produits biocides. Aucune interdiction générale de pulvérisation aérienne des biocides n’a été identifiée, mais ce n’est pas une autorisation pour autant.</p>
              <ul className="dashes">
                <li>Le produit doit être utilisé conformément à son autorisation et à son étiquette, qui ne prévoit pas toujours une application par drone.</li>
                <li>Certains produits exigent un applicateur titulaire du Certibiocide.</li>
                <li>Le transport d’un produit dangereux par drone peut changer le cadre aérien applicable.</li>
              </ul>
              <p className="muted">Tant que ces points ne sont pas validés pour un produit donné, nous ne le pulvérisons pas par drone ; une application au sol ou manuelle peut être proposée.</p>
            </article>
            <article className="card pa-kind pa-kind--no" data-reveal style={{ ['--i' as string]: 2 }}>
              <div className="pa-card-head"><span className="mono">Phytosanitaire</span><span className="pa-verdict">Interdit</span></div>
              <h3 className="h-3">Herbicides et pesticides</h3>
              <p className="muted">La pulvérisation aérienne de produits phytopharmaceutiques est interdite. Les rares dérogations récentes concernent uniquement certaines parcelles agricoles, jamais les toitures, façades ou bâtiments.</p>
              <ul className="dashes"><li>Ces produits sont aussi interdits dans les propriétés à usage d’habitation, sauf exceptions.</li><li>Nous n’en utilisons pas.</li></ul>
            </article>
          </div>
          <p className="hint muted cmp-note" data-reveal>Hydrofuges et nettoyants : un produit qui revendique un effet anti-mousse ou anti-verdissure est un biocide, et suit les règles ci-dessus. Lorsqu’un produit est proposé, son nom et son type figurent dans le devis.</p>
        </div>
      </section>

      {/* Environnement, amiante, voisinage, vie privée */}
      <section className="section section--mist" aria-labelledby="environnement">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Autour du chantier</span><h2 id="environnement" className="h-1">Amiante, eau, voisinage, images.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Le vol n’est qu’une partie du sujet. Ce qui se passe au sol et autour du bâtiment est tout aussi encadré.</p>
          </div>
          <div className="cards">
            <article className="card" data-reveal><span className="mono">Amiante</span><h3 className="h-3">Fibrociment ancien</h3><p className="muted">Un nettoyage agressif peut libérer des fibres d’amiante. Nous n’utilisons aucun procédé abrasif sur le fibrociment et demandons un repérage amiante avant toute intervention sur des plaques anciennes. À défaut, nous déclinons le chantier.</p></article>
            <article className="card" data-reveal style={{ ['--i' as string]: 1 }}><span className="mono">Eaux de rinçage</span><h3 className="h-3">Limiter le ruissellement</h3><p className="muted">Les eaux de rinçage rejoignent gouttières et réseau pluvial. Nous prenons des mesures pour limiter le ruissellement et protéger végétaux, bassins, puits et récupérateurs d’eau de pluie. Les règles locales d’assainissement s’appliquent.</p></article>
            <article className="card" data-reveal style={{ ['--i' as string]: 2 }}><span className="mono">Voisinage</span><h3 className="h-3">Information et horaires</h3><p className="muted">Le périmètre doit être libre de tiers : nous informons les voisins si nécessaire et respectons les horaires fixés localement pour les activités bruyantes.</p></article>
            <article className="card" data-reveal style={{ ['--i' as string]: 3 }}><span className="mono">Vie privée</span><h3 className="h-3">Images captées</h3><p className="muted">La caméra est cadrée sur le bâtiment traité. Aucune image d’intérieur ou de propriété voisine n’est exploitée, et aucune photo n’est publiée sans accord écrit, visages, plaques et adresses masqués.</p></article>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="section" id="sources" aria-labelledby="sources-title">
        <div className="container layout-aside">
          <div className="pa-block">
            <span className="eyebrow" data-reveal>Sources</span>
            <h2 id="sources-title" className="h-1" data-reveal>Vérifiez par vous-même.</h2>
            <p className="lede" data-reveal>Sources officielles consultées le {CHECKED}. La réglementation évolue : en cas de doute, ce sont les textes et les autorités qui font foi.</p>
            <ul className="pa-sources" data-reveal>
              {sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}<span className="sr-only"> (nouvel onglet)</span></a>
                  <span className="muted">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="aside-card" aria-label="Une question sur votre chantier">
            <p className="mono muted">Votre chantier</p>
            <p className="h-3">Une contrainte particulière ?</p>
            <p className="muted">Proximité d’un aérodrome, rue passante, bâtiment d’élevage, fibrociment : décrivez-la, nous vérifions la faisabilité dès l’étude.</p>
            <Link className="btn" href={CONTACT} data-track="reg_aside_devis">Demander une étude <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--mist" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal>
            <span className="eyebrow">Questions fréquentes</span>
            <h2 id="faq-title" className="h-1">Réglementation : vos questions.</h2>
            <Link className="link-arrow" href="/zones-intervention/">Zones d’intervention <span aria-hidden="true">→</span></Link>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      {/* Maillage */}
      <section className="section pa-related" aria-labelledby="more-title">
        <div className="container pa-block">
          <h2 id="more-title" className="h-2" data-reveal>Pour aller plus loin</h2>
          <div className="cards">
            <Link href="/technologie/" className="card" data-reveal><span className="mono">Méthode</span><h3 className="h-3">Matériel et limites</h3><p className="muted">Ce que le drone fait, et ce qu’il ne fait pas.</p><span className="link-arrow">Lire <span aria-hidden="true">→</span></span></Link>
            <Link href="/services/demoussage-toiture-drone/" className="card" data-reveal style={{ ['--i' as string]: 1 }}><span className="mono">Prestation</span><h3 className="h-3">Démoussage de toiture</h3><p className="muted">Nettoyage à l’eau, sans passage sur la couverture.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
            <Link href="/professionnels/entretien-batiments/" className="card" data-reveal style={{ ['--i' as string]: 2 }}><span className="mono">Professionnels</span><h3 className="h-3">Documents de sécurité</h3><p className="muted">Analyse des risques, plan de prévention, planning par secteurs.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Un chantier préparé, des démarches anticipées."
        text="Décrivez votre bâtiment : nous vérifions l’espace aérien et les contraintes du site, et intégrons le délai des démarches au planning proposé dans le devis."
        cta="Demander une étude gratuite"
        href={CONTACT}
      />
    </div>
  );
}
