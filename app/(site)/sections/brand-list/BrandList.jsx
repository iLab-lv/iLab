// @sections/brand-list/BrandList.jsx
import Link from 'next/link';
import Button from '@components/button/Button';
import s from './BrandList.module.scss';

const APPLE_SLUGS = ['macbook', 'imac', 'mac-pro'];

export default function BrandList({
  id = 'brand-list',
  basePath,
  appleTitle,
  appleIntro,
  otherTitle,
  otherIntro,
  brands = [],
}) {
  const appleBrands = brands.filter((b) => APPLE_SLUGS.includes(b.brandSlug));
  const otherBrands = brands.filter((b) => !APPLE_SLUGS.includes(b.brandSlug));

  const appleHeadingId = `${id}-apple-heading`;
  const otherHeadingId = `${id}-other-heading`;

  return (
    <section id={id} className={s.section} aria-labelledby={appleHeadingId}>
      <div className={s.container}>
        {/* Apple block */}
        <div className={s.block}>
          <h2 id={appleHeadingId} className={s.h2}>
            {appleTitle}
          </h2>
          <p className={s.leadText}>{appleIntro}</p>

          <div className={s.appleButtons}>
            {appleBrands.map((brand) => (
              <Button
                key={brand.brandSlug}
                href={`${basePath}/${brand.brandSlug}`}
                className={s.appleButton}
              >
                {brand.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Other brands block */}
        {otherBrands.length > 0 && (
          <div className={s.block}>
            <h2 id={otherHeadingId} className={s.h2}>
              {otherTitle}
            </h2>
            <p className={s.leadText}>{otherIntro}</p>

            <ul className={s.brandGrid} aria-label="Citu datoru zīmolu saraksts">
              {otherBrands.map((brand) => (
                <li key={brand.brandSlug} className={s.brandItem}>
                  <Link
                    href={`${basePath}/${brand.brandSlug}`}
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
