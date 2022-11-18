// Modules
import { createContext } from 'react'
import PropTypes from 'prop-types'

// Hooks
import useBrowserStorage from 'hooks/useBrowserStorage'

// Variables
const settingsContextDefault = {}
const SettingsContext = createContext(settingsContextDefault)
const SettingsProvider = ({ children }) => {
  const [isAnimationActive, setIsAnimationActive] = useBrowserStorage('smwdIsAnimationActive', true)
  const [isSoundActive, setIsSoundActive] = useBrowserStorage('smwdIsSoundActive', true)

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

SettingsProvider.propTypes = { children: PropTypes.node }
export {
  SettingsContext,
  SettingsProvider,
}
