# Schema / Structured Data — facenordgraphisme.fr

**Score: 68 / 100**

**Sample reviewed:** `/` (home), `/prestations`, all 7 service pages, all 3 city pages (`/villes/*`), 6 portfolio pages, `/faq`, `/a-propos`, `/contact`, `/mentions-legales`, `/portfolio`, and 5 blog posts (`balises-title-meta-description-pme-hautes-alpes`, `gerer-avis-google-artisans-pme-hautes-alpes`, `seo-local-hautes-alpes-artisans-pme`, `refonte-site-internet-5-signes`, `4-signaux-citation-ia-artisans`). Raw HTML from `facenordgraphisme.fr-audit/raw/*.html` (live production fetch, 2026-06-15).

---

## What Works

- **Sitewide `@graph` block present on all 38 pages** (`Organization` + `WebSite` + `ProfessionalService`, single `<script type="application/ld+json">`, injected from `src/app/layout.tsx`). Uses `https://schema.org` context, stable `@id` anchors (`#organization`, `#website`, `#localbusiness`), and links `WebSite.publisher` → `Organization` via `@id` — correct JSON-LD graph practice.
- **`inLanguage: "fr-FR"` is confirmed LIVE on the `WebSite` node** in the sitewide graph on every sampled page (home, prestations, city pages, portfolio, blog posts) — the locale-audit-report.md claim is verified in production HTML, not just in uncommitted code.
- **`inLanguage: "fr-FR"` is confirmed LIVE on `BlogPosting`?** — **NO**, see Critical Finding below. The root-layout `WebSite.inLanguage` fix shipped, but the `BlogPosting.inLanguage` fix described in locale-audit-report.md as "Corrigé" is **not present in the live JSON-LD** of any sampled blog post.
- **A real `ProfessionalService`/`LocalBusiness` schema exists** with `address` (PostalAddress, Puy-Sanières 05200), `geo` (GeoCoordinates), `openingHoursSpecification`, and `priceRange` — this is exactly the right schema type for a solo local web agency, and it's present sitewide via the layout graph. Good foundation.
- **All 7 live service pages** (`/creation-site-internet-hautes-alpes`, `/boutique-e-commerce-hautes-alpes`, `/referencement-seo-hautes-alpes`, `/refonte-ai-friendly`, `/refonte-ia-friendly`, `/maintenance-site-internet-hautes-alpes`, `/referencement-ia`) carry a page-specific `Service` schema block with `name`, `description`, `areaServed`, and `provider`. Three of them (`creation-site-internet`, `refonte-ai-friendly`, `maintenance`) also include `Offer`/`priceSpecification` with real EUR pricing — good for AI Overviews / GEO price-citation.
- **All 3 city pages** (`/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`) carry a page-specific `LocalBusiness` block with `areaServed` set to the specific city, plus a unique 4-5 question `FAQPage` block tailored to that city's audience (tourism, seasonal businesses, bilingual sites). This is strong local-SEO/GEO structuring.
- **All 6 portfolio item pages** carry a `CreativeWork` block (`name`, `description`, `image`, `url` of the client's live site, `author` → `LocalBusiness` via `@id`). Valid type for a portfolio/case-study item; correctly cross-references the agency entity.
- **All 5 sampled blog posts carry a `BlogPosting` block** with `headline`, `description`, `image`, `datePublished`, `dateModified` (ISO 8601, UTC `Z` suffix — correct format), `author` (Person with `@id`, `name`, `jobTitle`), `publisher` (Organization), and `mainEntityOfPage` (WebPage with `@id` matching the canonical URL). All required/recommended Article properties are present and well-typed.
- **`/faq` and all 3 city pages and 5/5 sampled blog posts carry `FAQPage` schema** — fully consistent with the blog-strategy.md GEO standard ("FAQPage on every article"). Per current rules this earns no Google rich-result snippet (FAQ rich results retired sitewide May 2026), but the markup remains valuable for AI/LLM citation and entity grounding — correctly flagged as Info-level, not for removal.
- No deprecated types found (no `HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`).
- All `@context` values are `https://schema.org` (https, not http) — correct everywhere sampled.
- All URLs inside JSON-LD are absolute (`https://www.facenordgraphisme.fr/...`) — correct.

---

## Findings

### 1. CRITICAL — Duplicate, conflicting `ProfessionalService`/`#localbusiness` schema on the homepage (placeholder phone number shipped to production)
**Severity:** Critical
**Description:**
`/` (homepage) emits **two separate JSON-LD `<script>` blocks**, both declaring `"@id": "https://www.facenordgraphisme.fr/#localbusiness"` with `@type: "ProfessionalService"`, but with **different and partially conflicting property sets**:

- Block 0 (`@graph`, from `src/app/layout.tsx`, present on all 38 pages): `telephone: "+33600000000"`, `image: ".../home_intro.png"`, no `description`, no `email`, no `areaServed`.
- Block 1 (homepage-only, from `src/app/page.tsx`): no `telephone`, `image: ".../logo.png"`, has `description`, `email: "contact@facenordgraphisme.fr"`, `areaServed: ["Embrun","Gap","Briançon","Guillestre","Hautes-Alpes"]`.

Two consequences:
1. **Two entities sharing the same `@id`** with conflicting data is invalid graph practice — Google's Rich Results Test / Knowledge Graph merge logic may pick either version unpredictably, or flag a conflict.
2. **`telephone: "+33600000000"` is a placeholder value** (repeating digits, clearly not a real number) shipped to production on **all 38 pages** via the sitewide `@graph` block in `src/app/layout.tsx`. This is the only `telephone` Google will see for the `Organization`/`LocalBusiness` entity on most pages (home, prestations, blog, portfolio, etc.) — the real-looking `+33612345678` only appears on the 3 city pages' separate `LocalBusiness` block (and that number itself looks like a placeholder pattern too — verify against the real business line).

**Recommendation:**
- Merge into **one** `ProfessionalService` definition in `src/app/layout.tsx`'s `@graph`, combining the best of both: keep `description`, `email`, and `areaServed` from `page.tsx`'s block, and **replace `telephone` with the real business phone number** (or omit `telephone` entirely if the business genuinely has no public phone line — `telephone` is recommended but not strictly required for `LocalBusiness`).
- **Remove the duplicate block entirely from `src/app/page.tsx`** (lines ~31-66) — the homepage will then correctly inherit the single sitewide definition from the layout's `@graph`.
- Reconcile `image`: pick one canonical image (logo vs. home_intro) for `#localbusiness`.
- Audit the `+33612345678` on city pages too — if it's also a placeholder, replace with the real number everywhere (consistency of NAP — Name/Address/Phone — across all entity mentions matters for local SEO and Google Business Profile matching).

**Corrected JSON-LD for `src/app/layout.tsx`** (replace the existing `ProfessionalService` node inside `@graph`, and delete the duplicate block in `page.tsx`):

```json
{
  "@type": "ProfessionalService",
  "@id": "https://www.facenordgraphisme.fr/#localbusiness",
  "name": "Face Nord Graphisme",
  "description": "Création de site internet sur-mesure, E-commerce, UX-UI design et référencement SEO dans les Hautes-Alpes (Embrun, Gap, Guillestre, Briançon).",
  "image": "https://www.facenordgraphisme.fr/assets/logo.png",
  "url": "https://www.facenordgraphisme.fr",
  "email": "contact@facenordgraphisme.fr",
  "telephone": "+33REPLACE_WITH_REAL_NUMBER",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "45 impasse du Serre",
    "addressLocality": "Puy Sanières",
    "postalCode": "05200",
    "addressRegion": "Hautes-Alpes",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.5385,
    "longitude": 6.4328
  },
  "areaServed": ["Embrun", "Gap", "Briançon", "Guillestre", "Hautes-Alpes"],
  "priceRange": "€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
}
```

---

### 2. HIGH — `BlogPosting.inLanguage: "fr-FR"` fix from locale-audit-report.md is NOT live in production
**Severity:** High
**Description:**
`locale-audit-report.md` (2026-06-05) claims `"inLanguage": "fr-FR"` was added to the `blogSchema` object in `src/app/blog/[slug]/page.tsx` and marks this as "Corrigé" (fixed). However, the **live JSON-LD on all 5 sampled blog posts** (`balises-title-meta-description-pme-hautes-alpes`, `gerer-avis-google-artisans-pme-hautes-alpes`, `seo-local-hautes-alpes-artisans-pme`, `refonte-site-internet-5-signes`, `4-signaux-citation-ia-artisans`) shows **no `inLanguage` property** on the `BlogPosting` block:

```json
{"@context":"https://schema.org","@type":"BlogPosting","headline":"...","description":"...","image":[...],"datePublished":"...","dateModified":"...","author":[...],"publisher":{...},"mainEntityOfPage":{...}}
```

This confirms the crawl-summary note: the locale-audit fixes are **uncommitted/undeployed**. The git status shows `M src/app/blog/[slug]/page.tsx` as locally modified but not yet built/deployed to the live site.

**Recommendation:** Deploy the pending changes to `src/app/blog/[slug]/page.tsx` (and `src/app/sitemap.ts`, `src/sanity/lib/queries.ts` per the same report). Once deployed, the `BlogPosting` block should read:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Balises title & meta : guide PME 05",
  "description": "...",
  "image": ["https://cdn.sanity.io/images/k4x2bvj1/production/....jpg"],
  "datePublished": "2026-05-10T09:30:57.518Z",
  "dateModified": "2026-05-10T09:30:57.518Z",
  "inLanguage": "fr-FR",
  "author": [{"@type": "Person", "@id": "https://www.facenordgraphisme.fr/a-propos#fxpin", "name": "François-Xavier Pin", "url": "https://www.facenordgraphisme.fr", "jobTitle": "Développeur web & graphiste — Hautes-Alpes (05)", "sameAs": []}],
  "publisher": {"@type": "Organization", "name": "Face Nord Graphisme", "url": "https://www.facenordgraphisme.fr"},
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://www.facenordgraphisme.fr/blog/balises-title-meta-description-pme-hautes-alpes"}
}
```

This is a cross-cutting issue with the deployment-status category (sitemap.ts/queries.ts changes are also pending) — flag for the same deploy.

---

### 3. HIGH — Mojibake/encoding corruption inside `FAQPage` JSON-LD on `/blog/seo-local-hautes-alpes-artisans-pme` (extends crawl-summary finding #7 beyond `<title>` tags)
**Severity:** High
**Description:**
Crawl-summary finding #7 documents U+FFFD replacement-character corruption in 4 blog `<title>` tags. The **same corruption is present inside the structured-data `FAQPage` block** of `/blog/seo-local-hautes-alpes-artisans-pme` — every accented character (é, è, à, ô, ç, û, etc.) in all 4 `Question.name` and `Answer.text` fields has been replaced with `�` (U+FFFD):

```json
"name":"Quelle est la diff�rence entre SEO local et SEO classique ?"
"text":"Le SEO classique vise � vous classer pour des mots-cl�s g�n�raux � l'�chelle nationale..."
```

This means:
- The structured data is **syntactically valid JSON** (parses fine) but **semantically garbled** — AI/LLM crawlers consuming this `FAQPage` for GEO citation will extract corrupted French text, undermining the entire GEO/FAQPage strategy from blog-strategy.md for this specific article.
- Likely root cause is the same as finding #7: a corrupted `seoTitle`/body field in Sanity for this document (Latin-1/UTF-8 double-encoding), propagating into whatever Sanity field feeds the FAQ block content.

**Recommendation:** Fix at the Sanity source — re-type or re-paste the FAQ question/answer text for `seo-local-hautes-alpes-artisans-pme` in Sanity Studio (do not just patch the rendered HTML, since the corruption is in the underlying data, evidenced by it appearing in both `<title>` and structured data independently). After the fix, validate with Google's Rich Results Test and re-crawl to confirm clean UTF-8 throughout (`<title>`, meta description, body, and all 4 FAQ Q/A pairs).

---

### 4. MEDIUM — `/faq` FAQPage retained for AI/GEO value; Google SERP rich-result no longer applies (Info-level, no action required)
**Severity:** Info
**Description:**
`/faq` carries a 6-question `FAQPage` block, and all 3 city pages plus all 5 sampled blog posts also carry `FAQPage` blocks (9-23 total `FAQPage` instances sitewide). Per the May 2026 retirement of FAQ rich results for all sites, **none of these will produce a Google SERP snippet**. However, per current guidance, **existing FAQPage markup should be retained** — it continues to aid AI/LLM citation, entity disambiguation, and on-page answer-engine optimization (directly aligned with blog-strategy.md's GEO cluster strategy).
**Recommendation:** No removal needed. Optional: consider documenting in `blog-strategy.md` that FAQPage is now purely a GEO/AI-visibility tactic (not a SERP-feature tactic), so future content decisions are made with accurate expectations. No JSON-LD changes required.

---

### 5. MEDIUM — No `BreadcrumbList` schema anywhere on the site, despite being marketed as a deliverable
**Severity:** Medium
**Description:**
Across all 38 pages, **zero `BreadcrumbList` JSON-LD blocks exist**. Ironically, the `/refonte-ai-friendly` service page's on-page copy explicitly lists *"Schema.org IA-friendly (LocalBusiness, FAQPage, BreadcrumbList)"* as part of the AI-friendly redesign package sold to clients — but the agency's own site doesn't implement it. This is a missed opportunity for:
- Breadcrumb rich results in Google SERPs (still supported, unlike FAQ).
- Clearer site-hierarchy signals for crawlers on deep pages like `/blog/[slug]`, `/portfolio/[slug]`, `/villes/[slug]`, and the 7 service pages.
- Practicing what is sold — a competent local SEO agency's own site lacking a feature it sells as a selling point is a credibility risk if a prospect inspects the source.

**Recommendation:** Add a `BreadcrumbList` block to every non-homepage page, reflecting the actual navigation hierarchy. Example for a service page (`/creation-site-internet-hautes-alpes`):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.facenordgraphisme.fr"},
    {"@type": "ListItem", "position": 2, "name": "Prestations", "item": "https://www.facenordgraphisme.fr/prestations"},
    {"@type": "ListItem", "position": 3, "name": "Création Site Internet Hautes-Alpes", "item": "https://www.facenordgraphisme.fr/creation-site-internet-hautes-alpes"}
  ]
}
```

