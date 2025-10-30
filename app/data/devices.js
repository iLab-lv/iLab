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
  image: "/images/devices/iphone-17-pro-max.webp",
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
  image: "/images/devices/iphone-17-pro.webp",
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
  image: "/images/devices/iphone-air.webp",
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
  image: "/images/devices/iphone-17.webp",
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
    image: "/images/devices/iphone-16-pro.webp",
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
    image: "/images/devices/iphone/iphone-16plus.webp",
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
    image: "/images/devices/iphone-16.webp",
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
    image: "/images/devices/iphone-15-pro-max.webp",
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
    image: "/images/devices/iphone-15-pro.webp",
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
    image: "/images/devices/iphone-15-plus.webp",
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
    image: "/images/devices/iphone-15.webp",
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
    image: "/images/devices/iphone-14-pro-max.webp",
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
    image: "/images/devices/iphone-14-pro.webp",
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
    image: "/images/devices/iphone-14-plus.webp",
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
    image: "/images/devices/iphone-14.webp",
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
    image: "/images/devices/iphone-13-pro-max.webp",
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
    image: "/images/devices/iphone-13-pro.webp",
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
    image: "/images/devices/iphone-13.webp",
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
    image: "/images/devices/iphone-13-mini.webp",
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
    image: "/images/devices/iphone-12-pro-max.webp",
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
    image: "/images/devices/iphone-12-pro.webp",
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
    image: "/images/devices/iphone-12.webp",
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
    image: "/images/devices/iphone-12-mini.webp",
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
    image: "/images/devices/iphone-11-pro-max.webp",
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
    image: "/images/devices/iphone-11-pro.webp",
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
    image: "/images/devices/iphone-11.webp",
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
    image: "/images/devices/iphone-xs-max.webp",
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
    image: "/images/devices/iphone-xs.webp",
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
    image: "/images/devices/iphone-xr.webp",
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
    image: "/images/devices/iphone-x.webp",
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
    image: "/images/devices/iphone-se-3.webp",
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
    image: "/images/devices/iphone-se-2.webp",
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
    image: "/images/devices/iphone-se-1.webp",
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
  image: "/images/devices/iphone-8-plus.webp",
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
  image: "/images/devices/iphone-8.webp",
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
  image: "/images/devices/iphone-7-plus.webp",
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
  image: "/images/devices/iphone-7.webp",
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
  image: "/images/devices/iphone-6s-plus.webp",
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
  image: "/images/devices/iphone-6s.webp",
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
  image: "/images/devices/iphone-6-plus.webp",
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
  image: "/images/devices/iphone-6.webp",
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
  image: "/images/devices/iphone-se-1.webp",
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
  image: "/images/devices/iphone-5s.webp",
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
  image: "/images/devices/iphone-5c.webp",
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
  image: "/images/devices/iphone-5.webp",
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
  image: "/images/devices/iphone-4s.webp",
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
  image: "/images/devices/iphone-4.webp",
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

 // ================================
  // Galaxy S sērija (phones)
  // ================================
  {
    slug: "galaxy-s24-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S24 Ultra (SM-S928) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-s24-ultra.webp",
    popular: false,
    order: 260,
    metaTitle: "Samsung Galaxy S24 Ultra (SM-S928) 2024 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S24 Ultra (SM-S928). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S24 Ultra (SM-S928) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s24-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S24+ (SM-S926) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-s24-plus.webp",
    popular: false,
    order: 261,
    metaTitle: "Samsung Galaxy S24+ (SM-S926) 2024 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S24+ (SM-S926). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S24+ (SM-S926) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s24",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S24 (SM-S921) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-s24.webp",
    popular: false,
    order: 262,
    metaTitle: "Samsung Galaxy S24 (SM-S921) 2024 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S24 (SM-S921). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S24 (SM-S921) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s23-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S23 Ultra (SM-S918) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-s23-ultra.webp",
    popular: false,
    order: 263,
    metaTitle: "Samsung Galaxy S23 Ultra (SM-S918) 2023 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S23 Ultra (SM-S918). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S23 Ultra (SM-S918) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s23-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S23+ (SM-S916) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-s23-plus.webp",
    popular: false,
    order: 264,
    metaTitle: "Samsung Galaxy S23+ (SM-S916) 2023 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S23+ (SM-S916). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S23+ (SM-S916) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s23",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S23 (SM-S911) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-s23.webp",
    popular: false,
    order: 265,
    metaTitle: "Samsung Galaxy S23 (SM-S911) 2023 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S23 (SM-S911). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S23 (SM-S911) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s22-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S22 Ultra (SM-S908) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-s22-ultra.webp",
    popular: false,
    order: 266,
    metaTitle: "Samsung Galaxy S22 Ultra (SM-S908) 2022 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S22 Ultra (SM-S908). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S22 Ultra (SM-S908) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s22-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S22+ (SM-S906) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-s22-plus.webp",
    popular: false,
    order: 267,
    metaTitle: "Samsung Galaxy S22+ (SM-S906) 2022 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S22+ (SM-S906). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S22+ (SM-S906) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s22",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S22 (SM-S901) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-s22.webp",
    popular: false,
    order: 268,
    metaTitle: "Samsung Galaxy S22 (SM-S901) 2022 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S22 (SM-S901). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S22 (SM-S901) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s21-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S21 Ultra (SM-G998) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-s21-ultra.webp",
    popular: false,
    order: 269,
    metaTitle: "Samsung Galaxy S21 Ultra (SM-G998) 2021 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S21 Ultra (SM-G998). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S21 Ultra (SM-G998) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s21-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S21+ (SM-G996) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-s21-plus.webp",
    popular: false,
    order: 270,
    metaTitle: "Samsung Galaxy S21+ (SM-G996) 2021 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S21+ (SM-G996). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S21+ (SM-G996) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s21",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S21 (SM-G991) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-s21.webp",
    popular: false,
    order: 271,
    metaTitle: "Samsung Galaxy S21 (SM-G991) 2021 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S21 (SM-G991). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S21 (SM-G991) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s20-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S20 Ultra (SM-G988) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-s20-ultra.webp",
    popular: false,
    order: 272,
    metaTitle: "Samsung Galaxy S20 Ultra (SM-G988) 2020 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S20 Ultra (SM-G988). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S20 Ultra (SM-G988) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s20-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S20+ (SM-G985) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-s20-plus.webp",
    popular: false,
    order: 273,
    metaTitle: "Samsung Galaxy S20+ (SM-G985) 2020 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S20+ (SM-G985). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S20+ (SM-G985) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s20",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S20 (SM-G980) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-s20.webp",
    popular: false,
    order: 274,
    metaTitle: "Samsung Galaxy S20 (SM-G980) 2020 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S20 (SM-G980). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S20 (SM-G980) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s10-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S10+ (SM-G975) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-s10-plus.webp",
    popular: false,
    order: 275,
    metaTitle: "Samsung Galaxy S10+ (SM-G975) 2019 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S10+ (SM-G975). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S10+ (SM-G975) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s10",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S10 (SM-G973) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-s10.webp",
    popular: false,
    order: 276,
    metaTitle: "Samsung Galaxy S10 (SM-G973) 2019 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S10 (SM-G973). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S10 (SM-G973) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s10e",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S10e (SM-G970) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-s10e.webp",
    popular: false,
    order: 277,
    metaTitle: "Samsung Galaxy S10e (SM-G970) 2019 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S10e (SM-G970). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S10e (SM-G970) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s9-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S9+ (SM-G965) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-s9-plus.webp",
    popular: false,
    order: 278,
    metaTitle: "Samsung Galaxy S9+ (SM-G965) 2018 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S9+ (SM-G965). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S9+ (SM-G965) 2018</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s9",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S9 (SM-G960) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-s9.webp",
    popular: false,
    order: 279,
    metaTitle: "Samsung Galaxy S9 (SM-G960) 2018 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S9 (SM-G960). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S9 (SM-G960) 2018</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s8-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S8+ (SM-G955) 2017",
    year: 2017,
    image: "/images/devices/samsung/samsung-galaxy-s8-plus.webp",
    popular: false,
    order: 280,
    metaTitle: "Samsung Galaxy S8+ (SM-G955) 2017 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S8+ (SM-G955). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S8+ (SM-G955) 2017</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s8",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S8 (SM-G950) 2017",
    year: 2017,
    image: "/images/devices/samsung/samsung-galaxy-s8.webp",
    popular: false,
    order: 281,
    metaTitle: "Samsung Galaxy S8 (SM-G950) 2017 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S8 (SM-G950). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S8 (SM-G950) 2017</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s7-edge",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S7 Edge (SM-G935) 2016",
    year: 2016,
    image: "/images/devices/samsung/samsung-galaxy-s7-edge.webp",
    popular: false,
    order: 282,
    metaTitle: "Samsung Galaxy S7 Edge (SM-G935) 2016 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S7 Edge (SM-G935). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S7 Edge (SM-G935) 2016</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },
  {
    slug: "galaxy-s7",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S7 (SM-G930) 2016",
    year: 2016,
    image: "/images/devices/samsung/samsung-galaxy-s7.webp",
    popular: false,
    order: 283,
    metaTitle: "Samsung Galaxy S7 (SM-G930) 2016 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy S7 (SM-G930). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy S7 (SM-G930) 2016</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  

  // ================================
  // Galaxy Z sērija (foldable phones)
  // ================================
  {
    slug: "galaxy-z-fold5",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Fold5 (SM-F946) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-z-fold5.webp",
    popular: false,
    order: 289,
    metaTitle: "Samsung Galaxy Z Fold5 (SM-F946) 2023 remonts Rīgā",
    metaDescription: "Galaxy Z Fold5 (SM-F946) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Fold5 (SM-F946) 2023</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },
  {
    slug: "galaxy-z-flip5",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip5 (SM-F731) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-z-flip5.webp",
    popular: false,
    order: 290,
    metaTitle: "Samsung Galaxy Z Flip5 (SM-F731) 2023 remonts Rīgā",
    metaDescription: "Galaxy Z Flip5 (SM-F731) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Flip5 (SM-F731) 2023</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },

  {
    slug: "galaxy-z-fold4",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Fold4 (SM-F936) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-z-fold4.webp",
    popular: false,
    order: 291,
    metaTitle: "Samsung Galaxy Z Fold4 (SM-F936) 2022 remonts Rīgā",
    metaDescription: "Galaxy Z Fold4 (SM-F936) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Fold4 (SM-F936) 2022</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },
  {
    slug: "galaxy-z-flip4",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip4 (SM-F721) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-z-flip4.webp",
    popular: false,
    order: 292,
    metaTitle: "Samsung Galaxy Z Flip4 (SM-F721) 2022 remonts Rīgā",
    metaDescription: "Galaxy Z Flip4 (SM-F721) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Flip4 (SM-F721) 2022</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },

  {
    slug: "galaxy-z-fold3",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Fold3 (SM-F926) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-z-fold3.webp",
    popular: false,
    order: 293,
    metaTitle: "Samsung Galaxy Z Fold3 (SM-F926) 2021 remonts Rīgā",
    metaDescription: "Galaxy Z Fold3 (SM-F926) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Fold3 (SM-F926) 2021</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },
  {
    slug: "galaxy-z-flip3",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip3 (SM-F711) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-z-flip3.webp",
    popular: false,
    order: 294,
    metaTitle: "Samsung Galaxy Z Flip3 (SM-F711) 2021 remonts Rīgā",
    metaDescription: "Galaxy Z Flip3 (SM-F711) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Flip3 (SM-F711) 2021</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },

  {
    slug: "galaxy-z-fold2",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Fold2 (SM-F916) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-z-fold2.webp",
    popular: false,
    order: 295,
    metaTitle: "Samsung Galaxy Z Fold2 (SM-F916) 2020 remonts Rīgā",
    metaDescription: "Galaxy Z Fold2 (SM-F916) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Fold2 (SM-F916) 2020</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },
  {
    slug: "galaxy-z-flip-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip 5G (SM-F707) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-z-flip-5g.webp",
    popular: false,
    order: 296,
    metaTitle: "Samsung Galaxy Z Flip 5G (SM-F707) 2020 remonts Rīgā",
    metaDescription: "Galaxy Z Flip 5G (SM-F707) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Flip 5G (SM-F707) 2020</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },
  {
    slug: "galaxy-z-flip",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip (SM-F700) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-z-flip.webp",
    popular: false,
    order: 297,
    metaTitle: "Samsung Galaxy Z Flip (SM-F700) 2020 remonts Rīgā",
    metaDescription: "Galaxy Z Flip (SM-F700) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Z Flip (SM-F700) 2020</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },
  {
    slug: "galaxy-fold",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Fold (SM-F900) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-fold.webp",
    popular: false,
    order: 298,
    metaTitle: "Samsung Galaxy Fold (SM-F900) 2019 remonts Rīgā",
    metaDescription: "Galaxy Fold (SM-F900) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Fold (SM-F900) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un 90 dienu garantiju.</p>
  `,
  },

  // ================================
  // Note sērija
  // ================================
  {
    slug: "galaxy-note20-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Note sērija",
    seriesSlug: "note-serija",
    name: "Galaxy Note20 Ultra (SM-N985) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-note20-ultra.webp",
    popular: false,
    order: 302,
    metaTitle: "Samsung Galaxy Note20 Ultra (SM-N985) 2020 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy Note20 Ultra (SM-N985). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Note20 Ultra (SM-N985) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-note20",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Note sērija",
    seriesSlug: "note-serija",
    name: "Galaxy Note20 (SM-N980) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-note20.webp",
    popular: false,
    order: 303,
    metaTitle: "Samsung Galaxy Note20 (SM-N980) 2020 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy Note20 (SM-N980). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Note20 (SM-N980) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-note10-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Note sērija",
    seriesSlug: "note-serija",
    name: "Galaxy Note10+ (SM-N975) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-note10-plus.webp",
    popular: false,
    order: 304,
    metaTitle: "Samsung Galaxy Note10+ (SM-N975) 2019 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy Note10+ (SM-N975). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Note10+ (SM-N975) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-note10",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Note sērija",
    seriesSlug: "note-serija",
    name: "Galaxy Note10 (SM-N970) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-note10.webp",
    popular: false,
    order: 305,
    metaTitle: "Samsung Galaxy Note10 (SM-N970) 2019 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy Note10 (SM-N970). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Note10 (SM-N970) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-note9",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Note sērija",
    seriesSlug: "note-serija",
    name: "Galaxy Note9 (SM-N960) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-note9.webp",
    popular: false,
    order: 306,
    metaTitle: "Samsung Galaxy Note9 (SM-N960) 2018 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy Note9 (SM-N960). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Note9 (SM-N960) 2018</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-note8",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Note sērija",
    seriesSlug: "note-serija",
    name: "Galaxy Note8 (SM-N950) 2017",
    year: 2017,
    image: "/images/devices/samsung/samsung-galaxy-note8.webp",
    popular: false,
    order: 307,
    metaTitle: "Samsung Galaxy Note8 (SM-N950) 2017 remonts Rīgā",
    metaDescription: "Ekrāna un baterijas maiņa Galaxy Note8 (SM-N950). 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy Note8 (SM-N950) 2017</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  // ================================
  // Galaxy A sērija
  // ================================
  {
    slug: "galaxy-a55-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A55 (SM-A556) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a55-5g.webp",
    popular: false,
    order: 308,
    metaTitle: "Samsung Galaxy A55 (SM-A556) 2024 remonts Rīgā",
    metaDescription: "Galaxy A55 (SM-A556) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A55 (SM-A556) 2024</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a35-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A35 (SM-A356) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a35-5g.webp",
    popular: false,
    order: 309,
    metaTitle: "Samsung Galaxy A35 (SM-A356) 2024 remonts Rīgā",
    metaDescription: "Galaxy A35 (SM-A356) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A35 (SM-A356) 2024</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a25-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A25 (SM-A256) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a25-5g.webp",
    popular: false,
    order: 310,
    metaTitle: "Samsung Galaxy A25 (SM-A256) 2024 remonts Rīgā",
    metaDescription: "Galaxy A25 (SM-A256) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A25 (SM-A256) 2024</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a15-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A15 (SM-A155) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a15-5g.webp",
    popular: false,
    order: 311,
    metaTitle: "Samsung Galaxy A15 (SM-A155) 2024 remonts Rīgā",
    metaDescription: "Galaxy A15 (SM-A155) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A15 (SM-A155) 2024</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  {
    slug: "galaxy-a54-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A54 5G (SM-A546) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a54-5g.webp",
    popular: false,
    order: 312,
    metaTitle: "Samsung Galaxy A54 5G (SM-A546) 2023 remonts Rīgā",
    metaDescription: "Galaxy A54 5G (SM-A546) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A54 5G (SM-A546) 2023</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a14",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A14 (SM-A145) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a14.webp",
    popular: false,
    order: 313,
    metaTitle: "Samsung Galaxy A14 (SM-A145) 2023 remonts Rīgā",
    metaDescription: "Galaxy A14 (SM-A145) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A14 (SM-A145) 2023</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  {
    slug: "galaxy-a53-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A53 5G (SM-A536) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-a53-5g.webp",
    popular: false,
    order: 314,
    metaTitle: "Samsung Galaxy A53 5G (SM-A536) 2022 remonts Rīgā",
    metaDescription: "Galaxy A53 5G (SM-A536) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A53 5G (SM-A536) 2022</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a33-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A33 5G (SM-A336) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-a33-5g.webp",
    popular: false,
    order: 315,
    metaTitle: "Samsung Galaxy A33 5G (SM-A336) 2022 remonts Rīgā",
    metaDescription: "Galaxy A33 5G (SM-A336) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A33 5G (SM-A336) 2022</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  {
    slug: "galaxy-a72",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A72 (SM-A725) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a72.webp",
    popular: false,
    order: 316,
    metaTitle: "Samsung Galaxy A72 (SM-A725) 2021 remonts Rīgā",
    metaDescription: "Galaxy A72 (SM-A725) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A72 (SM-A725) 2021</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a52s-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A52s (SM-A528) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a52s-5g.webp",
    popular: false,
    order: 317,
    metaTitle: "Samsung Galaxy A52s (SM-A528) 2021 remonts Rīgā",
    metaDescription: "Galaxy A52s (SM-A528) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A52s (SM-A528) 2021</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a52",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A52 (SM-A525) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a52.webp",
    popular: false,
    order: 318,
    metaTitle: "Samsung Galaxy A52 (SM-A525) 2021 remonts Rīgā",
    metaDescription: "Galaxy A52 (SM-A525) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A52 (SM-A525) 2021</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a42-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A42 5G (SM-A426) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-a42-5g.webp",
    popular: false,
    order: 319,
    metaTitle: "Samsung Galaxy A42 5G (SM-A426) 2020 remonts Rīgā",
    metaDescription: "Galaxy A42 5G (SM-A426) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A42 5G (SM-A426) 2020</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a32-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A32 (SM-A325) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a32.webp",
    popular: false,
    order: 320,
    metaTitle: "Samsung Galaxy A32 (SM-A325) 2021 remonts Rīgā",
    metaDescription: "Galaxy A32 (SM-A325) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A32 (SM-A325) 2021</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a41",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A41 (SM-A415) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-a41.webp",
    popular: false,
    order: 321,
    metaTitle: "Samsung Galaxy A41 (SM-A415) 2020 remonts Rīgā",
    metaDescription: "Galaxy A41 (SM-A415) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A41 (SM-A415) 2020</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a31",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A31 (SM-A315) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-a31.webp",
    popular: false,
    order: 322,
    metaTitle: "Samsung Galaxy A31 (SM-A315) 2020 remonts Rīgā",
    metaDescription: "Galaxy A31 (SM-A315) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A31 (SM-A315) 2020</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a71-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A71 (SM-A715) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-a71.webp",
    popular: false,
    order: 323,
    metaTitle: "Samsung Galaxy A71 (SM-A715) 2020 remonts Rīgā",
    metaDescription: "Galaxy A71 (SM-A715) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A71 (SM-A715) 2020</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a51-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A51 (SM-A515) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a51.webp",
    popular: false,
    order: 324,
    metaTitle: "Samsung Galaxy A51 (SM-A515) 2019 remonts Rīgā",
    metaDescription: "Galaxy A51 (SM-A515) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A51 (SM-A515) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  {
    slug: "galaxy-a50s-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A50s (SM-A507) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a50s-2019.webp",
    popular: false,
    order: 325,
    metaTitle: "Samsung Galaxy A50s (SM-A507) 2019 remonts Rīgā",
    metaDescription: "Galaxy A50s (SM-A507) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A50s (SM-A507) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a50-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A50 (SM-A505) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a50-2019.webp",
    popular: false,
    order: 326,
    metaTitle: "Samsung Galaxy A50 (SM-A505) 2019 remonts Rīgā",
    metaDescription: "Galaxy A50 (SM-A505) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A50 (SM-A505) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a40-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A40 (SM-A405) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a40-2019.webp",
    popular: false,
    order: 327,
    metaTitle: "Samsung Galaxy A40 (SM-A405) 2019 remonts Rīgā",
    metaDescription: "Galaxy A40 (SM-A405) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A40 (SM-A405) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a30s-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A30s (SM-A307) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a30s-2019.webp",
    popular: false,
    order: 328,
    metaTitle: "Samsung Galaxy A30s (SM-A307) 2019 remonts Rīgā",
    metaDescription: "Galaxy A30s (SM-A307) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A30s (SM-A307) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a30-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A30 (SM-A305) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a30-2019.webp",
    popular: false,
    order: 329,
    metaTitle: "Samsung Galaxy A30 (SM-A305) 2019 remonts Rīgā",
    metaDescription: "Galaxy A30 (SM-A305) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A30 (SM-A305) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a20s-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A20s (SM-A207) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a20s-2019.webp",
    popular: false,
    order: 330,
    metaTitle: "Samsung Galaxy A20s (SM-A207) 2019 remonts Rīgā",
    metaDescription: "Galaxy A20s (SM-A207) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A20s (SM-A207) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a20-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A20 (SM-A205) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a20-2019.webp",
    popular: false,
    order: 331,
    metaTitle: "Samsung Galaxy A20 (SM-A205) 2019 remonts Rīgā",
    metaDescription: "Galaxy A20 (SM-A205) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A20 (SM-A205) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a10s-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A10s (SM-A107) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a10s-2019.webp",
    popular: false,
    order: 332,
    metaTitle: "Samsung Galaxy A10s (SM-A107) 2019 remonts Rīgā",
    metaDescription: "Galaxy A10s (SM-A107) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A10s (SM-A107) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a10-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A10 (SM-A105) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a10-2019.webp",
    popular: false,
    order: 333,
    metaTitle: "Samsung Galaxy A10 (SM-A105) 2019 remonts Rīgā",
    metaDescription: "Galaxy A10 (SM-A105) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A10 (SM-A105) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  {
    slug: "galaxy-a80-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A80 (SM-A805) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a80-2019.webp",
    popular: false,
    order: 334,
    metaTitle: "Samsung Galaxy A80 (SM-A805) 2019 remonts Rīgā",
    metaDescription: "Galaxy A80 (SM-A805) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A80 (SM-A805) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a70-2019",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A70 (SM-A705) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a70-2019.webp",
    popular: false,
    order: 335,
    metaTitle: "Samsung Galaxy A70 (SM-A705) 2019 remonts Rīgā",
    metaDescription: "Galaxy A70 (SM-A705) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A70 (SM-A705) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a50-2019-s",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A50s (SM-A507) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a50s-2019.webp",
    popular: false,
    order: 336,
    metaTitle: "Samsung Galaxy A50s (SM-A507) 2019 remonts Rīgā",
    metaDescription: "Galaxy A50s (SM-A507) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A50s (SM-A507) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a30-2019-s",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A30s (SM-A307) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a30s-2019.webp",
    popular: false,
    order: 337,
    metaTitle: "Samsung Galaxy A30s (SM-A307) 2019 remonts Rīgā",
    metaDescription: "Galaxy A30s (SM-A307) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A30s (SM-A307) 2019</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  // ---- Older A (2018 and earlier with year in name) ----
  {
    slug: "galaxy-a8-plus-2018",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A8+ (SM-A730) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-a8-plus-2018.webp",
    popular: false,
    order: 338,
    metaTitle: "Samsung Galaxy A8+ (SM-A730) 2018 remonts Rīgā",
    metaDescription: "Galaxy A8+ (SM-A730) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A8+ (SM-A730) 2018</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a8-2018",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A8 (SM-A530) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-a8-2018.webp",
    popular: false,
    order: 339,
    metaTitle: "Samsung Galaxy A8 (SM-A530) 2018 remonts Rīgā",
    metaDescription: "Galaxy A8 (SM-A530) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A8 (SM-A530) 2018</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a7-2018",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A7 (SM-A750) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-a7-2018.webp",
    popular: false,
    order: 340,
    metaTitle: "Samsung Galaxy A7 (SM-A750) 2018 remonts Rīgā",
    metaDescription: "Galaxy A7 (SM-A750) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A7 (SM-A750) 2018</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a6-plus-2018",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A6+ (SM-A605) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-a6-plus-2018.webp",
    popular: false,
    order: 341,
    metaTitle: "Samsung Galaxy A6+ (SM-A605) 2018 remonts Rīgā",
    metaDescription: "Galaxy A6+ (SM-A605) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A6+ (SM-A605) 2018</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a6-2018",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A6 (SM-A600) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-a6-2018.webp",
    popular: false,
    order: 342,
    metaTitle: "Samsung Galaxy A6 (SM-A600) 2018 remonts Rīgā",
    metaDescription: "Galaxy A6 (SM-A600) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A6 (SM-A600) 2018</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a5-2017",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A5 (SM-A520) 2017",
    year: 2017,
    image: "/images/devices/samsung/samsung-galaxy-a5-2017.webp",
    popular: false,
    order: 343,
    metaTitle: "Samsung Galaxy A5 (SM-A520) 2017 remonts Rīgā",
    metaDescription: "Galaxy A5 (SM-A520) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A5 (SM-A520) 2017</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a3-2017",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A3 (SM-A320) 2017",
    year: 2017,
    image: "/images/devices/samsung/samsung-galaxy-a3-2017.webp",
    popular: false,
    order: 344,
    metaTitle: "Samsung Galaxy A3 (SM-A320) 2017 remonts Rīgā",
    metaDescription: "Galaxy A3 (SM-A320) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A3 (SM-A320) 2017</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a7-2017",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A7 (SM-A720) 2017",
    year: 2017,
    image: "/images/devices/samsung/samsung-galaxy-a7-2017.webp",
    popular: false,
    order: 345,
    metaTitle: "Samsung Galaxy A7 (SM-A720) 2017 remonts Rīgā",
    metaDescription: "Galaxy A7 (SM-A720) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A7 (SM-A720) 2017</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },

  {
    slug: "galaxy-a5-2016",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A5 (SM-A510) 2016",
    year: 2016,
    image: "/images/devices/samsung/samsung-galaxy-a5-2016.webp",
    popular: false,
    order: 346,
    metaTitle: "Samsung Galaxy A5 (SM-A510) 2016 remonts Rīgā",
    metaDescription: "Galaxy A5 (SM-A510) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A5 (SM-A510) 2016</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a3-2016",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A3 (SM-A310) 2016",
    year: 2016,
    image: "/images/devices/samsung/samsung-galaxy-a3-2016.webp",
    popular: false,
    order: 347,
    metaTitle: "Samsung Galaxy A3 (SM-A310) 2016 remonts Rīgā",
    metaDescription: "Galaxy A3 (SM-A310) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A3 (SM-A310) 2016</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
  `,
  },
  {
    slug: "galaxy-a7-2016",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A7 (SM-A710) 2016",
    year: 2016,
    image: "/images/devices/samsung/samsung-galaxy-a7-2016.webp",
    popular: false,
    order: 348,
    metaTitle: "Samsung Galaxy A7 (SM-A710) 2016 remonts Rīgā",
    metaDescription: "Galaxy A7 (SM-A710) ekrāna un baterijas maiņa. 90 dienu garantija.",
    bodyHtml: `
<p><strong>Galaxy A7 (SM-A710) 2016</strong> remonts Rīgā — profesionāla ekrāna un baterijas nomaiņa ar ātru apkalpošanu.</p>
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
    image: "/images/devices/huawei/huawei-p30-pro.webp",
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
    image: "/images/devices/apple/ipad-pro-12-9.webp",
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
