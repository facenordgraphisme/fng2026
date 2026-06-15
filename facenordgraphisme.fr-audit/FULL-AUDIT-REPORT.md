# Full SEO Audit — facenordgraphisme.fr

**Audit date:** 2026-06-15
**Site:** https://www.facenordgraphisme.fr
**Business type:** Local Service Business (B2B professional services) — solo web design, e-commerce & SEO/GEO agency (Face Nord Graphisme, founder François-Xavier Pin), based in Puy-Sanières near Embrun, Hautes-Alpes (05), France. Monolingual French (fr-FR). Built with Next.js 16 + Sanity CMS, hosted on Vercel.
**Pages crawled:** 38 (well under the 500-page cap) — full inventory in `inventory.csv`, raw HTML cached in `raw/`.

---

## Executive Summary

### Overall SEO Health Score: 48 / 100

This site has a **strong content and schema foundation** (long-form, locally-specific blog posts; a genuine founder bio with real E-E-A-T signal; comprehensive JSON-LD coverage including FAQPage on every post) but is currently held back by a small number of **critical, fixable bugs** that are disproportionately damaging:

- The XML sitemap is completely unreachable (404), cutting off Google's primary discovery mechanism.
- Seven important pages tell Google they're duplicates of the homepage via a broken canonical tag.
- Two-thirds of the blog — the centerpiece of the GEO/AI-citation content strategy — contains encoding corruption, with three posts fully unreadable.
- The homepage itself renders a visibly broken black rendering artifact on mobile, the dominant device for this site's target audience.
- A placeholder phone number (`+33600000000`) is shipped in structured data to all 38 pages.

None of these require new content or a redesign — they are **configuration, deployment, and data-integrity fixes**. Closing the 6 items in Phase 1 of the action plan would likely move the health score from the high-40s into the 65-70 range on its own, before any of the Phase 2-4 content/authority work even begins.

### Score by Category

| Category | Score | Weight |
|---|---|---|
| Technical SEO | 34 / 100 | 20% |
| Content Quality | 48 / 100 | 20% |
| Sitemap & Indexation | 22 / 100 | 8% |
| Schema & Structured Data | 68 / 100 | 10% |
| Performance (Core Web Vitals) | 68 / 100 | 10% |
| AI Search Readiness (GEO) | 64 / 100 | 10% |
| Visual & Mobile UX | 45 / 100 | 8% |
| Local SEO | 42 / 100 | 8% |
| Search Experience (SXO) | 58 / 100 | 3% |
| Topic Clusters & Content Architecture | 47 / 100 | 2% |
| Backlink Profile | 30 / 100 | 1% |

*See "Scoring Methodology" note in `audit-data.json` for how this 11-category breakdown relates to the skill's default 7-category weighting.*

### Top 5 Critical Issues

1. **`/sitemap.xml` returns HTTP 404** — Google Search Console cannot read the sitemap at all. The fix (`src/app/sitemap.ts`) already exists in the repo, uncommitted.
2. **7 pages canonical to the homepage** (`/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite`) — risk of being dropped from the index as "duplicates."
3. **8 of 13 blog posts (62%) contain U+FFFD encoding corruption**, with 3 posts (324/268/136 corrupted characters) completely unreadable — directly undermines the blog's role as the GEO/AI-citation centerpiece.
4. **Black WebGL rendering artifacts on the mobile homepage**, above the fold — the agency's own homepage looks broken on the device type most of its prospects use.
5. **Duplicate, conflicting `ProfessionalService` schema with a placeholder phone number (`+33600000000`)** shipped to all 38 pages.

### Top 5 Quick Wins

1. **Strip the redundant "| Face Nord Graphisme" suffix** from 6 page titles (82-102 chars → fixes SERP truncation) — pure text edit.
2. **Demote the sitewide duplicate "Face Nord" `<h1>`** to a non-heading element — one shared-component edit fixes all 38 pages.
3. **Add 4 missing security headers** (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) via one `next.config`/`vercel.json` block.
4. **Move `llms.txt` into `public/`** — likely resolves alongside the sitemap fix (same routing root cause).
5. **Deploy the already-written `BlogPosting.inLanguage: "fr-FR"` fix** from `locale-audit-report.md` — code exists, just needs deploying.

---

## Technical SEO (Score: 34/100, Weight: 20%)

**What works:** `robots.txt` is valid (`Allow:/`, `Disallow:/studio/`, sitemap declared), HTTPS is enforced with a strong 2-year HSTS policy, all 38 crawled URLs return clean 200s with no broken links or redirect chains, URL structure is clean and descriptive, and every page is fully server-rendered (no JS-dependent content gaps for any crawler).

