# Content Quality — facenordgraphisme.fr (DRIFT RE-AUDIT)

**Re-audit date:** 2026-08-22
**Baseline:** 2026-06-15, score 48/100 (`facenordgraphisme.fr-audit/findings/content.md`)
**New score: 76 / 100** (+28 vs. baseline)

**Method:** All 13 blog posts, `/refonte-ai-friendly`, `/refonte-ia-friendly`, both portfolio "reves d'aventures" URLs, `/a-propos`, `/blog` index, and `/sitemap.xml` were fetched live from production (`https://www.facenordgraphisme.fr`) via direct HTTP fetch on 2026-08-22. Encoding integrity was re-checked with the same byte-level method as baseline (search for UTF-8 replacement character U+FFFD, `EF BF BD`), plus a new check isolating occurrences strictly inside `<article>...</article>` (visible body text) vs. `<head>`/JSON-LD/RSC-payload (metadata) to distinguish reader-facing corruption from SEO-metadata-only corruption.

---

## Summary of Drift Since 2026-06-15

| # | Baseline Issue | Status | Detail |
|---|---|---|---|
| 1 | 62% of blog posts (8/13) U+FFFD corruption, 3 fully unreadable | **PARTIALLY FIXED** | Body/reader-facing text is now 100% clean on all 13 posts (0 occurrences inside `<article>` anywhere). Corruption persists only in `<title>`/meta description/OG/Twitter/JSON-LD `headline` fields on 5 posts. Total site-wide occurrences down from 800 to 96 (‑88%). See Finding 1. |
| 2 | `/refonte-ai-friendly` vs `/refonte-ia-friendly` duplicate | **FIXED** | `/refonte-ia-friendly` now returns `308 Permanent Redirect` → `/refonte-ai-friendly`. Single surviving page, ~1,190 words, clean single-suffix title. |
| 3 | `/portfolio/reves-d-aventures` vs `/portfolio/reves-daventures` duplicate | **FIXED** | `/portfolio/reves-d-aventures` now returns `404` (removed, not redirected). `/portfolio/reves-daventures` is the sole surviving page, grown from 386 to ~471 words. |
| 4 | All 13 blog posts `lastUpdated: null` | **STILL PRESENT** | `sitemap.xml` `<lastmod>` values for all 13 posts are unchanged from baseline publish dates (e.g. `2026-04-14` to `2026-06-07`), with no dates in July/August despite the corruption fixes in Finding 1 clearly requiring a content edit in that window. No freshness signal has been added to the CMS or sitemap logic. |

**New posts since baseline:** none. `/blog` index still lists exactly 13 posts, same slugs, same order. No new content published between 2026-06-15 and 2026-08-22.

**New issue found:** `/portfolio/reves-daventures`'s `<title>` tag now shows a **double "| Face Nord Graphisme" suffix** (`"Rêves d'Aventures — Site réservation outdoor Hautes-Alpes | Face Nord Graphisme | Face Nord Graphisme"`, ~103 chars) — this specific page was not in the baseline's list of 6 double-suffix pages, so this looks like a regression introduced by whatever edit consolidated the two portfolio duplicates (title field manually re-suffixed on top of the layout template's automatic suffix). Cosmetic/SERP-truncation issue, not a content-integrity issue, but should be fixed alongside the other double-suffix pages (Technical Finding #4 in the baseline).

---

## What Works (confirmed still true)

- `/a-propos` founder bio remains intact and clean (0 U+FFFD), still the strongest E-E-A-T asset on the site.
- Service pages, city pages, and the 10 never-corrupted blog posts (`4-signaux-citation-ia-artisans`, `geo-referencement-ia-artisans-pme-hautes-alpes`, `guide-creation-site-internet-artisan-hautes-alpes`, `refonte-site-internet-5-signes`, `reservation-directe-eviter-commissions-booking-hautes-alpes`, plus the 3 newly-fully-fixed posts below) remain long-form and locally specific.
- `sitemap.xml` now returns 200 (37 URLs) and `llms.txt` now returns 200 — both were 404 at baseline. This doesn't change the Content score directly but materially improves the odds that the now-clean blog bodies actually get crawled/cited, which increases the real-world value of Finding 1's partial fix.
- No new thin-content, cannibalization, or generic-AI-filler issues detected on this pass.

---

## Findings

### 1. HIGH (downgraded from CRITICAL) — Body-text corruption eliminated; SEO-metadata corruption (`<title>`, meta description, OG/Twitter tags, JSON-LD `headline`) persists on 5 of 13 posts

