// Modules
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import {
  useContext,
  useRef,
  useState,
} from 'react'

// Components
const ColorPicker = dynamic(() => import('./ColorPicker'))
import Button from 'components/Button'
import CloseButton from '../CloseButton'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'
import { SettingsContext } from 'context/SettingsContext'

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
  const {
    isAnimationActive,
    isSoundActive,
    setIsAnimationActive,
    setIsSoundActive,
  } = useContext(SettingsContext)

  const {
    customTheme,
    theme,
    themeName,
    setCustomTheme,
    setThemeName,
  } = useContext(CurrentThemeContext)

  const previousCustomColorThemeRef = useRef(customTheme)
  const [isCustomThemeSelected, setIsCustomThemeSelected] = useState(themeName === 'custom')
  const [settingsColorTheme, setSettingsColorTheme] = useState(theme)
  const [selectedCustomColorObject, setSelectedCustomColorObject] = useState({
    color: customTheme.primaryColor,
    colorName: 'primaryColor',
  })

  const {
    handleSubmit,
    register,
    setValue,
  } = useForm({
    defaultValues: {
      appAnimation: isAnimationActive,
      appSound: isSoundActive,
      colorTheme: themeName,
      customColorTheme: customTheme,
    },
  })

  const themeChangeHandler = event => {
    const selectedThemeName = event.target.value

    if (selectedThemeName === 'custom') {
      setSettingsColorTheme(customTheme)
      setIsCustomThemeSelected(true)
      return
    }

    if (isCustomThemeSelected)
      setIsCustomThemeSelected(false)

    setSettingsColorTheme(themeColorGroups[selectedThemeName].colors)
  }

  const customColorSelectionHandler = (color, colorName) => {
    const uppercaseColor = color.toUpperCase()
    const updatedCustomThemeObject = {
      ...settingsColorTheme,
      [colorName]: uppercaseColor,
    }

    setSettingsColorTheme(updatedCustomThemeObject)
    setValue('customColorTheme', settingsColorTheme)
  }

  const resetCustomThemeHandler = () => {
    setSettingsColorTheme(previousCustomColorThemeRef.current)
    setSelectedCustomColorObject({
      ...selectedCustomColorObject,
      color: previousCustomColorThemeRef.current[selectedCustomColorObject.colorName],
    })
  }

  const settingsSaveHandler = data => {
    const {
      appSound,
      appAnimation,
      colorTheme,
      customColorTheme,
    } = data

    if (appSound !== isSoundActive)
      setIsSoundActive(appSound)

    if (appAnimation !== isAnimationActive)
      setIsAnimationActive(appAnimation)

    if (colorTheme !== themeName)
      setThemeName(colorTheme)

    if (customColorTheme !== customTheme)
      setCustomTheme(customColorTheme)
  }

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
              {...register('appSound')}
            />
            <label htmlFor='app-sound'>Animation</label>
            <input
              id='app-animation'
              type='checkbox'
              {...register('appAnimation')}
            />
          </fieldset>
          <fieldset>
            <legend>Theme Selection</legend>
            <input
              id='custom-colors'
              type='hidden'
              {...register('customColorTheme')}
            />
            <select {...register('colorTheme', { onChange: themeChangeHandler })} >
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
            {isCustomThemeSelected && (
              <>
                <button
                  type='button'
                  onClick={resetCustomThemeHandler}
                >Reset</button>
                {
                  Object.keys(settingsColorTheme).map((key, index) => {
                    const colorName = key.split('Color').join(' ')
                    const formattedColorName = colorName.charAt(0).toUpperCase() + colorName.slice(1)

                    return (
                      <button
                        key={`custom-color-button-${index}`}
                        type='button'
                        onClick={() => setSelectedCustomColorObject({
                          color: settingsColorTheme[key],
                          colorName: key,
                        })}
                      >{formattedColorName}</button>
                    )
                  })
                }
                <ColorPicker
                  color={settingsColorTheme[selectedCustomColorObject.colorName]}
                  onChangeEvent={color => customColorSelectionHandler(color, selectedCustomColorObject.colorName)}
                />
              </>
            )}
          </fieldset>
          <div className='save-button-wrapper'>
            <Button
              className='save-button'
              onClickHandler={handleSubmit(settingsSaveHandler)}
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
