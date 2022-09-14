// Modules
import PropTypes from 'prop-types'

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

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
  ).isRequired,
}

export default MyApp
