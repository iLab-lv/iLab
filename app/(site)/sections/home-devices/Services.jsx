import s from './Services.module.scss';
import IphoneRemonts from './IphoneRemonts';
import AndroidRemonts from './AndroidRemonts';
import DysonRemonts from './DysonRemonts';
import LaptopRemonts from './LaptopRemonts';
import { getServicesContent } from './services.i18n';

export default function Services({
  id = 'services',
  locale = 'lv',
  title,
  apple,
  android,
  twoUp,
}) {
  const content = getServicesContent(locale);

  const sectionTitle = title || content.title;
  const appleContent = apple || content.apple;
  const androidContent = android || content.android;
  const twoUpContent = Array.isArray(twoUp) && twoUp.length > 0 ? twoUp : content.twoUp;

  const pcItem = twoUpContent.find((x) => x.key === 'pc') || {};
  const { key: _pcKey, ...pcProps } = pcItem;

  const dysonItem = twoUpContent.find((x) => x.key === 'dyson') || {};
  const { key: _dysonKey, ...dysonProps } = dysonItem;

  return (
    <section
      id={id}
      className={`${s.section} ${s.services}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <h2 id={`${id}-title`} className={s.sectionTitle}>
          {sectionTitle}
        </h2>

        <IphoneRemonts idBase={id} {...appleContent} />
        <AndroidRemonts idBase={id} {...androidContent} />

        <div className={s.twoUp}>
          <LaptopRemonts idBase={id} {...pcProps} />
          <DysonRemonts idBase={id} {...dysonProps} />
        </div>
      </div>
    </section>
  );
}