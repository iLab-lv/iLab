import { LuBatteryCharging, LuCalendarClock, LuFlame, LuGauge } from 'react-icons/lu';

import s from './IphoneBatteryLifecycle.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Baterijas nolietojums',
    titleStart: 'Kāpēc iPhone baterija ar laiku ', titleAccent: 'nolietojas?',
    paragraphs: [
      'iPhone baterija ir nolietojama detaļa. Ar laiku tā zaudē spēju noturēt uzlādi tikpat ilgi kā jauna baterija, īpaši, ja telefons tiek bieži lādēts, intensīvi lietots, pārkarst vai ilgstoši tiek izmantots ar ļoti zemu vai ļoti augstu uzlādes līmeni.',
      'Baterijas nolietojums parasti notiek pakāpeniski: sākumā telefons vienkārši izlādējas ātrāk, vēlāk var parādīties pēkšņa izslēgšanās, lēnāka darbība vai nestabila uzlāde. Baterijas maiņa var palīdzēt ierīces stabilitātei, ja problēma tiešām ir nolietotā baterijā.',
    ],
    factors: [
      ['Bieža uzlāde','Katrs uzlādes cikls pakāpeniski nolieto bateriju, tāpēc vecākam telefonam darbības laiks kļūst īsāks.'],
      ['Karstums','Pārkaršana var paātrināt baterijas nolietošanos un radīt nestabilu darbību.'],
      ['Intensīva lietošana','Navigācija, video, spēles un mobilais internets palielina slodzi un ātrāk iztukšo bateriju.'],
      ['Vecums','Pat saudzīgi lietota baterija ar gadiem zaudē sākotnējo kapacitāti.'],
    ],
  },
  ru: {
    eyebrow: 'Износ батареи',
    titleStart: 'Почему батарея iPhone со временем ', titleAccent: 'изнашивается?',
    paragraphs: [
      'Батарея iPhone — расходуемая деталь. Со временем она теряет способность удерживать заряд так же долго, как новая, особенно если телефон часто заряжают, интенсивно используют, перегревают или долго держат при очень низком либо высоком уровне заряда.',
      'Износ обычно происходит постепенно: сначала телефон быстрее разряжается, затем могут появиться внезапные выключения, замедление или нестабильная зарядка. Замена батареи может улучшить стабильность устройства, если причина действительно в изношенной батарее.',
    ],
    factors: [
      ['Частая зарядка','Каждый цикл постепенно изнашивает батарею, поэтому у старого телефона время работы сокращается.'],
      ['Нагрев','Перегрев может ускорить износ батареи и вызвать нестабильную работу.'],
      ['Интенсивное использование','Навигация, видео, игры и мобильный интернет повышают нагрузку и быстрее расходуют заряд.'],
      ['Возраст','Даже при бережном использовании батарея с годами теряет первоначальную ёмкость.'],
    ],
  },
};

const ICONS = [LuBatteryCharging, LuFlame, LuGauge, LuCalendarClock];

export default function IphoneBatteryLifecycle({ locale = 'lv' }) {
  const content = CONTENT[locale] || CONTENT.lv;
  return <section className={s.section} aria-labelledby="iphone-battery-lifecycle-title"><div className={s.container}><div className={s.layout}><header className={s.header}><span className={s.eyebrow}>{content.eyebrow}</span><h2 id="iphone-battery-lifecycle-title">{content.titleStart}<em>{content.titleAccent}</em></h2>{content.paragraphs.map((text)=><p key={text}>{text}</p>)}</header><div className={s.factorList}>{content.factors.map(([title,text],index)=>{const Icon=ICONS[index];return <article className={s.factor} key={title}><span aria-hidden="true"><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>;})}</div></div></div></section>;
}
