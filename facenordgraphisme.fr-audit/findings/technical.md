# Technical SEO — facenordgraphisme.fr

**Score: 34 / 100**

**Sample reviewed:** All 38 crawled URLs (`facenordgraphisme.fr-audit/inventory.csv`), raw HTML in `facenordgraphisme.fr-audit/raw/*.html`, `curl -sI` response headers for `/` and `/sitemap.xml`, `https://www.facenordgraphisme.fr/robots.txt`, `/sitemap.xml`, `/llms.txt` (live production fetch, 2026-06-15).

---

## What Works

- **`robots.txt` is valid and correctly configured**: `User-Agent: *`, `Allow: /`, `Disallow: /studio/` (Sanity Studio correctly excluded from crawling), and declares `Sitemap: https://www.facenordgraphisme.fr/sitemap.xml`.
- **HTTPS is enforced with a strong HSTS policy**: `Strict-Transport-Security: max-age=63072000` (2 years) on every response, no `www`/non-`www` or http/https mixed-content issues observed.
- **All 38 crawled URLs return a clean `200 OK`** — no broken internal links, no redirect chains, no soft-404s among the discovered pages.
- **Clean, descriptive URL structure**: lowercase, hyphenated, keyword-rich slugs (`/referencement-seo-hautes-alpes`, `/villes/gap-hautes-alpes`); no query strings, session IDs, or trailing-slash inconsistencies.
- **Fully server-rendered HTML**: every page's initial response already contains the complete text content, headings, and JSON-LD — no reliance on client-side JS for crawlable content (good for all search and AI crawlers regardless of JS execution support).
- **`/studio/` (Sanity Studio admin) is correctly disallowed** in `robots.txt` and is not present anywhere in the sitemap-generation logic — no admin surface leaking into the index.
- **Per-page `robots` meta is consistent** (`index, follow` on all 38 indexable pages; the only `noindex` observed is on the catch-all 404 page itself, which is correct).
- Vercel edge hosting with sensible cache headers (`Vary: rsc, next-router-state-tree, ...` for Next.js App Router RSC payloads).

---

## Findings

### 1. CRITICAL — `/sitemap.xml` returns HTTP 404 in production

**Severity:** Critical

**Description:**
`curl -sI https://www.facenordgraphisme.fr/sitemap.xml` returns:

```
HTTP/1.1 404 Not Found
X-Matched-Path: /[slug]
```

The request is being caught by the **catch-all dynamic route** (`src/app/[slug]/page.tsx` or similar) instead of being served by `src/app/sitemap.ts`, which **exists in the repository** (currently shown as locally modified/uncommitted in `git status`) and defines a complete, well-formed sitemap (static routes, city routes, project routes, post routes).

Consequences:
- Google Search Console cannot fetch the declared sitemap (`robots.txt` points to a 404).
- Any of the 38 live pages that are *not* internally linked from the homepage/nav within a few hops rely entirely on this sitemap for discovery — new blog posts and city pages are at risk of slow or missed indexing.
- This is the single highest-leverage technical fix on the site: it is a **one-file build/deploy issue**, not a content or schema problem.

**Recommendation:**
1. Confirm `src/app/sitemap.ts` builds correctly locally (`next build` then check `.next/server/app/sitemap.xml.body` or run `next start` and request `/sitemap.xml`).
2. If it 404s locally too, check for a routing conflict — Next.js file-convention routes (`app/sitemap.ts` → `/sitemap.xml`) can be shadowed by a catch-all `app/[slug]/page.tsx` if the catch-all is matching `/sitemap.xml` as `slug = "sitemap.xml"` before the convention route resolves. Verify Next.js version-specific behavior for special-file routes vs. catch-all segments (per `AGENTS.md`, this Next.js version may have changed precedence rules — check `node_modules/next/dist/docs/` for the current routing-precedence documentation).
3. Deploy the fix and verify `https://www.facenordgraphisme.fr/sitemap.xml` returns `200` with `Content-Type: application/xml` and lists all 37-38 expected URLs.
4. Resubmit the sitemap in Google Search Console once live.

---

### 2. CRITICAL — 7 pages have `<link rel="canonical">` pointing to the homepage instead of themselves

**Severity:** Critical

**Description:**
The following pages all emit `<link rel="canonical" href="https://www.facenordgraphisme.fr">` (the bare homepage URL) instead of their own URL:

