'use strict';
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(path.join(os.tmpdir(), 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_ADS_V3_BASE || 'http://localhost:3116';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const context = await browser.newContext({ reducedMotion: 'no-preference' });
    await context.route('**/*', r => ['localhost', '127.0.0.1'].includes(new URL(r.request().url()).hostname) ? r.continue() : r.fulfill({ body: '' }));
    await context.route('**/api/booking', r => r.abort());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const locale of ['lv', 'ru']) for (const width of [320, 390, 1440]) {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${base}/adsV3?lang=${locale}`, { waitUntil: 'networkidle', timeout: 90000 });
      await page.waitForFunction(() => document.querySelector('#trust [data-count]')?.style.display === 'inline-block');
      await page.evaluate(() => document.fonts.ready);
      assert.deepEqual(await page.locator('#trust strong').allTextContents().then(items => items.slice(0, 2)), ['13+', '20K+']);
      const checkAlignment = async () => {
        const rows = await page.locator('#trust strong').evaluateAll(els => els.map(el => {
          const box = el.getBoundingClientRect(), number = el.querySelector('b').getBoundingClientRect();
          const suffixRange = document.createRange(); suffixRange.selectNodeContents(el.lastChild);
          const suffix = suffixRange.getBoundingClientRect();
          return { left: box.left, top: box.top, right: box.right, numberBottom: number.bottom, suffixTop: suffix.top, suffixRight: suffix.right };
        }));
        assert.ok(rows.every(row => row.suffixTop < row.numberBottom && row.suffixRight <= row.right + 1), 'Figures and suffixes stay on one line within their column');
        if (width <= 600) assert.ok(rows.every(row => Math.abs(row.left - rows[0].left) < 1), 'Mobile figures share one alignment');
      };
      await checkAlignment();
      const counters = await page.locator('[data-review-rating] [data-count], #trust [data-count]').all();
      assert.equal(counters.length, 5);
      for (const counter of counters) {
        const end = Number(await counter.getAttribute('data-count'));
        // Leave the observed container fully, then revisit: both passes must grow.
        for (let visit = 0; visit < 2; visit++) {
          await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          const samples = await counter.evaluate(el => new Promise((resolve, reject) => {
            // Observe the whole animation inside the page so RPC delays cannot miss it.
            const values = [], widths = [], deadline = performance.now() + 5000;
            let started = false, origin = 0;
            scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * .45, behavior: 'instant' });
            const sample = now => {
              const value = Number(el.textContent), end = Number(el.dataset.count);
              if (!started && value < end) { started = true; origin = now; }
              if (started) { values.push(value); widths.push(el.getBoundingClientRect().width); }
              if (started && value === end) resolve({ values, widths, final: el.textContent, elapsed: now - origin });
              else if (now > deadline) reject(new Error('Counter did not complete: ' + el.dataset.count));
              else requestAnimationFrame(sample);
            };
            requestAnimationFrame(sample);
          }));
          assert.equal(Number(samples.final), end);
          assert.ok(new Set(samples.values).size >= 3, 'Visible intermediate figures');
          assert.ok(samples.values.every((value, i) => !i || value >= samples.values[i - 1]), 'Counts grow monotonically');
          assert.ok(Math.max(...samples.widths) - Math.min(...samples.widths) < 1, 'Numeric width stays stable');
          if (await counter.evaluate(el => !!el.closest('[data-review-rating]'))) assert.ok(samples.elapsed < 850, 'Review ratings finish faster than the old 1200ms count');
        }
      }
      // Reserved digit widths follow the responsive font size, including a live resize.
      await page.setViewportSize({ width: width === 390 ? 1440 : 390, height: 1000 });
      await counters.at(-1).scrollIntoViewIfNeeded();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.setViewportSize({ width, height: 1000 });
      // Changing the preference mid-count cancels motion and restores exact values.
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await counters[0].scrollIntoViewIfNeeded();
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => [...document.querySelectorAll('[data-count]')].every(el => el.textContent === el.dataset.count && !el.style.minWidth));
      for (const counter of counters) {
        await counter.scrollIntoViewIfNeeded();
        assert.equal(await counter.textContent(), await counter.getAttribute('data-count'));
      }
      assert.deepEqual(await page.locator('#trust strong').allTextContents().then(items => items.slice(0, 2)), ['13+', '20K+']);
      await checkAlignment();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      console.log(`${locale}:${width}: ratings/trust count up, replay, stable widths, reduced motion passed`);
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
