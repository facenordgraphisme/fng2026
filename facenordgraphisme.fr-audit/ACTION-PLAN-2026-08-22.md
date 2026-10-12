# SEO Action Plan — facenordgraphisme.fr — Updated 2026-08-22

Generated from `FULL-AUDIT-REPORT-2026-08-22.md`. Score moved **48 → 71/100** since the 2026-06-15 baseline. This plan covers what's newly broken (regressions), what's still open from June, and what to prioritize next.

---

## Phase 1: Regressions & Quick Fixes (this week)

These are new or newly-reappeared bugs — small, high-confidence fixes.

### 1.1 Fix the title double-suffix bug on 6 portfolio pages
- **Why:** The exact bug fixed on 6 pages in June (`"%s | Face Nord Graphisme"` layout template double-applying onto an already-suffixed page title) has reappeared on all 6 portfolio detail pages, producing 91-114 character titles.
- **What:** In `src/app/portfolio/[slug]/page.tsx`, strip the trailing `"| Face Nord Graphisme"` from the page-level title/`generateMetadata()` the same way it was fixed on the original 6 pages. Consider a shared helper so this class of bug can't recur a third time.
- **Verify:** `curl -s <url> | grep '<title>'` for all 6 portfolio URLs — should be a single suffix, under ~60 chars.
- **Ref:** `findings-2026-08-22/technical.md`, `findings-2026-08-22/content.md`

### 1.2 Redirect the old duplicate portfolio slug instead of 404
- **Why:** `/portfolio/reves-daventures` was removed (good — resolves the duplicate) but now returns a bare 404 instead of a 301 to `/portfolio/reves-d-aventures`, losing link equity and showing visitors a dead page.
- **What:** Add a `redirects()` entry in `next.config.ts` for `/portfolio/reves-daventures` → `/portfolio/reves-d-aventures`.
- **Ref:** `findings-2026-08-22/content.md`, `findings-2026-08-22/sitemap.md`

### 1.3 Fix relative portfolio image URLs in schema
- **Why:** All 6 portfolio `CreativeWork.image` JSON-LD values are now relative (`/assets/portfolio/...`) instead of absolute — fails structured-data validation.
- **What:** Ensure the image URL builder always emits absolute URLs (Sanity CDN or full site origin) in the schema generator.
- **Ref:** `findings-2026-08-22/schema.md`

### 1.4 Add blog pillars to `/llms.txt`
- **Why:** `/llms.txt` is live and well-formed but only lists service/city/static pages — none of the 13 blog posts, including the GEO/SEO-Local pillars specifically recommended in June.
- **What:** Add a "Guides"/"Blog" section to `public/llms.txt` linking `geo-referencement-ia-artisans-pme-hautes-alpes` and `seo-local-hautes-alpes-artisans-pme` with one-line descriptions. ~10 minutes.
- **Ref:** `findings-2026-08-22/geo.md`

### 1.5 Wire the founder's LinkedIn into `BlogPosting.author.sameAs`
- **Why:** Flagged as a "5-minute fix" in June; `author.sameAs` still renders as an empty array on every post.
- **What:** Add the personal LinkedIn URL to the `Person` schema in the Sanity query/schema mapping (`src/sanity/lib/queries.ts` or equivalent).
- **Ref:** `findings-2026-08-22/geo.md`

### 1.6 Fix the 2 broken internal blog links + link the orphan post
- **Why:** Both issues are unchanged since June: `/blog/gbp-artisans-hautes-alpes` and `/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes` still 404 from 3 and 2 posts respectively; `reservation-directe-eviter-commissions-booking-hautes-alpes` still has zero inbound links after 10+ weeks.
- **What:** Fix the 2 broken hrefs to their correct current slugs. Add at least one contextual inbound link to the orphan post from `digitaliser-reservations-tourisme-hautes-alpes` or the SEO Local hub.
- **Ref:** `findings-2026-08-22/cluster.md`

---

## Phase 2: Mobile Performance (Weeks 2-3) — the one category that got worse

### 2.1 Defer the 3D hero on mobile — still not done, now higher priority
- **Why:** Mobile LCP is now "Poor" (>4.0s) on **all three** tested templates (home 4.23s, `/prestations` 4.12s — newly crossed the threshold since June, blog 4.66s). This was Phase 2 priority in June and has not been actioned; the regression on `/prestations` suggests the underlying bundle cost grew, not shrank.
- **What:** Load the three.js/`@react-three/fiber` hero via `next/dynamic({ ssr: false })`, deferred until after LCP paints (`requestIdleCallback` or `IntersectionObserver`). Confirm the actual LCP element via `findings-2026-08-22/lighthouse-home-mobile.json`'s `largest-contentful-paint-element` audit detail first.
- **Ref:** `findings-2026-08-22/performance.md`

