// data/categories.js

// Full categories list (ASCII slugs; Latvian labels for UI)
const categories = [
  // iPhone (unchanged logic; added logo for consistency)
  {
    slug: 'iphone-remonts',
    name: 'iPhone remonts',
    order: 1,
    heroImage: '/images/categories/iphone_remonts.webp',
    showInHeader: true,
    showInFooter: true,
    showInDropdown: false,
    brands: [
      {
        name: 'Apple',
        brandSlug: 'apple',
        order: 1,
        showInDropdown: false,
        logo: '/images/logos/apple-logo.svg',
      },
    ],
  },

  // Phones (non-iPhone)
  {
    slug: 'telefonu-remonts',
    name: 'Telefonu remonts',
    order: 2,
    // Base phones hero (hub page)
    heroImage: '/brand/images/categories/telefonu_remonts.webp',

    showInHeader: true,
    showInFooter: true,
    showInDropdown: true,

    // --- Brand settings for hero/logo/tint ---
    brands: [
      {
        name: 'Samsung',
        brandSlug: 'samsung',
        order: 1,
        showInDropdown: true,

        // ✅ real cracked-screen hero
        heroImage: '/images/categories/telefonu_remonts.webp',
        logo: '/images/logos/samsung-logo.svg',
        tint: 'rgba(0,120,255,0.25)',
        heroAlt: 'Samsung telefonu remonts',
      },
      {
        name: 'Huawei',
        brandSlug: 'huawei',
        order: 2,
        showInDropdown: true,

        heroImage: '/images/categories/telefonu_remonts.webp',
        logo: '/images/logos/huawei-logo.svg',
        tint: 'rgba(200,0,40,0.25)',
        heroAlt: 'Huawei telefonu remonts',
      },
      {
        name: 'Sony',
        brandSlug: 'sony',
        order: 3,
        showInDropdown: true,

        heroImage: '/images/categories/telefonu_remonts.webp',
        logo: '/images/logos/sony-logo.svg',
        tint: 'rgba(0,0,0,0.25)',
        heroAlt: 'Sony telefonu remonts',
      },
      {
        name: 'OnePlus',
        brandSlug: 'oneplus',
        order: 4,
        showInDropdown: true,

        // ✅ was pointing at /brand/… (placeholder) before – now fixed
        heroImage: '/images/categories/telefonu_remonts.webp',
        logo: '/images/logos/oneplus-logo.svg',
        tint: 'rgba(0,200,180,0.20)',
        heroAlt: 'OnePlus telefonu remonts',
      },
      {
        name: 'Xiaomi',
        brandSlug: 'xiaomi',
        order: 5,
        showInDropdown: false,

        heroImage: '/images/categories/telefonu_remonts.webp',
        logo: '/images/logos/xiaomi-logo.svg',
        tint: 'rgba(255,100,0,0.25)',
        heroAlt: 'Xiaomi telefonu remonts',
      },
    ],
  },

  // Tablets
  {
    slug: 'plansetdatoru-remonts',
    name: 'Planšetdatoru remonts',
    order: 3,
    // ✅ matches actual file and your working hub hero
    heroImage: '/images/categories/plansetdatoru-remonts.webp',
    showInHeader: true,
    showInFooter: true,
    showInDropdown: true,

    brands: [
      {
        name: 'Apple iPad',
        brandSlug: 'apple',
        order: 1,
        showInDropdown: true,

        heroImage: '/images/categories/plansetdatoru-remonts.webp',
        logo: '/images/logos/apple-logo.svg',
        tint: 'rgba(0,200,180,0.20)',
        heroAlt: 'iPad remonts',
      },
      {
        name: 'Samsung Galaxy Tab',
        brandSlug: 'samsung',
        order: 2,
        showInDropdown: true,

        heroImage: '/images/categories/plansetdatoru-remonts.webp',
        logo: '/images/logos/samsung-logo.svg',
        tint: 'rgba(0,120,255,0.25)',
        heroAlt: 'Samsung Galaxy Tab remonts',
      },
      {
        name: 'Lenovo',
        brandSlug: 'lenovo',
        order: 3,
        showInDropdown: true,

        heroImage: '/images/categories/plansetdatoru-remonts.webp',
        logo: '/images/logos/lenovo-logo.svg',
        tint: 'rgba(0,90,180,0.25)',
        heroAlt: 'Lenovo planšetdatoru remonts',
      },
      {
        name: 'Xiaomi',
        brandSlug: 'xiaomi',
        order: 4,
        showInDropdown: true,

        heroImage: '/images/categories/plansetdatoru-remonts.webp',
        logo: '/images/logos/xiaomi-logo.svg',
        tint: 'rgba(255,100,0,0.25)',
        heroAlt: 'Xiaomi planšetdatoru remonts',
      },
      {
        name: 'Huawei',
        brandSlug: 'huawei',
        order: 5,
        showInDropdown: true,

        heroImage: '/images/categories/plansetdatoru-remonts.webp',
        logo: '/images/logos/huawei-logo.svg',
        tint: 'rgba(200,0,40,0.25)',
        heroAlt: 'Huawei planšetdatoru remonts',
      },
    ],
  },

  // Computers
  {
    slug: 'datoru-remonts',
    name: 'Datoru remonts',
    order: 4,
    heroImage: '/brand/images/categories/laptops.webp',
    showInHeader: true,
    showInFooter: true,
    showInDropdown: false,
    brands: [
      {
        name: 'Apple Mac',
        brandSlug: 'apple',
        order: 1,
        showInDropdown: false,
        logo: '/images/logos/apple-logo.svg',
      },
      {
        name: 'Lenovo',
        brandSlug: 'lenovo',
        order: 2,
        showInDropdown: false,
        logo: '/images/logos/lenovo-logo.svg',
      },
    ],
  },

  // Dyson
  {
    slug: 'dyson-remonts',
    name: 'Dyson remonts',
    order: 5,
    heroImage: '/brand/images/categories/dyson_remonts.webp',
    showInHeader: true,
    showInFooter: true,
    showInDropdown: false,
    brands: [
      {
        name: 'Dyson',
        brandSlug: 'dyson',
        order: 1,
        showInDropdown: false,
        logo: null, // no logo file in your screenshot
      },
    ],
  },
];

export default categories;
