import { SITE_URL } from '../../app/data/site.config.js';

const SITE_NAME = 'iLab';

const DEFAULT_TITLE = 'iLab — telefonu, datoru un Dyson remonts Rīgā';

const DEFAULT_DESCRIPTION =
  'iLab serviss Rīgā — telefonu, planšetdatoru, datoru un Dyson ierīču diagnostika, remonts un detaļu maiņa. 90 dienu garantija, filiāles Domina Shopping un Spice Life.';

export const DEFAULT_OG_IMAGES = Object.freeze({
  lv: '/images/og/ilab-serviss-og.png',
  ru: '/images/og/ilab-serviss-og-ru.png',
});

const LEGACY_DEFAULT_OG_IMAGE = '/images/og/home.jpg';

const DEFAULT_OG_IMAGE_ALTS = Object.freeze({
  lv: 'iLab mobilo ierīču serviss Rīgā',
  ru: 'Сервис мобильных устройств iLab в Риге',
});

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

export function getDefaultOgImage(locale = 'lv') {
  return locale === 'ru' ? DEFAULT_OG_IMAGES.ru : DEFAULT_OG_IMAGES.lv;
}

export function getDefaultOgImageAlt(locale = 'lv') {
  return locale === 'ru' ? DEFAULT_OG_IMAGE_ALTS.ru : DEFAULT_OG_IMAGE_ALTS.lv;
}

function stripTrailingSlash(value = '') {
  return String(value).replace(/\/+$/, '');
}

const ORIGIN = stripTrailingSlash(SITE_URL);

function normalizePath(path = '/') {
  if (!path) {
    return '/';
  }

  const value = String(path).trim();

  if (!value) {
    return '/';
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value === '/') {
    return '/';
  }

  return value.startsWith('/') ? value : `/${value}`;
}

export function absoluteUrl(path = '/') {
  if (!path) {
    return `${ORIGIN}/`;
  }

  const value = String(path).trim();

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const normalizedPath = normalizePath(value);

  if (normalizedPath === '/') {
    return `${ORIGIN}/`;
  }

  return `${ORIGIN}${normalizedPath}`;
}

function getCanonicalPath(locale = 'lv', lvPath = '/', ruPath = '/ru') {
  return locale === 'ru' ? ruPath : lvPath;
}

function getOpenGraphLocale(locale = 'lv') {
  return locale === 'ru' ? 'ru_RU' : 'lv_LV';
}

function getAlternateOpenGraphLocale(locale = 'lv') {
  return locale === 'ru' ? ['lv_LV'] : ['ru_RU'];
}

export function buildSeoMetadata({
  locale = 'lv',

  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,

  lvPath = '/',
  ruPath = '/ru',

  image,
  imageAlt,

  type = 'website',
  noIndex = false,

  publishedTime,
  modifiedTime,
  authors,
} = {}) {
  const safeLvPath = normalizePath(lvPath);
  const safeRuPath = normalizePath(ruPath);
  const canonicalPath = getCanonicalPath(locale, safeLvPath, safeRuPath);

  const canonicalUrl = absoluteUrl(canonicalPath);
  const lvUrl = absoluteUrl(safeLvPath);
  const ruUrl = absoluteUrl(safeRuPath);
  const resolvedImage =
    !image || image === LEGACY_DEFAULT_OG_IMAGE
      ? getDefaultOgImage(locale)
      : image;
  const imageUrl = absoluteUrl(resolvedImage);
  const resolvedImageAlt = imageAlt || getDefaultOgImageAlt(locale);

  const metadata = {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        lv: lvUrl,
        ru: ruUrl,
        'x-default': lvUrl,
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: getOpenGraphLocale(locale),
      alternateLocale: getAlternateOpenGraphLocale(locale),
      type,
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: resolvedImageAlt,
        },
      ],
      publishedTime,
      modifiedTime,
      authors,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: resolvedImageAlt,
        },
      ],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
