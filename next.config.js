/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["transportation-wellness.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'transportation-wellness.vercel.app',
          },
        ],
        destination: 'https://transportation-wellness.com/:path*',
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  // Add this section for custom error handling
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/_error',
        has: [
          {
            type: 'query',
            key: 'code',
            value: '404',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
