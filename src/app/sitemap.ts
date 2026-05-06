import { MetadataRoute } from 'next'
import { getServices, getProjects, getPosts } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.facenordgraphisme.fr'

  // Fetch dynamic data from Sanity
  const services = await getServices()
  const projects = await getProjects()
  const posts = await getPosts()

  // Static routes
  const staticRoutes = [
    '',
    '/a-propos',
    '/contact',
    '/faq',
    '/portfolio',
    '/prestations',
    '/blog',
    '/mentions-legales',
    '/politique-de-confidentialite',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic services
  const serviceRoutes = services.map((service: any) => ({
    url: `${baseUrl}/${service.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic projects
  const projectRoutes = projects.map((project: any) => ({
    url: `${baseUrl}/portfolio/${project.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic blog posts
  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes]
}
