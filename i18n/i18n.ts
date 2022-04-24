import i18n, {Module} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {LANGUAGE_DETECTOR} from './languageDetector';

import en from './locales/en-gb/index';
import fr from './locales/fr-fr/index';
import pl from './locales/pl/index';

const LANGUAGES = {
  en,
  fr,
  pl,
};

i18n
  .use(initReactI18next)
  .use(LANGUAGE_DETECTOR(Object.keys(LANGUAGES)) as Module)
  .init({
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
