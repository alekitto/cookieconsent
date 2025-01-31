export default class Language {

  setLocale(locale) {
    window.CookieConsent.config.language.current = locale;
  }

  static getTranslation(object, locale, key) {
    if(!object.hasOwnProperty('language')) return '[Missing language object]';
    if(!object.language.hasOwnProperty('locale')) return '[Missing locale object]'

    const currentLocale = (object.language.locale.hasOwnProperty(locale)) ? locale : 'en';

    return (object.language.locale[currentLocale].hasOwnProperty(key)) ? object.language.locale[currentLocale][key] : '[Missing translation]';
  }

}
