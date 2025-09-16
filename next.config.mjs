// next.config.js (ESM)
import path from 'path';

const nextConfig = {
  async redirects() {
    return [
      // iPhone displeja maiņa → canonical
      { source: '/iphone-remonts/ekrana-maina', destination: '/iphone-remonts/displeja-maina', permanent: true },
      { source: '/iphone-ekrana-maina',        destination: '/iphone-remonts/displeja-maina', permanent: true },
      { source: '/iphone-displeja-maina',      destination: '/iphone-remonts/displeja-maina', permanent: true },
      // optional diacritic variant
      { source: '/iphone-remonts/ekrāna-maina', destination: '/iphone-remonts/displeja-maina', permanent: true },

      // iPhone baterijas maiņa → canonical
      { source: '/iphone-remonts/akumulatora-maina', destination: '/iphone-remonts/baterijas-maina', permanent: true },
      { source: '/iphone-akumulatora-maina',         destination: '/iphone-remonts/baterijas-maina', permanent: true },
      { source: '/iphone-baterijas-maina',           destination: '/iphone-remonts/baterijas-maina', permanent: true },
      // optional diacritic variant
      { source: '/iphone-remonts/baterijas-maiņa',   destination: '/iphone-remonts/baterijas-maina', permanent: true },
    ];
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sections': path.resolve(process.cwd(), 'app/(site)/sections'),
      '@screens':  path.resolve(process.cwd(), 'app/(site)/screens'),
      '@ui':       path.resolve(process.cwd(), 'app/(site)/ui'),
      '@styles':   path.resolve(process.cwd(), 'app/styles'),
      '@components': path.resolve(process.cwd(), 'app/(site)/components'),
    };
    return config;
  },
};

export default nextConfig;
