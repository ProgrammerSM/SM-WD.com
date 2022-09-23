// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useContext,
  useEffect,
  useRef,
} from 'react'

// Components
import Image from 'next/image'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'
import { SettingsContext } from 'context/SettingsContext'

// Styles
const ShapeStyles = styled.div`
  position: relative;
  display: inline-block;
  margin: calc(1.38rem + 8px) 8px;
  opacity: 0;

  &.animate { opacity: 1; }
  &.no-animation {
    opacity: 1;

    .top-shape,
    .bottom-shape {
      width: 100%;
      height: 60%;
    }

    .top-line,
    .bottom-line { width: 50%; }

    .top-corner,
    .bottom-corner {
      width: 25%;
      height: 75%;
    }

    .top-shape,
    .top-corner {
      box-shadow: inset 5px 5px 5px -5px var(--primary-color);
    }

    .bottom-shape,
    .bottom-corner {
      box-shadow: inset -5px -5px 5px -5px var(--primary-color);
    }

    .top-shape {
      border-top: 2px solid var(--primary-color);
      border-left: 2px solid var(--primary-color);
    }

    .top-line { box-shadow: inset 0 5px 5px -5px var(--accent-color-2); }
    .top-corner {
      border-top: 4px solid var(--accent-color-1);
      border-left: 4px solid var(--accent-color-1);
    }

    .drop-shape {
      width: 30%;
      border-bottom: 2px solid var(--primary-color);
      box-shadow: inset 0 -5px 5px -5px var(--primary-color);

      &::before,
      &::after { height: 25px; }
      &::before { border-left: 2px solid var(--primary-color); }
      &::after { border-right: 2px solid var(--primary-color); }
    }

    .bottom-shape {
      border-bottom: 2px solid var(--primary-color);
      border-right: 2px solid var(--primary-color);
    }

    .bottom-line { box-shadow: inset 0 -5px 5px -5px var(--accent-color-2); }
    .bottom-corner {
      border-bottom: 4px solid var(--accent-color-1);
      border-right: 4px solid var(--accent-color-1);
    }

    .pop-shape {
      width: 75%;
      border-top: 2px solid var(--primary-color);
      box-shadow: inset 0 5px 5px -5px var(--primary-color);

      &::before,
      &::after { height: 32px; }
      &::before { border-right: 2px solid var(--primary-color); }
      &::after { border-left: 2px solid var(--primary-color); }
    }
  }

  &.animation-active {
    transition: opacity .5s linear;
    .top-shape,
    .bottom-shape { transition: width .2s linear, height .2s .2s linear; }
    .top-line,
    .bottom-line { transition: width .2s linear .3s; }
    .top-corner,
    .bottom-corner { transition: width .2s linear, height .2s linear .1s; }
    .drop-shape,
    .pop-shape {
      transition: width .2s linear;
      &::before { transition: height .2s linear; }      
      &::after { transition: height .2s linear .2s; }
    }
  }

  .top-shape,
  .top-line,
  .top-corner,
  .bottom-shape,
  .bottom-line,
  .bottom-corner {
    position: absolute;
  }

  .top-shape,
  .bottom-shape {
    width: 0;
    height: 0;
    z-index: 1;

    &.animate {
      width: 100%;
      height: 60%;
    }
  }

  .top-line,
  .bottom-line {
    width: 0;
    height: 40%;

    &.animate { width: 50%; }
  } 

  .top-corner,
  .bottom-corner {
    width: 0;
    height: 0;

    &.animate {
      width: 25%;
      height: 75%;
    }
  }

  .top-shape.animate,
  .top-corner.animate {
    box-shadow: inset 5px 5px 5px -5px var(--primary-color);
  }

  .bottom-shape.animate,
  .bottom-corner.animate {
    box-shadow: inset -5px -5px 5px -5px var(--primary-color);
  }

  .top-shape {
    top: 0;
    right: 0;

    &.animate {
      border-top: 2px solid var(--primary-color);
      border-left: 2px solid var(--primary-color);
    }

    .top-line {
      top: -10px;
      left: 30%;
      border-top: 4px solid var(--accent-color-2);

      &.animate { box-shadow: inset 0 5px 5px -5px var(--accent-color-2); }
    }

    .top-corner {
      top: -10px;
      left: -10px;

      &.animate {
        border-top: 4px solid var(--accent-color-1);
        border-left: 4px solid var(--accent-color-1);
      }
    }

    .drop-shape {
      position: absolute;
      top: 0;
      right: 25px;
      width: 0;
      height: 20px;
      
      &::before,
      &::after {
        position: absolute;
        top: -3px;
        height: 0;
        content: '';
      }
      
      &::before {
        left: -7px;
        transform: rotate(-35deg);
      }
      
      &::after {
        right: -7px;
        transform: rotate(35deg);
      }

      &.animate {
        width: 30%;
        border-bottom: 2px solid var(--primary-color);
        box-shadow: inset 0 -5px 5px -5px var(--primary-color);

        &::before,
        &::after {
          height: 25px;
        }

        &::before { border-left: 2px solid var(--primary-color); }
        &::after { border-right: 2px solid var(--primary-color); }
      }
    }
  }

  .bottom-shape {
    bottom: 2px;
    right: 0;

    &.animate {
      border-bottom: 2px solid var(--primary-color);
      border-right: 2px solid var(--primary-color);
    }

    .bottom-line {
      bottom: -10px;
      right: 30%;
      border-bottom: 4px solid var(--accent-color-2);

      &.animate { box-shadow: inset 0 -5px 5px -5px var(--accent-color-2); }
    }
    
    .bottom-corner {
      bottom: -10px;
      right: -10px;
      
      &.animate {
        border-bottom: 4px solid var(--accent-color-1);
        border-right: 4px solid var(--accent-color-1);
      }
    }

    .pop-shape {
      position: absolute;
      left: 25px;
      bottom: 1px;
      width: 0;
      height: 25px;
      
      &::before,
      &::after {
        position: absolute;
        bottom: -5px;
        height: 0;
        content: '';
      }
      
      &::before {
        left: -10px;
        border-right: 2px solid var(--primary-color);
        transform: rotate(35deg);
      }
      
      &::after {
        right: 50%;
        border-left: 2px solid var(--primary-color);
        transform: rotate(-35deg);
      }

      &.animate {
        width: 75%;
        border-top: 2px solid var(--primary-color);
        box-shadow: inset 0 5px 5px -5px var(--primary-color);

        &::before,
        &::after {
          height: 32px;
        }

        &::before { border-right: 2px solid var(--primary-color); }
        &::after { border-left: 2px solid var(--primary-color); }
      }
    }
  }
`

