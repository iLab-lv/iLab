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
  image: "/images/devices/iphone/iphone-17-pro-max.webp",
  popular: true,
  order: 90,
  metaTitle: "iPhone 17 Pro Max remonts Rīgā | iLab",
  metaDescription: "iPhone 17 Pro Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-17-pro.webp",
  popular: true,
  order: 91,
  metaTitle: "iPhone 17 Pro remonts Rīgā | iLab",
  metaDescription: "iPhone 17 Pro remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-air.webp",
  popular: true,
  order: 92,
  metaTitle: "iPhone Air remonts Rīgā | iLab",
  metaDescription: "iPhone Air remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-17.webp",
  popular: true,
  order: 93,
  metaTitle: "iPhone 17 remonts Rīgā | iLab",
  metaDescription: "iPhone 17 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-16-pro-max.webp",
  popular: true,
  order: 100,
  metaTitle: "iPhone 16 Pro Max remonts Rīgā | iLab",
  metaDescription: "iPhone 16 Pro Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-16-pro.webp",
  popular: true,
  order: 101,
  metaTitle: "iPhone 16 Pro remonts Rīgā | iLab",
  metaDescription: "iPhone 16 Pro remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-16-plus.webp",
  popular: true,
  order: 102,
  metaTitle: "iPhone 16 Plus remonts Rīgā | iLab",
  metaDescription: "iPhone 16 Plus remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-16.webp",
  popular: true,
  order: 104,
  metaTitle: "iPhone 16 remonts Rīgā | iLab",
  metaDescription: "iPhone 16 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
  bodyHtml: `
<p><strong>iPhone 16e</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,

},

{
  slug: "iphone-16e",
  category: "telefonu-remonts",
  brand: "Apple",
  brandSlug: "apple",
  series: "iPhone 16 sērija",
  seriesSlug: "iphone-16-serija",
  name: "iPhone 16e",
  year: 2024,
  image: "/images/devices/iphone/iphone-16e.webp",
  popular: true,
  order: 103,
  metaTitle: "iPhone 16e remonts Rīgā | iLab",
  metaDescription: "iPhone 16e remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-15-Pro-Max.webp",
  popular: true,
  order: 110,
  metaTitle: "iPhone 15 Pro Max remonts Rīgā | iLab",
  metaDescription: "iPhone 15 Pro Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-15-Pro.webp",
  popular: true,
  order: 111,
  metaTitle: "iPhone 15 Pro remonts Rīgā | iLab",
  metaDescription: "iPhone 15 Pro remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-15-Plus.webp",
  popular: true,
  order: 112,
  metaTitle: "iPhone 15 Plus remonts Rīgā | iLab",
  metaDescription: "iPhone 15 Plus remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostика un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-15.webp",
  popular: true,
  order: 113,
  metaTitle: "iPhone 15 remonts Rīgā | iLab",
  metaDescription: "iPhone 15 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-14-Pro-Max.webp",
  popular: true,
  order: 120,
  metaTitle: "iPhone 14 Pro Max remonts Rīgā | iLab",
  metaDescription: "iPhone 14 Pro Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-14-Pro.webp",
  popular: true,
  order: 121,
  metaTitle: "iPhone 14 Pro remonts Rīgā | iLab",
  metaDescription: "iPhone 14 Pro remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-14-Plus.webp",
  popular: true,
  order: 122,
  metaTitle: "iPhone 14 Plus remonts Rīgā | iLab",
  metaDescription: "iPhone 14 Plus remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-14.webp",
  popular: true,
  order: 123,
  metaTitle: "iPhone 14 remonts Rīgā | iLab",
  metaDescription: "iPhone 14 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-13-Pro-Max.webp",
  popular: true,
  order: 130,
  metaTitle: "iPhone 13 Pro Max remonts Rīgā | iLab",
  metaDescription: "iPhone 13 Pro Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-13-Pro.webp",
  popular: true,
  order: 131,
  metaTitle: "iPhone 13 Pro remonts Rīgā | iLab",
  metaDescription: "iPhone 13 Pro remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-13.webp",
  popular: true,
  order: 132,
  metaTitle: "iPhone 13 remonts Rīgā | iLab",
  metaDescription: "iPhone 13 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-13-mini.webp",
  popular: false,
  order: 133,
  metaTitle: "iPhone 13 mini remonts Rīgā | iLab",
  metaDescription: "iPhone 13 mini remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-12-Pro-Max.webp",
  popular: true,
  order: 140,
  metaTitle: "iPhone 12 Pro Max remonts Rīgā | iLab",
  metaDescription: "iPhone 12 Pro Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iPhone-12-Pro.webp",
  popular: true,
  order: 141,
  metaTitle: "iPhone 12 Pro remonts Rīgā | iLab",
  metaDescription: "iPhone 12 Pro remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-12.webp",
  popular: true,
  order: 142,
  metaTitle: "iPhone 12 remonts Rīgā | iLab",
  metaDescription: "iPhone 12 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-12-mini.webp",
  popular: false,
  order: 143,
  metaTitle: "iPhone 12 mini remonts Rīgā | iLab",
  metaDescription: "iPhone 12 mini remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-11-pro-max.webp",
  popular: true,
  order: 150,
  metaTitle: "iPhone 11 Pro Max remonts Rīgā | iLab",
  metaDescription: "iPhone 11 Pro Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-11-pro.webp",
  popular: true,
  order: 151,
  metaTitle: "iPhone 11 Pro remonts Rīgā | iLab",
  metaDescription: "iPhone 11 Pro remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-11.webp",
  popular: true,
  order: 152,
  metaTitle: "iPhone 11 remonts Rīgā | iLab",
  metaDescription: "iPhone 11 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-xs-max.webp",
  popular: false,
  order: 160,
  metaTitle: "iPhone XS Max remonts Rīgā | iLab",
  metaDescription: "iPhone XS Max remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-xs.webp",
  popular: false,
  order: 161,
  metaTitle: "iPhone XS remonts Rīgā | iLab",
  metaDescription: "iPhone XS remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-xr.webp",
  popular: true,
  order: 162,
  metaTitle: "iPhone XR remonts Rīgā | iLab",
  metaDescription: "iPhone XR remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-x.webp",
  popular: true,
  order: 163,
  metaTitle: "iPhone X remonts Rīgā | iLab",
  metaDescription: "iPhone X remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-se-2022.webp",
  popular: true,
  order: 170,
  metaTitle: "iPhone SE (3. paaudze) remonts Rīgā | iLab",
  metaDescription: "iPhone SE (3. paaudze) remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-se-2020.webp",
  popular: true,
  order: 171,
  metaTitle: "iPhone SE (2. paaudze) remonts Rīgā | iLab",
  metaDescription: "iPhone SE (2. paaudze) remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-se-2016.webp",
  popular: false,
  order: 172,
  metaTitle: "iPhone SE (1. paaudze) remonts Rīgā | iLab",
  metaDescription: "iPhone SE (1. paaudze) remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-8-plus.webp",
  popular: false,
  order: 180,
  metaTitle: "iPhone 8 Plus remonts Rīgā | iLab",
  metaDescription: "iPhone 8 Plus remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-8.webp",
  popular: false,
  order: 181,
  metaTitle: "iPhone 8 remonts Rīgā | iLab",
  metaDescription: "iPhone 8 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-7-plus.webp",
  popular: false,
  order: 190,
  metaTitle: "iPhone 7 Plus remonts Rīgā | iLab",
  metaDescription: "iPhone 7 Plus remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-7.webp",
  popular: false,
  order: 191,
  metaTitle: "iPhone 7 remonts Rīgā | iLab",
  metaDescription: "iPhone 7 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-6s-plus.webp",
  popular: false,
  order: 195,
  metaTitle: "iPhone 6s Plus remonts Rīgā | iLab",
  metaDescription: "iPhone 6s Plus remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-6s.webp",
  popular: false,
  order: 196,
  metaTitle: "iPhone 6s remonts Rīgā | iLab",
  metaDescription: "iPhone 6s remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-6-plus.webp",
  popular: false,
  order: 197,
  metaTitle: "iPhone 6 Plus remonts Rīgā | iLab",
  metaDescription: "iPhone 6 Plus remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-6.webp",
  popular: false,
  order: 198,
  metaTitle: "iPhone 6 remonts Rīgā | iLab",
  metaDescription: "iPhone 6 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
  bodyHtml: `
