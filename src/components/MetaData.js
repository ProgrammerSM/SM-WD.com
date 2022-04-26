// Modules
import PropTypes from 'prop-types'

// Components
import Head from 'next/head'

// PropTypes
const propTypes = {}
const MetaData = ({ content }) => (
  <Head>

    <title>Sterling May - Web Developer</title>
    <meta
      content='Sterling May - Web Developer'
      property='og:title'
    />

    <meta
      content='test'
      name='description'
    />
    <meta
      content='test'
      property='og:description'
    />

    <link
      href='test.com'
      rel='canonical'
    />
    <meta
      content='test.com'
      property='og:url'
    />

    <meta
      content='noindex nofollow'
      name='robots'
    />
  </Head>
)

MetaData.propTypes = propTypes
export default MetaData
