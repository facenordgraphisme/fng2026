# Crawl Summary — facenordgraphisme.fr

**Site:** https://www.facenordgraphisme.fr
**Business:** Solo web design / SEO agency (Face Nord Graphisme, founder François-Xavier Pin), based in Embrun, Hautes-Alpes (05), France. Sells website creation, e-commerce, SEO/GEO, and maintenance services to local artisans/PME/tourism businesses in Gap, Briançon, Embrun, Guillestre. Monolingual French (fr-FR). Built with Next.js 16 + Sanity CMS, hosted on Vercel.

**Crawl date:** 2026-06-15. 38 live pages discovered (well under the 500-page cap). Raw HTML cached in `facenordgraphisme.fr-audit/raw/*.html`. Full metadata table in `facenordgraphisme.fr-audit/inventory.csv`.

## Site structure (38 URLs)
- Home: `/`
- Service pages (7): `/prestations`, `/creation-site-internet-hautes-alpes`, `/boutique-e-commerce-hautes-alpes`, `/referencement-seo-hautes-alpes`, `/refonte-ai-friendly`, `/refonte-ia-friendly` (NOT in sitemap.ts — orphan duplicate), `/maintenance-site-internet-hautes-alpes`, `/referencement-ia`
- Core pages (7): `/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite`
- City pages (3): `/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`
- Portfolio (6, from 5 unique projects): `/portfolio/act-event-pro`, `/portfolio/gaec-des-valentins`, `/portfolio/gaudineto`, `/portfolio/reves-d-aventures`, `/portfolio/reves-daventures` (DUPLICATE of reves-d-aventures), `/portfolio/verdon-ebike`
- Blog (13 posts, all `/blog/{slug}`)

## ALREADY-CONFIRMED CRITICAL FINDINGS (do not re-derive, but factor into your category — verify/expand as relevant)

1. **`/sitemap.xml` returns HTTP 404** (`X-Matched-Path: /[slug]`, served by the catch-all route, `noindex` meta present). `src/app/sitemap.ts` exists in the repo (currently uncommitted/modified locally) but production does not serve it. Critical technical/sitemap issue — Search Console cannot read the sitemap.
2. **7 pages have `<link rel="canonical">` pointing to the HOMEPAGE instead of themselves**: `/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite`. This tells Google these pages are duplicates of `/` — risk of non-indexing.
3. **Every page renders TWO `<h1>` tags**, and the first is always the literal text `>Face Nord</h1>` (a hero/branding element, in `src/components/HomeHero.tsx` or shared layout) — identical duplicate H1 across all 38 pages, diluting the page-specific H1.
4. **Title-tag double-suffix bug** on 6 pages (`/creation-site-internet-hautes-alpes`, `/refonte-ai-friendly`, `/referencement-ia`, `/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`): page-level title already contains "Face Nord Graphisme" AND the root layout's `template: "%s | Face Nord Graphisme"` (`src/app/layout.tsx:30-32`) appends it again → titles like "X | Face Nord Graphisme | Face Nord Graphisme" (82-102 chars, truncated in SERPs).
5. **Duplicate/cannibalizing pages**: `/refonte-ai-friendly` (in sitemap.ts) vs `/refonte-ia-friendly` (live, linked from homepage nav, NOT in sitemap.ts) — same search intent ("refonte AI/IA-friendly"), two different titles/content, both self-canonical and indexable.
6. **Duplicate Sanity `project` documents**: Sanity dataset `production` (project `k4x2bvj1`) contains 9 `project` docs for only 5 unique projects — `act-event-pro`, `gaec-des-valentins`, `gaudineto` each have 2 identical-slug duplicate docs (sitemap will list the same URL twice), and "Rêves d'Aventures" has TWO docs with DIFFERENT slugs (`reves-d-aventures` and `reves-daventures`) producing two live duplicate-content pages.
7. **Encoding/mojibake bug**: 4 blog post `<title>` tags contain literal U+FFFD replacement characters (�) instead of accented French characters — `/blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes` ("Visibilit�"), `/blog/digitaliser-reservations-tourisme-hautes-alpes` ("R�servations"), `/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` ("strat�gie"), `/blog/prix-site-internet-artisan-pme-hautes-alpes` ("d�s 800"). Verified in raw served HTML bytes (not a tooling artifact) — likely corrupted `seoTitle` field in Sanity, needs retyping at source.

## Credentials / integrations available
- Google API (PageSpeed/CrUX/GSC/GA4): **NOT configured** (tier -1)
- Moz/Bing backlinks: **NOT configured**; Common Crawl available (tier 0)
- DataForSEO MCP: not checked/likely unavailable — use free/lab tools
- Drift baseline: none exists (this is the first audit)
- Playwright and Lighthouse CLI: **available** for visual/performance testing

## Prior context (existing files in repo root, written 2026-06-05)
- `blog-strategy.md` — full 5-cluster content strategy already drafted (SEO Local, Création Site, GEO/IA, E-commerce, Tourisme Digital), 9-13 posts published so far, competitive analysis already done (no local competitor has an active blog)
- `locale-audit-report.md` — locale/hreflang audit already done (site is monolingual FR, no i18n needed, og:locale/inLanguage fixes already applied in code but uncommitted)
