export const repairLabels = (locale = 'lv') => locale === 'ru' ? {
  model: 'Цена зависит от модели', request: 'Цена по запросу', diagnostic: 'Цена после диагностики',
  from: 'От', unconfigured: 'Цена не указана', service: 'Об услуге', models: 'Выбрать модель', prices: 'Смотреть цены', contact: 'Связаться с сервисом',
} : {
  model: 'Cena atkarīga no modeļa', request: 'Cena pēc pieprasījuma', diagnostic: 'Cena pēc diagnostikas',
  from: 'No', unconfigured: 'Cena nav norādīta', service: 'Par pakalpojumu', models: 'Izvēlēties modeli', prices: 'Skatīt cenas', contact: 'Sazināties ar servisu',
};

// Adapters supply verified destinations. This only orders, validates and deduplicates them.
export function resolveRepairActions(actions = [], locale = 'lv') {
  const priority = { model: 0, prices: 0, service: 1, contact: 2 };
  const labels = repairLabels(locale);
  const seen = new Set();
  return actions.filter(action => action && action.kind in priority &&
    typeof action.href === 'string' && /^(\/(?!\/)|#[\w-]+$|https:\/\/|tel:|mailto:)/.test(action.href))
    .sort((a, b) => priority[a.kind] - priority[b.kind])
    .filter(action => {
      if (seen.has(action.href)) return false;
      seen.add(action.href);
      return true;
    }).slice(0, 2).map(action => ({ ...action, label: action.label || labels[action.kind === 'model' ? 'models' : action.kind] }));
}

export function formatRepairAmount(value, { locale = 'lv', currency = 'EUR', isStartingFrom = false } = {}) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return repairLabels(locale).request;
  const formatted = new Intl.NumberFormat(locale === 'ru' ? 'ru-LV' : 'lv-LV', {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2,
  }).format(value);
  return isStartingFrom ? `${repairLabels(locale).from} ${formatted}` : formatted;
}

// Popular Repairs summarizes each repair with one lowest configured amount.
// Full variant lists and the authoritative model/selector data remain unchanged.
export function getRepairPriceLines(price, locale = 'lv', currency = 'EUR') {
  if (!price) return [];
  const labels = repairLabels(locale);
  if (price.kind === 'options') {
    const items = price.items.filter(item => item.isHidden !== true && item.isActive !== false);
    const available = items.filter(item => typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0);
    if (!available.length) return [{ value: labels.request, numeric: false }];
    const lowest = available.reduce((best, item) => item.price < best.price ? item : best);
    return [{ value: formatRepairAmount(lowest.price, { locale, currency, isStartingFrom: lowest.isStartingFrom || items.length > 1 }), numeric: true }];
  }
  if (price.kind === 'amount') return [{ value: formatRepairAmount(price.value, { locale, currency, isStartingFrom: price.isStartingFrom }), numeric: typeof price.value === 'number' && Number.isFinite(price.value) }];
  if (['model', 'request', 'diagnostic', 'unconfigured'].includes(price.kind)) return [{ value: price.label || labels[price.kind], numeric: false }];
  return [];
}
