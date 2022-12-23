// Modules
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Context
import { ActiveMenuContext } from 'context/ActiveMenuContext'
import { SettingsContext } from 'context/SettingsContext'

// Data
import {
  mediumUp,
  small,
} from 'data/media-queries'

// Styles
const fadeIn = keyframes`
  0% { opacity: 0; } 
  100% { opacity: 1; }
`

const CloseButtonStyles = styled.div`
  .close-button {
    display: flex;
    align-items: center;
    background: transparent;
    color: var(--font-color);
    font-family: var(--header-font);
    letter-spacing: 2px;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    
    &.animation-active {
      transition: all .5s;
      animation: ${fadeIn} 1.25s;
    }
    
    &:active,
    &:focus,
    &:hover {
      color: var(--accent-color-1);
      border-color: inherit;
    }
  }

  .button-text {
    margin-right: var(--space-extra-small);
    font-size: .75rem;
  }

  .button-icon {
    display: flex;
    width: var(--space-medium);
  }
  
  ${small} {
    position: fixed;
    bottom: 60px;
    right: 39px;
    left: 39px;
    padding: 10px 0;
    background-color: var(--background-color);
    z-index: 2;
    
    .close-button { margin: 0 auto; }
  }  

  ${mediumUp} {
    margin-left: auto;
  }

`

const CloseButton = () => {
  const { isAnimationActive } = useContext(SettingsContext)
  const {
    setActiveMenu,
    setIsMenuActive,
  } = useContext(ActiveMenuContext)

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <CloseButtonStyles>
      <button
        className={`close-button ${animationActiveClass}`}
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
    </CloseButtonStyles>
  )
}

export default CloseButton
