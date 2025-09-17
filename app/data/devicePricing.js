// Dev-only pricing map. Later -> Firebase.
// Minutes are approximate. Prices include parts+labor unless stated otherwise.
export const devicePricing = {
  'iphone-14-pro': {
    currency: 'EUR',
    updated: '2025-09-17',
    items: [
      {
        id: 'display',
        title: 'Displeja (ekrāna) maiņa',
        href: '/iphone-remonts/displeja-maina',
        timeMin: 60, timeMax: 120,
        priceFrom: 179, priceTo: 279,
        warrantyDays: 90,
        popular: true,
      },
      {
        id: 'battery',
        title: 'Baterijas maiņa',
        href: '/iphone-remonts/baterijas-maina',
        timeMin: 30, timeMax: 60,
        priceFrom: 49, priceTo: 79,
        warrantyDays: 90,
        popular: true,
      },
      {
        id: 'charge-port',
        title: 'Uzlādes ligzdas remonts',
        timeMin: 45, timeMax: 90,
        priceFrom: 39, priceTo: 69,
        warrantyDays: 90,
      },
      {
        id: 'camera',
        title: 'Kameras remonts',
        timeMin: 60, timeMax: 120,
        priceFrom: 59, priceTo: 129,
        warrantyDays: 90,
      },
    ],
  },
};

export default devicePricing;
