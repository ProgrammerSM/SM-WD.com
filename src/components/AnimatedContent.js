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
  delay: PropTypes.number,
  speed: PropTypes.number,
  text: PropTypes.string,
}

const AnimatedContent = ({
  align = 'left',
  delay = 800,
  speed = 800,
  text = 'No Text Provided',
}) => {
  const textLength = text.length
  const hasAnimatedRef = useRef(false)
  const startRef = useRef()
  const heightRef = useRef()
  const { isAnimationActive } = useContext(SettingsContext)
  const [currentContent, setCurrentContent] = useState('')
  const [height, setHeight] = useState(0)
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

  useEffect(() => {
    if (heightRef.current)
      setHeight(heightRef.current.offsetHeight)
  }, [])

  return isAnimationActive && !hasAnimatedRef.current
    ? height ? (
      <p
        data-testid='animated-content'
        style={{
          minHeight: `${height}px`,
          textAlign: align,
          width: '100%',
        }}
      >{currentContent}</p >
    ) : (
      <div
        data-testid='hidden-content'
        ref={heightRef}
      >
        <p style={{ visibility: 'hidden' }}>{text}</p>
      </div>
    ) : (
      <p
        data-testid='static-content'
        style={{ textAlign: align }}
      >{text}</p>
    )
}

AnimatedContent.propTypes = propTypes
export default AnimatedContent
