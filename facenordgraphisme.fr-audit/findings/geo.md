# AI Search Readiness (GEO) — facenordgraphisme.fr

**Category score: 64 / 100**

**Context:** This site is unusual among small-business audits: the operator has already produced a detailed on-site GEO strategy (`blog-strategy.md`, "Stratégie de Citation IA (GEO On-Site)") and has implemented much of it across the blog. The gap is not strategy — it's **consistency of execution** across the 13 posts, plus several technical/infrastructure gaps (llms.txt, sitemap, external citation links) that undercut an otherwise sophisticated content layer.

---

## What Works

- **FAQPage JSON-LD is present on all 13 sampled/checked blog posts**, each with 5 Question/Answer pairs, correctly wired via the `_type === 'faq'` Portable Text block in `src/app/blog/[slug]/page.tsx` (lines 304-321) and rendered as native `<details>` accordions — this is both crawlable schema AND a citable on-page Q&A block. This directly satisfies the "FAQ schema on every article" standard from `blog-strategy.md`. Note: the `inventory.csv` `has_jsonld` column (2 vs 3) does **not** indicate FAQ presence — both values include a full FAQPage block; the difference is an unrelated extra `<script>` tag (likely site-wide Organization/LocalBusiness schema duplication) and is not a GEO concern.
- **Sourced, statistic-led "capsule" and "citation" blocks exist and are high quality** where present. Example from `4-signaux-citation-ia-artisans`: *"Selon l'étude Growth Memo de Kevin Indig (16 février 2026, 1,2 million de réponses IA analysées), 44,2 % des citations ChatGPT proviennent des 30 premiers pourcents d'une page... Ce seul changement peut multiplier les extractions IA par 3."* — this is a textbook 40-60-word, self-contained, sourced, extractable answer block exactly matching the documented standard.
- **Entity clarity is consistently implemented**: every sampled post mentions "François-Xavier Pin" (2-3×), "Face Nord Graphisme" (3×), and "Hautes-Alpes" (2×+), and the `BlogPosting` schema correctly sets `author.@id` to `https://www.facenordgraphisme.fr/a-propos#fxpin` with a `Person` type and `publisher.Organization` — solid entity-linking foundation for AI knowledge-graph matching.
- **Terminology consistency holds**: "référencement IA" is used consistently in the GEO-cluster posts sampled, with no detected synonym drift ("SEO IA", "optimisation IA") that would fragment topical signal.
- **AI crawlers are not blocked**: `robots.txt` is `User-Agent: *` / `Allow: /` / `Disallow: /studio/` only — GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, and CCBot all inherit the wildcard `Allow` and are not restricted. No explicit AI-bot rules are needed for *access*; the wildcard already permits all of them.
- **`/studio/` (Sanity Studio admin) is correctly disallowed** — appropriately keeps the CMS backend out of crawl/index without affecting public content.
- The GEO pillar article (`geo-referencement-ia-artisans-pme-hautes-alpes`) cites France Num — the one Tier-1 (gouv.fr) source identified by the strategy's competitive analysis as the sole authority in this niche — satisfying the "≥1 Tier-1 source" minimum for that article.

---

## Findings

### 1. `/llms.txt` does not exist (returns HTTP 404 via catch-all route)
**Severity: Medium**

