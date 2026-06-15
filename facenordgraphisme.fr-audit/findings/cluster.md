# Topic Cluster Architecture — On-Site Execution Audit

**Category:** Content Architecture (feeds Content Quality + On-Page)
**Scope:** Audit of on-site execution of the 5-cluster strategy defined in `blog-strategy.md` (2026-06-05), against the 13 published posts as of 2026-06-15. Does NOT redo competitive/keyword research.

## Score: 47 / 100

The content production itself is ahead of schedule relative to the 90-day roadmap (2 of the Month-1 priority pieces are already live), and Cluster 1 (SEO Local) shows a genuinely good internal hub-spoke pattern with `spokeCard` components. But cross-cluster and cross-cluster-to-pillar linking is almost entirely absent, two internal links are flat-out broken (404), one post is a complete orphan with zero inbound links, the blog index has no cluster/category navigation at all, and a real cannibalization conflict exists between the new GEO pillar post and the `/referencement-ia` service page. These are exactly the "highest-leverage, lowest-effort" fixes the audit was asked to prioritize — none require new content, only edits to existing published posts.

---

## What Works

- **Cluster 1 (SEO Local) hub-spoke pattern is real and functional.** The hub `seo-local-hautes-alpes-artisans-pme` uses `spokeCard` components with working links to 3 of its spokes (`google-business-profile-artisans-hautes-alpes`, `gerer-avis-google-artisans-pme-hautes-alpes`, `balises-title-meta-description-pme-hautes-alpes`) plus an inline link to `prix-site-internet-artisan-pme-hautes-alpes`. This is the only cluster with a deliberate, content-team-authored internal link structure rather than incidental nav links.
- **Cluster 1 spokes link back to the hub.** All 5 Cluster-1 spokes (`balises-title-meta-description`, `gerer-avis-google`, `google-business-profile`, `le-guide-complet-de-la-visibilite-en-ligne`, `seo-vs-referencement-sur-l-ia`) contain a `href="/blog/seo-local-hautes-alpes-artisans-pme"` link — the mandatory spoke→pillar direction is satisfied for this cluster.
- **Roadmap is ahead of schedule on content production.** Both Month-1 "priorité absolue" items are live: the GEO pillar (`geo-referencement-ia-artisans-pme-hautes-alpes`) and its companion spoke S1 (`4-signaux-citation-ia-artisans`), plus Tourisme S1 (`reservation-directe-eviter-commissions-booking-hautes-alpes`). 3 of the planned ~8 Month-1/Month-2 pieces are published two weeks into the window.
- **GEO pillar correctly cross-links to its sibling spoke and to `seo-vs-referencement-sur-l-ia`**, and that "SEO vs IA" post links back — a genuine bidirectional cross-cluster link exists between Cluster 1 and Cluster 3.
- **GEO pillar has one correct contextual link to the `/referencement-ia` service page** via a `spokeCard` ("Découvrir le service") — this is the only example in the entire corpus of an in-body, contextual editorial link to a service page (everything else is nav-menu boilerplate).
- **No keyword-level title/H1 duplication** across the 13 posts themselves — each post targets a visibly distinct primary keyword.

---

## Findings

### 1. Two internal links are broken (404) — quick win, fixes inbound-link orphaning
**Severity:** High
**Description:** Two posts link to slugs that do not exist on the site:
- `blog_prix-site-internet-artisan-pme-hautes-alpes.html` and `blog_refonte-site-internet-5-signes.html` and `blog_seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026.html` all contain `href="/blog/gbp-artisans-hautes-alpes"` (3 occurrences) — the correct slug is `google-business-profile-artisans-hautes-alpes`.
- `blog_refonte-site-internet-5-signes.html` and `blog_seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026.html` both contain `href="/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes"` — the correct slug is `le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes`.

Both broken links use the styled `spokeCard` "Lire le guide complet →" CTA format, so they look like intentional internal-link placements that were never updated when the actual posts were published with different (longer) slugs than originally planned.

**Recommendation:** In Sanity, find/replace these two slugs across the 5 affected `spokeCard`/inline-link blocks in 3 posts. This is a 10-minute fix that recovers ~5 broken internal-link equity points and removes soft-404 internal links that Search Console will flag as crawl errors.

---

