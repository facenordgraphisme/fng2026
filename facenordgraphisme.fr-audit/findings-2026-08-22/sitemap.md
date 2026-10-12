# Sitemap Audit — facenordgraphisme.fr (DRIFT RE-AUDIT)

**Category:** Sitemap & Indexation
**Audit date:** 2026-08-22
**Baseline date:** 2026-06-15
**Baseline score:** 22 / 100
**New score: 88 / 100**

---

## Summary

The Critical blocker from the baseline — a fully 404'ing `/sitemap.xml` — is resolved. Recent commits ("fix: use route handler for sitemap to prevent dynamic slug conflict on vercel", "feat: track new sitemap.xml route handler") added a `next.config.ts` rewrite (`/sitemap.xml` → `/api/sitemap`) plus a new `src/app/api/sitemap/route.ts` handler that builds the XML manually. Live verification confirms `https://www.facenordgraphisme.fr/sitemap.xml` now returns **HTTP 200**, `Content-Type: application/xml; charset=utf-8`, matched via `X-Matched-Path: /api/sitemap` / `X-Nextjs-Rewritten-Path: /api/sitemap` — it is no longer intercepted by the `[slug]` catch-all.

In addition to the routing fix, the underlying Sanity data was cleaned up at the source: the 9 duplicate/near-duplicate `project` documents from the baseline are now 6 clean, unique documents (one new project, `linstant-verdon`, was also added since baseline). The `/refonte-ia-friendly` vs `/refonte-ai-friendly` duplication was resolved with a 308 permanent redirect, consolidating to `/refonte-ai-friendly` as canonical — and it is correctly left out of the sitemap. The only baseline issue that remains unaddressed is Finding #5 (fake/build-time `lastmod` on non-blog routes), which is Low severity.

---

## Issue-by-Issue Drift Status

### 1. `/sitemap.xml` returns HTTP 404 — FIXED

Live check:
```
curl -sD- https://www.facenordgraphisme.fr/sitemap.xml
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8
X-Matched-Path: /api/sitemap
X-Nextjs-Rewritten-Path: /api/sitemap
```
Root cause addressed exactly as hypothesized in the baseline: the file-convention `app/sitemap.ts` approach was abandoned in favor of an explicit `next.config.ts` rewrite (`source: '/sitemap.xml' → destination: '/api/sitemap'`) plus a dedicated Route Handler at `src/app/api/sitemap/route.ts` that fetches the four Sanity collections and hand-builds the XML string. Comment in `next.config.ts` confirms intent: *"/sitemap.xml serait intercepté par app/[slug]/page.tsx (slug='sitemap.xml') — On rewrite vers /api/sitemap (2 segments = hors de portée de [slug])."* This is a reasonable, working workaround for the `[slug]` catch-all conflict, though the pure `app/sitemap.ts` convention was never made to work directly — worth a comment/note for future maintainers but not a defect today.

The XML itself is well-formed (validated: 37 `<url>` elements, no unclosed tags, one root `<urlset>`, correct namespace).

### 2. robots.txt points to the broken sitemap URL — FIXED

```
curl -s https://www.facenordgraphisme.fr/robots.txt
User-Agent: *
Allow: /
Disallow: /studio/

Sitemap: https://www.facenordgraphisme.fr/sitemap.xml
```
`robots.txt` is unchanged (still declares `/sitemap.xml`), but since Finding #1 is fixed, this URL now resolves to a valid 200 sitemap — the directive is fully functional. No code change was needed here per the baseline's own recommendation.

### 3. 9 Sanity `project` documents for 5 unique projects (3 exact-duplicate-slug pairs + `reves-d-aventures`/`reves-daventures`) — FIXED

Live Sanity query (`production` dataset, project `k4x2bvj1`) now returns exactly **6 documents, all unique slugs**:

| `_id` | slug | title | `_updatedAt` |
|---|---|---|---|
| `portfolio-act-event-pro` | `act-event-pro` | ACT Event Pro | 2026-06-18 |
| `portfolio-gaec-des-valentins` | `gaec-des-valentins` | GAEC des Valentins | 2026-06-18 |
| `portfolio-gaudineto` | `gaudineto` | Gaudineto | 2026-06-18 |
| `portfolio-linstant-verdon` | `linstant-verdon` | L'Instant Verdon | 2026-06-18 |
| `portfolio-reves-daventures` | `reves-daventures` | Rêves d'Aventures | 2026-06-18 |
| `portfolio-verdon-ebike` | `verdon-ebike` | Verdon E-Bike | 2026-06-18 |

This was a **data-layer fix in Sanity Studio itself** (all surviving IDs follow a consistent `portfolio-{slug}` naming convention, all with the same `_updatedAt` timestamp — consistent with a one-time cleanup/migration), not a code-level de-duplication patch. Note: the baseline recommended keeping the hyphenated `reves-d-aventures` slug as canonical; the actual cleanup kept `reves-daventures` (no hyphen) instead — the opposite choice, but functionally resolved (single canonical URL, no duplicate content). A new project, `linstant-verdon`, was also added since baseline (unrelated to this fix, net-new content).

