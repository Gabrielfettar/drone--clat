/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Politique de contenu : scripts et styles du site uniquement (+ Plausible si activé). 'unsafe-inline' reste requis par Next.js (styles et amorçage).
  { key: 'Content-Security-Policy', value: [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://plausible.io${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' https://plausible.io https://geo.api.gouv.fr${process.env.NODE_ENV === 'development' ? ' ws:' : ''}`,
    "worker-src 'self' blob:",
    "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "object-src 'none'",
  ].join('; ') },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizePackageImports: ['@react-three/drei'] },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};
export default nextConfig;
