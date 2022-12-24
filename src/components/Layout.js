// Modules
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  useContext,
  useEffect,
  useState,
} from 'react'

// Components
import BackgroundSVG from './BackgroundSVG'
import Footer from './Footer'
import Header from './Header'
import { InView } from 'react-intersection-observer'
import LoadingOverlay from './LoadingOverlay'
import MetaData from 'components/MetaData'
import NavigationMenuButton from './menu-buttons/NavigationMenuButton'
import NavMenu from './menus/NavMenu'
// Import SettingsMenu from './menus/settings-menu/SettingsMenu'
// import SettingsMenuButton from './menu-buttons/SettingsMenuButton'

// Context
import { ActiveMenuContext } from 'context/ActiveMenuContext'
import { CurrentThemeContext } from 'context/CurrentThemeContext'
import { LoadingContext } from 'context/LoadingContext'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const LayoutStyles = styled.div`
  --main-padding-top: 70px;
  --main-padding-bottom: 54px;
  --menu-button-h: 10px;
  --menu-button-v: 60px;
  
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  color: var(--font-color);
  overflow: hidden;

  * {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: var(--accent-color-1);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--accent-color-1);
    }
  }

  main {
    width: 100%;
    height: 100%;
    padding: var(--main-padding-top) var(--space-medium) var(--main-padding-bottom);
  }

  .layout-left-border,
  .layout-right-border {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: var(--space-medium);
    height: 60%;
    background-color: var(--background-color);
    z-index: 1;
  }

  .layout-left-border {
    left: 0;
    border-right: 2px solid var(--primary-color);
  }

  .layout-right-border {
    right: 0;
    border-left: 2px solid var(--primary-color);
  }

  .layout-left-border::before,
  .layout-right-border::before,
  .layout-left-border::after,
  .layout-right-border::after {
    position: absolute;
    width: 23px;
    height: var(--space-medium);
    border-top: 2px solid var(--primary-color);
    content: '';
  }

  .layout-left-border::before,
  .layout-right-border::before {
    top: -8px;
  }

  .layout-left-border::after,
  .layout-right-border::after {
    bottom: -8px;
  }

  .layout-left-border::before,
  .layout-left-border::after {
    left: -8px;
  }

  .layout-right-border::before,
  .layout-right-border::after {
    right: -8px;
  }

  .layout-left-border::before { transform: rotate(35deg); }
  .layout-left-border::after { transform: rotate(145deg); }
  .layout-right-border::after { transform: rotate(-145deg); }
  .layout-right-border::before { transform: rotate(-35deg); }

  .overlay {
    position: relative;
    height: calc(100vh - (var(--main-padding-top) + var(--main-padding-bottom)));
    padding: calc(var(--space-extra-small) - 2px) 5px 0;
    background-color: var(--background-color);
    z-index: 1;
  }

  .overflow {
    position: relative;
    max-width: 1600px;
    height: calc(100% - 78px);
    margin: 0 auto;
    padding: 0 var(--space-small);
    overflow: hidden auto;

    & > hr {
      position: sticky;
      width: 90%;
      height: 2px;
      margin: 0 auto;
      border: none;

      &.layout-top-border { top: 0; }
      &.layout-bottom-border { bottom: 0; }
    }
  }

  .content-container {
    padding: var(--space-extra-large);
    background-color: var(--transparent-background);

    > *:last-of-type {
      margin-bottom: 0;
    }
  }

  ${mediumUp} {
    --menu-button-h: 25px;
    --menu-button-v: 25px;

    .overlay { padding: calc(var(--space-extra-small) - 2px) var(--space-extra-small); }
    .overflow { height: calc(100% - 55px); }
  }
`

// Variable
const menuButtonName = 'menu'
const settingsButtonName = 'settings'
const borderGradient = 'linear-gradient(to right, transparent, var(--primary-color), transparent)'
const Layout = ({ children }) => {
  const metaData = children?.props?.metaData
  const [isTopInView, setIsTopInView] = useState(true)
  const [isBottomInView, setIsBottomInView] = useState(false)
  const router = useRouter()
  const { theme } = useContext(CurrentThemeContext)

  const {
    activeMenu,
    isMenuActive,
  } = useContext(ActiveMenuContext)

  const {
    loadingOverlay: { isLoading },
    setIsHeaderLoadingActive,
  } = useContext(LoadingContext)

  NProgress.configure({
    parent: '#js-nprogress',
    showSpinner: false,
  })

  const handleRouteStart = () => {
    setIsHeaderLoadingActive(true)
    NProgress.start()
  }

  const handleRouteDone = () => {
    setIsHeaderLoadingActive(false)
    NProgress.done()
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteDone)
    router.events.on('routeChangeError', handleRouteDone)

    return () => {
      router.events.off('routeChangeStart', handleRouteStart)
      router.events.off('routeChangeComplete', handleRouteDone)
      router.events.off('routeChangeError', handleRouteDone)
    }
  }, [router])

  return (
    <>
      <style>{`
        :root {
          --primary-color:          ${theme.primaryColor};
          --error-color:            ${theme.errorColor};
          --font-color:             ${theme.fontColor};
          --background-color:       ${theme.backgroundColor};
          --transparent-background: ${theme.primaryColor}33;
          --accent-color-1:         ${theme.accentColor1};
          --accent-color-2:         ${theme.accentColor2};
          --accent-color-3:         ${theme.accentColor3};
        }

        .overlay.with-theme { background-color: ${theme.backgroundColor}80; }
        .overflow.with-theme::-webkit-scrollbar,
        .scroller::-webkit-scrollbar { background-color: ${theme.accentColor1}26; }
      `}</style>

      <MetaData data={metaData} />

      <LayoutStyles>
        <Header />
        <div className='layout-left-border' />
        <main>
          <div className='overlay with-theme'>
            <div className='overflow with-theme'>
              {activeMenu === menuButtonName && <NavMenu />}
              {/* {activeMenu === settingsButtonName && <SettingsMenu />} */}
              {!isMenuActive && (
                <>
                  <hr
                    className='layout-top-border'
                    style={{ background: !isTopInView ? borderGradient : 'transparent' }}
                  />
                  <InView
                    as='div'
                    onChange={inView => setIsTopInView(inView)}
                  />
                  {children}
                  <InView
                    as='div'
                    onChange={inView => setIsBottomInView(inView)}
                  />
                  <hr
                    className='layout-bottom-border'
                    style={{ background: !isBottomInView ? borderGradient : 'transparent' }}
                  />
                </>
              )}
            </div>
            {isLoading && <LoadingOverlay />}
          </div>
          {(!isMenuActive && children?.props?.showBgSvg !== false) && <BackgroundSVG />}
        </main>
        <div className='layout-right-border' />
        <NavigationMenuButton
          alternateButtonName={settingsButtonName}
          buttonName={menuButtonName}
        />
        {/* <SettingsMenuButton
          alternateButtonName={menuButtonName}
          buttonName={settingsButtonName}
        /> */}
        <Footer />
      </LayoutStyles>
    </>
  )
}

Layout.propTypes = { children: PropTypes.node }
export default Layout
