// Modules
import { faBars } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useContext } from 'react'

// Component
import MenuButton from './MenuButton'

// Context
import { ActiveMenuContext } from 'context/ActiveMenuContext'

// Functions
import menuButtonClick from 'functions/menuButtonClick'

// Styles
const NavigationMenuButtonStyles = styled.div`
  position: absolute;
  left: var(--menu-button-h);
  bottom: var(--menu-button-v);
  z-index: 1;
`

const NavigationMenu = ({
  alternateButtonName,
  buttonName,
}) => {
  const {
    activeMenu,
    isMenuActive,
    setActiveMenu,
    setIsMenuActive,
  } = useContext(ActiveMenuContext)

  return (
    <NavigationMenuButtonStyles>
      <MenuButton
        buttonText={buttonName}
        clickHandler={
          () => menuButtonClick(activeMenu, buttonName, isMenuActive, setActiveMenu, setIsMenuActive)
        }
        icon={faBars}
        iconSize={{
          height: '1rem',
          width: '1rem',
        }}
        isActive={activeMenu === buttonName}
        isDisabled={activeMenu === alternateButtonName}
        tabIndexNumber={2}
      />
    </NavigationMenuButtonStyles>
  )
}

NavigationMenu.propTypes = {
  alternateButtonName: PropTypes.string,
  buttonName: PropTypes.string.isRequired,
}

export default NavigationMenu