### 2. `reservation-directe-eviter-commissions-booking-hautes-alpes` is a complete orphan (zero inbound internal links)
**Severity:** High
**Description:** This post (Cluster 5 / Tourisme, Month-1 roadmap priority "Spoke Tourisme S1") has 2 outbound links (to `geo-referencement-ia-artisans-pme-hautes-alpes` and `guide-creation-site-internet-artisan-hautes-alpes`) but is the target of **zero** inbound `/blog/` links from any of the other 12 posts. The only ways to reach it are the flat `/blog` index list or external search. Per the validation checklist, every spoke needs ≥3 incoming internal links — this one has 0.

**Recommendation:** Add inbound links from:
- `digitaliser-reservations-tourisme-hautes-alpes` (its Cluster-5 sibling — currently does not link to it despite being thematically adjacent)
- `geo-referencement-ia-artisans-pme-hautes-alpes` (already linked TO by this post — make it reciprocal)
- `seo-local-hautes-alpes-artisans-pme` or `le-guide-complet-de-la-visibilite-en-ligne...` (both are broad SEO-local hubs that should reference the tourism/booking angle as a related use case for Segment C readers)

---

### 3. Cluster 4 (E-commerce) has zero posts — confirmed empty as flagged in strategy
**Severity:** Medium (informational — expected gap, not a new defect)
**Description:** Confirmed: none of the 13 published posts map to Cluster 4 (E-commerce Artisans & Produits Locaux). The strategy already flags this and schedules the E-commerce pillar for Month 3 (August 2026). Current cluster distribution across the 13 posts:

| Cluster | Posts | Pillar status |
|---|---|---|
| 1 — SEO Local | 6 (`seo-local-hautes-alpes-artisans-pme` + 5 spokes) | Hub exists, well-linked |
| 2 — Création de Site | 3 (`guide-creation-site-internet-artisan-hautes-alpes`, `prix-site-internet-artisan-pme-hautes-alpes`, `refonte-site-internet-5-signes`) | Pillar published but not yet positioned as hub (see Finding 5) |
| 3 — GEO & Référencement IA | 2 (`geo-referencement-ia-artisans-pme-hautes-alpes`, `4-signaux-citation-ia-artisans`) | Pillar published, 1 spoke live, on schedule |
| 4 — E-commerce | 0 | Not started — on schedule for Month 3 |
| 5 — Tourisme Digital | 2 (`reservation-directe-eviter-commissions-booking-hautes-alpes`, `digitaliser-reservations-tourisme-hautes-alpes`) | No pillar yet (planned Month 2); 2 spokes exist but are not cross-linked to each other |

**Recommendation:** No action needed before Month 3 per roadmap. When the E-commerce pillar is written, ensure it is cross-linked bidirectionally with the Cluster 2 (Création de Site) pillar per the "Architecture de Maillage Interne" diagram in `blog-strategy.md`.

---

### 4. Cluster 2 (Création de Site) and Cluster 5 (Tourisme) have no internal hub-spoke structure — posts are loosely cross-linked but not organized around their pillars
**Severity:** Medium
**Description:**
- **Cluster 2**: `guide-creation-site-internet-artisan-hautes-alpes` (the Month-1 pillar) links to `4-signaux-citation-ia-artisans` and `geo-referencement-ia-artisans-pme-hautes-alpes` (both Cluster 3) — both cross-cluster links, zero links to its own cluster siblings `prix-site-internet-artisan-pme-hautes-alpes` or `refonte-site-internet-5-signes`. Those two older posts (`prix-site-internet`, `refonte-site-internet-5-signes`) do not link to the new pillar either — they predate it and were never updated.
- **Cluster 5**: `digitaliser-reservations-tourisme-hautes-alpes` and `reservation-directe-eviter-commissions-booking-hautes-alpes` do not link to each other at all, despite being the only two posts in this cluster and both targeting the tourism/booking persona (Segment C).

**Recommendation:**
- Add `guide-creation-site-internet-artisan-hautes-alpes` → `prix-site-internet-artisan-pme-hautes-alpes` and → `refonte-site-internet-5-signes` (pillar→spoke, mandatory direction).
- Add `prix-site-internet-artisan-pme-hautes-alpes` → `guide-creation-site-internet-artisan-hautes-alpes` and `refonte-site-internet-5-signes` → same (spoke→pillar, mandatory direction — these were published before the pillar existed and were never retrofitted).
- Add a bidirectional link between `digitaliser-reservations-tourisme-hautes-alpes` and `reservation-directe-eviter-commissions-booking-hautes-alpes`.

---

