// Modules
import PropTypes from 'prop-types'

// Components
import {
  HexColorInput,
  HexColorPicker,
} from 'react-colorful'

const ColorPicker = ({
  color,
  onChangeEvent,
}) => (
  <>
    <HexColorPicker
      color={color}
      onChange={onChangeEvent}
    />
    <HexColorInput
      color={color}
      onChange={onChangeEvent}
    />
  </>
)

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func.isRequired,
}

export default ColorPicker
