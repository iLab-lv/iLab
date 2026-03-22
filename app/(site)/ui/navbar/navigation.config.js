export const NAVIGATION_CONFIG = [
  {
    key: 'iphone-repair',
    label: {
      lv: 'iPhone remonts',
      ru: 'Ремонт iPhone',
    },
    route: {
      type: 'category',
      categoryKey: 'iphone-remonts',
    },
  },
  {
    key: 'phone-repair',
    label: {
      lv: 'Telefonu remonts',
      ru: 'Ремонт телефонов',
    },
    route: {
      type: 'category',
      categoryKey: 'telefonu-remonts',
    },
    children: [
      {
        key: 'phone-samsung',
        label: { lv: 'Samsung', ru: 'Samsung' },
        route: {
          type: 'brand',
          categoryKey: 'telefonu-remonts',
          brandKey: 'samsung',
        },
      },
      {
        key: 'phone-xiaomi',
        label: { lv: 'Xiaomi', ru: 'Xiaomi' },
        route: {
          type: 'brand',
          categoryKey: 'telefonu-remonts',
          brandKey: 'xiaomi',
        },
      },
      {
        key: 'phone-huawei',
        label: { lv: 'Huawei', ru: 'Huawei' },
        route: {
          type: 'brand',
          categoryKey: 'telefonu-remonts',
          brandKey: 'huawei',
        },
      },
      {
        key: 'phone-oneplus',
        label: { lv: 'OnePlus', ru: 'OnePlus' },
        route: {
          type: 'brand',
          categoryKey: 'telefonu-remonts',
          brandKey: 'oneplus',
        },
      },
      {
        key: 'phone-all',
        label: { lv: 'Visi zīmoli', ru: 'Все бренды' },
        route: {
          type: 'category',
          categoryKey: 'telefonu-remonts',
        },
      },
    ],
  },
  {
    key: 'tablet-repair',
    label: {
      lv: 'Planšetdatoru remonts',
      ru: 'Ремонт планшетов',
    },
    route: {
      type: 'category',
      categoryKey: 'plansetdatoru-remonts',
    },
    children: [
      {
        key: 'tablet-ipad',
        label: { lv: 'iPad', ru: 'iPad' },
        route: {
          type: 'brand',
          categoryKey: 'plansetdatoru-remonts',
          brandKey: 'ipad',
        },
      },
      {
        key: 'tablet-samsung',
        label: { lv: 'Samsung', ru: 'Samsung' },
        route: {
          type: 'brand',
          categoryKey: 'plansetdatoru-remonts',
          brandKey: 'samsung',
        },
      },
      {
        key: 'tablet-xiaomi',
        label: { lv: 'Xiaomi', ru: 'Xiaomi' },
        route: {
          type: 'brand',
          categoryKey: 'plansetdatoru-remonts',
          brandKey: 'xiaomi',
        },
      },
      {
        key: 'tablet-huawei',
        label: { lv: 'Huawei', ru: 'Huawei' },
        route: {
          type: 'brand',
          categoryKey: 'plansetdatoru-remonts',
          brandKey: 'huawei',
        },
      },
      {
        key: 'tablet-lenovo',
        label: { lv: 'Lenovo', ru: 'Lenovo' },
        route: {
          type: 'brand',
          categoryKey: 'plansetdatoru-remonts',
          brandKey: 'lenovo',
        },
      },
    ],
  },
  {
    key: 'computer-repair',
    label: {
      lv: 'Datoru remonts',
      ru: 'Ремонт ноутбуков',
    },
    route: {
      type: 'category',
      categoryKey: 'datoru-remonts',
    },
    children: [
      {
        key: 'computer-macbook',
        label: { lv: 'MacBook', ru: 'MacBook' },
        route: {
          type: 'brand',
          categoryKey: 'datoru-remonts',
          brandKey: 'macbook',
        },
      },
      {
        key: 'computer-imac',
        label: { lv: 'iMac', ru: 'iMac' },
        route: {
          type: 'brand',
          categoryKey: 'datoru-remonts',
          brandKey: 'imac',
        },
      },
      {
        key: 'computer-mac-pro',
        label: { lv: 'Mac Pro', ru: 'Mac Pro' },
        route: {
          type: 'brand',
          categoryKey: 'datoru-remonts',
          brandKey: 'mac-pro',
        },
      },
      {
        key: 'computer-lenovo',
        label: { lv: 'Lenovo', ru: 'Lenovo' },
        route: {
          type: 'brand',
          categoryKey: 'datoru-remonts',
          brandKey: 'lenovo',
        },
      },
      {
        key: 'computer-asus',
        label: { lv: 'Asus', ru: 'Asus' },
        route: {
          type: 'brand',
          categoryKey: 'datoru-remonts',
          brandKey: 'asus',
        },
      },
      {
        key: 'computer-hp',
        label: { lv: 'HP', ru: 'HP' },
        route: {
          type: 'brand',
          categoryKey: 'datoru-remonts',
          brandKey: 'hp',
        },
      },
      {
        key: 'computer-all',
        label: { lv: 'Visi zīmoli', ru: 'Все бренды' },
        route: {
          type: 'category',
          categoryKey: 'datoru-remonts',
        },
      },
    ],
  },
  {
    key: 'dyson-repair',
    label: {
      lv: 'Dyson remonts',
      ru: 'Ремонт Dyson',
    },
    route: {
      type: 'category',
      categoryKey: 'dyson-remonts',
    },
  },
];