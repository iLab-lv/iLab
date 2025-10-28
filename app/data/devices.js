// Device list (each device belongs to a category, brand, and optional series)
const devices = [
  {
  slug: "iphone-17-pro-max",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "iPhone 17 sērija",
  seriesSlug: "iphone-17-serija",
  name: "iPhone 17 Pro Max",
  year: 2025,
  image: "/images/devices/iphone-17-pro-max.jpg",
  popular: true,
  order: 90,
  metaTitle: "iPhone 17 Pro Max remonts Rīgā",
  metaDescription: "iPhone 17 Pro Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 17 Pro Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-17-pro",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "iPhone 17 sērija",
  seriesSlug: "iphone-17-serija",
  name: "iPhone 17 Pro",
  year: 2025,
  image: "/images/devices/iphone-17-pro.jpg",
  popular: true,
  order: 91,
  metaTitle: "iPhone 17 Pro remonts Rīgā",
  metaDescription: "iPhone 17 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 17 Pro</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-air",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "iPhone 17 sērija",
  seriesSlug: "iphone-17-serija",
  name: "iPhone Air",
  year: 2025,
  image: "/images/devices/iphone-air.jpg",
  popular: true,
  order: 92,
  metaTitle: "iPhone Air remonts Rīgā",
  metaDescription: "iPhone Air ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone Air</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-17",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "iPhone 17 sērija",
  seriesSlug: "iphone-17-serija",
  name: "iPhone 17",
  year: 2025,
  image: "/images/devices/iphone-17.jpg",
  popular: true,
  order: 93,
  metaTitle: "iPhone 17 remonts Rīgā",
  metaDescription: "iPhone 17 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 17</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},
  
  {
    slug: "iphone-16-pro-max",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 16 sērija",
    seriesSlug: "iphone-16-serija",
    name: "iPhone 16 Pro Max",
    year: 2024,
    image: "/images/devices/iphone-16-pro-max.webp",
    popular: true,
    order: 100,
    metaTitle: "iPhone 16 Pro Max remonts Rīgā",
    metaDescription: "iPhone 16 Pro Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 16 Pro Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-16-pro",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 16 sērija",
    seriesSlug: "iphone-16-serija",
    name: "iPhone 16 Pro",
    year: 2024,
    image: "/images/devices/iphone-16-pro.jpg",
    popular: true,
    order: 101,
    metaTitle: "iPhone 16 Pro remonts Rīgā",
    metaDescription: "iPhone 16 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 16 Pro</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-16-plus",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 16 sērija",
    seriesSlug: "iphone-16-serija",
    name: "iPhone 16 Plus",
    year: 2024,
    image: "/images/devices/iphone/iphone-16plus.png",
    popular: true,
    order: 102,
    metaTitle: "iPhone 16 Plus remonts Rīgā",
    metaDescription: "iPhone 16 Plus ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 16 Plus</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-16",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 16 sērija",
    seriesSlug: "iphone-16-serija",
    name: "iPhone 16",
    year: 2024,
    image: "/images/devices/iphone-16.jpg",
    popular: true,
    order: 103,
    metaTitle: "iPhone 16 remonts Rīgā",
    metaDescription: "iPhone 16 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 16</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-15-pro-max",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 15 sērija",
    seriesSlug: "iphone-15-serija",
    name: "iPhone 15 Pro Max",
    year: 2023,
    image: "/images/devices/iphone-15-pro-max.jpg",
    popular: true,
    order: 110,
    metaTitle: "iPhone 15 Pro Max remonts Rīgā",
    metaDescription: "iPhone 15 Pro Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 15 Pro Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-15-pro",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 15 sērija",
    seriesSlug: "iphone-15-serija",
    name: "iPhone 15 Pro",
    year: 2023,
    image: "/images/devices/iphone-15-pro.jpg",
    popular: true,
    order: 111,
    metaTitle: "iPhone 15 Pro remonts Rīgā",
    metaDescription: "iPhone 15 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 15 Pro</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-15-plus",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 15 sērija",
    seriesSlug: "iphone-15-serija",
    name: "iPhone 15 Plus",
    year: 2023,
    image: "/images/devices/iphone-15-plus.jpg",
    popular: true,
    order: 112,
    metaTitle: "iPhone 15 Plus remonts Rīgā",
    metaDescription: "iPhone 15 Plus ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 15 Plus</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-15",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 15 sērija",
    seriesSlug: "iphone-15-serija",
    name: "iPhone 15",
    year: 2023,
    image: "/images/devices/iphone-15.jpg",
    popular: true,
    order: 113,
    metaTitle: "iPhone 15 remonts Rīgā",
    metaDescription: "iPhone 15 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 15</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-14-pro-max",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 14 sērija",
    seriesSlug: "iphone-14-serija",
    name: "iPhone 14 Pro Max",
    year: 2022,
    image: "/images/devices/iphone-14-pro-max.jpg",
    popular: true,
    order: 120,
    metaTitle: "iPhone 14 Pro Max remonts Rīgā",
    metaDescription: "iPhone 14 Pro Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 14 Pro Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

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
    order: 121,
    metaTitle: "iPhone 14 Pro remonts Rīgā",
    metaDescription: "iPhone 14 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 14 Pro</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-14-plus",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 14 sērija",
    seriesSlug: "iphone-14-serija",
    name: "iPhone 14 Plus",
    year: 2022,
    image: "/images/devices/iphone-14-plus.jpg",
    popular: true,
    order: 122,
    metaTitle: "iPhone 14 Plus remonts Rīgā",
    metaDescription: "iPhone 14 Plus ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 14 Plus</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-14",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 14 sērija",
    seriesSlug: "iphone-14-serija",
    name: "iPhone 14",
    year: 2022,
    image: "/images/devices/iphone-14.jpg",
    popular: true,
    order: 123,
    metaTitle: "iPhone 14 remonts Rīgā",
    metaDescription: "iPhone 14 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 14</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-13-pro-max",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 13 sērija",
    seriesSlug: "iphone-13-serija",
    name: "iPhone 13 Pro Max",
    year: 2021,
    image: "/images/devices/iphone-13-pro-max.jpg",
    popular: true,
    order: 130,
    metaTitle: "iPhone 13 Pro Max remonts Rīgā",
    metaDescription: "iPhone 13 Pro Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 13 Pro Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-13-pro",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 13 sērija",
    seriesSlug: "iphone-13-serija",
    name: "iPhone 13 Pro",
    year: 2021,
    image: "/images/devices/iphone-13-pro.jpg",
    popular: true,
    order: 131,
    metaTitle: "iPhone 13 Pro remonts Rīgā",
    metaDescription: "iPhone 13 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 13 Pro</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-13",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 13 sērija",
    seriesSlug: "iphone-13-serija",
    name: "iPhone 13",
    year: 2021,
    image: "/images/devices/iphone-13.jpg",
    popular: true,
    order: 132,
    metaTitle: "iPhone 13 remonts Rīgā",
    metaDescription: "iPhone 13 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 13</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-13-mini",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 13 sērija",
    seriesSlug: "iphone-13-serija",
    name: "iPhone 13 mini",
    year: 2021,
    image: "/images/devices/iphone-13-mini.jpg",
    popular: false,
    order: 133,
    metaTitle: "iPhone 13 mini remonts Rīgā",
    metaDescription: "iPhone 13 mini ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 13 mini</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-12-pro-max",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 12 sērija",
    seriesSlug: "iphone-12-serija",
    name: "iPhone 12 Pro Max",
    year: 2020,
    image: "/images/devices/iphone-12-pro-max.jpg",
    popular: true,
    order: 140,
    metaTitle: "iPhone 12 Pro Max remonts Rīgā",
    metaDescription: "iPhone 12 Pro Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 12 Pro Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-12-pro",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 12 sērija",
    seriesSlug: "iphone-12-serija",
    name: "iPhone 12 Pro",
    year: 2020,
    image: "/images/devices/iphone-12-pro.jpg",
    popular: true,
    order: 141,
    metaTitle: "iPhone 12 Pro remonts Rīgā",
    metaDescription: "iPhone 12 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 12 Pro</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-12",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 12 sērija",
    seriesSlug: "iphone-12-serija",
    name: "iPhone 12",
    year: 2020,
    image: "/images/devices/iphone-12.jpg",
    popular: true,
    order: 142,
    metaTitle: "iPhone 12 remonts Rīgā",
    metaDescription: "iPhone 12 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 12</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-12-mini",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 12 sērija",
    seriesSlug: "iphone-12-serija",
    name: "iPhone 12 mini",
    year: 2020,
    image: "/images/devices/iphone-12-mini.jpg",
    popular: false,
    order: 143,
    metaTitle: "iPhone 12 mini remonts Rīgā",
    metaDescription: "iPhone 12 mini ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 12 mini</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-11-pro-max",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 11 sērija",
    seriesSlug: "iphone-11-serija",
    name: "iPhone 11 Pro Max",
    year: 2019,
    image: "/images/devices/iphone-11-pro-max.jpg",
    popular: true,
    order: 150,
    metaTitle: "iPhone 11 Pro Max remonts Rīgā",
    metaDescription: "iPhone 11 Pro Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 11 Pro Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-11-pro",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 11 sērija",
    seriesSlug: "iphone-11-serija",
    name: "iPhone 11 Pro",
    year: 2019,
    image: "/images/devices/iphone-11-pro.jpg",
    popular: true,
    order: 151,
    metaTitle: "iPhone 11 Pro remonts Rīgā",
    metaDescription: "iPhone 11 Pro ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 11 Pro</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-11",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone 11 sērija",
    seriesSlug: "iphone-11-serija",
    name: "iPhone 11",
    year: 2019,
    image: "/images/devices/iphone-11.jpg",
    popular: true,
    order: 152,
    metaTitle: "iPhone 11 remonts Rīgā",
    metaDescription: "iPhone 11 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone 11</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-xs-max",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone X sērija",
    seriesSlug: "iphone-x-serija",
    name: "iPhone XS Max",
    year: 2018,
    image: "/images/devices/iphone-xs-max.jpg",
    popular: false,
    order: 160,
    metaTitle: "iPhone XS Max remonts Rīgā",
    metaDescription: "iPhone XS Max ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone XS Max</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-xs",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone X sērija",
    seriesSlug: "iphone-x-serija",
    name: "iPhone XS",
    year: 2018,
    image: "/images/devices/iphone-xs.jpg",
    popular: false,
    order: 161,
    metaTitle: "iPhone XS remonts Rīgā",
    metaDescription: "iPhone XS ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone XS</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-xr",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone X sērija",
    seriesSlug: "iphone-x-serija",
    name: "iPhone XR",
    year: 2018,
    image: "/images/devices/iphone-xr.jpg",
    popular: true,
    order: 162,
    metaTitle: "iPhone XR remonts Rīgā",
    metaDescription: "iPhone XR ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone XR</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-x",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone X sērija",
    seriesSlug: "iphone-x-serija",
    name: "iPhone X",
    year: 2017,
    image: "/images/devices/iphone-x.jpg",
    popular: true,
    order: 163,
    metaTitle: "iPhone X remonts Rīgā",
    metaDescription: "iPhone X ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone X</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-se-3",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone SE sērija",
    seriesSlug: "iphone-se-serija",
    name: "iPhone SE (3. paaudze)",
    year: 2022,
    image: "/images/devices/iphone-se-3.jpg",
    popular: true,
    order: 170,
    metaTitle: "iPhone SE (3. paaudze) remonts Rīgā",
    metaDescription: "iPhone SE (2022) ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone SE (3. paaudze)</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-se-2",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone SE sērija",
    seriesSlug: "iphone-se-serija",
    name: "iPhone SE (2. paaudze)",
    year: 2020,
    image: "/images/devices/iphone-se-2.jpg",
    popular: true,
    order: 171,
    metaTitle: "iPhone SE (2. paaudze) remonts Rīgā",
    metaDescription: "iPhone SE (2020) ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone SE (2. paaudze)</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
    slug: "iphone-se-1",
    category: "telefonu-remonts",
    brand: "Apple",
    brandSlug: "apple",
    series: "iPhone SE sērija",
    seriesSlug: "iphone-se-serija",
    name: "iPhone SE (1. paaudze)",
    year: 2016,
    image: "/images/devices/iphone-se-1.jpg",
    popular: false,
    order: 172,
    metaTitle: "iPhone SE (1. paaudze) remonts Rīgā",
    metaDescription: "iPhone SE (2016) ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPhone SE (1. paaudze)</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  },

  {
  slug: "iphone-8-plus",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 8 Plus",
  year: 2017,
  image: "/images/devices/iphone-8-plus.jpg",
  popular: false,
  order: 180,
  metaTitle: "iPhone 8 Plus remonts Rīgā",
  metaDescription: "iPhone 8 Plus ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 8 Plus</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-8",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 8",
  year: 2017,
  image: "/images/devices/iphone-8.jpg",
  popular: false,
  order: 181,
  metaTitle: "iPhone 8 remonts Rīgā",
  metaDescription: "iPhone 8 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 8</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-7-plus",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 7 Plus",
  year: 2016,
  image: "/images/devices/iphone-7-plus.jpg",
  popular: false,
  order: 190,
  metaTitle: "iPhone 7 Plus remonts Rīgā",
  metaDescription: "iPhone 7 Plus ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 7 Plus</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-7",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 7",
  year: 2016,
  image: "/images/devices/iphone-7.jpg",
  popular: false,
  order: 191,
  metaTitle: "iPhone 7 remonts Rīgā",
  metaDescription: "iPhone 7 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 7</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-6s-plus",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 6s Plus",
  year: 2015,
  image: "/images/devices/iphone-6s-plus.jpg",
  popular: false,
  order: 195,
  metaTitle: "iPhone 6s Plus remonts Rīgā",
  metaDescription: "iPhone 6s Plus ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 6s Plus</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-6s",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 6s",
  year: 2015,
  image: "/images/devices/iphone-6s.jpg",
  popular: false,
  order: 196,
  metaTitle: "iPhone 6s remonts Rīgā",
  metaDescription: "iPhone 6s ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 6s</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-6-plus",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 6 Plus",
  year: 2014,
  image: "/images/devices/iphone-6-plus.jpg",
  popular: false,
  order: 197,
  metaTitle: "iPhone 6 Plus remonts Rīgā",
  metaDescription: "iPhone 6 Plus ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 6 Plus</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-6",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 6",
  year: 2014,
  image: "/images/devices/iphone-6.jpg",
  popular: false,
  order: 198,
  metaTitle: "iPhone 6 remonts Rīgā",
  metaDescription: "iPhone 6 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 6</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-se-1",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone SE (1. paaudze)",
  year: 2016,
  image: "/images/devices/iphone-se-1.jpg",
  popular: false,
  order: 172,
  metaTitle: "iPhone SE (1. paaudze) remonts Rīgā",
  metaDescription: "iPhone SE (2016) ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone SE (1. paaudze)</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},
{
  slug: "iphone-5s",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 5s",
  year: 2013,
  image: "/images/devices/iphone-5s.jpg",
  popular: false,
  order: 200,
  metaTitle: "iPhone 5s remonts Rīgā",
  metaDescription: "iPhone 5s ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 5s</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-5c",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 5c",
  year: 2013,
  image: "/images/devices/iphone-5c.jpg",
  popular: false,
  order: 201,
  metaTitle: "iPhone 5c remonts Rīgā",
  metaDescription: "iPhone 5c ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 5c</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-5",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 5",
  year: 2012,
  image: "/images/devices/iphone-5.jpg",
  popular: false,
  order: 202,
  metaTitle: "iPhone 5 remonts Rīgā",
  metaDescription: "iPhone 5 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 5</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-4s",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 4s",
  year: 2011,
  image: "/images/devices/iphone-4s.jpg",
  popular: false,
  order: 203,
  metaTitle: "iPhone 4s remonts Rīgā",
  metaDescription: "iPhone 4s ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 4s</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

{
  slug: "iphone-4",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "Vecākie iPhone modeļi",
  seriesSlug: "vecakie-iphone-modeli",
  name: "iPhone 4",
  year: 2010,
  image: "/images/devices/iphone-4.jpg",
  popular: false,
  order: 204,
  metaTitle: "iPhone 4 remonts Rīgā",
  metaDescription: "iPhone 4 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
  bodyHtml: `
<p><strong>iPhone 4</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},

  // --- Samsung devices (paste these objects into your existing devices array) ---

{
  slug: "galaxy-a3-2016",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A3 (2016)",
  year: null,
  image: "/images/devices/samsung-galaxy-a3-2016.webp",
  popular: false,
  order: 260,
  metaTitle: "Samsung Galaxy A3 (2016) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A3 (2016). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A3 (2016)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a5-2016",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A5 (2016)",
  year: null,
  image: "/images/devices/samsung-galaxy-a5-2016.webp",
  popular: false,
  order: 261,
  metaTitle: "Samsung Galaxy A5 (2016) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A5 (2016). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A5 (2016)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a7-2016",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A7 (2016)",
  year: null,
  image: "/images/devices/samsung-galaxy-a7-2016.webp",
  popular: false,
  order: 262,
  metaTitle: "Samsung Galaxy A7 (2016) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A7 (2016). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A7 (2016)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a3-2017",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A3 (2017)",
  year: null,
  image: "/images/devices/samsung-galaxy-a3-2017.webp",
  popular: false,
  order: 263,
  metaTitle: "Samsung Galaxy A3 (2017) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A3 (2017). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A3 (2017)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a5-2017",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A5 (2017)",
  year: null,
  image: "/images/devices/samsung-galaxy-a5-2017.webp",
  popular: false,
  order: 264,
  metaTitle: "Samsung Galaxy A5 (2017) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A5 (2017). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A5 (2017)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a7-2017",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A7 (2017)",
  year: null,
  image: "/images/devices/samsung-galaxy-a7-2017.webp",
  popular: false,
  order: 265,
  metaTitle: "Samsung Galaxy A7 (2017) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A7 (2017). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A7 (2017)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a6-2018",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A6 (2018)",
  year: null,
  image: "/images/devices/samsung-galaxy-a6-2018.webp",
  popular: false,
  order: 266,
  metaTitle: "Samsung Galaxy A6 (2018) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A6 (2018). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A6 (2018)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a6-2018",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A6+ (2018)",
  year: null,
  image: "/images/devices/samsung-galaxy-a6-2018.webp",
  popular: false,
  order: 267,
  metaTitle: "Samsung Galaxy A6+ (2018) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A6+ (2018). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A6+ (2018)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a7-2018",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A7 (2018)",
  year: null,
  image: "/images/devices/samsung-galaxy-a7-2018.webp",
  popular: false,
  order: 268,
  metaTitle: "Samsung Galaxy A7 (2018) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A7 (2018). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A7 (2018)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a8-2018",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A8 (2018)",
  year: null,
  image: "/images/devices/samsung-galaxy-a8-2018.webp",
  popular: false,
  order: 269,
  metaTitle: "Samsung Galaxy A8 (2018) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A8 (2018). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A8 (2018)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a8-2018",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A8+ (2018)",
  year: null,
  image: "/images/devices/samsung-galaxy-a8-2018.webp",
  popular: false,
  order: 270,
  metaTitle: "Samsung Galaxy A8+ (2018) remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A8+ (2018). 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A8+ (2018)</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a10",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A10",
  year: null,
  image: "/images/devices/samsung-galaxy-a10.webp",
  popular: false,
  order: 271,
  metaTitle: "Samsung Galaxy A10 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A10. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A10</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a20",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A20",
  year: null,
  image: "/images/devices/samsung-galaxy-a20.webp",
  popular: false,
  order: 272,
  metaTitle: "Samsung Galaxy A20 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A20. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A20</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a30",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A30",
  year: null,
  image: "/images/devices/samsung-galaxy-a30.webp",
  popular: false,
  order: 273,
  metaTitle: "Samsung Galaxy A30 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A30. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A30</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a40",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A40",
  year: null,
  image: "/images/devices/samsung-galaxy-a40.webp",
  popular: false,
  order: 274,
  metaTitle: "Samsung Galaxy A40 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A40. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A40</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a50",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A50",
  year: null,
  image: "/images/devices/samsung-galaxy-a50.webp",
  popular: false,
  order: 275,
  metaTitle: "Samsung Galaxy A50 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A50. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A50</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a70",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A70",
  year: null,
  image: "/images/devices/samsung-galaxy-a70.webp",
  popular: false,
  order: 276,
  metaTitle: "Samsung Galaxy A70 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A70. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A70</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a80",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A80",
  year: null,
  image: "/images/devices/samsung-galaxy-a80.webp",
  popular: false,
  order: 277,
  metaTitle: "Samsung Galaxy A80 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A80. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A80</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a10s",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A10s",
  year: null,
  image: "/images/devices/samsung-galaxy-a10s.webp",
  popular: false,
  order: 278,
  metaTitle: "Samsung Galaxy A10s remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A10s. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A10s</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a20s",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A20s",
  year: null,
  image: "/images/devices/samsung-galaxy-a20s.webp",
  popular: false,
  order: 279,
  metaTitle: "Samsung Galaxy A20s remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A20s. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A20s</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a30s",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A30s",
  year: null,
  image: "/images/devices/samsung-galaxy-a30s.webp",
  popular: false,
  order: 280,
  metaTitle: "Samsung Galaxy A30s remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A30s. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A30s</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a50s",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A50s",
  year: null,
  image: "/images/devices/samsung-galaxy-a50s.webp",
  popular: false,
  order: 281,
  metaTitle: "Samsung Galaxy A50s remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A50s. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A50s</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a51",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A51",
  year: null,
  image: "/images/devices/samsung-galaxy-a51.webp",
  popular: false,
  order: 282,
  metaTitle: "Samsung Galaxy A51 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A51. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A51</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a71",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A71",
  year: null,
  image: "/images/devices/samsung-galaxy-a71.webp",
  popular: false,
  order: 283,
  metaTitle: "Samsung Galaxy A71 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A71. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A71</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a31",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A31",
  year: null,
  image: "/images/devices/samsung-galaxy-a31.webp",
  popular: false,
  order: 284,
  metaTitle: "Samsung Galaxy A31 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A31. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A31</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a41",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A41",
  year: null,
  image: "/images/devices/samsung-galaxy-a41.webp",
  popular: false,
  order: 285,
  metaTitle: "Samsung Galaxy A41 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A41. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A41</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a32",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A32",
  year: null,
  image: "/images/devices/samsung-galaxy-a32.webp",
  popular: false,
  order: 286,
  metaTitle: "Samsung Galaxy A32 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A32. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A32</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a42-5g",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A42 5G",
  year: null,
  image: "/images/devices/samsung-galaxy-a42-5g.webp",
  popular: false,
  order: 287,
  metaTitle: "Samsung Galaxy A42 5G remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A42 5G. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A42 5G</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a52",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A52",
  year: null,
  image: "/images/devices/samsung-galaxy-a52.webp",
  popular: false,
  order: 288,
  metaTitle: "Samsung Galaxy A52 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A52. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A52</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a52s",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A52s",
  year: null,
  image: "/images/devices/samsung-galaxy-a52s.webp",
  popular: false,
  order: 289,
  metaTitle: "Samsung Galaxy A52s remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A52s. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A52s</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a72",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A72",
  year: null,
  image: "/images/devices/samsung-galaxy-a72.webp",
  popular: false,
  order: 290,
  metaTitle: "Samsung Galaxy A72 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A72. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A72</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a33-5g",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A33 5G",
  year: null,
  image: "/images/devices/samsung-galaxy-a33-5g.webp",
  popular: false,
  order: 291,
  metaTitle: "Samsung Galaxy A33 5G remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A33 5G. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A33 5G</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a53-5g",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A53 5G",
  year: null,
  image: "/images/devices/samsung-galaxy-a53-5g.webp",
  popular: false,
  order: 292,
  metaTitle: "Samsung Galaxy A53 5G remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A53 5G. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A53 5G</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a54-5g",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A54 5G",
  year: null,
  image: "/images/devices/samsung-galaxy-a54-5g.webp",
  popular: false,
  order: 293,
  metaTitle: "Samsung Galaxy A54 5G remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A54 5G. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A54 5G</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a14",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A14",
  year: null,
  image: "/images/devices/samsung-galaxy-a14.webp",
  popular: false,
  order: 294,
  metaTitle: "Samsung Galaxy A14 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A14. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A14</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a15",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A15",
  year: null,
  image: "/images/devices/samsung-galaxy-a15.webp",
  popular: false,
  order: 295,
  metaTitle: "Samsung Galaxy A15 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A15. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A15</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a25",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A25",
  year: null,
  image: "/images/devices/samsung-galaxy-a25.webp",
  popular: false,
  order: 296,
  metaTitle: "Samsung Galaxy A25 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A25. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A25</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a35",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A35",
  year: null,
  image: "/images/devices/samsung-galaxy-a35.webp",
  popular: false,
  order: 297,
  metaTitle: "Samsung Galaxy A35 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A35. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A35</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a55",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A55",
  year: null,
  image: "/images/devices/samsung-galaxy-a55.webp",
  popular: false,
  order: 298,
  metaTitle: "Samsung Galaxy A55 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A55. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A55</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s7",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S7",
  year: null,
  image: "/images/devices/samsung-galaxy-s7.webp",
  popular: false,
  order: 299,
  metaTitle: "Samsung Galaxy S7 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S7. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S7</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s7-edge",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S7 Edge",
  year: null,
  image: "/images/devices/samsung-galaxy-s7-edge.webp",
  popular: false,
  order: 300,
  metaTitle: "Samsung Galaxy S7 Edge remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S7 Edge. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S7 Edge</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s8",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S8",
  year: null,
  image: "/images/devices/samsung-galaxy-s8.webp",
  popular: false,
  order: 301,
  metaTitle: "Samsung Galaxy S8 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S8. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S8</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s8+",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S8+",
  year: null,
  image: "/images/devices/samsung-galaxy-s8.webp",
  popular: false,
  order: 302,
  metaTitle: "Samsung Galaxy S8+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S8+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S8+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s9",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S9",
  year: null,
  image: "/images/devices/samsung-galaxy-s9.webp",
  popular: false,
  order: 303,
  metaTitle: "Samsung Galaxy S9 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S9. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S9</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s9+",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S9+",
  year: null,
  image: "/images/devices/samsung-galaxy-s9plus.webp",
  popular: false,
  order: 304,
  metaTitle: "Samsung Galaxy S9+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S9+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S9+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s10e",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S10e",
  year: null,
  image: "/images/devices/samsung-galaxy-s10e.webp",
  popular: false,
  order: 305,
  metaTitle: "Samsung Galaxy S10e remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S10e. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S10e</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s10",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S10",
  year: null,
  image: "/images/devices/samsung-galaxy-s10.webp",
  popular: false,
  order: 306,
  metaTitle: "Samsung Galaxy S10 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S10. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S10</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s10+",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S10+",
  year: null,
  image: "/images/devices/samsung-galaxy-s10plus.webp",
  popular: false,
  order: 307,
  metaTitle: "Samsung Galaxy S10+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S10+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S10+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s20",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S20",
  year: null,
  image: "/images/devices/samsung-galaxy-s20.webp",
  popular: false,
  order: 308,
  metaTitle: "Samsung Galaxy S20 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S20. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S20</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s20",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S20+",
  year: null,
  image: "/images/devices/samsung-galaxy-s20.webp",
  popular: false,
  order: 309,
  metaTitle: "Samsung Galaxy S20+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S20+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S20+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s20-ultra",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S20 Ultra",
  year: null,
  image: "/images/devices/samsung-galaxy-s20-ultra.webp",
  popular: false,
  order: 310,
  metaTitle: "Samsung Galaxy S20 Ultra remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S20 Ultra. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S20 Ultra</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s21",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S21",
  year: null,
  image: "/images/devices/samsung-galaxy-s21.webp",
  popular: false,
  order: 311,
  metaTitle: "Samsung Galaxy S21 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S21. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S21</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s21",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S21+",
  year: null,
  image: "/images/devices/samsung-galaxy-s21.webp",
  popular: false,
  order: 312,
  metaTitle: "Samsung Galaxy S21+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S21+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S21+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s21-ultra",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S21 Ultra",
  year: null,
  image: "/images/devices/samsung-galaxy-s21-ultra.webp",
  popular: false,
  order: 313,
  metaTitle: "Samsung Galaxy S21 Ultra remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S21 Ultra. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S21 Ultra</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s22",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S22",
  year: null,
  image: "/images/devices/samsung-galaxy-s22.webp",
  popular: false,
  order: 314,
  metaTitle: "Samsung Galaxy S22 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S22. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S22</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s22",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S22+",
  year: null,
  image: "/images/devices/samsung-galaxy-s22.webp",
  popular: false,
  order: 315,
  metaTitle: "Samsung Galaxy S22+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S22+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S22+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s22-ultra",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S22 Ultra",
  year: null,
  image: "/images/devices/samsung-galaxy-s22-ultra.webp",
  popular: false,
  order: 316,
  metaTitle: "Samsung Galaxy S22 Ultra remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S22 Ultra. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S22 Ultra</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s23",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S23",
  year: null,
  image: "/images/devices/samsung-galaxy-s23.webp",
  popular: false,
  order: 317,
  metaTitle: "Samsung Galaxy S23 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S23. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S23</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s23",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S23+",
  year: null,
  image: "/images/devices/samsung-galaxy-s23.webp",
  popular: false,
  order: 318,
  metaTitle: "Samsung Galaxy S23+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S23+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S23+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s23-ultra",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S23 Ultra",
  year: null,
  image: "/images/devices/samsung-galaxy-s23-ultra.webp",
  popular: false,
  order: 319,
  metaTitle: "Samsung Galaxy S23 Ultra remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S23 Ultra. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S23 Ultra</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s24",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S24",
  year: null,
  image: "/images/devices/samsung-galaxy-s24.webp",
  popular: false,
  order: 320,
  metaTitle: "Samsung Galaxy S24 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S24. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S24</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s24",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S24+",
  year: null,
  image: "/images/devices/samsung-galaxy-s24.webp",
  popular: false,
  order: 321,
  metaTitle: "Samsung Galaxy S24+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S24+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S24+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s24-ultra",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S24 Ultra",
  year: null,
  image: "/images/devices/samsung-galaxy-s24-ultra.webp",
  popular: false,
  order: 322,
  metaTitle: "Samsung Galaxy S24 Ultra remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S24 Ultra. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S24 Ultra</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-note8",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Note sērija",
  seriesSlug: "note-serija",
  name: "Galaxy Note8",
  year: null,
  image: "/images/devices/samsung-galaxy-note8.webp",
  popular: false,
  order: 323,
  metaTitle: "Samsung Galaxy Note8 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Note8. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Note8</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-note9",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Note sērija",
  seriesSlug: "note-serija",
  name: "Galaxy Note9",
  year: null,
  image: "/images/devices/samsung-galaxy-note9.webp",
  popular: false,
  order: 324,
  metaTitle: "Samsung Galaxy Note9 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Note9. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Note9</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-note10",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Note sērija",
  seriesSlug: "note-serija",
  name: "Galaxy Note10",
  year: null,
  image: "/images/devices/samsung-galaxy-note10.webp",
  popular: false,
  order: 325,
  metaTitle: "Samsung Galaxy Note10 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Note10. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Note10</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-note10+",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Note sērija",
  seriesSlug: "note-serija",
  name: "Galaxy Note10+",
  year: null,
  image: "/images/devices/samsung-galaxy-note10plus.webp",
  popular: false,
  order: 326,
  metaTitle: "Samsung Galaxy Note10+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Note10+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Note10+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-note20",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Note sērija",
  seriesSlug: "note-serija",
  name: "Galaxy Note20",
  year: null,
  image: "/images/devices/samsung-galaxy-note20.webp",
  popular: false,
  order: 327,
  metaTitle: "Samsung Galaxy Note20 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Note20. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Note20</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-note20-ultra",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Note sērija",
  seriesSlug: "note-serija",
  name: "Galaxy Note20 Ultra",
  year: null,
  image: "/images/devices/samsung-galaxy-note20-ultra.webp",
  popular: false,
  order: 328,
  metaTitle: "Samsung Galaxy Note20 Ultra remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Note20 Ultra. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Note20 Ultra</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-fold",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Fold",
  year: null,
  image: "/images/devices/samsung-galaxy-fold.webp",
  popular: false,
  order: 329,
  metaTitle: "Samsung Galaxy Fold remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Fold. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Fold</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-flip",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Flip",
  year: null,
  image: "/images/devices/samsung-galaxy-z-flip.webp",
  popular: false,
  order: 330,
  metaTitle: "Samsung Galaxy Z Flip remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Flip. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Flip</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-flip-5g",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Flip 5G",
  year: null,
  image: "/images/devices/samsung-galaxy-z-flip-5g.webp",
  popular: false,
  order: 331,
  metaTitle: "Samsung Galaxy Z Flip 5G remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Flip 5G. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Flip 5G</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-fold2",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Fold2",
  year: null,
  image: "/images/devices/samsung-galaxy-z-fold2.webp",
  popular: false,
  order: 332,
  metaTitle: "Samsung Galaxy Z Fold2 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Fold2. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Fold2</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-fold3",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Fold3",
  year: null,
  image: "/images/devices/samsung-galaxy-z-fold3.webp",
  popular: false,
  order: 333,
  metaTitle: "Samsung Galaxy Z Fold3 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Fold3. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Fold3</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-flip3",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Flip3",
  year: null,
  image: "/images/devices/samsung-galaxy-z-flip3.webp",
  popular: false,
  order: 334,
  metaTitle: "Samsung Galaxy Z Flip3 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Flip3. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Flip3</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-fold4",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Fold4",
  year: null,
  image: "/images/devices/samsung-galaxy-z-fold4.webp",
  popular: false,
  order: 335,
  metaTitle: "Samsung Galaxy Z Fold4 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Fold4. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Fold4</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-flip4",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Flip4",
  year: null,
  image: "/images/devices/samsung-galaxy-z-flip4.webp",
  popular: false,
  order: 336,
  metaTitle: "Samsung Galaxy Z Flip4 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Flip4. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Flip4</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-fold5",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Fold5",
  year: null,
  image: "/images/devices/samsung-galaxy-z-fold5.webp",
  popular: false,
  order: 337,
  metaTitle: "Samsung Galaxy Z Fold5 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Fold5. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Fold5</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-flip5",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Flip5",
  year: null,
  image: "/images/devices/samsung-galaxy-z-flip5.webp",
  popular: false,
  order: 338,
  metaTitle: "Samsung Galaxy Z Flip5 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Flip5. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Flip5</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s25",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S25",
  year: null,
  image: "/images/devices/samsung-galaxy-s25.webp",
  popular: false,
  order: 339,
  metaTitle: "Samsung Galaxy S25 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S25. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S25</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s25",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S25+",
  year: null,
  image: "/images/devices/samsung-galaxy-s25.webp",
  popular: false,
  order: 340,
  metaTitle: "Samsung Galaxy S25+ remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S25+. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S25+</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s25-ultra",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S25 Ultra",
  year: null,
  image: "/images/devices/samsung-galaxy-s25-ultra.webp",
  popular: false,
  order: 341,
  metaTitle: "Samsung Galaxy S25 Ultra remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S25 Ultra. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S25 Ultra</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s25-edge",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S25 Edge",
  year: null,
  image: "/images/devices/samsung-galaxy-s25-edge.webp",
  popular: false,
  order: 342,
  metaTitle: "Samsung Galaxy S25 Edge remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S25 Edge. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S25 Edge</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-s25-fe",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy S sērija",
  seriesSlug: "galaxy-s-serija",
  name: "Galaxy S25 FE",
  year: null,
  image: "/images/devices/samsung-galaxy-s25-fe.webp",
  popular: false,
  order: 343,
  metaTitle: "Samsung Galaxy S25 FE remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy S25 FE. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy S25 FE</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-fold7",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Fold7",
  year: null,
  image: "/images/devices/samsung-galaxy-z-fold7.webp",
  popular: false,
  order: 344,
  metaTitle: "Samsung Galaxy Z Fold7 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Fold7. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Fold7</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-flip7",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Flip7",
  year: null,
  image: "/images/devices/samsung-galaxy-z-flip7.webp",
  popular: false,
  order: 345,
  metaTitle: "Samsung Galaxy Z Flip7 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Flip7. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Flip7</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-z-flip7-fe",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Z sērija",
  seriesSlug: "z-serija",
  name: "Galaxy Z Flip7 FE",
  year: null,
  image: "/images/devices/samsung-galaxy-z-flip7-fe.webp",
  popular: false,
  order: 346,
  metaTitle: "Samsung Galaxy Z Flip7 FE remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy Z Flip7 FE. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy Z Flip7 FE</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a56",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A56",
  year: null,
  image: "/images/devices/samsung-galaxy-a56.webp",
  popular: false,
  order: 347,
  metaTitle: "Samsung Galaxy A56 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A56. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A56</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a36",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A36",
  year: null,
  image: "/images/devices/samsung-galaxy-a36.webp",
  popular: false,
  order: 348,
  metaTitle: "Samsung Galaxy A36 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A36. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A36</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a26",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A26",
  year: null,
  image: "/images/devices/samsung-galaxy-a26.webp",
  popular: false,
  order: 349,
  metaTitle: "Samsung Galaxy A26 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A26. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A26</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},
{
  slug: "galaxy-a16",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy A sērija",
  seriesSlug: "galaxy-a-serija",
  name: "Galaxy A16",
  year: null,
  image: "/images/devices/samsung-galaxy-a16.webp",
  popular: false,
  order: 350,
  metaTitle: "Samsung Galaxy A16 remonts Rīgā",
  metaDescription: "Ekrāna un baterijas maiņa Galaxy A16. 90 dienu garantija.",
  bodyHtml: `
<p><strong>Galaxy A16</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p><p>Bezmaksas diagnostika, pārskatāmas cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu centrā.</p>
  `,
},


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
    order: 300,
    metaTitle: "Huawei P30 Pro remonts Rīgā",
    metaDescription: "Ekrāna, baterijas un kameras remonts Huawei P30 Pro.",
    bodyHtml: `
<p><strong>Huawei P30 Pro</strong> remonts Rīgā ar ātru diagnostiku un augstas kvalitātes detaļām. 
    Veicam ekrāna, baterijas un kameras maiņu tajā pašā dienā ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un skaidras cenas — iLab meistari atjaunos Tavu Huawei kā jaunu.</p>
  `,

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
    order: 500,
    metaTitle: "iPad Pro 12.9 remonts Rīgā",
    metaDescription: "iPad Pro 12.9 ekrāna un baterijas maiņa tajā pašā dienā. 90 dienu garantija.",
    bodyHtml: `
<p><strong>iPad Pro 12.9</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

  }
];

export default devices;