Example for a blog post (`/blog/seo-local-hautes-alpes-artisans-pme`):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.facenordgraphisme.fr"},
    {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.facenordgraphisme.fr/blog"},
    {"@type": "ListItem", "position": 3, "name": "SEO local Hautes-Alpes - guide PME 05", "item": "https://www.facenordgraphisme.fr/blog/seo-local-hautes-alpes-artisans-pme"}
  ]
}
```

Example for a portfolio item (`/portfolio/verdon-ebike`):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.facenordgraphisme.fr"},
    {"@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://www.facenordgraphisme.fr/portfolio"},
    {"@type": "ListItem", "position": 3, "name": "Verdon E-Bike", "item": "https://www.facenordgraphisme.fr/portfolio/verdon-ebike"}
  ]
}
```

Implement once in a shared component (e.g. a `BreadcrumbSchema` component taking a `segments` prop) and drop into each route's page component — minimal duplication.

---

### 6. MEDIUM — `Service` schema `provider` is a bare `LocalBusiness` stub, not linked to the canonical `#localbusiness` entity (inconsistent across 6 of 7 service pages)
**Severity:** Medium
**Description:**
6 of the 7 `Service` blocks (`creation-site-internet-hautes-alpes`, `boutique-e-commerce-hautes-alpes`, `referencement-seo-hautes-alpes`, `refonte-ai-friendly`, `maintenance-site-internet-hautes-alpes`, `referencement-ia`) define `provider` as an **inline, untethered stub**:

