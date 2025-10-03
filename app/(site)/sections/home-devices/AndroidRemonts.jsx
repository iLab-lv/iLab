// app/(site)/sections/home-devices/AndroidRemonts.jsx
import s from './Services.module.scss';

export default function AndroidRemonts({
  idBase = 'services',
  title = 'Android — Telefonu un planšetdatoru remonts',
  introHTML,
  brands = [],
  allBrandsHref = '/telefonu-remonts',
  imageSrc = '/images/home/android.png',
}) {
  const bid = `${idBase}-android`;

  // map brand name -> logo in /public/images/home
  const logoMap = {
    samsung: '/images/home/samsung-logo.svg',
    xiaomi: '/images/home/xiaomi-logo.svg',
    huawei: '/images/home/huawei-logo.svg',
  };

  const normalizedBrands = brands.map((b) => {
    const key = (b.name || '').toLowerCase();
    return {
      ...b,
      logoSrc: b.logoSrc || logoMap[key] || '/images/home/android-badge.png',
    };
  });

  return (
    <article className={s.androidBlock} aria-labelledby={`${bid}-title`}>
      <div className={s.androidGrid}>
        <div>
          <h3 id={`${bid}-title`} className={s.blockTitle}>
            {title}
          </h3>
          <p className={s.blockIntro} dangerouslySetInnerHTML={{ __html: introHTML }} />
        </div>

        <div className={s.androidVisual} aria-hidden="true">
          <div className={s.visualStage}>
            <div className={s.visualPad} />
            <img className={s.deviceImg} src={imageSrc} alt="" />
          </div>
        </div>
      </div>

      {/* Brand grid */}
      <ul className={s.brandGrid} role="list" aria-label="Android zīmoli">
        {normalizedBrands.map((b) => (
          <li key={b.name} className={s.brandTile}>
            <a className={s.brandTitleLink} href={b.hrefTitle}>
              {b.name}
            </a>

            {/* Logo BELOW the brand name */}
            <div className={s.brandMarkWrap} aria-hidden="true">
              <img className={s.brandMark} src={b.logoSrc} alt="" />
            </div>

            <div className={s.brandLinks}>
              <a href={b.phoneHref}>{b.phoneLabel}</a>
              <span aria-hidden="true">·</span>
              <a href={b.tabletHref}>{b.tabletLabel}</a>
            </div>
          </li>
        ))}
      </ul>

      <div className={s.androidMore}>
        <a className={s.cardLink} href={allBrandsHref}>
          Skatīt visus zīmolus →
        </a>
      </div>
    </article>
  );
}
