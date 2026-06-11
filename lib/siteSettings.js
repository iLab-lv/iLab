// lib/siteSettings.js

import { unstable_cache } from 'next/cache';
import db from '@/lib/firebaseAdmin';
import { serializeForClient } from '@/lib/utils/serializeForClient';

import {
  COMPANY,
  SOCIALS,
  HOURS,
  PIN_POSITIONS,
  LOCATIONS,
} from '@/app/data/site.config';

const DEFAULT_SITE_SETTINGS = {
  company: COMPANY,
  socials: SOCIALS,
  hours: HOURS,
  pinPositions: PIN_POSITIONS,
  locations: LOCATIONS,
};

function mergeSiteSettings(remote = {}) {
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...remote,

    company: {
      ...DEFAULT_SITE_SETTINGS.company,
      ...(remote.company || {}),
    },

    socials: {
      ...DEFAULT_SITE_SETTINGS.socials,
      ...(remote.socials || {}),
    },

    pinPositions: {
      ...DEFAULT_SITE_SETTINGS.pinPositions,
      ...(remote.pinPositions || {}),
    },

    hours: remote.hours || DEFAULT_SITE_SETTINGS.hours,
    locations: remote.locations || DEFAULT_SITE_SETTINGS.locations,
  };
}


async function fetchSiteSettings() {
  try {
    const snap = await db.collection('settings').doc('site').get();

    if (!snap.exists) {
      return DEFAULT_SITE_SETTINGS;
    }

    const remoteRaw = snap.data();
    const remote = serializeForClient(remoteRaw || {});

    return mergeSiteSettings(remote);
  } catch (error) {
    console.error('[siteSettings] Failed to load site settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export const getSiteSettings = unstable_cache(
  fetchSiteSettings,
  ['site-settings'],
  {
    revalidate: 3600,
    tags: ['site-settings'],
  }
);