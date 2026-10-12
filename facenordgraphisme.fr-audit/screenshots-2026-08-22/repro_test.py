import asyncio
import os
from playwright.async_api import async_playwright

BASE = "https://www.facenordgraphisme.fr/"
OUT_DIR = os.path.dirname(os.path.abspath(__file__))

async def run_once(browser, i):
    context = await browser.new_context(
        viewport={"width": 390, "height": 844},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent=(
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
            "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        ),
    )
    page = await context.new_page()
    await page.goto(BASE, wait_until="networkidle", timeout=60000)
    await page.wait_for_timeout(2500)
    path = os.path.join(OUT_DIR, f"repro-{i}-t0.png")
    await page.screenshot(path=path, full_page=False)
    # take again after additional wait to see if it clears
    await page.wait_for_timeout(2000)
    path2 = os.path.join(OUT_DIR, f"repro-{i}-t1.png")
    await page.screenshot(path=path2, full_page=False)
    await context.close()
    print(f"run {i} done")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for i in range(5):
            await run_once(browser, i)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
