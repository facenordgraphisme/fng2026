# Backlink Profile — facenordgraphisme.fr

**Score: 35 / 100** (updated 2026-06-15, see Verification Update below)

**Data sources:** Common Crawl Web Graph (`commoncrawl_graph.py`, release `cc-main-2026-jan-feb-mar`, tier 0 — no Moz/Bing credentials configured), live verification crawl of the 5 portfolio client domains listed in `facenordgraphisme.fr-audit/raw/client-backlink-candidates.json`, LinkedIn company-page check (2026-06-15).

---

## What Works

- **5 confirmed, live, dofollow backlinks from real client websites**, each in the site footer crediting the agency:

| Referring domain | Status | Link target | Anchor text | `rel` |
|---|---|---|---|---|
| `act-event-pro.fr` | 200 (HTTPS) | `https://www.facenordgraphisme.fr` | (icon/logo link, no visible text) | `noopener noreferrer` |
| `gaecdesvalentins.fr` | 200 (HTTPS) | `https://facenordgraphisme.fr` | "Face Nord Graphisme" | `noopener` |
| `gaudineto.fr` | 200 (**HTTP, no TLS**) | `https://www.facenordgraphisme.fr` | "face nord graphisme" | `noopener` |
| `revesdaventures.fr` | 200 (HTTPS) | `https://facenordgraphisme.fr` | "Face Nord Graphisme" | `noopener` |
| `verdonebike.com` | 200 (HTTPS) | `https://facenordgraphisme.fr` | "Propulsé par Face Nord Graphisme" | (none — fully dofollow) |
| `linkedin.com` | 999 (bot-blocked, unverifiable) | — | — | — |

None of the 5 confirmed links carry `rel="nofollow"` or `rel="sponsored"` — all pass link equity. The anchor text is brand-consistent ("Face Nord Graphisme") across 4 of 5, which is healthy for **brand/entity association** (helps Google and AI engines connect the "Face Nord Graphisme" entity to real, live websites it built) even though it's low anchor-text diversity from a pure-keyword standpoint.

- **Every confirmed referring domain is a genuinely relevant, topically-related local business** (event production, agriculture/GAEC, outdoor sports/tourism, e-bike rental) in the same Hautes-Alpes region the agency targets — these are the *highest-relevance possible* links for local SEO, far more valuable per-link than generic directory listings.

---

## Findings

### 1. HIGH — Domain not yet indexed in Common Crawl; no broader off-site link profile detected

**Severity:** High

**Description:**
A query against the Common Crawl web graph (`cc-main-2026-jan-feb-mar` release) returned:
```json
{
  "in_crawl": false,
  "in_rankings": false,
  "pagerank": null,
  "top_referring_domains": [],
  "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."
}
```
This means that beyond the 5 portfolio-credit links confirmed by direct verification, **there is no visible evidence of any other referring domain** — no directory listings (Google Business Profile website link aside), no press mentions, no guest posts, no local Chamber-of-Commerce/tourism-office listings, no .edu/.gouv citations. For a business targeting "Hautes-Alpes" local search terms, **local citation consistency and directory presence** (Pages Jaunes, local tourism office sites, Hautes-Alpes business directories) is both a backlink and a local-SEO (NAP consistency) lever currently untapped.

**Recommendation:**
1. Build out a baseline local citation profile: Pages Jaunes, Google Business Profile (cross-ref Local SEO findings for NAP consistency requirements), local Chambre de Commerce et d'Industrie des Hautes-Alpes, regional tourism-office partner directories (relevant given several client portfolios are tourism businesses).
2. Re-run this Common Crawl check in 2-3 months as new crawl releases publish — domain indexing in CC lags real-world link acquisition by one or more crawl cycles, so "not found" now doesn't preclude recent/future links from appearing later.

---

### 2. ~~MEDIUM — One of five client credit-links originates from a non-HTTPS site~~ — RESOLVED

**Severity:** Medium (resolved)

**Description:**
`gaudineto.fr` (previously live as `http://www.gaudineto.fr`, no HTTPS) is one of the 5 portfolio sites built by this agency and carries a dofollow credit link back to `facenordgraphisme.fr`.

**Update (verification re-check, same day):** `http://www.gaudineto.fr` and `http://gaudineto.fr` now return `301 Moved Permanently` → `https://gaudineto.fr/` (200 OK, valid TLS). The site has migrated to HTTPS since the initial crawl. No action needed — this finding is resolved.

---

### 3. MEDIUM — Anchor-text diversity is minimal (4 of 5 links use near-identical brand anchor text)

**Severity:** Medium

**Description:**
4 of the 5 confirmed links use anchor text that is the brand name verbatim or near-verbatim ("Face Nord Graphisme" ×3, "face nord graphisme" ×1, "Propulsé par Face Nord Graphisme" ×1). `act-event-pro.fr`'s link appears to be icon/logo-only with no anchor text at all. This is **not a penalty risk** (brand-anchor links from genuinely relevant sites are exactly what a natural profile looks like for a service business), but it means there's currently zero anchor-text signal for the *service* keywords this site wants to rank for ("création site internet Hautes-Alpes", "agence web Gap", etc.).

**Recommendation:**
This is a low-urgency, longer-term lever: as new client sites are delivered, vary credit-link anchor text naturally (e.g., "site internet créé par Face Nord Graphisme", "agence web Hautes-Alpes" as alt text on a logo link) without over-optimizing — 1-2 keyword-flavored variants among an otherwise brand-anchor-dominant profile is healthy.

---

## Priority Action Summary

1. **[High]** Build baseline local-citation profile (Pages Jaunes, GBP, CCI Hautes-Alpes, tourism-office directories) — addresses both the off-site link gap (Finding #1) and reinforces NAP consistency (cross-ref Local SEO findings).
2. **[Medium]** Migrate `gaudineto.fr` to HTTPS — fixes the referring site's own quality issue and strengthens that credit link (Finding #2).
3. **[Medium]** As new portfolio projects launch, vary credit-link anchor text slightly toward service/location keywords (Finding #3) — no action needed on existing 5 links.

**Note on confidence:** This category is based on tier-0 free tooling only (Common Crawl + direct verification of 5 known client URLs). No Moz/Ahrefs/Bing Webmaster Tools data was available. The 5 confirmed links and the "not yet in Common Crawl" result are reliable signals of a genuinely new/small backlink profile, but cannot rule out additional referring domains a paid tool would surface (e.g., social shares, unlinked brand mentions). Re-run with a backlinks API if/when credentials become available.
