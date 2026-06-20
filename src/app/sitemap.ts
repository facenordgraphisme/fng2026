import type { MetadataRoute } from 'next'
import { getServices, getProjects, getPosts, getAllCityPageSlugs } from '@/sanity/lib/queries'

// Revalidate every 24h — fresh enough for a sitemap
export const revalidate = 86400

const BASE = 'https://www.facenordgraphisme.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let services: any[] = []
  let projects: any[] = []
  let posts: any[] = []
  let citySlugs: string[] = []

  try {
    ;[services, projects, posts, citySlugs] = await Promise.all([
      getServices(),
      getProjects(),
      getPosts(),
      getAllCityPageSlugs(),
    ])
  } catch {
    // Return static routes only if data fetching fails
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}`,                                          lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/prestations`,                              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/creation-site-internet-hautes-alpes`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/boutique-e-commerce-hautes-alpes`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/referencement-seo-hautes-alpes`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/refonte-ai-friendly`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/maintenance-site-internet-hautes-alpes`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/referencement-ia`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/portfolio`,                                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,                                     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/a-propos`,                                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,                                  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`,                                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/mentions-legales`,                         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/politique-de-confidentialite`,             lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const cityRoutes: MetadataRoute.Sitemap = citySlugs
    .filter(Boolean)
    .map((slug) => ({
      url: `${BASE}/villes/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p: any) => p?.slug?.current)
    .map((p: any) => ({
      url: `${BASE}/portfolio/${p.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p: any) => p?.slug?.current)
    .map((p: any) => {
      const lastMod = p.lastUpdated ?? p.publishedAt ?? new Date()
      return {
        url: `${BASE}/blog/${p.slug.current}`,
        lastModified: new Date(lastMod),
        changeFrequency: 'weekly',
        priority: 0.65,
      }
    })

  return [...staticRoutes, ...cityRoutes, ...projectRoutes, ...postRoutes]
}