Live sitemap output confirms 6 unique `/portfolio/{slug}` entries, no duplicates:
`act-event-pro`, `verdon-ebike`, `reves-daventures`, `linstant-verdon`, `gaec-des-valentins`, `gaudineto` — all verified 200.

Note: `src/app/api/sitemap/route.ts`'s `projectRoutes` mapper still has **no defensive slug-based de-duplication** (`.filter((p) => p?.slug?.current).map(...)` only, no `Set`-based dedup as the baseline recommended for defense-in-depth). The fix is effective today only because the Sanity data itself was cleaned — if a future editor re-introduces a duplicate-slug document in Sanity Studio, the sitemap will silently reproduce the same bug. Recommend still adding the dedup safeguard.

### 4. `/refonte-ia-friendly` orphan not in sitemap.ts — FIXED

`next.config.ts` now includes a permanent redirect:
```js
{
  source: '/refonte-ia-friendly',
  destination: '/refonte-ai-friendly',
  permanent: true,
},
```
Live check:
```
curl -sD- https://www.facenordgraphisme.fr/refonte-ia-friendly
HTTP/1.1 308 Permanent Redirect
Location: /refonte-ai-friendly

curl -sD- https://www.facenordgraphisme.fr/refonte-ai-friendly
HTTP/1.1 200 OK
X-Matched-Path: /refonte-ai-friendly
```
`/refonte-ia-friendly` is no longer a live, independently-indexable page — it 308s to `/refonte-ai-friendly`, which is already the sitemap's static route entry (priority 0.9). Correctly, the redirect source is *not* listed in the sitemap (a sitemap should only list canonical, 200-status URLs) — this matches the baseline's own recommendation exactly ("pick ONE canonical URL... 301-redirect the other... add the surviving URL to sitemap.ts"). This also resolves the parallel Content/Technical-SEO findings about `/refonte-ai-friendly` vs `/refonte-ia-friendly` cannibalization.

### 5. Static/city/project routes use `lastModified: new Date()` (build/request date, not real edit date) — STILL PRESENT

`src/app/api/sitemap/route.ts` (lines 62-69):
```ts
const now = new Date().toISOString()
...
<lastmod>${r.lastmod ?? now}</lastmod>
```
`staticRoutes`, `cityRoutes`, and `projectRoutes` never set `r.lastmod`, so all 24 of those URLs fall through to `now` — the exact request timestamp of whoever/whatever last fetched the sitemap. Live output confirms this: all 15 static + 3 city + 6 project entries (24 total) share the **identical timestamp** `2026-08-22T16:18:44.262Z` down to the millisecond, because they were all rendered in the same request. Only `postRoutes` (13 blog URLs) uses a real per-document date via `p.lastUpdated ?? p.publishedAt`.

This is unchanged from baseline and still Low severity per the rubric ("All identical lastmod" = Low). Sanity's `project` and `cityPage` documents do carry a real `_updatedAt` (confirmed live: e.g. `2026-06-18T20:38:33Z` for `act-event-pro`) that could be threaded through exactly as the baseline recommended, but this has not been done. Recommendation is unchanged: add `_updatedAt` to the `projectQuery`/city slug query and use `new Date(doc._updatedAt).toISOString()` instead of the shared `now` fallback; for purely static marketing pages with no CMS-backed date, consider omitting `lastmod` entirely rather than emitting a misleading always-fresh timestamp.

---

## Live Sitemap Inventory (2026-08-22)

`https://www.facenordgraphisme.fr/sitemap.xml` — **37 `<url>` entries**, valid XML, no duplicates, all verified HTTP 200:

**Static (15):** `/`, `/prestations`, `/creation-site-internet-hautes-alpes`, `/boutique-e-commerce-hautes-alpes`, `/referencement-seo-hautes-alpes`, `/refonte-ai-friendly`, `/maintenance-site-internet-hautes-alpes`, `/referencement-ia`, `/portfolio`, `/blog`, `/a-propos`, `/contact`, `/faq`, `/mentions-legales`, `/politique-de-confidentialite`

**City (3):** `/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`

**Portfolio (6):** `/portfolio/act-event-pro`, `/portfolio/verdon-ebike`, `/portfolio/reves-daventures`, `/portfolio/linstant-verdon`, `/portfolio/gaec-des-valentins`, `/portfolio/gaudineto`

**Blog (13):** `/blog/reservation-directe-eviter-commissions-booking-hautes-alpes`, `/blog/guide-creation-site-internet-artisan-hautes-alpes`, `/blog/4-signaux-citation-ia-artisans`, `/blog/geo-referencement-ia-artisans-pme-hautes-alpes`, `/blog/prix-site-internet-artisan-pme-hautes-alpes`, `/blog/seo-local-hautes-alpes-artisans-pme`, `/blog/gerer-avis-google-artisans-pme-hautes-alpes`, `/blog/balises-title-meta-description-pme-hautes-alpes`, `/blog/google-business-profile-artisans-hautes-alpes`, `/blog/digitaliser-reservations-tourisme-hautes-alpes`, `/blog/refonte-site-internet-5-signes`, `/blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes`, `/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026`

