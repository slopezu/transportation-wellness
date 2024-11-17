import { MetadataRoute } from 'next'

// Implement fetchServices to get dynamic service data
async function fetchServices() {
  // This is a placeholder. In a real implementation, this would fetch data from an API or database
  return [
    {
      slug: 'airport-transportation',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'hotel-transfer',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'private-shuttle',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'guanacaste-shuttle',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'san-jose-shuttle',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'custom-tours',
      updatedAt: new Date().toISOString(),
    },
  ]
}

// Implement fetchLocations to get dynamic location data
async function fetchLocations() {
  // This is a placeholder. In a real implementation, this would fetch data from an API or database
  return [
    {
      slug: 'liberia',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'san-jose',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'tamarindo',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'nosara',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'la-fortuna',
      updatedAt: new Date().toISOString(),
    },
    {
      slug: 'monteverde',
      updatedAt: new Date().toISOString(),
    },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://transportation-wellness.com'

  // Fetch dynamic data
  const [services, locations] = await Promise.all([fetchServices(), fetchLocations()])

  // Generate service URLs
  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Generate location URLs
  const locationUrls = locations.map(location => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: new Date(location.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  // Combine all URLs
  return [...routes, ...serviceUrls, ...locationUrls]
}
