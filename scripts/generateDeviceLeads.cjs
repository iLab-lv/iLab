/*
 * Generates reviewed LV/RU PageHeader leads from the current Firestore export.
 *
 * Usage:
 *   node scripts/generateDeviceLeads.cjs
 *
 * Optional env:
 *   DEVICE_EXPORT_PATH=tmp/devices.export.json
 *   DEVICE_LEADS_PATH=tmp/devices.leads.json
 */

const fs = require('fs');
const path = require('path');

const INPUT_PATH = process.env.DEVICE_EXPORT_PATH || 'tmp/devices.export.json';
const OUTPUT_PATH = process.env.DEVICE_LEADS_PATH || 'tmp/devices.leads.json';
const MIN_WORDS = 20;
const MAX_WORDS = 30;

const BRAND_LABELS = {
  apple: 'Apple',
  huawei: 'Huawei',
  ipad: 'iPad',
  macbook: 'MacBook',
  samsung: 'Samsung',
  xiaomi: 'Xiaomi',
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8'));
}

function wordCount(value) {
  return String(value).trim().split(/\s+/u).filter(Boolean).length;
}

function modelLabel(device) {
  const name = String(device.name || '').trim();
  const brand = BRAND_LABELS[device.brandKey] || '';

  if (!name) throw new Error(`Device ${device.id} is missing name`);
  if (!brand || name.toLocaleLowerCase().includes(brand.toLocaleLowerCase())) return name;

  return `${brand} ${name}`;
}

function buildLead(device) {
  const model = modelLabel(device);

  if (device.categoryKey === 'telefonu-remonts') {
    return {
      lv: `${model} remonts Rīgā: pārbaudām ekrānu, bateriju, uzlādi, kameru un citus bojājumus, pēc diagnostikas saskaņojot piemērotāko risinājumu un cenu pirms darba.`,
      ru: `Ремонт ${model} в Риге: проверяем экран, аккумулятор, зарядку, камеру и другие неисправности, после диагностики согласовывая подходящее решение и стоимость до начала работы.`,
    };
  }

  if (device.categoryKey === 'plansetdatoru-remonts') {
    return {
      lv: `${model} planšetdatora remonts Rīgā: pārbaudām ekrānu, bateriju, uzlādi un citus bojājumus, pēc diagnostikas saskaņojot piemērotāko risinājumu un cenu pirms darba.`,
      ru: `Ремонт планшета ${model} в Риге: проверяем экран, аккумулятор, зарядку и другие неисправности, после диагностики согласовывая подходящее решение и стоимость до начала работы.`,
    };
  }

  if (device.categoryKey === 'datoru-remonts') {
    return {
      lv: `${model} remonts Rīgā: pārbaudām ekrānu, bateriju, uzlādi, tastatūru un sistēmas darbību, pēc diagnostikas saskaņojot piemērotāko risinājumu un cenu pirms darba.`,
      ru: `Ремонт ${model} в Риге: проверяем экран, аккумулятор, зарядку, клавиатуру и работу системы, после диагностики согласовывая подходящее решение и стоимость до начала работы.`,
    };
  }

  throw new Error(`Unsupported category ${device.categoryKey} for ${device.id}`);
}

function validateItem(item) {
  if (!item.id || !item.name || !item.lead) throw new Error('Invalid generated lead item');

  for (const locale of ['lv', 'ru']) {
    const value = item.lead[locale];
    const count = wordCount(value);

    if (!value || count < MIN_WORDS || count > MAX_WORDS) {
      throw new Error(`${item.id}.lead.${locale} has ${count} words; expected ${MIN_WORDS}-${MAX_WORDS}`);
    }

    if (!value.includes(item.name)) {
      throw new Error(`${item.id}.lead.${locale} does not contain exact device name: ${item.name}`);
    }
  }
}

const exported = readJson(INPUT_PATH);
if (!exported || exported.collection !== 'devices' || !Array.isArray(exported.items)) {
  throw new Error(`${INPUT_PATH} must be a devices export with an items array`);
}

const items = exported.items.map((device) => ({
  id: device.id,
  slug: device.slug,
  name: device.name,
  brandKey: device.brandKey,
  categoryKey: device.categoryKey,
  lead: buildLead(device),
}));

for (const item of items) validateItem(item);

const counts = items.flatMap((item) => [wordCount(item.lead.lv), wordCount(item.lead.ru)]);
const payload = {
  generatedAt: new Date().toISOString(),
  source: path.normalize(INPUT_PATH),
  collection: 'devices',
  count: items.length,
  validation: {
    locales: ['lv', 'ru'],
    minimumWords: MIN_WORDS,
    maximumWords: MAX_WORDS,
    shortestLead: Math.min(...counts),
    longestLead: Math.max(...counts),
  },
  items,
};

const outputPath = path.resolve(OUTPUT_PATH);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8');

console.log(`Generated and validated ${items.length} localized device leads.`);
console.log(`Word range: ${payload.validation.shortestLead}-${payload.validation.longestLead}`);
console.log(`Saved to: ${outputPath}`);

