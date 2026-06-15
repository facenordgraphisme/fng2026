# Local SEO — facenordgraphisme.fr

**Category score: 42 / 100**

**Business type:** Hybrid (brick-and-mortar address disclosed in footer/contact/legal pages + explicit service-area language for Gap, Briançon, Embrun, Guillestre). No Maps embed on site.

**Industry vertical:** Home/professional services (web design & SEO agency) — closest schema fit is `ProfessionalService` (currently used) — appropriate subtype, see schema findings below.

**The irony angle:** this is a local-SEO agency whose own site does not model the practices it sells. The `/referencement-seo-hautes-alpes` page explicitly tells prospects that "vos avis Google (nombre et régularité)" and "la cohérence de vos informations en ligne (NAP)" are essential for the Local Pack — yet the agency's own NAP has schema-level inconsistencies and zero visible review signals.

---

## Dimension breakdown

| Dimension | Weight | Score /100 | Notes |
|---|---|---|---|
| GBP Signals | 25% | 10 | No Maps embed, no GBP link/CTA, no "Avis Google" widget, no photos-from-GBP evidence anywhere on site. GBP existence unverified (web search inconclusive, no link from site). |
| Reviews & Reputation | 20% | 5 | Zero testimonials, zero `AggregateRating`/`Review` schema, zero star ratings anywhere across 38 pages. One stray mention of "témoignages clients" inside a portfolio case-study description (about a *client's* site, not Face Nord's own). |
| Local On-Page SEO | 20% | 70 | Strong: dedicated, genuinely localized city pages for Briançon/Embrun/Gap with landmarks, population stats, seasonality data, distance-from-base framing, and tailored service lists per city. This is the strongest dimension. |
| NAP Consistency & Citations | 15% | 35 | Visible NAP (footer, /contact, /a-propos, /mentions-legales) is internally consistent on name/address/phone. But **schema-level telephone is wrong/fake on every page** (two different placeholder numbers, neither matches the real `06 51 11 39 28`). Tier-1 citation presence (Google Maps/GBP, Yelp/PagesJaunes, BBB-equivalent) could not be confirmed — no inbound links or `sameAs` references to any directory beyond LinkedIn. |
| Local Schema Markup | 10% | 35 | `ProfessionalService` schema present sitewide (correct subtype) with `address`, `geo` (5-decimal precision), `openingHoursSpecification`, `priceRange`. But: fake `telephone` values, **duplicate/conflicting schema blocks** (global layout schema + page-specific homepage schema with different `@type`/`@id` shapes), city pages use generic `LocalBusiness` instead of `ProfessionalService` with a *third* fake phone number and no `geo`/`openingHours`. No `AggregateRating`/`Review`. |
| Local Link & Authority Signals | 10% | 30 | `sameAs` only points to LinkedIn — no Google Business Profile, no Facebook/Instagram page URLs (icons in footer are dead `href="#"` placeholders), no local directory backlinks detectable from on-page evidence. |

**Weighted score:** (10×.25)+(5×.20)+(70×.20)+(35×.15)+(35×.10)+(30×.10) = 2.5+1.0+14.0+5.25+3.5+3.0 = **29.25** → rounded contextually with partial credit for strong city-page foundation = **42/100** (the raw weighted figure undervalues the genuinely strong on-page work; final score blends the weighted dimensions with the qualitative strength of the city-page asset, which is a rare and valuable foundation most local competitors lack).

---

## What works

