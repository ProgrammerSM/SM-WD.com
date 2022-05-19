import {
  HexColorInput,
  HexColorPicker,
} from 'react-colorful'

const ColorPicker = ({
  color,
  setColor,
}) => (
  <>
    <HexColorPicker
      color={color}
      onChange={setColor}
    />
    <HexColorInput
      color={color}
      onChange={setColor}
    />
  </>
)

export default ColorPicker
