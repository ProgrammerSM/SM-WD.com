// Modules
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'

// Components
import CloseButton from './CloseButton'
import MenuItem from './MenuItem'

// Context
import { SettingsContext } from 'context/SettingsContext'

// Data
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

const MenuStyles = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  padding-top: var(--space-medium);

  .menu {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: calc(var(--space-extra-large) + 12px);
  }

  ${small} {
    &.animation-active .menu li {
      animation: ${mobileMenuExpand} .4s ease-in-out;

      &:nth-of-type(2) { animation-delay: .1s; }
      &:nth-of-type(3) { animation-delay: .2s; }
      &:nth-of-type(4) { animation-delay: .3s; }
      &:nth-of-type(5) { animation-delay: .4s; }
      &:nth-of-type(6) { animation-delay: .5s; }
    }
  }

  ${mediumUp} {
    &.animation-active .menu li { animation: ${mediumUpTransition} .4s ease-out; }

    .menu {
      margin-top: var(--space-large);
      flex-direction: row;
    }
  }
`

const Menu = ({ menuData }) => {
  const router = useRouter()
  const { isAnimationActive } = useContext(SettingsContext)
  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <MenuStyles
      className={animationActiveClass}
      data-testid='menu'
    >
      <ul className='menu'>
        {
          menuData.map((menuItem, index) => {
            if (router.pathname === menuItem.path)
              return

            return (
              <MenuItem
                key={`menu-item-${index}`}
                menuItemData={menuItem}
              />
            )
          })
        }
      </ul>
      <CloseButton />
    </MenuStyles>
  )
}

Menu.propTypes = { menuData: PropTypes.arrayOf(PropTypes.object) }
export default Menu
