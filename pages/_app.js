// Modules
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import PropTypes from 'prop-types'

// Components
import GlobalContext from 'context/GlobalContext'

// Config
config.autoAddCss = false

// Global Styles
import GlobalStyles from 'components/styles/GlobalStyles'
import Layout from 'components/Layout'
import Reset from 'components/styles/Reset'
import Typography from 'components/styles/Typography'

const MyApp = ({
  Component,
  pageProps,
}) => (
  <>
    <Reset />
    <Typography />
    <GlobalStyles />
    <GlobalContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContext>
    <Analytics />
  </>
)

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MyApp
