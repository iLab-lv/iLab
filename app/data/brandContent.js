// data/brandContent.js
// One source of truth for brand copy & SEO across categories.
// Works for both telefonu-remonts and plansetdatoru-remonts.

const TITLE_CASE = (s) =>
  String(s || '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const CATEGORY = {
  PHONES: 'telefonu-remonts',
  TABLETS: 'plansetdatoru-remonts',
};

// Generic fallbacks (used if a brand doesn't override the category)
const GENERIC = {
  [CATEGORY.PHONES]: {
    heroLead:
      'Displeji, baterijas, uzlādes ligzdas, kameras un citi remontdarbi. Cenas saskaņojam pirms darba; biežākos darbus paveicam tajā pašā dienā.',
    h1Label: (name) => `${name} telefonu remonts`,
    title: (name) => `${name} telefonu remonts Rīgā — cenas, ātri, garantija | iLab`,
    meta:
      (name) => `${name} remonts: displejs, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`,
  },
  [CATEGORY.TABLETS]: {
    heroLead:
      'Ekrāni, baterijas, uzlādes ligzdas, kameras un citi planšetdatoru remonti. Ātra diagnostika, godīgas cenas, garantija.',
    h1Label: (name) => `${name} remonts`,
    title: (name) => `${name} remonts Rīgā — cenas, ātri, garantija | iLab`,
    meta:
      (name) => `${name} remonts: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`,
  },
};

