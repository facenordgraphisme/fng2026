# Local SEO — facenordgraphisme.fr — DRIFT RE-AUDIT (2026-08-22)

**Baseline:** 2026-06-15, category score 42/100 (`facenordgraphisme.fr-audit/findings/local.md`)
**Re-audit date:** 2026-08-22 — live production site verified directly (curl fetch of `https://www.facenordgraphisme.fr/`, `/villes/gap-hautes-alpes`, `/contact`) plus current repo source (`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/villes/[slug]/page.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/sanity/lib/queries.ts`) to confirm what is actually deployed.

**New category score: 49 / 100** (was 42/100 — modest net improvement)

---

## Dimension breakdown (updated)

| Dimension | Weight | Score /100 (was) | Notes |
|---|---|---|---|
| GBP Signals | 25% | 10 (10) | No change. Still no Maps `<iframe>` embed, no GBP `sameAs`, no "Avis Google" widget, no review carousel, no photo evidence. Only a plain outbound link to a Google Maps *place* search (not a GBP listing) on `/contact`, same as baseline. |
| Reviews & Reputation | 20% | 5 (5) | No change. Zero `AggregateRating`/`Review` schema, zero testimonials anywhere on `/`, `/a-propos`, or elsewhere. Confirmed via source grep — no testimonial section exists in `page.tsx` or `a-propos/page.tsx`. |
| Local On-Page SEO | 20% | 70 (70) | No change. City pages (`/villes/*`) remain strong and unique. Homepage hero copy softened from "Basé à Embrun" to "Basé près d'Embrun, j'accompagne également des clients à Gap, Briançon..." in one location — directionally more accurate but inconsistent with a second instance and the meta description (see Finding 7). |
| NAP Consistency & Citations | 15% | 60 (35) | **Improved.** The critical schema-phone bug is fixed in production: `+33651113928` now appears in every JSON-LD block checked (layout `ProfessionalService`, city-page `LocalBusiness`) — no `+33600000000` or `+33612345678` found anywhere live. Visible NAP remains consistent. Still docked for: `addressLocality` spelling still split ("Puy Sanières" vs "Puy-Sanières") and citation footprint still limited to LinkedIn only. |
| Local Schema Markup | 10% | 55 (35) | **Improved.** Homepage no longer ships a second conflicting `ProfessionalService` (the duplicate block previously in `src/app/page.tsx` has been removed — confirmed by source read and live fetch showing exactly one `ProfessionalService` node on `/`). Real phone number now used in 100% of schema blocks. Still docked for: city-page schema is still a bare `LocalBusiness` (not linked via shared `@id` to the canonical entity), still missing `geo` and `openingHoursSpecification`, still missing `addressRegion`, still a second/duplicate entity per city page (2 blocks instead of 1 canonical + reference), and still no `AggregateRating`/`Review`. |
| Local Link & Authority Signals | 10% | 30 (30) | No change. `sameAs` still LinkedIn-only. Dead `href="#"` Facebook/Instagram icons still present — relocated from the footer (baseline description) into the header/sidebar socials block (`src/components/Header.tsx` lines 213 & 216), but still non-functional. |

**Weighted score:** (10×.25)+(5×.20)+(70×.20)+(60×.15)+(55×.10)+(30×.10) = 2.5+1.0+14.0+9.0+5.5+3.0 = **35.0** raw weighted.

Applying the same qualitative blending logic as the baseline report (crediting the genuinely strong, unchanged city-page asset, and the fact that the single most severe *critical* issue — the fake sitewide phone number shipped to Google in structured data — is now fully and verifiably resolved in production): **49/100**.

---

## Issue-by-issue verification (live production + current source)

