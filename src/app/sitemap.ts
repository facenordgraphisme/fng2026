import { MetadataRoute } from 'next'
import { getServices, getProjects, getPosts, getAllCityPageSlugs } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.facenordgraphisme.fr'

  // Fetch dynamic data from Sanity
  const [services, projects, posts, citySlugs] = await Promise.all([
    getServices(),
    getProjects(),
    getPosts(),
    getAllCityPageSlugs(),
  ])

  // Static routes
  const staticRoutes = [
    { path: '', priority: 1.0 },
    { path: '/prestations', priority: 0.9 },
    // Service pages (hardcoded routes — high commercial intent)
    { path: '/creation-site-internet-hautes-alpes', priority: 0.9 },
    { path: '/boutique-e-commerce-hautes-alpes', priority: 0.9 },
    { path: '/referencement-seo-hautes-alpes', priority: 0.9 },
    { path: '/refonte-ai-friendly', priority: 0.9 },
    { path: '/maintenance-site-internet-hautes-alpes', priority: 0.9 },
    { path: '/referencement-ia', priority: 0.9 },
    { path: '/portfolio', priority: 0.8 },
    { path: '/blog', priority: 0.8 },
    { path: '/a-propos', priority: 0.7 },
    { path: '/contact', priority: 0.7 },
    { path: '/faq', priority: 0.6 },
    { path: '/mentions-legales', priority: 0.3 },
    { path: '/politique-de-confidentialite', priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }))

  // City landing pages
  const cityRoutes = citySlugs.map((slug: string) => ({
    url: `${baseUrl}/villes/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
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
    priority: 0.65,
  }))

  return [...staticRoutes, ...cityRoutes, ...projectRoutes, ...postRoutes]
}
