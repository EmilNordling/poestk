import LocaleStore, { Locale } from '../stores/LocaleStore';

function translate(key: keyof Locale) {
	const translation = LocaleStore.getTranslationFor(key);

	if (!translation) return '! ! !';

	return translation;
}

export default translate;
