import * as RNLocalize from 'react-native-localize';
import dayjs from 'dayjs';
import {myContainer} from '../src/ioc/container';
import {InjectableTypes} from '../src/ioc/types';
import {LocalStorageLocaleKey} from './consts';
import AsyncStorageRepository from '../src/async_storage/domain/repository/AsyncStorageRepository';

export const LANGUAGE_DETECTOR = (langCodes: Array<string>) => {
  const asyncStorageRepository = myContainer.get<AsyncStorageRepository>(
    InjectableTypes.AsyncStorageRepository,
  );

  return {
    type: 'languageDetector',
    async: true,
    init: function () {},
    detect: function (callback: (languageToSet: string) => void) {
      asyncStorageRepository
        .retrieve(LocalStorageLocaleKey)
        .then((language: {language: string}) => {
          if (language) {
            callback(language.language);
            return;
          }
          return 'en';
        })
        .catch(() => {
          const findBestAvailableLanguage =
            RNLocalize.findBestAvailableLanguage(langCodes) || {
              languageTag: 'en',
            };
          callback(findBestAvailableLanguage.languageTag);
        });
    },
    cacheUserLanguage: function (language: string) {
      dayjs.locale(language);
      asyncStorageRepository.persist(LocalStorageLocaleKey, {
        language,
      });
    },
  };
};