**Critical/High issues:**
- **`/sitemap.xml` returns HTTP 404** (`X-Matched-Path: /[slug]`) — the catch-all dynamic route intercepts the request instead of the `sitemap.ts` special-file route, which exists in the repo but isn't deployed/serving correctly.
- **7 pages canonical to the homepage** instead of themselves — see Sitemap section and Finding detail in `findings/technical.md`.
- **Sitewide duplicate `<h1>Face Nord</h1>`** on all 38 pages, in addition to each page's own H1.
- **Title double-suffix bug on 6 pages** (up to 102 characters) from the layout's `"%s | Face Nord Graphisme"` template double-applying.
- **5 of 6 recommended security headers absent** (only HSTS present).
- **`/llms.txt` also 404s** via the same routing issue as the sitemap.
- **`/refonte-ia-friendly`** is a live, indexable orphan not present in `sitemap.ts`.

Full detail, code snippets, and exact recommendations: `findings/technical.md`.

---

## Content Quality (Score: 48/100, Weight: 20%)

**What works:** `/a-propos` has a genuine, specific founder bio (strong E-E-A-T); all 7 service pages (950-1,400 words) and all 3 city pages (1,200-1,400 words) have solid topical depth; 11 of 13 blog posts run 2,500-3,900 words; FAQPage schema is present on every sampled post and city page; content reads as locally-specific with no generic filler.

**Critical/High issues:**
- **62% of blog posts (8/13) contain U+FFFD replacement-character corruption** — 3 posts (`le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes`: 324 occurrences, `seo-local-hautes-alpes-artisans-pme`: 268, `digitaliser-reservations-tourisme-hautes-alpes`: 136) are fully unreadable; 2 more (`prix-site-internet-artisan-pme-hautes-alpes`: 24, `balises-title-meta-description-pme-hautes-alpes`: 20) have partial-section corruption; 3 more have title/meta-only corruption (8-12 occurrences each).
- **`/refonte-ai-friendly` (1,216 words) vs `/refonte-ia-friendly` (421 words)** — near-duplicate, cannibalizing pages.
- **`/portfolio/reves-d-aventures` vs `/portfolio/reves-daventures`** — duplicate case-study content from 2 separate Sanity documents.
- **All 13 blog posts have `lastUpdated: null`** — no freshness signal for AI engines that weight recency.

Full detail: `findings/content.md`.

---

## Sitemap & Indexation (Score: 22/100, Weight: 8%)

**What works:** `sitemap.ts`'s *logic* correctly covers 37 of 38 crawled URLs across static, city, project, and post routes, all CMS-driven with no stale hardcoded slugs.

**Critical issues:**
- **The sitemap is 404 in production** — same root cause as Technical Finding #1; this is the dominant driver of this category's low score, since a sitemap whose logic is correct but which never reaches Google is functionally worthless.
- **`robots.txt` points to the broken sitemap URL** (resolves automatically once the above is fixed).
- **9 Sanity `project` documents exist for 5 unique projects** — 3 exact-duplicate-slug pairs plus the `reves-d-aventures`/`reves-daventures` pair — would produce ~41 `<url>` entries for ~37 distinct pages once the sitemap is live.
- **`/refonte-ia-friendly`** orphan not in `sitemap.ts` (see Technical/Content).
- Low: static/city/project routes use `lastModified: new Date()` (build date, not real edit date).

Full detail: `findings/sitemap.md`.

---

## Schema & Structured Data (Score: 68/100, Weight: 10%)

**What works:** A sitewide `@graph` (Organization + WebSite + ProfessionalService) is present on all 38 pages with correct `@id` anchors and `inLanguage: "fr-FR"`. All 7 service pages have page-specific `Service` schema (3 with real EUR `Offer` pricing). All 3 city pages have `LocalBusiness` + city-specific `FAQPage`. All 6 portfolio pages have `CreativeWork`. All sampled blog posts have well-formed `BlogPosting` with correct ISO 8601 dates. No deprecated types found.

**Critical/High issues:**
- **Two conflicting `ProfessionalService` blocks share `@id: "#localbusiness"`** on the homepage, one of which ships a placeholder `telephone: "+33600000000"` to all 38 pages.
- **`BlogPosting.inLanguage: "fr-FR"`** — coded but not deployed.
- **Mojibake corruption inside `FAQPage` JSON-LD** on `seo-local-hautes-alpes-artisans-pme` (structured data, not just visible text).
- Medium: no `BreadcrumbList` anywhere; `Service.provider` inconsistently linked to the canonical entity; city-page `LocalBusiness` blocks duplicate/conflict with the sitewide entity.
- Low: portfolio `CreativeWork` could be more specific; `/prestations` lacks an `ItemList` of its 7 services; no `AggregateRating`/`Review` schema anywhere.

