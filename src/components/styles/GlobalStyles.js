import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-font: 'Jura', sans-serif;
    --header-font: 'Orbitron', sans-serif;

    --space-jumbo: 2rem;
    --space-giant: 1.75rem;
    --space-extra-large: 1.5rem;
    --space-large: 1.25rem;
    --space-medium: 1rem;
    --space-small: .75rem;
    --space-standard: 1.38rem;
    --space-extra-small: .5rem;
  }

  .aria-describedBy { display: hidden; }
  #nprogress { pointer-events: none; }
  #nprogress .bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--primary-color);
    z-index: 1;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .bar { position: absolute; }

  .styled-link {
    padding: var(--space-extra-small);
    border-top: 2px solid var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    transition: all .1s linear;
  
    &:focus,
    &:hover {
      font-weight: bold;
      transform: scale(1.1);
    }
  }
`

export default GlobalStyles
