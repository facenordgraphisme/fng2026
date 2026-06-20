import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async rewrites() {
    return [
      // /sitemap.xml serait intercepté par app/[slug]/page.tsx (slug="sitemap.xml")
      // On rewrite vers /api/sitemap (2 segments = hors de portée de [slug])
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/blog/prestataires-de-tourisme-comment-digitaliser-vos-reservations-dans-les-hautes-alpes',
        destination: '/blog/digitaliser-reservations-tourisme-hautes-alpes',
        permanent: true,
      },
      {
        source: '/blog/refonte-de-site-internet-5-signes-qu-il-est-temps-de-changer-face-nord-graphisme',
        destination: '/blog/refonte-site-internet-5-signes',
        permanent: true,
      },
      {
        source: '/refonte-ia-friendly',
        destination: '/refonte-ai-friendly',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
