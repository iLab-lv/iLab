import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { restoreHydrationReplay } = require('../scripts/webpack/reactHydrationReplayLoader.cjs');
const files = ['react-dom-client.production.js', 'react-dom-client.development.js', 'react-dom-profiling.profiling.js', 'react-dom-profiling.development.js'];

test('all pinned renderer variants restore their own DOM node before replay and retain the rest of the renderer', () => {
  for (const file of files) {
    const source = readFileSync(require.resolve('next/dist/compiled/react-dom/cjs/' + file), 'utf8');
    const patched = restoreHydrationReplay(source, '15.5.29');
    assert.equal((patched.match(/ILAB_REACT_35494/g) || []).length, 1, file);
    assert.match(patched, /if \((next|unitOfWork) === hydrationParentFiber\)/);
    assert.match(patched, /nextHydratableInstance = (next|unitOfWork)\.stateNode;/);
    assert.equal(restoreHydrationReplay(patched, '15.5.29'), patched);
    const inserted = patched.slice(patched.indexOf('      // ILAB_REACT_35494'), patched.indexOf('      // ILAB_REACT_35494') + (patched.length - source.length));
    assert.equal(patched.replace(inserted, ''), source, file);
  }
});

test('framework changes and unexpected renderer structure fail closed', () => {
  const source = readFileSync(require.resolve('next/dist/compiled/react-dom/cjs/' + files[0]), 'utf8');
  assert.throws(() => restoreHydrationReplay(source, '16.4.0'), /version changed/);
  assert.throws(() => restoreHydrationReplay(source.replace('function replaySuspendedUnitOfWork', 'function changedReplay'), '15.5.29'), /unexpected renderer structure/);
});

test('backport only enters the client webpack graph and versions generated cache', async () => {
  const { default: config } = await import('../next.config.mjs');
  const make = () => ({ module: { rules: [] }, resolve: { alias: {} }, cache: { version: 'existing' } });
  const client = config.webpack(make(), { isServer: false });
  assert.equal(client.module.rules.length, 1);
  assert.match(client.cache.version, /existing\|ilab-react-35494-v1/);
  for (const file of files) assert.ok(client.module.rules[0].test.test('/node_modules/next/dist/compiled/react-dom/cjs/' + file));
  assert.ok(!client.module.rules[0].test.test('/node_modules/react-dom/cjs/react-dom-client.production.js'));
  assert.ok(!client.module.rules[0].test.test('/node_modules/next/dist/compiled/react-dom-experimental/cjs/react-dom-client.production.js'));
  assert.equal(config.webpack(make(), { isServer: true }).module.rules.length, 0);
});
