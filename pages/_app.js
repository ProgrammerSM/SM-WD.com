// Components
import GlobalContext from 'context/GlobalContext'

// Styles
import 'styles/reset.css'
import 'styles/typography.css'
import 'styles/global-styles.css'

const MyApp = ({
  Component,
  pageProps,
}) => (
  <GlobalContext>
    <Component {...pageProps} />
  </GlobalContext>
)

export default MyApp
