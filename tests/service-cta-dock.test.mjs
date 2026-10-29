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

test('service shell uses the redesign header controls and removes legacy fixed controls', async () => {
  const [layout, actions, navStyles, buttonStyles] = await Promise.all([
    read('app/(site)/layout.jsx'),
    read('app/(site)/ui/navbar/HeaderActions.jsx'),
    read('app/(site)/ui/navbar/NavBar.module.scss'),
    read('app/(site)/components/button/Button.module.scss'),
  ]);

  assert.doesNotMatch(layout, /controlsDesktopOnly|<Controls/);
  assert.match(actions, /href="\/shop"/);
  assert.match(actions, /<LanguageSwitcher/);
  assert.match(actions, /className=\{s\.shopSwitch\}/);
  assert.match(navStyles, /height:\s*72px/);
  assert.match(navStyles, /border-radius:\s*0/);
  assert.match(buttonStyles, /font-family:\s*'Geologica'/);
  assert.match(buttonStyles, /border-radius:\s*0/);
  assert.doesNotMatch(buttonStyles, /backdrop-filter|box-shadow:\s*\$shadow/);
});

test('service shell keeps the approved global layout and production-backed footer contracts', async () => {
  const [layoutStyles, footer, footerStyles, navigation] = await Promise.all([
    read('app/(site)/Layout.module.scss'),
    read('app/(site)/ui/footer/Footer.jsx'),
    read('app/(site)/ui/footer/Footer.module.scss'),
    read('app/(site)/ui/navbar/navigation.config.js'),
  ]);

  assert.match(layoutStyles, /--service-container:\s*1440px/);
  assert.match(layoutStyles, /--service-margin:\s*96px/);
  assert.match(footer, /siteSettings\?\.locations/);
  assert.match(footer, /Object\.entries\(SOCIALS\)/);
  assert.match(footerStyles, /grid-template-columns:\s*repeat\(12/);
  assert.match(footerStyles, /min-width:\s*1024px/);
  assert.match(navigation, /menuOnly:\s*true/);
  assert.match(navigation, /fotoaparatu-remonts/);
  assert.match(navigation, /\/ru\/kontakty/);
});
