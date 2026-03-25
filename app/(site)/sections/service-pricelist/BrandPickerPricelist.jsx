'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ServicePricelist from '@sections/service-pricelist/ServicePricelist';
import styles from './BrandPickerPricelist.module.scss';

function normalizeBrandName(slug, name) {
  const s = String(slug || '').toLowerCase();
  const n = String(name || '').trim();

  if (s === 'ipad' || n.toLowerCase() === 'ipad') return 'iPad';
  if (s === 'iphone' || n.toLowerCase() === 'iphone') return 'iPhone';
  if (s === 'macbook' || n.toLowerCase() === 'macbook') return 'MacBook';

  return n || name || '';
}

function norm(v) {
  return String(v ?? '').toLowerCase().trim();
}

function getStrings(locale = 'lv') {
  if (locale === 'ru') {
    return {
      brandPickerLabel: 'Выбор бренда',
    };
  }

  return {
    brandPickerLabel: 'Zīmola izvēle',
  };
}

export default function BrandPickerPricelist({
  devices,
  pricing = {},
  brandOptions,
  defaultBrand,
  categorySlug = 'telefonu-remonts',
  serviceIds,
  serviceMeta = {},
  title,
  intro,
  allModelsHref,
  cta,
  className,
  locale = 'lv',
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const strings = getStrings(locale);

  const activeBrand =
    norm(sp.get('brand')) || norm(defaultBrand) || norm(brandOptions?.[0]?.slug) || '';

  const serviceIdsArr = useMemo(
    () => (Array.isArray(serviceIds) ? serviceIds : []),
    [serviceIds]
  );

  const brandList = useMemo(() => {
    if (!brandOptions?.length) return null;

    return (
      <div className={styles.brandTabs} role="tablist" aria-label={strings.brandPickerLabel}>
        {brandOptions.map((b) => {
          const slug = norm(b.slug);
          const active = activeBrand === slug;
          const label = normalizeBrandName(slug, b.name);

          return (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={active}
              className={`${styles.tab} ${active ? styles.active : ''}`}
              onClick={() => {
                const params = new URLSearchParams(sp.toString());
                params.set('brand', slug);
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }, [activeBrand, brandOptions, router, sp, strings.brandPickerLabel]);

  const catKey = norm(categorySlug);

  const filteredPricing = useMemo(() => {
    const out = {};

    for (const [modelId, entry] of Object.entries(pricing || {})) {
      const items = Array.isArray(entry?.items) ? entry.items : [];

      const nextItems = items
        .filter((item) => {
          if (!serviceIdsArr.length) return true;
          return serviceIdsArr.includes(item.id);
        })
        .filter((item) => {
          if (!catKey || catKey === 'all') return true;

          const metaCategory = serviceMeta?.[item.id]?.categoryId || '';
          const itemCategory = item?.categoryId || metaCategory || '';
          return String(itemCategory).toLowerCase().trim() === catKey;
        })
        .map((item) => ({
          id: item.id,
          price:
            typeof item.price === 'number' && Number.isFinite(item.price)
              ? item.price
              : null,
          isStartingFrom: item.isStartingFrom === true,
        }));

      out[modelId] = { items: nextItems };
    }

    return out;
  }, [pricing, serviceIdsArr, catKey, serviceMeta]);

  const servicePricelistCategorySlug = catKey === 'all' ? '' : categorySlug;

  return (
    <>
      {brandList}

      <ServicePricelist
        devices={devices}
        pricing={filteredPricing}
        serviceMeta={serviceMeta}
        brandSlug={activeBrand}
        categorySlug={servicePricelistCategorySlug}
        serviceIds={serviceIdsArr}
        title={title}
        intro={intro}
        viewAllHref={allModelsHref}
        cta={cta}
        className={className}
        locale={locale}
      />
    </>
  );
}