**Severity:** High (was Critical)

**Description:**

Re-running the byte-level U+FFFD scan against the live site today:

| Post | Baseline count | Current total count | Current count inside `<article>` (reader-facing) | Status |
|---|---|---|---|---|
| `le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes` | 324 | **48** | **0** | Body fully readable now; title/meta/JSON-LD still corrupted |
| `seo-local-hautes-alpes-artisans-pme` | 268 | **0** | 0 | **Fully fixed** |
| `digitaliser-reservations-tourisme-hautes-alpes` | 136 | **8** | **0** | Body fully readable now; title only |
| `prix-site-internet-artisan-pme-hautes-alpes` | 24 | **24** | **0** | Unchanged count, but confirmed now confined to title/meta only (was "partial section" at baseline) |
| `balises-title-meta-description-pme-hautes-alpes` | 20 | **0** | 0 | **Fully fixed** |
| `gerer-avis-google-artisans-pme-hautes-alpes` | 12 | **0** | 0 | **Fully fixed** |
| `google-business-profile-artisans-hautes-alpes` | 8 | **8** | **0** | Unchanged — title only |
| `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` | 8 | **8** | **0** | Unchanged — title only |
| Other 5 posts (`4-signaux-citation-ia-artisans`, `geo-referencement-ia-artisans-pme-hautes-alpes`, `guide-creation-site-internet-artisan-hautes-alpes`, `refonte-site-internet-5-signes`, `reservation-directe-eviter-commissions-booking-hautes-alpes`) | 0 | 0 | 0 | Clean, unchanged |
| **Site-wide total** | **800** | **96** | **0** | **-88%** |

The three previously "fully unreadable" posts are now confirmed readable: for example, `le-guide-complet-...`'s `<h1>` renders correctly as "Le guide complet de la visibilité en ligne pour les commerçants des Hautes-Alpes" and the article body contains 1,277 correctly-rendered accented characters. This is a genuine, substantial fix — the CMS body/H1 field was clearly retyped or restored from a clean source for all 13 posts.

However, a distinct, narrower problem remains on 5 posts: the `<title>` tag, `<meta name="description">`, `og:title`, `twitter:title`, and the `BlogPosting.headline` JSON-LD field still contain literal `�` characters, e.g.:
- `le-guide-complet-...`: `<title>Visibilit� en ligne Hautes-Alpes | Face Nord Graphisme</title>`, meta description "Boostez votre commerce � Embrun, Gap ou Brian�on..."
- `prix-site-internet-...`: `<title>Prix site web Hautes-Alpes : d�s 800 ? | Face Nord Graphisme</title>` — note this also lost the euro sign (`€` → `?`), separate from the U+FFFD issue.
- `google-business-profile-...`: meta description "Guide complet pour cr�er et optimiser votre fiche..."
- `seo-vs-referencement-...`: `<title>SEO vs IA : quelle strat�gie 2026 | Face Nord Graphisme</title>`

This is a **separate Sanity field** from the body/H1 (likely `seoTitle`/`metaTitle` and `metaDescription`, as distinct from `title`/`body`) that was not included in whatever fix/retype pass addressed the body corruption. Practical impact: broken browser tab titles, broken Google SERP titles/snippets for these 5 URLs, broken social-share cards, and broken `headline` in structured data (the JSON-LD `BlogPosting.headline` field feeds AI Overviews/answer engines directly — a corrupted headline is a citation-readiness defect even though the body itself is now clean).

**Why this moves from Critical to High, not to Low/Fixed:** the read-blocking, GEO-defeating part of the problem (unreadable article bodies) is resolved for all 13 posts. What remains is a real but narrower SEO/schema-hygiene defect confined to title-tag/meta-tag fields on 5 URLs.

**Recommendation:**
1. In Sanity Studio, open each of the 5 affected posts' SEO/meta fields (not the body field — that's already clean) and retype the `metaTitle`/`seoTitle` and `metaDescription` values. Also check for a lost `€` character on `prix-site-internet-...` (rendering as `?` in the title) — a separate but adjacent data-entry bug worth fixing in the same pass.
2. Re-verify with the same byte-level check after the fix: `curl -s <url> | grep -c $'\xef\xbf\xbd'` should return `0` for all 13 posts.
3. Populate `lastUpdated` on these 5 posts as part of this fix (see Finding 4 — same edit event should set both).

---

### 2. RESOLVED — `/refonte-ai-friendly` vs `/refonte-ia-friendly` near-duplicate

**Severity:** Resolved (was High)

