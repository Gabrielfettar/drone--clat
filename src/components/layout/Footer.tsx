import Link from 'next/link';
import { projects } from '@/content/projects';
import { Logo } from '@/components/ui/Logo';
import { services } from '@/content/services';
import { cities } from '@/content/cities';
import { site, isKnown } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo tone="light" />
            <p>Entretien de toitures, façades et bardages par drone. Devis gratuit et détaillé, démarches de vol prises en charge.</p>
            <Link className="btn btn--light btn--sm" href="/contact/">Devis gratuit <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </div>
          <nav aria-label="Prestations" className="footer-col">
            <h2 className="mono">Prestations</h2>
            <ul>
              {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.name}</Link></li>)}
              <li><Link href="/professionnels/entretien-batiments/">Bâtiments professionnels</Link></li>
            </ul>
          </nav>
          <nav aria-label="Entreprise" className="footer-col">
            <h2 className="mono">Entreprise</h2>
            <ul>
              <li><Link href="/technologie/">Technologie et matériel</Link></li>
              {!!projects.length && <li><Link href="/realisations/">Réalisations</Link></li>}
              <li><Link href="/zones-intervention/">Zones d’intervention</Link></li>
              <li><Link href="/oise/">Démoussage dans l’Oise</Link></li>
              <li><Link href="/a-propos/">À propos</Link></li>
              <li><Link href="/fournisseurs/">Nos fournisseurs</Link></li>
              <li><Link href="/aides-tva/">TVA à 10 % et aides</Link></li>
              <li><Link href="/journal/">Conseils</Link></li>
            </ul>
          </nav>
          <div className="footer-col">
            <h2 className="mono">Contact</h2>
            <ul>
              {isKnown(site.phone) && <li><a href={`tel:${site.phone.value.replace(/\s/g, '')}`} data-track="phone_click">{site.phone.value}</a></li>}
              {isKnown(site.email) && <li><a href={`mailto:${site.email.value}`} data-track="email_click">{site.email.value}</a></li>}
              <li>{site.base.city}, {site.base.department}</li>
              <li><Link href="/contact/">Formulaire de devis</Link></li>
            </ul>
          </div>
        </div>
        {!!cities.length && (
          <nav aria-label="Villes desservies" className="footer-cities">
            <h2 className="mono">Nous intervenons à</h2>
            <ul>{cities.map((c) => <li key={c.slug}><Link href={`/villes/${c.slug}/`}>Nettoyage de toiture {c.name}</Link></li>)}</ul>
          </nav>
        )}
        <div className="footer-bottom">
          <span>© {year} Drone Éclat</span>
          <nav aria-label="Informations légales">
            <ul>
              <li><Link href="/mentions-legales/">Mentions légales</Link></li>
              <li><Link href="/confidentialite/">Confidentialité</Link></li>
              <li><Link href="/cookies/">Cookies</Link></li>
              <li><Link href="/credits-photos/">Crédits photos</Link></li>
              <li><Link href="/securite-reglementation/">Sécurité et réglementation</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
