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

export default ColorPicker
