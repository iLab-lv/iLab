import {
  LuBadgeCheck,
  LuClipboardList,
  LuMapPin,
  LuSearchCheck,
  LuShieldQuestion,
} from 'react-icons/lu';

import s from './IphoneClientChoiceSection.module.scss';

const points = [
  {
    icon: LuBadgeCheck,
    title: '15+ gadu pieredze',
    text:
      '15+ gadu pieredze ierīču remontā palīdz ātrāk saprast bojājuma iemeslu, ieteikt piemērotāko risinājumu un izvairīties no liekiem remonta darbiem.',
  },
  {
    icon: LuSearchCheck,
    title: 'Sākotnējā pārbaude pirms remonta',
    text:
      'Pirms remonta pārbaudām ierīci un paskaidrojam, kas varētu būt bojāts un kādi ir iespējamie risinājumi.',
  },
  {
    icon: LuClipboardList,
    title: 'Cena un risinājums pirms darba',
    text:
      'Pirms darba sākšanas saskaņojam remonta risinājumu, cenu un izpildes termiņu, lai klientam viss ir saprotams.',
  },
  {
    icon: LuMapPin,
    title: 'Ērti servisi Rīgā',
    text:
      'iPhone var nodot remontam iLab servisos Rīgā - izvēlies sev ērtāko atrašanās vietu.',
  },
  {
    icon: LuShieldQuestion,
    title: 'Godīgs remonta ieteikums',
    text:
      'Ja pietiek ar tīrīšanu vai remonts konkrētajā gadījumā nav izdevīgs, paskaidrojam to pirms darba sākšanas.',
  },
];

export default function IphoneClientChoiceSection() {
  return (
    <section className={s.section} aria-labelledby="iphone-client-choice-title">
      <div className={s.container}>
        <div className={s.shell}>
          <div className={s.intro}>
            <span className={s.eyebrow}>Klientu izvēle</span>

            <h2 id="iphone-client-choice-title">
              Kāpēc klienti izvēlas <span>iLab?</span>
            </h2>

            <p>
              15+ gadu pieredze, saprotama diagnostika un skaidrs remonta
              process - bez liekiem solījumiem un pārsteigumiem cenā.
            </p>

            <div className={s.stat} aria-label="15+ gadu pieredze">
              <strong>15+</strong>
              <span>gadu pieredze ierīču remontā</span>
            </div>
          </div>

          <div className={s.points} aria-label="Kāpēc klienti izvēlas iLab">
            {points.map((point) => {
              const Icon = point.icon;

              return (
                <article className={s.point} key={point.title}>
                  <div className={s.icon} aria-hidden="true">
                    <Icon />
                  </div>

                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
