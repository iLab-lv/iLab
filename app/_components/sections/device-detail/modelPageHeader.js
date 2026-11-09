export function getModelPriceCta(locale = 'lv', hasPrices = true) {
  return hasPrices
    ? { label: locale === 'ru' ? 'Смотреть цены' : 'Skatīt cenas', targetId: 'cenas' }
    : null;
}
