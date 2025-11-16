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
    title: (name) =>
      `${name} telefonu remonts Rīgā — cenas, ātri, garantija | iLab`,
    meta: (name) =>
      `${name} remonts: displejs, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`,
  },
  [CATEGORY.TABLETS]: {
    heroLead:
      'Ekrāni, baterijas, uzlādes ligzdas, kameras un citi planšetdatoru remonti. Ātra diagnostika, godīgas cenas, garantija.',
    h1Label: (name) => `${name} remonts`,
    title: (name) =>
      `${name} remonts Rīgā — cenas, ātri, garantija | iLab`,
    meta: (name) =>
      `${name} remonts: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.`,
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
        hubPath: '/iphone-remonts', // where users should land for Apple phones
        canonicalPath: '/iphone-remonts', // canonical for SEO (if brand route exists)
        hero: {
          h1: 'iPhone remonts',
          lead:
            'iLab sertificētie meistari salabo iPhone gan ar tipiskiem, gan sarežģītiem bojājumiem — no saplaisājuša ekrāna līdz mitruma radītām problēmām.',
          bodyHtml:
            '<p><strong>Ātrs un drošs iPhone remonts Rīgā</strong> — displeja, baterijas un kameras maiņa tajā pašā dienā. Bezmaksas diagnostika un <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'iphone-modeli',
          },
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
          bodyHtml:
            '<p><strong>iPad remonts Rīgā</strong> — ekrāna, baterijas un uzlādes ligzdas maiņa. Ātra diagnostika, skaidras cenas un <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title: 'iPad remonts Rīgā — cenas, ātri, ar garantiju | iLab',
          metaDescription:
            'iPad remonts Rīgā: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu iPad modeli',
            intro: 'Pārlūko populārākos iPad modeļus.',
          },
        },
      },
    },
  },

  samsung: {
    order: 2,
    marketingName: 'Samsung',
    category: {
      [CATEGORY.PHONES]: {
        hero: {
          h1: 'Samsung telefonu remonts',
          lead: GENERIC[CATEGORY.PHONES].heroLead,
          bodyHtml:
            '<p><strong>Samsung telefonu remonts Rīgā</strong> — displeja, baterijas un kameras maiņa tajā pašā dienā. <strong>Bezmaksas diagnostika</strong> un 90 dienu garantija.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Samsung telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription:
            'Samsung remonts: displejs, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Samsung modeli',
            intro: 'Meklē pēc sērijas vai nosaukuma.',
          },
        },
      },
      [CATEGORY.TABLETS]: {
        marketingName: 'Samsung Galaxy Tab',
        hero: {
          h1: 'Samsung Galaxy Tab remonts',
          lead: GENERIC[CATEGORY.TABLETS].heroLead,
          bodyHtml:
            '<p><strong>Samsung Galaxy Tab remonts Rīgā</strong> — ekrāna, baterijas un uzlādes ligzdas maiņa ar <strong>90 dienu garantiju</strong>. Ātra diagnostika.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Samsung Galaxy Tab remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription:
            'Samsung Galaxy Tab remonts: ekrāns, baterija, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, 90 dienu garantija.',
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Galaxy Tab modeli',
            intro: 'Atrast modeli ir vienkārši.',
          },
        },
      },
    },
  },

  huawei: {
    order: 3,
    marketingName: 'Huawei',
    category: {
      [CATEGORY.PHONES]: {
        hero: {
          h1: 'Huawei telefonu remonts',
          lead: GENERIC[CATEGORY.PHONES].heroLead,
          bodyHtml:
            '<p><strong>Huawei telefonu remonts Rīgā</strong> — displeja, baterijas un kameras maiņa. <strong>Ātra diagnostika</strong>, skaidras cenas, 90 dienu garantija.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Huawei telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.PHONES].meta('Huawei'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Huawei modeli',
            intro: 'Pārlūko populāros modeļus.',
          },
        },
      },
      [CATEGORY.TABLETS]: {
        hero: {
          h1: 'Huawei planšetdatoru remonts',
          lead: GENERIC[CATEGORY.TABLETS].heroLead,
          bodyHtml:
            '<p><strong>Huawei planšetdatoru remonts Rīgā</strong> — ekrāna un baterijas maiņa, diagnostika, <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Huawei planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.TABLETS].meta('Huawei'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Huawei planšeti',
            intro: 'Atrodi savu modeli.',
          },
        },
      },
    },
  },

  oneplus: {
    order: 4,
    marketingName: 'OnePlus',
    category: {
      [CATEGORY.PHONES]: {
        hero: {
          h1: 'OnePlus telefonu remonts',
          lead: GENERIC[CATEGORY.PHONES].heroLead,
          bodyHtml:
            '<p><strong>OnePlus telefonu remonts Rīgā</strong> — ekrāna, baterijas un kameras maiņa. <strong>Bezmaksas diagnostika</strong> un 90 dienu garantija.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'OnePlus telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.PHONES].meta('OnePlus'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu OnePlus modeli',
            intro: 'Pārlūko populāros modeļus.',
          },
        },
      },
      [CATEGORY.TABLETS]: {
        hero: {
          h1: 'OnePlus planšetdatoru remonts',
          lead: GENERIC[CATEGORY.TABLETS].heroLead,
          bodyHtml:
            '<p><strong>OnePlus planšetdatoru remonts</strong> — ekrāna un baterijas maiņa, ātra diagnostika, <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'OnePlus planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.TABLETS].meta('OnePlus'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu OnePlus planšeti',
            intro: 'Atrodi savu modeli.',
          },
        },
      },
    },
  },

  // ======================
  // NEW: Xiaomi
  // ======================
  xiaomi: {
    order: 5,
    marketingName: 'Xiaomi',
    category: {
      [CATEGORY.PHONES]: {
        hero: {
          h1: 'Xiaomi telefonu remonts',
          lead: GENERIC[CATEGORY.PHONES].heroLead,
          bodyHtml:
            '<p><strong>Xiaomi telefonu remonts Rīgā</strong> — displeja, baterijas un kameras maiņa. Ātra diagnostika, skaidras cenas un <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Xiaomi telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.PHONES].meta('Xiaomi'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Xiaomi modeli',
            intro: 'Pārlūko populāros Xiaomi modeļus.',
          },
        },
      },
      [CATEGORY.TABLETS]: {
        hero: {
          h1: 'Xiaomi planšetdatoru remonts',
          lead: GENERIC[CATEGORY.TABLETS].heroLead,
          bodyHtml:
            '<p><strong>Xiaomi planšetdatoru remonts Rīgā</strong> — ekrāna un baterijas maiņa, uzlādes ligzdas remonts un cita veida bojājumi. Ātra diagnostika un <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Xiaomi planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.TABLETS].meta('Xiaomi'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Xiaomi planšeti',
            intro: 'Atrodi savu Xiaomi planšetdatoru modeli.',
          },
        },
      },
    },
  },

  // ======================
  // NEW: Lenovo
  // ======================
  lenovo: {
    order: 6,
    marketingName: 'Lenovo',
    category: {
      [CATEGORY.PHONES]: {
        hero: {
          h1: 'Lenovo telefonu remonts',
          lead: GENERIC[CATEGORY.PHONES].heroLead,
          bodyHtml:
            '<p><strong>Lenovo telefonu remonts Rīgā</strong> — displeja, baterijas un uzlādes ligzdas remonts. Ātra diagnostika un <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Lenovo telefonu remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.PHONES].meta('Lenovo'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Lenovo modeli',
            intro: 'Pārlūko Lenovo tālruņu modeļus.',
          },
        },
      },
      [CATEGORY.TABLETS]: {
        hero: {
          h1: 'Lenovo planšetdatoru remonts',
          lead: GENERIC[CATEGORY.TABLETS].heroLead,
          bodyHtml:
            '<p><strong>Lenovo planšetdatoru remonts Rīgā</strong> — ekrāna, baterijas un uzlādes ligzdas maiņa, kā arī citi remontdarbi ar <strong>90 dienu garantiju</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title:
            'Lenovo planšetdatoru remonts Rīgā — cenas, ātri, garantija | iLab',
          metaDescription: GENERIC[CATEGORY.TABLETS].meta('Lenovo'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu Lenovo planšeti',
            intro: 'Atrodi savu Lenovo planšetdatoru modeli.',
          },
        },
      },
    },
  },

  // ======================
  // NEW: iPad brand alias (tablet-only)
  // ======================
  ipad: {
    order: 7,
    marketingName: 'iPad',
    category: {
      [CATEGORY.TABLETS]: {
        marketingName: 'iPad',
        hero: {
          h1: 'iPad remonts',
          lead:
            'Ekrānu un bateriju maiņa, uzlādes ligzdas un citi iPad remonti. Pēc diagnostikas vienojamies par izmaksām un termiņu.',
          bodyHtml:
            '<p><strong>iPad remonts Rīgā</strong> — ekrāna, baterijas un uzlādes ligzdas maiņa. Ātra diagnostika, skaidras cenas un <strong>90 dienu garantija</strong>.</p>',
          scrollCta: {
            label: 'Skatīt modeļus un cenas',
            targetId: 'brand-modeli',
          },
        },
        seo: {
          title: 'iPad remonts Rīgā — cenas, ātri, ar garantiju | iLab',
          metaDescription: GENERIC[CATEGORY.TABLETS].meta('iPad'),
        },
        sections: {
          modelGrid: {
            heading: 'Izvēlies savu iPad modeli',
            intro: 'Pārlūko populārākos iPad modeļus.',
          },
        },
        // We let href/canonical default to /plansetdatoru-remonts/ipad
      },
    },
  },
};

// ---------- Helpers ----------

function getBrandNode(brandSlug) {
  const slug = String(brandSlug || '').toLowerCase();
  return (
    BRANDS[slug] || {
      order: 999,
      marketingName: TITLE_CASE(slug),
      category: {},
    }
  );
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
    metaDescription:
      cat.seo?.metaDescription || GENERIC[catKey].meta(marketingName),
  };

  // Canonical: prefer explicit, else hubPath when present, else brand route
  const canonicalPath = cat.canonicalPath || hubPath || brandRoutePath;

  const hero = {
    h1: cat.hero?.h1 || GENERIC[catKey].h1Label(marketingName),
    lead: cat.hero?.lead || GENERIC[catKey].heroLead,
    bodyHtml: cat.hero?.bodyHtml || null, // ← pass through optional rich body
    scrollCta:
      cat.hero?.scrollCta || {
        label: 'Skatīt modeļus un cenas',
        targetId: 'brand-modeli',
      },
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
