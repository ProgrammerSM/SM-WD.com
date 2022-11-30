// Modules
import PropTypes from 'prop-types'
import {
  createContext,
  useState,
} from 'react'

// Variables
const loadingDefaultValue = {}
const LoadingContext = createContext(loadingDefaultValue)
const LoadingProvider = ({ children }) => {
  const [isHeaderLoadingActive, setIsHeaderLoadingActive] = useState(false)
  const [loadingOverlay, setLoadingOverlay] = useState({
    isComplete: false,
    isLoading: false,
    loadingMessage: 'loading',
  })

  return (
    <LoadingContext.Provider
      value={{
        isHeaderLoadingActive,
        loadingOverlay,
        setIsHeaderLoadingActive,
        setLoadingOverlay,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = { children: PropTypes.node }
export {
  LoadingContext,
  LoadingProvider,
}
