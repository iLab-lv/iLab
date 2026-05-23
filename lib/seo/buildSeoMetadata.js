const SITE_URL = 'https://www.ilab.lv';

const SITE_NAME = 'iLab';

const DEFAULT_TITLE = 'iLab — telefonu, datoru un Dyson remonts Rīgā';

const DEFAULT_DESCRIPTION =
  'iLab serviss Rīgā — telefonu, planšetdatoru, datoru un Dyson ierīču diagnostika, remonts un detaļu maiņa. 90 dienu garantija, filiāles Domina Shopping un Spice Life.';

const DEFAULT_OG_IMAGE = '/images/og/ilab-og.webp';

const DEFAULT_OG_IMAGE_ALT = 'iLab serviss Rīgā';

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

function normalizePath(path = '/') {
  if (!path) {
    return '/';
  }

  if (path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function absoluteUrl(path = '/') {
  if (!path) {
    return SITE_URL;
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = normalizePath(path);

  return `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
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

  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,

  type = 'website',
  noIndex = false,
} = {}) {
  const safeLvPath = normalizePath(lvPath);
  const safeRuPath = normalizePath(ruPath);
  const canonicalPath = getCanonicalPath(locale, safeLvPath, safeRuPath);

  const canonicalUrl = absoluteUrl(canonicalPath);
  const lvUrl = absoluteUrl(safeLvPath);
  const ruUrl = absoluteUrl(safeRuPath);
  const imageUrl = absoluteUrl(image);

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
          alt: imageAlt,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
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