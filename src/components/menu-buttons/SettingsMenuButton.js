// Modules
import { faGear } from '@fortawesome/free-solid-svg-icons'
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
const SettingsMenuButtonStyles = styled.div`
  position: absolute;
  right: var(--menu-button-h);
  bottom: var(--menu-button-v);
  z-index: 1;
`

const SettingsMenuButton = ({
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
    <SettingsMenuButtonStyles>
      <MenuButton
        buttonText={buttonName}
        clickHandler={
          () => menuButtonClick(activeMenu, buttonName, isMenuActive, setActiveMenu, setIsMenuActive)
        }
        icon={faGear}
        iconSize={{
          height: '1rem',
          width: '1rem',
        }}
        isActive={activeMenu === buttonName}
        isDisabled={activeMenu === alternateButtonName}
        tabIndexNumber={3}
      />
    </SettingsMenuButtonStyles>
  )
}

SettingsMenuButton.propTypes = {
  alternateButtonName: PropTypes.string,
  buttonName: PropTypes.string.isRequired,
}

export default SettingsMenuButton
