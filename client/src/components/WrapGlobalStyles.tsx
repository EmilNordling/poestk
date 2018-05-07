import React from 'react'
import { injectGlobal } from 'styled-components'
import { fontFamily, colors } from '../constants'

// const style = () => injectGlobal`
//   ${preval`
//     const fs = require('fs')
//     module.exports = fs.readFileSync('node_modules/reset-css/reset.css', 'utf-8')
//   `}
// `

const style = () => injectGlobal`
  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
      &:before, &:after {
          content: '';
          content: none;
      }
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* all above SHOULD use be included with preval */

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

const WrapGlobalStyles = (Component: React.ComponentClass<any>) => (props: any) => {
  style()

  return <Component {...props} />
}

export default WrapGlobalStyles
