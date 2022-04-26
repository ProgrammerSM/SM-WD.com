/** @type {import('next').NextConfig} */
const nextConfig = {
  meta: {},
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  settings: {
    jest: {
      version: require('jest/package.json').version,
    },
  },

}

module.exports = nextConfig
