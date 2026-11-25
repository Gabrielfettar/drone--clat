import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Drone Éclat', short_name: 'Drone Éclat', start_url: '/', display: 'browser', background_color: '#ffffff', theme_color: '#0A1F37', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/logo-drone-eclat.png', sizes: '512x512', type: 'image/png' }] };
}
