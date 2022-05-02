// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useContext,
  useEffect,
  useRef,
} from 'react'

// Context
import { SettingsContext } from 'context/SettingsContext'

// Styles
const HeadingStyles = styled.div`
  position: relative;
  margin-bottom: calc(1.38rem + 10px);
  text-align: left;
  opacity: 0;

  &.animate { opacity: 1; }
  &.center {
    text-align: center;
    
    .bottom-border {
      left: 50%;
      right: 50%;

      &::after {
        left: 50%;
        right: 50%;
      }

      &.animate {
        left: 0;
        right: 0;
        
        &::after {
          left: 20%;
          right: 20%;
        }
      }
    }
  }

  &.right {
    text-align: right;
    
    .bottom-border {
      left: 100%;
      right: 0;
      
      &::after { right: 0; }
      &.animate { left: 0; }
    }
  }

  &.animation-active {
    transition: opacity .5s linear;

    .bottom-border {
      transition: all .4s linear;

      &::after { transition: all .6s .2s linear; }
    }
  }

  .bottom-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-bottom: 2px solid var(--primary-color);
    box-shadow: inset 0 -5px 5px -5px var(--primary-color);

    &::after {
      position: absolute;
      bottom: -10px;
      width: 0;
      height: 10px;
      border-bottom: 4px solid var(--accent-color-1);
      box-shadow: inset 0 -5px 5px -5px var(--accent-color-1);
      content: '';
    }

    &.animate {
      width: 100%;

      &::after { width: 60%; }
    }
  }

  h1, h2, h3, h4, h5 { margin-bottom: 0; }
`

// PropTypes
const propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  isCenter: PropTypes.bool,
  isRight: PropTypes.bool,
}

const Heading = ({
  as: ElementType = 'h1',
  children,
  isCenter = false,
  isRight = false,
}) => {
  const hasAnimatedRef = useRef(false)
  const headingRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => () => {
    if (hasAnimatedRef.current)
      return

    if (!hasAnimatedRef.current) {
      const heading = headingRef.current

      if (heading && isAnimationActive) {
        const bottomBorder = heading.querySelector('.bottom-border')

        setTimeout(() => {
          heading.classList.add('animate')
        }, 200)

        setTimeout(() => {
          bottomBorder.classList.add('animate')
        }, 800)

        hasAnimatedRef.current = true
      }
    }
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <HeadingStyles
      className={`
        ${animationActiveClass}
        ${isCenter ? ' center' : ''}
        ${isRight ? ' right' : ''}
      `}
      data-testid='animated-heading'
      ref={headingRef}
    >
      <ElementType>{children}</ElementType>
      <div className='bottom-border' />
    </HeadingStyles>
  )
}

Heading.propTypes = propTypes
export default Heading
