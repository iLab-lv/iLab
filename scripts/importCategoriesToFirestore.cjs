/* scripts/importCategoriesToFirestore.cjs
 *
 * Imports category taxonomy + generated category/brand SEO page content
 * into Firestore collection: categories.
 *
 * Source content was prepared from:
 * - categories.export.json
 * - ilab_categories_full_content_review.xlsx
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

const CATEGORY_DOCS = [
  {
    "id": "telefonu-remonts",
    "image": "/images/categories/telefonu_remonts.webp",
    "metaTitle": {
      "lv": "Telefonu remonts Rīgā, ekrāns un baterija | iLab",
      "ru": "Ремонт телефонов в Риге, экран и батарея | iLab"
    },
    "h1": {
      "ru": "Ремонт телефонов в Риге",
      "lv": "Telefonu remonts Rīgā"
    },
    "bodyHtml": {
      "lv": "<p><strong>Telefonu remonts Rīgā</strong> iLab servisā palīdz ātri atrisināt bojāta displeja, vājas baterijas, uzlādes ligzdas, kameras, skaļruņa vai mitruma bojājumu problēmas.</p>\n<p>Remontējam Apple iPhone, Samsung, Huawei, Sony, OnePlus, Xiaomi un citus tālruņus. Pirms darba uzsākšanas pārbaudām ierīci, izskaidrojam remonta iespējas un pēc darba sniedzam <strong>90 dienu garantiju</strong>.</p>",
      "ru": "<p><strong>Ремонт телефонов в Риге</strong> в сервисе iLab помогает быстро решить проблемы с разбитым экраном, слабой батареей, разъёмом зарядки, камерой, динамиком или повреждением после влаги.</p>\n<p>Ремонтируем Apple iPhone, Samsung, Huawei, Sony, OnePlus, Xiaomi и другие телефоны. Перед началом работ проверяем устройство, объясняем варианты ремонта и после выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
    },
    "type": "category",
    "metaDescription": {
      "lv": "Telefonu remonts Rīgā - ekrāna, baterijas, uzlādes ligzdas, kameras un mitruma bojājumu remonts, diagnostika un 90 dienu garantija iLab.",
      "ru": "Ремонт телефонов в Риге - экран, батарея, разъём зарядки, камера, ремонт после влаги, диагностика и гарантия 90 дней в iLab."
    },
    "slug": "telefonu-remonts",
    "lead": {
      "lv": "Telefonu ekrāni, baterijas, uzlādes ligzdas, kameras un citi biežākie remontdarbi. iLab servisā veicam diagnostiku, saskaņojam cenu un sniedzam 90 dienu garantiju.",
      "ru": "Экраны, аккумуляторы, разъёмы зарядки, камеры и другие частые ремонты телефонов. В iLab проводим диагностику, согласовываем цену и даём гарантию 90 дней."
    },
    "order": 2,
    "labels": {
      "ru": "Ремонт телефонов",
      "lv": "Telefonu remonts"
    },
    "brands": [
      {
        "key": "apple",
        "labels": {
          "lv": "Apple iPhone",
          "ru": "Apple iPhone"
        },
        "logo": "/images/logos/apple-logo.svg",
        "image": "/images/categories/iphone_remonts.webp",
        "order": 1,
        "route": {
          "brandPath": "/telefonu-remonts/apple",
          "dedicatedHubPath": "/iphone-remonts",
          "preferDedicatedHub": true
        },
        "page": {
          "variant": "iphoneHub",
          "h1": {
            "lv": "iPhone remonts Rīgā",
            "ru": "Ремонт iPhone в Риге"
          },
          "lead": {
            "lv": "iPhone remonts Rīgā - saplaisājis ekrāns, nolietota baterija, Face ID, kamera vai uzlādes problēmas. iLab pārbauda ierīci un dod 90 dienu garantiju.",
            "ru": "Ремонт iPhone в Риге - разбитый экран, слабая батарея, Face ID, камера или проблемы с зарядкой. iLab проверяет устройство и даёт гарантию 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>iPhone remonts Rīgā</strong> iLab servisā ietver displeja maiņu, baterijas nomaiņu, uzlādes ligzdas, kameras, skaļruņa un mitruma bojājumu remontu.</p>\n<p>Strādājam ar jaunākajiem un vecākiem iPhone modeļiem. Pirms remonta veicam diagnostiku, saskaņojam izmaksas un pēc darba sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт iPhone в Риге</strong> в сервисе iLab включает замену дисплея, аккумулятора, разъёма зарядки, камеры, динамика и ремонт после влаги.</p>\n<p>Работаем с новыми и более старыми моделями iPhone. Перед ремонтом проводим диагностику, согласовываем стоимость и после выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "iPhone remonts Rīgā, ekrāns un baterija | iLab",
            "ru": "Ремонт iPhone в Риге, экран и батарея | iLab"
          },
          "metaDescription": {
            "lv": "iPhone remonts Rīgā - ekrāna, baterijas, uzlādes, kameras un mitruma bojājumu remonts, diagnostika un 90 dienu garantija iLab.",
            "ru": "Ремонт iPhone в Риге - экран, батарея, зарядка, камера, ремонт после влаги, диагностика и гарантия 90 дней iLab."
          },
          "modelGrid": {
            "heading": {
              "lv": "Izvēlies savu iPhone modeli",
              "ru": "Выберите свою модель iPhone"
            },
            "intro": {
              "lv": "Atrodi vajadzīgo iPhone pēc nosaukuma vai atver sēriju un izvēlies savu modeli.",
              "ru": "Найдите нужный iPhone по названию или откройте серию и выберите свою модель."
            }
          },
          "sections": {
            "hasCustomGuide": true,
            "hasFaq": true,
            "hasProcess": true,
            "hasReviews": true,
            "hasWhy": true
          }
        },
        "series": [
          {
            "key": "iphone-17",
            "labels": {
              "lv": "iPhone 17 sērija",
              "ru": "Серия iPhone 17"
            },
            "order": 10
          },
          {
            "key": "iphone-16",
            "labels": {
              "lv": "iPhone 16 sērija",
              "ru": "Серия iPhone 16"
            },
            "order": 20
          },
          {
            "key": "iphone-15",
            "labels": {
              "lv": "iPhone 15 sērija",
              "ru": "Серия iPhone 15"
            },
            "order": 30
          },
          {
            "key": "iphone-14",
            "labels": {
              "lv": "iPhone 14 sērija",
              "ru": "Серия iPhone 14"
            },
            "order": 40
          },
          {
            "key": "iphone-se",
            "labels": {
              "lv": "iPhone SE",
              "ru": "iPhone SE"
            },
            "order": 50
          },
          {
            "key": "iphone-13",
            "labels": {
              "lv": "iPhone 13 sērija",
              "ru": "Серия iPhone 13"
            },
            "order": 60
          },
          {
            "key": "iphone-12",
            "labels": {
              "lv": "iPhone 12 sērija",
              "ru": "Серия iPhone 12"
            },
            "order": 70
          },
          {
            "key": "iphone-11",
            "labels": {
              "lv": "iPhone 11 sērija",
              "ru": "Серия iPhone 11"
            },
            "order": 80
          },
          {
            "key": "iphone-x",
            "labels": {
              "lv": "iPhone X sērija",
              "ru": "Серия iPhone X"
            },
            "order": 90
          },
          {
            "key": "iphone-legacy",
            "labels": {
              "lv": "Vecākie iPhone modeļi",
              "ru": "Старые модели iPhone"
            },
            "order": 999
          }
        ]
      },
      {
        "key": "samsung",
        "labels": {
          "lv": "Samsung",
          "ru": "Samsung"
        },
        "logo": "/images/logos/samsung-logo.svg",
        "image": "/images/categories/telefonu_remonts.webp",
        "order": 2,
        "route": {
          "brandPath": "/telefonu-remonts/samsung",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Samsung telefonu remonts Rīgā",
            "ru": "Ремонт телефонов Samsung в Риге"
          },
          "lead": {
            "lv": "Samsung telefonu remonts Rīgā - Galaxy ekrāni, baterijas, uzlādes ligzdas, kameras un mitruma bojājumi. Ātra pārbaude un 90 dienu garantija.",
            "ru": "Ремонт телефонов Samsung в Риге - экраны Galaxy, батареи, разъёмы зарядки, камеры и повреждения после влаги. Быстрая проверка и гарантия 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Samsung telefonu remonts</strong> iLab servisā piemērots Galaxy S, Galaxy A, Galaxy Z, Note un Xcover sērijas modeļiem ar displeja, baterijas vai uzlādes problēmām.</p>\n<p>Pārbaudām bojājumu, piedāvājam piemērotu risinājumu un pirms darba sākšanas saskaņojam cenu. Pēc remonta detaļām un darbam sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт телефонов Samsung</strong> в сервисе iLab подходит для моделей Galaxy S, Galaxy A, Galaxy Z, Note и Xcover с проблемами экрана, батареи или зарядки.</p>\n<p>Проверяем неисправность, предлагаем подходящее решение и заранее согласовываем цену. После ремонта на детали и работу действует <strong>гарантия 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Samsung telefonu remonts Rīgā | iLab",
            "ru": "Ремонт телефонов Samsung в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Samsung telefonu remonts Rīgā - Galaxy ekrāna, baterijas, uzlādes ligzdas, kameras un mitruma bojājumu remonts ar garantiju.",
            "ru": "Ремонт телефонов Samsung в Риге - экран Galaxy, батарея, зарядка, камера, ремонт после влаги и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": [
          {
            "key": "galaxy-s",
            "labels": {
              "lv": "Galaxy S sērija",
              "ru": "Серия Galaxy S"
            },
            "order": 100
          },
          {
            "key": "galaxy-a",
            "labels": {
              "lv": "Galaxy A sērija",
              "ru": "Серия Galaxy A"
            },
            "order": 110
          },
          {
            "key": "galaxy-z",
            "labels": {
              "lv": "Galaxy Z sērija",
              "ru": "Серия Galaxy Z"
            },
            "order": 120
          },
          {
            "key": "galaxy-note",
            "labels": {
              "lv": "Galaxy Note sērija",
              "ru": "Серия Galaxy Note"
            },
            "order": 130
          },
          {
            "key": "galaxy-xcover",
            "labels": {
              "lv": "Galaxy Xcover sērija",
              "ru": "Серия Galaxy Xcover"
            },
            "order": 140
          }
        ]
      },
      {
        "key": "huawei",
        "labels": {
          "lv": "Huawei",
          "ru": "Huawei"
        },
        "logo": "/images/logos/huawei-logo.svg",
        "image": "/images/categories/telefonu_remonts.webp",
        "order": 3,
        "route": {
          "brandPath": "/telefonu-remonts/huawei",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Huawei telefonu remonts Rīgā",
            "ru": "Ремонт телефонов Huawei в Риге"
          },
          "lead": {
            "lv": "Huawei telefonu remonts Rīgā - displeja maiņa, baterijas nomaiņa, uzlādes un kameras defektu novēršana. Diagnostika un garantija iLab servisā.",
            "ru": "Ремонт телефонов Huawei в Риге - замена дисплея, аккумулятора, устранение проблем с зарядкой и камерой. Диагностика и гарантия в iLab."
          },
          "bodyHtml": {
            "lv": "<p><strong>Huawei telefonu remonts</strong> iLab servisā palīdz, ja telefons neuzlādējas, ātri izlādējas, nereaģē ekrāns vai kamera vairs darbojas nekorekti.</p>\n<p>Veicam modeļa pārbaudi, precizējam bojājumu un saskaņojam remonta izmaksas. Pēc darba pabeigšanas klients saņem <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт телефонов Huawei</strong> в сервисе iLab помогает, если телефон не заряжается, быстро разряжается, экран не реагирует или камера работает некорректно.</p>\n<p>Проверяем модель, уточняем неисправность и согласовываем стоимость ремонта. После выполнения клиент получает <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Huawei telefonu remonts Rīgā | iLab",
            "ru": "Ремонт телефонов Huawei в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Huawei telefonu remonts Rīgā - ekrāns, baterija, uzlādes ligzda, kamera, diagnostika un 90 dienu garantija iLab servisā.",
            "ru": "Ремонт телефонов Huawei в Риге - экран, батарея, разъём зарядки, камера, диагностика и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "sony",
        "labels": {
          "lv": "Sony",
          "ru": "Sony"
        },
        "logo": "/images/logos/sony-logo.svg",
        "image": "/images/categories/telefonu_remonts.webp",
        "order": 4,
        "route": {
          "brandPath": "/telefonu-remonts/sony",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Sony telefonu remonts Rīgā",
            "ru": "Ремонт телефонов Sony в Риге"
          },
          "lead": {
            "lv": "Sony Xperia telefonu remonts Rīgā - ekrāna, baterijas, uzlādes ligzdas un kameras remonts. iLab veic diagnostiku un sniedz 90 dienu garantiju.",
            "ru": "Ремонт телефонов Sony Xperia в Риге - экран, батарея, разъём зарядки и камера. iLab выполняет диагностику и даёт гарантию 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Sony telefonu remonts</strong> iLab servisā paredzēts Xperia modeļiem ar saplaisājušu displeju, nolietotu bateriju, vāju uzlādi vai mitruma radītiem bojājumiem.</p>\n<p>Pirms remonta pārbaudām ierīci un izskaidrojam, kuru detaļu nepieciešams mainīt vai remontēt. Darbam un uzstādītajām detaļām tiek dota <strong>90 dienu garantija</strong>.</p>",
            "ru": "<p><strong>Ремонт телефонов Sony</strong> в сервисе iLab подходит для моделей Xperia с разбитым дисплеем, изношенной батареей, слабой зарядкой или повреждением после влаги.</p>\n<p>Перед ремонтом проверяем устройство и объясняем, какую деталь нужно заменить или восстановить. На работу и установленные детали действует <strong>гарантия 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Sony Xperia remonts Rīgā | iLab",
            "ru": "Ремонт Sony Xperia в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Sony Xperia remonts Rīgā - ekrāna, baterijas, uzlādes ligzdas, kameras un mitruma bojājumu remonts ar garantiju.",
            "ru": "Ремонт Sony Xperia в Риге - экран, батарея, зарядка, камера, ремонт после влаги и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "oneplus",
        "labels": {
          "lv": "OnePlus",
          "ru": "OnePlus"
        },
        "logo": "/images/logos/oneplus-logo.svg",
        "image": "/images/categories/telefonu_remonts.webp",
        "order": 5,
        "route": {
          "brandPath": "/telefonu-remonts/oneplus",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "OnePlus telefonu remonts Rīgā",
            "ru": "Ремонт телефонов OnePlus в Риге"
          },
          "lead": {
            "lv": "OnePlus telefonu remonts Rīgā - displejs, baterija, uzlāde, kameras un programmatūras pārbaude. Skaidras izmaksas un 90 dienu garantija.",
            "ru": "Ремонт телефонов OnePlus в Риге - дисплей, батарея, зарядка, камеры и проверка программной части. Понятная цена и гарантия 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>OnePlus telefonu remonts</strong> iLab servisā palīdz atjaunot ierīci pēc kritiena, nolietotas baterijas, uzlādes problēmām vai kameras defektiem.</p>\n<p>Diagnostikas laikā nosakām bojājuma iemeslu un pirms darba sākšanas saskaņojam cenu. Pēc remonta veicam testēšanu un sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт телефонов OnePlus</strong> в сервисе iLab помогает восстановить устройство после падения, износа батареи, проблем с зарядкой или неисправности камеры.</p>\n<p>Во время диагностики определяем причину поломки и заранее согласовываем цену. После ремонта тестируем устройство и выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "OnePlus telefonu remonts Rīgā | iLab",
            "ru": "Ремонт телефонов OnePlus в Риге | iLab"
          },
          "metaDescription": {
            "lv": "OnePlus telefonu remonts Rīgā - displeja, baterijas, uzlādes, kameras un mitruma bojājumu remonts ar 90 dienu garantiju.",
            "ru": "Ремонт телефонов OnePlus в Риге - дисплей, батарея, зарядка, камера, ремонт после влаги и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "xiaomi",
        "labels": {
          "lv": "Xiaomi",
          "ru": "Xiaomi"
        },
        "logo": "/images/logos/xiaomi-logo.svg",
        "image": "/images/categories/telefonu_remonts.webp",
        "order": 6,
        "route": {
          "brandPath": "/telefonu-remonts/xiaomi",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Xiaomi telefonu remonts Rīgā",
            "ru": "Ремонт телефонов Xiaomi в Риге"
          },
          "lead": {
            "lv": "Xiaomi un Redmi telefonu remonts Rīgā - ekrāna maiņa, baterija, uzlādes ligzda un kameras remonts. Ātra diagnostika un 90 dienu garantija.",
            "ru": "Ремонт телефонов Xiaomi и Redmi в Риге - замена экрана, батарея, разъём зарядки и камера. Быстрая диагностика и гарантия 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Xiaomi telefonu remonts</strong> iLab servisā ietver Redmi Note, Redmi C un citu Xiaomi modeļu displeja, baterijas, uzlādes ligzdas un kameras remontu.</p>\n<p>Ja telefons ir kritis, neuzlādējas vai ātri izlādējas, veicam pārbaudi un piedāvājam remonta risinājumu. Pēc darba sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт телефонов Xiaomi</strong> в сервисе iLab включает ремонт дисплея, батареи, разъёма зарядки и камеры у Redmi Note, Redmi C и других моделей Xiaomi.</p>\n<p>Если телефон падал, не заряжается или быстро разряжается, проводим проверку и предлагаем вариант ремонта. После работы выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Xiaomi un Redmi remonts Rīgā | iLab",
            "ru": "Ремонт Xiaomi и Redmi в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Xiaomi un Redmi remonts Rīgā - ekrāns, baterija, uzlādes ligzda, kamera, diagnostika un 90 dienu garantija iLab.",
            "ru": "Ремонт Xiaomi и Redmi в Риге - экран, батарея, разъём зарядки, камера, диагностика и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": [
          {
            "key": "redmi-note",
            "labels": {
              "lv": "Redmi Note sērija",
              "ru": "Серия Redmi Note"
            },
            "order": 0
          },
          {
            "key": "redmi-c",
            "labels": {
              "lv": "C sērija",
              "ru": "Серия Redmi C"
            },
            "order": 10
          }
        ]
      }
    ],
    "updatedAt": "2026-04-09T18:44:50.211Z"
  },
  {
    "id": "plansetdatoru-remonts",
    "image": "/images/categories/plansetdatoru-remonts.webp",
    "metaTitle": {
      "lv": "Planšetdatoru remonts Rīgā, ekrāns un baterija | iLab",
      "ru": "Ремонт планшетов в Риге, экран и батарея | iLab"
    },
    "h1": {
      "ru": "Ремонт планшетов в Риге",
      "lv": "Planšetdatoru remonts Rīgā"
    },
    "bodyHtml": {
      "lv": "<p><strong>Planšetdatoru remonts Rīgā</strong> iLab servisā ietver ekrāna maiņu, baterijas nomaiņu, uzlādes problēmu novēršanu, kameras remontu un diagnostiku pēc kritiena vai mitruma.</p>\n<p>Strādājam ar Apple iPad, Samsung Galaxy Tab, Lenovo, Xiaomi un Huawei planšetdatoriem. Pirms remonta saskaņojam izmaksas, bet pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
      "ru": "<p><strong>Ремонт планшетов в Риге</strong> в сервисе iLab включает замену экрана, аккумулятора, устранение проблем с зарядкой, ремонт камеры и диагностику после падения или влаги.</p>\n<p>Работаем с Apple iPad, Samsung Galaxy Tab, Lenovo, Xiaomi и Huawei планшетами. Перед ремонтом согласовываем стоимость, а после выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
    },
    "type": "category",
    "metaDescription": {
      "lv": "Planšetdatoru remonts Rīgā - iPad, Samsung, Lenovo, Xiaomi un Huawei ekrāna, baterijas, uzlādes un kameras remonts ar garantiju.",
      "ru": "Ремонт планшетов в Риге - iPad, Samsung, Lenovo, Xiaomi и Huawei, экран, батарея, зарядка, камера, диагностика и гарантия."
    },
    "slug": "plansetdatoru-remonts",
    "lead": {
      "lv": "Planšetdatoru displeji, baterijas, uzlādes ligzdas un kameras remonts Apple iPad, Samsung, Lenovo, Xiaomi un citiem modeļiem. Skaidras cenas un 90 dienu garantija.",
      "ru": "Ремонт дисплеев, батарей, разъёмов зарядки и камер планшетов Apple iPad, Samsung, Lenovo, Xiaomi и других моделей. Понятные цены и гарантия 90 дней."
    },
    "order": 3,
    "labels": {
      "ru": "Ремонт планшетов",
      "lv": "Planšetdatoru remonts"
    },
    "updatedAt": "2026-03-24T01:31:00.607Z",
    "brands": [
      {
        "order": 1,
        "route": {
          "preferDedicatedHub": true,
          "dedicatedHubPath": "/plansetdatoru-remonts/ipad",
          "brandPath": "/plansetdatoru-remonts/apple"
        },
        "image": "/images/categories/plansetdatoru-remonts.webp",
        "key": "ipad",
        "labels": {
          "lv": "Apple iPad",
          "ru": "Apple iPad"
        },
        "logo": "/images/logos/apple-logo.svg",
        "series": [
          {
            "key": "ipad-pro",
            "labels": {
              "lv": "iPad Pro",
              "ru": "iPad Pro"
            },
            "order": 100
          },
          {
            "order": 110,
            "key": "ipad-air",
            "labels": {
              "lv": "iPad Air",
              "ru": "iPad Air"
            }
          },
          {
            "order": 120,
            "key": "ipad-mini",
            "labels": {
              "ru": "iPad mini",
              "lv": "iPad mini"
            }
          },
          {
            "order": 130,
            "labels": {
              "ru": "iPad",
              "lv": "iPad"
            },
            "key": "ipad"
          }
        ],
        "page": {
          "variant": "ipadHub",
          "lead": {
            "lv": "iPad remonts Rīgā - displeja maiņa, baterija, uzlādes ligzda, kameras un mitruma bojājumu diagnostika. iLab sniedz 90 dienu garantiju.",
            "ru": "Ремонт iPad в Риге - замена дисплея, батарея, разъём зарядки, камеры и диагностика после влаги. iLab даёт гарантию 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>iPad remonts Rīgā</strong> iLab servisā ietver iPad Pro, iPad Air, iPad mini un klasisko iPad modeļu ekrāna, baterijas un uzlādes mezglu remontu.</p>\n<p>Pirms darba pārbaudām planšetdatoru, precizējam detaļu pieejamību un saskaņojam izmaksas. Pēc remonta tiek veikta testēšana un sniegta <strong>90 dienu garantija</strong>.</p>",
            "ru": "<p><strong>Ремонт iPad в Риге</strong> в сервисе iLab включает ремонт экрана, батареи и зарядного узла у iPad Pro, iPad Air, iPad mini и классических моделей iPad.</p>\n<p>Перед работой проверяем планшет, уточняем наличие деталей и согласовываем стоимость. После ремонта выполняем тестирование и выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "iPad remonts Rīgā, ekrāns un baterija | iLab",
            "ru": "Ремонт iPad в Риге, экран и батарея | iLab"
          },
          "metaDescription": {
            "lv": "iPad remonts Rīgā - iPad Pro, Air, mini ekrāna, baterijas, uzlādes un kameras remonts, diagnostika un garantija.",
            "ru": "Ремонт iPad в Риге - iPad Pro, Air, mini, экран, батарея, зарядка, камера, диагностика и гарантия."
          },
          "h1": {
            "lv": "iPad remonts Rīgā",
            "ru": "Ремонт iPad в Риге"
          }
        }
      },
      {
        "page": {
          "variant": "brand",
          "lead": {
            "lv": "Samsung Galaxy Tab remonts Rīgā - ekrāni, baterijas, uzlādes ligzdas un kameras problēmas. Diagnostika, saskaņota cena un 90 dienu garantija.",
            "ru": "Ремонт Samsung Galaxy Tab в Риге - экраны, батареи, разъёмы зарядки и проблемы камеры. Диагностика, согласованная цена и гарантия 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Samsung planšetdatoru remonts</strong> iLab servisā palīdz Galaxy Tab modeļiem pēc kritiena, ar bojātu displeju, vāju bateriju vai nestabilu uzlādi.</p>\n<p>Veicam diagnostiku, pārbaudām detaļu pieejamību un pirms remonta saskaņojam izmaksas. Darbam un detaļām sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт планшетов Samsung</strong> в сервисе iLab помогает моделям Galaxy Tab после падения, с повреждённым дисплеем, слабой батареей или нестабильной зарядкой.</p>\n<p>Проводим диагностику, проверяем наличие деталей и заранее согласовываем стоимость. На работу и детали действует <strong>гарантия 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Samsung Galaxy Tab remonts Rīgā | iLab",
            "ru": "Ремонт Samsung Galaxy Tab в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Samsung Galaxy Tab remonts Rīgā - ekrāna, baterijas, uzlādes, kameras un mitruma bojājumu remonts ar garantiju.",
            "ru": "Ремонт Samsung Galaxy Tab в Риге - экран, батарея, зарядка, камера, ремонт после влаги и гарантия."
          },
          "h1": {
            "lv": "Samsung Galaxy Tab remonts Rīgā",
            "ru": "Ремонт Samsung Galaxy Tab в Риге"
          }
        },
        "labels": {
          "lv": "Samsung Galaxy Tab",
          "ru": "Samsung Galaxy Tab"
        },
        "logo": "/images/logos/samsung-logo.svg",
        "series": [],
        "key": "samsung",
        "route": {
          "brandPath": "/plansetdatoru-remonts/samsung"
        },
        "image": "/images/categories/plansetdatoru-remonts.webp",
        "order": 2
      },
      {
        "key": "lenovo",
        "image": "/images/categories/plansetdatoru-remonts.webp",
        "route": {
          "brandPath": "/plansetdatoru-remonts/lenovo"
        },
        "order": 3,
        "page": {
          "variant": "brand",
          "lead": {
            "lv": "Lenovo planšetdatoru remonts Rīgā - displejs, baterija, uzlāde, programmatūras pārbaude un mitruma diagnostika. 90 dienu garantija iLab servisā.",
            "ru": "Ремонт планшетов Lenovo в Риге - дисплей, батарея, зарядка, проверка ПО и диагностика после влаги. Гарантия 90 дней в iLab."
          },
          "bodyHtml": {
            "lv": "<p><strong>Lenovo planšetdatoru remonts</strong> iLab servisā ietver skārienekrāna, baterijas, uzlādes ligzdas un citu biežāko bojājumu novēršanu.</p>\n<p>Pārbaudām ierīci, nosakām problēmas cēloni un pirms remonta saskaņojam cenu. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт планшетов Lenovo</strong> в сервисе iLab включает устранение частых проблем с сенсорным экраном, батареей, разъёмом зарядки и другими узлами.</p>\n<p>Проверяем устройство, определяем причину неисправности и до ремонта согласовываем цену. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Lenovo planšetdatoru remonts Rīgā | iLab",
            "ru": "Ремонт планшетов Lenovo в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Lenovo planšetdatoru remonts Rīgā - displejs, baterija, uzlāde, diagnostika un 90 dienu garantija iLab servisā.",
            "ru": "Ремонт планшетов Lenovo в Риге - дисплей, батарея, зарядка, диагностика и гарантия 90 дней в iLab."
          },
          "h1": {
            "lv": "Lenovo planšetdatoru remonts Rīgā",
            "ru": "Ремонт планшетов Lenovo в Риге"
          }
        },
        "logo": "/images/logos/lenovo-logo.svg",
        "series": [],
        "labels": {
          "lv": "Lenovo",
          "ru": "Lenovo"
        }
      },
      {
        "page": {
          "variant": "brand",
          "lead": {
            "lv": "Xiaomi planšetdatoru remonts Rīgā - ekrāna maiņa, baterija, uzlādes ligzda un kameras remonts. Ātra pārbaude un 90 dienu garantija.",
            "ru": "Ремонт планшетов Xiaomi в Риге - замена экрана, батарея, разъём зарядки и камера. Быстрая проверка и гарантия 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Xiaomi planšetdatoru remonts</strong> iLab servisā paredzēts modeļiem ar bojātu displeju, lēnu vai nestabilu uzlādi, nolietotu bateriju vai kameras defektu.</p>\n<p>Pirms darba nosakām bojājumu un saskaņojam remonta izmaksas. Pēc remonta pārbaudām planšetdatoru un sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт планшетов Xiaomi</strong> в сервисе iLab подходит для моделей с повреждённым дисплеем, медленной или нестабильной зарядкой, изношенной батареей или неисправной камерой.</p>\n<p>Перед работой определяем поломку и согласовываем стоимость ремонта. После ремонта проверяем планшет и выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Xiaomi planšetdatoru remonts Rīgā | iLab",
            "ru": "Ремонт планшетов Xiaomi в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Xiaomi planšetdatoru remonts Rīgā - ekrāns, baterija, uzlādes ligzda, kamera, diagnostika un 90 dienu garantija.",
            "ru": "Ремонт планшетов Xiaomi в Риге - экран, батарея, разъём зарядки, камера, диагностика и гарантия 90 дней."
          },
          "h1": {
            "lv": "Xiaomi planšetdatoru remonts Rīgā",
            "ru": "Ремонт планшетов Xiaomi в Риге"
          }
        },
        "logo": "/images/logos/xiaomi-logo.svg",
        "series": [],
        "labels": {
          "ru": "Xiaomi",
          "lv": "Xiaomi"
        },
        "order": 4,
        "key": "xiaomi",
        "route": {
          "brandPath": "/plansetdatoru-remonts/xiaomi"
        },
        "image": "/images/categories/plansetdatoru-remonts.webp"
      },
      {
        "page": {
          "variant": "brand",
          "lead": {
            "lv": "Huawei planšetdatoru remonts Rīgā - displejs, baterija, uzlādes ligzda, kamera un mitruma bojājumi. Diagnostika un 90 dienu garantija.",
            "ru": "Ремонт планшетов Huawei в Риге - дисплей, батарея, разъём зарядки, камера и повреждения после влаги. Диагностика и гарантия 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Huawei planšetdatoru remonts</strong> iLab servisā palīdz, ja planšete neuzlādējas, ātri izlādējas, ir saplaisājis ekrāns vai pēc kritiena nedarbojas korekti.</p>\n<p>Veicam pārbaudi, saskaņojam detaļu maiņu vai remontu un pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт планшетов Huawei</strong> в сервисе iLab помогает, если планшет не заряжается, быстро разряжается, имеет разбитый экран или некорректно работает после падения.</p>\n<p>Проводим проверку, согласовываем замену деталей или ремонт и после выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Huawei planšetdatoru remonts Rīgā | iLab",
            "ru": "Ремонт планшетов Huawei в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Huawei planšetdatoru remonts Rīgā - displejs, baterija, uzlāde, kamera, mitruma diagnostika un 90 dienu garantija.",
            "ru": "Ремонт планшетов Huawei в Риге - дисплей, батарея, зарядка, камера, диагностика после влаги и гарантия."
          },
          "h1": {
            "lv": "Huawei planšetdatoru remonts Rīgā",
            "ru": "Ремонт планшетов Huawei в Риге"
          }
        },
        "labels": {
          "lv": "Huawei",
          "ru": "Huawei"
        },
        "logo": "/images/logos/huawei-logo.svg",
        "series": [],
        "order": 5,
        "key": "huawei",
        "route": {
          "brandPath": "/plansetdatoru-remonts/huawei"
        },
        "image": "/images/categories/plansetdatoru-remonts.webp"
      }
    ]
  },
  {
    "id": "datoru-remonts",
    "image": "/images/categories/datoru_remonts.webp",
    "metaTitle": {
      "lv": "Datoru remonts Rīgā, MacBook un portatīvie | iLab",
      "ru": "Ремонт компьютеров в Риге, MacBook и ноутбуки | iLab"
    },
    "h1": {
      "ru": "Ремонт компьютеров в Риге",
      "lv": "Datoru remonts Rīgā"
    },
    "bodyHtml": {
      "lv": "<p><strong>Datoru remonts Rīgā</strong> iLab servisā aptver MacBook, iMac, Mac Pro, Lenovo, HP, MSI, Dell, Asus, Acer un citu datoru diagnostiku un remontu.</p>\n<p>Novēršam ekrāna, tastatūras, uzlādes, pārkaršanas, mitruma un veiktspējas problēmas. Pirms remonta saskaņojam izmaksas un pēc darba sniedzam <strong>90 dienu garantiju</strong>.</p>",
      "ru": "<p><strong>Ремонт компьютеров в Риге</strong> в сервисе iLab включает диагностику и ремонт MacBook, iMac, Mac Pro, Lenovo, HP, MSI, Dell, Asus, Acer и других компьютеров.</p>\n<p>Устраняем проблемы с экраном, клавиатурой, зарядкой, перегревом, влагой и производительностью. Перед ремонтом согласовываем стоимость и после выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
    },
    "type": "category",
    "metaDescription": {
      "lv": "Datoru remonts Rīgā - MacBook, iMac, portatīvie un stacionārie datori, ekrāns, tastatūra, uzlāde, SSD/RAM un garantija.",
      "ru": "Ремонт компьютеров в Риге - MacBook, iMac, ноутбуки и ПК, экран, клавиатура, зарядка, SSD/RAM и гарантия."
    },
    "slug": "datoru-remonts",
    "lead": {
      "lv": "Portatīvo un stacionāro datoru remonts Rīgā - ekrāni, tastatūras, uzlāde, mātesplates diagnostika, SSD/RAM uzlabojumi un 90 dienu garantija.",
      "ru": "Ремонт ноутбуков и настольных компьютеров в Риге - экраны, клавиатуры, зарядка, диагностика плат, апгрейд SSD/RAM и гарантия 90 дней."
    },
    "order": 4,
    "labels": {
      "ru": "Ремонт компьютеров",
      "lv": "Datoru remonts"
    },
    "brands": [
      {
        "key": "macbook",
        "labels": {
          "lv": "MacBook",
          "ru": "MacBook"
        },
        "logo": "/images/logos/apple-logo.svg",
        "image": "/images/categories/datoru_remonts.webp",
        "order": 1,
        "route": {
          "brandPath": "/datoru-remonts/macbook",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "MacBook remonts Rīgā",
            "ru": "Ремонт MacBook в Риге"
          },
          "lead": {
            "lv": "MacBook remonts Rīgā - ekrāns, baterija, tastatūra, uzlāde, mitruma diagnostika un veiktspējas pārbaude. iLab sniedz 90 dienu garantiju.",
            "ru": "Ремонт MacBook в Риге - экран, батарея, клавиатура, зарядка, диагностика после влаги и проверка производительности. Гарантия iLab 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>MacBook remonts</strong> iLab servisā ietver MacBook Air un MacBook Pro ekrāna, baterijas, tastatūras, skārienpaliktņa un uzlādes mezgla remontu.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт MacBook</strong> в сервисе iLab включает ремонт экрана, батареи, клавиатуры, трекпада и зарядного узла у MacBook Air и MacBook Pro.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "MacBook remonts Rīgā | iLab",
            "ru": "Ремонт MacBook в Риге | iLab"
          },
          "metaDescription": {
            "lv": "MacBook remonts Rīgā - Air un Pro ekrāns, baterija, tastatūra, uzlāde, mitruma diagnostika un 90 dienu garantija.",
            "ru": "Ремонт MacBook в Риге - Air и Pro, экран, батарея, клавиатура, зарядка, диагностика после влаги и гарантия."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": [
          {
            "key": "macbook-air",
            "labels": {
              "lv": "MacBook Air sērija",
              "ru": "Серия MacBook Air"
            },
            "order": 0
          },
          {
            "key": "macbook-pro",
            "labels": {
              "lv": "MacBook Pro sērija",
              "ru": "Серия MacBook Pro"
            },
            "order": 10
          }
        ]
      },
      {
        "key": "imac",
        "labels": {
          "lv": "iMac",
          "ru": "iMac"
        },
        "logo": "/images/logos/apple-logo.svg",
        "image": "/images/categories/imac_remonts.webp",
        "order": 2,
        "route": {
          "brandPath": "/datoru-remonts/imac",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "iMac remonts Rīgā",
            "ru": "Ремонт iMac в Риге"
          },
          "lead": {
            "lv": "iMac remonts Rīgā - displejs, barošana, SSD uzlabojumi, sistēmas pārbaude un datu drošība. Diagnostika un 90 dienu garantija.",
            "ru": "Ремонт iMac в Риге - дисплей, питание, апгрейд SSD, проверка системы и безопасность данных. Диагностика и гарантия 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>iMac remonts</strong> iLab servisā palīdz, ja dators neieslēdzas, darbojas lēni, pārkarst, rada attēla problēmas vai nepieciešams SSD uzlabojums.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт iMac</strong> в сервисе iLab помогает, если компьютер не включается, работает медленно, перегревается, показывает проблемы с изображением или требует апгрейда SSD.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "iMac remonts Rīgā | iLab",
            "ru": "Ремонт iMac в Риге | iLab"
          },
          "metaDescription": {
            "lv": "iMac remonts Rīgā - diagnostika, displejs, barošana, SSD uzlabojumi, pārkaršana un 90 dienu garantija iLab.",
            "ru": "Ремонт iMac в Риге - диагностика, дисплей, питание, SSD, перегрев и гарантия 90 дней iLab."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "mac-pro",
        "labels": {
          "lv": "Mac Pro",
          "ru": "Mac Pro"
        },
        "logo": "/images/logos/apple-logo.svg",
        "image": "/images/categories/macpro_remonts.webp",
        "order": 3,
        "route": {
          "brandPath": "/datoru-remonts/mac-pro",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Mac Pro remonts Rīgā",
            "ru": "Ремонт Mac Pro в Риге"
          },
          "lead": {
            "lv": "Mac Pro remonts Rīgā - diagnostika, barošanas problēmas, veiktspēja, datu nesēji un komponentu pārbaude. 90 dienu garantija iLab.",
            "ru": "Ремонт Mac Pro в Риге - диагностика, питание, производительность, накопители и проверка компонентов. Гарантия iLab 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Mac Pro remonts</strong> iLab servisā paredzēts profesionāliem Apple datoriem ar startēšanas, barošanas, datu nesēju vai veiktspējas problēmām.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт Mac Pro</strong> в сервисе iLab подходит для профессиональных компьютеров Apple с проблемами запуска, питания, накопителей или производительности.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Mac Pro remonts Rīgā | iLab",
            "ru": "Ремонт Mac Pro в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Mac Pro remonts Rīgā - diagnostika, barošana, datu nesēji, veiktspējas problēmas un 90 dienu garantija.",
            "ru": "Ремонт Mac Pro в Риге - диагностика, питание, накопители, проблемы производительности и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "lenovo",
        "labels": {
          "lv": "Lenovo",
          "ru": "Lenovo"
        },
        "logo": "/images/logos/lenovo-logo.svg",
        "image": "/images/categories/datoru_remonts.webp",
        "order": 4,
        "route": {
          "brandPath": "/datoru-remonts/lenovo",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Lenovo datoru remonts Rīgā",
            "ru": "Ремонт компьютеров Lenovo в Риге"
          },
          "lead": {
            "lv": "Lenovo datoru remonts Rīgā - ekrāns, tastatūra, uzlāde, eņģes, SSD/RAM uzlabojumi un diagnostika. iLab garantija 90 dienas.",
            "ru": "Ремонт компьютеров Lenovo в Риге - экран, клавиатура, зарядка, петли, апгрейд SSD/RAM и диагностика. Гарантия iLab 90 дней."
          },
          "bodyHtml": {
            "lv": "<p><strong>Lenovo datoru remonts</strong> iLab servisā palīdz ThinkPad, IdeaPad, Yoga un citiem Lenovo modeļiem ar ekrāna, tastatūras vai uzlādes defektiem.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт компьютеров Lenovo</strong> в сервисе iLab помогает моделям ThinkPad, IdeaPad, Yoga и другим Lenovo с проблемами экрана, клавиатуры или зарядки.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Lenovo datoru remonts Rīgā | iLab",
            "ru": "Ремонт компьютеров Lenovo в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Lenovo datoru remonts Rīgā - ekrāns, tastatūra, uzlāde, eņģes, SSD/RAM, diagnostika un 90 dienu garantija.",
            "ru": "Ремонт Lenovo в Риге - экран, клавиатура, зарядка, петли, SSD/RAM, диагностика и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "hp",
        "labels": {
          "lv": "HP",
          "ru": "HP"
        },
        "logo": "/images/logos/hp-logo.svg",
        "image": "/images/categories/datoru_remonts.webp",
        "order": 5,
        "route": {
          "brandPath": "/datoru-remonts/hp",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "HP datoru remonts Rīgā",
            "ru": "Ремонт компьютеров HP в Риге"
          },
          "lead": {
            "lv": "HP datoru remonts Rīgā - portatīvo datoru ekrāni, tastatūras, uzlāde, pārkaršana un SSD/RAM uzlabojumi ar garantiju.",
            "ru": "Ремонт компьютеров HP в Риге - экраны ноутбуков, клавиатуры, зарядка, перегрев и апгрейд SSD/RAM с гарантией."
          },
          "bodyHtml": {
            "lv": "<p><strong>HP datoru remonts</strong> iLab servisā aptver Pavilion, Envy, EliteBook, ProBook un citu HP datoru diagnostiku un remontu.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт компьютеров HP</strong> в сервисе iLab включает диагностику и ремонт Pavilion, Envy, EliteBook, ProBook и других компьютеров HP.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "HP datoru remonts Rīgā | iLab",
            "ru": "Ремонт компьютеров HP в Риге | iLab"
          },
          "metaDescription": {
            "lv": "HP datoru remonts Rīgā - ekrāns, tastatūra, uzlāde, pārkaršana, SSD/RAM uzlabojumi un 90 dienu garantija.",
            "ru": "Ремонт HP в Риге - экран, клавиатура, зарядка, перегрев, SSD/RAM и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "msi",
        "labels": {
          "lv": "MSI",
          "ru": "MSI"
        },
        "logo": "/images/logos/msi-logo.svg",
        "image": "/images/categories/datoru_remonts.webp",
        "order": 6,
        "route": {
          "brandPath": "/datoru-remonts/msi",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "MSI datoru remonts Rīgā",
            "ru": "Ремонт компьютеров MSI в Риге"
          },
          "lead": {
            "lv": "MSI datoru remonts Rīgā - spēļu portatīvie datori, dzesēšana, ekrāns, tastatūra, uzlāde un veiktspējas pārbaude.",
            "ru": "Ремонт компьютеров MSI в Риге - игровые ноутбуки, охлаждение, экран, клавиатура, зарядка и проверка производительности."
          },
          "bodyHtml": {
            "lv": "<p><strong>MSI datoru remonts</strong> iLab servisā īpaši noder spēļu portatīvajiem datoriem ar pārkaršanu, trokšņainu dzesēšanu, ekrāna vai uzlādes problēmām.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт компьютеров MSI</strong> в сервисе iLab особенно актуален для игровых ноутбуков с перегревом, шумным охлаждением, проблемами экрана или зарядки.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "MSI datoru remonts Rīgā | iLab",
            "ru": "Ремонт компьютеров MSI в Риге | iLab"
          },
          "metaDescription": {
            "lv": "MSI datoru remonts Rīgā - spēļu portatīvie, dzesēšana, ekrāns, tastatūra, uzlāde, diagnostika un garantija.",
            "ru": "Ремонт MSI в Риге - игровые ноутбуки, охлаждение, экран, клавиатура, зарядка, диагностика и гарантия."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "dell",
        "labels": {
          "lv": "Dell",
          "ru": "Dell"
        },
        "logo": "/images/logos/dell-logo.svg",
        "image": "/images/categories/datoru_remonts.webp",
        "order": 7,
        "route": {
          "brandPath": "/datoru-remonts/dell",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Dell datoru remonts Rīgā",
            "ru": "Ремонт компьютеров Dell в Риге"
          },
          "lead": {
            "lv": "Dell datoru remonts Rīgā - XPS, Inspiron, Latitude un citu modeļu ekrāni, tastatūras, uzlāde un SSD/RAM uzlabojumi.",
            "ru": "Ремонт компьютеров Dell в Риге - XPS, Inspiron, Latitude и другие модели, экраны, клавиатуры, зарядка и SSD/RAM."
          },
          "bodyHtml": {
            "lv": "<p><strong>Dell datoru remonts</strong> iLab servisā paredzēts XPS, Inspiron, Latitude un citiem modeļiem ar displeja, tastatūras, eņģu vai uzlādes defektiem.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт компьютеров Dell</strong> в сервисе iLab подходит для XPS, Inspiron, Latitude и других моделей с проблемами дисплея, клавиатуры, петель или зарядки.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Dell datoru remonts Rīgā | iLab",
            "ru": "Ремонт компьютеров Dell в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Dell datoru remonts Rīgā - XPS, Inspiron, Latitude, ekrāns, tastatūra, uzlāde, eņģes un 90 dienu garantija.",
            "ru": "Ремонт Dell в Риге - XPS, Inspiron, Latitude, экран, клавиатура, зарядка, петли и гарантия 90 дней."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "asus",
        "labels": {
          "lv": "Asus",
          "ru": "Asus"
        },
        "logo": "/images/logos/asus-logo.svg",
        "image": "/images/categories/datoru_remonts.webp",
        "order": 8,
        "route": {
          "brandPath": "/datoru-remonts/asus",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Asus datoru remonts Rīgā",
            "ru": "Ремонт компьютеров Asus в Риге"
          },
          "lead": {
            "lv": "Asus datoru remonts Rīgā - ZenBook, VivoBook, ROG un TUF ekrāni, tastatūras, uzlāde, dzesēšana un diagnostika.",
            "ru": "Ремонт компьютеров Asus в Риге - ZenBook, VivoBook, ROG и TUF, экраны, клавиатуры, зарядка, охлаждение и диагностика."
          },
          "bodyHtml": {
            "lv": "<p><strong>Asus datoru remonts</strong> iLab servisā palīdz ZenBook, VivoBook, ROG, TUF un citiem Asus portatīvajiem ar ekrāna, dzesēšanas vai uzlādes problēmām.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт компьютеров Asus</strong> в сервисе iLab помогает ZenBook, VivoBook, ROG, TUF и другим ноутбукам Asus с проблемами экрана, охлаждения или зарядки.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Asus datoru remonts Rīgā | iLab",
            "ru": "Ремонт компьютеров Asus в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Asus datoru remonts Rīgā - ZenBook, VivoBook, ROG, TUF, ekrāns, tastatūra, uzlāde, dzesēšana un garantija.",
            "ru": "Ремонт Asus в Риге - ZenBook, VivoBook, ROG, TUF, экран, клавиатура, зарядка, охлаждение и гарантия."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      },
      {
        "key": "acer",
        "labels": {
          "lv": "Acer",
          "ru": "Acer"
        },
        "logo": "/images/logos/acer-logo.svg",
        "image": "/images/categories/datoru_remonts.webp",
        "order": 9,
        "route": {
          "brandPath": "/datoru-remonts/acer",
          "dedicatedHubPath": "",
          "preferDedicatedHub": false
        },
        "page": {
          "variant": "brand",
          "h1": {
            "lv": "Acer datoru remonts Rīgā",
            "ru": "Ремонт компьютеров Acer в Риге"
          },
          "lead": {
            "lv": "Acer datoru remonts Rīgā - Aspire, Swift, Nitro un Predator ekrāni, tastatūras, uzlāde, dzesēšana un SSD/RAM uzlabojumi.",
            "ru": "Ремонт компьютеров Acer в Риге - Aspire, Swift, Nitro и Predator, экраны, клавиатуры, зарядка, охлаждение и SSD/RAM."
          },
          "bodyHtml": {
            "lv": "<p><strong>Acer datoru remonts</strong> iLab servisā paredzēts Aspire, Swift, Nitro, Predator un citiem modeļiem ar ekrāna, tastatūras, uzlādes vai pārkaršanas problēmām.</p>\n<p>Pirms remonta pārbaudām datoru, izskaidrojam iespējamos risinājumus un saskaņojam izmaksas. Pēc darba pabeigšanas sniedzam <strong>90 dienu garantiju</strong>.</p>",
            "ru": "<p><strong>Ремонт компьютеров Acer</strong> в сервисе iLab подходит для Aspire, Swift, Nitro, Predator и других моделей с проблемами экрана, клавиатуры, зарядки или перегрева.</p>\n<p>Перед ремонтом проверяем компьютер, объясняем возможные решения и согласовываем стоимость. После выполнения выдаём <strong>гарантию 90 дней</strong>.</p>"
          },
          "metaTitle": {
            "lv": "Acer datoru remonts Rīgā | iLab",
            "ru": "Ремонт компьютеров Acer в Риге | iLab"
          },
          "metaDescription": {
            "lv": "Acer datoru remonts Rīgā - Aspire, Swift, Nitro, Predator, ekrāns, tastatūra, uzlāde, dzesēšana un garantija.",
            "ru": "Ремонт Acer в Риге - Aspire, Swift, Nitro, Predator, экран, клавиатура, зарядка, охлаждение и гарантия."
          },
          "modelGrid": {
            "heading": {
              "lv": "",
              "ru": ""
            },
            "intro": {
              "lv": "",
              "ru": ""
            }
          },
          "sections": {
            "hasCustomGuide": false,
            "hasFaq": false,
            "hasProcess": false,
            "hasReviews": false,
            "hasWhy": false
          }
        },
        "series": []
      }
    ],
    "updatedAt": "2026-04-10T14:24:39.825Z"
  },
  {
    "id": "dyson-remonts",
    "image": "/images/categories/dyson_remonts.webp",
    "brands": [],
    "metaTitle": {
      "lv": "Dyson remonts Rīgā, baterija un motors | iLab",
      "ru": "Ремонт Dyson в Риге, батарея и мотор | iLab"
    },
    "h1": {
      "ru": "Ремонт Dyson в Риге",
      "lv": "Dyson remonts Rīgā"
    },
    "bodyHtml": {
      "lv": "<p><strong>Dyson remonts Rīgā</strong> iLab servisā palīdz, ja putekļsūcējs ātri izlādējas, zaudē jaudu, neieslēdzas vai darbojas ar pārtraukumiem.</p>\n<p>Veicam baterijas maiņu, motora pārbaudi, filtru un blīvējumu nomaiņu, kā arī dziļo tīrīšanu. Pirms darba saskaņojam izmaksas un pēc remonta sniedzam <strong>90 dienu garantiju</strong>.</p>",
      "ru": "<p><strong>Ремонт Dyson в Риге</strong> в сервисе iLab помогает, если пылесос быстро разряжается, потерял мощность, не включается или работает с перебоями.</p>\n<p>Выполняем замену батареи, проверку мотора, замену фильтров и уплотнителей, а также глубокую чистку. Перед работой согласовываем стоимость и после ремонта выдаём <strong>гарантию 90 дней</strong>.</p>"
    },
    "type": "category",
    "metaDescription": {
      "lv": "Dyson remonts Rīgā - baterijas maiņa, motora remonts, filtri, blīvējumi, dziļā tīrīšana, diagnostika un 90 dienu garantija.",
      "ru": "Ремонт Dyson в Риге - замена батареи, ремонт мотора, фильтры, уплотнители, глубокая чистка, диагностика и гарантия 90 дней."
    },
    "slug": "dyson-remonts",
    "lead": {
      "lv": "Dyson bezvadu putekļsūcēju remonts Rīgā - baterija, motors, filtri, blīvējumi un dziļā tīrīšana. Ātra pārbaude un 90 dienu garantija.",
      "ru": "Ремонт беспроводных пылесосов Dyson в Риге - батарея, мотор, фильтры, уплотнители и глубокая чистка. Быстрая проверка и гарантия 90 дней."
    },
    "order": 5,
    "labels": {
      "ru": "Ремонт Dyson",
      "lv": "Dyson remonts"
    },
    "updatedAt": "2026-03-24T01:31:00.607Z"
  }
];

function assertLocalizedText(obj, path) {
  for (const lang of ['lv', 'ru']) {
    if (!obj || typeof obj[lang] !== 'string' || !obj[lang].trim()) {
      throw new Error(`Missing localized text: ${path}.${lang}`);
    }

    if (obj[lang].includes('-') || obj[lang].includes('–')) {
      throw new Error(`Long dash found in: ${path}.${lang}`);
    }
  }
}

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

    assertLocalizedText(doc.labels, `${doc.slug}.labels`);
    assertLocalizedText(doc.h1, `${doc.slug}.h1`);
    assertLocalizedText(doc.lead, `${doc.slug}.lead`);
    assertLocalizedText(doc.bodyHtml, `${doc.slug}.bodyHtml`);
    assertLocalizedText(doc.metaTitle, `${doc.slug}.metaTitle`);
    assertLocalizedText(doc.metaDescription, `${doc.slug}.metaDescription`);

    const brandKeys = new Set();

    for (const brand of doc.brands || []) {
      if (!brand.key) {
        throw new Error(`Category ${doc.slug} has brand without key`);
      }

      if (brandKeys.has(brand.key)) {
        throw new Error(`Category ${doc.slug} has duplicate brand key: ${brand.key}`);
      }

      brandKeys.add(brand.key);

      assertLocalizedText(brand.labels, `${doc.slug}.brands.${brand.key}.labels`);

      if (!brand.page || !brand.page.variant) {
        throw new Error(`Category ${doc.slug} / brand ${brand.key} missing page.variant`);
      }

      assertLocalizedText(brand.page.lead, `${doc.slug}.brands.${brand.key}.page.lead`);
      assertLocalizedText(brand.page.bodyHtml, `${doc.slug}.brands.${brand.key}.page.bodyHtml`);
      assertLocalizedText(brand.page.metaTitle, `${doc.slug}.brands.${brand.key}.page.metaTitle`);
      assertLocalizedText(
        brand.page.metaDescription,
        `${doc.slug}.brands.${brand.key}.page.metaDescription`
      );

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

  if (!['overwrite', 'skip'].includes(IMPORT_MODE)) {
    throw new Error(`Unsupported IMPORT_MODE: ${IMPORT_MODE}`);
  }

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
