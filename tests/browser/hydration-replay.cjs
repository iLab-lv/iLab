'use strict';

// Run with the Playwright module already used by local browser QA:
// ILAB_PLAYWRIGHT_MODULE=/path/to/playwright node tests/browser/hydration-replay.cjs
// --baseline omits the backport and should fail on the pinned, affected renderer.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { pathToFileURL } = require('node:url');
const w = require('next/dist/compiled/webpack/webpack');
w.init();

async function main() {
  const { chromium } = require(process.env.ILAB_PLAYWRIGHT_MODULE || 'playwright');
  const baseline = process.argv.includes('--baseline');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ilab-hydration-replay-'));
  const entry = path.join(dir, 'entry.cjs');
  fs.writeFileSync(entry, `
const React=require('react'),{hydrateRoot}=require('react-dom/client'),h=React.createElement;
const q=new URL(location).searchParams,locale=q.get('locale'),mode=q.get('mode'),ru=locale==='ru';
window.replayErrors=[];window.clicks=0;
window.originalNodes=Array.from(document.querySelectorAll('#root *'));
const inner=h('div',{'data-inner':'yes'},h('nav',null,ru?'Навигация':'Navigācija'),h('button',{onClick:()=>window.clicks++},ru?'Действие':'Darbība'));
let child=inner;
if(mode!=='sync'){
 child=new Promise(resolve=>window.resolveChild=()=>resolve(inner));
 const then=child.then.bind(child);
 child.then=(...args)=>{window.observed=true;if(mode!=='controlled')queueMicrotask(()=>window.resolveChild());return then(...args);};
}
const hydrate=()=>hydrateRoot(document.getElementById('root'),h('div',{'data-outer':'yes'},child),{onRecoverableError:e=>window.replayErrors.push(e.message)});
if(mode==='no-transition')hydrate();else React.startTransition(hydrate);
window.rendererVersion=React.version;window.started=true;
`);
  let config = {
    mode: process.argv.includes('--development') ? 'development' : 'production', optimization: { minimize: false, minimizer: [] }, devtool: false,
    entry, output: { path: dir, filename: 'fixture.js' }, target: 'web',
    resolve: { modules: [path.join(process.cwd(), 'node_modules')], alias: {
      'react$': require.resolve('next/dist/compiled/react'),
      'react-dom/client$': require.resolve('next/dist/compiled/react-dom/client'),
      'react-dom$': require.resolve('next/dist/compiled/react-dom'),
    } }, module: { rules: [] },
  };
  if (!baseline) {
    const { default: nextConfig } = await import(pathToFileURL(path.resolve('next.config.mjs')).href);
    config = nextConfig.webpack(config, { isServer: false });
  }
  await new Promise((resolve, reject) => w.webpack(config, (error, stats) =>
    error || stats.hasErrors() ? reject(error || new Error(stats.toString({ all: false, errors: true }))) : resolve()));
  const server = http.createServer((request, response) => {
    if (request.url === '/fixture.js') {
      response.setHeader('Content-Type', 'application/javascript');
      return fs.createReadStream(path.join(dir, 'fixture.js')).pipe(response);
    }
    const ru = new URL(request.url, 'http://localhost').searchParams.get('locale') === 'ru';
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.end('<!doctype html><html><head></head><body><div id="root"><div data-outer="yes"><div data-inner="yes"><nav>' +
      (ru ? 'Навигация' : 'Navigācija') + '</nav><button>' + (ru ? 'Действие' : 'Darbība') +
      '</button></div></div></div><script src="/fixture.js"></script></body></html>');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  const results = [];
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.ILAB_CHROME ? { executablePath: process.env.ILAB_CHROME } : {}) });
    const page = await browser.newPage();
    for (const locale of ['lv', 'ru']) for (const mode of ['sync', 'no-transition', 'controlled', 'microtask']) {
      for (let repeat = 0; repeat < (mode === 'microtask' ? 10 : 1); repeat++) {
        await page.goto('http://127.0.0.1:' + server.address().port + '/?locale=' + locale + '&mode=' + mode);
        if (mode === 'controlled') {
          await page.waitForFunction(() => window.observed);
          await page.evaluate(() => window.resolveChild());
        }
        await page.waitForLoadState('networkidle');
        await page.getByRole('button').click();
        const result = await page.evaluate(() => ({
          errors: window.replayErrors,
          sameNodes: window.originalNodes.every((node, i) => node === document.querySelectorAll('#root *')[i]),
          clicks: window.clicks, version: window.rendererVersion,
          nesting: document.querySelector('[data-outer]')?.firstElementChild?.hasAttribute('data-inner'),
        }));
        results.push({ locale, mode, repeat, ...result });
      }
    }
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
  const output = process.env.ILAB_REPLAY_OUTPUT;
  if (output) fs.writeFileSync(output, JSON.stringify({ baseline, results }, null, 2));
  const failures = results.filter(r => r.errors.length || !r.sameNodes || !r.nesting || r.clicks !== 1);
  console.log(JSON.stringify({ baseline, checks: results.length, failed: failures.length, hydrationErrors: results.reduce((n, r) => n + r.errors.length, 0), replacedDom: results.filter(r => !r.sameNodes).length }));
  assert.equal(failures.length, 0, 'Hydration must reuse every server node across a microtask child resolution and preserve its handler');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
