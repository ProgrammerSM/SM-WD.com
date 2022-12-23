// Modules
import PropTypes from 'prop-types'
import { useResizeDetector } from 'react-resize-detector'
import {
  createContext,
  useCallback,
  useState,
} from 'react'

// Data
import { toNumber } from 'data/media-queries'

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

const BreakpointProvider = ({ children }) => {
  const [breakpoints, setBreakpoints] = useState({
    desktop: true,
    mobile: true,
    tablet: false,
  })

  const onResize = useCallback(() => {
    const width = window.innerWidth
    let desktop = false
    let tablet = false
    let mobile = false

    if (width >= toNumber.desktop)
      desktop = true
    else if (width >= toNumber.tablet && width <= toNumber.tabletMax)
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
    <BreakpointContext.Provider value={breakpoints}>
      <div ref={ref}>
        {children}
      </div>
    </BreakpointContext.Provider>
  )
}

BreakpointProvider.propTypes = { children: PropTypes.node }
export {
  BreakpointContext,
  BreakpointProvider,
}
