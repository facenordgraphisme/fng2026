# Topic Cluster Architecture — DRIFT RE-AUDIT (2026-08-22)

**Category:** Content Architecture (feeds Content Quality + On-Page)
**Baseline:** 2026-06-15, score 47/100 (`facenordgraphisme.fr-audit/findings/cluster.md`)
**Scope:** Re-verification of the 7 previously-flagged issues against the LIVE `/blog` and its 13 posts, plus a check for any content published since baseline against the 5-cluster taxonomy in `blog-strategy.md`.

## Score: 40 / 100 (down from 47/100 — DRIFT: REGRESSION)

Zero of the seven flagged issues have been remediated. Every broken link, the orphan page, the missing hub-spoke structure in Clusters 2 and 5, the nav-boilerplate-only cross-linking, the `/referencement-ia` cannibalization, and the flat `/blog` index are byte-for-byte identical to the 2026-06-15 baseline. Worse, the roadmap in `blog-strategy.md` called for 5 Month-2 (July) deliverables and 3 Month-3 (August) deliverables — **zero were published**. The site has had no blog content or internal-link edits in over 10 weeks despite the baseline explicitly flagging these as "10-minute fixes" and "highest-leverage, lowest-effort" wins. The score is lowered from 47 to 40 to reflect that unaddressed high-severity findings compound over time (longer-lived 404s, longer orphan-page indexation gap) and that the roadmap-adherence tailwind that partially offset the baseline score ("ahead of schedule") has now fully reversed into "roadmap stalled."

---

## New Content Check

**No new posts found.** `/blog` still lists exactly the same 13 posts, same slugs, same publish dates (07/06/2026 down to 14/04/2026) as the baseline crawl. No Month-2 (Pillar Tourisme, GEO S2/S3, Création S1, Tourisme S2) or Month-3 (Pillar E-commerce, GEO S4, Cluster-1 S6) roadmap items have been published. Cluster 4 (E-commerce) remains at 0 posts and Cluster 5 (Tourisme) still has no pillar.

---

## Issue-by-Issue Re-Verification

### 1. Two broken internal links (404) — **STILL PRESENT**
Live-crawled all three affected posts; both broken slugs remain exactly as documented:
- `href="/blog/gbp-artisans-hautes-alpes"` still present in `prix-site-internet-artisan-pme-hautes-alpes`, `refonte-site-internet-5-signes`, and `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` (3 occurrences, unchanged).
- `href="/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes"` still present in `refonte-site-internet-5-signes` and `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` (2 occurrences, unchanged).
No slug corrections have been made in over 10 weeks. These continue to render as styled `spokeCard`/inline CTAs ("Optimiser ma fiche GBP →", "Voir la stratégie complète →") pointing to non-existent pages.

### 2. `reservation-directe-eviter-commissions-booking-hautes-alpes` orphan page — **STILL PRESENT**
Re-crawled all candidate inbound sources named in the baseline recommendation:
- `digitaliser-reservations-tourisme-hautes-alpes` (its Cluster-5 sibling) — no link added.
- `geo-referencement-ia-artisans-pme-hautes-alpes` (already linked TO by this post) — no reciprocal link added; its only outbound `/blog/` links are to `4-signaux-citation-ia-artisans` and `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026`.
- `seo-local-hautes-alpes-artisans-pme` (hub) — confirmed no link.
- `guide-creation-site-internet-artisan-hautes-alpes` (already linked TO by this post) — no reciprocal link added.
This page has now had zero inbound internal links for at least 10+ weeks since publication, worsening its indexation/authority risk versus the baseline snapshot.

### 3. Cluster 4 (E-commerce) zero posts — **STILL PRESENT / WORSENED**
Confirmed 0 posts still map to Cluster 4. Baseline treated this as an expected, on-schedule gap ("scheduled for Month 3 / August 2026"). It is now August 22, 2026 — deep into the month the pillar was committed to — and the E-commerce pillar has not been published. This has shifted from "informational, not a defect" to an active roadmap slippage.

### 4. Clusters 2 (Création de Site) and 5 (Tourisme) lack hub-spoke structure — **STILL PRESENT**
- Cluster 2: `guide-creation-site-internet-artisan-hautes-alpes` (pillar) still links only to `4-signaux-citation-ia-artisans` and `geo-referencement-ia-artisans-pme-hautes-alpes` (Cluster 3, cross-cluster) — confirmed zero links to its own siblings `prix-site-internet-artisan-pme-hautes-alpes` or `refonte-site-internet-5-signes`. Neither of those two spokes links to the pillar either (re-confirmed on crawl).
- Cluster 5: `digitaliser-reservations-tourisme-hautes-alpes` and `reservation-directe-eviter-commissions-booking-hautes-alpes` still do not link to each other — re-confirmed bidirectionally.

