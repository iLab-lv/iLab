// next.config.js (ESM)
import path from 'path';

const nextConfig = {
  async redirects() {
    return [
      
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
