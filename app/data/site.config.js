// app/data/site.config.js

// Company basics (handy for JSON-LD later)
export const COMPANY = {
  name: 'iLab',
  url: 'https://www.ilab.lv',
  email: 'info@ilab.lv',
  phoneMain: '+37123370088',
  logo: '/brand/logo.svg',
};

// Socials (used in Controls + JSON-LD sameAs)
export const SOCIALS = {
  facebook: 'https://www.facebook.com/iLab.lv/',
  instagram: 'https://www.instagram.com/ilab.lv/',
  tiktok: 'https://www.tiktok.com/@ilab.lv',
};

// Default store hours (7-day format for hours table)
export const HOURS = [
  { day: 'P', opens: '10:00', closes: '21:00' },
  { day: 'O', opens: '10:00', closes: '21:00' },
  { day: 'T', opens: '10:00', closes: '21:00' },
  { day: 'C', opens: '10:00', closes: '21:00' },
  { day: 'Pk', opens: '10:00', closes: '21:00' },
  { day: 'S', opens: '10:00', closes: '21:00' },
  { day: 'Sv', opens: '10:00', closes: '21:00' },
];

// Map pin positions (% of image natural dimensions)
export const PIN_POSITIONS = {
  domina: { xPct: 68, yPct: 40 },
  spice: { xPct: 30, yPct: 60 },
};

// Locations used by panels, homepage, footer, etc.
export const LOCATIONS = [
  {
    id: 'domina',
    label: 'Domina Shopping',
    address: 'Ieriķu iela 3, Rīga, LV-1084',
    tel: '+371 23370088',
    telLink: 'tel:+37123370088',
    email: 'info@ilab.lv',
    wa: 'https://wa.me/37123370088',
    maps: 'https://www.google.com/maps/search/?api=1&query=iLab+Domina&query_place_id=PLACE_ID_DOMINA',
    destination: 'https://www.google.com/maps/dir/?api=1&destination=iLab+Domina&destination_place_id=PLACE_ID_DOMINA',
    hours: HOURS,
    // Optional: override hours for specific date
    // hoursOverride: { date: '2025-12-25', opens: '12:00', closes: '18:00' },
    // specialNotice: 'Ziemsvētku darba laiks', // Optional notice
  },
  {
    id: 'spice',
    label: 'Spice Home',
    address: 'Jaunmoku iela 13, Rīga, LV-1046',
    tel: '+371 20887787',
    telLink: 'tel:+37120887787',
    email: 'info@ilab.lv',
    wa: 'https://wa.me/37120887787',
    maps: 'https://www.google.com/maps/search/?api=1&query=iLab+Spice&query_place_id=PLACE_ID_SPICE',
    destination: 'https://www.google.com/maps/dir/?api=1&destination=iLab+Spice&destination_place_id=PLACE_ID_SPICE',
    hours: HOURS,
  },
];