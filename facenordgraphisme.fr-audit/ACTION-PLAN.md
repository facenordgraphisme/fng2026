# SEO Action Plan — facenordgraphisme.fr

Generated from `FULL-AUDIT-REPORT.md` and `audit-data.json` (audit date 2026-06-15). Items are grouped by priority phase; each links back to the detailed finding in `findings/*.md`.

---

## Phase 1: Critical Fixes (Week 1)

These 6 items are responsible for the largest share of the 48/100 score. None require new content — all are config, deploy, or data fixes.

### 1.1 Fix `/sitemap.xml` 404
- **Why:** Blocks Google Search Console from discovering the sitemap entirely. `robots.txt` correctly points to it, but it 404s in production.
- **What:** `src/app/sitemap.ts` exists in the repo (currently uncommitted/modified) and defines a complete sitemap. Confirm it builds and serves locally (`next build && next start`, then `curl localhost:3000/sitemap.xml`). If it 404s locally too, investigate routing precedence between the `sitemap.ts` special-file route and the `[slug]` catch-all (check `node_modules/next/dist/docs/` for this Next.js version's routing-precedence rules per `AGENTS.md`). Deploy, verify production returns `200` + `Content-Type: application/xml`, resubmit in GSC.
- **Ref:** `findings/technical.md` #1, `findings/sitemap.md` #1

### 1.2 Fix the 7 self-canonical violations
- **Why:** `/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite` all emit `<link rel="canonical" href="https://www.facenordgraphisme.fr">` — telling Google these are duplicates of the homepage.
- **What:** Find the shared metadata helper hardcoding the base URL as canonical and make each route compute `alternates.canonical` from its own path.
- **Verify:** `curl -s <url> | grep canonical` for all 7 URLs should show each page's own URL.
- **Ref:** `findings/technical.md` #2

### 1.3 Consolidate the duplicate `ProfessionalService` schema + remove placeholder phone number
- **Why:** Two JSON-LD blocks on the homepage share `@id: "#localbusiness"` with conflicting data, and `telephone: "+33600000000"` (a placeholder) ships to all 38 pages. City pages ship a *different* placeholder-looking number (`+33612345678`).
- **What:** Merge `src/app/layout.tsx`'s `@graph` `ProfessionalService` block with `src/app/page.tsx`'s homepage-only block (keep `description`, `email`, `areaServed` from the latter), delete the duplicate from `page.tsx`, and replace `telephone` everywhere with the **real business phone number** (or omit `telephone` entirely if none is public). A corrected JSON-LD snippet is in `findings/schema.md` #1.
- **Ref:** `findings/schema.md` #1, `findings/local.md` #1/#2

### 1.4 Fix U+FFFD encoding corruption in 8 blog posts (3 fully unreadable)
- **Why:** 62% of the blog — the centerpiece of the GEO/AI-citation strategy — contains replacement-character corruption. 3 posts are completely unreadable (324/268/136 occurrences each).
- **What:**
  1. Open one corrupted post in Sanity Studio and inspect the raw stored field value.
     - If the **stored value already contains `�`/U+FFFD**, the data itself is corrupted — it must be retyped or restored from Sanity revision history / the original draft (cannot be auto-fixed with a charset/regex change).
     - If the stored value looks correct but renders as `�`, it's a rendering/encoding-declaration bug — narrower fix.
  2. Fix the 3 fully-corrupted posts first: `le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes` (324), `seo-local-hautes-alpes-artisans-pme` (268), `digitaliser-reservations-tourisme-hautes-alpes` (136).
  3. Then the 2 partially-corrupted: `prix-site-internet-artisan-pme-hautes-alpes` (24), `balises-title-meta-description-pme-hautes-alpes` (20).
  4. Then the 3 title/meta-only: `gerer-avis-google-artisans-pme-hautes-alpes` (12), `google-business-profile-artisans-hautes-alpes` (8), `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` (8).
  5. Set `lastUpdated` on each post as it's fixed (also addresses Content Finding #4).
- **Verify:** `grep -o $'\xef\xbf\xbd' <file> | wc -l` should return `0` for all 13 posts after re-fetching the live HTML.
- **Ref:** `findings/content.md` #1, `findings/schema.md` #3

### 1.5 Fix the black WebGL artifact on mobile homepage
- **Why:** The agency's own homepage shows large black rectangular rendering artifacts above the fold on mobile — the dominant device for this audience. This is a P0 visual bug independent of SEO.
- **What:** Reproduce in Chrome DevTools mobile emulation (e.g. iPhone 12, DPR 2) vs. DPR 1 — `capture-results.json` shows the canvas backing buffer (`780×1688`) is exactly 2x the CSS viewport (`390×844`), pointing at a `devicePixelRatio` resize bug in the three.js/`@react-three/fiber` hero. In the resize handler, ensure `renderer.setPixelRatio(window.devicePixelRatio)` is called *before* `renderer.setSize(width, height, false)`, and `camera.updateProjectionMatrix()` runs after any resize.
- **Ref:** `findings/visual.md` #1

### 1.6 Merge `/refonte-ai-friendly` and `/refonte-ia-friendly`
- **Why:** Two indexable pages target the identical "refonte AI/IA-friendly" intent with very different depth (1,216 vs 421 words) — classic cannibalization, and only one is in `sitemap.ts`.
- **What:** Pick one URL (check which spelling — "ai" vs "ia" — better matches actual French search queries; `/refonte-ai-friendly` has the deeper content and is already in the sitemap). Merge the stronger content, cleaner title, and extra schema block from the losing page into the winner, then **301-redirect** the other URL. Update `sitemap.ts`'s static routes to list only the surviving URL.
- **Ref:** `findings/content.md` #2, `findings/sxo.md` #1, `findings/technical.md` #7

---

## Phase 2: High-Impact Improvements (Weeks 2-3)

### 2.1 Demote the sitewide duplicate "Face Nord" `<h1>`
- **Why:** All 38 pages render `<h1>Face Nord</h1>` from a shared hero/branding component *in addition to* the page-specific H1 — diluting the page-specific heading signal and (on mobile) eating above-the-fold space.
- **What:** Change the tag in the shared hero/header component (e.g. `src/components/HomeHero.tsx` or the shared layout) from `<h1>` to a non-heading element (`<div>`/`<span>`/`<p>`).
- **Ref:** `findings/technical.md` #3, `findings/visual.md` #2

### 2.2 Strip the redundant title suffix on 6 pages
- **Why:** `src/app/layout.tsx`'s title template `"%s | Face Nord Graphisme"` double-appends the brand on 6 pages whose own titles already end in "| Face Nord Graphisme", producing 82-102 char titles that get truncated in SERPs.
- **What:** Remove the trailing `| Face Nord Graphisme` from the page-level `title`/`generateMetadata()` for: `/creation-site-internet-hautes-alpes`, `/refonte-ai-friendly` (or its surviving merged URL per 1.6), `/referencement-ia`, `/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`.
- **Ref:** `findings/technical.md` #4

### 2.3 Add missing security headers
- **Why:** Only `Strict-Transport-Security` is present; `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Content-Security-Policy` are all absent.
- **What:** Add a `headers()` block (next.config or `vercel.json`) for `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Treat CSP as a separate follow-up (needs careful testing against three.js/GSAP/Lenis/Sanity CDN).
- **Ref:** `findings/technical.md` #5

### 2.4 Move `llms.txt` to `public/`
- **Why:** `/llms.txt` 404s via the same `[slug]` catch-all routing issue as the sitemap.
- **What:** Once 1.1's routing fix lands, add `public/llms.txt` with a structured summary of site sections/content and verify it serves with `Content-Type: text/plain`.
- **Ref:** `findings/technical.md` #6, `findings/geo.md` #1

### 2.5 Deploy the pending locale fixes
- **Why:** `locale-audit-report.md` (2026-06-05) describes fixes already coded but not deployed: `og:locale: 'fr_FR'`, `BlogPosting.inLanguage: "fr-FR"`, and the `lastModified` sitemap fix.
- **What:** Commit and deploy the currently-modified `src/app/blog/[slug]/page.tsx`, `src/app/sitemap.ts`, and `src/sanity/lib/queries.ts`. Re-verify live JSON-LD on a sampled post shows `"inLanguage": "fr-FR"` on the `BlogPosting` node.
- **Ref:** `findings/schema.md` #2

### 2.6 Deduplicate Sanity `project` documents
- **Why:** 9 documents exist for 5 unique projects — 3 exact-duplicate-slug pairs (`act-event-pro`, `gaec-des-valentins`, `gaudineto`) plus the `reves-d-aventures`/`reves-daventures` content-duplicate pair.
- **What:** In Sanity Studio, delete the 3 redundant exact-duplicate documents. For the Rêves d'Aventures pair, keep the 386-word `reves-daventures` content but move it to the `reves-d-aventures` slug (consistent with the other 5 portfolio slugs' all-hyphenated pattern), trim its 109-char title to ~60 chars, delete the other document, and 301-redirect `/portfolio/reves-daventures` → `/portfolio/reves-d-aventures`.
- **Ref:** `findings/content.md` #3, `findings/sitemap.md` #3

### 2.7 Fix 2 broken internal links
- **Why:** Quick-win — 2 internal links currently 404, contributing to inbound-link orphaning for at least one post.
- **What:** Identify and fix the 2 broken links (specific source/target pairs in `findings/cluster.md` #1).
- **Ref:** `findings/cluster.md` #1

### 2.8 Add `BreadcrumbList` schema
- **Why:** No `BreadcrumbList` JSON-LD exists anywhere despite breadcrumb navigation being a commonly marketed deliverable.
- **What:** Add `BreadcrumbList` schema to all non-homepage pages reflecting the actual nav hierarchy (e.g. Home > Prestations > [Service], Home > Blog > [Post]).
- **Ref:** `findings/schema.md` #5

### 2.9 Defer the 3D hero on mobile to fix LCP
- **Why:** Mobile homepage LCP is 4.3s (Google "Poor" band, >4.0s), TBT 420ms — the worst Lighthouse score of the audit (0.74).
- **What:** Load the three.js/`@react-three/fiber` hero via `next/dynamic` with `ssr: false`, mounting only after the LCP element has painted (e.g. `requestIdleCallback` or `IntersectionObserver`). First confirm the actual LCP element via the `largest-contentful-paint-element` audit detail in `findings/lighthouse-home-mobile.json`.
- **Ref:** `findings/performance.md` #1

---

## Phase 3: Content & Authority (Month 2)

### 3.1 Fix NAP consistency: "Puy Sanières" vs "Puy-Sanières" and the "Basé à Embrun" framing
- **What:** Standardize on "Puy-Sanières" (official spelling) everywhere — schema, visible address, any future GBP listing. Reconcile homepage copy ("Basé à Embrun") with the legal address (Puy-Sanières, a village near Embrun) — either use "Puy-Sanières (près d'Embrun)" consistently or explain the relationship once.
- **Ref:** `findings/local.md` #6/#7

### 3.2 Add Google Business Profile link/Maps embed
- **What:** Add a GBP profile link (and/or embedded map) to the footer or `/contact`, ensuring NAP details match the GBP listing exactly once 3.1 is resolved.
- **Ref:** `findings/local.md` #4

### 3.3 Replace dead footer social links
- **What:** Link the footer social icons (`href="#"`) to real, active profiles, or remove them. Also helps the off-site brand-mention gap from `findings/geo.md` #7.
- **Ref:** `findings/local.md` #5

### 3.4 Collect client testimonials + add Review/AggregateRating schema
- **What:** Reach out to the 5 confirmed portfolio clients (act-event-pro, GAEC des Valentins, Gaudineto, Rêves d'Aventures, Verdon E-Bike — all already linking back, see Backlinks) for 3-5 short testimonials. Add `Review`/`AggregateRating` schema once collected.
- **Ref:** `findings/local.md` #3, `findings/schema.md` #10

### 3.5 Build hub-spoke structure for Clusters 2 & 5
- **What:** Designate a pillar post for "Création de Site" (Cluster 2) and "Tourisme" (Cluster 5), then add "related articles" internal links from each cluster's spoke posts back to its pillar.
- **Ref:** `findings/cluster.md` #4

### 3.6 Differentiate `/referencement-ia` from its blog pillar
- **What:** `geo-referencement-ia-artisans-pme-hautes-alpes` (blog) now out-depths `/referencement-ia` (service page) for overlapping GEO/AI-SEO queries. Refocus the service page on the commercial offer (pricing, process, CTA), keep the blog post as the comprehensive educational treatment, and add strong contextual links from the pillar to the service page.
- **Ref:** `findings/cluster.md` #6, `findings/sxo.md` #2

### 3.7 Hyperlink statistical sources in blog posts
- **What:** Add outbound links to original sources for statistics cited by name across the blog corpus — start with the highest-traffic pillar posts. Documented AI-citation credibility practice per `blog-strategy.md`.
- **Ref:** `findings/geo.md` #4

### 3.8 Increase H2 question-format ratio
- **What:** When revising posts (especially during the Phase 1.4 mojibake pass), convert more H2s to natural-language question format (e.g. "Combien coûte un site internet pour artisan ?") toward the documented 60-70% target.
- **Ref:** `findings/geo.md` #6

### 3.9 Start populating `lastUpdated` in Sanity
- **What:** Every future content edit should set `lastUpdated` so `sitemap.ts`'s `lastModified` reflects real freshness. Establish a periodic freshness-review cadence per `blog-strategy.md`'s roadmap.
- **Ref:** `findings/content.md` #4

### 3.10 Build a baseline local citation profile
- **What:** List the business on Pages Jaunes, CCI Hautes-Alpes, and relevant tourism-office partner directories (several portfolio clients are tourism businesses). Addresses both the Backlinks "not in Common Crawl" gap and the Local SEO "no structured citation footprint" gap.
- **Ref:** `findings/backlinks.md` #1, `findings/local.md` #9

### 3.11 Code-split the three.js/GSAP/Lenis bundle
- **What:** Use `@next/bundle-analyzer` to confirm which chunks contain the 3D/animation libraries and whether they're in the shared layout bundle (98-121 KiB unused JS on every page). Code-split via `next/dynamic` so only pages that render the 3D hero pay its cost.
- **Ref:** `findings/performance.md` #2

---

## Phase 4: Monitoring & Iteration (Ongoing)

- **Re-run Lighthouse** on home/blog/service mobile after 2.9 and 3.11 land, to confirm a uniform improvement across all three page types (`findings/performance.md` #3).
- **Migrate `gaudineto.fr` to HTTPS** — the agency's own portfolio currently links to a client site without TLS; free via Let's Encrypt on most hosts (`findings/backlinks.md` #2).
- **Vary credit-link anchor text** on future portfolio projects (currently 4 of 5 use near-identical brand anchor text — healthy but worth light variation going forward) (`findings/backlinks.md` #3).
- **Add cluster/category navigation to `/blog`** so the 5-cluster content strategy is visible to users and crawlers, not just nav-menu boilerplate (`findings/cluster.md` #7).
- **Add `Service`/`OfferCatalog` area-served markup** once the schema consolidation (1.3) is complete, cross-linking the 7 `Service` entities to the 3 city pages (`findings/local.md` #10).
- **Expand portfolio case studies** (currently 264-386 words each) with process/outcome detail mirroring the blog's case-study structure (`findings/content.md` #5).
- **Re-run the Common Crawl backlink check** in 2-3 months as new releases publish (`findings/backlinks.md` #1 follow-up).
- **Quarterly freshness review**, prioritizing `prix-site-internet-artisan-pme-hautes-alpes` (weakest post on both encoding and GEO-checklist dimensions) (`findings/geo.md` #5).

---

## Expected Impact

Phase 1 alone addresses the 5 Critical findings driving most of the gap between the current **48/100** and a healthy score. None of the Phase 1 items require new content, design work, or third-party dependencies — they are configuration, deployment, and CMS data-integrity fixes that a developer with repo + Sanity Studio access can complete within a single week.
