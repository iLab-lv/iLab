'use strict';
// Local preview only; never submits bookings or changes production content.
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(process.env.ILAB_PLAYWRIGHT_MODULE || path.join(process.env.TEMP, 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_CTA_BASE || 'http://127.0.0.1:3104';
const selectedRoutes = process.env.ILAB_SIGNATURE_ROUTES?.split(',');
const pairs = [
  ['/', '/ru', 'remonts Rīgā.', 'Ремонт телефонов'],
  ['/iphone-remonts', '/ru/remont-iphone', 'iPhone', 'iPhone'],
  ['/datoru-remonts', '/ru/remont-noutbukov', 'Datoru remonts', 'Ремонт компьютеров'],
  ['/telefonu-remonts/samsung', '/ru/remont-telefonov/samsung', 'Samsung', 'Samsung'],
  ['/datoru-remonts/macbook', '/ru/remont-noutbukov/macbook', 'MacBook', 'MacBook'],
  ['/plansetdatoru-remonts/ipad', '/ru/remont-planshetov/ipad', 'iPad', 'iPad'],
  ['/iphone-remonts/iphone-13', '/ru/remont-iphone/iphone-13', 'iPhone 13', 'iPhone 13'],
  ['/iphone-remonts/ekrana-maina', '/ru/remont-iphone/zamena-ekrana', 'ekrāna maiņa', 'Замена экрана'],
  ['/iphone-remonts/baterijas-maina?model=iphone-13', '/ru/remont-iphone/zamena-batarei?model=iphone-13', 'baterijas maiņa', 'Замена батареи'],
  ['/iphone-remonts/skalruni-mikrofona-remonts', '/ru/remont-iphone/remont-dinamika-mikrofona', 'skaļruņa un mikrofona remonts', 'Ремонт динамика и микрофона'],
  ['/cenas', '/ru/ceny', 'cenas', 'Цены'], ['/kontakti', '/ru/kontakty', null, null],
];
const css = element => {
  const style = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  return { color: style.color, shadow: style.textShadow, display: style.display, font: style.font, width: rect.width, height: rect.height };
};
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const errors = [];
  const output = path.join(process.env.TEMP, 'ilab-signature-headings');
  fs.mkdirSync(output, { recursive: true });
  try {
    for (const width of [1440, 375]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', hasTouch: width < 768, isMobile: width < 768 });
      await context.route('**/api/booking', route => route.abort());
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      for (const pair of pairs) for (const locale of [0, 1]) {
        const route = pair[locale], expected = pair[locale + 2];
        if (selectedRoutes && !selectedRoutes.includes(route)) continue;
        const response = await page.goto(base + route, { waitUntil: 'load', timeout: 90000 });
        assert.equal(response.status(), 200, route);
        await page.waitForLoadState('networkidle', { timeout: 6000 }).catch(() => {});
        await page.evaluate(() => document.fonts.ready);
        const cookieReject = page.getByRole('button', { name: /^(Noraidīt|Отклонить)$/ });
        if (await cookieReject.isVisible()) await cookieReject.click();
        const hero = page.locator('#main h1');
        const accents = hero.locator('[data-signature="hero"]');
        assert.equal(await accents.count(), expected ? 1 : 0, route);
        if (!expected) assert.equal((await hero.evaluate(css)).shadow, 'none', route + ' utility title stays flat');
        if (expected) {
          assert.equal(await accents.textContent(), expected, route);
          const state = await accents.evaluate(css);
          assert.equal(state.color, 'rgb(34, 211, 238)', route);
          assert.ok(state.shadow.includes(width < 768 ? '48px' : '80px'), route + ' hero shadow');
          assert.equal(state.display, 'inline', route + ' inline accents preserve wrapping');
        }
        for (const accent of await page.locator('#main [data-signature="section"]').all()) {
          const value = await accent.textContent();
          assert.ok(['iLab?', 'tajā pašā dienā.', 'в тот же день.', 'Salabosim ātri.', 'Быстро исправим.', 'pakalpojumi', 'услуги', 'Precīza diagnostika.', 'Точная диагностика.'].includes(value) || /^(atsauksmes?|Отзывы|отзыв|отзыва|отзывов)$/.test(value), route + ': ' + value);
          const state = await accent.evaluate(css);
          assert.equal(state.color, 'rgb(34, 211, 238)', route + ' section foreground');
          assert.ok(state.shadow.includes(width < 768 ? '32px' : '54px'), route + ' section shadow');
        }
        assert.equal(await page.locator('#main [data-signature]:not(h1 [data-signature]):not(h2 [data-signature])').count(), 0);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route + ' horizontal overflow');
        // Removing only illumination must leave heading dimensions and typography unchanged.
        const before = await hero.evaluate(css);
        const reset = await page.addStyleTag({ content: '[data-signature] { color: inherit !important; text-shadow: none !important; }' });
        const after = await hero.evaluate(css);
        assert.deepEqual([before.width, before.height, before.font], [after.width, after.height, after.font]);
        await reset.evaluate(element => element.remove());
        const flat = page.locator('#main h2').filter({ hasText: /^(Tīrīšana, detaļas maiņa vai diagnostika\?|Чистка, замена детали или диагностика\?|Vajadzīga palīdzība\?|Нужна помощь\?)$/ });
        assert.equal(await flat.locator('[data-signature]').count(), 0);
        if (route === '/iphone-remonts' || route === '/ru/remont-iphone') {
          assert.equal(await page.locator('[data-why="editorial"] h2 [data-signature="section"]').count(), 1);
          assert.equal(await page.locator('#final-cta h2 [data-signature="section"]').count(), 1);
          for (const span of await page.locator('[class*="Guide_"] h2 span').all()) assert.equal((await span.evaluate(css)).shadow, 'none', 'Guide stays flat');
        }
        if (route === '/' || route === '/ru') {
          assert.equal(await page.locator('#pakalpojumi h2 [data-signature]').textContent(), locale === 0 ? 'pakalpojumi' : 'услуги');
          assert.equal(await page.locator('#precision-title [data-signature]').textContent(), locale === 0 ? 'Precīza diagnostika.' : 'Точная диагностика.');
          assert.equal(await page.locator('#precision-title > span').count(), 2);
          assert.equal(await page.locator('#precision-title [data-signature]').evaluate(el => getComputedStyle(el).paddingLeft), '0px', 'accent does not duplicate the line indentation');
          assert.equal(await hero.locator(':scope > span').count(), 2);
          assert.equal(await page.locator('[data-why="metrics"] h2 [data-signature]').count(), 1);
          assert.equal(await page.locator('#home-help h2 [data-signature]').count(), 1);
          assert.equal(await page.locator('[data-why="metrics"] strong [data-signature]').count(), 0);
          const reject = page.getByRole('button', { name: /^(Noraidīt|Отклонить)$/ });
          if (await reject.isVisible()) await reject.click();
          if (locale === 0) {
            await page.screenshot({ path: path.join(output, `home-${width}.png`) });
            await page.locator('[data-why="metrics"]').scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(output, `why-${width}.png`) });
            await page.locator('#precision').scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(output, `diagnostics-${width}.png`) });
          }
        }
        for (const section of await page.locator('[data-service-reviews]').all()) assert.equal(await section.locator('h2 [data-signature="section"]').count(), 1, 'one accent per review section');
        if (route === '/cenas' || route === '/ru/ceny') {
          const contacts = page.locator('header aside [class*="contactFoot"]');
          const rows = contacts.locator('p');
          assert.equal(await rows.count(), 2);
          assert.match(await contacts.textContent(), /Domina/);
          assert.match(await contacts.textContent(), /Spice/);
          for (const row of await rows.all()) {
            assert.ok(await row.isVisible(), 'both price contact rows remain visible');
            const location = row.locator('..');
            assert.equal(await location.locator('h3').count(), 1, 'each location has its own title');
            const titleBox = await location.locator('h3').boundingBox();
            const actionBoxes = await row.locator('a').evaluateAll(links => links.map(link => {
              const rect = link.getBoundingClientRect();
              return { top: rect.top, left: rect.left, right: rect.right, lines: link.getClientRects().length };
            }));
            assert.ok(actionBoxes.every(box => box.top >= titleBox.y + titleBox.height), 'actions sit below the title');
            assert.ok(actionBoxes.every(box => box.lines === 1 && Math.abs(box.top - actionBoxes[0].top) < 1), 'call and WhatsApp stay on one line');
            assert.equal(await row.locator('a[href^="tel:"]').count(), 1);
            assert.equal(await row.getByRole('link', { name: 'WhatsApp' }).count(), 1);
          }
          await hero.scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(output, `prices-${locale === 0 ? 'lv' : 'ru'}-${width}.png`) });
          if (width === 375) {
            await contacts.scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(output, `prices-contacts-${locale === 0 ? 'lv' : 'ru'}-${width}.png`) });
          }
        }
        if (route === '/iphone-remonts/ekrana-maina' && width === 375) await page.screenshot({ path: path.join(output, 'service-mobile.png') });
        if (route === '/ru' && width === 375) {
          await hero.scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(output, 'home-ru-mobile.png') });
        }
        if (route === '/ru/remont-iphone/remont-dinamika-mikrofona' && width === 375) await page.screenshot({ path: path.join(output, 'long-service-ru-mobile.png') });
        if (route === '/iphone-remonts' && width === 1440) {
          await page.locator('#final-cta').scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(output, 'final-cta-desktop.png') });
        }
        console.log('PASS headings', width, route);
      }
      // Existing hero line animation still targets the two original line wrappers.
      await page.goto(base + '/', { waitUntil: 'load' });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.reload({ waitUntil: 'networkidle' });
      await page.locator('#main h1').evaluate(el => Promise.all(el.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {}))));
      assert.equal(await page.locator('#main h1 > span').count(), 2);
      await page.goto(base + '/adsV2', { waitUntil: 'networkidle', timeout: 90000 });
      assert.equal(await page.locator('[data-signature]').count(), 0, 'AdsV2 remains untouched');
      await context.close();
    }
    assert.deepEqual(errors, []);
    console.log('PASS localized signature headings, flat exclusions, animation, AdsV2; screenshots:', output);
  } finally { await browser.close(); }
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
