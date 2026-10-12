# Full SEO Audit — facenordgraphisme.fr — DRIFT RE-AUDIT

**Audit date:** 2026-08-22 (baseline: 2026-06-15, ~10 weeks prior)
**Site:** https://www.facenordgraphisme.fr
**Business type:** Local Service Business (B2B professional services) — solo web design, e-commerce & SEO/GEO agency (Face Nord Graphisme, founder François-Xavier Pin), based in Puy-Sanières near Embrun, Hautes-Alpes (05), France. Next.js 16 + Sanity CMS, hosted on Vercel.
**Context:** Between the two audits, the domain's DNS was briefly misconfigured pointing at a different host (Hostinger) with an expired SSL certificate, then migrated back to Vercel on 2026-08-22 (same day as this re-audit). All findings below reflect the site as served by Vercel with a valid certificate.

---

## Executive Summary

### Overall SEO Health Score: 71 / 100 (was 48/100, **+23**)

This is a strong result. Nearly all of the June audit's Phase 1 "critical, fixable bugs" have been closed — the sitemap works, canonicals are fixed, the duplicate H1 is gone, security headers are live, the duplicate/placeholder-phone schema is cleaned up, and 88% of the blog's encoding corruption is resolved. The site moved from "actively broken in ways that block indexing" to "structurally sound with real remaining content/authority gaps."

However, three things need attention:

1. **A regression bug reappeared**: the exact title double-suffix pattern fixed on 6 pages in June has resurfaced on all 6 portfolio detail pages — same root cause, different route.
2. **Mobile performance got worse, not better**: LCP is now in Google's "Poor" band on all three page templates tested (home, service, blog), and `/prestations` mobile specifically crossed from "Needs Improvement" into "Poor" since June. The black WebGL rendering artifact flagged as P0 in June is still present (though now understood to be transient — see Visual section).
3. **Zero content/authority-layer progress in 10 weeks**: no new blog posts, no hyperlinked sources, no off-site brand signals (YouTube, `sameAs`), no Google Business Profile link, no client testimonials, no local citations built. Every item in June's Phase 3 roadmap is exactly where it was, and the content calendar's own Month-2/Month-3 deliverables are now overdue.

### Score by Category

| Category | June 15 | Aug 22 | Δ | Weight |
|---|---|---|---|---|
| Technical SEO | 34 | **84** | +50 | 20% |
| Content Quality | 48 | **76** | +28 | 20% |
| Sitemap & Indexation | 22 | **88** | +66 | 8% |
| Schema & Structured Data | 68 | **84** | +16 | 10% |
| Performance (Core Web Vitals) | 68 | **60** | −8 | 10% |
| AI Search Readiness (GEO) | 64 | **65** | +1 | 10% |
| Visual & Mobile UX | 45 | **52** | +7 | 8% |
| Local SEO | 42 | **49** | +7 | 8% |
| Search Experience (SXO) | 58 | **68** | +10 | 3% |
| Topic Clusters & Content Architecture | 47 | **40** | −7 | 2% |
| Backlink Profile | 30 | **30** | 0 | 1% |

### What Got Fixed (highlights)

- `/sitemap.xml` and `/llms.txt` both now return 200 (were 404) — Google/AI crawlers can discover the site again.
- All 7 self-canonical violations fixed; sitewide duplicate `<h1>Face Nord</h1>` removed.
- All 4 missing security headers deployed (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) alongside existing HSTS.
- Duplicate `ProfessionalService` schema consolidated; the placeholder phone number (`+33600000000`) replaced sitewide with the real number.
- Blog body-text encoding corruption dropped from ~800 to ~96 occurrences (−88%), with 5 of 8 previously-corrupted posts now fully clean.
- Both duplicate-content page pairs resolved: `/refonte-ia-friendly` → 308 redirect to `/refonte-ai-friendly`; `/portfolio/reves-daventures` removed in favor of `/portfolio/reves-d-aventures`.
- `BreadcrumbList` schema added to ~30 pages (services, cities, portfolio, blog).

### Top 5 Issues Still Open or New

