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
  heroImage: '/images/categories/datoru_remonts.webp',
  showInHeader: true,
  showInFooter: true,
  showInDropdown: false,
  brands: [
    {
      name: 'MacBook',
      brandSlug: 'macbook',
      order: 1,
      showInDropdown: false,
      logo: '/images/logos/apple-logo.svg',
      tint: 'rgba(120,120,120,0.25)', // Apple – neutral metallic
      deviceType: 'laptop',
      hasModels: true,
    },
    {
      name: 'iMac',
      brandSlug: 'imac',
      order: 2,
      showInDropdown: false,
      logo: '/images/logos/apple-logo.svg',
      tint: 'rgba(120,120,120,0.25)',
      deviceType: 'aio',
      heroImage: '/images/categories/imac_remonts.webp',
      hasModels: false,
    },
    {
      name: 'Mac Pro',
      brandSlug: 'mac-pro',
      order: 3,
      showInDropdown: false,
      logo: '/images/logos/apple-logo.svg',
      tint: 'rgba(120,120,120,0.25)',
      deviceType: 'desktop',
      heroImage: '/images/categories/macpro_remonts.webp',
      hasModels: false,
    },
    {
      name: 'Lenovo',
      brandSlug: 'lenovo',
      order: 4,
      showInDropdown: false,
      logo: '/images/logos/lenovo-logo.svg',
      tint: 'rgba(0,90,180,0.25)', // Lenovo blue (same as tablets)
      deviceType: 'laptop',
      hasModels: false,
    },
    {
      name: 'HP',
      brandSlug: 'hp',
      order: 5,
      showInDropdown: false,
      logo: '/images/logos/hp-logo.svg',
      tint: 'rgba(0,120,180,0.25)', // HP blue
      deviceType: 'laptop',
      hasModels: false,
    },
    {
      name: 'MSI',
      brandSlug: 'msi',
      order: 6,
      showInDropdown: false,
      logo: '/images/logos/msi-logo.svg',
      tint: 'rgba(200,0,40,0.25)', // MSI red/gaming accent
      deviceType: 'laptop',
      hasModels: false,
    },
    {
      name: 'Dell',
      brandSlug: 'dell',
      order: 7,
      showInDropdown: false,
      logo: '/images/logos/dell-logo.svg',
      tint: 'rgba(0,130,190,0.25)', // Dell blue
      deviceType: 'laptop',
      hasModels: false,
    },
    {
      name: 'Asus',
      brandSlug: 'asus',
      order: 8,
      showInDropdown: false,
      logo: '/images/logos/asus-logo.svg',
      tint: 'rgba(0,60,150,0.25)', // Deep Asus blue
      deviceType: 'laptop',
      hasModels: false,
    },
    {
      name: 'Acer',
      brandSlug: 'acer',
      order: 9,
      showInDropdown: false,
      logo: '/images/logos/acer-logo.svg',
      tint: 'rgba(0,140,80,0.25)', // Acer green
      deviceType: 'laptop',
      hasModels: false,
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
