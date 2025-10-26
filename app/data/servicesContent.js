// Temporary dev content for long-tail service pages.
// Later you’ll move this to Firebase.
const servicesContent = {
  // ===== Long-tail iPhone service pages =====
  'iphone-remonts/displeja-maina': {
    seo: {
      title: 'iPhone ekrāna maiņa Rīgā | iLab',
      metaDescription:
        'iPhone ekrāna un stikla maiņa tajā pašā dienā. Ātra diagnostika, kvalitatīvas detaļas, 90 dienu garantija.',
    },
    h1: 'iPhone ekrāna maiņa',
    lead:
      'Nomainīsim saplaisājušu vai nereaģējošu ekrānu tajā pašā dienā, izmantojot kvalitatīvas detaļas un sniedzot garantiju.',
  },

  'iphone-remonts/baterijas-maina': {
    seo: {
      title: 'iPhone baterijas maiņa | iLab',
      metaDescription:
        'Ātra iPhone baterijas maiņa ar garantiju. Diagnoze, cenas saskaņošana un nomaiņa tajā pašā dienā, ja detaļas ir uz vietas.',
    },
    h1: 'iPhone baterijas maiņa',
    lead:
      'Ja iPhone ātri izlādējas vai izslēdzas pie 10–20%, baterijas nomaiņa palīdz atjaunot darba laiku un stabilitāti.',
  },

  // ===== Category-level services for "Datoru remonts" (used by /datoru-remonts and brand pages) =====
  'datoru-remonts': {
    services: [
      {
        id: 'diagnostika-programmatūra',
        title: 'Diagnostika un programmatūras remonts',
        text:
          'Precīza pārbaude un kļūdu novēršana. Risinām OS (Windows, macOS) problēmas, vīrusus un citus programmatūras traucējumus.',
        icon: 'LuBug',
      },
      {
        id: 'tastaturas-maina',
        title: 'Tastatūras maiņa',
        text:
          'Nomainām bojātas vai nereaģējošas klaviatūras uz jaunām — portatīvajiem datoriem ar garantiju.',
        icon: 'LuKeyboard',
      },
      {
        id: 'ekrana-maina',
        title: 'Ekrāna maiņa',
        text:
          'Ātra displeja maiņa un ekrāna remonts pēc triecieniem vai citiem bojājumiem.',
        icon: 'LuMonitor',
      },
      {
        id: 'matesplates-remonts',
        title: 'Mātesplates remonts',
        text:
          'Sarežģīti remonti pēc pārkaršanas vai mitruma — komponentu diagnostika, lodēšana un atjaunošana.',
        icon: 'LuCpu',
      },
      {
        id: 'uzlades-ligzdas-remonts',
        title: 'Uzlādes ligzdas remonts',
        text:
          'Novēršam uzlādes problēmas un mainām bojātas USB-C/MagSafe ligzdas.',
        icon: 'LuPlugZap',
      },
      {
        id: 'atrdarbibas-uzlabosana',
        title: 'Ātrdarbības uzlabošana (SSD/RAM)',
        text:
          'SSD uzstādīšana, RAM palielināšana un sistēmas tīrīšana, lai dators strādātu ātrāk un stabilāk.',
        icon: 'LuHardDrive', // if you prefer a performance vibe, switch to 'LuRocket'
      },
      {
        id: 'remonts-pec-mitruma',
        title: 'Remonts pēc mitruma',
        text:
          'Profesionāla tīrīšana un atjaunošana pēc šķidruma iekļūšanas, oksidācijas novēršana.',
        icon: 'LuDroplets',
      },
    ],
  },
};

export default servicesContent;
