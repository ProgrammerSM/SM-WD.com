// Modules
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import {
  useContext,
  useEffect,
  useRef,
} from 'react'

// Context
import { SettingsContext } from 'context/SettingsContext'

// Sytles
const outerRotate = keyframes`
  from { transform: rotate(45deg); }
  to { transform: rotate(405deg); }
`

const innerRotate = keyframes`
  from { transform: rotate(-45deg); }
  to { transform: rotate(315deg); }
`

const LoadingLogoStyles = styled.svg`
  position: relative;
  max-width: 500px;
  max-height: 500px;

  circle,
  rect { transform-origin: center center; }

  .outer-circle,
  .inner-circle {
    fill: none;
    stroke: var(--primary-color);
    stroke-width: 16;
  }
  
  .outer-circle {
    transform: rotate(45deg);
    stroke-dasharray: 144.51326206513048 144.51326206513048;

    &.animate {
      animation: ${outerRotate} 2s .2s linear infinite;
    }
  }

  .inner-circle {
    transform: rotate(-45deg);
    stroke-dasharray: 109.95574287564276 109.95574287564276;
    
    &.animate {
      animation: ${innerRotate} 2s .2s linear infinite reverse;
    }
  }

  .s-bar-top,
  .s-bar-bottom,
  .m-bar {
    height: 8%;
    fill: var(--primary-color);
    transition: width .2s linear;
  }

  .s-bar-top {
    width: 55%;
    transform: rotate(225.1deg);

    &.animate {
      width: 32%;
    }
  }

  .s-bar-bottom {
    width: 45%;
    transform: rotate(45deg);

    &.animate {
      width: 23%;
    }
  }

  .m-bar {
    width: 42%;
    transform: rotate(-45deg);

    &.animate {
      width: 32.2%;
    }
  }
`

const circlePosition = 100
const LoadingLogo = ({
  height = '100%',
  width = '100%',
}) => {
  const animatedLogoRef = useRef()
  const hasAnimatedRef = useRef(false)
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const animatedLogo = animatedLogoRef.current

    if (animatedLogo && isAnimationActive) {
      const outerCircle = animatedLogo.querySelector('.outer-circle')
      const innerCircle = animatedLogo.querySelector('.inner-circle')
      const sBarTop = animatedLogo.querySelector('.s-bar-top')
      const sBarBottom = animatedLogo.querySelector('.s-bar-bottom')
      const mbar = animatedLogo.querySelector('.m-bar')

      sBarTop.classList.add('animate')
      sBarBottom.classList.add('animate')
      mbar.classList.add('animate')
      outerCircle.classList.add('animate')
      innerCircle.classList.add('animate')
    }

    hasAnimatedRef.current = true
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  return (
    <LoadingLogoStyles
      height={height}
      ref={animatedLogoRef}
      viewBox='0 0 200 200'
      width={width}
    >
      <circle
        className='outer-circle'
        cx={circlePosition}
        cy={circlePosition}
        r='92'
      />
      <circle
        className='inner-circle'
        cx={circlePosition}
        cy={circlePosition}
        r='70'
      />
      <g>
        <rect
          className='s-bar-top'
          x={90}
          y={84}
        />
        <rect
          className='s-bar-bottom'
          x={108}
          y={100}
        />
        <rect
          className='m-bar'
          fill='red'
          x={90}
          y={100}
        />
      </g>
    </LoadingLogoStyles>
  )
}

LoadingLogo.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
}

export default LoadingLogo
