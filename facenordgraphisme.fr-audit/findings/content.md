# Content Quality — facenordgraphisme.fr

**Score: 48 / 100**

**Sample reviewed:** All 13 blog posts, all 7 service pages, all 3 city pages, `/a-propos`, all 6 portfolio pages — word counts derived from rendered text in `facenordgraphisme.fr-audit/raw/*.html`; encoding integrity checked via byte-level search for the UTF-8 replacement character (U+FFFD, bytes `EF BF BD`) across all 13 `blog_*.html` files (live production fetch, 2026-06-15).

---

## What Works

- **`/a-propos` carries a genuine, detailed first-person founder bio** — François-Xavier Pin, based in Puy-Sanières (05), with a specific personal narrative (learned HTML at 15, spent ~10 years in seasonal mountain work before converting to web development, explicitly positions local expertise in Gap/Briançon/Embrun/Guillestre/Tallard). This is a strong, non-generic **E-E-A-T (Experience/Expertise)** signal that AI Overviews and Google's quality systems can use to ground the `Person`/`Organization` entity — far better than a templated "About Us" page.
- **Service pages have solid topical depth**: 950-1,400 words each across `/prestations` (573), `/creation-site-internet-hautes-alpes` (1,078), `/boutique-e-commerce-hautes-alpes` (951), `/referencement-seo-hautes-alpes` (1,056), `/maintenance-site-internet-hautes-alpes` (1,122), `/referencement-ia` (1,215), `/refonte-ai-friendly` (1,216). No thin-content risk on the core commercial pages.
- **City pages are substantial and locally differentiated**: `/villes/briancon-hautes-alpes` (1,208 words), `/villes/embrun-serre-poncon` (1,382), `/villes/gap-hautes-alpes` (1,378) — each well above the ~300-word "thin location page" risk threshold, with city-specific FAQ blocks (confirmed in Schema findings).
- **Blog posts are consistently long-form**: 11 of 13 posts are 2,500-3,900 words (only `digitaliser-reservations-tourisme-hautes-alpes` is shorter at 1,623 words, still adequate). This is strong topical depth for the "Hautes-Alpes web/SEO for artisans" niche and aligns with the `blog-strategy.md` 5-cluster plan.
- **FAQPage schema present on every sampled blog post and all city pages** (cross-referenced in Schema findings) — supports the answer-first/AI-citation content format described in `blog-strategy.md`.
- No evidence of AI-generated boilerplate phrases or generic filler — content reads as locally-specific (named towns, named client sectors: artisans, GAEC, e-bike rental, event production).

---

## Findings

### 1. CRITICAL — 8 of 13 blog posts (62%) contain UTF-8 encoding corruption; 3 are fully unreadable

**Severity:** Critical

**Description:**
A byte-level scan for the UTF-8 replacement character (U+FFFD, `�`) across all 13 live blog post HTML responses found corruption in 8 posts, ranging from title-only to whole-article:

| Post | `�` occurrences | Severity |
|---|---|---|
| `le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes` | **324** | Critical — full article body unreadable |
| `seo-local-hautes-alpes-artisans-pme` | **268** | Critical — full article body unreadable |
| `digitaliser-reservations-tourisme-hautes-alpes` | **136** | Critical — full article body unreadable |
| `prix-site-internet-artisan-pme-hautes-alpes` | 24 | High — partial section corruption |
| `balises-title-meta-description-pme-hautes-alpes` | 20 | High — partial section corruption |
| `gerer-avis-google-artisans-pme-hautes-alpes` | 12 | Medium — scattered corruption |
| `google-business-profile-artisans-hautes-alpes` | 8 | Medium — title/meta only |
| `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` | 8 | Medium — title/meta only |
| `4-signaux-citation-ia-artisans`, `geo-referencement-ia-artisans-pme-hautes-alpes`, `guide-creation-site-internet-artisan-hautes-alpes`, `refonte-site-internet-5-signes`, `reservation-directe-eviter-commissions-booking-hautes-alpes` | 0 | Clean |

