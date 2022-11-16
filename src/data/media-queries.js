/* eslint-disable sort-keys -- prefer to have them descending by number */
const toNumber = {
  desktopMax: 1440,
  desktop: 1025,
  tabletMax: 1024,
  tablet: 641,
  mobileMax: 640,
}
/* eslint-enable sort-keys -- prefer to have them descending by number */

const large = `@media screen and (min-width: ${toNumber.desktop}px) and (max-width: ${toNumber.desktopMax}px)`
const largeUp = `@media screen and (min-width: ${toNumber.desktop}px)`
const medium = `@media screen and (min-width: ${toNumber.tablet}px) and (max-width: ${toNumber.tabletMax}px)`
const mediumDown = `@media screen and (max-width: ${toNumber.tabletMax}px)`
const mediumUp = `@media screen and (min-width: ${toNumber.tablet}px)`
const small = `@media screen and (min-width: 0px) and (max-width: ${toNumber.mobileMax}px)`

export {
  large,
  largeUp,
  medium,
  mediumDown,
  mediumUp,
  small,
  toNumber,
}
