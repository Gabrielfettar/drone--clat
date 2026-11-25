import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { Faq, type FaqItem } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import '../pages-a.css';

export const metadata: Metadata = {
  title: 'Technologie : drone captif, méthode et limites',
  description: 'Drone relié au sol par un tuyau, unité de pompage, caméra de contrôle, balisage : notre méthode de nettoyage par drone, ses capacités et ses limites.',
  alternates: { canonical: '/technologie/' },
};

const CONTACT = '/contact/?service=demoussage-toiture-drone';

/** Capacités et limites : chaque ligne dit ce que le drone fait et ce qu'il ne fait pas. */
const capabilities: [string, string, string][] = [
  ['Nettoyage', 'Rince toitures, façades et bardages à l’eau, avec une pression réglée selon le matériau.', 'Ne brosse pas : pas d’action mécanique sur la surface. Les mousses très épaisses peuvent demander un brossage manuel.'],
  ['Réparation', 'Repère visuellement, par la caméra, les tuiles cassées ou déplacées et les défauts apparents.', 'Ne répare rien : ni tuile, ni faîtage, ni bardage, ni fuite. Nous orientons vers un couvreur ou l’entreprise compétente.'],
  ['Gouttières', 'Le rinçage entraîne une partie des débris vers les gouttières.', 'Ne débouche pas les gouttières ni les descentes d’eau pluviale.'],
  ['Matériaux fragiles', 'Travaille à basse pression sur ardoise, pierre tendre ou enduit ancien, après essai si besoin.', 'Aucun procédé abrasif sur le fibrociment ; pas d’intervention sur un fibrociment ancien sans repérage amiante.'],
  ['Météo', 'Vole par temps sec et vent faible, avec report de l’intervention si les conditions se dégradent.', 'Ne vole pas par vent fort, pluie soutenue ou gel. Les seuils exacts dépendent du matériel et de notre manuel d’exploitation.'],
  ['Espace aérien', 'Intervient en zone habitée après les démarches exigées et la vérification des restrictions.', 'Ne vole pas dans les zones interdites ou soumises à restriction (abords d’aéroports, sites sensibles) sans autorisation spécifique, qui peut être refusée.'],
  ['Environnement', 'Fonctionne avec un périmètre balisé au sol, libre de toute personne non impliquée pendant le vol.', 'Ne peut pas travailler si le périmètre ne peut pas être sécurisé : rue très passante, obstacles, lignes électriques trop proches.'],
];

const faq: FaqItem[] = [
  { q: 'Pourquoi un drone relié au sol plutôt qu’un drone avec réservoir ?', a: 'L’eau arrive en continu par le tuyau : pas d’allers-retours pour remplir un réservoir, et un drone plus léger en vol. Le tuyau impose en contrepartie une gestion attentive au sol (cheminement, accroches), prise en compte dans l’analyse des risques du chantier.' },
  { q: 'Quel modèle de drone utilisez-vous ?', a: 'Le modèle exact et ses caractéristiques seront publiés à la mise en service de notre matériel. Nous préférons ne pas annoncer de fiche technique tant qu’elle n’est pas définitive.' },
  { q: 'Le bruit du drone est-il gênant ?', a: 'Le drone et l’unité de pompage font du bruit pendant le vol, comme un outil de chantier. Nous respectons les horaires fixés par les arrêtés locaux et prévenons le voisinage immédiat si la configuration le demande.' },
  { q: 'Que deviennent les images de la caméra ?', a: 'Elles servent au pilotage, au contrôle des passes et au rapport photo de votre chantier. La caméra est cadrée sur le bâtiment traité ; nous ne publions aucune image sans votre accord écrit.' },
  { q: 'Le drone peut-il appliquer un produit anti-mousse ?', a: 'Techniquement, un drone peut pulvériser un liquide. Réglementairement, cela dépend du type de produit, de son étiquette et du cadre aérien applicable. Notre méthode de base est le nettoyage à l’eau ; tout traitement est étudié au cas par cas.' },
];

