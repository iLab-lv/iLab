import s from './IphoneExpertNotes.module.scss';

const notes = [
  {
    title: 'Displeja paziņojums pēc maiņas',
    text: 'Dažiem iPhone modeļiem pēc displeja maiņas iestatījumos var parādīties “Important Display Message”, “Unknown Part” vai līdzīgs detaļas paziņojums. Pats paziņojums parasti netraucē lietot iPhone, bet norāda, ka detaļa nav verificēta Apple sistēmā. Pirms remonta paskaidrojam pieejamos displeja variantus un iespējamās nianses.',
  },
  {
    title: 'Šķidruma bojājumu termiņš nav prognozējams uzreiz',
    text: 'Pēc šķidruma vai mitruma bojājumiem remonta ilgumu un cenu nav iespējams precīzi noteikt tikai pēc ārējām pazīmēm. Bojājuma apmērs kļūst redzams diagnostikas laikā. Līdz pārbaudei iPhone labāk nelādēt.',
  },
  {
    title: 'Uzlādes ligzda ne vienmēr jāmaina',
    text: 'Ja kabelis slikti turas, uzlāde pazūd vai iPhone lādējas tikai noteiktā leņķī, iemesls bieži var būt netīrumi ligzdā. Vispirms pārbaudām un tīrām ligzdu, bet detaļu mainām tikai tad, ja tā ir fiziski bojāta vai problēma paliek pēc tīrīšanas.',
  },
  {
    title: 'Ne katra kļūda nozīmē vienas detaļas maiņu',
    text: 'Face ID, kameras, skaņas vai uzlādes problēmas pēc kritiena ne vienmēr nozīmē tikai konkrētās detaļas bojājumu. Problēma var būt savienojumos, mitruma sekās vai plates līmenī, tāpēc sarežģītākos gadījumos sākam ar diagnostiku.',
  },
];

export default function IphoneExpertNotes() {
  return (
    <section
      className={s.section}
      aria-labelledby="iphone-expert-notes-title"
    >
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.eyebrow}>Meistaru pieredze</span>
          <h2 id="iphone-expert-notes-title">
            Svarīgas iPhone remonta <span>nianses</span>
          </h2>
          <p>
            Dažiem iPhone remontiem svarīga ir ne tikai detaļas maiņa, bet arī
            tas, kā konkrētais modelis reaģē pēc remonta. Pirms darba
            paskaidrojam iespējamās nianses, detaļu variantus un ko pārbaudām
            pēc remonta.
          </p>
        </div>

        <div className={s.grid}>
          {notes.map((note) => (
            <article className={s.card} key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
