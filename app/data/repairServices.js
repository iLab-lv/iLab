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
    id: 'display',
    title: 'Displeja maiņa',
    slug: 'displeja-maina',
    categories: ['plansetdatoru-remonts'],
    family: 'Ekrāns',
    defaultTimeText: '60–120 min',
    defaultWarrantyDays: 90,
    order: 13,
  },
  {
    id: 'touchscreen',
    title: 'Skārienekrāna maiņa',
    slug: 'skarienekrana-maina',
    categories: ['plansetdatoru-remonts'],
    family: 'Ekrāns',
    defaultTimeText: '60–120 min',
    defaultWarrantyDays: 90,
    order: 14,
  },


  {
    id: 'charge-port',
    title: 'Lādēšanas konektora maiņa',
    slug: 'ladesanas-konektora-maina',
    categories: ['telefonu-remonts', 'plansetdatoru-remonts'],
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
    categories: ['telefonu-remonts', 'plansetdatoru-remonts'],
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

// LAPTOP
    {
    id: 'laptop-battery',
    title: 'Akumulatora nomaiņa',
    slug: 'akumulatora-nomaina',
    categories: ['datoru-remonts'],
    family: 'Barošana un uzlāde',
    defaultTimeText: '1–3 st',
    defaultWarrantyDays: 90,
    order: 70,
  },
  {
    id: 'laptop-display',
    title: 'Displeja nomaiņa',
    slug: 'displeja-nomaina',
    categories: ['datoru-remonts'],
    family: 'Ekrāns',
    defaultTimeText: 'pēc pieprasījuma',
    defaultWarrantyDays: 90,
    order: 71,
  },
  {
    id: 'laptop-liquid-damage',
    title: 'Atjaunošana pēc šķidruma bojājumiem',
    slug: 'atjaunosana-pec-skidruma-bojajumiem',
    categories: ['datoru-remonts'],
    family: 'Diagnostika',
    defaultTimeText: 'no 1 dienas',
    defaultWarrantyDays: 0,
    order: 72,
  },
  {
    id: 'laptop-maintenance',
    title: 'Profilakse un tehniskā apkalpošana',
    slug: 'profilakse-un-tehniska-apkalposana',
    categories: ['datoru-remonts'],
    family: 'Apkope',
    defaultTimeText: '1–2 st',
    defaultWarrantyDays: 90,
    order: 73,
  },
  {
    id: 'laptop-keyboard',
    title: 'Tastatūras nomaiņa',
    slug: 'tastaturas-nomaina',
    categories: ['datoru-remonts'],
    family: 'Korpuss un ievade',
    defaultTimeText: 'pēc pieprasījuma',
    defaultWarrantyDays: 90,
    order: 74,
  },
  {
    id: 'laptop-touchpad',
    title: 'Touchpad nomaiņa',
    slug: 'touchpad-nomaina',
    categories: ['datoru-remonts'],
    family: 'Korpuss un ievade',
    defaultTimeText: 'pēc pieprasījuma',
    defaultWarrantyDays: 90,
    order: 75,
  },


];

export default repairServices;

// Optional helpers
export const getServiceById = (id) =>
  repairServices.find((s) => s.id === id) || null;

export const getServicesForCategory = (category) =>
  repairServices.filter((s) => s.categories.includes(category));
