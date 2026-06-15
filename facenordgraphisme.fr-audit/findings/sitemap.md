# Sitemap Audit — facenordgraphisme.fr

**Category:** Sitemap
**Score: 22 / 100**

The site has a well-structured `src/app/sitemap.ts` that *should* produce a clean, near-complete sitemap — but it is not reachable in production (HTTP 404), robots.txt points at the broken URL, and even if fixed today the generated XML would contain 4 duplicate/erroneous `<url>` entries from unmodelled Sanity duplicates, plus it would still omit one live indexable page.

---

## What Works

- `src/app/sitemap.ts` exists, uses the correct Next.js 16 `MetadataRoute.Sitemap` convention (`app/sitemap.ts` → `/sitemap.xml`), and is structurally sound: static routes + 3 dynamic collections (`/villes/{slug}`, `/portfolio/{slug}`, `/blog/{slug}`) fetched via `Promise.all`.
- Total intended URL count (~14 static + 3 city + up to 9 project + ~13 blog ≈ 36-39) is **nowhere near** the 50,000-URL per-file limit — no splitting/index needed at current or 10x scale.
- No deprecated `priority`/`changeFrequency` *misuse* beyond the normal Next.js convenience fields — Google ignores these but they're harmless (Info-level only).
- Priorities are sensible and intentional: homepage 1.0, commercial service pages 0.9, portfolio/blog hubs 0.8, city pages 0.8, about/contact 0.7, FAQ 0.6, individual portfolio items 0.6, blog posts 0.65, legal pages 0.3. This is a reasonable hand-tuned hierarchy (though Google ignores it for ranking, it's not harmful).
- `lastModified` for blog posts uses real per-post dates (`lastUpdated` → `publishedAt` → fallback `new Date()`) — good practice, satisfies the "use real dates" check for that collection. (Static routes, city routes, and project routes all use `new Date()` at build/request time — see findings below.)
- `robots.txt` correctly references a `Sitemap:` directive (right location/syntax), it's just pointing at a 404.
- City page route generation (`getAllCityPageSlugs()`) is dynamic/CMS-driven and currently returns exactly 3 slugs — far below both the 30-page WARNING and 50-page HARD STOP location-page thresholds. No location-page quality gate triggered at this time.

---

## Findings

### 1. `/sitemap.xml` returns HTTP 404 — sitemap is completely unreachable (CRITICAL)

**Severity:** Critical

**Description:**
`curl -sD- https://www.facenordgraphisme.fr/sitemap.xml` returns:
```
HTTP/1.1 404 Not Found
X-Matched-Path: /[slug]
X-Powered-By: Next.js
Server: Vercel
```
The request is being matched by the **catch-all dynamic segment `src/app/[slug]/page.tsx`** (a generic "service page by slug" route used for hardcoded service pages), not by the special `app/sitemap.ts` metadata-route convention. Inside `[slug]/page.tsx`, `getServiceBySlug("sitemap.xml")` finds no matching Sanity document and the route calls `notFound()` (line 93), producing the 404 — confirmed by the `noindex` meta tag the orchestrator observed on the 404 response.

In the Next.js App Router, file-convention special routes (`sitemap.ts`, `robots.ts`, `favicon.ico`, etc.) take **static-route precedence** over dynamic segments like `[slug]` — they should never fall through to a catch-all. The fact that `/sitemap.xml` *does* fall through to `[slug]` means **`app/sitemap.ts` is not present in the deployed build's route manifest at all**. `robots.ts` is presumably fine only because it was deployed in an earlier build that included it (not verified here, but `robots.txt` itself returns content correctly, so the *file-convention mechanism* works when the file is actually shipped).

**Root-cause hypothesis (most likely → least likely):**
1. **Missing/failed deployment**: `src/app/sitemap.ts` was added/modified locally (`git status` shows it as currently modified, uncommitted) but the version that's live on Vercel predates this file's existence, OR a prior deploy of this file failed silently (e.g., a build-time error in `getProjects()`/`getPosts()`/`getAllCityPageSlugs()` — note these Sanity calls use `{ cache: 'no-store' }`, a request-time API, which is correct for App Router but if the Sanity client throws unhandled during the production build/first request, Next may fail to register the route).
2. **Build error swallowed**: if any of the four `Promise.all` calls in `sitemap.ts` throws an *uncaught* error (unlike `getProjects`/`getPosts`/`getAllCityPageSlugs`, which all wrap Sanity calls in try/catch with fallbacks — but `getServices()` should be checked too), Next.js could fail to compile this route and it gets dropped from the build, with `[slug]` silently absorbing the unmatched path at runtime.
3. **Stale Vercel build cache**: a previous deploy cached a route manifest without `sitemap.ts` and a subsequent deploy didn't fully invalidate it (less likely given Next.js's content-hash-based build IDs, but possible with `X-Vercel-Cache: MISS` + `private, no-cache` headers suggesting per-request SSR, which itself is consistent with hypothesis 1 — the live deployment simply doesn't know this route exists).

**Recommendation:**
1. Confirm `src/app/sitemap.ts` is committed to `main` and actually included in the latest production deployment (check `git log -- src/app/sitemap.ts` against the deployed commit SHA in Vercel's dashboard).
2. Trigger a clean redeploy (ideally with build cache cleared) after committing the current sitemap.ts changes.
3. After redeploy, verify `https://www.facenordgraphisme.fr/sitemap.xml` returns `Content-Type: application/xml` with HTTP 200 and `X-Matched-Path: /sitemap.xml` (not `/[slug]`).
4. Add a CI/post-deploy smoke test that curls `/sitemap.xml` and `/robots.txt` and fails the pipeline if either returns non-200 or matches the wrong route — this class of regression (a metadata route silently falling back to a catch-all) is easy to reintroduce and hard to notice without monitoring.
5. Once live, submit/resubmit the sitemap in Google Search Console — until this is fixed, **GSC has zero visibility into the site's URL inventory** via sitemap, which is the single most consequential issue in this audit category.

---

### 2. robots.txt points to the broken sitemap URL (HIGH)

**Severity:** High

**Description:**
`https://www.facenordgraphisme.fr/robots.txt` returns:
```
User-Agent: *
Allow: /
Disallow: /studio/

Sitemap: https://www.facenordgraphisme.fr/sitemap.xml
```
This is the correct syntax and the correct URL *if the sitemap worked* — but since `/sitemap.xml` 404s, any crawler that follows the `Sitemap:` directive (Googlebot, Bingbot, etc.) will hit a 404 and discard it. This is a direct consequence of Finding #1, not a separate misconfiguration — no change needed to `robots.ts` itself once `/sitemap.xml` is fixed.

**Recommendation:** No action needed beyond fixing Finding #1. Re-verify the `Sitemap:` directive resolves to a 200 + valid XML after the sitemap is redeployed. (Disallow `/studio/` for the Sanity Studio is correct and should be kept.)

---

### 3. Sanity duplicate `project` documents will produce duplicate/erroneous `<url>` entries (HIGH)

**Severity:** High

**Description:**
Live query against the `production` dataset (project `k4x2bvj1`):
```
curl -s "https://k4x2bvj1.apicdn.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%3D%3D%22project%22%5D%7B_id%2C%22slug%22%3Aslug.current%2C+title%7D"
```
returns **9 `project` documents**:

| `_id` | slug | title |
|---|---|---|
| `3464fb52-...` | `reves-d-aventures` | Rêves d'Aventures |
| `6f75122e-...` | `gaec-des-valentins` | GAEC des Valentins |
| `abf2207a-...` | `gaudineto` | Gaudineto |
| `fdd04ab8-...` | `act-event-pro` | Act Event Pro |
| `project-act-event-pro` | `act-event-pro` | ACT Event Pro |
| `project-gaec-des-valentins` | `gaec-des-valentins` | GAEC des Valentins |
| `project-gaudineto` | `gaudineto` | Gaudineto |
| `project-reves-daventures` | `reves-daventures` | Rêves d'Aventures |
| (verdon-ebike doc, slug `verdon-ebike`) | `verdon-ebike` | Verdon E-Bike |

`getProjects()` (`src/sanity/lib/queries.ts:240-281`) runs `projectQuery = *[_type == "project"] | order(_createdAt desc) { _id, title, slug, mainImage, description }` — **no `distinct`, no de-duplication by slug, no filter on `_id` pattern**. `sitemap.ts`'s `projectRoutes` then does a plain `.map()` over every returned document:

```ts
const projectRoutes = projects.map((project: any) => ({
  url: `${baseUrl}/portfolio/${project.slug.current}`,
  ...
}))
```

**Impact on the generated sitemap (once Finding #1 is fixed):**
- `act-event-pro`, `gaec-des-valentins`, and `gaudineto` would each appear **twice** with the **identical URL** (`/portfolio/act-event-pro` listed 2x, etc.) — 3 exact-duplicate `<url>` entries. This is invalid sitemap hygiene (Google de-dupes by URL but it's still sloppy and signals an unmaintained data layer).
- "Rêves d'Aventures" has **two documents with two different slugs** (`reves-d-aventures` and `reves-daventures`), producing **two distinct live URLs** — `/portfolio/reves-d-aventures` AND `/portfolio/reves-daventures` — both rendering essentially the same project content. This is a genuine **duplicate-content pair**, both of which would be listed in the sitemap, actively telling Google to crawl/index two copies of the same page.
- Net result: instead of 6 portfolio `<url>` entries (5 unique projects + 1 duplicate-slug artifact already known), the sitemap would emit **9 portfolio entries** for what is conceptually 5 projects — 3 are byte-identical duplicate URLs, and 2 (`reves-d-aventures` / `reves-daventures`) are duplicate-content URLs with different paths.

**Recommendation:**
1. **Data cleanup in Sanity Studio** (highest priority, fixes this at the source): delete the 4 redundant docs — `project-act-event-pro`, `project-gaec-des-valentins`, `project-gaudineto`, and one of the two `reves-d-aventures`/`reves-daventures` docs (recommend keeping `reves-d-aventures` with the hyphenated slug as canonical, matching French orthography, and deleting `project-reves-daventures`; 301-redirect `/portfolio/reves-daventures` → `/portfolio/reves-d-aventures` in `next.config.ts`).
2. **Defensive code fix regardless of #1**: add slug-based de-duplication in `getProjects()` or in `sitemap.ts`'s `projectRoutes` mapping, e.g.:
   ```ts
   const seen = new Set<string>();
   const projectRoutes = projects
     .filter((p: any) => {
       const slug = p.slug.current;
       if (seen.has(slug)) return false;
       seen.add(slug);
       return true;
     })
     .map((project: any) => ({ ... }));
   ```
   This prevents future Sanity data hygiene issues from immediately surfacing as sitemap defects, but does **not** solve the `reves-d-aventures`/`reves-daventures` duplicate-content problem (different slugs) — that requires the data/redirect fix in #1.

---

### 4. `/refonte-ia-friendly` is a live, indexable orphan page absent from sitemap.ts (HIGH)

**Severity:** High

**Description:**
`curl -sD- https://www.facenordgraphisme.fr/refonte-ia-friendly` returns **HTTP 200**, served via `X-Matched-Path: /[slug]` (the same generic service-by-slug catch-all), and per the crawl inventory this page is self-canonical and indexable.

`src/app/sitemap.ts`'s `staticRoutes` array includes `/refonte-ai-friendly` (note: **"ai" not "ia"** — `{ path: '/refonte-ai-friendly', priority: 0.9 }`, line 23) but **does not** include `/refonte-ia-friendly`. This second page is not a static route literal in `sitemap.ts`, and it is not derived from any of the four Sanity collections (`getServices`, `getProjects`, `getPosts`, `getAllCityPageSlugs`) being mapped into the sitemap — it appears to be a Sanity `service` document reachable only via `[slug]/page.tsx` + `getServiceBySlug()`, but `getServices()` (used elsewhere, e.g. for a services listing) is fetched in `sitemap.ts` (line 9, `services`) and then **never used** — the fetched `services` variable is discarded (no `serviceRoutes` is built from it at all).

**Impact:**
- The page remains crawlable (internal nav link from homepage) and indexable (self-canonical, no noindex), so it's not at *immediate* risk of de-indexing — but it is invisible to any tooling/process that relies on the XML sitemap for URL discovery (Search Console coverage reports, third-party SEO crawlers seeded from the sitemap, `IndexNow`/sitemap-ping-based discovery).
- This compounds Finding #5 below in `crawl-summary.md` (already logged separately): `/refonte-ai-friendly` (in sitemap.ts, "ai") vs `/refonte-ia-friendly` (live, NOT in sitemap.ts, "ia") are two competing pages for the same search intent — the sitemap currently only reinforces the "ai" variant.

**Recommendation:**
1. Resolve the duplicate-intent issue first (separate Technical SEO finding): pick ONE canonical URL (`/refonte-ia-friendly` is the more linguistically correct French spelling — "IA" = Intelligence Artificielle in French, vs "AI" which is English) and 301-redirect the other to it.
2. Once consolidated to a single URL, add it to `sitemap.ts`'s `staticRoutes` array with an appropriate priority (0.9, matching its sibling service pages).
3. Separately: the unused `services` fetch in `sitemap.ts` (line 9) suggests the original intent was to generate a `serviceRoutes` block from `getServices()` (mirroring `cityRoutes`/`projectRoutes`/`postRoutes`) but this was never implemented — if `/prestations/{slug}`-style dynamic service routes exist or are planned, this dead code should either be completed or removed to avoid confusion.

---

### 5. Static/city/project routes all use `lastModified: new Date()` — no real dates (LOW)

**Severity:** Low

**Description:**
`staticRoutes`, `cityRoutes`, and `projectRoutes` in `sitemap.ts` all hardcode `lastModified: new Date()` (evaluated at request/build time), meaning **every one of these ~24 URLs reports today's date as its last-modified timestamp on every single sitemap regeneration** — regardless of whether the underlying content actually changed. Only `postRoutes` (blog) uses real per-document dates (`lastUpdated`/`publishedAt`).

This matches the "All identical lastmod" Low-severity check from the validation table — for the 24 non-blog URLs, `lastmod` carries no signal value to crawlers and could even be mildly counterproductive (repeatedly signaling "freshly updated" for pages that haven't changed, which crawlers may eventually learn to discount).

**Recommendation:**
- For `staticRoutes`: if these pages have real edit timestamps (e.g., via git history of the page file, or a Sanity `_updatedAt` for CMS-driven static pages like `/a-propos`, `/faq`, legal pages), surface those instead of `new Date()`. If no reliable source exists, consider omitting `lastModified` entirely for purely static marketing pages rather than emitting a misleading "updated today" — Google treats a missing `lastmod` as neutral, whereas an always-current `lastmod` can train crawlers to ignore the field for this site.
- For `cityRoutes` and `projectRoutes`: both come from Sanity documents (`cityPage`, `project`), which have a built-in `_updatedAt` field. Add `_updatedAt` to `cityPageBySlugQuery`'s slug-listing query and `projectQuery`, and use `new Date(doc._updatedAt)` instead of `new Date()`. This is a low-effort, low-risk fix that brings ~24 URLs in line with the blog's already-correct pattern.

---

### 6. priority/changeFrequency fields — informational only, no action required (INFO)

**Severity:** Info

**Description:**
Per Google's documented behavior, both `<priority>` and `<changefreq>` (and their Next.js equivalents `priority`/`changeFrequency`) are **ignored** for ranking/crawl-scheduling purposes. The values present in `sitemap.ts` (1.0 → 0.3 hierarchy, `monthly`/`weekly` frequencies) are internally consistent and reflect a sensible hand-built information architecture, but provide no SEO benefit.

**Recommendation:** No action required — these fields are harmless and can remain for documentation/internal-prioritization value, or be removed to slightly reduce payload size. Not worth prioritizing given the Critical/High issues above.

---

## Missing Pages Check (Sitemap.ts Logic vs. 38-Page Crawl Inventory)

Cross-referencing the 38-URL crawl inventory against `sitemap.ts`'s route-generation logic (assuming Finding #1 were fixed and the sitemap rendered as-coded today):

| Crawled URL | Covered by sitemap.ts? |
|---|---|
| `/` | Yes (staticRoutes) |
| `/prestations` | Yes |
| `/creation-site-internet-hautes-alpes` | Yes |
| `/boutique-e-commerce-hautes-alpes` | Yes |
| `/referencement-seo-hautes-alpes` | Yes |
| `/refonte-ai-friendly` | Yes |
| `/refonte-ia-friendly` | **No — orphan (Finding #4)** |
| `/maintenance-site-internet-hautes-alpes` | Yes |
| `/referencement-ia` | Yes |
| `/portfolio` | Yes |
| `/blog` | Yes |
| `/a-propos` | Yes |
| `/contact` | Yes |
| `/faq` | Yes |
| `/mentions-legales` | Yes |
| `/politique-de-confidentialite` | Yes |
| `/villes/briancon-hautes-alpes` | Yes (cityRoutes, if `getAllCityPageSlugs()` returns it) |
| `/villes/embrun-serre-poncon` | Yes |
| `/villes/gap-hautes-alpes` | Yes |
| `/portfolio/act-event-pro` | Yes — but **2x duplicate entries** (Finding #3) |
| `/portfolio/gaec-des-valentins` | Yes — but **2x duplicate entries** (Finding #3) |
| `/portfolio/gaudineto` | Yes — but **2x duplicate entries** (Finding #3) |
| `/portfolio/reves-d-aventures` | Yes |
| `/portfolio/reves-daventures` | Yes — **duplicate-content URL** (Finding #3) |
| `/portfolio/verdon-ebike` | Yes |
| 13x `/blog/{slug}` | Yes (postRoutes) |

**Summary:** 37 of 38 crawled URLs are covered by `sitemap.ts`'s logic; the 1 gap is `/refonte-ia-friendly` (Finding #4). Of the 38, 4 portfolio `<url>` entries would be duplicates/duplicate-content (3 exact-duplicate URLs + 1 different-slug duplicate-content URL), meaning the *theoretical* generated sitemap would contain ~41 `<url>` entries representing only 37 truly distinct, intended pages.

**Extra pages (in sitemap.ts logic but 404/redirected):** None identified — all `staticRoutes` paths correspond to live 200 pages per the crawl inventory, and `getAllCityPageSlugs()`/`getProjects()`/`getPosts()` are CMS-driven (no hardcoded stale slugs found).

---

## Location Page Quality Gate Assessment

- **City pages found:** 3 (`/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`), generated dynamically via `getAllCityPageSlugs()` querying Sanity `cityPage` documents.
- **30+ page WARNING threshold:** Not triggered (3 << 30).
- **50+ page HARD STOP threshold:** Not triggered (3 << 50).
- No location-page quality gate action required at this time. If the business expands to additional Hautes-Alpes towns (Guillestre, Briançon already covered, etc.) and approaches 30 `cityPage` documents, revisit this gate and confirm each new city page has ≥60% unique content (not just a city-name swap on a template) before scaling further.

---

## Priority Action Summary

1. **[Critical]** Fix the `/sitemap.xml` 404 — confirm `sitemap.ts` is deployed (likely a missing/stale deployment issue, Finding #1). This single fix unblocks Google Search Console's entire URL-discovery pipeline for this site.
2. **[High]** Clean up duplicate Sanity `project` documents (4 redundant docs) and resolve the `reves-d-aventures`/`reves-daventures` duplicate-content pair with a 301 redirect (Finding #3).
3. **[High]** Resolve `/refonte-ai-friendly` vs `/refonte-ia-friendly` duplication, then add the surviving URL to `sitemap.ts` (Finding #4).
4. **[Low]** Replace `new Date()` with real `_updatedAt`/edit timestamps for static, city, and project routes (Finding #5).