Full detail: `findings/schema.md`.

---

## Performance — Core Web Vitals (Score: 68/100, Weight: 10%)

**Lighthouse results (lab data, 6 runs):**

| Page | Device | Performance | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Home | Desktop | 0.99 | 0.8s | 10ms | 0.004 |
| Home | Mobile | **0.74** | **4.3s** | **420ms** | 0 |
| `/prestations` | Desktop | 1.00 | 0.8s | 10ms | 0.013 |
| `/prestations` | Mobile | 0.90 | 3.0s | 230ms | 0 |
| Blog post | Desktop | 0.99 | 0.9s | 10ms | 0.007 |
| Blog post | Mobile | 0.81 | 4.1s | 260ms | 0 |

**What works:** Desktop is essentially perfect everywhere (0.99-1.00). CLS is excellent on every page/device (max 0.013). FCP is good even on mobile (0.9-1.2s).

**Issues:**
- **Mobile homepage LCP of 4.3s is in Google's "Poor" band** (>4.0s) — the worst of the three tested pages, almost certainly caused by the 3D WebGL hero blocking the main thread (TBT 420ms, TTI 4.8s).
- **98-121 KiB of unused JavaScript on every page** — a consistent shared-bundle cost (likely three.js/@react-three/fiber/drei + GSAP + Lenis) loaded regardless of whether a page needs the 3D hero.
- Blog and service mobile show the same LCP/TTI shape at lower severity, confirming this is a sitewide shared-bundle issue, not homepage-only.

Full detail: `findings/performance.md`.

---

## Visual & Mobile UX (Score: 45/100, Weight: 8%)

**What works:** No horizontal overflow on any of 8 desktop/mobile captures; cookie-consent banner renders correctly and accessibly on mobile; desktop layouts are clean across all 4 sampled page types; no JS runtime errors anywhere.

**Critical issue:**
- **Large black rendering artifacts cover the top-right of the mobile homepage, above the fold** (`screenshots/home-mobile-fold-top-crop.png`). The canvas backing buffer is `780×1688` against a `390×844` CSS viewport — exactly 2x devicePixelRatio — consistent with a three.js resize/DPR handling bug leaving part of the backing buffer uncleared. This is the agency's own homepage looking visibly broken on the device type most prospects use; recommend treating as a P0 fix independent of the SEO timeline.

**Other issues:**
- The sitewide duplicate "Face Nord" `<h1>` is visually confirmed eating above-the-fold space on mobile (cross-ref Technical).
- Console warnings on every page (`THREE.THREE.Clock` deprecated) plus 4x "GPU stall due to ReadPixels" on desktop home, indicating a synchronous pixel-readback call that should be removed.

Full detail: `findings/visual.md`.

---

## AI Search Readiness — GEO (Score: 64/100, Weight: 10%)

**What works:** FAQPage schema sitewide on `/faq`, all city pages, and sampled blog posts; `ProfessionalService`/`LocalBusiness` schema with `GeoCoordinates` grounds the entity for local AI queries; the best posts (`4-signaux-citation-ia-artisans`, `geo-referencement-ia-artisans-pme-hautes-alpes`) are close to fully compliant with the `blog-strategy.md` GEO template, proving the template works; `PerplexityBot`/`GPTBot` are unblocked.

**Issues:**
- **`/llms.txt` 404s** (same routing issue as the sitemap).
- **Named statistics aren't hyperlinked to their sources** — a documented AI-citation credibility practice.
- **`prix-site-internet-artisan-pme-hautes-alpes`** falls short of the GEO checklist on every axis *and* is one of the mojibake-corrupted posts — high-priority rewrite candidate.
- **H2 question-format ratio below the 60-70% target** on 4 of 5 sampled articles.
- **Off-site brand-mention signals largely unbuilt** — same gap identified in Backlinks.
- Lower priority: no RSL 1.0 licensing signal; explicit per-bot AI crawler rules in `robots.txt` would add documentation clarity but nothing is currently blocked.

Full detail: `findings/geo.md`.

---

## Local SEO (Score: 42/100, Weight: 8%)

