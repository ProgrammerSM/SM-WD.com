// Modules
import parseHTML from 'html-react-parser'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// Context
import { SettingsContext } from 'context/SettingsContext'

// Styles
const ContentStyles = styled.div`  
  & > p:last-of-type { margin-bottom: 0; }
  
  ul, ol, dl {
    margin: var(--space-medium);
    padding-left: var(--space-medium);
  }
  
  a {
    font-style: italic;
    text-decoration: underline;
    
    &:active,
    &:focus,
    &:hover {
      font-weight: 600;
    }
  }

  ul { list-style-type: circle; }
`

const AnimatedContent = ({
  align = 'left',
  content = '<p>No Text Provided</p>',
  delay = 800,
  speed = 800,
}) => {
  const textLength = content.length
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
    const textByNewContentLength = content.substring(0, newContentLength)
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

  }, [isAnimationActive])

  useEffect(() => {
    if (heightRef.current)
      setHeight(heightRef.current.offsetHeight)
  }, [])

  return isAnimationActive && !hasAnimatedRef.current
    ? height ? (
      <ContentStyles
        data-testid='animated-content'
        style={{
          minHeight: `${height}px`,
          textAlign: align,
          width: '100%',
        }}
      >{parseHTML(currentContent)}</ContentStyles>
    ) : (
      <div
        data-testid='hidden-content'
        ref={heightRef}
        style={{ margin: 0 }}
      >
        <ContentStyles style={{ visibility: 'hidden' }}>{parseHTML(content)}</ContentStyles>
      </div>
    ) : (
      <ContentStyles
        data-testid='static-content'
        style={{ textAlign: align }}
      >{parseHTML(content)}</ContentStyles>
    )
}

AnimatedContent.propTypes = {
  align: PropTypes.oneOf([
    'center',
    'left',
    'right',
  ]),
  content: PropTypes.string,
  delay: PropTypes.number,
  speed: PropTypes.number,
}

export default AnimatedContent
