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
          '/ads/', 
        ],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
