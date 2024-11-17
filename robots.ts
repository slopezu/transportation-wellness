import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/temp/',
          '/*.pdf',
          '/*.doc',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/nogooglebot/'],
      },
    ],
    sitemap: 'https://transportation-wellness.com/sitemap.xml',
    host: 'https://transportation-wellness.com',
  }
}

console.log('Robots.txt content:');
console.log(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /temp/
Disallow: /*.pdf
Disallow: /*.doc

User-agent: Googlebot
Allow: /
Disallow: /nogooglebot/

Sitemap: https://transportation-wellness.com/sitemap.xml
Host: https://transportation-wellness.com`);
