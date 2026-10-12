# Technical SEO — facenordgraphisme.fr (DRIFT RE-AUDIT)

**Score: 84 / 100** (baseline 2026-06-15: 34/100)

**Audit type:** Drift re-audit against baseline findings in `facenordgraphisme.fr-audit/findings/technical.md` (2026-06-15).

**Sample reviewed:** Live production fetches via `curl` on 2026-08-22 — homepage, all 7 previously-broken-canonical pages (`/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite`), all 6 title-bug pages (`/creation-site-internet-hautes-alpes`, `/refonte-ai-friendly`, `/referencement-ia`, 3× `/villes/*`), all 6 portfolio project detail pages, 2 blog posts, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/api/sitemap`, `/studio/`, plus `http://`, non-`www`, and TLS checks. Cross-referenced against current repo code: `next.config.ts`, `src/app/api/sitemap/route.ts`, `src/app/portfolio/[slug]/page.tsx`, `src/app/layout.tsx`, `public/llms.txt`.

---

## Summary of Drift Since Baseline

Both **Critical** findings and 5 of 7 total numbered baseline findings are now **fully fixed**. One (title double-suffix) is **partially fixed** — the bug class was patched on the 6 originally-flagged static pages but is now visible on a page type not sampled in the baseline (portfolio project pages), driven by the same root cause. Security headers went from 1/6 to 5/6 present. One new low-severity issue was discovered (a duplicate-content JSON... XML endpoint at `/api/sitemap` directly accessible and indexable). Net effect: Technical SEO score moves from **34 → 84**.

---

## What Works (confirmed live, 2026-08-22)

