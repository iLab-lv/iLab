'use strict';

// Run against a local production preview. Every booking request is intercepted;
// external analytics are blocked and no real enquiry/email can be submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(process.env.ILAB_PLAYWRIGHT_MODULE || path.join(os.tmpdir(), 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_ADS_V3_BASE || 'http://127.0.0.1:3116';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname), 'QA must use a local preview');
const out = path.resolve(process.env.ILAB_ADS_V3_OUT || 'tmp/ads-v3-cta');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, '.gitignore'), '*\n');
const report = { viewports: [], original: [], flows: [], regressions: [], errors: [], expectedErrors: [], mockedRequests: 0 };

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.ILAB_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await context.addCookies([{ name: 'ilab_cookie_consent', value: 'accepted', url: base }]);
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      return ['localhost', '127.0.0.1'].includes(url.hostname) ? route.continue()
        : route.fulfill({ status: 200, contentType: route.request().resourceType() === 'stylesheet' ? 'text/css' : 'application/javascript', body: '' });
    });
    let reply = 'success';
    let release;
    await context.route('**/api/booking', async route => {
      report.mockedRequests++;
      if (reply === 'hold') await new Promise(resolve => { release = resolve; });
      await route.fulfill({ status: reply === 'error' ? 503 : 200, contentType: 'application/json', body: JSON.stringify(reply === 'error' ? { ok: false } : { ok: true }) });
    });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => {
      if (message.type() !== 'error') return;
      // Chromium reports the deliberately mocked API failure to the console.
      // Keep it visible in evidence, without accepting any other resource error.
      if (new URL(message.location().url || base, base).pathname === '/api/booking' && /status of 503/.test(message.text())) report.expectedErrors.push(message.text());
      else report.errors.push(message.text());
    });
    const modal = page.getByRole('dialog');
    const contactDestinations = {};
    async function load(url) {
      const response = await page.goto(base + url, { waitUntil: 'load', timeout: 90000 });
      assert.equal(response.status(), 200, url);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      if (url.startsWith('/adsV3')) {
        const locale = new URL(url, base).searchParams.get('lang') === 'ru' ? 'ru' : 'lv';
        await page.waitForFunction(value => document.documentElement.lang === value, locale);
      }
    }
    async function dismiss(opener) {
      await page.keyboard.press('Escape');
      await page.locator('[data-service-modal="true"]').waitFor({ state: 'detached' });
      if (opener) {
        await page.waitForFunction(element => element === document.activeElement, await opener.elementHandle(), { timeout: 3000 }).catch(async () => {
          throw new Error('Focus return failed: ' + JSON.stringify(await opener.evaluate(element => ({ opener: element.outerHTML, active: document.activeElement?.outerHTML.slice(0, 300), inertParent: element.closest('[inert]')?.outerHTML.slice(0, 120) }))));
        });
      }
    }
    async function clickAction(key, locale) {
      const button = page.locator(`[data-ads-v3-action="${key}"]`);
      const before = await page.evaluate(() => (window.dataLayer || []).filter(event => event.event === 'ads_v3_cta_click').length);
      await button.click();
      await modal.waitFor();
      const event = await page.evaluate(() => window.dataLayer.filter(event => event.event === 'ads_v3_cta_click').at(-1));
      assert.equal(await page.evaluate(() => window.dataLayer.filter(event => event.event === 'ads_v3_cta_click').length), before + 1);
      const mode = key.split('-')[1];
      assert.equal(event.action, mode);
      assert.equal(event.placement, key.startsWith('dock') ? (page.viewportSize().width <= 768 ? 'mobile_dock' : 'desktop_dock') : 'hero');
      assert.equal(event.locale, locale);
      assert.equal(event.preview, true);
      assert.equal(await page.locator('[data-ads-v3-dock]:visible').count(), 0, 'all fixed docks hidden under drawer');
      for (let index = 0; index < 8; index++) {
        await page.keyboard.press('Tab');
        assert.equal(await modal.evaluate(element => element.contains(document.activeElement)), true, 'keyboard focus contained');
      }
      if (key.endsWith('booking')) {
        assert.equal(await modal.locator('form[action="/api/booking"]').count(), 1);
        assert.equal(await modal.locator('[name="leadType"]').inputValue(), 'booking');
      } else if (mode === 'contact') {
        assert.equal(await modal.locator('[data-contact-call]').count(), 2);
        assert.equal(await modal.locator('[data-contact-whatsapp]').count(), 2);
        for (const href of await modal.locator('[data-contact-call]').evaluateAll(links => links.map(link => link.href))) assert.match(href, /^tel:\+/);
        for (const href of await modal.locator('[data-contact-whatsapp]').evaluateAll(links => links.map(link => link.href))) assert.match(href, /^https:\/\/wa\.me\/\d+/);
      } else {
        const selector = mode === 'call' ? '[data-contact-call]' : '[data-contact-whatsapp]';
        const opposite = mode === 'call' ? '[data-contact-whatsapp]' : '[data-contact-call]';
        const choices = modal.locator(selector);
        assert.equal(await choices.count(), 2, 'both branches offered without auto-selection');
        assert.equal(await modal.locator(opposite).count(), 0, 'selector keeps requested contact action');
        assert.deepEqual(await choices.evaluateAll(links => links.filter(link => {
          const box = link.getBoundingClientRect(), label = link.querySelector('span:not([aria-hidden])').getBoundingClientRect();
          return box.height < 44 || label.left < box.left || label.right > box.right || label.bottom > box.bottom || label.top < box.top;
        }).map(link => link.textContent)), [], 'branch contact labels fit their touch targets');
        if (mode === 'call' && locale === 'ru' && page.viewportSize().width === 390) await page.screenshot({ path: path.join(out, 'ru-contact-selector.png') });
        const expected = await page.locator(mode === 'call' ? 'header a[href^="tel:"]' : 'header [data-contact-whatsapp]').evaluateAll(links => links.map(link => link.href));
        const actual = await choices.evaluateAll(links => links.map(link => link.href));
        assert.deepEqual(actual, expected, 'each selector destination matches the authoritative header contact');
        contactDestinations[mode] = expected;
        await page.evaluate(() => { window.__contactClicks = []; });
        for (let index = 0; index < 2; index++) {
          assert.match(actual[index], mode === 'call' ? /^tel:\+/ : /^https:\/\/wa\.me\/\d+/);
          assert.equal(await choices.nth(index).getAttribute('target'), '_blank');
          await choices.nth(index).evaluate(link => link.addEventListener('click', event => { event.preventDefault(); window.__contactClicks.push(link.href); }));
          await choices.nth(index).click();
          await page.locator('[data-service-modal="true"]').waitFor({ state: 'detached' });
          if (index === 0) { await button.click(); await modal.waitFor(); }
        }
        assert.deepEqual(await page.evaluate(() => window.__contactClicks), expected, 'activating each branch follows its own contact link');
      }
      await dismiss(button);
      report.flows.push(`${locale}:${key}`);
    }

    for (const locale of ['lv', 'ru']) {
      for (const width of [320, 360, 390, 768, 769, 1024, 1440]) {
        const height = width === 390 ? 844 : width <= 360 ? 800 : 900;
        await page.setViewportSize({ width, height });
        await load('/adsV3?lang=' + locale);
        assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex, nofollow/);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://ilab.lv/adsV3' + (locale === 'ru' ? '?lang=ru' : ''));
        assert.equal(await page.locator('html').getAttribute('lang'), locale);
        assert.equal(await page.locator('[data-ads-v3] [lang]').first().getAttribute('lang'), locale);
        assert.equal(await page.locator('main h1').count(), 1);
        assert.equal(await page.locator('header a:has(img[src="/brand/logo.svg"])').getAttribute('href'), locale === 'ru' ? '/ru' : '/', 'topbar logo links to the localized homepage');
        assert.equal(await page.locator('h1').innerText().then(text => text.replace(/\s+/g, ' ').trim()), locale === 'ru' ? 'Ремонт телефонов в Риге в тот же день.' : 'Telefonu remonts tajā pašā dienā Rīgā.');
        assert.match(await page.locator('h1 [data-signature]').innerText(), locale === 'ru' ? /в тот же день/ : /tajā pašā dienā/);
        assert.equal(await page.locator('[data-hero-reviews]').getAttribute('href'), '#reviews');
        assert.equal(await page.locator('main > section + div > [data-service-reviews="compact"]').count(), 1, 'compact reviews immediately follow hero');
        assert.equal(await page.locator('header [data-ads-v3-branch]').first().isVisible(), width >= 1024);
        const heroBook = await page.locator('[data-ads-v3-action="hero-booking"]').boundingBox();
        const dockElement = page.locator('[data-ads-v3-dock]:visible');
        assert.equal(await dockElement.count(), 1, 'exactly one responsive dock');
        const dock = await dockElement.boundingBox();
        const dockLabels = await dockElement.locator('button, a').allTextContents();
        assert.deepEqual(dockLabels, width <= 768 ? ['WhatsApp', locale === 'ru' ? 'Позвонить' : 'Zvanīt'] : [locale === 'ru' ? 'Записаться' : 'Pieteikt remontu', locale === 'ru' ? 'Узнать цену' : 'Uzzināt cenu']);
        assert.equal(await page.locator('[data-ads-v3-action="hero-contact"]').isVisible(), width > 768);
        const metrics = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          headline: document.querySelector('h1').textContent,
          shadow: getComputedStyle(document.querySelector('h1 [data-signature]')).textShadow,
          image: { complete: document.querySelector('[data-ads-v3-art]').complete, width: document.querySelector('[data-ads-v3-art]').naturalWidth },
          paragraphSizes: [...document.querySelectorAll('main > section p')].map(element => parseFloat(getComputedStyle(element).fontSize)),
        }));
        assert.ok(metrics.scrollWidth <= width + 1, `${locale} ${width}: horizontal overflow`);
        assert.notEqual(metrics.shadow, 'none');
        assert.ok(metrics.image.complete && metrics.image.width > 0);
        assert.ok(metrics.paragraphSizes[1] < metrics.paragraphSizes[0], 'same-day qualifier remains secondary to the lead');
        if (width > 768) assert.ok(heroBook && heroBook.height >= 44);
        else assert.equal(heroBook, null, 'mobile hero actions leave no visible box');
        assert.ok(dock && dock.y + dock.height <= height + 1, 'persistent dock visible on all widths');
        const branchBoxes = await page.locator('main > section [data-ads-v3-branch]').evaluateAll(links => links.map(link => ({ top: link.getBoundingClientRect().top, bottom: link.getBoundingClientRect().bottom })));
        if (width === 390) assert.ok(branchBoxes.every(box => box.top > 72 && box.bottom < dock.y - 8), 'both mobile branch links above fold and dock');
        const dockPosition = await dockElement.evaluate(element => getComputedStyle(element).position);
        assert.equal(dockPosition, 'fixed');
        await page.evaluate(() => scrollTo({ top: 700, behavior: 'instant' }));
        assert.ok(Math.abs((await dockElement.boundingBox()).y - dock.y) < 1, 'dock remains fixed while scrolling');
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        report.viewports.push({ locale, width, heroBook, dock, dockLabels, ...metrics });
        if ([390, 1440].includes(width)) {
          await page.screenshot({ path: path.join(out, `${locale}-${width}.png`) });
          for (const action of width > 768 ? ['hero-booking', 'hero-contact', 'dock-booking'] : ['dock-call', 'dock-whatsapp']) await clickAction(action, locale);
          if (width > 768) {
            const price = page.locator('[data-ads-v3-action="dock-prices"]');
            const expected = 'https://ilab.lv' + (locale === 'ru' ? '/ru/ceny' : '/cenas');
            assert.equal(await price.getAttribute('href'), expected);
            assert.equal(await price.getAttribute('target'), '_self');
            await price.evaluate(link => link.addEventListener('click', event => { event.preventDefault(); window.__priceDestination = link.href; }));
            await price.click();
            assert.equal(await page.evaluate(() => window.__priceDestination), expected);
            assert.equal(await modal.count(), 0, 'prices navigates, without opening a form or branch selector');
            assert.equal(await page.evaluate(() => window.dataLayer.filter(event => event.event === 'ads_v3_cta_click').at(-1).action), 'prices');
            report.flows.push(`${locale}:desktop prices same-tab destination`);
          }
          for (const link of await page.locator('[data-ads-v3-branch]:visible').all()) {
            const branchId = await link.getAttribute('data-ads-v3-branch');
            await link.click();
            assert.equal(await modal.count(), 0, 'branch navigation never opens a drawer');
            await page.waitForFunction(id => {
              const section = document.querySelector('#locations');
              const heading = section.querySelector('h2').getBoundingClientRect();
              const dock = [...document.querySelectorAll('[data-ads-v3-dock]')].find(element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
              return section.dataset.selectedBranch === id && heading.top >= 70 && heading.bottom < dock.getBoundingClientRect().top - 8;
            }, branchId);
            assert.equal(new URL(page.url()).searchParams.get('lang'), locale);
            assert.equal(await page.locator(`a[hreflang="${locale === 'ru' ? 'lv' : 'ru'}"]`).getAttribute('href').then(href => href.endsWith('#locations')), true);
            await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
          }
          report.flows.push(`${locale}:${width}:both branch links scroll and preselect, locale preserved`);
          const reviews = page.locator('[data-service-reviews="compact"]');
          await page.locator('[data-hero-reviews]').click();
          await reviews.waitFor({ state: 'visible' });
          await page.waitForFunction(() => {
            const top = document.querySelector('[data-service-reviews]').getBoundingClientRect().top;
            return top >= 70 && top <= 100;
          });
          const branchReviews = reviews.locator('[data-review-location]').first();
          const initialText = await branchReviews.locator('[data-home-reviews]').innerText();
          const next = branchReviews.locator('nav button').last();
          if (await next.count() && await next.getAttribute('aria-disabled') === 'false') {
            await next.click();
            assert.notEqual(await branchReviews.locator('[data-home-reviews]').innerText(), initialText);
            await branchReviews.locator('nav button').first().click();
            assert.equal(await branchReviews.locator('[data-home-reviews]').innerText(), initialText);
          }
          report.flows.push(`${locale}:${width}:review anchor and compact pagination`);
          await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
          // Include the first review heading without changing the hero's viewport sizing.
          const transitionHeight = await reviews.locator('header').evaluate(header => Math.ceil(header.getBoundingClientRect().bottom + window.scrollY + 24));
          const capture = await context.newCDPSession(page);
          const screenshot = await capture.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: transitionHeight, scale: 1 } });
          fs.writeFileSync(path.join(out, `${locale}-${width}-transition.png`), Buffer.from(screenshot.data, 'base64'));
          await capture.detach();
        }
      }
    }

    // Full assembly: use both languages and representative desktop/mobile widths.
    for (const locale of ['lv', 'ru']) for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
      await load('/adsV3?lang=' + locale);
      assert.deepEqual(await page.locator('main > section, main > div > section').evaluateAll(sections => sections.map(section => section.id)), [
        '', 'reviews', 'speed', 'locations', 'trust', 'services', 'brands', 'process', 'delivery', 'faq', 'final-cta',
      ]);
      assert.equal(await page.locator('#process ol > li').count(), 4, 'original four-step process');
      assert.equal(await page.locator('#brands h2').innerText(), locale === 'ru' ? 'Профессиональный ремонт устройств популярных брендов' : 'Profesionāls remonts populārāko zīmolu ierīcēm');
      assert.equal(await page.locator('#brands header p').innerText(), locale === 'ru' ? 'Ремонтируем телефоны, планшеты и компьютеры Apple, Samsung, Xiaomi, Huawei и других популярных брендов.' : 'Remontējam Apple, Samsung, Xiaomi, Huawei un citu populāru zīmolu telefonus, planšetdatorus un datorus.');
      assert.doesNotMatch(await page.locator('#brands').innerText(), /Ne tikai iPhone|Remontējam arī Samsung/);
      for (const choice of await page.locator('[data-service-choice]').all()) {
        const serviceId = await choice.getAttribute('data-service-choice');
        const title = await choice.locator('span').innerText();
        await choice.click();
        assert.equal(await page.locator('#ads-v3-service-detail').getAttribute('data-service-id'), serviceId);
        assert.equal(await choice.getAttribute('aria-pressed'), 'true');
        const booking = page.locator('#services').getByRole('button', { name: locale === 'ru' ? 'Записаться' : 'Pieteikt remontu', exact: true });
        await booking.click();
        assert.equal(await modal.locator('[name="fault"]').inputValue(), title, 'chosen problem prefills the existing form');
        assert.equal(await modal.locator('[name="leadType"]').inputValue(), 'booking');
        await dismiss(booking);
      }
      const locations = page.locator('#locations');
      const pins = locations.locator('[data-location-pin]');
      const tabs = locations.locator('[role="group"] button');
      assert.equal(await pins.count(), 2);
      assert.equal(await tabs.count(), 2);
      for (let index = 0; index < 2; index++) {
        const id = index === 0 ? 'domina' : 'spice';
        for (const control of [pins.nth(index), tabs.nth(index)]) {
          await control.click();
          assert.equal(await locations.getAttribute('data-selected-branch'), id);
          assert.equal(await locations.locator('[data-location-photo]').getAttribute('data-location-photo'), id);
          assert.equal(await pins.nth(index).getAttribute('aria-pressed'), 'true');
          assert.equal(await tabs.nth(index).getAttribute('aria-pressed'), 'true');
          const label = (await tabs.nth(index).innerText()).trim();
          assert.equal(await locations.locator('figcaption').innerText(), label);
          const expectedPhone = await page.locator('header a[href^="tel:"]').nth(index).getAttribute('href');
          assert.ok((await locations.locator('a[href^="tel:"]').evaluateAll(links => links.map(link => link.getAttribute('href')))).includes(expectedPhone));
          assert.ok(await locations.locator('address').innerText());
          assert.ok(await locations.locator('details summary').innerText());
          assert.equal(await locations.locator('a[href*="waze.com"]').count(), 1);
          assert.equal(await locations.locator('a[href*="wa.me"]').count(), 1);
        }
      }
      await locations.locator('details summary').click();
      assert.equal(await locations.locator('table tr').count(), 7, 'selected branch hours remain accessible');
      await locations.locator('details summary').click();
      const delivery = page.locator('#delivery button');
      await delivery.click();
      assert.equal(await modal.locator('[name="leadType"]').inputValue(), 'delivery');
      assert.equal(await page.locator('[data-ads-v3-dock]:visible').count(), 0);
      await dismiss(delivery);
      const brandContact = page.locator('#brands button');
      await brandContact.click();
      assert.equal(await modal.locator('[data-contact-call]').count(), 2);
      await dismiss(brandContact);
      const faq = page.locator('#faq details');
      assert.equal(await faq.count(), 6);
      for (const item of await faq.all()) {
        const summary = item.locator('summary');
        await summary.focus();
        const wasOpen = await item.evaluate(element => element.open);
        await page.keyboard.press('Enter');
        assert.equal(await item.evaluate(element => element.open), !wasOpen);
        assert.ok(await item.locator('p').textContent());
        if (!wasOpen) await summary.press('Enter');
      }
      const finalCall = page.locator('#final-cta').getByRole('button', { name: locale === 'ru' ? 'Позвонить' : 'Zvanīt', exact: true });
      await finalCall.click();
      assert.equal(await modal.locator('[data-contact-call]').count(), 2);
      await dismiss(finalCall);
      // Capture the default page state after exercising each interaction.
      await load('/adsV3?lang=' + locale);
      // Load lazy assets throughout the page before checking and capturing them.
      for (const image of await page.locator('main img').all()) await image.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('main img')].every(image => image.complete && image.naturalWidth > 0));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'whole page has no horizontal overflow');
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: path.join(out, `${locale}-${width}-full.png`), fullPage: true });
      report.flows.push(`${locale}:${width}:full assembly order, copy, six contextual repairs, map/photo/contacts/hours sync, delivery, FAQ keyboard, final selector, loaded images`);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await load('/adsV3?lang=ru&form=booking&service=battery&location=spice&utm_source=qa#ads-v3-main');
    await modal.waitFor();
    const form = modal.locator('form');
    assert.equal(await form.locator('[name="fault"]').inputValue(), 'Замена батареи');
    assert.equal(await form.locator('[name="location"]:checked').inputValue(), 'spice');
    const beforeInvalid = report.mockedRequests;
    await form.evaluate(element => element.requestSubmit());
    assert.equal(report.mockedRequests, beforeInvalid, 'native validation prevents empty requests');
    await form.locator('[name="name"]').fill('V3 QA');
    await form.locator('[name="phone"]').fill('+371 20000000');
    await form.locator('[name="device"]').fill('QA model');
    await page.setViewportSize({ width: 390, height: 480 });
    await form.locator('[name="device"]').focus();
    await form.locator('[name="device"]').scrollIntoViewIfNeeded();
    const keyboardField = await form.locator('[name="device"]').boundingBox();
    assert.ok(keyboardField.y >= 0 && keyboardField.y + keyboardField.height <= 480, 'short keyboard viewport keeps the focused field reachable');
    assert.equal(await page.locator('[data-ads-v3-dock]:visible').count(), 0);
    await page.setViewportSize({ width: 390, height: 844 });
    reply = 'error';
    await form.locator('button[type="submit"]').click();
    await form.getByRole('alert').waitFor();
    assert.match(await form.getByRole('alert').innerText(), /Попробуйте/);
    reply = 'hold';
    await form.locator('button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector('form[aria-busy="true"]'));
    const pendingCount = report.mockedRequests;
    await form.evaluate(element => element.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    assert.equal(report.mockedRequests, pendingCount, 'pending submission blocks duplicates');
    assert.equal(await form.locator('button[type="submit"]').isDisabled(), true);
    release();
    await modal.getByRole('status').waitFor();
    assert.match(await modal.getByRole('status').innerText(), /свяжутся|свяжемся/);
    assert.equal(await modal.getByRole('status').evaluate(element => element === document.activeElement), true);
    await dismiss();
    const languageLink = await page.locator('a[hreflang="lv"]').getAttribute('href');
    assert.match(languageLink, /utm_source=qa/);
    assert.match(languageLink, /service=battery/);
    assert.match(languageLink, /#ads-v3-main$/);
    report.flows.push('query-prefill, validation, failure/retry, busy/duplicate guard, success/focus, locale attribution');

    await load('/adsV3?lang=ru&location=spice');
    assert.equal(await modal.count(), 0, 'a location query does not launch contact automatically');
    await clickAction('dock-call', 'ru');
    await clickAction('dock-whatsapp', 'ru');
    report.flows.push('inquiry branch prefill never bypasses contact branch selection');

    await page.setViewportSize({ width: 320, height: 800 });
    await load('/adsV3?lang=ru');
    await clickAction('dock-call', 'ru');
    await clickAction('dock-whatsapp', 'ru');
    await page.setViewportSize({ width: 390, height: 844 });

    // Text magnification/reflow and direct touch path.
    for (const locale of ['lv', 'ru']) {
    await load('/adsV3?lang=' + locale);
    await page.evaluate(() => {
      const text = [...document.querySelectorAll('[data-ads-v3] *')]
        .filter(element => element.getClientRects().length && [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()))
        .map(element => [element, parseFloat(getComputedStyle(element).fontSize)]);
      for (const [element, size] of text) element.style.setProperty('font-size', size * 2 + 'px', 'important');
    });
    assert.equal(await page.locator('[data-ads-v3-action="hero-booking"]').isVisible(), false);
    assert.equal(await page.locator('[data-ads-v3-action="dock-call"]').isVisible(), true);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    const clippedLabels = await page.locator('[data-ads-v3-action]').evaluateAll(buttons => buttons.filter(button => {
      if (!button.getClientRects().length) return false;
      const box = button.getBoundingClientRect(), label = button.querySelector('span:not([aria-hidden])').getBoundingClientRect();
      return label.left < box.left - 1 || label.right > box.right + 1 || label.bottom > box.bottom + 1 || label.top < box.top - 1;
    }).map(button => button.dataset.adsV3Action));
    assert.deepEqual(clippedLabels, [], 'enlarged CTA text stays within its control');
    await page.screenshot({ path: path.join(out, `zoom-${locale}-390.png`) });
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    const footerBox = await page.locator('footer').last().boundingBox();
    const dockBox = await page.locator('[data-ads-v3-dock]:visible').boundingBox();
    assert.ok(footerBox.y + footerBox.height <= dockBox.y + 1, 'dock padding keeps the final content reachable with enlarged text');
    }
    const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    await touch.route('**/api/booking', route => route.abort());
    await touch.route(/googletagmanager|google-analytics|bzrcdn\.openai/, route => route.fulfill({ status: 200, body: '' }));
    const touchPage = await touch.newPage();
    await touchPage.goto(base + '/adsV3', { waitUntil: 'networkidle' });
    await touchPage.locator('[data-ads-v3-action="dock-call"]').tap();
    await touchPage.getByRole('dialog').waitFor();
    assert.equal(await touchPage.locator('[data-ads-v3-dock]:visible').count(), 0);
    await touch.close();
    report.flows.push('320px reflow, text enlargement, touch dock');

    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
    console.log('V3 viewport and functional checks complete; checking protected routes.');

    for (const url of ['/adsV2', '/?ads=1']) {
      await page.setViewportSize({ width: 1280, height: 900 });
      const response = await page.goto(base + url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      assert.equal(response.status(), 200, url);
      await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
      assert.equal(await page.locator('[data-ads-v3]').count(), 0);
      const booking = page.getByRole('button', { name: 'Pieteikt remontu', exact: true }).first();
      await booking.click();
      await page.getByRole('dialog').locator('form').waitFor();
      assert.equal(await page.getByRole('dialog').locator('[name="leadType"]').inputValue(), 'booking');
      await page.keyboard.press('Escape');
      report.regressions.push(url + ': existing landing and booking opens');
    }
    await modal.waitFor({ state: 'hidden' });
    // Direct comparison against the actual original advertising dock, not the
    // main site's global BottomBar or AdsV2's separate responsive configuration.
    for (const width of [390, 768, 769, 1440]) {
      const height = width === 390 ? 844 : 900;
      await page.setViewportSize({ width, height });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      const originalDock = page.locator(width <= 768 ? 'nav[aria-label="Ātrās saziņas pogas"]' : 'aside[aria-label="Pieteikuma darbības"]');
      assert.equal(await originalDock.isVisible(), true);
      const labels = await originalDock.locator('button, a').allTextContents();
      const v3 = report.viewports.find(item => item.locale === 'lv' && item.width === width);
      assert.deepEqual(labels, v3.dockLabels, 'V3 matches original action order and Latvian labels');
      const box = await originalDock.boundingBox();
      assert.equal(await originalDock.evaluate(element => getComputedStyle(element).position), 'fixed');
      const expectedBottom = width >= 1280 ? 32 : height - box.y - box.height;
      assert.ok(Math.abs(expectedBottom - (height - v3.dock.y - v3.dock.height)) < 1, 'V3 uses V2 wide-screen spacing and original spacing below 1280px');
      await page.evaluate(() => scrollTo({ top: 1200, behavior: 'instant' }));
      assert.ok(Math.abs((await originalDock.boundingBox()).y - box.y) < 1, 'original also remains fixed while scrolling');
      report.original.push({ width, labels, box });
      if (width > 768) {
        if (width === 1440) {
          await originalDock.getByRole('button', { name: 'Pieteikt remontu', exact: true }).click();
          await modal.locator('form').waitFor();
          assert.equal(await modal.locator('[name="leadType"]').inputValue(), 'booking');
          assert.equal(await modal.locator('[name="location"]').count(), 2, 'booking chooses branch within the form');
          await page.keyboard.press('Escape');
          await modal.waitFor({ state: 'hidden' });
        }
        const price = originalDock.getByRole('link', { name: 'Uzzināt cenu', exact: true });
        assert.equal(await price.getAttribute('href'), 'https://ilab.lv/cenas');
        assert.equal(await price.getAttribute('target'), '_self');
        await price.evaluate(link => link.addEventListener('click', event => { event.preventDefault(); window.__originalPriceDestination = link.href; }));
        await price.click();
        assert.equal(await page.evaluate(() => window.__originalPriceDestination), 'https://ilab.lv/cenas');
        assert.equal(await modal.count(), 0);
      }
      if (width === 390) {
        for (const mode of ['whatsapp', 'call']) {
          const opener = originalDock.getByRole('button', { name: mode === 'call' ? 'Zvanīt' : 'WhatsApp', exact: true });
          for (let branch = 0; branch < 2; branch++) {
            await opener.click();
            await modal.waitFor();
            const choices = modal.locator(mode === 'call' ? 'a[href^="tel:"]' : 'a[href^="https://wa.me/"]');
            assert.deepEqual(await choices.evaluateAll(links => links.map(link => link.href)), contactDestinations[mode], 'original and V3 use the same branch contact destinations');
            assert.equal(await choices.count(), 2);
            await choices.nth(branch).evaluate(link => link.addEventListener('click', event => event.preventDefault()));
            await choices.nth(branch).click();
            await modal.waitFor({ state: 'hidden' });
          }
        }
      }
      if ([390, 1440].includes(width)) {
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: path.join(out, `original-${width}.png`) });
      }
    }
    report.regressions.push('original desktop/mobile/breakpoint CTA comparison, branch destinations and close-on-selection');
    assert.deepEqual(report.errors, []);
    await context.close();
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
    if (fs.existsSync(path.join(out, 'failure.txt'))) fs.unlinkSync(path.join(out, 'failure.txt'));
    console.log(JSON.stringify({ viewports: report.viewports.length, flows: report.flows.length, regressions: report.regressions, mockedRequests: report.mockedRequests, errors: report.errors, expectedErrors: report.expectedErrors, screenshots: out }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2)); fs.writeFileSync(path.join(out, 'failure.txt'), String(error.stack || error)); console.error(error); process.exitCode = 1; });
