import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => readFile(path.join(root, file), 'utf8');
const dataUrl = (source) => 'data:text/javascript;base64,' + Buffer.from(source).toString('base64');
const fixtureDb = dataUrl(`export const db = { collection(name) { return { async get() { return { docs: (name === 'categories' ? [{ slug: 'plansetdatoru-remonts', brands: [{ key: 'ipad', route: { preferDedicatedHub: true, dedicatedHubPath: '/plansetdatoru-remonts/ipad' } }] }, { slug: 'telefonu-remonts', brands: [{ key: 'apple', route: { preferDedicatedHub: true, dedicatedHubPath: '/iphone-remonts' } }] }] : []).map(data => ({ id: data.slug, data: () => data })) }; } }; } };`);
const modules = new Map();
async function moduleUrl(file) {
  if (modules.has(file)) return modules.get(file);
  let source = await read(file);
  for (const match of [...source.matchAll(/from\s+(['"])([^'"]+)\1/g)]) {
    const specifier = match[2];
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) continue;
    let target;
    if (specifier === '@/lib/firebaseAdmin') target = fixtureDb;
    else {
      const resolved = specifier.startsWith('@/') ? specifier.slice(2) : path.join(path.dirname(file), specifier);
      target = await moduleUrl(path.extname(resolved) ? resolved : resolved + '.js');
    }
    source = source.replace(match[0], `from '${target}'`);
  }
  const url = dataUrl(source);
  modules.set(file, url);
  return url;
}
const load = async (file) => import(await moduleUrl(file));
const { buildSeoMetadata, getDefaultOgImage } = await load('lib/seo/buildSeoMetadata.js');
const { buildWebPageLd, buildBreadcrumbsLd, buildFaqLd } = await load('lib/seo/jsonld.js');

test('Service metadata preserves localized overrides, reciprocal routes and the approved global artwork', async () => {
  for (const locale of ['lv', 'ru']) {
    const result = buildSeoMetadata({ locale, title: 'Specific model title', description: 'Localized description',
      lvPath: '/telefonu-remonts/huawei/p30-pro', ruPath: '/ru/remont-telefonov/huawei/p30-pro',
      image: '/images/devices/huawei/huawei-p30-pro.webp', imageAlt: 'Device photograph' });
    assert.equal(result.title, 'Specific model title');
    assert.equal(result.description, 'Localized description');
    assert.equal(result.alternates.canonical, result.alternates.languages[locale]);
    assert.equal(result.alternates.languages['x-default'], result.alternates.languages.lv);
    const image = result.openGraph.images[0];
    assert.equal(image.url, 'https://ilab.lv' + getDefaultOgImage(locale));
    assert.equal(image.type, 'image/jpeg');
    assert.deepEqual([image.width, image.height], [1200, 630]);
    assert.equal(result.twitter.images[0].url, image.url);
    const bytes = await readFile(path.join(root, 'public', getDefaultOgImage(locale)));
    assert.equal(bytes.readUInt16BE(0), 0xffd8);
  }
});

test('sitemap retains nested dedicated hubs, existing root hubs and reciprocal alternates without duplicates', async () => {
  const { default: sitemap } = await load('app/sitemap.js');
  const entries = await sitemap();
  const urls = entries.map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  for (const url of ['https://ilab.lv/plansetdatoru-remonts/ipad', 'https://ilab.lv/ru/remont-planshetov/ipad', 'https://ilab.lv/iphone-remonts']) assert.ok(urls.includes(url), url);
  for (const entry of entries) {
    assert.equal(entry.url, entry.alternates.languages[entry.url.includes('/ru') ? 'ru' : 'lv']);
    assert.ok(!/localhost|vercel|\?|\/admin|\/api|\/ads|\/shop/.test(entry.url));
    assert.ok(entry.url.startsWith('https://ilab.lv/'));
  }
});

test('WebPage JSON-LD retains mainEntity and localized data, and breadcrumb JSON roundtrips', () => {
  const page = buildWebPageLd({ path: '/ru/pravila', name: 'Правила', description: 'Условия', locale: 'ru', primaryEntityId: 'https://ilab.lv/ru/pravila#terms' });
  assert.equal(page['@type'], 'WebPage');
  assert.equal(page.inLanguage, 'ru');
  assert.deepEqual(page.mainEntity, { '@id': 'https://ilab.lv/ru/pravila#terms' });
  assert.ok(!Object.hasOwn(page, 'primaryEntity'));
  const breadcrumb = buildBreadcrumbsLd([{ name: 'iLab', url: 'https://ilab.lv/' }, { name: 'Правила', url: 'https://ilab.lv/ru/pravila' }]);
  assert.deepEqual(JSON.parse(JSON.stringify(breadcrumb)), breadcrumb);
  assert.deepEqual(breadcrumb.itemListElement.map((item) => item.position), [1, 2]);
  const faq = buildFaqLd([{ q: 'Гарантия?', a: 'До одного года.' }]);
  assert.equal(faq['@type'], 'FAQPage');
  assert.equal(faq.mainEntity[0].acceptedAnswer.text, 'До одного года.');
});

test('branch and Terms types use supported vocabulary; JSON-LD script escaping and Ads isolation remain', async () => {
  assert.doesNotMatch(await read('lib/seo/siteSchema.js'), /RepairService/);
  for (const file of ['app/(site)/(info)/noteikumi/page.jsx', 'app/(site)/ru/(info)/pravila/page.jsx']) {
    const source = await read(file);
    assert.match(source, /'@type': 'WebPage'/);
    assert.doesNotMatch(source, /TermsOfService/);
    assert.match(source, /inLanguage: strings.inLanguage/);
  }
  assert.match(await read('app/(site)/components/seo/JsonLd.jsx'), /JSON\.stringify\(data\)\.replace\(/);
  const middleware = await read('middleware.js');
  assert.match(middleware, /url.pathname = '\/ads-robots.txt'/);
  assert.match(middleware, /url.pathname = '\/ads'/);
  assert.match(await read('app/adsV2/page.jsx'), /index: false/);
});

test('global entities use the canonical origin even when company settings retain the www alias', async () => {
  const { buildSiteSchemaGraph } = await load('lib/seo/siteSchema.js');
  const result = buildSiteSchemaGraph({ company: { name: 'iLab', url: 'https://www.ilab.lv/' }, locations: [{ id: 'domina', label: 'Domina' }] });
  const graph = result['@graph'];
  const ids = graph.map((entity) => entity['@id']);
  assert.ok(ids.includes('https://ilab.lv#organization'));
  assert.ok(ids.includes('https://ilab.lv#website'));
  assert.ok(ids.includes('https://ilab.lv#domina'));
  assert.ok(ids.every((id) => id.startsWith('https://ilab.lv#')));
  assert.equal(graph.find((entity) => entity['@id'].endsWith('#domina'))['@type'], 'LocalBusiness');
});

test('root robots advertises Service and verified public Shop sitemap and preserves exclusions', async () => {
  const { default: robots } = await load('app/robots.js');
  const result = robots();
  assert.deepEqual(result.sitemap, ['https://ilab.lv/sitemap.xml', 'https://ilab.lv/shop/sitemap.xml']);
  assert.deepEqual(result.rules, [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/ads/'] }]);
});
