// Modules
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useContext } from 'react'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Context
import { ActiveMenuContext } from 'context/ActiveMenuContext'

// Data
import {
  mediumUp,
  small,
} from 'data/media-queries'

// Styles
const CloseButtonStyles = styled.div`
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
    
    &:active,
    &:focus,
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
`

const CloseButton = () => {
  const {
    setActiveMenu,
    setIsMenuActive,
  } = useContext(ActiveMenuContext)

  return (
    <CloseButtonStyles>
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
    </CloseButtonStyles>
  )
}

export default CloseButton
