// app/robots.js

import { SITE_URL } from './data/site.config.js';

const ORIGIN = SITE_URL.replace(/\/+$/, '');

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',      
        disallow: [
          '/api/',
          '/admin',
          '/ads/', 
        ],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
