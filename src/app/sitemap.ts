import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Obtén las rutas de tus páginas dinámicas (por ejemplo, servicios)
  const services = await fetchServices() // Implementa esta función para obtener tus servicios

  const servicesUrls = services.map(service => ({
    url: `https://transportation-wellness.com/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://transportation-wellness.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://transportation-wellness.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://transportation-wellness.com/services',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://transportation-wellness.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...servicesUrls,
  ]
}