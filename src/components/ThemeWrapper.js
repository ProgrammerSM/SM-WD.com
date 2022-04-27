import { createGlobalStyle } from 'styled-components'

export const ThemeVariableWrapper = createGlobalStyle`
  :root {
    --primary-color:    ${({ theme }) => theme.primaryColor};
    --font-color:       ${({ theme }) => theme.fontColor};
    --background-color: ${({ theme }) => theme.backgroundColor};
    --accent-Color-1:   ${({ theme }) => theme.accentColor1};
    --accent-Color-2:   ${({ theme }) => theme.accentColor2};
    --accent-Color-3:   ${({ theme }) => theme.accentColor3};
  }
`
