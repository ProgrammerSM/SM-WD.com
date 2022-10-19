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
const ContentContainer6Styles = styled.div`
  position: relative;
  margin: 9px;

  &.animation-active {
    .content-container-6-wrapper { transition: opacity .5s linear; }
    .content-container-6-upper-thick-corner,
    .content-container-6-lower-thick-corner {
      transition: width .2s .4s linear, height .2s .2s linear;
    }

    .content-container-6-left-border,
    .content-container-6-right-border {
      transition: width .2s linear, height .2s linear;
    }

    .content-container-6-inner-shape {
      transition: height .2s .2s linear;
      
      &::before,
      &::after {
        transition: width .2s .4s linear;
      }
    }
  }

  &.no-animation {
    .content-container-6-wrapper { opacity: 1; }
    .content-container-6-upper-thick-corner,
    .content-container-6-lower-thick-corner {
      width: 40%;
      height: 10%;
    }

    .content-container-6-left-border,
    .content-container-6-right-border {
      width: 20%;
      height: 100%;
    }

    .content-container-6-upper-thick-corner {
      border-top: solid 4px;
      border-right: solid 4px;
    }

    .content-container-6-left-border {
      border-top: solid 2px;
      border-left: solid 2px;

      .content-container-6-inner-shape { border-right: solid 2px; }
    }

    .content-container-6-right-border {
      border-right: solid 2px;
      border-bottom: solid 2px;

      .content-container-6-inner-shape { border-left: solid 2px; }
    }

    .content-container-6-inner-shape {
      height: 80%;
      
      &::before,
      &::after {
        width: 19px;
      }

      &::before { border-top: solid 2px; }
      &::after { border-bottom: solid 2px; }
    }

    .content-container-6-lower-thick-corner {
      border-bottom: solid 4px;
      border-left: solid 4px;
    }
  }

  .content-container-6-upper-thick-corner,
  .content-container-6-left-border,
  .content-container-6-inner-shape,
  .content-container-6-inner-shape::before,
  .content-container-6-inner-shape::after,
  .content-container-6-right-border,
  .content-container-6-lower-thick-corner {
    position: absolute;
    z-index: -1;
  }

  .content-container-6-left-border,
  .content-container-6-inner-shape,
  .content-container-6-inner-shape::before,
  .content-container-6-inner-shape::after,
  .content-container-6-right-border {
    border-color: var(--primary-color);
  }

  .content-container-6-upper-thick-corner,
  .content-container-6-lower-thick-corner {
    width: 0;
    height: 0;
    border-color: var(--accent-color-1);
    
    &.animate {
      width: 40%;
      height: 10%;
    }
  }

  .content-container-6-left-border,
  .content-container-6-right-border {
    width: 0;
    height: 0;

    &.animate {
      width: 20%;
      height: 100%;
    }
  }

  .content-container-6-left-border .content-container-6-inner-shape::before,
  .content-container-6-right-border .content-container-6-inner-shape::after {
    top: 25%;
    transform: rotate(35deg);
  }

  .content-container-6-left-border .content-container-6-inner-shape::after,
  .content-container-6-right-border .content-container-6-inner-shape::before {
    bottom: 25%;
    transform: rotate(-35deg);
  }

  .content-container-6-upper-thick-corner {
    top: -8px;
    right: -8px;

    &.animate {
      border-top: solid 4px;
      border-right: solid 4px;
    }
  }

  .content-container-6-left-border {
    top: 0;
    left: 0;

    &.animate {
      border-top: solid 2px;
      border-left: solid 2px;
    }

    .content-container-6-inner-shape {
      top: 0;
      left: 0;

      &.animate { border-right: solid 2px; }
      &::before,
      &::after {
        left: -5px;
      }
    }
  }

  .content-container-6-wrapper {
    opacity: 0;

    &.animate { opacity: 1; }
  }

  .content-container-6-right-border {
    right: 0;
    bottom: 0;

    &.animate {
      border-right: solid 2px;
      border-bottom: solid 2px;
    }

    .content-container-6-inner-shape {
      right: 0;
      bottom: 0;

      &.animate { border-left: solid 2px; }
      &::before,
      &::after {
        right: -5px;
      }
    }
  }

  .content-container-6-inner-shape {
    width: 15px;
    height: 0;

    &.animate {
      height: 80%;
      
      &::before,
      &::after {
        width: 19px;
      }

      &::before { border-top: solid 2px; }
      &::after { border-bottom: solid 2px; }
    }

    &::before,
    &::after {
      width: 0;
      height: 10px;
      content: '';
    }
  }

  .content-container-6-lower-thick-corner {
    bottom: -8px;
    left: -8px;

    &.animate {
      border-bottom: solid 4px;
      border-left: solid 4px;
    }
  }
`

const ContentContainer6 = ({ children }) => {
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const contentContainer6 = containerRef.current

    if (contentContainer6 && isAnimationActive) {
      const contentContainer = contentContainer6.querySelector('.content-container-6-wrapper')
      const upperThickCorner = contentContainer6.querySelector('.content-container-6-upper-thick-corner')
      const leftBorder = contentContainer6.querySelector('.content-container-6-left-border')
      const lowerThickCorner = contentContainer6.querySelector('.content-container-6-lower-thick-corner')
      const rightBorder = contentContainer6.querySelector('.content-container-6-right-border')
      const innerShapes = contentContainer6.querySelectorAll('.content-container-6-inner-shape')

      setTimeout(() => {
        contentContainer.classList.add('animate')
      }, 100)

      setTimeout(() => {
        leftBorder.classList.add('animate')
        rightBorder.classList.add('animate')
        innerShapes.forEach(shape => { shape.classList.add('animate') })
      }, 800)

      setTimeout(() => {
        upperThickCorner.classList.add('animate')
        lowerThickCorner.classList.add('animate')
      }, 1000)
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <ContentContainer6Styles
      className={animationActiveClass}
      ref={containerRef}
    >
      <div className='content-container-6-upper-thick-corner' />
      <div className='content-container-6-left-border'>
        <div className='content-container-6-inner-shape' />
      </div>
      <div className='content-container-6-wrapper'>
        <div className='content-container scroller'>
          {children}
        </div>
      </div>
      <div className='content-container-6-right-border'>
        <div className='content-container-6-inner-shape' />
      </div>
      <div className='content-container-6-lower-thick-corner' />
    </ContentContainer6Styles>
  )
}

ContentContainer6.propTypes = { children: PropTypes.any }
export default ContentContainer6
