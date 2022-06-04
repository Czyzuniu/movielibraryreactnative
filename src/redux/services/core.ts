import Config from "react-native-config";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {BaseQueryFn} from "@reduxjs/toolkit/dist/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocaleUtils from "../../utils/LocaleUtils";

const {API_URL, API_KEY} = Config;

const onRequestFulfilled = async (config: AxiosRequestConfig) => {
  const sessionId = await AsyncStorage.getItem('session_id')
  const localeSettings = await LocaleUtils.getLanguage();
  config.params = {
    ...config.params,
    api_key: API_KEY,
    session_id: sessionId,
    language: localeSettings.language
  };
  return config;
};

const axiosBaseQuery = (baseURL = API_URL): BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  },
    unknown,
    unknown> =>
    async ({url, method, data, params}) => {
      try {
        const instance = await axios.create({baseURL: API_URL, method, data, params})
        instance.interceptors.request.use(onRequestFulfilled);
        const result = await instance(
          url, {
            method,
            data, params
          })
        return {data: result.data}
      } catch (axiosError) {
        let err = axiosError as AxiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }

export default axiosBaseQuery
