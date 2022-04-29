// Modules
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// Components
import Head from 'next/head'

// PropTypes
const propTypes = { content: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])) }
const MetaData = ({
  content = {
    description: 'test',
    follow: false,
    index: false,
    title: 'Sterling May - Web Developer',
  },
}) => {
  const site = 'https://sm-wd.com/'
  const canonicalURL = site + useRouter().asPath
  const follow = content.index ? 'follow' : 'nofollow'
  const index = content.index ? 'index' : 'noindex'

  return (
    <Head>

      <title>{content.title}</title>
      <meta
        content={content.title}
        property='og:title'
      />

      <meta
        content={content.description}
        name='description'
      />
      <meta
        content={content.description}
        property='og:description'
      />

      <link
        href={canonicalURL}
        rel='canonical'
      />
      <meta
        content={canonicalURL}
        property='og:url'
      />

      <meta
        content={`${index} ${follow}`}
        name='robots'
      />
    </Head>
  )
}

MetaData.propTypes = propTypes
export default MetaData
