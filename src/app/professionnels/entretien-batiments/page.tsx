import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Faq, type FaqItem } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { site, isKnown } from '@/config/site';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import '../../pages-a.css';

export const metadata: Metadata = {
  title: 'Bâtiments professionnels : entretien par drone',
  description: 'Toitures, façades et bardages d’entrepôts, copropriétés, exploitations agricoles : entretien par drone, planning par secteurs, documents de sécurité.',
  alternates: { canonical: '/professionnels/entretien-batiments/' },
};

const CONTACT = '/contact/?batiment=pro';

const audiences = [
  { label: 'Syndics et gestionnaires', title: 'Copropriétés et parcs immobiliers', text: 'Un devis comparable à joindre au dossier d’assemblée générale, un planning annoncé aux résidents et un rapport photo daté pour le carnet d’entretien.' },
  { label: 'Responsables techniques', title: 'Entreprises, commerces, logistique', text: 'Bardages et toitures d’entrepôts, de bureaux ou de surfaces commerciales, traités sans nacelle sur le parking et sans arrêter l’activité.' },
  { label: 'Exploitations agricoles', title: 'Hangars, stabulations, silos', text: 'De grandes surfaces souvent en bac acier ou en fibrociment, avec un calendrier qui tient compte des animaux, des récoltes et des travaux des champs.' },
  { label: 'Collectivités', title: 'Bâtiments publics', text: 'Écoles, salles, équipements sportifs ou techniques : un devis formel, des créneaux adaptés à l’occupation et un périmètre de sécurité balisé.' },
];

const faq: FaqItem[] = [
  { q: 'Pouvez-vous intervenir sans interrompre notre activité ?', a: 'Dans la plupart des cas, oui. Le chantier est découpé en secteurs : seule la zone en cours de traitement est balisée et interdite au passage. Les accès principaux, quais ou entrées sont planifiés avec vous, y compris sur des créneaux hors des heures d’ouverture.' },
  { q: 'Fournissez-vous un plan de prévention ?', a: 'Sur un site où plusieurs entreprises interviennent, le plan de prévention est établi avec vous, en tant qu’entreprise utilisatrice. Nous apportons notre analyse des risques propres au vol et au chantier, et respectons les consignes de votre site.' },
  { q: 'Pouvez-vous intervenir sur des plaques en fibrociment ?', a: 'Sur étude seulement, et sans aucun procédé abrasif. Si les plaques sont anciennes, un repérage amiante doit être disponible avant toute intervention. Si le support ne s’y prête pas, nous le disons et déclinons le chantier.' },
  { q: 'Proposez-vous des contrats d’entretien ?', a: 'Un contrat pluriannuel est possible sur étude, pour des sites qui demandent un entretien régulier : périmètre, fréquence et modalités sont définis avec vous. Il n’y a pas de formule standard imposée.' },
  { q: 'Avez-vous des références sur des bâtiments professionnels ?', a: 'Drone Éclat démarre son activité. Nos premières références sont en cours : plutôt que d’en inventer, nous publierons chaque chantier documenté, avec l’accord du client. Vous pouvez en attendant demander une étude détaillée de votre site.' },
];

