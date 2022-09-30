// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useContext,
  useEffect,
  useRef,
} from 'react'

// Components
import Heading from '../Heading'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'
import { SettingsContext } from 'context/SettingsContext'

// Styles
const WideContentContainerStyles = styled.div`
  position: relative;
  margin: 9px 0;

  &.animation-active {
    .container-content-wrapper { transition: opacity .5s linear; }
    .top-bottom-bar { transition: width .2s linear .2s; }
    .container-top-border,
    .container-bottom-border { transition: width .2s linear, height .2s .2s linear; }
    .container-center-border { transition: height .2s linear .2s; }
  }

  &.no-animation {
    .container-content-wrapper { opacity: 1; }
    .top-bottom-bar { width: 50%; }
    .container-top-border,
    .container-bottom-border {
      width: 100%;
      height: 10%;
      border-right: 2px solid var(--primary-color);
      border-left: 2px solid var(--primary-color); 
    }
    .container-center-border { height: 40%; }
  }
  
  .container-content-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    max-height: calc(100vh - 231px);
    opacity: 0;

    &.animate { opacity: 1; }
  }

  .container-heading,
  .container-content {
    padding: 0 5px;
  }

  .container-content {
    flex-grow: 1;
    overflow-y: auto;

    > *:last-of-type {
      margin-bottom: 0;
    }
  }

  .top-bottom-bar,
  .container-top-border,
  .container-center-border,
  .container-bottom-border {
    position: absolute;
    z-index: -1;
  }

  .container-top-border,
  .container-bottom-border {
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%);

    &.animate {
      width: 100%;
      height: 10%;
      border-right: 2px solid var(--primary-color);
      border-left: 2px solid var(--primary-color);  
    }
  }

  .top-bottom-bar {
    top: -9px;
    bottom: -9px;
    left: 50%;
    width: 0;
    border-top: 4px solid var(--accent-color-1);
    border-bottom: 4px solid var(--accent-color-1);
    transform: translateX(-50%);

    &.animate {
      width: 50%;
    }
  }

  .container-top-border {
    top: 0;
    border-top: 2px solid var(--primary-color);
  }

  .container-center-border {
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);
    height: 0;
    border-right: 4px solid var(--accent-color-1);
    border-left: 4px solid var(--accent-color-1);

    &.animate {
      height: 40%;
    }
  }

  .container-bottom-border {
    bottom: 0;
    border-bottom: 2px solid var(--primary-color);
  }
`

const WideContentContainer = ({
  children,
  headingData,
}) => {
  const hasAnimatedRef = useRef(false)
  const containerRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const wideContainer = containerRef.current

    if (wideContainer && isAnimationActive) {
      const containerContent = wideContainer.querySelector('.container-content-wrapper')
      const topBottomBar = wideContainer.querySelector('.top-bottom-bar')
      const topBorder = wideContainer.querySelector('.container-top-border')
      const centerBorder = wideContainer.querySelector('.container-center-border')
      const bottomBorder = wideContainer.querySelector('.container-bottom-border')

      setTimeout(() => {
        containerContent.classList.add('animate')
      }, 100)

      setTimeout(() => {
        topBorder.classList.add('animate')
        bottomBorder.classList.add('animate')
      }, 800)

      setTimeout(() => {
        topBottomBar.classList.add('animate')
        centerBorder.classList.add('animate')
      }, 1000)
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <WideContentContainerStyles
      className={animationActiveClass}
      ref={containerRef}
    >
      <div className='container-content-wrapper content-container'>
        {headingData && (
          <div className='container-heading'>
            <Heading
              as={headingData.headingType}
              isCenter={headingData.align === 'center'}
              isRight={headingData.align === 'right'}
            >{headingData.headingText}</Heading>
          </div>
        )}
        <div className='container-content scroller'>
          {children}
        </div>
      </div>
      <div className='top-bottom-bar' />
      <div className='container-top-border' />
      <div className='container-center-border' />
      <div className='container-bottom-border' />
    </WideContentContainerStyles>
  )
}

WideContentContainer.propTypes = {
  children: PropTypes.node,
  headingData: PropTypes.shape({
    align: PropTypes.string,
    headingText: PropTypes.string,
    headingType: PropTypes.string,
  }),
}

export default WideContentContainer