<p><strong>iPhone 6</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
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
  image: "/images/devices/iphone/iphone-5s.webp",
  popular: false,
  order: 200,
  metaTitle: "iPhone 5s remonts Rīgā | iLab",
  metaDescription: "iPhone 5s remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-5c.webp",
  popular: false,
  order: 201,
  metaTitle: "iPhone 5c remonts Rīgā | iLab",
  metaDescription: "iPhone 5c remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-5.webp",
  popular: false,
  order: 202,
  metaTitle: "iPhone 5 remonts Rīgā | iLab",
  metaDescription: "iPhone 5 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-4s.webp",
  popular: false,
  order: 203,
  metaTitle: "iPhone 4s remonts Rīgā | iLab",
  metaDescription: "iPhone 4s remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
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
  image: "/images/devices/iphone/iphone-4.webp",
  popular: false,
  order: 204,
  metaTitle: "iPhone 4 remonts Rīgā | iLab",
  metaDescription: "iPhone 4 remonts Rīgā — ekrāna, baterijas un detaļu maiņa ar oriģinālām vai OEM detaļām. Bezmaksas diagnostika un 90 dienu garantija iLab Apple servisā.",
  bodyHtml: `
<p><strong>iPhone 4</strong> remonts Rīgā — ātra diagnostika, ekrāna, baterijas un kameras maiņa tajā pašā dienā. 
    Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
    <p>Bezmaksas diagnostika un precīzas izmaksas pirms remonta.</p>
  `,
},




// =======================================================
  //////////////////// SAMSUNG PHONES /////////////////////
