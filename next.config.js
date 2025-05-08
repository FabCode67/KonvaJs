/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  assetPrefix: './',
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig;