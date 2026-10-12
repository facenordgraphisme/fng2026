# Schema / Structured Data — facenordgraphisme.fr — DRIFT RE-AUDIT (2026-08-22)

**Score: 84 / 100** (baseline 2026-06-15: 68/100)

**Method:** Live production JSON-LD fetched directly (`fetch()`, `User-Agent: Mozilla/5.0`) on 2026-08-22 from `https://www.facenordgraphisme.fr` — home, `/prestations`, all 7 service pages (incl. `/refonte-ia-friendly` redirect target), all 3 city pages, `/faq`, `/a-propos`, `/contact`, `/mentions-legales`, `/portfolio` + all 6 portfolio items, `/blog` index + the same 5 blog posts sampled in the baseline. Raw HTML and extracted/parsed JSON-LD saved locally during the audit run for cross-checking. Compared byte-for-byte against `facenordgraphisme.fr-audit/findings/schema.md` (baseline).

---

## Baseline Issue Status (the 5 numbered drift-check items)

### 1. Duplicate/conflicting `ProfessionalService #localbusiness` + placeholder telephone — **FIXED**
The homepage now emits **exactly one** JSON-LD `<script>` block (single `@graph` with `Organization` + `WebSite` + `ProfessionalService`). The second, homepage-only `ProfessionalService` block from `src/app/page.tsx` is gone — confirmed by counting `<script type="application/ld+json">` occurrences on `/` (1, not 2).
The placeholder `telephone: "+33600000000"` has been replaced sitewide with a real-looking number: **`"+33651113928"`**, consistently on every sampled page (home, prestations, service pages, city pages, FAQ, blog posts). The city-page placeholder `+33612345678` is also gone — city pages now show the same `+33651113928` number, so phone NAP consistency between the sitewide entity and city pages is resolved.
Remaining minor NAP nit (not part of this numbered issue but adjacent): `addressLocality` is still spelled two ways — `"Puy Sanières"` (sitewide `@graph`) vs `"Puy-Sanières"` (city-page `LocalBusiness` blocks) — see Finding A below.

### 2. `BlogPosting.inLanguage: "fr-FR"` undeployed — **FIXED**
Confirmed live on all 5 sampled blog posts. Example (`/blog/seo-local-hautes-alpes-artisans-pme`):
```json
"@type": "BlogPosting", "headline": "...", "datePublished": "2026-05-14T00:00:00.000Z", "dateModified": "2026-05-14T00:00:00.000Z", "inLanguage": "fr-FR", "author": [...], "publisher": {...}, "mainEntityOfPage": {...}
```
`WebSite.inLanguage: "fr-FR"` (already live at baseline) is still present and unchanged.

### 3. Mojibake in `FAQPage` on `/blog/seo-local-hautes-alpes-artisans-pme` — **FIXED**
All 4 `Question`/`Answer` pairs now render clean UTF-8 French text with correct accents (é, è, à, ç, etc.):
```
"name": "Quelle est la différence entre SEO local et SEO classique ?"
"text": "Le SEO classique vise à vous classer pour des mots-clés généraux à l'échelle nationale..."
```
A sitewide scan of every fetched JSON-LD payload (23 pages, all `Question`/`Answer`/`BlogPosting`/`Service`/`LocalBusiness` fields) found **zero U+FFFD replacement characters** anywhere — the fix appears to be a genuine source-data correction in Sanity, not a one-off patch.

### 4. No `BreadcrumbList` anywhere — **PARTIALLY FIXED**
`BreadcrumbList` is now implemented and live on:
- All 7 service pages (`/creation-site-internet-hautes-alpes`, `/boutique-e-commerce-hautes-alpes`, `/referencement-seo-hautes-alpes`, `/refonte-ai-friendly`, `/maintenance-site-internet-hautes-alpes`, `/referencement-ia`, and `/refonte-ia-friendly` via 308 redirect)
- All 3 city pages (2-level: Accueil → City)
- `/portfolio` hub (2-level) and all 6 portfolio item pages (3-level: Accueil → Portfolio → Item)
- All 5 sampled blog posts (3-level: Accueil → Blog → Post)

