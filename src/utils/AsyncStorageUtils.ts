import NoRecordException from "../base/domain/core/exception/NoRecordException";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageUtils
{
  static async persist(key: string, data: string | any): Promise<void> {
    return AsyncStorage.setItem(key, typeof data === 'string' ? data : JSON.stringify(data));
  }

  static async retrieve(key: string): Promise<any> {
    const retrieved = await AsyncStorage.getItem(key);
    if (retrieved) {
      return JSON.parse(retrieved);
    }

    throw new NoRecordException(
      `Unable to retrieve a key ${key} from async storage`,
    );
  }

  static async removeEntry(key: string): Promise<any> {
    return AsyncStorage.removeItem(key);
  }
}