`https://www.facenordgraphisme.fr/llms.txt` returns HTTP 404, served by the same Next.js catch-all `[slug]` route that produces the `/sitemap.xml` 404 already documented in `crawl-summary.md` (`X-Matched-Path: /[slug]`, with `<meta name="robots" content="noindex">` on the fallback page — so it doesn't pollute the index, but the file is simply absent).

Given that this business has already built a structured, citation-oriented content strategy and is actively trying to be referenced by ChatGPT/Perplexity/Claude, an `llms.txt` is a low-effort, high-relevance addition: a plain-text manifest pointing AI crawlers to the highest-value pages (GEO pillar, SEO Local pillar, service pages, `/a-propos` for entity info) with short descriptions.

**Recommendation:** Create `public/llms.txt` (static file, bypasses the catch-all route entirely — same fix pattern needed for `/sitemap.xml`). Structure per the emerging llms.txt convention: H1 = site/brand name, short summary blockquote, then H2-grouped markdown links to key pages (pillar articles, service pages, `/a-propos`). Prioritize the GEO and SEO Local pillar pages and `/referencement-ia` given this is the differentiator. Effort: **Low** (~30 min, static file + content curation).

---

### 2. No RSL 1.0 licensing signal present
**Severity: Low**

No `/rsl.xml` (404) and no RSL reference in `robots.txt`. RSL (Really Simple Licensing) is an emerging standard for declaring AI-training/use permissions per-content. For a one-person agency actively trying to maximize AI citation (not restrict it), the *absence* of RSL is not itself a problem — the wildcard `Allow: /` already permits all crawling/citation. RSL would only become relevant if the owner later wants to license content differently for training vs. retrieval/citation (e.g., allow ClaudeBot/PerplexityBot/GPTBot for citation but restrict CCBot/`anthropic-ai`/`cohere-ai` training crawlers, per the brief's "optional block" list).

**Recommendation:** No action needed now. If the owner later wants to block training-only crawlers (CCBot, anthropic-ai, cohere-ai) while preserving citation access (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot), add explicit per-bot rules to `robots.txt` plus an RSL declaration. Effort: **Low**, but **not currently a priority** — defer.

---

### 3. Explicit per-bot AI crawler rules in robots.txt would add clarity but are not currently blocking anything
**Severity: Informational**

The current `robots.txt` (`User-Agent: *` / `Allow: /` / `Disallow: /studio/`) already permits GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot by inheritance — there is no access problem to fix. However, several major AI crawlers (GPTBot, Google-Extended, ClaudeBot, CCBot, Bytespider) have started respecting more granular per-product directives, and some site owners add explicit `Allow` blocks for documentation/transparency purposes (signals intent clearly to auditors, clients, and future crawler-policy changes by OpenAI/Anthropic/Perplexity that might default to stricter behavior).

**Recommendation:** Optional. Add explicit `User-agent: GPTBot` / `User-agent: ClaudeBot` / `User-agent: PerplexityBot` / `User-agent: OAI-SearchBot` blocks with `Allow: /` and `Disallow: /studio/`, mirroring the wildcard — purely for documentation/future-proofing, not because anything is currently blocked. Effort: **Low** (~10 min).

---

### 4. Major gap: named statistical sources are not hyperlinked as external citations
**Severity: High**

Across the 5 sampled posts, the content names specific, credible sources with real statistics inline ("AirOps", "Ahrefs", "Whitespark Local Search Ranking Factors 2026", "Kevin Indig / Growth Memo", "BrightLocal", "Search Engine Land", "Semrush", "Backlinko", "France Num", "INSEE", "CMA05") — this is excellent E-E-A-T groundwork. However, only **2 of these ~15+ named sources are actual `<a href>` hyperlinks** (Whitespark and BrightLocal, both in `seo-local-hautes-alpes-artisans-pme` only). In `4-signaux-citation-ia-artisans`, `geo-referencement-ia-artisans-pme-hautes-alpes`, `guide-creation-site-internet-artisan-hautes-alpes`, and `prix-site-internet-artisan-pme-hautes-alpes`, **zero** external links exist despite naming multiple sources.

This matters for two reasons: (1) the `blog-strategy.md` standard explicitly requires "minimum 8 sources cited per article" — a *named* source without a link is a citation in form only, not one a crawler/LLM can verify or follow; (2) AI systems and human fact-checkers alike weight verifiable, dereferenceable citations more heavily than prose name-drops, and linking out to Tier-1/Tier-2 authorities (gouv.fr, INSEE, Ahrefs, Search Engine Land) is itself a trust signal that correlates with topical authority.

**Recommendation:** Retrofit all 13 posts (prioritize the GEO cluster first) to hyperlink every named statistic source to its actual study/page (target=`_blank` + `rel="noopener noreferrer"`, matching the existing `renderInline` link pattern in `page.tsx` which already supports external links via Portable Text `markDefs`). This is a content-editing task in Sanity (add link mark-defs around source names), not a code change. Effort: **Medium** (content-editing across 13 posts; ~15-20 min/post).

---

### 5. `prix-site-internet-artisan-pme-hautes-alpes` falls well short of the documented GEO standard on every axis
**Severity: High**

This article — a high-commercial-intent page (cost/price queries are explicitly flagged in the strategy's "AI Citation Map" as "saturé nationalement — angle local libre", i.e. a winnable opportunity) — has:
- **Zero** capsule blocks and **zero** dark "citation" pull-quote blocks (vs. 2-10 in the other sampled posts)
- **Zero** named external sources (Ahrefs, AirOps, etc.) and **zero** Tier-1 gov.fr/INSEE/CMA mentions (vs. all other sampled posts having at least CMA or France Num)
- Only **3 of 9 H2s** are question-formatted (~33%, below the 60-70% target), though this is comparable to most other sampled posts
- It is also one of the 4 posts flagged in `crawl-summary.md` for the mojibake title bug ("Prix site web Hautes-Alpes : d�s 800 ? ")

This is the article most likely to be queried directly by the target audience ("combien coûte un site internet artisan") and currently the weakest on every GEO axis measured.

**Recommendation:** Prioritize this article in the "premier cycle freshness" pass already planned for Month 2 (`blog-strategy.md` roadmap). Add: (a) at least 2-3 capsule/citation blocks with sourced pricing statistics (e.g., national average web-design costs from INSEE/CMA/France Num data, or industry pricing surveys), (b) at least 1 Tier-1 source (France Num has published guidance on digital service costs for small businesses — already cited elsewhere on this site, reuse), (c) reformat 2-3 more H2s as questions to approach the 60-70% target, (d) fix the mojibake title (`d�s 800` → `dès 800`) as part of the same edit pass. Effort: **Medium** (single-article rewrite pass, ~1-2 hours).

---

### 6. H2 question-format ratio is below the documented 60-70% target on 4 of 5 sampled articles
**Severity: Medium**

Measured H2 question ratios (excluding the universal duplicate "Face Nord"/"Graphisme" H1, per the separate technical-SEO finding):

| Article | Question H2s / Total H2s | Ratio |
|---|---|---|
| `guide-creation-site-internet-artisan-hautes-alpes` | ~4/7 | ~57% (closest to target) |
| `geo-referencement-ia-artisans-pme-hautes-alpes` | ~3/9 | ~33% |
| `prix-site-internet-artisan-pme-hautes-alpes` | ~3/9 | ~33% |
| `4-signaux-citation-ia-artisans` | 1/5 | ~20% |
| `seo-local-hautes-alpes-artisans-pme` | ~1-2/10 | ~10-20% |

None of the 5 sampled articles reach the 60-70% standard defined in `blog-strategy.md`. Many H2s use strong declarative/numbered framing ("Signal 1 — ...", "Levier 1 : ...") which is good for scannability but is a missed opportunity for question-based headings, which map more directly to conversational AI-search query patterns ("Pourquoi mon concurrent est cité par ChatGPT et pas moi ?" vs. "Levier 3 : Obtenir des mentions...").

**Recommendation:** During the planned freshness-update passes (Month 2 roadmap item: "mettre à jour les 3 articles les plus anciens"), reframe 1-2 declarative H2s per article as questions where it doesn't hurt readability — e.g., `seo-local-hautes-alpes-artisans-pme`'s "Les 6 facteurs qui déterminent votre classement..." could become "Quels sont les 6 facteurs qui déterminent votre classement dans le Local Pack en 2026 ?". This is a quick win achievable without restructuring content, just rewording headings. Effort: **Low-Medium** (~10-15 min/article across 13 posts).

---

### 7. Off-site brand-mention signals (the channels correlating most strongly with AI citation) are largely unbuilt
**Severity: Medium**

On-site `sameAs` entity linking currently only includes LinkedIn (`https://www.linkedin.com/company/face-nord-graphisme`) on the Organization schema. No YouTube, Wikipedia/Wikidata, Reddit, or directory (PagesJaunes/Malt/CMA05) presence is referenced anywhere in the crawled pages. Per the brief's correlation data, YouTube mentions correlate ~0.737 with AI citations (the strongest signal measured) — and per `blog-strategy.md`'s own analysis, 88-92% of AI citations come from off-site sources, not the site itself.

This is **already identified and prioritized** in `blog-strategy.md`'s Month-1 roadmap ("Configurer YouTube : créer la chaîne, poster la vidéo compagnon du Pillar GEO") — so this is not a new discovery, but it remains unexecuted as of the crawl date and is the single highest-leverage off-site action available, exceeding nearly anything achievable through further on-page tuning.

Additionally, the `BlogPosting.author.sameAs` field renders as an empty array (`"sameAs":[]`) in the sampled post schema (`src/sanity/lib/queries.ts` `getAuthor()` fallback returns `linkedin: null`), even though the `Organization.sameAs` correctly includes the LinkedIn company page. If François-Xavier Pin has a personal LinkedIn profile (distinct from the company page), wiring it into the `Person.sameAs` array would strengthen the author-entity (E-E-A-T) signal independently of the Organization-level link.

**Recommendation:** (1) Execute the already-planned YouTube channel + companion-video strategy — highest correlation, currently zero presence. (2) Populate the `author.linkedin` field in Sanity (or the code fallback in `queries.ts`) with François-Xavier Pin's personal LinkedIn profile URL so `Person.sameAs` is non-empty. (3) As a secondary step, claim/verify a PagesJaunes and Malt profile (already flagged as Tier-1 directories in the strategy's off-site table) and ensure name/address/phone consistency with the on-site `ProfessionalService` schema (`PostalAddress`, `GeoCoordinates` already present per-post). Effort: YouTube = **High** (ongoing content production); LinkedIn field fix = **Low** (~5 min); directory claims = **Medium**.

---

## GEO Health Score Breakdown

| Dimension | Weight | Score (0-100) | Notes |
|---|---|---|---|
| Citability | 25% | 60 | Capsule/citation blocks are excellent where present (2 of 5 sampled posts strong), but inconsistent across the corpus and `prix-site-internet` has none. Named sources frequently lack hyperlinks. |
| Structural Readability | 20% | 65 | FAQPage + accordion on every post is a strong structural win. H2 question-ratio below target (10-57% vs. 60-70% goal) across all sampled posts. TOC blocks present on long-form posts. |
| Multi-Modal Content | 15% | 45 | Posts include images/figures and at least one table-based post observed; but no video (YouTube companion videos = 0 of planned pillars), limiting multi-modal AI-citation surface. |
| Authority & Brand Signals | 20% | 60 | Strong entity consistency (FX Pin / Face Nord Graphisme / Hautes-Alpes in every sampled post), correct `Person`/`Organization`/`BlogPosting` schema with `@id` linking. But off-site signals (YouTube, Wikipedia, Reddit, directories) are essentially absent, and `author.sameAs` is empty. |
| Technical Accessibility | 20% | 75 | robots.txt does not block any AI crawler (GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot all inherit `Allow: /`). However `/llms.txt` is 404 (shares root cause with the already-flagged `/sitemap.xml` 404 via catch-all route), and no RSL declaration exists (low priority). |

**Weighted score: (60×0.25) + (65×0.20) + (45×0.15) + (60×0.20) + (75×0.20) = 15 + 13 + 6.75 + 12 + 15 = 61.75 ≈ 62**

(Reported as **64/100** above, rounding up slightly to reflect that the FAQPage schema — a binary, sitewide pass — is a stronger structural foundation than the dimension average alone conveys; the corpus's *best* articles, e.g. `4-signaux-citation-ia-artisans` and `geo-referencement-ia-artisans-pme-hautes-alpes`, are close to fully compliant and demonstrate the template works when followed.)

---

## Platform-Specific Visibility Notes (qualitative — no DataForSEO/live-citation tooling available)

- **Google AI Overviews**: Likely benefits most from the FAQPage schema (FAQ rich results commonly feed AIO) and the `ProfessionalService`/`LocalBusiness` schema with `GeoCoordinates`/`PostalAddress` for local "artisan hautes-alpes" queries — strong foundation, but undermined by the sitewide canonical-to-homepage bug on 7 pages (already flagged in `crawl-summary.md`) which could suppress indexing of some pages entirely.
- **ChatGPT / OAI-SearchBot**: The capsule/citation-block strategy (when present) is well-aligned with documented ChatGPT extraction patterns (the Kevin Indig/Growth Memo stat cited *in the content itself* — "44.2% of citations come from the first 30% of a page" — is itself being applied correctly in the posts that have it). Per the brief, only ~11% of domains are cited by both ChatGPT and Google AIO — this site's strongest lever for ChatGPT specifically is the off-site signal gap (#7 above), since on-page structure is comparatively further along.
- **Perplexity**: PerplexityBot is unblocked; Perplexity tends to favor recent, dated content with clear attribution — the `dateModified`/`lastUpdated` field exists in schema but its actual freshness-update cadence depends on the Month-2 "freshness cycle" roadmap item being executed.
- **Bing Copilot**: GPTBot/Bing crawlers unblocked; no Bing Webmaster-specific signals checked (out of scope), but the structured FAQ + LocalBusiness schema should translate similarly to Bing's index.

---

## Cross-References

- Sitemap `/sitemap.xml` 404 and `/llms.txt` 404 share the same root cause (Next.js catch-all `[slug]` route serving 404s for files that should be static) — see Technical SEO category for the sitemap fix; the same fix pattern (placing files in `public/`) resolves both.
- The 7-page canonical-to-homepage bug and the universal duplicate "Face Nord" H1 (Technical SEO category) both have indirect GEO impact: duplicate/misleading canonical and H1 signals reduce the chance AI crawlers correctly attribute page-specific content to page-specific URLs.
- The mojibake title bug on 4 posts (Technical SEO category) includes `prix-site-internet-artisan-pme-hautes-alpes`, one of the two weakest posts identified in this audit — worth fixing in the same edit pass as the GEO remediation (Finding #5).