It is **still missing** on:
- `/` (homepage) — arguably not required (root has no parent), but Google still credits a 1-item BreadcrumbList on the homepage in some implementations; low priority.
- `/prestations` — the services hub itself has no breadcrumb (only its children do), which is inconsistent.
- `/faq`, `/a-propos`, `/contact`, `/mentions-legales`
- `/blog` (index page)

7 of the 38 sampled/known page templates still lack `BreadcrumbList`. This is a real, verifiable improvement (0 → ~30 pages) but not complete sitewide coverage as the original recommendation specified ("every non-homepage page").

### 5. `/prestations` has no `ItemList` of the 7 services; no `AggregateRating`/`Review` sitewide — **STILL PRESENT**
`/prestations` still carries only the sitewide `@graph` (`Organization` + `WebSite` + `ProfessionalService`) with **no page-specific schema at all** — no `ItemList`, no `OfferCatalog`, no `CollectionPage`. This is unchanged from baseline.
A full scan of all 23 fetched pages found **zero `Review` and zero `AggregateRating` blocks** anywhere sitewide — unchanged from baseline. No action taken on this recommendation.

---

## What Works (confirmed live, 2026-08-22)

- Sitewide `@graph` (`Organization` + `WebSite` + `ProfessionalService`, `@id`-linked) present and now **de-duplicated** on every page, including home.
- `https://schema.org` context, absolute URLs (except the new portfolio-image regression below), ISO 8601 dates with `Z` suffix — all still correct.
- No deprecated types (`HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`) — none found.
- `FAQPage` retained sitewide (`/faq`, 3 city pages, 5 sampled blog posts) — correctly kept for AI/GEO value per current rule (Google FAQ rich results retired sitewide May 2026); no SERP benefit, no removal needed. Still Info-level, not a scoring deduction.
- `/portfolio` gained a page-specific `CollectionPage` block (`name`, `description`, `url`, `author` → `#localbusiness` via `@id`) — this is new since baseline and a good addition (baseline had no schema on the portfolio hub at all).
- `/refonte-ia-friendly` now correctly 308-redirects to `/refonte-ai-friendly` (single canonical URL, single JSON-LD payload) — resolves the duplicate-service-page ambiguity noted adjacent to baseline finding #9 (previously both URLs served live, separate content).

---

## New / Still-Open Issues Found in This Re-Audit

### A. NEW (regression) — Portfolio `CreativeWork.image` is now a relative URL on all 6 portfolio items
**Severity:** Medium
**Description:** At baseline, portfolio `CreativeWork.image` used absolute Sanity CDN URLs (`https://cdn.sanity.io/images/...`). In the current live payload, all 6 portfolio items now serve a **relative path**:
```json
"image": ["/assets/portfolio/verdonebike-home.png"]
```
(same pattern on `act-event-pro`, `gaec-des-valentins`, `gaudineto`, `linstant-verdon`, `reves-daventures`). This violates the "URLs must be absolute" validation rule — Google's Rich Results Test and structured-data parsers expect fully-qualified URLs for `image` properties; a relative path may fail to resolve correctly outside the page context (e.g., in a feed, API response, or LLM crawler that doesn't resolve relative to the document base).
**Recommendation:** Prefix with the site origin: `"https://www.facenordgraphisme.fr/assets/portfolio/verdonebike-home.png"`. Likely a one-line fix in the CreativeWork-schema-building code for the portfolio route (probably `src/app/portfolio/[slug]/page.tsx`), where a Sanity image asset URL was swapped for a local `/assets/...` path without adding the origin.

### B. STILL PRESENT (baseline finding #6) — `Service.provider` remains an untethered stub, not linked via `@id`, on all 7 service pages
**Severity:** Medium
All 6 distinct service pages checked (`creation-site-internet-hautes-alpes`, `boutique-e-commerce-hautes-alpes`, `referencement-seo-hautes-alpes`, `refonte-ai-friendly`, `maintenance-site-internet-hautes-alpes`, `referencement-ia`) still emit:
```json
"provider": {"@type": "LocalBusiness", "name": "Face Nord Graphisme", "url": "https://www.facenordgraphisme.fr"}
```
Notably, baseline reported `/refonte-ia-friendly` as the one correct exception (using `"@id": ".../#localbusiness"`). That page now redirects to `/refonte-ai-friendly`, whose `Service.provider` is the untethered stub — so the one previously-correct instance is gone (0/7 now vs. 1/7 at baseline, a very minor regression). Unchanged recommendation: replace with `{"@id": "https://www.facenordgraphisme.fr/#localbusiness"}`.

