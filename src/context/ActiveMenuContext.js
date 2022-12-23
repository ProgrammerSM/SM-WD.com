// Modules
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import {
  createContext,
  useEffect,
  useState,
} from 'react'

// Variables
const activeMenuDefaultValue = {}
const ActiveMenuContext = createContext(activeMenuDefaultValue)
const ActiveMenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('')
  const [isMenuActive, setIsMenuActive] = useState(false)
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setActiveMenu('')
      setIsMenuActive(false)
    })
  }, [router])

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

ActiveMenuProvider.propTypes = { children: PropTypes.node }
export {
  ActiveMenuContext,
  ActiveMenuProvider,
}