const Button = ({
  height,
  image,
  imageAlt,
  width,
}) => {
  const hasAnimatedRef = useRef(false)
  const imageRef = useRef()
  const { theme } = useContext(CurrentThemeContext)
  const { isAnimationActive } = useContext(SettingsContext)

  useEffect(() => {
    if (hasAnimatedRef.current)
      return

    const imageContainer = imageRef.current

    if (imageContainer && isAnimationActive) {
      const topShape = imageContainer.querySelector('.top-shape')
      const bottomShape = imageContainer.querySelector('.bottom-shape')
      const topCorner = imageContainer.querySelector('.top-corner')
      const bottomCorner = imageContainer.querySelector('.bottom-corner')
      const topLine = imageContainer.querySelector('.top-line')
      const bottomLine = imageContainer.querySelector('.bottom-line')
      const dropShape = imageContainer.querySelector('.drop-shape')
      const popShape = imageContainer.querySelector('.pop-shape')

      setTimeout(() => {
        imageContainer.classList.add('animate')
      }, 200)

      setTimeout(() => {
        topShape.classList.add('animate')
        bottomShape.classList.add('animate')
      }, 800)

      setTimeout(() => {
        dropShape.classList.add('animate')
        popShape.classList.add('animate')
        topCorner.classList.add('animate')
        bottomCorner.classList.add('animate')
        topLine.classList.add('animate')
        bottomLine.classList.add('animate')
      }, 1000)

      hasAnimatedRef.current = true
    }
  }, [isAnimationActive])

  const animationActiveClass = isAnimationActive
    ? 'animation-active'
    : 'no-animation'

  if (!image)
    return <p>No Image Provided</p>

  if (!width || !height)
    return <p>No Image Size Provided</p>

  if (!imageAlt)
    return <p>No Image Alt Provided</p>

  return (
    <ShapeStyles
      className={animationActiveClass}
      ref={imageRef}
      style={{ backgroundColor: `${theme.primaryColor}26` }}
    >
      <div className='top-shape'>
        <div className='top-line' />
        <div className='top-corner' />
        <div className='drop-shape' />
      </div>
      <Image
        alt={imageAlt}
        height={height}
        src={image}
        width={width}
      />
      <div className='bottom-shape'>
        <div className='pop-shape' />
        <div className='bottom-line' />
        <div className='bottom-corner' />
      </div>
    </ShapeStyles>
  )
}

Button.propTypes = {
  height: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
}

export default Button
