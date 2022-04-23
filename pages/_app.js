// Components
import GlobalContext from 'context/GlobalContext'

// Global Styles
import GlobalStyles from 'components/global/styles/GlobalStyles'
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
      <Component {...pageProps} />
    </GlobalContext>
  </>
)

export default MyApp
