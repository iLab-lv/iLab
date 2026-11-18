'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const sharp = require('sharp');
const { chromium } = require(path.join(os.tmpdir(), 'ilab-stage2-browser-tools/node_modules/playwright'));
const base = process.env.ILAB_ADS_V3_BASE || 'http://localhost:3116';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const out = path.resolve('tmp/ads-v3-locations');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, '.gitignore'), '*\n');
const report = { viewports: [], errors: [], checks: [] };
const pinAppearance = element => {
  const pick = (style, keys) => Object.fromEntries(keys.map(key => [key, style[key]]));
  const square = element.querySelector('i'), label = element.querySelector('span');
  return {
    square: pick(getComputedStyle(square), ['width', 'height', 'backgroundColor', 'borderRadius', 'outline', 'outlineOffset']),
    label: pick(getComputedStyle(label), ['fontFamily', 'fontSize', 'fontWeight', 'fontVariationSettings', 'lineHeight', 'letterSpacing', 'padding', 'backgroundColor', 'color', 'border', 'borderRadius']),
    pulses: ['::before', '::after'].map(pseudo => pick(getComputedStyle(square, pseudo), ['animationName', 'animationDuration', 'animationDelay', 'animationTimingFunction', 'animationIterationCount', 'border', 'inset'])),
  };
};
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.addCookies([{ name: 'ilab_cookie_consent', value: 'accepted', url: base }]);
    await context.route('**/*', route => ['localhost', '127.0.0.1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.fulfill({ status: 200, body: '' }));
    await context.route('**/api/booking', route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
    const references = new Map();
    for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${base}/adsV2`, { waitUntil: 'networkidle', timeout: 90000 });
      await page.evaluate(() => document.fonts.ready);
      const pins = page.locator('#locations [class*="HomePage_mapPin__"]');
      const reduced = { selected: await pins.first().evaluate(pinAppearance), idle: await pins.last().evaluate(pinAppearance) };
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const animated = { selected: await pins.first().evaluate(pinAppearance), idle: await pins.last().evaluate(pinAppearance) };
      references.set(width, { reduced, animated });
      await page.emulateMedia({ reducedMotion: 'reduce' });
    }
    async function settle() { await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); }
    async function geometry() {
      const metrics = await page.locator('[data-location-map]').evaluate(map => {
        const box = map.getBoundingClientRect(), image = map.querySelector('[data-map-image]').getBoundingClientRect();
        return { map: { x: box.x, y: box.y, width: box.width, height: box.height }, image: { x: image.x, y: image.y, width: image.width, height: image.height }, pins: [...map.querySelectorAll('[data-location-pin]')].map(pin => {
          const marker = pin.getBoundingClientRect(), label = pin.querySelector('span').getBoundingClientRect();
          return { id: pin.dataset.locationPin, x: marker.x + marker.width / 2, y: marker.y + marker.height / 2, width: marker.width, height: marker.height, xPct: parseFloat(pin.style.left), yPct: parseFloat(pin.style.top), label: { x: label.x, right: label.right, y: label.y, bottom: label.bottom } };
        }) };
      });
      assert.ok(Math.abs(metrics.image.width - metrics.image.height) < 1, 'square map image never stretches');
      for (const pin of metrics.pins) {
        assert.ok(Math.abs(pin.x - (metrics.image.x + metrics.image.width * pin.xPct / 100)) < 1, `${pin.id}: horizontal anchor`);
        assert.ok(Math.abs(pin.y - (metrics.image.y + metrics.image.height * pin.yPct / 100)) < 1, `${pin.id}: vertical anchor`);
        assert.ok(pin.width >= 43 && pin.height >= 43, 'usable constant-sized marker');
      }
      return metrics;
    }
    for (const locale of ['lv', 'ru']) for (const width of [360, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      const response = await page.goto(`${base}/adsV3?lang=${locale}`, { waitUntil: 'networkidle', timeout: 90000 });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator('#locations'), map = section.locator('[data-location-map]');
      await map.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
      const tabs = section.locator('[role="group"] button'), markers = section.locator('[data-location-pin]');
      assert.equal(await markers.count(), 2);
      const size = await map.boundingBox();
      assert.ok(width < 768 ? size.height <= 280 : size.width / size.height >= 1.77, 'wide desktop / compact mobile map');
      for (let index = 0; index < 2; index++) {
        const id = index ? 'spice' : 'domina';
        for (const [controlIndex, control] of [markers.nth(index), tabs.nth(index)].entries()) {
          await control.click(); await settle();
          if (controlIndex === 0) {
            const heading = section.locator('#ads-v3-branch-name');
            assert.equal(await heading.evaluate(element => element === document.activeElement), true, 'pin moves keyboard focus to the selected location');
            const box = await heading.boundingBox();
            assert.ok(box.y >= 100 && box.y < 180, 'pin scrolls details below the sticky header');
          }
          assert.equal(await section.getAttribute('data-selected-branch'), id);
          assert.equal(await section.locator('[data-location-photo]').getAttribute('data-location-photo'), id);
          assert.equal(await markers.nth(index).getAttribute('aria-pressed'), 'true');
          assert.deepEqual(await markers.nth(index).evaluate(pinAppearance), references.get(width).reduced.selected, 'selected square, label and reduced-motion ring styling match actual V2');
          assert.deepEqual(await markers.nth(1 - index).evaluate(pinAppearance), references.get(width).reduced.idle, 'unselected marker styling matches actual V2');
          const pinStyle = await markers.nth(index).evaluate(element => {
            const square = getComputedStyle(element.querySelector('i')), label = getComputedStyle(element.querySelector('span'));
            return { radius: square.borderRadius, width: square.width, height: square.height, color: label.color, signal: getComputedStyle(element).getPropertyValue('--service-signal').trim(), background: label.backgroundColor };
          });
          assert.equal(pinStyle.radius, '0px'); assert.equal(pinStyle.width, pinStyle.height);
          assert.notEqual(pinStyle.color, pinStyle.background, 'selected marker keeps cyan text on a dark label');
          assert.equal(await tabs.nth(index).getAttribute('aria-pressed'), 'true');
          assert.equal(await section.locator('h3').innerText(), await tabs.nth(index).innerText());
          const expectedTel = await page.locator('header a[href^="tel:"]').nth(index).getAttribute('href');
          const expectedWa = await page.locator('header a[href*="wa.me"]').nth(index).getAttribute('href');
          assert.equal(await section.locator('[data-contact-call]').getAttribute('href'), expectedTel);
          assert.equal(await section.locator('[data-contact-whatsapp]').getAttribute('href'), expectedWa);
          assert.ok(await section.locator('address').innerText());
          for (const link of await section.locator('[data-contact-route]').all()) {
            assert.match(await link.getAttribute('href'), /^https:\/\//);
            assert.equal(await link.getAttribute('target'), '_blank');
          }
          await geometry();
        }
        await section.locator('summary').click();
        assert.equal(await section.locator('table tr').count(), 7);
        await section.locator('summary').click();
        for (const image of await section.locator('figure img').all()) await image.evaluate(image => image.loading = 'eager');
        await page.waitForFunction(() => [...document.querySelectorAll('#locations figure img')].every(image => image.complete && image.naturalWidth > 0));
        if ([390, 1440].includes(width)) {
          // Fit this section inside a real viewport before cropping its pixels.
          // Offscreen capture can paint transformed map layers outside their clip.
          const previousViewport = page.viewportSize();
          const height = Math.ceil((await section.boundingBox()).height);
          await page.setViewportSize({ width, height: height + 120 });
          await section.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 88, behavior: 'instant' }));
          await settle();
          const box = await section.boundingBox();
          const screenshot = await page.screenshot({ animations: 'disabled', style: 'header:has([data-ads-v3-branch]), [data-ads-v3-dock], [data-ads-v3] a[href="#ads-v3-main"] { visibility: hidden !important; }' });
          await sharp(screenshot).extract({ left: Math.round(box.x), top: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) }).toFile(path.join(out, `${locale}-${width}-${id}.png`));
          await page.setViewportSize(previousViewport);
        }
      }
      // Native zoom, drag, keyboard and reset must keep image/marker coordinates aligned.
      assert.equal(await section.getByRole('button', { name: locale === 'ru' ? 'Приблизить карту' : 'Tuvināt karti', exact: true }).count(), 0, 'map zoom toolbar is removed');
      await map.focus(); await page.keyboard.press('+'); await settle();
      assert.ok(Number(await map.getAttribute('data-zoom')) > 1);
      await map.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
      const beforeDrag = await map.getAttribute('data-center-x'), bounds = await map.boundingBox();
      const start = { x: bounds.x + bounds.width * .08, y: bounds.y + bounds.height * .08 };
      assert.equal(await page.evaluate(({ x, y }) => Boolean(document.elementFromPoint(x, y)?.closest('button')), start), false, 'drag starts on map, not an interactive marker label');
      await page.mouse.move(start.x, start.y);
      await page.mouse.down(); await page.mouse.move(start.x + 30, start.y + 20, { steps: 8 }); await page.mouse.up();
      assert.notEqual(await map.getAttribute('data-center-x'), beforeDrag, `${locale}:${width}: map pan`);
      await geometry();
      await map.focus(); await page.keyboard.press('+'); await settle(); await geometry();
      await page.keyboard.press('Home'); await settle();
      assert.equal(Number(await map.getAttribute('data-zoom')), 1);
      for (const pin of (await geometry()).pins) {
        const frame = await map.boundingBox();
        assert.ok(pin.label.x >= frame.x && pin.label.right <= frame.x + frame.width, 'both marker labels accessible');
      }
      for (const link of await page.locator('[data-ads-v3-branch]:visible').all()) {
        const id = await link.getAttribute('data-ads-v3-branch');
        await link.click(); await settle();
        assert.equal(await section.getAttribute('data-selected-branch'), id);
        assert.equal(await section.locator('[data-location-photo]').getAttribute('data-location-photo'), id);
        const heading = await section.locator('h2').boundingBox();
        assert.ok(heading.y >= 70 && heading.y < 250, 'incoming location link preserves heading visibility');
        assert.equal(await page.getByRole('dialog').count(), 0);
        await geometry();
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      // Actual DOM order and bounded photo height make the mobile details reachable.
      const layout = await section.evaluate(element => {
        const map = element.querySelector('[data-location-map]').getBoundingClientRect();
        const selector = element.querySelector('[role="group"]').getBoundingClientRect();
        const photo = element.querySelector('figure').getBoundingClientRect();
        const details = element.querySelector('article').getBoundingClientRect();
        return { map: map.bottom, selector: selector.top, photo: { top: photo.top, bottom: photo.bottom, width: photo.width }, details: { top: details.top, width: details.width } };
      });
      assert.ok(layout.selector >= layout.map);
      if (width < 768) assert.ok(layout.details.top >= layout.photo.bottom && layout.details.top - layout.selector < 380);
      else assert.ok(Math.abs(layout.photo.top - layout.details.top) < 1 && layout.photo.width > size.width * .4);
      report.viewports.push({ locale, width, mapWidth: size.width, mapHeight: size.height });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      const activePin = section.locator('[data-location-pin][aria-pressed="true"]');
      assert.deepEqual(await activePin.evaluate(pinAppearance), references.get(width).animated.selected, 'V2 owns the two staggered 2.4s pulse rings and label styling');
      assert.equal(await activePin.locator('i').evaluate(element => getComputedStyle(element, '::after').animationDelay), '1.2s');
      await page.emulateMedia({ reducedMotion: 'reduce' });
    }
    // Transition behavior is checked with motion enabled and disabled.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${base}/adsV3`, { waitUntil: 'networkidle' });
    const panel = page.locator('#ads-v3-location-panel');
    await panel.scrollIntoViewIfNeeded();
    const before = await panel.boundingBox();
    const duration = await panel.locator('figure > div').first().evaluate(element => getComputedStyle(element).transitionDuration);
    assert.equal(duration, '0.22s');
    await page.locator('#locations [role="group"] button').last().click();
    const after = await panel.boundingBox();
    assert.ok(Math.abs(before.height - after.height) < 1, 'photo transition has no layout shift');
    await page.waitForFunction(() => getComputedStyle(document.querySelector('#locations figure [data-active="true"]')).opacity === '1');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await panel.locator('figure > div').first().evaluate(element => getComputedStyle(element).transitionDuration), '0s');
    report.checks.push('crossfade, stable photo frame and reduced motion');
    assert.deepEqual(report.errors, []);
    if (fs.existsSync(path.join(out, 'failure.txt'))) fs.unlinkSync(path.join(out, 'failure.txt'));
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
})().catch(error => { fs.writeFileSync(path.join(out, 'failure.txt'), error.stack); console.error(error); process.exitCode = 1; });