Every French word containing an accented character (é, è, ê, à, ç, û, etc.) in the affected posts renders as `�` in both the raw HTML and the `<title>`/meta tags — e.g. the title "Visibilité en ligne" appears as "Visibilit� en ligne". For the 3 worst-affected posts, the corruption is dense enough (one `�` roughly every 10-15 words) that the article body is **effectively unreadable** by a human visitor and almost certainly unusable as a citation source by AI answer engines (ChatGPT, Perplexity, AI Overviews) — directly undermining the GEO content strategy these posts were written for.

This is the single largest content-quality issue on the site: these 3 posts represent real, substantial content investment (each 1,600-3,900 words) that is currently delivering **zero value** to readers and search/AI crawlers due to a data-layer encoding bug, not a content-quality problem.

**Recommendation:**
1. Root-cause first: check how the affected posts' rich-text/body fields were originally entered into Sanity (copy-pasted from a Word doc, a different CMS export, or typed with a misconfigured input encoding are common causes of double-encoded UTF-8 → U+FFFD). Inspect the raw stored value in Sanity Studio for one corrupted field — if it already contains literal `�`/U+FFFD characters in the stored document, the data itself is corrupted (not a rendering bug) and **cannot be auto-repaired** by a regex/charset fix; it must be retyped or restored from a pre-corruption source (CMS revision history, original draft doc).
2. Prioritize the 3 fully-corrupted posts (324/268/136) — these are read-blocking, not just cosmetic.
3. For the 4 partially-corrupted posts (8-24 occurrences), a targeted find/replace per-document in Sanity Studio is feasible once the correct characters are identified from context.
4. After fixing, re-verify with the same byte-level check (`grep -o $'\xef\xbf\xbd' file.html | wc -l` should return `0` for all 13 posts) and re-render via `python scripts/render_page.py` to confirm the fix is live, not just in the CMS draft.

---

### 2. HIGH — `/refonte-ai-friendly` and `/refonte-ia-friendly` are near-duplicate, cannibalizing pages with very different content depth

**Severity:** High

**Description:**
Both pages target the same intent ("refonte de site web AI/IA-friendly" for Hautes-Alpes businesses) but are separately authored:

