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
const ContentContainer3Styles = styled.div`
  position: relative;
  margin: 8px 9px;

  .content-container-3-lower-thin-corner,
  .content-container-3-lower-thin-corner::before,
  .content-container-3-lower-thick-corner,
  .content-container-3-upper-thin-corner,
  .content-container-3-upper-thin-corner::after,
  .content-container-3-upper-thick-corner {
    position: absolute;
    z-index: -1;
  }

  .content-container-3-lower-thin-corner,
  .content-container-3-upper-thin-corner {
    width: 30%;
    height: 80%;
    border-color: var(--primary-color);
  }

  .content-container-3-lower-thin-corner::before,
  .content-container-3-upper-thin-corner::after {
    height: 20%;
    border-color: var(--accent-color-2);
    content: "";
  }

  .content-container-3-lower-thick-corner,
  .content-container-3-upper-thick-corner {
    width: 80%;
    height: 30%;
    border-color: var(--accent-color-1);
  }
  
  .content-container-3-lower-thin-corner {
    bottom: 0;
    left: 0;
    border-bottom: solid 2px;
    border-left: solid 2px;

    &::before {
      bottom: 20px;
      left: -10px;
      border-left: solid 4px;
    }
  }

  .content-container-3-upper-thin-corner {
    top: 0;
    right: 0;
    border-top: solid 2px;
    border-right: solid 2px;

    &::after {
      top: 20px;
      right: -10px;
      border-right: solid 4px;
    }
  }

  .content-container-3-lower-thick-corner {
    top: -8px;
    left: -8px;
    border-top: solid 4px;
    border-left: solid 4px;
  }

  .content-container-3-upper-thick-corner {
    right: -8px;
    bottom: -8px;
    border-right: solid 4px;
    border-bottom: solid 4px;
  }
`

const ContentContainer3 = ({ children }) => {
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const contentContainer3 = containerRef.current

    if (contentContainer3 && isAnimationActive) {
      const contentContainer = contentContainer3.querySelector('.content-container-3-wrapper')
      const lowerThinCorner = contentContainer3.querySelector('.content-container-3-lower-thin-corner')
      const upperThinCorner = contentContainer3.querySelector('.content-container-3-upper-thin-corner')
      const lowerThickCorner = contentContainer3.querySelector('.content-container-3-lower-thick-corner')
      const upperThickCorner = contentContainer3.querySelector('.content-container-3-upper-thick-corner')

      setTimeout(() => {
        contentContainer.classList.add('animate')
      }, 100)

      setTimeout(() => {
        lowerThinCorner.classList.add('animate')
        upperThinCorner.classList.add('animate')
      }, 800)

      setTimeout(() => {
        lowerThickCorner.classList.add('animate')
        upperThickCorner.classList.add('animate')
      }, 1000)
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <ContentContainer3Styles
      className={animationActiveClass}
      ref={containerRef}
    >
      <div className='content-container-3-lower-thin-corner' />
      <div className='content-container-3-lower-thick-corner' />
      <div className='content-container-3-wrapper'>
        <div className='content-container scroller'>
          {children}
        </div>
      </div>
      <div className='content-container-3-upper-thin-corner' />
      <div className='content-container-3-upper-thick-corner' />
    </ContentContainer3Styles>
  )
}

ContentContainer3.propTypes = { children: PropTypes.any }
export default ContentContainer3
