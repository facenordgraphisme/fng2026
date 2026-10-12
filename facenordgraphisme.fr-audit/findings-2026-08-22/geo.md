# AI Search Readiness (GEO) — facenordgraphisme.fr — DRIFT RE-AUDIT

**Baseline:** 2026-06-15, Category score 64/100 (`facenordgraphisme.fr-audit/findings/geo.md`)
**Re-audit date:** 2026-08-22
**New category score: 65 / 100** (net flat — one genuine technical win offset by zero progress on content-layer issues and a slight regression in H2 question-format ratio)

**Method:** Live fetch of `robots.txt`, `/llms.txt`, `/sitemap.xml`, and the 5 previously-sampled blog posts (`prix-site-internet-artisan-pme-hautes-alpes`, `4-signaux-citation-ia-artisans`, `geo-referencement-ia-artisans-pme-hautes-alpes`, `guide-creation-site-internet-artisan-hautes-alpes`, `seo-local-hautes-alpes-artisans-pme`), plus a repo check of `next.config.ts`, `public/llms.txt`, and the Portable Text renderer in `src/app/blog/[slug]/page.tsx` (capsule/citation block class signatures) to distinguish real on-page capsule/citation blocks from sitewide footer markup that superficially matches the same Tailwind color classes.

---

## Summary vs. the 6 flagged issues

