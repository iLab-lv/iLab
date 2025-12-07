// app/sitemap.js
import devices from '@/data/devices';
import contentRegistry from '@/data/contentRegistry';

const ORIGIN = 'https://www.ilab.lv';

// Categories that have brand hub pages implemented
// -> /telefonu-remonts/[brand]
// -> /plansetdatoru-remonts/[brand]
// -> /datoru-remonts/[brand]
const BRAND_HUB_CATEGORIES = [
  'plansetdatoru-remonts',
  'telefonu-remonts',
  'datoru-remonts',
];

function uniq(array) {
  return Array.from(new Set(array));
}

function buildStaticPages() {
  const infoKeys = Object.keys(contentRegistry.info || {});
  const infoPaths = infoKeys.map((slug) => `/${slug}`);

  return uniq([
    '/', // home
    ...infoPaths,
  ]);
}

function buildCategoryPages() {
  const catKeys = Object.keys(contentRegistry.categories || {});
  return uniq(catKeys.map((slug) => `/${slug}`));
}

function buildServicePages() {
  const svcKeys = Object.keys(contentRegistry.services || {});
  return uniq(svcKeys.map((key) => `/${key}`));
}

function buildBrandHubPages() {
  const paths = new Set();

  for (const d of devices) {
    const category = (d.category || '').toLowerCase();
    const brandSlug = (d.brandSlug || '').toLowerCase();

    if (!category || !brandSlug) continue;
    if (!BRAND_HUB_CATEGORIES.includes(category)) continue;

    // Skip Apple as a phone brand: iPhone has its own hub at /iphone-remonts
    if (category === 'telefonu-remonts' && brandSlug === 'apple') continue;

    // /telefonu-remonts/samsung
    // /plansetdatoru-remonts/ipad
    // /datoru-remonts/asus
    paths.add(`/${category}/${brandSlug}`);
  }

  return Array.from(paths);
}

function buildDevicePages() {
  const paths = [];

  for (const d of devices) {
    const slug = (d.slug || '').toLowerCase();
    const category = (d.category || '').toLowerCase();
    const brandSlug = (d.brandSlug || '').toLowerCase();
    const brand = (d.brand || '').toLowerCase();

    if (!slug || !category) continue;

    // Special routing for iPhone devices:
    // /iphone-remonts/<deviceSlug>
    const isIphone =
      category === 'telefonu-remonts' &&
      (brandSlug === 'apple' || brand === 'apple');

    if (isIphone) {
      paths.push(`/iphone-remonts/${slug}`);
      continue;
    }

    // Generic device routes:
    // /<category>/<brandSlug>/<deviceSlug>
    if (brandSlug) {
      paths.push(`/${category}/${brandSlug}/${slug}`);
    }
  }

  return uniq(paths);
}

export default function sitemap() {
  const lastModified = new Date().toISOString();

  const allPaths = uniq([
    ...buildStaticPages(),
    ...buildCategoryPages(),
    ...buildServicePages(),
    ...buildBrandHubPages(),
    ...buildDevicePages(),
  ]);

  return allPaths.map((path) => {
    let priority = 0.5;
    let changeFrequency = 'weekly';

    if (path === '/') {
      priority = 0.8;
    } else if (
      path === '/pieraksties' ||
      path === '/kontakti' ||
      path === '/par-ilab' ||
      path === '/buj'
    ) {
      priority = 0.7;
    } else if (path.split('/').filter(Boolean).length === 1) {
      // Category hubs: /iphone-remonts, /telefonu-remonts, /plansetdatoru-remonts, /datoru-remonts, etc.
      priority = 0.7;
    } else if (
      BRAND_HUB_CATEGORIES.some(
        (cat) =>
          path.startsWith(`/${cat}/`) &&
          path.split('/').filter(Boolean).length === 2
      )
    ) {
      // Brand hubs: /telefonu-remonts/samsung, /plansetdatoru-remonts/ipad, /datoru-remonts/asus…
      priority = 0.6;
    } else {
      // Services & device detail pages
      priority = 0.5;
    }

    return {
      url: `${ORIGIN}${path}`,
      lastModified,
      changeFrequency,
      priority,
    };
  });
}
