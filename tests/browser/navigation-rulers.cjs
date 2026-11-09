'use strict';

// Against an already-running isolated Service production server; never submits forms.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.ILAB_PLAYWRIGHT_MODULE || path.join(process.env.TEMP, 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_RULER_BASE || 'http://127.0.0.1:3009';
const output = process.env.ILAB_RULER_OUTPUT;
const families = [
  ['home', '/', '/ru'],
  ['iphone', '/iphone-remonts', '/ru/remont-iphone'],
  ['phones', '/telefonu-remonts', '/ru/remont-telefonov'],
  ['brand', '/telefonu-remonts/samsung', '/ru/remont-telefonov/samsung'],
  ['model', '/iphone-remonts/iphone-13', '/ru/remont-iphone/iphone-13'],
  ['service', '/iphone-remonts/baterijas-maina', '/ru/remont-iphone/zamena-batarei'],
  ['prices', '/cenas', '/ru/ceny'],
  ['contacts', '/kontakti', '/ru/kontakty'],
];
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.ILAB_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--disable-extensions'],
  });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage(), checks = [], errors = [];
  let step;
  page.on('pageerror', error => errors.push({ step, type: 'runtime', message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error') errors.push({ step, type: 'console', message: message.text(), url: message.location().url });
  });
  const save = () => { if (output) fs.writeFileSync(output, JSON.stringify({ checks, errors }, null, 2)); };
  const ready = async () => {
    await page.locator('#main h1').first().waitFor();
    await page.waitForFunction(() => document.querySelector('[data-service-rulers] nav button'));
    await page.waitForLoadState('networkidle', { timeout: 4000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
  };
  async function check(name, fn) {
    step = name;
    try { checks.push({ name, result: await fn() }); }
    catch (error) { checks.push({ name, failure: error.message }); }
    save();
  }
  try {
    if (!process.argv.includes('--exclusions-only')) {
    for (const [family, ...routes] of families) for (const route of routes) {
      step = route;
      await page.setViewportSize({ width: 1600, height: 1000 });
      const response = await page.goto(base + route + '?motion=off', { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, route);
      await ready();
      for (const width of [1600, 1280, 768, 375]) await check(route + ' @' + width, async () => {
        await page.setViewportSize({ width, height: 1000 });
        const root = page.locator('[data-service-rulers]');
        assert.equal(await root.count(), 1, 'one canonical instance');
        if (width >= 1280) {
          await page.waitForFunction(() => !document.querySelector('[data-service-rulers]').hidden);
          const data = await page.evaluate(() => {
            const root = document.querySelector('[data-service-rulers]');
            const left = root.querySelector('nav').getBoundingClientRect();
            const right = root.querySelector('input').getBoundingClientRect();
            const buttons = [...root.querySelectorAll('button')];
            return {
              left: { x: left.x, width: left.width, top: left.top },
              range: { x: right.x, right: right.right },
              count: buttons.length,
              labels: buttons.map(button => button.getAttribute('aria-label')),
              buttonsFit: buttons.every(button => {
                const r = button.getBoundingClientRect();
                return r.left >= 0 && r.right <= 96 && r.top >= 72 && r.bottom <= innerHeight;
              }),
              overflow: document.documentElement.scrollWidth > innerWidth,
            };
          });
          assert.equal(data.left.width, 96);
          assert.equal(data.left.top, 72);
          assert.equal(data.range.x >= width - 96 && data.range.right <= width, true);
          assert.equal(data.buttonsFit, true);
          assert.equal(data.overflow, false);
          assert.equal(data.labels.every(label => label.startsWith(route.startsWith('/ru') ? 'Раздел ' : 'Sadaļa ')), true);
          if (family === 'home') assert.equal(data.count, 10, 'approved homepage target count/order');
          return data;
        }
        await page.waitForFunction(() => document.querySelector('[data-service-rulers]').hidden);
        assert.equal(await root.isVisible(), false);
        return { hidden: true };
      });
      await page.setViewportSize({ width: 1600, height: 1000 });
      await ready();
      await check(route + ' section navigation', async () => {
        const buttons = page.locator('[data-service-rulers] nav button');
        const index = Math.min(2, await buttons.count() - 1);
        await buttons.nth(index).click();
        await page.waitForFunction(index => document.querySelectorAll('[data-service-rulers] nav button')[index].getAttribute('aria-current') === 'location', index);
        await buttons.nth(index).focus();
        await page.keyboard.press('Enter');
        const focus = await buttons.nth(index).evaluate(element => ({
          focused: element === document.activeElement,
          outline: getComputedStyle(element).outlineStyle,
        }));
        assert.equal(focus.focused, true);
        assert.notEqual(focus.outline, 'none');
        return focus;
      });
      await check(route + ' scroll range keyboard', async () => {
        await page.locator('[data-service-rulers] input').focus();
        await page.keyboard.press('End');
        await page.waitForFunction(() => Math.abs(scrollY - (document.documentElement.scrollHeight - innerHeight)) < 3);
        await page.waitForFunction(() => document.querySelector('[data-service-rulers] input').value === '100');
        await page.keyboard.press('Home');
        await page.waitForFunction(() => scrollY < 3 && document.querySelector('[data-service-rulers] input').value === '0');
        return { fullRange: true };
      });
      if (output && ((family === 'home') || (family === 'model' && !route.startsWith('/ru')))) {
        await page.evaluate(() => document.activeElement?.blur());
        await page.mouse.move(800, 75);
        await page.screenshot({ path: path.join(path.dirname(output), family + (route.startsWith('/ru') ? '-ru' : '-lv') + '.png') });
      }
    }
    await page.goto(base + '/?motion=off', { waitUntil: 'domcontentloaded' }); await ready();
    await check('contact overlay hides and restores ruler focus targets', async () => {
      await page.locator('header button:visible').filter({ hasText: 'Sazināties' }).first().click();
      await page.locator('[role="dialog"][data-service-modal="true"]').waitFor();
      const root = page.locator('[data-service-rulers]');
      assert.equal(await root.isVisible(), false);
      assert.equal(await root.getAttribute('inert'), '');
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('[data-service-rulers]').hidden);
      return { restored: true };
    });
    await check('client link and Back rediscover current page targets without duplication', async () => {
      await page.locator('header a[href="/iphone-remonts"]').first().click();
      await page.waitForURL(url => url.pathname === '/iphone-remonts');
      await ready();
      assert.equal(await page.locator('[data-service-rulers]').count(), 1);
      const label = await page.locator('[data-service-rulers] nav button').first().getAttribute('aria-label');
      assert.match(label, /iPhone/);
      await page.goBack({ waitUntil: 'domcontentloaded' }); await ready();
      assert.equal(await page.locator('[data-service-rulers] nav button').count(), 10);
      return { refreshed: true };
    });
    await check('real LV/RU language buttons refresh ruler labels', async () => {
      await page.locator('header button[aria-label="Pārslēgt uz krievu valodu"]').click();
      await page.waitForURL(url => url.pathname === '/ru'); await ready();
      assert.equal(await page.locator('[data-service-rulers]').count(), 1);
      assert.match(await page.locator('[data-service-rulers] nav button').first().getAttribute('aria-label'), /^Раздел /);
      await page.locator('header button[aria-label="Переключить на латышский язык"]').click();
      await page.waitForURL(url => url.pathname === '/'); await ready();
      assert.match(await page.locator('[data-service-rulers] nav button').first().getAttribute('aria-label'), /^Sadaļa /);
      return { bothLocales: true };
    });
    }
    for (const route of ['/ads', '/?ads=1', '/adsV2', '/iphone-remonts-riga', '/admin/faq', '/a-r75a-missing-route', '/iphone-remonts/a-r75a-missing-model']) {
      await check('excluded ' + route, async () => {
        // Middleware intentionally returns an empty 404, which Chrome cannot navigate.
        if (route === '/ads') {
          const response = await page.request.get(base + route);
          assert.equal(response.status(), 404);
          assert.doesNotMatch(await response.text(), /data-service-rulers/);
          return { status: 404, rulerMarkup: false };
        }
        if (route === '/?ads=1' && process.env.ILAB_RULER_BASELINE) {
          const before = await page.request.get(process.env.ILAB_RULER_BASELINE + route, { timeout: 60000 });
          const after = await page.request.get(base + route, { timeout: 60000 });
          assert.equal(after.status(), before.status(), 'protected Ads preview must retain baseline status');
          assert.doesNotMatch(await after.text(), /data-service-rulers/);
          return { status: after.status(), baselineStatus: before.status(), limitation: after.status() === 200 ? null : 'Existing local Ads preview failure; not a functional landing-page pass' };
        }
        const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 4000 }).catch(() => {});
        if (['/?ads=1', '/adsV2', '/iphone-remonts-riga'].includes(route)) assert.equal(response.status(), 200);
        const root = page.locator('[data-service-rulers]');
        assert.equal(await root.count() === 0 || !(await root.isVisible()), true);
        return { status: response.status(), finalPath: new URL(page.url()).pathname, instances: await root.count() };
      });
    }
    const failures = checks.filter(check => check.failure);
    const hydration = errors.filter(error => /hydration|418|didn.t match/i.test(error.message));
    const runtime = errors.filter(error => error.type === 'runtime');
    console.log(JSON.stringify({ checks: checks.length, failures, hydration, runtime, consoleErrors: errors.filter(error => error.type === 'console').length }));
    if (failures.length || hydration.length || runtime.length) process.exitCode = 1;
  } finally { save(); await browser.close(); }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
