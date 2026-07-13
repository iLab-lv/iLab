import Link from 'next/link';
import { LuArrowUpRight, LuCamera, LuPanelTop } from 'react-icons/lu';

import s from './IphoneBackCoverCameraLink.module.scss';

const CONTENT = {
  lv: {
    eyebrow: 'Saistīts bojājums',
    titleStart: 'Bojājums skāris arī ',
    titleAccent: 'kameras zonu?',
    text: 'Ja saplaisājis tikai aizmugurējais stikls ap kameru, remontu izvērtējam kopā ar aizmugures vāciņu. Ja kamera miglojas, nefokusē, rāda plankumus vai ir bojāts kameras stikliņš, apskati arī iPhone kameras remonta iespējas.',
    backLabel: 'Aizmugures stikls un korpuss',
    cameraLabel: 'Kamera, fokuss un kameras stikliņš',
    linkLabel: 'Skatīt iPhone kameras remontu',
    href: '/iphone-remonts/kameras-remonts',
  },
  ru: {
    eyebrow: 'Связанное повреждение',
    titleStart: 'Повреждена также ',
    titleAccent: 'зона камеры?',
    text: 'Если заднее стекло треснуло только вокруг камеры, оцениваем ремонт вместе с задней крышкой. Если камера запотевает, не фокусируется, показывает пятна или повреждено защитное стекло, посмотрите также варианты ремонта камеры iPhone.',
    backLabel: 'Заднее стекло и корпус',
    cameraLabel: 'Камера, фокус и защитное стекло',
    linkLabel: 'Подробнее о ремонте камеры iPhone',
    href: '/ru/remont-iphone/remont-kamery',
  },
};

export default function IphoneBackCoverCameraLink({ locale = 'lv' }) {
  const content = CONTENT[locale] || CONTENT.lv;

  return (
    <section className={s.section} aria-labelledby="back-cover-camera-link-title">
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.copy}>
            <span className={s.eyebrow}>{content.eyebrow}</span>
            <h2 id="back-cover-camera-link-title">
              {content.titleStart}<em>{content.titleAccent}</em>
            </h2>
            <p>{content.text}</p>
          </div>

          <div className={s.actions}>
            <div className={s.labels} aria-label={content.eyebrow}>
              <span><LuPanelTop aria-hidden="true" />{content.backLabel}</span>
              <span><LuCamera aria-hidden="true" />{content.cameraLabel}</span>
            </div>
            <Link href={content.href}>
              {content.linkLabel}
              <LuArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
