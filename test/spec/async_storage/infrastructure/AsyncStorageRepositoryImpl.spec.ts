import AsyncStorageRepositoryImpl from '../../../../src/async_storage/infrastructure/AsyncStorageRepositoryImpl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {mocked} from 'ts-jest/utils';
import {when} from 'jest-when';

describe('AsyncStorageRepositoryImpl', () => {
  let asyncStorageRepositoryImpl: AsyncStorageRepositoryImpl;

  beforeEach(() => {
    asyncStorageRepositoryImpl = new AsyncStorageRepositoryImpl();
  });

  it('should persist the given key in async storage', () => {
    // given
    const key = 'Key';
    const toStore = {
      value: 'mock',
    };
    // when
    asyncStorageRepositoryImpl.persist(key, toStore);
    // then

    expect(mocked(AsyncStorage).setItem).toBeCalledWith(
      key,
      JSON.stringify(toStore),
    );
  });

  it('should retrieve the data from local storage and json parse it if its an object', async () => {
    // given
    const key = 'Key';
    const toRetrieve = JSON.stringify({
      value: 'mock',
    });
    when(mocked(AsyncStorage.getItem)).mockResolvedValue(toRetrieve);
    // when
    const result = await asyncStorageRepositoryImpl.retrieve(key);
    // then
    expect(result).toStrictEqual(JSON.parse(toRetrieve));
  });
});