```json
"provider": {"@type": "LocalBusiness", "name": "Face Nord Graphisme", "url": "https://www.facenordgraphisme.fr"}
```

This creates a **second, anonymous `LocalBusiness` entity** with no `@id`, disconnected from the canonical `#localbusiness` `ProfessionalService` node defined in the sitewide `@graph`. Only `/refonte-ia-friendly` does it correctly:

```json
"provider": {"@type": "LocalBusiness", "@id": "https://www.facenordgraphisme.fr/#localbusiness", "name": "Face Nord Graphisme"}
```

**Recommendation:** Standardize all 6 `Service.provider` references to use `@id` referencing (matching `/refonte-ia-friendly`'s pattern):

```json
"provider": {
  "@id": "https://www.facenordgraphisme.fr/#localbusiness"
}
```

This consolidates all `Service` offerings under the single canonical business entity in the knowledge graph, which is the correct pattern for an `@graph`-based site and improves entity consistency for both Google and AI crawlers.

---

### 7. MEDIUM — City pages: separate, untethered `LocalBusiness` block duplicates (and slightly conflicts with) the sitewide `#localbusiness` entity
**Severity:** Medium
**Description:**
Each of the 3 city pages (`/villes/briancon-hautes-alpes`, `/villes/embrun-serre-poncon`, `/villes/gap-hautes-alpes`) emits a **second, separate `LocalBusiness` block** (block 1, no `@id`) in addition to the sitewide `@graph`'s `ProfessionalService #localbusiness` (block 0). The two blocks have overlapping but inconsistent data:

| Property | Sitewide `@graph` (`#localbusiness`) | City-page `LocalBusiness` block |
|---|---|---|
| `@type` | `ProfessionalService` | `LocalBusiness` |
| `telephone` | `+33600000000` (placeholder) | `+33612345678` |
| `addressLocality` | `Puy Sanières` | `Puy-Sanières` (hyphenated) |
| `addressRegion` | `Hautes-Alpes` | *(absent)* |
| `url` | `https://www.facenordgraphisme.fr` | page-specific URL (e.g. `.../villes/gap-hautes-alpes`) |
| `areaServed` | *(absent in this block)* | single city name (e.g. `"Gap"`) |
| `geo` | present | *(absent)* |

Two un-linked `LocalBusiness`-family entities describing the same business, with two different phone numbers and two spellings of the same locality (`Puy Sanières` vs `Puy-Sanières`), is a NAP-consistency problem and creates ambiguity about which is the "real" entity for Google's local algorithms.

**Recommendation:**
- Standardize the locality spelling sitewide (pick one: `Puy-Sanières` is the correct hyphenated commune name).
- Resolve the phone number conflict (see Finding 1) — use the single real number everywhere.
- Either (a) link the city-page `LocalBusiness` block to the canonical entity via `@id` and only override the page-specific fields (`url`, `areaServed`, `description`), or (b) if a separate "service area" entity per city is intentional for local-pack targeting, give each city block its **own distinct `@id`** (e.g. `#localbusiness-gap`) so it's clearly a related-but-distinct entity rather than an ambiguous duplicate of `#localbusiness`.

Example corrected block for `/villes/gap-hautes-alpes` (option a — recommended, simplest):

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.facenordgraphisme.fr/#localbusiness",
  "name": "Face Nord Graphisme",
  "url": "https://www.facenordgraphisme.fr/villes/gap-hautes-alpes",
  "description": "Création de site internet à Gap dans les Hautes-Alpes. Site vitrine, e-commerce, SEO local : devis gratuit sous 48 h pour les artisans et PME de la préfecture du 05.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "45 impasse du Serre",
    "addressLocality": "Puy-Sanières",
    "postalCode": "05200",
    "addressRegion": "Hautes-Alpes",
    "addressCountry": "FR"
  },
  "areaServed": "Gap",
  "priceRange": "€€",
  "serviceType": "Création de site internet"
}
```

---

### 8. LOW — Portfolio `CreativeWork` could be more specific (`Product`/`WebSite` of the client, or `Project`-style `CreativeWork` with `about`)
**Severity:** Low
**Description:**
All 6 portfolio items use `@type: "CreativeWork"` with `name`, `description`, `image`, `url` (the client's live site), and `author` linked to `#localbusiness` via `@id`. This is valid and reasonable — `CreativeWork` is a broad, safe type and there's no dedicated "Project" or "Portfolio item" type in schema.org, so this is an acceptable choice (no Google rich-result is associated with bare `CreativeWork` regardless). Two small, optional improvements:
- Add `dateCreated` or `datePublished` (the year/date the project was delivered) if available — helps AI tools answer "when did Face Nord Graphisme build X?".
- Consider adding `"about": {"@type": "Organization", "name": "Act Event Pro"}` (the client business name) to disambiguate the *subject* of the case study from the *author* (Face Nord Graphisme) — useful for entity-linking in AI answers about the client businesses themselves.

