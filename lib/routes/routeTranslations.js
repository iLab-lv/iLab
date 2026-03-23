// lib/routes/routeTranslations.js

/**
 * Canonical keys = your current internal keys used in:
 * - contentRegistry
 * - categoryContent
 * - categories
 * - services
 *
 * Localized values = public URL slugs.
 */

export const ROUTE_TRANSLATIONS = {
    categories: {
        'iphone-remonts': {
            lv: 'iphone-remonts',
            ru: 'remont-iphone',
        },
        'telefonu-remonts': {
            lv: 'telefonu-remonts',
            ru: 'remont-telefonov',
        },
        'plansetdatoru-remonts': {
            lv: 'plansetdatoru-remonts',
            ru: 'remont-planshetov',
        },
        'datoru-remonts': {
            lv: 'datoru-remonts',
            ru: 'remont-noutbukov',
        },
        'dyson-remonts': {
            lv: 'dyson-remonts',
            ru: 'remont-dyson',
        },
    },

    info: {
        'par-mums': {
            lv: 'par-mums',
            ru: 'o-nas',
        },
        kontakti: {
            lv: 'kontakti',
            ru: 'kontakty',
        },
        cenas: {
            lv: 'cenas',
            ru: 'ceny',
        },
        buj: {
            lv: 'buj',
            ru: 'faq',
        },
        noteikumi: {
            lv: 'noteikumi',
            ru: 'pravila',
        },
        'privatum-politika': {
            lv: 'privatum-politika',
            ru: 'politika-konfidencialnosti',
        },
    },

    services: {
        'baterijas-maina': {
            lv: 'baterijas-maina',
            ru: 'zamena-batarei',
        },
        'ekrana-maina': {
            lv: 'ekrana-maina',
            ru: 'zamena-ekrana',
        },
        'kameras-remonts': {
            lv: 'kameras-remonts',
            ru: 'remont-kamery',
        },
        'skalruni-mikrofona-remonts': {
            lv: 'skalruni-mikrofona-remonts',
            ru: 'remont-dinamika-mikrofona',
        },
        'udens-bojajumu-remonts': {
            lv: 'udens-bojajumu-remonts',
            ru: 'remont-posle-popadaniya-vlagi',
        },
        'uzlades-ligzdas-maina': {
            lv: 'uzlades-ligzdas-maina',
            ru: 'zamena-razema-zaryadki',
        },

    },
};

export const SUPPORTED_ROUTE_LOCALES = ['lv', 'ru'];
export const DEFAULT_ROUTE_LOCALE = 'lv';