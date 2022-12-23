// Modules
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useContext,
  useRef,
  useState,
} from 'react'

// Components
const ColorPicker = dynamic(() => import('./ColorPicker'))

// Context
import { CurrentThemeContext } from 'context/CurrentThemeContext'

// Styles
const CustomThemeSelectorStyles = styled.div`

`

const CustomThemeSelector = ({
  setSettingsColorTheme,
  setValue,
  settingsColorTheme,
}) => {
  const { customTheme } = useContext(CurrentThemeContext)
  const previousCustomColorThemeRef = useRef(customTheme)

  const [selectedCustomColorObject, setSelectedCustomColorObject] = useState({
    color: customTheme.primaryColor,
    colorName: 'primaryColor',
  })

  const resetCustomThemeHandler = () => {
    setSettingsColorTheme(previousCustomColorThemeRef.current)
    setSelectedCustomColorObject({
      ...selectedCustomColorObject,
      color: previousCustomColorThemeRef.current[selectedCustomColorObject.colorName],
    })
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

  return (
    <CustomThemeSelectorStyles>
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
    </CustomThemeSelectorStyles>
  )
}

CustomThemeSelector.propTypes = {
  setSettingsColorTheme: PropTypes.func,
  setValue: PropTypes.func,
  settingsColorTheme: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])),
}

export default CustomThemeSelector
