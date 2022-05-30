import NoRecordException from "../base/domain/core/exception/NoRecordException";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageUtils
{
  static async persist(key: string, data: any): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(data));
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
}