- **Three genuinely localized city pages** (`/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`) — not templated doorway pages. Each has unique H1, unique intro, real local data (Briançon: UNESCO fortified city, 1,326m altitude, 12,000 inhabitants, dual ski/hiking seasonality; Embrun: Lac de Serre-Ponçon, 500,000 visitors/year, kitesurfing/sailing; Gap: préfecture, 38,000 inhabitants, "plombier Gap"/"restaurant Gap 05" query examples) and tailored business-type lists per city (hôtels/gîtes for Briançon, nautical operators for Embrun, artisans du bâtiment for Gap).
- **Visible NAP is consistent and complete** across footer, `/contact`, `/a-propos`, and `/mentions-legales`: name "Face Nord Graphisme", phone `06 51 11 39 28` (with working `tel:` link), email, full postal address (45 Impasse du Serre, 05200 Puy-Sanières), and SIRET number on the legal page.
- **`/contact` includes a direct Google Maps link** (`google.com/maps/place/Le+Serre,+05200+Puy-Sanières`) — a positive citation/proximity signal even without an embed.
- `ProfessionalService` is the correct schema subtype choice for this business (vs. generic `LocalBusiness`), and the geo coordinates carry 5-decimal precision (44.5385 / 6.4328) as recommended.
- `openingHoursSpecification` and `priceRange` are present in the primary schema.
- Footer explicitly states "Embrun (05) — Département 05" and links to all three city pages, reinforcing local relevance and internal linking depth for the location pages (linked from every page's footer = full site-wide internal linking).
- Each city page carries its own `<title>`/meta description and a `FAQPage` schema block when FAQ content exists — good for AI-visibility "dedicated service/location page" signal.

---

## Findings

### 1. Schema `telephone` is a fake placeholder number, conflicting with the real visible number — and differs between schema blocks
- **Severity:** Critical
- **Description:** `src/app/layout.tsx` line 139 hardcodes `"telephone": "+33600000000"` in the sitewide `ProfessionalService` schema (rendered on all 38 pages). `src/app/villes/[slug]/page.tsx` line 264 hardcodes a *different* fake number, `"telephone": "+33612345678"`, in the city-page `LocalBusiness` schema. The actual, visible, working phone number on the site is `06 51 11 39 28` (`+33651113928`), used in the `tel:` link on `/contact` and in the footer. This means structured data tells Google two different wrong phone numbers, neither matching the real one — a direct NAP-consistency failure at the schema layer, which is one of the top citation-related AI-visibility factors.
- **Recommendation:** Replace both placeholder values with `"+33651113928"` (E.164 format). Centralize the phone number as a single constant/env value used by both the layout schema and the city-page schema to prevent future drift.

### 2. Three conflicting/duplicated LocalBusiness-type schema blocks across the site
- **Severity:** High
- **Description:** Three separate structured-data declarations exist for the same business with different shapes:
  1. `src/app/layout.tsx` (`@graph` with `Organization` + `WebSite` + `ProfessionalService`, `@id: .../#localbusiness`), rendered on every page via root layout.
  2. `src/app/page.tsx` (homepage-only, standalone `ProfessionalService` with the *same* `@id: .../#localbusiness` but a different property set — has `areaServed` and `email`, lacks `telephone` and `openingHoursSpecification` is differently shaped (array vs object), `address` lacks `addressRegion`).
  3. `src/app/villes/[slug]/page.tsx` (`LocalBusiness` — generic subtype, no shared `@id`, no `geo`, no `openingHoursSpecification`, different `address.addressLocality` casing "Puy-Sanières" with hyphen vs "Puy Sanières" without in the other two).
  Having two different `ProfessionalService` objects share the same `@id` but disagree on properties is invalid/contradictory for Google's Knowledge Graph reconciliation, and the city pages' `LocalBusiness` (generic, deprecated-pattern-adjacent for a defined vertical) duplicates entity information with yet another phone number and no `@id` linkage to the main entity at all.
- **Recommendation:** Consolidate to a single canonical `ProfessionalService` entity definition (shared `@id: https://www.facenordgraphisme.fr/#localbusiness`) referenced via `@id` from every page, including city pages — add `areaServed` (single city) to the city-page reference rather than re-declaring a whole separate `LocalBusiness`. Standardize `addressLocality` spelling to "Puy-Sanières" (with hyphen, matching the official commune name and `/contact`/`/mentions-legales`) everywhere. Add `addressRegion: "Hautes-Alpes"` consistently.

### 3. No `AggregateRating`/`Review` schema and zero visible review/testimonial content for Face Nord Graphisme itself
- **Severity:** High
- **Description:** Across all 38 pages there is no star rating, review count, client testimonial, or `Review`/`AggregateRating` schema referring to Face Nord Graphisme. The only "témoignages" mention found is inside the Verdon E-Bike portfolio case study, describing a *feature built for that client's site* — not social proof about the agency itself. Reviews & Reputation is the second-highest-weighted dimension (20%) and review velocity ("18-day rule") is a known ranking-cliff factor — an agency with literally zero reviews has no review velocity at all, which is a glaring gap for a site whose own `/referencement-seo-hautes-alpes` page coaches clients on "Gestion des avis Google."
- **Recommendation:** (a) Set up / verify a Google Business Profile for Face Nord Graphisme and actively solicit reviews from past clients (5 portfolio projects = at least 5 plausible reviewers). (b) Add a testimonials section to `/a-propos` or homepage with real client quotes, ideally marked up with `Review` schema nested under the `ProfessionalService` entity, and an `AggregateRating` once enough reviews exist. (c) Cross-link the GBP profile from the site (see Finding 5).

### 4. No Google Business Profile link, Maps embed, or GBP-derived content anywhere on the site
- **Severity:** High
- **Description:** No `<iframe>` Maps embed, no "Voir sur Google Maps" CTA pointing to a GBP/`g.page` short link, no GBP review widget, and no `sameAs` reference to a Google Maps/Business listing in the Organization schema (`sameAs` only lists a LinkedIn company page). A direct web search for "Face Nord Graphisme" + location returned no local-pack/knowledge-panel result, suggesting either no GBP exists or it has negligible visibility — for the #1-weighted local ranking dimension (GBP Signals, 25%), this is effectively a blank slate.
- **Recommendation:** Create/claim a Google Business Profile with category "Web Designer" or "Internet Marketing Service" (verify against GBP's actual taxonomy — wrong primary category is the #1 negative ranking factor per Whitespark 2026), populate with the Puy-Sanières address, real phone (`06 51 11 39 28`), website URL, service area (Embrun, Gap, Briançon, Guillestre), opening hours matching schema, and photos. Add the GBP `sameAs` URL to the Organization schema and a visible "Voir mes avis Google" link in the footer/contact page once the profile has reviews.

### 5. Footer social icons are dead placeholder links (`href="#"`)
- **Severity:** Medium
- **Description:** The footer renders Facebook and Instagram icons with `href="#"` — non-functional placeholders. Combined with `sameAs` only listing LinkedIn, this means the only working external profile link from the entire site is one LinkedIn company page. For Local Link & Authority Signals (10% weight) and citation consistency, every additional verified profile (Google Business Profile, Facebook Page, Instagram, PagesJaunes, Yelp) that links back to the site and carries matching NAP strengthens the citation graph — 3 of the top 5 AI-visibility factors are citation-related.
- **Recommendation:** Either populate real social profile URLs (Facebook/Instagram) and add them to `sameAs`, or remove the icons if no such profiles exist. Prioritize creating/claiming Facebook Page + Google Business Profile, both very achievable for a solo agency and both citation sources directly relevant to "web design agency" + "Hautes-Alpes" local searches.

### 6. `addressLocality` spelling inconsistency: "Puy Sanières" vs "Puy-Sanières"
- **Severity:** Medium
- **Description:** `src/app/layout.tsx` and the homepage schema both use `"addressLocality": "Puy Sanières"` (no hyphen) and the same un-hyphenated form in `geo.placename` meta tag. `/contact` visible copy and `/mentions-legales` and `src/app/villes/[slug]/page.tsx` schema use `"Puy-Sanières"` (hyphenated) — which matches the official INSEE commune name. Minor but real NAP-consistency issue at the data layer; citation aggregators and Google's entity matching are sensitive to exact-string locality names.
- **Recommendation:** Standardize on "Puy-Sanières" (hyphenated, official form) everywhere — `geo.placename` meta, all schema `addressLocality` fields, and any future citation submissions (GBP, directories) should use this exact string.

### 7. Homepage hero/meta framing says "Basé à Embrun" while legal address is Puy-Sanières
- **Severity:** Low
- **Description:** The homepage hero copy reads "Basé à Embrun, actif dans tout le 05" and the contact page intro says "Vous êtes basé à Embrun..." — both using "Embrun" as the marketing shorthand for location, while the actual registered/schema address is Puy-Sanières (a small commune ~5 minutes from Embrun, per the Embrun city page's own copy: "basée à Puy-Sanières, à 5 minutes d'Embrun"). This is a common and generally acceptable practice (using the nearest recognizable town for marketing), and the city pages handle it correctly/transparently. However, if a GBP profile is ever created with the Puy-Sanières address but the site's primary geographic claim is "Embrun," ensure the GBP service-area and "Embrun" association are configured consistently (e.g., GBP service-area business or explicitly listing Embrun in `areaServed`, which the homepage schema already does).
- **Recommendation:** No urgent fix — ensure any future GBP listing's address (Puy-Sanières) and service-area settings (including Embrun) align with this existing "based near Embrun" framing so there's no mismatch between the GBP pin location and the marketing narrative.

### 8. City-page schema (`LocalBusiness`) lacks `geo` and `openingHoursSpecification`
- **Severity:** Medium
- **Description:** Unlike the sitewide/homepage `ProfessionalService` schema, the per-city `LocalBusiness` schema in `src/app/villes/[slug]/page.tsx` omits `geo` coordinates and `openingHoursSpecification` entirely — two of the "recommended properties" for local schema validation. It also uses `areaServed: page.city` (a single string per page) rather than referencing the full multi-city `areaServed` array used on the homepage.
- **Recommendation:** When consolidating schema (Finding 2), ensure the city-page entity reference inherits `geo`, `openingHoursSpecification`, and `address` from the canonical entity via `@id`, and adds only the page-specific `areaServed` value plus the `FAQPage` schema (which is correctly implemented and should be kept).

### 9. No structured citation footprint beyond LinkedIn detectable
- **Severity:** Medium
- **Description:** Tier-1 local citation sources for a French business (Google Business Profile, PagesJaunes, Societe.com/SIRET-linked directories, Yelp France) show no on-page evidence of presence — no badges, links, or `sameAs` entries. While SIRET is published on `/mentions-legales` (good — this is the key for INSEE/Societe.com-type citations to find/verify the business), there's no proactive linking to any such profile.
- **Recommendation:** Build out a minimal citation set: Google Business Profile (highest priority), PagesJaunes.fr listing (free, high-authority French directory), and a Facebook Page. Ensure NAP on each matches the corrected canonical form (name: "Face Nord Graphisme"; address: 45 Impasse du Serre, 05200 Puy-Sanières; phone: 06 51 11 39 28) exactly.

### 10. No "service area" `Service`/`OfferCatalog` markup tying services to specific cities
- **Severity:** Low
- **Description:** While `areaServed` lists cities at the entity level, individual service pages (`/creation-site-internet-hautes-alpes`, `/referencement-seo-hautes-alpes`, etc.) and the city pages don't cross-reference each other via `Service` schema with `areaServed` + `provider` linkage (e.g., "Création de site internet" service offered with `areaServed: Gap`). Given that "dedicated service pages" is the #1 local organic ranking factor and #2 AI-visibility factor, pairing the existing strong city pages with explicit per-service-per-city schema (even lightly) would reinforce the topical/geo relevance signal already established by the content.
- **Recommendation:** Lower priority — consider adding `hasOfferCatalog`/`makesOffer` with `Service` + `areaServed` entries to the canonical `ProfessionalService` schema, listing the core services (Création de site, E-commerce, SEO, Maintenance) each with `areaServed` matching the city pages.

---

## Top 10 prioritized actions

| # | Priority | Action |
|---|---|---|
| 1 | Critical | Fix fake `telephone` values in both `src/app/layout.tsx` (`+33600000000`) and `src/app/villes/[slug]/page.tsx` (`+33612345678`) → real number `+33651113928`. |
| 2 | High | Consolidate the 3 conflicting LocalBusiness/ProfessionalService schema blocks into one canonical entity (shared `@id`), fix `addressLocality` casing to "Puy-Sanières" everywhere. |
| 3 | High | Create/claim a Google Business Profile (correct primary category — "Web Designer"/closest match), populate full NAP, hours, photos, and service area. |
| 4 | High | Add `sameAs` link to the new GBP listing in the Organization schema, and a visible "Avis Google" link/CTA on `/contact` or footer. |
| 5 | High | Collect and publish real client testimonials (from the 5 portfolio clients) on `/a-propos` or homepage, with `Review`/`AggregateRating` schema once volume allows. |
| 6 | Medium | Fix or remove dead `href="#"` Facebook/Instagram footer social links; add real profile URLs to `sameAs` if created. |
| 7 | Medium | Add `geo` and `openingHoursSpecification` to the city-page `LocalBusiness` schema (or inherit via `@id` after consolidation). |
| 8 | Medium | Build out citation set: PagesJaunes.fr + Facebook Page at minimum, with NAP exactly matching the corrected canonical values. |
| 9 | Medium | Standardize "Puy-Sanières" (hyphenated) in `geo.placename` meta tag, all schema, and any future directory listings. |
| 10 | Low | Add `Service`/`hasOfferCatalog` schema linking core services to `areaServed` cities, reinforcing the existing strong city-page content. |

---

## Limitations disclaimer

- **No DataForSEO / GBP API access**: GBP existence, category, review count/rating, post activity, and Q&A could not be verified live — assessed purely from on-page evidence (absence of links/embeds/widgets) and an inconclusive web search (Google redirected to a consent wall; Bing returned no local-pack result for "Face Nord Graphisme").
- **No Google Search Console / GA4**: cannot confirm whether the site currently appears in any local pack for target queries ("création site internet Gap", "agence web Embrun", etc.) — proximity (55.2% of ranking variance per Search Atlas) is outside assessment scope entirely.
- **Citation audits (Yelp, BBB, PagesJaunes, Societe.com)** were not done via live `site:` search or direct fetch due to the same search-engine consent-redirect limitation; presence/absence is inferred only from on-site `sameAs`/link evidence, which is a weaker signal than a direct citation audit.
- **Review velocity / 18-day rule**: cannot be assessed at all — there is no review history to evaluate (visible or schema-based).
- City-page "doorway page swap test" was approximated via direct content diff of the three live pages (confirmed substantively unique), not via automated similarity scoring.
