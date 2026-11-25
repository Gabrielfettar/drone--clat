import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import '../pages-b.css';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/ui/CtaBand';
import { team, credentials } from '@/content/team';

export const metadata: Metadata = {
  title: 'Notre équipe : télépilotes certifiés et chefs de chantier',
  description: 'Télépilotes certifiés CATS, chefs de chantier, direction : l’équipe Drone Éclat qui nettoie et protège vos toitures et façades par drone depuis Compiègne.',
  alternates: { canonical: '/equipe/' },
};

export default function TeamPage() {
  return (
    <>
      <PageHero crumbs={[{ href: '/equipe/', label: 'Notre équipe' }]} eyebrow="Notre équipe" title="Des pilotes certifiés, une équipe au sol."
        lede="Derrière chaque vol : un télépilote certifié qui prépare et réalise l’intervention, et un chef de chantier qui sécurise les abords et contrôle le résultat." />

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <h2 id="team-title" className="sr-only">Les membres de l’équipe</h2>
          <ul className="team">
            {team.map((m, k) => (
              <li key={m.id} className="member" data-reveal style={{ ['--i' as string]: k }}>
                <div className="member-photo">
                  {m.photo ? <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(max-width: 1000px) 50vw, 25vw" /> : (
                    <div className="placeholder">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="currentColor" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="currentColor" /></svg>
                      <span>Photo à venir</span>
                    </div>
                  )}
                </div>
                <span className="mono member-role">{m.role}</span>
                <h3 className="h-3">{m.pending ? <>{m.role} <span className="pending-tag">à compléter</span></> : m.name}</h3>
                <p className="muted">{m.bio}</p>
                <ul className="member-certs">{m.certifications.map((c) => <li key={c}>{c}</li>)}</ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="cred-title">
        <div className="container">
          <div className="sec-head">
            <div data-reveal><span className="eyebrow">Certifications</span><h2 id="cred-title" className="h-1">Un cadre de vol professionnel.</h2></div>
            <p className="lede" data-reveal style={{ ['--i' as string]: 1 }}>Le nettoyage par drone relève de la catégorie « spécifique » de la réglementation européenne : il exige des pilotes formés et des vols déclarés.</p>
          </div>
          <ul className="creds">
            {credentials.map((c, k) => (
              <li key={c.k} className="cred" data-reveal style={{ ['--i' as string]: k }}>
                <span className="cred-k">{c.k}</span><strong>{c.title}</strong><p className="muted">{c.text}</p>
              </li>
            ))}
          </ul>
          <div className="cta-row"><Link className="link-arrow" href="/securite-reglementation/">Sécurité et réglementation <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section" aria-labelledby="join-title">
        <div className="container pb-split">
          <div data-reveal><span className="eyebrow">Recrutement</span><h2 id="join-title" className="h-2" style={{ marginTop: 'var(--s-4)' }}>Télépilote ou chef de chantier ? Rejoignez-nous.</h2></div>
          <div className="pb-stack" data-reveal style={{ ['--i' as string]: 1 }}>
            <p className="lede">Nous développons nos équipes dans les Hauts-de-France et en Île-de-France. Écrivez-nous via le formulaire de contact en précisant « Candidature ».</p>
            <Link className="link-arrow" href="/contact/">Nous écrire <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <CtaBand title="Confiez votre toiture à des professionnels certifiés." text="Trois questions, et un membre de l’équipe vous rappelle sous 48 h ouvrées." />
    </>
  );
}
