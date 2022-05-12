// Modules
import PropTypes from 'prop-types'
import {
  createContext,
  useState,
} from 'react'

// Variables
const activeMenuDefaultValue = {}
const ActiveMenuContext = createContext(activeMenuDefaultValue)
// PropTypes
const propTypes = { children: PropTypes.node }
const ActiveMenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('')
  const [isMenuActive, setIsMenuActive] = useState(false)

  return (
    <ActiveMenuContext.Provider
      value={{
        activeMenu,
        isMenuActive,
        setActiveMenu,
        setIsMenuActive,
      }}
    >
      {children}
    </ActiveMenuContext.Provider>
  )
}

ActiveMenuProvider.propTypes = propTypes
export {
  ActiveMenuContext,
  ActiveMenuProvider,
}
