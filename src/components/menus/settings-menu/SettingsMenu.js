// Modules
import styled, { keyframes } from 'styled-components'

// Components
import CloseButton from '../CloseButton'

// Styles
const SettingMenuStyles = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  padding: var(--space-medium);
  border: 2px solid var(--primary-color);

  .settings-container {
    margin-top: var(--space-medium);
  }

  .close-button-container { margin-left: auto; }
`

const SettingsMenu = () => (
  <SettingMenuStyles>
    <div className='settings-container'>
      Settings
    </div>
    <div className='close-button-container'>
      <CloseButton />
    </div>
  </SettingMenuStyles>
)

export default SettingsMenu
