# Backlink Profile — facenordgraphisme.fr — DRIFT RE-AUDIT (2026-08-22)

**Baseline:** 2026-06-15, category score **30/100** (`facenordgraphisme.fr-audit/FULL-AUDIT-REPORT.md`, detail `facenordgraphisme.fr-audit/findings/backlinks.md`)

**Re-audit date:** 2026-08-22 (~2 months, 1 week after baseline)

**New category score: 30 / 100 — UNCHANGED**

**Data sources (tier 0 only, no Moz/Bing/DataForSEO credentials configured):**
- Common Crawl Web Graph (`commoncrawl_graph.py`), queried with `--update` to force a non-cached, fresh lookup (confidence: 0.50)
- `commoncrawl_graph.py --info` to check for a newer release than baseline
- Backlink verification crawler (`verify_backlinks.py`) against the same 5 client URLs from `raw/client-backlink-candidates.json` (confidence: 0.95)
- `curl -L` direct scheme/redirect check on `gaudineto.fr` (confidence: 0.95)
- Direct fetch attempt against PagesJaunes search (blocked by Cloudflare bot-challenge, 403 — inconclusive)
- Re-check of `reaudit-local/raw_portfolio*.html` (fresh crawl from the parallel Local SEO re-audit, same day) to confirm no new portfolio/client projects have been added since baseline

---

## Issue-by-issue verification

### Issue #1 (HIGH, baseline) — Domain not yet indexed in Common Crawl — **STILL PRESENT**

Re-ran `commoncrawl_graph.py facenordgraphisme.fr --update --json` (bypassing cache, forcing a fresh lookup) and separately confirmed via `--info` that the latest available release is still `cc-main-2026-jan-feb-mar` — **the identical release baseline used**. No newer Common Crawl release has published in the ~2 months since baseline (CC releases run on a roughly quarterly cadence; this is expected, not a tooling failure).

```json
{
  "domain": "facenordgraphisme.fr",
  "in_crawl": false,
  "in_rankings": false,
  "pagerank": null,
  "top_referring_domains": [],
  "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."
}
```

**Status: STILL PRESENT.** No broader off-site link profile is visible via Common Crawl. This is not a regression — it's the same underlying condition as baseline, confirmed with a fresh (non-cached) query against the same latest release. A meaningful re-check requires the next CC release to publish (watch for `cc-main-2026-apr-may-jun` or later).

### Issue #3 (MEDIUM, baseline) — Anchor-text diversity minimal — **STILL PRESENT**

Re-verified anchor text on all 5 links (below). All 5 now show visible brand-anchor text (baseline had `act-event-pro.fr` as icon/logo-only with **no** anchor text at all; it now renders "Propulsé par Face Nord Graphisme" as visible text). Net effect: anchor-text diversity is unchanged in substance — it's still 100% brand-anchor, just now literally 5/5 instead of 4/5-with-one-icon-link. No keyword-flavored anchor variant has been introduced.

**Status: STILL PRESENT**, effectively unchanged. Not a penalty risk (as noted at baseline), but zero service-keyword anchor signal remains.

### Issue #2 (MEDIUM, baseline, already marked resolved same-day) — `gaudineto.fr` HTTPS — **CONFIRMED STILL FIXED**

`curl -L http://www.gaudineto.fr` and `curl -L https://gaudineto.fr` both resolve cleanly to `https://gaudineto.fr/` (HTTP 200, valid TLS, scheme `https`). No regression — this remains fixed as it was at the end of the baseline audit.

---

## 5 client backlinks — re-verification results

Ran `verify_backlinks.py --target https://www.facenordgraphisme.fr --links raw/client-backlink-candidates.json`:

| Referring domain | Status | HTTP | Target found | Anchor text | `rel` | Dofollow? |
|---|---|---|---|---|---|---|
| `act-event-pro.fr` | verified | 200 | yes | "Propulsé par Face Nord Graphisme" | `noopener noreferrer` | Yes |
| `gaecdesvalentins.fr` | verified | 200 | yes | "Face Nord Graphisme" | `noopener` | Yes |
| `gaudineto.fr` | verified | 200 (HTTPS) | yes | "face nord graphisme" | `noopener` | Yes |
| `revesdaventures.fr` | verified | 200 | yes | "Face Nord Graphisme" | `follow` (explicit) | Yes |
| `verdonebike.com` | verified | 200 | yes | "Face Nord Graphisme" | `noopener noreferrer` | Yes |

