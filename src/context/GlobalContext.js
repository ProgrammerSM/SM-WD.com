// Modules
import PropTypes from 'prop-types'

// Context
import { ActiveMenuProvider } from './ActiveMenuContext'
import { BreakpointProvider } from './BreakpointContext'
import { CurrentThemeProvider } from './CurrentThemeContext'
import { SettingsProvider } from './SettingsContext'

// PropTypes
const propTypes = { children: PropTypes.node }
const GlobalContext = ({ children }) => (
  <BreakpointProvider>
    <CurrentThemeProvider>
      <SettingsProvider>
        <ActiveMenuProvider>
          {children}
        </ActiveMenuProvider>
      </SettingsProvider>
    </CurrentThemeProvider>
  </BreakpointProvider>
)

GlobalContext.propTypes = propTypes
export default GlobalContext
