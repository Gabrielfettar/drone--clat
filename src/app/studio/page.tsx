import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Studio } from './Studio';

/** Page technique (non indexée) servant à produire les visuels fixes de la scène 3D. */
export const metadata: Metadata = { title: 'Studio 3D', robots: { index: false, follow: false } };
export default function Page() {
  // Outil interne : inaccessible sur le site en production.
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_STUDIO !== '1') notFound();
  return <Studio />;
}
