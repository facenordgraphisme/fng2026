import { getServices, getProjects, getPosts, getAllCityPageSlugs } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://www.facenordgraphisme.fr'

  let services: any[] = []
  let projects: any[] = []
  let posts: any[] = []
  let citySlugs: string[] = []

  try {
    const [fetchedServices, fetchedProjects, fetchedPosts, fetchedCitySlugs] = await Promise.all([
      getServices(),
      getProjects(),
      getPosts(),
      getAllCityPageSlugs(),
    ])
    services = fetchedServices || []
    projects = fetchedProjects || []
    posts = fetchedPosts || []
    citySlugs = fetchedCitySlugs || []
  } catch (error) {
    console.error("Error fetching sitemap data:", error)
  }

  // Static routes
  const staticRoutes = [
    { path: '', priority: 1.0 },
    { path: '/prestations', priority: 0.9 },
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
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority,
  }))

  // City landing pages
  const cityRoutes = citySlugs
    .filter(Boolean)
    .map((slug: string) => ({
      url: `${baseUrl}/villes/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

  // Dynamic projects
  const projectRoutes = projects
    .filter((project: any) => project?.slug?.current)
    .map((project: any) => ({
      url: `${baseUrl}/portfolio/${project.slug.current}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  // Dynamic blog posts
  const postRoutes = posts
    .filter((post: any) => post?.slug?.current)
    .map((post: any) => {
      const date = post.lastModified || post.lastUpdated
        ? new Date(post.lastModified || post.lastUpdated)
        : post.publishedAt
          ? new Date(post.publishedAt)
          : new Date();
      return {
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: date.toISOString(),
        changeFrequency: 'weekly',
        priority: 0.65,
      };
    })

  const allRoutes = [...staticRoutes, ...cityRoutes, ...projectRoutes, ...postRoutes]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}