**Cross-check against live Sanity + crawl:**
- `count(*[_type=="post"])` = 13 → matches 13 blog URLs in sitemap exactly.
- `count(*[_type=="cityPage"])` = 3 → matches 3 city URLs exactly.
- `count(*[_type=="project"])` = 6, all unique slugs → matches 6 portfolio URLs exactly, zero duplicates.
- `/refonte-ia-friendly` correctly excluded (redirect, not a canonical page).
- No orphans found, no ghost/404/redirected entries found inside the sitemap.

## Missing Pages Check

None identified. Every crawlable, indexable, canonical page found live on the site is present in the sitemap (37/37). The one URL present in the prior 38-page crawl inventory that is absent from the sitemap (`/refonte-ia-friendly`) is correctly absent because it is now a 308 redirect, not a live page.

## Extra/Ghost Pages Check

None identified. All 37 `<url>` entries resolve HTTP 200 on live re-check; none are 404, redirected, or noindexed.

## Validation Checks

| Check | Baseline | Now | Status |
|---|---|---|---|
| Valid XML | N/A (unreachable) | Pass — well-formed, correct namespace, 37 `<url>` elements | Pass |
| HTTP 200 on `/sitemap.xml` | Fail (404) | Pass (200, `application/xml`) | Fixed |
| ≤50,000 URLs | Pass (~36-39) | Pass (37) | Pass |
| Non-200 URLs in sitemap | N/A | 0/37 | Pass |
| Noindexed URLs in sitemap | N/A | 0/37 | Pass |
| Redirected URLs in sitemap | N/A | 0/37 | Pass |
| Duplicate `<loc>` entries | Would-be 3 exact + 1 near-dup | 0 | Fixed |
| All-identical lastmod | Yes (static/city/project) | Still yes for 24/37 URLs (blog's 13 are real dates) | Still present (Low) |
| `priority`/`changefreq` present | Yes (harmless) | Yes (harmless) | Info, no action needed |
| robots.txt Sitemap directive resolves | Fail | Pass | Fixed |

## Location Page Quality Gate

- City pages: still 3 (`briancon-hautes-alpes`, `embrun-serre-poncon`, `gap-hautes-alpes`), unchanged since baseline.
- 30+ WARNING threshold: not triggered (3 << 30).
- 50+ HARD STOP threshold: not triggered.
- No action required at this time.

---

## Score Rationale (0-100, drift re-audit)

Baseline was 22/100, dominated by the Critical 404 (sitemap functionally worthless even though its logic was correct) plus a High-severity data-duplication issue and a High orphan-page issue.

- **+50** for fixing the Critical `/sitemap.xml` 404 (Finding #1) — this alone unblocks Google Search Console's entire URL-discovery pipeline, which was explicitly called out as "the single most consequential issue in this audit category."
- **+3** robots.txt directive now functional (Finding #2, was already correct syntax, just needed #1 fixed).
- **+8** for the High-severity Sanity duplicate cleanup (Finding #3) — 3 exact-duplicate URLs and 1 duplicate-content pair eliminated at the data source, verified live.
- **+7** for resolving the High-severity `/refonte-ia-friendly` orphan (Finding #4) via redirect + correct sitemap exclusion.
- **-2** residual: no defensive slug-dedup safeguard in the sitemap route code itself (relies entirely on clean Sanity data going forward).
- **0 net change** on Finding #5 (Low severity, unchanged — `lastmod` still fake/identical for 24 of 37 URLs).

**New score: 88 / 100.** The category moves from the worst-performing area of the audit to one of the strongest. The residual gap to a perfect score is entirely the Low-severity `lastmod` accuracy issue (Finding #5) plus the lack of defense-in-depth de-duplication logic — neither blocks crawling, indexing, or discovery today.

---

## Priority Action Summary (remaining)

1. **[Low]** Thread real `_updatedAt` (Sanity) through `cityRoutes`/`projectRoutes`, and consider per-page-type real dates or omission for `staticRoutes`, instead of the shared request-time `now` fallback in `src/app/api/sitemap/route.ts`.
2. **[Low, defense-in-depth]** Add slug-based de-duplication (`Set`) to `projectRoutes` in `src/app/api/sitemap/route.ts` so a future Sanity data-hygiene regression can't silently reintroduce duplicate `<url>` entries.
3. **[Info]** Document in-code (or a README) why `app/sitemap.ts`'s file-convention approach was abandoned in favor of the `next.config.ts` rewrite + `api/sitemap/route.ts`, so future maintainers don't accidentally "fix" it back to the broken convention-based approach.
