// /data/categoryContent.js
// Dev-time content source for category pages.
// Later you can swap this to Firebase without changing consumers.

const categoryContent = {
  'iphone-remonts': {
    slug: 'iphone-remonts',

    seo: {
      title: 'iPhone remonts Rīgā un visā Latvijā | iLab',
      metaDescription:
        'iPhone ekrāna un baterijas maiņa, uzlādes ligzda, kamera, ūdens bojājumi. Ātra diagnostika, godīgas cenas, garantija. Piesaki remontu iLab!',
      // canonical can default to `/${slug}` at render time if you prefer
    },

    // Header content
    h1: 'iPhone remonts',
    lead:
      'iLab sertificētie meistari salabo iPhone gan ar tipiskiem, gan sarežģītiem bojājumiem — no saplaisājuša ekrāna līdz mitruma radītām problēmām. Strādājam ātri, izmantojam kvalitatīvas detaļas un sniedzam garantiju visā Latvijā.',

    // Header scroll CTA → model grid section anchor
    scrollCta: { label: 'Izvēlies modeli', targetId: 'iphone-modeli', show: true },

    // Page sections (category-specific copy)
    sections: {
      modelGrid: {
        heading: 'Izvēlies savu iPhone modeli',
        intro: 'Atrast modeli ir viegli — izvēlies no saraksta vai izmanto meklēšanu.',
      },

      // Optional long-form guide block (place low on the page).
      // Keep or remove based on your wiring; can be moved to Firebase later.
      guide: {
        heading: 'iPhone remonta ceļvedis',
        parts: [
          {
            title: 'Simptomi un iespējamie risinājumi',
            text:
              'Saplīsis vai mirgo ekrāns, nereaģē skāriens, ātri krītas baterijas līmenis, uzlāde pārtrūkst vai telefons pārkarst — tie ir biežākie signāli, ka nepieciešama diagnostika. iLab komandā pārbaudām komponentes, lai precīzi noteiktu bojājumu un piedāvātu optimālo risinājumu.',
          },
          {
            title: 'Cik tas ilgst un ko sagaidīt',
            text:
              'Standarta darbi, piemēram, ekrāna vai baterijas maiņa, bieži paveicami tajā pašā dienā. Sarežģītākiem bojājumiem vispirms veicam diagnostiku un saskaņojam termiņu. Par izmaksām vienojamies pirms darba uzsākšanas — bez slēptām pozīcijām.',
          },
          {
            title: 'Detaļas: oriģinālas vai OEM',
            text:
              'Strādājam ar oriģinālām vai augstas kvalitātes OEM detaļām atkarībā no modeļa un pieejamības. Mērķis — atjaunot sākotnējo funkcionalitāti un saglabāt uzticamību. Izvēli un garantijas nosacījumus izskaidrojam pirms remonta.',
          },
          {
            title: 'Datu drošība un sagatavošanās remontam',
            text:
              'Iesakām veikt dublējumu un deaktivizēt “Find My iPhone”, ja nepieciešams. Mēs apstrādājam datus atbildīgi; piekļuve tiek ierobežota tikai remonta vajadzībām. Ja ir paroli vai Face ID, meistars informēs, kā rīkoties.',
          },
          {
            title: 'Kur nodot iPhone remontam',
            text:
              'Mūs atradīsi T/C Domina Shopping un T/C Spice Home — ērti piebraukt un apvienot ar citām lietām. Ja neatrodi savu modeli, izmanto “Sazināties” un saņem konsultāciju no meistara.',
          },
        ],
      },
    },

    // Simple on/off toggles for shared/static blocks on this page
    show: {
      popularRepairs: true,
      guide: true,  // set to false if you want to hide the long-form guide
      process: true,
      trust: true,
      faq: true,
    },
  },
};

export default categoryContent;
