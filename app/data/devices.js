// Device list (each device belongs to a category, brand, and optional series)
const devices = [
  {
    slug: "iphone-14-pro",
    category: "telefonu-remonts",   // category slug
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 14 sērija",
    seriesSlug: "iphone-14-serija",
    name: "iPhone 14 Pro",
    year: 2022,
    image: "/images/devices/iphone-14-pro.jpg",
    popular: true,
    metaTitle: "iPhone 14 Pro remonts Rīgā",
    metaDescription: "iPhone 14 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: "<p>Ievads par iPhone 14 Pro remontu...</p>"
  },
  {
    slug: "samsung-z4",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Z sērija",
    seriesSlug: "z-serija",
    name: "Samsung Z4",
    year: 2021,
    image: "/images/devices/samsung-z4.jpg",
    popular: false,
    metaTitle: "Samsung Z4 remonts Rīgā",
    metaDescription: "Samsung Z4 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: "<p>Ievads par Samsung Z4 remontu...</p>"
  },
  {
    slug: "ipad-pro-12-9",
    category: "plansetdatoru-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPad Pro sērija",
    seriesSlug: "ipad-pro-serija",
    name: "iPad Pro 12.9",
    year: 2022,
    image: "/images/devices/ipad-pro-12-9.jpg",
    popular: true,
    metaTitle: "iPad Pro 12.9 remonts Rīgā",
    metaDescription: "iPad Pro 12.9 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: "<p>Ievads par iPad Pro remontu...</p>"
  }
];

export default devices;
