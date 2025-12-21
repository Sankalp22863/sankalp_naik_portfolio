/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sankalp-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sankalp-portfolio/' : '',
};

module.exports = nextConfig;