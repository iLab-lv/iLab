import Link from 'next/link';
import { LuBatteryWarning, LuCircleHelp, LuPlugZap } from 'react-icons/lu';

import { buildServiceHref } from '@/lib/routes/routeI18n';
import s from './IphoneBatteryOrCharging.module.scss';

const CONTENT = {
  lv: {
    eyebrow:'Pareizais remonta virziens', titleStart:'Baterija vai ', titleAccent:'uzlādes problēma?',
    intro:'Ja iPhone slikti lādējas, problēma ne vienmēr ir baterijā. Dažreiz vainīga ir uzlādes ligzda, kabelis, adapteris, netīrumi ligzdā vai mitruma bojājums. Pirms baterijas maiņas pārbaudām, vai telefons korekti pieņem uzlādi un vai nav pazīmju, ka vajadzīgs uzlādes ligzdas remonts.',
    cards:[
      ['Vairāk izskatās pēc baterijas problēmas','Telefons ātri izlādējas, izslēdzas pie procentiem, restartējas vai baterijas veselība ir zema.'],
      ['Vairāk izskatās pēc uzlādes ligzdas problēmas','Kabelis kustas ligzdā, telefons lādējas tikai noteiktā leņķī vai uzlāde pazūd, kad pakustina kabeli.'],
      ['Vajadzīga diagnostika','Telefons karst, nelādējas vispār, pēc mitruma darbojas nestabili vai nav skaidrs, vai problēma ir baterijā, uzlādē vai citā detaļā.'],
    ],
    link:'Skatīt iPhone uzlādes ligzdas remontu',
  },
  ru: {
    eyebrow:'Правильное направление ремонта', titleStart:'Батарея или ', titleAccent:'проблема зарядки?',
    intro:'Если iPhone плохо заряжается, проблема не всегда в батарее. Причиной может быть разъём, кабель, адаптер, грязь в разъёме или повреждение влагой. Перед заменой батареи проверяем, правильно ли телефон принимает заряд и нет ли признаков неисправности разъёма.',
    cards:[
      ['Больше похоже на проблему батареи','Телефон быстро разряжается, выключается при оставшихся процентах, перезагружается или состояние батареи низкое.'],
      ['Больше похоже на проблему разъёма зарядки','Кабель двигается в разъёме, телефон заряжается только под определённым углом или зарядка пропадает при движении кабеля.'],
      ['Нужна диагностика','Телефон нагревается, совсем не заряжается, нестабильно работает после влаги или причина между батареей, зарядкой и другой деталью неясна.'],
    ],
    link:'Смотреть ремонт разъёма зарядки iPhone',
  },
};
const ICONS=[LuBatteryWarning,LuPlugZap,LuCircleHelp];
export default function IphoneBatteryOrCharging({locale='lv'}){const content=CONTENT[locale]||CONTENT.lv;const href=buildServiceHref(locale,'iphone-remonts','uzlades-ligzdas-maina');return <section className={s.section} aria-labelledby="battery-or-charging-title"><div className={s.container}><header className={s.header}><span>{content.eyebrow}</span><h2 id="battery-or-charging-title">{content.titleStart}<em>{content.titleAccent}</em></h2><p>{content.intro}</p></header><div className={s.grid}>{content.cards.map(([title,text],index)=>{const Icon=ICONS[index];return <article className={s.card} key={title}><i aria-hidden="true"><Icon /></i><h3>{title}</h3><p>{text}</p>{index===1&&<Link href={href}>{content.link}<span aria-hidden="true">→</span></Link>}</article>;})}</div></div></section>}
