export interface Locale {
	'explorer.build.newBuild': string;
	'explorer.build.openBuild': string;
	'explorer.build.save': string;
	'explorer.build.saveAs': string;
}

interface TranslationMap {
	[key: string]: Locale;
}

const en: Locale = {
	'explorer.build.newBuild': 'new build',
	'explorer.build.openBuild': 'open build',
	'explorer.build.save': 'save',
	'explorer.build.saveAs': 'save as',
};

class Store {
	private currentLocale: keyof TranslationMap = 'en';
	private translationMap: TranslationMap = {
		en,
	};

	public getTranslationFor(key: keyof Locale): string {
		return this.translationMap[this.currentLocale][key];
	}
}

const LocaleStore = new Store();

export default LocaleStore;
