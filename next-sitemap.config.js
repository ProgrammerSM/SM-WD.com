const exclude = ['/404', '/contact/thank-you']
const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
const policies = process.env.NODE_ENV === 'production'
  ? [
      {
        disallow: exclude,
        userAgent: '*',
      },
      {
        allow: '/',
        userAgent: '*',
      },
    ]
  : [
      {
        disallow: '*',
        userAgent: '*',
      },
    ]

module.exports = {
  exclude,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: { policies },
  siteUrl,
}