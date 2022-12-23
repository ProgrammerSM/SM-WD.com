// Modules
import { Analytics } from '@vercel/analytics/react'

// Components
import GlobalContext from 'context/GlobalContext'

// Global Styles
import GlobalStyles from 'components/global/styles/GlobalStyles'
import Layout from 'components/global/Layout'
import Reset from 'components/global/styles/Reset'
import Typography from 'components/global/styles/Typography'

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

export default MyApp
