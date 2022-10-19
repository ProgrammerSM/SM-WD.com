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

// Data
import { mediumUp } from 'data/media-queries'

// Styles
const HeadingStyles = styled.div`
  position: relative;
  margin-bottom: calc(var(--space-standard) + 10px);
  text-align: center;
  opacity: 0;

  &.animate { opacity: 1; }
  &.no-animation {
    opacity: 1;

    .bottom-border {
      width: 100%;

      &::after { width: 60%; }
    }
  }

  &.animation-active {
    transition: opacity .5s linear;

    .bottom-border {
      transition: width .4s linear;

      &::after { transition: width .6s .2s linear; }
    }
  }

  .bottom-border {
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 100%;
    border-bottom: 2px solid var(--primary-color);
    box-shadow: inset 0 -5px 5px -5px var(--primary-color);
    transform: translateX(-50%);

    &::after {
      position: absolute;
      left: 50%;
      bottom: -10px;
      width: 0;
      height: 10px;
      border-bottom: 4px solid var(--accent-color-1);
      box-shadow: inset 0 -5px 5px -5px var(--accent-color-1);
      transform: translateX(-50%);
      content: '';
    }

    &.animate {
      width: 100%;

      &::after { width: 60%; }
    }
  }

  h1, h2, h3, h4, h5 { margin-bottom: 0; }

  ${mediumUp} {
    text-align: left;

    .bottom-border {
      left: 0;
      transform: none;

      &::after {
        left: 0;
        transform: none;
      }
    }

    &.center {
      text-align: center;

      .bottom-border {
        left: 50%;
        transform: translateX(-50%);

        &::after {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    &.right {
      text-align: right;

      .bottom-border {
        right: 0;
        left: unset;
        transform: none;

        &::after {
          right: 0;
          left: unset;
          transform: none;
        }
      }
    }

    &.no-animation {
      .bottom-border::after {
        left: 0; 
        transform: none;
      }

      &.center .bottom-border::after {
        left: 20%;
      }

      &.right .bottom-border::after {
        left: unset;
        right: 0;
        transform: none;
      }
    }
  }
`

const Heading = ({
  as: ElementType = 'h1',
  children,
  isCenter = false,
  isRight = false,
}) => {
  const hasAnimatedRef = useRef(false)
  const headingRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

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
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <HeadingStyles
      className={`${animationActiveClass}${isCenter ? ' center' : ''}${isRight ? ' right' : ''}`}
      data-testid='animated-heading'
      ref={headingRef}
    >
      <ElementType>{children}</ElementType>
      <div className='bottom-border' />
    </HeadingStyles>
  )
}

Heading.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  isCenter: PropTypes.bool,
  isRight: PropTypes.bool,
}

export default Heading
