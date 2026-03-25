/* scripts/importCategoriesToFirestore.cjs
 *
 * Imports CLEANED category taxonomy + category page content into Firestore collection: categories
 *
 * Doc ID: category slug
 *
 * Usage:
 *   node scripts/importCategoriesToFirestore.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite   (default)
 *   IMPORT_MODE=skip        (skip if doc exists)
 *
 * Required env in .env.local:
 *   FIREBASE_PROJECT_ID=
 *   FIREBASE_CLIENT_EMAIL=
 *   FIREBASE_PRIVATE_KEY=
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'skip'

function assertEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing env var: ${name}`);
  }
}

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  assertEnv('FIREBASE_PROJECT_ID');
  assertEnv('FIREBASE_CLIENT_EMAIL');
  assertEnv('FIREBASE_PRIVATE_KEY');

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

/**
 * CLEANED CATEGORY DATA
 *
 * Principles:
 * - iPhone is NOT a separate category doc.
 * - iPhone lives under telefonu-remonts > apple as a dedicated hub brand subtree.
 * - Category docs contain real landing-page content fields:
 *   h1, lead, bodyHtml, metaTitle, metaDescription, image
 * - Brands are nested inside categories.
 * - Series are nested inside brands.
 * - Redundant heroAlt / isFeatured removed.
 */

