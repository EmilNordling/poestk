import { css } from 'styled-components';
import ThemeHolder, { withCSSVar } from './utils/ThemeHolder';

export const colors = {
  input: withCSSVar(ThemeHolder.current.input),
  highlight: withCSSVar(ThemeHolder.current.highlight),
  color: withCSSVar(ThemeHolder.current.color),
  backdrop: withCSSVar(ThemeHolder.current.backdrop),
  content: withCSSVar(ThemeHolder.current.content),
  main: withCSSVar(ThemeHolder.current.main),
  mainDarken: withCSSVar(ThemeHolder.current.mainDarken),
  error: withCSSVar(ThemeHolder.current.error),
  bg: withCSSVar(ThemeHolder.current.bg),
  danger: withCSSVar(ThemeHolder.current.danger),
  dangerDimmed: withCSSVar(ThemeHolder.current.dangerDimmed),
};

const oldColorsButTheyAreNice = {
  main_sep: '#2E313D',
  main_border: '#2B2E3A',
  main_light: '#4a4e5b',
  main_dark: '#2B2E3A',
  main_content_dark_alt: '#252831',
  main_color_bright: 'hsla(0, 0%, 100%, 0.9)',
  main_color_dimmed: 'hsla(0, 0%, 100%, 0.3)',
  desktop_bar_backdrop: '#1e222d',
  desktop_bar_backdrop_strong: '#1a1e27',
  desktop_bar_foreground: '#2b2e3a',
  main_background_light: '#24292e',
  main_background_dark: '#18191c',
};

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
