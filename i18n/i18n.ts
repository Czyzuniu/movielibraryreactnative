import i18n, {Module} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {LANGUAGE_DETECTOR} from './languageDetector';

import enGB from './locales/en-gb/index';
import pl from './locales/pl/index';

const LANGUAGES = {
  'en-GB': enGB,
  pl,
};

const availableLanguages = Object.keys(LANGUAGES);

i18n
  .use(initReactI18next)
  .use(LANGUAGE_DETECTOR(availableLanguages) as Module)
  .init({
    supportedLngs: availableLanguages,
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
