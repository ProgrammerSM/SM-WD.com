const secondsInMinute = 60
const minutesInHour = 60
const hoursInDay = 24
const oneDay = (secondsInMinute * minutesInHour) * hoursInDay

export const pageRevalidate = {
  about: oneDay,
  contact: oneDay,
  home: oneDay,
  resume: oneDay,
  thankYou: oneDay,
}