const CATEGORY_DOCS = [
  {
    slug: 'telefonu-remonts',
    type: 'category',
    order: 2,

    labels: {
      lv: 'Telefonu remonts',
      ru: 'Ремонт телефонов',
    },

    image: '/images/categories/telefonu_remonts.webp',

    h1: {
      lv: 'Telefonu remonts Rīgā',
      ru: 'Ремонт телефонов в Риге',
    },

    lead: {
      lv: 'Displeji, baterijas, uzlādes ligzdas, kameras un citi telefonu remontdarbi. Biežākos remontus paveicam tajā pašā dienā ar skaidrām cenām un 90 dienu garantiju.',
      ru: 'Экраны, аккумуляторы, разъёмы зарядки, камеры и другие ремонты телефонов. Частые ремонты выполняем в тот же день, с понятными ценами и гарантией 90 дней.',
    },

    bodyHtml: {
      lv: `
<p><strong>Telefonu remonts Rīgā</strong> iLab servisā ietver ekrāna maiņu, baterijas nomaiņu, uzlādes ligzdas remontu, kameras maiņu, korpusa detaļu nomaiņu un diagnostiku pēc mitruma bojājumiem.</p>
<p>Strādājam ar populārākajiem zīmoliem, pirms remonta saskaņojam izmaksas, bet pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong> detaļām un darbam. Biežākos remontdarbus iespējams paveikt tajā pašā dienā.</p>
      `,
      ru: `
<p><strong>Ремонт телефонов в Риге</strong> в сервисе iLab включает замену экрана, аккумулятора, разъёма зарядки, камеры, корпусных деталей и диагностику после попадания влаги.</p>
<p>Работаем с популярными брендами, заранее согласовываем стоимость ремонта и после выполнения выдаём <strong>гарантию 90 дней</strong> на детали и работу. Самые частые ремонты выполняем в тот же день.</p>
      `,
    },

    metaTitle: {
      lv: 'Telefonu remonts Rīgā, ekrāna un baterijas maiņa | iLab',
      ru: 'Ремонт телефонов в Риге, экран и батарея | iLab',
    },

    metaDescription: {
      lv: 'Telefonu remonts Rīgā — ekrāna, baterijas, kameras un uzlādes ligzdas maiņa, mitruma bojājumu diagnostika, skaidras cenas un 90 dienu garantija iLab.',
      ru: 'Ремонт телефонов в Риге: замена экрана, батареи, камеры и разъёма зарядки, диагностика после влаги, понятные цены и гарантия 90 дней в iLab.',
    },

    brands: [
      {
        key: 'apple',
        order: 1,
        labels: {
          lv: 'Apple iPhone',
          ru: 'Apple iPhone',
        },
        logo: '/images/logos/apple-logo.svg',
        image: '/images/categories/iphone_remonts.webp',

        route: {
          brandPath: '/telefonu-remonts/apple',
          dedicatedHubPath: '/iphone-remonts',
          preferDedicatedHub: true,
        },

        page: {
          variant: 'iphoneHub',
          h1: {
            lv: 'iPhone remonts Rīgā',
            ru: 'Ремонт iPhone в Риге',
          },
          lead: {
            lv: 'iLab meistari remontē iPhone ar saplaisājušu ekrānu, nolietotu bateriju, bojātu kameru un uzlādes problēmām. Ātra diagnostika, kvalitatīvas detaļas un 90 dienu garantija.',
            ru: 'Мастера iLab ремонтируют iPhone с разбитым экраном, изношенной батареей, неисправной камерой и проблемами зарядки. Быстрая диагностика, качественные детали и гарантия 90 дней.',
          },
          modelGrid: {
            heading: {
              lv: 'Izvēlies savu iPhone modeli',
              ru: 'Выберите свою модель iPhone',
            },
            intro: {
              lv: 'Atrodi vajadzīgo iPhone pēc nosaukuma vai atver sēriju un izvēlies savu modeli.',
              ru: 'Найдите нужный iPhone по названию или откройте серию и выберите свою модель.',
            },
          },
          sections: {
            hasCustomGuide: true,
            hasReviews: true,
            hasProcess: true,
            hasWhy: true,
            hasFaq: true,
          },
          metaTitle: {
            lv: 'iPhone remonts Rīgā, ekrāna un baterijas maiņa | iLab',
            ru: 'Ремонт iPhone в Риге, экран и батарея | iLab',
          },
          metaDescription: {
            lv: 'iPhone remonts Rīgā — ekrāna, baterijas, kameras un uzlādes ligzdas maiņa, ūdens bojājumu novēršana, ātra diagnostika un 90 dienu garantija iLab.',
            ru: 'Ремонт iPhone в Риге: замена экрана, батареи, камеры и разъёма зарядки, ремонт после воды, быстрая диагностика и гарантия 90 дней в iLab.',
          },
        },

        series: [
          { key: 'iphone-17', order: 10, labels: { lv: 'iPhone 17 sērija', ru: 'Серия iPhone 17' } },
          { key: 'iphone-16', order: 20, labels: { lv: 'iPhone 16 sērija', ru: 'Серия iPhone 16' } },
          { key: 'iphone-15', order: 30, labels: { lv: 'iPhone 15 sērija', ru: 'Серия iPhone 15' } },
          { key: 'iphone-14', order: 40, labels: { lv: 'iPhone 14 sērija', ru: 'Серия iPhone 14' } },
          { key: 'iphone-se', order: 50, labels: { lv: 'iPhone SE', ru: 'iPhone SE' } },
          { key: 'iphone-13', order: 60, labels: { lv: 'iPhone 13 sērija', ru: 'Серия iPhone 13' } },
          { key: 'iphone-12', order: 70, labels: { lv: 'iPhone 12 sērija', ru: 'Серия iPhone 12' } },
          { key: 'iphone-11', order: 80, labels: { lv: 'iPhone 11 sērija', ru: 'Серия iPhone 11' } },
          { key: 'iphone-x', order: 90, labels: { lv: 'iPhone X sērija', ru: 'Серия iPhone X' } },
          { key: 'iphone-legacy', order: 999, labels: { lv: 'Vecākie iPhone modeļi', ru: 'Старые модели iPhone' } },
        ],
      },

      {
        key: 'samsung',
        order: 2,
        labels: {
          lv: 'Samsung',
          ru: 'Samsung',
        },
        logo: '/images/logos/samsung-logo.svg',
        image: '/images/categories/telefonu_remonts.webp',
        route: {
          brandPath: '/telefonu-remonts/samsung',
        },
        page: {
          variant: 'brand',
        },
        series: [
          { key: 'galaxy-s', order: 100, labels: { lv: 'Galaxy S sērija', ru: 'Серия Galaxy S' } },
          { key: 'galaxy-a', order: 110, labels: { lv: 'Galaxy A sērija', ru: 'Серия Galaxy A' } },
          { key: 'galaxy-z', order: 120, labels: { lv: 'Galaxy Z sērija', ru: 'Серия Galaxy Z' } },
          { key: 'galaxy-note', order: 130, labels: { lv: 'Galaxy Note sērija', ru: 'Серия Galaxy Note' } },
        ],
      },

      {
        key: 'huawei',
        order: 3,
        labels: {
          lv: 'Huawei',
          ru: 'Huawei',
        },
        logo: '/images/logos/huawei-logo.svg',
        image: '/images/categories/telefonu_remonts.webp',
        route: {
          brandPath: '/telefonu-remonts/huawei',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },

      {
        key: 'sony',
        order: 4,
        labels: {
          lv: 'Sony',
          ru: 'Sony',
        },
        logo: '/images/logos/sony-logo.svg',
        image: '/images/categories/telefonu_remonts.webp',
        route: {
          brandPath: '/telefonu-remonts/sony',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },

      {
        key: 'oneplus',
        order: 5,
        labels: {
          lv: 'OnePlus',
          ru: 'OnePlus',
        },
        logo: '/images/logos/oneplus-logo.svg',
        image: '/images/categories/telefonu_remonts.webp',
        route: {
          brandPath: '/telefonu-remonts/oneplus',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },

      {
        key: 'xiaomi',
        order: 6,
        labels: {
          lv: 'Xiaomi',
          ru: 'Xiaomi',
        },
        logo: '/images/logos/xiaomi-logo.svg',
        image: '/images/categories/telefonu_remonts.webp',
        route: {
          brandPath: '/telefonu-remonts/xiaomi',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
    ],
  },

  {
    slug: 'plansetdatoru-remonts',
    type: 'category',
    order: 3,

    labels: {
      lv: 'Planšetdatoru remonts',
      ru: 'Ремонт планшетов',
    },

    image: '/images/categories/plansetdatoru-remonts.webp',

    h1: {
      lv: 'Planšetdatoru remonts Rīgā',
      ru: 'Ремонт планшетов в Риге',
    },

    lead: {
      lv: 'Ekrāni, baterijas, uzlādes ligzdas, kameras un citi planšetdatoru remonti. Ātra diagnostika, skaidras cenas un 90 dienu garantija iLab servisā.',
      ru: 'Экраны, аккумуляторы, разъёмы зарядки, камеры и другие ремонты планшетов. Быстрая диагностика, понятные цены и гарантия 90 дней в сервисе iLab.',
    },

    bodyHtml: {
      lv: `
<p><strong>Planšetdatoru remonts Rīgā</strong> iLab servisā ietver displeja maiņu, baterijas nomaiņu, uzlādes ligzdas remontu, kameras remontu un mitruma bojājumu diagnostiku.</p>
<p>Remontējam Apple iPad, Samsung Galaxy Tab, Lenovo, Xiaomi un citus planšetdatorus. Pirms darba uzsākšanas veicam diagnostiku, saskaņojam izmaksas un pēc remonta sniedzam <strong>90 dienu garantiju</strong>.</p>
      `,
      ru: `
<p><strong>Ремонт планшетов в Риге</strong> в сервисе iLab включает замену дисплея, аккумулятора, разъёма зарядки, ремонт камеры и диагностику после попадания влаги.</p>
<p>Ремонтируем Apple iPad, Samsung Galaxy Tab, Lenovo, Xiaomi и другие планшеты. Перед началом работ проводим диагностику, согласовываем стоимость и после ремонта выдаём <strong>гарантию 90 дней</strong>.</p>
      `,
    },

    metaTitle: {
      lv: 'Planšetdatoru remonts Rīgā, ekrāna maiņa | iLab',
      ru: 'Ремонт планшетов в Риге, замена экрана | iLab',
    },

    metaDescription: {
      lv: 'Planšetdatoru remonts Rīgā — ekrāna, baterijas un uzlādes ligzdas maiņa, kameras remonts, diagnostika un 90 dienu garantija Apple, Samsung un citiem.',
      ru: 'Ремонт планшетов в Риге: замена экрана, батареи и разъёма зарядки, ремонт камеры, диагностика и гарантия 90 дней для Apple, Samsung и других.',
    },

    brands: [
      {
        key: 'apple',
        order: 1,
        labels: {
          lv: 'Apple iPad',
          ru: 'Apple iPad',
        },
        logo: '/images/logos/apple-logo.svg',
        image: '/images/categories/plansetdatoru-remonts.webp',
        route: {
          brandPath: '/plansetdatoru-remonts/apple',
          dedicatedHubPath: '/ipad-remonts',
          preferDedicatedHub: true,
        },
        page: {
          variant: 'ipadHub',
        },
        series: [
          { key: 'ipad-pro', order: 100, labels: { lv: 'iPad Pro', ru: 'iPad Pro' } },
          { key: 'ipad-air', order: 110, labels: { lv: 'iPad Air', ru: 'iPad Air' } },
          { key: 'ipad-mini', order: 120, labels: { lv: 'iPad mini', ru: 'iPad mini' } },
          { key: 'ipad', order: 130, labels: { lv: 'iPad', ru: 'iPad' } },
        ],
      },
      {
        key: 'samsung',
        order: 2,
        labels: {
          lv: 'Samsung Galaxy Tab',
          ru: 'Samsung Galaxy Tab',
        },
        logo: '/images/logos/samsung-logo.svg',
        image: '/images/categories/plansetdatoru-remonts.webp',
        route: {
          brandPath: '/plansetdatoru-remonts/samsung',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'lenovo',
        order: 3,
        labels: {
          lv: 'Lenovo',
          ru: 'Lenovo',
        },
        logo: '/images/logos/lenovo-logo.svg',
        image: '/images/categories/plansetdatoru-remonts.webp',
        route: {
          brandPath: '/plansetdatoru-remonts/lenovo',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'xiaomi',
        order: 4,
        labels: {
          lv: 'Xiaomi',
          ru: 'Xiaomi',
        },
        logo: '/images/logos/xiaomi-logo.svg',
        image: '/images/categories/plansetdatoru-remonts.webp',
        route: {
          brandPath: '/plansetdatoru-remonts/xiaomi',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'huawei',
        order: 5,
        labels: {
          lv: 'Huawei',
          ru: 'Huawei',
        },
        logo: '/images/logos/huawei-logo.svg',
        image: '/images/categories/plansetdatoru-remonts.webp',
        route: {
          brandPath: '/plansetdatoru-remonts/huawei',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
    ],
  },

  {
    slug: 'datoru-remonts',
    type: 'category',
    order: 4,

    labels: {
      lv: 'Datoru remonts',
      ru: 'Ремонт компьютеров',
    },

    image: '/images/categories/datoru_remonts.webp',

    h1: {
      lv: 'Datoru remonts Rīgā',
      ru: 'Ремонт компьютеров в Риге',
    },

    lead: {
      lv: 'Portatīvo un stacionāro datoru remonts — ekrāns, tastatūra, mātesplate, uzlāde, SSD un RAM uzlabošana, kā arī diagnostika pēc mitruma bojājumiem.',
      ru: 'Ремонт ноутбуков и настольных компьютеров — экран, клавиатура, материнская плата, зарядка, апгрейд SSD и RAM, а также диагностика после влаги.',
    },

    bodyHtml: {
      lv: `
<p><strong>Datoru remonts Rīgā</strong> iLab servisā ietver portatīvo un stacionāro datoru diagnostiku, ekrāna maiņu, tastatūras remontu, mātesplates remontu, uzlādes problēmu novēršanu un veiktspējas uzlabošanu ar SSD vai RAM nomaiņu.</p>
<p>Remontējam MacBook, iMac, Mac Pro, Lenovo, HP, Dell, Asus, Acer un citus datorus. Pirms remonta saskaņojam izmaksas un pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>
      `,
      ru: `
<p><strong>Ремонт компьютеров в Риге</strong> в сервисе iLab включает диагностику ноутбуков и настольных компьютеров, замену экрана, ремонт клавиатуры, материнской платы, устранение проблем с зарядкой и повышение производительности с помощью замены SSD или RAM.</p>
<p>Ремонтируем MacBook, iMac, Mac Pro, Lenovo, HP, Dell, Asus, Acer и другие компьютеры. Перед ремонтом согласовываем стоимость и после выполнения работ выдаём <strong>гарантию 90 дней</strong>.</p>
      `,
    },

    metaTitle: {
      lv: 'Datoru remonts Rīgā, MacBook un portatīvie datori | iLab',
      ru: 'Ремонт компьютеров в Риге, MacBook и ноутбуки | iLab',
    },

    metaDescription: {
      lv: 'Datoru remonts Rīgā — MacBook, iMac, portatīvo un stacionāro datoru diagnostika, ekrāna, tastatūras un uzlādes remonts, SSD/RAM uzlabojumi un garantija.',
      ru: 'Ремонт компьютеров в Риге: MacBook, iMac, ноутбуки и ПК, диагностика, ремонт экрана, клавиатуры и зарядки, апгрейд SSD/RAM и гарантия.',
    },

    brands: [
      {
        key: 'macbook',
        order: 1,
        labels: {
          lv: 'MacBook',
          ru: 'MacBook',
        },
        logo: '/images/logos/apple-logo.svg',
        image: '/images/categories/datoru_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/macbook',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'imac',
        order: 2,
        labels: {
          lv: 'iMac',
          ru: 'iMac',
        },
        logo: '/images/logos/apple-logo.svg',
        image: '/images/categories/imac_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/imac',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'mac-pro',
        order: 3,
        labels: {
          lv: 'Mac Pro',
          ru: 'Mac Pro',
        },
        logo: '/images/logos/apple-logo.svg',
        image: '/images/categories/macpro_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/mac-pro',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'lenovo',
        order: 4,
        labels: {
          lv: 'Lenovo',
          ru: 'Lenovo',
        },
        logo: '/images/logos/lenovo-logo.svg',
        image: '/images/categories/datoru_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/lenovo',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'hp',
        order: 5,
        labels: {
          lv: 'HP',
          ru: 'HP',
        },
        logo: '/images/logos/hp-logo.svg',
        image: '/images/categories/datoru_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/hp',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'msi',
        order: 6,
        labels: {
          lv: 'MSI',
          ru: 'MSI',
        },
        logo: '/images/logos/msi-logo.svg',
        image: '/images/categories/datoru_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/msi',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'dell',
        order: 7,
        labels: {
          lv: 'Dell',
          ru: 'Dell',
        },
        logo: '/images/logos/dell-logo.svg',
        image: '/images/categories/datoru_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/dell',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'asus',
        order: 8,
        labels: {
          lv: 'Asus',
          ru: 'Asus',
        },
        logo: '/images/logos/asus-logo.svg',
        image: '/images/categories/datoru_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/asus',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
      {
        key: 'acer',
        order: 9,
        labels: {
          lv: 'Acer',
          ru: 'Acer',
        },
        logo: '/images/logos/acer-logo.svg',
        image: '/images/categories/datoru_remonts.webp',
        route: {
          brandPath: '/datoru-remonts/acer',
        },
        page: {
          variant: 'brand',
        },
        series: [],
      },
    ],
  },

  {
    slug: 'dyson-remonts',
    type: 'category',
    order: 5,

    labels: {
      lv: 'Dyson remonts',
      ru: 'Ремонт Dyson',
    },

    image: '/images/categories/dyson_remonts.webp',

    h1: {
      lv: 'Dyson remonts Rīgā',
      ru: 'Ремонт Dyson в Риге',
    },

    lead: {
      lv: 'Dyson bezvadu putekļsūcēju baterijas, motora, filtru un citu mezglu remonts. Ātra pārbaude, skaidras izmaksas un 90 dienu garantija iLab servisā.',
      ru: 'Ремонт беспроводных пылесосов Dyson: батарея, мотор, фильтры и другие узлы. Быстрая проверка, понятная стоимость и гарантия 90 дней в iLab.',
    },

    bodyHtml: {
      lv: `
<p><strong>Dyson remonts Rīgā</strong> iLab servisā ietver baterijas maiņu, motora remontu, filtru un blīvējumu nomaiņu, dziļo tīrīšanu un diagnostiku, ja ierīce ir zaudējusi jaudu vai pārstājusi darboties korekti.</p>
<p>Pirms darba uzsākšanas pārbaudām ierīces stāvokli, saskaņojam remonta izmaksas un pēc remonta sniedzam <strong>90 dienu garantiju</strong> detaļām un darbam.</p>
      `,
      ru: `
<p><strong>Ремонт Dyson в Риге</strong> в сервисе iLab включает замену батареи, ремонт мотора, замену фильтров и уплотнителей, глубокую чистку и диагностику, если устройство потеряло мощность или работает некорректно.</p>
<p>Перед началом работ проверяем состояние устройства, согласовываем стоимость ремонта и после выполнения выдаём <strong>гарантию 90 дней</strong> на детали и работу.</p>
      `,
    },

    metaTitle: {
      lv: 'Dyson remonts Rīgā, baterija un motors | iLab',
      ru: 'Ремонт Dyson в Риге, батарея и мотор | iLab',
    },

    metaDescription: {
      lv: 'Dyson remonts Rīgā — baterijas maiņa, motora remonts, filtru un blīvējumu nomaiņa, diagnostika, skaidras cenas un 90 dienu garantija iLab servisā.',
      ru: 'Ремонт Dyson в Риге: замена батареи, ремонт мотора, фильтров и уплотнителей, диагностика, понятные цены и гарантия 90 дней в сервисе iLab.',
    },

    brands: [],
  },
];

function validateCategories(docs) {
  const categorySlugs = new Set();

  for (const doc of docs) {
    if (!doc.slug) {
      throw new Error(`Category missing slug: ${JSON.stringify(doc, null, 2)}`);
    }

    if (categorySlugs.has(doc.slug)) {
      throw new Error(`Duplicate category slug: ${doc.slug}`);
    }
    categorySlugs.add(doc.slug);

    const brandKeys = new Set();
    for (const brand of doc.brands || []) {
      if (!brand.key) {
        throw new Error(`Category ${doc.slug} has brand without key`);
      }
      if (brandKeys.has(brand.key)) {
        throw new Error(`Category ${doc.slug} has duplicate brand key: ${brand.key}`);
      }
      brandKeys.add(brand.key);

      const seriesKeys = new Set();
      for (const series of brand.series || []) {
        if (!series.key) {
          throw new Error(`Category ${doc.slug} / brand ${brand.key} has series without key`);
        }
        if (seriesKeys.has(series.key)) {
          throw new Error(
            `Category ${doc.slug} / brand ${brand.key} has duplicate series key: ${series.key}`
          );
        }
        seriesKeys.add(series.key);
      }
    }
  }
}

async function run() {
  console.log('=== Import categories to Firestore ===');
  console.log('Mode:', IMPORT_MODE);

  validateCategories(CATEGORY_DOCS);
  initFirebaseAdmin();

  const db = admin.firestore();

  const docs = CATEGORY_DOCS.map((doc) => ({
    docId: doc.slug,
    data: doc,
  }));

  console.log(`Docs to write: ${docs.length}`);

  async function shouldSkip(docRef) {
    if (IMPORT_MODE !== 'skip') return false;
    const snap = await docRef.get();
    return snap.exists;
  }

  const BATCH_LIMIT = 200;
  let written = 0;
  let skipped = 0;

  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const chunk = docs.slice(i, i + BATCH_LIMIT);
    const batch = db.batch();

    if (IMPORT_MODE === 'skip') {
      for (const d of chunk) {
        const ref = db.collection('categories').doc(d.docId);
        if (await shouldSkip(ref)) {
          skipped += 1;
          continue;
        }

        batch.set(
          ref,
          {
            ...d.data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        written += 1;
      }
    } else {
      for (const d of chunk) {
        const ref = db.collection('categories').doc(d.docId);
        batch.set(
          ref,
          {
            ...d.data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
      written += chunk.length;
    }

    await batch.commit();
    console.log(`Committed chunk ${i / BATCH_LIMIT + 1} (${chunk.length} items)`);
  }

  console.log('=== Done ===');
  console.log('Written:', written);
  console.log('Skipped:', skipped);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});