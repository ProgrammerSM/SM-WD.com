// Modules
import { faGear } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Component
import MenuButton from './MenuButton'

// Styles
const SettingsMenuButtonStyles = styled.div`
  position: absolute;
  right: var(--menu-button-h);
  bottom: var(--menu-button-v);
  z-index: 1;
`

// PropTypes
const propTypes = { buttonName: PropTypes.string.isRequired }
const SettingsMenuButton = ({ buttonName }) => (
  <SettingsMenuButtonStyles>
    <MenuButton
      buttonText={buttonName}
      icon={faGear}
      iconSize={{
        height: '1rem',
        width: '1rem',
      }}
      tabIndexNumber={3}
    />
  </SettingsMenuButtonStyles>
)

SettingsMenuButton.propTypes = propTypes
export default SettingsMenuButton
