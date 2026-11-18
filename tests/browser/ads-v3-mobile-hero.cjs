'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const sharp = require('sharp');
const { chromium } = require(path.join(os.tmpdir(), 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_ADS_V3_BASE || 'http://localhost:3116';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const out = path.resolve('tmp/ads-v3-mobile-hero');
fs.mkdirSync(out, { recursive: true }); fs.writeFileSync(path.join(out, '.gitignore'), '*\n');
const beforePath = path.join(out, 'before.json');
const baseline = fs.existsSync(beforePath) ? JSON.parse(fs.readFileSync(beforePath)) : [];
const report = { viewports: [], flows: [], errors: [] };
(async () => {
  const { data, info } = await sharp('public/images/categories/landing_hero.webp').raw().toBuffer({ resolveWithObject: true });
  const alpha = { left: info.width, top: info.height, right: 0, bottom: 0 };
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * info.channels + 3] >= 180) {
    alpha.left = Math.min(alpha.left, x); alpha.right = Math.max(alpha.right, x);
    alpha.top = Math.min(alpha.top, y); alpha.bottom = Math.max(alpha.bottom, y);
  }
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.addCookies([{ name: 'ilab_cookie_consent', value: 'accepted', url: base }]);
    await context.route('**/*', route => ['localhost', '127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.fulfill({ status: 200, body: '' }));
    await context.route('**/api/booking', route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
    const measure = () => page.evaluate(() => {
      const hero = document.querySelector('[aria-labelledby="ads-v3-title"]');
      const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
      return {
        hero: rect(hero), title: rect(hero.querySelector('h1')), image: rect(hero.querySelector('img')),
        branches: [...hero.querySelectorAll('[data-ads-v3-branch]')].map(rect), trust: [...hero.querySelectorAll('ul li')].map(rect),
        sections: [...document.querySelector('#ads-v3-main').children].filter(element => element.id !== 'trust').map(element => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height })),
      };
    });
    for (const locale of ['lv', 'ru']) for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
      const height = width < 768 ? 844 : 1000;
      await page.setViewportSize({ width, height });
      const response = await page.goto(`${base}/adsV3?lang=${locale}`, { waitUntil: 'networkidle', timeout: 90000 });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const hero = page.locator('[aria-labelledby="ads-v3-title"]'), art = hero.locator('[data-ads-v3-art]');
      await art.evaluate(image => image.decode());
      const current = await measure(), previous = baseline.find(item => item.locale === locale && item.width === width);
      assert.equal(await hero.locator('h1').innerText().then(text => text.replace(/\s+/g, ' ').trim()), locale === 'lv' ? 'Telefonu remonts tajā pašā dienā Rīgā.' : 'Ремонт телефонов в Риге в тот же день.');
      assert.notEqual(await hero.locator('[data-signature]').evaluate(element => getComputedStyle(element).textShadow), 'none');
      assert.equal(await hero.locator('[data-hero-reviews]').getAttribute('href'), '#reviews');
      assert.ok(await hero.locator('[data-hero-reviews]').getAttribute('aria-label'));
      assert.equal(await hero.locator('ul li').count(), 4);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      if (previous) for (let index = 1; index < current.sections.length; index++) {
        if (index === 2) continue; // Speed section intentionally gains a stronger booking panel.
        assert.ok(Math.abs(current.sections[index].height - previous.sections[index].height) < 1, `${locale}:${width}: section ${index} height unchanged`);
        assert.equal(current.sections[index].width, previous.sections[index].width);
      }
      if (width <= 768) {
        assert.equal(await hero.locator('[class*="heroGrid"]').evaluate(element => getComputedStyle(element).paddingTop), '64px', 'mobile hero has deliberate clearance below the header');
        assert.equal(await hero.locator('p').first().isVisible(), false, 'long desktop introduction is hidden');
        assert.equal(await hero.locator('p:visible').count(), 1, 'one qualified support statement');
        assert.equal(await hero.locator('[data-ads-v3-action]:visible').count(), 0, 'no extra mobile hero CTA');
        assert.equal(await art.evaluate(image => getComputedStyle(image.closest('figure')).position), 'absolute');
        const phone = { left: current.image.x + current.image.width * alpha.left / info.width, right: current.image.x + current.image.width * alpha.right / info.width,
          top: current.image.y + current.image.height * alpha.top / info.height, bottom: current.image.y + current.image.height * alpha.bottom / info.height };
        assert.ok(phone.left >= -1 && phone.right <= width + 1, 'solid phone artwork fits horizontally');
        assert.ok(phone.top >= current.hero.y - 1 && phone.bottom <= current.hero.y + current.hero.height + 1, 'device is not clipped by the hero');
        const dock = await page.locator('[data-ads-v3-dock="mobile"]').boundingBox();
        assert.ok((phone.right - phone.left) * (Math.min(phone.bottom, dock.y) - phone.top) > width * height * .2, 'recognizable artwork occupies a substantial initial viewport area');
        assert.ok(current.trust.every(box => box.y + box.height < dock.y - 8));
        assert.ok(current.branches.every(box => box.y + box.height < dock.y - 8));
        const order = await hero.evaluate(element => ['[data-hero-reviews]', 'h1', 'p:last-of-type', 'nav', 'ul'].map(selector => { const r = element.querySelector(selector).getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; }));
        for (let index = 1; index < order.length; index++) assert.ok(order[index].top >= order[index - 1].bottom - 1, 'mobile content blocks do not overlap');
        const links = hero.locator('[data-ads-v3-branch]');
        assert.ok(await hero.locator('nav a > span > span').evaluateAll(elements => elements.every(element => getComputedStyle(element).display === 'none')));
        if (previous) assert.ok(current.hero.height < previous.hero.height * .85, 'hero is noticeably more compact');
        if ([360, 390].includes(width)) {
          await page.screenshot({ path: path.join(out, `after-${locale}-${width}.png`) });
          const files = [locale === 'lv' ? path.join(out, `original-lv-${width}.png`) : null, path.join(out, `before-${locale}-${width}.png`), path.join(out, `after-${locale}-${width}.png`)].filter(file => file && fs.existsSync(file));
          if (files.length > 1) await sharp({ create: { width: width * files.length, height, channels: 3, background: '#070a0d' } }).composite(files.map((input, index) => ({ input, left: width * index, top: 0 }))).png().toFile(path.join(out, `compare-${locale}-${width}.png`));
        }
        for (const link of await links.all()) {
          const id = await link.getAttribute('data-ads-v3-branch');
          await link.click();
          assert.equal(await page.locator('#locations').getAttribute('data-selected-branch'), id);
          assert.equal(await page.locator('[data-location-photo]').getAttribute('data-location-photo'), id);
          assert.equal(await page.getByRole('dialog').count(), 0);
          await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        }
        await hero.locator('[data-hero-reviews]').click();
        assert.equal(new URL(page.url()).hash, '#reviews');
        assert.equal(await page.getByRole('dialog').count(), 0);
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        for (const action of ['call', 'whatsapp']) {
          await page.locator(`[data-ads-v3-action="dock-${action}"]`).click();
          const modal = page.getByRole('dialog'); await modal.waitFor();
          assert.equal(await modal.locator(action === 'call' ? '[data-contact-call]' : '[data-contact-whatsapp]').count(), 2);
          await page.keyboard.press('Escape'); await page.locator('[role="dialog"]').waitFor({ state: 'detached' });
        }
        report.flows.push(`${locale}:${width}: branch preselection and both existing contact selectors`);
      } else if (previous) {
        for (const key of ['hero', 'title', 'image', 'branches', 'trust']) assert.deepEqual(current[key], previous[key], `${locale}:${width}: desktop ${key} unchanged`);
      }
      const stable = (await measure()).hero;
      await page.waitForTimeout(150);
      assert.deepEqual((await measure()).hero, stable, 'loaded hero layout stays stable');
      report.viewports.push({ locale, width, beforeHeight: previous?.hero.height, afterHeight: current.hero.height });
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/adsV3?lang=lv', { waitUntil: 'networkidle' });
    const titleY = await page.locator('h1').evaluate(element => element.getBoundingClientRect().top + scrollY);
    await page.evaluate(() => scrollTo({ top: 250, behavior: 'instant' }));
    await page.waitForFunction(() => new DOMMatrix(getComputedStyle(document.querySelector('[data-ads-v3-art]')).transform).a > 1.01);
    assert.equal(await page.locator('h1').evaluate(element => element.getBoundingClientRect().top + scrollY), titleY);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('[data-ads-v3-art]').style.transform);
    report.flows.push('existing artwork scroll motion and reduced-motion teardown remain functional');
    // Enlarged text must grow the mobile hero rather than clip or overlap it.
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto(base + '/adsV3?lang=ru', { waitUntil: 'networkidle' });
    await page.locator('[aria-labelledby="ads-v3-title"]').evaluate(hero => {
      const nodes = [...hero.querySelectorAll('*')].filter(element => [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()));
      const sizes = nodes.map(element => parseFloat(getComputedStyle(element).fontSize));
      nodes.forEach((element, index) => element.style.fontSize = sizes[index] * 2 + 'px');
    });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    const clippedText = await page.locator('[aria-labelledby="ads-v3-title"]').evaluate(hero => {
      const walker = document.createTreeWalker(hero, NodeFilter.SHOW_TEXT), clipped = [];
      while (walker.nextNode()) {
        if (!walker.currentNode.textContent.trim()) continue;
        const range = document.createRange(); range.selectNodeContents(walker.currentNode);
        for (const box of range.getClientRects()) if (box.width && (box.left < -.5 || box.right > innerWidth + .5)) clipped.push(walker.currentNode.textContent);
      }
      return clipped;
    });
    assert.deepEqual(clippedText, [], 'enlarged text remains inside the viewport, including the review badge');
    const enlarged = await page.locator('[aria-labelledby="ads-v3-title"]').boundingBox();
    for (const fact of await page.locator('[aria-labelledby="ads-v3-title"] ul li').all()) {
      const box = await fact.boundingBox(); assert.ok(box.x >= 0 && box.x + box.width <= 321 && box.y + box.height <= enlarged.y + enlarged.height);
    }
    report.flows.push('320px RU: 200% text grows naturally without horizontal overflow');
    assert.deepEqual(report.errors, []);
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
