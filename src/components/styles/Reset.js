import { createGlobalStyle } from 'styled-components'

const Reset = createGlobalStyle`
  *,
  *::before,
  *::after,
  html {
    box-sizing: border-box;
  }

  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    min-height: 100vh;
    scroll-behavior: smooth;
  }

  main { display: block; }
  sub { bottom: -0.25em; }
  sup { top: -0.5em; }
  progress { vertical-align: baseline; }
  textarea { overflow: auto; }
  details { display: block; }
  summary { display: list-item; }
  template { display: none; }
  [hidden] { display: none; }
  [type="search"]::-webkit-search-decoration { -webkit-appearance: none; }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
    border: 0;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  legend {
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  [type="checkbox"],
  [type="radio"] {
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`

export default Reset