### 2.2 Investigate and fix the transient black WebGL artifact
- **Why:** Confirmed via 5x reproducibility testing to still occur ~2.5s after page load (self-clearing by ~4.5s) on **both mobile and desktop**, across all 3 templates — broader than the mobile-home-only scope documented in June. Real visitors on slower connections will see this during first impression.
- **What:** This is very likely the same root cause as 2.1 (WebGL canvas resize/DPR handling during the hero's mount sequence) — fixing the deferred-mount strategy in 2.1 should be validated against this artifact specifically, not just LCP numbers.
- **Ref:** `findings-2026-08-22/visual.md`

### 2.3 Code-split the three.js/GSAP/Lenis bundle
- **Why:** Unused shared JS improved slightly (98-121 KiB → 70-106 KiB) but the structural issue is unchanged — every page pays this cost regardless of whether it renders the 3D hero.
- **What:** Use `@next/bundle-analyzer` to confirm chunk composition, then code-split via `next/dynamic` so only pages that render the 3D hero load it.
- **Ref:** `findings-2026-08-22/performance.md`

---

## Phase 3: Authority & Content Layer (Month 2) — completely unexecuted since June

Everything in this phase was recommended in June with zero progress in 10 weeks. These are content/business tasks, not code — but they are the single highest-leverage remaining work per the GEO scoring model.

### 3.1 Build off-site brand-authority signals
- **What:** Create a YouTube channel (the strongest single GEO correlation signal per `blog-strategy.md`'s own data), claim/verify Google Business Profile, and add both to `Organization.sameAs`. This was a Month-1 roadmap item in `blog-strategy.md` — now ~2.5 months overdue.
- **Ref:** `findings-2026-08-22/geo.md`, `findings-2026-08-22/local.md`

### 3.2 Hyperlink named statistics/sources across the blog
- **What:** Add outbound links to original sources for named statistics, starting with `4-signaux-citation-ia-artisans` (0 currently, despite being the "template-compliant" flagship post). Target `blog-strategy.md`'s own 8-sources-per-article standard.
- **Ref:** `findings-2026-08-22/geo.md`

### 3.3 Collect testimonials + add Review/AggregateRating schema
- **What:** Reach out to the 5 confirmed backlink clients for short testimonials; add `Review`/`AggregateRating` schema once collected.
- **Ref:** `findings-2026-08-22/local.md`

### 3.4 Build a baseline local citation profile
- **What:** List the business on Pages Jaunes, CCI Hautes-Alpes, and tourism-office directories. Automated verification of PagesJaunes is blocked by bot protection, so this needs manual follow-through and manual confirmation.
- **Ref:** `findings-2026-08-22/backlinks.md`, `findings-2026-08-22/local.md`

### 3.5 Fix remaining mojibake in page metadata (not body text)
- **Why:** The body-text encoding fix was 88% effective sitewide but didn't touch `<title>`/meta-description generation. 5 posts still carry 2 U+FFFD characters each in metadata, most visibly `prix-site-internet-artisan-pme-hautes-alpes`'s `<title>` ("d�s 800 ?").
- **What:** Locate the separate metadata-generation code path (likely a distinct `seoTitle`/`metaDescription` Sanity field not covered by the body find-replace pass) and apply the same fix.
- **Ref:** `findings-2026-08-22/content.md`, `findings-2026-08-22/geo.md`

### 3.6 Resume the content calendar / unblock Cluster 4 (E-commerce)
- **Why:** No new blog posts in 10+ weeks; the E-commerce cluster's pillar post is now behind its own `blog-strategy.md` schedule.
- **What:** Publish the Cluster 4 pillar, then build hub-spoke internal links for Clusters 2 (Création de Site) and 5 (Tourisme), which still lack them.
- **Ref:** `findings-2026-08-22/cluster.md`

### 3.7 Trim the `/referencement-ia` vs. GEO-pillar content overlap
- **Why:** A reciprocal link was added since June, but the near-duplicate H2 explainer sections on the service page are unchanged.
- **What:** Refocus `/referencement-ia` on the commercial offer (pricing, process, CTA); keep the blog pillar as the educational deep-dive.
- **Ref:** `findings-2026-08-22/sxo.md`

### 3.8 Fix NAP/address consistency
- **What:** Standardize "Puy-Sanières" (hyphenated) everywhere — still inconsistent between `layout.tsx` and `villes/[slug]/page.tsx`. Reconcile "Basé à Embrun" copy (fixed in one spot, not others).
- **Ref:** `findings-2026-08-22/local.md`

---

## Phase 4: Monitoring & Iteration (Ongoing)

- **Re-run Lighthouse on a quiet machine** to get a clean TBT reading — this re-audit's numbers were captured with ~29 concurrent Chrome processes from parallel audit tooling, which may have inflated TBT (LCP is unaffected and high-confidence).
- **Re-run the Common Crawl backlink check** once `cc-main-2026-apr-may-jun` (or later) publishes.
- **Add `Person`/`Organization` off-site presence** (3.1) before the next audit cycle — this is the largest single lever left untouched.
- **Watch for a third occurrence of the title-double-suffix bug** — it has now appeared twice on two different route types (service pages in June, portfolio pages in August), suggesting the underlying title-template logic itself should be hardened, not just patched per-route.
- **Re-screenshot the WebGL artifact** after the 3D-hero deferral fix (2.1/2.2) ships, to confirm it's resolved rather than just harder to catch.

---

## Expected Impact

Phase 1 (6 items) is entirely regressions and quick, code-only fixes — a few hours of work to close out. Phase 2 (mobile performance) is the one category that got worse since June and should be treated as urgent, since the agency's own site now fails Core Web Vitals on mobile more severely than in June. Phase 3 is unchanged from June's own Phase 3 — it remains unexecuted and is the actual ceiling on the AI Search Readiness, Local SEO, and Backlink Profile scores, none of which can improve further without it.
