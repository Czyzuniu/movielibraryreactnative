import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {inject, injectable} from 'inversify';
import ServerException from '../domain/core/exception/ServerException';
import Config from 'react-native-config';
import {LocalStorageLocaleKey} from '../../../i18n/consts';
import {InjectableTypes} from '../../ioc/types';
import AsyncStorageRepository from '../../async_storage/domain/repository/AsyncStorageRepository';

const {API_URL, API_KEY} = Config;

@injectable()
export default class AxiosClient {
  private _client: AxiosInstance;
  private _asyncStorageRepository: AsyncStorageRepository;

  get client(): AxiosInstance {
    return this._client;
  }

  constructor(
    @inject(InjectableTypes.AsyncStorageRepository)
    asyncStorageRepository: AsyncStorageRepository,
  ) {
    this._client = this.setupConfigurationAndReturnInstance();
    this._asyncStorageRepository = asyncStorageRepository;
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
    const userLang = (await this._asyncStorageRepository.retrieve(
      LocalStorageLocaleKey,
    )) as {language: string};
    config.params = {
      ...config.params,
      api_key: API_KEY,
      language: userLang.language,
    };
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
