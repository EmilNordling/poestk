import { observable } from 'mobx';
import localStorageHelper from '../helpers/localStorageHelper';
import matchCurrent from '../modules/theme/ThemeHolder/matchCurrent';
import availableThemes, { ThemeList } from '../modules/theme/ThemeHolder/availableThemes';
import ThemeHolder from '../modules/theme/ThemeHolder';

class Store {
	@observable public activeTheme: ThemeList = matchCurrent();

	constructor() {
		if (!(this.activeTheme in availableThemes)) {
			this.activeTheme = 'default';
		}

		this.setTheme(this.activeTheme);
	}

	public setTheme(select: ThemeList): void {
		if (select === this.activeTheme) return;

		localStorageHelper.set('activeTheme', select);
		this.activeTheme = select;

		ThemeHolder.setTheme(availableThemes[select]);
	}
}

const ThemeStore = new Store();

export default ThemeStore;
