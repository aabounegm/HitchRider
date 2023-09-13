import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// TODO: https://react.i18next.com/guides/multiple-translation-files)
i18n.use(initReactI18next).init({
  resources: {},
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already protects from xss
  },
});

export default i18n;
