import { MetadataRoute } from 'next'

// Implementación de fetchServices
async function fetchServices() {
  // Como no hay una base de datos real por ahora, retornamos un array estático
  // Esto se puede modificar más adelante para obtener datos de una API o base de datos
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
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Obtener los servicios
  const services = await fetchServices()

  // Generar las URLs de los servicios
  const servicesUrls = services.map(service => ({
    url: `https://transportation-wellness.com/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // URLs base del sitio
  const routes = [
    {
      url: 'https://transportation-wellness.com',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: 'https://transportation-wellness.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://transportation-wellness.com/services',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://transportation-wellness.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Combinar las URLs base con las URLs de los servicios
  return [...routes, ...servicesUrls]
}