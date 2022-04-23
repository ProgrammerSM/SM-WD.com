// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useContext } from 'react'

// Components
import BackgroundSVG from './BackgroundSVG'
import Footer from './Footer'
import Header from './Header'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const Main = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 70px var(--space-medium) 54px;
  background-color: var(--background-color);
  color: var(--font-color);
  text-shadow: 0 1px 3px var(--font-color);
`

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
          --accent-color-1:   ${theme.accentColor1};
          --accent-color-2:   ${theme.accentColor2};
          --accent-color-3:   ${theme.accentColor3};
        }
      `}</style>
      <Header />
      <Main>
        <div className='left-border' />
        {children}
        <div className='right-border' />
      </Main>
      <Footer />
    </>
  )
}

Layout.propTypes = propTypes
export default Layout
