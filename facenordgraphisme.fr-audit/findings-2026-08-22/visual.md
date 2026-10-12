# Visual / UX — facenordgraphisme.fr — DRIFT RE-AUDIT (2026-08-22)

**Score: 52 / 100** (baseline 2026-06-15: 45/100)

**Sample reviewed:** Fresh Playwright screenshots (desktop 1440×900 DPR1, mobile 390×844 DPR2 / iPhone 12-class viewport, iOS Safari UA) across 3 page/device pairs — home, `/prestations`, blog post (`/blog/guide-creation-site-internet-artisan-hautes-alpes`) — full-page and above-the-fold captures, plus structured DOM data (`facenordgraphisme.fr-audit/screenshots-2026-08-22/capture-results-2026-08-22.json`). Additionally ran a **5x reproducibility test** on the mobile homepage specifically, capturing the fold twice per page load (once at ~2.5s post-load, once at ~4.5s post-load) to determine whether the baseline's black-artifact bug is a persistent render defect or a load-timing race condition. All raw screenshots saved to `facenordgraphisme.fr-audit/screenshots-2026-08-22/`.

---

## Headline: Black WebGL Artifact — STILL PRESENT (but now confirmed transient, not permanent)

**Severity:** Critical (unchanged)

The baseline's #1 finding — large solid-black rectangular blocks overlaying the top-right of the page above the fold — **is still reproducible today**. It was NOT fixed.

**New evidence from this re-audit:**

1. **Canvas backing-buffer mismatch is unchanged.** On mobile, every page's `<canvas>` still reports `w:780, h:1688` against a CSS/`rect` size of `390×844` — exactly 2x, matching `devicePixelRatio: 2`. This is byte-for-byte identical to the baseline's finding six weeks ago. No fix to the resize/DPR handling has shipped.

2. **The artifact is now confirmed to be a transient first-paint race condition, not a persistent broken render.** A 5-run reproducibility test on `home-mobile` (fresh page load each time, screenshot at t≈2.5s and again at t≈4.5s) showed:
   - **5/5 runs**: black block(s) visible in the top-right corner at t≈2.5s (varying in size/shape between runs — sometimes a single large block, sometimes two smaller stacked blocks).
   - **5/5 runs**: the SAME page, ~2 seconds later with no interaction, renders **cleanly** with no black block.
   - See `screenshots-2026-08-22/contact-sheet-top.png` for a side-by-side of all 10 captures (5× t0 / 5× t1, alternating rows) — the pattern is 100% consistent.
   - This strongly confirms the original hypothesis: a WebGL canvas resize/clear race during initial mount (backing buffer allocated before the correct DPR/viewport is applied, showing stale/uncleared buffer content as black) that self-corrects once the renderer's first proper frame paints ~2s later.

3. **New scope finding: the same transient black block also appears on desktop** (DPR 1, no canvas-size mismatch there — canvas reports `1440×900` matching the CSS viewport 1:1), on **all three tested pages** (home, prestations, blog-post), not just the homepage. See `home-desktop-fold.png`, `prestations-desktop-fold.png`, `blog-post-desktop-fold.png` — all show a black rectangle sliced by the top edge of the viewport. Since desktop's canvas dimensions are NOT mismatched (1:1 DPR), this indicates the black-block-at-first-paint behavior is not purely a DPR/backing-buffer bug — it's a broader "something renders/positions incorrectly for ~2 seconds after every page load, on every page, at every viewport" issue, of which the mobile 2x DPR canvas mismatch may be one contributing factor but not the sole cause. This widens the likely root-cause surface (candidates: an off-canvas nav drawer or 3D scene container briefly rendered full-size/full-opacity before its transition/hide logic runs, a fixed-position child of the canvas wrapper animating into place, or the canvas element itself painting a stale buffer frame before the first real render call).

**Real-world impact:** Because the artifact self-heals within ~2-4 seconds, it is less severe than the baseline's framing implied ("looks broken" is technically only true for the first couple of seconds after load) — but this is still squarely inside or beyond typical mobile LCP/TTI windows on real-world 4G connections, meaning a meaningful share of real visitors will land on the homepage and see black blocks covering part of the hero during their first impression, especially anyone who screenshots the page quickly, has a slower device/connection, or simply looks at their phone the moment the page "appears" to have loaded (text visible, layout stable) while the canvas is still mid-race.

**Recommendation (updated):**
1. This is now precisely diagnosed as a **load-time race**, not a resize bug per se — since it resolves without any resize/interaction, the fix should target **initial mount sequencing**: ensure the WebGL canvas (or whatever element renders black) is not painted/visible until its first real frame is ready (e.g., render into an offscreen/hidden canvas first, or gate `opacity`/`visibility` on a "ready" callback from the 3D scene, rather than showing the canvas element immediately on mount).
2. Since the effect reproduces on desktop too (where DPR is 1:1), do NOT assume fixing the mobile DPR/backing-buffer mismatch alone will resolve this — investigate the shared mount/paint sequencing across viewports first, then verify the mobile-specific 2x canvas-buffer detail as a secondary/compounding factor.
3. Still recommend the original three.js remediation steps (verify `renderer.setPixelRatio()` ordering relative to `renderer.setSize()`, confirm `camera.updateProjectionMatrix()` after resize) as they remain unaddressed and the canvas dimension mismatch persists unchanged from baseline.
4. Treat as P0 — six weeks after being flagged as the top visual/first-impression issue on the audit, it is unresolved and now confirmed to affect desktop as well as mobile, and all three sampled page types, not just the homepage.

