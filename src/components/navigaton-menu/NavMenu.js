// Modules
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavItem from './NavItem'

// Context
import { ActiveMenuContext } from 'context/ActiveMenuContext'

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

  .close-button-wrapper {
    ${small} {
      position: fixed;
      bottom: 60px;
      right: 39px;
      left: 39px;
      padding: 10px 0;
      background-color: var(--background-color);
      z-index: 2;
    }

    ${mediumUp} {
      margin-left: auto;
    }
  }

  .close-button {
    display: flex;
    align-items: center;
    background: transparent;
    color: var(--font-color);
    font-family: var(--header-font);
    letter-spacing: 2px;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transition: all .5s;
    
    &:hover {
      color: var(--accent-color-1);
      border-color: inherit;
    }

    ${small} { margin: 0 auto; }
  }

  .button-text {
    margin-right: var(--space-extra-small);
    font-size: .75rem;
  }

  .button-icon {
    display: flex;
    width: var(--space-medium);
  }

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

const array = [
  0,
  1,
  2,
  3,
  4,
  5,
]

const NavMenu = () => {
  const {
    setActiveMenu,
    setIsMenuActive,
  } = useContext(ActiveMenuContext)

  return (
    <NavMenuStyles>
      <div className='close-button-wrapper'>
        <button
          className='close-button'
          onClick={() => {
            setIsMenuActive(false)
            setActiveMenu('')
          }}
        >
          <span className='button-text'>CLOSE</span>
          <span className='button-icon'>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </button>
      </div>
      <ul className='nav-menu'>
        {
          array.map((item, index) => <NavItem key={`nav-item-${index}`} />)
        }
      </ul>
    </NavMenuStyles>
  )
}

export default NavMenu
