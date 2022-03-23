// Modules
import PropTypes from 'prop-types'
import { useResizeDetector } from 'react-resize-detector'
import {
  createContext,
  useCallback,
  useState,
} from 'react'

// Variables
const BreakpointContext = createContext({
  breakpoints: {
    desktop: true,
    mobile: false,
    tablet: false,
  },

  /* eslint-disable-next-line no-empty-function -- used for context */
  setBreakpoints: () => {},
})

const propTypes = { children: PropTypes.node }
const BreakpointProvider = ({ children }) => {
  const [breakpoints, setBreakpoints] = useState({
    desktop: true,
    mobile: true,
    tablet: false,
  })

  const onResize = useCallback(width => {
    let desktop = false
    let tablet = false
    let mobile = false

    if (width >= 1025)
      desktop = true
    else if (width >= 641 && width <= 1024)
      tablet = true
    else
      mobile = true

    setBreakpoints({
      desktop,
      mobile,
      tablet,
    })
  }, [])

  const { ref } = useResizeDetector({ onResize })

  return (
    <BreakpointContext.Provider value={[breakpoints, setBreakpoints]}>
      <div ref={ref}>
        {children}
      </div>
    </BreakpointContext.Provider>
  )
}

BreakpointProvider.propTypes = propTypes

export {
  BreakpointContext,
  BreakpointProvider,
}
