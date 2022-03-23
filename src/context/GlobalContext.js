// Modules
import PropTypes from 'prop-types'

// Context
import { BreakpointProvider } from './BreakpointContext'
import { CurrentThemeProvider } from './CurrentThemeContext'
import { SettingsProvider } from './SettingsContenxt'

// PropTypes
const propTypes = { children: PropTypes.node }
const GlobalContext = ({ children }) => (
  <BreakpointProvider>
    <CurrentThemeProvider>
      <SettingsProvider>
        {children}
      </SettingsProvider>
    </CurrentThemeProvider>
  </BreakpointProvider>
)

GlobalContext.propTypes = propTypes
export default GlobalContext
