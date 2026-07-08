import { getGuideContent } from '@sections/guide/guideContent';

import s from './IphoneSeoGuide.module.scss';

const beforeServiceHtml = `
<p>Pirms iPhone remonta svarīgākais ir saprast bojājuma iemeslu, nevis uzreiz mainīt detaļu. Tāpēc iLab servisā vispirms pārbaudām ierīci, novērtējam bojājumu un tikai pēc tam piedāvājam piemērotāko risinājumu. Dažos gadījumos pietiek ar tīrīšanu vai vienkāršu detaļas maiņu, bet sarežģītākos gadījumos nepieciešama dziļāka diagnostika.</p>

<p>Pirms ierīces nodošanas servisā ieteicams izveidot datu rezerves kopiju iCloud vai datorā, ja tas ir iespējams. Tipiskos remontos, piemēram, ekrāna vai baterijas maiņā, dati parasti netiek skarti, tomēr rezerves kopija vienmēr ir drošākais risinājums.</p>

<p>Detaļas un remonta risinājums ir atkarīgs no konkrētā iPhone modeļa, bojājuma veida un detaļu pieejamības. Pirms darba sākšanas izskaidrojam pieejamās iespējas, cenu un garantijas nosacījumus, lai klients var pieņemt saprotamu lēmumu.</p>

<p>Vecākiem iPhone modeļiem remonts bieži ir izdevīgs, ja problēma ir baterijā, ekrānā, kamerā vai uzlādes ligzdā. Ja bojājums ir sarežģītāks, piemēram, pēc mitruma, kritiena vai iepriekš neveiksmīga remonta, meistars palīdz novērtēt, vai remonts konkrētajā gadījumā ir pamatots.</p>
`;

export default function IphoneSeoGuide() {
  const guide = getGuideContent('lv', 'iphone');
  const parts = guide.parts || [];
  const partByTitle = Object.fromEntries(parts.map((part) => [part.title, part]));
  const guideCards = [
    {
      title: 'Par iPhone remontu',
      text: partByTitle['Kur nodot iPhone remontam']?.text,
    },
    {
      title: 'Cenas un modeļa izvēle',
      text: partByTitle['Cik tas ilgst un ko sagaidīt']?.text,
    },
    {
      title: 'Populārākie remonta veidi',
      text: partByTitle['Simptomi un iespējamie risinājumi']?.text,
    },
    {
      title: 'Detaļas un garantija',
      text: partByTitle['Detaļas: oriģinālas vai OEM']?.text,
    },
    {
      title: 'Pirms iPhone nodošanas servisā',
      text: `${beforeServiceHtml}${partByTitle['Datu drošība un sagatavošanās remontam']?.text || ''}`,
    },
  ].filter((card) => card.text);

  return (
    <section
      id="guide"
      className={s.section}
      aria-labelledby="iphone-seo-guide-title"
    >
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.eyebrow}>Remonta ceļvedis</span>

          <h2 id="iphone-seo-guide-title">
            iPhone remonta <span>ceļvedis</span>
          </h2>

          <p>
            Noderīga informācija pirms iPhone remonta - par diagnostiku,
            detaļām, cenu, garantiju un sagatavošanos servisam.
          </p>
        </div>

        <div className={s.grid}>
          {guideCards.map((card) => (
            <article className={s.card} key={card.title}>
              <h3>{card.title}</h3>

              <div
                className={s.richText}
                dangerouslySetInnerHTML={{ __html: card.text }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
