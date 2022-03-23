// Modules
import { createContext } from 'react'
import PropTypes from 'prop-types'

// Functions
import commonThemeValues from 'data/commonThemeValues'
import themeColorGroups from 'data/themeColorGroups'

// Hooks
import useLocalStorage from 'hooks/useLocalStorage'

// Variables
const currentThemeDefaultValue = {}
const CurrentThemeContext = createContext(currentThemeDefaultValue)
// PropTypes
const propTypes = { children: PropTypes.node }
const CurrentThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useLocalStorage('smwdColorThemeName', 'light')
  const [customTheme, setCustomTheme] = useLocalStorage('smwdCustomTheme', { ...themeColorGroups.light })
  const [hasCustomTheme, setHasCustomTheme] = useLocalStorage('smwdHasCustomTheme', false)

  let theme
  if (themeName === 'custom')
    theme = {
      ...commonThemeValues,
      ...customTheme,
    }
  else
    theme = {
      ...commonThemeValues,
      ...themeColorGroups[themeName],
    }

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

CurrentThemeProvider.propTypes = propTypes
export {
  CurrentThemeContext,
  CurrentThemeProvider,
}
