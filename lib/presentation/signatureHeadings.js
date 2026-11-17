// Presentation only: a heading is accented only when its complete copy matches.
// Plain source strings remain available to metadata, alt text and other consumers.
const accent = (text) => ({ accent: text });
export const headingText = (parts) => parts.map(part => typeof part === 'string' ? part : part.accent).join('');
const match = (title, candidates) => candidates.find(parts => headingText(parts) === title) || null;

export function getKnownHeroHeading(title, locale = 'lv') {
  const ru = locale === 'ru';
  const categories = ru
    ? [['Ремонт ', accent('iPhone'), ' в Риге'], [accent('Ремонт телефонов'), ' в Риге'], [accent('Ремонт планшетов'), ' в Риге'], [accent('Ремонт компьютеров'), ' в Риге'], ['Ремонт ', accent('Dyson'), ' в Риге'], [accent('Ремонт фотоаппаратов'), ' в Риге']]
    : [[accent('iPhone'), ' remonts Rīgā'], [accent('Telefonu remonts'), ' Rīgā'], [accent('Planšetdatoru remonts'), ' Rīgā'], [accent('Datoru remonts'), ' Rīgā'], [accent('Dyson'), ' remonts Rīgā'], [accent('Fotoaparātu remonts'), ' Rīgā']];
  const services = ru ? [
    'Замена экрана', 'Замена батареи', 'Замена задней крышки',
    'Замена разъёма зарядки', 'Ремонт камеры', 'Ремонт динамика и микрофона',
  ] : [
    'ekrāna maiņa', 'baterijas maiņa', 'aizmugures vāciņa maiņa',
    'uzlādes ligzdas maiņa', 'kameras remonts', 'skaļruņa un mikrofona remonts',
  ];
  const candidates = [...categories];
  for (const device of ru ? ['iPhone', 'телефона'] : ['iPhone', 'Telefonu']) {
    for (const service of services) {
      const phrase = service;
      candidates.push(ru ? [accent(phrase), ` ${device} в Риге`] : [`${device} `, accent(phrase), ' Rīgā']);
    }
  }
  candidates.push(...(ru ? [
    [accent('Диагностика'), ' iPhone после воды в Риге'],
    [accent('Ремонт телефона после попадания влаги'), ' в Риге'],
    [accent('Микропайка'), ' и ремонт платы iPhone в Риге'],
  ] : [
    ['iPhone ūdens bojājumu ', accent('diagnostika'), ' Rīgā'],
    ['Telefonu ', accent('ūdens bojājumu remonts'), ' Rīgā'],
    ['Telefonu ', accent('skaļruņu un mikrofona remonts'), ' Rīgā'],
    [accent('Mikrolodēšana'), ' un iPhone plates remonts Rīgā'],
  ]));
  return match(title, candidates);
}

export function getIdentityHeading(title, identity, locale = 'lv', kind = 'model') {
  if (typeof title !== 'string' || typeof identity !== 'string' || !identity.trim()) return null;
  const names = locale === 'ru'
    ? ['Ремонт ', 'Ремонт телефонов ', 'Ремонт планшетов ', 'Ремонт компьютеров '].map(prefix => [prefix, accent(identity), ' в Риге'])
    : [' remonts', ' remonts Rīgā', ...(kind === 'brand' ? [' telefonu remonts Rīgā', ' planšetdatoru remonts Rīgā', ' datoru remonts Rīgā'] : [])].map(suffix => [accent(identity), suffix]);
  const exact = match(title, names);
  if (exact) return exact;
  // Canonical keys can be lowercase (e.g. "ipad") while display labels include
  // a manufacturer ("Apple iPad"). Match the WHOLE known template, then retain
  // the source spelling of every fragment. Never search arbitrary title text.
  const template = names.find(parts => headingText(parts).toLowerCase() === title.toLowerCase());
  if (!template) return null;
  let offset = 0;
  return template.map(part => {
    const length = (typeof part === 'string' ? part : part.accent).length;
    const original = title.slice(offset, offset + length);
    offset += length;
    return typeof part === 'string' ? original : accent(original);
  });
}

export function getWhyHeading(title) {
  return match(title, ['Kāpēc ', 'Почему ', 'Kāpēc klienti izvēlas ', 'Почему клиенты выбирают '].map(start => [start, accent('iLab?')]));
}