**Recommendation (optional enhancement, example for `/portfolio/verdon-ebike`):**

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Verdon E-Bike — Site vitrine location VAE Gorges du Verdon",
  "description": "Création du site vitrine et du système de réservation pour Verdon E-Bike, prestataire de location de vélos électriques dans les Gorges du Verdon.",
  "image": ["https://cdn.sanity.io/images/k4x2bvj1/production/4f4bfe4cebee829a3960da95f7e791485cb0bce0-1200x750.svg"],
  "url": "https://verdonebike.com/",
  "dateCreated": "2026-01-15",
  "about": {"@type": "Organization", "name": "Verdon E-Bike", "url": "https://verdonebike.com/"},
  "author": {"@type": "LocalBusiness", "@id": "https://www.facenordgraphisme.fr/#localbusiness", "name": "Face Nord Graphisme"}
}
```

---

### 9. LOW — `/prestations` (services hub page) has no `Service`/`ItemList` schema linking to the 7 individual `Service` entities
**Severity:** Low
**Description:**
`/prestations` only carries the sitewide `@graph` (block 0) — no page-specific schema. As the hub page listing all 7 services, it's a natural candidate for an `ItemList` of `Service` items (or `OfferCatalog` on the `ProfessionalService` entity), helping both Google and AI crawlers understand the full service catalog from one page.
**Recommendation (optional):** Add an `OfferCatalog` to the `#localbusiness` entity (in the sitewide `@graph`, or as a page-specific addition on `/prestations`):