### 5. Cross-cluster/service-page linking is nav-menu boilerplate — **STILL PRESENT**
Every post re-crawled (`prix-site-internet`, `refonte-site-internet-5-signes`, `seo-vs-referencement-sur-l-ia`, `digitaliser-reservations-tourisme`, `seo-local-hautes-alpes-artisans-pme`, `guide-creation-site-internet-artisan-hautes-alpes`) shows the identical repeated service-page link set (`/referencement-ia`, `/creation-site-internet-hautes-alpes`, `/boutique-e-commerce-hautes-alpes`, `/referencement-seo-hautes-alpes`, `/refonte-ai-friendly`, `/maintenance-site-internet-hautes-alpes`) from the shared nav/sidebar component, plus new "Agence web Gap/Briançon/Embrun" location-page nav links (unchanged pattern, just more nav noise). The GEO pillar's single contextual `spokeCard` link to `/referencement-ia` remains the only in-body exception in the corpus, exactly as at baseline.

### 6. `/referencement-ia` vs blog GEO pillar cannibalization — **STILL PRESENT**
`/referencement-ia` title/H1 are unchanged from baseline ("Référencement IA — GEO & AI Overviews | Hautes-Alpes | Face Nord Graphisme" / "Référencement IA & GEO pour les Hautes-Alpes") — no commercial-vs-educational differentiation has been applied. Crawled the service page's body links: it links to `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` and `prix-site-internet-artisan-pme-hautes-alpes`, but **still does not link to the actual GEO pillar** `geo-referencement-ia-artisans-pme-hautes-alpes` — the reciprocal link recommended at baseline was never added. Both pages continue to compete for the same "référencement IA / GEO / Hautes-Alpes" query space with no resolution.

### 7. `/blog` index has no cluster/category navigation — **STILL PRESENT**
Re-crawled `/blog`: still a flat reverse-chronological list of all 13 posts with publish dates only — no category filters, tags, or cluster grouping of any kind.

---

## Summary Table

| # | Finding | Status |
|---|---|---|
| 1 | Two broken internal links (404) | STILL PRESENT |
| 2 | `reservation-directe-...` orphan (0 inbound links) | STILL PRESENT |
| 3 | Cluster 4 (E-commerce) zero posts | STILL PRESENT (now overdue vs. roadmap, not just "not yet due") |
| 4 | Clusters 2 & 5 lack hub-spoke structure | STILL PRESENT |
| 5 | Cross-cluster/service-page linking is nav boilerplate | STILL PRESENT |
| 6 | `/referencement-ia` vs GEO pillar cannibalization | STILL PRESENT |
| 7 | `/blog` index has no cluster/category nav | STILL PRESENT |

**New posts since 2026-06-15:** None. Post count unchanged at 13; cluster distribution identical to baseline (C1: 6, C2: 3, C3: 2, C4: 0, C5: 2).

---

## Audit-Data JSON (Content Architecture category)

```json
{
  "category": "Content Architecture",
  "subcategory": "Topic Cluster Architecture",
  "audit_type": "drift_re_audit",
  "baseline_date": "2026-06-15",
  "reaudit_date": "2026-08-22",
  "baseline_score": 47,
  "score": 40,
  "max_score": 100,
  "drift_direction": "regression",
  "new_posts_since_baseline": 0,
  "post_count": 13,
  "issue_status": [
    { "id": 1, "title": "Two broken internal links (404)", "status": "still_present" },
    { "id": 2, "title": "reservation-directe orphan page", "status": "still_present" },
    { "id": 3, "title": "Cluster 4 (E-commerce) zero posts", "status": "still_present", "note": "roadmap deadline for pillar (August 2026) now active/overdue, escalating severity from informational to medium" },
    { "id": 4, "title": "Clusters 2 & 5 lack hub-spoke structure", "status": "still_present" },
    { "id": 5, "title": "Cross-cluster/service-page linking is nav boilerplate", "status": "still_present" },
    { "id": 6, "title": "/referencement-ia vs blog GEO pillar cannibalization", "status": "still_present" },
    { "id": 7, "title": "/blog index has no cluster/category navigation", "status": "still_present" }
  ],
  "cluster_mapping": {
    "cluster_1_seo_local": { "pillar": "seo-local-hautes-alpes-artisans-pme", "post_count": 6, "status": "unchanged" },
    "cluster_2_creation_site": { "pillar": "guide-creation-site-internet-artisan-hautes-alpes", "post_count": 3, "status": "unchanged, no hub-spoke structure" },
    "cluster_3_geo_ia": { "pillar": "geo-referencement-ia-artisans-pme-hautes-alpes", "post_count": 2, "status": "unchanged" },
    "cluster_4_ecommerce": { "pillar": null, "post_count": 0, "status": "unchanged, roadmap deadline now overdue" },
    "cluster_5_tourisme": { "pillar": null, "post_count": 2, "status": "unchanged, no hub-spoke structure, orphan spoke persists" }
  },
  "recommendation_priority": "All 7 fixes from the 2026-06-15 baseline remain outstanding and are still the highest-leverage, lowest-effort actions available (no new content required, only edits to existing published posts). Recommend escalating: these were characterized as 10-minute fixes and have now sat unaddressed for 10+ weeks."
}
```
