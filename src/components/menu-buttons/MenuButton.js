// Modules
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import {
  useContext,
  useRef,
} from 'react'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'
import { SettingsContext } from 'context/SettingsContext'

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const rotating = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(1800deg); }
`

const MenuButtonStyles = styled.div`
  width: calc(2.5rem + 10px);
  height: calc(2.5rem + 10px);
  border-radius: 50%;
  cursor: pointer;

  &.with-animation { transition: all .2s linear; }

  ${mediumUp} {
    width: calc(4rem + 10px);
    height: calc(4rem + 10px);
  }

  &:hover:not([disabled]) {
    box-shadow: 0 0 5px 2px var(--primary-color);
  }

  &:hover:not([disabled]) .animated-circle,
  &[data-active = "true"]:not([disabled]) .animated-circle {
    animation-duration: 10s;
  }

  &[disabled] .animated-circle {
    animation-play-state: paused;
  }

  .main-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: var(--space-extra-small);
    border-radius: 50%;
    border: 1px solid var(--primary-color);
    transition: all .2s linear;

    &.active { font-weight: bold; }

    ${mediumUp} {
      width: 4rem;
      height: 4rem;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1.5rem;
    text-align: center;
  }

  .button-text {
    display: none;
    font-size: .75rem;
    font-weight: 600;

    ${mediumUp} { display: inline; }
  }

  .animated-circle-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }

  .animated-circle {
    fill: transparent;
    stroke: var(--accent-color-1);
    stroke-width: 2px;
    stroke-dasharray: 50%, 25%;
    transform: rotate(15deg);
    transform-origin: center center;

    &.with-animation { animation: ${rotating} 200s linear infinite; }
  }
`

const MenuButton = ({
  buttonText,
  clickHandler,
  icon,
  isActive,
  isDisabled,
  tabIndexNumber,
}) => {
  const menuButtonRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)
  const { theme } = useContext(CurrentThemeContext)

  let buttonColor = `${theme.primaryColor}80`
  let buttonFontColor = theme.fontColor
  let buttonIcon = icon

  if (isActive) {
    buttonColor = `${theme.primaryColor}BF`
    buttonIcon = faTimes
  }

  if (isDisabled) {
    buttonColor = `${theme.primaryColor}40`
    buttonFontColor = `${theme.fontColor}80`
  }

  const handleBtnKeyDown = event => {
    if (event.key === 'Enter')
      clickHandler(menuButtonRef.current)
  }

  const buttonStyles = theme.noShine
    ? {
        background: 'transparent',
        color: theme.fontColor,
      }
    : {
        backgroundImage: `radial-gradient(circle, ${buttonColor}, transparent)`,
        color: buttonFontColor,
      }

  return (
    <MenuButtonStyles
      className={`${isAnimationActive ? 'with-animation' : ''}`}
      data-active={Boolean(isActive)}
      data-testid='menu-button'
      disabled={Boolean(isDisabled)}
      ref={menuButtonRef}
      role='button'
      tabIndex={tabIndexNumber}
      onClick={clickHandler}
      onKeyDown={handleBtnKeyDown}
    >
      <div
        className={`main-button${isActive ? ' active' : ''}`}
        style={buttonStyles}
      >
        {icon && (
          <div className='icon'>
            <FontAwesomeIcon icon={buttonIcon} />
          </div>
        )}
        {buttonText && <span className='button-text'>{buttonText}</span>}
      </div>
      <svg className='animated-circle-svg' >
        <circle
          className={`animated-circle${isAnimationActive ? ' with-animation' : ''}`}
          cx='50%'
          cy='50%'
          r='48%'
        />
      </svg>

    </MenuButtonStyles>
  )
}

MenuButton.propTypes = {
  buttonText: PropTypes.string,
  clickHandler: PropTypes.func,
  icon: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])),
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  tabIndexNumber: PropTypes.number,
}

export default MenuButton
