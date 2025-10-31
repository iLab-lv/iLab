// data/categories.js

// Full categories list (ASCII slugs; Latvian labels for UI)
const categories = [
  // iPhone (unchanged)
  {
    slug: "iphone-remonts",
    name: "iPhone remonts",
    order: 1,
    heroImage: "/brand/images/categories/iphone_remonts.webp",
    showInHeader: true,
    showInFooter: true,
    showInDropdown: false,
    brands: [
      { name: "Apple", brandSlug: "apple", order: 1, showInDropdown: false }
    ]
  },

  // Phones (non-iPhone)
  {
    slug: "telefonu-remonts",
    name: "Telefonu remonts",
    order: 2,
    // Base phones hero (not used on brand pages, those use brand.heroImage below)
    heroImage: "/brand/images/categories/telefonu_remonts.webp",

    showInHeader: true,
    showInFooter: true,
    showInDropdown: true,

    // --- Brand settings for hero/logo/tint ---
    brands: [
      {
        name: "Samsung",
        brandSlug: "samsung",
        order: 1,
        showInDropdown: true,

        heroImage: "/images/categories/telefonu_remonts.webp", // alias to base
        logo: "/images/logos/samsung-logo.svg",
        tint: "rgba(0,120,255,0.25)",
        heroAlt: "Samsung telefonu remonts"
      },
      {
        name: "Huawei",
        brandSlug: "huawei",
        order: 2,
        showInDropdown: true,

        heroImage: "/images/categories/telefonu_remonts.webp",
        logo: "/images/logos/huawei-logo.svg",
        tint: "rgba(200,0,40,0.25)",
        heroAlt: "Huawei telefonu remonts"
      },
      {
        name: "OnePlus",
        brandSlug: "oneplus",
        order: 3,
        showInDropdown: true,

        heroImage: "/brand/images/categories/telefonu_remonts.webp",
        logo: null, // add later if you have it
        tint: "rgba(0,200,180,0.20)",
        heroAlt: "OnePlus telefonu remonts"
      },
      {
        name: "Xiaomi",
        brandSlug: "xiaomi",
        order: 4,
        showInDropdown: false,

        heroImage: "/images/categories/telefonu_remonts.webp",
        logo: "/images/logos/xiaomi-logo.svg",
        tint: "rgba(255,100,0,0.25)",
        heroAlt: "Xiaomi telefonu remonts"
      }
    ]
  },

  // Tablets (keep your existing images/brands, update paths if needed)
  {
    slug: "plansetdatoru-remonts",
    name: "Planšetdatoru remonts",
    order: 3,
    heroImage: "/brand/images/categories/tablets.webp",
    showInHeader: true,
    showInFooter: true,
    showInDropdown: true,
    brands: [
      { name: "Apple iPad", brandSlug: "apple", order: 1, showInDropdown: true },
      { name: "Samsung Galaxy Tab", brandSlug: "samsung", order: 2, showInDropdown: true }
    ]
  },

  // Computers
  {
    slug: "datoru-remonts",
    name: "Datoru remonts",
    order: 4,
    heroImage: "/brand/images/categories/laptops.webp",
    showInHeader: true,
    showInFooter: true,
    showInDropdown: false,
    brands: [
      { name: "Apple Mac", brandSlug: "apple", order: 1, showInDropdown: false },
      { name: "Lenovo", brandSlug: "lenovo", order: 2, showInDropdown: false }
    ]
  },

  // Dyson
  {
    slug: "dyson-remonts",
    name: "Dyson remonts",
    order: 5,
    heroImage: "/brand/images/categories/dyson_remonts.webp",
    showInHeader: true,
    showInFooter: true,
    showInDropdown: false,
    brands: [{ name: "Dyson", brandSlug: "dyson", order: 1, showInDropdown: false }]
  }
];

export default categories;
