import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import './components.css';
import './v3.css';
import './v4.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QuickContact } from '@/components/layout/QuickContact';
import { RevealInit } from '@/components/layout/RevealInit';
import { StickyCta } from '@/components/layout/StickyCta';
import { Analytics } from '@/components/layout/Analytics';
import { JsonLd } from '@/components/ui/JsonLd';
import { site, absoluteUrl } from '@/config/site';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'optional' }); // optional : pas de bascule tardive de police (LCP mobile)
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-plex-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Drone Éclat · Démoussage et nettoyage de toiture par drone', template: '%s · Drone Éclat' },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'fr_FR', siteName: site.name, url: absoluteUrl('/'), images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Drone Éclat : un drone nettoie une toiture en tuiles' }] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: '#0A1F37', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${instrument.variable} ${plex.variable}`}>
      <body>
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <QuickContact />
        <StickyCta />
        <RevealInit />
        <Analytics />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
