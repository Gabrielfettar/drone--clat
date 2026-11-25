import type { Metadata } from 'next';
import { Studio } from './Studio';

/** Page technique (non indexée) servant à produire les visuels fixes de la scène 3D. */
export const metadata: Metadata = { title: 'Studio 3D', robots: { index: false, follow: false } };
export default function Page() { return <Studio />; }
