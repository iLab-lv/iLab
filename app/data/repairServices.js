// repairServices.js
// Global repair services catalog (phones first). Brand-agnostic.
// Time is a single textual label via `defaultTimeText`. Per-model overrides can supply `serviceTimeTextOverrides`.

const repairServices = [
  {
    id: 'display-original',
    title: 'Displeja maiņa oriģināls',
    slug: 'displeja-maina-originals',
    categories: ['telefonu-remonts'],
    family: 'Ekrāns',
    defaultTimeText: '60–120 min',
    defaultWarrantyDays: 90,
    order: 10,
  },
  {
    id: 'display-incell',
    title: 'Displeja maiņa Incell/LCD',
    slug: 'displeja-maina-incell-lcd',
    categories: ['telefonu-remonts'],
    family: 'Ekrāns',
    defaultTimeText: '60–120 min',
    defaultWarrantyDays: 90,
    order: 11,
  },
  {
    id: 'display-oled',
    title: 'Displeja maiņa OLED',
    slug: 'displeja-maina-oled',
    categories: ['telefonu-remonts'],
    family: 'Ekrāns',
    defaultTimeText: '60–120 min',
    defaultWarrantyDays: 90,
    order: 12,
  },
  {
    id: 'charge-port',
    title: 'Lādēšanas konektora maiņa',
    slug: 'ladesanas-konektora-maina',
    categories: ['telefonu-remonts'],
    family: 'Barošana un uzlāde',
    defaultTimeText: '60–180 min',
    defaultWarrantyDays: 90,
    order: 30,
  },
  {
    id: 'back-cover',
    title: 'Aizmugures vāciņa maiņa',
    slug: 'aizmugures-vacina-maina',
    categories: ['telefonu-remonts'],
    family: 'Korpuss',
    defaultTimeText: '1–5 st',
    defaultWarrantyDays: 90,
    order: 40,
  },
  {
    id: 'battery',
    title: 'Baterijas maiņa',
    slug: 'baterijas-maina',
    categories: ['telefonu-remonts'],
    family: 'Barošana un uzlāde',
    defaultTimeText: '30–120 min',
    defaultWarrantyDays: 90,
    order: 20,
  },
  {
    id: 'camera-glass',
    title: 'Kameras stikla maiņa',
    slug: 'kameras-stikla-maina',
    categories: ['telefonu-remonts'],
    family: 'Kamera',
    defaultTimeText: '30–60 min',
    defaultWarrantyDays: 90,
    order: 51,
  },
   {
    id: 'camera',
    title: 'Kameras maiņa',
    slug: 'kameras-maina',
    categories: ['telefonu-remonts'],
    family: 'Kamera',
    defaultTimeText: '30–60 min',
    defaultWarrantyDays: 90,
    order: 50,
  },
  {
    id: 'water-damage-clean',
    title: 'Tīrīšana no ūdens',
    slug: 'tirisana-no-udens',
    categories: ['telefonu-remonts'],
    family: 'Diagnostika',
    defaultTimeText: 'no 3 st',
    defaultWarrantyDays: 0,
    order: 60,
  },
];

export default repairServices;

// Optional helpers
export const getServiceById = (id) =>
  repairServices.find((s) => s.id === id) || null;

export const getServicesForCategory = (category) =>
  repairServices.filter((s) => s.categories.includes(category));
