import 'core-js/es/symbol';
import CookieConsent from './lib/CookieConsent';

const cookieConsent = new CookieConsent();

window.CookieConsent = window.CookieConsent || {};
window.CookieConsent.init = cookieConsent.init;

