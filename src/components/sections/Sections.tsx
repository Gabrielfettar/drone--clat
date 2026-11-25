import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { keyBenefits, benefits, neglect } from '@/content/benefits';
import { proSegments, proPromises, heritageNote } from '@/content/pros';
import { team } from '@/content/team';
import { aides } from '@/content/aides';
import { suppliers } from '@/content/suppliers';
import { cities } from '@/content/cities';
import { site, isKnown } from '@/config/site';

/** Ce que le client gagne : 3 gains majeurs, puis la grille complète, puis le coût de l'inaction. */
export function Benefits({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section benefits" id="benefices" aria-labelledby="ben-title">
      <div className="container">
        <div className="sec-head">
          <div data-reveal><span className="eyebrow">Ce que vous y gagnez</span><h2 id="ben-title" className="h-1">Un toit propre, et surtout un toit qui dure.</h2></div>
          <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Démousser, ce n’est pas une question d’apparence. C’est l’entretien qui protège votre couverture, votre charpente et votre budget pour les années qui viennent.</p>
        </div>

        <ol className="kb">
          {keyBenefits.map((b, k) => (
            <li key={b.title} className="kb-item" data-reveal style={{ ['--i' as string]: k }}>
              <span className="kb-ico"><Icon name={b.icon} size={28} /></span>
              <span className="mono kb-kicker">{b.kicker}</span>
              <h3 className="h-3">{b.title}</h3>
              <p className="muted">{b.text}</p>
            </li>
          ))}
        </ol>

        {!compact && (
          <>
            <ul className="bgrid">
              {benefits.map((b, k) => (
                <li key={b.title} data-reveal style={{ ['--i' as string]: k % 4 }}>
                  <Icon name={b.icon} />
                  <strong>{b.title}</strong>
                  <p className="muted">{b.text}</p>
                </li>
              ))}
            </ul>

            <div className="neglect" data-reveal>
              <div className="neglect-head">
                <span className="mono">Et si on ne fait rien ?</span>
                <p className="h-3">Une mousse ne reste jamais une simple mousse.</p>
              </div>
              <ol className="neglect-chain">
                {neglect.map((n, k) => (
                  <li key={n.t} style={{ ['--i' as string]: k }}>
                    <span className="mono neglect-n">{String(k + 1).padStart(2, '0')}</span>
                    <strong>{n.t}</strong>
                    <span className="muted">{n.d}</span>
                  </li>
                ))}
              </ol>
              <div className="neglect-cta">
                <p>Un démoussage coûte une fraction d’une réfection de toiture. Faites le point avant l’hiver.</p>
                <Link className="btn" href="/contact/?service=demoussage-toiture-drone" data-track="cta_benefits">Faire étudier mon toit <span className="btn-arrow" aria-hidden="true">→</span></Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/** Bandeau TVA / aides, renvoie vers la page dédiée. */
export function AidesTeaser() {
  const tva = aides[0];
  return (
    <section className="section section--tight aides-teaser" aria-labelledby="aides-title">
      <div className="container aides-grid">
        <div className="aides-big" data-reveal>
          <span className="aides-rate" aria-hidden="true">10<small>%</small></span>
          <div>
            <span className="eyebrow">Fiscalité</span>
            <h2 id="aides-title" className="h-2">{tva.title}</h2>
          </div>
        </div>
        <div data-reveal style={{ ['--i' as string]: 1 }}>
          <p className="lede">{tva.text}</p>
          {site.vatRegistered.pending && <p className="hint muted">Sous réserve de confirmation de notre régime de TVA.</p>}
          <Link className="link-arrow" href="/aides-tva/">Bailleurs, entreprises, monuments historiques : ce qui s’applique <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

/** Bloc professionnels complet (accueil et page pros). */
export function ProsShowcase({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2';
  return (
    <section className="section section--ink pros" id="professionnels" aria-labelledby="pros-title">
      <div className="container">
        <div className="sec-head">
          <div data-reveal><span className="eyebrow">Professionnels et patrimoine</span><H id="pros-title" className="h-1">Du pavillon au monument historique.</H></div>
          <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Grandes toitures, bâtiments hauts, sites en activité, édifices protégés : nous étudions chaque chantier, même hors normes. Là où une nacelle ne passe pas, le drone travaille.</p>
        </div>
        <ul className="pro-seg">
          {proSegments.map((s, k) => (
            <li key={s.title} data-reveal style={{ ['--i' as string]: k % 3 }}>
              <span className="pro-ico"><Icon name={s.icon} size={26} /></span>
              <h3 className="h-3">{s.title}</h3>
              <p>{s.text}</p>
              <span className="mono pro-ex">{s.examples}</span>
            </li>
          ))}
        </ul>
        <div className="pro-bottom">
          <div className="pro-promises" data-reveal>
            <h3 className="h-3">Ce que vous obtenez</h3>
            <ul>
              {proPromises.map((p) => <li key={p.t}><Icon name="check" size={18} /><span><strong>{p.t}.</strong> {p.d}</span></li>)}
            </ul>
          </div>
          <aside className="pro-heritage" data-reveal style={{ ['--i' as string]: 1 }}>
            <Icon name="monument" size={32} />
            <h3 className="h-3">{heritageNote.title}</h3>
            <p>{heritageNote.text}</p>
            <div className="cta-row">
              <Link className="btn" href="/contact/?batiment=pro" data-track="cta_pros">Demander une visite technique <span className="btn-arrow" aria-hidden="true">→</span></Link>
              <Link className="btn btn--ghost" href="/professionnels/entretien-batiments/">L’offre professionnels</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** Équipe : cartes avec emplacement photo tant que les portraits ne sont pas fournis. */
export function TeamBlock() {
  return (
    <section className="section team" id="equipe" aria-labelledby="team-title">
      <div className="container">
        <div className="sec-head">
          <div data-reveal><span className="eyebrow">Notre équipe</span><h2 id="team-title" className="h-1">Des pilotes formés, une équipe au sol.</h2></div>
          <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Derrière chaque vol, un télépilote certifié et un chef de chantier qui connaît les couvertures. Vous savez qui vient chez vous.</p>
        </div>
        <ul className="team-grid">
          {team.map((m, k) => (
            <li key={m.slug} className="member" data-reveal style={{ ['--i' as string]: k }}>
              <div className="member-photo">
                {m.photo
                  ? <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  : <span className="member-ph" aria-hidden="true"><Icon name="users" size={40} /><span className="mono">Photo à venir</span></span>}
              </div>
              <div className="member-body">
                <span className="mono member-role">{m.role}</span>
                <strong className="member-name">{m.name || <span className="pending-tag">Nom à compléter</span>}</strong>
                <p className="muted">{m.text}</p>
                {!!m.credentials.length && <ul className="member-cred">{m.credentials.map((c) => <li key={c}>{c}</li>)}</ul>}
              </div>
            </li>
          ))}
        </ul>
        {!isKnown(site.operatorId) && <p className="hint muted team-note">Numéros de certificat et d’exploitant affichés dès leur enregistrement.</p>}
      </div>
    </section>
  );
}

/** Fournisseurs : logos officiels des fabricants, sur fond sombre. */
export function SuppliersStrip() {
  return (
    <section className="section section--tight sup-logos" aria-labelledby="sup-title">
      <div className="container sup-logos-inner">
        <div data-reveal>
          <span className="eyebrow">Nos fournisseurs</span>
          <h2 id="sup-title" className="h-2">Des produits pros, <span className="accent">fabriqués en France.</span></h2>
        </div>
        <ul className="sup-logo-list" data-reveal style={{ ['--i' as string]: 1 }}>
          {suppliers.map((s) => (
            <li key={s.slug}>
              <Link href="/fournisseurs/" className="sup-logo" aria-label={`${s.name} : ${s.short}`}>
                <Image src={s.logo.src} alt={`Logo ${s.name}`} width={s.logo.width} height={s.logo.height} className={s.logo.onDark ? 'logo-ondark' : 'logo-onlight'} />
              </Link>
              <span className="mono">{s.short}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Liste des villes desservies, avec lien vers chaque page locale. */
export function CitiesStrip() {
  if (!cities.length) return null;
  return (
    <section className="section cities-strip" aria-labelledby="cities-title">
      <div className="container">
        <div className="sec-head">
          <div data-reveal><span className="eyebrow">Où nous intervenons</span><h2 id="cities-title" className="h-1">Dans un rayon de {site.serviceRadiusKm.value} km autour de Compiègne.</h2></div>
          <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Hauts-de-France, Île-de-France, Grand Est et Normandie : nos équipes se déplacent pour les particuliers comme pour les professionnels. Votre ville n’est pas listée ? Elle est sans doute dans notre secteur.</p>
        </div>
        <ul className="city-links">
          {cities.map((c, k) => (
            <li key={c.slug} data-reveal style={{ ['--i' as string]: k % 5 }}>
              <Link href={`/villes/${c.slug}/`}>
                <span className="city-name">{c.name}</span>
                <span className="mono">{c.departmentCode} · {c.distanceKm === 0 ? 'base' : `${c.distanceKm} km`}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="cta-row cities-cta">
          <Link className="btn" href="/contact/" data-track="cta_cities">Vérifier mon adresse et demander l’étude <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <Link className="link-arrow" href="/zones-intervention/">Carte de nos zones <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
