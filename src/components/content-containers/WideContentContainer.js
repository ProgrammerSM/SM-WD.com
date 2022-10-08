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
import { SettingsContext } from 'context/SettingsContext'

// Styles
const WideContentContainerStyles = styled.div`
  position: relative;
  margin: 9px 0;

  &.animation-active {
    .container-content-wrapper { transition: opacity .5s linear; }
    .top-bar,
    .bottom-bar { transition: width .2s linear .2s; }
    .container-top-border,
    .container-bottom-border { transition: width .2s linear, height .2s .2s linear; }
    .left-bar,
    .right-bar { transition: height .2s linear .2s; }
  }

  &.no-animation {
    .container-content-wrapper { opacity: 1; }
    
    .top-bar,
    .bottom-bar { width: 50%; }
    
    .container-top-border,
    .container-bottom-border {
      width: 100%;
      height: 10%;
      border-right: 2px solid var(--primary-color);
      border-left: 2px solid var(--primary-color); 
    }
    
    .left-bar,
    .right-bar { height: 40%; }

    .top-bar {
      box-shadow: inset 0 5px 5px -5px var(--accent-color-1);
    }

    .container-top-border {
      box-shadow: inset 0 5px 5px -5px var(--primary-color);
    }

    .right-bar {
      box-shadow: inset -5px 0 5px -5px var(--accent-color-2);
    }

    .left-bar {
      box-shadow: inset 5px 0 5px -5px var(--accent-color-2);
    }

    .container-bottom-border {
      box-shadow: inset 0 -5px 5px -5px var(--primary-color);
    }

    .bottom-bar {
      box-shadow: inset 0 -5px 5px -5px var(--accent-color-1);
    }
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

  .top-bar,
  .bottom-bar,
  .container-top-border,
  .left-bar,
  .right-bar,
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

  .top-bar,
  .bottom-bar {
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 10px;
    
    &.animate {
      width: 50%;
    }
  }

  .left-bar,
  .right-bar {
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 0;

    &.animate {
      height: 40%;
    }
  }

  .top-bar {
    top: -9px;
    border-top: 4px solid var(--accent-color-1);

    &.animate {
      box-shadow: inset 0 5px 5px -5px var(--accent-color-1);
    }
  }
  
  .container-top-border {
    top: 0;
    border-top: 2px solid var(--primary-color);

    &.animate {
      box-shadow: inset 0 5px 5px -5px var(--primary-color);
    }
  }
  
  .right-bar {
    right: 0;
    border-right: 4px solid var(--accent-color-1);

    &.animate {
      box-shadow: inset -5px 0 5px -5px var(--accent-color-2);
    }
  }

  .left-bar {
    left: 0;
    border-left: 4px solid var(--accent-color-1);
    
    &.animate {
      box-shadow: inset 5px 0 5px -5px var(--accent-color-2);
    }
  }
  
  .container-bottom-border {
    bottom: 0;
    border-bottom: 2px solid var(--primary-color);

    &.animate {
      box-shadow: inset 0 -5px 5px -5px var(--primary-color);
    }
  }
  
  .bottom-bar {
    bottom: -9px;
    border-bottom: 4px solid var(--accent-color-1);

    &.animate {
      box-shadow: inset 0 -5px 5px -5px var(--accent-color-1);
    }
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
      const contentContainer = wideContainer.querySelector('.container-content-wrapper')
      const topBar = wideContainer.querySelector('.top-bar')
      const topBorder = wideContainer.querySelector('.container-top-border')
      const rightBar = wideContainer.querySelector('.right-bar')
      const leftBar = wideContainer.querySelector('.left-bar')
      const bottomBorder = wideContainer.querySelector('.container-bottom-border')
      const bottomBar = wideContainer.querySelector('.bottom-bar')

      setTimeout(() => {
        contentContainer.classList.add('animate')
      }, 100)

      setTimeout(() => {
        topBorder.classList.add('animate')
        bottomBorder.classList.add('animate')
      }, 800)

      setTimeout(() => {
        topBar.classList.add('animate')
        rightBar.classList.add('animate')
        leftBar.classList.add('animate')
        bottomBar.classList.add('animate')
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
      <div className='top-bar' />
      <div className='container-top-border' />
      <div className='right-bar' />
      <div className='left-bar' />
      <div className='container-bottom-border' />
      <div className='bottom-bar' />
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
