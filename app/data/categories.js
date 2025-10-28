// Full categories list (ASCII slugs; Latvian labels for UI)
const categories = [
  // iPhone has its own hub (no dropdown needed)
  {
    slug: "iphone-remonts",
    name: "iPhone remonts",
    order: 1,
    heroImage: "/images/categories/iphone.jpg",

    showInHeader: true,
    showInFooter: true,
    showInDropdown: false, // single-brand hub; no dropdown

    // Keep brands empty or single Apple reference if you need it later
    brands: [
      {
        name: "Apple",
        brandSlug: "apple",
        order: 1,
        showInDropdown: false
      }
    ]
  },

  // Phones (non-iPhone) with brand dropdown (Samsung, Huawei, OnePlus, Xiaomi)
  {
    slug: "telefonu-remonts",
    name: "Telefonu remonts",
    order: 2,
    heroImage: "/images/categories/phones.jpg",

    // Visibility controls
    showInHeader: true,
    showInFooter: true,
    showInDropdown: true, // show brands in header dropdown

    // Brand groupings for menus/category pages
    brands: [
      {
        name: "Samsung",
        brandSlug: "samsung",
        order: 1,
        showInDropdown: true
      },
      {
        name: "Huawei",
        brandSlug: "huawei",
        order: 2,
        showInDropdown: true
      },
      {
        name: "OnePlus",
        brandSlug: "oneplus",
        order: 3,
        showInDropdown: true
      },
      {
        name: "Xiaomi",
        brandSlug: "xiaomi",
        order: 4,
        showInDropdown: false // keep hidden in header for now
      }
    ]
  },

  // Tablets
  {
    slug: "plansetdatoru-remonts",
    name: "Planšetdatoru remonts",
    order: 3,
    heroImage: "/images/categories/tablets.jpg",

    showInHeader: true,
    showInFooter: true,
    showInDropdown: true,

    brands: [
      {
        name: "Apple iPad",
        brandSlug: "apple",
        order: 1,
        showInDropdown: true
      },
      {
        name: "Samsung Galaxy Tab",
        brandSlug: "samsung",
        order: 2,
        showInDropdown: true
      }
    ]
  },

  // Laptops / computers (footer visible; header optional per your plan)
  {
    slug: "datoru-remonts",
    name: "Datoru remonts",
    order: 4,
    heroImage: "/images/categories/laptops.jpg",

    showInHeader: true,   // enable in header nav as per current spec
    showInFooter: true,
    showInDropdown: false,

    brands: [
      { name: "Apple Mac", brandSlug: "apple", order: 1, showInDropdown: false },
      { name: "Lenovo", brandSlug: "lenovo", order: 2, showInDropdown: false }
    ]
  },

  // Dyson appliances (no dropdown)
  {
    slug: "dyson-remonts",
    name: "Dyson remonts",
    order: 5,
    heroImage: "/images/categories/dyson.jpg",

    showInHeader: true,
    showInFooter: true,
    showInDropdown: false,

    brands: [
      { name: "Dyson", brandSlug: "dyson", order: 1, showInDropdown: false }
    ]
  }
];

export default categories;
