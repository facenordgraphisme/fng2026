# Visual / UX — facenordgraphisme.fr

**Score: 45 / 100**

**Sample reviewed:** Playwright screenshots (desktop 1440×900, mobile 390×844 / iPhone 12-class viewport) across 4 page/device pairs — home, `/prestations`, blog post, `/villes/gap-hautes-alpes` — full-page and above-the-fold captures plus structured DOM data (`facenordgraphisme.fr-audit/screenshots/capture-results.json`), 2026-06-15.

---

## What Works

- **No horizontal overflow on any of the 8 captures** — `scrollWidth === clientWidth === bodyScrollWidth` on every page/device pair (390px mobile, 1440px desktop). No layout breaks out of viewport.
- **Cookie-consent banner renders correctly and accessibly on mobile** — visible "Refuser" / "Accepter" buttons with a clear privacy-policy link, positioned at the bottom of the viewport without blocking the primary content.
- **Desktop layouts are clean and well-composed** — left sidebar navigation (Accueil, À Propos, Prestations, Portfolio, Blog, FAQ, Contact), centered hero copy, no visible rendering artifacts on any of the 4 desktop captures (home, prestations, blog-post, ville-gap).
- **Page-specific `<h2>`/heading content is legible and well-sized** on both devices — typography hierarchy (large serif/sans display headline, readable body copy) is consistent across page types.
- **No JavaScript runtime errors** (`page_errors: []`) on any of the 8 captures — only console *warnings*, no crashes.

---

## Findings

### 1. CRITICAL — Large black rendering artifacts cover the top-right of the mobile homepage, above the fold

**Severity:** Critical

**Description:**
`screenshots/home-mobile-fold-top-crop.png` (and the full `home-mobile-fold.png`) show **large, solid-black rectangular blocks** overlaying the top portion of the mobile homepage — directly above and overlapping the hero headline ("Propulsez votre entreprise vers de nouveaux sommets") and the cookie banner area. This is visually jarring: it looks broken to any visitor landing on the homepage on a mobile device, which (per Performance findings) is the majority of traffic for this site's target queries.

This is the **single most damaging issue in the entire audit from a first-impression / trust standpoint** — a prospective client evaluating a *web design agency's own homepage* on their phone sees a visibly broken render.

**Likely root cause (cross-referencing `capture-results.json`):** the `home-mobile` canvas reports `w: 780, h: 1688` while the CSS viewport `rect` is `390×844` — exactly **2x** in both dimensions. This is the canvas's *internal/backing* resolution vs. its *displayed* CSS size, consistent with a `devicePixelRatio: 2` mobile emulation. The black blocks are consistent with a **WebGL canvas that has resized its drawing buffer for the 2x DPR but failed to update its viewport/projection or clear correctly**, leaving stale/unrendered regions of the backing buffer visible as solid black — a known class of bug in `@react-three/fiber`/three.js when a resize handler doesn't call `renderer.setSize()` with the `updateStyle` flag correctly or doesn't call `renderer.setPixelRatio()` before the first resize.

Notably, `prestations-mobile`, `blog-post-mobile`, and `ville-gap-mobile` all report the **same** `canvas: { w: 780, h: 1688 }` at the same `rect: 390×844` — i.e., **every mobile page has the same 2x canvas**, but the black-block artifact was only visually confirmed on the **home** mobile screenshot. This suggests the bug is either intermittent (timing-dependent on first paint) or the 3D scene is only actually populated/rendered on the homepage (other pages may have an empty/transparent canvas of the same dimensions that happens not to show the artifact).

**Recommendation:**
1. Reproduce locally: open the homepage in Chrome DevTools mobile emulation (iPhone 12, DPR 2) and hard-refresh — check whether the black blocks appear consistently or only on first load / after a resize event.
2. In the three.js/`@react-three/fiber` setup, verify the resize handler calls `renderer.setPixelRatio(window.devicePixelRatio)` **before** `renderer.setSize(width, height, false)` (the `updateStyle=false` argument prevents three.js from fighting CSS-controlled canvas sizing), and that `camera.updateProjectionMatrix()` is called after any size change.
3. Check whether `renderer.setClearColor`/`alpha` is configured — if the canvas background defaults to opaque black and a resize leaves part of the buffer uncleared/unrendered, that uncleared region stays black.
4. Re-test with `device_scale_factor=1` (as was in progress when this audit's automated capture was interrupted) to confirm whether the artifact is DPR-dependent — if it disappears at DPR 1, that confirms the resize/DPR hypothesis above and narrows the fix to the resize handler.
5. This should be treated as a **P0 visual bug fix** — independent of the SEO audit, it likely affects real visitor conversion on mobile.

---

### 2. HIGH — Duplicate "Face Nord" H1 is visually confirmed on every sampled page/device

**Severity:** High

**Description:**
`capture-results.json` confirms the technical finding (Technical Finding #3) visually: every one of the 8 captures has two `<h1>` elements, the first always reading "Face Nord" at consistent coordinates — desktop `x:360, y:327` (part of the left-sidebar branding), mobile `x:94, y:355` (centered, appears to be a mobile-only branding lockup). Visually, on mobile this "Face Nord" heading sits *between* the page-specific H1 and the fold, competing for the limited above-the-fold space with the actual page headline.

**Recommendation:**
See Technical Finding #3 (demote to non-heading element). From a visual standpoint specifically: on mobile, removing/demoting this element may also **recover above-the-fold vertical space** for the page-specific headline and CTA, which is valuable real estate at 390×844.

---

### 3. MEDIUM — Console warnings present on every page: deprecated THREE.Clock API and GPU stalls on desktop home

**Severity:** Medium

**Description:**
Every one of the 8 captures logs:
```
THREE.THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
```
(Note the doubled "THREE.THREE." — likely an import/namespace issue in addition to the deprecation itself.)

Additionally, `home-desktop` logs **4 repeated GPU driver warnings**:
```
[.WebGL-...]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels
```
"GPU stall due to ReadPixels" indicates the page is synchronously reading pixel data back from the GPU (e.g., for a screenshot/texture-readback operation in the 3D scene), which blocks the rendering pipeline — a known performance anti-pattern in WebGL apps, and consistent with the elevated TBT on mobile home (Performance Finding #1).

**Recommendation:**
1. Update the three.js usage to `THREE.Timer` per the deprecation notice (low-effort, future-proofing against a breaking removal in a later three.js major version).
2. Locate the `readPixels`/`gl.readPixels` call (likely inside a post-processing effect, screenshot/texture-capture utility, or a `gl.getError()`-adjacent debug call left in production) and remove or gate it behind a dev-only flag — this directly reduces main-thread blocking on the homepage.

---

## Priority Action Summary

1. **[Critical]** Fix the black WebGL canvas artifact on mobile homepage above the fold (Finding #1) — reproduce with DPR 1 vs 2, fix the three.js resize/pixel-ratio handling.
2. **[High]** Demote the duplicate "Face Nord" H1 (Finding #2, cross-ref Technical Finding #3) — also recovers mobile above-the-fold space.
3. **[Medium]** Replace deprecated `THREE.Clock` with `THREE.Timer` and remove/gate the `gl.readPixels` call causing GPU stalls on desktop home (Finding #3).
