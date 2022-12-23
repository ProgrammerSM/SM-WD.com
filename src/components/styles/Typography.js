import { createGlobalStyle } from 'styled-components'

const Typography = createGlobalStyle`
  html { font-size: 18px; }
  body {
    font-family: 'Jura', sans-serif;
    font-weight: 400;
    line-height: 1.25;
    text-rendering: optimizeSpeed;
  }

  h1, h2, h3, h4, h5, .text-large, .text-jumbo {
    margin: 3rem 0 1.38rem;
    font-family: 'Orbitron', sans-serif;
    font-weight: 400;
    line-height: 1.3;
    text-transform: uppercase;
  }

  h1 {
    margin-top: 0;
    font-size: 1.802rem;
  }

  h2 { font-size: 1.602rem; }
  h3 { font-size: 1.424rem; }
  h4 { font-size: 1.266rem; }
  h5 { font-size: 1.125rem; }
  p { margin: 0 0 1rem; }
  small, .text-small { font-size: 0.889rem; }
  .text-large { font-size: 2.027rem; }
  .text-jumbo { font-size: 2.281rem; }

  button {
    font-size: 1rem;
    font-family: inherit;
    cursor: pointer;
  }

  a {
    background-color: transparent;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  a:visited {
    color: inherit;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  sub,
  sup {
    font-size: .75rem;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  figcaption { font-size: .75rem; }

  @media only screen and (min-width: 641px) {
    h1 { font-size: 2.488rem; }  
    h2 { font-size: 2.074rem; }
    h3 { font-size: 1.728rem; }
    h4 { font-size: 1.44rem; }
    h5 { font-size: 1.2rem; }
    small, .text_small { font-size: 0.833rem; }
    .text-large { font-size: 2.986rem; }
    .text-jumbo { font-size: 3.583rem; }
  }
`

export default Typography
