import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../app/(site)/serviceMotionRuntime.js', import.meta.url), 'utf8');
const { startServiceMotion } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

function fixture(run) {
  const events = [], calls = [], frames = new Map(), listeners = new Map();
  let nextFrame = 0;
  const element = (id, top = 100) => {
    const item = {
      id, top, tagName: 'DIV', children: [], words: [], originalStyle: null,
      style: new Proxy({}, { set(target, key, value) { events.push(`write:${id}:${String(key)}`); target[key] = value; return true; } }),
      dataset: new Proxy({}, { set(target, key, value) { events.push(`write:${id}:${String(key)}`); target[key] = value; return true; } }),
      getBoundingClientRect() { events.push(`read:${id}:rect`); return { top: this.top, bottom: this.top + 400, height: 400 }; },
      getAttribute() { return this.originalStyle; },
      setAttribute(key, value) { events.push(`write:${id}:${key}`); },
      removeAttribute(key) { events.push(`write:${id}:${key}`); },
      hasAttribute() { return false; },
      closest(selector) { return selector === '[data-service-reviews]' ? {} : selector === '[data-review-location]' ? this : null; },
      addEventListener() {}, removeEventListener() {},
      querySelector() { return null; },
      querySelectorAll(selector) { return selector === '[data-review-word]' ? this.words : []; },
      appendChild() { events.push(`write:${id}:append`); },
      remove() { events.push(`write:${id}:remove`); },
      contains(target) { return target === this || this.children.includes(target); },
      animate(keyframes, options) {
        events.push(`write:${id}:animate`);
        const animation = { finished: new Promise(() => {}), pause() {}, play() {}, cancel() { events.push(`write:${id}:cancel`); } };
        calls.push({ id, keyframes, options, animation }); return animation;
      },
    };
    Object.defineProperty(item, 'textContent', { set(value) { events.push(`write:${id}:text`); item.text = value; }, get() { return item.text; } });
    return item;
  };
  const headings = [element('heading-a'), element('heading-b', 300)];
  headings.forEach(item => { item.tagName = 'H2'; item.dataset.rise = 'process'; });
  const scan = element('scan'); scan.dataset.scan = 'x';
  const pageScan = element('page-scan'), header = element('header');
  const rows = element('rows'); rows.children = [element('row-a'), element('row-b')];
  const hero = element('hero'), image = element('image'); hero.querySelector = () => image;
  const lists = [element('list-a', 600), element('list-b', 600)];
  lists.forEach(list => {
    list.reviews = [element(`${list.id}-review-a`), element(`${list.id}-review-b`)];
    list.reviews.forEach(review => { review.words = [element(`${review.id}-word-a`), element(`${review.id}-word-b`)]; });
    list.querySelectorAll = selector => selector === '[data-home-review]' ? list.reviews : [];
  });
  const counters = [element('counter-a'), element('counter-b')]; counters.forEach(item => { item.dataset.count = '4.8'; });
  const home = { querySelector: selector => selector === '#home-hero' ? hero : null };
  const main = {
    querySelector: selector => selector === '[data-homepage]' ? home : null,
    querySelectorAll: selector => ({ '[data-rise], h1:not([data-rise])': headings, '[data-scan]': [scan], '[data-stagger], [data-rows]': [rows], '[data-home-reviews]': lists, '[data-count]': counters }[selector] || []),
    addEventListener(name, callback) { listeners.set(name, callback); }, removeEventListener(name) { listeners.delete(name); },
  };
  const root = { querySelector: selector => ({ main, '[data-page-scan]': pageScan, 'header[role="banner"]': header }[selector] || null) };
  const globals = {
    Element: class {}, innerHeight: 823, innerWidth: 412, scrollY: 0,
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() { events.push('disconnect'); } },
    document: { createElement: () => element('scan-line') },
    window: { getSelection: () => null, addEventListener(name, callback) { listeners.set(name, callback); }, removeEventListener(name) { listeners.delete(name); } },
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { frames.delete(id); },
    getComputedStyle(item) { events.push(`read:${item.id}:opacity`); return { opacity: '.37' }; },
  };
  const previous = new Map(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  try {
    for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    // Browser viewport properties are native layout reads, not plain numbers.
    for (const key of ['innerHeight', 'innerWidth', 'scrollY']) {
      let value = globals[key];
      Object.defineProperty(globalThis, key, {
        configurable: true,
        get() { events.push(`read:viewport:${key}`); return value; },
        set(next) { value = next; },
      });
    }
    Element.prototype.animate = () => {};
    events.length = 0;
    run({ events, calls, lists, listeners, counters, frames, start: options => startServiceMotion(root, options),
      tick(now) { const [id, callback] = frames.entries().next().value; frames.delete(id); callback(now); } });
  } finally {
    for (const [key, descriptor] of previous) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; }
  }
}

