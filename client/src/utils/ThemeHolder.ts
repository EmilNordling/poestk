import { observable, action } from 'mobx';
import shortid from 'shortid';
import defaultTheme from '../defaultTheme.json';
import testTheme from '../darkContrastTheme.json';
import { isUndefined } from './helpers';

enum CSSVariableTypes {
  color = 'COLOR',
  font = 'FONT',
}

export interface ICSSColors {
  bg: string;
  bgGradientStart: string;
  bgGradientEnd: string;
  highlight: string;
  input: string;
  inputBackground: string;
  inputBackdrop: string;
  color: string;
  content: string;
  contentDarken: string;
  contentLighten: string;
  backdrop: string;
  main: string;
  mainDarken: string;
  error: string;
  danger: string;
  dangerDimmed: string;
  borderStrong: string;
  borderLight: string;
}

interface ICSSVariables extends ICSSColors {
  // fonts
  fontFamily: string;
  fontSizeBase: string;
}

interface Theme {
  variables: ICSSVariables;
  borders: boolean;
  borderRadius: boolean;
}

type ICSSValidator = {
  [key in keyof ICSSVariables]: CSSvar;
};

class CSSvar {
  public hash = shortid.generate();

  constructor(
    public styling: string,
    public type: CSSVariableTypes = CSSVariableTypes.color,
  ) {}
}

const setAnonymousCSSVar = (type: string, hash: string, styling: string) => `--${type}-${hash}: ${styling};`;
export const setCSSVar = (variable: CSSvar) => `--${variable.type}-${variable.hash}: ${variable.styling};`;
export const getCSSVar = (variable: CSSvar) => `--${variable.type}-${variable.hash}`;
export const withCSSVar = (variable: CSSvar) => `var(${getCSSVar(variable)})`;

class ThemeHolder {
  public current: ICSSValidator = {
    bg: new CSSvar(defaultTheme.variables.bg),
    bgGradientStart: new CSSvar(defaultTheme.variables.bgGradientStart),
    bgGradientEnd: new CSSvar(defaultTheme.variables.bgGradientEnd),
    highlight: new CSSvar(defaultTheme.variables.highlight),
    input: new CSSvar(defaultTheme.variables.input),
    inputBackground: new CSSvar(defaultTheme.variables.inputBackground),
    inputBackdrop: new CSSvar(defaultTheme.variables.inputBackdrop),
    color: new CSSvar(defaultTheme.variables.color),
    content: new CSSvar(defaultTheme.variables.content),
    contentDarken: new CSSvar(defaultTheme.variables.content),
    contentLighten: new CSSvar(defaultTheme.variables.content),
    backdrop: new CSSvar(defaultTheme.variables.backdrop),
    main: new CSSvar(defaultTheme.variables.main),
    mainDarken: new CSSvar(defaultTheme.variables.mainDarken),
    error: new CSSvar(defaultTheme.variables.error),
    danger: new CSSvar(defaultTheme.variables.danger),
    dangerDimmed: new CSSvar(defaultTheme.variables.dangerDimmed),
    borderStrong: new CSSvar(defaultTheme.variables.borderStrong),
    borderLight: new CSSvar(defaultTheme.variables.borderLight),
    fontFamily: new CSSvar(defaultTheme.variables.fontFamily, CSSVariableTypes.font),
    fontSizeBase: new CSSvar(defaultTheme.variables.fontSizeBase, CSSVariableTypes.font),
  };
  private styleElement: HTMLStyleElement = document.createElement('style');

  @observable public useBorders: boolean = defaultTheme.borders;
  @observable public useborderRadius: boolean = defaultTheme.borderRadius;
  @observable public useRemoveSpacing: boolean = defaultTheme.removeSpacing;

  constructor() {
    this.styleElement.appendChild(document.createTextNode(''));
    this.styleElement.type = 'text/css';
    document.head.appendChild(this.styleElement);

    setTimeout(() => this.setTheme(testTheme), 0);
  }

  @action public setTheme(theme: Theme) {
    try {
      const proxyCSSVariableCheck = (variable: keyof ICSSVariables): string => {
        if (isUndefined(this.current[variable])) throw new Error(`"${variable}" is not a valid property`);

        const type = this.current[variable].type;
        const hash = this.current[variable].hash;
        const styling = theme.variables[variable];

        if (styling === '') {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`"${variable}" has no value`);
          }

          return '';
        }

        return setAnonymousCSSVar(type, hash, styling);
      };

      const newCSSVariables = `
        html {
          ${Object.keys(theme.variables).map((variable: keyof ICSSVariables) => proxyCSSVariableCheck(variable)).join('')}
        }
      `;

      this.styleElement.innerHTML = newCSSVariables;

      this.useBorders = true;
      this.useborderRadius = false;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default new ThemeHolder();
