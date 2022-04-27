// Components
import GlobalContext from 'context/GlobalContext'

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
  </>
)

export default MyApp
