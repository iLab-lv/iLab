'use strict';
// Existing preview only. Never submits booking data.
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require(process.env.ILAB_PLAYWRIGHT_MODULE || path.join(process.env.TEMP, 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_CTA_BASE || 'http://127.0.0.1:3000';
const dock = '[class*="BottomBar_bottomBar"]';
const modal = '[data-service-pane="book"]';
const routes = ['/', '/iphone-remonts', '/datoru-remonts', '/iphone-remonts/iphone-13', '/iphone-remonts/baterijas-maina?model=iphone-13', '/cenas?brand=iphone&model=iphone-13', '/kontakti'];
const russian = ['/ru', '/ru/remont-iphone', '/ru/remont-noutbukov', '/ru/remont-iphone/iphone-13', '/ru/remont-iphone/zamena-batarei?model=iphone-13', '/ru/ceny?brand=iphone&model=iphone-13', '/ru/kontakty'];
const styles = locator => locator.evaluate(element => {
  const css = getComputedStyle(element), box = element.getBoundingClientRect();
  return { shadow: css.boxShadow, outline: css.outlineStyle, background: css.backgroundColor, transition: css.transitionDuration, width: box.width, height: box.height };
});
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.ILAB_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  let requests = 0;
  const errors = [];
  try {
    for (const touch of [false, true].filter(value => !process.env.ILAB_GLOW_MODE || process.env.ILAB_GLOW_MODE === (value ? 'touch' : 'desktop'))) {
      const context = await browser.newContext({ viewport: { width: touch ? 375 : 1440, height: 1000 }, hasTouch: touch, isMobile: touch, reducedMotion: 'reduce' });
      await context.route('**/api/booking', route => { requests++; return route.abort(); });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      for (const route of [...routes, ...russian].filter(value => !process.env.ILAB_GLOW_ROUTE || process.env.ILAB_GLOW_ROUTE === value)) {
        const response = await page.goto(base + route, { waitUntil: 'load', timeout: 90000 });
        assert.equal(response.status(), 200, route);
        await page.locator('#dialogs-root').waitFor({ state: 'attached' });
        await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
        const reject = page.getByRole('button', { name: /^(Noraidīt|Отклонить)$/ });
        if (await reject.isVisible()) await reject.click();
        const action = page.locator('#main [class*="Button_glow"]').first();
        const initial = await styles(action);
        assert.equal(initial.shadow, 'none');
        const hero = await page.locator('#main h1').evaluate(element => ({ shadow: getComputedStyle(element).textShadow, color: getComputedStyle(element).color }));
        if (!touch) {
          await action.hover();
          const hovered = await styles(action);
          assert.notEqual(hovered.shadow, 'none', route + ' hover');
          assert.equal(hovered.width, initial.width); assert.equal(hovered.height, initial.height);
          await page.keyboard.press('Tab'); await action.focus();
          assert.equal((await styles(action)).outline, 'solid', route + ' keyboard outline');
          await action.hover(); await page.mouse.down();
          assert.equal((await styles(action)).shadow, 'none', route + ' pressed');
          await page.mouse.move(1, 1); await page.mouse.up();
        } else {
          assert.equal(await page.evaluate(() => matchMedia('(hover: none)').matches), true);
          await action.tap();
          await page.locator(modal).waitFor();
          await page.locator('[class*="FullscreenPanel_close"]').tap();
          await page.locator(modal).waitFor({ state: 'detached' });
          assert.equal((await styles(action)).shadow, 'none', route + ' no sticky touch glow');
          if (route === '/') await page.screenshot({ path: path.join(process.env.TEMP, 'ilab-interactive-neon-touch.png') });
        }
        const booking = page.locator(dock + ' button[aria-controls="pieraksties-panel"]');
        if (!touch) {
          await booking.hover();
          assert.match((await styles(booking)).shadow, /inset/);
          assert.equal((await styles(booking)).height, 52);
        }
        await booking.click();
        const field = page.locator(modal + ' [name="device"]');
        await field.waitFor().catch(async error => {
          console.error('Drawer did not open', route, await booking.getAttribute('aria-expanded'), await page.locator('[role="dialog"]').count(), errors);
          await page.screenshot({ path: path.join(process.env.TEMP, 'ilab-interactive-neon-failure.png') });
          throw error;
        });
        if ((route.startsWith('/iphone-remonts/') || route.startsWith('/ru/remont-iphone/')) && route.includes('iphone-13')) assert.equal(await field.inputValue(), 'iPhone 13');
        await page.keyboard.press('Tab'); await field.focus();
        assert.notEqual((await styles(field)).shadow, 'none');
        await page.keyboard.press('Escape');
        await page.locator(modal).waitFor({ state: 'detached' });
        assert.deepEqual(await page.locator('#main h1').evaluate(element => ({ shadow: getComputedStyle(element).textShadow, color: getComputedStyle(element).color })), hero);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, route + ' overflow');
        if (!touch && (route === '/iphone-remonts' || route === '/ru/remont-iphone')) {
          const tile = page.locator('[class*="HubDeviceGrid_models"] a').first();
          await tile.hover(); assert.notEqual((await styles(tile)).shadow, 'none');
          await page.keyboard.press('Tab'); await tile.focus(); assert.equal((await styles(tile)).outline, 'solid');
          const input = page.locator('[class*="HubDeviceGrid_finder"] input');
          await input.fill('iPhone 13');
          assert.ok(await page.locator('[class*="HubDeviceGrid_models"] li:not([hidden])').count());
          await input.fill('');
        }
        if (!touch && (route === '/datoru-remonts' || route === '/ru/remont-noutbukov')) {
          const tile = page.locator('[class*="BrandList_brandLink"]').first();
          if (await tile.count()) { await tile.hover(); assert.notEqual((await styles(tile)).shadow, 'none'); }
        }
        if (route.includes('/cenas') || route.includes('/ceny')) {
          const active = page.locator('#brand-list [role="tab"][aria-selected="true"]');
          assert.equal((await styles(active)).background, 'rgb(242, 245, 247)');
          const selection = page.locator('#brand-list [aria-current="true"][role="button"]');
          await page.keyboard.press('Tab'); await selection.focus();
          assert.notEqual((await styles(selection)).shadow, 'none');
          assert.equal((await styles(selection)).outline, 'solid');
          assert.equal(await page.locator('#brand-list [class*="priceValue"]').evaluate(el => getComputedStyle(el).boxShadow), 'none');
        }
        if (route === '/' || route === '/ru' || route.includes('kontakt')) {
          const selected = page.locator('[data-full-locations] [class*="tabs"] button[aria-selected="true"]');
          assert.equal(await selected.count(), 1);
          assert.notEqual((await styles(selected)).shadow, 'none');
        }
        if (!touch && route === '/') {
          const secondary = page.locator('#home-hero [class*="Button_secondary"]');
          await secondary.hover();
          const secondaryState = await styles(secondary);
          assert.notEqual(secondaryState.shadow, 'none');
          assert.notEqual(secondaryState.background, 'rgb(71, 198, 226)', 'Outlined action stays outlined');
          const navigation = page.locator('[class*="NavBar_navItem"]:visible').first();
          await navigation.hover();
          assert.notEqual(await navigation.evaluate(element => getComputedStyle(element, '::after').boxShadow), 'none');
          assert.equal(await navigation.evaluate(element => getComputedStyle(element).textShadow), 'none');
          const serviceLink = page.locator('[class*="HomeServices_numberedLinks"] a').first();
          await serviceLink.hover();
          assert.notEqual(await serviceLink.evaluate(element => getComputedStyle(element, '::after').boxShadow), 'none');
          await page.emulateMedia({ reducedMotion: 'no-preference' });
          await action.hover();
          await page.waitForFunction(() => [...document.querySelectorAll('#main [class*="Button_glow"]')].some(el => getComputedStyle(el).boxShadow !== 'none'));
          assert.ok((await styles(action)).transition.includes('0.15s'));
          await page.locator('#main h1').evaluate(element => Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {}))));
          await page.screenshot({ path: path.join(process.env.TEMP, 'ilab-interactive-neon-desktop.png') });
          await page.emulateMedia({ reducedMotion: 'reduce' });
          assert.equal((await styles(action)).transition, '0s');
        }
        console.log('PASS interactive states, focus, geometry, booking context', touch ? 'touch' : 'desktop', route);
      }
      await context.close();
    }
    const protectedPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const protectedResponse = await protectedPage.goto(base + '/adsV2', { waitUntil: 'load', timeout: 90000 });
    assert.equal(protectedResponse.status(), 200);
    const protectedDock = protectedPage.locator(dock + ' button').first();
    await protectedDock.hover();
    assert.equal((await styles(protectedDock)).shadow, 'none', 'AdsV2 shared dock stays flat');
    assert.equal(await protectedPage.locator('[class*="Button_glow"]').count(), 0);
    await protectedPage.close();
    assert.equal(requests, 0);
    assert.deepEqual(errors, []);
    console.log('PASS LV/RU neon controls; no booking requests or runtime errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
