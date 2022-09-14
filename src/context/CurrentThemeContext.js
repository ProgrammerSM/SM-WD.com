// Modules
import { createContext } from 'react'
import PropTypes from 'prop-types'

// Data
import themeColorGroups from 'data/themeColorGroups'

// Hooks
import useBrowserStorage from 'hooks/useBrowserStorage'

// Variables
const currentThemeDefaultValue = {}
const CurrentThemeContext = createContext(currentThemeDefaultValue)
const CurrentThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useBrowserStorage('smwdColorThemeName', 'default')
  const [customTheme, setCustomTheme] = useBrowserStorage('smwdCustomTheme', { ...themeColorGroups.default })
  const [hasCustomTheme, setHasCustomTheme] = useBrowserStorage('smwdHasCustomTheme', false)

  let theme
  if (themeName === 'custom')
    theme = customTheme
  else
    theme = themeColorGroups[themeName]

  return (
    <CurrentThemeContext.Provider
      value={{
        customTheme,
        hasCustomTheme,
        setCustomTheme,
        setHasCustomTheme,
        setThemeName,
        theme,
        themeName,
      }}
    >
      {children}
    </CurrentThemeContext.Provider>
  )
}

CurrentThemeProvider.propTypes = { children: PropTypes.node }
export {
  CurrentThemeContext,
  CurrentThemeProvider,
}
