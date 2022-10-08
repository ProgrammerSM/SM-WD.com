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
const ContentContainer5Styles = styled.div`
  --inner-shape-horizontal-border-width: 49%;
  
  position: relative;
  margin: 9px;

  .content-container-5-upper-corner-shape,
  .content-container-5-upper-inner-shape,
  .content-container-5-upper-inner-shape::after,
  .content-container-5-upper-inner-decended-line,
  .content-container-5-lower-corner-shape,
  .content-container-5-lower-inner-shape,
  .content-container-5-lower-inner-shape::before,
  .content-container-5-lower-inner-decended-line {
    position: absolute;
    z-index: -1;
    border-color: var(--primary-color);
  }

  .content-container-5-upper-corner-shape,
  .content-container-5-lower-corner-shape {
    &::before,
    &::after {
      position: absolute;
      content: '';
    }
  }

  .content-container-5-upper-corner-shape,
  .content-container-5-lower-corner-shape {
    width: 100%;
    height: 75%;
  }

  .content-container-5-upper-corner-shape::before,
  .content-container-5-lower-corner-shape::after {
    width: 10%;
    height: 80%;
    border-color: var(--accent-color-1);
  }

  .content-container-5-upper-corner-shape::after,
  .content-container-5-lower-corner-shape::before {
    width: 20%;
    border-color: var(--accent-color-2);
  }

  .content-container-5-upper-inner-shape,
  .content-container-5-lower-inner-shape {
    width: 80%;
    height: 15px;
  }

  .content-container-5-upper-inner-shape::after,
  .content-container-5-lower-inner-shape::before {
    width: 18px;
    height: 10px;
    transform: rotate(35deg);
    content: '';
  }

  .content-container-5-upper-inner-shape,
  .content-container-5-lower-inner-decended-line {
    left: 0;
  }
  .content-container-5-upper-inner-decended-line,
  .content-container-5-lower-inner-shape {
    right: 0;
  }

  .content-container-5-upper-inner-decended-line,
  .content-container-5-lower-inner-decended-line {
    width: 70%;
    height: 6px;
  }

  .content-container-5-upper-inner-shape,
  .content-container-5-upper-inner-decended-line {
    top: 0;
    border-bottom: solid 2px;
  }

  .content-container-5-lower-inner-shape,
  .content-container-5-lower-inner-decended-line {
    bottom: 0;
    border-top: solid 2px;
  }

  .content-container-5-upper-corner-shape {
    top: 0;
    left: 0;
    border-top: solid 2px;
    border-left: solid 2px;

    &::before,
    &::after {
      top: -10px;
      border-top: solid 4px;
    }

    &::before {
      left: -10px;
      border-left: solid 4px;
    }

    &::after {
      right: 20px;
    }
  }

  .content-container-5-lower-corner-shape {
    right: 0;
    bottom: 0;
    border-right: solid 2px;
    border-bottom: solid 2px;

    &::before,
    &::after {
      bottom: -10px;
      border-bottom: solid 4px;
    }

    &::before {
      left: 20px;
    }

    &::after {
      right: -10px;
      border-right: solid 4px;
    }
  }

  .content-container-5-upper-inner-shape::after {
    right: 20%;
    bottom: 2px;
    border-bottom: solid 2px;
  }

  .content-container-5-lower-inner-shape::before {
    top: 2px;
    left: 20%;
    border-top: solid 2px;
  }
`

const ContentContainer5 = ({ children }) => {
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const contentContainer5 = containerRef.current

    if (contentContainer5 && isAnimationActive) {
      const contentContainer = contentContainer5.querySelector('.content-container-5-wrapper')
      const upperCornerShape = contentContainer5.querySelector('.content-container-5-upper-corner-shape')
      const lowerCornerShape = contentContainer5.querySelector('.content-container-5-lower-corner-shape')
      const upperInnerShape = contentContainer5.querySelector('.content-container-5-upper-inner-shape')
      const upperInnerDecendedLine = contentContainer5.querySelector('.content-container-5-upper-inner-decended-line')
      const lowerInnerShape = contentContainer5.querySelector('.content-container-5-lower-inner-shape')
      const lowerInnerDecendedLine = contentContainer5.querySelector('.content-container-5-lower-inner-decended-line')

      setTimeout(() => {
        contentContainer.classList.add('animate')
      }, 100)

      setTimeout(() => {
        upperCornerShape.classList.add('animate')
        lowerCornerShape.classList.add('animate')
      }, 800)

      setTimeout(() => {
        upperInnerShape.classList.add('animate')
        lowerInnerShape.classList.add('animate')
        upperInnerDecendedLine.classList.add('animate')
        lowerInnerDecendedLine.classList.add('animate')
      }, 1000)
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <ContentContainer5Styles
      className={animationActiveClass}
      ref={containerRef}
    >
      <div className='content-container-5-wrapper'>
        <div className='content-container-5-upper-corner-shape'>
          <div className='content-container-5-upper-inner-shape' />
          <div className='content-container-5-upper-inner-decended-line' />
        </div>
        <div className='content-container scroller'>
          {children}
        </div>
        <div className='content-container-5-lower-corner-shape'>
          <div className='content-container-5-lower-inner-shape' />
          <div className='content-container-5-lower-inner-decended-line' />
        </div>
      </div>
    </ContentContainer5Styles>
  )
}

ContentContainer5.propTypes = { children: PropTypes.any }
export default ContentContainer5