- `/refonte-ai-friendly`: 1,216 words, in `sitemap.ts`, title has the double-suffix bug (Technical Finding #4).
- `/refonte-ia-friendly`: 421 words, **not** in `sitemap.ts`, linked from homepage nav, has a cleaner title and an extra JSON-LD block (3 schema types vs. 2).

Two indexable pages competing for the same query with substantially different word counts and quality levels causes **keyword cannibalization** — Google must choose one to rank and may pick the thinner one, or suppress both. Neither page benefits from the other's strengths (the longer page's depth + the shorter page's cleaner title/extra schema).

**Recommendation:**
Pick one URL as canonical (recommend `/refonte-ai-friendly` for the existing sitemap entry and word-count depth, but the "ia" spelling may better match French-language search queries — worth a quick keyword check). Merge the best content/schema/title elements from both into the surviving page, then **301-redirect** the other URL to it. Update `sitemap.ts` accordingly (also covered in Technical Finding #7 and Sitemap Finding #4).

---

### 3. HIGH — Duplicate portfolio case-study content: `reves-d-aventures` vs `reves-daventures`

**Severity:** High

**Description:**
Two live, indexable, self-canonical portfolio URLs exist for the same client project ("Rêves d'Aventures"):

- `/portfolio/reves-d-aventures` — 288 words, title "Rêves d'Aventures | Réalisation Web Hautes-Alpes | Face Nord Graphisme" (77 chars)
- `/portfolio/reves-daventures` — 386 words, title "Rêves d'Aventures — Site vitrine & réservation sports outdoor Hautes-Alpes | Face Nord Graphisme" (109 chars, exceeds typical SERP display width)

This stems from two separate Sanity `project` documents with different slugs for the same underlying case study (also flagged in Sitemap findings as a sitemap-duplication issue) — from a *content* perspective, this is classic duplicate content: both pages describe the same client, same project, overlapping copy, competing for the same "Rêves d'Aventures" branded query.

**Recommendation:**
Consolidate into one Sanity document (keep the more complete 386-word version and its more descriptive title, but trim the title to ~60 chars), delete/unpublish the other document, and 301-redirect `/portfolio/reves-d-aventures` → `/portfolio/reves-daventures` (or vice versa, whichever slug is more consistent with the other 5 portfolio slugs' naming convention — note the other 5 all use hyphens between every word, e.g. `act-event-pro`, `gaec-des-valentins`, `verdon-ebike`, so `reves-d-aventures` is actually the *consistent* slug pattern).

---

### 4. MEDIUM — No content freshness signal: all 13 blog posts have `lastUpdated: null`

**Severity:** Medium

**Description:**
Per the Sanity `post` schema queried during this audit, every one of the 13 published blog posts has `lastUpdated: null` — only `publishedAt` is set. `src/app/sitemap.ts` falls back to `post.publishedAt || new Date()` for `lastModified`, meaning the sitemap currently reports either the original publish date or (worse) the audit/build date for every post, neither of which reflects genuine content freshness.

Freshness is a meaningful signal for AI answer engines (Perplexity and AI Overviews both weight recently-updated content for time-sensitive queries like pricing, tooling, or "2026" in titles — several posts already have "2026" in their titles, e.g. `guide-creation-site-internet-artisan-hautes-alpes` titled "...2026").

**Recommendation:**
As content is revised (starting with the mojibake fixes in Finding #1 — those edits should set `lastUpdated`), populate the `lastUpdated` field in Sanity going forward. Per `blog-strategy.md`'s Month-2 roadmap, establish a periodic "freshness pass" cadence (e.g., quarterly review of the highest-traffic posts) and update `lastUpdated` each time.

---

### 5. LOW — Portfolio case studies are thin relative to the rest of the site

**Severity:** Low

**Description:**
The 6 portfolio pages range from 264-386 words, noticeably thinner than every other content type on the site (service pages 950-1,400, city pages 1,200-1,400, blog posts mostly 2,500-3,900). While 264-386 words is not "thin content" in the penalty sense for a portfolio/case-study format, it's a missed opportunity: these pages currently function as link-outs to client sites (see Backlinks findings) but say little about the *process*, *results*, or *technology choices* — all of which are exactly the kind of specific, citable detail that helps both human prospects evaluating the agency and AI engines answering "who builds e-commerce sites for tourism businesses in the Hautes-Alpes."

**Recommendation:**
Treat as a content-enhancement backlog item (Phase 3/Month 2): for each portfolio entry, add 2-3 short paragraphs covering the client's problem, the specific solution delivered (tech stack, features), and a measurable or qualitative outcome — mirroring the structure already used effectively in the blog posts' "case in point" sections.

---

## Priority Action Summary

1. **[Critical]** Diagnose and fix the U+FFFD encoding corruption, starting with the 3 fully-corrupted posts (Finding #1) — verify whether the Sanity-stored data itself is corrupted before attempting any rendering-layer fix.
2. **[High]** Consolidate `/refonte-ai-friendly` and `/refonte-ia-friendly` into one page + 301 redirect (Finding #2).
3. **[High]** Consolidate `/portfolio/reves-d-aventures` and `/portfolio/reves-daventures` into one document + 301 redirect (Finding #3).
4. **[Medium]** Start populating `lastUpdated` in Sanity on every content edit going forward (Finding #4).
5. **[Low]** Expand portfolio case studies with process/outcome detail (Finding #5).