// =======================================================

  // ================================
  // Galaxy S sērija 
  // ================================
  {
    slug: "galaxy-s25-edge",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S25 Edge (SM-S937B) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-s25-edge.webp",
    popular: false,
    order: 260,
    metaTitle: "Samsung Galaxy S25 Edge remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S25 Edge remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S25 Edge (SM-S937B) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s25-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S25 Ultra (SM-S938B) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-s25-ultra.webp",
    popular: false,
    order: 261,
    metaTitle: "Samsung Galaxy S25 Ultra remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S25 Ultra remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S25 Ultra (SM-S938B) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s25-plus",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S25+ (SM-S936B) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-s25-plus.webp",
    popular: false,
    order: 262,
    metaTitle: "Samsung Galaxy S25+ remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S25+ remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S25+ (SM-S936B) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s25",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S25 (SM-S931B) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-s25.webp",
    popular: false,
    order: 263,
    metaTitle: "Samsung Galaxy S25 remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S25 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S25 (SM-S931B) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s24-ultra",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S24 Ultra (SM-S928B) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-s24-ultra.webp",
    popular: false,
    order: 264,
    metaTitle: "Samsung Galaxy S24 Ultra remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S24 Ultra remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S24 Ultra (SM-S928B) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    name: "Galaxy S24+ (SM-S926B) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-s24-plus.webp",
    popular: false,
    order: 265,
    metaTitle: "Samsung Galaxy S24+ remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S24+ remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S24+ (SM-S926B) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    name: "Galaxy S24 (SM-S921B) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-s24.webp",
    popular: false,
    order: 266,
    metaTitle: "Samsung Galaxy S24 remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S24 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S24 (SM-S921B) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s24-fe",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S24 FE (SM-S721B) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-s24-fe.webp",
    popular: false,
    order: 267,
    metaTitle: "Samsung Galaxy S24 FE remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S24 FE remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S24 FE (SM-S721B) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    name: "Galaxy S23 Ultra (SM-S918B) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-s23-ultra.webp",
    popular: false,
    order: 268,
    metaTitle: "Samsung Galaxy S23 Ultra remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S23 Ultra remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S23 Ultra (SM-S918B) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    name: "Galaxy S23+ (SM-S916B) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-s23-plus.webp",
    popular: false,
    order: 269,
    metaTitle: "Samsung Galaxy S23+ remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S23+ remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S23+ (SM-S916B) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    name: "Galaxy S23 (SM-S918) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-s23.webp",
    popular: false,
    order: 270,
    metaTitle: "Samsung Galaxy S23 remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S23 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S23 (SM-S918) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s23-fe",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S23 FE (SM-S718) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-s23-fe.webp",
    popular: false,
    order: 271,
    metaTitle: "Samsung Galaxy S23 FE remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S23 FE remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S23 FE (SM-S718) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    order: 272,
    metaTitle: "Samsung Galaxy S22 Ultra remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S22 Ultra remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
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
    order: 273,
    metaTitle: "Samsung Galaxy S22+ remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S22+ remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
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
    order: 274,
    metaTitle: "Samsung Galaxy S22 remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S22 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
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
    order: 275,
    metaTitle: "Samsung Galaxy S21 Ultra remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S21 Ultra remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
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
    order: 276,
    metaTitle: "Samsung Galaxy S21+ remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S21+ remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
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
    order: 277,
    metaTitle: "Samsung Galaxy S21 remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S21 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S21 (SM-G991) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s21-fe",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S21 FE (SM-G990) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-s21-fe.webp",
    popular: false,
    order: 278,
    metaTitle: "Samsung Galaxy S21 FE remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S21 FE remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S21 FE (SM-G990) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    order: 279,
    metaTitle: "Samsung Galaxy S20 Ultra remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S20 Ultra remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
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
    name: "Galaxy S20+ (SM-G986) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-s20-plus.webp",
    popular: false,
    order: 280,
    metaTitle: "Samsung Galaxy S20+ remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S20+ remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S20+ (SM-G986) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-s20-fe",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy S sērija",
    seriesSlug: "galaxy-s-serija",
    name: "Galaxy S20 FE (SM-G780) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-s20-fe.webp",
    popular: false,
    order: 281,
    metaTitle: "Samsung Galaxy S20 FE remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S20 FE remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S20 FE (SM-G780) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
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
    order: 282,
    metaTitle: "Samsung Galaxy S20 remonts Rīgā | iLab",
    metaDescription: "Samsung Galaxy S20 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy S20 (SM-G980) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },


  // ================================
  // Galaxy Z sērija 
  // ================================

  {
    slug: "galaxy-z-flip7",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip7 (SM-F761) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-z-flip7.webp",
    popular: false,
    order: 299,
    metaTitle: "Samsung Galaxy Z Flip7 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Flip7 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Flip7 (SM-F761) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-z-flip6",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip6 (SM-F751) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-z-flip6.webp",
    popular: false,
    order: 300,
    metaTitle: "Samsung Galaxy Z Flip6 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Flip6 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Flip6 (SM-F751) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-z-flip5",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip5 (SM-F741) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-z-flip5.webp",
    popular: false,
    order: 301,
    metaTitle: "Samsung Galaxy Z Flip5 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Flip5 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Flip5 (SM-F741) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-z-flip4",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip4 (SM-F731) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-z-flip4.webp",
    popular: false,
    order: 302,
    metaTitle: "Samsung Galaxy Z Flip4 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Flip4 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Flip4 (SM-F731) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-z-flip3",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip3 (SM-F721) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-z-flip3.webp",
    popular: false,
    order: 303,
    metaTitle: "Samsung Galaxy Z Flip3 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Flip3 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Flip3 (SM-F721) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

 

  {
    slug: "galaxy-z-flip",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Flip (SM-F700X) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-z-flip.webp",
    popular: false,
    order: 304,
    metaTitle: "Samsung Galaxy Z Flip remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Flip remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Flip (SM-F700X) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-z-fold7",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Fold7 (SM-F966) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-z-fold7.webp",
    popular: false,
    order: 305,
    metaTitle: "Samsung Galaxy Z Fold7 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Fold7 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Fold7 (SM-F966) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-z-fold6",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Fold6 (SM-F956) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-z-fold6.webp",
    popular: false,
    order: 306,
    metaTitle: "Samsung Galaxy Z Fold6 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Fold6 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Fold6 (SM-F956) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

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
    order: 307,
    metaTitle: "Samsung Galaxy Z Fold5 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Fold5 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Fold5 (SM-F946) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 308,
    metaTitle: "Samsung Galaxy Z Fold4 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Fold4 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Fold4 (SM-F936) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 309,
    metaTitle: "Samsung Galaxy Z Fold3 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Fold3 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Fold3 (SM-F926) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 310,
    metaTitle: "Samsung Galaxy Z Fold2 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Fold2 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Fold2 (SM-F916) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-z-fold",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy Z sērija",
    seriesSlug: "galaxy-z-serija",
    name: "Galaxy Z Fold (SM-F900) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-z-fold.webp",
    popular: false,
    order: 311,
    metaTitle: "Samsung Galaxy Z Fold remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Z Fold remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Z Fold (SM-F900) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    name: "Galaxy Note20 Ultra (SM-N986B) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-note20-ultra.webp",
    popular: false,
    order: 312,
    metaTitle: "Samsung Galaxy Note20 Ultra remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Note20 Ultra remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Note20 Ultra (SM-N986B) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 313,
    metaTitle: "Samsung Galaxy Note20 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Note20 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Note20 (SM-N980) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 314,
    metaTitle: "Samsung Galaxy Note10+ remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Note10+ remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Note10+ (SM-N975) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 315,
    metaTitle: "Samsung Galaxy Note10 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Note10 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Note10 (SM-N970) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-note10-lite",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Note sērija",
    seriesSlug: "note-serija",
    name: "Galaxy Note10 Lite (SM-N770) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-note10-lite.webp",
    popular: false,
    order: 316,
    metaTitle: "Samsung Galaxy Note10 Lite remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy Note10 Lite remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy Note10 Lite (SM-N770) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },


  // ================================
  // Galaxy A sērija
  // ================================

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
    order: 317,
    metaTitle: "Samsung Galaxy A72 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A72 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A72 (SM-A725) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a71",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A71 (SM-A715) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a71.webp",
    popular: false,
    order: 318,
    metaTitle: "Samsung Galaxy A71 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A71 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A71 (SM-A715) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a70",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A70 (SM-A705) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a70.webp",
    popular: false,
    order: 319,
    metaTitle: "Samsung Galaxy A70 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A70 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A70 (SM-A705) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a56",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A56 (SM-A566) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-a56.webp",
    popular: false,
    order: 320,
    metaTitle: "Samsung Galaxy A56 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A56 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A56 (SM-A566) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a55",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A55 (SM-A556) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a55.webp",
    popular: false,
    order: 321,
    metaTitle: "Samsung Galaxy A55 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A55 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A55 (SM-A556) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a54",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A54 (SM-A546) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a54.webp",
    popular: false,
    order: 322,
    metaTitle: "Samsung Galaxy A54 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A54 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A54 (SM-A546) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 323,
    metaTitle: "Samsung Galaxy A53 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A53 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A53 5G (SM-A536) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a52s",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A52s (SM-A528) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a52s.webp",
    popular: false,
    order: 324,
    metaTitle: "Samsung Galaxy A52s remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A52s remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A52s (SM-A528) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 325,
    metaTitle: "Samsung Galaxy A52 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A52 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A52 (SM-A525) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a51",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A51 (SM-A515) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a51.webp",
    popular: false,
    order: 326,
    metaTitle: "Samsung Galaxy A51 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A51 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A51 (SM-A515) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a50",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A50 (SM-A505) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a50.webp",
    popular: false,
    order: 327,
    metaTitle: "Samsung Galaxy A50 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A50 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A50 (SM-A505) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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
    order: 328,
    metaTitle: "Samsung Galaxy A41 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A41 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A41 (SM-A415) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a40",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A40 (SM-A405) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a40.webp",
    popular: false,
    order: 329,
    metaTitle: "Samsung Galaxy A40 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A40 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A40 (SM-A405) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a36",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A36 (SM-A366) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-a36.webp",
    popular: false,
    order: 330,
    metaTitle: "Samsung Galaxy A36 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A36 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A36 (SM-A366) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a35",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A35 (SM-A356) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a35.webp",
    popular: false,
    order: 331,
    metaTitle: "Samsung Galaxy A35 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A35 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A35 (SM-A356) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a34",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A34 (SM-A346) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a34.webp",
    popular: false,
    order: 332,
    metaTitle: "Samsung Galaxy A34 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A34 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A34 (SM-A346) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a33",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A33 (SM-A336) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-a33.webp",
    popular: false,
    order: 333,
    metaTitle: "Samsung Galaxy A33 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A33 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A33 (SM-A336) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a32-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A32 5G (SM-A326) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a32-5g.webp",
    popular: false,
    order: 334,
    metaTitle: "Samsung Galaxy A32 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A32 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A32 5G (SM-A326) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a32-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A32 4G (SM-A325) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a32-4g.webp",
    popular: false,
    order: 335,
    metaTitle: "Samsung Galaxy A32 4G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A32 4G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A32 4G (SM-A325) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a25-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A25 5G (SM-A256) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a25-5g.webp",
    popular: false,
    order: 336,
    metaTitle: "Samsung Galaxy A25 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A25 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A25 5G (SM-A256) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a24-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A24 4G (SM-A245) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a24-4g.webp",
    popular: false,
    order: 337,
    metaTitle: "Samsung Galaxy A24 4G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A24 4G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A24 4G (SM-A245) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a23-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A23 5G (SM-A236) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-a23-5g.webp",
    popular: false,
    order: 338,
    metaTitle: "Samsung Galaxy A23 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A23 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A23 5G (SM-A236) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a22-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A22 4G (SM-A225) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a22-4g.webp",
    popular: false,
    order: 339,
    metaTitle: "Samsung Galaxy A22 4G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A22 4G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A22 4G (SM-A225) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a22-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A22 5G (SM-A226) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a22-5g.webp",
    popular: false,
    order: 340,
    metaTitle: "Samsung Galaxy A22 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A22 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A22 5G (SM-A226) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a21s",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A21s (SM-A217) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-a21s.webp",
    popular: false,
    order: 341,
    metaTitle: "Samsung Galaxy A21s remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A21s remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A21s (SM-A217) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a20e",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A20e (SM-A202) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a20e.webp",
    popular: false,
    order: 342,
    metaTitle: "Samsung Galaxy A20e remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A20e remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A20e (SM-A202) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a16-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A16 5G (SM-A166) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-a16-5g.webp",
    popular: false,
    order: 343,
    metaTitle: "Samsung Galaxy A16 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A16 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A16 5G (SM-A166) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a16-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A16 4G (SM-A165) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-a16-4g.webp",
    popular: false,
    order: 344,
    metaTitle: "Samsung Galaxy A16 4G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A16 4G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A16 4G (SM-A165) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a15-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A15 5G (SM-A156) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a15-5g.webp",
    popular: false,
    order: 345,
    metaTitle: "Samsung Galaxy A15 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A15 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A15 5G (SM-A156) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a15-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A15 4G (SM-A155) 2024",
    year: 2024,
    image: "/images/devices/samsung/samsung-galaxy-a15-4g.webp",
    popular: false,
    order: 346,
    metaTitle: "Samsung Galaxy A15 4G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A15 4G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A15 4G (SM-A155) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a14-5g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A14 5G (SM-A146) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a14-5g.webp",
    popular: false,
    order: 347,
    metaTitle: "Samsung Galaxy A14 5G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A14 5G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A14 5G (SM-A146) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a14-4g",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A14 4G (SM-A145) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a14-4g.webp",
    popular: false,
    order: 348,
    metaTitle: "Samsung Galaxy A14 4G remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A14 4G remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A14 4G (SM-A145) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a13",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A13 (SM-A136, A137) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-a13.webp",
    popular: false,
    order: 349,
    metaTitle: "Samsung Galaxy A13 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A13 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A13 (SM-A136) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a12",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A12 (SM-A125. A-127) 2020",
    year: 2020,
    image: "/images/devices/samsung/samsung-galaxy-a12.webp",
    popular: false,
    order: 350,
    metaTitle: "Samsung Galaxy A12 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A12 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A12 (SM-A125) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a10s",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A10s (SM-A107) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a10s.webp",
    popular: false,
    order: 351,
    metaTitle: "Samsung Galaxy A10s remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A10s remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A10s (SM-A107) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a10",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A10 (SM-A105) 2019",
    year: 2019,
    image: "/images/devices/samsung/samsung-galaxy-a10.webp",
    popular: false,
    order: 352,
    metaTitle: "Samsung Galaxy A10 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A10 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A10 (SM-A105) 2019</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a7",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A7 (SM-A750) 2018",
    year: 2018,
    image: "/images/devices/samsung/samsung-galaxy-a7.webp",
    popular: false,
    order: 353,
    metaTitle: "Samsung Galaxy A7 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A7 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A7 (SM-A750) 2018</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a06",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A06 (SM-A065) 2025",
    year: 2025,
    image: "/images/devices/samsung/samsung-galaxy-a06.webp",
    popular: false,
    order: 354,
    metaTitle: "Samsung Galaxy A06 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A06 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A06 (SM-A065) 2025</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a05s",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A05s (SM-A057) 2023",
    year: 2023,
    image: "/images/devices/samsung/samsung-galaxy-a05s.webp",
    popular: false,
    order: 355,
    metaTitle: "Samsung Galaxy A05s remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A05s remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A05s (SM-A057) 2023</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a04s",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A04s (SM-A047) 2022",
    year: 2022,
    image: "/images/devices/samsung/samsung-galaxy-a04s.webp",
    popular: false,
    order: 356,
    metaTitle: "Samsung Galaxy A04s remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A04s remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A04s (SM-A047) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a03",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A03 (SM-A035) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a03.webp",
    popular: false,
    order: 357,
    metaTitle: "Samsung Galaxy A03 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A03 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A03 (SM-A035) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  {
    slug: "galaxy-a02",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy A sērija",
    seriesSlug: "galaxy-a-serija",
    name: "Galaxy A02 (SM-A025) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-a02.webp",
    popular: false,
    order: 358,
    metaTitle: "Samsung Galaxy A02 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy A02 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy A02 (SM-A025) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
  },

  
// ================================
// Galaxy XCover sērija
// ================================

{
  slug: "galaxy-xcover-pro",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy XCover sērija",
  seriesSlug: "galaxy-xcover-serija",
  name: "Galaxy XCover Pro (SM-G715) 2020",
  year: 2020,
  image: "/images/devices/samsung/samsung-galaxy-xcover-pro.webp",
  popular: false,
  order: 360,
  metaTitle: "Samsung Galaxy XCover Pro remonts Rīgā | iLab",
  metaDescription:
    "Samsung Galaxy XCover Pro remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
  bodyHtml: `
<p><strong>Galaxy XCover Pro (SM-G715) 2020</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
},

{
  slug: "galaxy-xcover-6",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy XCover sērija",
  seriesSlug: "galaxy-xcover-serija",
  name: "Galaxy XCover 6 (SM-G736) 2022",
  year: 2022,
  image: "/images/devices/samsung/samsung-galaxy-xcover-6.webp",
  popular: false,
  order: 361,
  metaTitle: "Samsung Galaxy XCover 6 remonts Rīgā | iLab",
  metaDescription:
    "Samsung Galaxy XCover 6 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
  bodyHtml: `
<p><strong>Galaxy XCover 6 (SM-G736) 2022</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
},

{
  slug: "galaxy-xcover-7",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy XCover sērija",
  seriesSlug: "galaxy-xcover-serija",
  name: "Galaxy XCover 7 (SM-G556) 2024",
  year: 2024,
  image: "/images/devices/samsung/samsung-galaxy-xcover-7.webp",
  popular: false,
  order: 362,
  metaTitle: "Samsung Galaxy XCover 7 remonts Rīgā | iLab",
  metaDescription:
    "Samsung Galaxy XCover 7 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
  bodyHtml: `
<p><strong>Galaxy XCover 7 (SM-G556) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
},

{
  slug: "galaxy-xcover-7-pro",
  category: "telefonu-remonts",
  brand: "Samsung",
  brandSlug: "samsung",
  series: "Galaxy XCover sērija",
  seriesSlug: "galaxy-xcover-serija",
  name: "Galaxy XCover 7 Pro (SM-G766) 2024",
  year: 2024,
  image: "/images/devices/samsung/samsung-galaxy-xcover-7-pro.webp",
  popular: false,
  order: 363,
  metaTitle: "Samsung Galaxy XCover 7 Pro remonts Rīgā | iLab",
  metaDescription:
    "Samsung Galaxy XCover 7 Pro remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
  bodyHtml: `
<p><strong>Galaxy XCover 7 Pro (SM-G766) 2024</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
  `,
},

  {
    slug: "galaxy-xcover-5",
    category: "telefonu-remonts",
    brand: "Samsung",
    brandSlug: "samsung",
    series: "Galaxy XCover sērija",
    seriesSlug: "galaxy-xcover-serija",
    name: "Galaxy XCover 5 (SM-G525) 2021",
    year: 2021,
    image: "/images/devices/samsung/samsung-galaxy-xcover-5.webp",
    popular: false,
    order: 359, // continue from previous order
    metaTitle: "Samsung Galaxy XCover 5 remonts Rīgā | iLab",
    metaDescription:
      "Samsung Galaxy XCover 5 remonts Rīgā — ekrāna, baterijas, lādētāja ligzdas un citu detaļu maiņa. Bezmaksas diagnostika un 90 dienu garantija iLab servisā.",
    bodyHtml: `
<p><strong>Galaxy XCover 5 (SM-G525) 2021</strong> remonts Rīgā — profesionāla ekrāna, baterijas un kameras nomaiņa ar ātru apkalpošanu. Izmantojam kvalitatīvas detaļas un nodrošinām 90 dienu garantiju.</p>
<p>Bezmaksas diagnostika, skaidras cenas un remonta darbi tajā pašā dienā. Pieraksties tiešsaistē vai apmeklē iLab servisu.</p>
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

  



// ------------------------
// iPad family
// ------------------------

// ------------------------
// iPad (base line)
// ------------------------

{
  slug: '9-7-5th-gen-2017',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad sērija',
  seriesSlug: 'ipad-serija',
  name: 'iPad 9.7" (5 gen. 2017) (A1822, A1823)',
  year: 2017,
  image: '/images/devices/tablet/ipad/ipad-9-7-5th-gen-2017.webp',
  popular: false,
  order: 130,
  metaTitle: 'iPad 9.7" (5 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad 9.7" (5 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad 9.7" (5 gen. 2017) (A1822, A1823)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: '9-7-6th-gen-2018',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad sērija',
  seriesSlug: 'ipad-serija',
  name: 'iPad 9.7" (6 gen. 2018) (A1893, A1954)',
  year: 2018,
  image: '/images/devices/tablet/ipad/ipad-9-7-6th-gen-2018.webp',
  popular: false,
  order: 140,
  metaTitle: 'iPad 9.7" (6 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad 9.7" (6 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad 9.7" (6 gen. 2018) (A1893, A1954)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: '10-2-7th-gen-2019',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad sērija',
  seriesSlug: 'ipad-serija',
  name: 'iPad 10.2" (7 gen. 2019) (A2198, A2197)',
  year: 2019,
  image: '/images/devices/tablet/ipad/ipad-10-2-7th-gen-2019.webp',
  popular: false,
  order: 150,
  metaTitle: 'iPad 10.2" (7 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad 10.2" (7 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad 10.2" (7 gen. 2019) (A2198, A2197)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: '10-2-8th-gen-2020',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad sērija',
  seriesSlug: 'ipad-serija',
  name: 'iPad 10.2" (8 gen. 2020) (A2270, A2429)',
  year: 2020,
  image: '/images/devices/tablet/ipad/ipad-10-2-8th-gen-2020.webp',
  popular: false,
  order: 160,
  metaTitle: 'iPad 10.2" (8 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad 10.2" (8 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad 10.2" (8 gen. 2020) (A2270, A2429)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: '10-2-9th-gen-2021',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad sērija',
  seriesSlug: 'ipad-serija',
  name: 'iPad 10.2" (9 gen. 2021) (A2602, A2604)',
  year: 2021,
  image: '/images/devices/tablet/ipad/ipad-10-2-9th-gen-2021.webp',
  popular: false,
  order: 170,
  metaTitle: 'iPad 10.2" (9 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad 10.2" (9 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad 10.2" (9 gen. 2021) (A2602, A2604)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: '10-9-10th-gen-2022',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad sērija',
  seriesSlug: 'ipad-serija',
  name: 'iPad 10.9" (10 gen. 2022) (A2696, A2757)',
  year: 2022,
  image: '/images/devices/tablet/ipad/ipad-10-9-10th-gen-2022.webp',
  popular: false,
  order: 180,
  metaTitle: 'iPad 10.9" (10 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad 10.9" (10 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad 10.9" (10 gen. 2022) (A2696, A2757)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

// ------------------------
// iPad mini
// ------------------------

{
  slug: 'mini-4th-gen-2015',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad mini sērija',
  seriesSlug: 'ipad-mini-serija',
  name: 'iPad mini 4 (2015) (A1550)',
  year: 2015,
  image: '/images/devices/tablet/ipad/ipad-mini-4th-gen-2015.webp',
  popular: false,
  order: 230,
  metaTitle: 'iPad mini 4 remonts Rīgā | iLab',
  metaDescription:
    'iPad mini 4 ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad mini 4 (2015) (A1550)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'mini-5th-gen-2019',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad mini sērija',
  seriesSlug: 'ipad-mini-serija',
  name: 'iPad mini 5 (2019) (A2124, A2133)',
  year: 2019,
  image: '/images/devices/tablet/ipad/ipad-mini-5th-gen-2019.webp',
  popular: false,
  order: 240,
  metaTitle: 'iPad mini 5 remonts Rīgā | iLab',
  metaDescription:
    'iPad mini 5 ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad mini 5 (2019) (A2124, A2133)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'mini-6th-gen-2021',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad mini sērija',
  seriesSlug: 'ipad-mini-serija',
  name: 'iPad mini 6 (2021) (A2567, A2568)',
  year: 2021,
  image: '/images/devices/tablet/ipad/ipad-mini-6th-gen-2021.webp',
  popular: false,
  order: 250,
  metaTitle: 'iPad mini 6 remonts Rīgā | iLab',
  metaDescription:
    'iPad mini 6 ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad mini 6 (2021) (A2567, A2568)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'mini-7th-gen-2024',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad mini sērija',
  seriesSlug: 'ipad-mini-serija',
  name: 'iPad mini 7 (2024)',
  year: 2024,
  image: '/images/devices/tablet/ipad/ipad-mini-7th-gen-2024.webp',
  popular: true,
  order: 260,
  metaTitle: 'iPad mini 7 remonts Rīgā | iLab',
  metaDescription:
    'iPad mini 7 ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad mini 7 (2024)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

// ------------------------
// iPad Air
// ------------------------

{
  slug: 'air-1st-gen-2013',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Air sērija',
  seriesSlug: 'ipad-air-serija',
  name: 'iPad Air (1 gen. 2013) (A1474, A1475)',
  year: 2013,
  image: '/images/devices/tablet/ipad/ipad-air-1st-gen-2013.webp',
  popular: false,
  order: 300,
  metaTitle: 'iPad Air (1 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad Air (1 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Air (1 gen. 2013) (A1474, A1475)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'air-2nd-gen-2014',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Air sērija',
  seriesSlug: 'ipad-air-serija',
  name: 'iPad Air 2 (2014) (A1566, A1567)',
  year: 2014,
  image: '/images/devices/tablet/ipad/ipad-air-2nd-gen-2014.webp',
  popular: false,
  order: 310,
  metaTitle: 'iPad Air 2 remonts Rīgā | iLab',
  metaDescription:
    'iPad Air 2 ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Air 2 (2014) (A1566, A1567)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'air-10-5-3rd-gen-2019',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Air sērija',
  seriesSlug: 'ipad-air-serija',
  name: 'iPad Air 10.5" (3 gen. 2019) (A2152)',
  year: 2019,
  image: '/images/devices/tablet/ipad/ipad-air-10-5-3rd-gen-2019.webp',
  popular: false,
  order: 320,
  metaTitle: 'iPad Air 10.5" (3 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad Air 10.5" (3 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Air 10.5" (3 gen. 2019) (A2152)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'air-10-9-4th-gen-2020',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Air sērija',
  seriesSlug: 'ipad-air-serija',
  name: 'iPad Air 10.9" (4 gen. 2020) (A2072, A2316)',
  year: 2020,
  image: '/images/devices/tablet/ipad/ipad-air-10-9-4th-gen-2020.webp',
  popular: false,
  order: 330,
  metaTitle: 'iPad Air 10.9" (4 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad Air 10.9" (4 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Air 10.9" (4 gen. 2020) (A2072, A2316)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'air-10-9-5th-gen-m1-2022',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Air sērija',
  seriesSlug: 'ipad-air-serija',
  name: 'iPad Air 10.9" (5 gen. M1, 2022) (A2588)',
  year: 2022,
  image: '/images/devices/tablet/ipad/ipad-air-10-9-5th-gen-m1-2022.webp',
  popular: false,
  order: 340,
  metaTitle: 'iPad Air 10.9" (5 gen. M1) remonts Rīgā | iLab',
  metaDescription:
    'iPad Air 10.9" (5 gen. M1) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Air 10.9" (5 gen. M1, 2022) (A2588)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'air-11-6th-gen-m2-2024',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Air sērija',
  seriesSlug: 'ipad-air-serija',
  name: 'iPad Air 11" (6 gen. M2, 2024)',
  year: 2024,
  image: '/images/devices/tablet/ipad/ipad-air-11-6th-gen-m2-2024.webp',
  popular: true,
  order: 350,
  metaTitle: 'iPad Air 11" (6 gen. M2) remonts Rīgā | iLab',
  metaDescription:
    'iPad Air 11" (6 gen. M2) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Air 11" (6 gen. M2, 2024)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'air-13-6th-gen-m2-2024',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Air sērija',
  seriesSlug: 'ipad-air-serija',
  name: 'iPad Air 13" (6 gen. M2, 2024)',
  year: 2024,
  image: '/images/devices/tablet/ipad/ipad-air-13-6th-gen-m2-2024.webp',
  popular: true,
  order: 360,
  metaTitle: 'iPad Air 13" (6 gen. M2) remonts Rīgā | iLab',
  metaDescription:
    'iPad Air 13" (6 gen. M2) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Air 13" (6 gen. M2, 2024)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

// ------------------------
// iPad Pro 9.7" / 10.5"
// ------------------------

{
  slug: 'pro-9-7-2016',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 9.7" (2016)',
  year: 2016,
  image: '/images/devices/tablet/ipad/ipad-pro-9-7-2016.webp',
  popular: false,
  order: 400,
  metaTitle: 'iPad Pro 9.7" remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 9.7" ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 9.7" (2016)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-10-5-2017',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 10.5" (2017)',
  year: 2017,
  image: '/images/devices/tablet/ipad/ipad-pro-10-5-2017.webp',
  popular: false,
  order: 410,
  metaTitle: 'iPad Pro 10.5" remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 10.5" ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 10.5" (2017)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

// ------------------------
// iPad Pro 11"
// ------------------------

{
  slug: 'pro-11-2018',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 11" (1 gen. 2018) (A1934, A1980)',
  year: 2018,
  image: '/images/devices/tablet/ipad/ipad-pro-11-2018.webp',
  popular: false,
  order: 500,
  metaTitle: 'iPad Pro 11" (2018) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 11" (2018) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 11" (1 gen. 2018) (A1934, A1980)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-11-2020',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 11" (2 gen. 2020) (A2230)',
  year: 2020,
  image: '/images/devices/tablet/ipad/ipad-pro-11-2020.webp',
  popular: false,
  order: 510,
  metaTitle: 'iPad Pro 11" (2 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 11" (2 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 11" (2 gen. 2020) (A2230)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-11-m1-2021',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 11" (3 gen. M1, 2021) (A2377, A2459)',
  year: 2021,
  image: '/images/devices/tablet/ipad/ipad-pro-11-m1-2021.webp',
  popular: false,
  order: 520,
  metaTitle: 'iPad Pro 11" (M1, 2021) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 11" (M1, 2021) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 11" (3 gen. M1, 2021) (A2377, A2459)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-11-m2-2022',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 11" (4 gen. M2, 2022) (A2759)',
  year: 2022,
  image: '/images/devices/tablet/ipad/ipad-pro-11-m2-2022.webp',
  popular: false,
  order: 530,
  metaTitle: 'iPad Pro 11" (M2, 2022) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 11" (M2, 2022) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 11" (4 gen. M2, 2022) (A2759)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-11-m4-2024',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 11" (7 gen. M4, 2024)',
  year: 2024,
  image: '/images/devices/tablet/ipad/ipad-pro-11-m4-2024.webp',
  popular: true,
  order: 540,
  metaTitle: 'iPad Pro 11" (M4, 2024) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 11" (M4, 2024) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 11" (7 gen. M4, 2024)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

// ------------------------
// iPad Pro 12.9" / 13"
// ------------------------

{
  slug: 'pro-12-9-2015',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 12.9" (1 gen. 2015) (A1584)',
  year: 2015,
  image: '/images/devices/tablet/ipad/ipad-pro-12-9-2015.webp',
  popular: false,
  order: 600,
  metaTitle: 'iPad Pro 12.9" (2015) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 12.9" (2015) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 12.9" (1 gen. 2015) (A1584)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-12-9-2017',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 12.9" (2 gen. 2017)',
  year: 2017,
  image: '/images/devices/tablet/ipad/ipad-pro-12-9-2017.webp',
  popular: false,
  order: 610,
  metaTitle: 'iPad Pro 12.9" (2 gen. 2017) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 12.9" (2 gen. 2017) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 12.9" (2 gen. 2017)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-12-9-2018',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 12.9" (3 gen. 2018)',
  year: 2018,
  image: '/images/devices/tablet/ipad/ipad-pro-12-9-2018.webp',
  popular: false,
  order: 620,
  metaTitle: 'iPad Pro 12.9" (3 gen. 2018) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 12.9" (3 gen. 2018) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 12.9" (3 gen. 2018)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-12-9-2020',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 12.9" (4 gen. 2020) (A2232)',
  year: 2020,
  image: '/images/devices/tablet/ipad/ipad-pro-12-9-2020.webp',
  popular: false,
  order: 630,
  metaTitle: 'iPad Pro 12.9" (4 gen.) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 12.9" (4 gen.) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 12.9" (4 gen. 2020) (A2232)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam oriģinālas vai augstas kvalitātes OEM detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-12-9-m1-2021',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 12.9" (5 gen. M1, 2021)',
  year: 2021,
  image: '/images/devices/tablet/ipad/ipad-pro-12-9-m1-2021.webp',
  popular: false,
  order: 640,
  metaTitle: 'iPad Pro 12.9" (M1, 2021) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 12.9" (M1, 2021) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 12.9" (5 gen. M1, 2021)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-12-9-m2-2022',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 12.9" (6 gen. M2, 2022)',
  year: 2022,
  image: '/images/devices/tablet/ipad/ipad-pro-12-9-m2-2022.webp',
  popular: true,
  order: 650,
  metaTitle: 'iPad Pro 12.9" (M2, 2022) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 12.9" (M2, 2022) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 12.9" (6 gen. M2, 2022)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},

{
  slug: 'pro-13-m4-2024',
  category: 'plansetdatoru-remonts',
  brand: 'Apple',
  brandSlug: 'ipad',
  series: 'iPad Pro sērija',
  seriesSlug: 'ipad-pro-serija',
  name: 'iPad Pro 13" (M4, 2024)',
  year: 2024,
  image: '/images/devices/tablet/ipad/ipad-pro-13-m4-2024.webp',
  popular: true,
  order: 660,
  metaTitle: 'iPad Pro 13" (M4, 2024) remonts Rīgā | iLab',
  metaDescription:
    'iPad Pro 13" (M4, 2024) ekrāna, baterijas un citu detaļu maiņa Rīgā. Bezmaksas diagnostika un 90 dienu garantija.',
  bodyHtml: `
<p><strong>iPad Pro 13" (M4, 2024)</strong> remonts Rīgā — ekrāna, baterijas, uzlādes porta un citu komponentu maiņa. Izmantojam kvalitatīvas detaļas ar 90 dienu garantiju.</p>
<p>Veicam bezmaksas diagnostiku un precīzi saskaņojam izmaksas pirms remonta.</p>
  `,
},



];

export default devices;
