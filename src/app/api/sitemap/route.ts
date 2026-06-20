import { getServices, getProjects, getPosts, getAllCityPageSlugs } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

const BASE = 'https://www.facenordgraphisme.fr'

export async function GET() {
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
    // static routes only on error
  }

  const staticRoutes = [
    { url: `${BASE}`,                                         priority: 1.0, freq: 'monthly' },
    { url: `${BASE}/prestations`,                             priority: 0.9, freq: 'monthly' },
    { url: `${BASE}/creation-site-internet-hautes-alpes`,     priority: 0.9, freq: 'monthly' },
    { url: `${BASE}/boutique-e-commerce-hautes-alpes`,        priority: 0.9, freq: 'monthly' },
    { url: `${BASE}/referencement-seo-hautes-alpes`,          priority: 0.9, freq: 'monthly' },
    { url: `${BASE}/refonte-ai-friendly`,                     priority: 0.9, freq: 'monthly' },
    { url: `${BASE}/maintenance-site-internet-hautes-alpes`,  priority: 0.9, freq: 'monthly' },
    { url: `${BASE}/referencement-ia`,                        priority: 0.9, freq: 'monthly' },
    { url: `${BASE}/portfolio`,                               priority: 0.8, freq: 'monthly' },
    { url: `${BASE}/blog`,                                    priority: 0.8, freq: 'weekly'  },
    { url: `${BASE}/a-propos`,                                priority: 0.7, freq: 'monthly' },
    { url: `${BASE}/contact`,                                 priority: 0.7, freq: 'monthly' },
    { url: `${BASE}/faq`,                                     priority: 0.6, freq: 'monthly' },
    { url: `${BASE}/mentions-legales`,                        priority: 0.3, freq: 'yearly'  },
    { url: `${BASE}/politique-de-confidentialite`,            priority: 0.3, freq: 'yearly'  },
  ]

  const cityRoutes = citySlugs.filter(Boolean).map((slug: string) => ({
    url: `${BASE}/villes/${slug}`, priority: 0.8, freq: 'monthly',
  }))

  const projectRoutes = projects
    .filter((p: any) => p?.slug?.current)
    .map((p: any) => ({ url: `${BASE}/portfolio/${p.slug.current}`, priority: 0.6, freq: 'monthly' }))

  const postRoutes = posts
    .filter((p: any) => p?.slug?.current)
    .map((p: any) => ({
      url: `${BASE}/blog/${p.slug.current}`,
      priority: 0.65,
      freq: 'weekly',
      lastmod: p.lastUpdated ?? p.publishedAt ?? new Date().toISOString(),
    }))

  const allRoutes = [...staticRoutes, ...cityRoutes, ...projectRoutes, ...postRoutes]
  const now = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((r: any) => `  <url>
    <loc>${r.url}</loc>
    <lastmod>${r.lastmod ?? now}</lastmod>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
