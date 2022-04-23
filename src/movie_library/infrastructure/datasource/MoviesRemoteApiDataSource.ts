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
    const deserializer = JSONSerializer.getSerializer(MoviesDto);
    const response = await this.axiosClient.client.get<MoviesDto>(
      '/search/movie',
      {
        params: {page, query},
      },
    );
    const parsed = deserializer.parse(response);

    if (parsed) {
      return parsed;
    }

    throw new JsonParseException('Unable to parse the movies from the API');
  }

  async fetchMostPopularMovies(page: number): Promise<MoviesDto> {
    const deserializer = JSONSerializer.getSerializer(MoviesDto);
    const response = await this.axiosClient.client.get<MoviesDto>(
      '/movie/popular',
      {
        params: {page: page},
      },
    );
    const parsed = deserializer.parse(response);

    if (parsed) {
      return parsed;
    }

    throw new JsonParseException('Unable to parse the movies from the API');
  }

  async fetchMovieById(movieId: string): Promise<MovieDto> {
    const deserializer = JSONSerializer.getSerializer(MovieDto);
    const response = await this.axiosClient.client.get<MoviesDto>(
      `/movie/${movieId}`,
    );
    const parsed = deserializer.parse(response);

    if (parsed) {
      return parsed;
    }

    throw new JsonParseException('Unable to parse the movies from the API');
  }
}

export {MoviesRemoteApiDataSourceImpl};
export type {MoviesRemoteApiDataSource};
