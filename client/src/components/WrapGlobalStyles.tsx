import React from 'react';
import { injectGlobal } from 'styled-components';
import { fontFamily, colors } from '../constants';

const style = () => injectGlobal`
  ${preval`
    const fs = require('fs');
    module.exports = fs.readFileSync('node_modules/reset-css/reset.css', 'utf-8');
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
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: ${colors.main_color};
    background-color: ${colors.main_background};
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
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    color: inherit;
    text-decoration: inherit;
  }

  p {
    font-size: 1.6rem;
  }

  h1 {
    font-size: 2.4rem;
    margin-bottom: 20px;
    color: ${colors.main_color_bright};
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const WrapGlobalStyles = (Component: React.ComponentClass<any>) => (props: any) => {
  style()

  return <Component {...props} />
}

export default WrapGlobalStyles
