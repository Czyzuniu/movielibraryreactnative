import AxiosClient from '../../../base/infrastructure/AxiosClient';
import JSONSerializer from '../../../base/infrastructure/serializers/json/JSONSerializer';
import {MoviesDto} from '../models/MoviesDto';
import JsonParseException from '../../../base/domain/core/JsonParseException';
import {inject, injectable} from 'inversify';
import {InjectableTypes} from '../../../ioc/types';
import MovieDto from '../models/MovieDto';

interface MoviesRemoteApiDataSource {
  fetchMostPopularMovies: (page: number) => Promise<MoviesDto>;
  fetchMovieById(movieId: string): Promise<MovieDto>;
  findMovies(query: string, page: number): Promise<MoviesDto>;
}

@injectable()
class MoviesRemoteApiDataSourceImpl implements MoviesRemoteApiDataSource {
  private axiosClient: AxiosClient;

  constructor(@inject(InjectableTypes.AxiosClient) axiosClient: AxiosClient) {
    this.axiosClient = axiosClient;
  }

  async findMovies(query: string, page: number): Promise<MoviesDto> {
    const response = (await this.axiosClient.client.get('/search/movie', {
      params: {page, query},
    })) as MoviesDto;
    return JSONSerializer.deserialize(MoviesDto, response);
  }

  async fetchMostPopularMovies(page: number): Promise<MoviesDto> {
    const response = (await this.axiosClient.client.get('/movie/popular', {
      params: {page: page, include_adult: false},
    })) as MoviesDto;
    return JSONSerializer.deserialize(MoviesDto, response);
  }

  async fetchMovieById(movieId: string): Promise<MovieDto> {
    const response = (await this.axiosClient.client.get(
      `/movie/${movieId}`,
    )) as MovieDto;
    return JSONSerializer.deserialize(MovieDto, response);
  }
}

export {MoviesRemoteApiDataSourceImpl};
export type {MoviesRemoteApiDataSource};
