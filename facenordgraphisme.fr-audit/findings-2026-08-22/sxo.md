# Search Experience (SXO) — facenordgraphisme.fr — DRIFT RE-AUDIT

**Re-audit date:** 2026-08-22
**Baseline:** 2026-06-15, `facenordgraphisme.fr-audit/findings/sxo.md` (SXO Gap Score 58/100)
**New SXO Gap Score: 68 / 100** (separate from the SEO Health Score)

Method: live re-fetch via `render_page.py --mode auto` (raw HTML, not cache) for the six pages
central to the three baseline findings, parsed with `parse_html.py`. `www.facenordgraphisme.fr`
confirmed to be served fully static/SSR (`is_spa: False`, `mode_used: raw` on every page), so raw
fetch reflects what both crawlers and users see.

---

## Summary of Movement Since Baseline

| # | Baseline Finding | Severity | Status |
|---|---|---|---|
| 1 | `/refonte-ai-friendly` vs `/refonte-ia-friendly` duplicate-intent pages | CRITICAL | **FIXED** |
| 2 | `/referencement-ia` out-depth'd/cannibalized by blog pillar | HIGH | **PARTIALLY FIXED** |
| 3 | City pages duplicate service-page sections | MEDIUM | **STILL PRESENT** |

The critical finding — the one explicitly called out as the primary drag on the baseline score —
is resolved cleanly via a server-side redirect, which is the single biggest driver of the score
moving from 58 to 68. The HIGH finding has one of its two recommended fixes shipped (reciprocal
linking) but not the other (H2 de-duplication), so it is only half-closed. The MEDIUM finding
shows no detectable change.

---

## Finding 1 — `/refonte-ai-friendly` vs `/refonte-ia-friendly` — FIXED

**Live verification (2026-08-22):**

- `GET https://www.facenordgraphisme.fr/refonte-ia-friendly` now returns **HTTP 308** and
  redirects to `https://www.facenordgraphisme.fr/refonte-ai-friendly` (confirmed via
  `render_page.py`'s `redirect_chain`: `[{'url': 'https://www.facenordgraphisme.fr/refonte-ia-friendly', 'status_code': 308}]`,
  final resolved URL = `/refonte-ai-friendly`, final status 200).
- The redirect target is the correct canonical survivor recommended in the baseline
  (`/refonte-ai-friendly` — the page with `Offer` schema, FAQ, diagnostic section, and blog
  cross-links).
- `sitemap.xml` (live, re-fetched) contains **only** `/refonte-ai-friendly`; `/refonte-ia-friendly`
  is correctly absent — no orphan re-appears post-redirect.
