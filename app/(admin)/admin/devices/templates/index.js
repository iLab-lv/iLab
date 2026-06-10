import { createIphoneTemplate } from './iphone';
import { createNotebookTemplate } from './notebook';
import { createPhoneTemplate } from './phone';
import { createTabletTemplate } from './tablet';
import { CONTENT_FIELDS, cleanText, createTemplateContext } from './shared';

const TEMPLATE_FACTORIES = {
  iphone: createIphoneTemplate,
  phone: createPhoneTemplate,
  tablet: createTabletTemplate,
  notebook: createNotebookTemplate,
};

// Keep category aliases here so template routing is easy to adjust when
// category slugs or labels change in the admin taxonomy.
const CATEGORY_ALIASES = {
  phone: [
    'phone',
    'phones',
    'smartphone',
    'smartphones',
    'telefon',
    'telefoni',
    'telefonu',
    'телефон',
    'смартфон',
  ],
  tablet: [
    'tablet',
    'tablets',
    'planšet',
    'planset',
    'планшет',
  ],
  notebook: [
    'notebook',
    'notebooks',
    'laptop',
    'laptops',
    'portable computer',
    'portatīv',
    'portativ',
    'ноутбук',
  ],
};

function containsAlias(value, aliases) {
  const normalized = cleanText(value).toLocaleLowerCase();
  return aliases.some((alias) => normalized.includes(alias));
}

function getCategorySearchText(category) {
  return [
    category?.slug,
    category?.labels?.lv,
    category?.labels?.ru,
  ]
    .filter(Boolean)
    .join(' ');
}

function getBrandSearchText(brand) {
  return [brand?.key, brand?.labels?.lv, brand?.labels?.ru]
    .filter(Boolean)
    .join(' ');
}

export function resolveDeviceTemplateKey({ deviceName, category, brand }) {
  const name = cleanText(deviceName);
  const categoryText = getCategorySearchText(category);
  const brandText = getBrandSearchText(brand);

  if (/^iphone\b/i.test(name)) return 'iphone';
  if (/^ipad\b/i.test(name)) return 'tablet';
  if (/^macbook\b/i.test(name)) return 'notebook';

  if (containsAlias(categoryText, CATEGORY_ALIASES.tablet)) return 'tablet';
  if (containsAlias(categoryText, CATEGORY_ALIASES.notebook)) return 'notebook';

  if (
    containsAlias(categoryText, CATEGORY_ALIASES.phone) &&
    /apple/i.test(brandText) &&
    /iphone/i.test(name)
  ) {
    return 'iphone';
  }

  if (containsAlias(categoryText, CATEGORY_ALIASES.phone)) return 'phone';

  return null;
}

export function createDeviceContentTemplate({ deviceName, category, brand }) {
  const templateKey = resolveDeviceTemplateKey({
    deviceName,
    category,
    brand,
  });

  if (!templateKey) return null;

  const factory = TEMPLATE_FACTORIES[templateKey];
  const brandName = brand?.labels?.lv || brand?.labels?.ru || brand?.key || '';
  const context = createTemplateContext({ deviceName, brandName });

  return {
    key: templateKey,
    content: factory(context),
  };
}

export function fillEmptyDeviceContent(item, templateContent) {
  if (!templateContent) return item;

  const next = { ...item };

  for (const field of CONTENT_FIELDS) {
    next[field] = {
      ...(item[field] || {}),
      lv: cleanText(item[field]?.lv) ? item[field].lv : templateContent.lv[field],
      ru: cleanText(item[field]?.ru) ? item[field].ru : templateContent.ru[field],
    };
  }

  return next;
}
