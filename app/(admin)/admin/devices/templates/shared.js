export const CONTENT_FIELDS = [
  'h1',
  'metaTitle',
  'metaDescription',
  'bodyHtml',
];

export function cleanText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

export function escapeHtml(value) {
  return cleanText(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function includesBrand(deviceName, brandName) {
  const name = cleanText(deviceName).toLocaleLowerCase();
  const brand = cleanText(brandName).toLocaleLowerCase();

  return Boolean(name && brand && name.includes(brand));
}

export function isAppleProductName(deviceName) {
  return /^(iphone|ipad|macbook)\b/i.test(cleanText(deviceName));
}

export function getSeoDeviceName(deviceName, brandName) {
  const name = cleanText(deviceName);
  const brand = cleanText(brandName);

  if (!brand || includesBrand(name, brand) || isAppleProductName(name)) {
    return name;
  }

  return `${brand} ${name}`;
}

export function createTemplateContext({ deviceName, brandName }) {
  const name = cleanText(deviceName);

  return {
    deviceName: name,
    htmlDeviceName: escapeHtml(name),
    brandName: cleanText(brandName),
    seoDeviceName: getSeoDeviceName(name, brandName),
  };
}
