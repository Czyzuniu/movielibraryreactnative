import {MovieRepository} from '../repository/MovieRepository';
import Movie from '../entity/Movie';
import {InjectableTypes} from '../../../ioc/types';
import {inject, injectable} from 'inversify';

@injectable()
export default class GetPopularMoviesUseCase {
  private repository: MovieRepository;

  constructor(
    @inject(InjectableTypes.MovieRepository) repository: MovieRepository,
  ) {
    this.repository = repository;
  }

  async execute(page: number): Promise<Array<Movie>> {
    return this.repository.getPopularMovies(page);
  }
}