export default function TechnologiePage() {
  return (
    <div className="pa">
      <PageHero
        crumbs={[{ href: '/technologie/', label: 'Technologie' }]}
        eyebrow="Matériel et méthode"
        title="Notre méthode d’intervention par drone"
        lede="Un drone de travail relié au sol, une unité de pompage, une caméra de contrôle et un périmètre balisé. Voici comment nous intervenons, et surtout ce que le drone ne sait pas faire."
        aside={
          <figure className="pa-figure">
            <div className="pa-frame">
              <Image src="/illustrations/drone.webp" alt="Illustration 3D d’un drone relié à un tuyau, en vol face à une toiture en tuiles couverte de mousse" fill priority sizes="(max-width: 900px) 100vw, 40vw" />
              <span className="pending-tag">Illustration 3D</span>
            </div>
            <figcaption className="pa-cap">Illustration de principe : ce n’est pas une photo de notre matériel.</figcaption>
          </figure>
        }
      >
        <div className="cta-row">
          <Link className="btn" href={CONTACT} data-track="tech_hero_devis">Demander un devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link className="btn btn--ghost" href="#limites">Capacités et limites</Link>
        </div>
      </PageHero>

      {/* Définition + matériel */}
      <section className="section" aria-labelledby="materiel">
        <div className="container pa-stack">
          <p className="answer" data-reveal><span className="mono">En bref</span>Un drone de nettoyage captif est un drone professionnel alimenté en eau par un tuyau relié à une unité de pompage au sol. Le télépilote le guide à vue depuis le sol pendant que le drone rince la surface en bandes successives, sans que personne ne monte sur le bâtiment.</p>

          <div className="gear">
            <div data-reveal>
              <span className="eyebrow">Matériel</span>
              <h2 id="materiel" className="h-1">Quatre éléments, un seul système.</h2>
              <p className="lede">Le drone ne travaille jamais seul : il dépend d’une installation au sol que l’équipe surveille en permanence.</p>
              <dl className="specs pa-specs">
                <div><dt>Alimentation en eau</dt><dd>Par tuyau depuis le sol</dd></div>
                <div><dt>Pilotage</dt><dd>À vue, télépilote au sol</dd></div>
                <div><dt>Pression</dt><dd>Réglée selon le matériau</dd></div>
              </dl>
            </div>
            <ul className="gear-list" data-reveal style={{ ['--i' as string]: 1 }}>
              <li><span className="mono">01</span><div><h3 className="h-3">Drone captif</h3><p className="muted">Drone de travail équipé d’une lance orientable, relié au sol par un tuyau. Pas de réservoir à remplir en vol : le travail est continu et la masse embarquée réduite. Le modèle exact sera détaillé à la mise en service.</p></div></li>
              <li><span className="mono">02</span><div><h3 className="h-3">Unité de pompage</h3><p className="muted">Installée au pied du bâtiment, elle alimente la lance et règle la pression. Elle reste sous le contrôle de l’équipe pendant toute l’intervention.</p></div></li>
              <li><span className="mono">03</span><div><h3 className="h-3">Caméra de contrôle</h3><p className="muted">Retour vidéo au sol pour viser juste, vérifier chaque passe et produire le rapport photo avant / après.</p></div></li>
              <li><span className="mono">04</span><div><h3 className="h-3">Balisage</h3><p className="muted">Périmètre de sécurité au sol, maintenu libre de toute personne non impliquée pendant le vol, et déplacé au fil du chantier.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="section section--mist" aria-labelledby="methode">
        <div className="container pa-split pa-split--media">
          <div className="pa-block" data-reveal>
            <span className="eyebrow">Méthode</span>
            <h2 id="methode" className="h-1">De haut en bas, bande par bande.</h2>
            <p className="lede">Le drone rince chaque pan en passes horizontales qui se chevauchent, en partant du faîtage. L’eau entraîne les salissures vers les zones pas encore traitées : rien ne se redépose sur ce qui est propre.</p>
            <ol className="pa-aside-list" style={{ fontSize: 'var(--t-md)' }}>
              <li><span className="mono">01</span><span>Installation de l’unité au sol et du balisage, vérification des abords.</span></li>
              <li><span className="mono">02</span><span>Réglage de la pression selon le matériau, essai sur une zone discrète si besoin.</span></li>
              <li><span className="mono">03</span><span>Rinçage par bandes, contrôle caméra après chaque passe.</span></li>
              <li><span className="mono">04</span><span>Repli du matériel le jour même et rapport photo.</span></li>
            </ol>
          </div>
          <figure className="pa-figure" data-reveal style={{ ['--i' as string]: 1 }}>
            <div className="pa-frame">
              <Image src="/illustrations/overview.webp" alt="Illustration 3D d’une maison : le drone rince la toiture, relié par un tuyau à une unité de pompage au sol, derrière un périmètre balisé" fill sizes="(max-width: 900px) 100vw, 45vw" />
              <span className="pending-tag">Illustration 3D</span>
            </div>
            <figcaption className="pa-cap">Vue d’ensemble d’un chantier type : unité au sol, tuyau, drone et zone balisée.</figcaption>
          </figure>
        </div>
      </section>

      {/* Capacités et limites */}
      <section className="section" id="limites" aria-labelledby="limites-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Capacités et limites</span><h2 id="limites-title" className="h-1">Ce que le drone fait, et ce qu’il ne fait pas.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Le drone est un outil d’entretien, pas une solution universelle. Mieux vaut le savoir avant de demander un devis.</p>
          </div>
          <div className="table-wrap" data-reveal>
            <table className="cmp pa-table">
              <caption className="sr-only">Capacités et limites du nettoyage par drone</caption>
              <thead><tr><th scope="col">Sujet</th><th scope="col" className="us">Ce que le drone fait</th><th scope="col">Ce qu’il ne fait pas</th></tr></thead>
              <tbody>
                {capabilities.map(([a, b, c]) => (
                  <tr key={a}>
                    <th scope="row">{a}</th>
                    <td className="us pa-yes" data-label="Ce que le drone fait">{b}</td>
                    <td className="pa-no" data-label="Ce qu’il ne fait pas">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hint muted cmp-note">Si le drone n’est pas adapté à votre bâtiment, nous vous le disons dès l’étude et vous orientons vers une autre solution.</p>
        </div>
      </section>

      {/* Eau, images, météo */}
      <section className="section section--mist" aria-labelledby="precautions-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Précautions</span><h2 id="precautions-title" className="h-1">Autour du vol.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Ce qui se passe au sol compte autant que ce qui se passe en l’air.</p>
          </div>
          <div className="cards">
            <article className="card" data-reveal>
              <span className="mono">Eau de rinçage</span>
              <h3 className="h-3">Limiter le ruissellement</h3>
              <p className="muted">Nous prenons des mesures pour limiter le ruissellement et protéger végétaux, bassins et récupérateurs d’eau de pluie, que nous vous demandons de déconnecter pendant l’intervention.</p>
            </article>
            <article className="card" data-reveal style={{ ['--i' as string]: 1 }}>
              <span className="mono">Météo</span>
              <h3 className="h-3">Reporter plutôt que forcer</h3>
              <p className="muted">Vent, pluie ou gel : si les conditions ne permettent pas un vol sûr et un travail propre, l’intervention est reportée à une date proche.</p>
            </article>
            <article className="card" data-reveal style={{ ['--i' as string]: 2 }}>
              <span className="mono">Images</span>
              <h3 className="h-3">Caméra cadrée sur le chantier</h3>
              <p className="muted">Les images captées servent uniquement au pilotage, au diagnostic et au compte rendu de votre chantier. Les propriétés voisines ne sont pas filmées volontairement.</p>
            </article>
          </div>
          <p className="pa-cap" data-reveal>
            <Link className="link-arrow" href="/securite-reglementation/">Cadre réglementaire et engagements de sécurité <span aria-hidden="true">→</span></Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-grid">
          <div data-reveal>
            <span className="eyebrow">Questions fréquentes</span>
            <h2 id="faq-title" className="h-1">Le matériel en questions.</h2>
            <Link className="link-arrow" href="/services/demoussage-toiture-drone/">Démoussage de toiture par drone <span aria-hidden="true">→</span></Link>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      {/* Maillage */}
      <section className="section section--mist pa-related" aria-labelledby="more-title">
        <div className="container pa-block">
          <h2 id="more-title" className="h-2" data-reveal>La méthode appliquée à votre bâtiment</h2>
          <div className="cards">
            <Link href="/services/demoussage-toiture-drone/" className="card" data-reveal><span className="mono">Toiture</span><h3 className="h-3">Démoussage de toiture</h3><p className="muted">Tuiles, ardoises, bac acier : sans passage sur la couverture.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
            <Link href="/services/nettoyage-facade-drone/" className="card" data-reveal style={{ ['--i' as string]: 1 }}><span className="mono">Façade</span><h3 className="h-3">Nettoyage de façade</h3><p className="muted">Enduit, brique, pierre : pression adaptée au revêtement.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
            <Link href="/professionnels/entretien-batiments/" className="card" data-reveal style={{ ['--i' as string]: 2 }}><span className="mono">Professionnels</span><h3 className="h-3">Grands bâtiments</h3><p className="muted">Bardages, hangars, copropriétés : chantier découpé en secteurs.</p><span className="link-arrow">Découvrir <span aria-hidden="true">→</span></span></Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Le drone est-il adapté à votre bâtiment ?"
        text="Envoyez l’adresse et quelques photos : nous vérifions matériau, abords et espace aérien, et vous répondons honnêtement sous 48 h ouvrées."
        cta="Demander une étude gratuite"
        href={CONTACT}
        secondary={{ href: '/zones-intervention/', label: 'Zones d’intervention' }}
      />
    </div>
  );
}
