/* scripts/importContactFaqToFirestore.cjs
 *
 * Imports contact-page FAQ content directly to Firestore.
 *
 * Writes only:
 *  - faqGroups/contact_lv
 *  - faqGroups/contact_ru
 *
 * Fields:
 *  - scopeType: "page"
 *  - scopeKey: "contacts"
 *  - locale: "lv" | "ru"
 *  - title: string
 *  - isPublished: true
 *  - order: number
 *  - items: [{ q, aHtml, order }]
 *  - updatedAt: serverTimestamp
 *  - createdAt: serverTimestamp
 *
 * Usage:
 *   node scripts/importContactFaqToFirestore.cjs
 *
 * Optional env:
 *   IMPORT_MODE=overwrite  (default)
 *   IMPORT_MODE=skip       (skip if doc exists)
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

const IMPORT_MODE = process.env.IMPORT_MODE || 'overwrite'; // 'overwrite' | 'skip'
const COLLECTION = 'faqGroups';

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

function normalizeQuestion(q) {
  return typeof q === 'string' ? q.trim() : '';
}

function normalizeAnswerHtml(aHtml) {
  return typeof aHtml === 'string' ? aHtml.trim() : '';
}

function normalizeItems(items = []) {
  return items
    .map((item, index) => ({
      q: normalizeQuestion(item.q),
      aHtml: normalizeAnswerHtml(item.aHtml),
      order: item.order || (index + 1) * 10,
    }))
    .filter((item) => item.q && item.aHtml)
    .sort((a, b) => a.order - b.order);
}

function buildContactFaqDocs() {
  const now = admin.firestore.FieldValue.serverTimestamp();

  return [
    {
      docId: 'contact_lv',
      data: {
        scopeType: 'page',
        scopeKey: 'contacts',
        locale: 'lv',
        title: 'Biežāk uzdotie jautājumi par saziņu un filiālēm',
        isPublished: true,
        order: 20,
        items: normalizeItems([
          {
            order: 10,
            q: 'Kur Rīgā atrodas iLab filiāles?',
            aHtml:
              'iLab servisa centri atrodas divās ērtās vietās Rīgā - <strong>T/C Domina Shopping</strong>, Ieriķu ielā 3, un <strong>T/C Spice Home</strong>, Jaunmoku ielā 13. <a href="#locations">Filiāļu blokā</a> vari izvēlēties sev tuvāko servisu, apskatīt darba laiku, piezvanīt, uzrakstīt WhatsApp vai atvērt maršrutu Google Maps un Waze.',
          },
          {
            order: 20,
            q: 'Vai nepieciešams pieraksts, vai var atnākt bez pieraksta?',
            aHtml:
              'Vairumā gadījumu ierīci vari atnest arī <strong>bez iepriekšēja pieraksta</strong>. Ja vajadzīga konkrēta detaļa vai remonts ir steidzams, iesakām pirms ierašanās sazināties ar izvēlēto filiāli - tā varēsim precizēt detaļas pieejamību, aptuveno cenu un remonta laiku.',
          },
          {
            order: 30,
            q: 'Kuru filiāli izvēlēties - Domina Shopping vai Spice Home?',
            aHtml:
              '<strong>Domina Shopping</strong> ir ērta izvēle, ja esi Teikā, Purvciemā, centrā, Juglā vai tuvāk Rīgas labajam krastam. <strong>Spice Home</strong> būs ērtāka, ja esi Pārdaugavā, Imantā, Zolitūdē, Mārupē vai tuvāk lidostas pusei. Abās filiālēs vari saņemt konsultāciju, nodot ierīci diagnostikai un pieteikt remontu.',
          },
          {
            order: 40,
            q: 'Vai abās filiālēs ir pieejami vienādi pakalpojumi?',
            aHtml:
              'Populārākie pakalpojumi parasti ir pieejami abās filiālēs - piemēram, telefonu diagnostika, ekrāna maiņa, baterijas maiņa, uzlādes ligzdas problēmu novēršana un citi biežākie darbi. Atsevišķām ierīcēm vai retākām detaļām pieejamība var atšķirties, tāpēc pirms ierašanās drošāk ir sazināties ar izvēlēto filiāli.',
          },
          {
            order: 50,
            q: 'Kāds ir iLab darba laiks?',
            aHtml:
              '<strong>Domina Shopping</strong> filiāle strādā katru dienu no 10:00 līdz 21:00. <strong>Spice Home</strong> filiāle strādā no pirmdienas līdz sestdienai no 10:00 līdz 21:00, bet svētdien no 10:00 līdz 20:00. Aktuālo darba laiku vienmēr vari pārbaudīt šajā kontaktu lapā pie konkrētās filiāles.',
          },
          {
            order: 60,
            q: 'Vai pirms remonta tiek apstiprināta cena?',
            aHtml:
              'Jā. Remonta cena ir atkarīga no ierīces modeļa, bojājuma un nepieciešamās detaļas. Pirms darba uzsākšanas precizējam izmaksas un saskaņojam tās ar klientu. Ja vēlies, vari vispirms sazināties ar mums telefoniski vai WhatsApp un aprakstīt problēmu.',
          },
          {
            order: 70,
            q: 'Vai varu sazināties WhatsApp?',
            aHtml:
              'Jā, ar iLab vari sazināties arī WhatsApp. Izvēlies sev ērtāko filiāli kontaktu blokā un izmanto WhatsApp pogu - vari īsi aprakstīt problēmu, norādīt ierīces modeli un, ja nepieciešams, pievienot fotoattēlu.',
          },
        ]),
        updatedAt: now,
        createdAt: now,
      },
    },
    {
      docId: 'contact_ru',
      data: {
        scopeType: 'page',
        scopeKey: 'contacts',
        locale: 'ru',
        title: 'Частые вопросы о связи и филиалах',
        isPublished: true,
        order: 20,
        items: normalizeItems([
          {
            order: 10,
            q: 'Где в Риге находятся филиалы iLab?',
            aHtml:
              'Сервисные центры iLab находятся в двух удобных местах в Риге - <strong>T/C Domina Shopping</strong>, Ieriķu iela 3, и <strong>T/C Spice Home</strong>, Jaunmoku iela 13. <a href="#locations">В блоке филиалов</a> можно выбрать ближайший сервис, посмотреть время работы, позвонить, написать в WhatsApp или открыть маршрут в Google Maps и Waze.',
          },
          {
            order: 20,
            q: 'Нужно ли записываться заранее или можно прийти сразу?',
            aHtml:
              'В большинстве случаев устройство можно принести <strong>без предварительной записи</strong>. Если нужна конкретная деталь или ремонт нужен срочно, лучше заранее связаться с выбранным филиалом - так мы сможем уточнить наличие детали, примерную стоимость и срок ремонта.',
          },
          {
            order: 30,
            q: 'Какой филиал выбрать - Domina Shopping или Spice Home?',
            aHtml:
              '<strong>Domina Shopping</strong> удобнее, если вы находитесь в Тейке, Пурвциемсе, центре, Югле или ближе к правому берегу Риги. <strong>Spice Home</strong> удобнее, если вы находитесь в Пардаугаве, Иманте, Золитуде, Марупе или ближе к стороне аэропорта. В обоих филиалах можно получить консультацию, оставить устройство на диагностику и оформить ремонт.',
          },
          {
            order: 40,
            q: 'Во всех филиалах доступны одинаковые услуги?',
            aHtml:
              'Самые популярные услуги обычно доступны в обоих филиалах - например, диагностика телефонов, замена экрана, замена батареи, устранение проблем с разъёмом зарядки и другие частые работы. Для отдельных устройств или редких деталей наличие может отличаться, поэтому перед визитом лучше связаться с выбранным филиалом.',
          },
          {
            order: 50,
            q: 'Какое у iLab время работы?',
            aHtml:
              '<strong>Domina Shopping</strong> работает каждый день с 10:00 до 21:00. <strong>Spice Home</strong> работает с понедельника по субботу с 10:00 до 21:00, а в воскресенье с 10:00 до 20:00. Актуальное время работы всегда можно проверить на этой странице возле конкретного филиала.',
          },
          {
            order: 60,
            q: 'Подтверждается ли цена перед ремонтом?',
            aHtml:
              'Да. Стоимость ремонта зависит от модели устройства, неисправности и нужной детали. Перед началом работы мы уточняем стоимость и согласовываем её с клиентом. Также можно заранее связаться с нами по телефону или WhatsApp и описать проблему.',
          },
          {
            order: 70,
            q: 'Можно ли связаться с вами через WhatsApp?',
            aHtml:
              'Да, с iLab можно связаться через WhatsApp. Выберите удобный филиал в контактном блоке и нажмите кнопку WhatsApp - можно коротко описать проблему, указать модель устройства и при необходимости прикрепить фотографию.',
          },
        ]),
        updatedAt: now,
        createdAt: now,
      },
    },
  ];
}

async function shouldSkip(docRef) {
  if (IMPORT_MODE !== 'skip') return false;

  const snap = await docRef.get();
  return snap.exists;
}

async function run() {
  console.log('=== Import Contact FAQ to Firestore ===');
  console.log('Collection:', COLLECTION);
  console.log('Mode:', IMPORT_MODE);

  initFirebaseAdmin();

  const db = admin.firestore();
  const docs = buildContactFaqDocs();

  let written = 0;
  let skipped = 0;

  const batch = db.batch();

  for (const doc of docs) {
    const ref = db.collection(COLLECTION).doc(doc.docId);

    if (await shouldSkip(ref)) {
      skipped += 1;
      console.log(`Skipped existing doc: ${doc.docId}`);
      continue;
    }

    batch.set(ref, doc.data, { merge: true });
    written += 1;

    console.log(`Queued doc: ${doc.docId}`);
  }

  if (written > 0) {
    await batch.commit();
  }

  console.log('=== Done ===');
  console.log('Written:', written);
  console.log('Skipped:', skipped);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});