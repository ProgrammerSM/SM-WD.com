// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useContext,
  useEffect,
  useRef,
} from 'react'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'
import { SettingsContext } from 'context/SettingsContext'

// Styles
const SciFiButton = styled.button`
  position: relative;
  display: block;
  margin: 2px 10px;
  padding: var(--space-small) 3rem;
  color: var(--font-color);
  font-size: var(--space-medium);
  font-weight: bold;
  font-family: var(--header-font);
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0;
  box-shadow: 0;

  &:active,
  &:focus,
  &:hover {
    box-shadow: 0 0 5px 2px var(--primary-color);
  }

  &.animate { opacity: 1; }
  &.no-animation {
    opacity: 1;

    .left-bracket,
    .right-bracket {
      width: 15px;
      height: calc(100% + 4px);
    }

    .left-bar,
    .right-bar {
      height: 60%;
    }

    .left-bracket {
      border-left: 2px solid var(--primary-color);
      
      &::after { width: 30px; }
    }

    .right-bracket {
      border-right: 2px solid var(--primary-color);

      &::before { width: 30px; }
    }
  }

  &.animation-active {
    transition: opacity .5s linear, box-shadow .2s linear;

    .left-bracket,
    .right-bracket {
      transition: width .2s .2s linear, height .2s linear;
    }

    .left-bracket::after,
    .right-bracket::before {
      transition: width .2s .6s linear;
    }

    .left-bar,
    .right-bar {
      transition: height .2s .2s linear;
    }
  }
  
  .left-bar,
  .left-bracket,
  .left-bracket::after,
  .right-bar,
  .right-bracket,
  .right-bracket::before {
    position: absolute;
  }

  .left-bracket,
  .right-bracket {
    top: -2px;
    width: 0;
    height: 0;
    border-top: 2px solid var(--primary-color);
    border-bottom: 2px solid var(--primary-color);

    &.animate {
      width: 15px;
      height: calc(100% + 4px);
    }
  }

  .left-bracket::after,
  .right-bracket::before {
    top: calc(50% + 2.5px);
    transform: translateY(-50%);
    width: 0;
    height: 5px;
    border-top: 2px solid var(--primary-color);
    box-shadow: inset 0 5px 5px -5px var(--primary-color);
    content: '';
  }

  .left-bar,
  .right-bar {
    top: 50%;
    transform: translateY(-50%);
    width: 21px;
    height: 0;

    &.animate {
      height: 60%;
    }
  }

  .left-bracket {
    left: -2px;
    box-shadow: inset 5px 0 5px -5px var(--primary-color);

    &::after { left: 0; }
    &.animate {
      border-left: 2px solid var(--primary-color);
      
      &::after { width: 30px; } 
    }
  }

  .right-bracket {
    right: -2px;
    box-shadow: inset -5px 0 5px -5px var(--primary-color);

    &::before { right: 0; }
    &.animate {
      border-right: 2px solid var(--primary-color);

      &::before { width: 30px; }
    }
  }

  .left-bar {
    left: -10px;
    border-left: 4px solid var(--accent-color-1);
    box-shadow: inset 5px 0 5px -5px var(--primary-color);
  }

  .right-bar {
    right: -10px;
    border-right: 4px solid var(--accent-color-1);
    box-shadow: inset -5px 0 5px -5px var(--primary-color);
  }
`

const Button = ({
  children,
  className,
  isFail,
  isSubmit,
  isSuccess,
  isWarn,
  onClickHandler,
}) => {
  const buttonRef = useRef()
  const hasAnimatedRef = useRef(false)
  const { isAnimationActive } = useContext(SettingsContext)
  const { theme } = useContext(CurrentThemeContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const button = buttonRef.current

    if (button && isAnimationActive) {
      const leftBracket = button.querySelector('.left-bracket')
      const rightBracket = button.querySelector('.right-bracket')
      const leftBar = button.querySelector('.left-bar')
      const rightBar = button.querySelector('.right-bar')

      if (isAnimationActive) {
        setTimeout(() => {
          button.classList.add('animate')
        }, 200)

        setTimeout(() => {
          leftBracket.classList.add('animate')
          rightBracket.classList.add('animate')
        }, 800)

        setTimeout(() => {
          leftBar.classList.add('animate')
          rightBar.classList.add('animate')
        }, 1000)
      }
    }
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <SciFiButton
      className={`
        ${animationActiveClass}
        ${className ? className : ''}
        ${isFail ? 'fail' : ''}
        ${isSuccess ? 'success' : ''}
        ${isWarn ? 'warn' : ''}
      `}
      ref={buttonRef}
      style={{
        backgroundColor: theme.noShine
          ? 'transparent'
          : `${theme.primaryColor}33`,
      }}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClickHandler}
    >
      <span className='left-bar' />
      <span className='left-bracket' />
      {children}
      <span className='right-bracket' />
      <span className='right-bar' />
    </SciFiButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isFail: PropTypes.bool,
  isSubmit: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isWarn: PropTypes.bool,
  onClickHandler: PropTypes.func,
}

export default Button

