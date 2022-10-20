/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    FORMSPREE_CONTACT_FORM: process.env.FORMSPREE_CONTACT_FORM
  },
  images: {
    domains: ['spaceholder.cc'],
  },
}

module.exports = nextConfig
