import { createGlobalStyle } from 'styled-components';
import { colors } from '../../../modules/theme/colors';
import ThemeHolder from '../../../modules/theme/ThemeHolder';
import setCssVariable from '../../../modules/theme/ThemeHolder/setCssVariable';

const GlobalStyle = createGlobalStyle`
  ${preval`
    module.exports = require('fs').readFileSync('node_modules/reset-css/reset.css', 'utf-8');
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
    ${Object.keys(ThemeHolder.current).map(variable => setCssVariable(ThemeHolder.current[variable]))}

    box-sizing: border-box;
    font-family:
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Helvetica,
			Arial,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol';
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    color: ${'#ffffff'};
    background-color: ${colors.background};
  }

  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }

  ::selection {
    color: #ffffff;
    background-color: blue;
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
    font-size: 1rem;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: 1.125rem;
  }

  #app {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    transition: background-color ease 200ms;
  }

	*:focus {
		outline: 1px solid #0095ff;
	}
`;

export default GlobalStyle;
