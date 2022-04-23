import {MovieRepository} from '../../domain/repository/MovieRepository';
import SimplisticMovie from '../../domain/entity/SimplisticMovie';
import {MoviesRemoteApiDataSource} from '../datasource/MoviesRemoteApiDataSource';
import MovieDtoToSimplisticMovieMapper from '../mappers/MovieDtoToSimplisticMovieMapper';
import {inject, injectable} from 'inversify';
import {InjectableTypes} from '../../../ioc/types';
import DescriptiveMovie from '../../domain/entity/DescriptiveMovie';
import MovieDtoToDescriptiveMovieMapper from '../mappers/MovieDtoToDescriptiveMovieMapper';

@injectable()
export default class MovieRepositoryImpl implements MovieRepository {
  private remoteApiDataSource: MoviesRemoteApiDataSource;
  private movieDtoToSimplisticMovieMapper: MovieDtoToSimplisticMovieMapper;
  private movieDtoToDescriptiveMovieMapper: MovieDtoToDescriptiveMovieMapper;

  constructor(
    @inject(InjectableTypes.MovieRemoteDataSource)
    remoteApiDataSource: MoviesRemoteApiDataSource,
  ) {
    this.remoteApiDataSource = remoteApiDataSource;
    this.movieDtoToSimplisticMovieMapper =
      new MovieDtoToSimplisticMovieMapper();
    this.movieDtoToDescriptiveMovieMapper =
      new MovieDtoToDescriptiveMovieMapper();
  }

  async getPopularMovies(
    page: number,
    searchQuery: string,
  ): Promise<Array<SimplisticMovie>> {
    let moviesDto;
    if (searchQuery.length) {
      moviesDto = await this.remoteApiDataSource.findMovies(searchQuery, page);
    } else {
      moviesDto = await this.remoteApiDataSource.fetchMostPopularMovies(page);
    }
    return moviesDto.results.map(movieDto =>
      this.movieDtoToSimplisticMovieMapper.convert(movieDto),
    );
  }

  async getMovieById(movieId: string): Promise<DescriptiveMovie> {
    const movieDto = await this.remoteApiDataSource.fetchMovieById(movieId);
    return this.movieDtoToDescriptiveMovieMapper.convert(movieDto);
  }
}
