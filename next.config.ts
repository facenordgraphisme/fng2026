import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
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
    ];
  },
};

export default nextConfig;
