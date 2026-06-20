# Re-Audit — facenordgraphisme.fr (local dev verification)

**Date:** 2026-06-15
**Target:** `http://localhost:3001` (Next.js 16 dev server, NOT yet deployed)
**Purpose:** Verify that the code/content fixes made in this session actually resolve the issues flagged by the original audit (`../FULL-AUDIT-REPORT.md`, baseline score **48/100**), and surface anything new before deploying.
**Pages crawled:** 39 routes (same set as the original audit, including both `/refonte-ai-friendly` and `/refonte-ia-friendly`).

---

## Executive Summary

Of the **6 Phase 1 (Critical)** and **9 Phase 2 (High-Impact)** action-plan items, **11 are now confirmed fixed** at the code/data level on the local build, **1 was explicitly deferred by user decision** (2.6, duplicate portfolio documents), and **3 are unverified/out of scope** for this session (2.7 broken links, 2.9 mobile 3D-hero deferral, parts of 2.5).

Two **new issues** were discovered during verification — neither was part of the original 34-item plan:

- **(A)** 5 blog posts still carry U+FFFD corruption in `seoTitle`/`seoDescription` (7 Sanity fields) — separate from the 59 body fields fixed earlier this session. **Requires fresh Sanity-write approval.**
- **(B)** Open Graph metadata (`og:locale`, `og:site_name`, `og:image`) is inconsistently present across page templates due to how Next.js merges per-page `openGraph` objects with the layout's. **Code-only fix, no CMS write.**

### Estimated Health Score: ~75-77 / 100 (was 48/100)

This is a **local, pre-deployment estimate**. It assumes the Performance/CWV category improves modestly (the visible black-canvas bug is fixed) but does **not** confirm a production Lighthouse run — local dev server timings are not representative of production Core Web Vitals. Local SEO, SXO, Topic Clusters, and Backlinks categories are essentially unchanged (Phase 3/4 work, out of scope this session).

| Category (orig. weight) | Before | After (est.) | Status |
|---|---|---|---|
| Technical SEO (20%) | 34 | **~85** | ✅ sitemap, canonicals, headers, llms.txt, redirect all fixed |
| Content Quality (20%) | 48 | **~78** | ✅ body corruption gone; ⚠️ meta-field corruption remains (finding A) |
| Sitemap & Indexation (8%) | 22 | **~70** | ✅ now serves 200/XML; ⚠️ 3 duplicate portfolio URLs (item 2.6) |
| Schema & Structured Data (10%) | 68 | **~92** | ✅ dedup + real phone + breadcrumbs + inLanguage |
| Performance/CWV (10%) | 68 | **~72** | ✅ black-canvas bug looks fixed; ⏸ LCP-deferral unverified |
| AI Search Readiness/GEO (10%) | 64 | **~85** | ✅ llms.txt live, clean body text, inLanguage fr-FR |
| Visual & Mobile UX (8%) | 45 | **~75** | ✅ H1 demoted, no black artifacts in render |
| Local SEO (8%) | 42 | **~55** | ✅ real phone; NAP/GBP items still pending (Phase 3) |
| SXO (3%) | 58 | **~65** | ✅ refonte cannibalization resolved |
| Topic Clusters (2%) | 47 | 47 | — out of scope |
| Backlinks (1%) | 30 | 30 | — out of scope |

---

## ✅ Confirmed Fixed (verified on localhost:3001)

### Phase 1 — Critical

- **1.1 `/sitemap.xml`** — returns `200`, valid `<urlset>` XML, 40 `<loc>` entries covering all static/dynamic routes with proper `<lastmod>` (e.g. blog posts use real `lastUpdated`/`publishedAt` dates, not "now"). Prior conclusion stands: the 404 was a **deployment-only** issue — code is correct.
- **1.2 Self-canonical violations** — `/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite`, and all 3 `/villes/*` pages now emit their own correct `<link rel="canonical">`.
- **1.3 Duplicate `ProfessionalService` + placeholder phone** — every crawled page has **exactly one** `ProfessionalService` and **at most one** `LocalBusiness` JSON-LD node (checked across all 32 pages with JSON-LD). The real phone number `+33651113928` (`06 51 11 39 28`) appears in the homepage schema and visible footer — no `+33600000000` or `+33612345678` placeholders found anywhere in the crawl.
- **1.4 U+FFFD mojibake — body content** — the 59-field fix across 5 posts is fully verified: **0 remaining U+FFFD in any post body** (Portable Text blocks, spokeCards, FAQs, tables, image alts). See **Finding A** below for a separate, newly-discovered meta-field issue.
- **1.6 `/refonte-ai-friendly` vs `/refonte-ia-friendly`** — `/refonte-ia-friendly` returns a `308` redirect; `/refonte-ai-friendly` is the sole surviving page (in sitemap, 70-char title).

### Phase 2 — High-Impact