// Registry: put ALL brands here once (Apple/iPhone included)
const BRANDS = {
  apple: {
    order: 1,
    // Brand marketing name (fallback)
    marketingName: 'Apple',

    // Per-category overrides (names, SEO, hub paths…)
    category: {
      [CATEGORY.PHONES]: {
        // iPhone is a dedicated hub at root
        marketingName: 'iPhone',
        hubPath: '/iphone-remonts',          // where users should land for Apple phones
        canonicalPath: '/iphone-remonts',    // canonical for SEO (if brand route exists)
        hero: {
          h1: 'iPhone remonts',
          lead:
            'iLab sertificētie meistari salabo iPhone gan ar tipiskiem, gan sarežģītiem bojājumiem — no saplaisājuša ekrāna līdz mitruma radītām problēmām.',
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'iphone-modeli' },
        },
        seo: {
          title: 'iPhone remonts Rīgā — cenas, ātri, ar garantiju | iLab',
          metaDescription:
            'iPhone remonts Rīgā: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu iPhone modeli',
            intro: 'Atrast modeli ir viegli — meklē pēc nosaukuma vai pārlūko sērijas.',
          },
        },
      },

      [CATEGORY.TABLETS]: {
        marketingName: 'iPad',
        // No dedicated hub yet — will default to /plansetdatoru-remonts/apple
        hero: {
          h1: 'iPad remonts',
          lead:
            'Ekrānu un bateriju maiņa, uzlādes ligzdas un citi iPad remonti. Pēc diagnostikas vienojamies par izmaksām un termiņu.',
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' },
        },
        seo: {
          title: 'iPad remonts Rīgā — cenas, ātri, ar garantiju | iLab',
          metaDescription:
            'iPad remonts Rīgā: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
        },
        sections: {
          modelGrid: { heading: 'Izvēlies savu iPad modeli', intro: 'Pārlūko populārākos iPad modeļus.' },
        },
      },
    },
  },

  samsung: {
    order: 2,
    marketingName: 'Samsung',
    category: {
      [CATEGORY.PHONES]: {
        hero: { h1: 'Samsung telefonu remonts', lead: GENERIC[CATEGORY.PHONES].heroLead,
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' } },
        seo: {
          title: 'Samsung telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription:
            'Samsung remonts: displejs, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
        },
        sections: { modelGrid: { heading: 'Izvēlies savu Samsung modeli', intro: 'Meklē pēc sērijas vai nosaukuma.' } },
      },
      [CATEGORY.TABLETS]: {
        marketingName: 'Samsung Galaxy Tab',
        hero: { h1: 'Samsung Galaxy Tab remonts', lead: GENERIC[CATEGORY.TABLETS].heroLead,
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' } },
        seo: {
          title: 'Samsung Galaxy Tab remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription:
            'Samsung Galaxy Tab remonts: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
        },
        sections: { modelGrid: { heading: 'Izvēlies savu Galaxy Tab modeli', intro: 'Atrast modeli ir vienkārši.' } },
      },
    },
  },

  huawei: {
    order: 3,
    marketingName: 'Huawei',
    category: {
      [CATEGORY.PHONES]: {
        hero: { h1: 'Huawei telefonu remonts', lead: GENERIC[CATEGORY.PHONES].heroLead,
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' } },
        seo: {
          title: 'Huawei telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.PHONES].meta('Huawei'),
        },
        sections: { modelGrid: { heading: 'Izvēlies savu Huawei modeli', intro: 'Pārlūko populāros modeļus.' } },
      },
      [CATEGORY.TABLETS]: {
        hero: { h1: 'Huawei planšetdatoru remonts', lead: GENERIC[CATEGORY.TABLETS].heroLead,
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' } },
        seo: {
          title: 'Huawei planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.TABLETS].meta('Huawei'),
        },
        sections: { modelGrid: { heading: 'Izvēlies savu Huawei planšeti', intro: 'Atrodi savu modeli.' } },
      },
    },
  },

  oneplus: {
    order: 4,
    marketingName: 'OnePlus',
    category: {
      [CATEGORY.PHONES]: {
        hero: { h1: 'OnePlus telefonu remonts', lead: GENERIC[CATEGORY.PHONES].heroLead,
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' } },
        seo: {
          title: 'OnePlus telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.PHONES].meta('OnePlus'),
        },
        sections: { modelGrid: { heading: 'Izvēlies savu OnePlus modeli', intro: 'Pārlūko populāros modeļus.' } },
      },
      [CATEGORY.TABLETS]: {
        hero: { h1: 'OnePlus planšetdatoru remonts', lead: GENERIC[CATEGORY.TABLETS].heroLead,
          scrollCta: { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' } },
        seo: {
          title: 'OnePlus planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.TABLETS].meta('OnePlus'),
        },
        sections: { modelGrid: { heading: 'Izvēlies savu OnePlus planšeti', intro: 'Atrodi savu modeli.' } },
      },
    },
  },
};

// ---------- Helpers ----------

function getBrandNode(brandSlug) {
  const slug = String(brandSlug || '').toLowerCase();
  return BRANDS[slug] || { order: 999, marketingName: TITLE_CASE(slug), category: {} };
}

/**
 * Resolve brand content for a given brand & category.
 * Returns: { slug, marketingName, href, brandRoutePath, canonicalPath, hero, seo, sections }
 */
export function getBrandContent(brandSlug, categorySlug = CATEGORY.PHONES) {
  const brand = getBrandNode(brandSlug);
  const catKey = categorySlug;
  const cat = (brand.category && brand.category[catKey]) || {};

  const marketingName =
    cat.marketingName || brand.marketingName || TITLE_CASE(brandSlug);

  const brandRoutePath = `/${catKey}/${brandSlug}`;
  const hubPath = cat.hubPath || null;
  const href = hubPath || brandRoutePath;

  // SEO text with safe fallbacks
  const seo = {
    title: cat.seo?.title || GENERIC[catKey].title(marketingName),
    metaDescription: cat.seo?.metaDescription || GENERIC[catKey].meta(marketingName),
  };

  // Canonical: prefer explicit, else hubPath when present, else brand route
  const canonicalPath = cat.canonicalPath || hubPath || brandRoutePath;

  const hero = {
    h1: cat.hero?.h1 || GENERIC[catKey].h1Label(marketingName),
    lead: cat.hero?.lead || GENERIC[catKey].heroLead,
    scrollCta: cat.hero?.scrollCta || { label: 'Skatīt modeļus un cenas', targetId: 'brand-modeli' },
  };

  const sections = {
    modelGrid: {
      heading:
        cat.sections?.modelGrid?.heading ||
        (catKey === CATEGORY.PHONES
          ? `Izvēlies savu ${marketingName} modeli`
          : `Izvēlies savu ${marketingName} modeli`),
      intro:
        cat.sections?.modelGrid?.intro ||
        (catKey === CATEGORY.PHONES
          ? 'Meklē pēc nosaukuma vai pārlūko sērijas.'
          : 'Pārlūko populāros modeļus.'),
    },
  };

  return {
    slug: brandSlug,
    categorySlug: catKey,
    marketingName,
    href,
    brandRoutePath,
    canonicalPath,
    seo,
    hero,
    sections,
    order: typeof brand.order === 'number' ? brand.order : 999,
  };
}

/** List brands for a category (sorted by order), returning [{slug,name,href}] */
export function listBrandsForCategory(categorySlug = CATEGORY.PHONES) {
  return Object.keys(BRANDS)
    .map((slug) => {
      const c = getBrandContent(slug, categorySlug);
      return { slug, name: c.marketingName, href: c.href, order: c.order };
    })
    .sort((a, b) => a.order - b.order);
}

export const BRAND_CATEGORY = CATEGORY;
export const brandContent = BRANDS;
export default BRANDS;
