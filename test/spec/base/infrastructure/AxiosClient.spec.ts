import AxiosClient from '../../../../src/base/infrastructure/AxiosClient';
import ServerException from '../../../../src/base/domain/core/exception/ServerException';
import { AxiosResponse } from 'axios';
import { mock } from 'jest-mock-extended';
import AsyncStorageRepository from '../../../../src/async_storage/domain/repository/AsyncStorageRepository';
import { when } from 'jest-when';

describe('AxiosClient', () => {
  let asyncStorageRepositoryMock: AsyncStorageRepository;

  beforeEach(() => {
    asyncStorageRepositoryMock = mock<AsyncStorageRepository>();
  });

  it('should have correct default settings on construct', () => {
    // when
    const client = new AxiosClient(asyncStorageRepositoryMock);
    // then
    // @ts-ignore
    expect(client.client.defaults.headers['Content-Type']).toBe(
      'application/json',
    );
    expect(client.client.defaults.baseURL).toBe('https://mockapiurl.co.uk');
  });

  it('should add the api key and language to every request', async () => {
    const language = 'en-GB';
    when(asyncStorageRepositoryMock.retrieve).mockResolvedValue({language});

    // given
    const config = {
      params: {
        mockParam: 'test',
      },
    };
    const client = new AxiosClient(asyncStorageRepositoryMock);

    // when

    // @ts-ignore when (ignore here as we are calling a private method for the sake of testing it easier)
    const result = await client.onRequestFulfilled(config);

    // then
    expect(result.params.api_key).toBe('12345');
    expect(result.params.language).toBe(language);
    expect(result.params.mockParam).toBe(config.params.mockParam);
  });

  it('should rethrow the error if its an Error in the response interceptor', () => {
    // given
    const client = new AxiosClient(asyncStorageRepositoryMock);
    const error = new Error('some error');
    // when -> then
    // @ts-ignore (ignore here as we are calling a private method for the sake of testing it easier)
    expect(() => client.onErrorResponseHandler(error)).toThrow(error);
  });

  it('should throw a server exception if a response code is equal or greater then 500', () => {
    // given
    const client = new AxiosClient(asyncStorageRepositoryMock);
    // when -> then
    expect(() =>
      client
        // @ts-ignore (ignore here as we are calling a private method for the sake of testing it easier)
        .onErrorResponseHandler({response: {status: 500}}),
    ).toThrowError(ServerException);
  });

  it('should return the data if the response is success', () => {
    // given
    const client = new AxiosClient(asyncStorageRepositoryMock);
    const response: AxiosResponse = {
      config: {},
      data: {
        mock: 'test',
      },
      headers: {},
      status: 200,
      statusText: 'success',
    };
    // when
    // @ts-ignore (ignore here as we are calling a private method for the sake of testing it easier)
    const result = client.onSuccessResponseHandler(response);

    expect(result).toBe(response.data);
  });
});
