# Search Experience (SXO) — facenordgraphisme.fr

**SXO Gap Score: 58 / 100** (separate from the SEO Health Score)

This category answers: when someone searches the queries this site targets, does what they
land on match what they expect — in structure, intent, and persona fit? The underlying
content quality is generally good (the site already mirrors the page types competitors use
for "création site internet [ville]" / "refonte site internet" / "référencement SEO" —
landing-page format with "Ce qui est inclus / Comment ça se passe / FAQ / Tarifs" sections,
which is exactly what local agency SERPs reward). The score is held down by (1) a
self-inflicted duplicate-intent page pair competing with itself, (2) a service page that is
now out-competed on depth by the site's own blog pillar for the same query, and (3) several
persona-critical pages that under-deliver on trust/CTA clarity for the exact searcher who is
most likely to convert.

---

## What Works

- **Service-page format matches SERP expectations.** For "création site internet hautes-alpes",
  "référencement SEO hautes-alpes", etc., the top organic results (NetMédia, Prizzlys, Les
  Créavores, AlpCréaWeb, DevelopCom) are all local-agency commercial landing pages with
  pricing, process steps, and FAQ — not blog guides. `/creation-site-internet-hautes-alpes`,
  `/referencement-seo-hautes-alpes`, and `/refonte-ai-friendly` follow this exact template
  ("Ce qui est inclus" → "Comment ça se passe ?" → differentiator section → "Pour aller plus
  loin" → FAQ → CTA). Page-type alignment here is ALIGNED, not a mismatch.
- **`/refonte-ai-friendly` is a genuinely strong page** for its query: it has FAQPage-ready
  content (4 real Q&As covering price, SEO continuity, timeline, downtime), a `Service` schema
  with an `Offer` (800 € HT), a "5 signes que votre site a besoin d'une refonte" diagnostic
  section that pre-qualifies the visitor, and "Pour aller plus loin" links into 3 blog posts —
  this is close to a model SXO page for the Segment B persona.
- **City pages (`/villes/gap-hautes-alpes`, etc.) serve a genuinely distinct, defensible local
  intent.** They answer "agence web à Gap" / "création site internet Gap" with city-specific
  trust signals (named industries served in Gap, Gap-specific SEO query examples, a dedicated
  FAQ "FAQ — Agence web à Gap"). This is the correct page type for hyperlocal "near me"-style
  intent and does not need to exist on the generic service pages.
- **`/blog/geo-referencement-ia-artisans-pme-hautes-alpes` is an excellent match for
  educational/awareness-stage GEO queries** ("c'est quoi le GEO", "comment être cité par
  ChatGPT artisan") — 3000+ word pillar, FAQ schema, named author (FX Pin), step-by-step plan.
  No local competitor has anything comparable (confirmed in `blog-strategy.md`).

---

## Findings

### 1. `/refonte-ai-friendly` vs `/refonte-ia-friendly` — duplicate-intent pages competing with each other (CRITICAL)

**Severity:** CRITICAL

**Description:** Both pages target the same searcher — someone looking for a website redesign
that is also optimized for AI/LLM visibility ("refonte site internet IA/AI-friendly Hautes-Alpes").
They are NOT equivalent in quality:

| Signal | `/refonte-ai-friendly` | `/refonte-ia-friendly` |
|---|---|---|
| In `sitemap.ts` | Yes | No (orphan) |
| H1 | "Refonte de site internet AI-Friendly dans les Hautes-Alpes" (keyword-rich, localized) | "Refonte IA Friendly" (generic, no location) |
| Sections | Hero w/ price anchor (800 € HT) → "Ce qui est inclus" (6 cards) → "Comment ça se passe ?" (4-step process) → "Pourquoi une refonte AI-Friendly est différente" → "Les 5 signes que votre site a besoin d'une refonte" (diagnostic/self-qualification) → "Pour aller plus loin" (3 blog links) → FAQ (4 Q&As) → CTA | Hero → "Un site adapté aux usages d'aujourd'hui... et de demain" → "Refonte technique & éditoriale" → "Responsive, rapide, sécurisé" → "Pourquoi rendre votre site AI-friendly ?" → CTA — generic marketing prose, no process steps, no FAQ, no diagnostic |
| Schema | `Service` + `Offer` (price=800 EUR, priceCurrency) | `Service` only, no `Offer`/pricing |
| Internal links out | 3 blog posts (builds topical cluster) | None |
| Title tag | "Refonte Site Internet AI-Friendly — Hautes-Alpes \| Face Nord Graphisme \| Face Nord Graphisme" (94 chars, double-suffix bug) | "Refonte IA Friendly \| Hautes-Alpes (Embrun, Gap) \| Face Nord Graphisme" (70 chars, clean) |
| Meta description | 185 chars, includes price anchor "À partir de 800 € HT" | 278 chars (too long), no price, vague "votre site internet commence à dater" |
| Nav linking | Linked from `/prestations` grid as "Refonte AI-Friendly" → but the homepage sidebar submenu link labeled "Refonte AI-Friendly" actually points to `href="/refonte-ia-friendly"` — **the anchor text and the href target are mismatched across the two pages**, meaning internal link equity is currently split and confusingly wired between the two URLs |

From a search-experience standpoint, **`/refonte-ai-friendly` is the page a searcher for
"refonte site internet IA Hautes-Alpes" actually wants**: it answers "what's included",
"how much", "how does the process work", "is it risky for my current SEO", and "how do I know
I need this" — i.e., it satisfies consideration-stage intent (price comparison, risk
de-risking, process transparency) far better than `/refonte-ia-friendly`'s awareness-stage
"here's why AI matters" prose, which reads more like a blog intro than a service page.

**Recommendation:**
1. **Canonical survivor: `/refonte-ai-friendly`** (better structure, schema/Offer, FAQ, price
   anchor, internal links, already in `sitemap.ts`).
2. **301-redirect `/refonte-ia-friendly` → `/refonte-ai-friendly`** to consolidate the split
   link equity and remove the duplicate-intent competition. Do not "merge content" instead —
   the surviving page is already more complete; absorbing the weaker page's prose would dilute
   it.
3. Fix the homepage sidebar submenu link so the anchor text "Refonte AI-Friendly" points to
   `/refonte-ai-friendly` (currently points to `/refonte-ia-friendly` per `home.html` — this is
   the root cause of the confused internal linking and is independent of, but related to, the
   redirect).
4. After the redirect, fix the double-suffix title bug on the surviving
   `/refonte-ai-friendly` (already flagged in crawl-summary finding #4) so the consolidated
   page has a clean, full-length title in the SERP.
5. Cross-reference: this is also a content/IA duplication issue — `/seo content` can confirm
   no further textual overlap remains after the redirect.

---

### 2. `/referencement-ia` (service page) is now out-ranked in depth by the site's own blog pillar for the same query cluster (HIGH)

**Severity:** HIGH

**Description:** `/referencement-ia` (H1: "Référencement IA & GEO pour les Hautes-Alpes") is a
short commercial landing page: "Ce qui est inclus" → "Comment ça se passe ?" → "SEO classique
vs référencement IA : deux logiques, un seul objectif" → "Les 4 signaux que les IA utilisent
pour vous citer" → "Pour aller plus loin" (links to 3 blog posts, including the GEO pillar) →
FAQ → CTA.

`/blog/geo-referencement-ia-artisans-pme-hautes-alpes` (H1: "Référencement IA pour artisans et
PME : le guide GEO 2026 pour être cité par ChatGPT") is a 3000+ word pillar with 9 H2 sections
(What is GEO, why it matters for local artisans, 4 concrete "leviers" each with sub-steps, a
30-day action plan, tools, FAQ) and a named author.

For a query like **"référencement IA hautes-alpes"** or **"GEO artisan référencement IA"**,
Google's intent signal is ambiguous between commercial ("hire someone to do this") and
informational ("explain what this is and how to do it myself"). Currently:
- The service page's two explainer H2s ("SEO classique vs référencement IA", "Les 4 signaux
  que les IA utilisent pour vous citer") **substantially overlap** with H2s/content already
  covered — more thoroughly — in the blog pillar and in
  `/blog/4-signaux-citation-ia-artisans` and
  `/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` (both of which are
  also linked from `/referencement-ia`'s "Pour aller plus loin").
- This creates **on-site topical overlap on near-identical H2 phrasing** ("SEO vs
  référencement IA" appears as both a service-page H2 and a dedicated blog post title), which
  risks Google picking the blog post as the canonical answer for informational variants of the
  query, leaving `/referencement-ia` to compete only for the narrowly commercial variant.

**Recommendation:**
- Keep `/referencement-ia` as the commercial/service page (it should — "référencement IA
  hautes-alpes" + transactional modifiers like "tarif", "prix", "devis", "agence" should map
  here), but **strip the explainer H2s down to 1-2 sentence summaries with a clear "lire le
  guide complet →" link to the blog pillar**, rather than re-explaining the same concepts.
  This sharpens the service page's intent (sales) vs. the blog's intent (education) instead of
  letting both pages answer "what is GEO / SEO vs référencement IA".
  - the service page's job becomes: what do you do for me, how much, how long, what's
    different about my Hautes-Alpes business — i.e. answer the *Considération → Décision*
    questions only.
  - the blog pillar's job stays: explain the concept, build authority, capture
    *Awareness*-stage queries and AI-citation traffic.
- Add a reciprocal CTA block at the end of the blog pillar driving to `/referencement-ia`
  ("Vous voulez qu'on s'en occupe pour vous ? Voir la prestation Référencement IA →") — currently
  the blog → service linkage exists one-way (service → blog) but should be bidirectional for
  the conversion funnel to close.
- This is a borderline cannibalization case, not a critical mismatch — both pages can coexist
  and rank for different SERP intents, but only if their H2 structures stop mirroring each
  other. Recommend `/seo content` for a full H2-overlap audit across all 8 service pages × 13
  blog posts (this was only spot-checked for the GEO cluster here).

---

### 3. City pages duplicate service-page sections rather than purely localizing intent (MEDIUM)

**Severity:** MEDIUM

**Description:** `/villes/gap-hautes-alpes` (H1: "Agence web à Gap — Création de site internet
dans les Hautes-Alpes") includes H2 sections "Création de site internet à Gap : ce qui est
inclus" and "Tarifs pour les entreprises de Gap" — these are near-duplicates of
`/creation-site-internet-hautes-alpes`'s "Ce qui est inclus" section and pricing content, just
with "à Gap" appended. The city page also has its own H3 "Combien coûte un site internet dans
les Hautes-Alpes ?" which duplicates a likely FAQ entry on the service page and on
`/blog/prix-site-internet-artisan-pme-hautes-alpes`.

**Why this is only MEDIUM, not CRITICAL:** the SERP-intent justification for city pages is
real and confirmed — "agence web Gap" / "création site internet Gap artisan" pulls a SERP
dominated by other agencies' *city-specific* landing pages (NovaTech Web "Création Site
Internet à Gap", Prizzlys "Création Site Internet Gap", Les Créavores "Création Site Internet
Gap"), so a Gap-specific page is the correct page type and should exist. The risk is narrower:
the **"ce qui est inclus" and pricing sections are copy-pasted-with-find-replace** rather than
genuinely localized (e.g., Gap-specific project examples, Gap business density stats, a
Gap-specific case study link to `/portfolio/...`), which both (a) creates near-duplicate
content Google may suppress in favor of the higher-authority `/creation-site-internet-hautes-alpes`,
and (b) wastes the city page's unique-content opportunity (it does have some good unique
sections: "Les types d'entreprises que nous accompagnons à Gap", "Gap et le SEO local : les
requêtes à ne pas manquer", "Optimiser sa fiche GBP à Gap" — these are the parts worth keeping
and expanding).

**Recommendation:**
- Trim the duplicated "ce qui est inclus" / generic pricing blocks on city pages down to a
  1-2 sentence summary + link to the relevant service page ("Voir le détail de nos
  prestations de création de site →").
- Double down on the genuinely unique sections: "types d'entreprises que nous accompagnons à
  [ville]" should reference real local sectors (Gap = administration/santé/commerce de centre-
  ville vs. Embrun = tourisme/Serre-Ponçon vs. Briançon = ski/outdoor — these already differ
  per the existing portfolio clients), and link each to a relevant `/portfolio/*` case study
  from that area if one exists (e.g., Embrun page → Verdon E-Bike / Rêves d'Aventures if
  geographically relevant).
- Net effect: city pages become "local proof + local SEO landscape" pages that funnel to the
  service pages for "what's included / pricing", rather than parallel mini service pages.
  This is a lighter-touch fix than #1/#2 — flag for `/seo page` if a full city-page rewrite is
  scoped.

---

### 4. Persona-page fit scoring (4 personas × top landing page)

For each persona, the single most relevant landing page for their likely first search query
was identified and scored 1-10 on Clarity, Trust, CTA, Relevance (10 = perfect fit).

| Persona | Likely first query | Landing page | Clarity | Trust | CTA | Relevance | Total /40 |
|---|---|---|---|---|---|---|---|
| **A — Artisan Local** (plombier/électricien, no/old site, wants Google Maps visibility) | "créer site internet plombier gap" / "comment apparaître sur google hautes-alpes" | `/creation-site-internet-hautes-alpes` | 7 | 6 | 7 | 7 | **27** |
| **B — Commerçant/PME** (restaurant/hôtel, existing-but-dated site, budget allocated) | "refonte site internet hautes-alpes" | `/refonte-ai-friendly` | 8 | 7 | 8 | 9 | **32** |
| **C — Prestataire Touristique** (gîte/moniteur, wants to escape Booking.com) | "site internet moniteur ski hautes-alpes" / "éviter commissions booking.com gîte" | `/blog/reservation-directe-eviter-commissions-booking-hautes-alpes` | 8 | 6 | 4 | 9 | **27** |
| **B (alt) — Commerçant** (local SEO query) | "référencement local gap briançon" | `/referencement-seo-hautes-alpes` | 7 | 6 | 7 | 8 | **28** |

**Weakest persona-page fit: Segment C (Prestataire Touristique), 27/40 — driven by the lowest
CTA score (4/10) of all four.**

- **Why it scores low on CTA (4/10):** the blog post
  `/blog/reservation-directe-eviter-commissions-booking-hautes-alpes` is exactly the right
  *content* for this persona's awareness-stage query ("éviter commissions booking.com gîte" —
  confirmed as a "Critique" gap with zero professional how-to content in the AI Citation Map
  in `blog-strategy.md`), but the conversion path from "I just learned I can escape Booking.com
  fees" to "let me hire Face Nord Graphisme to build my direct-booking site" is weak: there is
  no service page on the site framed around *booking/réservation* (the closest is
  `/boutique-e-commerce-hautes-alpes`, a generic e-commerce page, or `/creation-site-internet-
  hautes-alpes`, which doesn't mention booking/réservation in its H1/H2s at all). The blog
  post's natural next step — "here's the service that builds you that direct-booking site" —
  doesn't exist as a clearly-named landing page, so the CTA at the end of the article likely
  points to a generic `/contact` or `/creation-site-internet-hautes-alpes`, neither of which
  re-affirms "yes, this solves your Booking.com problem."
- **Trust (6/10):** the article cites the persona's pain point correctly (seasonal tourism,
  15-30% OTA commission) but the site has only 5 portfolio projects, and the most
  tourism-relevant ones (`Rêves d'Aventures`, `Verdon E-Bike`) are **outdoor/activity**
  businesses, not **accommodation/booking** businesses (gîtes) — so a gîte owner reading this
  article doesn't see a portfolio proof-point that matches "a gîte like mine got a
  direct-booking site from this person."

**Recommendation (sorted by weakest persona first):**
1. **Segment C fix (highest priority given 27/40 + CTA=4):** Add or designate a service-page
   section/landing page specifically for "site avec réservation en ligne pour gîtes et
   activités outdoor" — even as a sub-section of `/boutique-e-commerce-hautes-alpes` or
   `/creation-site-internet-hautes-alpes` with its own H2 and anchor link, so the booking-
   commission blog cluster (Cluster 5 in `blog-strategy.md`, currently only S1 published) has
   a concrete commercial landing target. Then update the CTA block at the end of
   `/blog/reservation-directe-eviter-commissions-booking-hautes-alpes` to link there by name
   ("Découvrez notre offre site + réservation en ligne →") instead of a generic contact CTA.
2. **Segment A fix (27/40, tied-lowest):** `/creation-site-internet-hautes-alpes` is solid on
   relevance/clarity but Trust=6 — for an artisan whose core pain is "invisible sur Google
   Maps", the page does not surface a GBP/Google Maps proof point or testimonial in its hero
   or "Ce qui est inclus" cards (these are more generic web-design inclusions). Add a
   GBP/Google-Maps-specific bullet ("Optimisation de votre fiche Google Business Profile
   incluse") to the "Ce qui est inclus" grid, and link to
   `/blog/google-business-profile-artisans-hautes-alpes` from "Pour aller plus loin" if not
   already present — this directly answers the Segment A pain point named in
   `blog-strategy.md`.
3. **Segment B (32/40) and B-alt (28/40)** are the strongest fits — `/refonte-ai-friendly`'s
   price anchor, FAQ, and 5-signs diagnostic map well to a "budget already allocated, comparing
   prestataires" mindset. Minor improvement: add a third-party trust signal (Google review
   count/rating, or a named client testimonial) to push Trust from 7 to 9 on both.

---

## Limitations

- This analysis is based on cached raw HTML (`facenordgraphisme.fr-audit/raw/*.html`), not a
  live re-render via `render_page.py` — the pages were not re-fetched for this pass since the
  crawl-summary confirms they are static/SSR'd Next.js output with no client-side content
  injection affecting the sections analyzed (H1/H2/schema/FAQ all present in raw HTML).
- Live Google SERP screenshots/rankings for the exact target queries were not pulled (no
  Google API/GSC configured per crawl-summary); SERP-type conclusions are based on WebSearch
  result titles/snippets for 3 representative queries, which is directional but not a full
  10-result SERP feature audit (no AI Overview / PAA / featured snippet presence could be
  confirmed for "référencement IA hautes-alpes" specifically — likely too low-volume/local for
  rich SERP features).
- Persona scores (1-10 scales) are qualitative judgments based on page structure and copy, not
  user testing, click-through data, or heatmaps — no GA4/Search Console access available.
- The H2-overlap claim in Finding #2 was spot-checked for the GEO cluster only
  (`/referencement-ia` vs. 2 blog posts); a full cross-page H2/topic overlap matrix across all
  8 service pages × 13 blog posts was not performed — flagged for `/seo content`.
- Did not assess actual rendered visual hierarchy/above-the-fold experience (no
  Playwright screenshots reviewed in this pass) — the duplicate `<h1>Face Nord</h1>` branding
  element (crawl-summary finding #3) affects every page's true "first H1 seen by a crawler",
  but its visual/UX impact on human users was not separately re-verified here.

---

*Cross-skill recommendations:*
- `/seo content` — full H2/topic overlap audit across service pages and blog posts (Finding #2
  and #3 follow-ups), plus confirm no residual content overlap after the `/refonte-ia-friendly`
  redirect (Finding #1).
- `/seo schema` — `/refonte-ia-friendly` lacks the `Offer`/pricing schema present on
  `/refonte-ai-friendly`; moot if redirected per Finding #1's recommendation, but relevant if
  any other service pages are missing `Offer` schema.
- `/seo page` — full city-page rewrite scoping (Finding #3) and a dedicated
  booking/réservation landing section (Finding #4, Segment C).
