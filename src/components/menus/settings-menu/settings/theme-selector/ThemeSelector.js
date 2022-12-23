// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import {
  useContext,
  useState,
} from 'react'

// Components
import Button from 'components/Button'
import CustomThemeSelector from './settings/theme-selector/CustomThemeSelector'

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'

// Data
import { mediumUp } from 'data/media-queries'
import themeColorGroups from 'data/themeColorGroups'

// Styles
const ThemeSelectorStyles = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  padding: var(--space-medium) 0;

  form {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-medium);
    width: 100%;
    height: 100%;
    
    & > fieldset { width: 100%; }
  
    fieldset { 
      border-color: var(--primary-color);
      box-shadow: inset 0 0 5px 1px var(--primary-color);
  
      legend { background-color: var(--background-color); }
    }
  }

  .theme-selection {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .theme-preview-wrapper,
  .theme-selector-wrapper {
    width: 100%;
  }

  .theme-preview-wrapper,
  .theme-preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .theme-preview-wrapper { height: 80px; }
  .theme-preview {
    width: 100%;
    height: 100%;
    background-color: var(--background-color); /* change to new background */

    legend { margin: 0 auto; }
  }
  
  .theme-primary {
    position: relative;
    width: 80%;
    height: 80%;     
    color: var(--font-color); /* change to new font color */
    text-align: center;
    border: 2px solid var(--primary-color); /* change to new primary */
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

  .theme-accent-1 { border-color: var(--accent-color-1); } /* change to new accent 1 */
  .theme-accent-2 { border-color: var(--accent-color-2); } /* change to new accent 2 */
  .theme-accent-3 {
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: var(--accent-color-3);  /* change to new accent 3 */
  }

  .save-button-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  ${mediumUp} {
    .theme-selection { flex-direction: row; }
    .theme-preview-wrapper,
    .theme-selector-wrapper {
      width: 50%;
    }

    .theme-preview-wrapper { height: auto; }
    .theme-preview {
      width: 80%;
      height: 80%;
    }

    .theme-primary {
      width: 60%;
      height: 60%;
    }
  }
`

const ThemeSelector = () => {
  const {
    customTheme,
    theme,
    themeName,
    setCustomTheme,
    setThemeName,
  } = useContext(CurrentThemeContext)

  const [isCustomThemeSelected, setIsCustomThemeSelected] = useState(themeName === 'custom')
  const [settingsColorTheme, setSettingsColorTheme] = useState(theme)

  const {
    handleSubmit,
    register,
    setValue,
  } = useForm({
    defaultValues: {
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

  const themeSaveHandler = data => {
    const {
      colorTheme,
      customColorTheme,
    } = data

    if (colorTheme !== themeName)
      setThemeName(colorTheme)

    if (customColorTheme !== customTheme)
      setCustomTheme(customColorTheme)
  }

  return (
    <ThemeSelectorStyles>
      <form>
        <fieldset className='theme-selection'>
          <legend>Theme Selection</legend>
          <div className='theme-preview-wrapper'>
            <fieldset className='theme-preview'>
              <legend>Theme Preview</legend>
              <div className='theme-primary'>
                <div className='theme-accent-1'>
                  <div className='theme-accent-2'>
                    <div className='theme-accent-3'>Font</div>
                  </div>
                </div>
              </div>
            </fieldset>
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
              <CustomThemeSelector
                setSettingsColorTheme={setSettingsColorTheme}
                setValue={setValue}
                settingsColorTheme={settingsColorTheme}
              />
                    )}
          </div>
        </fieldset>
        <div className='save-button-wrapper'>
          <Button
            className='save-button'
            onClickHandler={handleSubmit(themeSaveHandler)}
          >Apply</Button>
        </div>
      </form>
    </ThemeSelectorStyles>
  )
}

ThemeSelector.propTypes = {}
export default ThemeSelector
