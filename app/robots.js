// app/robots.js

const ORIGIN = 'https://www.ilab.lv';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',      
        disallow: [
          '/api/',
          '/admin',
        ],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
