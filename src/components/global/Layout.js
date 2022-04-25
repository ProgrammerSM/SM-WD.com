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
const LayoutStyles = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  color: var(--font-color);
  text-shadow: 0 1px 3px var(--font-color);
  overflow: hidden;

  main {
    width: 100%;
    height: 100%;
    padding: 70px var(--space-medium) 54px;
  }

  .left-border,
  .right-border {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: var(--space-medium);
    height: 60%;
  }

  .left-border {
    left: 0;
    border-right: 2px solid var(--primary-color);
    box-shadow: inset -5px 0 5px -5px var(--primary-color);
  }

  .right-border {
    right: 0;
    border-left: 2px solid var(--primary-color);
    box-shadow: inset 5px 0 5px -5px var(--primary-color);
  }

  .left-border::before,
  .right-border::before,
  .left-border::after,
  .right-border::after {
    position: absolute;
    width: 23px;
    height: var(--space-medium);
    border-top: 2px solid var(--primary-color);
    content: '';
  }

  .left-border::before,
  .right-border::before {
    top: -8px;
  }

  .left-border::after,
  .right-border::after {
    bottom: -8px;
  }

  .left-border::before,
  .left-border::after {
    left: -8px;
  }

  .right-border::before,
  .right-border::after {
    right: -8px;
  }

  .left-border::before { transform: rotate(35deg); }
  .left-border::after { transform: rotate(145deg); }
  .right-border::after { transform: rotate(-145deg); }
  .right-border::before { transform: rotate(-35deg); }

  .overflow {
    position: relative;
    height: 100%;
    margin: 0 var(--space-extra-small);
    padding: var(--space-medium) var(--space-small) 80px;
    background-color: var(--background-color);
    overflow: hidden auto;
    z-index: 1;

    @media screen and (min-width: 430px) { padding-bottom: 50px; }
    ${mediumUp} { padding: 65px; }

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: var(--accent-color-1);
    }
    
    &::-webkit-scrollbar-thumb { background-color: var(--accent-color-1); }
  }
`

// Proptypes
const propTypes = { children: PropTypes.node }
const Layout = ({ children }) => {
  const { theme } = useContext(CurrentThemeContext)
  return (
    <>
      <style jsx>{`
        :root {
          --primary-color:    ${theme.primaryColor};
          --font-color:       ${theme.fontColor};
          --background-color: ${theme.backgroundColor};
          --accent-color-1:   ${theme.accentColor1};
          --accent-color-2:   ${theme.accentColor2};
          --accent-color-3:   ${theme.accentColor3};
        }

        .overflow.with-theme { background-color: ${theme.backgroundColor}80; }
        .overflow.with-theme::-webkit-scrollbar { background-color: ${theme.accentColor1}26; }
      `}</style>
      <LayoutStyles>
        <Header />
        <div className='left-border' />
        <main>
          <div className='overflow with-theme'>
            {children}
          </div>
          <BackgroundSVG />
        </main>
        <div className='right-border' />
        <Footer />
      </LayoutStyles>
    </>
  )
}

Layout.propTypes = propTypes
export default Layout