const assertReadsBeforeWrites = events => {
  const firstWrite = events.findIndex(event => event.startsWith('write:'));
  assert.ok(firstWrite >= 0, 'exercise real animation/style writes');
  assert.equal(events.slice(firstWrite).some(event => event.startsWith('read:')), false, events.join('\n'));
};

test('Service batches initial geometry without changing entrance animation options or cleanup', () => {
  let legacyCalls;
  fixture(({ start, events, calls }) => {
    const stop = start();
    const firstWrite = events.findIndex(event => event.startsWith('write:'));
    assert.ok(events.slice(firstWrite).some(event => event.startsWith('read:')), 'legacy retains interleaved initialization');
    legacyCalls = calls.map(({ id, keyframes, options }) => ({ id, keyframes, options }));
    stop();
  });
  fixture(({ start, events, calls, frames, listeners }) => {
    const stop = start({ batchLayoutReads: true });
    assertReadsBeforeWrites(events);
    assert.deepEqual(calls.map(({ id, keyframes, options }) => ({ id, keyframes, options })), legacyCalls);
    stop();
    assert.equal(frames.size, 0); assert.equal(listeners.size, 0);
    assert.equal(events.filter(event => event.endsWith(':cancel')).length, calls.length);
    assert.ok(events.includes('write:scan-line:remove'));
  });
});

test('Service remeasures each frame before writes and preserves in-flight word opacity on reversal', () => fixture(({ start, tick, events, lists, calls, listeners }) => {
  const stop = start({ batchLayoutReads: true });
  events.length = 0; tick(100); assertReadsBeforeWrites(events);
  lists.forEach(list => { list.top = -300; });
  events.length = 0; tick(200); assertReadsBeforeWrites(events);
  const forward = calls.filter(call => call.id.includes('-word-'));
  assert.equal(forward.length, 8);
  forward.forEach(call => assert.equal(call.keyframes[0].opacity, '.37'));
  assert.equal(forward[0].options.duration, 420);
  assert.equal(forward[1].options.delay, 18);
  globalThis.scrollY = -1; lists.forEach(list => { list.top = 600; });
  events.length = 0; tick(300); assertReadsBeforeWrites(events);
  const reversed = calls.filter(call => call.id.includes('-word-')).slice(8);
  assert.equal(reversed.length, 8); assert.equal(reversed[0].options.delay, 18); assert.equal(reversed[1].options.delay, 0);
  reversed.forEach(call => assert.equal(call.keyframes[0].opacity, '.37'));
  // Pagination replaces nodes: the next frame must sample the replacement group.
  lists[0].reviews = lists[0].reviews.slice(1); listeners.get('ilab:reviews-change')({ target: lists[0] });
  events.length = 0; tick(400); assertReadsBeforeWrites(events);
  assert.equal(events.filter(event => event === 'read:list-a:rect').length, 1);
  stop();
}));


test('ads-v3 retains its original operation sequence even if batching is requested', () => {
  const recordings = [];
  for (const batchLayoutReads of [false, true]) fixture(({ start, events, calls, tick }) => {
    const stop = start({ profile: 'ads-v3', batchLayoutReads });
    tick(100); stop();
    recordings.push({ events: [...events], calls: calls.map(({ id, keyframes, options }) => ({ id, keyframes, options })) });
  });
  assert.deepEqual(recordings[1], recordings[0]);
});
