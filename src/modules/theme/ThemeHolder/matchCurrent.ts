import { ThemeList } from './availableThemes';
import localStorageHelper from '../../../helpers/localStorageHelper';

function matchCurrent(): ThemeList {
	const storedScheme = localStorageHelper.get('activeTheme') as ThemeList;

	if (storedScheme) {
		return storedScheme;
	}

	return 'default';
}

export default matchCurrent;