- **2.1 Duplicate "Face Nord" `<h1>`** — homepage `<h1>` is now "Propulsez votre entreprise vers de nouveaux sommets" (the page-specific hero heading). The Preloader's "Face Nord / Graphisme" text is rendered as `aria-hidden="true"` `<div>`s, not headings — confirmed in `src/components/Preloader.tsx`.
- **2.2 Redundant title suffix** — the 6 flagged pages no longer double-append "| Face Nord Graphisme" (was 82-102 chars, now single-suffix 58-95 chars). Several titles are still >60 chars due to long base titles — this is a residual polish item, not the double-suffix bug.
- **2.3 Security headers** — `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `Strict-Transport-Security` all present on `/`.
- **2.4 `llms.txt`** — served from `public/`, well-formed, correct French/accented text.
- **2.5 Locale fixes (partial)** — `BlogPosting.inLanguage` / `WebPage.inLanguage` = `"fr-FR"` confirmed in JSON-LD on blog posts. `sitemap.ts` `<lastmod>` uses real `lastUpdated`/`publishedAt` dates. ⚠️ `og:locale: "fr_FR"` (also part of 2.5) is set in `layout.tsx` but **not rendering on most pages** — see **Finding B**.
- **2.8 `BreadcrumbList` schema** — present on all non-homepage pages checked (service pages, villes pages, portfolio details, blog posts), with correct `ListItem` hierarchy.

### Visual/Mobile (Playwright, Chromium)

- **1.5 Black WebGL artifact on mobile** — captured the homepage at 390×844 (iPhone-class viewport) at t=0.5s, 2.5s, and 5.5s. The wireframe-mountain WebGL canvas renders correctly (teal wireframe on dark background) at every stage — **no black rectangles observed**. The ~4.5s preloader animation (text reveal → panel wipe, per `Preloader.tsx`'s GSAP timeline) completes normally and reveals the real hero content (`Propulsez votre entreprise...`) with `opacity: 1`.
- Hero `<h1>` reaches `opacity: 1, visibility: visible` well before the preloader finishes on both desktop and mobile — confirms item 2.1's heading is the real LCP candidate, not hidden content.
- Full-page screenshots show large blank bands between sections — this is a **Playwright capture artifact** (GSAP `ScrollTrigger` reveal animations don't fire without real scroll events during `fullPage` capture), **not missing content**: the raw HTML for every section is present and correct (confirmed via grep on the same files).

Screenshots saved to `screenshots/`: `desktop-home-{t0.5s,t2.5s,t5.5s,full}.png`, `mobile-home-{t0.5s,t2.5s,t5.5s,full}.png`, `mobile-blog-post-*.png`.

---

## ⏸ Deferred / Not Verified

- **2.6 Duplicate Sanity `project` documents** — diagnosed in a prior step, **user declined to execute** the cleanup this session. Its effect is now visible in the regenerated sitemap (see Finding C below) — additional evidence this should be prioritized.
- **2.7 Two broken internal links** — not investigated this session; still open per `findings/cluster.md` #1.
- **2.9 Defer 3D hero on mobile (LCP)** — not verified. Local dev FCP (~530ms) and "load" timing (~620ms) are not representative of production CWV; would need a production Lighthouse run to confirm. `largest-contentful-paint` performance entries returned `null` in this Playwright run (needs a buffered `PerformanceObserver`, not a post-hoc `getEntriesByType` call — testing limitation, not necessarily a site issue).
- **3.x items** (NAP consistency, GBP link, testimonials, content clusters, etc.) — out of scope, unchanged from original audit.

---

## ⚠️ New Finding A: `seoTitle`/`seoDescription` U+FFFD corruption in 5 posts (7 fields)

This session's mojibake fix covered **body** Portable Text fields (59 fields, 5 posts). Re-crawling localhost surfaced a **separate** corruption pattern in `seoTitle`/`seoDescription` (rendered as `<title>`, `og:title`, `og:description`, `twitter:*`, and `BlogPosting.headline`/`description` in JSON-LD) affecting **5 posts, 7 fields** — only 2 of which overlap with the previously-fixed posts:

| Post (`_id`) | Field | Current (corrupted) | Should be |
|---|---|---|---|
| `029aba02-674a-42e9-90a3-7710e43cbfbb` (le-guide-complet...) | `seoTitle` | `Visibilit� en ligne Hautes-Alpes` | `Visibilité en ligne Hautes-Alpes` |
| `029aba02-674a-42e9-90a3-7710e43cbfbb` | `seoDescription` | `Boostez votre commerce � Embrun, Gap ou Brian�on : SEO local, Google Maps, r�seaux sociaux et strat�gies digitales pour artisans et commer�ants des Hautes-Alpes.` | `Boostez votre commerce à Embrun, Gap ou Briançon : SEO local, Google Maps, réseaux sociaux et stratégies digitales pour artisans et commerçants des Hautes-Alpes.` |
| `647e4f3b-e52e-477f-a2f9-3a1f584a8db4` (digitaliser-reservations...) | `seoTitle` | `R�servations en ligne Hautes-Alpes` | `Réservations en ligne Hautes-Alpes` |
| `747729fc-0bdc-440d-a170-c790443d1df7` (seo-vs-referencement...) | `seoTitle` | `SEO vs IA : quelle strat�gie 2026` | `SEO vs IA : quelle stratégie 2026` |
| `post-gbp-artisans-hautes-alpes` (google-business-profile...) | `seoDescription` | `87 % des consommateurs cherchent sur Google avant d'acheter. Guide complet pour cr�er et optimiser votre fiche Google Business Profile dans les Hautes-Alpes.` | `...Guide complet pour créer et optimiser votre fiche Google Business Profile dans les Hautes-Alpes.` |
| `post-prix-site-internet-hautes-alpes` (prix-site-internet...) | `seoTitle` | `Prix site web Hautes-Alpes : d�s 800 ?` | `Prix site web Hautes-Alpes : dès 800 €` |
| `post-prix-site-internet-hautes-alpes` | `seoDescription` | `Combien co�te un site internet dans les Hautes-Alpes ? Landing page, site vitrine, e-commerce : tarifs transparents d�s 800 ? HT pour artisans et PME du 05.` | `Combien coûte un site internet dans les Hautes-Alpes ? Landing page, site vitrine, e-commerce : tarifs transparents dès 800 € HT pour artisans et PME du 05.` |

