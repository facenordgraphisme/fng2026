import asyncio
import json
import os
from playwright.async_api import async_playwright

BASE = "https://www.facenordgraphisme.fr"
PAGES = [
    ("home", "/"),
    ("prestations", "/prestations"),
    ("blog-post", "/blog/guide-creation-site-internet-artisan-hautes-alpes"),
    ("ville-gap", "/villes/gap-hautes-alpes"),
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
}

OUT_DIR = os.path.dirname(os.path.abspath(__file__))

async def capture_page(browser, name, path, viewport_name, viewport, results):
    context = await browser.new_context(
        viewport=viewport,
        device_scale_factor=2 if viewport_name == "mobile" else 1,
        is_mobile=(viewport_name == "mobile"),
        has_touch=(viewport_name == "mobile"),
        user_agent=(
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
            "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            if viewport_name == "mobile"
            else None
        ),
    )
    page = await context.new_page()

    console_msgs = []
    page_errors = []

    page.on("console", lambda msg: console_msgs.append({"type": msg.type, "text": msg.text}))
    page.on("pageerror", lambda exc: page_errors.append(str(exc)))

    url = BASE + path
    key = f"{name}-{viewport_name}"
    print(f"Loading {url} ({viewport_name})...")

    try:
        await page.goto(url, wait_until="networkidle", timeout=60000)
    except Exception as e:
        print(f"  navigation warning: {e}")
        try:
            await page.wait_for_timeout(3000)
        except Exception:
            pass

    # Give 3D hero / animations time to settle
    await page.wait_for_timeout(2500)

    # check for horizontal overflow
    try:
        overflow = await page.evaluate(
            "() => ({ scrollWidth: document.documentElement.scrollWidth, "
            "clientWidth: document.documentElement.clientWidth, "
            "bodyScrollWidth: document.body.scrollWidth })"
        )
    except Exception as e:
        overflow = {"error": str(e)}

    # check H1 count and text
    try:
        h1s = await page.evaluate(
            "() => Array.from(document.querySelectorAll('h1')).map(h => ({"
            "text: h.textContent.trim(), "
            "visible: h.offsetParent !== null, "
            "rect: (() => { const r = h.getBoundingClientRect(); return {x: r.x, y: r.y, w: r.width, h: r.height}; })()"
            "}))"
        )
    except Exception as e:
        h1s = [{"error": str(e)}]

    # check canvas presence (3D hero) for homepage
    try:
        canvas_info = await page.evaluate(
            "() => Array.from(document.querySelectorAll('canvas')).map(c => ({"
            "w: c.width, h: c.height, "
            "rect: (() => { const r = c.getBoundingClientRect(); return {x: r.x, y: r.y, w: r.width, h: r.height}; })()"
            "}))"
        )
    except Exception as e:
        canvas_info = [{"error": str(e)}]

    # Screenshot above-the-fold (viewport only, not full page)
    fold_path = os.path.join(OUT_DIR, f"{name}-{viewport_name}-fold.png")
    await page.screenshot(path=fold_path, full_page=False)

    # Full page screenshot
    full_path = os.path.join(OUT_DIR, f"{name}-{viewport_name}.png")
    try:
        await page.screenshot(path=full_path, full_page=True, timeout=30000)
    except Exception as e:
        print(f"  full page screenshot failed: {e}, retrying with smaller height cap")
        try:
            await page.screenshot(path=full_path, full_page=True, timeout=60000, animations="disabled")
        except Exception as e2:
            print(f"  retry failed too: {e2}")
            full_path = None

    results[key] = {
        "url": url,
        "viewport": viewport,
        "overflow": overflow,
        "h1s": h1s,
        "canvas": canvas_info,
        "console_errors": [m for m in console_msgs if m["type"] in ("error", "warning")],
        "console_all_count": len(console_msgs),
        "page_errors": page_errors,
        "fold_screenshot": fold_path,
        "full_screenshot": full_path,
    }

    await context.close()


async def main():
    results = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, path in PAGES:
            for vp_name, vp in VIEWPORTS.items():
                await capture_page(browser, name, path, vp_name, vp, results)
        await browser.close()

    out_json = os.path.join(OUT_DIR, "capture-results.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"Done. Results written to {out_json}")


if __name__ == "__main__":
    asyncio.run(main())
