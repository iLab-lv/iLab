import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('service CTA dock keeps the approved responsive action contract', async () => {
  const [component, styles] = await Promise.all([
    read('app/(site)/ui/bottombar/BottomBar.jsx'),
    read('app/(site)/ui/bottombar/BottomBar.module.scss'),
  ]);

  assert.match(component, /s\.contactSlot/);
  assert.match(component, /s\.bookSlot/);
  assert.match(component, /s\.pricesSlot/);
  assert.match(styles, /max-width:\s*1023px/);
  assert.match(styles, /min-width:\s*1024px/);
  assert.match(styles, /\.pricesSlot\s*\{\s*display:\s*none/);
});

test('service drawer retains accessibility, breakpoint, and production booking contracts', async () => {
  const [panel, panelStyles, booking] = await Promise.all([
    read('app/(site)/ui/panels/FullscreenPanel.jsx'),
    read('app/(site)/ui/panels/FullscreenPanel.module.scss'),
    read('app/(site)/components/booking/BookingForm.jsx'),
  ]);

  assert.match(panel, /matchMedia\('\(min-width: 1024px\)'\)/);
  assert.match(panel, /aria-modal="true"/);
  assert.match(panel, /e\.key === 'Escape'/);
  assert.match(panel, /returnFocusRef\.current\?\.focus/);
  assert.match(panelStyles, /width:\s*min\(560px, 100%\)/);
  assert.match(booking, /fetch\('\/api\/booking'/);
});

test('location drawer consumes provider-owned production data', async () => {
  const [provider, locator] = await Promise.all([
    read('app/(site)/ui/providers/UiDialogsProvider.jsx'),
    read('app/(site)/ui/panels/LocatorPanel.jsx'),
  ]);

  assert.match(provider, /siteSettings\?\.pinPositions/);
  assert.match(provider, /locations=\{locations\}/);
  assert.match(locator, /locations=\{locations\}/);
  assert.doesNotMatch(locator, /LOCATIONS|PIN_POSITIONS/);
});
