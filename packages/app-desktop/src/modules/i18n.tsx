export interface Locales {
  [key: string]: string;
}

const locale: Locales = {};

export function i18n(translate_key: keyof Locales): string {
  return locale[translate_key] || '';
}
