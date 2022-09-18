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
import { mediumUp } from 'data/media-queries'
import themeColorGroups from 'data/themeColorGroups'

// Styles
const SettingMenuStyles = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  padding: var(--space-medium);

  .settings-container {
    flex-grow: 1;
    margin-top: var(--space-medium);

    form {
      display: flex;
      flex-direction: column;
      row-gap: var(--space-medium);
      width: 100%;
      height: 100%;
    }

    fieldset { 
      width: 100%;
      border-color: var(--primary-color);
      box-shadow: inset 0 0 5px 1px var(--primary-color);

      legend { background-color: var(--background-color); }
    }
  }

  .theme-selection {
    display: flex;
    flex-grow: 1;
  }

  .theme-preview-wrapper,
  .theme-selector-wrapper {
    width: 50%;
  }

  .theme-preview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .theme-preview {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 250px;
    background-color: var(--background-color);
    color: var(--font-color);
    text-align: center;
    border: 2px solid var(--primary-color);
  }

  .theme-accent-1,
  .theme-accent-2,
  .theme-accent-3 {
    position: absolute;
    top: 50%;
    right: -10px;
    left: -10px;
    height: 80%;
    transform: translateY(-50%);
    border-right: 2px solid;
    border-left: 2px solid;
  }

  .theme-accent-1 { border-color: var(--accent-color-1); }
  .theme-accent-2 { border-color: var(--accent-color-2); }
  .theme-accent-3 {
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: var(--accent-color-3); 
  }

  .save-button { margin: 0 auto; }
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
          <fieldset className='theme-selection'>
            <legend>Theme Selection</legend>
            <div className='theme-preview-wrapper'>
              <div className='theme-preview'>
                <div className='theme-accent-1'>
                  <div className='theme-accent-2'>
                    <div className='theme-accent-3'>Font</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='theme-selector-wrapper'>
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
            </div>
          </fieldset>
          <div className='save-button-wrapper'>
            <Button
              className='save-button'
              onClickHandler={handleSubmit(settingsSaveHandler)}
            >Apply</Button>
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
