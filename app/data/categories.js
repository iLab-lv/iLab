// Full categories list (ASCII slugs; Latvian labels for UI)
const categories = [
  {
    slug: "telefonu-remonts",
    name: "Telefonu remonts",
    order: 1,
    heroImage: "/images/categories/phones.jpg",

    // Visibility controls
    showInHeader: true,       // appear as a top-level header item
    showInFooter: true,
    showInDropdown: true,     // allow showing brands in header dropdown

    // Optional brand groupings for menus/category pages
    brands: [
      {
        name: "Apple",
        brandSlug: "apple",
        order: 1,
        showInDropdown: true
      },
      {
        name: "Samsung",
        brandSlug: "samsung",
        order: 2,
        showInDropdown: true
      },
      {
        name: "Xiaomi",
        brandSlug: "xiaomi",
        order: 3,
        showInDropdown: false // hide from header dropdown for now
      }
    ]
  },

  {
    slug: "plansetdatoru-remonts",
    name: "Planšetdatoru remonts",
    order: 2,
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

  // Example of a category you might want only in footer (not header)
  {
    slug: "datoru-remonts",
    name: "Datoru remonts",
    order: 3,
    heroImage: "/images/categories/laptops.jpg",

    showInHeader: false,
    showInFooter: true,
    showInDropdown: false,

    brands: [
      { name: "Apple Mac", brandSlug: "apple", order: 1, showInDropdown: false },
      { name: "Lenovo", brandSlug: "lenovo", order: 2, showInDropdown: false }
    ]
  }
];

export default categories;