Same pattern as before: `é/è/à/û/ç/ô/ê/î/«/»/°` → U+FFFD, `€` → `?`. **This is a separate scope from the previously-approved 59-field fix** (different documents/fields) and per the established pattern requires its own explicit go-ahead before any Sanity write.

---

## ⚠️ New Finding B: Open Graph metadata inconsistency (`og:locale`, `og:site_name`, `og:image`)

**Root cause:** `src/app/layout.tsx` defines a complete `openGraph` object (title, description, url, `siteName: "Face Nord Graphisme"`, `locale: "fr_FR"`, `images: [...]`). Next.js metadata merging does **not** deep-merge the `openGraph` object — any page that defines its own `openGraph` (13 files do) **completely replaces** the layout's, dropping whatever fields it doesn't repeat. Per `node_modules/next/dist/docs/.../generate-metadata.md`, `openGraph.locale` *should* produce `<meta property="og:locale">` — confirmed working on pages whose own `openGraph` happens to include it.

**Current state across the 32-page crawl:**

| Page group | `og:image` | `og:locale` | `og:site_name` |
|---|---|---|---|
| `/a-propos` | ✅ | ✅ | ✅ |
| 13 blog posts | ✅ | ✅ | ❌ |
| 6 portfolio pages | ✅ | ❌ | ❌ |
| Home, 6 service pages, `/refonte-*`, 3 villes pages (11 pages) | ❌ | ❌ | ❌ |

**Impact:** social shares of the homepage, all 6 service pages, and all 3 city pages get **no preview image** and no locale/site-name attribution. This is a **code-only fix** (no Sanity write) — affects 12 files: `page.tsx` (home), the 6 service pages, `refonte-ai-friendly/page.tsx`, `villes/[slug]/page.tsx`, and optionally the 13 blog/6 portfolio pages for `site_name` consistency.

---

## ⚠️ New Finding C: Sitemap now contains 3 duplicate portfolio URLs (consequence of unresolved item 2.6)

With `/sitemap.xml` now working (1.1 fixed), it surfaces the data-level duplication from the still-unresolved **item 2.6**: `getProjects()` returns all 9 Sanity `project` documents with no dedup, so the sitemap has **9 portfolio URLs for 6 conceptual projects**:

- `/portfolio/act-event-pro`, `/portfolio/gaudineto`, `/portfolio/gaec-des-valentins` — each appears **twice** (old + new duplicate docs share the same slug).
- `/portfolio/reves-daventures` (105-char title, new doc) **and** `/portfolio/reves-d-aventures` (75-char title, old doc) both appear — the content-duplicate pair from 2.6.
- `/portfolio/verdon-ebike` — appears once (no duplicate, as previously noted).

This is purely a data issue (`sitemap.ts` itself is correct — it just maps 1:1 over whatever `getProjects()` returns). It reinforces the case for executing the previously-diagnosed (but declined) item 2.6 cleanup plan.

---

## Suggested Next Steps

1. **Finding A (Sanity write, needs approval)** — fix the 7 `seoTitle`/`seoDescription` fields across 5 posts using the same patch/set approach as the earlier 59-field fix.
2. **Finding B (code-only, no approval needed for a CMS write)** — add `siteName`/`locale`/`images` to the 11 pages currently missing `og:image`, prioritizing home + service pages for social-share previews.
3. **Item 2.6 (Sanity writes, previously declined)** — now additionally justified by Finding C's sitemap duplication; re-raise for a decision.
4. **Deploy** the current fixes (1.1-1.4, 1.6, 2.1-2.5, 2.8) to production, then re-run a full audit against `https://www.facenordgraphisme.fr` for a real Lighthouse/CWV reading and GSC sitemap resubmission.

*Note: PDF report generation isn't available in this `seo-audit` skill installation (no `scripts/` directory present) — this Markdown report is the deliverable.*