| Page | Canonical points to |
|---|---|
| `/portfolio` | `https://www.facenordgraphisme.fr` |
| `/blog` | `https://www.facenordgraphisme.fr` |
| `/a-propos` | `https://www.facenordgraphisme.fr` |
| `/contact` | `https://www.facenordgraphisme.fr` |
| `/faq` | `https://www.facenordgraphisme.fr` |
| `/mentions-legales` | `https://www.facenordgraphisme.fr` |
| `/politique-de-confidentialite` | `https://www.facenordgraphisme.fr` |

A self-referencing canonical is the baseline correct implementation for every indexable page. A canonical pointing to a *different* URL tells Google "the homepage is the authoritative version of this content" — for `/portfolio`, `/blog`, `/a-propos`, `/contact` and `/faq` this is simply wrong (these are distinct, valuable pages) and risks Google **deduplicating them out of the index entirely**, collapsing their ranking signals into the homepage. For the two legal pages it is lower-impact but still incorrect.

**Recommendation:**
Find the shared metadata helper (likely a `generateMetadata()` default or a shared layout for these routes) that is hardcoding `canonical: baseUrl` instead of computing it per-route. Each page's `alternates.canonical` should resolve to its own absolute URL, e.g.:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    alternates: { canonical: `https://www.facenordgraphisme.fr${currentPath}` },
    // ...
  };
}
```

Verify against the same 7 URLs post-fix with `curl -s <url> | grep canonical`.

---

### 3. HIGH — Every page renders two `<h1>` elements, and the first is a sitewide duplicate

**Severity:** High

**Description:**
All 38 crawled pages emit **exactly two `<h1>` tags**. The first is always the identical literal text `Face Nord` (confirmed via `grep -oc '>Face Nord</h1>'` returning 1 across every file in `raw/`, and visually confirmed in `screenshots/capture-results.json` — present at the same position on desktop, x:360/y:327, and mobile, x:94/y:355, on every sampled page). This appears to come from a shared hero/branding component rendered on every route.

The second `<h1>` is the page-specific heading (e.g., "Propulsez votre entreprise vers de nouveaux sommets" on the homepage, "Prestations web & SEO pour les Hautes-Alpes" on `/prestations`).

Having two `<h1>`s — one of which is **identical across all 38 pages** — dilutes the page-specific topical signal that the H1 is meant to carry, and the duplicate "Face Nord" H1 carries zero unique information for any individual page.

**Recommendation:**
Demote the sitewide "Face Nord" branding element from `<h1>` to a `<div>`/`<span>` (or `<p>` with appropriate styling) inside the shared hero/header component (`src/components/HomeHero.tsx` or the shared layout it's rendered from). Each page should retain exactly **one** `<h1>` — the page-specific, keyword-relevant heading.

---

### 4. HIGH — Title tag double-suffix bug on 6 pages

**Severity:** High

**Description:**
The root layout (`src/app/layout.tsx:30-32`) defines:

```ts
title: {
  template: "%s | Face Nord Graphisme",
  default: "Face Nord Graphisme | Création de site internet Hautes-Alpes",
}
```

Six pages set a page-level `title` that **already ends in "| Face Nord Graphisme"**, so the template appends it a second time, producing titles like:

| Page | Live `<title>` | Length |
|---|---|---|
| `/creation-site-internet-hautes-alpes` | "Création Site Internet Hautes-Alpes — Face Nord Graphisme \| Face Nord Graphisme" | 82 chars |
| `/refonte-ai-friendly` | "Refonte Site Internet AI-Friendly — Hautes-Alpes \| Face Nord Graphisme \| Face Nord Graphisme" | 94 chars |
| `/referencement-ia` | "Référencement IA — GEO & AI Overviews \| Face Nord Graphisme Hautes-Alpes \| Face Nord Graphisme" | 102 chars |
| `/villes/briancon-hautes-alpes` | "Agence web Briançon (05) — Création site internet \| Face Nord Graphisme \| Face Nord Graphisme" | 97 chars |
| `/villes/embrun-serre-poncon` | "Agence web Embrun / Serre-Ponçon (05) — Face Nord Graphisme \| Face Nord Graphisme" | 84 chars |
| `/villes/gap-hautes-alpes` | "Agence web Gap (05) — Création site internet \| Face Nord Graphisme \| Face Nord Graphisme" | 91 chars |

Google typically truncates SERP titles around 580px (~55-65 characters depending on character widths); all 6 of these exceed that and will be truncated mid-brand-repeat, looking unpolished and wasting the keyword-rich portion of the title.

**Recommendation:**
Remove the trailing `| Face Nord Graphisme` from these 6 pages' own `title` strings and let the root layout's template append it once, OR (if these pages intentionally want a different/no brand suffix) set `title: { absolute: "..." }` to opt out of the template entirely. The fastest fix is editing the 6 page-level `generateMetadata()`/`metadata` exports to drop the redundant suffix.

---

### 5. HIGH — Five of six recommended security headers are missing

**Severity:** High

**Description:**
`curl -sI https://www.facenordgraphisme.fr/` shows:

