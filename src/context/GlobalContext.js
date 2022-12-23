// Modules
import PropTypes from 'prop-types'

// Context
import { ActiveMenuProvider } from './ActiveMenuContext'
import { BreakpointProvider } from './BreakpointContext'
import { CurrentThemeProvider } from './CurrentThemeContext'
import { LoadingProvider } from './LoadingContext'
import { SettingsProvider } from './SettingsContext'

const GlobalContext = ({ children }) => (
  <BreakpointProvider>
    <CurrentThemeProvider>
      <SettingsProvider>
        <ActiveMenuProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ActiveMenuProvider>
      </SettingsProvider>
    </CurrentThemeProvider>
  </BreakpointProvider>
)

GlobalContext.propTypes = { children: PropTypes.node }
export default GlobalContext