`/refonte-ia-friendly` now returns `HTTP/1.1 308 Permanent Redirect` to `/refonte-ai-friendly` (confirmed via `curl -I`). The surviving page (`/refonte-ai-friendly`) is ~1,190 words with a clean, single-suffix title ("Refonte Site Internet AI-Friendly — Hautes-Alpes | Face Nord Graphisme") — no evidence of the double-suffix bug on this page. Cannibalization risk is closed. No further action needed on the content side.

---

### 3. RESOLVED — `/portfolio/reves-d-aventures` vs `/portfolio/reves-daventures` duplicate

**Severity:** Resolved (was High)

`/portfolio/reves-d-aventures` now returns a clean `404` (the Sanity document appears to have been deleted/unpublished rather than redirected). `/portfolio/reves-daventures` is the sole surviving page and has grown from 386 to ~471 words — consistent with the recommended consolidation. Duplicate-content risk is closed.

**Minor residual issue (new):** the surviving page's `<title>` tag now reads `"Rêves d'Aventures — Site réservation outdoor Hautes-Alpes | Face Nord Graphisme | Face Nord Graphisme"` (~103 characters, double suffix). This appears to be a side effect of the consolidation edit (someone manually appended "| Face Nord Graphisme" to a title field that already gets the suffix auto-applied by the layout template) rather than a content-quality problem per se. Recommend trimming the manual suffix — cross-reference with the baseline's Technical Finding #4 (title double-suffix bug) since this is the same underlying template issue, now present on a 7th page.

---

### 4. MEDIUM — Still no content freshness signal; all posts remain effectively `lastUpdated: null`

**Severity:** Medium (unchanged)

**Description:**
`sitemap.xml`'s `<lastmod>` values for all 13 blog posts are unchanged from what would be expected from `publishedAt` alone (dates ranging 2026-04-14 to 2026-06-07 — all pre-dating this re-audit by 2.5-4 months). None reflect a July or August 2026 date, even though:
- 3 posts had their body content demonstrably retyped/fixed between the 2026-06-15 baseline and today (the mojibake-elimination work described in Finding 1), which is exactly the kind of substantive edit that should update a freshness timestamp.
- Several post titles already reference "2026" as a timeliness signal, which is undermined if the page carries no visible or structured "updated" date.

This confirms the baseline's root-cause diagnosis was correct (`lastUpdated` is not being populated in Sanity, and `sitemap.ts`'s fallback to `publishedAt` masks the gap) and that no remediation has been applied yet, even incidentally, despite other content edits happening in the same window.

**Recommendation:** Unchanged from baseline — populate `lastUpdated` in Sanity on every future content edit (starting immediately with the 5 posts still needing the Finding 1 metadata fix), and expose it via visible "Mis à jour le [date]" UI plus `dateModified` in `BlogPosting` schema (verify this JSON-LD field is wired to the same source before assuming it's already correct).

---

## General Content-Quality Pass (thin content, duplication, E-E-A-T)

- **No new thin-content pages found.** Service pages, city pages, and `/a-propos` were spot-checked and remain consistent with baseline word counts and quality.
- **No new duplicate-content pairs found** beyond the two already resolved above.
- **E-E-A-T signals unchanged and intact:** `/a-propos`'s founder bio is still live, clean, and specific (0 U+FFFD). This remains the strongest single E-E-A-T asset on the site and continues to be underleveraged elsewhere (no author byline/bio snippet on individual blog posts pointing back to `/a-propos` was found on this pass — same gap as baseline, not previously flagged as a discrete finding but worth noting for the next full audit).
- **Portfolio thinness (baseline Finding #5, Low severity)** was not re-verified in depth this cycle beyond the `reves-daventures` consolidation; treat as still open pending full re-audit.
- **No new AI-generated-content quality red flags** (generic phrasing, repetitive structure, factual errors) observed in the pages sampled this cycle.

---

## Priority Action Summary (updated)

1. **[High]** Fix the remaining `<title>`/meta description/OG/Twitter/JSON-LD corruption on 5 posts (Finding 1) — body text is already clean, so this is now a narrower, faster fix than at baseline.
2. **[Medium]** Populate `lastUpdated` in Sanity, starting with the posts touched in Finding 1's original fix pass and the 5 still needing metadata fixes (Finding 4).
3. **[Low, new]** Trim the double "| Face Nord Graphisme" suffix from `/portfolio/reves-daventures`'s title tag.
4. **[Low, carried over]** Expand portfolio case studies with process/outcome detail (baseline Finding #5 — not re-verified this cycle).
