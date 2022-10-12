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
const ContentContainer1Styles = styled.div`
  position: relative;
  margin: 9px;

  &.animation-active {
    .content-container-1-wrapper { transition: opacity .5s linear; }
    .content-container-1-left-border,
    .content-container-1-right-border {
      transition: width .2s .2s linear, height .2s linear;

      &::before,
      &::after {
        transition: width .2s linear .2s;
      }
    }

    .content-container-1-top-line,
    .content-container-1-bottom-line {
      transition: width .2s linear .2s;
    }

    .content-container-1-right-line,
    .content-container-1-left-line {
      transition: height .2s linear .2s;
    }
  }

  &.no-animation {
    .content-container-1-wrapper { opacity: 1; }
    .content-container-1-left-border,
    .content-container-1-right-border {
      width: 75%;
      height: 100%;

      &::before,
      &::after {
        width: 10%;
      }
    }

    .content-container-1-top-line,
    .content-container-1-bottom-line {
      width: 60%;
    }

    .content-container-1-right-line,
    .content-container-1-left-line {
      height: 60%;
    }

    .content-container-1-left-border {
      border-top: solid 2px;
      border-left: solid 2px;
    }

    .content-container-1-right-border {
      border-right: solid 2px;
      border-bottom: solid 2px;
    }
  }

  .content-container-1-left-border,
  .content-container-1-right-border,
  .content-container-1-left-border::after,
  .content-container-1-right-border::before,
  .content-container-1-top-line,
  .content-container-1-right-line,
  .content-container-1-bottom-line,
  .content-container-1-left-line {
    position: absolute;
    z-index: -1;
  }

  .content-container-1-left-border,
  .content-container-1-right-border {
    top: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-color: var(--color-primary);

    &.animate {
      width: 75%;
      height: 100%;

      &::before,
      &::after {
        width: 10%;
      }
    }
  }

  .content-container-1-left-border::after,
  .content-container-1-right-border::before {
    width: 0;
    border-color: var(--primary-color);
    content: '';
  }
  

  .content-container-1-left-border {
    left: 0;

    &.animate {
      border-top: solid 2px;
      border-left: solid 2px;
    }

    &::after {
      bottom: 0;
      left: 0;
      border-bottom: solid 2px;
    }
  }

  .content-container-1-wrapper {
    opacity: 0;

    &.animate { opacity: 1; }
  }
  
  .content-container-1-right-border {
    right: 0;

    &.animate {
      border-right: solid 2px;
      border-bottom: solid 2px;
    }

    &::before {
      top: 0;
      right: 0;
      border-top: solid 2px;
    }
  }

  .content-container-1-top-line,
  .content-container-1-bottom-line {
    width: 0;
    border-color: var(--accent-color-1);

    &.animate {
      width: 60%;
    }
  }

  .content-container-1-right-line,
  .content-container-1-left-line {
    top: 50%;
    transform: translateY(-50%);
    height: 0;
    border-color: var(--accent-color-2);

    &.animate {
      height: 60%;
    }
  }

  .content-container-1-top-line {
    top: -10px;
    left: 20%;
    border-top: solid 4px;
  }

  .content-container-1-bottom-line {
    right: 20%;
    bottom: -10px;
    border-bottom: solid 4px;
  }

  .content-container-1-right-line {
    right: -10px;
    border-right: solid 4px;
  }

  .content-container-1-left-line {
    left: -10px;
    border-left: solid 4px;
  }
`

const ContentContainer1 = ({ children }) => {
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const contentContainer1 = containerRef.current

    if (contentContainer1 && isAnimationActive) {
      const contentContainer = contentContainer1.querySelector('.content-container-1-wrapper')
      const leftBorder = contentContainer1.querySelector('.content-container-1-left-border')
      const rightBorder = contentContainer1.querySelector('.content-container-1-right-border')
      const topLine = contentContainer1.querySelector('.content-container-1-top-line')
      const leftLine = contentContainer1.querySelector('.content-container-1-left-line')
      const bottomLine = contentContainer1.querySelector('.content-container-1-bottom-line')
      const rightLine = contentContainer1.querySelector('.content-container-1-right-line')

      setTimeout(() => {
        contentContainer.classList.add('animate')
      }, 100)

      setTimeout(() => {
        leftBorder.classList.add('animate')
        rightBorder.classList.add('animate')
      }, 800)

      setTimeout(() => {
        topLine.classList.add('animate')
        leftLine.classList.add('animate')
        bottomLine.classList.add('animate')
        rightLine.classList.add('animate')
      }, 1000)
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <ContentContainer1Styles
      className={animationActiveClass}
      ref={containerRef}
    >
      <div className='content-container-1-left-border'>
        <div className='content-container-1-top-line' />
        <div className='content-container-1-left-line' />
      </div>
      <div className='content-container-1-wrapper'>
        <div className='content-container scroller'>
          {children}
        </div>
      </div>
      <div className='content-container-1-right-border'>
        <div className='content-container-1-bottom-line' />
        <div className='content-container-1-right-line' />
      </div>
    </ContentContainer1Styles>
  )
}

ContentContainer1.propTypes = { children: PropTypes.any }
export default ContentContainer1
