import Image from 'next/image';
import s from './Services.module.scss';

export default function AppleRemonts({
  idBase = 'services',
  title = 'Apple ierīču remonts',
  introHTML,
  links = [],
  imageSrc = '/images/home/apple.png', // your temp image
}) {
  const bid = `${idBase}-apple`;

  return (
    <article className={s.appleBlock} aria-labelledby={`${bid}-title`}>
      {/* Row 1: content + visual */}
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
            <Image
              className={s.deviceImg}
              src={imageSrc}
              alt=""
              width={560}
              height={360}
              sizes="(max-width: 1024px) 100vw, 460px"
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* Row 2: full-width CTA grid */}
      {links?.length > 0 && (
        <ul className={s.appleLinks} role="list" aria-label="Apple saīsnes">
          {links.map((l) => (
            <li key={l.href}>
              <a className={s.appleLink} href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
