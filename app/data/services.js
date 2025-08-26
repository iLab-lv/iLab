// Generic repair services, reusable across all devices
const services = [
  {
    slug: "ekrana-maina",                 // ASCII slug
    name: "Ekrāna maiņa",                 // Latvian label
    shortName: "Ekrāns",
    metaTitleTpl: "{device} ekrāna maiņa Rīgā",
    metaDescriptionTpl: "{device} ekrāna remonts tajā pašā dienā, 90 dienu garantija.",
    bodyHtmlDefault: "<p>Vispārīga informācija par ekrāna maiņu...</p>"
  },
  {
    slug: "baterijas-maina",
    name: "Baterijas maiņa",
    shortName: "Baterija",
    metaTitleTpl: "{device} baterijas maiņa Rīgā",
    metaDescriptionTpl: "{device} baterijas maiņa tajā pašā dienā, 90 dienu garantija.",
    bodyHtmlDefault: "<p>Vispārīga informācija par baterijas maiņu...</p>"
  },
  {
    slug: "kameras-maina",
    name: "Kameras maiņa",
    shortName: "Kamera",
    metaTitleTpl: "{device} kameras maiņa Rīgā",
    metaDescriptionTpl: "{device} kameras remonts tajā pašā dienā, 90 dienu garantija.",
    bodyHtmlDefault: "<p>Vispārīga informācija par kameras maiņu...</p>"
  }
];

export default services;