export default function ProfessionnelsPage() {
  const insurerKnown = isKnown(site.insurer);
  const operatorKnown = isKnown(site.operatorId);

  const docs = [
    { t: 'Devis détaillé', d: 'Surfaces, méthode, durée, conditions météo et démarches incluses, pour comparer ou présenter en assemblée générale.', status: <span className="pa-status">À chaque étude</span> },
    { t: 'Analyse des risques du chantier', d: 'Zone de vol, balisage, accès, coactivité : document établi pour votre site, à intégrer à votre plan de prévention.', status: <span className="pa-status">Sur demande</span> },
    { t: 'Plan de prévention', d: 'Établi avec vous lorsque votre site l’exige, selon vos consignes internes.', status: <span className="pa-status">Sur demande</span> },
    { t: 'Attestation d’assurance', d: 'Responsabilité civile professionnelle couvrant l’activité drone.', status: insurerKnown ? <span className="pa-status">Fournie</span> : <span className="pending-tag">À fournir</span> },
    { t: 'Justificatifs de l’exploitant drone', d: 'Numéro d’exploitant UAS et qualifications du télépilote.', status: operatorKnown ? <span className="pa-status">Fournis</span> : <span className="pending-tag">À communiquer</span> },
    { t: 'Planning par secteurs', d: 'Ordre de passage, zones balisées et horaires, à diffuser à vos équipes ou aux occupants.', status: <span className="pa-status">Avec le devis</span> },
    { t: 'Rapport photo', d: 'Photos avant / après datées et observations sur l’état des surfaces.', status: <span className="pa-status">En fin de chantier</span> },
  ];

  return (
    <div className="pa">
      <PageHero
        crumbs={[{ href: '/professionnels/entretien-batiments/', label: 'Professionnels' }]}
        eyebrow="Professionnels · Oise"
        title="Entretien de bâtiments professionnels par drone"
        lede="Toitures, façades et bardages de grands bâtiments nettoyés depuis le sol, secteur par secteur. Pas de nacelle sur le parking, pas de travail en hauteur pour vos équipes, et les documents attendus par un service technique."
        aside={
          <figure className="pa-figure">
            <div className="pa-frame">
              <Image src="/illustrations/cladding.webp" alt="Illustration 3D d’un bâtiment d’activité à bardage métallique" fill priority sizes="(max-width: 900px) 100vw, 40vw" />
              <span className="pending-tag">Illustration 3D</span>
            </div>
            <figcaption className="pa-cap">Visuel d’illustration, en attendant les photos de nos premiers chantiers.</figcaption>
          </figure>
        }
      >
        <div className="cta-row">
          <Link className="btn" href={CONTACT} data-track="pro_hero_devis">Demander une étude de site <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link className="btn btn--ghost" href="#documents">Documents fournis</Link>
        </div>
      </PageHero>

      {/* Définition + publics */}
      <section className="section" aria-labelledby="pour-qui">
        <div className="container pa-stack">
          <div className="pa-lead-stack" data-reveal>
            <p className="answer"><span className="mono">En bref</span>L’entretien de bâtiments professionnels par drone consiste à nettoyer toitures, façades et bardages de grands bâtiments avec un drone relié à une unité de pompage au sol, piloté à vue par un télépilote : personne ne travaille en hauteur et le site reste en activité.</p>
          </div>
          <div className="pa-block">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <div data-reveal><span className="eyebrow">Pour qui</span><h2 id="pour-qui" className="h-1">Quatre publics, un même besoin : entretenir sans immobiliser.</h2></div>
              <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Chaque site a ses contraintes. Nous les relevons pendant l’étude et construisons le planning autour d’elles.</p>
            </div>
            <div className="cards">
              {audiences.map((a, k) => (
                <article key={a.label} className="card" data-reveal style={{ ['--i' as string]: k }}>
                  <span className="mono">{a.label}</span>
                  <h3 className="h-3">{a.title}</h3>
                  <p className="muted">{a.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enjeux */}
      <section className="section section--ink" aria-labelledby="enjeux">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Vos enjeux</span><h2 id="enjeux" className="h-1">Sécurité, continuité, traçabilité.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Le drone ne supprime pas les risques d’un chantier ; il les déplace au sol, où ils se maîtrisent mieux.</p>
          </div>
          <ul className="pa-pillars">
            <li data-reveal>
              <span className="mono">01 · Sécurité</span>
              <h3 className="h-3">Personne en hauteur</h3>
              <p className="muted">Le télépilote et l’équipe restent au sol. La zone de vol est balisée et doit rester libre de toute personne non impliquée pendant le vol. Le vol est reporté si le vent ou la pluie l’exigent.</p>
            </li>
            <li data-reveal style={{ ['--i' as string]: 1 }}>
              <span className="mono">02 · Continuité</span>
              <h3 className="h-3">Le site continue de tourner</h3>
              <p className="muted">Découpage en secteurs, déplacement du balisage au fil du chantier, créneaux tôt le matin ou hors ouverture lorsque c’est possible. Pas de nacelle à faire circuler entre les bâtiments.</p>
            </li>
            <li data-reveal style={{ ['--i' as string]: 2 }}>
              <span className="mono">03 · Traçabilité</span>
              <h3 className="h-3">Un dossier complet</h3>
              <p className="muted">Devis détaillé, analyse des risques, planning et rapport photo daté : de quoi justifier l’intervention auprès d’une direction, d’un conseil syndical ou d’un assureur.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Documents */}
      <section className="section" id="documents" aria-labelledby="docs-title">
        <div className="container layout-aside">
          <div className="pa-stack">
            <div className="pa-block" data-reveal>
              <span className="eyebrow">Documents</span>
              <h2 id="docs-title" className="h-1">Ce que nous vous remettons.</h2>
              <p className="lede">Les pièces qu’un service technique, un syndic ou un service HSE nous demande le plus souvent. Les mentions en pointillés signalent un document en cours d’obtention, que nous ne présentons pas comme acquis.</p>
            </div>
            <ul className="pa-docs" data-reveal>
              {docs.map((d) => (
                <li key={d.t}>
                  <div><strong>{d.t}</strong><p>{d.d}</p></div>
                  <span>{d.status}</span>
                </li>
              ))}
            </ul>
            <div className="pa-block" data-reveal>
              <h2 className="h-2">Contrat d’entretien pluriannuel</h2>
              <p>Pour un parc de bâtiments ou un site qui se salit vite (abords boisés, élevage, zone humide), un contrat pluriannuel est possible sur étude. Nous définissons ensemble le périmètre, la fréquence des passages et les périodes d’intervention. Il n’y a ni formule imposée, ni tarif affiché : tout part d’une étude du site.</p>
            </div>
            <div className="pa-block" data-reveal>
              <h2 className="h-2">Ce que nous ne faisons pas</h2>
              <ul className="dashes">
                <li>Pas de réparation de couverture ni de bardage : nous signalons les défauts observés et vous orientons vers l’entreprise compétente.</li>
                <li>Pas de procédé abrasif sur le fibrociment ; pas d’intervention sur un fibrociment ancien sans repérage amiante.</li>
                <li>Pas d’intervention sur des panneaux photovoltaïques sans étude séparée et préconisations du fabricant.</li>
                <li>Pas de vol là où l’espace aérien ou l’environnement l’interdisent : nous le vérifions dès l’étude.</li>
              </ul>
            </div>
          </div>

          <aside className="aside-card" aria-label="Demande d’étude professionnelle">
            <p className="mono muted">Étude de site</p>
            <p className="h-3">Ce qui nous aide à chiffrer.</p>
            <ol className="pa-aside-list">
              <li><span className="mono">01</span><span>Adresse du site et surfaces concernées, même approximatives.</span></li>
              <li><span className="mono">02</span><span>Photos de chaque face, et vue d’ensemble si possible.</span></li>
              <li><span className="mono">03</span><span>Contraintes d’exploitation : horaires, accès, coactivité, animaux.</span></li>
              <li><span className="mono">04</span><span>Documents attendus de votre côté (plan de prévention, consignes).</span></li>
            </ol>
            <Link className="btn" href={CONTACT} data-track="pro_aside_devis">Demander une étude de site <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </section>

      {/* Parcours */}
      <section className="section section--mist" aria-labelledby="parcours-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Votre parcours</span><h2 id="parcours-title" className="h-1">Du besoin à la première intervention.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Quatre étapes pour savoir rapidement si le drone est la bonne solution pour votre site.</p>
          </div>
          <ol className="steps">
            <li className="step" data-reveal>
              <span className="step-n mono">01</span>
              <h3 className="h-3">Identifier le besoin</h3>
              <p className="muted">Toiture, façade ou bardage ? Choisissez la prestation correspondante.</p>
              <ul className="ticks">
                {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.name}</Link></li>)}
              </ul>
            </li>
            <li className="step" data-reveal style={{ ['--i' as string]: 1 }}>
              <span className="step-n mono">02</span>
              <h3 className="h-3">Vérifier nos capacités</h3>
              <p className="muted">Matériel, méthode, et surtout limites : ce que le drone fait et ce qu’il ne fait pas.</p>
              <Link className="link-arrow" href="/technologie/">Technologie et limites <span aria-hidden="true">→</span></Link>
              <Link className="link-arrow" href="/securite-reglementation/">Sécurité et réglementation <span aria-hidden="true">→</span></Link>
            </li>
            <li className="step" data-reveal style={{ ['--i' as string]: 2 }}>
              <span className="step-n mono">03</span>
              <h3 className="h-3">Consulter les références</h3>
              <p className="muted">
                {projects.length === 0
                  ? 'Nos premières références professionnelles sont en cours. Nous ne publierons que des chantiers réels, avec l’accord du client.'
                  : 'Chaque fiche présente le bâtiment, le constat, la méthode et le résultat.'}
              </p>
              <Link className="link-arrow" href="/realisations/">Réalisations <span aria-hidden="true">→</span></Link>
            </li>
            <li className="step" data-reveal style={{ ['--i' as string]: 3 }}>
              <span className="step-n mono">04</span>
              <h3 className="h-3">Nous contacter</h3>
              <p className="muted">Décrivez votre site : nous revenons vers vous sous 48 h ouvrées avec une étude et, si besoin, une proposition de visite.</p>
              <Link className="link-arrow" href={CONTACT}>Demander une étude <span aria-hidden="true">→</span></Link>
            </li>
          </ol>
        </div>
      </section>

      {/* Références honnêtes */}
      <section className="section" aria-labelledby="ref-title">
        <div className="container real-grid">
          <div data-reveal>
            <span className="eyebrow">Références</span>
            <h2 id="ref-title" className="h-1">Pas de logos empruntés.</h2>
          </div>
          <div className="real-side" data-reveal style={{ ['--i' as string]: 1 }}>
            <p className="lede">Drone Éclat démarre. Nous n’affichons ni logos de clients, ni chiffres, ni avis que nous ne pourrions pas prouver. Nos premières références sont en cours et seront publiées chantier par chantier.</p>
            <p className="muted">Vous gérez un site dans l’Oise et souhaitez tester la méthode sur un premier secteur ? C’est souvent la meilleure façon de juger : un bâtiment, un rapport photo, et vous décidez de la suite.</p>
            <div className="cta-row">
              <Link className="btn btn--ghost" href="/zones-intervention/">Zones d’intervention</Link>
              <Link className="link-arrow" href={CONTACT}>Proposer un premier secteur <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--mist" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal>
            <span className="eyebrow">Questions fréquentes</span>
            <h2 id="faq-title" className="h-1">Les questions des professionnels.</h2>
            <Link className="link-arrow" href="/services/nettoyage-bardage-drone/">Nettoyage de bardage et hangars <span aria-hidden="true">→</span></Link>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand
        title="Parlons de votre site."
        text="Adresse, surfaces et contraintes d’exploitation : nous revenons vers vous sous 48 h ouvrées avec une étude, un planning par secteurs et un devis détaillé."
        cta="Demander une étude de site"
        href={CONTACT}
        secondary={{ href: '/technologie/', label: 'Voir le matériel' }}
      />
    </div>
  );
}
