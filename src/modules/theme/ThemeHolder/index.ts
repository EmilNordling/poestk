import CssVariable from './CssVariable';
import { CSSValidator, Theme } from './types';
import matchCurrent from './matchCurrent';
import availableThemes from './availableThemes';
import isUndefined from '../../../helpers/isUndefined';

const initializeWithTheme = availableThemes[matchCurrent()] as Theme;

class ThemeHolder {
	private readonly styleElement: HTMLStyleElement = document.createElement('style');
	public readonly current: CSSValidator = {
		background: new CssVariable(initializeWithTheme.colors.background),
		border: new CssVariable(initializeWithTheme.colors.border),
		borderFocus: new CssVariable(initializeWithTheme.colors.borderFocus),
		foreground: new CssVariable(initializeWithTheme.colors.foreground),
		'sandbox.background': new CssVariable(initializeWithTheme.colors['sandbox.background']),
		'sandbox.foreground': new CssVariable(initializeWithTheme.colors['sandbox.foreground']),
		'sandbox.navigationBar.background': new CssVariable(initializeWithTheme.colors['sandbox.navigationBar.background']),
		'sandbox.sidePanel.background': new CssVariable(initializeWithTheme.colors['sandbox.sidePanel.background']),
		'sandbox.bottomBar.background': new CssVariable(initializeWithTheme.colors['sandbox.bottomBar.background']),
	};

	constructor() {
		this.styleElement.appendChild(document.createTextNode(''));
		this.styleElement.type = 'text/css';
		document.head!.appendChild(this.styleElement);
	}

	public setTheme(theme: Theme) {
		try {
			const overrideCssVariable = (hash: string, styling: string): string => {
				return `--${hash}: ${styling};`;
			};

			const validateCssVariable = (variable: string): string => {
				if (isUndefined(this.current[variable])) throw new Error(`"${variable}" is not a valid property`);

				const hash = this.current[variable].hash;
				const styling = theme.colors[variable];

				if (styling === '') {
					if (process.env.NODE_ENV !== 'production') {
						console.warn(`"${variable}" has no value`);
					}

					return '';
				}

				return overrideCssVariable(hash, styling);
			};

			const sheet = this.styleElement.sheet as CSSStyleSheet;

			const newCSSVariables = `
        :root {
          ${Object.keys(theme.colors).map(variable => validateCssVariable(variable)).join('')}
        }
      `;

			sheet.insertRule(newCSSVariables, sheet.cssRules.length);
		} catch (error) {
			console.error(error.message);
		}
	}
}

export default new ThemeHolder();
