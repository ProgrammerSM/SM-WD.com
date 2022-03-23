// Modules
import { createContext } from 'react'
import PropTypes from 'prop-types'

// Hooks
import useLocalStorage from 'hooks/useLocalStorage'

// Variables
const settingsContextDefault = {}
const SettingsContext = createContext(settingsContextDefault)
// PropTypes
const propTypes = { children: PropTypes.node }
const SettingsProvider = ({ children }) => {
  const [isAnimationActive, setIsAnimationActive] = useLocalStorage('smwdIsAnimationActive', true)
  const [isSoundActive, setIsSoundActive] = useLocalStorage('smwdIsSoundActive', true)

  return (
    <SettingsContext.Provider
      value={{
        isAnimationActive,
        isSoundActive,
        setIsAnimationActive,
        setIsSoundActive,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

SettingsProvider.propTypes = propTypes
export {
  SettingsContext,
  SettingsProvider,
}