### 5. Cross-cluster and cross-cluster-to-service-page linking is almost entirely nav-menu boilerplate, not contextual editorial links
**Severity:** High
**Description:** Per the strategy's "Architecture de Maillage Interne" diagram, every article should link to ≥1 relevant service page (`/referencement-ia`, `/creation-site-internet-hautes-alpes`, etc.) and every pillar should CTA to `/contact`. On inspection, **all 13 posts** contain identical sets of links to `/referencement-ia`, `/creation-site-internet-hautes-alpes`, `/boutique-e-commerce-hautes-alpes`, `/referencement-seo-hautes-alpes`, `/refonte-ai-friendly`, `/maintenance-site-internet-hautes-alpes`, `/prestations`, and `/contact` — but these come from the shared sidebar/dropdown navigation component (identical `pl-8 pr-10 ... hover:translate-x-2` markup repeated on every page), not from in-body editorial content. The `/contact` link also appears via the generic "Ce contenu vous a plu ? → Me contacter" template block at the end of every post (also boilerplate, not pillar-specific).

The **only exception** found across the corpus is the GEO pillar (`geo-referencement-ia-artisans-pme-hautes-alpes`), which has one genuine in-body `spokeCard` linking to `/referencement-ia` with contextual anchor text ("Découvrir le service").

**Recommendation:** This is the single highest-leverage fix available. For each post, add 1 contextual in-body link (via `spokeCard` or inline link) to the most relevant service page based on its cluster:
- Cluster 1 (SEO Local) posts → `/referencement-seo-hautes-alpes`
- Cluster 2 (Création de Site) posts → `/creation-site-internet-hautes-alpes`
- Cluster 3 (GEO/IA) posts → `/referencement-ia` (already done for the pillar — replicate for `4-signaux-citation-ia-artisans`)
- Cluster 5 (Tourisme) posts → `/creation-site-internet-hautes-alpes` or `/boutique-e-commerce-hautes-alpes` depending on angle

Nav-menu links do not count as topical relevance signals to Google or as citable context for AI crawlers — contextual in-body links with descriptive anchor text are what the GEO strategy itself calls for ("contenu citable par les IA").

---

### 6. Cannibalization risk: `/referencement-ia` (service page) vs `/blog/geo-referencement-ia-artisans-pme-hautes-alpes` (pillar post)
**Severity:** Medium-High
**Description:** Both pages target near-identical query space:

| | `/referencement-ia` | `/blog/geo-referencement-ia-artisans-pme-hautes-alpes` |
|---|---|---|
| Title | "Référencement IA — GEO & AI Overviews \| Face Nord Graphisme Hautes-Alpes" | "Référencement IA : Guide GEO 2026" |
| H1 | "Référencement IA & GEO pour les Hautes-Alpes" | "Référencement IA pour artisans et PME : le guide GEO 2026 pour être cité par ChatGPT" |
| Meta description | "Optimisez votre visibilité dans ChatGPT, Perplexity et les AI Overviews de Google. Stratégie GEO... Hautes-Alpes." | "Être cité par ChatGPT et Google AI Overviews en tant qu'artisan ou PME... Hautes-Alpes." |

Both pages compete for "référencement IA" + "GEO" + "ChatGPT" + "AI Overviews" + "Hautes-Alpes" — Google will need to choose which one ranks, and may alternate (classic cannibalization signal: fluctuating rankings, neither page reaching its potential). This sits on top of the already-flagged `/refonte-ai-friendly` vs `/refonte-ia-friendly` duplicate (same underlying problem pattern: a service page and a content asset converging on the same AI/GEO terminology without clear differentiation).