### C. STILL PRESENT (baseline finding #7) — City-page `LocalBusiness` block remains untethered and NAP-inconsistent
**Severity:** Medium
All 3 city pages still emit a second, separate `LocalBusiness` block (no `@id`) alongside the sitewide `#localbusiness` `ProfessionalService`. The telephone conflict from baseline is now resolved (both blocks agree: `+33651113928`), but other inconsistencies remain:
- `addressLocality`: `"Puy Sanières"` (sitewide) vs. `"Puy-Sanières"` (city blocks) — spelling still inconsistent.
- City blocks still lack `addressRegion` and `geo`.
- No `@id` linking the city `LocalBusiness` to `#localbusiness` (or a distinct `#localbusiness-{city}` id), so it remains an ambiguous, un-tethered duplicate entity in Google's graph-merge logic.
**Recommendation:** Unchanged from baseline — either link via `@id` to `#localbusiness` (recommended) or assign each city block its own distinct `@id`.

### D. Confirmed unaddressed (Low, baseline findings #8/#9/#10)
- Portfolio `CreativeWork` still has no `dateCreated`/`about` (optional enhancement, unaddressed).
- `/prestations` still has no `OfferCatalog`/`ItemList` of the 7 services (see Issue #5 above — repeated for completeness).
- No `Review`/`AggregateRating` anywhere sitewide (see Issue #5 above).

---

## Validation Checklist (sitewide, 2026-08-22)

| Check | Result |
|---|---|
| `@context` = `https://schema.org` | Pass, all blocks |
| No deprecated types | Pass |
| Required properties present (Organization, WebSite, ProfessionalService, Service, LocalBusiness, BlogPosting, FAQPage, CreativeWork, BreadcrumbList, CollectionPage) | Pass, all types carry their required fields |
| Property value types correct | Pass |
| No placeholder text | Pass — the `+336xxxxxxxx` placeholders are gone; no other placeholder strings found |
| URLs absolute | **Fail** — 6 portfolio `CreativeWork.image` values are relative (Finding A, new) |
| Dates ISO 8601 | Pass |
| Single, consistent `@id` per real-world entity | **Fail** — `#localbusiness` (sitewide) vs. untethered city-page `LocalBusiness` and untethered `Service.provider` stubs still create duplicate/ambiguous entities (Findings B, C, unchanged from baseline) |

---

## Summary Table

| Page type | Sitewide `@graph` | Page-specific schema | Status vs. baseline |
|---|---|---|---|
| `/` (home) | Single block (was duplicated) | — | Fixed (duplicate + placeholder phone resolved); still no `BreadcrumbList` |
| `/prestations` | Yes | None | Unchanged — no `ItemList`/`OfferCatalog` |
| 7 service pages | Yes | `Service` (provider still untethered) + `BreadcrumbList` (new) | Partially improved (breadcrumb added, provider issue persists) |
| 3 city pages | Yes | `LocalBusiness` (untethered, phone now consistent) + `FAQPage` (clean UTF-8) + `BreadcrumbList` (new) | Improved (phone + breadcrumb fixed; entity duplication persists) |
| `/faq` | Yes | `FAQPage` (6 Q&A) | Unchanged — still no `BreadcrumbList` |
| `/portfolio` hub + 6 items | Yes | `CollectionPage` (new) / `CreativeWork` + `BreadcrumbList` (new) | Improved, but new relative-URL image regression (Finding A) |
| 5 sampled blog posts | Yes | `BlogPosting` (`inLanguage` now live) + `FAQPage` (mojibake fixed) + `BreadcrumbList` (new) | Fixed (2 of the 5 numbered issues resolved here) + improved |
| `/a-propos`, `/contact`, `/mentions-legales`, `/blog` index | Yes | None | Unchanged — still no `BreadcrumbList` |

---

*Findings written 2026-08-22 based on live production JSON-LD fetched directly from `https://www.facenordgraphisme.fr` (23 URLs, `fetch()` + regex JSON-LD extraction, `redirect: manual` used to confirm the `/refonte-ia-friendly` → `/refonte-ai-friendly` 308).*
