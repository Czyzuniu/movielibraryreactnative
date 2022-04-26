import AsyncStorageRepository from '../domain/repository/AsyncStorageRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoRecordException from '../../base/domain/core/exception/NoRecordException';
import {injectable} from 'inversify';

@injectable()
export default class AsyncStorageRepositoryImpl
  implements AsyncStorageRepository
{
  async persist(key: string, data: any): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(data));
  }

  async retrieve(key: string): Promise<any> {
    const retrieved = await AsyncStorage.getItem(key);
    if (retrieved) {
      return JSON.parse(retrieved);
    }

    throw new NoRecordException(
      `Unable to retrieve a key ${key} from async storage`,
    );
  }
}
