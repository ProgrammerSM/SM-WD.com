export default function menuButtonClick(
  activeMenu,
  buttonName,
  isMenuActive,
  setActiveMenu,
  setIsMenuActive,
) {
  if (isMenuActive && activeMenu === buttonName) {
    setActiveMenu('')
    setIsMenuActive(false)
  }

  if (isMenuActive && activeMenu !== buttonName)
    setActiveMenu(buttonName)

  if (!isMenuActive) {
    setActiveMenu(buttonName)
    setIsMenuActive(true)
  }
}
