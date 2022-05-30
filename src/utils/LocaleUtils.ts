import AsyncStorageUtils from "./AsyncStorageUtils";
import {LocalStorageLocaleKey} from "../../i18n/consts";
import {LocaleSettings} from "../types/locale/types";

export default class LocaleUtils
{
  static async getLanguage(): Promise<LocaleSettings> {
    try {
      return AsyncStorageUtils.retrieve(LocalStorageLocaleKey)
    } catch (e) {
      return {
        language: 'en-GB'
      }
    }
  }

  static async persistLanguage(language: string): Promise<any> {
    return AsyncStorageUtils.persist(LocalStorageLocaleKey, { language })
  }
}
