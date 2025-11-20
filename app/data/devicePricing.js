// devicePricing.js
// Per-model pricing overrides only.
// Titles/times/warranty come from repairServices via ID.
// Render rule: hide any line where price === null.

export const devicePricing = {
  'iphone-17': {
    items: [
      { id: 'display-original',   price: 'pēc pieprasījuma', popular: true },
      { id: 'display-incell',     price: 'pēc pieprasījuma' },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 'pēc pieprasījuma' },
      { id: 'back-cover',         price: 'pēc pieprasījuma' },
      { id: 'battery',            price: 'pēc pieprasījuma', popular: true },
      { id: 'camera-glass',       price: 'pēc pieprasījuma' },
      { id: 'camera',       price: '30' },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-17-pro': {
    items: [
      { id: 'display-original',   price: 'pēc pieprasījuma', popular: true },
      { id: 'display-incell',     price: 'pēc pieprasījuma' },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 'pēc pieprasījuma' },
      { id: 'back-cover',         price: 'pēc pieprasījuma' },
      { id: 'battery',            price: 'pēc pieprasījuma', popular: true },
      { id: 'camera-glass',       price: 'pēc pieprasījuma' },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-17-pro-max': {
    items: [
      { id: 'display-original',   price: 'pēc pieprasījuma', popular: true },
      { id: 'display-incell',     price: 'pēc pieprasījuma' },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 'pēc pieprasījuma' },
      { id: 'back-cover',         price: 'pēc pieprasījuma' },
      { id: 'battery',            price: 'pēc pieprasījuma', popular: true },
      { id: 'camera-glass',       price: 'pēc pieprasījuma' },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-air': {
    items: [
      { id: 'display-original',   price: 'pēc pieprasījuma', popular: true },
      { id: 'display-incell',     price: 'pēc pieprasījuma' },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 'pēc pieprasījuma' },
      { id: 'back-cover',         price: 'pēc pieprasījuma' },
      { id: 'battery',            price: 'pēc pieprasījuma', popular: true },
      { id: 'camera-glass',       price: 'pēc pieprasījuma' },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-16-pro-max': {
    items: [
      { id: 'display-original',   price: 540, popular: true },
      { id: 'display-incell',     price: 220 },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 140 },
      { id: 'back-cover',         price: 190 },
      { id: 'battery',            price: 100, popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-16-pro': {
    items: [
      { id: 'display-original',   price: 520, popular: true },
      { id: 'display-incell',     price: 215 },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 130 },
      { id: 'back-cover',         price: 180 },
      { id: 'battery',            price: 100, popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-16-plus': {
    items: [
      { id: 'display-original',   price: 500, popular: true },
      { id: 'display-incell',     price: 210 },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 120 },
      { id: 'back-cover',         price: 160 },
      { id: 'battery',            price: 100, popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-16': {
    items: [
      { id: 'display-original',   price: 480, popular: true },
      { id: 'display-incell',     price: 200 },
      { id: 'display-oled',       price: 'pēc pieprasījuma' },
      { id: 'charge-port',        price: 120 },
      { id: 'back-cover',         price: 150 },
      { id: 'battery',            price: 100, popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-15-pro-max': {
    items: [
      { id: 'display-original',   price: 420, popular: true },
      { id: 'display-incell',     price: 200 },
      { id: 'display-oled',       price: 360 },
      { id: 'charge-port',        price: 100 },
      { id: 'back-cover',         price: 160 },
      { id: 'battery',            price: 100, popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-15-pro': {
    items: [
      { id: 'display-original',   price: 380, popular: true },
      { id: 'display-incell',     price: 190 },
      { id: 'display-oled',       price: 320 },
      { id: 'charge-port',        price: 100 },
      { id: 'back-cover',         price: 150 },
      { id: 'battery',            price: 100, popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-15-plus': {
    items: [
      { id: 'display-original',   price: 260, popular: true },
      { id: 'display-incell',     price: 160 },
      { id: 'display-oled',       price: 210 },
      { id: 'charge-port',        price: 100 },
      { id: 'back-cover',         price: 150 },
      { id: 'battery',            price: 80,  popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-15': {
    items: [
      { id: 'display-original',   price: 240, popular: true },
      { id: 'display-incell',     price: 150 },
      { id: 'display-oled',       price: 190 },
      { id: 'charge-port',        price: 100 },
      { id: 'back-cover',         price: 140 },
      { id: 'battery',            price: 80,  popular: true },
      { id: 'camera-glass',       price: 50 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-14-pro-max': {
    items: [
      { id: 'display-original',   price: 380, popular: true },
      { id: 'display-incell',     price: 200 },
      { id: 'display-oled',       price: 300 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 140 },
      { id: 'battery',            price: 80,  popular: true },
      { id: 'camera-glass',       price: 45 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-14-pro': {
    items: [
      { id: 'display-original',   price: 340, popular: true },
      { id: 'display-incell',     price: 180 },
      { id: 'display-oled',       price: 280 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 130 },
      { id: 'battery',            price: 80,  popular: true },
      { id: 'camera-glass',       price: 45 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-14-plus': {
    items: [
      { id: 'display-original',   price: 260, popular: true },
      { id: 'display-incell',     price: 160 },
      { id: 'display-oled',       price: 220 },
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 80,  popular: true },
      { id: 'camera-glass',       price: 45 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-14': {
    items: [
      { id: 'display-original',   price: 240, popular: true },
      { id: 'display-incell',     price: 150 },
      { id: 'display-oled',       price: 190 },
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 80,  popular: true },
      { id: 'camera-glass',       price: 45 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-13-pro-max': {
    items: [
      { id: 'display-original',   price: 290, popular: true },
      { id: 'display-incell',     price: 150 },
      { id: 'display-oled',       price: 210 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-13-pro': {
    items: [
      { id: 'display-original',   price: 250, popular: true },
      { id: 'display-incell',     price: 140 },
      { id: 'display-oled',       price: 200 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-13-mini': {
    items: [
      { id: 'display-original',   price: 220, popular: true },
      { id: 'display-incell',     price: 120 },
      { id: 'display-oled',       price: 170 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-13': {
    items: [
      { id: 'display-original',   price: 230, popular: true },
      { id: 'display-incell',     price: 130 },
      { id: 'display-oled',       price: 180 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-12-pro-max': {
    items: [
      { id: 'display-original',   price: 250, popular: true },
      { id: 'display-incell',     price: 140 },
      { id: 'display-oled',       price: 200 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-12-pro': {
    items: [
      { id: 'display-original',   price: 220, popular: true },
      { id: 'display-incell',     price: 120 },
      { id: 'display-oled',       price: 170 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-12': {
    items: [
      { id: 'display-original',   price: 220, popular: true },
      { id: 'display-incell',     price: 120 },
      { id: 'display-oled',       price: 170 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-12-mini': {
    items: [
      { id: 'display-original',   price: 210, popular: true },
      { id: 'display-incell',     price: 110 },
      { id: 'display-oled',       price: 160 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-11-pro-max': {
    items: [
      { id: 'display-original',   price: 230, popular: true },
      { id: 'display-incell',     price: 130 },
      { id: 'display-oled',       price: 180 },
      { id: 'charge-port',        price: 90 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 70,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-11-pro': {
    items: [
      { id: 'display-original',   price: 210, popular: true },
      { id: 'display-incell',     price: 120 },
      { id: 'display-oled',       price: 170 },
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 60,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-11': {
    items: [
      { id: 'display-original',   price: 190, popular: true },
      { id: 'display-incell',     price: 110 },
      { id: 'display-oled',       price: null }, // LCD model → OLED N/A
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: 120 },
      { id: 'battery',            price: 60,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-xs-max': {
    items: [
      { id: 'display-original',   price: 190, popular: true },
      { id: 'display-incell',     price: 110 },
      { id: 'display-oled',       price: 160 },
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: null }, // N/A per sheet
      { id: 'battery',            price: 60,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-xs': {
    items: [
      { id: 'display-original',   price: 180, popular: true },
      { id: 'display-incell',     price: 100 },
      { id: 'display-oled',       price: 150 },
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 60,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-xr': {
    items: [
      { id: 'display-original',   price: 170, popular: true },
      { id: 'display-incell',     price: 90 },
      { id: 'display-oled',       price: null }, // LCD model → OLED N/A
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 60,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-x': {
    items: [
      { id: 'display-original',   price: 180, popular: true },
      { id: 'display-incell',     price: 100 },
      { id: 'display-oled',       price: 150 },
      { id: 'charge-port',        price: 80 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 60,  popular: true },
      { id: 'camera-glass',       price: 40 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-se-3': {
    items: [
      { id: 'display-original',   price: 70, popular: true },
      { id: 'display-incell',     price: 60 },
      { id: 'display-oled',       price: null }, // LCD → OLED N/A
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 50, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-se-2': {
    items: [
      { id: 'display-original',   price: 70, popular: true },
      { id: 'display-incell',     price: 60 },
      { id: 'display-oled',       price: null }, // LCD → OLED N/A
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 50, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-8-plus': {
    items: [
      { id: 'display-original',   price: 85, popular: true },
      { id: 'display-incell',     price: 70 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 50, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-8': {
    items: [
      { id: 'display-original',   price: 70, popular: true },
      { id: 'display-incell',     price: 60 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 50, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-se-1': {
    items: [
      { id: 'display-original',   price: 45, popular: true },
      { id: 'display-incell',     price: 40 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 40, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-7-plus': {
    items: [
      { id: 'display-original',   price: 70, popular: true },
      { id: 'display-incell',     price: 60 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 50, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-7': {
    items: [
      { id: 'display-original',   price: 65, popular: true },
      { id: 'display-incell',     price: 55 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 50, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-6s-plus': {
    items: [
      { id: 'display-original',   price: 60, popular: true },
      { id: 'display-incell',     price: 50 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 45, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-6s': {
    items: [
      { id: 'display-original',   price: 55, popular: true },
      { id: 'display-incell',     price: 45 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: 50 },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 45, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-6-plus': {
    items: [
      { id: 'display-original',   price: 55, popular: true },
      { id: 'display-incell',     price: 40 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 45, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-6': {
    items: [
      { id: 'display-original',   price: 50, popular: true },
      { id: 'display-incell',     price: 40 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: 45, popular: true },
      { id: 'camera-glass',       price: 30 },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-5s': {
    items: [
      { id: 'display-original',   price: 45, popular: true },
      { id: 'display-incell',     price: 40 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: null },
      { id: 'camera-glass',       price: null },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-5c': {
    items: [
      { id: 'display-original',   price: 45, popular: true },
      { id: 'display-incell',     price: 35 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: null },
      { id: 'camera-glass',       price: null },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },
  'iphone-5': {
    items: [
      { id: 'display-original',   price: 45, popular: true },
      { id: 'display-incell',     price: 35 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: null },
      { id: 'camera-glass',       price: null },
      { id: 'water-damage-clean', price: 'no 50' },
    ],
  },

  'iphone-4s': {
    items: [
      { id: 'display-original',   price: 45, popular: true },
      { id: 'display-incell',     price: 35 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: null },
      { id: 'camera-glass',       price: null },
      { id: 'water-damage-clean', price: null }, // N/A
    ],
  },
  'iphone-4': {
    items: [
      { id: 'display-original',   price: 45, popular: true },
      { id: 'display-incell',     price: 35 },
      { id: 'display-oled',       price: null },
      { id: 'charge-port',        price: null },
      { id: 'back-cover',         price: null },
      { id: 'battery',            price: null },
      { id: 'camera-glass',       price: null },
      { id: 'water-damage-clean', price: null }, // N/A
    ],
  },
};

export default devicePricing;
