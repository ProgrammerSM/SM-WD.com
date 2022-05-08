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
  delay: PropTypes.number,
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  speed: PropTypes.number,
  text: PropTypes.string.isRequired,
}

const AnimatedContent = ({
  align = 'left',
  as: ElementType,
  delay = 800,
  minHeight = 22.5,
  speed = 800,
  text = 'No Text Provided',
}) => {
  const textLength = text.length
  const hasAnimatedRef = useRef(false)
  const startRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)
  const [currentContent, setCurrentContent] = useState('')
  let start = startRef.current
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

    setTimeout(() => {
      startRef.current = performance.now()
      window.requestAnimationFrame(startContentAnimation)
    }, delay)

    /* eslint-disable-next-line react-hooks/exhaustive-deps -- don't need startContentAnimation to be a dependant */
  }, [isAnimationActive])

  return isAnimationActive || hasAnimatedRef.current ? (
    <ElementType
      data-testid='animated-content'
      style={{
        minHeight: `${minHeight}px`,
        textAlign: align,
        width: '100%',
      }}
    >{currentContent}</ElementType >
  ) : (
    <ElementType
      data-testid='static-content'
      style={{ textAlign: align }}
    >{text}</ElementType>
  )
}

AnimatedContent.propTypes = propTypes
export default AnimatedContent
