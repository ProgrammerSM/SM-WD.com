// Modules
import { useContext } from 'react'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'

// Components
import CloseButton from '../CloseButton'
import NavItem from './NavItem'

// Context
import { SettingsContext } from 'context/SettingsContext'

// Data
import navigationMenu from 'data/navigation-menu'
import {
  mediumUp,
  small,
} from 'data/media-queries'

// Styles
const mediumUpTransition = keyframes`
  0% { transform: scale(0); }  
  100% { transform: scale(1); }
`

const mobileMenuExpand = keyframes`
  0% { transform: translateY(25px); }  
  100% { transform: translateY(0); }
`

const NavMenuStyles = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  padding-top: var(--space-medium);

  &.animation-active .nav-menu {
    ${small} {
      li {
        animation: ${mobileMenuExpand} .4s ease-in-out;

        &:nth-of-type(2) { animation-delay: .1s; }
        &:nth-of-type(3) { animation-delay: .2s; }
        &:nth-of-type(4) { animation-delay: .3s; }
        &:nth-of-type(5) { animation-delay: .4s; }
        &:nth-of-type(6) { animation-delay: .5s; }
      }
    }

    ${mediumUp} {
      li { animation: ${mediumUpTransition} .4s ease-out; }
    }
  }

  .nav-menu {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: calc(var(--space-extra-large) + 12px);

    ${mediumUp} {
      margin-top: var(--space-large);
      flex-direction: row;
    }
  }
`

const NavMenu = () => {
  const router = useRouter()
  const { isAnimationActive } = useContext(SettingsContext)
  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <NavMenuStyles
      className={animationActiveClass}
      data-testid='nav-menu'
    >
      <ul className='nav-menu'>
        {
          navigationMenu.map((navItem, index) => {
            if (router.pathname === navItem.path)
              return

            return (
              <NavItem
                key={`nav-item-${index}`}
                navItemData={navItem}
              />
            )
          })
        }
      </ul>
      <CloseButton />
    </NavMenuStyles>
  )
}

export default NavMenu
