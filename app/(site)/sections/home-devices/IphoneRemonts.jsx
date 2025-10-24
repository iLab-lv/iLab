import { RiSmartphoneLine, RiTabletLine, RiMacbookLine } from 'react-icons/ri';
import s from './Services.module.scss';

function iconFor(label = '', href = '') {
  const key = `${label} ${href}`.toLowerCase();
  if (key.includes('ipad')) return RiTabletLine;
  if (key.includes('macbook')) return RiMacbookLine;
  return RiSmartphoneLine; // default -> iPhone
}

export default function IphoneRemonts({
  idBase = 'services',
  title = 'Apple ierīču remonts',
  introHTML,
  links = [],
  imageSrc = '/images/home/apple.webp',
}) {
  const bid = `${idBase}-apple`;

  return (
    <article className={s.appleBlock} aria-labelledby={`${bid}-title`}>
      <div className={s.appleTop}>
        <div className={s.appleContent}>
          <h3 id={`${bid}-title`} className={s.blockTitle}>
            {title}
          </h3>
          <p className={s.blockIntro} dangerouslySetInnerHTML={{ __html: introHTML }} />
        </div>

        <div className={s.appleVisual} aria-hidden="true">
          <div className={s.visualStage}>
            <div className={s.visualPad} />
            <img className={s.deviceImg} src={imageSrc} alt="" />
          </div>
        </div>
      </div>

      {/* Full-width CTA row (3 columns desktop) */}
      <ul className={s.appleLinks} role="list" aria-label="Apple saīsnes">
        {links.map((l) => {
          const IconComp = iconFor(l.label, l.href) || RiSmartphoneLine; // safe fallback
          return (
            <li key={l.href}>
              <a className={s.appleLink} href={l.href}>
                <span className={s.linkIcon} aria-hidden="true">
                  <IconComp size={36} />
                </span>
                <span className={s.linkLabel}>{l.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
