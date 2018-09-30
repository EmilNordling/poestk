import { css } from 'styled-components';
import ThemeHolder, { withCSSVar, ICSSColors, ICSSMisc } from './utils/ThemeHolder';

export const colors: ICSSColors = {
  bg: withCSSVar(ThemeHolder.current.bg),
  bgGradientStart: withCSSVar(ThemeHolder.current.bgGradientStart),
  bgGradientEnd: withCSSVar(ThemeHolder.current.bgGradientEnd),
  highlight: withCSSVar(ThemeHolder.current.highlight),
  input: withCSSVar(ThemeHolder.current.input),
  inputBackground: withCSSVar(ThemeHolder.current.inputBackground),
  inputBackdrop: withCSSVar(ThemeHolder.current.inputBackdrop),
  color: withCSSVar(ThemeHolder.current.color),
  colorHighlight: withCSSVar(ThemeHolder.current.colorHighlight),
  content: withCSSVar(ThemeHolder.current.content),
  contentDarken: withCSSVar(ThemeHolder.current.contentDarken),
  contentLighten: withCSSVar(ThemeHolder.current.contentLighten),
  backdrop: withCSSVar(ThemeHolder.current.backdrop),
  main: withCSSVar(ThemeHolder.current.main),
  mainDarkenAlt: withCSSVar(ThemeHolder.current.mainDarkenAlt),
  mainDarken: withCSSVar(ThemeHolder.current.mainDarken),
  error: withCSSVar(ThemeHolder.current.error),
  danger: withCSSVar(ThemeHolder.current.danger),
  dangerDimmed: withCSSVar(ThemeHolder.current.dangerDimmed),
  borderStrong: withCSSVar(ThemeHolder.current.borderStrong),
  borderLight: withCSSVar(ThemeHolder.current.borderLight),
};

export const CSSVar: ICSSMisc = {
  iconBaseSize: withCSSVar(ThemeHolder.current.iconBaseSize),
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

export const iconMap = preval`
  const fs = require('fs');
  const { join, resolve } = require('path');
  const { DOMParser, XMLSerializer } = require('xmldom');

  const iconPath = resolve('public/icons');
  const icons = fs.readdirSync(iconPath);

  const matching = ['g', 'rect', 'polygon', 'path', 'linearGradient', 'stop', 'line', 'defs', 'style', 'circle'];

  function getString(xml) {
    let ViewBox = '';
    let innerHTML = '';
    const content = xml.childNodes.item(0);

    const item = xml.childNodes.item(0);
    const { nodeName } = item;

    if (item.nodeType === 1 && item.attributes.length > 0) {
      for (let j = 0; j < item.attributes.length; j++) {
        const attribute = item.attributes.item(j);

        if (attribute.nodeName === 'viewBox') {

          ViewBox = attribute.nodeValue;
        }
      }
    }

    for (let i = 0; i < content.childNodes.length; i++) {
      const node = content.childNodes.item(i);

      if (matching.includes(node.nodeName)) {
        try {
          innerHTML += (new XMLSerializer().serializeToString(node)).trim().replace('xmlns="http://www.w3.org/2000/svg"', '');
        } catch(error) {
          console.error(error);
        }
      }
    }

    return {
      viewBox: ViewBox,
      innerHTML,
    }
  }

  module.exports = icons.reduce((acc, file) => {
    const fileData = fs.readFileSync(join(iconPath, file), 'utf8')

    const parser = new DOMParser();

    acc[file.slice(0, -4)] = getString(parser.parseFromString(fileData, 'image/svg+xml'));

    return acc;
  }, {})
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
