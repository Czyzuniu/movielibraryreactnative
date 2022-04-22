import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LANGUAGE_DETECTOR = (langCodes: Array<string>) => {
  return {
    type: 'languageDetector',
    async: true,
    init: function (services, detectorOptions, i18nextOptions) {
      /* use services and options */
    },
    detect: function (callback: (languageToSet: string) => void) {
      AsyncStorage.getItem('user-language').then(language => {
        if (language) {
          callback(language);
          return;
        }

        const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(
          langCodes,
        ) || {
          languageTag: 'en',
        };
        callback(findBestAvailableLanguage.languageTag);
        return;
      });
    },
    cacheUserLanguage: function (language: string) {
      AsyncStorage.setItem('user-language', language);
    },
  };
};
