// Modules
import styled from 'styled-components'
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// Context
import { LoadingContext } from 'context/LoadingContext'

// Styles
const LoadingOverlayStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  z-index: 3;

  .loading-container {
    width: 60%;
    max-width: 350px;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin: 0;
      text-align: center;
    }
  }

  .loading-message {
    color: var(--accent-color-1);
    font-size: 2rem;
  }

  .loading-percent{
    font-size: 5rem;
    font-family: var(--header-font);
    line-height: 1;
  }

  .loading-bar {
    background-color: var(--transparent-background);

    hr {
      margin: 0;
      border: 0;
      border-bottom: solid 2px var(--accent-color-1);
    }
  }

`

const LoadingOverlay = () => {
  const {
    loadingOverlay,
    setLoadingOverlay,
  } = useContext(LoadingContext)

  const savedCallback = useRef()
  const [percent, setPercent] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const intervalCallback = () => {
    setPercent(percent + 1)

    if (percent >= 99)
      setIsComplete(true)
  }

  useEffect(() => {
    savedCallback.current = intervalCallback
  }, [intervalCallback])

  useEffect(() => {
    let completeTimeout
    const percentInterval = setInterval(() => {
      savedCallback.current()
    }, 50)

    if (isComplete) {
      clearInterval(percentInterval)
      setLoadingOverlay({
        ...loadingOverlay,
        isComplete: true,
      })

      completeTimeout = setTimeout(() => {
        setLoadingOverlay({
          isLoading: false,
          loadingMessage: 'loading',
        })
      }, 1000)
    }

    return () => {
      clearInterval(percentInterval)
      clearTimeout(completeTimeout)
    }
  }, [isComplete])

  return (
    <LoadingOverlayStyles>
      <div className='loading-container'>
        <div className='loading-content'>
          <p className='loading-message'>{loadingOverlay.loadingMessage}</p>
          <p className='loading-percent'>{percent}%</p>
        </div>
        <div className='loading-bar'>
          <hr style={{ width: `${percent}%` }} />
        </div>
        <p>
          {isComplete
            ? 'Complete'
            : 'in progress'}
        </p>
      </div>
    </LoadingOverlayStyles>
  )
}

LoadingOverlay.propTypes = {}
export default LoadingOverlay
