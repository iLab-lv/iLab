'use strict';
// Runs against an existing preview. Booking requests are blocked; no leads are sent.
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(process.env.ILAB_PLAYWRIGHT_MODULE || path.join(process.env.TEMP, 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_CTA_BASE || 'http://127.0.0.1:3000';
const dock = '[class*="BottomBar_bottomBar"]';
const modal = '[data-service-modal="true"][data-service-pane="book"]';
const cases = [
  ['/', '', '', '/cenas'], ['/ru', '', '', '/ru/ceny'],
  ['/iphone-remonts', 'iPhone', '', '/cenas?brand=iphone'],
  ['/ru/remont-iphone', 'iPhone', '', '/ru/ceny?brand=iphone'],
  ['/plansetdatoru-remonts', /.+/, '', '/cenas?brand=ipad'],
  ['/ru/remont-planshetov', /.+/, '', '/ru/ceny?brand=ipad'],
  ['/telefonu-remonts', /.+/, '', '/cenas?brand=samsung'],
  ['/ru/remont-telefonov', /.+/, '', '/ru/ceny?brand=samsung'],
  ['/datoru-remonts', /.+/, '', '/cenas?brand=macbook'],
  ['/ru/remont-noutbukov', /.+/, '', '/ru/ceny?brand=macbook'],
  ['/telefonu-remonts/samsung', 'Samsung', '', '/cenas?brand=samsung'],
  ['/ru/remont-telefonov/samsung', 'Samsung', '', '/ru/ceny?brand=samsung'],
  ['/iphone-remonts/iphone-13', 'iPhone 13', '', '/cenas?brand=iphone&model=iphone-13'],
  ['/ru/remont-iphone/iphone-13', 'iPhone 13', '', '/ru/ceny?brand=iphone&model=iphone-13'],
  ['/iphone-remonts/baterijas-maina', 'iPhone', 'Baterijas maiņa', '/cenas?brand=iphone'],
  ['/ru/remont-iphone/zamena-batarei', 'iPhone', 'Замена батареи', '/ru/ceny?brand=iphone'],
  ['/iphone-remonts/baterijas-maina?model=iphone-13', 'iPhone 13', 'Baterijas maiņa', '/cenas?brand=iphone&model=iphone-13'],
  ['/ru/remont-iphone/zamena-batarei?model=iphone-13', 'iPhone 13', 'Замена батареи', '/ru/ceny?brand=iphone&model=iphone-13'],
  ['/telefonu-remonts/baterijas-maina?brand=samsung', 'Samsung', 'Baterijas maiņa', '/cenas?brand=samsung'],
  ['/ru/remont-telefonov/zamena-batarei?brand=samsung', 'Samsung', 'Замена батареи', '/ru/ceny?brand=samsung'],
];
function equalValue(actual, expected) { expected instanceof RegExp ? assert.match(actual, expected) : assert.equal(actual, expected); }
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.ILAB_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--disable-extensions'] });
  try {
    const pricesOnly = process.argv.includes('--prices-only');
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: pricesOnly ? 'no-preference' : 'reduce' });
    let bookingRequests = 0;
    await context.route('**/api/booking', route => { bookingRequests++; return route.abort(); });
    const page = await context.newPage();
    page.setDefaultTimeout(30000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('requestfailed', request => {
      if (request.url().startsWith(base + '/cenas') || request.url().startsWith(base + '/ru/ceny')) console.error('Prices request failed', request.url(), request.failure());
    });
    const ready = async () => {
      await page.locator('#main h1').first().waitFor();
      await page.locator('#dialogs-root').waitFor({ state: 'attached' });
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
      const reject = page.getByRole('button', { name: /^(Noraidīt|Отклонить)$/ });
      if (await reject.isVisible()) await reject.click();
    };
    const go = async route => {
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 90000 });
      assert.equal(response.status(), 200, route);
      await ready();
      await page.waitForLoadState('load');
    };
    const open = async () => {
      await page.locator(dock + ' button[aria-controls="pieraksties-panel"]').click();
      await page.locator(modal + ' input[name="device"]').waitFor();
    };
    const close = async () => {
      await page.keyboard.press('Escape');
      await page.locator('[data-service-pane="book"]').waitFor({ state: 'detached' });
    };
    const selectedCases = process.argv.includes('--navigation-only') ? [] : pricesOnly ? cases.filter(item => !item[0].includes('baterijas') && !item[0].includes('zamena-batarei')) : process.argv.includes('--brand-service-only') ? cases.filter(item => item[0].includes('brand=samsung')) : cases;
    for (const [route, device, fault, basePricesHref] of selectedCases.filter(item => !process.env.ILAB_CTA_ROUTE || process.env.ILAB_CTA_ROUTE.split(',').includes(item[0]))) {
      const pricesHref = basePricesHref + '#brand-list';
      await go(route);
      for (const width of [1440, 375]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.locator(dock + ' [class*="pricesSlot"] a').getAttribute('href'), pricesHref, route);
        if (pricesOnly) continue;
        await open();
        equalValue(await page.locator(modal + ' [name="device"]').inputValue(), device);
        assert.equal(await page.locator(modal + ' [name="fault"]').inputValue(), fault);
        await page.locator(modal + ' [name="device"]').fill('Editable model');
        await page.locator(modal + ' [name="fault"]').fill('Editable fault');
        const values = await page.locator(modal + ' form').evaluate(form => Object.fromEntries(new FormData(form)));
        assert.equal(values.device, 'Editable model'); assert.equal(values.fault, 'Editable fault');
        assert.equal(await page.locator(modal).evaluate(element => element.scrollWidth <= element.clientWidth), true);
        await close();
        console.log('PASS booking + editable payload + prices href', route, width);
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.evaluate(() => { window.__ctaNavigationMarker = true; });
      await page.locator(dock + ' [class*="pricesSlot"] a').click();
      await page.waitForURL(url => url.pathname + url.search + url.hash === pricesHref, { timeout: 90000 }).catch(async error => {
        console.error('Prices navigation failed', route, await page.evaluate(() => ({
          url: location.href,
          leaving: document.querySelector('[data-service-redesign]')?.dataset.pageLeaving,
          animations: [...document.querySelectorAll('[data-page-scan], [data-page-shutter]')].map(element => element.getAnimations().map(animation => ({ state: animation.playState, time: animation.currentTime }))),
        })), errors);
        throw error;
      });
      await ready();
      await page.waitForFunction(() => {
        const top = document.querySelector('#brand-list')?.getBoundingClientRect().top;
        return scrollY > 0 && top >= 0 && top < 180;
      });
      assert.equal(await page.evaluate(() => window.__ctaNavigationMarker), true, 'Prices uses client navigation');
      const brand = new URL(pricesHref, base).searchParams.get('brand') || 'iphone';
      const activeTab = page.locator('#brand-list [role="tab"][aria-selected="true"]');
      await activeTab.waitFor();
      assert.equal((await activeTab.textContent()).toLowerCase(), brand);
      if (pricesHref.includes('model=iphone-13')) {
        await page.waitForFunction(() => document.querySelector('#brand-list [role="button"][aria-current="true"]')?.textContent.trim() === 'iPhone 13');
        const selected = await page.locator('#brand-list [class*="modelName"]').first().textContent();
        assert.equal(selected.trim(), 'iPhone 13');
      }
      console.log('PASS actual Prices navigation/selection', pricesHref);
      if (pricesOnly) {
        // Schedule timeline work immediately before client navigation unmounts it.
        await page.evaluate(() => {
          for (let index = 0; index < 12; index++) window.dispatchEvent(new Event('scroll'));
          const href = location.pathname.startsWith('/ru') ? '/ru/remont-iphone' : '/iphone-remonts';
          document.querySelector(`a[href="${href}"]`)?.click();
        });
        await page.waitForURL(url => url.pathname === (route.startsWith('/ru') ? '/ru/remont-iphone' : '/iphone-remonts'), { timeout: 90000 });
        await ready();
      }
    }
    if (pricesOnly) {
      assert.deepEqual(errors, []);
      console.log('PASS LV/RU price anchors, hub defaults and repeated normal-motion timeline teardown without runtime errors');
      return;
    }
    // Reuse real Next links to exercise provider persistence across model changes.
    await go('/iphone-remonts/iphone-13');
    const row = page.locator('#cenas [role="row"]').filter({ has: page.locator('button[aria-controls="pieraksties-panel"]') }).first();
    const rowTitle = (await row.locator('[role="cell"]').first().textContent()).trim();
    await row.locator('button').click();
    await page.locator(modal).waitFor();
    assert.equal(await page.locator(modal + ' [name="device"]').inputValue(), 'iPhone 13');
    assert.equal(await page.locator(modal + ' [name="fault"]').inputValue(), rowTitle);
    await close();
    await open();
    assert.equal(await page.locator(modal + ' [name="fault"]').inputValue(), '', 'Global open drops stale inline fault');
    await page.locator(modal + ' [name="device"]').fill('User model');
    await page.locator(modal + ' [name="fault"]').fill('User fault');
    await page.locator(modal + ' [name="name"]').fill('Unsubmitted visitor');
    const nextLink = page.locator('#related-models a[href^="/iphone-remonts/"]').first();
    const nextHref = await nextLink.getAttribute('href');
    assert.notEqual(nextHref, '/iphone-remonts/iphone-13');
    await page.evaluate(() => { window.__ctaNavigationMarker = true; });
    // A programmatic route change while the modal is open must preserve the active session.
    await nextLink.evaluate(element => element.click());
    await page.waitForURL(url => url.pathname === nextHref, { timeout: 90000 });
    await ready();
    assert.equal(await page.evaluate(() => window.__ctaNavigationMarker), true);
    assert.equal(await page.locator(modal + ' [name="device"]').inputValue(), 'User model');
    assert.equal(await page.locator(modal + ' [name="fault"]').inputValue(), 'User fault');
    assert.equal(await page.locator(modal + ' [name="name"]').inputValue(), 'Unsubmitted visitor');
    await close(); await open();
    const nextDevice = await page.locator(modal + ' [name="device"]').inputValue();
    assert.notEqual(nextDevice, 'iPhone 13'); assert.notEqual(nextDevice, 'User model');
    assert.ok((await page.locator('#main h1').textContent()).includes(nextDevice));
    await close();
    await page.locator('a[href="/"]').first().click();
    await page.waitForURL(base + '/', { timeout: 90000 }); await ready(); await open();
    assert.equal(await page.locator(modal + ' [name="device"]').inputValue(), '');
    assert.equal(await page.locator(modal + ' [name="fault"]').inputValue(), '');
    await close();
    console.log('PASS explicit inline context, client model navigation, active draft preservation and stale-context clearing');
    for (const route of ['/iphone-remonts/baterijas-maina?model=obsolete', '/ru/remont-iphone/zamena-batarei?model=galaxy-s24']) {
      await go(route); await open();
      assert.equal(await page.locator(modal + ' [name="device"]').inputValue(), 'iPhone');
      await close();
    }
    await go('/cenas?brand=obsolete&model=obsolete');
    assert.equal((await page.locator('#brand-list [role="tab"][aria-selected="true"]').textContent()).trim(), 'iPhone');
    await go('/cenas?brand=iphone&model=iphone-13');
    await page.locator('#brand-list [role="tab"]').filter({ hasText: /^Samsung$/ }).click();
    await page.waitForURL(url => url.searchParams.get('brand') === 'samsung' && !url.searchParams.has('model'));
    await page.waitForFunction(() => !document.querySelector('#brand-list [class*="modelName"]')?.textContent.includes('iPhone'));
    // Language changes through the actual shared navigation keep drawer copy and context current.
    await go('/iphone-remonts/baterijas-maina');
    await page.getByRole('button', { name: 'Pārslēgt uz krievu valodu', exact: true }).first().click();
    await page.waitForURL(url => url.pathname === '/ru/remont-iphone/zamena-batarei', { timeout: 90000 });
    await ready(); await open();
    assert.equal(await page.locator(modal + ' [name="fault"]').inputValue(), 'Замена батареи');
    assert.match(await page.locator(modal + ' #panel-title').textContent(), /Записаться/);
    await close();
    assert.equal(bookingRequests, 0);
    assert.deepEqual(errors, []);
    console.log('PASS invalid/outdated queries, incompatible brand reset, zero booking requests and no runtime errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
