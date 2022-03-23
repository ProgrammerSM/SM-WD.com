// Modules
import PropTypes from 'prop-types'

// Components
import Footer from './Footer'
import Header from './Header'

// Proptypes
const propTypes = { children: PropTypes.node }
const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

Layout.propTypes = propTypes
export default Layout