- The double-suffix title bug flagged in the baseline (94 chars, "... | Face Nord Graphisme |
  Face Nord Graphisme") is also fixed: the live title on the surviving page is now
  **"Refonte Site Internet AI-Friendly – Hautes-Alpes | Face Nord Graphisme"** (single suffix,
  clean length). This was bundled as recommendation #4 in the baseline and has shipped alongside
  the redirect.
- Word count 1,134 (parse_html.py), 7 H2s, 5 schema blocks, 34 internal links — structurally
  unchanged from the baseline description of the winning page, confirming no content was diluted
  by "merging" the weaker page (which the baseline explicitly warned against).

**Not independently re-verified:** whether the homepage sidebar submenu anchor-text/href mismatch
(baseline recommendation #3 — "Refonte AI-Friendly" label pointing to the wrong URL) was fixed.
Since `/refonte-ia-friendly` now 308s regardless of which URL the link points to, the *user and
crawl* experience is no longer broken either way (both hrefs converge on the same final page), but
the internal-linking hygiene item itself was not confirmed as separately corrected — flag for
`/seo technical` to confirm the anchor now points directly at `/refonte-ai-friendly` rather than
relying on the redirect hop.

**Verdict: FIXED.** This was the primary finding in the baseline and it is resolved via the
recommended mechanism (301/308 redirect to the stronger page, not a content merge), with the
bonus that the title bug shipped in the same pass.

---

## Finding 2 — `/referencement-ia` vs. blog pillar cannibalization — PARTIALLY FIXED

**Live verification (2026-08-22):**

- **What shipped:** `/blog/geo-referencement-ia-artisans-pme-hautes-alpes` (the GEO pillar) now
  contains **reciprocal links back to `/referencement-ia`**, including an explicit CTA card with
  anchor text "Découvrir le service →" pointing to `href="/referencement-ia"`, plus a second
  contextual link ("Référencement IA") — confirmed via live HTML grep. This directly matches the
  baseline recommendation: *"Add a reciprocal CTA block at the end of the blog pillar driving to
  `/referencement-ia`... currently the blog → service linkage exists one-way... should be
  bidirectional."* The funnel is now bidirectional.
- **What did not ship:** the core cannibalization mechanism — near-identical H2 phrasing and
  content between the service page and the blog cluster — is **unchanged**. Live H2s on
  `/referencement-ia` still include, verbatim:
  - "SEO classique vs référencement IA : deux logiques, un seul objectif" (full paragraph
    explainer, same content as baseline)
  - "Les 4 signaux que les IA utilisent pour vous citer" (full 4-point explainer, same content as
    baseline)

  Both H2 titles and their explanatory paragraphs are still present in full length — not trimmed
  to 1-2 sentence summaries with a "lire le guide complet →" link, which was the baseline's
  specific recommendation for de-risking on-site topical overlap. The service page's "Pour aller
  plus loin" section still links out to `/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026`
  — a dedicated blog post whose title is near-identical to the service page's own H2 — so the
  same-phrasing overlap the baseline flagged as a cannibalization risk is intact.

**Net effect:** the conversion-funnel gap (blog → no clear path to the paid service) is closed,
which was a real and valuable fix. But the underlying SEO/SXO risk the baseline called out — that
Google may pick the blog post as canonical for the explainer-level query variants, leaving the
service page under-differentiated — has not been addressed, because the explainer content still
lives on both pages in near-duplicate form.

**Verdict: PARTIALLY FIXED.** One of two recommended actions (reciprocal linking) shipped; the
other (H2/content trim-and-link-out) did not.

---

## Finding 3 — City pages duplicate service-page sections — STILL PRESENT

**Live verification (2026-08-22, `/villes/gap-hautes-alpes`):**

Live H2 structure, unchanged from baseline:

1. "Nos prestations à Gap"
2. "Pourquoi choisir une agence web locale à Gap ?"
3. "Les types d'entreprises que nous accompagnons à Gap" (unique — good, matches baseline note)
4. **"Création de site internet à Gap : ce qui est inclus"** — still present, still a
   near-duplicate of `/creation-site-internet-hautes-alpes`'s own "Ce qui est inclus" section
5. **"Tarifs pour les entreprises de Gap"** — still present, still generic pricing content
   restated with "à Gap" appended
6. "Gap et le SEO local : les requêtes à ne pas manquer" (unique — good)
7. "Comment obtenir un devis pour votre projet à Gap ?"
8. "FAQ — Agence web à Gap"

H3s under these sections still include "Combien coûte un site internet dans les Hautes-Alpes ?"
(duplicating the same FAQ content flagged in the baseline as also appearing on the service page
and on `/blog/prix-site-internet-artisan-pme-hautes-alpes`), alongside the genuinely unique
"Optimiser sa fiche GBP à Gap" H3.

Internal linking check: only **1** link from the city page to `/creation-site-internet-hautes-alpes`
was found in the live HTML — i.e., the "trim the duplicated block down to a summary + link to the
service page" recommendation was not implemented; the full duplicated sections remain intact
alongside (not instead of) a link to the service page.

**Verdict: STILL PRESENT.** No measurable change from baseline. The "types d'entreprises" and
"SEO local" unique sections the baseline praised are still there (good), but the "ce qui est
inclus" / pricing duplication the baseline flagged as the actual problem is untouched.

---

## Persona-Fit Scoring Matrix — Re-Run

Same rubric as baseline (Clarity / Trust / CTA / Relevance, 1-10 each, 40 max). Only the pages
touched by Findings 1-3 were live-refetched this pass; personas A, C, and B-alt below are
**carried forward from the baseline and not independently re-verified in this pass** (flagged in
Limitations) — only Persona B's landing page was live-refetched, since it is the page affected by
Finding #1's fix.

| Persona | Landing page | Clarity | Trust | CTA | Relevance | Total /40 | Change |
|---|---|---|---|---|---|---|---|
| **A — Artisan Local** | `/creation-site-internet-hautes-alpes` | 7 | 6 | 7 | 7 | **27** | not re-verified — carried forward |
| **B — Commerçant/PME** | `/refonte-ai-friendly` | 8 | 8 | 8 | 9 | **33** | **+1** (Trust 7→8: dedup removes the confused-internal-linking/duplicate-page risk a prospect or crawler could stumble into; title bug fix also removes a SERP-trust ding) |
| **C — Prestataire Touristique** | `/blog/reservation-directe-eviter-commissions-booking-hautes-alpes` | 8 | 6 | 4 | 9 | **27** | not re-verified — carried forward |
| **B (alt) — Commerçant (local SEO query)** | `/referencement-seo-hautes-alpes` | 7 | 6 | 7 | 8 | **28** | not re-verified — carried forward |

**Live check on `/creation-site-internet-hautes-alpes` "Ce qui est inclus" grid** (re-fetched this
pass since it's also Persona A's landing page): still Design sur-mesure / Mobile-first / Performances
/ SEO on-page / Sécurité RGPD / Mesures et suivi (GA4+GSC) — **no GBP/Google-Maps-specific bullet
was added**, so the baseline's Segment A recommendation (add "Optimisation de votre fiche Google
Business Profile incluse") has not shipped. Persona A's Trust=6 stands confirmed at 6, not
speculative — this one line item was live-verified even though the full persona re-score for A
was not redone in depth.

**Weakest persona-page fit remains Segment C, 27/40**, unchanged and not re-verified this pass —
carry the baseline's recommendation forward (add a booking/réservation-specific landing target).

---

## SXO Gap Score Recalculation: 58 → 68

Rationale for the +10:

- **+8 for Finding #1 (CRITICAL → FIXED).** This was explicitly the primary finding driving the
  baseline score down — a self-competing duplicate-intent pair with split link equity, mismatched
  nav anchors, and a weaker page live and indexable. It is now resolved via the exact mechanism
  recommended (redirect to the stronger page, title bug fixed in the same pass, sitemap clean).
  This is the single largest lever in the SXO category and justifies the largest point movement.
- **+2 for Finding #2 (HIGH → PARTIALLY FIXED).** The reciprocal-linking half of the fix closes a
  real conversion-funnel gap (blog readers now have a visible path to the paid service), which is
  a genuine SXO improvement independent of the SEO cannibalization risk. Only half credit because
  the on-site content-overlap risk that was the finding's core technical concern is unresolved.
- **+0 for Finding #3 (MEDIUM → STILL PRESENT).** No detectable change; score is not reduced
  further only because this was already priced into the baseline 58 and nothing regressed.

---

## Limitations

- This re-audit is scoped to the three baseline SXO findings and the pages/sections they name; it
  is **not** a full 7-dimension gap-score re-run or a fresh SERP pull for the target keywords —
  no new WebSearch/SERP analysis was performed this pass (baseline SERP characterization from
  2026-06-15 is assumed still valid; local-agency SERPs for these queries are low-volatility
  queries and unlikely to have shifted materially in ~10 weeks, but this is an assumption, not a
  re-verified fact).
- Personas A, C, and B (alt)'s full landing pages were **not** live-refetched this pass except for
  the single "Ce qui est inclus" grid check on `/creation-site-internet-hautes-alpes` (Persona A).
  Their scores are carried forward from the 2026-06-15 baseline and should be treated as
  provisional until a full persona-matrix re-run is done.
- The homepage sidebar submenu anchor/href mismatch (baseline Finding #1, recommendation #3) was
  not independently re-verified — the redirect makes it functionally moot for end users, but the
  underlying markup hygiene item is unconfirmed.
- No GA4/Search Console/click data was used for any persona or gap score in this pass or the
  baseline — all scoring remains qualitative, structure-and-copy-based judgment.
- Live pages were fetched via `render_page.py --mode auto` (raw fetch, `is_spa: False` confirmed
  for all 6 fetched URLs), not screenshotted — above-the-fold visual/UX verification was not
  redone this pass.
- This finding set does not re-examine the other service pages or blog posts for new
  cannibalization pairs beyond the GEO cluster spot-check inherited from the baseline; a full
  H2-overlap matrix across all 8 service pages × 13+ blog posts remains outstanding (flagged for
  `/seo content` in the baseline and still applicable).

---

*Cross-skill recommendations (updated):*
- `/seo content` — full H2/topic overlap audit across service pages and blog posts is now the
  **highest-value remaining SXO-adjacent fix**, since Finding #2's harder half (content
  de-duplication, not just linking) is still open.
- `/seo page` — city-page rewrite (Finding #3, unchanged) and the Segment C booking/réservation
  landing page gap (unchanged) remain scoped and outstanding.
- `/seo technical` — confirm the homepage sidebar submenu anchor now points directly to
  `/refonte-ai-friendly` (cosmetic/hygiene item, functionally covered by the redirect).
