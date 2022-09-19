// Modules
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import {
  HexColorInput,
  HexColorPicker,
} from 'react-colorful'

// Styles
const ColorPickerStyles = styled.div`  
  .react-colorful {
    width: 100%;
  }
`

const ColorPicker = ({
  color,
  onChangeEvent,
}) => (
  <ColorPickerStyles>
    <HexColorPicker
      color={color}
      onChange={onChangeEvent}
    />
    <HexColorInput
      color={color}
      onChange={onChangeEvent}
    />
  </ColorPickerStyles>
)

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func.isRequired,
}

export default ColorPicker
