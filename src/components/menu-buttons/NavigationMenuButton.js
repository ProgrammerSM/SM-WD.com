// Modules
import { faBars } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Component
import MenuButton from './MenuButton'

// Styles
const NavigationMenuButtonStyles = styled.div`
  position: absolute;
  left: var(--menu-button-h);
  bottom: var(--menu-button-v);
  z-index: 1;
`

// PropTypes
const propTypes = { buttonName: PropTypes.string.isRequired }
const NavigationMenu = ({ buttonName }) => (
  <NavigationMenuButtonStyles>
    <MenuButton
      buttonText={buttonName}
      icon={faBars}
      iconSize={{
        height: '1rem',
        width: '1rem',
      }}
      tabIndexNumber={2}
    />
  </NavigationMenuButtonStyles>
)

NavigationMenu.propTypes = propTypes
export default NavigationMenu
