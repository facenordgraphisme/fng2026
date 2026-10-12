# Performance (Core Web Vitals) — facenordgraphisme.fr
## DRIFT RE-AUDIT vs baseline 2026-06-15 (score 68/100)

**New Score: 60 / 100** (down from 68/100 baseline — regression, not improvement)

**Sample reviewed:** Lighthouse CLI v13.4.1, lab data, live-URL runs covering 3 page types × 2 devices — home (`/`), service (`/prestations`), blog (`/blog/guide-creation-site-internet-artisan-hautes-alpes`) on desktop and mobile (default Lighthouse mobile emulation), 2026-08-22. Raw JSON: `facenordgraphisme.fr-audit/findings-2026-08-22/lighthouse-{home,service,blog}-{desktop,mobile}.json` (plus `-rerun` files for home-mobile and service-mobile, see methodology note below).

---

## Methodology Note — CPU Contention / Run-to-Run Variance

During this audit, ~28-29 concurrent Chrome processes were observed on the host machine (parallel audit agents doing screenshots/rendering for other categories), which is known to inflate Lighthouse's main-thread-timing metrics (TBT in particular, LCP to a lesser extent) via noisy-neighbor CPU contention. To compensate:
- **Home mobile** and **service mobile** were each run twice. The table below reports the second (less-contended) run as the primary figure, with the first run's TBT noted as a worst-case data point.
- **Blog mobile** was only run once; treat its TBT figure with the same caveat.
- **LCP was consistent across both runs on both re-tested pages** (home: 4.42s then 4.23s; service: 4.40s then 4.12s) — this metric is not contention-sensitive in the same way, so the "LCP is still poor everywhere on mobile" conclusion is high-confidence despite the variance.
- Desktop runs were not repeated; contention affects desktop scores far less because desktop CPU throttling multiplier is 1x vs mobile's 4x, and desktop was already near-ceiling in the baseline.

---

## Lighthouse Results Summary

| Page | Device | Performance | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| Home | Desktop | **0.98** | 0.31s | 0.82s | 66ms | 0.007 |
| Home | Mobile | **0.70** (run1: 0.57) | 1.03s | **4.23s** (run1: 4.42s) | 613ms (run1: **1538ms**) | 0 |
| Service (`/prestations`) | Desktop | **1.00** | 0.29s | 0.82s | 10.5ms | 0.007 |
| Service (`/prestations`) | Mobile | **0.81** (run1: 0.69) | 1.03s | **4.12s** (run1: 4.40s) | 262ms (run1: 435ms) | 0 |
| Blog post | Desktop | **0.99** | 0.36s | 0.87s | 38ms | 0.007 |
| Blog post | Mobile | **0.77** | 1.08s | **4.66s** | 250ms | 0 |

**Google CWV thresholds:** LCP good ≤2.5s / needs-improvement ≤4.0s / poor >4.0s. TBT (lab proxy for INP) good <200ms / needs-improvement <600ms. CLS good <0.1.

**Unused JavaScript (estimated savings, `unused-javascript` audit):**

| Page | Device | Unused JS (baseline 06-15) | Unused JS (now) |
|---|---|---|---|
| Home | Desktop | 106 KiB | 96 KiB |
| Home | Mobile | 98 KiB | 98 KiB |
| Service | Desktop | 98 KiB | 70 KiB |
| Service | Mobile | 121 KiB | 106 KiB |
| Blog | Desktop | 98 KiB | 106 KiB |
| Blog | Mobile | 114 KiB | 106 KiB |

---

## What Works (Confirmed Unchanged)

