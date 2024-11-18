/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ]
  },
}

module.exports = nextConfig
