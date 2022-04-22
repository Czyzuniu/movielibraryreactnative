import {MovieRepository} from '../../domain/repository/MovieRepository';
import Movie from '../../domain/entity/Movie';
import {MoviesRemoteApiDataSource} from '../datasource/MoviesRemoteApiDataSource';
import MovieDtoToMovieMapper from '../mappers/MovieDtoToMovieMapper';
import {inject, injectable} from 'inversify';
import {InjectableTypes} from '../../../ioc/types';

@injectable()
export default class MovieRepositoryImpl implements MovieRepository {
  private remoteApiDataSource: MoviesRemoteApiDataSource;
  private movieDtoToMovieMapper: MovieDtoToMovieMapper;

  constructor(
    @inject(InjectableTypes.MovieRemoteDataSource)
    remoteApiDataSource: MoviesRemoteApiDataSource,
  ) {
    this.remoteApiDataSource = remoteApiDataSource;
    this.movieDtoToMovieMapper = new MovieDtoToMovieMapper();
  }

  async getPopularMovies(page: number): Promise<Array<Movie>> {
    const popularMoviesDto =
      await this.remoteApiDataSource.fetchMostPopularMovies(page);
    return popularMoviesDto.results.map(movieDto =>
      this.movieDtoToMovieMapper.convert(movieDto),
    );
  }
}
