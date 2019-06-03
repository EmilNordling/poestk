import defaultTheme from '../default.json';

export type ThemeList = 'default';

const availableThemes: { [key in ThemeList]: any } = {
	default: defaultTheme,
};

export default availableThemes;
