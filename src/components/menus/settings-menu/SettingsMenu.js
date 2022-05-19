// Modules
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

// Components
const ColorPicker = dynamic(() => import('./ColorPicker'))
import Button from 'components/Button'
import CloseButton from '../CloseButton'

// Data
import themeColorGroups from 'data/themeColorGroups'

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

const SettingsMenu = () => {
  const [color, setColor] = useState('#aabbcc')
  const {
    handleSubmit,
    register,
    setValue,
  } = useForm()

  return (
    <SettingMenuStyles>
      <div className='settings-container'>
        <form>
          <fieldset className='accessibility'>
            <legend>Accessibility</legend>
            <label htmlFor='app-sound'>Sound</label>
            <input
              id='app-sound'
              type='checkbox'
            />
            <label htmlFor='app-sound'>Animation</label>
            <input
              id='app-animation'
              type='checkbox'
            />
          </fieldset>
          <fieldset>
            <legend>Theme Selection</legend>
            <select>
              {
                Object.keys(themeColorGroups).map(key => {
                  const optionName = key.split(/(?=[A-Z])/).join(' ').toUpperCase()

                  return (
                    <option
                      key={`theme-option-${key}`}
                      value={key}
                    >
                      {optionName}
                    </option>
                  )
                })
              }
              <option value='custom'>CUSTOM</option>
            </select>
            <ColorPicker
              color={color}
              setColor={setColor}
            />
          </fieldset>
          <div className='save-button-wrapper'>
            <Button
              className='save-button'
            >Save Settings</Button>
          </div>
        </form>
      </div>
      <div className='close-button-container'>
        <CloseButton />
      </div>
    </SettingMenuStyles>
  )
}

export default SettingsMenu
