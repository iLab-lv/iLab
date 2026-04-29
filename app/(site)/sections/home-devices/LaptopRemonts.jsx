import Image from 'next/image';
import s from './Services.module.scss';

export default function LaptopRemonts({
  idBase = 'services',
  title,
  bodyHTML,
  href,
  linkLabel = 'Apskatīt →',
  imageSrc = '/images/home/laptop.webp',
}) {
  const bid = `${idBase}-pc`;

  return (
    <article className={`${s.halfCard} ${s.halfStack}`} aria-labelledby={`${bid}-title`}>
      <h3 id={`${bid}-title`} className={s.cardTitle}>
        {title}
      </h3>

      <div className={`${s.stackVisual} ${s.withHalo}`} aria-hidden="true">
        <div className={s.visualPad} />
        <Image
          className={s.deviceImg}
          src={imageSrc}
          alt=""
          width={360}
          height={225}
          sizes="(max-width: 1024px) 100vw, 360px"
        />
      </div>

      <p className={s.cardText} dangerouslySetInnerHTML={{ __html: bodyHTML }} />

      <a className={s.cardLink} href={href}>
        {linkLabel}
      </a>
    </article>
  );
}