```json
{
  "@type": "OfferCatalog",
  "name": "Prestations Face Nord Graphisme",
  "itemListElement": [
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Création de site internet", "url": "https://www.facenordgraphisme.fr/creation-site-internet-hautes-alpes"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Boutique e-commerce", "url": "https://www.facenordgraphisme.fr/boutique-e-commerce-hautes-alpes"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Référencement SEO local", "url": "https://www.facenordgraphisme.fr/referencement-seo-hautes-alpes"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Référencement IA (GEO)", "url": "https://www.facenordgraphisme.fr/referencement-ia"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Refonte de site internet AI-Friendly", "url": "https://www.facenordgraphisme.fr/refonte-ai-friendly"}},
    {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Maintenance de site internet", "url": "https://www.facenordgraphisme.fr/maintenance-site-internet-hautes-alpes"}}
  ]
}
```

Note: only include 6 of the 7/8 service URLs once the `/refonte-ai-friendly` vs `/refonte-ia-friendly` duplicate (crawl-summary finding #5) is resolved — do not encode the orphan duplicate into structured data.

---

### 10. LOW — No `AggregateRating`/`Review` schema anywhere, despite blog content extensively discussing Google reviews
**Severity:** Low
**Description:**
Zero `Review` or `AggregateRating` blocks found sitewide. The blog post `gerer-avis-google-artisans-pme-hautes-alpes` is entirely about managing Google reviews for clients, but Face Nord Graphisme's own site has no review/rating markup for itself (e.g., testimonials from past clients like Act Event Pro, GAEC des Valentins, etc., if such testimonials exist on `/a-propos` or `/portfolio`).
**Recommendation:** If client testimonials exist anywhere on the site (or could be added to `/a-propos` or individual portfolio pages), add `Review` schema attached to the `#localbusiness` entity:

```json
{
  "@type": "Review",
  "itemReviewed": {"@id": "https://www.facenordgraphisme.fr/#localbusiness"},
  "author": {"@type": "Person", "name": "Client Name"},
  "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
  "reviewBody": "Testimonial text here..."
}
```

Only add this if real, attributable testimonials exist — do not fabricate reviews (would violate Google's structured-data policies and the "no placeholder text" rule).

---

## Summary Table

| Page type | Sitewide `@graph` (Org/WebSite/LocalBusiness) | Page-specific schema | Status |
|---|---|---|---|
| `/` (home) | Yes (+ duplicate conflicting `ProfessionalService` block) | — | Critical fix needed |
| 7 service pages | Yes | `Service` (6/7 with untethered `provider`, 1/7 correct) | Medium fix needed |
| 3 city pages | Yes | `LocalBusiness` (untethered/conflicting) + `FAQPage` | Medium fix needed |
| `/faq` | Yes | `FAQPage` (6 Q&A) | OK (Info: SERP-inert, AI-valuable) |
| 6 portfolio pages | Yes | `CreativeWork` | OK, minor enhancements possible |
| 13 blog posts (5 sampled) | Yes | `BlogPosting` + `FAQPage`; missing `inLanguage` (undeployed fix) | High fix needed |
| `/a-propos`, `/contact`, `/portfolio`, `/mentions-legales` | Yes | None | OK (no obvious page-specific type needed) |
| All 38 pages | — | `BreadcrumbList` | Missing — Medium opportunity |

---

*Findings written 2026-06-15 based on live production HTML in `facenordgraphisme.fr-audit/raw/*.html`.*
