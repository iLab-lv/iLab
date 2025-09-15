// next.config.js (ESM)
import path from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sections': path.resolve(process.cwd(), 'app/(site)/sections'),
      '@screens':  path.resolve(process.cwd(), 'app/(site)/screens'),
      '@ui':       path.resolve(process.cwd(), 'app/(site)/ui'),      // if you have this folder
      '@styles':   path.resolve(process.cwd(), 'app/styles'),         // keeps '@/styles/...'
      '@components': path.resolve(process.cwd(), 'app/(site)/components'),
    };
    return config;
  },
};

export default nextConfig;
