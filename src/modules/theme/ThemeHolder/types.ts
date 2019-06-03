import CssVariable from './CssVariable';

export interface CSSColors {
	background: string;
	border: string;
	borderFocus: string;
	foreground: string;
	'sandbox.background': string;
	'sandbox.foreground': string;
	'sandbox.navigationBar.background': string;
	'sandbox.sidePanel.background': string;
	'sandbox.bottomBar.background': string;
	[key: string]: string;
}

export interface CSSVariables extends CSSColors { }

export interface Theme {
	colors: CSSVariables;
	borders: boolean;
	borderRadius: boolean;
}

export type CSSValidator = {
	[key in keyof CSSVariables]: CssVariable;
};
