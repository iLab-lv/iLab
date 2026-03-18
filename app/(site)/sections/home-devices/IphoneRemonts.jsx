import DeviceButton from '@components/button/DeviceButton';
import s from './Services.module.scss';

export default function IphoneRemonts({
  idBase = 'services',
  title = 'Apple ierīču remonts',
  introHTML,
  links = [],
  imageSrc = '/images/home/apple.webp',
}) {
  const bid = `${idBase}-apple`;

  const topLinks = links.filter((link) => link.group === 'mobile');
  const bottomLinks = links.filter((link) => link.group === 'computer');

  return (
    <article className={s.appleBlock} aria-labelledby={`${bid}-title`}>
      <div className={s.appleTop}>
        <div className={s.appleContent}>
          <h3 id={`${bid}-title`} className={s.blockTitle}>
            {title}
          </h3>

          <p
            className={s.blockIntro}
            dangerouslySetInnerHTML={{ __html: introHTML }}
          />
        </div>

        <div className={s.appleVisual} aria-hidden="true">
          <div className={s.visualStage}>
            <div className={s.visualPad} />
            <img className={s.deviceImg} src={imageSrc} alt="" />
          </div>
        </div>
      </div>

      {!!topLinks.length && (
        <ul className={s.appleLinksTop} role="list" aria-label="Apple mobilo ierīču saīsnes">
          {topLinks.map((link) => (
            <li key={link.href}>
              <DeviceButton
                href={link.href}
                label={link.label}
                device={link.device || 'phone'}
              />
            </li>
          ))}
        </ul>
      )}

      {!!bottomLinks.length && (
        <ul className={s.appleLinksBottom} role="list" aria-label="Apple datoru saīsnes">
          {bottomLinks.map((link) => (
            <li key={link.href}>
              <DeviceButton
                href={link.href}
                label={link.label}
                device={link.device || 'laptop'}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}