import { getRelatedModelsCopy } from './relatedModels.i18n';
import RelatedModelsCarousel from './RelatedModelsCarousel';
import s from './RelatedModels.module.scss';

function localized(value, locale) {
  if (typeof value === 'string') return value;
  return value?.[locale] || value?.lv || '';
}

function getRelated(currentDevice, devices, baseHref, locale) {
  const currentYear = Number(currentDevice?.year);
  const hasYear = Number.isFinite(currentYear);

  return devices
    .filter((device) => {
      if (!device?.slug || device.slug === currentDevice?.slug) return false;
      if (device.categoryKey !== currentDevice?.categoryKey || device.brandKey !== currentDevice?.brandKey) return false;
      if ((device.seriesKey || '') !== (currentDevice?.seriesKey || '')) return false;
      if (!hasYear) return true;
      const year = Number(device.year);
      return Number.isFinite(year) && Math.abs(year - currentYear) <= 1;
    })
    .sort((a, b) => {
      const distanceA = hasYear ? Math.abs(Number(a.year) - currentYear) : 0;
      const distanceB = hasYear ? Math.abs(Number(b.year) - currentYear) : 0;
      if (distanceA !== distanceB) return distanceA - distanceB;
      if (Number(b.year || 0) !== Number(a.year || 0)) return Number(b.year || 0) - Number(a.year || 0);
      return Number(a.order || 9999) - Number(b.order || 9999);
    })
    .map((device) => ({
      slug: device.slug,
      name: localized(device.name, locale) || device.slug,
      image: device.image || '/images/placeholders/phone.webp',
      href: `${baseHref}/${device.slug}`,
    }));
}

export default function RelatedModels({ id = 'related-models', currentDevice, devices = [], baseHref, locale = 'lv' }) {
  const copy = getRelatedModelsCopy(locale);
  const models = getRelated(currentDevice, devices, baseHref, locale);
  if (!models.length) return null;

  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.container}>
        <header className={s.header}>
          <h2 id={`${id}-title`}>{copy.titleStart}<span>{copy.titleAccent}</span></h2>
          <p>{copy.intro}</p>
        </header>
        <RelatedModelsCarousel models={models} labels={copy} />
      </div>
    </section>
  );
}
