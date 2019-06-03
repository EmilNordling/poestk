import ThemeHolder from './ThemeHolder';
import withCssVariable from './ThemeHolder/withCssVariable';

export const colors = {
	remove: 'red',
	background: withCssVariable(ThemeHolder.current.background),
	border: withCssVariable(ThemeHolder.current.border),
	borderFocus: withCssVariable(ThemeHolder.current.borderFocus),
	foreground: withCssVariable(ThemeHolder.current.foreground),
	'sandbox.background': withCssVariable(ThemeHolder.current['sandbox.background']),
	'sandbox.foreground': withCssVariable(ThemeHolder.current['sandbox.foreground']),
	'sandbox.navigationBar.background': withCssVariable(ThemeHolder.current['sandbox.navigationBar.background']),
	'sandbox.sidePanel.background': withCssVariable(ThemeHolder.current['sandbox.sidePanel.background']),
	'sandbox.bottomBar.background': withCssVariable(ThemeHolder.current['sandbox.bottomBar.background']),
};
