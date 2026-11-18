'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const sharp = require('sharp');
const { chromium } = require(path.join(os.tmpdir(), 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_ADS_V3_BASE || 'http://localhost:3116';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const out = path.resolve('tmp/ads-v3-polish');
fs.mkdirSync(out, { recursive: true }); fs.writeFileSync(path.join(out, '.gitignore'), '*\n');
const report = { viewports: [], reviews: [], errors: [], regressions: [] };
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const context = await browser.newContext({ reducedMotion: 'no-preference' });
    await context.addCookies([{ name: 'ilab_cookie_consent', value: 'accepted', url: base }]);
    await context.route('**/*', route => ['localhost', '127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.fulfill({ status: 200, body: '' }));
    await context.route('**/api/booking', route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
    async function load(locale) {
      const response = await page.goto(`${base}/adsV3?lang=${locale}`, { waitUntil: 'networkidle', timeout: 90000 });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
    }
    async function captureSection(selector, filename) {
      const section = page.locator(selector), previous = page.viewportSize();
      const height = Math.ceil((await section.boundingBox()).height);
      await page.setViewportSize({ width: previous.width, height: height + 120 });
      await section.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 88, behavior: 'instant' }));
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const box = await section.boundingBox();
      const buffer = await page.screenshot({ style: 'header:has([data-ads-v3-branch]), [data-ads-v3-dock], [data-ads-v3] a[href="#ads-v3-main"] { visibility: hidden !important; }' });
      await sharp(buffer).extract({ left: Math.round(box.x), top: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) }).toFile(path.join(out, filename));
      await page.setViewportSize(previous);
    }
    for (const locale of ['lv', 'ru']) for (const width of [320, 390, 768, 1024, 1440]) {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await load(locale);
      const badge = page.locator('[data-hero-reviews]'), title = page.locator('h1'), art = page.locator('[data-ads-v3-art]');
      const badgeBox = await badge.boundingBox(), titleBox = await title.boundingBox();
      assert.ok(badgeBox.y + badgeBox.height < titleBox.y, 'badge precedes headline without overlap');
      assert.equal(await badge.getAttribute('href'), '#reviews');
      if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(out, `${locale}-${width}-hero.png`) });
      const dimensions = await art.evaluate(element => [element.offsetWidth, element.offsetHeight]);
      const speedColors = await page.locator('#speed').evaluate(element => ({ background: getComputedStyle(element).backgroundColor, color: getComputedStyle(element).color }));
      assert.deepEqual(speedColors, { background: 'rgb(11, 19, 26)', color: 'rgb(242, 245, 247)' }, 'speed uses the V3 dark field');
      const factSizes = await page.locator('#speed [data-v3-sequence] h3').evaluateAll(elements => elements.map(element => parseFloat(getComputedStyle(element).fontSize)));
      assert.ok(factSizes[0] > factSizes[1] * 1.7, 'repair time leads the speed hierarchy');
      assert.deepEqual(await page.locator('#trust article strong').allTextContents().then(values => values.slice(0, 2)), ['13+', '20K+']);
      assert.ok((await page.locator('#trust article').last().innerText()).includes(await badge.locator(':scope > strong').innerText()), 'trust rating agrees with the hero range');
      assert.equal(await page.locator('#speed + #trust + #services').count(), 1, 'V2 trust placement is preserved');
      const documentTitleY = titleBox.y;
      await page.evaluate(() => scrollTo({ top: document.querySelector('[aria-labelledby="ads-v3-title"]').offsetHeight * .5, behavior: 'instant' }));
      await page.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('[data-ads-v3-art]')).transform).a > 1.02);
      const scale = await art.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a);
      assert.ok(scale >= 1.02 && scale <= 1.071);
      assert.deepEqual(await art.evaluate(element => [element.offsetWidth, element.offsetHeight]), dimensions, 'art transforms do not change layout dimensions');
      assert.ok(Math.abs(await title.evaluate(element => element.getBoundingClientRect().y + scrollY) - documentTitleY) < 1, 'headline remains stable');
      for (const selector of ['#speed h2', '#process h2', '#final-cta h2']) {
        const heading = page.locator(selector);
        assert.notEqual(await heading.evaluate(element => getComputedStyle(element).opacity), '0', 'content is never hidden waiting for animation');
        await heading.scrollIntoViewIfNeeded();
        await page.waitForFunction(selector => document.querySelector(selector).dataset.v3Revealed === 'true', selector);
      }
      for (const selector of ['[data-v3-sequence="facts"]', '[data-v3-sequence="steps"]', '[data-v3-sequence="trust"]', '[data-v3-sequence="delivery"]']) {
        const items = page.locator(selector).locator(':scope > *');
        for (const item of await items.all()) {
          await item.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight * .45, behavior: 'instant' }));
          await page.waitForFunction(element => element.dataset.v3Revealed === 'true', await item.elementHandle());
          assert.notEqual(await item.evaluate(element => getComputedStyle(element).opacity), '0');
        }
      }
      if ([390, 1440].includes(width)) {
        for (const selector of ['#speed h2', '#speed [data-v3-sequence] h3', '#process li h3', '#trust strong', '#delivery ol li h3']) {
          const target = page.locator(selector).first();
          for (let visit = 0; visit < 2; visit++) {
            await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            await target.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight * .45, behavior: 'instant' }));
            await page.waitForFunction(selector => document.querySelector(selector).getAnimations().some(animation => animation.playState === 'running'), selector);
          }
          await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
          await page.waitForFunction(selector => document.querySelector(selector).getAnimations().length === 0, selector);
          assert.equal(await target.evaluate(element => getComputedStyle(element).opacity), '1', 'offscreen exit cancels enhancement into readable CSS');
        }
      }
      if (width >= 1024) {
        for (const button of await page.locator('header a[href^="tel:"], header a[data-contact-whatsapp]').all()) {
          assert.equal(await button.evaluate(element => getComputedStyle(element).borderRadius), '0px', 'topbar contact controls are square');
        }
      }
      if (width >= 1280) {
        await page.waitForFunction(() => document.querySelectorAll('[data-service-rulers] nav button').length === 11);
        const trustTarget = page.locator('[data-service-rulers] nav button').nth(3);
        assert.match(await trustTarget.getAttribute('aria-label'), /iLab/);
        await trustTarget.click();
        await page.waitForFunction(() => document.querySelectorAll('[data-service-rulers] nav button')[3].getAttribute('aria-current') === 'location');
      }
      const reviews = page.locator('[data-service-reviews]'), branch = reviews.locator('[data-review-location]').first(), list = branch.locator('[data-home-reviews]');
      const source = await list.innerText(), rating = await branch.locator('[data-review-rating]').innerText();
      await page.mouse.move(0, 0);
      await list.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight * .65, behavior: 'instant' }));
      await page.waitForFunction(() => document.querySelector('[data-review-location] [data-home-review]').dataset.reviewFocus === 'true');
      await page.waitForFunction(() => ![...document.querySelectorAll('[data-review-motion] [data-review-word]')].some(element => element.getAnimations().some(animation => animation.playState === 'running')));
      await list.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - (innerHeight * .68 - .8 * (element.offsetHeight + innerHeight * .26)), behavior: 'instant' }));
      await page.waitForFunction(() => [...document.querySelectorAll('[data-review-location] [data-home-reviews]')][0].querySelectorAll('[data-home-review]')[1].dataset.reviewFocus === 'true');
      await page.waitForFunction(() => ![...document.querySelectorAll('[data-review-motion] [data-review-word]')].some(element => element.getAnimations().some(animation => animation.playState === 'running')));
      const opacities = await list.locator('[data-review-word]').evaluateAll(elements => elements.map(element => Number(getComputedStyle(element).opacity)));
      assert.ok(opacities.every(opacity => opacity >= .649 && opacity <= 1), 'inactive review words stay readable');
      assert.ok(opacities.some(opacity => opacity < .7) && opacities.some(opacity => opacity > .99), 'scroll changes the active review emphasis');
      if (width >= 1024) {
        const columns = await reviews.locator('[data-home-reviews]').evaluateAll(lists => lists.map(list => [...list.querySelectorAll('[data-home-review]')].map(review => ({ active: review.dataset.reviewFocus, opacity: getComputedStyle(review.querySelector('[data-review-word]')).opacity }))));
        assert.deepEqual(columns[0], columns[1], 'desktop columns use the same row emphasis and opacity');
      }
      assert.equal(await list.innerText(), source, 'scroll never replaces review content');
      await list.locator('[data-home-review]').last().hover();
      await list.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight * .65, behavior: 'instant' }));
      await page.waitForFunction(() => document.querySelector('[data-review-location] [data-home-review]').dataset.reviewFocus === 'true');
      await page.waitForFunction(() => ![...document.querySelectorAll('[data-review-motion] [data-review-word]')].some(element => element.getAnimations().some(animation => animation.playState === 'running')));
      assert.ok(await list.locator('[data-review-word]').evaluateAll(words => words.some(word => Number(getComputedStyle(word).opacity) < .7)), 'resting pointer does not suppress scroll emphasis');
      await branch.locator('nav button').last().focus();
      await page.waitForFunction(() => [...document.querySelector('[data-review-location] [data-home-reviews]').querySelectorAll('[data-review-word]')].every(element => getComputedStyle(element).opacity === '1'));
      if (width >= 1024) assert.ok(await reviews.locator('[data-review-word]').evaluateAll(words => words.every(word => getComputedStyle(word).opacity === '1')), 'reading either desktop column pauses fading in both columns');
      const next = branch.locator('nav button').last();
      if (await next.count() && await next.getAttribute('aria-disabled') === 'false') {
        await next.focus();
        const reviewHeight = (await reviews.boundingBox()).height;
        const outgoing = await next.evaluate(element => {
          element.click(); element.click(); element.click();
          const list = element.closest('[data-review-location]').querySelector('[data-home-reviews]');
          return { text: list.innerText, fading: list.getAnimations().some(animation => animation.playState === 'running') };
        });
        assert.ok(outgoing.fading, 'explicit navigation starts its outgoing fade immediately');
        assert.equal(outgoing.text, source, 'outgoing fade retains the current pair before replacement');
        await page.waitForFunction(text => document.querySelector('[data-review-location] [data-home-reviews]').innerText !== text, source);
        await page.waitForFunction(() => !document.querySelector('[data-review-location] [data-home-reviews]').getAttribute('aria-busy'));
        await page.waitForFunction(() => !document.querySelector('[data-review-location] [data-home-reviews]').getAnimations().some(animation => animation.playState === 'running'));
        assert.equal(await list.evaluate(element => getComputedStyle(element).opacity), '1', 'rapid repeat clicks leave no stale outgoing fade');
        assert.equal(await next.evaluate(element => element === document.activeElement), true);
        assert.ok(Math.abs((await reviews.boundingBox()).height - reviewHeight) < 2, `${locale}:${width}: pagination keeps review section height stable`);
        assert.equal(await branch.locator('[data-review-rating]').innerText(), rating);
        report.reviews.push(`${locale}:${width}: word fade, interaction lock, manual fade-out/in, stable height, focus and unchanged ratings`);
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(() => !document.querySelector('[data-ads-v3-art]').style.transform);
      assert.ok((await list.locator('[data-review-word]').evaluateAll(elements => elements.map(element => getComputedStyle(element).opacity))).every(opacity => opacity === '1'));
      const faq = page.locator('#faq details').last();
      await faq.locator('summary').click(); assert.equal(await faq.evaluate(element => element.open), true);
      await faq.locator('summary').click(); assert.equal(await faq.evaluate(element => element.open), false);
      await page.locator('#locations [role="group"] button').last().click();
      assert.equal(await page.locator('#locations').getAttribute('data-selected-branch'), 'spice');
      assert.equal(await page.locator('[data-location-photo]').getAttribute('data-location-photo'), 'spice');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      report.viewports.push({ locale, width, scale });
      if ([390, 1440].includes(width)) {
        await load(locale);
        for (const image of await page.locator('main img').all()) await image.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => [...document.querySelectorAll('main img')].every(image => image.complete && image.naturalWidth > 0));
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: path.join(out, `${locale}-${width}-full.png`), fullPage: true });
        if (width === 1440) {
          await captureSection('[data-service-reviews]', `${locale}-reviews.png`);
          await captureSection('#final-cta', `${locale}-final.png`);
        }
      }
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(base + '/adsV2', { waitUntil: 'networkidle', timeout: 90000 });
    assert.equal(await page.locator('[data-review-motion="landing"]').count(), 0, 'main website did not opt in');
    assert.equal(await page.locator('[data-ads-v3]').count(), 0);
    await page.evaluate(() => scrollTo({ top: 400, behavior: 'instant' }));
    await page.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('[data-home-hero-image]')).transform).a > 1);
    report.regressions.push('AdsV2 retains the default motion profile and hero transform');
    // Check the main route's opt-out in SSR without loading unrelated catalog
    // link-prefetch requests during this focused local motion test.
    const staticContext = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await staticContext.newPage();
    const mainResponse = await staticPage.goto(base + '/', { waitUntil: 'domcontentloaded', timeout: 90000 });
    assert.equal(mainResponse.status(), 200);
    assert.equal(await staticPage.locator('[data-review-motion="landing"]').count(), 0);
    await staticContext.close();
    report.regressions.push('main website SSR retains the default review opt-out');
    assert.deepEqual(report.errors, []);
    if (fs.existsSync(path.join(out, 'failure.txt'))) fs.unlinkSync(path.join(out, 'failure.txt'));
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { fs.writeFileSync(path.join(out, 'failure.txt'), error.stack); console.error(error); process.exitCode = 1; });
