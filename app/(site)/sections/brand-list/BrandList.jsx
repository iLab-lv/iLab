import Link from 'next/link';
import DeviceButton from '@components/button/DeviceButton';
import s from './BrandList.module.scss';

const APPLE_SLUGS = ['macbook', 'imac', 'mac-pro'];

const APPLE_DEVICE_MAP = {
  macbook: 'laptop',
  imac: 'imac',
  'mac-pro': 'station',
};

function pickLocalized(value, locale = 'lv', fallback = '') {
  if (value == null) return fallback;

  if (typeof value === 'string') return value || fallback;

  if (typeof value === 'object') {
    return (
      value?.[locale] ??
      value?.lv ??
      Object.values(value).find(Boolean) ??
      fallback
    );
  }

  return fallback;
}

function normalizeBrand(brand, locale = 'lv') {
  const slug = brand?.brandSlug || brand?.key || '';
  const name =
    brand?.name ||
    pickLocalized(brand?.labels, locale, slug);

  return {
    ...brand,
    slug,
    name,
  };
}

export default function BrandList({
  id = 'brand-list',
  basePath,
  appleTitle,
  appleIntro,
  otherTitle,
  otherIntro,
  brands = [],
  locale = 'lv',
}) {
  const normalizedBrands = brands
    .map((brand) => normalizeBrand(brand, locale))
    .filter((brand) => brand.slug);

  const appleBrands = normalizedBrands.filter((b) =>
    APPLE_SLUGS.includes(b.slug)
  );

  const otherBrands = normalizedBrands.filter(
    (b) => !APPLE_SLUGS.includes(b.slug)
  );

  const appleHeadingId = `${id}-apple-heading`;
  const otherHeadingId = `${id}-other-heading`;

  return (
    <section id={id} className={s.section} aria-labelledby={appleHeadingId}>
      <div className={s.container}>
        <div className={s.appleBlock}>
          <div className={s.appleText}>
            <h2 id={appleHeadingId} className={s.h2}>
              {appleTitle}
            </h2>

            <p className={s.leadText}>{appleIntro}</p>
          </div>

          {appleBrands.length > 0 && (
            <ul className={s.appleButtons} role="list" aria-label="Apple datoru zīmoli">
              {appleBrands.map((brand) => (
                <li key={brand.slug}>
                  <DeviceButton
                    href={`${basePath}/${brand.slug}`}
                    label={brand.name}
                    device={APPLE_DEVICE_MAP[brand.slug] || 'laptop'}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {otherBrands.length > 0 && (
          <div className={s.block}>
            <h2 id={otherHeadingId} className={s.h2}>
              {otherTitle}
            </h2>

            <p className={s.leadText}>{otherIntro}</p>

            <ul className={s.brandGrid} aria-label="Citu datoru zīmolu saraksts">
              {otherBrands.map((brand) => (
                <li key={brand.slug} className={s.brandItem}>
                  <Link
                    href={`${basePath}/${brand.slug}`}
                    className={s.brandLink}
                  >
                    {brand.logo ? (
                      <span className={s.logoWrap}>
                        <img
                          src={brand.logo}
                          alt={`${brand.name} datoru remonts`}
                          className={s.logo}
                          loading="lazy"
                        />
                      </span>
                    ) : (
                      <span className={s.brandNameFallback}>{brand.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}