import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import vn from './locales/vn.json';

const resources = {
  vn: {
    translation: vn,
  },
  // ja: {
  //   translation: ja,
  // },
  // ko: {
  //   translation: ko,
  // },
  // cn: {
  //   translation: cn,
  // },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vn',
  fallbackLng: { default: ['vn'] },
  nsSeparator: false,
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lang',
    lookupCookie: 'i18n',
    lookupLocalStorage: 'CodeMemoryAdmin',
    caches: ['localStorage', 'cookie'],
  },
});

export default i18n;

window.i18n = i18n;

export function getCurrentLanguage() {
  return localStorage.getItem('CodeMemoryAdmin') || 'vn';
}