---

## Findings

### 1. CRITICAL — Black WebGL/render artifact at first paint — STILL PRESENT, now confirmed transient + wider scope
See headline section above. Score-relevant: unresolved P0, same root symptom (canvas 2x DPR mismatch unchanged), newly confirmed on desktop and on all 3 sampled pages.

### 2. FIXED — Duplicate "Face Nord" `<h1>` sitewide
**Severity (baseline):** High → **Status: RESOLVED**

Baseline Finding #2 confirmed every one of 8 captures had two `<h1>` elements — a "Face Nord" branding heading plus the page-specific headline — with the duplicate eating above-the-fold mobile space between the branding lockup and the real headline.

This re-audit's DOM extraction (`capture-results-2026-08-22.json`) shows **exactly one `<h1>` per page on all 6 re-tested page/device pairs** (home, prestations, blog-post × desktop/mobile), and it is always the page-specific headline (e.g., "Propulsez votre entreprise vers de nouveaux sommets" on home). The "Face Nord" branding lockup is still visually present in the header (see `home-mobile-fold-top-crop.png` — "FACE NORD GRAPHISME" logo at top), but it is no longer marked up as an `<h1>`, so it no longer competes with the page headline for heading semantics or (per the original hypothesis) squeezes the real headline further down the mobile fold.

**Confirmed visually:** on mobile, the page-specific H1 now sits noticeably higher (`y: 247` on home-mobile vs. baseline's `y: 266` for the second H1 previously) — a modest ~19px recovery of above-the-fold vertical space, consistent with removing the duplicate heading's layout footprint.

**No further action needed** on this item — cross-reference Technical re-audit to confirm the same duplicate-H1 fix if that category re-audits the DOM independently.

### 3. MEDIUM — Console warnings — UNCHANGED, still present on every page
**Severity:** Medium (unchanged)

Every one of the 6 re-tested captures still logs:
```
THREE.THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
```
(the doubled "THREE.THREE." namespace artifact is also unchanged).

`home-desktop` still logs the same **4 repeated GPU driver warnings**:
```
[.WebGL-...]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
```
Identical pattern and count to baseline (5 total console entries on home-desktop: 1 deprecation + 4 GPU-stall warnings). No remediation has shipped for either item.

**Recommendation:** unchanged from baseline — migrate to `THREE.Timer`, locate and remove/gate the `gl.readPixels` call.

### 4. No horizontal overflow — CONFIRMED CLEAN (unchanged)
All 6 re-tested captures report `scrollWidth === clientWidth === bodyScrollWidth` (390px mobile / 1440px desktop). No regression.

### 5. Cookie-consent banner — CONFIRMED WORKING (unchanged)
Visually re-verified on mobile fold screenshots for all 3 pages (`home-mobile-fold.png`, `prestations-mobile-fold.png`, `blog-post-mobile-fold.png`): clear "Nous utilisons des cookies..." copy, working "Refuser"/"Accepter" buttons with adequate size and contrast, privacy-policy link, positioned at the bottom without blocking primary content. No regression.

### 6. Desktop layout — CONFIRMED CLEAN (unchanged)
Sidebar navigation, hero copy, and page-specific content all render cleanly with no layout breaks on desktop across all 3 re-tested pages, aside from the transient black block noted in Finding #1 (which self-clears).

---

## Priority Action Summary

1. **[Critical, unresolved]** Fix the black render artifact at first paint (Finding #1) — now diagnosed as a mount/paint-sequencing race (not resize-dependent), reproducible 5/5 on mobile home and confirmed on desktop + all 3 sampled pages. This remains the top P0 visual bug.
2. **[Resolved]** Duplicate "Face Nord" `<h1>` — fixed since baseline (Finding #2). No action needed; recommend cross-checking Technical audit for confirmation.
3. **[Medium, unresolved]** Replace deprecated `THREE.Clock` with `THREE.Timer` and remove/gate the `gl.readPixels` call causing GPU stalls on desktop home (Finding #3) — unchanged from baseline, still open.

---

## Score Rationale

Baseline: 45/100. Re-audit: **52/100** (+7).

- **+~10-12 pts:** Duplicate H1 fully resolved sitewide — removes a High-severity finding and recovers above-the-fold mobile space.
- **0 pts (no change):** Horizontal overflow, cookie banner, desktop layout cleanliness — all remain clean, already credited at baseline.
- **-~3-5 pts:** The critical black-artifact bug remains fully unresolved at its root (identical 2x canvas/DPR mismatch persists), AND this re-audit discovered the same symptom on **desktop** (not previously observed there) and confirmed it hits **all three** sampled page types rather than only the homepage — a wider blast radius than baseline understood, partially offsetting the "it's transient, not permanent" mitigating context.
- **Net effect:** Score moves up modestly because one of two major findings is genuinely fixed, but the site's single most damaging first-impression bug — six weeks later — is unresolved and now known to be broader in scope than originally documented. This should still be treated as the top-priority item blocking a materially higher score.
