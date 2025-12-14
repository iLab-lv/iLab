// app/(site)/components/service-pricelist/BrandPickerPricelist.jsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';
import styles from './BrandPickerPricelist.module.scss';

export default function BrandPickerPricelist({
  devices,
  pricing,
  brandOptions, // [{ slug, name }]
  defaultBrand,
  categorySlug = 'telefonu-remonts',
  serviceIds = [],
  title,
  intro,
  allModelsHref,
  cta,
  className,
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const initialBrand = (
    sp.get('brand') ||
    defaultBrand ||
    brandOptions?.[0]?.slug ||
    ''
  ).toLowerCase();

  const [brand, setBrand] = useState(initialBrand);

  // keep URL in sync (?brand=…)
  useEffect(() => {
    const cur = sp.get('brand');
    if (brand && cur !== brand) {
      const params = new URLSearchParams(sp.toString());
      params.set('brand', brand);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const brandList = useMemo(() => {
    if (!brandOptions?.length) return null;

    return (
      <div className={styles.brandTabs} role="tablist" aria-label="Zīmola izvēle">
        {brandOptions.map((b) => {
          const active = brand === b.slug;
          return (
            <button
              key={b.slug}
              type="button"
              role="tab"
              aria-selected={active}
              className={`${styles.tab} ${active ? styles.active : ''}`}
              onClick={() => setBrand(b.slug)}
            >
              {b.name}
            </button>
          );
        })}
      </div>
    );
  }, [brand, brandOptions]);

  return (
    <>
      {brandList}

      <ServicePricelist
        devices={devices}
        pricing={pricing}
        brandSlug={brand}
        categorySlug={categorySlug}
        serviceIds={serviceIds}
        title={title}
        intro={intro}
        viewAllHref={allModelsHref}
        cta={cta}
        className={className}
      />
    </>
  );
}
