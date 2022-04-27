import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-font: 'Jura', sans-serif;
    --header-font: 'Orbitron', sans-serif

    --space-jumbo: 2rem;
    --space-giant: 1.75rem;
    --space-extra-Large: 1.5rem;
    --space-large: 1.25rem;
    --space-medium: 1rem;
    --space-small: .75rem;
    --space-extra-small: .5rem;
  }
`

export default GlobalStyles