**What works:** A real `ProfessionalService`/`LocalBusiness` schema with `PostalAddress` and `GeoCoordinates` exists; all 3 city pages have locally-tailored FAQ content; `/a-propos` reinforces local-expertise positioning; the service area (Embrun, Gap, Briançon, Guillestre) is explicitly named in both content and schema.

**Critical/High issues:**
- **Placeholder/conflicting telephone numbers** (`+33600000000` sitewide vs `+33612345678` on city pages) — neither may be the real business line.
- **Three conflicting/duplicated `LocalBusiness`-type schema blocks** across the site (cross-ref Schema).
- **No `AggregateRating`/`Review` schema or visible testimonials** for the agency itself, despite the blog coaching clients on managing their own Google reviews.
- **No Google Business Profile link/Maps embed** anywhere on the site.

**Medium issues:**
- Dead placeholder social links (`href="#"`) in the footer.
- `addressLocality` spelling inconsistency ("Puy Sanières" vs "Puy-Sanières").
- Homepage copy says "Basé à Embrun" while the legal address is Puy-Sanières — needs consistent framing.
- City-page `LocalBusiness` blocks lack `geo`/`openingHoursSpecification`.
- No structured citation footprint beyond LinkedIn detectable.

Full detail: `findings/local.md`.

---

## Search Experience — SXO (Score: 58/100, Weight: 3%)

**What works:** Most landing pages match their target query's dominant intent; city pages correctly target local-modifier queries with dedicated FAQ content.

**Issues:**
- **`/refonte-ai-friendly` vs `/refonte-ia-friendly`** — same duplicate-intent issue as Content/Technical, viewed through a search-experience lens.
- **`/referencement-ia`** (commercial service page) is now out-depth'd by the site's own blog pillar covering the same GEO/AI-SEO query cluster — internal cannibalization between content types.
- City pages duplicate service-page sections rather than purely localizing intent.
- A persona-fit scoring matrix (4 personas × top landing pages) is available in `findings/sxo.md` for Phase 3 planning.

Full detail: `findings/sxo.md`.

---

## Topic Clusters & Content Architecture (Score: 47/100, Weight: 2%)

**What works:** `blog-strategy.md`'s 5-cluster plan is partially implemented (9-13 posts published); several posts demonstrate the intended hub-and-spoke linking pattern when followed correctly.

**Issues:**
- 2 broken internal links (404) — quick fix.
- `reservation-directe-eviter-commissions-booking-hautes-alpes` is a complete orphan with zero inbound internal links.
- Cluster 4 (E-commerce) has zero posts.
- Clusters 2 (Création de Site) and 5 (Tourisme) lack hub-spoke structure.
- Cross-cluster/cross-cluster-to-service-page linking is mostly nav-menu boilerplate, not contextual.
- `/referencement-ia` vs its blog pillar — cannibalization (cross-ref SXO).
- `/blog` index has no cluster/category navigation, so the strategy's structure is invisible to users and crawlers.

Full detail: `findings/cluster.md`.

---

## Backlink Profile (Score: 30/100, Weight: 1%)

**What works:** 5 confirmed, live, dofollow backlinks from real client websites (`act-event-pro.fr`, `gaecdesvalentins.fr`, `gaudineto.fr`, `revesdaventures.fr`, `verdonebike.com`), all with brand-consistent anchor text, all topically and geographically relevant to the Hautes-Alpes region.

**Issues:**
- **Domain not yet indexed in Common Crawl** (`cc-main-2026-jan-feb-mar`: `in_crawl: false`) — no off-site link signals detected beyond the 5 confirmed client links, consistent with a new/small domain.
- One referring site (`gaudineto.fr`) is non-HTTPS — the agency's own portfolio showcases an unsecured client deliverable.
- Anchor-text diversity is minimal (4 of 5 links use near-identical brand anchor text) — not a risk, but no current keyword-anchor signal.

*Confidence note:* this category used only free/tier-0 tooling (Common Crawl + direct verification). No Moz/Ahrefs/Bing Webmaster Tools data was available — re-run with a paid backlinks API if/when credentials are configured.

Full detail: `findings/backlinks.md`.

---

## Artifacts

- Per-category findings: `findings/*.md` (11 files)
- Structured audit data: `audit-data.json`
- Lighthouse reports: `findings/lighthouse-{home,service,blog}-{desktop,mobile}.json`
- Screenshots: `screenshots/` (8 full-page + fold captures, plus `capture-results.json` structured data)
- Raw HTML inventory: `raw/*.html`, `inventory.csv`
- Prioritized action plan: `ACTION-PLAN.md`
