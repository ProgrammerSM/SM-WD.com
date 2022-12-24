const { withSentryConfig } = require('@sentry/nextjs')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    CONTACT_FORM_RECAPTCHA_KEY: process.env.CONTACT_FORM_RECAPTCHA_KEY,
    FORMSPREE_CONTACT_FORM: process.env.FORMSPREE_CONTACT_FORM
  },
  images: {
    domains: ['spaceholder.cc'],
  },
  sentry: {
    hideSourceMaps: true,
  },
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
