// Symptom → actions for iPhone category (dev only; later move to Firebase)
export const iphoneIssues = [
  {
    id: 'charge',
    title: 'Neuzlādējas',
    causes: [
      'lādēšanas ligzdas nolietojums vai netīrumi',
      'bojāts kabelis/adapters',
      'akumulatora nolietojums',
    ],
    actions: [
      'diagnostika un ligzdas tīrīšana',
      'ligzdas vai akumulatora maiņa (ja nepieciešams)',
    ],
    timeMin: 45, timeMax: 90,
    href: '/iphone-remonts/baterijas-maina',
  },
  {
    id: 'battery',
    title: 'Ātri izlādējas',
    causes: [
      'nolietojies akumulators',
      'fona procesi/programmatūra',
      'temperatūras ietekme',
    ],
    actions: [
      'baterijas veselības pārbaude',
      'akumulatora maiņa',
      'iestatījumu/atjauninājumu ieteikumi',
    ],
    timeMin: 30, timeMax: 60,
    href: '/iphone-remonts/baterijas-maina',
  },
  {
    id: 'overheat',
    title: 'Pārkarst',
    causes: [
      'akumulatora nolietojums',
      'programmatūras noslodze',
      'uzlādes aprīkojuma problēmas',
    ],
    actions: [
      'CPU/noslodzes diagnostika',
      'akumulatora maiņa (ja vajag)',
      'ligzdas un lādētāja pārbaude/tīrīšana',
    ],
    timeMin: 30, timeMax: 120,
    href: '/iphone-remonts',
  },
  {
    id: 'water',
    title: 'Mitruma/ūdens bojājums',
    causes: ['oksidācija uz kontaktiem', 'īsaisavienojumi moduļos'],
    actions: [
      'pilna diagnostika un tīrīšana',
      'bojāto moduļu maiņa, ja iespējams',
    ],
    timeMin: 120, timeMax: 480, // → renderēs “Tajā pašā dienā”
    href: '/iphone-remonts',
  },
  {
    id: 'display',
    title: 'Sasists stikls / displeja problēmas',
    causes: ['plaisa, plankumi, “ghost touch”, nereaģē skāriens'],
    actions: ['displeja moduļa maiņa', 'stikla maiņa (ja modelim pieejama)'],
    timeMin: 60, timeMax: 120,
    href: '/iphone-remonts/displeja-maina',
  },
  {
    id: 'audio',
    title: 'Kluss skaļrunis / mikrofona problēmas',
    causes: ['putekļi/oksidācija', 'moduļa bojājums'],
    actions: ['tīrīšana un testēšana', 'skaļruņa/mikrofona maiņa'],
    timeMin: 30, timeMax: 90,
    href: '/iphone-remonts',
  },
];

export default iphoneIssues;
