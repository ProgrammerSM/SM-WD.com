const { withSentryConfig } = require('@sentry/nextjs')

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
  sentry: {
    hideSourceMaps: true,
  },
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
