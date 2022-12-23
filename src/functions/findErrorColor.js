// Modules
import convert from 'color-convert'

const findErrorHueEquivent = (huePercent, errorHueMin, errorHueMax) => {
  const errorHueEquivalentPercent = (huePercent * (errorHueMax - errorHueMin) / 100) + errorHueMin
  const nonDecimalHue = errorHueEquivalentPercent.toFixed()

  if (nonDecimalHue < 0)
    return 0

  if (nonDecimalHue > 360)
    return 360

  return nonDecimalHue
}

const findHslErrorColor = primaryColor => {
  const primaryColorHSL = convert.hex.hsl(primaryColor)

  const [
    hue,
    saturation,
    lightness,
  ] = primaryColorHSL

  const red = [
    0,
    100,
    50,
  ]

  let errorSaturation = saturation
  let errorLightness = 100 - lightness

  if (saturation <= 25 && lightness <= 25)
    return red

  if (saturation <= 25 && lightness >= 25)
    return red

  // Prevent low saturations
  if (errorSaturation < 50)
    errorSaturation = 50

  // Adjust errorLightness if needed for too little or too much lightness
  if (errorLightness < 25)
    errorLightness = 25

  if (errorLightness > 75)
    errorLightness = 75

  // Find error color
  if (hue <= 10 || hue >= 350)
    return [
      60,
      errorSaturation,
      errorLightness,
    ]

  if (hue >= 11 && hue <= 180) {
    if (hue <= 75)
      return [
        300,
        errorSaturation,
        errorLightness,
      ]

    const huePercent = hue / (180 - 76)
    const errorHue = findErrorHueEquivent(huePercent, 300, 349)

    return [
      errorHue,
      errorSaturation,
      errorLightness,
    ]
  }

  if (hue >= 181 && hue <= 349) {
    if (hue >= 285)
      return [
        60,
        errorSaturation,
        errorLightness,
      ]

    const huePercent = hue / (181 - 299)
    const errorHue = findErrorHueEquivent(huePercent, 0, 60)

    return [
      errorHue,
      errorSaturation,
      errorLightness,
    ]
  }

  return red
}

export default findHslErrorColor
