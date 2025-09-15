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
  },
    {
    slug: "iphone-14-pro",
    category: "telefonu-remonts",
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
  },

  // ----- new Samsung -----
  {
    slug: "galaxy-s21",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S21",
    year: 2021,
    image: "/images/devices/samsung-galaxy-s21.jpg",
    popular: true,
    metaTitle: "Samsung Galaxy S21 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S21. 90 dienu garantija.",
    bodyHtml: "<p>Ievads par Galaxy S21 remontu...</p>"
  },
  {
    slug: "galaxy-a52",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A52",
    year: 2021,
    image: "/images/devices/samsung-galaxy-a52.jpg",
    popular: false,
    metaTitle: "Samsung Galaxy A52 remonts Rīgā",
    metaDescription: "Ekrāna maiņa un citas remonta iespējas Galaxy A52. 90 dienu garantija.",
    bodyHtml: "<p>Ievads par Galaxy A52 remontu...</p>"
  },

  // ----- new Huawei -----
  {
    slug: "p30-pro",
    category: "telefonu-remonts",
    brand: "Huawei",
    brandSlug: "huawei",
    series: "P sērija",
    seriesSlug: "p-serija",
    name: "Huawei P30 Pro",
    year: 2019,
    image: "/images/devices/huawei-p30-pro.jpg",
    popular: true,
    metaTitle: "Huawei P30 Pro remonts Rīgā",
    metaDescription: "Ekrāna, baterijas un kameras remonts Huawei P30 Pro.",
    bodyHtml: "<p>Ievads par Huawei P30 Pro remontu...</p>"
  },

  // ----- new OnePlus -----
  {
    slug: "oneplus-9-pro",
    category: "telefonu-remonts",
    brand: "OnePlus",
    brandSlug: "oneplus",
    series: "9 sērija",
    seriesSlug: "9-serija",
    name: "OnePlus 9 Pro",
    year: 2021,
    image: "/images/devices/oneplus-9-pro.jpg",
    popular: false,
    metaTitle: "OnePlus 9 Pro remonts Rīgā",
    metaDescription: "Ekrāna maiņa, akumulatora nomaiņa OnePlus 9 Pro. 90 dienu garantija.",
    bodyHtml: "<p>Ievads par OnePlus 9 Pro remontu...</p>"
  }
];

export default devices;
