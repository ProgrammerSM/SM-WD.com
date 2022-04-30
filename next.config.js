/** @type {import('next').NextConfig} */
const nextConfig = {
  meta: {},
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['spaceholder.cc'],
  },
  settings: {
    jest: {
      version: require('jest/package.json').version,
    },
  },

}

module.exports = nextConfig
