'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(path.join(os.tmpdir(), 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_ADS_V3_BASE || 'http://localhost:3125';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const out = path.resolve('tmp/ads-v3-header-20261119');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, '.gitignore'), '*\n');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const errors = [], checks = [];
  try {
    const context = await browser.newContext();
    await context.addCookies([{ name: 'ilab_cookie_consent', value: 'accepted', url: base }]);
    await context.route('**/*', route => ['localhost', '127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.fulfill({ status: 200, body: '' }));
    await context.route('**/api/booking', route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    for (const locale of ['lv', 'ru']) for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const response = await page.goto(`${base}/adsV3?lang=${locale}`, { waitUntil: 'networkidle', timeout: 120000 });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(value => document.documentElement.lang === value, locale);
      const booking = page.locator('[data-ads-v3-action="header-booking"]');
      assert.equal(await booking.isVisible(), width < 1024);
      assert.equal(await page.locator('#speed + #locations + #trust + #services').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (width < 1024) {
        assert.equal(await booking.innerText(), locale === 'ru' ? 'Записаться' : 'Pieteikt remontu');
        const boxes = await page.locator('header').first().evaluate(header => [...header.querySelectorAll('a,button')].filter(el => el.getClientRects().length).map(el => {
          const r = el.getBoundingClientRect(); return { x: r.x, right: r.right, y: r.y, bottom: r.bottom, height: r.height };
        }));
        for (const box of boxes) assert.ok(box.x >= 0 && box.right <= width && box.height >= 44, 'header targets fit');
        assert.ok(boxes.every(box => Math.abs(box.y + box.height / 2 - (boxes[0].y + boxes[0].height / 2)) < 2), `${locale}:${width}: header stays on one aligned row: ${JSON.stringify(boxes)}`);
        const trace = booking.locator('svg rect').last();
        assert.equal(await booking.locator('svg rect').count(), 2);
        const motion = await trace.evaluate(el => { const s = getComputedStyle(el); return [s.animationName, s.animationDuration, s.animationIterationCount]; });
        assert.match(motion[0], /serviceButtonTrace/);
        assert.deepEqual(motion.slice(1), ['2.8s', 'infinite']);
        if (width === 390) await page.screenshot({ path: path.join(out, `${locale}-header.png`) });
        await booking.click();
        const modal = page.getByRole('dialog');
        await modal.waitFor();
        assert.equal(await modal.locator('form[action="/api/booking"]').count(), 1);
        assert.equal(await modal.locator('[name="leadType"]').inputValue(), 'booking');
        assert.equal(await booking.getAttribute('aria-expanded'), 'true');
        assert.equal(await page.locator('[data-ads-v3-dock]:visible').count(), 0);
        const event = await page.evaluate(() => window.dataLayer.filter(item => item.event === 'ads_v3_cta_click').at(-1));
        assert.deepEqual([event.action, event.placement, event.locale], ['booking', 'header', locale]);
        for (let i = 0; i < 6; i++) {
          await page.keyboard.press('Tab');
          assert.equal(await modal.evaluate(el => el.contains(document.activeElement)), true);
        }
        await page.keyboard.press('Escape');
        await modal.waitFor({ state: 'detached' });
        await page.waitForFunction(() => document.activeElement?.dataset.adsV3Action === 'header-booking');
        assert.equal(await booking.getAttribute('aria-expanded'), 'false');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await trace.evaluate(el => getComputedStyle(el).animationName), 'none');
      }
      if (width === 1440) {
        const target = page.locator('[data-service-rulers] nav button').nth(3);
        await target.waitFor();
        assert.ok((await target.getAttribute('aria-label')).includes(await page.locator('#locations h2').innerText()));
        await target.click();
        await page.waitForFunction(() => document.querySelectorAll('[data-service-rulers] nav button')[3].getAttribute('aria-current') === 'location');
      }
      if (width === 390 || width === 1440) {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const pin = page.locator('#locations [data-location-pin]').last();
        await pin.click();
        assert.equal(await pin.getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('#ads-v3-branch-name').evaluate(el => el === document.activeElement), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
      checks.push(`${locale}:${width}`);
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ checks, errors, result: 'PASS: booking, trace/reduced motion, header fit, ordering, rulers and location pins' }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
