import { injectGlobal } from 'styled-components'
import { fontFamily, colors } from '../constants'

const injectGlobalStyles = () => injectGlobal`
  ${preval`
    const fs = require('fs')
    module.exports = fs.readFileSync('node_modules/reset-css/reset.css', 'utf-8')
  `}

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    overscroll-behavior-y: contain;
  }

  html {
    box-sizing: border-box;
    font-family: ${fontFamily};
    font-size: 10px;
    font-smoothing: antialiased;
    color: white;
    cursor: default;
    background-color: ${colors.gray202};
  }

  img {
    display: inline-block;
    vertical-align: middle;
    height: auto;
    max-width: 100%;
  }

  ::selection {
    color: ${colors.gray400};
    background-color: ${colors.blue400};
  }

  a {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
`

export default () => {
  injectGlobalStyles()

  return null
}