- **`/sitemap.xml` now returns `200 OK`** with `Content-Type: application/xml`, served via a `rewrites()` rule in `next.config.ts` (`/sitemap.xml` → `/api/sitemap`) that routes around the `[slug]` catch-all. Contains 37 well-formed `<url>` entries (static, city, portfolio, blog routes) with no duplicate `<loc>` values.
- **All 7 previously-broken canonicals are now self-referencing**: `/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite` all emit `<link rel="canonical" href="https://www.facenordgraphisme.fr/{own-path}">`.
- **Sitewide duplicate `<h1>Face Nord</h1>` is gone** — every sampled page (home, `/prestations`, `/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, both legal pages, a `/villes/*` page, a portfolio detail page) now renders exactly **one** `<h1>`.
- **Security headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` are all present on every response, added via a single `headers()` block in `next.config.ts`. Only `Content-Security-Policy` remains absent (flagged in the baseline itself as a separate, higher-effort follow-up, not a quick win).
- **`/llms.txt` now returns `200`** (`text/plain`, served from `public/llms.txt` — a genuine static asset, bypassing routing entirely) with well-formed Markdown content describing services and linking key pages.
- **`/refonte-ia-friendly` no longer an orphan duplicate** — now issues a `308 Permanent Redirect` to `/refonte-ai-friendly` (via `redirects()` in `next.config.ts`), correctly excluded from the sitemap, and no longer indexable as separate content.
- **`robots.txt` unchanged and still valid**: `Allow: /`, `Disallow: /studio/`, sitemap declared and now actually resolvable.
- **HTTPS/TLS is healthy post-migration**: valid Let's Encrypt cert (`notBefore=2026-08-11`, `notAfter=2026-11-09`), HSTS present on every response including `http://` and non-`www` redirect responses. `http://www...` → `308` to `https://www...`; bare `facenordgraphisme.fr` → `307` to `https://www...`. No mixed content observed.
- **`/studio/`** (Sanity Studio) still correctly disallowed in `robots.txt` and redirects (`308` to `/studio`) rather than exposing an indexable admin surface.
- **Title double-suffix bug fixed on all 6 originally-flagged pages** and confirmed clean on 2 additional blog posts and 3 additional service pages sampled fresh this round.
- **`robots` meta tag remains `index, follow`** consistently across all sampled indexable pages, unchanged from baseline.

---

## Findings

### 1. FIXED — `/sitemap.xml` 404

**Baseline severity:** Critical

`curl -sI https://www.facenordgraphisme.fr/sitemap.xml` now returns `200 OK`, `X-Matched-Path: /api/sitemap`. The fix was implemented via a Next.js `rewrites()` rule (`next.config.ts`) pointing `/sitemap.xml` at a new `src/app/api/sitemap/route.ts` route handler — a different (and more robust) approach than modifying `sitemap.ts`'s routing precedence directly, per the two relevant commits ("track new sitemap.xml route handler", "use route handler for sitemap to prevent dynamic slug conflict on vercel"). The generated XML is well-formed, contains 37 unique URLs, and matches the site's current static/city/portfolio/blog inventory with no duplicate entries (the baseline's `reves-d-aventures`/`reves-daventures` slug-duplicate risk did not materialize — only `reves-daventures` appears).

**Residual/new item:** `/api/sitemap` is also directly reachable and returns identical XML content at `200 OK` (see Finding #8, new).

---

### 2. FIXED — 7 pages canonical to homepage

**Baseline severity:** Critical

All 7 pages now emit correct self-referencing canonicals, verified live:

| Page | Canonical now |
|---|---|
| `/portfolio` | `https://www.facenordgraphisme.fr/portfolio` |
| `/blog` | `https://www.facenordgraphisme.fr/blog` |
| `/a-propos` | `https://www.facenordgraphisme.fr/a-propos` |
| `/contact` | `https://www.facenordgraphisme.fr/contact` |
| `/faq` | `https://www.facenordgraphisme.fr/faq` |
| `/mentions-legales` | `https://www.facenordgraphisme.fr/mentions-legales` |
| `/politique-de-confidentialite` | `https://www.facenordgraphisme.fr/politique-de-confidentialite` |

No regressions found on other canonical-bearing pages spot-checked (portfolio detail, city pages, blog posts all self-canonical).

---

### 3. FIXED — Sitewide duplicate `<h1>Face Nord</h1>`

**Baseline severity:** High

Every sampled page (10 page types across static, legal, portfolio-detail, and city routes) now renders exactly one `<h1>` element. The sitewide "Face Nord" branding element has been demoted out of `<h1>`, resolving the topical-signal dilution issue and the above-the-fold space it was consuming on mobile (cross-ref to the baseline's Visual & Mobile UX finding — worth a quick visual re-check but out of scope for this technical pass).

---

### 4. PARTIALLY FIXED — Title double-suffix bug

**Baseline severity:** High

The 6 originally-flagged pages are confirmed clean:

| Page | Live `<title>` now |
|---|---|
| `/creation-site-internet-hautes-alpes` | "Création Site Internet Hautes-Alpes \| Face Nord Graphisme" |
| `/refonte-ai-friendly` | "Refonte Site Internet AI-Friendly — Hautes-Alpes \| Face Nord Graphisme" |
| `/referencement-ia` | "Référencement IA — GEO & AI Overviews \| Hautes-Alpes \| Face Nord Graphisme" |
| `/villes/briancon-hautes-alpes` | "Agence web Briançon (05) — Création site internet \| Face Nord Graphisme" |
| `/villes/embrun-serre-poncon` | "Agence web Embrun / Serre-Ponçon (05) — Face Nord Graphisme" |
| `/villes/gap-hautes-alpes` | "Agence web Gap (05) — Création site internet \| Face Nord Graphisme" |

However, the **identical bug class was found live on all 6 portfolio project detail pages** — a page type not sampled in the baseline audit:

| Page | Live `<title>` |
|---|---|
| `/portfolio/act-event-pro` | "ACT Event Pro — Site DJ événementiel Hautes-Alpes \| Face Nord Graphisme \| Face Nord Graphisme" |
| `/portfolio/verdon-ebike` | "Verdon E-Bike — Site location VAE Gorges du Verdon \| Face Nord Graphisme \| Face Nord Graphisme" |
| `/portfolio/reves-daventures` | "Rêves d'Aventures — Site réservation outdoor Hautes-Alpes \| Face Nord Graphisme \| Face Nord Graphisme" |
| `/portfolio/linstant-verdon` | "L'Instant Verdon — Site outdoor bilingue Gorges du Verdon \| Face Nord Graphisme \| Face Nord Graphisme" |
| `/portfolio/gaec-des-valentins` | "GAEC des Valentins — E-commerce agneau Hautes-Alpes \| Face Nord Graphisme \| Face Nord Graphisme" |
| `/portfolio/gaudineto` | "Gaudineto — Site bilingue restaurant gastronomique Moustiers-Sainte-Marie \| Face Nord Graphisme \| Face Nord Graphisme" |

**Root cause confirmed in code** (`src/app/portfolio/[slug]/page.tsx:19`):
```ts
const title = project.seoTitle || `${project.title} | Réalisation web — Face Nord Graphisme`;
```
The fallback (and, based on live output, the Sanity `project.seoTitle` field itself) already ends in "Face Nord Graphisme", and the root layout's `title: { template: "%s | Face Nord Graphisme" }` (`src/app/layout.tsx:30-31`) appends it a second time — exactly the same bug mechanism as the original 6 pages, just unresolved on this CMS-driven route. All 6 titles run 91-114 characters, well past SERP truncation.

**Recommendation:** Same fix pattern as before — either strip "Face Nord Graphisme" from the `project.seoTitle` values in Sanity, or change the code fallback/handling so `metadata.title` never itself contains the brand suffix (e.g., use `title: { absolute: project.seoTitle ?? fallback }` only if the value is guaranteed brand-suffix-free, otherwise strip it programmatically before assigning). Also audit any other Sanity-driven `seoTitle`/`seoDescription` fields (e.g., blog posts, city pages) for the same pattern — the 2 blog posts and 3 service pages spot-checked this round were clean, but not all CMS content types were exhaustively re-sampled.

---

### 5. MOSTLY FIXED — Security headers

**Baseline severity:** High

| Header | Baseline | Now |
|---|---|---|
| `Strict-Transport-Security` | ✅ | ✅ `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | ❌ | ✅ `nosniff` |
| `X-Frame-Options` | ❌ | ✅ `SAMEORIGIN` |
| `Referrer-Policy` | ❌ | ✅ `strict-origin-when-cross-origin` |
| `Permissions-Policy` | ❌ | ✅ `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | ❌ | ❌ still absent |

Verified live on `/`, `/sitemap.xml`, `/llms.txt`, and `/studio/`'s redirect response — headers apply via the `headers()` block's `source: '/:path*'` match, so coverage is sitewide. This closes the baseline's "5 quick-win" recommendation in full. The baseline explicitly deferred CSP as a separate, more involved follow-up (needs to allow three.js/GSAP/Lenis, Sanity CDN, analytics) — its continued absence is expected and should remain a Medium/Low priority item, not scored as a regression.

---

### 6. FIXED — `/llms.txt` 404

**Baseline severity:** Medium

`curl -sI https://www.facenordgraphisme.fr/llms.txt` returns `200 OK`, `Content-Type: text/plain; charset=utf-8`, served as a genuine static file from `public/llms.txt` (confirmed in repo) — bypassing the `[slug]` catch-all entirely, as the baseline recommendation suggested. Content is well-formed Markdown summarizing services with working links to `/creation-site-internet-hautes-alpes`, `/refonte-ai-friendly`, etc.

---

### 7. FIXED — `/refonte-ia-friendly` orphan duplicate

**Baseline severity:** Medium

`/refonte-ia-friendly` now returns `308 Permanent Redirect` → `/refonte-ai-friendly`, implemented via a `redirects()` entry in `next.config.ts`. It no longer serves duplicate content, is correctly absent from `sitemap.xml` (its target `/refonte-ai-friendly` is present instead), and can no longer accumulate ranking signals separately from its canonical sibling. This resolves the indexability/technical angle; the underlying content-duplication question (which page's content should "win") is now moot since only one URL resolves to content.

---

### 8. NEW (Low) — `/api/sitemap` route handler is itself publicly reachable and indexable

**Severity:** Low

The route handler backing the `/sitemap.xml` rewrite is also directly accessible at its real path, `https://www.facenordgraphisme.fr/api/sitemap`, returning an identical `200 OK` XML document with `Content-Type: application/xml`. This creates a second, unintended URL serving byte-identical sitemap content. It's not currently linked anywhere and isn't itself a "page" Google would typically index as content, but it is crawlable (nothing in `robots.txt` disallows `/api/`) and is a loose end from the rewrite-based fix.

**Recommendation:** Add `Disallow: /api/` to `robots.txt` (low effort, matches the existing `Disallow: /studio/` pattern), or set `export const dynamic = 'force-dynamic'` plus a `noindex, nofollow` response header/robots rule specifically on `/api/*` routes if any other API routes exist. Not urgent — no evidence of actual indexation risk, but cheap to close off.

---

### 9. NEW (Low) — Non-www → www redirect uses `307` instead of `308`

**Severity:** Low / informational

`http://www.facenordgraphisme.fr/` → `308` (permanent, correct) to `https://www...`, but bare `https://facenordgraphisme.fr/` → `307` (temporary) to `https://www.facenordgraphisme.fr/`. This is very likely Vercel's default apex-domain-to-primary-domain redirect (not application code) and is functionally fine for both users and crawlers (Google treats verified 307s in a domain-migration context similarly to 308s over time), but a `308` would be the technically "correct" permanent signal. Not scored as a deduction; flagged for completeness only.

---

## Priority Action Summary

1. **[High]** Fix the title double-suffix bug on all 6 portfolio detail pages — strip the trailing "Face Nord Graphisme" from `project.seoTitle` in Sanity and/or from the code fallback in `src/app/portfolio/[slug]/page.tsx:19` (Finding #4). Also spot-check other Sanity-driven `seoTitle` fields sitewide (blog, city pages) for the same latent pattern.
2. **[Medium]** Plan and ship a `Content-Security-Policy` header, scoped to allow three.js/GSAP/Lenis, Sanity's image CDN, and any analytics scripts (Finding #5 residual).
3. **[Low]** Add `Disallow: /api/` to `robots.txt` to close off the directly-reachable `/api/sitemap` duplicate-content endpoint (Finding #8).
4. **[Low/informational]** Optionally normalize the apex-domain redirect to `308` if configurable at the Vercel project level (Finding #9) — not urgent.

## Score Rationale

Baseline 34/100 was driven by 2 Critical + 3 High + 2 Medium findings, with only 1 of 6 recommended security headers present and the site's primary discovery mechanism (sitemap) completely broken. As of this re-audit: **both Criticals are fully resolved, 2 of 3 Highs are fully resolved, 1 High is partially resolved** (same bug, new location, smaller blast radius — 6 secondary pages vs. the original mix of primary nav pages), **both Mediums are fully resolved**, and headers coverage is at 5/6 (only the intentionally-deferred CSP remains). Two new Low-severity items were found, neither affecting crawlability or indexability in practice. This constitutes a near-complete remediation of the baseline's technical debt, with one genuine open High-priority item remaining (portfolio page titles) preventing a score in the 90s.
