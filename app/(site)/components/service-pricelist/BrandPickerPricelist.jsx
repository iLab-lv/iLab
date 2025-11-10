'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ServicePricelist from '@components/service-pricelist/ServicePricelist';

export default function BrandPickerPricelist({
  devices,
  pricing,
  brandOptions,     // [{ slug, name }]
  defaultBrand,     // 'samsung' (or first available)
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

  const initialBrand = (sp.get('brand') || defaultBrand || brandOptions?.[0]?.slug || '').toLowerCase();
  const [brand, setBrand] = useState(initialBrand);

  // keep URL in sync (shareable ?brand=…)
  useEffect(() => {
    const cur = sp.get('brand');
    if (brand && cur !== brand) {
      const params = new URLSearchParams(sp.toString());
      params.set('brand', brand);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const selectEl = useMemo(() => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
      <label htmlFor="brandSelect" className="sr-only">Zīmols</label>
      <select
        id="brandSelect"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        style={{
          padding: '10px 12px',
          borderRadius: 12,
          border: '1px solid rgba(0,0,0,.1)',
          fontSize: 16,
        }}
      >
        {brandOptions.map((b) => (
          <option key={b.slug} value={b.slug}>{b.name}</option>
        ))}
      </select>
    </div>
  ), [brand, brandOptions]);

  return (
    <>
      {selectEl}

      <ServicePricelist
        devices={devices}
        pricing={pricing}
        brandSlug={brand}             // ← crucial
        categorySlug={categorySlug}
        serviceIds={serviceIds}
        title={title}
        intro={intro}
        allModelsHref={allModelsHref}
        cta={cta}
        className={className}
      />
    </>
  );
}
