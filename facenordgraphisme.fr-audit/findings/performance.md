# Performance (Core Web Vitals) — facenordgraphisme.fr

**Score: 68 / 100**

**Sample reviewed:** Lighthouse CLI v13.4.0, lab data, 6 runs covering 3 page types × 2 devices — home (`/`), service (`/prestations`), blog (`/blog/guide-creation-site-internet-artisan-hautes-alpes`) on desktop and mobile presets (`facenordgraphisme.fr-audit/findings/lighthouse-*.json`, 2026-06-15).

---

## Lighthouse Results Summary

| Page | Device | Performance | FCP | LCP | TBT | CLS | Speed Index | TTI |
|---|---|---|---|---|---|---|---|---|
| Home | Desktop | **0.99** | 0.3s | 0.8s | 10ms | 0.004 | 1.0s | 1.1s |
| Home | Mobile | **0.74** | 1.2s | **4.3s** | **420ms** | 0 | 3.5s | 4.8s |
| Service (`/prestations`) | Desktop | **1.00** | 0.3s | 0.8s | 10ms | 0.013 | 0.7s | 0.9s |
| Service (`/prestations`) | Mobile | **0.90** | 1.0s | 3.0s | 230ms | 0 | 2.1s | 4.6s |
| Blog post | Desktop | **0.99** | 0.3s | 0.9s | 10ms | 0.007 | 0.9s | 0.9s |
| Blog post | Mobile | **0.81** | 0.9s | 4.1s | 260ms | 0 | 3.0s | 4.8s |

**Google CWV thresholds for reference:** LCP good ≤2.5s / needs-improvement ≤4.0s / poor >4.0s. TBT (lab proxy for INP) good <200ms / needs-improvement <600ms. CLS good <0.1.

---

## What Works

- **Desktop performance is essentially perfect across all 3 page types** (0.99-1.00, with `/prestations` scoring a flat 1.00). FCP ≤0.3s, LCP ≤0.9s, TBT ≤10ms, TTI ≤1.1s on desktop everywhere.
- **CLS (layout shift) is excellent on every page and device** (0.000-0.013, all far under the 0.1 "good" threshold) — no jank from late-loading fonts, images, or the 3D hero injecting layout shifts.
- **FCP is good-to-excellent even on mobile** (0.9-1.2s across all 3 mobile runs) — the initial paint is fast; the gap is entirely in *interactivity and full-load* metrics (LCP/TBT/TTI), not first paint.
- **Service page mobile (0.90) is the strongest mobile score** — LCP 3.0s and TBT 230ms are both in the "needs improvement" band but close to "good", suggesting the 3D hero / heavy JS impact varies by page and isn't uniformly catastrophic.

---

## Findings

### 1. HIGH — Mobile homepage LCP (4.3s) falls into Google's "Poor" band

**Severity:** High

**Description:**
The homepage is the most important page for first impressions, ad landing, and most organic entry points — and it has the **worst mobile performance score of the three tested pages (0.74)**, driven by:
- **LCP 4.3s** — exceeds the 4.0s "poor" threshold (vs. "good" ≤2.5s). On mobile networks/devices, the largest above-the-fold element (almost certainly the 3D WebGL hero or its background) takes over 4 seconds to render.
- **TBT 420ms** — well into "needs improvement" (good <200ms), meaning the main thread is busy long enough that the page feels unresponsive to early taps/scrolls.
- **TTI 4.8s** — the page isn't fully interactive until nearly 5 seconds on mobile.

This directly affects mobile Core Web Vitals as measured by Google (mobile-first indexing means this page's mobile CWV — not desktop — is what counts for ranking), and affects real visitors: most local-search traffic for "création site internet Hautes-Alpes"-type queries will be on mobile.

**Recommendation:**
1. Defer/lazy-load the three.js WebGL hero so it initializes **after** the LCP element (likely the H1 + intro text) has painted — e.g., render the hero canvas with `next/dynamic` + `ssr: false` and a lightweight CSS/gradient placeholder, only mounting the Three.js scene after `requestIdleCallback` or an `IntersectionObserver` trigger.
2. Confirm the LCP element itself: run `lighthouse --view` or check the `largest-contentful-paint-element` audit detail in `lighthouse-home-mobile.json` to identify exactly what's being measured — if it's an image, ensure it's served via Next.js `<Image>` with `priority` and a properly-sized mobile variant; if it's the canvas/hero text behind the canvas, the deferred-mount approach above is the fix.
3. Reduce TBT by code-splitting non-critical JS (see Finding #2) so less work competes with rendering during the critical window.

---

### 2. MEDIUM — 98-121 KiB of unused JavaScript shipped on every page

**Severity:** Medium

**Description:**
Every one of the 6 Lighthouse runs flags the `unused-javascript` audit with estimated savings:

| Page | Device | Unused JS |
|---|---|---|
| Home | Desktop | 106 KiB |
| Home | Mobile | 98 KiB |
| Service | Desktop | 98 KiB |
| Service | Mobile | **121 KiB** |
| Blog | Desktop | 98 KiB |
| Blog | Mobile | 114 KiB |

The consistency across page types (98-121 KiB on every page) suggests this is **shared bundle weight** — most likely the combination of `three.js` + `@react-three/fiber`/`drei`, GSAP, Lenis, and styled-components' runtime, all loaded on every page regardless of whether that page's hero actually needs the 3D scene (e.g., do inner pages like `/mentions-legales` or `/blog/{slug}` need the same JS payload as the homepage?).

**Recommendation:**
1. Audit which pages actually render the 3D hero (`HomeHero.tsx` / equivalent) vs. which inherit it from a shared layout unnecessarily — if it's only meant for `/`, ensure it's not bundled into the shared layout chunk that every route downloads.
2. Use `next build` bundle analysis (`@next/bundle-analyzer`) to confirm which chunks contain three.js/GSAP/Lenis and whether they're being shipped to pages that don't use them.
3. For pages that genuinely need the 3D hero, consider `next/dynamic` imports so the three.js bundle is a separate chunk loaded only when needed, not part of the main/shared bundle.

---

### 3. MEDIUM — Blog and service pages show the same mobile LCP/TTI pattern as home, at lower severity

**Severity:** Medium

**Description:**
Blog post mobile: LCP 4.1s (poor, just under home's 4.3s), TBT 260ms, TTI 4.8s — performance score 0.81.
Service page mobile: LCP 3.0s (needs improvement), TBT 230ms, TTI 4.6s — performance score 0.90.

Both follow the same shape as the homepage (good FCP, poor LCP/TTI) at progressively lower severity, reinforcing that this is a **sitewide shared-bundle/hero issue** (Finding #1 + #2) rather than a homepage-specific one — fixing the shared root cause should lift all three page types together.

**Recommendation:**
No separate action — this is evidence supporting the priority of Findings #1 and #2. Re-run Lighthouse on all 3 page types after implementing the deferred-hero and bundle-splitting fixes to confirm uniform improvement.

---

## Priority Action Summary

1. **[High]** Defer/lazy-mount the 3D WebGL hero so it loads after LCP on mobile (Finding #1) — highest-impact single fix, directly targets the homepage's 4.3s mobile LCP.
2. **[Medium]** Code-split three.js/GSAP/Lenis out of the shared bundle so pages that don't use the 3D hero don't pay its ~100 KiB JS cost (Finding #2).
3. **[Medium]** Re-test all 3 page types on mobile after #1/#2 to confirm the shared fix lifts blog and service page scores too (Finding #3).
