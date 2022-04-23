import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-font: 'Jura', sans-serif;
    --header-font: 'Orbitron', sans-serif

    --space-jumbo: 2rem;
    --space-giant: 1.75rem;
    --space-extraLarge: 1.5rem;
    --space-large: 1.25rem;
    --space-medium: 1rem;
    --space-small: .75rem;
    --space-extraSmall: .5rem;
  }

  body { overflow: hidden; }
`

export default GlobalStyles
