import {
  LuBadgeCheck,
  LuClipboardCheck,
  LuCpu,
  LuSearchCheck,
} from 'react-icons/lu';

import s from './IphoneQualitySection.module.scss';

const cards = [
  {
    icon: LuClipboardCheck,
    title: 'Pārbaude pēc remonta',
    text:
      'Pēc remonta pārbaudām svarīgākās iPhone funkcijas - skārienjutību, attēlu, uzlādi, skaņu, mikrofonu, kameru un citas funkcijas atkarībā no veiktā remonta.',
    bullets: [
      'skārienjutība un ekrāna attēls',
      'uzlāde un baterijas darbība',
      'kamera, skaļrunis un mikrofons',
      'Face ID / Touch ID zona, ja tas ir saistīts ar remontu',
    ],
  },
  {
    icon: LuCpu,
    title: 'Oriģinālās vai OEM detaļas',
    text:
      'Atkarībā no iPhone modeļa, pieejamības un remonta veida piedāvājam oriģinālās vai kvalitatīvas OEM detaļas. Pirms remonta izskaidrojam pieejamos variantus un cenu.',
  },
  {
    icon: LuBadgeCheck,
    title: 'garantija līdz 1 gadam',
    text:
      'Pēc remonta sniedzam garantiju līdz 1 gadam darbam un izmantotajām detaļām. Garantijas nosacījumus izskaidrojam pirms remonta pabeigšanas.',
  },
  {
    icon: LuSearchCheck,
    title: 'Cena saskaņota pirms darba',
    text:
      'Pirms remonta pārbaudām bojājuma iemeslu un saskaņojam cenu, detaļas variantu un izpildes termiņu. Remonts netiek sākts bez klientam saprotama risinājuma.',
  },
];

const facts = [
  'garantija līdz 1 gadam',
  'Cena pirms remonta',
  'Detaļas pēc izvēles un pieejamības',
  'Pārbaude pēc remonta',
];

export default function IphoneQualitySection() {
  return (
    <section className={s.section} aria-labelledby="iphone-quality-title">
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.content}>
            <span className={s.eyebrow}>Kvalitāte un garantija</span>

            <h2 id="iphone-quality-title">
              Kvalitatīvs iPhone remonts ar <span>garantiju</span>
            </h2>

            <p>
              iPhone remonts nav tikai detaļas nomaiņa. Pēc remonta pārbaudām
              svarīgākās funkcijas, izskaidrojam izmantoto detaļu variantus un
              sniedzam garantiju gan darbam, gan izmantotajām detaļām.
            </p>
          </div>

          <div className={s.factList} aria-label="iLab remonta uzticības fakti">
            {facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
        </div>

        <div className={s.grid}>
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article className={s.card} key={card.title}>
                <div className={s.iconWrap} aria-hidden="true">
                  <Icon />
                </div>

                <div className={s.copy}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>

                  {card.bullets ? (
                    <ul>
                      {card.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
