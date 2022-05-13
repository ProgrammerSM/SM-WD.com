// Modules
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'

// Components
import CloseButton from '../CloseButton'
import NavItem from './NavItem'

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
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  padding-top: var(--space-medium);

  .nav-menu {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: calc(var(--space-extra-large) + 12px);
    
    ${small} {
      li {
        animation: ${mobileMenuExpand} .5s ease-in-out;

        &:nth-of-type(2) { animation-delay: .1s; }
        &:nth-of-type(3) { animation-delay: .2s; }
        &:nth-of-type(4) { animation-delay: .3s; }
        &:nth-of-type(5) { animation-delay: .4s; }
        &:nth-of-type(6) { animation-delay: .5s; }
      }
    }

    ${mediumUp} {
      margin-top: var(--space-large);
      flex-direction: row;

      li { animation: ${mediumUpTransition} .75s ease-out; }
    }
  }
`

const NavMenu = () => {
  const router = useRouter()

  return (
    <NavMenuStyles>
      <CloseButton />
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
    </NavMenuStyles>
  )
}

export default NavMenu
