import { site, absoluteUrl, isKnown } from '@/config/site';
import type { Service } from '@/content/services';

/**
 * Données structurées. Seules les informations validées sont publiées :
 * pas de téléphone, d'adresse ni de note tant qu'elles ne sont pas confirmées.
 * LocalBusiness sera activé quand l'adresse et le téléphone seront validés (voir docs/seo-strategy.md).
 */
export function organizationSchema() {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organisation'),
    name: site.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo-drone-eclat.png'),
    description: site.description,
    knowsAbout: ['démoussage de toiture', 'nettoyage de toiture par drone', 'nettoyage de façade', 'nettoyage de bardage', 'drone professionnel'],
  };
  if (isKnown(site.email)) org.email = site.email.value;
  if (isKnown(site.phone)) org.telephone = site.phone.value;
  if (isKnown(site.legalName)) org.legalName = site.legalName.value;
  if (site.social.length) org.sameAs = site.social.map((s) => s.url);
  if (!site.base.pending) org.areaServed = { '@type': 'AdministrativeArea', name: site.base.department };
  return org;
}

export function websiteSchema() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': absoluteUrl('/#site'), name: site.name, url: absoluteUrl('/'), inLanguage: 'fr-FR', publisher: { '@id': absoluteUrl('/#organisation') } };
}

export function serviceSchema(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.h1,
    serviceType: s.name,
    description: s.summary,
    url: absoluteUrl(`/services/${s.slug}/`),
    provider: { '@id': absoluteUrl('/#organisation') },
    ...(site.base.pending ? {} : { areaServed: { '@type': 'AdministrativeArea', name: site.base.department } }),
  };
}