**5 of 5 confirmed live and dofollow** — 100% verification rate, zero lost/removed/nofollowed links. No `rel="nofollow"` or `rel="sponsored"` on any link. This matches baseline exactly in substance (all 5 links persist, all still credit the agency, all still dofollow); only minor cosmetic differences in `rel` attribute composition and act-event-pro's link now carrying visible anchor text.

---

## New backlinks since June — none confirmed

Baseline's Priority Action #1 recommended building local citations (Pages Jaunes, CCI Hautes-Alpes, tourism-office directories). Checked for evidence of progress:

- **No new portfolio/client projects** have been added to the site since baseline — the `reaudit-local` fresh crawl (same day, from the parallel Local SEO re-audit) shows the identical 5 unique client projects (plus the pre-existing `reves-d-aventures`/`reves-daventures` duplicate-slug pair) as baseline. No 6th client credit-link candidate exists.
- **PagesJaunes.fr search** for "Face Nord Graphisme" was attempted directly (`render_page.py`) and returned an HTTP 403 Cloudflare bot-challenge page — **inconclusive**, not a confirmed absence. Tier-0 tooling cannot verify directory-listing status; this would need manual browser verification or a paid SERP/citation-tracking API.
- **LinkedIn company page** (`linkedin.com/company/face-nord-graphisme`, confirmed as the correct URL via the site's own `sameAs` schema) remains **unverifiable** with default tooling (HTTP 999 anti-bot block, consistent with baseline's "999 bot-blocked, unverifiable"). With a browser user-agent the page returns 404, which is ambiguous (could mean removed/private, or could be another anti-bot response shape) — not treated as a confirmed finding either way.
- No other new referring domains were discoverable via Common Crawl (still `in_crawl: false`, see Issue #1).

**Conclusion: no new backlinks confirmed since baseline.** The recommended citation-building work does not appear to have been executed yet (or, if executed, is not yet detectable via tier-0 tooling — PagesJaunes' bot protection specifically prevents automated confirmation either way).

---

## Score rationale — why unchanged at 30/100

Nothing regressed and nothing materially improved:
- The 5 confirmed backlinks are stable (100% still live, dofollow, relevant) — this was already priced into the baseline 30.
- The dominant negative factor (no Common Crawl indexation / no visible off-site link profile beyond the 5 known links) is unchanged, confirmed with a fresh, non-cached query.
- The one MEDIUM issue already resolved at baseline (`gaudineto.fr` HTTPS) remains resolved — no new credit for a fix that predates this re-audit window.
- The other MEDIUM issue (anchor-text diversity) is unchanged in substance.
- No new referring domains, directories, or citations were confirmed — the recommended local-citation-building work has not yet produced verifiable results.

At Tier 0, backlinks remain fundamentally a **small, stable, high-relevance-but-narrow profile**: 5 genuine client links and nothing else detectable. This is an accurate score, not a penalty — a paid backlinks API (Moz/DataForSEO) could reveal additional referring domains (social shares, unlinked mentions, or citations invisible to Common Crawl and blocked-by-bot-protection PagesJaunes) that would change this assessment.

---

## Priority Action Summary (unchanged from baseline, still open)

1. **[High]** Build baseline local-citation profile (Pages Jaunes, GBP, CCI Hautes-Alpes, tourism-office directories) — still not detectable as done; addresses Issue #1 and the local-SEO citation gap (cross-ref `findings-2026-08-22/local.md`).
2. **[Medium]** As new portfolio projects launch, vary credit-link anchor text toward service/location keywords (Issue #3) — still no action taken on the existing 5 links; low urgency.
3. **[Low]** Re-run this Common Crawl check when the next release (`cc-main-2026-apr-may-jun` or later) publishes — no new release has appeared yet in this cycle.

**Confidence note:** unchanged from baseline — tier-0 free tooling only (Common Crawl + direct verification). PagesJaunes and LinkedIn checks in this cycle were blocked by anti-bot protections and are explicitly marked inconclusive rather than reported as negative findings. Re-run with a paid backlinks API (Moz/DataForSEO) if/when credentials become available — `./extensions/dataforseo/install.sh`.