| Header | Present? |
|---|---|
| `Strict-Transport-Security` | ✅ `max-age=63072000` |
| `Content-Security-Policy` | ❌ absent |
| `X-Frame-Options` | ❌ absent |
| `X-Content-Type-Options` | ❌ absent |
| `Referrer-Policy` | ❌ absent |
| `Permissions-Policy` | ❌ absent |

While not a direct ranking factor, Google's Lighthouse "Best Practices" audit and Chrome's security UI both flag missing `X-Content-Type-Options`/`X-Frame-Options`/CSP, and a clean security posture is part of holistic site-quality signals (and matters for the client's own credibility as a web agency selling security-conscious builds).

**Recommendation:**
Add a `headers()` block to `next.config` (or use Vercel's `vercel.json` headers config) to set, at minimum:
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
A full `Content-Security-Policy` is more involved (must allow the three.js/GSAP/Lenis bundles, Sanity image CDN, and any analytics) — treat as a separate, carefully-tested follow-up rather than bundling with the quick wins above.

---

### 6. MEDIUM — `/llms.txt` also returns 404 (same routing root cause as Finding #1)

**Severity:** Medium

**Description:**
`curl -s -o /dev/null -w "%{http_code}" https://www.facenordgraphisme.fr/llms.txt` returns `404`, served by the same catch-all `/[slug]` route (`X-Matched-Path: /[slug]`). This is the same class of bug as the sitemap — a static file under `public/` (or a special-file route) that the catch-all is intercepting. `llms.txt` is increasingly used by AI crawlers (ChatGPT, Claude, Perplexity) to discover a structured summary of site content — see the GEO findings for the content-side recommendation; this entry covers the technical routing fix.

**Recommendation:**
Place `llms.txt` in `/public/llms.txt` (static asset, bypasses all dynamic routing) and verify it's served with `Content-Type: text/plain` at `/llms.txt`. If a static file in `public/` is *still* shadowed by the `[slug]` catch-all, that confirms a routing-precedence issue affecting **all** static/special files and should be fixed once for both this and Finding #1.

---

### 7. MEDIUM — Orphan duplicate page `/refonte-ia-friendly` is live, indexable, and absent from `sitemap.ts`

**Severity:** Medium

**Description:**
`/refonte-ia-friendly` (note: "ia" not "ai") returns `200`, is `index, follow`, self-canonical, and is linked from the homepage navigation — but it is **not** one of the static routes in `src/app/sitemap.ts`, while its near-duplicate `/refonte-ai-friendly` *is*. Both pages target the same search intent ("refonte de site internet AI/IA-friendly") with different titles and content (one ~1,216 words, the other ~421 words). See Content Quality findings for the duplicate-content/cannibalization angle — this entry covers the technical/indexability angle: an indexable page reachable via internal links but excluded from the sitemap creates an inconsistent discovery signal (Google may find it via crawl but never via sitemap, and its absence from the sitemap doesn't stop it competing with its sibling for the same query).

**Recommendation:**
Resolve per the Content Quality recommendation (merge/redirect to one canonical URL), then ensure `sitemap.ts`'s static-routes array matches whichever single URL survives.

---

## Priority Action Summary

1. **[Critical]** Fix `/sitemap.xml` 404 — verify `sitemap.ts` build output and routing precedence vs. the `[slug]` catch-all, deploy, resubmit to GSC (Finding #1).
2. **[Critical]** Fix the 7 self-canonical violations pointing to the homepage (Finding #2).
3. **[High]** Demote the sitewide duplicate "Face Nord" `<h1>` to a non-heading element (Finding #3).
4. **[High]** Strip the redundant "| Face Nord Graphisme" suffix from 6 page titles (Finding #4).
5. **[High]** Add `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` headers (Finding #5); plan CSP separately.
6. **[Medium]** Move `llms.txt` to `public/` and verify it serves correctly (Finding #6).
7. **[Medium]** Resolve `/refonte-ai-friendly` vs `/refonte-ia-friendly` and align `sitemap.ts` (Finding #7).
