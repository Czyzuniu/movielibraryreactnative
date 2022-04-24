import AxiosClient from '../../../../src/base/infrastructure/AxiosClient';
import ServerException from '../../../../src/base/domain/core/ServerException';
import {AxiosResponse} from 'axios';

describe('AxiosClient', () => {
  it('should have correct default settings on construct', () => {
    // when
    const client = new AxiosClient();
    // then
    // @ts-ignore
    expect(client.client.defaults.headers['Content-Type']).toBe(
      'application/json',
    );
    expect(client.client.defaults.baseURL).toBe('https://mockapiurl.co.uk');
  });

  it('should add the api key to every request', () => {
    // given
    const config = {
      params: {
        mockParam: 'test',
      },
    };
    const client = new AxiosClient();

    // when

    // @ts-ignore when (ignore here as we are calling a private method for the sake of testing it easier)
    const result = client.onRequestFulfilled(config);

    // then
    expect(result.params.api_key).toBe('12345');
    expect(result.params.mockParam).toBe(config.params.mockParam);
  });

  it('should rethrow the error if its an Error in the response interceptor', () => {
    // given
    const client = new AxiosClient();
    const error = new Error('some error');
    // when -> then
    // @ts-ignore (ignore here as we are calling a private method for the sake of testing it easier)
    expect(() => client.onErrorResponseHandler(error)).toThrow(error);
  });

  it('should throw a server exception if a response code is equal or greater then 500', () => {
    // given
    const client = new AxiosClient();
    // when -> then
    expect(() =>
      client
        // @ts-ignore (ignore here as we are calling a private method for the sake of testing it easier)
        .onErrorResponseHandler({response: {status: 500}}),
    ).toThrowError(ServerException);
  });

  it('should return the data if the response is success', () => {
    // given
    const client = new AxiosClient();
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
