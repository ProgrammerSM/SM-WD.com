// Modules
import PropTypes from 'prop-types'
import { useContext } from 'react'

// Components
import BackgroundSVG from './BackgroundSVG'
import Footer from './Footer'
import Header from './Header'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'

// Proptypes
const propTypes = { children: PropTypes.node }
const Layout = ({ children }) => {
  const { theme } = useContext(CurrentThemeContext)
  return (
    <>
      <style>{`
        :root {
          --primary-color:    ${theme.primaryColor};
          --font-color:       ${theme.fontColor};
          --background-color: ${theme.backgroundColor};
          --accent-Color-1:   ${theme.accentColor1};
          --accent-Color-2:   ${theme.accentColor2};
          --accent-Color-3:   ${theme.accentColor3};
        }
      `}</style>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = propTypes
export default Layout
