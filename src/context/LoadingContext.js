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
  const [loading, setLoading] = useState({
    isLoading: false,
    loadingMessage: 'Loading',
  })

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
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
