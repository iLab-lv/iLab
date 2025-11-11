// next.config.js (ESM)
import path from 'path';

const nextConfig = {
  async redirects() {
    return [
      // ===================== iPhone — Displeja maiņa (canonical) =====================
      { source: '/iphone-remonts/ekrana-maina', destination: '/iphone-remonts/displeja-maina', permanent: true },
      { source: '/iphone-ekrana-maina', destination: '/iphone-remonts/displeja-maina', permanent: true },
      { source: '/iphone-displeja-maina', destination: '/iphone-remonts/displeja-maina', permanent: true },
      // diacritic variants
      { source: '/iphone-remonts/ekrāna-maina', destination: '/iphone-remonts/displeja-maina', permanent: true },

      // ===================== iPhone — Baterijas maiņa (canonical) =====================
      { source: '/iphone-remonts/akumulatora-maina', destination: '/iphone-remonts/baterijas-maina', permanent: true },
      { source: '/iphone-akumulatora-maina', destination: '/iphone-remonts/baterijas-maina', permanent: true },
      { source: '/iphone-baterijas-maina', destination: '/iphone-remonts/baterijas-maina', permanent: true },
      // diacritic variants
      { source: '/iphone-remonts/baterijas-maiņa', destination: '/iphone-remonts/baterijas-maina', permanent: true },

      // ===================== iPhone — Uzlādes ligzdas maiņa (canonical) =====================
      { source: '/iphone-remonts/uzlades-ligzda', destination: '/iphone-remonts/uzlades-ligzdas-maina', permanent: true },
      { source: '/iphone-remonts/uzlades-ligzdas-remonts', destination: '/iphone-remonts/uzlades-ligzdas-maina', permanent: true },
      { source: '/iphone-uzlades-ligzdas-maina', destination: '/iphone-remonts/uzlades-ligzdas-maina', permanent: true },
      // diacritic variants
      { source: '/iphone-remonts/uzlādes-ligzdas-maina', destination: '/iphone-remonts/uzlades-ligzdas-maina', permanent: true },

      // ===================== iPhone — Kameras (canonical: /kameras-remonts) =====================
      { source: '/iphone-remonts/kameras-maina', destination: '/iphone-remonts/kameras-remonts', permanent: true },
      { source: '/iphone-remonts/kamera', destination: '/iphone-remonts/kameras-remonts', permanent: true },
      { source: '/iphone-kameras-remonts', destination: '/iphone-remonts/kameras-remonts', permanent: true },

      // ===================== iPhone — Skaļruņi/Mikrofons (canonical: /skalruni-mikrofona-remonts) =====================
      { source: '/iphone-remonts/skalruni-mikrofons', destination: '/iphone-remonts/skalruni-mikrofona-remonts', permanent: true },
      { source: '/iphone-remonts/skalruni-mikrofons-remonts', destination: '/iphone-remonts/skalruni-mikrofona-remonts', permanent: true },
      { source: '/iphone-remonts/mikrofons-remonts', destination: '/iphone-remonts/skalruni-mikrofona-remonts', permanent: true },
      { source: '/iphone-remonts/skalruni-remonts', destination: '/iphone-remonts/skalruni-mikrofona-remonts', permanent: true },

      // ===================== iPhone — Ūdens bojājumi (canonical: /udens-bojajumu-remonts) =====================
      { source: '/iphone-remonts/udens-bojajumi', destination: '/iphone-remonts/udens-bojajumu-remonts', permanent: true },
      { source: '/iphone-udens-bojajumi', destination: '/iphone-remonts/udens-bojajumu-remonts', permanent: true },
      // diacritic variants
      { source: '/iphone-remonts/ūdens-bojājumi', destination: '/iphone-remonts/udens-bojajumu-remonts', permanent: true },
    ];
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd()),           // root alias
      '@lib': path.resolve(process.cwd(), 'lib'),
      '@data': path.resolve(process.cwd(), 'app/data'),
      '@sections': path.resolve(process.cwd(), 'app/(site)/sections'),
      '@screens': path.resolve(process.cwd(), 'app/(site)/screens'),
      '@ui': path.resolve(process.cwd(), 'app/(site)/ui'),
      '@styles': path.resolve(process.cwd(), 'app/styles'),
      '@components': path.resolve(process.cwd(), 'app/(site)/components'),
    };
    return config;
  },

};

export default nextConfig;
