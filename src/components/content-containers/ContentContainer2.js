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
const ContentContainer2Styles = styled.div`
  position: relative;
  margin: 9px;

  &.animation-active {
    .content-container-2-wrapper { transition: opacity .5s linear; }

    .content-container-2-bottom-corner-shape,
    .content-container-2-top-corner-shape {
      transition: width .2s .2s linear, height .2s linear;
    }

    .content-container-2-top-corner-shape::after,
    .content-container-2-bottom-corner-shape::before {
      transition: height .2s linear .6s;
    }

    .content-container-2-top-corner-shape::before,
    .content-container-2-bottom-corner-shape::after {
      transition: width .2s linear .4s;
    }
  }

  &.no-animation {
    .content-container-2-wrapper { opacity: 1; }

    .content-container-2-bottom-corner-shape,
    .content-container-2-top-corner-shape {
      width: 75%;
      height: 100%;
    }

    .content-container-2-top-corner-shape::after,
    .content-container-2-bottom-corner-shape::before {
      height: 20%;
    }

    .content-container-2-top-corner-shape::before,
    .content-container-2-bottom-corner-shape::after {
      width: 75%;
    }

    .content-container-2-top-corner-shape {
      border-top: solid 2px var(--primary-color);
      border-right: solid 2px var(--primary-color);

      &::before { border-top: solid 4px; }
      &::after { border-right: solid 4px; }
    }
    
    .content-container-2-bottom-corner-shape {
      border-bottom: solid 2px var(--primary-color);
      border-left: solid 2px var(--primary-color);
      
      &::before { border-left: solid 4px; }
      &::after { border-bottom: solid 4px; }
    }
  }

  .content-container-2-bottom-corner-shape,
  .content-container-2-bottom-corner-shape::before,
  .content-container-2-bottom-corner-shape::after,
  .content-container-2-top-corner-shape,
  .content-container-2-top-corner-shape::before,
  .content-container-2-top-corner-shape::after {
    position: absolute;
    z-index: -1;
  }

  .content-container-2-bottom-corner-shape,
  .content-container-2-top-corner-shape {
    top: 0;
    width: 0;
    height: 0;

    &.animate {
      width: 75%;
      height: 100%;
    }
  }

  .content-container-2-bottom-corner-shape {
    left: 0;    

    &.animate {
      border-bottom: solid 2px var(--primary-color);
      border-left: solid 2px var(--primary-color);

      &::before { border-left: solid 4px; }
      &::after { border-bottom: solid 4px; }
    }

    &::before {
      top: 20px;
      left: -10px;
    }

    &::after {
      bottom: -10px;
      left: -2px;
    }
  }

  .content-container-2-wrapper {
    opacity: 0;

    &.animate { opacity: 1; }
  }

  .content-container-2-top-corner-shape {
    right: 0;

    &.animate {
      border-top: solid 2px var(--primary-color);
      border-right: solid 2px var(--primary-color);

      &::before { border-top: solid 4px; }
      &::after { border-right: solid 4px; }
    }

    &::before {
      top: -10px;
      right: -2px;
    }

    &::after {
      right: -10px;
      bottom: 20px;
    }
  }

  .content-container-2-bottom-corner-shape::before,
  .content-container-2-bottom-corner-shape::after,
  .content-container-2-top-corner-shape::before,
  .content-container-2-top-corner-shape::after {
    content: '';
  }

  .content-container-2-top-corner-shape::after,
  .content-container-2-bottom-corner-shape::before {
    height: 0;
    border-color: var(--accent-color-2);
  }

  .content-container-2-top-corner-shape.animate::after,
  .content-container-2-bottom-corner-shape.animate::before {
    height: 20%;
  }
  
  .content-container-2-top-corner-shape::before,
  .content-container-2-bottom-corner-shape::after {
    width: 0;
    border-color: var(--accent-color-1);
  }

  .content-container-2-top-corner-shape.animate::before,
  .content-container-2-bottom-corner-shape.animate::after {
    width: 75%;
  }
`

const ContentContainer2 = ({ children }) => {
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const contentContainer2 = containerRef.current

    if (contentContainer2 && isAnimationActive) {
      const contentContainer = contentContainer2.querySelector('.content-container-2-wrapper')
      const topCorner = contentContainer2.querySelector('.content-container-2-top-corner-shape')
      const bottomCorner = contentContainer2.querySelector('.content-container-2-bottom-corner-shape')

      setTimeout(() => {
        contentContainer.classList.add('animate')
      }, 100)

      setTimeout(() => {
        topCorner.classList.add('animate')
        bottomCorner.classList.add('animate')
      }, 800)
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <ContentContainer2Styles
      className={animationActiveClass}
      ref={containerRef}
    >
      <div className='content-container-2-top-corner-shape' />
      <div className='content-container-2-wrapper'>
        <div className='content-container scroller'>
          {children}
        </div>
      </div>
      <div className='content-container-2-bottom-corner-shape' />
    </ContentContainer2Styles>
  )
}

ContentContainer2.propTypes = { children: PropTypes.any }
export default ContentContainer2
