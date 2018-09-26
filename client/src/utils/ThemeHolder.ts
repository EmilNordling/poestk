import shortid from 'shortid';
import defaultTheme from '../defaultTheme.json';
import testTheme from '../contrastTheme.json';
import { isUndefined } from './helpers';

enum CSSVariableTypes {
  color = 'COLOR',
}

interface Theme {
  variables: {
    bg: string,
    highlight: string,
    input: string,
    color: string,
    content: string,
    backdrop: string,
    main: string,
    mainDarken: string,
    error: string,
    danger: string,
    dangerDimmed: string,
    [key: string]: string,
    fontFamily: string,
    fontSizeBase: string,
  };
  borders: boolean;
  borderRadius: boolean;
}

class CSSvar {
  public hash = shortid.generate();

  constructor(
    public styling: string,
    public type: CSSVariableTypes = CSSVariableTypes.color,
  ) {}
}

interface ICSSVariables {
  [key: string]: CSSvar;
}

const setAnonymousCSSVar = (type: string, hash: string, styling: string) => `--${type}-${hash}: ${styling};`;
export const setCSSVar = (variable: CSSvar) => `--${variable.type}-${variable.hash}: ${variable.styling};`;
export const getCSSVar = (variable: CSSvar) => `--${variable.type}-${variable.hash}`;
export const withCSSVar = (variable: CSSvar) => `var(${getCSSVar(variable)});`;

class ThemeHolder {
  public current: ICSSVariables = {
    bg: new CSSvar(defaultTheme.variables.bg),
    highlight: new CSSvar(defaultTheme.variables.highlight),
    input: new CSSvar(defaultTheme.variables.input),
    color: new CSSvar(defaultTheme.variables.color),
    content: new CSSvar(defaultTheme.variables.content),
    backdrop: new CSSvar(defaultTheme.variables.backdrop),
    main: new CSSvar(defaultTheme.variables.main),
    mainDarken: new CSSvar(defaultTheme.variables.mainDarken),
    error: new CSSvar(defaultTheme.variables.error),
    danger: new CSSvar(defaultTheme.variables.danger),
    dangerDimmed: new CSSvar(defaultTheme.variables.dangerDimmed),
    borderColor: new CSSvar(defaultTheme.variables.borderColor),
    fontFamily: new CSSvar(defaultTheme.variables.fontFamily),
    fontSizeBase: new CSSvar(defaultTheme.variables.fontSizeBase),
  };
  private styleElement: HTMLStyleElement = document.createElement('style');

  constructor() {
    this.styleElement.appendChild(document.createTextNode(''));
    this.styleElement.type = 'text/css';
    document.head.appendChild(this.styleElement);

    // this.setTheme(testTheme);
  }

  public setTheme(theme: Theme) {
    try {
      const proxyCheck = (variable: string) => {
        const type = this.current[variable].type;
        const hash = this.current[variable].hash;
        const styling = theme.variables[variable];

        if (isUndefined(type) || isUndefined(hash) || isUndefined(styling)) throw new Error('The theme does not match the default');

        return setAnonymousCSSVar(type, hash, styling);
      };

      const newCSSVariables = `
        html {
          ${Object.keys(theme.variables).map((variable) => proxyCheck(variable)).join('')}
        }
      `;

      this.styleElement.innerHTML = newCSSVariables;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ThemeHolder();
