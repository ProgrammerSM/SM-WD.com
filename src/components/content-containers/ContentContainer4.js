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
const ContentContainer4Styles = styled.div`
  position: relative;
  margin: 9px;

  &.animation-active {
    .content-container-4-wrapper { transition: opacity .5s linear; }
  }

  &.no-animation {
    .content-container-4-wrapper { opacity: 1; }
  }

  .content-container-4-border-top-shape,
  .content-container-4-top-bottom-border,
  .content-container-4-left-right-border,
  .content-container-4-border-bottom-shape {
    position: absolute;
    z-index: -1;
  }

  .content-container-4-border-top-shape,
  .content-container-4-border-bottom-shape {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
    width: 100%;
    height: 20px;
  }

  .content-container-4-left-shape-border,
  .content-container-4-center-shape::before,
  .content-container-4-center-shape,
  .content-container-4-center-shape::after,
  .content-container-4-right-shape-border {
    border-color: var(--accent-color-1);
  }
  
  .content-container-4-left-shape-border,
  .content-container-4-center-shape,
  .content-container-4-right-shape-border {
    width: 100%;
  }

  .content-container-4-border-top-shape .content-container-4-center-shape::before,
  .content-container-4-border-bottom-shape .content-container-4-center-shape::after {
    transform: rotate(-35deg);
  }

  .content-container-4-border-top-shape .content-container-4-center-shape::after,
  .content-container-4-border-bottom-shape .content-container-4-center-shape::before {
    transform: rotate(35deg);
  }

  .content-container-4-border-top-shape {
    top: -8px;

    .content-container-4-left-shape-border,
    .content-container-4-right-shape-border {
      border-top: solid 4px;
    }

    .content-container-4-center-shape {
      border-bottom: solid 4px;

      &::before,
      &::after {
        bottom: -4px;
      }
    }
  }

  .content-container-4-center-shape {
    position: relative;

    &::before,
    &::after {
      position: absolute;
      height: 20px;
      content: '';
    }

    &::before {
      left: -7px;
      border-left: solid 4px;
    }

    &::after {
      right: -7px;
      border-right: solid 4px;
    }
  }

  .content-container-4-top-bottom-border {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100%;
    border-top: solid 2px var(--primary-color);
    border-bottom: solid 2px var(--primary-color);
    transform: translateX(-50%);
  }

  .content-container-4-wrapper {
    opacity: 0;

    &.animate { opacity: 1; }
  }

  .content-container-4-left-right-border {
    top: 50%;
    width: 100%;
    height: 20%;
    transform: translateY(-50%);
    border-right: solid 4px var(--accent-color-2);
    border-left: solid 4px var(--accent-color-2);
  }

  .content-container-4-border-bottom-shape {
    bottom: -8px;
    
    .content-container-4-left-shape-border,
    .content-container-4-right-shape-border {
      border-bottom: solid 4px;
    }

    .content-container-4-center-shape {
      border-top: solid 4px;

      &::before,
      &::after {
        top: -4px;
      }
    }
  }
`

const ContentContainer4 = ({ children }) => {
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const contentContainer4 = containerRef.current

    if (contentContainer4 && isAnimationActive) {
      const contentContainer = contentContainer4.querySelector('.content-container-4-wrapper')
      const topBottomBorder = contentContainer4.querySelector('.content-container-4-top-bottom-border')
      const leftRightBorder = contentContainer4.querySelector('.content-container-4-left-right-border')
      const topShape = contentContainer4.querySelector('.content-container-4-border-top-shape')
      const bottomShape = contentContainer4.querySelector('.content-container-4-border-bottom-shape')
      const shapeLeft = contentContainer4.querySelector('.content-container-4-left-shape-border')
      const shapeCenter = contentContainer4.querySelector('.content-container-4-center-shape')
      const shapeRight = contentContainer4.querySelector('.content-container-4-right-shape-border')

      setTimeout(() => {
        contentContainer.classList.add('animate')
      }, 100)

      setTimeout(() => {
        topBottomBorder.classList.add('animate')
      }, 800)

      setTimeout(() => {
        leftRightBorder.classList.add('animate')
        topShape.classList.add('animate')
        bottomShape.classList.add('animate')
        shapeLeft.classList.add('animate')
        shapeCenter.classList.add('animate')
        shapeRight.classList.add('animate')
      }, 1000)
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <ContentContainer4Styles
      className={animationActiveClass}
      ref={containerRef}
    >
      <div className='content-container-4-border-top-shape'>
        <div className='content-container-4-left-shape-border' />
        <div className='content-container-4-center-shape' />
        <div className='content-container-4-right-shape-border' />
      </div>
      <div className='content-container-4-top-bottom-border' />
      <div className='content-container-4-wrapper'>
        <div className='content-container scroller'>
          {children}
        </div>
      </div>
      <div className='content-container-4-left-right-border' />
      <div className='content-container-4-border-bottom-shape'>
        <div className='content-container-4-left-shape-border' />
        <div className='content-container-4-center-shape' />
        <div className='content-container-4-right-shape-border' />
      </div>
    </ContentContainer4Styles>
  )
}

ContentContainer4.propTypes = { children: PropTypes.any }
export default ContentContainer4