| # | Baseline issue | Status | Evidence |
|---|---|---|---|
| 1 | `/llms.txt` 404s | **FIXED** | `https://www.facenordgraphisme.fr/llms.txt` now returns `HTTP 200`, `X-Matched-Path: /llms.txt`, served from `public/llms.txt` (added in git repo). Well-formed per the llms.txt convention: H1 brand name, blockquote summary, H2-grouped links (Prestations, Zones d'intervention, Pages, Optional) with short descriptions. |
| 2 | Named statistics not hyperlinked to sources | **STILL PRESENT** | Re-checked all 5 sampled posts for `<a href="http...">` to non-Sanity domains: `4-signaux-citation-ia-artisans` (0), `geo-referencement-ia-artisans-pme-hautes-alpes` (0), `guide-creation-site-internet-artisan-hautes-alpes` (0), `prix-site-internet-artisan-pme-hautes-alpes` (0), `seo-local-hautes-alpes-artisans-pme` (2 — Whitespark, BrightLocal, unchanged from baseline). Named sources (Ahrefs, AirOps, Kevin Indig/Growth Memo, CMA05) still appear as unlinked prose in `4-signaux-citation-ia-artisans` despite being the site's flagship "template-compliant" article. |
| 3 | `prix-site-internet-artisan-pme-hautes-alpes` weak on every GEO axis + mojibake | **PARTIALLY FIXED** (mojibake still present; content-layer gap unchanged) | `<title>` still reads `"Prix site web Hautes-Alpes : d�s 800 ? \| Face Nord Graphisme"` (confirmed live, U+FFFD in both title and JSON-LD description) — the mojibake fix that resolved body-text corruption sitewide (only 2 stray U+FFFD chars per post now, down from up to 324, confirmed across all 5 posts + other 8 previously-corrupted posts) did **not** reach this post's `<title>`/meta-description generation path. Content-layer: still 0 capsule blocks, 0 citation blocks, 0 named external sources, 0 Tier-1 mentions (verified via the actual component class signatures `bg-[#f9fafb] border` (capsule) and `rounded-[32px] my-12` (citation) from `src/app/blog/[slug]/page.tsx`, not just visual color matching — both counts are exactly 0). FAQ schema did grow from 5 to 7 Q&A pairs, and one new H2 was added ("L'IA fait-elle baisser les prix des sites web en 2026 ?", a question format) — a small positive, but the article remains the weakest in the corpus on every other axis. |
| 4 | H2 question-format ratio below 60-70% target on 4/5 sampled articles | **STILL PRESENT** (marginally worse) | Recounted with strict "ends in `?`" test: `geo-referencement-ia-artisans-pme-hautes-alpes` 2/9 (22%), `guide-creation-site-internet-artisan-hautes-alpes` 3/8 (37.5%, down from ~57% at baseline — a new H2 was added without a question format, pulling the previously-closest article further from target), `prix-site-internet-artisan-pme-hautes-alpes` 3/10 (30%), `4-signaux-citation-ia-artisans` 0/5 (0%), `seo-local-hautes-alpes-artisans-pme` 1/11 (9%). **None** of the 5 sampled articles meet the 60-70% target — arguably now 5/5 below target rather than 4/5, since the one article that was closest (guide-creation) regressed due to unrelated content additions. |
| 5 | Off-site brand-mention signals largely unbuilt | **STILL PRESENT** | `Organization.sameAs` unchanged: `["https://www.linkedin.com/company/face-nord-graphisme"]` only. `BlogPosting.author.sameAs` still renders as an empty array (`"sameAs":[]`) on sampled posts — the Sanity/`queries.ts` LinkedIn-personal-profile fix flagged as a 5-minute task at baseline has not been applied. No YouTube channel, Wikipedia/Wikidata entry, or Reddit presence detected — the "YouTube" and "PagesJaunes" mentions found on-page are prose advice telling *readers* to build these channels (e.g., "Semaine 2 — YouTube (la vidéo la plus simple de votre vie)"), not evidence of Face Nord Graphisme's own off-site presence. A DuckDuckGo site-mention check for the brand name against youtube.com/reddit.com/wikipedia.org returned no results (search was CAPTCHA-gated, so treat as directional, not conclusive, but consistent with the on-site `sameAs` evidence). |
| 6 | `PerplexityBot`/`GPTBot` unblocked in `robots.txt` | **CONFIRMED UNCHANGED (still correctly allowed — not a regression)** | Live `robots.txt` is unchanged: `User-agent: *` / `Allow: /` / `Disallow: /studio/` / `Sitemap: .../sitemap.xml`. No per-bot rules were added for any crawler (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, CCBot, anthropic-ai, cohere-ai all still inherit the wildcard `Allow: /`). This was a "what works" item at baseline, not a defect — re-verification confirms no drift/regression occurred. No RSL declaration exists (`/rsl.xml` still 404), unchanged and still low priority. |

---

## What Changed (Detail)

### 1. `/llms.txt` — FIXED
`public/llms.txt` now exists in the repo and is served correctly (200, correct `Content-Type: text/plain; charset=utf-8`, `X-Matched-Path: /llms.txt`). Unlike `/sitemap.xml` (which needed an explicit `next.config.ts` rewrite to `/api/sitemap` because it conflicts with the Next.js `sitemap.ts` special-file convention — confirmed present in `next.config.ts` lines 20-28), `/llms.txt` required **no rewrite**: placing the static file in `public/` was sufficient because there's no competing app-router convention for that filename. This resolves the exact root cause flagged at baseline.

**Quality of the file itself:** good structure (H1, blockquote summary, H2-grouped sections: Prestations, Zones d'intervention, Pages, Optional) but it curates only **service/city/static pages** — none of the 13 blog posts (including the GEO and SEO Local pillar articles specifically called out in the baseline recommendation as highest-priority inclusions) are linked. This is a minor residual gap, not a blocker: **Recommendation:** add a "Guides" or "Blog" H2 section linking the 2-3 pillar articles (`geo-referencement-ia-artisans-pme-hautes-alpes`, `seo-local-hautes-alpes-artisans-pme`) with one-line descriptions. Effort: **Low** (~10 min).

### 2. Named-source hyperlinking — STILL PRESENT, unchanged
Zero movement since baseline. This is a Sanity content-editing task (add link mark-defs), not a code change, and remains unexecuted across all sampled posts except `seo-local-hautes-alpes-artisans-pme`'s pre-existing 2 links. Given `blog-strategy.md`'s own "minimum 8 sources cited per article" standard, this remains the single most impactful un-actioned citability fix — same recommendation as baseline stands.

### 3. `prix-site-internet-artisan-pme-hautes-alpes` — PARTIALLY FIXED
- Mojibake: **still present** in `<title>` and JSON-LD `description` (`d�s 800 ?` instead of `dès 800 €`). This is notable because the *body-text* mojibake bug that affected 8/13 posts sitewide at baseline (up to 324 occurrences on the worst post) has clearly been remediated at the content level — every sampled post now shows only 2 residual U+FFFD characters, isolated to the `<title>` tag and/or meta description, suggesting the fix touched the Portable Text/body rendering pipeline but not the page-metadata generation path (likely a separate `generateMetadata()` string, possibly a hardcoded/cached title in Sanity that wasn't part of the same find-replace pass). This is a narrower, more precise bug now, but it directly answers "was it fixed?" — no, not fully.
- GEO content checklist: still failing on every axis measured at baseline — 0 capsule blocks, 0 citation blocks (verified against actual component class signatures, not just color-based text matching), 0 named external sources, 0 Tier-1 (gouv.fr/INSEE/CMA) mentions. One incremental improvement: FAQ Q&A pairs grew from 5 to 7, and a new question-format H2 was added ("L'IA fait-elle baisser les prix des sites web en 2026 ?"), suggesting a partial edit pass touched this article without addressing its core sourcing/capsule gap.

### 4. H2 question-format ratio — STILL PRESENT, marginally worse
No article in the 5-post sample reaches the 60-70% target. `guide-creation-site-internet-artisan-hautes-alpes`, previously the closest at ~57%, dropped to ~37.5% because a new declarative H2 was added without reframing existing ones. Net effect: the corpus average moved in the wrong direction. This remains a "content editing, not code" fix per the baseline recommendation, and the Month-2 "freshness cycle" from `blog-strategy.md` (which was supposed to be an opportunity to address this) does not appear to have executed this specific item.

### 5. Off-site brand-mentions — STILL PRESENT, unchanged
No evidence of YouTube channel creation, Wikipedia/Wikidata entries, Reddit presence, or directory claims (PagesJaunes, Malt, CMA05) since baseline. `Organization.sameAs` is unchanged (LinkedIn company page only) and `author.sameAs` is still an empty array — the 5-minute code/content fix flagged at baseline (wire FX Pin's personal LinkedIn into `Person.sameAs`) has not been applied. This remains, per the brief's own correlation data (YouTube ~0.737, the strongest single signal), the highest-leverage unexecuted action on the entire GEO roadmap, and `blog-strategy.md`'s own Month-1 roadmap item ("Configurer YouTube") is now ~2.5 months overdue against the plan's own timeline.

### 6. AI crawler access — confirmed unchanged, no regression
`robots.txt` is byte-for-byte consistent with baseline behavior: wildcard `Allow: /` with only `/studio/` disallowed. GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot all remain unblocked. No explicit per-bot documentation rules were added (still an optional, low-priority item). No RSL declaration exists (still not a priority given the intentionally-open crawl posture).

---

## GEO Health Score Breakdown (re-scored)

| Dimension | Weight | Baseline (06-15) | Re-audit (08-22) | Change | Notes |
|---|---|---|---|---|---|
| Citability | 25% | 60 | 58 | −2 | No hyperlinking progress on named sources; `prix-site-internet` confirmed still has zero capsule/citation/sourced content despite a partial edit pass. Slight downgrade to reflect that 2+ months elapsed with no remediation on the single highest-impact recommendation. |
| Structural Readability | 20% | 65 | 62 | −3 | FAQPage schema still sitewide (small positive: `prix-site-internet` grew 5→7 Q&A pairs). Offset by H2 question-ratio regressing on the previously-best article (guide-creation ~57%→37.5%); corpus-wide average did not improve and arguably worsened. |
| Multi-Modal Content | 15% | 45 | 45 | 0 | No YouTube videos, no new table/infographic evidence found. Unchanged. |
| Authority & Brand Signals | 20% | 60 | 60 | 0 | `sameAs` unchanged (LinkedIn company only, author empty). No off-site channel presence built. Entity mentions (FX Pin / Face Nord Graphisme / Hautes-Alpes) remain consistent on-page. |
| Technical Accessibility | 20% | 75 | 90 | +15 | `/llms.txt` now live and well-formed (root cause fixed, no rewrite needed unlike sitemap.xml). robots.txt confirmed still fully open to AI crawlers, no regression. RSL still absent (low priority, unchanged). |

**Weighted score:** (58×0.25) + (62×0.20) + (45×0.15) + (60×0.20) + (90×0.20) = 14.5 + 12.4 + 6.75 + 12 + 18 = **63.65 ≈ 64**

Applying the same modest rounding treatment used at baseline (baseline rounded 61.75 → 64 to credit the sitewide FAQPage structural foundation) for consistency: **65/100.**

**Net read:** the score is essentially flat versus the 06-15 baseline (64 → 65). This is not "no progress" — the technical-accessibility fix is real and meaningful (`/llms.txt` was a genuine, cleanly-executed fix) — but it sits in the smallest-leverage part of the rubric relative to what's still broken. The four content/authority dimensions carrying 80% of the category weight (Citability, Structural Readability, Multi-Modal, Authority & Brand Signals) saw **zero net improvement**, and one of them (Structural Readability, via the H2 question-ratio regression) moved slightly backward. The single highest-leverage items identified at baseline — hyperlinking named sources, executing the YouTube/off-site plan, and rewriting `prix-site-internet-artisan-pme-hautes-alpes` — remain exactly where they were on 2026-06-15.

---

## Platform-Specific Visibility Notes (qualitative, re-verified)

- **Google AI Overviews:** Sitewide FAQPage schema still intact; benefits unchanged. `/sitemap.xml` and `/llms.txt` both now resolve (200), removing two discovery-layer risks that could have suppressed indexing — a positive drift for AIO eligibility even though it's not itself a GEO-content signal.
- **ChatGPT / OAI-SearchBot:** No change to the capsule/citation-block strategy's execution consistency. `/llms.txt` is now discoverable by GPT-family crawlers/agents that check for it, a documented (if unofficial) convention some AI products consult — low-confidence but non-zero incremental benefit.
- **Perplexity:** PerplexityBot still unblocked (confirmed, no regression). No `lastUpdated`/freshness-cadence evidence found to have improved since baseline.
- **Bing Copilot:** No new signals checked or found; unchanged from baseline.

---

## Cross-References

- The mojibake fix that resolved sitewide body-text corruption (previously up to 324 U+FFFD occurrences on the worst post) is a Technical SEO / Content Quality category drift item — worth flagging there that the fix appears **incomplete**: `<title>` tags and meta descriptions on at least 5 posts (`digitaliser-reservations-tourisme-hautes-alpes`, `google-business-profile-artisans-hautes-alpes`, `le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes`, `prix-site-internet-artisan-pme-hautes-alpes`, `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026`) still carry 2 U+FFFD characters each, isolated to the page-metadata generation path rather than the Portable Text body renderer that was evidently fixed.
- `/sitemap.xml` and `/llms.txt` no longer share their baseline root cause in practice: `/sitemap.xml` needed (and now has) an explicit `next.config.ts` rewrite to `/api/sitemap`; `/llms.txt` needed only the static file to be added to `public/`. Both are now live (200).
