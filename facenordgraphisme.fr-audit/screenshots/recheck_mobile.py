import asyncio
import os
from playwright.async_api import async_playwright

BASE = "https://www.facenordgraphisme.fr"
OUT_DIR = os.path.dirname(os.path.abspath(__file__))


async def run(dpr, label, wait_ms, scroll=False):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=dpr,
            is_mobile=True,
            has_touch=True,
            user_agent=(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
                "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            ),
        )
        page = await context.new_page()
        await page.goto(BASE + "/", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(wait_ms)
        if scroll:
            await page.evaluate("window.scrollTo(0, 100)")
            await page.wait_for_timeout(500)
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(1000)
        path = os.path.join(OUT_DIR, f"home-mobile-recheck-{label}.png")
        await page.screenshot(path=path, full_page=False)
        print(f"Saved {path}")
        await browser.close()


async def main():
    await run(dpr=1, label="dpr1", wait_ms=2500)
    await run(dpr=2, label="dpr2-longwait", wait_ms=6000)
    await run(dpr=2, label="dpr2-scroll", wait_ms=2500, scroll=True)


if __name__ == "__main__":
    asyncio.run(main())