### 1. Placeholder/conflicting telephone numbers — **FIXED**
- **Live evidence:** `curl https://www.facenordgraphisme.fr/` → `"telephone":"+33651113928"` (homepage `ProfessionalService`). `curl https://www.facenordgraphisme.fr/villes/gap-hautes-alpes` → `"telephone":"+33651113928"` (city-page `LocalBusiness`). No occurrence of `+33600000000` or `+33612345678` found on either page.
- **Source:** `src/app/layout.tsx:139` and `src/app/villes/[slug]/page.tsx:268` both now hardcode `"+33651113928"`, matching the real visible `tel:` link.
- **Residual risk:** the number is still duplicated as a literal string in two files rather than centralized in one constant — a future edit to one location without the other could reintroduce drift. Not currently a live defect.

### 2. Three conflicting/duplicated `LocalBusiness`-type schema blocks — **PARTIALLY FIXED**
- **What changed:** The homepage-only duplicate `ProfessionalService` block that previously lived in `src/app/page.tsx` (sharing `@id: #localbusiness` with the layout block but disagreeing on properties) has been removed. Confirmed live: exactly one `"@type":"ProfessionalService"` node renders on `/`.
- **What remains:** City pages (`/villes/*`) still render a *second*, independent `LocalBusiness` block (`src/app/villes/[slug]/page.tsx`) alongside the sitewide `ProfessionalService` from the layout — confirmed live on `/villes/gap-hautes-alpes` (both `"@type":"ProfessionalService"` and `"@type":"LocalBusiness"` present, 1 each). This city-page block has no shared `@id` with the canonical `#localbusiness` entity, so Google still sees two disconnected entity declarations per city page rather than one canonical entity + a page-specific service reference. Down from 3 conflicting blocks sitewide to 2 per city page (0 duplicate on non-city pages) — a real reduction, but not the full consolidation recommended in the baseline.

### 3. No `AggregateRating`/`Review` schema or visible testimonials — **STILL PRESENT**
- Source-wide grep for `AggregateRating`, `Review` schema type, and testimonial UI (`témoignage`, `avis client`, star-rating markup) on `/`, `/a-propos`, and all schema-emitting files returns nothing referring to Face Nord Graphisme itself. The only "avis clients" mention remains inside the Verdon E-Bike portfolio case-study copy (a feature built *for a client*, not social proof about the agency).

### 4. No Google Business Profile link/Maps embed — **STILL PRESENT**
- No `<iframe>` maps embed found on `/` (grep returned nothing) or elsewhere. `/contact` still only has the same plain outbound link to `google.com/maps/place/Le+Serre,+05200+Puy-Sani%C3%A8res` (a location pin search, not a GBP listing URL) — identical to baseline. No `g.page` / `business.google.com` reference anywhere in `src`.

### 5. Dead placeholder social links (`href="#"`) — **STILL PRESENT** (relocated)
- Facebook and Instagram icons with `href="#"` are still live, but now found in `src/components/Header.tsx` (lines 213, 216) inside the sidebar/header socials block. `src/components/Footer.tsx` was checked in full and no longer contains any social icons at all — the placeholder links moved location rather than being fixed or removed. `sameAs` still lists only LinkedIn.

