// Modules
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

// Components
import Head from 'next/head'

const MetaData = ({ data }) => {
  const isProduction = process.env.VERCEL_ENV === 'production'
  const router = useRouter()
  const site = 'https://sm-wd.com/'
  let canonicalURL = site

  if (useRouter().asPath !== '/')
    canonicalURL = site + router.asPath

  const description = data?.pageDescription || 'Temporary page description.'
  const ogImage = data?.ogImage?.fields?.file?.url || '/images/fallback-images/sm-wd-icon.svg'
  const ogImageHeight = data?.ogImage?.fields?.file?.details?.image?.height || 400
  const ogImageWidth = data?.ogImage?.fields?.file?.details?.image?.width || 400
  const title = data?.pageTitle || 'Sterling May - Web Developer'

  const follow = isProduction
    ? data?.isFollow
      ? 'follow'
      : 'nofollow'
    : 'nofollow'

  const index = isProduction
    ? data?.isIndex
      ? 'index'
      : 'noindex'
    : 'noindex'

  return (
    <Head>
      <title>{title}</title>
      <meta
        content={title}
        property='og:title'
      />

      <meta
        content={description}
        name='description'
      />
      <meta
        content={description}
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

      <meta
        content={ogImage}
        property='og:image'
      />
      <meta
        content={ogImageHeight}
        property='og:image:height'
      />
      <meta
        content={ogImageWidth}
        property='og:image:width'
      />
    </Head>
  )
}

MetaData.propTypes = {
  data: PropTypes.shape({
    isFollow: PropTypes.bool,
    isIndex: PropTypes.bool,
    ogImage: PropTypes.shape({
      fields: PropTypes.shape({
        file: PropTypes.shape({
          details: PropTypes.shape({
            image: PropTypes.shape({
              height: PropTypes.number,
              width: PropTypes.number,
            }),
          }),
          url: PropTypes.string,
        }),
      }),
    }),
    pageDescription: PropTypes.string,
    pageTitle: PropTypes.string,
  }),
}

export default MetaData