1. **Title double-suffix bug regressed onto all 6 portfolio pages** (91-114 chars) — the identical bug pattern fixed elsewhere in June, reintroduced via `src/app/portfolio/[slug]/page.tsx`.
2. **Mobile Core Web Vitals regressed**: LCP "Poor" (>4.0s) on home (4.23s), `/prestations` (4.12s, newly crossed from "Needs Improvement"), and blog (4.66s). Root cause unchanged since June — the 3D WebGL hero still isn't deferred on mobile.
3. **Black WebGL rendering artifact still present** on mobile and now also confirmed on desktop, across all 3 tested page templates — self-clears after ~2 seconds but is visible during real page loads.
4. **Zero off-site authority signals built**: no GBP link, no reviews/testimonials, no YouTube channel, `sameAs` unchanged since June, no local citations (Pages Jaunes, CCI) — the single highest-leverage recommendation from June is fully unexecuted.
5. **Topic cluster / content calendar stalled**: 13 blog posts, unchanged since June; the 2 broken internal links and the orphan post from the June audit are still broken/orphaned; Cluster 4 (E-commerce) still has zero posts and is now behind its own roadmap schedule.

### Top 5 Quick Wins

1. Fix the portfolio-page title double-suffix (same fix pattern as the June service-page fix, applied to `src/app/portfolio/[slug]/page.tsx`).
2. Add a proper 301 redirect for `/portfolio/reves-daventures` instead of a bare 404 (currently loses link equity and shows visitors a dead page).
3. Fix the 6 portfolio `CreativeWork.image` JSON-LD values — now relative URLs, must be absolute.
4. Add the 2-3 blog pillar articles to `/llms.txt`'s link list (currently service/city pages only) — ~10 minutes.
5. Wire `Person.sameAs` (founder's LinkedIn) into `BlogPosting.author` schema — flagged as a "5-minute fix" in June, still not done.

---

## Technical SEO (Score: 84/100, was 34/100, Weight: 20%)

**Fixed:** `/sitemap.xml` (rewrite to `/api/sitemap` bypasses the `[slug]` catch-all), all 7 self-canonical pages, sitewide duplicate `<h1>`, 4 of 5 missing security headers, `/llms.txt`, and the `/refonte-ia-friendly` orphan (now a 308 redirect).

**Regressed:** The title double-suffix bug (originally on 6 pages, fixed there) has reappeared identically on all 6 portfolio detail pages (`/portfolio/act-event-pro`, `/verdon-ebike`, `/reves-d-aventures`, `/linstant-verdon`, `/gaec-des-valentins`, `/gaudineto`) — same root cause: page-level title already contains "Face Nord Graphisme" and the layout's `"%s | Face Nord Graphisme"` template double-applies it. Titles now run 91-114 characters.

**New minor issues:** `/api/sitemap` is directly reachable and serves duplicate content not blocked in `robots.txt`. Apex→www redirect is a 307 rather than 308 (cosmetic only). Only CSP remains unaddressed of the original 6 recommended headers (as flagged in June as a separate, higher-effort item).

Full detail: `findings-2026-08-22/technical.md`

---

## Content Quality (Score: 76/100, was 48/100, Weight: 20%)

**Fixed:** Body-text encoding corruption dropped sitewide from ~800 to 96 U+FFFD occurrences (−88%); 5 of 8 previously-corrupted posts are now fully clean (0 occurrences), including the two worst offenders (`seo-local-hautes-alpes-artisans-pme`: 268→0, `balises-title-meta-description`: 20→0). Both duplicate-page pairs resolved.

**Partially fixed:** Corruption is now confined to `<title>`/meta-description/JSON-LD fields on 3 posts (`le-guide-complet-...`: 48 remaining, `digitaliser-reservations-tourisme`: 8, `prix-site-internet-artisan-pme`: 24 unchanged) — the fix touched the article body-rendering pipeline but not the page-metadata generation path.

**Still present:** `lastUpdated: null` on all 13 posts despite body edits clearly having occurred in the interim.

**New minor regression:** the surviving `/portfolio/reves-d-aventures` page now has its own double "| Face Nord Graphisme" title suffix (same bug family as the Technical section's portfolio regression).

Full detail: `findings-2026-08-22/content.md`

---

## Sitemap & Indexation (Score: 88/100, was 22/100, Weight: 8%)

**Fixed — the single biggest win of this re-audit.** `/sitemap.xml` returns 200 with valid XML, 37 URLs, zero duplicates. The Sanity `project` document duplicates are cleaned up (9 docs → 6 clean, unique-slug docs; one new project, "L'instant Verdon," added since June). The orphan `/refonte-ia-friendly` is correctly excluded (redirects instead).

**Still present:** `lastModified` on the 24 non-blog URLs still uses build-time `new Date()` rather than real content-edit dates (only the 13 blog posts use real dates). Low severity.

Full detail: `findings-2026-08-22/sitemap.md`

---

## Schema & Structured Data (Score: 84/100, was 68/100, Weight: 10%)

**Fixed:** Duplicate `ProfessionalService` block removed; placeholder phone numbers replaced sitewide with the real number (`+33651113928`); `BlogPosting.inLanguage: "fr-FR"` live; mojibake inside `FAQPage` JSON-LD resolved.

**Partially fixed:** `BreadcrumbList` now live on ~30 pages (services, cities, portfolio, blog posts) but still missing on `/`, `/prestations`, `/faq`, `/a-propos`, `/contact`, `/mentions-legales`, and the `/blog` index.

**Still present:** No `ItemList` on `/prestations`, no `AggregateRating`/`Review` schema anywhere. `Service.provider` remains an untethered stub on all 7 service pages (0/7, down from 1/7 in June — the one previously-correct page now redirects elsewhere). City-page `LocalBusiness` blocks remain untethered duplicates with inconsistent `addressLocality` spelling.

**New regression:** All 6 portfolio `CreativeWork.image` values are now relative URLs instead of absolute Sanity CDN URLs — fails structured-data absolute-URL validation.

Full detail: `findings-2026-08-22/schema.md`

---

## Performance — Core Web Vitals (Score: 60/100, was 68/100, Weight: 10%) — REGRESSION

**Fresh Lighthouse results (2026-08-22, live URLs):**

| Page | Device | Performance | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Home | Desktop | 0.98 | 0.82s | 66ms | 0.007 |
| Home | Mobile | 0.70 | 4.23s | 613ms | 0 |
| `/prestations` | Desktop | 1.00 | 0.82s | 10.5ms | 0.007 |
| `/prestations` | Mobile | 0.81 | 4.12s | 262ms | 0 |
| Blog post | Desktop | 0.99 | 0.87s | 38ms | 0.007 |
| Blog post | Mobile | 0.77 | 4.66s | 250ms | 0 |

**What's still good:** Desktop remains near-perfect (0.98-1.00); CLS excellent everywhere (0-0.007).

**Regressed:** Mobile LCP is now in the "Poor" band (>4.0s) on **all three** page templates — previously only home was this bad; `/prestations` mobile specifically crossed from 3.0s ("Needs Improvement") in June to 4.12s ("Poor") now. Root cause unchanged: the 3D WebGL hero still blocks the main thread on mobile, and no `next/dynamic` deferral was found in the code.

**Marginal improvement:** Unused shared JS dropped from 98-121 KiB to 70-106 KiB, but the structural issue (every page pays this cost regardless of whether it renders the 3D hero) is unchanged.

**Methodology note:** this run had ~29 concurrent Chrome processes on the test machine from the other parallel audit agents, which likely inflated TBT specifically; LCP was stable across repeated runs and is high-confidence. Recommend a clean re-run of TBT numbers in isolation before treating them as final.

Full detail: `findings-2026-08-22/performance.md`

---

## Visual & Mobile UX (Score: 52/100, was 45/100, Weight: 8%)

**Fixed:** The sitewide duplicate "Face Nord" `<h1>` no longer eats above-the-fold mobile space (cross-ref Technical).

**Still present, with new detail:** The black WebGL rendering artifact is confirmed still present via a 5x reproducibility test — but it's now understood to be **transient**: it appears at ~2.5s post-load and self-clears by ~4.5s with no user interaction, on **both mobile and desktop**, across **all three** tested page templates (previously documented as mobile-home-only). Since real mobile page loads often take 2-4+ seconds, a meaningful share of visitors still see this during their first impression of the site. Canvas backing-buffer/CSS-viewport mismatch (2x DPR) is unchanged from baseline.

**Unchanged:** `THREE.THREE.Clock` deprecation warning and GPU-stall console warnings persist; no horizontal overflow; cookie-consent banner renders correctly on mobile.

Full detail: `findings-2026-08-22/visual.md`

---

## AI Search Readiness — GEO (Score: 65/100, was 64/100, Weight: 10%) — FLAT

**Fixed:** `/llms.txt` now live and well-structured (though it curates only service/city pages — the blog pillar articles aren't linked from it yet).

**Still present, unchanged:** Named statistics still not hyperlinked to sources on 4 of 5 sampled posts. H2 question-format ratio is now below target on **all 5** sampled articles (was 4/5) — the previously-closest article regressed from ~57% to ~37.5% after an unrelated content edit added a declarative H2. Off-site brand-mention signals (`sameAs`, YouTube, citations) completely unchanged.

**Partially fixed:** `prix-site-internet-artisan-pme-hautes-alpes` — body corruption resolved, but `<title>`/meta-description mojibake persists (`d�s 800 ?` instead of `dès 800 €`), and it still has zero GEO capsule/citation blocks.

Full detail: `findings-2026-08-22/geo.md`

---

## Local SEO (Score: 49/100, was 42/100, Weight: 8%)

**Fixed:** The placeholder telephone number is fully resolved — the real number (`+33651113928`) now appears consistently in all JSON-LD sitewide.

**Partially fixed:** Homepage duplicate schema resolved, but city pages still render a separate, untethered `LocalBusiness` block. The "Basé à Embrun" vs. Puy-Sanières framing was softened in one instance but not the other, or in meta descriptions.

**Still present, unchanged:** No testimonials/reviews/`AggregateRating`, no Google Business Profile link or Maps embed, dead `href="#"` social links (now relocated from footer to header, still non-functional), `Puy Sanières` vs `Puy-Sanières` spelling inconsistency, city-page schema still missing `geo`/`openingHoursSpecification`, no citation footprint beyond LinkedIn.

Full detail: `findings-2026-08-22/local.md`

---

## Search Experience — SXO (Score: 68/100, was 58/100, Weight: 3%)

**Fixed:** `/refonte-ai-friendly` vs `/refonte-ia-friendly` duplicate-intent issue resolved via the 308 redirect.

**Partially fixed:** `/referencement-ia` cannibalization — a reciprocal link from the blog pillar back to the service page now exists, but the near-duplicate H2 explainer content on the service page itself is unchanged.

**Still present:** City pages still duplicate service-page sections rather than purely localizing intent.

Full detail: `findings-2026-08-22/sxo.md`

---

## Topic Clusters & Content Architecture (Score: 40/100, was 47/100, Weight: 2%) — REGRESSION

**No fixes shipped.** All 7 baseline issues remain exactly as they were: the same 2 broken internal links, the same orphaned post (`reservation-directe-eviter-commissions-booking-hautes-alpes`), Cluster 4 (E-commerce) still has zero posts, Clusters 2 and 5 still lack hub-spoke structure, cross-linking is still nav-menu boilerplate, `/referencement-ia` cannibalization persists, and `/blog` still has no category navigation.

**Why the score dropped despite "no change":** the June baseline treated the E-commerce cluster gap and general roadmap pace as "on schedule." Ten weeks later with zero new posts published and the plan's own Month-2/Month-3 deliverables now overdue, stagnation has become slippage.

Full detail: `findings-2026-08-22/cluster.md`

---

## Backlink Profile (Score: 30/100, was 30/100, Weight: 1%) — UNCHANGED

All 5 confirmed client backlinks remain live, dofollow, and relevant (100% verification rate). No new backlinks, citations, or directory listings were confirmed since June. Common Crawl still shows the domain as not indexed — expected, since no newer Common Crawl release has published in the interim (releases run quarterly). `gaudineto.fr`'s HTTPS fix from June remains in place.

Full detail: `findings-2026-08-22/backlinks.md`

---

## Artifacts

- Per-category findings: `findings-2026-08-22/*.md` (11 files)
- Fresh Lighthouse reports: `findings-2026-08-22/lighthouse-*.json`
- New screenshots + reproducibility test: `screenshots-2026-08-22/`
- Prioritized action plan: `ACTION-PLAN-2026-08-22.md`
- Prior baseline (2026-06-15) preserved unmodified: `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, `findings/`, `screenshots/`