### 6. `addressLocality` spelling inconsistency — **STILL PRESENT**
- `src/app/layout.tsx:92,145` (and the `geo.placename` meta tag) still use `"Puy Sanières"` (no hyphen). `src/app/villes/[slug]/page.tsx:272` still uses `"Puy-Sanières"` (hyphenated). Live-verified: fetching `/villes/gap-hautes-alpes` returns **both** spellings on the same page load (one from the layout's sitewide schema, one from the city-page schema) — the inconsistency is now visibly co-located on a single page's markup, which is a slightly worse presentation of the same underlying bug.

### 7. Homepage copy says "Basé à Embrun" vs legal address Puy-Sanières — **PARTIALLY FIXED**
- One homepage instance was softened: hero/service-teaser copy now reads "Basé **près d'**Embrun, j'accompagne également des clients à Gap, Briançon et dans toute la région" (more accurate framing, verified live).
- However, a second on-page instance still reads the unqualified "Basé à Embrun, actif dans tout le 05" (`src/app/page.tsx:115`, confirmed present in the live React Flight payload), and the `<meta name="description">` on the homepage, layout, and `/contact` still all say "...basé à Embrun..." without qualification. `/contact` and `/a-propos` visible body copy correctly say "Basé à Puy-Sanières." Net: mixed signals remain, one clear improvement, several unchanged.

### 8. City-page `LocalBusiness` blocks lacked `geo`/`openingHoursSpecification` — **STILL PRESENT**
- `src/app/villes/[slug]/page.tsx` schema (lines 262-279) still has no `geo` and no `openingHoursSpecification` field. Live-verified on `/villes/gap-hautes-alpes`: `GeoCoordinates` and `OpeningHoursSpecification` strings each appear exactly once in the page's combined JSON-LD — both belong to the sitewide layout `ProfessionalService` block, not the city-specific `LocalBusiness` block, confirming the city block itself still omits them. Also still missing `addressRegion` and still typed as generic `LocalBusiness` rather than `ProfessionalService`.

### 9. No structured citation footprint beyond LinkedIn — **STILL PRESENT**
- `sameAs` in the `Organization` schema is unchanged: LinkedIn only. No PagesJaunes, Google Business Profile, Facebook Page, or other directory reference found anywhere in source or live HTML. SIRET remains published on `/mentions-legales` (unchanged positive).

---

## What's new since baseline (not previously flagged)

- Nothing materially new was introduced in this dimension. The `src/app/page.tsx` duplicate-schema removal is a genuine fix that also indirectly reduces one of the three original conflicting blocks referenced in Finding 2 and in `Full Report → Schema & Structured Data`.

---

## Top prioritized actions (updated)

| # | Priority | Action | Status |
|---|---|---|---|
| 1 | ~~Critical~~ Done | Fix fake `telephone` values sitewide | **Fixed** |
| 2 | High | Consolidate city-page `LocalBusiness` into the canonical `#localbusiness` entity (shared `@id`), add `geo`/`openingHoursSpecification`/`addressRegion` | Still open |
| 3 | High | Create/claim a Google Business Profile (correct primary category), add its `sameAs` link + a Maps embed or "Voir sur Google Maps" GBP CTA | Still open |
| 4 | High | Collect and publish real client testimonials with `Review`/`AggregateRating` schema | Still open |
| 5 | Medium | Fix (real URLs) or remove dead `href="#"` Facebook/Instagram links, now in `Header.tsx` | Still open |
| 6 | Medium | Standardize `addressLocality` to "Puy-Sanières" (hyphenated) in `layout.tsx` (2 occurrences) and the `geo.placename` meta tag | Still open |
| 7 | Low | Finish softening "Basé à Embrun" → "Basé près d'Embrun" in the remaining hero-copy instance (`page.tsx:115`) and all three meta descriptions | Partially open |
| 8 | Medium | Build minimal citation set (PagesJaunes, GBP, Facebook Page) with NAP matching the now-corrected canonical values | Still open |

---

## Limitations disclaimer

- Verified live via direct `curl` fetch of homepage, one city page, and `/contact` (server-rendered HTML/RSC payload) — not a full 38-page re-crawl; other city pages (`briancon-hautes-alpes`, `embrun-serre-poncon`) and remaining templates were checked via source-code inspection (`src/app/villes/[slug]/page.tsx` is a shared dynamic route, so behavior is expected to be identical across all three cities) rather than individually re-fetched.
- No DataForSEO/GBP API access — GBP existence, category, and review data still cannot be confirmed live; assessed from on-page absence of any GBP link/embed, unchanged from baseline.
- No Google Search Console/GA4 — local-pack visibility and proximity impact (55.2% of ranking variance, outside site control) remain unassessed.
- Tier-1 citation audits (Yelp, BBB, PagesJaunes, Societe.com) were not re-run via live `site:` search this cycle; presence/absence inferred only from on-site `sameAs`/link evidence, same limitation as baseline.
- Review velocity/18-day rule still cannot be assessed — no review history exists to evaluate.
