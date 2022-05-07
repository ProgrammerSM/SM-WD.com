// Modules
import PropTypes from 'prop-types'
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// Context
import { SettingsContext } from 'context/SettingsContext'

// PropTypes
const propTypes = {
  align: PropTypes.oneOf([
    'center',
    'left',
    'right',
  ]),
  as: PropTypes.string.isRequired,
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  speed: PropTypes.number,
  text: PropTypes.string.isRequired,
}

const AnimatedContent = ({
  align = 'left',
  as: ElementType,
  minHeight = 22.5,
  speed = 500,
  text = 'No Text Provided',
}) => {
  let start = performance.now()
  const textLength = text.length
  const hasAnimatedRef = useRef(false)
  const { isAnimationActive } = useContext(SettingsContext)
  const [currentContent, setCurrentContent] = useState('')
  const startContentAnimation = timestamp => {
    const interval = 1000 / 60
    const printTime = interval * textLength
    const timeout = speed
    const duration = Math.min(printTime, timeout)

    if (start === undefined)
      start = timestamp

    const elapsed = timestamp - start
    const newContentLength = Math.round((elapsed * textLength) / duration)
    const textByNewContentLength = text.substring(0, newContentLength)
    setCurrentContent(textByNewContentLength)

    if (textByNewContentLength.length === textLength) {
      window.cancelAnimationFrame(startContentAnimation)
      hasAnimatedRef.current = true
    } else
      window.requestAnimationFrame(startContentAnimation)
  }

  useEffect(() => {
    if (!isAnimationActive)
      return

    window.requestAnimationFrame(startContentAnimation)

  }, [isAnimationActive])

  return isAnimationActive || hasAnimatedRef.current ? (
    <ElementType
      style={{
        minHeight: `${minHeight}px`,
        textAlign: align,
        width: '100%',
      }}
    >{currentContent}</ElementType >
  ) : <ElementType style={{ textAlign: align }}>{text}</ElementType>
}

AnimatedContent.propTypes = propTypes
export default AnimatedContent
