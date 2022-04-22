import { createGlobalStyle } from 'styled-components'

export const ThemeVariableWrapper = createGlobalStyle`
  :root {
    --primary-color:    ${({ theme }) => theme.colors.primaryColor};
    --font-color:       ${({ theme }) => theme.colors.fontColor};
    --background-color: ${({ theme }) => theme.colors.backgroundColor};
    --accent-Color-1:   ${({ theme }) => theme.colors.accentColor1};
    --accent-Color-2:   ${({ theme }) => theme.colors.accentColor2};
    --accent-Color-3:   ${({ theme }) => theme.colors.accentColor3};
  }
`
