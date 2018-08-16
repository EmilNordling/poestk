import { css } from 'styled-components';

export const colors = {
  main_background_light: '#24292e',
  main_background_dark: '#18191c',
  main_background_input: '#23252b',
  main_color_highlight: '#847aff',


  desktop_bar_backdrop: '#1e222d',
  desktop_bar_backdrop_strong: '#1a1e27',
  desktop_bar_foreground: '#2b2e3a',

  main_color_dimmed: 'hsla(0, 0%, 100%, 0.3)',
  main_color_bright: 'hsla(0, 0%, 100%, 0.9)',
  main_color: 'hsla(0, 0%, 100%, 0.88)',
  main_backdrop: '#1e222d',
  main_dark: '#2B2E3A',
  main_content_alt: '#2e313a',
  main_content_dark: '#282b35',
  main_content_dark_alt: '#252831',
  main_content: 'var(--main_content, #313440)',
  main_error: '#ff480e',
  main_background: '#1b1f2a',
  main_sep: '#2E313D',
  main_border: '#2B2E3A',
  main_light: '#4a4e5b',

  danger: '#ff5858',
  danger_dimmed: 'rgba(152, 62, 62, 0.4)',

  blue: '#ff9090',
  red: '#5babff',
  green: '#5bff96',
  orange: '#ff995b',
  pink: '#fe8fff',
};

export const fontFamily = `
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  Helvetica,
  Arial,
  sans-serif,
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol"
`;

const sizes = {
  large: 1170,
  medium: 960,
  small: 500,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args: any[]) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
