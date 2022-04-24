import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {injectable} from 'inversify';
import ServerException from '../domain/core/ServerException';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {API_URL, API_KEY} = Config;

@injectable()
export default class AxiosClient {
  private _client: AxiosInstance;

  get client(): AxiosInstance {
    return this._client;
  }

  constructor() {
    this._client = this.setupConfigurationAndReturnInstance();
  }

  private setupConfigurationAndReturnInstance() {
    const defaultOptions: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: `${API_URL}`,
    };

    const instance = axios.create(defaultOptions);
    instance.interceptors.request.use(this.onRequestFulfilled);
    instance.interceptors.response.use(
      this.onSuccessResponseHandler,
      this.onErrorResponseHandler,
    );

    return instance;
  }

  private onRequestFulfilled = async (config: AxiosRequestConfig) => {
    const language = await AsyncStorage.getItem('user-language');
    config.params = {...config.params, api_key: API_KEY, language};
    return config;
  };

  private onSuccessResponseHandler(response: AxiosResponse) {
    return response.data;
  }

  private onErrorResponseHandler(error: any) {
    if (error instanceof Error) {
      throw error;
    }

    if (error.response.status >= 500) {
      throw new ServerException('Server Error');
    }
  }
}
