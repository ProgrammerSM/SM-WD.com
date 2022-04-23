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

  .page-border-box {
    position: relative;
    height: 100%;
    padding: var(--space-medium) var(--space-small) 80px;

    @media screen and (min-width: 430px) { padding-bottom: 50px; }
    ${mediumUp} { padding: 65px; }

    .left-border,
    .right-border {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 60%;
      width: var(--space-medium);
    }

    .left-border {
      left: -1rem;
      border-right: 2px solid var(--primary-color);
      box-shadow: inset -5px 0 5px -5px var(--primary-color);
    }

    .right-border {
      right: -1rem;
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
  }

  .overflow {
    position: relative;
    height: 100%;
    padding: 0 var(--space-extraSmall);
    background-color: var(--background-color)80;
    overflow: hidden auto;
    z-index: 1;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: var(--accent-color-1)26;
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
        <div className='page-border-box'>
          <div className='left-border' />
          <div className='overflow'>
            {children}
          </div>
          <BackgroundSVG />
          <div className='right-border' />
        </div>
      </Main>
      <Footer />
    </>
  )
}

Layout.propTypes = propTypes
export default Layout
