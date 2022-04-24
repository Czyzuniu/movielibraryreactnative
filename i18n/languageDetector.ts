import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export const LANGUAGE_DETECTOR = (langCodes: Array<string>) => {
  return {
    type: 'languageDetector',
    async: true,
    init: function () {
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
      console.log(language);
      dayjs.locale(language);
      AsyncStorage.setItem('user-language', language);
    },
  };
};
