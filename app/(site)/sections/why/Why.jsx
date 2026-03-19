// app/(site)/sections/Why/Why.jsx
'use client';

import s from './Why.module.scss';
import whyContent from './why.content';

// fallback icon for simple string items
import { TbCertificate } from 'react-icons/tb';

export default function Why({
  id = 'why',
  locale = 'lv',
  title,
  copy,
  items,
}) {
  const content = whyContent[locale] || whyContent.lv;

  const resolvedTitle = title ?? content.title;
  const resolvedCopy = copy ?? content.copy;
  const resolvedItems = items ?? content.items;

  const list = resolvedItems.map((it) =>
    typeof it === 'string'
      ? { text: it, Icon: TbCertificate }
      : { ...it, Icon: it.Icon || TbCertificate }
  );

  return (
    <section
      id={id}
      className={`${s.section} ${s.why}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={s.container}>
        <header className={s.header}>
          <h2 id={`${id}-title`} className={s.sectionTitle}>
            {resolvedTitle}
          </h2>
          <p className={s.copy}>{resolvedCopy}</p>
        </header>

        <ul className={s.uspGrid} role="list">
          {list.map(({ text, Icon }, i) => (
            <li key={i} className={s.card}>
              <span className={s.iconWrap} aria-hidden="true">
                <Icon className={s.icon} />
              </span>
              <span className={s.cardText}>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}