import Link from 'next/link';
import { LuCamera, LuLayers3, LuPanelTop, LuSmartphone } from 'react-icons/lu';

import s from './IphoneBackCoverTerminology.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Bojājuma veids',
    titleStart: 'Aizmugurējais stikls, vāciņš vai korpuss —',
    titleAccent: 'kas tieši ir bojāts?',
    intro: 'Ikdienā vienu un to pašu bojājumu mēdz saukt dažādi. Precīzs remonta risinājums ir atkarīgs no iPhone modeļa, aizmugures konstrukcijas un tā, kuras zonas skāris trieciens.',
    items: [
      ['Aizmugurējais stikls', 'Stikla daļa ir saplaisājusi, sadrupusi vai vietām iztrūkst.'],
      ['Aizmugures vāciņš', 'Ikdienas nosaukums telefona aizmugurei; dažiem modeļiem ar to saprot tieši aizmugurējo stiklu.'],
      ['Korpusa bojājums', 'Ja rāmis ir deformēts, redzamas spraugas vai detaļas nepieguļ, pirms remonta vajadzīga korpusa pārbaude.'],
      ['Kameras zona', 'Ja bojājums ir pie kamerām, pārbaudām kameras stikliņu, pašu kameru un attēla kvalitāti.', '/iphone-remonts/kameras-remonts', 'Uzzināt vairāk par iPhone kameras remontu'],
    ],
  },
  ru: {
    eyebrow: 'Тип повреждения',
    titleStart: 'Заднее стекло, крышка или корпус —',
    titleAccent: 'что именно повреждено?',
    intro: 'В быту одно и то же повреждение называют по-разному. Точный вариант ремонта зависит от модели iPhone, конструкции задней части и зон, затронутых ударом.',
    items: [
      ['Заднее стекло', 'Стеклянная часть треснула, раскрошилась или местами отсутствует.'],
      ['Задняя крышка', 'Повседневное название задней части телефона; у некоторых моделей так называют именно заднее стекло.'],
      ['Повреждение корпуса', 'Если рамка деформирована, видны зазоры или детали неплотно прилегают, сначала проверяем корпус.'],
      ['Зона камеры', 'Если повреждение рядом с камерами, проверяем защитное стекло, саму камеру и качество изображения.', '/ru/remont-iphone/remont-kamery', 'Подробнее о ремонте камеры iPhone'],
    ],
  },
};

const ICONS = [LuPanelTop, LuLayers3, LuSmartphone, LuCamera];

export default function IphoneBackCoverTerminology({ locale = 'lv' }) {
  const content = CONTENT[locale] || CONTENT.lv;

  return (
    <section className={s.section} aria-labelledby="iphone-back-cover-terminology-title">
      <div className={s.container}>
        <header className={s.header}>
          <span>{content.eyebrow}</span>
          <h2 id="iphone-back-cover-terminology-title">{content.titleStart} <em>{content.titleAccent}</em></h2>
          <p>{content.intro}</p>
        </header>
        <dl className={s.list}>
          {content.items.map(([title, text, href, linkLabel], index) => {
            const Icon = ICONS[index];
            return (
              <div className={s.item} key={title}>
                <dt><span aria-hidden="true"><Icon /></span>{title}</dt>
                <dd>
                  {text}
                  {href && <Link className={s.link} href={href}>{linkLabel}</Link>}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
