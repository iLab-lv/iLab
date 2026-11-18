'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(path.join(os.tmpdir(), 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_ADS_V3_BASE || 'http://localhost:3116';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const out = path.resolve('tmp/ads-v3-rulers');
fs.mkdirSync(out, { recursive: true }); fs.writeFileSync(path.join(out, '.gitignore'), '*\n');
const report = { viewports: [], regressions: [], errors: [] };
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.route('**/*', route => ['localhost', '127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.fulfill({ status: 200, body: '' }));
    await context.route('**/api/booking', route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    const metrics = () => page.locator('[data-service-rulers]').evaluate(root => {
      const left = root.querySelector('nav'), ruler = root.querySelector('input').parentElement, right = ruler.parentElement;
      const tick = ruler.querySelector('i'), major = ruler.querySelector('i:nth-child(6)'), marker = right.querySelector(':scope > i');
      const style = element => { const s = getComputedStyle(element); return { color: s.color, background: s.backgroundColor, opacity: s.opacity, font: s.font, width: s.width, position: s.position, borderLeft: s.borderLeft, borderRight: s.borderRight }; };
      const box = element => { const r = element.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, width: r.width }; };
      return { left: box(left), right: box(right), styles: [left, right, ruler, tick, major, marker].map(style), ticks: ruler.querySelectorAll(':scope > i').length, buttons: left.querySelectorAll('button').length, progress: Number(right.style.getPropertyValue('--progress')) };
    });
    // Capture canonical appearance before visiting V3, using the actual Service shell.
    const references = new Map();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + '/?motion=off', { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForFunction(() => document.querySelector('[data-service-rulers] nav button'));
    await page.evaluate(() => document.fonts.ready);
    for (const width of [1280, 1440, 1920, 2560]) {
      await page.setViewportSize({ width, height: 1000 });
      references.set(width, await metrics());
    }
    const defaultButtons = page.locator('[data-service-rulers] nav button');
    await defaultButtons.nth(2).click();
    await page.waitForFunction(() => document.querySelectorAll('[data-service-rulers] nav button')[2].getAttribute('aria-current') === 'location');
    report.regressions.push('main-site ruler navigation remains operational');
    for (const locale of ['lv', 'ru']) for (const width of [390, 768, 1024, 1280, 1440, 1920, 2560]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(`${base}/adsV3?lang=${locale}`, { waitUntil: 'networkidle', timeout: 90000 });
      assert.equal(response.status(), 200);
      const root = page.locator('[data-service-rulers]');
      assert.equal(await root.count(), 1);
      if (width < 1280) {
        assert.equal(await root.isVisible(), false);
        assert.equal(await root.locator('button').count(), 0);
      } else {
        await page.waitForFunction(() => !document.querySelector('[data-service-rulers]').hidden);
        await page.evaluate(() => document.fonts.ready);
        const data = await metrics(), reference = references.get(width);
        assert.deepEqual(data.styles, reference.styles, 'canonical ruler styles, fonts, ticks and marker are reused');
        assert.deepEqual(data.left, { left: 0, right: 96, top: 72, width: 96 });
        assert.deepEqual(data.right, { left: width - 96, right: width, top: 72, width: 96 });
        assert.equal(data.ticks, 41); assert.equal(data.buttons, 11);
        const dock = await page.locator('[data-ads-v3-dock="desktop"]').boundingBox();
        assert.ok(Math.abs(width - dock.x - dock.width - 32) < 1, 'CTA dock matches V2 right-edge placement');
        assert.ok(Math.abs(1000 - dock.y - dock.height - 32) < 1, 'CTA dock matches V2 bottom placement');
        const rulerControl = await root.locator('input').boundingBox();
        assert.ok(rulerControl.y + rulerControl.height < dock.y, 'CTA dock clears the interactive ruler');
        const content = await page.locator('#ads-v3-main h1, #ads-v3-main h2, #locations [data-location-map]').evaluateAll(elements => elements.map(element => { const r = element.getBoundingClientRect(); return { text: element.textContent.slice(0, 30), left: r.left, right: r.right }; }));
        for (const box of content) assert.ok(box.left >= 95 && box.right <= width - 95, `${locale}:${width}: content clears rulers: ${box.text}`);
        const target = root.locator('nav button').nth(5);
        await target.click();
        await page.waitForFunction(() => document.querySelectorAll('[data-service-rulers] nav button')[5].getAttribute('aria-current') === 'location');
        const after = await metrics();
        assert.deepEqual(after.left, data.left); assert.deepEqual(after.right, data.right);
        assert.ok(after.progress > 0, 'scroll progress updates without moving the fixed rulers');
        await root.locator('input').focus(); await page.keyboard.press('End');
        await page.waitForFunction(() => Math.abs(scrollY - (document.documentElement.scrollHeight - innerHeight)) < 3 && document.querySelector('[data-service-rulers] input').value === '100');
        await page.keyboard.press('Home');
        await page.waitForFunction(() => scrollY < 3 && document.querySelector('[data-service-rulers] input').value === '0');
        await page.locator('[data-ads-v3-action="dock-booking"]').click();
        await page.getByRole('dialog').waitFor();
        assert.equal(await root.isVisible(), false); assert.equal(await root.getAttribute('inert'), '');
        await page.keyboard.press('Escape');
        await page.locator('[role="dialog"]').waitFor({ state: 'detached' });
        await page.waitForFunction(() => !document.querySelector('[data-service-rulers]').hidden);
        if (locale === 'lv' && [1280, 1920].includes(width)) {
          await page.evaluate(() => document.activeElement?.blur()); await page.mouse.move(width / 2, 75);
          await page.screenshot({ path: path.join(out, `lv-${width}.png`) });
        }
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      report.viewports.push({ locale, width, visible: width >= 1280 });
    }
    for (const route of ['/adsV2', '/?ads=1']) {
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('[data-service-rulers]').count(), 0, 'protected landing receives no global ruler instance');
      report.regressions.push(route + ' remains excluded');
    }
    assert.deepEqual(report.errors, []);
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
