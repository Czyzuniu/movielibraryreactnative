import 'reflect-metadata';
import 'react-native-gesture-handler/jestSetup';
import {setLogger} from 'react-query';
// @ts-ignore
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {mockNavigation} from './utils/mockNavigation';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {countryCode: 'GB', languageTag: 'en-GB', languageCode: 'en', isRTL: false},
    {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
    {countryCode: 'FR', languageTag: 'fr-FR', languageCode: 'fr', isRTL: false},
  ],

  getNumberFormatSettings: () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  }),

  getCalendar: () => 'gregorian', // or "japanese", "buddhist"
  getCountry: () => 'US', // the country code you want
  getCurrencies: () => ['USD', 'EUR'], // can be empty array
  getTemperatureUnit: () => 'celsius', // or "fahrenheit"
  getTimeZone: () => 'Europe/Paris', // the timezone you want
  uses24HourClock: () => true,
  usesMetricSystem: () => true,
  findBestAvailableLanguage: () => {
    return {
      languageTax: 'en-GB',
    };
  },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => mockNavigation().navigation,
  };
});