**Mitigating factor:** the blog post already links contextually to the service page (Finding "What Works" #5) and uses the service page as a commercial CTA ("Découvrir le service") — this is the *correct* informational→transactional relationship IF the two pages are clearly differentiated by intent. Currently they are not: both read as "about GEO/référencement IA in the Hautes-Alpes" rather than one being clearly "the service" and the other clearly "the educational guide."

**Recommendation:**
- Differentiate intent explicitly: rewrite `/referencement-ia`'s title/H1/meta to commercial framing ("Service de référencement IA (GEO) pour artisans et PME — Hautes-Alpes | Devis") and keep the blog post's framing as the educational "guide" — this is already partially true in the H1 wording but not in the title tags, which both lead with "Référencement IA".
- Ensure `/referencement-ia` does NOT itself try to rank for "guide GEO 2026" — that phrase should belong exclusively to the blog pillar.
- Add a reciprocal link from `/referencement-ia` to the blog pillar (currently the service page likely does not link back to the educational content — verify in the service-page audit).
- This compounds with the already-documented `/refonte-ai-friendly` vs `/refonte-ia-friendly` duplicate-content issue; both should be resolved as part of the same "AI/GEO terminology consolidation" pass — pick one canonical spelling ("IA" per French convention, matching the strategy's stated terminology-consistency rule) and merge or differentiate accordingly.

---

### 7. Blog index has no cluster/category navigation — clusters are invisible to users and crawlers
**Severity:** Low-Medium
**Description:** `/blog` renders a flat list of all 13 posts with no topic/category grouping, tags, or filtering. The 5-cluster architecture exists only in the internal strategy document and in scattered cross-links — there is no user-facing or crawlable signal (category pages, tag taxonomy, breadcrumbs) that groups posts by theme (SEO Local, Création de Site, GEO/IA, E-commerce, Tourisme).

**Recommendation:** Lower priority than the linking fixes above, but consider adding a simple category/tag field in Sanity (5 values matching the clusters) and rendering filter pills or grouped sections on `/blog`. This also gives Google an explicit topical-clustering signal via category archive pages (`/blog/categorie/seo-local`, etc.) once volume justifies it — not urgent at 13 posts, but should be planned before reaching 25-30 posts (Month 3-4 per roadmap).

---

## Roadmap Progress Check (vs. `blog-strategy.md` Mois 1)

| Mois 1 item | Status |
|---|---|
| Pillar GEO (3000+ mots) | **Published** — `geo-referencement-ia-artisans-pme-hautes-alpes` |
| Spoke GEO S1 — "4 signaux de citation IA" | **Published** — `4-signaux-citation-ia-artisans` |
| Pillar Création Site (3000+ mots) | **Published** — `guide-creation-site-internet-artisan-hautes-alpes` |
| Spoke Tourisme S1 — "Réservation directe" | **Published** — `reservation-directe-eviter-commissions-booking-hautes-alpes` (but orphaned, see Finding 2) |
| YouTube channel + Pillar GEO companion video | Not verifiable from crawl (off-site) |
| Update 9 existing articles with citation capsules | Partially — `capsule` block type exists in the page template (`renderBlock` case `'capsule'`), confirming the schema supports it; coverage across all 9 pre-existing posts not verified in this pass |

3 of 4 on-site content deliverables for Month 1 are live ahead of the June 2026 deadline. The gap is entirely in **internal linking integration** of the new posts into the existing cluster graph — they were published as standalone pieces with 1-2 cross-links each rather than being woven into the hub-spoke structure the strategy specifies.

---

## Internal Link Adjacency (as crawled, valid slugs only)

```
seo-local-hautes-alpes-artisans-pme (Cluster 1 HUB)
  → balises-title-meta-description-pme-hautes-alpes
  → gerer-avis-google-artisans-pme-hautes-alpes
  → google-business-profile-artisans-hautes-alpes
  → prix-site-internet-artisan-pme-hautes-alpes  [cross-cluster, C1→C2]

balises-title-meta-description-pme-hautes-alpes (C1 spoke)
  → gerer-avis-google-artisans-pme-hautes-alpes
  → google-business-profile-artisans-hautes-alpes
  → seo-local-hautes-alpes-artisans-pme  ✓ (spoke→hub)

gerer-avis-google-artisans-pme-hautes-alpes (C1 spoke)
  → google-business-profile-artisans-hautes-alpes
  → seo-local-hautes-alpes-artisans-pme  ✓ (spoke→hub)

google-business-profile-artisans-hautes-alpes (C1 spoke)
  → digitaliser-reservations-tourisme-hautes-alpes  [cross-cluster, C1→C5]
  → gerer-avis-google-artisans-pme-hautes-alpes
  → le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes
  → seo-local-hautes-alpes-artisans-pme  ✓ (spoke→hub)
  → seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026  [cross-cluster, C1→C3]

le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes (C1 spoke)
  → balises-title-meta-description-pme-hautes-alpes
  → gerer-avis-google-artisans-pme-hautes-alpes
  → google-business-profile-artisans-hautes-alpes
  → refonte-site-internet-5-signes  [cross-cluster, C1→C2]
  → seo-local-hautes-alpes-artisans-pme  ✓ (spoke→hub)
  → seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026  [cross-cluster, C1→C3]

seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026 (C1 spoke)
  → google-business-profile-artisans-hautes-alpes
  → le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes
  → refonte-site-internet-5-signes  [cross-cluster, C1→C2]
  → seo-local-hautes-alpes-artisans-pme  ✓ (spoke→hub)
  → [BROKEN] gbp-artisans-hautes-alpes
  → [BROKEN] visibilite-en-ligne-artisans-commerces-hautes-alpes

prix-site-internet-artisan-pme-hautes-alpes (Cluster 2)
  → digitaliser-reservations-tourisme-hautes-alpes  [cross-cluster, C2→C5]
  → le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes  [cross-cluster, C2→C1]
  → refonte-site-internet-5-signes  (intra-cluster C2, but no reciprocal)
  → seo-local-hautes-alpes-artisans-pme  [cross-cluster, C2→C1 hub]
  → [BROKEN] gbp-artisans-hautes-alpes

refonte-site-internet-5-signes (Cluster 2)
  → gerer-avis-google-artisans-pme-hautes-alpes  [cross-cluster, C2→C1]
  → le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes  [cross-cluster, C2→C1]
  → seo-local-hautes-alpes-artisans-pme  [cross-cluster, C2→C1 hub]
  → seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026  [cross-cluster, C2→C3]
  → [BROKEN] gbp-artisans-hautes-alpes
  → [BROKEN] visibilite-en-ligne-artisans-commerces-hautes-alpes

guide-creation-site-internet-artisan-hautes-alpes (Cluster 2 PILLAR)
  → 4-signaux-citation-ia-artisans  [cross-cluster, C2→C3]
  → geo-referencement-ia-artisans-pme-hautes-alpes  [cross-cluster, C2→C3]
  (NO links to own cluster siblings prix-site-internet or refonte-site-internet-5-signes)

geo-referencement-ia-artisans-pme-hautes-alpes (Cluster 3 PILLAR)
  → 4-signaux-citation-ia-artisans  ✓ (pillar→spoke)
  → seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026  [cross-cluster, C3→C1]
  → /referencement-ia (service page, contextual)  ✓

4-signaux-citation-ia-artisans (Cluster 3 spoke)
  → geo-referencement-ia-artisans-pme-hautes-alpes  ✓ (spoke→pillar)
  → guide-creation-site-internet-artisan-hautes-alpes  [cross-cluster, C3→C2]

digitaliser-reservations-tourisme-hautes-alpes (Cluster 5)
  → google-business-profile-artisans-hautes-alpes  [cross-cluster, C5→C1]
  → le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes  [cross-cluster, C5→C1]
  → refonte-site-internet-5-signes  [cross-cluster, C5→C2]
  (no link to reservation-directe-eviter-commissions, its C5 sibling)

reservation-directe-eviter-commissions-booking-hautes-alpes (Cluster 5)
  → geo-referencement-ia-artisans-pme-hautes-alpes  [cross-cluster, C5→C3]
  → guide-creation-site-internet-artisan-hautes-alpes  [cross-cluster, C5→C2]
  ** ZERO INBOUND LINKS — ORPHAN **
```

---

## Audit-Data JSON (Content Architecture category)

```json
{
  "category": "Content Architecture",
  "subcategory": "Topic Cluster Architecture",
  "score": 47,
  "max_score": 100,
  "what_works": [
    "Cluster 1 (SEO Local) hub has functional spokeCard links to 3 of 5 spokes plus an inline link to a 4th",
    "All 5 Cluster 1 spokes link back to the hub (mandatory spoke->pillar direction satisfied)",
    "3 of 4 Month-1 roadmap content deliverables already published ahead of schedule",
    "GEO pillar and SEO-vs-IA spoke have genuine bidirectional cross-cluster link",
    "GEO pillar has the only contextual in-body link to a service page (/referencement-ia) found in the corpus"
  ],
  "findings": [
    {
      "title": "Two broken internal links (404) using wrong slugs",
      "severity": "high",
      "description": "href=\"/blog/gbp-artisans-hautes-alpes\" (3 occurrences across prix-site-internet, refonte-site-internet-5-signes, seo-vs-referencement-sur-l-ia) should be google-business-profile-artisans-hautes-alpes; href=\"/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes\" (2 occurrences across refonte-site-internet-5-signes, seo-vs-referencement-sur-l-ia) should be le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes",
      "recommendation": "Fix 5 link instances across 3 Sanity documents to point to the correct existing slugs"
    },
    {
      "title": "reservation-directe-eviter-commissions-booking-hautes-alpes is an orphan page with zero inbound internal links",
      "severity": "high",
      "description": "Month-1 roadmap Tourisme spoke is published but unreachable via internal navigation from any other post",
      "recommendation": "Add inbound links from digitaliser-reservations-tourisme-hautes-alpes, geo-referencement-ia-artisans-pme-hautes-alpes (make reciprocal), and seo-local-hautes-alpes-artisans-pme"
    },
    {
      "title": "Cross-cluster and service-page links are nav-menu boilerplate, not contextual editorial links",
      "severity": "high",
      "description": "All 13 posts contain identical sets of links to /referencement-ia, /creation-site-internet-hautes-alpes, /boutique-e-commerce-hautes-alpes, /referencement-seo-hautes-alpes, /refonte-ai-friendly, /maintenance-site-internet-hautes-alpes, /prestations, /contact via the shared sidebar nav and generic end-of-article CTA -- only the GEO pillar has a genuine contextual in-body service-page link",
      "recommendation": "Add 1 contextual spokeCard/inline link per post to the most cluster-relevant service page with descriptive anchor text"
    },
    {
      "title": "Cannibalization: /referencement-ia service page vs /blog/geo-referencement-ia-artisans-pme-hautes-alpes pillar post",
      "severity": "medium-high",
      "description": "Both pages target near-identical title/H1/meta-description language (referencement IA, GEO, ChatGPT, AI Overviews, Hautes-Alpes) without clear intent differentiation, compounding the already-flagged /refonte-ai-friendly vs /refonte-ia-friendly duplicate",
      "recommendation": "Rewrite /referencement-ia titles/meta to commercial framing distinct from the blog pillar's educational framing; ensure /referencement-ia does not target 'guide GEO 2026'; add reciprocal link from service page to blog pillar"
    },
    {
      "title": "Cluster 2 (Creation de Site) and Cluster 5 (Tourisme) pillars/spokes are not internally cross-linked within their own cluster",
      "severity": "medium",
      "description": "guide-creation-site-internet-artisan-hautes-alpes (Cluster 2 pillar) links only to Cluster 3 posts, not to its own siblings prix-site-internet-artisan-pme-hautes-alpes or refonte-site-internet-5-signes (and vice versa, since those predate the pillar); digitaliser-reservations-tourisme-hautes-alpes and reservation-directe-eviter-commissions-booking-hautes-alpes (the only two Cluster 5 posts) do not link to each other",
      "recommendation": "Add mandatory pillar<->spoke links for Cluster 2; add intra-cluster link between the two Cluster 5 posts"
    },
    {
      "title": "Cluster 4 (E-commerce) has zero published posts",
      "severity": "medium",
      "description": "Confirmed empty per strategy; scheduled for Month 3 (August 2026) - not a new defect",
      "recommendation": "No action required before Month 3; ensure future E-commerce pillar cross-links bidirectionally with Cluster 2 pillar per strategy diagram"
    },
    {
      "title": "Blog index (/blog) has no cluster/category taxonomy or navigation",
      "severity": "low-medium",
      "description": "13 posts rendered as a flat list with no topic grouping, tags, or category archive pages reflecting the 5-cluster strategy",
      "recommendation": "Add a category/tag field in Sanity (5 cluster values) and render grouped/filterable sections on /blog before reaching 25-30 posts"
    }
  ],
  "cluster_mapping": {
    "cluster_1_seo_local": {
      "pillar": "seo-local-hautes-alpes-artisans-pme",
      "spokes": [
        "google-business-profile-artisans-hautes-alpes",
        "gerer-avis-google-artisans-pme-hautes-alpes",
        "balises-title-meta-description-pme-hautes-alpes",
        "le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes",
        "seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026"
      ],
      "post_count": 6
    },
    "cluster_2_creation_site": {
      "pillar": "guide-creation-site-internet-artisan-hautes-alpes",
      "spokes": [
        "prix-site-internet-artisan-pme-hautes-alpes",
        "refonte-site-internet-5-signes"
      ],
      "post_count": 3
    },
    "cluster_3_geo_ia": {
      "pillar": "geo-referencement-ia-artisans-pme-hautes-alpes",
      "spokes": [
        "4-signaux-citation-ia-artisans"
      ],
      "post_count": 2
    },
    "cluster_4_ecommerce": {
      "pillar": null,
      "spokes": [],
      "post_count": 0
    },
    "cluster_5_tourisme": {
      "pillar": null,
      "spokes": [
        "reservation-directe-eviter-commissions-booking-hautes-alpes",
        "digitaliser-reservations-tourisme-hautes-alpes"
      ],
      "post_count": 2
    }
  }
}
```
