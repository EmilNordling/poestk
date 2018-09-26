import React from 'react';
import { injectGlobal } from 'styled-components';
import { colors } from '../constants';
import ThemeHolder, { setCSSVar, withCSSVar } from '../utils/ThemeHolder';

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
    overscroll-behavior-y: none;
  }

  html {
    ${Object.keys(ThemeHolder.current).map((variable) => setCSSVar(ThemeHolder.current[variable]))}

    box-sizing: border-box;
    font-family: ${withCSSVar(ThemeHolder.current.fontFamily)};
    font-size: ${withCSSVar(ThemeHolder.current.fontSizeBase)};
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    color: #000000;
    background-color: #ffffff;
  }

  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }

  ::selection {
    color: #ffffff;
    background-color: ${colors.highlight};
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
    margin-bottom: 20px;
    font-size: 2.4rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  #app {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    color: ${colors.color};
    background-color: #1b1d23;
    background-color: ${colors.bg};
    overflow: hidden;
  }
`;

const withGlobalStyles = (Component: React.ComponentClass<any>) => (props: any) => {
  style();

  return <Component {...props} />;
};

export default withGlobalStyles;
