import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Exercise the real shared runtime without a DOM package or a browser dependency.
const source = fs.readFileSync(new URL('../app/(site)/serviceMotionRuntime.js', import.meta.url), 'utf8');
const { startServiceMotion } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('Service CSS ownership skips H1 WAAPI while legacy entrance and teardown remain intact', () => {
  const calls = [], cancelled = [];
  const animate = (frames, options) => { const animation = { finished: new Promise(() => {}), cancel: () => cancelled.push(animation) }; calls.push({ frames, options }); return animation; };
  const heading = { tagName: 'H1', dataset: {}, children: [], hasAttribute: () => false, getBoundingClientRect: () => ({ top: 100 }), animate };
  const section = { ...heading, tagName: 'H2', dataset: { rise: 'process' } };
  const main = { querySelector: () => null, querySelectorAll: selector => selector === '[data-rise], h1:not([data-rise])' ? [heading, section] : [], addEventListener() {}, removeEventListener() {} };
  const root = { querySelector: selector => selector === 'main' ? main : null };
  const globals = { Element: class {}, IntersectionObserver: class { disconnect() {} }, innerHeight: 823, innerWidth: 412, scrollY: 0, window: { addEventListener() {}, removeEventListener() {} }, document: {}, requestAnimationFrame: () => 1, cancelAnimationFrame() {} };
  const previous = new Map(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  try {
    for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { value, configurable: true });
    Element.prototype.animate = animate;
    const stop = startServiceMotion(root, { protectHeadlinePresentation: true });
    assert.equal(calls.length, 1, 'only section entrance stays owned by WAAPI');
    assert.equal(calls[0].frames[0].transform, 'translateY(20px)');
    stop(); assert.equal(cancelled.length, 1);
    calls.length = 0;
    const stopLegacy = startServiceMotion(root);
    assert.equal(calls.length, 2, 'protected default consumer keeps both entrances');
    assert.deepEqual(calls[0].frames[0], { transform: 'translateY(100%)', opacity: 0 });
    assert.equal(calls[0].options.duration, 900);
    assert.equal(calls[0].options.easing, 'cubic-bezier(.16,1,.3,1)');
    assert.equal(calls[0].options.fill, 'both');
    stopLegacy(); assert.equal(cancelled.length, 3);
  } finally {
    for (const [key, descriptor] of previous) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; }
  }
});
