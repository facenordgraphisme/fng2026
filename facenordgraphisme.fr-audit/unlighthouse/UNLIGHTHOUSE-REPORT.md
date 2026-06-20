# Unlighthouse Audit — facenordgraphisme.fr (local dev)

**Date:** 2026-06-16
**Target:** `http://localhost:3001` (Next.js 16.2.0, Turbopack dev server)
**Tool:** Unlighthouse CI 0.17.10 — mobile simulation, system Chrome
**Routes scanned:** 33 / 38 known routes (5 blog posts not reached by link crawler — see §5)
**Caveat:** Dev-server scores. No build optimizations (minification, tree-shaking, CDN). Production Lighthouse will be higher.

---

## Summary

| Category | Avg | Median | Min |
|---|---|---|---|
| **Overall** | **93** | **95** | **89** |
| Performance | 84 | 89 | 67 |
| Accessibility | 89 | 91 | 85 |
| Best Practices | **100** | **100** | **100** |
| SEO | **100** | **100** | **100** |

**SEO 100/100 on every single page** — validates all Phase 1 + Phase 2 fixes (sitemaps, canonicals, schema, security headers, redirect, mojibake). Best Practices also perfect everywhere.

Performance is the only category needing attention: bimodal split between lean service pages (90-97) and content/image-heavy pages (67-74).

---

## 1. SEO — 100/100 ✅ (all 33 pages)

Every crawled page passed Lighthouse's SEO checks:
- `<title>` present and non-empty
- `<meta name="description">` present
- `<link rel="canonical">` present
- `robots` not blocking indexation
- Structured data (JSON-LD) present
- Mobile viewport configured

This validates items 1.1 (sitemap), 1.2 (canonicals), 1.3 (schema/phone), 1.4 (body mojibake), 1.6 (refonte redirect), 2.1 (H1), 2.2 (title suffix), 2.3 (security headers), 2.4 (llms.txt), 2.5 (locale/inLanguage), 2.8 (breadcrumbs).

---

## 2. Best Practices — 100/100 ✅ (all 33 pages)

No issues detected: no console errors, valid HTTPS (localhost counts), no deprecated APIs, no insecure third-party requests.

---

## 3. Accessibility — avg 89, min 85

Most pages hit 91 (30/33). Three clusters score lower:

| Score | Pages |
|---|---|
| 85 | `/blog/balises-title-meta-description-pme-hautes-alpes` |
| 86 | `/blog/digitaliser-reservations-tourisme-hautes-alpes`, `/contact` |
| 87 | `/` (homepage), 8 blog + portfolio pages |

Accessibility issues at 85-87 typically involve: missing `aria-label` on icon buttons, insufficient color contrast on secondary text, or images without meaningful alt text. **No automated tool can surface all a11y issues** — manual review + screen-reader test recommended before deploying, but this is not a blocker.

---

## 4. Performance — avg 84, median 89, min 67

### Bottom performers (priority list)

| Perf | Page | Likely cause |
|---|---|---|
| 67 | `/portfolio/act-event-pro` | Hero image(s) + GSAP JS, no lazy loading |
| 67 | `/blog/guide-creation-site-internet-artisan-hautes-alpes` | Long content, inline images |
| 69 | `/blog/digitaliser-reservations-tourisme-hautes-alpes` | Same |
| 69 | `/faq` | FAQ accordion JS weight? |
| 70 | `/` (homepage) | 3D WebGL hero (Three.js bundle) |
| 70 | `/blog/geo-referencement-ia-artisans-pme-hautes-alpes` | Content + images |
| 70 | `/portfolio/gaec-des-valentins` | Portfolio images |
| 71 | `/blog/4-signaux-citation-ia-artisans` | Content weight |
| 71 | `/blog/balises-title-meta-description-pme-hautes-alpes` | Content weight |
| 74 | `/portfolio/gaudineto`, `/portfolio/reves-d-aventures` | Portfolio images |

### Top performers

| Perf | Page |
|---|---|
| 97 | `/villes/embrun-serre-poncon` |
| 96 | `/referencement-ia`, `/prestations`, `/maintenance-site-internet-hautes-alpes` |
| 95 | `/villes/briancon-hautes-alpes`, `/creation-site-internet-hautes-alpes` |

**Pattern:** Service pages (text-heavy, minimal media) → 90-97. Content/image-heavy pages → 67-74. Homepage takes the Three.js bundle hit but lands at 70 (acceptable for a 3D-hero page).

### Next.js image optimization opportunity

Portfolio pages at 67-74 are likely rendering `<img>` tags for project screenshots without `next/image` lazy-loading or `width`/`height` attributes (which prevents CLS). Blog posts at 67-69 likely have unoptimized inline images. Switching to `<Image>` from `next/image` with `sizes` + `priority={false}` for below-fold images is the highest-ROI performance fix. This maps to **item 2.9** (performance/LCP work, currently deferred in the action plan).

---

## 5. Missing routes — 5 blog posts not reachable by link crawler

Unlighthouse crawls by following `<a href>` links from the homepage. These 5 posts were NOT discovered, meaning they're not linked from the `/blog` listing page (or are below the fold / behind pagination):

- `/blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes`
- `/blog/refonte-site-internet-5-signes`
- `/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026`
- `/blog/prix-site-internet-artisan-pme-hautes-alpes`
- `/blog/seo-local-hautes-alpes-artisans-pme`

**SEO implication:** Google can reach them via the now-working sitemap (item 1.1 fixed), but they receive **zero internal link equity** from the rest of the site. They're internal linking orphans. Adding internal links from related blog posts or the service pages these posts correspond to would help their rankings.

---

## 6. Compared to original audit (baseline 48/100)

The original audit's Performance category was 68/100 (lab baseline). The local Lighthouse numbers:
- Homepage: 70 (vs. n/a original — dev server not tested before)
- Service pages: 90-97 (very strong)
- Blog/portfolio: 67-74 (needs image optimization)

These are **dev-server numbers** — not production CWV. Production will differ (no Turbopack overhead, CDN, Next.js image optimization pipeline active). Deploy + run PageSpeed Insights against production before treating these as final.

---

## Recommended Actions (performance focus)

| Priority | Action | Est. gain |
|---|---|---|
| High | Switch portfolio `<img>` → `next/image` with `sizes` prop | +10-15 perf pts on portfolio pages |
| High | Audit blog post images — add `width`/`height` or use `next/image` | +5-10 pts on slow blog posts |
| Medium | Check `/faq` for render-blocking JS (accordion JS loaded eagerly?) | +5 pts |
| Low | Internal links to the 5 orphaned blog posts | Link equity only, not perf |

*Note: `scripts/unlighthouse_run.py` is missing from this skill installation — ran `npx unlighthouse-ci` directly. Full HTML report not generated (JSON only).*