- **Desktop performance remains essentially perfect across all 3 page types** (0.98–1.00, service page still a flat 1.00). FCP ≤0.36s, LCP ≤0.87s, TBT ≤66ms on desktop everywhere — no regression here.
- **CLS remains excellent on every page and device** (0.000–0.007) — actually slightly more consistent than baseline's 0.004–0.013 range. No layout-shift regressions.
- **FCP remains good even on mobile** (1.03–1.08s across all 3 mobile runs, essentially flat vs baseline's 0.9–1.2s) — first paint is still fast; the problem remains fully isolated to interactivity/full-load metrics.

---

## Findings

### 1. HIGH (STILL PRESENT, and mildly worse) — Mobile LCP is now "Poor" on ALL THREE tested pages, not just home and blog

**Severity:** High

**Baseline claim:** Mobile homepage LCP 4.3s ("Poor"), TBT 420ms, performance 0.74 — flagged as likely caused by the unoptimized/non-deferred three.js WebGL hero blocking the main thread on mobile. Service page mobile LCP was 3.0s ("needs improvement," not yet poor).

**Current status: NOT FIXED.** There is no evidence of `next/dynamic`-deferred hero loading, `IntersectionObserver`-gated mounting, or any other mitigation having shipped:
- Home mobile LCP: 4.23–4.42s across two runs (baseline: 4.3s) — unchanged, still poor.
- Blog mobile LCP: 4.66s (baseline: 4.1s) — **worse**, still poor.
- **Service mobile LCP: 4.12–4.40s (baseline: 3.0s) — crossed from "needs improvement" into the "poor" band.** This is a real regression, not just noise — even the better of the two re-tested runs (4.12s) exceeds the 4.0s poor threshold that the baseline run didn't cross.
- Mobile TBT also remains in the concerning range: home 613ms–1538ms (baseline 420ms; even the best-case re-run, 613ms, is worse and now crosses into "poor" per the 600ms informal poor-TBT line), service 262–435ms (baseline 230ms, essentially flat/slightly worse), blog 250ms (baseline 260ms, flat).

**Interpretation:** Nothing about the mobile-hero-blocking-main-thread problem has been addressed since June. If anything, the site has drifted slightly worse on mobile — most notably the service page, which used to be the strongest mobile performer and has now dropped a full CWV band on LCP. This is consistent with either (a) no deferred-loading work having been done, or (b) new JS/dependency weight having been added since June without corresponding mobile optimization.

**Recommendation (unchanged from baseline, now more urgent given the service-page regression):**
1. Defer/lazy-mount the three.js WebGL hero via `next/dynamic({ ssr: false })` gated on `requestIdleCallback`/`IntersectionObserver` so it initializes after the LCP element paints, on all pages that render it — not just home.
2. Verify what the actual `largest-contentful-paint-element` audit reports as the LCP node in the current build (the JSON's `largest-contentful-paint-element` detail was empty/undefined in this run's output — worth checking with `lighthouse --view` locally to confirm it's still the hero/canvas region and not a new regression source).
3. Re-test after any hero-loading change specifically on `/prestations` given it just crossed into the poor band — this page should be the fastest win since it was closest to "good" at baseline.

---

### 2. MEDIUM (STILL PRESENT, essentially unchanged) — 70-106 KiB of unused JavaScript shipped on every page

**Severity:** Medium

**Baseline claim:** 98-121 KiB of unused JS flagged as shared-bundle weight (three.js/@react-three/fiber/drei + GSAP + Lenis) loaded on every page regardless of need.

**Current status: NOT FIXED**, though the range has narrowed slightly (70-106 KiB vs baseline's 98-121 KiB — home desktop down 10 KiB, service desktop down 28 KiB, service/blog mobile down ~8-15 KiB each). This is a minor improvement in magnitude but not a structural fix — every single page/device combination still shows 70+ KiB of unused JS, and the consistency of the figure across unrelated page types (home/service/blog) still points to the same root cause: shared-bundle weight from heavy client libraries that isn't being code-split per route. No evidence of `next/dynamic` route-level splitting of three.js/GSAP/Lenis was found in the Lighthouse output (the audit doesn't change shape — same libraries, same "every page pays the cost" pattern).

**Recommendation (unchanged from baseline):**
1. Run `@next/bundle-analyzer` against the current build to confirm three.js/GSAP/Lenis chunk boundaries.
2. Move the 3D hero and any GSAP/Lenis scroll-effects to `next/dynamic` imports scoped to only the routes/components that use them, so pages like `/blog/{slug}` and `/mentions-legales`-type pages don't download the same JS payload as the homepage.

---

### 3. Confirmed Unchanged — Desktop near-perfect, CLS excellent everywhere

**Severity:** N/A (positive finding)

Desktop scores (0.98-1.00) and CLS (0.000-0.007 across the board, mobile CLS flat 0) are confirmed still true and, if anything, slightly more consistent than the baseline's 0.004-0.013 CLS range. No action needed here.

---

## Priority Action Summary

1. **[High]** Defer/lazy-mount the 3D WebGL hero so it loads after LCP on mobile (Finding #1) — still the highest-impact unresolved fix from the baseline, now more urgent given the service-page regression from "needs improvement" to "poor."
2. **[Medium]** Code-split three.js/GSAP/Lenis out of the shared bundle (Finding #2) — still unresolved; the ~10-20% reduction in unused-JS bytes is not evidence of a structural fix.
3. **[Low]** Investigate whether any new dependency/feature shipped between 2026-06-15 and 2026-08-22 explains the service-page mobile LCP regression (3.0s → 4.1-4.4s) — check recent commits touching `/prestations` or shared layout/hero components.
