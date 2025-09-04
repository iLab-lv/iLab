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

// Store hours if you want them later in footer/schema
export const HOURS = [
  { day: 'Mon-Fri', opens: '10:00', closes: '21:00' },
  { day: 'Sat-Sun', opens: '10:00', closes: '21:00' },
];

// Locations used by CtaDock (WhatsApp/maps) + footer links
export const LOCATIONS = [
  {
    id: 'domina',
    label: 'Domina Shopping',
    tel: '+37123370088',
    email: 'info@ilab.lv',
    wa: 'https://wa.me/37123370088',
    maps: 'https://www.google.com/maps/search/?api=1&query=iLab Domina&query_place_id=PLACE_ID_DOMINA',
    destination: 'https://www.google.com/maps/dir/?api=1&destination=iLab Domina&destination_place_id=PLACE_ID_DOMINA',
    address: 'Ieriķu iela 3, Rīga, LV-1084',
  },
  {
    id: 'spice',
    label: 'Spice Home',
    tel: '+37120887787',
    email: 'info@ilab.lv',
    wa: 'https://wa.me/37120887787',
    maps: 'https://www.google.com/maps/search/?api=1&query=iLab Spice&query_place_id=PLACE_ID_SPICE',
    destination: 'https://www.google.com/maps/dir/?api=1&destination=iLab Spice&destination_place_id=PLACE_ID_SPICE',
    address: 'Jaunmoku iela 13, Rīga, LV-1046',
  },
];
